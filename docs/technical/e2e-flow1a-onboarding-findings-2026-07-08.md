# E2E flow1a onboarding — findings (2026-07-08)

## TL;DR

`e2e/tests/flow1a-onboarding.spec.ts` (5 tests) is failing, but **not because of
auth/signup**. Investigation shows the signup / account-creation step actually
works — the flow reaches the post-paywall personalization screens. The failures
are **onboarding-UI drift** across a few screens, plus one thread that may be a
real **product bug** (week calculation). None of these are fixed by the
session-injection auth work (that only covers the returning-user sign-in path).

No flow1a code was changed. This doc is for triage.

## How these were observed

Ran `npx playwright test flow1a-onboarding.spec.ts` in isolation (global-setup
seeds the auth-only scenario users). All 5 failed. Failure screenshots
(`e2e/test-results/.../test-failed-1.png`) show exactly where each stalled.

## Finding 1 — personalization "Skip" selector is wrong (test issue)

**Tests affected:** 1A-i, 1A-ii, 1A-iii, 1A-iv (all four scenario tests).

**Where:** `completeOnboarding`, the post-account-creation personalization steps
(`flow1a-onboarding.spec.ts:118` and `:121`).

**What happens:** the screen "PERSONALIZING YOUR PLAN → How long are you hoping to
breastfeed?" offers option pills (`6 weeks`, `3 months`, …, `Not sure yet`) plus a
separate **"Skip for now →"** link at the bottom. The helper does:

```
await page.locator('text=Skip for now').or(page.locator('text=Not sure yet')).first().click()
```

`.first()` resolves to the **"Not sure yet"** option pill (earlier in the DOM),
which only *selects* the option (turns green) — it does not advance. The screen
never progresses, so the test eventually times out at the final
`waitForURL(/\/$|\/home/)` (`:135`).

**Fix direction:** advance the screen deterministically — click the **"Skip for
now"** link specifically (not the option pill), or select an option and click
**Continue**. Avoid `.or(...).first()` here; it conflates "pick a value" with
"skip". Repeat for each personalization screen (Goal, Anatomy, Pump).

## Finding 2 — DOB date-picker interaction likely broken (test issue)

**Tests affected:** all scenario tests + the paywall-headline test.

**Where:** `completeOnboarding` step 2 (`:88`) and the paywall test (`:285`):

```
const dobInput = page.locator('input[type="date"]').first()
await dobInput.fill(dob, { timeout: 3000 }).catch(() => { /* skip */ })
```

The `.catch(() => {})` / `if (await dobInput.isVisible())` guards mean that if the
app no longer exposes a native `input[type="date"]` (e.g. it switched to a custom
date component), the DOB is **silently not set** and the test continues anyway.
This is consistent with Finding 3.

**Fix direction:** identify the current DOB component in the onboarding step-2
screen and drive it explicitly. Remove the silent `.catch()` so a broken DOB
interaction fails loudly instead of corrupting downstream week assertions.

## Finding 3 — paywall shows "week 7" for a 2-week-old (triage: test vs product bug)

**Test affected:** "Paywall headline matches path + week" (`:270`).

**Observed headline:**
> "Jamie, here's your 6-week pumping plan — starting at **week 7**."

**Expected (test regex):** `/Jamie.*pumping.*week 2/i` — DOB was set to 14 days ago
(→ week 2).

Two possibilities:
1. **Downstream of Finding 2** — DOB was never applied, so the app fell back to a
   default that renders "week 7". Fix Finding 2 first and re-check.
2. **Product bug** — if DOB *is* being captured, a 2-week-old should be "week 2",
   and the 6-week plan should never surface "week 7" (past-week-6 is supposed to
   clamp to 6, per test 1A-iv). "Starting at week 7" on a 6-week plan is
   self-contradictory and worth a product look regardless.

**Action:** resolve Finding 2, then determine which case this is. If week 7 still
appears with a correctly-set 2-week DOB, file a product bug on the onboarding
week calculation / clamping.

## Note — signup / account creation appears functional

The scenario tests reached the personalization screens, which are **after** the
account-creation step (`:108`–`:114`, email + password + "Create", with
`/auth/v1/signup` intercepted by `mockSignupAsSignIn`). So account creation is
currently working via the mock. One earlier full-suite run showed a single
`input[type="password"]` timeout on this step that did **not** reproduce in
isolation — worth confirming under full-suite ordering, but it is not the primary
flow1a blocker.

## Suggested order of work (when picked up)

1. Fix the DOB picker interaction (Finding 2), failing loudly on breakage.
2. Fix the personalization skip logic (Finding 1).
3. Re-run; if "week 7" persists with a correct 2-week DOB, file a product bug
   (Finding 3).
4. Confirm account-creation stability under the full suite (the note above).
