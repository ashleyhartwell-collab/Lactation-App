# Latched — Action Items

Mark items done by changing `- [ ]` to `- [x]`.
Items marked **🔴 critical path** block v1 launch. Items marked **🐛** are bugs found and fixed. Items marked **⏳ waiting** require advisor or third party input. Items marked **🔵 decision** need Ashley's call before work can proceed.

Last updated: 2026-07-11

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

### Latch Comparison Module — IBCLC Review Checkpoints
*5 required sign-offs before the module can ship. All are blocking. Do not advance to the next checkpoint until the prior one is cleared.*

- [ ] **🔴 ⏳** Advisor: review and approve illustration style guide (anatomy approach, line weight, label style, diversity representation) — must clear before illustration production begins
- [ ] **🔴 ⏳** Advisor: review draft Phase 1–5 animation frames (correct + incorrect panels, 3 breast anatomy variations, cradle and cross-cradle holds) — must clear before animation begins
- [ ] **🔴 ⏳** Advisor: review Phase 6 sucking pattern description and animation (rapid flutter sucks → rhythmic nutritive sucks transition; incorrect panel showing absence of swallow) — confirm clinical accuracy of framing and timing
- [ ] **🔴 ⏳** Advisor: review and approve all callout label text for correct and incorrect panels (plain-language descriptions of: lip flange, areola coverage, chin position, nose clearance, jaw angle, cheek shape, sucking pattern)
- [ ] **🔴 ⏳** Advisor: final clinical sign-off on complete Latch Comparison Module animation before App Store submission — no release without this

---

## IBCLC Design Partners

- [ ] **🔴** Recruit 5-10 friendly IBCLC/doula design partners for referral pilot — one-pager ready in `ibclc-design-partner-onepager.md`
- [ ] Lock names of the 5-10 friendly partners and set outreach timeline
- [ ] Run small pilot of 20-30 referred moms before formal launch to validate B2B2C conversion

---

## Product & Design Decisions
*These are Ashley's calls — they need a decision before the relevant build work can start.*

- [ ] **🔵** Trusted friend / emotional companion direction — review `trusted-friend-concept.md` and make three calls: (1) Which of the 8 feature ideas to pursue for the 90-day build (the doc recommends Anticipatory Guidance + Milestone Memory + scoped Daily Check-In as the low-risk starting point); (2) Whether Friend Mode (open-ended companion chat) goes on the 6-month roadmap or stays deferred; (3) Whether to pursue Dan's B2B angle for Anticipatory Guidance with hospital systems / OB practices as a separate workstream.

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

## Engineering Quality

- [ ] **Edge function unit tests** — Write Jest (or Deno `Deno.test`) unit tests for the four Supabase edge functions: `create-checkout-session`, `verify-payment`, `chat-response`, and `upsert-profile`. Each test should mock the external dependency (Stripe API, OpenAI API) and assert: (a) happy path returns expected shape, (b) missing required fields return 400, (c) downstream API errors return 500 with a message. Place tests in `latched-backend/supabase/functions/__tests__/`. Run with `deno test` or add a `test` script to the backend package.json.

- [ ] **AI response quality eval framework** — Set up PostHog LLM evals (or a lightweight equivalent) to measure chat response quality over time. Minimum viable eval set: (1) 10 golden Q&A pairs covering the most common breastfeeding questions, (2) a coherence check for multi-turn conversations (the "going back" scenario from Flow 3 Q6), (3) a personalization check confirming that `feeding_path` and `baby_weeks_old` are reflected in the response. Evals should run on a cron (weekly or on each deploy) and alert if pass rate drops below threshold. See `qa-test-plan.md` Flow 2 Step 15 and Flow 3 Q6 for the specific failure signals to catch.

---

## Financial Model

*18-month rolling model in `Latched-Financial-Model-v1.xlsx` (v1.1, updated 2026-07-11). 15 sheets: Cover, Assumption Register, Assumptions, Journey Map, GrowthEngine, Revenue, COGS, OpEx, P&L, Scenarios, TAM, Payer Model, Unit Economics, Missing Inputs, Change Log.*

*All numbers formula-driven from the Assumptions sheet. **Blue text = input you can change. Black = formula, do not overwrite. Yellow fill = key lever worth stress-testing.** High-impact cells carry hover comments with source and rationale. **Start with the Assumption Register tab** — it lists every judgment call, its source, and how much to trust it. See the Change Log tab for what changed from v1.0.*

