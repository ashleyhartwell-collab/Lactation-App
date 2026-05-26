# Latched — Conversation Summary (as of 2026-05-24)

## What's been built so far

Seven working documents in `/Users/ashleyhartwell/Documents/Claude/Projects/Lactation Journey App/`:

1. **PRD-Latched.md (v0.9)** — primary working PRD. Current scope and decisions.
2. **PRD-Lactation-Journey.md (v0.1)** — historical first draft, preserved.
3. **research-survey-3mo-moms.md** — 30-question survey for 10 moms, 2-5 months postpartum, $20 gift card per participant.
4. **design-references.md** — design system (shadcn/ui) + onboarding studies (Noom for structure, Headspace for tone, Flo for logging).
5. **cold-ibclc-interview-script.md** — 30-min interview script for 5 non-friend IBCLCs to stress-test the B2B2C channel thesis ($75 incentive each).
6. **ibclc-design-partner-onepager.md** — phone-readable invitation for 5-10 friendly IBCLC/doula partners.
7. **smart-faq-library-v1.md** — Smart-FAQ library taxonomy (14 categories), entry format schema, source prioritization, seeding strategy, refresh cadence. Ready for advisor collaboration.
8. **protocol-outline-v1.md** — Full module-by-module protocol outline across all 3 paths: 18 modules (Exclusive Nursing), 21 modules (Exclusive Pumping), 21 modules (Combination Feeding), 6 shared cross-path modules = 66 modules total.

## Product in one sentence

Latched is a mobile-first responsive web app helping first-time moms succeed in the first 6 weeks of breastfeeding, distributed via both IBCLC referral (B2B2C) and direct digital channels (B2C) at $49 one-time.

## Key decisions locked through v0.9

- **Dual-channel distribution from day one.** B2B2C (IBCLC referral) + direct B2C (paid/organic digital) operate in parallel. Same product, same price, different landing page. No dependency between channels — B2C doesn't wait for IBCLC availability.
- **Three paths.** Exclusive nursing / exclusive pumping / combination feeding (nursing + pumping + formula). Combination feeding path now explicitly includes formula with a guilt-free framing and a paced-bottle-feeding module as a non-negotiable.
- **6 weeks at v1, free "Continue Your Journey" extension at graduation.** 12 weeks analyzed and rejected for v1 launch (doubles advisor review scope against a tight runway; delays the week-6 graduation flywheel). Week-6 graduation offers a free weeks-7-12 preview included in the $49 purchase; full weeks 7-12 protocol authors post-launch using real query telemetry.
- **Smart-FAQ chat in v1.** Pre-vetted Q&A library (100-150 entries), foundation model used only for semantic matching, returns canned IBCLC-vetted answers verbatim. Confidence threshold gates refusal pattern. LLM never generates novel medical content.
- **Printable-ruler flange tool in v1.** AI vision flange deferred to v1.1 pending ≥85% within-one-size accuracy benchmark.
- **Future state chat roadmap in Section 10.** v1.1 = library expansion + slot-based personalization. v1.2 = RAG-with-refusal (Option 2) with explicit preconditions. v2.0+ = healthcare-tailored model, deferred indefinitely with revisit conditions.
- **MVP timeline:** 4-5 months. Runway: 4-6 months to first revenue. Tight.
- **Pricing:** $49 one-time, Stripe.
- **Stack:** Lovable for responsive web. Shadcn/ui design system. Mobile-first.

## Tier 1 launch features (v1)

1. 5-min assessment + path selection (3 paths including formula-inclusive combo)
2. Path-specific 6-week protocol with crash-course snippets
3. Printable-ruler flange tool
4. Basic feed/pump tracker
5. Flo-style daily check-in
6. **Smart-FAQ async chat**
7. IBCLC referral attribution (unique codes + QR) — for B2B2C channel
8. Graduation experience at week 6 + "Continue Your Journey" extension preview
9. Stripe $49 checkout

Tier 2 (ship if scope allows): IBCLC dashboard (lite) + pump library.

## Protocol scope summary (v1)

| Path | Modules | Approx. advisor review hrs |
|---|---|---|
| A — Exclusive Nursing | 18 modules | ~18-22 hrs |
| B — Exclusive Pumping | 21 modules | ~22-28 hrs |
| C — Combination Feeding | 21 modules | ~22-28 hrs |
| Shared cross-path | 6 modules | ~6-8 hrs |
| **Total** | **66 modules** | **~68-86 hrs** |

**Note:** this is higher than the v0.8 estimate of ~30-40 hrs. EP path depth and the formula-inclusive combo path both add scope. Mitigations: use Tier 1 source material heavily; author in batches (shared → Path A → Path B → Path C); option to cut Path C graduation modules to v1.1.

## Smart-FAQ library summary (v1)

