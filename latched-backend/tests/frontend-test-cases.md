# Latched — Frontend Test Cases
**Scope:** Quick Chat / semantic search response rendering  
**Last updated:** May 26, 2026  
**API version:** v2 (results[] shape)

These test cases cover every branch of the `/query` response the frontend must handle. Run them manually in the Lovable preview by temporarily overriding the mock matching function's return value to match each fixture below.

---

## Response Shape Reference

```json
// Matched
{
  "matched": true,
  "results": [
    {
      "sub_question": "string — the atomic question that triggered this result",
      "faq_id": "uuid",
      "answer": "string",
      "confidence_tier": "HIGH" | "MEDIUM",
      "cosine_score": 0.0–1.0,
      "caveat": "string — only present for MEDIUM tier"
    }
  ],
  "contradiction_warning": "string" | null
}

// No match
{ "matched": false }
```

---

## TC-01 — Single HIGH-confidence result (happy path)

**Input question:** "How do I know if Nora has a good latch?"

**Mock API response:**
```json
{
  "matched": true,
  "results": [
    {
      "sub_question": "How do I know if my baby has a good latch?",
      "faq_id": "a1b2c3d4-0001-0000-0000-000000000001",
      "answer": "Figuring out a good latch is one of the first things you and Nora are learning together...",
      "confidence_tier": "HIGH",
      "cosine_score": 0.94
    }
  ],
  "contradiction_warning": null
}
```

**Expected UI:**
- One answer card renders (left-aligned, 3px left border primary-300, shadow-sm)
- NO sub_question label above the answer — single-result UI is identical to original single-answer design
- NO caveat block
- NO contradiction banner
- IBCLC badge (🛡️ IBCLC-reviewed) appears once, below the answer card
- No-match fallback is NOT shown

---

## TC-02 — Single MEDIUM-confidence result (with caveat)

**Input question:** "Can I take ibuprofen while nursing?"

**Mock API response:**
```json
{
  "matched": true,
  "results": [
    {
      "sub_question": "Is ibuprofen safe while breastfeeding?",
      "faq_id": "a1b2c3d4-0002-0000-0000-000000000002",
      "answer": "Ibuprofen is generally considered compatible with breastfeeding at standard doses. It transfers into breast milk at very low levels.",
      "confidence_tier": "MEDIUM",
      "cosine_score": 0.71,
      "caveat": "Medication safety during breastfeeding varies by individual — always confirm with your provider or pharmacist before taking."
    }
  ],
  "contradiction_warning": null
}
```

**Expected UI:**
- One answer card renders
- NO sub_question label (single result)
- Caveat block renders inside the card, below the answer body:
  - Top divider (border-t border-neutral-200, pt-2, mt-2)
  - "⚠️ Note: Medication safety during breastfeeding varies..." — 13px, neutral-500, italic
- NO contradiction banner
- IBCLC badge once, below the card
- No-match fallback is NOT shown

---

## TC-03 — Multiple results, no contradiction

**Input question:** "I have a lump in my breast and a fever"

**Mock API response:**
```json
{
  "matched": true,
  "results": [
    {
      "sub_question": "What does a hard, painful lump in the breast mean while breastfeeding?",
      "faq_id": "a1b2c3d4-0003-0000-0000-000000000003",
      "answer": "A hard, tender lump can be a clogged duct or the beginning of mastitis. A clogged duct typically feels like a firm, tender spot without fever or flu-like symptoms...",
      "confidence_tier": "HIGH",
      "cosine_score": 0.89
    },
    {
      "sub_question": "When should I call my provider about breast pain and fever?",
      "faq_id": "a1b2c3d4-0003-0000-0000-000000000004",
      "answer": "Mastitis involves localized pain plus fever (usually above 101°F), body aches, or feeling like you have the flu. Mastitis needs to be evaluated by your provider — it may require antibiotics...",
      "confidence_tier": "HIGH",
      "cosine_score": 0.82
    }
  ],
  "contradiction_warning": null
}
```

**Expected UI:**
- NO contradiction banner (contradiction_warning is null)
- Two answer cards render in order (first result first)
- BOTH cards show the sub_question label above their answer body — 12px, primary-700, font-semibold, italic
  - Card 1 label: "What does a hard, painful lump in the breast mean while breastfeeding?"
  - Card 2 label: "When should I call my provider about breast pain and fever?"
