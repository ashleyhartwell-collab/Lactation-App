# PRD — Latched (v0.9)

**Status:** v0.9. Added direct B2C as co-equal launch channel alongside B2B2C. Combo path expanded to include formula (combination feeding: nursing + pumping + formula). 6-week vs. 12-week program length analyzed; recommendation is 6 weeks at v1 with a free weeks 7-12 "continue your journey" extension module (no price change, no launch-blocking scope). Smart-FAQ chat in Tier 1; v1.1 = library expansion + RAG-with-refusal exploration. Printable-ruler flange in v1; AI vision flange in v1.1.
**Last updated:** 2026-05-24

---

## 1. Summary

Latched is a mobile-first responsive web app that helps first-time moms succeed in the first 6 weeks of breastfeeding. It combines path selection (exclusive nursing, exclusive pumping, or combination feeding), a personalized 6-week protocol with embedded crash-course education snippets, virtual flange fitting for pumping moms, and basic feed/pump tracking. **Go-to-market operates on two parallel channels from day one: (1) B2B2C via hospital and outpatient IBCLCs who recommend Latched at discharge — solving the IBCLC's own pain point ("I lose all my patients after one visit") while reaching moms at highest-intent; and (2) direct B2C via paid and organic digital acquisition (Meta, SEO, organic search, postpartum creator content).** The two channels complement rather than cannibalize: B2B2C delivers trust-transferred, high-conversion referrals; B2C delivers scale and data independently of IBCLC partner availability. Moms remain the paying customer at $49 one-time on both channels.

---

## 2. Contacts

| Name | Role | Comment |
|---|---|---|
| Ashley | Founder, PM, Designer, builder | Solo founder. Lived-experience user. |
| **(In progress)** | IBCLC clinical advisor + design partner | Several IBCLC and doula friends acting as informal thought partners; one likely to formalize as advisor + clinical reviewer in the next 4-6 weeks. Critical to lock in scope, comp, and confidentiality before content authoring begins. |

---

## 3. Background

In the US, 86% of women initiate breastfeeding but the rate drops to 55% at 6 months and 39% at 1 year. Only 27.2% of US babies are exclusively breastfed through 6 months. The drop-off is concentrated in the first 6 weeks postpartum — the crisis window when latch problems, supply concerns, and lack of guidance turn intent into failure.

**The status quo is structurally failing in specific ways:**

- *In-person IBCLCs* cost $150–300/visit, partially out-of-pocket, with limited evening/weekend availability.
- *Insurance-funded virtual IBCLCs* (Nest Collaborative, SimpliFed) are appointment-based and cannot fill the 3am gap.
- *On-demand video help* (Pacify) is human-staffed and not always available within minutes.
- *Free workarounds* (Reddit, Facebook, TikTok) are fast and free but inconsistent and never personalized.
- *Tracking apps* (Huckleberry, Pumpables) log behavior but provide no guidance or path adaptation.
- **The discharge handoff is broken.** Hospital IBCLCs see a mom 1-2 times, hand her a printed packet, and lose visibility entirely. Outpatient IBCLCs and pediatricians inherit the gap with no information transfer. There is no tool today that lets an IBCLC follow her patient through the first 6 weeks at home.

**Why now:**
- The "fourth trimester" framing has reached mainstream awareness.
- LLMs make protocol-driven personalized async support technically feasible at consumer prices for the first time.
- Vision LLMs (Claude / GPT-4 vision class) make on-device-feeling photo analysis feasible without custom ML training.
- Wearable pumps (Elvie, Willow) have created a new vertical of pump questions IBCLCs are not optimized to answer.
- ACA-mandated lactation coverage has saturated the *services* category, leaving a product-shaped gap for between-appointment moments.
- **Hospital IBCLCs are openly frustrated about their inability to follow up post-discharge.** That frustration becomes Latched's distribution moat — recommending Latched solves their problem too.

---

## 4. Objective

Reduce the drop-off between breastfeeding initiation and 6-month continuation by giving first-time moms a guided, personalized, on-demand support experience for the first 6 weeks postpartum — distributed through the IBCLCs they already trust and directly to moms through digital channels.

### Key Results — MVP launch + first 90 days

Right-sized for a solo-founder build. Long-term outcome KRs (continuation at 3/6/12 months) require longitudinal follow-up and are tracked but not gated on.

| Metric | Target | Note |
|---|---|---|
| Paid signups in first 90 days post-launch | 100 | ~$4,900 gross revenue at $49 |
| **Partnered IBCLCs at launch** | **5-10** | **Friendly design partners pre-recruited; signed informal referral arrangement** |
| **% of paid signups attributed to IBCLC referral** | **≥40%** | **Validates the B2B2C distribution thesis; remaining ≥60% comes from direct B2C** |
| **Direct B2C CAC (paid + organic combined)** | **<$30** | **Benchmark: postpartum Meta CAC $30-80; target organic/content to pull blended cost under $30** |
| Onboarding stepper completion rate (weeks 1 → 6) | 40% | Headline product metric |
| Time-to-first-value (signup → first protocol delivered) | <10 min | Critical for stressed-mom UX |
| Path-selection completion in onboarding | 90% | Validates the path framework |
| Tracker engagement (% of paid users logging ≥3 events in week 1) | 60% | Habit-formation moat + data pipeline for personalization |
| Flange tool usage (% of pumping-path users completing fitting) | 50% | Validates the flange wedge — printable-ruler-based in v1 |
| Self-reported support score at week 6 (1–10) | ≥7/10 | In-app micro-survey |
| Refund rate | <10% | Direct WTP signal |
| Chat engagement | 60% of paid users use chat 1+ times in first 14 days | Validates the 3am wedge |
| Chat match rate | ≥70% of chat sessions return a matched vetted answer (vs. refusal-to-human) | Validates smart-FAQ library coverage |

### Tracked but not gated

- Self-reported breastfeeding continuation at 3, 6, 12 months (opt-in follow-up)
- NPS from graduated users
- Referral rate (mom-to-mom organic)
- Tracker data volume per user (input for future personalization models)
- IBCLC NPS / retention as referrers (do they keep referring after their first 5 patients?)

---

## 5. Market Segment

### Primary customer (paying): the mom

First-time mom, term baby, weeks 0-6 postpartum, US-based, smartphone-comfortable, intent to feed (in any of the three forms: exclusive nursing, exclusive pumping, or combination feeding — which may include formula), willing to pay $49 out-of-pocket in a crisis window. Income middle to upper-middle.

**Two acquisition modes for the same customer:**
- **IBCLC-referred:** arrives via QR code from her IBCLC at discharge; sees her IBCLC's name on the landing page; high trust, high conversion
- **Direct (B2C):** arrives via paid Meta/Instagram/TikTok, organic search, postpartum creator content, or word-of-mouth; cold arrival; conversion depends on landing page, testimonials, and assessment quality

Both modes target the same mom. Product experience is identical. Attribution is tracked from the first URL touch.

### Distribution channel (non-paying, partnered): the hospital IBCLC

Hospital lactation consultants and outpatient IBCLCs who see moms at discharge or in the first 2 weeks postpartum. They are *not* the buyer — Latched stays free for them at v1. They are the trusted voice that converts a stressed mom from a paid Meta ad CPM into a "my IBCLC recommended this" warm referral. They get value from:

- **Their patients have better continuity post-discharge** — they look better; outcomes improve; less guilt about losing patients
- **A lightweight visibility tool** (Tier 2 dashboard) showing aggregate engagement metrics for moms who used their referral code
- **A vetted thing to recommend** that doesn't compete with their own practice (Latched is async, async chat doesn't replace 1:1 IBCLC visits, the protocol complements rather than substitutes)

### Why this two-sided structure now

Insight: the IBCLC's biggest unmet pain is *losing the patient at discharge*. Latched's biggest distribution challenge is *trust at the moment of acquisition*. These pains are reciprocal. Recommending Latched solves both sides simultaneously, which is the structural condition for a sustainable B2B2C channel.

### Why this segment first

Highest acute pain (mom side), clearest willingness to pay (mom side), easiest content scope (predictable week-by-week protocol per path), highest emotional residue → word-of-mouth potential, and an IBCLC channel that scales without enterprise sales motion.

### Constraints on the design

Mom is sleep-deprived, often in physical pain, often in emotional distress, frequently one-handed at 3am. UX must work in that state: high contrast, low cognitive load, one-thing-per-screen, voice-input-friendly, mobile-first. **Tracking and check-ins must be ≤2 taps from the home screen** and accept partial/skipped data — perfectionism is the enemy of habit at this life stage.

For the IBCLC: the referral flow must be drop-dead simple. A QR code on a discharge card and a one-line script the IBCLC can say verbatim. Anything more friction-y will not survive a 12-patient day.

### Out of scope for MVP

