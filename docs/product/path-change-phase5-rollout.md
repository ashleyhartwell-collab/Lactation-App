# Path Change: Phase 5 — Clinical Review Gating and Staged Rollout

**Status:** Revised plan (2026-07-09). Supersedes the original one-line Phase 5 note ("ship A→Formula, B→Formula, A→B first, hold the rest") tracked in the project task list, which predates Phase 1 finishing all 11 modules.
**Prepared:** 2026-07-09
**Confirmed with Ashley (2026-07-09):** no clinical/IBCLC review has happened yet for any of the 11 transition modules. The app is pre-launch — the live Lovable build is QA/internal only, no real users have access yet.

## Why the original plan needs revising

The original Phase 5 note was written when only 3 transitions (T-A-F, T-B-F, T-A-B) had drafted content, and the other 8 didn't exist yet. "Ship these three first, hold the rest" made sense as a scope decision at that point, the rest genuinely weren't ready. That's no longer the situation. All 11 modules are now content-complete, voice-passed, coded (Phase 2), live in the Lovable build (Phase 3), and e2e-tested (Phase 4). The thing actually gating a real launch now isn't content completeness, it's that nothing has been clinically reviewed yet.

Given that, and given the app hasn't shipped to real users yet, this is the cleanest possible moment to build the gate properly rather than defaulting to the original draft-order plan, which would launch two of the highest clinical-liability modules (T-A-F, T-B-F) first, exactly backwards from a risk-based approach.

## Review priority, regrouped by clinical stakes rather than draft order

The design doc's own "Advisor Review Implications" section (Section 4) already flags T-A-F, T-B-F, T-REL, and T-WEAN as needing the most careful review, weaning guidance, mastitis risk identification, medication interactions, relactation physiology, galactagogue evidence, evidence-based vs. folk remedy calls. Regrouping all 11 modules by that same lens, rather than by when they were drafted, gives two clear tiers:

**Tier 0, review first, do not expose to real users until cleared:**
- T-A-F, T-B-F, T-C-F, T-WEAN, T-REL

All five involve active weaning guidance (mastitis risk windows, engorgement management, cabbage leaf/sage tea evidence claims), and T-REL additionally involves galactagogue and medication guidance. Note: T-C-F wasn't named explicitly in the design doc's original advisor-review list, but its content is functionally the same weaning/mastitis guidance as T-A-F and T-B-F, just for a combo-feeding starting point. That looks like an oversight in the original list rather than a deliberate exclusion, so it's included here.

**Tier 1, lower clinical stakes, can follow once Tier 0 clears:**
- T-A-B, T-B-A, T-A-C, T-B-C, T-C-A, T-C-B

All six are supply-building or supply-redistribution mechanics (flange fitting, session frequency, paced bottle feeding, power pumping). None involve stopping milk production, so the mastitis/engorgement risk window and medication questions that make Tier 0 sensitive don't apply here. Still worth a review pass before launch, just lower urgency and likely faster to clear.

## Recommended sequencing

1. **Send Tier 0 (5 modules) to your IBCLC for review first.** This is the highest-value use of review time, since these are also the modules most likely to be a real user's first stop (nursing/pumping to formula are common searches) and carry the most liability if something in the weaning or medication guidance is off.
2. **Send Tier 1 (6 modules) in the same pass or shortly after.** Lower urgency, but no reason to hold them separately if your IBCLC has bandwidth to look at all 11 in one sitting, the original 8-12 hour estimate was for all 11 together.
3. **Do not enable Path Change for real users (general availability) until at least Tier 0 clears.** Since the app hasn't launched yet, there's no cost to waiting, this is strictly better than the alternative of shipping unreviewed weaning/medication content to real users on day one.
4. **Tier 1 can launch alongside Tier 0 once both clear**, or slightly ahead of Tier 0 if you want Path Change available at general launch and Tier 0 is still mid-review, gated per the mechanism below.

## A lightweight gating mechanism, so partial review status doesn't block the whole feature

Right now the Path Change hub in Lovable shows all 11 modules unconditionally. To let review complete incrementally without holding the entire feature hostage to a single 8-12 hour review pass finishing all at once, add a simple per-module `reviewed` flag that controls whether a module appears in the hub's browse list and selector.

Recommended approach (small Lovable-side addition, not a backend change, since the module content itself already lives in Lovable per the Phase 3 brief):

- A config object mapping each of the 11 module IDs to `reviewed: true | false`, defaulting every module to `false` until you flip it after review.
- The hub's browse list and the "and I'm thinking about" selector only show modules where `reviewed: true`. An unreviewed module's route can still exist (so direct links don't 404), but shouldn't be discoverable through the hub's normal navigation.
- This means Tier 1 modules can go live the moment they clear review, without waiting on Tier 0, and vice versa, each module ships the moment its own review is done rather than the whole batch waiting on the slowest one.

I can draft the exact Lovable prompt for this gating mechanism once you've confirmed you want to go this route (versus, say, gating the entire hub as one on/off switch, which is simpler but means all 11 wait for the slowest review).

## Gating approach: confirmed (2026-07-09) — per-module

Ashley confirmed per-module gating over a whole-hub switch: each module ships the moment its own review clears, rather than all 11 waiting on the slowest one. See `docs/lovable/lovable-brief-path-change-review-gate.md` for the Lovable prompt implementing this.

## Open items

1. Send Tier 0 modules to your IBCLC first: T-A-F, T-B-F, T-C-F, T-WEAN, T-REL.
2. Paste the gating prompt (`docs/lovable/lovable-brief-path-change-review-gate.md`) into Lovable, then set every module's `reviewed` flag to `false` as the starting state until each one actually clears.
3. Once review comes back, some modules may need content corrections rather than a clean pass, especially T-REL (galactagogue/domperidone framing) and the cabbage-leaf/sage-tea evidence claims repeated across T-A-F, T-B-F, T-C-F, and T-WEAN. Budget for a revision round, not just a yes/no review.
4. This plan does not change anything about the bottle/nipple guide's own flagged IBCLC review items (painted glass, the 80-calorie stat, anti-colic framing, breast-mimicking claims, the triangle test, the excluded latex-cancer claim), those are tracked separately in `docs/product/getting-started-bottle-nipple-guide.md`'s review section and are a different content surface (Getting Started, not Path Change).
