# PRD — Lactation Journey App (v0.1 draft)

**Status:** v0.1 working draft. Gaps marked `[NEEDS INPUT]` are awaiting Ashley's answers.
**Last updated:** 2026-05-19

---

## 1. Summary

This document specifies the MVP of a mobile-first consumer app that delivers a "getting started with breastfeeding" guided experience — a 6-week onboarding stepper plus 24/7 async support layer — for first-time moms in the immediate postpartum window. It bridges the gap between expensive, appointment-based IBCLC visits and the inconsistent quality of free 3am workarounds (Reddit, Facebook, TikTok).

---

## 2. Contacts

| Name | Role | Comment |
|---|---|---|
| Ashley | Founder / PM / Designer | Lived-experience founder. `[NEEDS INPUT — full-time or side project?]` |
| `[NEEDS INPUT]` | IBCLC clinical advisor | Not yet recruited. Critical hire — medical credibility and content review depend on it |
| `[NEEDS INPUT]` | Engineering | TBD. Lovable used for MVP prototype |

---

## 3. Background

**The opportunity.** In the United States, 86% of women initiate breastfeeding, but the rate drops to 55% at 6 months and 39% at 1 year. Only 27.2% of US babies are exclusively breastfed through 6 months. The gap between starts and durations represents the largest unmet need in postpartum maternal health: women who *want* to breastfeed but lose the journey to under-supply, latch problems, returning to work, mastitis, or simple lack of guidance.

**The status quo is failing in specific ways.**

- *In-person IBCLCs* cost $150–300/visit, often partially out-of-pocket, with limited weekend/evening availability.
- *Insurance-funded virtual IBCLCs* (Nest Collaborative, SimpliFed) are appointment-based and structurally cannot fill the 3am crisis moment.
- *On-demand video help* (Pacify) is human-staffed, expensive to scale, and not always available within minutes.
- *Free workarounds* (Reddit, Facebook groups, TikTok) are fast and free but wildly inconsistent in quality and never personalized.
- *Tracking apps* (Huckleberry, Pumpables) provide logs but no guidance.

**Why now.**
- The "fourth trimester" framing has reached mainstream awareness; postpartum care is increasingly funded and visible.
- LLMs make protocol-driven personalized async support technically feasible at consumer price points for the first time.
- Wearable pumps (Elvie, Willow) have created a new vertical of pump-related questions that IBCLCs are not optimized to answer.
- Insurance-mandated lactation coverage (ACA) has saturated the *services* category, leaving a clear product-shaped gap for the in-between moments.

---

## 4. Objective

**The goal.** Reduce the drop-off between breastfeeding initiation (86%) and 6-month continuation (55%) by giving first-time moms a guided, on-demand support experience for the first 6 weeks postpartum — the highest-risk window.

**Why this matters to the business.** The 6-week postpartum window is the highest-intent, highest-willingness-to-pay window in maternal consumer health. Solving it well is the wedge into a broader maternal-health platform and a credible path to B2B distribution via employer benefits (Maven-class) or insurance partnerships in a later phase.

### Key Results (MVP launch)

Targets are MVP-phase, not long-term outcome metrics. Long-term outcome KRs (breastfeeding rates at 3/6/12 months) require a longitudinal study not feasible in MVP.

| Metric | Target `[NEEDS INPUT — confirm or adjust]` |
|---|---|
| Paid signups in first 90 days post-launch | 100 |
| Onboarding stepper completion rate (week 1 → week 6) | 40% |
| Median time-to-first-value (signup → first useful protocol delivered) | <10 minutes |
| Self-reported support score (1–10 in-app survey at week 6) | ≥7/10 average |
| 30-day chat engagement (% of paid users who use async chat at least 1×) | 60% |
| Refund rate | <10% |

### Long-term outcome KRs (track but don't gate launch on)

- Increased self-reported breastfeeding continuation at 3, 6, 12 months (measured via opt-in follow-up survey)
- Self-reported satisfaction with breastfeeding journey
- Net Promoter Score from completed-program moms

---

## 5. Market Segment

### Beachhead

**First-time mom, term baby, weeks 0-6 postpartum, struggling.** Specifically:

