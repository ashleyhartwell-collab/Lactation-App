# Path Change: Phase 2 — Data Layer

**Status:** Implemented (2026-07-08). Migration and Edge Function are written and ready to deploy: `latched-backend/supabase/migrations/00023_path_transition_events.sql` and `latched-backend/supabase/functions/switch-feeding-path/index.ts`.
**Prepared:** 2026-07-08
**Depends on:** Phase 0 decisions (locked, see `path-transition-design.md`) and Phase 1 content (all 11 transition modules drafted).

## What this covers

Two pieces, both driven by the Phase 0 decision that path switches get tracked, anonymized and aggregate-only, never surfaced to the user or tied to an identifiable profile:

1. A dedicated `switch-feeding-path` function, replacing the current unguarded overwrite of `feeding_preference` in `upsert-profile`.
2. A `path_transition_events` table to record that a switch happened, without recording who did it in a form that's queryable back to a person.

## 1. Why `upsert-profile` isn't the right place for this anymore

Right now, `upsert-profile` (`latched-backend/supabase/functions/upsert-profile/index.ts`) writes `feeding_preference` as part of a general profile upsert, `onConflict: 'id'`, no first-time-only guard. That's fine for onboarding, where the write is really a first-time set. It's the wrong shape for a deliberate path switch for three reasons:

- It gives a switch no distinct audit trail. Onboarding writes and later switches look identical in the database.
- It gives us nowhere to hook the transition-tracking insert. Bolting it onto a general-purpose profile upsert means every unrelated profile edit (baby's display name, whatever comes next) would need to know about path-change side effects.
- It gives us nowhere to validate the transition itself. Some pairs (see the transition matrix in `path-transition-design.md`) carry different follow-up content than others, and a couple, formula exits and T-REL, have real clinical weight the function should be able to reason about, even if that reasoning lives in the frontend hub for now.

So: keep `upsert-profile` doing what it does for onboarding, and add a separate function for switches. `upsert-profile` can stay unguarded for the first-time case, since a brand-new profile has no "old path" to log a transition away from anyway.

## 2. `switch-feeding-path` function design

New edge function, `latched-backend/supabase/functions/switch-feeding-path/index.ts`.

**Input:** `{ new_path: 'A' | 'B' | 'C' | 'formula' }` (mapped internally to the enum values already established in `00014_feeding_preference_enum.sql`: `breastfeeding`, `exclusive_pumping`, `combo`, `formula`). No `old_path` in the request; the function reads the current value server-side so the client can't spoof what it's transitioning from.

**Behavior:**

1. Look up the caller's current `feeding_preference` from `user_profiles` using the authenticated user's id (service-role read, same pattern as other functions in this codebase).
2. If `new_path` equals the current value, no-op, return success. Not every "switch" request is a real switch, and a same-path call shouldn't generate a phantom transition event.
3. Otherwise, in a single transaction:
   - Update `user_profiles.feeding_preference` to the new value.
   - Insert one row into `path_transition_events` (schema below).
4. Return the updated profile, same response shape `upsert-profile` already returns for `feeding_preference`, so the frontend doesn't need two different response parsers.

**What it deliberately does not do:** it does not touch guide-completion state. Per the locked Phase 0 decision, completion persists in full across a switch, so this function has nothing to do there beyond leaving `guide_completions` (or whatever the current completion table is, worth confirming the exact name before implementation) untouched.

**Error handling:** reject invalid `new_path` values against the same enum check the `00014` migration already enforces at the DB level, so the function fails fast with a clear message instead of relying solely on the CHECK constraint to reject a bad insert.

## 3. `path_transition_events` table

This is the piece that has to actually satisfy "anonymized, aggregate-only, never tied to an identifiable profile." A naive `(user_id, from_path, to_path, created_at)` table would fail that test immediately, since `user_id` is exactly the identifiable link the decision rules out.

Proposed shape:

```sql
create table path_transition_events (
  id uuid primary key default gen_random_uuid(),
  from_path text not null check (from_path in ('breastfeeding','exclusive_pumping','combo','formula')),
  to_path text not null check (to_path in ('breastfeeding','exclusive_pumping','combo','formula')),
  transitioned_at timestamptz not null default now(),
  -- Coarse bucket instead of a birth date or exact postpartum day, so this
  -- table can't be joined back to a specific baby/profile even internally.
  postpartum_week_bucket text not null check (
    postpartum_week_bucket in ('0-4','5-8','9-12','13-24','25-52','52+')
  )
);

-- No RLS policies granting row-level read/write to authenticated users.
-- Only the switch-feeding-path function (service role) writes to this table.
-- Reporting/analytics reads happen through a service-role job or view, not
-- through the client-facing Supabase API.
alter table path_transition_events enable row level security;
-- (no policies added — default-deny, service role bypasses RLS)
```

Notes on why it's built this way:

- **No `user_id` column at all**, not even a hashed one. A hash is still a stable per-user identifier that could be correlated against other tables if anyone ever tried; leaving it out entirely is the only version of "never tied to an identifiable profile" that holds up even against internal misuse.
- **`postpartum_week_bucket` instead of an exact week or the baby's `dob`.** Exact week combined with `transitioned_at` would let someone back into an approximate birth date, which re-identifies the profile. Coarse buckets lose that precision on purpose.
- **RLS with no policies, default-deny.** Nobody queries this through the normal authenticated client path, only through service-role tooling, matching how the seed/analytics tables already work elsewhere in this schema.
- This table only answers questions like "how many B→formula transitions happened in the last quarter, broken down by postpartum stage" — which is exactly the shape of question the Phase 0 decision was scoped to allow. It cannot answer "did user X switch paths."

**Migration numbering:** the next unused migration number was `00023` (00020 appears to have been skipped historically and isn't reused; 00021 and 00022 are already taken by the diaper-log and baby-display-name work). Reconfirmed 00023 was still free immediately before writing the file (checked against both the main tree and the `claude/eloquent-bohr-a6b087` worktree, no new migrations had landed since the earlier check). Written as `latched-backend/supabase/migrations/00023_path_transition_events.sql`. It also adds a small `public.postpartum_week_bucket(weeks int)` helper function so the bucketing logic lives once in the DB rather than being duplicated in the Edge Function.

## Open items — resolved 2026-07-08

1. **Guide-completion table: there isn't one.** Checked every edge function in `latched-backend/supabase/functions/` (`upsert-profile`, `get-profile`, and the rest) and every migration; nothing persists guide/module completion server-side. `AppContext.moduleProgress` is client-only state. This actually simplifies the "leave completion alone" requirement: `switch-feeding-path` has nothing to touch here at all, there's no server-side completion record that a path switch could accidentally clear. Worth flagging to the Lovable/frontend side once this matters more (e.g. if completion ever needs to survive a logout/reinstall, it isn't currently backend-backed and would need its own migration), but that's out of scope for this phase.
2. **`postpartum_week_bucket`: confirmed derived from `baby_dob`,** using the same `public.weeks_postpartum(baby_dob date)` SQL function already defined in `00004_user_profiles.sql` and already used by the edge functions for `weeks_postpartum` in profile responses. The bucket is computed inside `switch-feeding-path` at insert time using that function's output, not a new date calculation.
3. **Migration number: `00023` reconfirmed free** as of 2026-07-08, checked again immediately before writing the file, against both the main tree and the `claude/eloquent-bohr-a6b087` worktree. No new migrations landed since the last check. Filed as `latched-backend/supabase/migrations/00023_path_transition_events.sql`.
4. Phase 3 (Lovable frontend brief, `docs/lovable/lovable-brief-path-change.md`) already accounts for this: the hub's path-confirmation action is specified to call a backend function rather than write to any table directly, so the frontend and this data layer are aligned once both land.