- No caveat blocks (both HIGH tier, no caveat field)
- IBCLC badge appears ONCE, below the second (last) card only — NOT between cards
- No-match fallback is NOT shown

---

## TC-04 — Multiple results WITH contradiction warning

**Input question:** "Should I nurse or pump to relieve engorgement?"

**Mock API response:**
```json
{
  "matched": true,
  "results": [
    {
      "sub_question": "How do I relieve engorgement by nursing?",
      "faq_id": "a1b2c3d4-0004-0000-0000-000000000005",
      "answer": "The most effective relief for engorgement is frequent nursing — emptying the breast regularly signals your body to recalibrate...",
      "confidence_tier": "HIGH",
      "cosine_score": 0.87
    },
    {
      "sub_question": "Should I pump to relieve engorgement?",
      "faq_id": "a1b2c3d4-0004-0000-0000-000000000006",
      "answer": "If Nora is struggling to latch when you're engorged, hand-express or pump just enough to soften the areola before latching — not a full emptying, which would stimulate more production...",
      "confidence_tier": "MEDIUM",
      "cosine_score": 0.74,
      "caveat": "Pumping to full emptying during engorgement can increase supply and worsen the cycle — express only enough to soften."
    }
  ],
  "contradiction_warning": "Note: these answers may suggest different approaches — we recommend speaking with a lactation consultant."
}
```

**Expected UI:**
- Contradiction banner renders FIRST, above both answer cards:
  - bg-[#FFF3CD], border border-[#C47F1A], rounded-xl, px-4 py-3, mb-3
  - ⚠️ icon + "Note: these answers may suggest different approaches — we recommend speaking with a lactation consultant."
- Two answer cards render below the banner, in order
- Both cards show sub_question labels (multiple results)
- Card 2 shows the caveat block: "⚠️ Note: Pumping to full emptying during engorgement..."
- IBCLC badge once, below the last card
- No-match fallback is NOT shown

---

## TC-05 — No match (matched: false)

**Input question:** "What is a doula?"

**Mock API response:**
```json
{ "matched": false }
```

**Expected UI:**
- No answer cards
- No IBCLC badge
- No sub_question labels
- No contradiction banner
- No caveat blocks
- The no-match fallback response renders:
  "That's a specific one — I want to make sure you get a reliable answer rather than a guess. Here's how to reach someone who can actually help:"
  Followed by 3 tappable escalation rows (Contact Sarah, Hospital lactation line, Find an IBCLC)
  Followed by the "Your question was noted" italic footer text

---

## TC-06 — Single result visual parity check

**Purpose:** Confirm that a single-result response is visually indistinguishable from the original pre-API single-answer design.

**Input question:** "My supply dropped"

**Mock API response:**
```json
{
  "matched": true,
  "results": [
    {
      "sub_question": "Why did my milk supply suddenly drop?",
      "faq_id": "a1b2c3d4-0006-0000-0000-000000000007",
      "answer": "A sudden drop usually has an identifiable cause, which means it's often fixable...",
      "confidence_tier": "HIGH",
      "cosine_score": 0.91
    }
  ],
  "contradiction_warning": null
}
```

**Expected UI — must match exactly:**
- Answer card: left-aligned, bg-white, rounded-2xl rounded-tl-sm, px-4 py-3, max-width 85%, 3px left border #A8D5D1, shadow-sm
- NO sub_question label anywhere above the answer
- NO caveat
- NO banner
- IBCLC badge (🛡️ IBCLC-reviewed), 12px, primary-700, left-aligned, directly below the card
- Visually: no difference from a pre-API answer. This is the regression check.

---

## TC-07 — Empty results array (edge case)

**Mock API response:**
```json
{
  "matched": true,
  "results": [],
  "contradiction_warning": null
}
```

**Expected UI:**
- Treat as no-match: show the no-match fallback
- Do NOT show an empty card area
- Do NOT show the IBCLC badge

---

## Notes for Testing

- To run TC-03 through TC-06 in the Lovable demo: temporarily hardcode the matching function to return the fixture JSON instead of searching the Q&A library. Restore after verifying.
- The `cosine_score` field is not displayed in the UI — it's backend metadata. Do not render it.
- The `faq_id` field is not displayed in the UI — it's for backend logging.
- `confidence_tier` affects whether `caveat` is present but is not displayed directly to the user.
- The contradiction banner color is `#FFF3CD` background, `#C47F1A` border and icon — matching the app's `warning` color token.