- US-based `[NEEDS INPUT — confirm geographic scope]`
- First baby (no prior breastfeeding experience)
- Term delivery (not NICU — that's a Phase 2 segment with different needs)
- Weeks 0-6 postpartum (acute crisis window)
- Wanted to breastfeed (intent exists; she's not the "I chose formula from the start" mom)
- Smartphone-comfortable, willing to pay for self-help in a crisis window
- Income: middle-to-upper-middle (out-of-pocket willing); insurance-funded segments come via B2B Phase 2

### Why this segment first

- Highest acute pain (the crisis window)
- Clearest willingness to pay (already pays IBCLCs $150-300, will pay $30-80 for app)
- Most documented need (the 86%→55% drop-off is concentrated in weeks 0-12)
- Easiest content scope (predictable week-by-week protocol)
- Highest emotional residue → word-of-mouth potential

### Constraints

- Mom is sleep-deprived, sometimes in physical pain, often in emotional distress. UX must work in that state — high contrast, low cognitive load, one-thing-per-screen.
- Many decisions are made one-handed at 3am while holding a baby.
- Onboarding must deliver value in <10 minutes — she will not complete a 40-question Noom-style quiz at this life stage.
- Medical-adjacent content carries liability; every piece of advice requires IBCLC review and clear "information, not medical advice" framing.

### Out of scope for MVP

- NICU/preemie moms (different protocol, different acute needs, smaller TAM — Phase 2)
- Return-to-work pumping segment (Phase 2 — months 3-6 trigger)
- Exclusive pumpers (Phase 2)
- Mastitis triage / acute medical issues (Phase 2 — needs deeper clinical integration)
- Combo feeding optimization (Phase 2)
- Bilingual/Spanish content (Phase 2 — critical for BIPOC reach but increases v1 scope)

---

## 6. Value Proposition

### Customer jobs being addressed

**Functional jobs:**
- Learn how to breastfeed correctly in the first 6 weeks
- Diagnose latch problems and supply concerns in the moment
- Know whether what's happening is normal
- Get help at 3am when no human is available
- Understand pump basics (flange sizing, pump frequency, settings) without paying for a separate consult

**Emotional jobs:**
- Feel supported and not alone in the postpartum crisis window
- Feel confident the mom is doing it right
- Reduce the shame of "I should know this already"
- Avoid the feeling of failing her baby

**Social jobs:**
- Tell her partner / mother / friends she has help, with a credible source

### Pains the user avoids

- Spending $150–300 on an IBCLC visit she can't get for 3 days
- Doom-scrolling Reddit at 3am while a baby screams
- Getting contradictory advice from her pediatrician, mother, and TikTok
- Stopping breastfeeding before her own goal because she couldn't get the right answer in time
- The shame spiral of asking "is this normal" when there's no one to ask

### Gains the user gets

- A clear, week-by-week protocol that adapts to her situation
- Async chat available 24/7 with vetted, protocol-grounded answers
- A sense that someone designed this *for her*, not for a general audience
- A graduation moment at week 6 — proof she made it through the hard part

### Where we win vs. competitors

| Competitor | Where they win | Where we win |
|---|---|---|
| Nest Collaborative / SimpliFed | Free via insurance, real IBCLC | We're available at 3am with no appointment; we follow up between their visits with daily protocol |
| Pacify | On-demand human video | Lower cost; protocol-driven (not reactive); async means we work even when staff is overloaded |
| Huckleberry, Pumpables | Massive distribution, free | We're guidance-first not tracking-first; we deliver an outcome (you breastfed for 6 weeks), they deliver a log |
| Reddit, TikTok, FB groups | Free, fast, human | Personalized to her week and situation; IBCLC-vetted; not noise |

### Value Curve framework

Where we deliberately invest, hold flat, and reduce compared to existing solutions:

- **Raise:** speed at 3am (instant), personalization (your week, your pump, your baby), confidence (IBCLC-vetted), graduation moment (you made it)
- **Hold:** trustworthiness of content (parity with IBCLC standard)
- **Reduce:** appointment friction, cost, reactive-only support, generic content
- **Eliminate:** the 3am alone-in-the-dark moment

---

## 7. Solution

### 7.1 UX / Prototypes

**Status:** Lovable rapid prototype in progress for the onboarding stepper. Figma design references in `design-references.md`. Two best-in-class inspirations being studied: Noom (structure), Headspace (tone).

**Core flows for v1:**

1. **Cold acquisition → assessment → personalized protocol**
   - Land → 5-min assessment (week postpartum, birth context, current concerns, pump owned, goals) → personalized week-1 protocol → paywall
2. **Week-by-week guided protocol**
   - Daily check-in (30 sec, optional) → today's focus module → optional deeper content → "is this normal?" quick check
3. **Async chat for between-protocol questions**
   - Conversational entry → AI-drafted, IBCLC-vetted response → "talk to a human" escalation path (where available)
4. **Graduation at week 6**
   - Summary of journey → optional opt-in for Phase 2 modules → request for testimonial / referral

**To produce in next sprint:** Figma high-fidelity prototype of the cold-acquisition → first-protocol flow (Experiment 3).

### 7.2 Key Features (MVP)

**Must-have for launch:**

1. **5-minute assessment** that produces a personalized week-1 protocol. Question types: situation (week postpartum, birth context), pain points (current concerns), context (pump owned, supply pattern), goals (duration, exclusivity).
2. **Week-by-week protocol** for weeks 1–6 postpartum. Each week has 3-5 short modules (read/watch/do), a daily check-in, and a "what's normal this week" reference.
3. **Async chat** — text-based, available 24/7. Protocol-grounded answers with sourced IBCLC-reviewed content. `[NEEDS INPUT — AI strategy: AI-first with IBCLC review, manual Wizard-of-Oz, hybrid, none?]`
4. **Flange sizing tool** — guided self-measurement with visuals and pump-specific size recommendations. (Heavily underserved by IBCLCs; defensible wedge.)
5. **"Is this normal?" quick-reference library** — searchable, week-stratified.
6. **Pump library** — settings, schedules, and FAQs by major pump brand (Spectra, Medela, Elvie, Willow, Momcozy).
7. **Graduation experience at week 6** — celebratory summary, next-step guidance, opt-in to extended modules.

**Explicitly NOT in MVP:**

- Live video calls with IBCLCs (Phase 2 — major scope)
- Latch analysis from photo/video (technical risk too high for MVP)
- Community features / forums (moderation cost, brand risk)
- Bilingual content (Phase 2)
- B2B / employer benefits backend (Phase 2)
- Outcome data sharing for insurance partners (Phase 2 — but data architecture for it must be in v1)
- NICU / preemie protocol (Phase 2 vertical)

### 7.3 Technology

- **MVP prototype platform:** Lovable (web app, rapid iteration) `[NEEDS INPUT — confirm web-first or mobile-native first?]`
- **Design system:** shadcn/ui (Figma + code) — see `design-references.md`
- **Async chat layer:** `[NEEDS INPUT — LLM strategy. Options: OpenAI/Anthropic with custom system prompt + RAG over IBCLC-reviewed content library; manual responses for Wizard-of-Oz validation phase; hybrid AI-draft-human-review]`
- **Data architecture requirements:** HIPAA-ready (even if not HIPAA-covered at MVP); clinical content review trail; outcome tracking infrastructure that B2B buyers will eventually require

### 7.4 Assumptions (to be validated)

Every one of these is something we believe but have not yet proven:

1. Moms in the 0-6 week window will pay $30–80 one-time for self-help support. *Validation: Experiment 1 (Wizard-of-Oz, $30 ask).*
2. Async text-based support is acceptable at the 3am crisis moment (vs. demanding a human voice). *Validation: Experiment 2 (research survey Q21-24).*
3. A linear stepper metaphor will sustain engagement through week 6 without high drop-off. *Validation: Experiment 3 (Figma prototype usability test).*
4. AI-generated, IBCLC-reviewed responses are good enough to feel trustworthy. *Validation: post-MVP qualitative interviews + escalation rate to "talk to a human."*
5. The week-1 protocol can be sufficiently personalized from a 5-minute assessment to feel "made for me." *Validation: post-MVP NPS + retention.*
6. Insurance-funded competitors (Nest, SimpliFed) won't add an equivalent async layer within 18 months. *Validation: continuous competitor monitoring.*
7. A solo founder can credibly launch medical-adjacent consumer health without an IBCLC co-founder. *Validation: hire/partner with IBCLC advisor before MVP launch.*

---

## 8. Release

### Phase 0 — Validation (current, 4-6 weeks)

- Experiment 2: research survey (in progress)
- Experiment 3: Figma + Lovable prototype of cold-acquisition → first-protocol flow
- Recruit IBCLC clinical advisor
- Validate willingness-to-pay via Wizard-of-Oz

### Phase 1 — MVP launch `[NEEDS INPUT — confirm timeframe]`

- Full week-1 through week-6 protocol library (IBCLC-reviewed)
- Assessment + personalized stepper
- Async chat (`[NEEDS INPUT — AI strategy]`)
- Flange sizing tool
- "Is this normal" reference library
- Pump library for top 5 brands
- Payment + checkout
- Outcome data instrumentation (for Phase 3 B2B foundation)

### Phase 2 — Expansion (6-12 months post-launch)

- NICU / preemie protocol vertical
- Return-to-work pumping module (months 3-6 trigger)
- Spanish-language content
- Live video IBCLC integration (partnerships or in-house)
- Combo feeding optimization module
- Mastitis triage with clinical handoff

### Phase 3 — B2B / Distribution (12-18 months post-launch)

- Employer benefits packaging (Maven-class)
- Insurance partnerships (ACA-covered model)
- Outcome data dashboard for buyers
- HIPAA compliance formal certification

### Estimated timeline to Phase 1 MVP launch

`[NEEDS INPUT — Ashley's target. Realistic estimate from a solo founder with Lovable + a recruited IBCLC: 4-6 months from validation completion.]`

---

## Open questions for v0.2 of this PRD

1. Product name and brand identity
2. Founding team composition and IBCLC advisor recruitment plan
3. Exact pricing model and price point
4. AI strategy for the async chat layer
5. Web vs. native platform decision
6. Timeline to MVP launch
7. Geographic launch scope (US only? US + CA? English-speaking?)
8. Specific MVP Key Result targets — confirm or adjust the proposed numbers in Section 4
