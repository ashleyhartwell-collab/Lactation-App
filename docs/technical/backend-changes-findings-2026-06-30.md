# Backend Changes — Findings & Resolved Questions (2026-06-30)

Companion to `backend-brief-session-2026-06-30.md`. This doc records what I found in the codebase, resolves the two open questions the brief flagged, and confirms the companion-layer status. Consolidated SQL lives in `latched-backend/supabase/migrations/00020_protocol_modules_content_updates.sql`.

---

## Headline finding

**`protocol_modules` does not exist in the deployed backend.** It is defined only in the ERD at `docs/technical/technical-design-v1.md` (lines ~368–382). No `CREATE TABLE protocol_modules` appears in any migration (00001–00019), and nothing references it in backend SQL/TS. The only content-bearing table that actually exists is `faq_entries` (which powers Quick Chat, not the lesson modules).

That single fact resolves both open questions below.

> **Confirmed 2026-06-30:** there is no separate Lovable-managed Supabase instance. This repo's `latched-backend/supabase` is the only database. So `protocol_modules` does not exist anywhere — items 1–6 carry **no database work at all**. They are fully delivered by the Lovable component briefs. `00020_...sql` is optional/forward-looking and only becomes relevant if you later decide to move lesson content into the DB.

---

## Open question 1 — T-A-B row pattern for `shared-hand-expression`

**Resolved.** T-A-B is **not** a database row. It is a hardcoded Lovable component (see `docs/lovable/lovable-brief-content-update-1.md`, Part 3 — "Store the following content in the T-A-B module or a companion data file"). Because `protocol_modules` isn't deployed, there is no existing T-A-B row to match against.

For the *designed* schema, the correct pattern for a reference lesson is `week_number = NULL`, so the week-routing query never lists it inside any week. The ERD defines `week_number` as a nullable `smallint`, so `NULL` is valid. The migration uses `NULL` for both `week_number` and `module_order`. This matches the intent of the brief.

**Practical action today:** `shared-hand-expression` is built as a hardcoded reference component via `docs/lovable/lovable-brief-hand-expression-lesson.md`, reached by inline links from A-1-1, B-1-4, C-1-5. No DB row needed yet.

## Open question 2 — DB-driven vs. component-hardcoded content

**Resolved: content is component-hardcoded.** Lesson content is authored and shipped through the Lovable briefs that edit React components directly. There are no `body_content` / `crash_course_content` columns in the deployed DB to update, because the table holding them isn't deployed.

**Implication:** Items 1–6 of the session brief require **no SQL** right now. The Lovable briefs are the source of truth:
- shared-postpartum-body, shared-partner-support, shared-escalation-guide, A-1-2 → their Lovable briefs are sufficient; no matching `UPDATE` statements needed.
- Pediatrician split, hand-expression lesson, mental-health removal → handled by their respective Lovable briefs.

`00020_...sql` is therefore a **forward-looking spec**, not something to run today. It self-skips (raises a NOTICE and exits) if `protocol_modules` is absent, so it's safe to keep in the migrations folder. Run it only if/when you migrate `protocol_modules` in and move content serving to the DB.

## Open question 3 (item 7) — Trusted Friend / companion layer

**Resolved: migration was already run; no action.** The companion backend exists in the repo:
- `00011_companion_tables.sql` — companion_triggers, companion_content, pending_companion_items, companion_signals, daily_checkins
- `00012_companion_rls.sql` — RLS policies
- `00013_companion_seed.sql` — seed data

Per the brief's item 7: when the migration was already run, **do not roll back** — the tables and edge functions sit dormant while the UI is hidden, and may be reactivated later. So this is a deliberate no-op.

> Note on the numbering mismatch: the brief refers to "migration 00009 (from trusted-friend-backend-plan.md)." In this repo, 00009 is `pump_models`; the companion work is 00011–00013. The plan doc was written against an assumed numbering. The feature is unambiguously present (00011–00013) and should be left dormant.

---

## What to actually do now

| # | Item | DB action today | Why |
|---|------|-----------------|-----|
| 1 | Deactivate `shared-pediatrician-visits` | None | Content is in components; handled by Lovable brief |
| 2–4 | Add 3 pediatrician lessons (wk 1/4/8) | None | Built as components via Lovable brief |
| 5 | Add `shared-hand-expression` reference lesson | None | Built as component; inline-linked from A-1-1, B-1-4, C-1-5 |
| 6 | Deactivate `shared-mental-health` | None | Removed from UI via Lovable brief; route/component kept |
| 7 | Trusted Friend companion layer | None | Migrated (00011–00013); leave dormant, do not drop |

**When `protocol_modules` goes live:** run `00020_protocol_modules_content_updates.sql`, then fill the `[content authored in ...]` placeholders from the Lovable briefs, set the three `module_order` integers to your real ordering, and add the A-1-1 / B-1-4 / C-1-5 inline-link `UPDATE`s.

---

## Verification trail

- `grep -rn "protocol_modules" latched-backend/supabase/migrations/*.sql` → no matches.
- `grep "create table" *.sql` across migrations → faq_entries, faq_variants, unmatched_questions, query_log, user_profiles, chat_messages, feeding_sessions, companion_* (×5), test_allowlist; **no protocol_modules**.
- `ls migrations | grep companion` → 00011, 00012, 00013 present.
- `protocol_modules` referenced only in `docs/technical/technical-design-v1.md` (ERD).
