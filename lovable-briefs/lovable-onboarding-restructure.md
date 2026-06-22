# Lovable Update Prompt — Onboarding Flow Restructure
**Paste the block below directly into Lovable.**

---

```
Restructure the onboarding flow. This is a reorder and merge — do not change any screen's internal form logic, validation, visual design, or data fields. Only change: screen order, step indicators, the AppContext routing between screens, and the one screen merge described in Part 2. Do not touch anything outside of onboarding screens and AppContext flow routing.

---

OVERVIEW

Current pre-paywall sequence (7 steps):
  Welcome → Name/Address → Baby Name → Baby DOB → Feeding Path → Goal/Reason → Breast Anatomy → [Pump, B/C only] → Paywall

New pre-paywall sequence (3 steps):
  Welcome → Name/Address → Baby Name+DOB (merged) → Feeding Path → Paywall

New post-paywall personalization sequence (before home transition):
  Account Creation → Goal/Reason → Breast Anatomy → [Pump, B/C only] → Home Transition

---

PART 1 — UPDATE STEP INDICATORS THROUGHOUT PRE-PAYWALL

Change the step indicator on every pre-paywall content screen to reflect the new total of 3 steps:

  Name/Address screen:   "Step 1 of 3"
  Baby Name+DOB screen:  "Step 2 of 3"
  Feeding Path screen:   "Step 3 of 3"

Remove step indicators entirely from: Welcome screen, Paywall screen.
Do not add step indicators to any post-paywall screen (see Part 4 for what to show instead).

---

PART 2 — MERGE BABY NAME AND BABY DOB INTO ONE SCREEN

Replace the two separate screens (baby name screen and baby DOB screen) with a single screen. Preserve all existing field logic, validation, and AppContext writes from both screens — just place them together.

Layout (top to bottom):
- Step indicator: "Step 2 of 3"
- Headline: "Tell me about your baby."
- Subtext (14px, neutral-500): "We'll use this to make everything relevant to right now."
- Baby name input (same as the existing baby name screen — placeholder "Baby's first name")
- Below the name input: "I'll add this later →" text link (skips the name field only, does not skip DOB)
- Baby date of birth picker (same as the existing DOB screen, including the "I'm not sure of the exact date" fallback that shows a weeks-old slider)
- Continue button (full width, primary-500, 52px, rounded-xl). Active when DOB has a value. Baby name is still optional.

Saving behavior (unchanged):
- Baby name → saves to AppContext exactly as the current baby name screen does
- Baby DOB → saves to AppContext exactly as the current DOB screen does
- "I'll add this later" on name → skips name, does not block DOB entry or the Continue button
- Continue → advances to the Feeding Path screen (Step 3 of 3)

---

PART 3 — REMOVE GOAL/REASON, BREAST ANATOMY, AND PUMP FROM PRE-PAYWALL

Remove the following screens from the pre-paywall sequence. Do not delete them — preserve their components intact, they will be used post-paywall.

Screens to remove from pre-paywall:
  - Goal / Reason for Being Here screen
  - Breast Anatomy screen
  - Pump Selection screen (currently Screen 7)

After this change, the Feeding Path screen (Step 3 of 3) advances directly to the Paywall. No screens appear between path selection and the paywall.

---

PART 4 — ADD POST-PAYWALL PERSONALIZATION FLOW

After Account Creation (the existing post-paywall screen), insert the three personalization screens before the home screen transition. Use the existing screen components — only their position in the flow changes.

Post-paywall sequence:
  1. Account Creation (existing — no change)
  2. Goal / Reason screen (moved here from pre-paywall)
  3. Breast Anatomy screen (moved here from pre-paywall)
  4. Pump Selection screen (moved here — only shows if feedingPath is B or C; if path A, skip directly to step 5)
  5. Home screen transition (existing — no change)

On each post-paywall personalization screen, replace the step indicator with a small label above the headline:
  Text: "Personalizing your plan"
  Style: 12px, neutral-400, uppercase tracking-wide

Add a "Skip for now →" text link below the Continue button on each post-paywall personalization screen (14px, neutral-500, underlined). Tapping it saves nothing for that screen and advances to the next screen in the post-paywall sequence using the same path-aware logic described above.

The existing "Not sure yet / haven't received mine →" link on the Pump screen should remain — it functions the same as "Skip for now" in this new context (advances without saving).

---

PART 5 — UPDATE APPCONTEXT ROUTING

Update the flow logic in AppContext so screens advance in this exact order:

Pre-paywall:
  Welcome → Name/Address → Baby Name+DOB (merged) → Feeding Path → Paywall

Post-paywall:
  Paywall → Account Creation → Goal/Reason → Breast Anatomy → Pump (if feedingPath B or C, else skip) → Home Transition

Each "Skip for now" on a post-paywall screen uses the same path-aware next-screen logic.

---

PART 6 — PAYWALL HEADLINE COPY

The paywall headline previously referenced the goal/reason. Since that is now collected post-paywall, update the paywall personalization headline to use only: name (address preference), feeding path, and weeks postpartum.

Use this pattern:
  "[Name], here's your [6-week nursing / 6-week pumping / 6-week combination feeding] plan — starting at week [X]."

Path label mapping:
  Path A → "6-week nursing"
  Path B → "6-week pumping"
  Path C → "6-week combination feeding"

Remove any reference to the goal/reason from paywall copy. Name + path + week is the personalization. Everything else on the paywall screen stays the same.

---

DO NOT CHANGE:
- Any screen's internal form logic, field validation, or AppContext data fields
- Any visual design, colors, component styles, or spacing
- The home screen, chat, protocol, or tracker features
- Account creation screen content or logic
- The home screen transition animation or copy
- Any backend API calls or data-saving behavior
```
