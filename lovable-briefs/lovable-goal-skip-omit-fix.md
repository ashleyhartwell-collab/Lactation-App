# Lovable Brief — "Skip for now" on personalization screens must omit the field (not send an empty value)

**Type:** Surgical bug fix (post-paywall personalization → `upsert-profile` payload)
**Related:** `docs/technical/e2e-flow1a-paywall-clamp-testing-notes-2026-07-08.md` (test-infra finding),
`latched-backend/supabase/functions/upsert-profile/index.ts`

Paste the block below into Lovable as a single prompt.

---

```
Fix how the post-paywall personalization screens build the upsert-profile request
when a field is skipped. Do not change any screen layout, copy, or navigation.

THE BUG
The personalization screens (Goal / Reason, Breast Anatomy, Pump, …) each have a
"Skip for now →" link that is supposed to "save nothing for that screen." But on
the Goal screen, skipping currently sends feeding_goal as an EMPTY value (e.g.
feeding_goal: "" or null) in the POST to /functions/v1/upsert-profile.

The backend treats feeding_goal as an optional enum. An OMITTED field is fine
(saved as NULL), but a present-but-empty value ("") fails validation and the
edge function returns 400 "feeding_goal must be one of: 6_weeks, 3_months,
6_months, as_long_as_works, unsure". Because that 400 aborts the whole upsert,
NO profile row is created at all — the user finishes onboarding with no profile.

THE FIX
When a personalization field is skipped (or otherwise unset), OMIT its key from
the upsert-profile request body entirely — do NOT include it with an empty string
or null. Build the payload so only fields the user actually provided are present.

Concretely, the body should look like:
  { baby_dob, display_name, feeding_preference }        // goal skipped → no feeding_goal key
NOT:
  { baby_dob, display_name, feeding_preference, feeding_goal: "" }   // ← causes the 400

Apply the same rule to every optional personalization field so skipping any of
them never sends an empty/placeholder value:
  - feeding_goal        (Goal / Reason screen)
  - feeding_preference  (if ever skippable)
  - breast_anatomy      (send [] only if the user explicitly cleared it; otherwise omit)
  - pump_models         (same: omit when skipped, [] only to explicitly clear)

Valid feeding_goal values, for reference (send one of these ONLY when the user
picked one): 6_weeks | 3_months | 6_months | as_long_as_works | unsure.

VERIFY
Onboard a new user and tap "Skip for now →" on the Goal screen. The
upsert-profile request must succeed (200), the app must reach Home, and a
user_profiles row must exist with feeding_goal = null (not a 400, not a missing
row). Repeat skipping the other personalization screens — each must still save.
```

---

## Why both this and the backend change

The backend has been hardened in parallel (see the PR that adds this brief) to treat
an empty/`null` optional enum the same as "omitted", so the "no profile created"
failure is fixed at the source even if the frontend still sends `""`. This brief is
the **frontend-side correctness fix**: the payload should match the documented
contract ("skip = save nothing") and not send empty values in the first place. Ship
both; the backend change is the safety net, this is the root-cause fix.