### Completed

**Framework (2026-06-02)**
- [x] **🔴** Build financial model framework — COGS, OpEx, Revenue, P&L, Unit Economics.
- [x] Model two revenue scenarios: B2C direct + B2B2C via IBCLC referral.

**v1.1 build-out (2026-07-11)**
- [x] **🔴** Fill all 17 missing inputs (#1–16 below, all closed).
- [x] **🐛 Bug fix** — LLM cost formula hardcoded `×4 weeks` while the "avg weeks active" cell sat disconnected. Now driver-linked.
- [x] **🐛 Bug fix** — "Other validation costs" OpEx row was a literal `?` and was **excluded from the Total OpEx sum**, so the ruler test / Lovable / legal costs never hit cash. Now wired in (+$530 in M1).
- [x] **🔴 Structural** — Replaced the abstract "15%/month growth rate" with a **mechanistic referral engine**: B2B2C = active IBCLC partners × referrals/partner × referral→paid conversion; B2C = marketing spend ÷ CAC. Growth is now derived from a countable acquisition mechanism, not assumed.
- [x] **Scenarios tab** — Conservative / Base / Aggressive driven by partner-onboarding rate (3 / 5 / 8 per month). Breakeven M13 / M12 / M10.
- [x] **TAM tab** — Top-down sizing from CDC/NCHS (3,628,934 US births, 2024 final) × ~83% breastfeeding initiation (CDC NIS-Child) = ~3.0M TAM population. Confirms **market size is not the constraint** — every scenario captures <0.3% of SAM. Acquisition efficiency is the binding constraint.
- [x] **Payer Model tab** — Self-contained sponsored-coverage scenario (employer / health plan / hybrid subsidy). Does not feed the B2C model.
- [x] **Correction** — Separated **member LTV (one-time — a birth does not renew)** from **contract ARR (recurring — the sponsor gets a new birth cohort every year)**. Earlier framing wrongly implied a per-member subscription.
- [x] **Scope: 15-month, four-peak journey** — extended from 6 weeks → 15 months per CDC NIS-Child weaning data. See Journey Map tab.
- [x] **Journey Map tab** — CDC-sourced evidence base (NIS-Child 2022, n=19,309) for the four engagement peaks and the active-weeks assumption.
- [x] **Audit trail** — Assumption Register (27 live-linked entries with confidence / source / rationale / impact), native hover comments on high-impact cells, Cover read-me, Change Log. Purged 9 stale "Fill in:" notes that contradicted filled cells.
- [x] **Payer value narrative** — `business/Latched-Payer-Value-Narrative.docx`, written for a benefits leader or plan CMO.

### Key findings from the v1.1 work

- **Paid B2C is structurally thin.** At $49, LTV:CAC is only **1.41x** (vs 3x healthy). The **referral channel is 4.24x**. This is why growth is now modeled around IBCLC referral, not paid acquisition.
- **Pricing is the single biggest unlock.** At **$99**, B2C reaches **2.86x** and referral **8.59x**. The 15-month four-peak scope is what justifies the price.
- **The payer route breaks the CAC equation entirely** — the sponsor *is* the distribution, so consumer CAC → $0. One contract ≈ 40 IBCLC partners ≈ 8 months of partner onboarding.
- **Median weaning is ~12 months** (among mothers who pass 6 weeks). A 12-month product would have ended exactly at the median weaning event.
- **Biggest cliff in year one is solids** — 12.9% of remaining mothers stop between month 6 and 7.

### 🔴 MUST VALIDATE — the six placeholder assumptions

*These carry most of the model's risk. All flagged red in the Assumption Register. Everything else is Sourced or Benchmarked.*

- [ ] **🔴** **Referrals per IBCLC per month** (`Assumptions!C18`, currently 3) — core driver of all B2B2C volume. Validate with existing design partners.
- [ ] **🔴** **New IBCLC partners onboarded per month** (`Assumptions!C79`, currently 5) — **THE growth lever.** Nearly all revenue variance traces here.
- [ ] **🔴** **Referral → paid conversion** (`Assumptions!C81`, currently 50%) — a warm handoff from a trusted IBCLC should convert well, but unproven.
- [ ] **🔴** **Willingness to pay** (`TAM!C9`, currently 30%) — largest swing in SAM. Held at 30% by decision, pending the WTP study.
- [ ] **🔴** **Sponsor engagement rate** (`Payer Model!C15`, currently 45%) — drives all per-member sponsor revenue.
- [ ] **🔴** **Contract renewal rate** (`Payer Model!C17`, currently 85%) — biggest swing in contract LTV. No evidence behind it yet.

### 🔵 Decisions needed

- [ ] **🔵** **Price point: $49 vs $69 vs $99.** Price sensitivity is modeled on the Unit Economics tab. $49 does not clear 3x LTV:CAC on paid B2C even at 15-month scope. **Fold into the WTP study.**
- [ ] **🔵** Latch Module illustration scope: full dual-POV ($19K–37K) vs. Mother's POV limited to Phase 5–6 (~$15K–29K). See `BuyVsBuild_Latch_Comparison_Module.docx`. **Still not in the model — potentially the largest single cost.**
- [ ] **🔵** Whether to pursue the payer/employer route now or after the referral channel produces outcomes data. *Recommended sequence: prove engagement + outcomes via IBCLC referral → package the evidence → sell employers → then health plans.*

### Still open

- [ ] Add cash-flow timeline column: map each cost line to the phase/week incurred (aligns with BvB 24-week timeline). Blocked on the illustration scope decision.
- [ ] Set a pre-launch spend ceiling and flag items that would breach it. *Current model: peak cash need is **−$8,277** (Base), breakeven **M12**.*
- [ ] Identify costs deferrable to post-revenue without blocking v1 launch.
- [ ] **Payer ROI calculator** — let a benefits leader plug in their own claims data (avoided ED visits × cost per visit vs. program cost). The pilot section of the value narrative is weak until this exists.
- [ ] Reconcile marketing spend with the growth curve — flat $750/mo against a growing base means implied CAC drifts (M5: $92/signup → M18: ~$6/signup). Acceptable at v1 scale; revisit when spend becomes a real lever.
- [ ] **Note:** founder salary is $0 in the model. **Profitability is pre-founder-compensation.** Deliberate (bootstrap), but a reader must know.

### Closed — the original 17 missing inputs

*All filled 2026-07-11. Retained for traceability; see the Assumption Register for each value's source and confidence.*

- [x] #1 Post-M7 growth rate — **superseded** by the referral engine (growth is now derived, not assumed).
- [x] #2 Paid marketing budget — $750/mo post-launch.
- [x] #3 Smart-FAQ queries/user/week — 4. *(Low impact: LLM cost is ~$0.06/user on Haiku. Margins ~99.9%.)*
- [x] #4 B2B2C CAC — $10.
- [x] #5 B2C CAC high scenario — $65.
- [x] #6 Founder salary — $0 (bootstrap).
- [x] #7 IBCLC outreach cost/month — $75 (runs from M1, pre-launch partner recruiting).
- [x] #8 Supabase upgrade threshold — 500 users *(informational; not wired to COGS)*.
- [x] #9–11 Phase 0 one-time costs — ruler test $300, Lovable $50, WTP $0 (manual), legal $180.
- [x] #12 Moms referred per IBCLC/month — 3. **⚠️ Still a placeholder — see MUST VALIDATE above.**
- [x] #13 Advisor ongoing hours/month — 6 hrs × $75 = $450/mo. *(Main driver pushing breakeven from M9 → M12.)*
- [x] #14–15 Other SaaS $20/mo; contractor budget $0.
- [x] #16 Lovable prototype — $50 one-time.

---

## Deferred / Future — Do Not Act Yet

- [ ] *(v1.1)* Expand FAQ library from 100-150 → 300-500 entries using real query telemetry
- [ ] *(v1.1)* AI vision flange fitting — benchmark accuracy (≥85% within-one-size vs. IBCLC ground truth across 20+ moms) before building
- [ ] *(v1.1)* Medications FAQ category — add once advisor review cadence is established and there's a clear escalation-to-LactMed workflow
- [ ] *(v1.1)* Full weeks 7-12 protocol authoring (defer until engagement data from weeks 1-6 informs which modules matter most)
- [ ] *(v1.1)* RAG-with-refusal chat architecture — preconditions: library ≥500 entries, formal clinical reviewer beyond founding advisor, hallucination-rate tooling in place, legal review
- [ ] *(Phase 2)* NICU/preemie vertical, return-to-work pumping module (months 3-6), Spanish content, live IBCLC integration
- [ ] *(Phase 3)* Formal hospital partnerships with HIPAA BAA, SOC 2, patient-level dashboards

---

## Companion Layer — Trusted Friend (added 2026-05-31)

### Deliverables completed
- `anticipatory-guidance-library.docx` — 25 AG entries, council review (Maya IBCLC + Dr. Keene), 2 HOLD items flagged
- `milestone-memory-library.docx` — 27 ML entries, council review (Maya, Priya, Sofia), zero HOLDs
- `PRD-Latched.md` Section 11 — full companion layer spec (AG, Milestone Memory, Daily Check-In)
- `technical-design-v1.md` Section 8 — SQL migrations, edge function TypeScript, RLS policies, seed approach
- `trusted-friend-backend-plan.md` — senior engineer implementation plan, 3 migrations, 5 edge functions, ~38–46 hr estimate, 5 open questions
- `lovable-trusted-friend.md` — 6 Lovable copy-paste prompts + QA checklist

### HOLDs to clear before shipping AG
- **AG-016** (supply concern tone): Revise opening paragraph per Maya's note — change "most of the time the supply is actually fine" to a softer framing that acknowledges real supply problems. Then run: `UPDATE companion_triggers SET held = false WHERE id = 'AG-016'`
- **AG-023** (IGT/breast reduction): Get specialist IBCLC to confirm day 10-12 weight check escalation threshold. Then run: `UPDATE companion_triggers SET held = false WHERE id = 'AG-023'`

### Backend implementation tasks (per trusted-friend-backend-plan.md)
- [ ] Write `scripts/generate-companion-seed.js` — reads ag-build/content.js + ml-build/content.js, outputs SQL inserts for companion_triggers and companion_content (prerequisite for migrations)
- [ ] Migration 00009 — create companion_triggers, companion_content, pending_companion_items, companion_signals, daily_checkins tables; ALTER user_profiles (feeding_goal, feeding_goal_days, companion_enabled)
- [ ] Migration 00010 — RLS policies for all new tables
- [ ] Migration 00011 — seed companion_triggers + companion_content from generated SQL; HOLD flags set for AG-016 and AG-023
- [ ] Edge function: `evaluate-companion-triggers` (cron every 6 hrs + on-demand; evaluates time-based, profile-based, chat-signal, goal-comparison triggers; writes to pending_companion_items)
- [ ] Edge function: `get-companion-item` (returns highest-priority pending item for user; interpolates [GOAL] tokens)
- [ ] Edge function: `dismiss-companion-item` (marks item dismissed, updates last_sent_at)
- [ ] Edge function: `log-checkin` (one per day max; mood enum: struggling/hanging_in/good_day/small_win; follow-up logic)
- [ ] Update `semantic-search` edge function — add detectCompanionSignals side-effect (fire-and-forget, writes to companion_signals)
- [ ] Update `upsert-profile` edge function — persist feeding_goal and feeding_goal_days

### Lovable UI tasks (per lovable-trusted-friend.md)
- [ ] Prompt 1: Daily Check-In bottom sheet (mood grid, API wiring, follow-up)
- [ ] Prompt 2: AG card (escalation callout, learn more accordion, dismiss tracking)
- [ ] Prompt 3: Milestone Memory card (ML-005/007 premium treatment, share copy, callback line)
- [ ] Prompt 4: Onboarding feeding goal field (required, 5 options, upsert-profile wiring)
- [ ] Prompt 5: Your Journey tab (milestone history list, empty state)
- [ ] Prompt 6: Real backend wiring (CompanionItem type, all endpoints, error handling)

### Path variant work (required before QA)
Entries ML-003, ML-008, ML-012, ML-019 require path-specific message variants (EP path vs. nursing path). companion_content schema has in_app_message_path_b and in_app_message_path_c columns for this. Must be seeded before end-to-end testing.

### Open questions for Ashley (from backend plan)
1. Cron cadence — every 6 hrs is default; reduce to 2 hrs if real-time feel matters for early milestones
2. HOLD management — confirm direct Supabase dashboard SQL is acceptable (no admin UI needed)
3. Callback depth — v1 scoped to check-in history only; full chat-history callback is v1.1 (~4h additional)
4. Analytics events — confirm which companion interactions should fire PostHog events (impression, dismiss, share tap)
5. Share card mechanic — confirm iOS/Android native share sheet vs. copy-to-clipboard only for v1

### Still pending from prior sessions
- [ ] supabase db push (migrations 00001–00008)
- [ ] Redeploy upsert-profile + semantic-search with ANT/PMP embedding rows
- [ ] embed-faq for ANT/PMP rows
