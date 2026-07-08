# Lovable Update Prompt — New Module: Cluster Feeding (split out of Reading Nora's Cues)

**Paste the block below directly into Lovable.**

---

```
Split cluster feeding out of Module 4 (Reading Nora's Cues) into its own full module. Cluster feeding is confusing and anxiety-inducing enough for new moms that it deserves its own space instead of a single callout buried at the end of another module. This adds a new Module 5 ("Cluster Feeding"), shortens the cluster feeding section inside Reading Nora's Cues into a teaser that links out to it, and renumbers the two modules that come after. Do not change anything else — not the app shell, bottom nav, home screen, chat, This Week, onboarding, or AppContext structure beyond what's listed in Part 4.

---

PART 0 — WHAT'S CHANGING (SUMMARY)

Getting Started now has 7 modules instead of 6:
  1. Your First 48 Hours — unchanged
  2. Latch & Positioning — unchanged
  3. Feeding Your Supply — unchanged
  4. Reading Nora's Cues — shorten the cluster feeding section, add a link-out
  5. Cluster Feeding — NEW
  6. Common Concerns & When to Call — same content, renumbered from Module 5
  7. The Fourth Trimester — same content, renumbered from Module 6

Route slugs for the renumbered modules do NOT change (/getting-started/concerns and /getting-started/fourth-trimester stay the same). Only their position number and "Module X of Y" label change. All shared structure (header, title block, chat bridge, done button) from the existing module pattern stays exactly as-is — just update the total module count from 6 to 7 everywhere it appears.

---

PART 1 — UPDATE MODULE 4: READING NORA'S CUES (SHORTEN + LINK OUT)
Route: /getting-started/cues (no change)

Find the existing "About cluster feeding" section near the end of this module (section heading: "About cluster feeding", followed by an accent-200 callout card). Replace the callout body and add a link row beneath it. Do not touch any other section of this module (hunger spectrum, satiation cues, Try This callout, chat bridge all stay the same).

REPLACE the existing cluster feeding callout with:

Cluster feeding callout (bg-accent-200, rounded-2xl, px-5 py-4):
  Label: "CLUSTER FEEDING" — 11px, accent-700, uppercase, tracking-wider, font-semibold
  Body: "If Nora nurses for 45 minutes, unlatches, fusses immediately, and wants right back on — she's cluster feeding. It's normal, temporary, and not a sign your supply is low." — 15px, accent-700, leading-relaxed

  Link row (mt-3, flex flex-row items-center gap-1):
    Text: "See the full Cluster Feeding module →" — 14px, accent-700, font-semibold, underline
    Tapping navigates to /getting-started/cluster-feeding

Everything after this callout (the TRY THIS callout and chat bridge text) stays unchanged.

---

PART 2 — NEW MODULE 5: CLUSTER FEEDING
Route: /getting-started/cluster-feeding
Read time: ~3 min read
Chat bridge text: "In the middle of a cluster feeding stretch right now?"

Uses the shared module screen structure already defined for the other 6 modules (sticky header with "← Getting Started" and "Module 5 of 7", title block, chat bridge row, "Done with this one ✓" button). Insert this module's route into the moduleProgress tracking (see Part 4).

VISUAL FORMAT: "When it happens" chip row + Normal vs. Worth a Call two-column grid (same pattern as Module 1) + a "getting through it" icon-row checklist.

--- MODULE CONTENT ---

Short intro (16px, neutral-900, leading-relaxed, mb-6):
"If Nora wants to nurse every 20–30 minutes for hours at a stretch, you haven't lost your milk — you're in a cluster feed. It's one of the most common reasons moms feel like something's wrong when nothing is. Here's what's happening and how to get through it."

SECTION: "What's actually happening" (section heading style: font-semibold, 17px, neutral-900, mb-3)

Body (16px, neutral-900, leading-relaxed, mb-6):
"Cluster feeding is short, frequent nursing sessions bunched close together — sometimes every 20 to 30 minutes for two to six hours or more. It's Nora's way of telling your body to make more milk, and your body listens: frequent removal is exactly the signal that ramps up supply. This is the same loop described in Feeding Your Supply — more removal, more milk. Cluster feeding is that loop running at full speed, not a sign it's broken."

SECTION: "When it tends to show up" (section heading style, mb-3)

WHEN-IT-HAPPENS CHIP ROW (flex flex-wrap gap-2, mb-2):
  Each chip: rounded-full, bg-primary-100, px-4 py-2, text-sm (13px), font-medium, primary-700

  Chip 1: "Evenings — most common time of day"
  Chip 2: "Days 2–3, as milk transitions in"
  Chip 3: "Around days 10–14"
  Chip 4: "Common growth spurt windows: ~3 weeks, ~6 weeks, ~3 months"

Caption below chips (14px, neutral-500, italic, mt-3, mb-6):
"These are common patterns, not a schedule — every baby's timing is different."

SECTION: "Normal vs. Worth a Call" (section heading style, mb-3)

Two-column grid (grid grid-cols-2 gap-3):

  LEFT COLUMN HEADER: "Normal ✓" — 13px, font-semibold, color: #3A8F6F (success)
  RIGHT COLUMN HEADER: "Worth a Call" — 13px, font-semibold, color: #C47F1A (warning)

  LEFT COLUMN ITEMS (5 items). Each: rounded-xl, bg-success/10, px-3 py-3, text-sm (13px), text-success (#3A8F6F), leading-snug.
    ✓ Nursing every 20–30 min for a few hours, especially evenings
    ✓ Seems fussy or unsatisfied right after coming off the breast
    ✓ Eases up within 24–48 hours
    ✓ Still has expected wet and dirty diapers that day
    ✓ You feel touched-out or exhausted, but Nora seems okay

  RIGHT COLUMN ITEMS (5 items). Each: rounded-xl, bg-warning/10, px-3 py-3, text-sm (13px), text-warning (#C47F1A), leading-snug.
    ⚠ Goes on for more than 2–3 days without any easing
    ⚠ Fewer than 6 wet diapers in 24 hours
    ⚠ Baby seems lethargic or hard to rouse, not just fussy
    ⚠ Pain throughout the entire feed, not just at latch
    ⚠ You're struggling to cope and need support

Note below grid (14px, neutral-500, italic, mt-3, mb-6):
"If any 'worth a call' item applies, message your care team or lactation consultant."

SECTION: "How to get through a cluster feed" (section heading style, mb-3)

GETTING-THROUGH-IT LIST — icon-row list (5 items, gap-2):
  Each item: flex flex-row, items-start, gap-3, py-2, border-b border-neutral-100 (last item no border)
  Left: small rounded icon circle (w-8 h-8, bg-primary-100, flex items-center justify-center, text-base emoji)
  Right: text (15px, neutral-900, leading-relaxed)

  Item 1: 🍼 — "Feed on demand — don't clock-watch. Responding is what tells your body to make more."
  Item 2: 🛋️ — "Get set up before you settle in: water, snacks, phone charger, remote, all within reach."
  Item 3: 🤝 — "Ask a partner or support person to take everything else off your plate for a few hours."
  Item 4: ⏸️ — "Skip the pump during a cluster feed unless your IBCLC has told you otherwise — nursing clears milk more efficiently than a pump session would add."
  Item 5: ⏱️ — "Know the timeline: most stretches resolve in 24–48 hours."

TRY THIS CALLOUT (bg-accent-200, rounded-2xl, px-5 py-4, my-6):
  Label: "TRY THIS" — 11px, accent-700, uppercase, tracking-wider, font-semibold
  Body: "The next time Nora starts a cluster feed, set a mental timer for a couple of hours before you start worrying. Most cluster feeds resolve within a single evening or overnight stretch. If she's still at it well past that window and something feels off, that's when to check in with your care team." — 15px, accent-700, leading-relaxed

Chat bridge text: "In the middle of a cluster feeding stretch right now?"

Done button text: "Done with this one ✓" (standard, matches Modules 1–5)

---

PART 3 — UPDATE LIBRARY SCREEN (/getting-started)

Insert a new card for Module 5 (Cluster Feeding) between Reading Nora's Cues and Common Concerns & When to Call. Renumber the two cards after it. Update the total-count text everywhere it appears.

New/updated card order and routes:
  Module 1 (Your First 48 Hours) → /getting-started/first-48 — unchanged
  Module 2 (Latch & Positioning) → /getting-started/latch — unchanged
  Module 3 (Feeding Your Supply) → /getting-started/supply — unchanged
  Module 4 (Reading Nora's Cues) → /getting-started/cues — unchanged
  Module 5 (Cluster Feeding) → /getting-started/cluster-feeding — NEW CARD
  Module 6 (Common Concerns & When to Call) → /getting-started/concerns — renumbered from 5
  Module 7 (The Fourth Trimester) → /getting-started/fourth-trimester — renumbered from 6

New card copy for Module 5:
  Title: "Cluster Feeding"
  Description: "Why Nora might want to nurse nonstop for hours — and how to get through it without panicking."

Update the progress summary line format from "X of 6 modules complete" to "X of 7 modules complete" (keep whatever completed-module badge logic already exists — just update the denominator).

Card visual state logic (icon color, badge text) is unchanged — apply the same AVAILABLE/ACTIVE/COMPLETED states used for the other modules to the new card based on its entry in AppContext.moduleProgress.

---

PART 4 — APPCONTEXT UPDATE

Add 'cluster-feeding' to AppContext.moduleProgress tracking, alongside the existing keys:
  'first-48', 'latch', 'supply', 'cues', 'cluster-feeding', 'concerns', 'fourth-trimester'

Default moduleProgress['cluster-feeding'] to false (not completed), same as the other non-pre-completed modules.

Every screen that reads "Module X of 6" (module headers, library progress line) should now read "Module X of 7" / "X of 7 modules complete" — update the denominator wherever it's referenced, driven by the total module count rather than a hardcoded "6".

---

DO NOT CHANGE:
- App shell, routing outside /getting-started/*
- Bottom nav
- Home screen (including the Getting Started card — it auto-reflects progress from AppContext)
- Chat, This Week, Onboarding
- Any existing Tailwind config or color tokens
- Module card visual structure in the library (only content, order, and routes)
- Modules 1, 2, and 3 content (Feeding Your Supply's existing cluster-feeding myth card can stay as-is — it's a brief mention in a different context and doesn't need a link)
- Any content inside Reading Nora's Cues other than the cluster feeding callout named in Part 1
```
