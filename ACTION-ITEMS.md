# Latched — Action Items

Mark items done by changing `- [ ]` to `- [x]`.
Items marked **🔴 critical path** block v1 launch. Items marked **⏳ waiting** require advisor or third party input. Items marked **🔵 decision** need Ashley's call before work can proceed.

Last updated: 2026-05-24

---

## Phase 0 — Validation (next 4-6 weeks)

- [ ] **🔴** Send research survey to 10 moms (Experiment 2) — survey ready in `research-survey-3mo-moms.md`
- [ ] **🔴** Build Lovable + Figma prototype of cold-acquisition → path selection → first protocol flow (Experiment 3)
- [ ] Run Wizard-of-Oz WTP validation ($49 price point)
- [ ] Run printable-ruler accuracy test — recruit 15+ moms to self-measure; compare to IBCLC ground truth; target ≥85% within-one-size accuracy
- [ ] Schedule 5 cold (non-friend) IBCLC validation interviews — script ready in `cold-ibclc-interview-script.md`; probe specifically on "IBCLC-reviewed canned-answer chat" framing
- [ ] Research hospital policies on recommending paid commercial apps at partner institutions

---

## IBCLC Advisor

- [ ] **🔴** Formalize IBCLC advisor agreement — lock signing date, comp structure (equity 0.25-0.5% or $75-150/hr), scope, confidentiality. Scope must reflect ~90-116 hrs of pre-launch review (protocol outline + FAQ library). This gates v1 launch.
- [ ] **🔴 ⏳** Advisor: review and approve protocol outline (`protocol-outline-v1.md`) before module text authoring begins
- [ ] **🔴 ⏳** Advisor: provide top-20 "questions I get texted most at odd hours" — seeds FAQ library Categories 1, 2, 3
- [ ] **⏳** Advisor: confirm clinical threshold language for Category 9 (breast health) escalation entries
- [ ] **⏳** Advisor: decision on nipple shields (Category 13) — "here's how to use safely" vs. "use only with IBCLC guidance first"
- [ ] **⏳** Advisor: confirm paced bottle feeding protocol to cite for Category 11 (formula)
- [ ] **⏳** Advisor: preferred escalation language for Category 14 (emotional wellness / PPD/PPA) — name PPD explicitly or keep general?

---

## IBCLC Design Partners

- [ ] **🔴** Recruit 5-10 friendly IBCLC/doula design partners for referral pilot — one-pager ready in `ibclc-design-partner-onepager.md`
- [ ] Lock names of the 5-10 friendly partners and set outreach timeline
- [ ] Run small pilot of 20-30 referred moms before formal launch to validate B2B2C conversion

---

## Product & Design Decisions
*These are Ashley's calls — they need a decision before the relevant build work can start.*

- [ ] **🔵** Tracker direction: pure utility (Pumpables-style data logging) vs. gamified habit (Flo-style streaks + badges)?
- [ ] **🔵** Path selection placement: at the very start of onboarding vs. after a few warmup assessment questions?
- [ ] **🔵** Printable-ruler approach: device-detection auto-scaled ruler in-app (better UX, more engineering) vs. downloadable PDF the mom prints (simpler, more reliable)?
- [ ] **🔵** Weeks 7-12 "Continue Your Journey" minimum viable extension: what ships at the week-6 graduation screen? Options: 3 intro modules, curated reading list, return-to-work prep guide. Needs to feel real at graduation without requiring full v1.1 authoring scope.
- [ ] **🔵** Direct B2C channel strategy: who is the acquisition voice? Founder-as-face (Ashley on TikTok/Instagram), paid postpartum creators, IBCLC creator partnerships, SEO/content blog, or some combination? Needs a v1 decision before launch.
- [ ] **🔵** Smart-FAQ confidence threshold for refusal pattern: needs pre-launch eval set + threshold-tuning pass to determine where "return canned answer" cuts over to "refuse and escalate." (Can be done late in build phase once library is seeded.)

---

## Smart-FAQ Library Setup

