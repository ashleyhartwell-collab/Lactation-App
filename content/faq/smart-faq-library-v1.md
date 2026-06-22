# Latched — Smart-FAQ Library: Structure, Sourcing & Refresh Plan (v1.1)

**Status:** v1.1. Medications category removed (deferred post-launch). Wearable pumps merged into pumping mechanics. Added categories: pump cleaning/parts, bras & hands-free, nursing accessories & aids. Schema format updated from YAML to Airtable/Sheets (see Section 6). Seeding strategy expanded with authoritative pediatric practice FAQ pages.
**Last updated:** 2026-05-24
**Target launch library size:** 100-150 entries
**Architecture reminder:** the LLM does *semantic matching only* — it never generates novel answers. Every entry in this library must be safe to return *verbatim* without further clinical review. That constraint shapes every decision below.

---

## 1. Why this document exists

Before a single entry is written, we need to agree on:
1. What categories the library covers (so the advisor reviews a coherent taxonomy, not a random pile)
2. What each entry looks like (so every entry is consistent and safely matchable)
3. Where the source material comes from (so the advisor isn't authoring from scratch)
4. How we keep the library current (so a mom in month 18 isn't reading stale guidance)

The advisor's pre-launch review (~20-30 hrs) is much more efficient if they're editing vetted source material into an agreed format than authoring cold. The sourcing strategy is designed to minimize authoring burden while maximizing clinical credibility.

---

## 2. Library taxonomy — 14 categories

Entries are tagged to one or more categories, one or more paths (A = exclusive nursing, B = exclusive pumping, C = combination feeding), and one or more weeks. The category list reflects what moms actually ask — not what clinical curricula organize.

**Changes from v1.0:**
- Category 10 (medication safety & galactagogues) **removed** — deferred post-launch; too much liability surface area for v1 with no benefit that justifies the risk
- Former Category 14 (wearable pumps) **merged** into Category 3 (pumping mechanics) — they're a subcategory of pumping, not a separate domain
- **Three new categories added:** pump cleaning/parts/hacks (7), bras & hands-free options (8), nursing accessories & aids (13)

| # | Category | Paths | Est. entries | Notes |
|---|---|---|---|---|
| 1 | Latch & positioning | A, C | 15-20 | Highest query volume in weeks 1-2 |
| 2 | Supply — establishing, maintaining, concerns | A, B, C | 20-25 | Most common 3am question type overall |
| 3 | Pumping mechanics — settings, output, routine & wearable pumps | B, C | 15-18 | Wearables (Elvie, Willow, Momcozy) are a subcategory here |
| 4 | Flange fitting & nipple health | B, C | 8-10 | Complements the printable ruler tool |
| 5 | Output expectations by week | A, B, C | 8-10 | Week-specific; must be accurate per week |
| 6 | Milk storage, handling & thawing | B, C | 8-10 | CDC/ABM storage guidelines; highly factual |
| 7 | Pump cleaning, sanitizing, parts replacement & hacks | B, C | 8-10 | **NEW** — see notes below |
| 8 | Nursing & pumping bras + hands-free options | A, B, C | 6-8 | **NEW** — see notes below |
| 9 | Breast health — engorgement, blocked ducts, mastitis risk | A, B, C | 8-10 | HIGH SAFETY STAKES — all entries have escalation_trigger: yes |
| 10 | Baby behavior, feeding cues & growth spurts | A, B, C | 10-12 | Weeks 1-6 growth spurt timing |
| 11 | Formula supplementation & paced bottle feeding | C | 8-10 | Path C only; guilt-free framing required |
| 12 | Return-to-work prep (weeks 4-6 preview) | B, C | 5-6 | Introductory only in v1; expanded in v1.1 |
| 13 | Nursing accessories & aids | A, B, C | 8-10 | **NEW** — see notes below |
| 14 | Emotional wellness — guilt, identity, expectations | A, B, C | 5-6 | Normalize only; escalate on any PPD/PPA signals |

**Total target at launch:** 100-150 entries. Categories 1, 2, 3, and 10 weighted highest at seeding (highest predicted query volume).

**What's NOT in v1 (deferred):**
- Medications & galactagogues — removed entirely from v1. The liability surface area (moms acting on medication guidance without a provider) is not worth it at launch. Post-launch, once the advisor is in a stronger review cadence and there's a clear escalation-to-LactMed workflow, this becomes v1.1 Category 15. Every medication question in v1 gets the refusal pattern: "I don't have a vetted answer for medication questions — please call your IBCLC, OB, or the Infant Risk Center hotline at 1-806-352-2519."

---

### Category 7 notes — Pump cleaning, sanitizing, parts replacement & hacks

This is one of the most underserved categories in breastfeeding support. Moms spend enormous time on cleaning and lose significant time and sanity to it. Entries should cover:

- What actually needs to be cleaned vs. what the manual overclaims
- CDC guidance on pump cleaning (the authoritative source; published 2017, still current)
- The "refrigerator method" — what it is, when it's acceptable, when it isn't (immunocompromised situations, NICU preemies)
- Microwave steam bags — do they work, are they safe, which brands
- Parts replacement schedule: flanges/funnels (every 3-6 months or if cracked), valves/membranes (every 2-8 weeks depending on material — this is the most commonly missed), tubing (replace if moldy or cracked), backflow protectors (monthly)
- Signs a part needs replacing: decreased output without other explanation is often worn valves
- Hacks to reduce cleaning burden: dedicated set of parts for overnight, bottle brush shortcut, running parts through dishwasher (top rack, what's dishwasher-safe by brand), steam pod for quick cycles
- Wearable-specific cleaning (Elvie and Willow have different part configurations than standard pumps)

**Source priority for this category:** CDC, pump manufacturer clinical guides (Spectra, Medela, Elvie, Willow), KellyMom for practical tips.

---

### Category 8 notes — Nursing & pumping bras + hands-free options

Product-adjacent but genuinely clinical in impact — the right bra prevents engorgement, enables hands-free pumping, and significantly affects pumping output and time. This isn't marketing content; it's functional support.

- What makes a nursing bra work: proper fit, drop cup vs. pull-aside, underwire vs. not (underwire can cause blocked ducts if fitted incorrectly)
- Hands-free pumping bras: the difference between dedicated pumping bras and adapter inserts; best for wearable pumps vs. conventional pumps
- Sports bra as engorgement management tool (referenced in the AllStarPediatrics FAQ)
- Night nursing bras: what to look for; not all nursing bras are sleep-safe
- Sizing: nursing bra sizing changes with milk volume; when to get refitted
- Path-specific notes: EP and combo moms need hands-free options more than exclusive nursing moms
- **Do not** make specific brand recommendations in canned answers — the category can describe features and what to look for; specific brands belong in the crash-course snippets or external links, not in the vetted answer

---

### Category 13 notes — Nursing accessories & aids

This category covers the products moms encounter in the wild — at baby showers, in Facebook groups, on Amazon — and have real questions about. The answers here prevent both misuse and unnecessary purchases.

Items to cover:
- **Nipple shields:** what they're for (latch difficulties, flat/inverted nipples, prematurity), how to use correctly, how to wean off, when IBCLC guidance is needed before using (answer: ideally always; practically, here's how to use safely if you're on your own)
- **Milk collectors / passive collectors (Haakaa-style):** what they collect (letdown on the non-nursing side), how they work, when to use them and when they backfire (can create oversupply or deplete stash if used too aggressively)
- **Nipple cream / lanolin:** when to use (sore nipples, cracked nipples), what type (100% lanolin vs. APNO — avoid anything with neomycin), safe for baby to ingest in normal amounts, when sore nipples need more than cream
- **Nursing pads:** reusable vs. disposable, importance of keeping nipples dry, when leaking is a supply concern vs. just a normal early-weeks thing
- **Nipple everters / inverted nipple devices:** what they are, when to use, limitations
- **Breast shells (milk catchers worn inside bra):** not to be confused with nipple shields; used for inverted nipples or soreness
- **Nursing pillows (Boppy, My Brest Friend):** how they support positioning; not a substitute for correct positioning technique
- **Supplemental Nursing System (SNS):** what it is, who it's for, why IBCLC guidance is strongly recommended before starting

**Note:** this category is likely to generate a lot of below-threshold queries in v1 because product landscape evolves fast. Flag the entire category for priority v1.1 expansion.

---

## 3. Entry format

Every entry follows this exact schema. Consistency is critical because the semantic matching model is tuned to the question_variants field specifically.

**Working format is Airtable or Google Sheets — see Section 6 for why, and why not flat YAML.**

Each row in the working spreadsheet/database = one entry, with these columns:

| Field | Type | Notes |
|---|---|---|
| `id` | Text | Format: `[CATEGORY_CODE]-[###]` e.g. SUP-012, LAT-003 |
| `category` | Single-select | One of the 14 categories |
| `paths` | Multi-select | A, B, C — one or more |
| `weeks` | Multi-select | 1-2, 3-4, 5-6, all |
| `question_variants` | Long text | 2-4 phrasings of the same question, one per line. This is what the matching model indexes. |
| `answer` | Long text | The verbatim canned answer. 50-150 words. Plain language. 2nd person. No bullets. Must be safe to return without further review. |
| `escalation_trigger` | Checkbox | Checked = answer must include explicit "contact your IBCLC/provider if X" instruction |
| `escalation_text` | Long text | The specific escalation language; populated when escalation_trigger is checked |
| `sources` | Long text | Org, title, URL, version/date — one per line |
| `advisor_reviewed` | Date | Blank = pending |
| `review_due` | Date | 12 months after advisor_reviewed; sooner for rapidly-evolving topics |
| `confidence_tier` | Single-select | High = stable clinical consensus; Medium = current best practice, may evolve |
| `notes` | Long text | Internal note for advisor — context, edge cases, what to watch |

**A worked example (as it would look in plain text, though the working format is a spreadsheet row):**

```
id: SUP-003
category: Supply — establishing, maintaining, concerns
paths: A, C
weeks: 1-2
question_variants:
  My milk hasn't come in yet, is that normal?
  Day 3 and no milk, should I be worried?
  How long does it take for milk to come in?
  When will my milk come in?

answer:
  Milk typically comes in between day 2 and day 5 after birth — and this is completely normal.
  In the meantime, your body is producing colostrum: a thick, golden-yellow fluid that's small
  in volume but packed with antibodies and exactly what your newborn needs right now.
  
  If your baby is nursing 8-12 times a day, has at least 1 wet diaper for each day of age
  (e.g., 3 wet diapers on day 3), and seems settled after feeds, things are likely on track.
  
  If your milk hasn't come in by day 5-6, your baby is losing more than 10% of birth weight,
  or you have fewer wet diapers than expected — reach out to your IBCLC or pediatrician right away.

escalation_trigger: yes
escalation_text: Reach out to your IBCLC or pediatrician if milk hasn't come in by day 5-6,
  baby has lost more than 10% of birth weight, or has fewer wet diapers than expected.

sources:
  Academy of Breastfeeding Medicine Protocol #5 — Peripartum Breastfeeding Management. bfmed.org/protocols
  LLLI — "When Will My Milk Come In?" llli.org

advisor_reviewed: pending
review_due: 2027-05
confidence_tier: high
notes: The "1 wet diaper per day of age" rule is ABM-standard but some hospitals use different
  thresholds. Confirm the exact language used here matches what advisor's own patients are told.
```

---

## 4. Schema format — why not YAML, and what to use instead

*You asked how I arrived at the YAML format and whether there are potential troubles. Honest answer: YAML was a reasonable first draft for a human-readable specification, but it's the wrong working format for this use case. Here's why, and what to use instead.*

### Why YAML has problems here

1. **Your advisor is not a developer.** YAML is indentation-sensitive — one wrong space breaks the entire file. A non-technical IBCLC editing entries in a text editor will accidentally corrupt the file regularly. The collaboration friction is real.

2. **150 entries in a single YAML file is ~20,000 lines.** That's manageable for a developer with a text editor, but completely unusable for advisor review or for quickly finding "show me all the breast health entries that haven't been reviewed yet."

3. **Multiline strings in YAML are error-prone.** The `answer` field is the most important field — it's what gets returned verbatim to a mom at 3am. Multiline string handling in YAML (the `|` operator, indentation rules) is a common source of silent formatting errors that are hard to catch without tooling.

4. **The matching system doesn't read YAML anyway.** The semantic matching model needs entries in a vector store (e.g. Pinecone, Weaviate, or a simple pgvector table) or as JSON objects passed to an embedding API. YAML will be converted to JSON before it ever touches the technical system — so YAML is just a translation layer that adds no value.

5. **Version control for medical content needs dates and attribution, not diffs.** Git diffs on YAML multiline strings are messy and hard to audit. A database or spreadsheet with timestamped rows is a better audit trail.

### What to use instead

**Working format for authoring + advisor review: Airtable or Google Sheets**

Both tools let you filter by category, sort by review status, comment on individual rows, and share with the advisor with view/edit permissions. The advisor can work in a familiar spreadsheet interface. You can see "show me all entries in Category 9 (Breast health) that haven't been reviewed yet" in two clicks.

- **Airtable** is better if you want richer data types (linked records, select fields, attachment fields for source PDFs) and you're willing to pay ($20/month is sufficient). The gallery view also lets you see one entry at a time, which is better for focused advisor review.
- **Google Sheets** is free, simpler, and sufficient. Slightly worse UX for a large library but entirely workable at 150 entries.

**Export format for the technical matching system: JSON**

When entries are ready for the matching system, export from Airtable/Sheets to a JSON array. Each entry becomes a JSON object with the same fields. An embedding model (`text-embedding-3-small` via OpenAI) generates a vector for each `question_variants` value; those vectors go into the store. At query time, the user's question is embedded and cosine-matched against the stored vectors; the highest-confidence match returns the corresponding `answer` field verbatim.

Claude Haiku (Anthropic) is a separate, non-embedding component. It does not generate vectors. It is the chat LLM that operates around retrieval: selecting the best answer from the small candidate set the vector search returns, and drafting answers for questions that don't match any existing entry (under a tight system prompt, refusing with `draft_status = 'cannot_generate'` for medication, diagnosis, or clinical-evaluation requests). GPT-4o-mini is the fallback if Anthropic's API is unavailable.

**The schema itself (the fields) is correct** — question_variants, answer, escalation_trigger, sources, advisor_reviewed, review_due, confidence_tier. Those stay. Only the file format changes.

**Recommendation:** set up an Airtable base now, before content authoring begins. The advisor's first batch review will be much smoother if she's working in a spreadsheet than in a text editor with a .yaml file.

---

## 5. Sourcing strategy — priority order

The advisor's job is to *vet and adapt*, not author from scratch. Source material is gathered in priority order; the advisor edits it into the canned-answer format.

### Tier 1: Pre-existing IBCLC-curated and evidence-based organizations

These organizations publish vetted, freely accessible consumer-facing or clinical content.

| Source | What to pull | Access |
|---|---|---|
| **Academy of Breastfeeding Medicine (ABM)** | Clinical protocols — especially #2, #3, #5, #8, #9, #10, #14, #15, #20, #29, #32 | Free at bfmed.org/protocols |
| **La Leche League International (LLLI)** | FAQ and topic articles | Free at llli.org |
| **International Lactation Consultant Association (ILCA)** | Position statements, clinical resources | Free at ilca.org |
| **American Academy of Pediatrics (AAP)** | Breastfeeding policy statement (2022 update), Pediatrics journal articles | Some free; full text via institutional library or $15/article |
| **Global Health Media** | Video guides + accompanying written materials; especially the Breastfeeding series used in clinical training globally | Free at youtube.com/@globalhealthmedia |
| **CDC** | Breastfeeding fact sheets, **milk storage guidelines** (the authoritative reference for Category 6) | Free at cdc.gov |
| **WHO** | Infant feeding guidelines, UNICEF/WHO joint resources | Free at who.int |

### Tier 2: High-quality IBCLC-founded or evidence-citing consumer sources

| Source | Notes | Access |
|---|---|---|
| **KellyMom.com** | IBCLC-founded, evidence-based, widely cited. Especially good for supply, pumping mechanics, and Category 7 (pump cleaning) practical guidance | Free |
| **Nancy Mohrbacher resources** (breastfeedingusa.org, Breastfeeding Made Simple) | Evidence-based IBCLC, highly credible | Free site; book ~$20 |
| **Breastfeeding Medicine blog** (ABM-affiliated) | Research-grounded clinical commentary | Free |

### Tier 3: Authoritative pediatric and lactation practice FAQ pages

Pediatric practices and hospital lactation programs that use Schmitt Pediatric Guidelines or equivalent licensed clinical content often publish Q&A pages that reflect what parents actually ask. **These pages are useful for identifying what questions to seed, not for copying answers** — the content is copyrighted by the underlying guideline publisher (Schmitt Pediatric Guidelines LLC in the case of All Star Pediatrics).

The right way to use these:

1. **Identify the question list** — the Topics Covered section on a page like allstarpediatrics.com/Breast-Feeding-Questions gives you a validated map of what questions pediatricians actually need to answer. Use it to audit your library for coverage gaps.
2. **Author answers from Tier 1 sources** — once you know a question needs to be covered (e.g. "How to increase milk supply"), go to ABM Protocol #3 or LLLI for the authoritative content to adapt. Don't copy the Schmitt text.

**Useful pages to map for question coverage** (not for copying answers):
- allstarpediatrics.com/Breast-Feeding-Questions — comprehensive Q&A, covers engorgement, blocked ducts, leaking, stools, storage, letdown issues, vitamin D
- Most hospital systems publish similar pages under their Maternity or Lactation section
- La Leche League's own FAQ at llli.org
- KellyMom's topic index

### Tier 4: Clinical reference databases for specific factual entries

| Resource | Cost | What it covers |
|---|---|---|
| **LactMed (NIH NCBI)** | Free | Drug and lactation database — will be essential when medications category is added post-launch |
| **Infant Risk Center / InfantRisk.com** | $10/month consumer app; free phone hotline | Same — deferred to post-launch with medications category |
| **PubMed** | Free | Latest peer-reviewed studies for entries where primary sources are >3 years old |

### Tier 5: Manufacturer clinical and user guides

Elvie, Willow, Spectra, Medela, Momcozy, and Spectra all publish clinical/user guides. Acceptable for Category 3 (pumping mechanics), Category 7 (pump cleaning), and Category 8 (bras) entries, but cross-checked against Tier 1 sources for any clinical claims.

### What NOT to use as source material

- Reddit, BabyCenter, What to Expect, The Bump — quality inconsistent, not vetted
- TikTok or Instagram creator content regardless of credentials
- Any AI-generated content (ChatGPT, Perplexity, etc.)
- Product marketing copy except for product-specific technical specifications

---

## 6. Seeding the launch library — 100-150 entries

### Three inputs, weighted

**Input 1: Predicted high-volume questions (40-50 entries)**
Derived from two sources:
- **Experiment 2 survey data** (Q21-24) — what moms said their biggest questions were. These are actual 3am questions from real moms, not our guesses.
- **Authoritative FAQ page topic lists** — the AllStarPediatrics page and similar pages show what pediatricians get asked consistently. Use the Topics Covered section as a coverage checklist, not as source material for answers.

**Input 2: Protocol-derived questions (40-50 entries)**
Each module in the v1 protocol generates 2-3 predictable follow-up questions. The protocol authors add these to the FAQ backlog as they write each module: "after reading module A-1-2 (latch), what 2-3 questions would a mom type into chat at 2am?" Low incremental authoring cost; high library coverage for protocol-adjacent questions.

**Input 3: IBCLC "3am texts" questions (20-30 entries)**
Ask the advisor: "What are the 20 questions you get texted most at odd hours by patients?" These are gold. They're the gap between hospital discharge education and what moms actually need. They will not fully overlap with the Experiment 2 survey (survey respondents are 2-5 months out; 3am texts come from week 1-2 moms with immediate crises).

### Entry prioritization within each category

Seed in this order within each category:
1. Questions containing urgency/distress language ("I'm so worried," "something is wrong," "baby won't")
2. Questions about the first 72 hours and week 1 (highest query volume by phase)
3. "Is this normal?" questions (most psychologically loaded)
4. Process/how-to questions
5. Equipment and product questions (important but less acute)

### Defer to v1.1 expansion

- Long-tail product-specific questions (pump brand variants beyond top 3-4)
- Return-to-work pumping depth (introductory in v1, full expansion in v1.1)
- Medications (entire category deferred)
- Weaning and gradual session reduction
- Supply issues from illness or hormonal factors (flag-and-escalate in v1; full entries in v1.1)
- Most of Category 13 (nursing accessories) beyond the top 5 items — the product landscape evolves too quickly for all of it to be in v1

---

## 7. Safety rules for entry authoring

Before advisor review. If any of these exist in a draft entry, redraft before sending to advisor:

1. **The answer reassures when it should escalate.** Any breast pain, unusual milk color, baby refusing breast or bottle, signs of mastitis → escalate explicitly and prominently.
2. **The answer contains any medication information.** The entire category is deferred. The canned answer for any medication question is: "I don't have a vetted answer for medication questions. Please call your IBCLC, OB, or the Infant Risk Center at 1-806-352-2519 (Mon-Fri, 8am-5pm Central). If this is an emergency, call 911."
3. **The answer is >200 words.** If it needs to be longer, split it into two entries.
4. **The answer uses absolute terms** ("always," "never," "you must," "this means") — replace with probability language ("in most cases," "most moms find," "this can sometimes indicate").
5. **The answer makes a diagnosis.** Replace "you have low supply" with "this can sometimes indicate supply challenges."
6. **Emotional wellness entries therapize.** Normalize and validate only. Any hint of PPD/PPA → immediate escalation to human resources and Edinburgh Postnatal Depression Scale link.
7. **The escalation_text is buried.** If escalation_trigger is checked, the escalation instruction must appear in the last 1-2 sentences of the answer, not as an afterthought after a long reassurance.

---

## 8. Refresh cadence

### Ongoing (lightweight, automated)
- Every below-threshold chat turn is logged as a potential expansion entry. Review weekly; prioritize by frequency.
- Advisor receives a monthly "library digest" — top 10 below-threshold queries from prior month + any entries that received user negative feedback more than twice. ~2 hours/month.

### Quarterly review (advisor-led, ~4-6 hrs)
- Review flagged entries since last quarter
- Spot-check all of Category 9 (breast health) and Category 2 (supply) against current ABM protocols
- Check ABM protocol publication page for new or updated protocols in the past 90 days
- Check AAP breastfeeding policy page for updates

### Annual full audit (advisor + Ashley, ~12-15 hrs)
- Every entry reviewed against current ABM, LLLI, and CDC guidelines
- Entries sourced from studies >3 years old cross-checked against PubMed for superseding evidence
- All `review_due` dates refreshed
- New categories proposed based on prior-year query telemetry
- `confidence_tier` reassessed for all Medium entries

### Version control
- Every entry has an `advisor_reviewed` date — when updated, the prior version is archived (not deleted)
- Airtable's built-in revision history serves as the audit trail
- After any batch update of >10 entries, the semantic matching model is re-evaluated against the eval set before the new entries go live

---

## 9. Advisor review workflow (pre-launch)

**Estimated time:** ~20-30 hrs (editing source material into format, not authoring cold)

1. Ashley + team draft entries in the Airtable base, sourced from Tier 1 and Tier 2 materials. `advisor_reviewed` blank.
2. Advisor receives category batches, not a full dump. **Recommended batch order:** Category 9 (breast health — highest safety stakes) → Categories 1, 2, 3 (highest query volume) → Categories 5, 6, 7 (factual/equipment) → Categories 11, 13, 14 (formula, accessories, emotional).
3. Advisor edits directly in Airtable. Can approve, flag for redraft, or edit the answer text.
4. All entries with `escalation_trigger` checked get a second pass to confirm escalation text is prominent.
5. Advisor signs off on the complete library with a dated attestation note (a dedicated Airtable record works fine).

---

## 10. What this library is NOT

- A medical diagnosis tool
- A substitute for an IBCLC consultation
- Comprehensive — it will refuse questions outside its scope, and that is correct behavior
- Static — it grows and is updated on the cadence above

The refusal pattern is a safety feature, not a product failure. Every time Latched says "I don't have a vetted answer for that — here's how to reach a human," it's working as designed.

---

## Open questions for advisor pre-launch discussion

1. What are your top-20 "questions I get texted most at odd hours"? (Seeds Categories 1, 2, 3 especially)
2. For Category 9 (breast health): what's your clinical threshold for "try this and monitor 24 hours" vs. "call your provider today"? The entries need to reflect your threshold.
3. For Category 13 (nursing accessories): are there any accessories — nipple shields specifically — where you want the answer to be "use only with IBCLC guidance" rather than "here's how to use safely"? Shields are on the fence.
4. For Category 11 (formula/paced bottle feeding): which paced bottle feeding protocol do you want to cite? Confirm formula prep language matches AAP/WHO safe preparation guidelines.
5. For Category 14 (emotional wellness): preferred escalation language for entries that hint at PPD/PPA — do you name it explicitly or keep it as "if you're struggling more than expected"? Naming it reduces stigma but also requires careful wording.
6. ~~Medication refusal text: confirm the Infant Risk Center phone number (1-806-352-2519) is still current before it goes in every medication refusal response.~~ ✓ Confirmed 2026-05-24. 911 note added to refusal text.