NICU/preemie protocol, return-to-work pumping segment (months 3-6), mastitis triage, bilingual content, latch analysis from photo/video (Q&A only in phase 1), community/forum features, hospital-procurement-grade B2B SaaS (HIPAA-BAA-required IBCLC dashboard with patient-level visibility — that's Phase 3 if at all).

---

## 6. Value Proposition

### Mom's jobs

**Functional jobs:**

1. **Get a simple crash course on breastfeeding and pumping** — quick educational snippets that teach the how, when, common problems, and FAQs. Not full long-form content. The snippets cover:
    1. Diagnose common latch and supply problems in the moment (Q&A-based, no photos/videos in phase 1)
    2. Understand normal output expectations by week
    3. Access vetted answers to common 3am questions through async chat that returns IBCLC-reviewed canned responses (smart-FAQ pattern — see Section 7.3) plus the embedded protocol and snippet library
    4. Understand pump basics
    5. Milk storage 101 and how to store / clean pump parts
2. **Choose a path** — exclusive nursing, exclusive pumping, or combination feeding (nursing + pumping + formula) — and receive a custom 6-week protocol matched to that path
3. **Virtual flange size fitting using AI** (photos and videos are protected and never shared) — for moms on the pumping or combo paths
4. **Track basic breastfeeding metrics** (data feeds future recommendation and personalization models):
    1. Number of feeds per side
    2. Minutes per side (nursing or pumping)
    3. Number of pumps per side
    4. Output (optional): weighted feeds for nursing, volume pumped for pumping

**Emotional jobs:** feel supported and not alone, feel confident, reduce shame, avoid feeling like she's failing her baby.

**Social jobs:** tell her partner and family she has credible help.

### IBCLC's jobs (the distribution partner)

**Functional jobs:**

1. **Refer a vetted resource to discharged patients without competing with own practice.** Latched extends, not replaces, the IBCLC relationship.
2. **See basic engagement metrics for referred patients** (Tier 2 dashboard) — aggregate, anonymized, no patient-level PHI in v1.
3. **Reduce post-discharge anxiety** — knowing that a referred mom has 24/7 protocol guidance is less guilt than knowing she has nothing.

**Emotional jobs:** feel like a better clinician (continuity of care), reduce burnout from losing patients, professional pride in recommending a high-quality tool.

**Social jobs:** look good to nursing leadership / department head ("my patients have better outcomes than the unit average").

### Pains the mom avoids

- $150–300 IBCLC visits she can't get for 3 days
- Doom-scrolling Reddit at 3am while a baby screams
- Contradictory advice from pediatrician vs. mother vs. TikTok
- Stopping breastfeeding before her own goal because the right answer wasn't available in time
- Guessing flange size and damaging her nipples for weeks before realizing the standard 24mm doesn't fit her
- Switching between four apps to track feeds, manage her pump, learn how to combo feed, and look up "is this normal?"

### Pains the IBCLC avoids

- The "I'll never know what happened to her" guilt at discharge
- Patients calling the hospital lactation line at 3am with non-emergencies that would be better served by an app
- Recommending generic apps (Huckleberry) that aren't lactation-focused, or competing services (Nest) that might poach the patient relationship

### Where Latched wins

| Competitor | Where they win | Where Latched wins |
|---|---|---|
| Nest Collaborative / SimpliFed | Free via insurance, real IBCLC | No appointment, instant, path-specific protocol that follows up daily; *recommended by the mom's own IBCLC* |
| Pacify | On-demand human video | Lower cost, protocol-driven not reactive, works when staff is overloaded |
| Huckleberry, Pumpables | Massive distribution, free tracking | Path selection + guidance + AI flange sizing + tracking in one product; *clinician-endorsed* |
| Reddit, TikTok, FB groups | Free, fast, human | Personalized to her path and week; IBCLC-vetted and IBCLC-recommended |
| In-store flange measurement | In-person human | Free with subscription, available at 11pm, no appointment, no shame |

---

## 7. Solution

### 7.1 UX / Prototypes

- **Platform:** responsive web, built in Lovable. Mobile-optimized as the primary form factor.
- **Design system:** shadcn/ui (see `design-references.md`).
- **Inspirations:**
  - **Noom** — structure of the assessment → personalized program
  - **Headspace** — emotional tone for the stressed user
  - **Flo** — regular check-ins, daily logging UX, symptom/feeling capture, gentle re-engagement
- **Prototype status:** Lovable rapid prototype of the onboarding stepper in progress (Experiment 3).

**Core flows for v1:**

1. **IBCLC-led acquisition.** IBCLC hands mom a discharge card with QR code → mom scans → lands with IBCLC's name/photo on the landing page ("Recommended by Sarah, IBCLC at Memorial Hospital") → 5-min assessment + path selection → personalized week-1 protocol → $49 paywall. The IBCLC's name on the landing page is the conversion driver.
2. **Direct B2C acquisition** (paid ads, organic search, creator content). Mom lands cold via Meta/Instagram/TikTok/SEO → same assessment + path selection → personalized week-1 protocol → $49 paywall. Landing page leads with testimonials and the path framework as the hook; no IBCLC attribution. Same product, same price, same checkout. This channel operates in parallel from day one — no dependency on IBCLC partner availability.
3. **Daily check-in + week-by-week protocol.** Daily check-in (Flo-style, 30 sec, optional) → today's focus module → embedded crash-course snippets → log feeds/pumps if you want.
4. **Tracking — feed and pump logging.** ≤2 taps from home: pick side, start timer or enter minutes, optional output. History view shows the last 7 days.
5. **AI virtual flange fitting (for pumping or combo paths).** Guided photo capture (with visible privacy commitments) → AI sizing recommendation → compare-against-printable-ruler fallback → pump-brand-specific notes.
6. **Async smart-FAQ chat layer.** Conversational entry → foundation model semantically matches to the closest pre-vetted Q&A in the IBCLC-reviewed library → returns the canned answer verbatim. If no confident match: refusal pattern ("I don't have a vetted answer for that — here's how to reach a human"). Model never generates novel medical content.
7. **Graduation at week 6.** Summary of journey, tracker insights, opt-in for Phase 2 content, request for testimonial/referral.

**IBCLC flow (v1 minimum):**

8. **IBCLC referral signup.** IBCLC signs up at a separate URL (`latched.com/clinicians`) with name, credentials, hospital/practice, email → receives a unique referral code + printable QR card → can distribute physically or digitally.

### 7.2 Key Features

**Tier 1 — non-negotiable for launch:**

1. **5-minute assessment + path selection** — produces personalized week-1 protocol matched to one of three paths (exclusive nursing, exclusive pumping, combination feeding (nursing + pumping + formula)).
2. **Path-specific 6-week protocol** — for each path, weeks 1-6 of modules. Each module short, mobile-first, with embedded crash-course snippets. The combination feeding path explicitly covers formula (safe prep, paced bottle feeding to protect supply and prevent nipient preference, guilt-free framing of formula as a tool, how to combo-feed in a way that preserves nursing if desired). Snippets across all paths cover: latch/supply diagnosis Q&A, weekly output expectations, pump basics, milk storage, pump-parts cleaning.
3. **Printable-ruler flange sizing tool** — guided self-measurement with high-quality illustrations, mom downloads or screenshots a 1:1 printable ruler scaled to her device, measures privately, inputs result, gets pump-brand-specific size recommendation (Spectra, Medela, Elvie) and pump-setting notes. Zero photo upload required, zero AI dependency. *AI vision-based version benchmarked in parallel for v1.1.*
4. **Basic feed/pump tracker** — feeds per side, minutes per side (nursing or pumping), pumps per side, optional output (weighted feed for nursing or volume for pumping). 7-day history view, simple daily/weekly summary chart.
5. **Daily check-in** (Flo-style) — single screen, optional, three-tap: today's biggest concern, how you're feeling (1-5), any wins. Used to surface contextual snippets and route to relevant protocol modules.
6. **Smart-FAQ async chat** — pre-vetted IBCLC-reviewed Q&A library (100-150 entries at v1, seeded from the most common protocol questions and the 3am wedge themes from Experiment 2). Foundation model (Claude Haiku or GPT-4o-mini) used *only* for semantic matching of the user's question to the closest vetted entry; returns the canned answer verbatim. Confidence threshold gates the response; below threshold, returns a refusal/escalate message with a clear path to a human (hospital lactation line, IBCLC directory link, or — for partnered IBCLCs — that IBCLC's preferred contact method). LLM never generates novel medical content. IBCLC advisor reviews the library *once* before launch, not per-response.
7. **IBCLC referral tracking** — each partnered IBCLC receives a unique referral URL (`latched.app/r/[ibclc-slug]`) and a matching QR code for discharge cards. The slug is captured at first app entry and persisted in `localStorage` through the full onboarding and paywall flow. At the paywall, a light badge ("Recommended by [IBCLC Name], IBCLC") is conditionally rendered when a valid, active referral source is detected. On payment, the referral is marked converted with a timestamp and amount. This data feeds per-IBCLC partnership reporting: total referrals, conversions, and conversion rate. See Section 7.7 for full data model, capture flow, and acceptance criteria.
8. **Graduation experience at week 6** — celebratory summary, tracker insights ("here's what your supply did"), testimonial ask.
9. **Stripe checkout** at $49 one-time. Refund policy clearly stated.

**Tier 2 — ship if scope allows:**

10. **IBCLC dashboard (lite)** — IBCLCs see aggregate, anonymized metrics for moms who used their code: total signups, week-1 completion rate, week-6 graduation rate, aggregate NPS. No patient-level PHI in v1. This is the loop that keeps IBCLCs referring; without it, referral motivation decays.
11. **Pump library** for 2-3 top brands beyond what's already in the flange tool's brand notes.

**Explicitly NOT in MVP (deferred to v1.1 or later — see Section 10 for the post-launch chat-architecture roadmap):**

- **Free-form generative chat with RAG + refusal patterns** — deferred to v1.1+. Higher coverage than smart-FAQ but introduces hallucination risk and requires per-response safety review. See Section 10.
- **Healthcare-tailored / lactation-specific LLM** — deferred indefinitely. No commercial lactation-tuned model exists; open-source medical LLMs are PubMed-shaped, not patient-communication-shaped. Revisit only if a credible option emerges or post-launch volume justifies investment. See Section 10.
- **AI vision-based flange fitting** — deferred to v1.1 pending accuracy benchmark (must hit ≥85% within-one-size accuracy against IBCLC ground truth across 20+ moms). Printable-ruler version is the v1 default.
- "Is this normal?" standalone searchable reference library — covered by embedded snippets and smart-FAQ chat in v1; standalone searchable library ships in v1.1.
- Live video calls with IBCLCs
- Photo/video-based latch analysis (intentionally Q&A only in phase 1)
- Community/forum features
- Bilingual content
- Hospital procurement-grade B2B SaaS (HIPAA BAA, SOC 2, patient-level dashboard with PHI) — explicit non-goal at MVP
- NICU/preemie content
- Mastitis triage with clinical handoff

### 7.3 Technology

- **Frontend:** Responsive web via Lovable. Mobile-first layout. Tracker UI optimized for one-handed use.
- **Backend / data:** Lovable defaults at MVP for app data; tracker events stored with a forward-compatible schema (event-based, with side, duration, output) so the data is usable for future personalization models. HIPAA-ready architecture even though not formally HIPAA-covered at launch: audit trails, no PHI in URLs, separation of content from user-identifying data.
- **Flange sizing tool (v1):** Printable-ruler-based. Device-aware scaling (the app detects screen size and renders a 1:1 ruler at correct physical dimensions) OR a downloadable PDF the mom prints at home. Guided self-measurement with high-quality illustrations. No photo upload, no AI dependency, no privacy infrastructure cost. *V1.1 AI vision upgrade (Claude Sonnet vision or GPT-4o vision) planned pending accuracy benchmark — see Phase 0 work.*
- **Chat layer (v1):** *Smart-FAQ pattern* — pre-vetted IBCLC-reviewed Q&A library (100-150 entries at launch), small foundation model (Claude Haiku or GPT-4o-mini) used only for semantic matching of the user's question to the closest vetted Q&A, returns the canned answer verbatim. The model never generates novel medical content; hallucination risk is essentially zero. Confidence threshold gates the response; below threshold, return a refusal/escalate message: "I don't have a vetted answer for that — here's how to reach a human." IBCLC reviews the library *once* pre-launch (~20-30 hours), not per-response. **Telemetry on every below-threshold turn becomes the input for v1.1 library expansion** — the questions moms actually ask are the corpus you want, not the ones you guessed at. *Why not a custom or healthcare-tailored model:* (a) no lactation-tailored LLM exists commercially; (b) open-source medical LLMs (Meditron, BioMistral, PMC-LLaMA) are trained on PubMed academic literature, not patient-communication safety, and would underperform a frontier model on this use case; (c) building proprietary requires $20-50k+ in compute/curation and an ML engineer; (d) Hippocratic AI is enterprise-only. Future-state alternatives (RAG with refusal, healthcare-tailored model) are explored in Section 10.
- **Payments:** Stripe.
- **Referral attribution:** Unique slug per IBCLC (e.g. `latched.com/r/sarah-memorial`); resolves to landing page with IBCLC's name; cookie/localStorage persists code through signup funnel; attribution recorded against the mom's account permanently.
- **Analytics:** PostHog or similar for funnel + retention. Tracker events instrumented as both product analytics and the data foundation for future personalization (Phase 2+).

### 7.4 Assumptions (to be validated)