- [x] **🔴** Set up Airtable base (recommended) or Google Sheets for smart-FAQ library — Google Sheets created 2026-05-24. Schema fields are documented in `smart-faq-library-v1.md` Section 3.
- [x] Verify Infant Risk Center phone number is current: 1-806-352-2519 ✓ confirmed. 911 note added to medication refusal text.
- [ ] Seed FAQ library from Experiment 2 survey data (Questions 21-24: what moms said their biggest questions were)
- [ ] Map question coverage gaps using AllStarPediatrics topic list (and similar pediatric practice FAQ pages) as a checklist — do NOT copy answers; author from Tier 1 sources (ABM, LLLI, AAP)
- [ ] Draft 100-150 FAQ entries across 14 categories — input sources: Experiment 2 data, protocol-derived questions, advisor's "3am texts" list
- [ ] **⏳** Advisor: batch review of FAQ library entries, in category order: BRS (Breast Health) first → LAT, SUP, PMP → FLG, OUT, STO, CLN, BRA → FOR, ACC, EMO
- [ ] Set up telemetry logging for below-threshold chat turns (these become the v1.1 expansion backlog)

---

## Protocol Content

- [ ] **🔴** Decide on authoring order: Shared modules → Path A (Exclusive Nursing) → Path B (Exclusive Pumping) → Path C (Combination Feeding)
- [ ] Gather Tier 1 source materials before authoring begins: download relevant ABM protocols (#2, #3, #5, #8, #9, #10, #14, #15, #20, #29), bookmark LLLI topic pages, CDC milk storage guide, Global Health Media videos
- [ ] Draft shared cross-path modules (6 modules) — these unblock all 3 paths
- [ ] Draft Path A modules (18 modules — Exclusive Nursing)
- [ ] Draft Path B modules (21 modules — Exclusive Pumping)
- [ ] Draft Path C modules (21 modules — Combination Feeding, including formula)
- [ ] **⏳** Advisor: batch review all protocol modules (~68-86 hrs total; run in parallel with build phase)
- [ ] **🔵** Decide: cut Path C graduation modules (5 modules) to v1.1 to reduce pre-launch advisor review scope if timeline is tight?

---

## Go-to-Market

- [ ] BSWH (Baylor Scott & White Health) conversation — **do not initiate until after Phase 0 validation is complete**
- [ ] Build B2C landing page variant (no IBCLC attribution; leads with testimonials and path framework hook)
- [ ] Draft IBCLC referral card template (the QR-code discharge card an IBCLC hands to a mom)
- [ ] Draft IBCLC one-line referral script ("Here's what to say verbatim on a 12-patient day")

---

## Agreements & Legal

- [ ] IBCLC advisor agreement (see IBCLC Advisor section above)
- [ ] Informal referral arrangement with the 5-10 friendly IBCLC design partners
- [ ] Stripe account setup + refund policy language
- [ ] Privacy policy (medical-adjacent product; document what data is collected, stored, and how it's used)

---

## Deferred / Future — Do Not Act Yet

- [ ] *(v1.1)* Expand FAQ library from 100-150 → 300-500 entries using real query telemetry
- [ ] *(v1.1)* AI vision flange fitting — benchmark accuracy (≥85% within-one-size vs. IBCLC ground truth across 20+ moms) before building
- [ ] *(v1.1)* Medications FAQ category — add once advisor review cadence is established and there's a clear escalation-to-LactMed workflow
- [ ] *(v1.1)* Full weeks 7-12 protocol authoring (defer until engagement data from weeks 1-6 informs which modules matter most)
- [ ] *(v1.1)* RAG-with-refusal chat architecture — preconditions: library ≥500 entries, formal clinical reviewer beyond founding advisor, hallucination-rate tooling in place, legal review
- [ ] *(Phase 2)* NICU/preemie vertical, return-to-work pumping module (months 3-6), Spanish content, live IBCLC integration
- [ ] *(Phase 3)* Formal hospital partnerships with HIPAA BAA, SOC 2, patient-level dashboards
