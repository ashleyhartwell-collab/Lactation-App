# Product bug — paywall headline week is not clamped to 6 (2026-07-08)

Filed while fixing `e2e/tests/flow1a-onboarding.spec.ts` (Finding 3 of
`e2e-flow1a-onboarding-findings-2026-07-08.md`). Once the onboarding DOB was set
correctly (the test previously never set it), the "week 7" symptom the findings
doc described turned out to be **two separate things**, only one of which is a
real product bug.

## How this was observed

Drove the live app (`mama-milk-map.lovable.app`) through onboarding with a
correctly-set DOB (three-dropdown Month/Day/Year picker) for several ages, then
read the paywall headline "…here's your 6-week … plan — starting at week N.":

| DOB (days ago) | paywall headline | expected (spec) |
|---:|---|---|
| 0  | starting at week 1  | 1 |
| 6  | starting at week 1  | 1 |
| 7  | starting at week 2  | 2 |
| 13 | starting at week 2  | 2 |
| 14 | starting at week 3  | 3 |
| 21 | starting at week 4  | 4 |
| 70 | **starting at week 11** | **6 (clamped)** |

The app's week formula is `floor(days / 7) + 1` — matching
`docs/product/mvp-experience-spec.md:481-483` ("Week 1 = days 0-6 … day 14 → Week 3")
and `getCurrentWeek()` in `lovable-briefs/lovable-protocol-personalization.md:266`.

## The bug

`getCurrentWeek()` clamps the result to `1..6`
(`min(max(floor(days/7)+1, 1), 6)`), and `qa-test-plan.md:118` expects the
**paywall headline** to read "starting at week 6 (clamped to 6)" for a 70-day-old.

The paywall headline is computed on a **different code path** that applies the
`+1` formula **without the clamp**, so a baby past 6 weeks gets a self-contradictory
headline: *"here's your **6-week** plan — starting at **week 11**."*

- **Protocol / This Week tab**: uses `getCurrentWeek()` → clamps correctly to week 6.
- **Paywall headline**: missing the clamp → shows week 7+.

**Fix**: clamp the paywall headline's week to `min(week, 6)` (equivalently, reuse
`getCurrentWeek()`), so past-6-week users see "starting at week 6."

**Severity**: cosmetic-but-embarrassing. It does not break the 5 e2e tests (the
paywall-headline test uses a 14-day DOB, well under the clamp; the scenario tests
read the This-Week tab, which already clamps). It is user-facing on the paywall
for anyone onboarding a baby older than 6 weeks.

## Also worth a look — stale QA doc (not an app bug)

`docs/product/qa-test-plan.md` encodes an **off-by-one** that disagrees with the
implementation spec:

- `:76` expects the 14-day paywall headline to say "week 2" (app + spec say **week 3**).
- `:100` expects the 21-day headline to say "week 3" (app + spec say **week 4**).
- `:81`/`:103` similarly expect "Week 2 of 6" / "Week 3 of 6" on the Protocol tab.

The app is correct per `mvp-experience-spec.md:483` ("day 14 → Week 3"); the QA
plan rows are stale. The QA plan doc should be reconciled to the
`floor(days/7)+1` formula (left for a human — it's a manual-test artifact).

The e2e paywall-headline test now uses a **mid-week** DOB (10 days ago → week 2)
rather than 14 days. Exactly 14 days lands on the week-2/week-3 boundary, and the
test helper `dobFromOffset` mixes local `setDate` with UTC `toISOString`, so a
boundary DOB rounds to week 2 or week 3 depending on the time of day — flaky.
A mid-week offset makes the asserted week deterministic (verified live: offsets
-9..-12 all yield "week 2").

## Test-infra limitation — mocked signup does not persist onboarding data

Found while getting the scenario tests green. The flow1a tests reach "Create
Account" and intercept `POST /auth/v1/signup` with `mockSignupAsSignIn` (returns
a real sign-in session for a pre-seeded, allowlisted user). This lets the UI walk
to Home, **but the onboarding data entered in this run is not persisted**:

- After account creation the app calls `POST /functions/v1/upsert-profile`. On
  this deployment that upsert saves **demo-profile defaults** — observed
  `baby_dob = 2026-05-23` (~6 weeks old) with `display_name`/`baby_display_name`
  = `null` — instead of the name/DOB just entered. (The deployment has a
  "Restart demo" mode; the mocked auth appears to load/seed a demo profile that
  overwrites the in-memory onboarding context.)
- Consequently the This-Week **current-week indicator** always reflects the demo
  DOB (renders "Week 6 of 6"), regardless of the scenario's DOB.

Also note: skipping the **"Skip for now →"** control on the personalization
"Goal" screen made the profile upsert fail with a 400 ("feeding_goal must be one
of: 6_weeks, 3_months, 6_months, as_long_as_works, unsure") → **no profile row is
created at all**. A skippable screen producing an unsaveable profile is a real
product bug.

> **Correction (2026-07-09, on investigation):** the original framing above —
> that "`upsert-profile` **requires** `feeding_goal`" — is **not accurate**. The
> edge function ([`latched-backend/supabase/functions/upsert-profile/index.ts`])
> validates `feeding_goal` **only when it is present** (`if (feeding_goal !==
> undefined)`), the DB column is nullable ("NULL = not yet captured", migration
> 00011), and only `baby_dob` is truly required. An **omitted** goal saves fine.
> The observed 400 message is the *invalid-value* path, which fires only when the
> field is **present but empty** — i.e. the Goal screen's "Skip for now" is
> **sending `feeding_goal: ""`** instead of omitting the key (the brief says skip
> should "save nothing"). Root cause = frontend sending an empty value, not a
> backend requirement. Fixes: (1) backend hardened to treat `""`/`null` optional
> enums as omitted; (2) Lovable brief `lovable-briefs/lovable-goal-skip-omit-fix.md`
> to omit the field on skip. The same empty-value trap applied to
> `feeding_preference` and is covered by the same backend change.

**Impact on the tests:** the scenario tests verify the onboarding UI end-to-end
(reach Home, plan loads, week navigation present, no "Week 7"), but they cannot
assert the exact personalized current week through this mock. `1A-i` was
therefore changed to stop asserting "Week 1 of 6" / "Starting from where you are"
and instead assert the plan loaded + Path-A week-1 content is present, matching
the other scenario tests. Fully validating personalized week content would need
either a real (non-mocked) signup path or a mock that also seeds the profile
with the scenario's DOB after the app's own upsert.
