# Design References — Latched

## Design system to use

**Primary: Shadcn/ui (MIT, open source)**

- Search Figma Community for "shadcn/ui kit" — Pavel Laptev's version is the most maintained
- Why: most popular modern open-source system in 2025–2026, MIT-licensed, built on Radix + Tailwind, any engineer you hire will know it cold
- Tradeoff: dev-tool aesthetic out of the box. You'll need to layer in warm color tokens, rounded sans typography (Inter Rounded, Manrope, or DM Sans), and a custom illustration style to hit the "supportive friend" tone
- Companion code reference: https://ui.shadcn.com

**Alternative: Untitled UI Free**

- Free (not strictly open source), the most-downloaded Figma kit
- Why consider: more polish out of the box, mobile-first, consumer-shaped
- Tradeoff: not MIT-licensed, harder migration to shadcn if your engineer wants it later
- Recommended use: pull in for inspiration patterns (mobile screens, onboarding flows) even if you commit to shadcn as the system

**Decision:** Commit to **shadcn/ui** as the system. Use Untitled UI Free purely as a pattern reference.

## Other open-source systems considered (not chosen, but worth knowing)

- **Material 3** (Apache 2.0) — comprehensive, but feels Android-ish for a cross-platform consumer brand
- **Primer** (GitHub, MIT) — too developer-tool
- **Carbon** (IBM, Apache 2.0) — enterprise-shaped, too cold
- **Polaris** (Shopify) — commerce-shaped, wrong vertical

## Onboarding inspiration — two to study deeply

### 1. Noom — for structure

- **What to study:** the 40-question quiz onboarding that builds a "personalized program"
- **Why it matters for you:** closest existing analog to a "build my breastfeeding protocol" stepper. Quiz → personalized plan is the exact pattern you're prototyping
- **Specifically watch:**
  - How they mix question types (sliders, multi-select, yes/no, text) to prevent quiz fatigue
  - The "you're not alone" affirmations between question blocks
  - How they build perceived value *before* the paywall (anchoring, social proof, milestone framing)
  - The "we're calculating your program" loading moment — manufactured anticipation, very effective
- **How to study:** download the app, screen-record every step, then read a teardown (Reforge, Growth.Design, or Pattern Breakdown all have good ones)

### 2. Headspace — for tone

- **What to study:** the first 5 minutes of the new-user experience
- **Why it matters for you:** masterclass in making a stressed user feel held, not overwhelmed. This is the emotional register your day-3 postpartum mom needs at 3am
- **Specifically watch:**
  - Single-question-per-screen pacing
  - Generous whitespace and slow animation timing
  - Copy voice — short, warm, never clinical, never gamified
  - Optional progress indication (they don't shove a 12-step progress bar at you)
  - The way audio is introduced gradually, not assumed
- **How to study:** install and screen-record. Compare the *emotional residue* after 5 minutes of Headspace onboarding vs. Noom's. Notice the difference.

### Why these two together

Noom gives you the *structure* (quiz → protocol). Headspace gives you the *tone* (warm, slow, supportive). Your product needs both: the personalization machinery of Noom, delivered with the emotional register of Headspace. If you only study one, you'll get either a clinical quiz or a vibey app with no useful output.

## Honorable mentions

Quick look (15 min each), not deep study:

- **Maven Clinic** — same vertical (women's health, lactation telehealth). Worth seeing what the dominant insurance-funded competitor's onboarding looks like
- **Flo** — mobile women's health at scale, extensively user-researched, period/cycle prediction model
- **Hers** — telehealth quiz onboarding that ends in a protocol (closest model to your business shape)
- **Tinyhood** — breastfeeding *courses*, not an app, but study how they package "the first 6 weeks" as a sellable product

## Color and typography starting point (proposed)

Not a final brand — just somewhere to anchor early Figma work so it doesn't look like a default shadcn template:

- **Primary:** soft terracotta or warm clay (#C97B63-ish) — warm, body-positive, distances you from the "clinical blue" health-app default
- **Secondary:** muted sage (#8A9A8B-ish) — calming, organic
- **Background:** warm off-white (#FDFAF6-ish) — never pure white; pure white reads sterile/clinical
- **Type:**
  - Headlines: a rounded serif (Recoleta, Source Serif) for warmth, OR a rounded sans (DM Sans, Manrope) if budget-constrained
  - Body: Inter or Manrope for legibility
- **Avoid:** medical blues (#2563EB-ish navy), neon "wellness" greens, infantilizing pinks. The mom is an adult in crisis, not a baby and not a TikTok influencer.

This is a starting palette to discard once you have your real brand work. Don't optimize this before you've validated the wedge.
