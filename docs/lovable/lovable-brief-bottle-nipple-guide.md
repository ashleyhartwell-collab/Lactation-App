# Lovable Update Prompt — New Getting Started Guide: Choosing a Bottle and Nipple

**Paste the block below directly into Lovable.**

---

```
Add a new Getting Started guide, "Choosing a Bottle and Nipple," gated to Path B (Exclusive Pumping) and Path C (Combination Feeding) only. Path A (Exclusive Nursing) users never see this guide, its card, or its route. This is the mirror case of Latch & Positioning, which is gated to Path A and C only — same mechanism, opposite paths.

Do not change: the app shell, bottom nav, home screen, chat, This Week, onboarding, or any other Getting Started guide's content or route. Do not change the shared guide screen structure, header, or Done button behavior established in the prior Getting Started personalization update — this guide reuses all of that as-is.

---

PART 0 — WHAT'S CHANGING (SUMMARY)

1. New route: /getting-started/bottle-nipple, with pathTags: [B, C]. Added to the path-filtering config table (see Part 2 of the prior Getting Started brief) between "cluster-feeding" and "concerns" in guide order.

2. New guide totals: Path A stays at 7 guides (Latch present, this guide absent). Path B goes from 6 to 7 guides (Latch absent, this guide now present). Path C goes from 7 to 8 guides (both present).

3. This guide has two content variants, same pattern as every other path-varying guide: an Exclusive Pumping variant (Path B) and a Combination Feeding variant (Path C). Unlike other guides, most of the content is identical between variants — only the bottle-size section and its accompanying chart differ. See Part 4 below for exactly what's shared vs. variant.

4. This guide uses a different internal structure than other guides: it leads with a "Here's the TLDR" section instead of opening straight into prose, since users want the bottom-line recommendation before the supporting detail. This is new — don't apply this structure retroactively to other guides.

5. Three new visual components (material comparison cards, nipple material cards, bottle size chart) — specified in Part 5 below, styled consistently with the existing "Try This" card and myth/actually card treatments from the prior Getting Started visual update.

6. Backend: no migration needed. Uses the same feedingPath field already read by every other path-gated guide.

---

PART 1 — ROUTE AND CARD

ROUTE: /getting-started/bottle-nipple — pathTags: [B, C]

Library card: same visual treatment as any other guide card (AVAILABLE / ACTIVE / COMPLETED states, reading AppContext.moduleProgress['bottle-nipple']). Title on the card: "Choosing a Bottle and Nipple." No path tag pill needed on the card itself (only inside the guide header, same as other guides).

---

PART 2 — UPDATED PATH-FILTERING CONFIG

Update the guide order/config table to:

  1. first-48        — "Your First 48 Hours"              — pathTags: [A, B, C]
  2. latch            — "Latch & Positioning"               — pathTags: [A, C]
  3. supply           — "Feeding Your Supply"                — pathTags: [A, B, C]
  4. cues             — "Reading Nora's Cues"                — pathTags: [A, B, C]
  5. cluster-feeding  — "Cluster Feeding"                    — pathTags: [A, B, C]
  6. bottle-nipple    — "Choosing a Bottle and Nipple"        — pathTags: [B, C]
  7. concerns         — "Common Concerns & When to Call"     — pathTags: [A, B, C]
  8. fourth-trimester — "The Fourth Trimester"                — pathTags: [ALL]

This changes "Guide X of Y" numbering for every guide after cluster-feeding, for Path B and C users only (Path A's sequence is unaffected since bottle-nipple never renders for Path A). Recompute per the same filtering logic already in place — no new logic needed, just the updated table.

---

PART 3 — GUIDE HEADER

Title: "Choosing a Bottle and Nipple: What Actually Matters"
Read time pill: "~3 min read"
Path tag pill: "Pumping" (Path B) or "Combo" (Path C) — same pill styling as every other path-varying guide.

---

PART 4 — GUIDE BODY (both variants share this structure; content differs only where marked VARIANT)

SECTION 1 — "Here's the TLDR" (new section type, appears first, before any other content)
  Styled as a bordered callout card (reuse the "Try This" card treatment: white background, left accent border, no fill) containing a bulleted list, NOT prose paragraphs.

  Path B (Exclusive Pumping) bullets:
    - "Bottle size: get a 2 to 5 ounce bottle, and plan to use that size your entire EP journey. Pumped milk intake per feeding doesn't grow the way formula intake does, so you won't need to size up."
    - "Nipple material: silicone by default. Reach for latex only if your baby clearly prefers a softer feel, and replace latex every 1 to 2 months (or sooner if it looks worn). Skip latex entirely if there's a latex allergy in the family."
    - "Nipple shape, anti-colic venting, 'breast-mimicking' designs, the viral triangle test: none of these are proven to matter more than fit. Start with what's affordable and accessible, and expect some trial and error."
    - "If reflux or gas is a concern, an angled or vented bottle is worth trying, though the evidence that it actually reduces symptoms (versus just reducing swallowed air) is mixed."

  Path C (Combination Feeding) bullets:
    - "Bottle size depends on what's in it. For breastmilk feeds, a 2 to 5 ounce bottle covers you the entire journey. For formula feeds, plan to size up as your baby grows: about 2 to 4 oz as a newborn, 3 to 4 oz by one month, and 6 to 8 oz by 3 to 6 months. Keep both sizes on hand rather than using one bottle for everything."
    - "Don't jump straight to the biggest formula bottle 'to be safe.' Research on formula-fed babies found larger bottles were linked to babies taking in more formula overall, an overfeeding risk. Size the formula bottle to what your baby is actually taking right now."
    - "Nipple material: silicone by default. Reach for latex only if your baby clearly prefers a softer feel, and replace latex every 1 to 2 months (or sooner if worn). Skip latex if there's a latex allergy in the family."
    - "Nipple shape, anti-colic venting, 'breast-mimicking' designs, the viral triangle test: none of these are proven to matter more than fit. Start with what's affordable and accessible, and expect some trial and error."
    - "If reflux or gas is a concern, an angled or vented bottle is worth trying, though the evidence it reduces symptoms (versus just reducing swallowed air) is mixed."

SECTION 2 — "What to know (the why, if you want it)" — h2 header, then body copy below. This section is collapsed/expandable if the guide screen supports that pattern elsewhere (check how other guides' crash-course sections behave); otherwise render inline same as other guide body text.

  Paragraph 1 (SHARED, both variants) — replace with VISUAL 1 (material comparison cards, Part 5.1) instead of prose. No paragraph text needed here beyond a one-line lead-in if the layout needs one: "Glass vs. plastic is a real tradeoff, not a clear winner."

  Paragraph 2 (VARIANT — bottle size) — replace with VISUAL 3 (bottle size chart, Part 5.3):
    Path B: render only the "Exclusive pumping — per feeding" panel.
    Path C: render both panels ("Exclusive pumping — per feeding" is NOT shown for Path C — instead render the Path C-specific framing: show the breastmilk-side info as a simple one-line stat above the chart, "Breastmilk feeds: 2 to 5 oz covers the whole first 6 months," then the "Combination feeding — formula side" panel below it as the chart).

    Below the chart (both variants, plain text, not visual):
    Path B: "Why 2 to 5 ounces is enough for the whole journey. Breastmilk intake ramps up in the first few weeks, plateaus around 25 to 30 ounces a day by 4 to 6 weeks, and stays there. Growing needs get met by more frequent feeds, not bigger ones."
    Path C: "Why breastmilk and formula bottles need different sizing logic. Breastmilk intake plateaus around 25 to 30 ounces a day by 4 to 6 weeks and stays there; growing needs get met by more frequent feeds, not bigger ones. Formula intake genuinely grows with your baby, which is why that side of your rotation needs to scale up. The oversized-bottle risk (more formula fed than intended) is specific to formula, since a small breastmilk bottle is already the right size the whole way through."

  Paragraph 3 (SHARED, both variants) — plain text, no visual: "'Wide-neck' describes the bottle opening, not the nipple's actual shape. A wide-neck bottle doesn't automatically mean a better latch; what matters is the nipple's own base and slope, which varies by brand either way. Angled bottles keep the nipple filled with milk at more angles, which can reduce swallowed air, a plausible mechanism with limited independent research behind it."

  Paragraph 4 (SHARED, both variants) — plain text: "Anti-colic venting reduces swallowed air. Whether that reduces colic symptoms is still unclear. Some studies show less air ingested with a vented system; a Cochrane-level review found the evidence doesn't yet prove it reduces crying or colic itself. If it helps your baby, keep it, just know the 'cures colic' framing is ahead of the research."

  Paragraph 5 (SHARED, both variants) — replace with VISUAL 2 (silicone vs. latex cards, Part 5.2) instead of prose.

  Paragraph 6 (SHARED, both variants) — plain text: "'Breast-mimicking' nipples and the triangle test are both plausible ideas without independent evidence behind the specific claims. Wide, mounded silicone nipples are marketed to ease breast-to-bottle transitions, but no published research confirms they outperform a standard shape. The triangle test (matching a nipple's taper to a triangle made with your fingers) came from one IBCLC as a visual teaching tool, not a validated clinical measure." No illustration for the triangle test — text only, by design (a mockup was tried and dropped).

SHARED CHAT BRIDGE (unchanged position/style from other guides): "Ask in chat" link, text: "Questions about your specific bottle or nipple situation?"

SHARED DONE BUTTON (unchanged): "Done with this one ✓". Marks AppContext.moduleProgress['bottle-nipple'] = true, returns to /getting-started.

---

PART 5 — NEW VISUAL COMPONENTS (used only in this guide)

5.1 MATERIAL COMPARISON CARDS (glass / plastic / stainless steel)
  Three-card row, responsive grid (auto-fit, min 190px per card, wraps to fewer columns on narrow screens).
  Each card: white background, thin neutral border, 12px corner radius, standard card padding.
  Card content: title (bold, ~15px) + one-line description (smaller, muted color) + a status pill below.
  Pill copy and color:
    Plastic — pill text "Watch: heat exposure" — warning color (amber/yellow family)
    Glass — pill text "Watch: painted exteriors" — warning color (amber/yellow family)
    Stainless steel — pill text "No known watch-outs" — success color (green family)
  No icons on these cards. (Tested against available icon options; nothing read clearly as bottle/nipple-related, so this card ships text-only rather than using a misleading icon.)
  Card copy:
    Plastic: "Lightweight and unbreakable. Sheds microplastics, more so when heated."
    Glass: "No microplastic shedding. Heavier, breakable, and some painted exteriors tested positive for lead in 2024."
    Stainless steel: "Avoids both issues above. Less common, and you can't see the milk level."

5.2 SILICONE VS. LATEX CARDS
  Two-card row, responsive grid (auto-fit, min 220px per card).
  Silicone card gets featured treatment: slightly thicker accent-colored border (not the default thin neutral border used elsewhere) and a small "Sensible default" badge above the title, accent color.
  Latex card: standard thin border, no badge.
  Each card: title (bold, ~15px) + a 3-item bullet list (smaller text, muted color, generous line spacing).
  Silicone bullets: "Durable, doesn't degrade with use" / "Sterilizes any method" / "No latex allergy risk"
  Latex bullets: "Softer feel, some babies accept it more easily" / "Degrades faster, replace every 1–2 months" / "Skip if latex allergy runs in the family"

5.3 BOTTLE SIZE CHART
  Panel(s) containing stacked horizontal mini bar rows: an age-range label (fixed width, left), a track bar (light background, filled portion colored to represent relative volume), and the oz value right-aligned.
  Path B panel ("Exclusive pumping — per feeding"), 4 rows:
    Week 1 — 1–3 oz — bar fill ~40%
    Weeks 2–4 — 2–4 oz — bar fill ~65%
    Weeks 4–6 — 2–5 oz — bar fill ~85%
    6 weeks–6 mo — 2–5 oz — bar fill ~85% (same fill as prior row — this repetition is intentional, it visually shows the plateau)
  Caption below panel: "Ramps up early, then plateaus — one bottle size covers you from week 6 on."
  Path C panel ("Combination feeding — formula side"), 3 rows:
    Newborn–1mo — 2–4 oz — bar fill ~40%
    1–3 months — 3–4 oz — bar fill ~55%
    3–6 months — 6–8 oz — bar fill ~100%
  Caption below panel: "Keeps growing — plan to size up as your baby does."
  Path B renders only its own panel. Path C renders only its own panel (plus the one-line breastmilk stat described in Part 4, Section 2, Paragraph 2 — not the Path B panel itself, to avoid showing Path B's exact chart to a Path C user).

---

PART 6 — DO NOT CHANGE

- Any other Getting Started guide's route, content, or path gating.
- The shared guide screen header, chat bridge, or Done button behavior.
- AppContext.moduleProgress key naming convention (new key is 'bottle-nipple', following the existing kebab-case slug pattern).
- Any route, screen, or logic outside /getting-started/*.
```
