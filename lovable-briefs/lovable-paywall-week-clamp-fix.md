# Lovable Brief — Paywall Headline Week Clamp Fix

**Type:** Surgical bug fix (one screen, one string)
**Related:** `docs/technical/e2e-flow1a-paywall-week-clamp-bug-2026-07-08.md`, `lovable-briefs/lovable-onboarding-restructure.md` (PART 6)

Paste the block below into Lovable as a single prompt.

---

```
Fix a bug in the Paywall screen headline only. Do not touch any other screen,
layout, style, copy, routing, or data logic.

THE BUG
The paywall personalization headline reads:
  "[Name], here's your 6-week [path] plan — starting at week [X]."
The starting week [X] is currently computed inline as an UNCLAMPED
`Math.floor(daysSinceDOB / 7) + 1`. Because it has no upper bound, a baby older
than 6 weeks shows a week greater than 6 on a plan that is only 6 weeks long —
e.g. a 70-day-old renders "your 6-week nursing plan — starting at week 11",
which is self-contradictory.

The Protocol / This-Week screen already handles this correctly by using the
shared utility `getCurrentWeek()` from `src/utils/getCurrentWeek.ts`, which
clamps the result to 1–6. The paywall headline must use the SAME value so the
two screens can never disagree.

THE FIX
In the Paywall screen component, find where the headline's starting week is
computed. Replace the inline `floor(days / 7) + 1` calculation with a call to
the existing shared utility:

  import { getCurrentWeek } from '@/utils/getCurrentWeek'

  const startingWeek = getCurrentWeek(appContext.babyDOB, appContext.babyWeeksOld)

Then use `startingWeek` in the headline string instead of the inline calculation.

If for any reason the headline cannot import that utility, clamp the existing
inline value instead — it must produce an identical result:

  const startingWeek = Math.min(Math.max(Math.floor(days / 7) + 1, 1), 6)

Expected results after the fix (starting week shown in the headline):
  DOB today (0 days)  -> week 1
  7 days ago          -> week 2
  14 days ago         -> week 3
  21 days ago         -> week 4
  70 days ago         -> week 6   (clamped; previously showed 11)

DO NOT CHANGE
- The headline copy pattern, path label mapping (A→nursing, B→pumping,
  C→combination feeding), or the name/address-preference logic.
- Any other paywall content: badge, preview card, value summary, price block,
  CTA, guarantee text, or visual design/tokens.
- The Protocol screen, getCurrentWeek.ts, AppContext fields, routing, Stripe
  handler, or any backend/edge-function calls.

VERIFY
Set a baby DOB to 70 days ago and walk to the paywall: the headline must read
"…your 6-week [path] plan — starting at week 6." Confirm it matches the
Protocol screen's "Week 6 of 6" for the same DOB.
```

---

## Why this is safe

- **Single source of truth.** The fix routes the paywall week through the same
  `getCurrentWeek()` the Protocol screen already uses, so the two can't drift
  apart again. The inline-clamp fallback is mathematically identical
  (`min(max(floor(days/7)+1, 1), 6)`).
- **No copy or design change.** Only the numeric value of `[X]` changes, and only
  for babies older than 6 weeks (0–41 days are unaffected).
- **Note — two "week" numbers exist in the app.** This fix is about the **plan
  week** (`getCurrentWeek`, `floor(days/7)+1`, clamped) shown on the paywall and
  Protocol. It is *not* the same as **weeks postpartum** (`baby_weeks_old`,
  `floor(days/7)`) used by chat personalization — do not change that. See the QA
  plan's FLOW 1A note and the technical analysis doc for the distinction.
