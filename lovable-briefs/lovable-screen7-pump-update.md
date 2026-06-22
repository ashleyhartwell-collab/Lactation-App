# Lovable Update Prompt — Screen 7 Pump Selection Rewrite
**Paste the block below directly into Lovable.**

---

```
Update the onboarding Screen 7 (Pump Selection) component and the AppContext. This is a full replacement of the existing Screen 7 logic. Do not touch any other screens.

---

PART 1 — Update AppContext

Change the existing `pumpBrand: null` field to `pumpModels: []` (an array of strings, not a single value). Update every reference to `pumpBrand` in the codebase to `pumpModels`.

---

PART 2 — Rewrite Screen 7 component

Screen 7 only shows if `feedingPath` is B or C.

Step indicator: "Step 7 of 9"
Headline: "Which pump are you using?"
Subtext (14px, neutral-500, below headline): "Select all that apply — many moms use more than one."

---

BRAND SELECTION — First Level

Show brand chips in a single-column list (full width, not 2-column grid). Each chip is a rounded-lg card, not a pill — give them more visual weight since they're the first choice.

Brands in this order:
1. Spectra
2. Medela
3. Elvie
4. Willow
5. Momcozy
6. BabyBuddha

Below the six brand chips, a text link (not a chip):
"Other →"
Clicking "Other →" adds the string "Other" to `selectedModels` and does not open a sub-list.

CHIP APPEARANCE:
- Unselected: bg-neutral-100, border border-neutral-200, text neutral-900, py-3 px-4
- Selected: bg-primary-500, border border-primary-500, text white
- Font: 16px, font-semibold
- Full width of the content area, left-aligned text
- Checkmark icon on the right side when selected (use a simple ✓)
- Multiple brands can be selected simultaneously

---

MODEL SELECTION — Second Level (appears inline, below a selected brand chip)

When the user taps a brand chip to select it, immediately expand a sub-section directly below that brand chip (push subsequent chips down — do not use a modal or drawer). The sub-section shows that brand's specific models as smaller pill chips.

Model pills:
- Smaller than brand chips: py-2 px-3, text-sm (14px), rounded-full
- Arranged in a wrapping flex row (not a single column)
- Unselected: bg-neutral-100, border border-neutral-200, text neutral-700
- Selected: bg-primary-300, border border-primary-500, text primary-700
- Multiple models can be selected from the same brand and across brands

When the user deselects a brand chip, collapse the sub-section and remove any models from that brand from `selectedModels`.

MODEL LISTS — use exactly these strings:

Spectra models:
- Spectra S1 Plus
- Spectra S2 Plus
- Spectra Synergy Gold
- Spectra Synergy Gold Portable
- Spectra 9 Plus
- Spectra CaraCups

Medela models:
- Medela Pump In Style Pro
- Medela Freestyle Hands-free
- Medela Solo
- Medela Swing Maxi
- Medela Symphony (Hospital-Grade)
- Medela Harmony (Manual)

Elvie models:
- Elvie Pump
- Elvie Stride
- Elvie Stride 2
- Elvie Curve (Manual)

Willow models:
- Willow 360
- Willow Go
- Willow Wave 2-in-1 (Manual)

Momcozy models:
- Momcozy M5
- Momcozy M9 Mobile Flow
- Momcozy M6 Mobile Style
- Momcozy S12 Pro
- Momcozy Air 1

BabyBuddha models:
- BabyBuddha 2.0
- BabyBuddha Wearable Breast Pump
- BabyBuddha Manual

---

STATE MANAGEMENT

Use two pieces of local state:
- `selectedBrands: string[]` — which brand chips are currently toggled on
- `selectedModels: string[]` — the flat list of specific model strings (e.g. ["Spectra S1 Plus", "Willow Go"]) that will be saved

When a model pill is tapped:
- If not already in `selectedModels` → add it
- If already in `selectedModels` → remove it

When a brand is deselected:
- Remove all models for that brand from `selectedModels`

When "Other →" is tapped:
- Toggle "Other" in `selectedModels` directly (no sub-list)
- Style the "Other" text link with an underline when active and neutral-900 color; neutral-500 when inactive

---

BOTTOM ACTIONS

Below all chips:
- A text link: "Not sure yet / haven't received mine →" (small, neutral-500, underlined). Tapping it advances without saving anything to `pumpModels`.
- A Continue button: primary-500 background, white text, full width, rounded-xl, 52px tall. Label: "Continue". Active only when `selectedModels.length > 0`. Disabled state: bg-neutral-200, text neutral-500, cursor-not-allowed.

On Continue: save `selectedModels` to `AppContext.pumpModels` and advance to the next screen.

---

ACCESSIBILITY
- All brand chips and model pills: minimum 44px touch target height
- "Not sure yet" link: minimum 44px tap zone via padding
- Selected state communicated via both color and the ✓ icon (not color alone)

---

DEMO BEHAVIOR
The demo feedingPath is A (nursing), so Screen 7 is skipped in the live demo flow. The component still needs to be built and functional — it will be visible when testing Path B or C. You do not need to pre-select anything for the demo.
```