1. Moms in the 0-6 week window will pay $49 one-time. *Validation: Experiment 1, Wizard-of-Oz.*
2. Async text support is acceptable at 3am vs. demanding a human voice. *Validation: Experiment 2 survey, Q21-24.*
3. A path-specific 6-week protocol sustains engagement better than a one-size-fits-all protocol. *Validation: Experiment 3 prototype usability test + post-MVP retention by path.*
4. **Smart-FAQ-pattern chat feels conversational enough to be useful at v1 launch.** Risk: the pre-vetted library coverage is too narrow and moms hit the refusal pattern too often, eroding trust before the library can be expanded. *Validation: post-launch, % of chat sessions returning a matched vetted answer; target ≥70%. Below-threshold queries instrumented as the v1.1 expansion backlog.*
5. Solo non-clinical founder can credibly launch medical-adjacent health product. *Validation: IBCLC advisor formalized within 4-6 weeks (Ashley's existing friends → formal partner).*
6. A 5-minute assessment is rich enough to feel "made for me" once path selection does most of the heavy lifting. *Validation: NPS + retention post-launch.*
7. **Moms will reliably and accurately self-measure using a printable ruler at home.** Inaccuracy here causes the same downstream harm as a wrong AI recommendation. *Validation: pre-launch usability test with ≥15 moms; compare self-measurement to IBCLC ground truth; target ≥85% within-one-size accuracy.* (Note: vision LLM accuracy assumption moves to v1.1 validation.)
8. **Mothers will tolerate intimate-photo upload to an app from a no-name brand — v1.1 only.** Deferred from v1 with the printable-ruler decision. *Validation: opt-in rate at the flange tool once AI version ships in v1.1; target ≥60% of pumping-path users initiate.*
9. Tracking adoption sustains beyond week 1. *Validation: % of paid users still logging weekly in week 4.*
10. **NEW: Hospital and outpatient IBCLCs will recommend a paid app to their patients.** Conflict-of-interest concerns, hospital policies, and IBCLC professional norms might block this even if the IBCLC personally believes in the product. *Validation: 5-10 friendly IBCLC partners pre-recruited; small pilot of 20-30 referred moms before formal launch.*
11. **NEW: An IBCLC-recommended signup converts at meaningfully higher rates than a cold paid-ad signup.** Hypothesis: 3-5x higher conversion. *Validation: A/B comparison of code-attributed vs. organic/paid funnel in the first 90 days.*
12. **NEW: IBCLCs keep referring after their first 5 patients.** Without sustained referral motivation, the channel collapses. *Validation: IBCLC retention as referrer at month 3.*
13. Insurance-funded competitors don't add an async layer in the first 18 months. *Validation: ongoing competitor monitoring.*

---

## 7.5 Smart-FAQ Chat — Semantic Match Confidence Scoring

### Background and Motivation

Every time a user sends a message in the Latched chat, the system maps that message to the closest entry in the IBCLC-reviewed FAQ library using semantic similarity. The accuracy of that mapping determines whether a mom at 3am gets a vetted answer that helps her or a refusal that sends her back to Reddit. Getting this wrong in the unsafe direction — returning a low-quality match with high confidence — is the primary clinical risk in the smart-FAQ architecture. Getting it wrong in the overly conservative direction erodes product trust and undermines the value of the chat feature.

This section specifies how confidence is measured, how it is tiered into actionable outcomes, what happens at each tier, and what is logged. These are v1 launch requirements, not post-launch research — the system must be calibrated and behave correctly on day one.

### Recommended Scoring Approach: Cosine Similarity of Dense Embeddings

**Recommended approach:** cosine similarity of dense vector embeddings, using a small general-purpose embedding model (OpenAI `text-embedding-3-small` or Anthropic's embedding API) applied to the `question_variants` field of each FAQ entry. Pre-computed entry vectors are stored in a vector database; at query time, the user's question is embedded and compared against all stored vectors using cosine similarity. The highest-scoring match's confidence tier determines the system response.

**Why cosine similarity over alternatives:**

*vs. keyword/BM25 matching:* Moms in the postpartum window rarely phrase questions in clinical language. A mom typing "my nipple looks like a tube of lipstick after nursing" and a library entry covering "lipstick-shaped nipple after feeds" will be correctly matched by embedding-based cosine similarity even though the surface text is quite different. BM25 would miss or rank this poorly.

*vs. a cross-encoder or reranker model:* Cross-encoders are more accurate for ambiguous cases but require running inference on every candidate pair at query time — O(n) inference calls per user message, adding latency and cost at scale. At v1 library size (100-150 entries), cosine similarity over pre-computed vectors is fast, cheap, and accurate enough. Cross-encoder reranking is the right upgrade at v1.1 if post-launch match-accuracy analysis shows consistent near-miss failures in a specific category. Add it then, not before.

*vs. a tiered hybrid (BM25 + embedding rerank):* More sophisticated, premature for this library size, and adds implementation complexity for a solo-founder build with a tight runway. Revisit when the library exceeds 500 entries and a pattern of coverage gaps emerges that cosine-only can't close.

**Infrastructure recommendation:** pgvector on PostgreSQL for v1 — no additional database to operate, cost is negligible at this scale, and migration to a dedicated vector store (Pinecone, Weaviate) is straightforward if the library grows past 5,000 entries. Lovable's default Supabase backend supports pgvector natively.

**Non-negotiable consistency requirement:** the embedding model used at library build time must be the same model used at query time, at the same version. The model version must be pinned in system configuration. If the embedding model is ever updated, all FAQ entry vectors must be regenerated and the eval set re-run before the updated version goes live. Running query embeddings against vectors generated by a different model version produces unpredictable, unreliable similarity scores.

### Recommended Threshold Structure

The following thresholds are starting values, calibrated against typical performance characteristics of `text-embedding-3-small` on conversational Q&A pairs. They must be validated against a pre-launch eval set before go-live (see Acceptance Criteria). All values are cosine similarity scores on a 0–1 scale.

| Tier | Score Range | Label | System Action |
|---|---|---|---|
| **High confidence** | ≥ 0.82 | Match | Return the canned answer verbatim, no caveat added |
| **Medium confidence** | 0.65 – 0.81 | Soft match | Return the canned answer with a soft framing caveat; surface IBCLC escalation option |
| **Low confidence** | < 0.65 | No match | Return refusal message; log question; capture in unmatched queue |

**Rationale for these values:** a cosine similarity of ≥ 0.82 on `text-embedding-3-small` corresponds to very high semantic overlap — the kind where the question and the stored variant are clear paraphrases of each other. A score of 0.65–0.81 represents topically related but not precisely matched questions; the matched entry's answer may be directionally useful but is not an exact fit for the user's specific phrasing or situation. Below 0.65, the relationship between the query and the closest match is too loose to serve the answer responsibly.

**Pre-launch calibration:** before launch, build an eval set of at least 50 labeled question-answer pairs — 20 confirmed high-confidence matches (written by the IBCLC advisor as known-good pairs), 15 near-miss pairs (questions topically adjacent to an entry but that should NOT match it), and 15 out-of-scope questions (topics the library intentionally doesn't cover). Run the matching pipeline against this eval set and adjust thresholds until precision on the HIGH tier is ≥ 0.95: at most 1 in 20 HIGH-confidence responses is a mismatch. The refusal rate on out-of-scope questions must be ≥ 90%.

**Safety-justified exception for Category 9 (Breast Health):** breast health entries (engorgement, blocked ducts, mastitis, nipple damage) carry the highest clinical risk if incorrectly matched. For this category only, the MEDIUM tier is collapsed into the LOW tier — any score below 0.82 for a breast health entry returns the refusal/escalation message rather than a canned answer with caveat. This means moms with breast health questions get the conservative path unless the match is very confident. This is intentional.

### Behavior at Each Tier

**High confidence (≥ 0.82):** The canned answer is returned verbatim, exactly as the IBCLC advisor approved it. The UI presents it as a standard chat response with a persistent "IBCLC-reviewed" attribution badge. No framing caveat is added. Adding caveats to high-confidence responses would erode trust in precisely the moment the product is working correctly. If the entry has an `escalation_trigger`, the escalation text appears at the bottom of the answer as authored — it does not get suppressed at this tier.

**Medium confidence (0.65–0.81):** The canned answer is returned verbatim, but preceded by a single soft framing line: *"I found something that may help — it may not be a perfect match for your situation, but here's what our IBCLCs say about [topic]."* The response includes a persistent "Talk to a human" prompt at the bottom. If the user arrived via an IBCLC referral, the escalation link surfaces that specific IBCLC's preferred contact method rather than a generic directory link. Medium-confidence responses are tagged in logs and surfaced in a weekly PM review (top 20 medium-confidence turns by volume) to identify entries that need rewriting, splitting, or supplementation.

**Low confidence (< 0.65):** No answer is returned. The system responds with the refusal message: *"I don't have a vetted answer for that specific question — let me connect you with a real person."* Followed by the appropriate escalation path based on the user's context: the referring IBCLC's contact (if applicable), the hospital lactation line, or a general IBCLC directory link. The unmatched question is captured in the pipeline described in Section 7.6. A flag is written to the event log immediately. The UI also briefly acknowledges that the user's question has been noted for the team — this is not just a dead end.

### Logging Requirements

Every chat turn — regardless of confidence tier — generates an append-only log event. Log events are never deleted. Minimum retention: 24 months. This window covers FDA guidance for medical device software audit trails, provides sufficient signal for model improvement, and enables a clinical retrospective if any safety question is ever raised about a specific response.

Each log event captures the following fields:

| Field | Type | Description |
|---|---|---|
| `event_id` | UUID | Unique identifier for the log row |
| `session_id` | UUID | User session identifier |
| `user_id` | UUID | Pseudonymized — opaque UUID, not email or name |
| `question_text` | Text | Raw user input, truncated at 500 characters |
| `question_embedding_hash` | Text | SHA-256 of the embedding vector (for deduplication auditing; not the vector itself) |
| `matched_entry_id` | Text | FAQ entry ID of the best match, or `null` if no match found |
| `match_score` | Float | Cosine similarity score to 4 decimal places |
| `confidence_tier` | Enum | `HIGH`, `MEDIUM`, or `LOW` |
| `response_served` | Enum | `CANNED_ANSWER`, `CANNED_WITH_CAVEAT`, or `REFUSAL` |
| `escalation_triggered` | Boolean | Whether the response included an escalation instruction |
| `user_path` | Char | `A`, `B`, or `C` |
| `user_week_postpartum` | Integer | From user profile at time of query |
| `timestamp` | Timestamptz | UTC ISO 8601 |
| `flagged_for_review` | Boolean | Set to `true` for all LOW-tier events automatically |
| `embedding_model_version` | Text | Pinned model identifier used for this query |
| `library_version` | Text | Version/hash of the FAQ library at time of query |

**Escalation notification flow for LOW-tier events:** all LOW-tier events set `flagged_for_review = true` in real time. These are:
1. Written to the `unmatched_questions` table (Section 7.6) for the daily digest and library expansion workflow.
2. Included in Ashley's daily digest the following morning.
3. Reviewed by the IBCLC advisor at least once weekly. Clinically flagged entries (those containing symptom language, medication references, or emotional distress markers) are routed to the IBCLC's batch regardless of whether a draft answer was generated.

**Medium-confidence weekly review:** MEDIUM-tier events are not included in the daily digest by default but are surfaced in a weekly summary to Ashley: the top 20 medium-confidence turns from the prior week, grouped by matched entry, with their raw question text. This surfaces patterns — if the same FAQ entry is generating a lot of medium-confidence matches, it likely needs its `question_variants` expanded or the entry needs to be split into two more precise entries.

### Acceptance Criteria

- [ ] A pre-launch eval set of ≥ 50 labeled question-answer pairs exists, authored or reviewed by the IBCLC advisor, covering high-confidence matches, near-miss pairs, and out-of-scope questions.
- [ ] The matching pipeline achieves ≥ 0.95 precision on HIGH-tier matches against the eval set (at most 1 mismatch in 20 HIGH-confidence responses) before any user traffic is served.
- [ ] The matching pipeline returns REFUSAL on ≥ 90% of out-of-scope questions in the eval set.
- [ ] All three confidence tiers produce the correct UI behavior (canned answer / canned with caveat / refusal) in end-to-end testing across at least 10 test cases per tier.
- [ ] The Category 9 (Breast Health) safety exception is implemented: all sub-0.82 matches in this category return REFUSAL, not CANNED_WITH_CAVEAT.
- [ ] Every chat turn generates an append-only log event with all required fields populated.
- [ ] LOW-tier log events appear in the `unmatched_questions` table within 60 seconds of the chat turn.
- [ ] LOW-tier events appear in Ashley's next morning digest.
- [ ] The embedding model version and library version are pinned and stored in system configuration; a deployment guard prevents going live if these values are unset.
- [ ] A pre-deployment script exists that regenerates all FAQ entry vectors and re-runs the eval set whenever the embedding model version changes. Deployment is blocked until eval set precision is re-confirmed.
- [ ] Log retention is ≥ 24 months with no automatic deletion policy in place.
- [ ] A privacy data dictionary documents what is and is not stored in the log table; no plaintext PII (name, email, phone) appears in any log row.

**Open questions:**

- **Embedding model cost profile:** `text-embedding-3-small` costs approximately $0.02 per 1M tokens — negligible at v1 scale, but should be formally profiled against projected query volume before launch so there are no billing surprises at growth.
- **Category 9 exception scope:** should the breast health safety exception (MEDIUM → REFUSAL) extend to the emotional wellness category (Category 14) as well? The case for it: a medium-confidence match on an emotional wellness question that misses the mark could feel dismissive rather than just unhelpful. Recommend: extend the exception to Category 14 as well, given the postpartum mental health sensitivity. Decision needed before eval set is built.
- **Eval set ownership and refresh cadence:** the eval set is a living artifact, not a one-time deliverable. Who is responsible for expanding it as the library grows? Recommendation: Ashley adds 5 new eval pairs per batch of 20 new library entries; the IBCLC reviews eval pairs in the same batch review session.

---

## 7.6 Smart-FAQ Chat — Unmatched Question Capture and Triage

### Background and Motivation

Every LOW-tier confidence event (Section 7.5) represents a question a real postpartum mom had that Latched could not answer. At v1 library size (100-150 entries), a meaningful fraction of chat turns — likely 25-35% in the first weeks post-launch — will hit the refusal pattern. This is expected and acceptable by design, but only if those questions are captured, systematically organized, and efficiently turned into new library entries. Without this pipeline, the library stagnates and the match rate KR (Section 4: ≥70% of chat sessions returning a matched vetted answer) cannot be improved post-launch.

The unmatched question pipeline has three jobs: (1) give Ashley a clear, daily picture of what moms are asking that the chat can't answer; (2) use the LLM to pre-draft FAQ entries so the IBCLC is editing rather than authoring; (3) create a structured approval workflow so new entries are clinically reviewed before they go live. Together, these convert the smart-FAQ's inherent limitation — fixed library coverage — into a self-improving system.

### User Stories

**As Ashley (PM/founder):** Every morning I want to see exactly what questions the chat couldn't answer the day before, organized and ready to triage, so I can make smart, fast decisions about what to add to the library next — without spending more than 15 minutes on it.

**As the IBCLC advisor:** I want a weekly batch of pre-drafted Q&A entries that need my clinical review, already formatted to match the library style, so I'm editing and approving rather than writing from scratch. My weekly contribution should stay within my 2-hour block.

**As a mom who hit the refusal pattern:** I want to know my question was heard, not just rejected. The app should acknowledge that it couldn't help, connect me to a real person, and tell me my question was noted — so I feel like a person, not a test case.

### Data Schema — Unmatched Questions Table

Stored in the application database alongside the main product tables. All user-identifying data is pseudonymized at write time: `user_id` is an opaque UUID, not email, name, or any direct identifier.

```sql
CREATE TABLE unmatched_questions (
  id                   UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id           UUID         NOT NULL,
  user_id              UUID,                            -- nullable for unauthenticated sessions
  question_text        TEXT         NOT NULL,           -- raw user input, max 500 chars
  question_clean       TEXT,                            -- normalized: lowercase, punctuation stripped, for dedup
  question_embedding   VECTOR(1536),                   -- pgvector; used for deduplication and clustering
  top_match_id         TEXT,                            -- FAQ entry ID of closest match (even if below threshold)
  top_match_score      FLOAT,                           -- cosine similarity score of that closest match
  user_path            CHAR(1),                         -- 'A', 'B', or 'C'
  user_week            SMALLINT,                        -- weeks postpartum from user profile at query time
  submitted_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
  daily_digest_date    DATE,                            -- populated when this row is included in a digest run
  draft_faq_id         UUID         REFERENCES draft_faq_entries(id),
  status               TEXT         NOT NULL DEFAULT 'new',
                                                        -- 'new' | 'digest_sent' | 'draft_generated' |
                                                        -- 'in_review' | 'approved' | 'rejected' | 'duplicate'
  duplicate_of_id      UUID         REFERENCES unmatched_questions(id), -- points to the canonical row if deduplicated
  is_clinical_flag     BOOLEAN      NOT NULL DEFAULT false -- set by classifier on insert
);

CREATE INDEX idx_uq_status       ON unmatched_questions(status);
CREATE INDEX idx_uq_submitted_at ON unmatched_questions(submitted_at DESC);
CREATE INDEX idx_uq_digest_date  ON unmatched_questions(daily_digest_date);
```

**Deduplication logic:** before inserting a new row, compute cosine similarity between the incoming `question_embedding` and all `question_embedding` values in rows from the past 30 days where `status != 'rejected'`. If similarity ≥ 0.92, the new question is treated as a duplicate: `status = 'duplicate'`, `duplicate_of_id = [canonical row id]`. Duplicate rows are counted in the digest ("3 moms asked variations of this question") but do not generate a separate draft entry. The frequency count on the canonical row informs prioritization — a question asked by 5 different moms in 2 days is a higher library priority than a one-off.

**Clinical flagging:** immediately on insert, a lightweight text classifier sets `is_clinical_flag = true` if the question contains any of: symptom language (pain, fever, bleeding, swelling, discharge, lump), medication names, baby weight or volume numbers paired with concern language, or emotional distress markers (I can't, I'm failing, I want to quit, I feel like). The classifier does not need to be sophisticated — a curated keyword/phrase list covering the most common safety patterns is sufficient for v1. Clinically flagged entries are surfaced in a dedicated section of the daily digest and routed to the IBCLC's weekly batch regardless of their draft status.

### AI-Generated Draft Answer Process

When a new non-duplicate row is inserted in `unmatched_questions` with `status = 'new'`, a background job runs within 60 minutes to generate a draft FAQ entry. The same production LLM used for semantic matching (Claude Haiku or GPT-4o-mini) generates the draft under a tightly scoped system prompt. The prompt constrains the model to the library's style and format, instructs it to source claims from ABM/LLLI/CDC/AAP only, and explicitly marks the output as draft. The model is not being asked to produce a live clinical answer — it is producing a formatted starting point for human review.

If the LLM cannot generate a responsible draft — for example because the question is medication-related, requests a diagnosis, involves symptoms requiring clinical evaluation, or is otherwise outside the library's scope — it returns `draft_status = 'cannot_generate'` with a human-readable reason. These entries are flagged in the digest for manual authoring or explicit rejection.

The draft answer field is always prefixed with `[DRAFT — NEEDS IBCLC REVIEW]`. This prefix must be enforced at the API layer, not just in the UI. Draft entries must never be surfaced to end users under any circumstances, even if a bug causes them to be written to the live FAQ table.

### Draft FAQ Entries Table Schema

```sql
CREATE TABLE draft_faq_entries (
  id                    UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  source_question_id    UUID    NOT NULL REFERENCES unmatched_questions(id),
  question_clean        TEXT    NOT NULL,      -- normalized question text used for draft generation
  question_variants     TEXT[], -- 3-4 natural-language phrasings generated by the LLM
  draft_answer          TEXT    NOT NULL,      -- always prefixed: "[DRAFT — NEEDS IBCLC REVIEW]"
  draft_status          TEXT    NOT NULL DEFAULT 'pending_review',
                                              -- 'pending_review' | 'in_review' | 'approved' |
                                              -- 'rejected' | 'cannot_generate' | 'sent_to_ibclc'
  suggested_category    TEXT,                 -- LLM-suggested category from the 14-category taxonomy
  suggested_paths       TEXT[], -- e.g. ['A', 'C']
  suggested_weeks       TEXT[], -- e.g. ['1-2', '3-4']
  needs_ibclc_review    BOOLEAN NOT NULL DEFAULT true,
  cannot_generate_reason TEXT,               -- populated when draft_status = 'cannot_generate'
  generated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_by           TEXT,               -- 'ashley' or 'ibclc'
  reviewed_at           TIMESTAMPTZ,
  reviewer_notes        TEXT,
  approved_answer       TEXT,               -- final edited text approved for live library (may differ from draft)
  promoted_to_live      BOOLEAN NOT NULL DEFAULT false,
  promoted_at           TIMESTAMPTZ,
  live_faq_id           TEXT               -- e.g. 'SUP-023' — assigned when promoted
);

CREATE INDEX idx_dfe_status      ON draft_faq_entries(draft_status);
CREATE INDEX idx_dfe_needs_ibclc ON draft_faq_entries(needs_ibclc_review) WHERE needs_ibclc_review = true;
```

### Daily Digest — Delivery Specification

**Recommended delivery method: daily email digest, with Linear issues as the secondary triage channel.**

Rationale for email as primary: Ashley is a solo founder managing a full product build. Email is universally accessible, requires no additional tooling setup, creates an asynchronous record of what was received and when (relevant for audit), and can be acted on from any device. Slack would require channel setup and risks getting lost in other notifications. An in-app admin panel would require Ashley to proactively open a separate tool, adding friction to what should be a habitual morning check. Linear issues are useful for structured triage and library expansion project management, but are not the right format for a morning scan of 10-20 raw questions. The recommended pattern: receive the digest in email, decide what to do, and let the digest's action links create Linear issues automatically when Ashley approves a draft or flags a question for the IBCLC. One click in the digest creates the Linear issue — Ashley never has to open Linear just to look.

**Timing:** delivered daily at 7:30am in Ashley's local timezone. Covers all unmatched questions from the prior calendar day (midnight to midnight UTC). On days with zero unmatched questions, no digest is sent.

**Digest format:**

```
Subject: Latched Chat Digest — [N] unmatched · [Date]

YESTERDAY AT A GLANCE
  [N] unmatched questions
  [N] clinical flags (see below)
  [N] deduplicated (grouped with prior questions)
  [N] draft FAQ entries generated, awaiting your review

─────────────────────────────────────────────
🔴 CLINICAL FLAGS — Please review before noon  ([N])
These questions contained symptom, safety, or distress language.
The IBCLC receives these in this week's Friday batch, but
please scan them now.

1. "my breast is really hard and I have a fever"
   Path B · Week 2 · 3:14am
   Closest match: BRS-001 (score 0.61 — below threshold)
   Draft: [Cannot generate — symptom question. Escalation-only.]
   → [Mark as IBCLC-only] [Reject]

2. "I feel like I'm failing at everything"
   Path A · Week 1 · 2:47am
   Closest match: EMO-002 (score 0.58)
   Draft: [View draft ↗]
   → [Send to IBCLC] [Reject]
─────────────────────────────────────────────
📋 ALL UNMATCHED QUESTIONS  ([N])

3. "how do I know if my baby has a lip tie"
   Path A · Week 2 · Score: 0.59 (closest: LAT-005)
   Draft: [View draft ↗]   → [Approve for IBCLC review ↗] [Reject] [Mark duplicate]

4. "can I eat sushi while breastfeeding"
   Path C · Week 3 · Score: 0.41 (no close match)
   Draft: [Cannot generate — outside library scope]
   → [Flag for manual authoring] [Reject]

[... remaining questions ...]
─────────────────────────────────────────────
TOP QUESTIONS THIS WEEK BY VOLUME  (for trend tracking)
1. Lip tie / tongue tie questions — 7 variations in 3 days
2. Food and diet questions — 5 variations
3. Nipple shield weaning — 4 variations

─────────────────────────────────────────────
PENDING IBCLC BATCH  ([N] drafts awaiting IBCLC review)
Oldest pending: [date]. Next IBCLC batch: Friday.
[View all pending ↗]
```

All action links in the digest are pre-authenticated deep links to the admin panel, valid for 48 hours from delivery. Clicking "Approve for IBCLC review" automatically creates a Linear issue tagged `[Library Expansion] / [FAQ Draft]` with the draft content pre-populated. Ashley never has to open Linear manually.

**Who receives the daily digest:** Ashley only.

**IBCLC weekly batch:** every Friday at 8:00am, the IBCLC advisor receives a separate weekly digest containing all draft entries with `draft_status = 'pending_review'` and `needs_ibclc_review = true` generated since the prior Friday, grouped by category, with the draft answer pre-formatted to match the Airtable library style. Target batch size at v1 scale: ≤ 20 entries per week, consistent with the advisor's committed 2-hour weekly block. If the batch exceeds 20 entries, excess entries are held for the following week and flagged to Ashley for potential scope conversation.

### Approval Workflow — Draft to Live FAQ Entry

The path from unmatched question to live library entry has four stages. The workflow is designed to keep Ashley's daily commitment to ≤ 15 minutes and the IBCLC's weekly commitment within 2 hours.

**Stage 1 — Ashley's daily triage (daily, target ≤ 15 min):**
Ashley reviews the morning digest and makes one of four decisions per question:

- **Approve for IBCLC review:** the draft looks directionally correct; send to the IBCLC's Friday batch. Sets `draft_status = 'sent_to_ibclc'`. Creates a Linear issue automatically (tag: `[Library Expansion]`, priority: Medium; High for clinical flags).
- **Edit and approve as Ashley:** for low-clinical-risk categories (Category 6 milk storage, Category 12 return-to-work, Category 8 bras/hands-free), Ashley may edit the draft and approve it herself. Sets `draft_status = 'approved'`, `reviewed_by = 'ashley'`. These entries are still marked for the next quarterly IBCLC audit pass before being considered fully reviewed.
- **Reject:** question is out of scope, a confirmed duplicate, or a test/spam entry. Sets `draft_status = 'rejected'`.
- **Flag for immediate IBCLC attention:** for clinical flags or any question Ashley is uncertain about. Triggers a direct email to the IBCLC (not batched to Friday). Sets `draft_status = 'in_review'`.

**Stage 2 — IBCLC weekly review (Fridays, target ≤ 2 hrs):**
The IBCLC receives the weekly batch digest and works in Airtable (the live library's working format). For each entry, the IBCLC can:

- **Approve with edits:** edit the `draft_answer` and `question_variants` fields, confirm `suggested_category`, `suggested_paths`, `suggested_weeks`, and set `advisor_reviewed` to today's date. The IBCLC's edited version becomes the approved text.
- **Reject with reason:** entry gets `draft_status = 'rejected'` with a note explaining why (out of scope, clinically unsafe as drafted, duplicate of existing entry). Reason is logged and surfaced to Ashley in the following week's digest.
- **Flag for more context:** rare; marks the entry `in_review` and sends Ashley a note. Ashley provides context; the entry returns to the IBCLC's next batch.

**Stage 3 — Promotion to live library:**
When the IBCLC sets `advisor_reviewed` on an entry in Airtable, an automated sync job (triggered by the Airtable webhook or a daily scheduled run) promotes the entry to the live FAQ library:

1. A new row is created in the live FAQ Airtable base with the approved content.
2. A new entry ID is assigned in format `[CATEGORY_CODE]-[###]` (e.g., `LAT-009`).
3. The entry is embedded using the production embedding model and the resulting vector is added to the vector store.
4. `promoted_to_live = true`, `promoted_at = now()`, `live_faq_id = 'LAT-009'` are written back to `draft_faq_entries`.
5. The source `unmatched_questions` row `status` is updated to `'approved'`.

All five writes are transactional — if any step fails, the entire promotion rolls back and Ashley is notified.

**Stage 4 — Post-promotion regression check:**
After any batch of ≥ 5 new entries is promoted, the pre-launch eval set is automatically re-run against the updated library. If HIGH-tier precision drops below 0.95 on any category represented in the new batch, the batch is automatically rolled back, the new vector entries are removed from the store, and Ashley receives an alert with the affected entries identified. This prevents new library entries from creating vector collisions or confidence score drift in established categories.

### Acceptance Criteria

- [ ] Every LOW-confidence chat turn (Section 7.5) creates a row in `unmatched_questions` within 60 seconds of the turn completing.
- [ ] Deduplication logic correctly groups similar questions (cosine similarity ≥ 0.92 against prior 30-day entries) and increments the count on the canonical row rather than creating a separate entry.
- [ ] A draft FAQ entry is generated for every new (non-duplicate, non-rejected) unmatched question within 60 minutes of row insertion.
- [ ] Draft entries prefixed with `[DRAFT — NEEDS IBCLC REVIEW]` are never served to end users. This is enforced at the API query layer (a column-level constraint prevents any row with `promoted_to_live = false` from being returned by the live FAQ lookup query), not just in the UI.
- [ ] The clinical flagging classifier correctly identifies symptom/distress/medication language with ≥ 85% accuracy on a test set of 20 positive and 20 negative examples before go-live.
- [ ] The daily digest is delivered at 7:30am on every day that has ≥ 1 unmatched question, with correct data from the prior day.
- [ ] The IBCLC weekly batch digest is delivered every Friday with all `pending_review` entries generated since the prior Friday, grouped by category.
- [ ] All digest action links (Approve, Reject, Send to IBCLC, Flag) are authenticated and functional without a separate login step. Link validity window: 48 hours.
- [ ] Clicking "Approve for IBCLC review" in the digest automatically creates a Linear issue with the draft content and correct tags, without requiring Ashley to open Linear.
- [ ] The promotion workflow (Stage 3) is fully transactional: failure at any step rolls back all five writes and sends an alert to Ashley.
- [ ] The post-promotion regression check (Stage 4) runs automatically after any batch of ≥ 5 promotions and rolls back the batch if HIGH-tier precision drops below 0.95.
- [ ] The `unmatched_questions` and `draft_faq_entries` tables comply with the same data retention (24-month minimum) and PII pseudonymization standards as the event log in Section 7.5.
- [ ] The system correctly handles the `cannot_generate` case: entries where the LLM cannot safely draft an answer are surfaced in the digest with a clear reason, and are not silently dropped.

**Open questions:**

- **Linear project structure:** what is the correct Linear project and label taxonomy for library expansion issues? Recommendation: `Project: Content Library`, `Label: FAQ Expansion`, `Priority: Medium` by default, `Priority: High` for clinically flagged entries, `Priority: Urgent` for entries where the `cannot_generate` reason is a safety concern. Decision needed before digest automation is built.
- **Digest on weekends:** should the daily digest run on Saturdays and Sundays, or batch Saturday–Sunday questions into Monday's digest? Recommendation: run daily; the clinical flag review timeline ("review before noon") makes weekend pausing risky if a safety question comes in Friday night. Ashley can skim it in 5 minutes on a weekend if needed.
- **Unmatched question counting and the match rate KR:** do unmatched questions that are later approved and promoted count retroactively toward the match rate? Answer: no. The match rate KR (Section 4: ≥70% of chat sessions returning a matched vetted answer) is a real-time, forward-looking metric. It improves as the library grows, not retroactively. Clarify this explicitly in reporting so a growing match rate isn't misread as the retrospective questions being "resolved."
- **Admin panel for mobile triage:** should the digest action links open a mobile-optimized admin view, or is email-only sufficient at v1? Recommendation: email-only at v1. An admin panel with mobile optimization is a Tier 2 feature for v1.1 once the triage workflow is validated and Ashley has a feel for the daily volume.

---

## 7.7 Smart-FAQ Chat — Session No-Match Alert

### Background and Motivation

A user who receives one LOW-confidence refusal in a chat session is using the product as designed — she asked something the library doesn't yet cover, and the system correctly escalated her. A user who receives three or more refusals in a single session is a different signal entirely. She may be circling a topic the knowledge base has a blind spot in, or she may be in a situation where she is not finding any value from the chat at all. Both outcomes are high-priority: the first is a library gap that affects everyone who asks the same question; the second is a retention risk for a mom who is frustrated and running out of options at 3am.

This requirement specifies an operational alert that fires when a user hits the three-refusal threshold within a session, notifying Ashley immediately so the session's unmatched questions can be fast-tracked for review. **This alert is entirely backend and ops-facing. It produces no change to what the user sees in the chat.** The refusal UX (the standard Option A refusal tone) is identical on the third no-match as on the first and second. The alert exists so the problem is visible and acted on quickly — not so the user knows the alert exists.

### Session Definition

A **session** is a continuous period of chat activity bounded by:

- **Start:** the user opens the chat interface (or sends a first message after a session boundary).
- **End:** either (a) the user closes or navigates away from the app, or (b) 30 minutes of continuous inactivity in the chat interface — whichever comes first.

The 30-minute inactivity window is consistent with standard web session conventions, aligns with how the event log in Section 7.5 already defines `session_id`, and maps naturally to a postpartum mom's usage pattern: she may put the phone down mid-conversation while attending to the baby and pick it back up within minutes, but a 30-minute gap almost always represents a distinct need or context. After 30 minutes of inactivity, the next chat message starts a new session with a new `session_id`, and the no-match counter resets.

**Counter behavior within a session:** the no-match counter is cumulative across the entire session — it tracks total LOW-confidence responses, not consecutive ones. A HIGH or MEDIUM confidence response does not reset the counter. The rationale: a user who has asked three questions the library can't answer in one session is sending a knowledge-gap signal regardless of whether she also received one answer in between. Resetting on a successful match would suppress the alert for users who are broadly not finding value, which is the signal the alert is designed to catch.

**Alert fires once per session:** the alert fires exactly once, when the counter transitions from 2 to 3. If the same session produces a 4th or 5th LOW-confidence response, no additional alerts are sent for that session. The same session ID will not re-trigger the alert. This prevents alert fatigue from a single prolonged session.

### Trigger Condition

The alert fires when, within a single session (as defined above):
- The count of LOW-confidence (`confidence_tier = 'LOW'`) events for that `session_id` in the event log reaches exactly 3.
- No prior alert has been sent for this `session_id` (deduplication check against the `session_alerts` table defined below).

The trigger is evaluated in real time, immediately after the 3rd LOW-confidence event is written to the event log. Target time from the 3rd LOW-confidence turn to alert delivery: ≤ 5 minutes.

### Who Is Alerted and How

**Ashley (founder) receives an immediate email alert.**

Delivery method: email, consistent with the daily digest in Section 7.6. The key distinction from the daily digest is timing — this alert is sent immediately on trigger, not batched to 7:30am. The subject line uses a distinct format so it stands out in Ashley's inbox even on a weekend night:

```
Subject: ⚠️ Latched — session alert: 3 no-matches · [user path] · Week [N] · [timestamp]
```

Email is the right channel here for the same reasons it was chosen for the daily digest: it is universally accessible, creates an asynchronous audit record, and requires no additional infrastructure. If Ashley later establishes a Slack workspace for ops use, the session alert is the first candidate to move to Slack — the immediacy matters more here than for the batched digest, and Slack handles time-sensitive ops notifications better than email. That migration is a v1.1 ops improvement, not a v1 launch requirement.

The IBCLC advisor is **not** alerted in real time. Questions from flagged sessions are routed to the IBCLC's existing weekly batch (Section 7.6 Stage 1 → Stage 2), with clinical flags surfaced for the same-day direct notification path that already exists. The alert is ops-facing, not clinical-review-facing, at the moment of trigger.

### Alert Contents

The alert email contains exactly the following:

```
Subject: ⚠️ Latched — session alert: 3 no-matches · Path [A/B/C] · Week [N] · [HH:MM UTC]

A user reached 3 no-match responses in a single chat session.
This may indicate a knowledge base gap or a user not finding value.

SESSION SUMMARY
  Session ID:       [pseudonymized UUID — e.g. sess_a3f9c12d]
  Session started:  [ISO 8601 timestamp UTC]
  Alert triggered:  [ISO 8601 timestamp UTC]
  Session length:   [N minutes at time of trigger]
  User path:        [A — Exclusive Nursing / B — Exclusive Pumping / C — Combination Feeding]
  User week:        Week [N] postpartum

UNMATCHED QUESTIONS IN THIS SESSION  (in order)

  #1  [HH:MM UTC]  score: [0.NN]
  "[verbatim question text]"

  #2  [HH:MM UTC]  score: [0.NN]
  "[verbatim question text]"

  #3  [HH:MM UTC]  score: [0.NN]  ← TRIGGER
  "[verbatim question text]"

  [Additional questions if > 3, same format]

CLINICAL FLAGS
  [If any question has is_clinical_flag = true, list them here with a ⚠️ marker.
   If none: "No clinical flags in this session."]

ACTIONS
  → Review session in admin panel (link valid 48 hrs):
    [deep link to admin panel, filtered to this session_id]

  → Fast-track these questions in tomorrow's digest:
    All questions from this session have been elevated to the top
    of tomorrow's 7:30am digest with a FLAGGED SESSION label.

  → Create Linear issue for library expansion:
    [one-click link that pre-populates a Linear issue with the
     session ID, question list, and tag: [Library Expansion] / [Flagged Session]]

NOTE: The user's chat experience was not changed. She received the
standard refusal message on each of these turns.
```

**On pseudonymization and HIPAA posture:** the alert contains no plaintext PII. The session ID is an opaque UUID, consistent with the logging standard in Section 7.5. The question text itself is user-generated input and may incidentally contain personal details (e.g., "I'm a 32-year-old with a history of…") — this is an inherent property of a chat product and is handled by the same data handling policy that governs the event log and `unmatched_questions` table, not by additional scrubbing at alert time. The same text is already captured in those tables; the alert surfaces it to Ashley for review, which is within scope of the product's data use. No additional HIPAA considerations apply at launch beyond those already governing the log tables.

### Supporting Data Table

To enforce the "one alert per session" rule and maintain an audit trail of alerts sent, a small `session_alerts` table is added:

```sql
CREATE TABLE session_alerts (
  id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id       UUID         NOT NULL UNIQUE,   -- one row per session that triggered
  triggered_at     TIMESTAMPTZ  NOT NULL DEFAULT now(),
  question_count   SMALLINT     NOT NULL,           -- total LOW-confidence turns at trigger time (≥ 3)
  alert_sent_at    TIMESTAMPTZ,                     -- populated once email is dispatched
  alert_delivery   TEXT,                            -- 'email' (or 'slack' if channel added later)
  reviewed_by      TEXT,                            -- 'ashley' — populated when she acts on it
  reviewed_at      TIMESTAMPTZ,
  action_taken     TEXT,                            -- 'fast_tracked' | 'rejected' | 'noted'
  linear_issue_id  TEXT                             -- populated if Linear issue created
);

CREATE INDEX idx_sa_triggered_at ON session_alerts(triggered_at DESC);
```

This table is the authoritative record that an alert was sent. The `UNIQUE` constraint on `session_id` is the database-level guarantee that the same session never triggers twice.

### SLA and Digest Integration

**Review SLA:** unmatched questions from flagged sessions must be reviewed within 24 hours of the alert. This is operationalized through the daily digest, not through a separate process: questions from flagged sessions are automatically elevated to the top of the next morning's 7:30am digest under a distinct header ("FLAGGED SESSIONS — PRIORITIZE REVIEW"), before all other unmatched questions. If the session alert fires after the day's digest has already been sent, the questions appear at the top of the *following* morning's digest — a maximum lag of 30 hours. For clinically flagged questions within a flagged session, the existing immediate IBCLC routing in Section 7.6 applies and is not subject to the 24-hour window.

**Daily digest integration:** the digest already has access to the `unmatched_questions` table. The elevation logic is: if `session_id` exists in `session_alerts` and `action_taken IS NULL`, the associated questions from `unmatched_questions` are sorted to the top of the digest and wrapped in the "FLAGGED SESSION" header. Once Ashley marks action taken (any of: fast_tracked, rejected, noted), the questions drop to their normal position in future digests.

**Expected volume at v1 scale:** at a library of 100-150 entries and a realistic 25-35% no-match rate on individual turns, a user would need to ask roughly 10-15 questions without any match to reach the three-refusal threshold — an unusually high-friction session. In practice, the alert will likely fire rarely (estimated 1-3 times per week in the first month post-launch). If it fires more than 5 times in a week, that is itself a signal worth reviewing: it may indicate the library has a structural gap in a specific topic category, or that a change to the confidence threshold is causing excessive refusals.

### Acceptance Criteria

- [ ] The no-match counter per session is correctly maintained in real time using the `session_id` field in the event log (Section 7.5).
- [ ] The counter is cumulative across the session — a HIGH or MEDIUM confidence response does not reset it.
- [ ] The alert fires on exactly the 3rd LOW-confidence response in a session, not the 2nd or 4th.
- [ ] The alert fires at most once per session. The `UNIQUE` constraint on `session_alerts.session_id` is the enforcement mechanism; a duplicate insert attempt must silently no-op, not error.
- [ ] The alert email is delivered within 5 minutes of the triggering event.
- [ ] The alert email contains all specified fields: session ID (UUID), session start and alert timestamps, session length, user path, user week, the verbatim unmatched questions in order with timestamps and scores, clinical flag status, and all three action links.
- [ ] The deep link in the alert opens the admin panel filtered to the triggering session, pre-authenticated with a 48-hour validity window.
- [ ] The one-click Linear issue link pre-populates a Linear issue with the correct project (`Content Library`), label (`Flagged Session`), priority (`High`), and the session's question list.
- [ ] All questions from a flagged session appear at the top of the next morning's daily digest under a distinct "FLAGGED SESSION" header, before all other unmatched questions.
- [ ] Once Ashley marks `action_taken` on the `session_alerts` row, the session's questions no longer appear in the elevated position in subsequent digests.
- [ ] The session boundary (30-minute inactivity reset) is correctly implemented: a message sent more than 30 minutes after the previous message in the same authenticated user context starts a new session with a new `session_id` and a reset no-match counter.
- [ ] **No change to user-facing UX.** End-to-end test confirms: the refusal message rendered on the 3rd no-match turn is byte-for-byte identical to the message rendered on the 1st and 2nd no-match turns. No additional UI element, copy change, or state change is visible to the user as a result of this alert.
- [ ] The `session_alerts` table is included in the same 24-month retention and PII pseudonymization policy as the event log and `unmatched_questions` table.

**Open questions:**

- **Threshold adjustment:** is 3 the right trigger number? The rationale for 3: 1 refusal is expected by design; 2 might be a user exploring related questions in an underserved category; 3 in a single session is a clear signal of either a structural gap or a frustrated user. If post-launch data shows the alert fires too rarely to be useful, or too frequently to act on, the threshold is a single integer in system configuration and can be adjusted without a code change. Recommendation: launch at 3 and revisit after the first 30 days.
- **Alerting on weekends:** unlike the daily digest (which Ashley can skim briefly on weekends), an immediate session alert at 2am on a Saturday may not be actionable until Monday morning. This is acceptable given the 24-hour review SLA — the alert creates the record, the questions are elevated in Monday's digest, and no user harm occurs from a 36-hour review lag. No weekend suppression is recommended.
- **Slack migration:** if Ashley establishes an ops Slack channel post-launch, the session alert is the first candidate to move to Slack (immediacy matters more here than for the batched digest). The `alert_delivery` column in `session_alerts` anticipates this without requiring a schema migration.

---

## 7.8 IBCLC Referral Tracking

### Background and Motivation

The B2B2C channel depends on reliably attributing which IBCLC referred which mom, tracking whether she converted, and reporting conversion rates back to Ashley for partnership management. Without structured referral data, Ashley cannot evaluate the B2B2C channel thesis (Section 4 KR: ≥40% of paid signups attributed to IBCLC referral), cannot identify high- or low-performing IBCLC partners, and cannot provide IBCLCs with the engagement data that sustains their referral motivation (Section 7.2 item 10, IBCLC dashboard).

This section specifies the full referral tracking requirements — from URL capture at first app open, through paywall badge rendering, through post-conversion persistence and partnership reporting.

### Referral Link and QR Code System

Each partnered IBCLC receives a unique referral URL of the form `latched.app/r/[ibclc-slug]` (e.g., `latched.app/r/sarah-memorial`). The slug is set when the IBCLC signs up at `latched.app/clinicians` and stored in `referral_sources.slug` (globally unique, URL-safe, lowercase). QR codes are generated from this URL and included on the IBCLC's printable discharge card.

At v1, each IBCLC has exactly one active referral slug. The data model supports multiple slugs per IBCLC for future use (e.g., separate links for different clinic locations or distribution contexts), but the v1 onboarding flow issues one slug per partner.

### Referral Capture and Persistence

When a mom arrives via a referral URL, the slug must be captured immediately and persisted through the entire onboarding and paywall flow — before she has an account:

1. **On first app load via referral URL:** the slug is extracted from the URL param (`/r/[slug]`) and written to `localStorage` under key `latched_referral_slug`. This happens before any account creation step and survives page refresh.
2. **Through onboarding:** the slug persists in `localStorage` through all assessment, path selection, and pre-paywall screens.
3. **On account creation:** when the mom creates an account, the slug is read from `localStorage` and a row is written to `user_referrals` with `clicked_at` populated and `converted_at = null`.
4. **On payment:** when the Stripe webhook confirms payment, `user_referrals.converted_at` is set to the payment timestamp and `conversion_value` is set to the purchase amount ($49.00).
5. **`localStorage` is cleared** after the `user_referrals` row is written, preventing double-attribution if the same browser is used again later.

If a mom arrives without a referral URL (direct B2C), no slug is captured and no `user_referrals` row is written.

### Paywall Badge

When the paywall screen renders, the component reads `latched_referral_slug` from `localStorage`, resolves the IBCLC's display name from `referral_sources` (joined to `ibclc_partners`), and conditionally renders:

> **"Recommended by [IBCLC Name], IBCLC"**

The badge is styled subtly — a light social proof element, not a primary CTA, and must not compete visually with the paywall's primary conversion elements (price, program description, CTA button).

If the slug is present but resolves to an inactive referral source (`referral_sources.is_active = false`), the badge is suppressed. The referral is still written to `user_referrals` for historical tracking.

### Referral Data Storage

See Section 3.2 of the TDD for the full `referral_sources` and `user_referrals` table schemas.

**`referral_sources`** stores each unique referral link. Each IBCLC has at least one record. The slug is globally unique. The `is_active` flag allows soft deactivation of a link without losing historical data.

**`user_referrals`** is the attribution join table — one row per user who arrived via a referral link. It captures:

- Which referral link brought this user in (`referral_source_id`)
- When attribution was first written (`clicked_at`)
- Whether and when the user converted to paid (`converted_at` — null until payment confirmed)
- The amount paid at conversion (`conversion_value` — null until converted)

A user has at most one `user_referrals` row at v1. If a mom arrives via a referral link but was already attributed in a prior session, the original attribution is preserved.

### IBCLC Partnership Reporting

Ashley needs to be able to answer the following questions per IBCLC partner, without building a dashboard:

- How many moms arrived via this IBCLC's referral link? (count of `user_referrals` rows for this `referral_source_id`)
- How many converted to paid? (count where `converted_at IS NOT NULL`)
- What is this IBCLC's conversion rate? (conversions ÷ total referrals)
- What is the total revenue attributable to this IBCLC? (`SUM(conversion_value)`)
- How does this IBCLC's rate compare to the overall IBCLC-channel average?

At v1, this is available to Ashley via a Supabase SQL view or direct query. The Tier 2 IBCLC dashboard (Section 7.2 item 10) will surface aggregate metrics to the IBCLC themselves — but each IBCLC sees only their own stats, not other partners' data, and not any patient-level PHI.

### Acceptance Criteria

- [ ] Each partnered IBCLC has a unique referral URL in the format `latched.app/r/[ibclc-slug]`. Visiting the URL resolves to the standard landing page with the IBCLC's name rendered correctly.
- [ ] When a mom arrives via a referral URL, the slug is written to `localStorage` before any account creation step and survives page refresh.
- [ ] The paywall screen reads `localStorage` at render time and conditionally renders the "Recommended by [IBCLC Name], IBCLC" badge when a valid, active slug is present.
- [ ] The badge is suppressed when the slug resolves to an inactive referral source (`is_active = false`). The referral is still written to `user_referrals`.
- [ ] On account creation, a `user_referrals` row is written with `clicked_at` populated and `converted_at = null`.
- [ ] On confirmed payment (Stripe webhook), `user_referrals.converted_at` and `conversion_value` are populated. The webhook handler is idempotent — a duplicate Stripe event does not create a second row or overwrite an already-set `converted_at`.
- [ ] `localStorage` is cleared of the referral slug after the `user_referrals` row is written to the database.
- [ ] Moms who arrive without a referral URL have no `user_referrals` row and see no badge on the paywall.
- [ ] Ashley can query per-IBCLC conversion data (total referrals, paid conversions, conversion rate, total revenue) from a Supabase view or SQL query before the Phase 2 IBCLC dashboard is built.
- [ ] The `user_referrals` table stores only the opaque `user_id` UUID — no name, email, or PII.
- [ ] Referral slugs are never embedded in URL parameters beyond the initial landing URL. After capture, attribution flows through `localStorage` and the database only.

---

## 8. Release

### Phase 0 — Validation (now, 4-6 weeks)

- Experiment 2: research survey to 10 moms (in progress)
- Experiment 3: Lovable + Figma prototype of cold-acquisition → path selection → first-protocol flow
- **Formalize IBCLC advisor partnership** — convert one of the existing friend relationships into a clear advisor agreement (equity 0.25-0.5% or $75-150/hr contract; scope; confidentiality; clinical review responsibility). Required before any chat content authoring begins.
- **Recruit 5-10 friendly IBCLC design partners** for referral pilot — leverage Ashley's existing network
- **Cold IBCLC validation interviews** — 5 non-friend IBCLCs to stress-test the B2B2C channel thesis (see `cold-ibclc-interview-script.md`)
- Wizard-of-Oz validation of WTP
- **Printable-ruler flange tool accuracy test** — 15+ moms self-measure with the v1 ruler and tool; compare to IBCLC ground truth (replaces the AI vision benchmark from v0.5 — that benchmark now happens as parallel v1.1 work)

### Phase 1 — MVP launch (target: 4-5 months — aligned with runway)

- All Tier 1 features shipped, including IBCLC referral attribution
- Tier 2 features shipped if scope and IBCLC partner availability allow
- Soft launch to 5-10 partnered IBCLCs first; expand to paid acquisition once IBCLC channel is validated

### Phase 2 — Expansion (6-12 months post-launch)

NICU/preemie vertical, return-to-work pumping module, Spanish content, live IBCLC integration, mastitis triage with clinical handoff, photo-based latch analysis (if flange tool's CV approach proves viable), personalization models trained on tracker data, IBCLC dashboard with deeper analytics (still aggregate, no PHI).

### Phase 3 — B2B / distribution (12-18 months post-launch)

Formal hospital partnerships (procurement-grade product with HIPAA BAA, SOC 2, patient-level dashboards if hospitals want them), employer benefits packaging (Maven-class), insurance partnerships.

---

## 9. Tensions I'd flag in v0.5

### Tension 1 — IBCLC advisor formalization (still the gating partnership for launch)

With smart-FAQ chat back in v1, the advisor is again on the critical path for launch — but the workload is bounded and one-shot, not per-response:

- **Protocol modules** — review ~18-25 path-specific modules and crash-course snippets. ~30-40 hours.
- **Smart-FAQ library** — review the 100-150 Q&A entries before chat ships. ~20-30 hours. Critical: each entry must be safe enough that the model can return it *verbatim* with no further oversight, because the model itself is not generating anything new.
- **Total advisor time before v1 launch:** ~50-70 hours over 4-5 months. Compatible with a part-time advisor at $75-150/hr or with an equity-only formal partner.

**Why this is workable for solo founder + one advisor:**
The smart-FAQ pattern converts a continuous safety problem (every chat response needs review) into a discrete content-authoring problem (one-time library review). This is the same shift that makes the whole architecture viable at v1. If you find yourself adding more advisors or per-response review to "be safer," you've broken the pattern — push the unmatched questions into v1.1 library expansion instead.

The 4-6 week formalization window remains the right target. Slippage now slips v1 launch (since chat ships in v1), not just v1.1.

### Tension 2 — 4-5 month timeline holds, but is now tight against 4-6 month runway

v0.4's realistic build estimate was 4-5 months. Your runway is 4-6 months to *first revenue*. That's not a lot of slack. Two implications:

- **No room for major scope re-expansion.** If you add anything beyond v0.5, something else needs to come out.
- **First revenue ≠ break-even.** You'll be at first revenue when the math is still cash-negative (see Tension 3). Your runway question should really be "how long until I'm at $X gross per month," not "how long until first dollar."

**Scope cuts still on the table if timeline slips:**
- Drop one of the three protocol paths in v1 (ship nursing + combo only; add exclusive pumping in v1.1) — cuts ~6-8 modules of advisor review
- Shrink the smart-FAQ library to 50-75 entries at launch (instead of 100-150) and rely more heavily on the refusal pattern; expand aggressively post-launch using real query telemetry — cuts ~10-15 hours of advisor review
- Drop the tracker (v1.1)
- Drop the IBCLC dashboard (already Tier 2, easiest cut)
- AI flange already cut to printable-ruler-only in v0.6 — no further cut available here

### Tension 3 — Unit economics, now with IBCLC channel math

v0.4 math: ~$10-13k cash-negative through first 100 signups, mostly driven by IBCLC content review. The B2B2C channel changes this materially if the conversion uplift is real:

- **CAC drops sharply.** Paid Meta acquisition for postpartum moms is $30-80 per signup (industry benchmark). IBCLC referral is ~$0 in marketing spend; the cost is your time onboarding and supporting partner IBCLCs.
- **Conversion rate likely rises.** Trust transfer from IBCLC means landing-page-to-purchase conversion plausibly 3-5x higher than cold paid traffic. ASSUMPTION — needs Phase 0 piloting.
- **Net effect:** if 40% of signups come from IBCLC referral as planned, you're saving roughly $1,500-3,000 in paid acquisition spend over the first 100 signups, AND increasing conversion enough to hit 100 signups with maybe 4-5 active IBCLC partners instead of 10-15. Cash-negative window shrinks to ~$7-10k.

**Mitigations from v0.4 still apply (equity-only advisor, content crowdsourced across 2-3 IBCLCs, maternal-health accelerators).**

### Tension 4 — AI flange tool decision (RESOLVED)

Decision locked: v1 ships printable-ruler-based flange sizing only. AI vision moves to v1.1 pending accuracy benchmark. This cuts ~3-4 weeks of build time, eliminates intimate-photo privacy infrastructure for MVP, and removes the highest-uncertainty accuracy feature from launch dependencies. Trade-off: the "AI-powered" framing is less marketable at launch — but a great printable-ruler experience is still differentiated against the in-store flange measurement status quo, and the AI version becomes a v1.1 announcement moment.

**V1.1 path forward:** run the AI accuracy benchmark in parallel with v1 build using Anthropic Claude vision + reference-object photos. Ship AI version as an opt-in upgrade if benchmark hits ≥85% within-one-size accuracy against IBCLC ground truth.

### Tension 5 — IBCLC channel risk: are they actually willing to refer?

The B2B2C thesis lives or dies on IBCLCs being willing to recommend a paid app to discharged patients. Real risks:

- **Hospital policy.** Some hospitals have rules against staff recommending commercial products. Friendly partners may be OK, but scaling beyond them depends on each hospital's stance.
- **Professional norms.** Some IBCLCs hesitate to recommend anything paid that competes (even tangentially) with their own income.
- **Conflict-of-interest.** If an IBCLC also offers private practice consultations, recommending Latched might look like steering patients away. The advisor agreement needs to address this.
- **Decay over time.** Initial enthusiasm from friendly partners is one thing; sustained referral after 5-10 patients is another. The IBCLC dashboard (Tier 2) is the loop that maintains motivation.
- **Smart-FAQ refusal-rate visibility.** IBCLCs may push back on a chat that refuses too often ("I'm sending my patients to a wall"). Watch the match-rate KR closely in the first 30 days; if it dips below 60%, prioritize library expansion over other v1.1 work.

**Validation plan:** before you write any code on IBCLC features, talk to 5 IBCLCs who are NOT your friends (see `cold-ibclc-interview-script.md`). If 3+ say "no" or hedge heavily on recommending a paid app, the B2B2C channel is weaker than the thesis assumes. Now that chat is in v1, the cold-interview pitch is stronger again — "24/7 IBCLC-vetted chat" is a more compelling line than "protocol-only."

### Tension 6 — 6 weeks vs. 12 weeks (RECOMMENDATION: 6 weeks v1 + free extension module)

Ashley asked to explore extending the program from 6 weeks to 12 (covering the first 3 months, the most common early breastfeeding success target). Analysis:

**Pros of 12 weeks:**
- Aligns with the AAP/ABM target of exclusive breastfeeding through 6 months and the common informal target of "3 months" — better outcome story to tell
- Weeks 6-12 are the *second vulnerability window*: the 6-week growth spurt ends, return-to-work looms (most moms return ~week 8-12), supply shifts as cluster-feeding patterns change, and the Elvie/Willow user population starts fully relying on wearables. Real need, no good tool
- No additional pricing friction — same $49, more perceived value
- Positions Latched closer to a "breastfeeding companion" than a "first 6 weeks tool," which is a stronger brand and better defensibility against copycats

**Cons of 12 weeks at v1 launch:**
- **~50% more protocol content to author and advisor-review.** If 6 weeks = ~18-25 modules per path (54-75 total across 3 paths), 12 weeks ≈ 35-45 modules per path (105-135 total). That's ~50-60 additional hours of advisor review before launch, against a runway that's already tight. This is a launch-blocking scope expansion.
- **Weeks 7-12 content is substantively different.** Return-to-work pumping, building a freezer stash for daycare, managing supply during illness, weaning from the wearable, navigating formula supplementation as supply adjusts — this isn't just "more of the same." It requires distinct clinical depth the advisor needs to review carefully.
- **The week 6 graduation moment is your flywheel moment** — that's where you ask for the testimonial, the referral, and the opt-in for phase 2. Delaying it to week 12 delays your social-proof pipeline by 6 weeks at exactly the moment you need it most (early post-launch).
- **Engagement data is lacking to justify the investment.** If real engagement drops at week 3, spending 50+ hours writing weeks 7-12 was wasted. Better to confirm engagement survives week 6 before expanding.
- **No additional revenue.** The same $49 for 2x the content produces worse content-production unit economics without any additional willingness-to-pay signal.

**Recommendation (resolving this tension for v0.9):**

Ship 6 weeks at v1. At week 6 graduation, offer a **free "Continue Your Journey" extension module (weeks 7-12)** as an upsell prompt — included in the original $49 purchase, no new payment required. Frame it as a gift: "You made it to 6 weeks. Here's what comes next." This gets you:
- All the marketing upside of "support through 3 months"
- The week-6 graduation moment and flywheel intact
- The weeks 7-12 content can be authored and advisor-reviewed *post-launch*, using real query telemetry from weeks 1-6 to prioritize which modules matter most
- A natural v1.1 feature to announce: "extended protocol now available"

**The open question for v0.9:** what's the *minimum* weeks 7-12 content needed at launch to make the "Continue Your Journey" promise feel real — could be as thin as a 3-module "here's what to expect in months 2-3" intro with the full protocol shipping in v1.1. Defer detailed module authoring to post-launch.

---

## 10. Future state — post-launch chat architecture roadmap

Smart-FAQ at v1 is intentionally the *safest viable* chat. The cost is coverage: the model will refuse questions it doesn't have a vetted answer for. The roadmap below describes how the chat layer can evolve as the product earns trust, traffic, and clinical depth — without sacrificing the per-response safety property that lets the architecture work for a solo founder.

### v1.1 — Library expansion + light personalization (target: 3-6 months post-launch)

Driven by real query telemetry from v1.

- **Expand the Q&A library from 100-150 → 300-500 entries** by mining below-threshold queries. Each new entry still gets a single advisor review pass. Advisor time scales with library growth (target: ≤10 hours/month after launch).
- **Personalize the returned canned answer** with the mom's path, week, and tracker state. The *content* of the answer remains the vetted canned response; the foundation model only fills slot variables ("at week 3 on the combo path, ..."). Slot logic is rules-based, not generative.
- **Standalone searchable reference library.** The same vetted Q&A library, browseable. Closes the "Is this normal?" jobs-to-be-done.
- **Refusal experience upgrade.** When the chat refuses, route to a curated triage flow (hospital line, IBCLC directory, partnered IBCLC's preferred channel) instead of a generic message.

### v1.2 — RAG with refusal patterns (the Option 2 architecture)

Considered for v1, deferred. Becomes the right move once the v1 library has matured to ~500+ entries and the IBCLC advisor relationship can support a higher review cadence.

- **Architecture:** retrieval-augmented generation grounded in the IBCLC-reviewed protocol modules + smart-FAQ library + a corpus of long-form clinical content. The LLM *generates* a response but is tightly constrained to citations from the retrieved corpus, with a refusal pattern when retrieval confidence is low.
- **Tradeoffs vs. smart-FAQ:**
  - **+** Coverage rises sharply. The model can recombine source material to answer questions that don't exactly match any single Q&A entry.
  - **+** More conversational; less robotic.
  - **−** Hallucination risk returns. Even with tight grounding, RAG systems regularly cite incorrectly or paraphrase in ways that change clinical meaning.
  - **−** Requires per-response safety guardrails (output classifiers, citation validators, refusal triggers on uncertainty).
  - **−** Requires a sampled human review of live conversations — even at 1-2% sampling, that's nontrivial advisor or clinical-reviewer time.
- **Preconditions to ship:**
  - V1 smart-FAQ library has reached ~500 entries and is showing diminishing marginal value (library expansion alone isn't closing the match-rate gap)
  - At least one formal IBCLC clinical reviewer is in place beyond the founding advisor, with budget for ~5-10 hours/week of conversation sampling
  - Hallucination-rate tooling is in place: output classifier on every generated response, automatic refusal on retrieval confidence below threshold, and a flag-for-review queue for sampled live conversations
  - Legal review on liability surface area for generated medical-adjacent content

### v2.0+ — Healthcare-tailored or domain-fine-tuned model

Considered and deferred indefinitely. Revisited only if specific conditions hold.

- **What it would look like:** either (a) fine-tune a frontier model on a curated lactation corpus, (b) adopt a lactation-tailored model from a third party (none exists today), or (c) adopt a regulated healthcare LLM (Hippocratic AI, MedLM/Med-PaLM 2 successors) once they offer non-enterprise pricing.
- **Why it's deferred today:**
  - No lactation-tailored commercial LLM exists; the closest options (Hippocratic AI, MedLM) are enterprise-only and clinically positioned, not consumer-postpartum-positioned
  - Open-source medical LLMs (Meditron, BioMistral, PMC-LLaMA) are trained on PubMed academic literature, which is the wrong shape for patient-communication safety — they tend toward clinically correct but emotionally tone-deaf, sometimes alarming, output
  - Fine-tuning a frontier model on a custom lactation corpus costs ~$20-50k in compute + curation + ML eng time, and the upside vs. a well-curated RAG over the same corpus is unproven
- **What would change the calculus:**
  - A credible third-party lactation-tuned model emerges at consumer-scale pricing
  - Post-launch query volume is high enough that per-query inference cost on a frontier model exceeds the fixed cost of running a fine-tuned smaller model
  - The IBCLC advisor + clinical-reviewer team has scaled to the point where they can curate a fine-tuning corpus and a refusal-pattern eval set without becoming the bottleneck

### Decision rule for moving between tiers

Smart-FAQ → RAG-with-refusal → tailored model is *one direction*. Each step trades safety surface area for coverage and conversational quality. **Do not advance until the previous tier has saturated.** Saturation means: match-rate or coverage gap is no longer closeable by adding more library entries / retrievable content; user feedback is consistently "the chat couldn't help me with X"; AND the clinical-review infrastructure is in place to safely supervise the next tier. Premature advancement is the most common way consumer health AI products get themselves into trouble.

---

## Open questions for v0.9

*Resolved in v0.6:* printable-ruler flange in v1, AI vision in v1.1.
*Resolved in v0.7:* chat deferred to v1.1; v1.1 architecture recommended as smart-FAQ pattern.
*Resolved in v0.8:* smart-FAQ chat restored to v1 launch (the once-reviewed library makes it tractable for solo founder + one advisor); RAG-with-refusal and healthcare-tailored-LLM exploration parked in Section 10 with explicit preconditions to revisit.
*Resolved in v0.9:* direct B2C added as co-equal launch channel; combo path expanded to include formula; 6 vs. 12-week extension analyzed — recommendation is 6 weeks at v1 with a free "Continue Your Journey" extension module (see Tension 6); smart-FAQ library structure and sourcing plan documented (see `smart-faq-library-v1.md`); v1 protocol content outlined across all 3 paths (see `protocol-outline-v1.md`).

1. IBCLC advisor agreement — target signing date and rough comp structure (now gates v1 launch again, not just v1.1)
2. IBCLC pilot recruitment — names of the 5-10 friendly partners and outreach timeline (use `ibclc-design-partner-onepager.md`)
3. Cold IBCLC validation interviews — schedule 5 non-friend IBCLCs (use `cold-ibclc-interview-script.md`); now probe how they react to "IBCLC-reviewed canned-answer chat" specifically — does the smart-FAQ framing reassure them or does "canned" feel limiting?
4. Tracker direction — pure utility (Pumpables-style) or gamified habit (Flo-style streaks + badges)?
5. Path selection placement — at the very start of onboarding, or after a few warmup questions?
6. Hospital policy research — what are the rules at your partners' institutions about recommending paid commercial apps?
7. BSWH concept conversation — timing and framing for the C-suite + digital health introduction (recommend: after Phase 0 validation, not before)
8. Printable-ruler accuracy approach — device-detection auto-scaled ruler in-app, or downloadable PDF the mom prints? Materially different UX and engineering work.
9. **Weeks 7-12 minimum viable extension.** What's the thinnest possible "Continue Your Journey" content that makes the promise feel real at v1 graduation — 3 intro modules? A curated reading list? A return-to-work prep guide? Full authoring defers to v1.1 but something needs to exist at week 6. Advisor input needed.
10. **Combination feeding path — formula framing.** The path now explicitly includes formula. Advisor needs to review the formula-related content carefully for tone (guilt-free, non-prescriptive) and clinical accuracy (safe prep, paced bottle feeding technique). This adds ~3-5 modules to the combination feeding path that weren't scoped in v0.8.
11. **Direct B2C channel — content marketing and creator strategy.** Who is the voice for direct acquisition? Options: Ashley as founder-face (authentic, zero cost, builds brand equity), postpartum creators/IBCLCs on TikTok/Instagram (paid or rev-share), SEO/blog (slower but compounding). Needs a v1 channel decision before launch.
12. **Confidence threshold for the smart-FAQ refusal pattern.** Where does the matching model cut over from "return canned answer" to "refuse and escalate"? Too aggressive = poor coverage and a chat that feels broken; too lax = the model returns the wrong vetted answer and we lose the safety property. Needs pre-launch eval set + threshold-tuning pass.
