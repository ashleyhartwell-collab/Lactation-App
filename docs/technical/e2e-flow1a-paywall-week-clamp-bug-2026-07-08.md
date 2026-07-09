# E2E Flow 1A — Paywall Headline Week-Clamp Bug

**Date:** 2026-07-08
**Area:** Onboarding paywall (Latched / mama-milk-map.lovable.app)
**Severity:** Low (cosmetic, but self-contradictory copy that undermines trust)
**Status:** Fix specified in briefs; pending Lovable regeneration + re-test.

---

## Summary

The paywall personalization headline —

> "[Name], here's your 6-week [path] plan — starting at week [X]."

— computes `[X]` as an **unclamped** `floor(days_since_DOB / 7) + 1`. For any baby older
than 6 weeks this produces a week number greater than 6 on a plan that is, by name, only
6 weeks long. A 70-day-old shows **"your 6-week nursing plan — starting at week 11,"**
which is self-contradictory.

The Protocol / This-Week screen does **not** have this bug: it derives the current week
from `getCurrentWeek()`, which clamps to 1–6. Only the paywall headline omitted the clamp.

## Live verification (before fix)

DOB offset → week shown in the paywall headline:

| Days since DOB | Headline week | Expected (clamped) |
|----------------|---------------|--------------------|
| 0              | 1             | 1                  |
| 7              | 2             | 2                  |
| 14             | 3             | 3                  |
| 21             | 4             | 4                  |
| 70             | **11** ❌      | **6**              |

The mapping is exactly `floor(days / 7) + 1` with no upper bound — matching the Protocol
formula except for the missing `min(_, 6)` clamp.

## Root cause

- Protocol screen: `getCurrentWeek()` = `min(max(floor(days / 7) + 1, 1), 6)`
  (see `lovable-briefs/lovable-protocol-personalization.md`, PART 2).
- Paywall headline: same `floor(days / 7) + 1`, but computed inline **without** the
  `min(_, 6)` clamp.

The two screens should never disagree on the current week; the paywall simply forgot to
reuse the shared, clamped utility.

## Fix

Reuse the shared `getCurrentWeek(babyDOB, babyWeeksOld)` utility for the paywall headline
week instead of an inline unclamped formula. This is a **Lovable app change**, driven by a
brief edit — the app source is not in this repo.

- Brief updated: `lovable-briefs/lovable-onboarding-restructure.md`, PART 6 — now states
  that `[X]` MUST be the clamped `getCurrentWeek()` value (1–6), with the 70-days → week 6
  example called out explicitly.

Expected after fix: 70-day-old → "…your 6-week nursing plan — starting at week 6."

## Two "week" numbers — do not conflate

While reconciling the QA plan, note the app uses two distinct week quantities:

- **Weeks postpartum** = `baby_weeks_old` = `floor(days / 7)` — the baby's age; used by
  chat personalization. 14 days → **2** weeks postpartum.
- **Plan week** = `getCurrentWeek()` = `min(max(floor(days / 7) + 1, 1), 6)` — the +1,
  clamped; used by the paywall headline and Protocol "Week X of 6". 14 days → **plan week 3**.

A mom 2 weeks postpartum correctly sees plan week 3. This is not the bug — the bug was only
the missing clamp at the top end.

## QA plan reconciliation

`docs/product/qa-test-plan.md` had stale paywall/protocol week expectations that used the
weeks-postpartum number where the plan week (`+1`) belongs:

- 1A-ii (DOB 14 days, 2 wks postpartum): paywall/protocol expectation corrected 2 → **3**;
  content ref updated to Path B Week 3 ("Maximizing output and pumping efficiency").
- 1A-iii (DOB 21 days, 3 wks postpartum): paywall/protocol expectation corrected 3 → **4**;
  content ref updated to Path C Week 4 ("Protecting your supply while reducing stress").
- 1A-iv (DOB 70 days): already expected the clamped "week 6" — this is the correct target
  the fix must satisfy.

Section titles remain in **weeks postpartum** (matching the FLOW 2/3 chat personas
`test+week2@` / `test+week3@`, which are correct as-is); a note at the top of FLOW 1A now
spells out the two-week distinction.

## Re-test

Run FLOW 1A-iv (DOB 70 days) and confirm the paywall headline reads
"…starting at week 6," matching the Protocol screen's "Week 6 of 6."