- **14 categories:** latch/positioning, supply, pumping mechanics, flange/nipple health, output expectations, milk storage, pump equipment, breast health, baby behavior, medication safety, formula/paced bottle feeding, return-to-work prep, emotional wellness, wearable pumps
- **Source priority:** ABM protocols (bfmed.org), LLLI, ILCA, AAP, Global Health Media, CDC, WHO → KellyMom → LactMed (free), InfantRisk.com ($10/mo, strongly recommended), PubMed for recent studies
- **Entry format:** structured YAML with id, category, paths, weeks, question variants, canned answer, escalation trigger, sources, advisor_reviewed date, review_due date, confidence tier
- **Refresh cadence:** monthly advisor digest (2 hrs), quarterly spot-check (4-6 hrs), annual full audit (12-15 hrs)
- **Advisor pre-launch review:** ~20-30 hrs (editing source material into format, not authoring cold)

## Top tensions still live (as of v0.9)

1. **IBCLC advisor formalization** — gates v1 launch. Advisor time estimate is now ~68-86 hrs (protocol) + ~20-30 hrs (smart-FAQ library) = ~90-116 hrs total before launch. That's workable for a part-time advisor over 4-5 months but needs to be scoped clearly in the agreement.
2. **Timeline tight against runway.** 4-5 month build, 4-6 month runway. No room for scope re-expansion.
3. **Unit economics** — ~$7-10k cash-negative through first 100 signups. B2C CAC target <$30 blended.
4. **IBCLC channel risk** — hospital policy, professional norms, conflict-of-interest, sustained referral motivation. Cold IBCLC interviews are the gate.
5. **Direct B2C channel strategy** — not yet decided: founder-as-face vs. creator/IBCLC content vs. SEO. Needs a v1 decision before launch.
6. **Weeks 7-12 minimum viable extension** — what's the thinnest "Continue Your Journey" content that's honest at graduation? 3 intro modules? A curated guide? Advisor input needed.

## Founder context

- Ashley = solo founder, lived-experience user (new mom herself), not a clinician
- Several IBCLC + doula friends as informal thought partners; one likely to formalize as advisor
- Contacts in C-suite + digital health at Baylor Scott & White Health (Texas) — possible hospital-system pilot path, separate from consumer product. Recommendation: don't engage formally before Phase 0 validation.

## Phase 0 work in progress (next 4-6 weeks)

- Experiment 2: research survey to 10 moms
- Experiment 3: Lovable + Figma prototype of cold-acquisition onboarding
- Formalize IBCLC advisor (now gates ~90-116 hrs of pre-launch review work)
- Recruit 5-10 friendly IBCLC design partners (one-pager ready)
- Cold IBCLC validation interviews (script ready) — probe reaction to "canned-answer chat" framing
- WTP validation (Wizard-of-Oz)
- Printable-ruler accuracy test with 15+ moms vs. IBCLC ground truth

## Open questions for v1.0 (next PRD version)

1. IBCLC advisor agreement — signing date + comp structure. Scope must now reflect ~90-116 hrs total pre-launch review.
2. IBCLC pilot recruitment — names + outreach timeline
3. Cold IBCLC interview scheduling
4. Tracker direction — utility vs. gamified
5. Path selection placement in onboarding
6. Hospital policy research at partner institutions
7. BSWH conversation timing (recommend post Phase 0)
8. Printable-ruler approach — device-aware in-app vs. PDF
9. Weeks 7-12 minimum viable extension — what ships at graduation vs. defers to v1.1
10. Combination feeding path formula framing — advisor review of tone and clinical accuracy for formula modules
11. **NEW: Direct B2C channel strategy** — founder-as-face vs. creator/IBCLC content vs. SEO; decision needed before launch
12. Smart-FAQ confidence threshold for refusal pattern

## Where Ashley left off (session 2, 2026-05-24)

PRD updated to v0.9 with:
- Dual B2B2C + B2C distribution
- Formula-inclusive combination feeding path
- 6 vs. 12-week analysis → 6 weeks at v1 with free extension module

New documents created:
- **smart-faq-library-v1.md** — full library structure, sourcing plan, refresh cadence
- **protocol-outline-v1.md** — 66 modules across all 3 paths, ready for advisor review

## Next-move options

1. Draft the IBCLC advisor agreement skeleton (now scoped to ~90-116 hrs of pre-launch work)
2. Write the minimum-viable weeks 7-12 "Continue Your Journey" content (the graduation teaser)
3. Develop the direct B2C channel strategy (which channels, what content, who's the voice)
4. Begin drafting actual module text for Path A (the simplest path; establishes the format for advisor review)
5. Something else

## Working style notes for next session

- Ashley wants honest stress-testing, not encouragement. She has explicitly asked for pushback throughout.
- Show tensions, scope cuts, and risks proactively. Surface uncomfortable tradeoffs.
- The B2B2C pivot was Ashley's insight — I pushed back hard against a pure B2B IBCLC tool framing and that pushback was validated. Continue that pattern.
- Edit PRD-Latched.md in place with surgical Edit calls, bump version number, log resolution date in open-questions section.
- Cite v0.X resolutions explicitly in the PRD header and at the top of the open-questions list.
- Ashley chose to include formula in the combo path proactively — do not treat this as clinically controversial; treat it as the correct product decision.
