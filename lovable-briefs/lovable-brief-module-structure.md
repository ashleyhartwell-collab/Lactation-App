# Lovable Build Brief — Module Structure (Brief 1 of 2)

**Paste this into Lovable FIRST. Do not paste Brief 2 (Content Update 1) until Lovable confirms this build is complete and routing is verified.**

---

This brief builds the protocol module pages that the This Week pillar needs. No DiaperCountCallout, no T-A-B window logic, no DMER content — those are in a separate brief (Content Update 1) that follows this one. Build the shell and content here; Content Update 1 layers on top.

---

## SECTION 1: MODULE PATTERN

Every module page uses the existing `ModuleShell` component pattern. Each module page must render the following elements in this order:

### 1.1 Module Header

- **Title:** H2, bold, warm charcoal (`neutral-900`)
- **Week badge:** pill/chip component — e.g. "Week 1" — small, rounded, `primary-100` background, `primary-700` text
- **Path badge:** pill/chip — e.g. "Exclusive Nursing" — small, rounded, `neutral-100` background, `neutral-600` text
- **Read-time pill:** e.g. "~3 min read" — small, muted, `neutral-400` text

All three badges render inline beneath the H2 title, with `gap-2` between them.

### 1.2 Lead Line

One sentence hero text. Renders at 18–20px, `neutral-800`, `font-medium`, `leading-snug`. Full-width, no padding truncation. This is the module's emotional hook — it must be the first content element after the header.

### 1.3 WHAT TO KNOW THIS WEEK

Prose section. Multiple paragraphs. Style: 15–16px, `neutral-700`, `leading-relaxed`. No bullet points — this is flowing prose. Use paragraph spacing (`mb-4`) between paragraphs. Section label ("WHAT TO KNOW THIS WEEK") renders as an all-caps label in `text-xs`, `tracking-widest`, `neutral-400`, `mb-2`, above the prose block.

### 1.4 WHAT TO DO

Numbered action list. Section label same as above. Each item renders as a numbered row with:
- Number in `primary-500`, `font-semibold`
- Action text in `neutral-700`, 15px, `leading-relaxed`
- `mb-3` between items

Do not use `<ul>` — use a `<ol>` or a custom numbered component to match the branded list style.

### 1.5 WHAT TO WATCH FOR

Distinct callout blocks. Section label same as above. Three visual variants:

- **Amber/warning accent** (use for care-team signals — IBCLC, pediatrician): `amber-50` background, `amber-600` left border (4px), `amber-800` text, `rounded-lg`, `p-3`, `mb-2`
- **Red accent** (use for true escalation — ER or provider same-day): `red-50` background, `red-600` left border (4px), `red-800` text, `rounded-lg`, `p-3`, `mb-2`
- **Plain text** (use for non-escalation watch items): `neutral-50` background, `neutral-300` left border (4px), `neutral-700` text, `rounded-lg`, `p-3`, `mb-2`

Each watch item is its own callout block — do not merge multiple items into one block.

### 1.6 Crash-Course Snippet (Expandable)

Collapsible section, **collapsed by default**. Trigger label: "Want to go deeper?" in `primary-600`, `text-sm`, `font-medium`, with a `chevron-down` icon that rotates on expand. The section title (e.g. "The biology of milk production") renders inside the collapsed section as an H3 when expanded. Content inside uses the same prose style as WHAT TO KNOW. Use `AnimatePresence` or a simple CSS transition for the collapse/expand — no janky layout shift. The section renders below WHAT TO WATCH FOR with `mt-6` separation.

### 1.7 Chat Bridge Text

Immediately below the crash-course snippet, before the Done button. Small text, `neutral-400`, `text-sm`, centered or left-aligned. Pattern: "Have a question about [topic]?" where [topic] is the module's subject area. This text links to the Quick Chat tab — tapping it opens the chat with the relevant suggested question pre-surfaced. Do not wire the specific FAQ logic in this brief — just render the text as a tappable link that navigates to the `/chat` route.

### 1.8 Done Button

- Label: "Done with this one"
- Style: secondary — outlined, not filled. `border-primary-400`, `text-primary-600`, `bg-transparent`, `rounded-full`, full-width, `h-12`
- Position: bottom-aligned, `mt-8`, `mb-safe` (accounts for bottom nav safe area)
- Behavior: marks the module `completed` in Supabase (update the user's module completion record), then navigates back to the This Week view
- If already completed: button renders as "Review complete ✓" in `neutral-400` — still tappable to return to This Week, but visually muted

---

## SECTION 2: MODULE ROUTING AND NAVIGATION

### 2.1 Module ID Pattern

Module IDs follow the pattern: `[Path]-[Week]-[Sequence]`

Examples: `A-1-1`, `A-1-2`, `B-1-3`, `C-1-4`, `T-A-B`

- **Path A** = Exclusive Nursing
- **Path B** = Exclusive Pumping
- **Path C** = Combination Feeding
- **Shared modules** use the prefix `shared-` (e.g. `shared-postpartum-body`)
- **Transition module** uses ID `T-A-B`

### 2.2 Route Structure

Each module maps to a route: `/this-week/module/[moduleId]`

Examples:
- `/this-week/module/A-1-1`
- `/this-week/module/B-1-4`
- `/this-week/module/shared-mental-health`
- `/this-week/module/T-A-B`

All module routes must be registered in the router. A 404 fallback for unknown module IDs should redirect to the This Week view (`/this-week`).

### 2.3 This Week Screen — Module List

The This Week screen for a given week renders a vertical card list of the modules assigned to that week for the user's current path. Each card:

- Displays the module title (H3, `neutral-900`)
- Displays the estimated read time (small, `neutral-400`)
- Shows a completion checkmark (`success` token color) if the module is marked complete
- Is fully tappable — tapping anywhere on the card navigates to `/this-week/module/[moduleId]`
- Card style: `bg-white`, `rounded-xl`, `shadow-sm`, `p-4`, `mb-3`, full-width

Shared modules appear at the bottom of the module list for all paths, below path-specific modules, separated by a small section label: "Also this week" in `text-xs`, `tracking-widest`, `neutral-400`.

### 2.4 Week Calculation

Week number is already calculated from `baby_dob` in `user_preferences` (per the existing app architecture). This brief does not change that logic. Module routing in this brief assumes week number and path are already available in app context (from `AppContext`). Do not modify `AppContext` structure.

---

## SECTION 3: WEEK 1 MODULES — PATH A (Exclusive Nursing)

Build full module pages for the following 3 modules. Use the content exactly as written. Do not summarize, shorten, or rewrite the content.

---

### Module A-1-1: Your First Feeds — What's Actually Happening

**Route:** `/this-week/module/A-1-1`  
**Header:** Week 1 | Exclusive Nursing | ~3 min read  
**Chat bridge topic:** colostrum and first feeds

---

**LEAD LINE**

Your milk is already here — it just doesn't look like what you're expecting yet.

---

**WHAT TO KNOW THIS WEEK**

Colostrum is milk. It has been building since mid-pregnancy. It looks thick and golden-yellow, and that's correct — not a sign of poor nutrition or low supply. Colostrum is produced in small volumes by design: your newborn's stomach on day 1 holds about 5–7 mL, roughly the size of a marble. A colostrum-fed newborn is receiving exactly the right amount.

Feeding frequency in week 1: 8–12 times per day is normal — sometimes more. This is not excessive. Newborn stomachs empty quickly, and frequent feeding is what sends the supply-establishment signal your body needs. At this stage, feeding on demand means offering when your baby shows any hunger cue — rooting, mouthing, bringing hands to mouth — not waiting for crying. Crying is a late hunger cue.

Skin-to-skin contact in the first hours and days: place your baby chest-to-chest on your bare skin as much as possible. This triggers the hormonal cascade that initiates milk production and supports letdown. It also regulates your baby's temperature, heart rate, and blood sugar — and it's the single highest-yield thing you can do in the first 48 hours for supply establishment.

---

**WHAT TO DO**

1. Feed or attempt to feed at least every 2–3 hours during the day, every 3–4 hours overnight in the first few days. Use baby hunger cues as your primary guide.
2. After each feed attempt, try hand expression. Colostrum is thick and doesn't always transfer fully during a nursing session — a minute of hand expression into a small spoon or syringe can capture additional colostrum.
3. Prioritize skin-to-skin between feeds when you're not sleeping. Wear your baby on your chest, have your partner do the same. The more skin-to-skin, the stronger the hormonal foundation for your supply.
4. Track wet diapers: one wet diaper per day of age in the first week (1 on day 1, 2 on day 2, etc.). This is your most reliable indicator that colostrum is getting through.

---

**WHAT TO WATCH FOR**

- Fewer wet diapers than expected (less than the day-of-age count) by day 3: contact your IBCLC or pediatrician [amber callout]
- Weight loss greater than 10% of birth weight by day 5: contact your pediatrician — this warrants a feeding assessment [amber callout]
- Nipple pain that persists throughout the entire feed (not just at latch-on): this is the signal for a latch check, not something to wait out [amber callout]

---

**CRASH-COURSE SNIPPET TITLE**

"The biology of milk production — how demand and supply works"

*(Content for this snippet: write a 150–200 word plain-language explanation of prolactin, oxytocin, and the demand-supply feedback loop. Use prose, not bullets. Keep it accessible — this is for a new mom, not a medical provider.)*

---

### Module A-1-2: Getting the Latch

**Route:** `/this-week/module/A-1-2`  
**Header:** Week 1 | Exclusive Nursing | ~3 min read  
**Chat bridge topic:** latch and positioning

---

**LEAD LINE**

A good latch is not magic — it's a skill, and most moms need to practice it.

---

**WHAT TO KNOW THIS WEEK**

A correct latch is asymmetric: your baby's mouth should be off-center, with more of the lower areola in the mouth than the upper. Their lips should be flanged outward (like a fish), not tucked in. Their chin should be pressed into the breast. If you look at your nipple after a feeding and it looks pinched, pointed, or shaped like a new lipstick — that's a shallow latch signal.

Common effective positions: cradle hold (baby's head in the crook of your arm, body supported along your forearm), cross-cradle hold (you hold baby's head with the opposite hand — gives you more control of head positioning in early days), football hold (baby tucked under your arm like a football — useful after cesarean or for women with larger breasts), laid-back nursing (you recline at a comfortable angle, baby lies face-down on your chest — gravity assists the latch).

Pain at latch-on: some sensitivity at the moment of latch is normal in the first week as your skin adjusts. Pain that is sharp, that persists throughout the feed, or that leaves visible damage to the nipple is not normal and warrants a latch correction.

The fix to try first: if a latch isn't right, break the suction (slide your clean finger into the corner of baby's mouth to release), and re-latch. Don't stay in a painful latch. Re-latching is not disruptive to your baby — it takes seconds and gets easier with practice.

---

**WHAT TO DO**

1. Before latching, bring baby to the breast — not breast to baby. Sit or recline comfortably, then bring your baby in close, nose level with the nipple, so they tip their head back slightly to latch on.
2. When baby opens wide (encourage by touching nipple to upper lip), bring them in quickly and asymmetrically — aim the nipple toward the roof of their mouth, not straight in.
3. If latch is painful past the first 15–30 seconds, break the suction and try again. Give yourself three tries on each side.
4. Take a photo or short video of your latch to show your IBCLC. They can assess latch quality remotely in many cases.

---

**WHAT TO WATCH FOR**

- Nipple pain that persists throughout the entire feed for more than 2–3 days: see your IBCLC — this is the most common sign of a latch that needs correction [amber callout]
- Visible cracks, bleeding, or blistering on the nipple: this is a latch problem and/or a flange problem if you're also pumping; see your IBCLC [amber callout]
- Clicking or smacking sounds during nursing: this can indicate a shallow latch, a tongue tie, or a flow issue — worth assessing [amber callout]

---

**CRASH-COURSE SNIPPET TITLE**

"Latch positions illustrated — with what to look for in each"

*(Content for this snippet: write a 150–200 word description of cradle, cross-cradle, football, and laid-back positions, with what correct positioning looks like for each. Prose format.)*

---

### Module A-1-3: The First Week Survival Guide

**Route:** `/this-week/module/A-1-3`  
**Header:** Week 1 | Exclusive Nursing | ~4 min read  
**Chat bridge topic:** cluster feeding and engorgement

---

**LEAD LINE**

The first week is the hardest week. Here's what's actually happening and what to do about it.

---

**WHAT TO KNOW THIS WEEK**

Cluster feeding is a pattern where your baby nurses very frequently — sometimes for hours — in bursts. It's common in the first week, again around day 10–14 as milk volume increases, and around any growth spurt. It is not a sign that something is wrong with your supply. It is your baby's way of sending a "more milk" signal to your body. The correct response to cluster feeding is to feed.

Engorgement at days 3–5: when your milk transitions from colostrum to mature milk, many moms experience engorgement — breasts that become hard, hot, and uncomfortably full. This is normal and temporary. It typically peaks at days 3–5 and eases as supply begins to regulate to your baby's actual intake. During engorgement: feed frequently, use reverse pressure softening (gentle pressure around the areola for 60 seconds before latching to soften the tissue and make it easier for baby to latch), and use a cold compress after feeds to reduce discomfort. Do not pump to relieve engorgement in the first week — pumping signals your body to produce more and can worsen engorgement.

Sleep and exhaustion: the feeding frequency of a newborn is incompatible with sustained sleep for either parent. This is a feature of the newborn period, not a problem to solve. The best options: take shifts with a partner, accept help with non-feeding tasks, and sleep whenever possible between feeds.

On food and drink: you do not need to eat a specific number of extra calories to breastfeed. Eat real food when you're hungry. Drink to thirst — which is usually more than you think. Keep a water bottle next to wherever you typically feed.

---

**WHAT TO DO**

1. Feed on demand — not by the clock. In week 1, if your baby is sleeping longer than 3 hours, wake them to feed.
2. During engorgement (days 3–5): feed more frequently, not less. Apply a cold pack (not heat — heat increases milk production) after feeds to reduce swelling.
3. If pain is significant during engorgement: try reverse pressure softening before each latch.
4. Get one IBCLC visit in week 1 if you have any access. This is the most high-leverage support you can get in the entire breastfeeding journey. If your hospital has a lactation consultant, request a consult before discharge.

---

**WHAT TO WATCH FOR**

- Fever above 100.4°F plus breast pain and/or flu-like symptoms: this is mastitis, not engorgement. Call your OB or provider today — do not wait. [red callout]
- Baby losing more than 10% of birth weight by day 5: contact your pediatrician [amber callout]
- Fewer wet diapers than expected (fewer than one per day of age): contact your IBCLC or pediatrician [amber callout]
- Nipple pain that persists throughout every feed: latch assessment needed [amber callout]

---

**CRASH-COURSE SNIPPET TITLE**

"The first 72 hours — a timeline of what to expect"

*(Content for this snippet: write a brief timeline — roughly 150 words — covering hours 0–24, 24–48, 48–72. What's happening in the body, what to expect in baby, what's normal. Prose format.)*

---

## SECTION 4: WEEK 1 MODULES — PATH B (Exclusive Pumping)

Build full module pages for the following 4 modules.

---

### Module B-1-1: Why You're Pumping and Why That Matters

**Route:** `/this-week/module/B-1-1`  
**Header:** Week 1 | Exclusive Pumping | ~3 min read  
**Chat bridge topic:** exclusive pumping and supply establishment

---

**LEAD LINE**

The decision to exclusively pump is valid. Full stop — no justification required.

---

**WHAT TO KNOW THIS WEEK**

Exclusive pumping means feeding your baby expressed breast milk by bottle, using a pump to establish and maintain your supply. Your body does not know it's a pump — it reads demand, and it responds to demand. If the pump provides sufficient stimulation at the right frequency, your body produces milk. This is not a compromise or a workaround. It is a functional method that many thousands of mothers use successfully for months or more.

What makes exclusive pumping different from nursing: the logistics are more complex (every feed involves three steps: pump, bottle, wash) and there is no skin-to-skin feedback loop from the baby's suckling. Both of these are real factors to plan for — not reasons this path won't work.

What can make exclusive pumping work well: the schedule is consistent, the equipment fits correctly, and supply is established in the critical first six weeks. Those three factors cover the vast majority of what's within your control.

---

**WHAT TO DO**

1. Pump 8–10 times per day in week 1, including at least one overnight session. Frequency in the first days and weeks is the primary driver of supply establishment.
2. Aim for sessions every 2–3 hours during the day. Do not go longer than 4–5 hours without pumping overnight.
3. Set up a dedicated pumping station — everything you need in one place — to reduce the friction of each session.
4. Find the Exclusive Pumping community online (r/ExclusivelyPumping, or Stacey Stewart's EP resources). This community has peer knowledge that most lactation education doesn't address.

---

**WHAT TO WATCH FOR**

- Nipple pain that persists past the first minute of a session: this is almost always a flange fit issue. Address it now — a wrong flange size causes damage and reduces output. [amber callout]
- Zero output (not small amounts — truly nothing) after 72 hours of consistent sessions: contact your IBCLC or OB. [amber callout]

---

**CRASH-COURSE SNIPPET TITLE**

"The four hormones of milk production — how pumping triggers them"

*(Content for this snippet: write a 150–200 word explanation of prolactin, oxytocin, estrogen/progesterone interaction, and how pump stimulation triggers the supply-building hormonal cascade. Prose format.)*

---

### Module B-1-2: Your Pump Setup

**Route:** `/this-week/module/B-1-2`  
**Header:** Week 1 | Exclusive Pumping | ~3 min read  
**Chat bridge topic:** pump setup and flange sizing

---

**LEAD LINE**

Getting your pump set up correctly now will matter more than almost any other decision this week.

---

**WHAT TO KNOW THIS WEEK**

Hospital-grade pump vs. consumer double electric vs. wearable: in week 1, use the highest-grade pump available to you. Hospital-grade pumps (Medela Symphony, Spectra S1/S2 at hospital-grade settings) have stronger, more consistent suction and are designed for supply establishment. Consumer double electric pumps (most insurance-issued pumps) are the realistic choice for most moms and work well with correct settings. Wearable pumps (Elvie, Willow, Momcozy) are convenient but less effective for supply establishment — they are a supplement, not a primary pump in the early weeks.

Flange fit — this is the most important equipment decision: Your flange is the funnel-shaped piece that fits over your nipple. If it's the wrong size, you will have reduced output and potential nipple damage. Measure your nipple diameter (the nipple itself, not the areola), add 2–3mm, and match to your pump brand's sizing chart. Most pumps come with 24mm and 27mm flanges; many women need smaller sizes (21mm or less). This matters too much to guess.

Pump settings: start in stimulation mode (fast, low suction), then switch to expression mode (slower, stronger suction) once you feel a letdown. Highest suction is not better — use the highest suction that is comfortable without pain.

---

**WHAT TO DO**

1. Before your first session, measure your nipple diameter and verify your flange size. The crash-course snippet below walks through this.
2. Clean all pump parts before first use per the pump manual. After each session: rinse parts with cold water first, then wash with hot soapy water. Dry completely. In the first 2–3 months for a healthy term baby at home, air-drying on a clean surface is CDC-recommended.
3. Test suction levels on your first session — start low, increase until you find effective but comfortable.
4. Set up your pump station before you need it. Don't build your station at 2am on day 2.

---

**WHAT TO WATCH FOR**

- Nipple looks red or raw after pumping: flange too small — stop and refit [amber callout]
- Areola is being pulled significantly into the tunnel: flange too large — refit [amber callout]
- Output is significantly less than expected despite correct technique: flange fit is the first thing to check [plain callout]

---

**CRASH-COURSE SNIPPET TITLE**

"Flange sizing — how to measure and what the size means for each major pump brand"

*(Content for this snippet: write a 150–200 word guide to measuring nipple diameter, what to add for sizing, and how sizing maps to major brands (Spectra, Medela, Elvie, Willow). Include the tip about trying a smaller size than expected. Prose format.)*

---

### Module B-1-3: Your Pumping Schedule — Week 1

**Route:** `/this-week/module/B-1-3`  
**Header:** Week 1 | Exclusive Pumping | ~3 min read  
**Chat bridge topic:** pumping schedule and session frequency

---

**LEAD LINE**

Eight to ten pumping sessions per day is not optional in week 1 — it's the supply you're building right now.

---

**WHAT TO KNOW THIS WEEK**

Milk supply is established through stimulation frequency in the first six weeks — particularly the first two weeks. The number of times per day your body receives a "milk is needed" signal determines how much capacity your body builds. In week 1, that frequency is 8–10 sessions per day.

Why skipping sessions now matters disproportionately: the prolactin receptor theory tells us that the milk-producing cells being stimulated in the first weeks are building the receptor base that determines your long-term supply capacity. Consistently low-frequency stimulation in week 1 can create a supply ceiling that's difficult to raise later. This is the investment period.

The overnight session specifically: prolactin, the primary milk-production hormone, peaks between 2–4am. An overnight session in this window is worth more, hormonally speaking, than any daytime session. This is not optional in week 1.

Session duration: pump until milk stops flowing, then continue for 2–5 additional minutes. Total session length is typically 15–20 minutes once your supply is established. In the first days, sessions may be shorter as volume is low.

---

**WHAT TO DO**

1. Map out 8–10 sessions across your 24 hours before day 1. Space them no more than 3 hours apart during the day.
2. Protect at least one overnight session between midnight and 5am, ideally timed around 2–3am.
3. Use the first session of the day (typically 5–7am, when prolactin is also naturally elevated) as your longest and most complete session. Don't skip it.
4. Track your sessions for the first week so you can see the pattern. The data is also useful for an IBCLC if you consult one.

---

**WHAT TO WATCH FOR**

- Consistently fewer than 8 sessions per day by the end of week 1: this is the most common cause of supply shortfall in EP moms. Getting back to 8 before the end of week 2 is a priority. [amber callout]
- Output plateau (no increase at all) by day 7 despite consistent sessions: contact your IBCLC. This is uncommon but warrants attention. [amber callout]

---

**CRASH-COURSE SNIPPET TITLE**

"Sample 24-hour pumping schedule for week 1 — how to fit 8 sessions into real life"

*(Content for this snippet: write a 150–200 word sample schedule showing 8 sessions across 24 hours with approximate times, noting that the 2–3am and 6am slots are non-negotiable and the rest can flex. Prose format with a simple schedule table if appropriate.)*

---

### Module B-1-4: Your First 72 Hours — Colostrum and What to Expect

**Route:** `/this-week/module/B-1-4`  
**Header:** Week 1 | Exclusive Pumping | ~3–4 min read  
**Chat bridge topic:** colostrum and hand expression

---

**LEAD LINE**

Those tiny amounts in your collection bottle? That's exactly what's supposed to be there.

---

**WHAT TO KNOW THIS WEEK**

Before your mature milk arrives, your body makes colostrum — a thick, golden, concentrated early milk that's been building in your breasts since mid-pregnancy. Colostrum is not a placeholder. It's real milk: packed with antibodies, immune factors, and precisely what a newborn needs in the first days. The volume is small because your baby's stomach is small. On day 1, a newborn's stomach holds about 5–7 mL — roughly one teaspoon. Your colostrum output is calibrated to match that. If you're pumping drops, that's not a problem. That's the correct amount.

**The pump is not the best tool for colostrum — and that's okay.** Here's something most moms find out too late: colostrum is thick and sticky. It doesn't move through pump tubing the way mature milk does. In the first 24–72 hours, a meaningful amount of what your body makes gets lost in the system — stuck in the flange, the tubing, the collection bottle walls — before it ever reaches the container. Your pump isn't broken. Colostrum just isn't what pumps are designed for.

This is why the Academy of Breastfeeding Medicine and the AAP both recommend **hand expression** as the primary method for the first 24–72 hours. Your hands can collect colostrum directly, with no tubing in the way, into a small syringe that can be fed to your baby or stored precisely. Once your milk transitions to a thinner consistency around days 3–5, the pump becomes your main tool. But in these first days, your hands will outperform your pump.

**What the first week looks like, day by day.** Output varies widely between moms — the ranges below are reference points, not targets:

| Time period | What's happening | Typical output per session |
|---|---|---|
| Day 1–2 | Colostrum only | 1–7 mL (drops to a small spoonful) |
| Day 3–5 | Milk transitioning — color lightens, volume increases | 10–30 mL and rising |
| Day 5–14 | Transitional to mature milk | 30–60 mL+ as supply establishes |
| End of week 2 | Mature milk; supply calibrating to demand | Varies widely; 60–120 mL per session is common |

*Your baby's wet diaper count and weight gain at pediatric visits are more meaningful measures of adequacy than these numbers. The chart is to tell you what you're seeing — not to set a bar.*

**What the milk transition looks like in your bottle.** Around days 3–5, you'll notice:
- The color shifts from deep gold or yellow to cream, then white
- The texture thins noticeably — less sticky, more fluid
- The volume increases, often quickly and dramatically
- Your breasts may feel heavier, fuller, or even uncomfortable

This is your milk coming in. It's a good sign, and it means your pump is about to start working the way you expected it to.

---

**WHAT TO DO**

1. **Start with hand expression for the first 24–72 hours.** Collect colostrum into a 1–3 mL syringe. Your baby can be fed directly from the syringe, or you can transfer the colostrum to a small bottle. Tap the crash-course snippet below for hand expression technique.

2. **Pump after hand expression, not instead of it.** A short pump session (10–15 min) after hand expression is worth doing for stimulation — even when the pump collects less than your hands. The stimulation is what builds your supply; the collection is secondary in these first days.

3. **Store colostrum in small amounts.** Use 1–3 mL syringes or small (2 oz) bottles — not large storage bags, where tiny volumes get lost on the walls. Colostrum keeps in the refrigerator for up to 4 days, or in a standard freezer for up to 6 months.

4. **Notice when your milk comes in.** The color and volume change on days 3–5 is your cue to shift from hand expression to your pump as the primary collection method. You don't need to do anything special — just make the switch when you notice the change.

---

**WHAT TO WATCH FOR**

If you are pumping 8 or more times per day, including at least one overnight session, and seeing **zero output — not small amounts, but truly nothing at all** — after 72 hours, contact your IBCLC or OB. This is uncommon, but it warrants a conversation. Don't wait it out. [amber callout]

Pain during pumping that persists past the first minute of a session is also worth addressing — a flange fitting check with your IBCLC often resolves this quickly, and fixing it early protects your output and your nipples. [amber callout]

---

**CRASH-COURSE SNIPPET TITLE**

"How to hand express colostrum (step by step)"

**CRASH-COURSE SNIPPET CONTENT** *(render this verbatim inside the expandable section):*

Hand expression takes about five minutes to learn and a day or two to feel confident. It's worth learning even if you've never done it.

What you need: clean hands, a 1–3 mL syringe or small clean cup, optional warm washcloth.

1. Apply gentle warmth to your breast for 1–2 minutes — a warm washcloth, a warm shower, or even just your warm hands. This encourages letdown.
2. Hold your syringe or cup close to your nipple, ready to catch drops.
3. Place your thumb and first two fingers about 1 to 1½ inches back from the base of the nipple — on the areola, not on the nipple itself.
4. Gently press your fingers back toward your chest wall, then compress and release in a slow, rhythmic motion. You're not pulling or squeezing — you're pressing in and then bringing your fingers together.
5. Rotate gradually around the nipple (think: moving around a clock face) to reach different ducts.
6. You'll see drops appear, or a thin stream. Catch each drop with your syringe.

A 1–3 mL syringe on day 1 is a completely normal amount. If you fill a 3 mL syringe in one session on day 1, you're doing very well. If you collect 0.5 mL, that is also completely normal.

**Why ABM and AAP recommend hand expression first:**
The Academy of Breastfeeding Medicine (ABM Clinical Protocol #8) and the American Academy of Pediatrics both note that hand expression is more effective than pumping for colostrum collection in the first 24–72 hours. The reasons are mechanical: colostrum is more viscous than mature milk, the volume is too small to build effective suction in most pumps, and skin contact during hand expression triggers oxytocin release in a way that pumping alone doesn't replicate as well. The evidence-based sequence is: start with hand expression → add pumping for stimulation → transition to pump as primary tool when milk thins and volume increases.

**Colostrum storage quick reference:**

| Storage method | How long |
|---|---|
| Room temperature (up to 77°F) | 4 hours |
| Refrigerator (39°F or below) | 4 days |
| Freezer (standard, 0°F) | 6 months |
| Deep freeze (-4°F) | 12 months |

Use the smallest container that holds the volume you've collected. Colostrum in a large bag is wasted colostrum.

---

## SECTION 5: WEEK 1 MODULES — PATH C (Combination Feeding)

Build full module pages for the following 5 modules.

---

### Module C-1-1: What Combination Feeding Is (And Isn't)

**Route:** `/this-week/module/C-1-1`  
**Header:** Week 1 | Combination Feeding | ~3 min read  
**Chat bridge topic:** combination feeding options

---

**LEAD LINE**

Combination feeding is a choice — not a fallback, not a compromise, and not something that needs a justification.

---

**WHAT TO KNOW THIS WEEK**

Combination feeding means any mix of nursing directly at the breast, feeding pumped breast milk by bottle, and/or formula feeding. This path is chosen for a range of reasons: supplementing for medical reasons (weight concerns, supply issues, tongue tie), personal preference, sharing feeding with a partner, reducing nursing pain while supply establishes, or returning to work. No reason is more valid than another.

This path is more logistically complex than either exclusive nursing or exclusive pumping — you're managing multiple feeding methods simultaneously. That complexity is real and worth naming. It's also the path that gives you and your family the most flexibility.

The one thing this path requires above all others: paced bottle feeding (detailed in C-1-3). Every bottle given on this path — whether pumped milk or formula — should be given with paced technique. This prevents bottle preference from undermining the nursing relationship.

---

**WHAT TO DO**

1. Decide your initial combination plan (covered in C-1-2) before your first week is over.
2. Learn paced bottle feeding before giving the first bottle (covered in C-1-3).
3. If nursing is part of your plan, nurse first before offering a bottle when possible.
4. Track all feeds — nursing sessions, bottles, formula — in one place. On this path, data is how you see the full picture.

---

**WHAT TO WATCH FOR**

- Baby showing strong bottle preference (refusing to latch) within days of introducing the bottle: this is flow preference, and it's usually fixable with paced feeding and bottle choice — see C-1-3 and contact your IBCLC [amber callout]
- Signs of inadequate intake (fewer wet diapers than expected, weight loss concerns): contact your IBCLC or pediatrician [amber callout]

---

**CRASH-COURSE SNIPPET TITLE**

"The spectrum of combination feeding — from mostly nursing to mostly formula"

*(Content for this snippet: write a 150-word description of the range of combination feeding approaches, from one formula top-up per day to primarily formula with occasional nursing sessions. Frame all points on the spectrum as equally valid. Prose format.)*

---

### Module C-1-2: Your Combination Feeding Plan

**Route:** `/this-week/module/C-1-2`  
**Header:** Week 1 | Combination Feeding | ~3 min read  
**Chat bridge topic:** building your feeding plan

---

**LEAD LINE**

Having a plan — even a flexible one — prevents reactive decisions at 3am.

---

**WHAT TO KNOW THIS WEEK**

A combination feeding plan has four components: your primary feeding method (nursing, pumping, formula, or some combination), when you'll supplement, how much you'll supplement, and who gives supplemental feeds.

Common combination plans: nurse first, then offer a formula or pumped milk top-up if baby seems unsatisfied; designated bottle feeds at certain times (e.g., one overnight bottle so a partner can feed); pumped milk as the primary method with nursing for comfort or convenience; formula as the primary source with nursing for closeness.

There is no "correct" plan. The right plan is the one your family can actually follow.

---

**WHAT TO DO**

1. Choose your primary feeding method for week 1 — this can evolve, but starting with an intention helps.
2. Decide when you'll supplement: after nursing sessions, at specific times, or based on hunger cues.
3. Discuss the plan with your partner so they can support it — especially the bottle-feeding technique.
4. Write the plan down somewhere visible. A short, clear plan is more likely to be followed at 3am than a remembered intention.

---

**WHAT TO WATCH FOR**

- The plan being unworkable in practice within the first 3 days: this is normal. Adjust without judgment. The plan is a starting point, not a commitment. [plain callout]

---

**CRASH-COURSE SNIPPET TITLE**

"How to decide when to offer a bottle vs. nurse first — a decision guide"

*(Content for this snippet: write a 150-word guide to deciding when to nurse first vs. offer a bottle, covering considerations like baby's hunger level, time since last feed, and your current supply goals. Prose format.)*

---

### Module C-1-3: Paced Bottle Feeding — Non-Negotiable on This Path

**Route:** `/this-week/module/C-1-3`  
**Header:** Week 1 | Combination Feeding | ~3 min read  
**Chat bridge topic:** paced bottle feeding technique

---

**LEAD LINE**

Every bottle on this path — pumped milk or formula — needs to be given the same way.

---

**WHAT TO KNOW THIS WEEK**

Bottle preference (sometimes called flow preference or nipple confusion) is real. A standard bottle nipple flows milk significantly faster than a breast. If bottles flow faster and require less effort, many babies will begin refusing the breast within 2–4 days of regular bottle use. This is not inevitable — it's prevented by paced bottle feeding, which mimics the pace and effort of nursing.

Paced bottle feeding technique: baby is held semi-upright (not lying flat). The bottle is held horizontally, not angled down. The nipple is offered to baby to accept (not pushed into the mouth). Feeding pauses are built in every 20–30 seconds — tip the bottle down briefly and allow baby to rest before continuing. A full feed should take 15–20 minutes. If it's faster, the flow is too fast or the pacing isn't happening.

Teat choice: use the slowest-flow nipple available. Change to the next flow level only when baby shows frustration at the current level — not based on age or on schedule.

---

**WHAT TO DO**

1. Practice paced bottle feeding before the first bottle is given, so the technique is familiar.
2. If your partner, grandparent, or any other caregiver is giving bottles, teach them paced feeding before they give the first one. This is the most important thing to communicate to other caregivers.
3. Use the same technique for both pumped milk and formula bottles.
4. Record a 30-second video of a bottle feed at some point in the first week and watch it back — it's easier to spot pace and position issues on video.

---

**WHAT TO WATCH FOR**

- Baby refusing the breast after several days of bottles despite paced feeding: contact your IBCLC — bottle preference can often be reversed with technique guidance [amber callout]
- Baby taking the bottle very quickly (under 10 minutes for a full feed): the flow rate is too fast or pacing isn't happening [plain callout]

---

**CRASH-COURSE SNIPPET TITLE**

"Paced bottle feeding — video reference and step-by-step"

*(Content for this snippet: write a 150-word step-by-step of the paced bottle feeding technique with key checkpoints — position, bottle angle, pause frequency, session length. Include a note that Global Health Media has a free reference video online. Prose format.)*

---

### Module C-1-4: Formula Basics

**Route:** `/this-week/module/C-1-4`  
**Header:** Week 1 | Combination Feeding | ~3 min read  
**Chat bridge topic:** formula preparation and safety

---

**LEAD LINE**

Formula is a safe, regulated, complete food — here's what to actually know about using it.

---

**WHAT TO KNOW THIS WEEK**

All standard US infant formulas meet the same FDA nutritional requirements. The differences between brands are largely cosmetic or marketing. There is no meaningful clinical reason to choose one standard formula over another unless your baby has a specific diagnosed intolerance (cow's milk protein allergy, for example). If you're unsure, ask your pediatrician — but don't pay a premium for a brand because of marketing claims.

Powder vs. ready-to-feed vs. liquid concentrate: powder is the most economical and most widely available; ready-to-feed is the most convenient (no mixing) and recommended for newborns under 3 months when water safety is a concern; concentrate requires mixing with equal parts water and is a middle option. For week 1, ready-to-feed or carefully mixed powder using safe water is the recommendation.

Safe preparation: always wash hands before preparing formula. Use the amount of water specified on the label — do not add extra water to stretch formula. Never microwave formula (it heats unevenly and can burn your baby). Test temperature on your wrist before feeding.

Safe storage: prepared formula (mixed or ready-to-feed, opened) is safe in the refrigerator for up to 24 hours. An opened can of powder formula should be used within one month. Never reuse formula left in a bottle after a feed.

---

**WHAT TO DO**

1. Keep one can of ready-to-feed formula on hand for week 1 — it's the easiest to use when you're learning everything else.
2. If using powder: measure water first, then add powder; always use the scoop that came with the formula; don't pack the scoop.
3. Store prepared formula in the refrigerator, not at room temperature.
4. Label bottles or bags with the time they were prepared so you know when to discard.

---

**WHAT TO WATCH FOR**

- Baby refusing the formula flavor (some babies have preferences): try a different brand or temperature [plain callout]
- Signs of intolerance after formula introduction (blood in stool, severe GI distress, rash): contact your pediatrician [amber callout]

---

**CRASH-COURSE SNIPPET TITLE**

"Formula prep step by step — with safe handling and storage guide"

*(Content for this snippet: write a 150-word step-by-step covering powder mixing (water first, then formula), temperature testing, storage labeling, and the 24-hour refrigerator rule. Include a brief note on the 1-month powder rule. Prose format.)*

---

### Module C-1-5: Before Your Milk Comes In — What Colostrum Looks Like on This Path

**Route:** `/this-week/module/C-1-5`  
**Header:** Week 1 | Combination Feeding | ~3 min read  
**Chat bridge topic:** colostrum and the milk transition

---

**LEAD LINE**

If you're in the first 72 hours and wondering whether what you're producing is "enough" — read this before making any decisions.

---

**WHAT TO KNOW THIS WEEK**

Whatever mix of nursing, pumping, and formula you're planning, the first 72 hours have their own logic — and it helps to understand it before your milk fully comes in.

**Colostrum is milk.** It's been building in your breasts since mid-pregnancy. It's thick, golden, and small in volume by design — because a newborn's stomach on day 1 holds about 5–7 mL, roughly one teaspoon. Your body isn't under-producing. It's matched to your baby's exact capacity. If you nurse and your baby seems to finish quickly, or if you pump and see tiny amounts, that's not a signal that something is wrong or that formula is required. It's what the first 48 hours look like for almost everyone.

**If you're pumping colostrum, the amounts will look alarming.** This is worth naming directly, because for combo feeders who are pumping in the early days, the number in the collection bottle is the most visible thing — and it's very small. One to seven milliliters per session on days 1–2 is normal and expected. Some moms see less. The pump is also genuinely less efficient for colostrum than your hands are (colostrum is thick and sticky and doesn't move through pump tubing well). If you want to maximize what you collect in these first days, hand expression into a small syringe outperforms the pump. The crash-course snippet below has the technique.

**Around days 3–5, everything changes.** Your milk will transition from colostrum to mature milk — and when it does, you'll know. The color lightens from deep gold to cream or white. The volume increases, often quickly. The texture thins. Your breasts may feel heavier or fuller than before. This transition is the point at which your combo feeding plan — whatever proportion of nursing, pumped milk, and formula you've set — starts operating on more stable footing.

**What this means for your formula decisions right now.** If you're supplementing with formula in the first 72 hours for a clinical reason (weight concerns, baby not latching, your IBCLC or pediatrician recommended it) — continue. That's the right call for your situation. But if you're reaching for formula in these first hours because your output looks low and you're worried — it's worth pausing. Your milk hasn't come in yet. The amounts you're seeing are the amounts that are supposed to be there. Talk to your IBCLC before making changes to your plan based on day-1 output.

---

**WHAT TO DO**

1. **If you're nursing:** nurse on demand, as frequently as your baby shows interest (8–12 times in 24 hours is normal). The colostrum is there even when you can't measure it.
2. **If you're pumping colostrum:** consider hand expression into a syringe for the first 24–72 hours — it's more efficient than the pump for thick colostrum. See the crash-course snippet for how.
3. **Hold your plan loosely for the first 72 hours.** The combination plan you built in C-1-2 is designed for after your milk comes in. The first three days are a transition window. Make notes, but don't judge the plan's sustainability based on what you see before day 5.
4. **Notice when the transition happens.** Color change in the milk (gold → white/cream), sudden volume increase, and a feeling of breast fullness are your cues that mature milk has arrived and your plan can fully kick in.

---

**WHAT TO WATCH FOR**

If you are nursing or pumping frequently and your baby is showing signs of inadequate intake after 72 hours — fewer wet diapers than expected, excessive weight loss at the 2-day pediatric check, persistent inconsolability after every feed — contact your pediatrician or IBCLC. Supplementing in that scenario is the right call, and it doesn't mean your feeding plan has failed. [amber callout]

If you're pumping and seeing zero output (not tiny amounts — truly nothing) after 72 hours of pumping 8+ times per day, contact your IBCLC or OB. This is uncommon and warrants a conversation. [amber callout]

---

**CRASH-COURSE SNIPPET TITLE**

"Hand expressing colostrum when you're a combo feeder"

**CRASH-COURSE SNIPPET CONTENT** *(render this verbatim inside the expandable section):*

Hand expression is worth knowing even if pumping is part of your plan, because colostrum is thick enough that your hands outperform most pumps in the first 24–72 hours.

What you need: clean hands, a 1–3 mL syringe (available at most pharmacies), optional warm washcloth.

1. Apply gentle warmth to your breast for 1–2 minutes.
2. Hold the syringe close to your nipple to catch drops.
3. Place your thumb and first two fingers about 1 to 1½ inches back from the nipple base — on the areola, not the nipple.
4. Press gently back toward your chest wall, then compress and release rhythmically. No pulling or squeezing — press in, bring fingers together, release.
5. Rotate gradually around the nipple to reach different ducts.
6. Catch drops in the syringe as they appear.

Collecting 1–3 mL in a session on day 1 is completely normal. The syringe can be used to feed the colostrum directly to your baby, or you can transfer it to a small bottle.

**Colostrum storage:**

| Method | How long |
|---|---|
| Room temperature (up to 77°F) | 4 hours |
| Refrigerator | 4 days |
| Freezer (standard) | 6 months |

Store in small containers — a large bag wastes colostrum on the walls.

**What about the formula I'm already using?**

If formula is part of your week-1 plan, that doesn't change how important it is to understand your colostrum. Even a small amount of colostrum delivered in the first 72 hours carries concentrated immune factors. If you want to maximize the colostrum you're offering, hand expression and syringe feeding can supplement whatever formula your baby is also receiving — they're not in conflict.

---

## SECTION 6: SHARED MODULES (Week 1, All Paths)

Build stub module pages for all 6 shared modules. Each stub must:

1. Exist as a routable page at its specified route
2. Use the full `ModuleShell` component with all sections present
3. Render placeholder text in each content section as specified below
4. Be reachable from the This Week module list on all three paths (A, B, and C) during Week 1

Placeholder text for all sections: *"Content coming — see protocol team."*

---

### Shared Module 1: Postpartum Body — What's Happening to You

**Route:** `/this-week/module/shared-postpartum-body`  
**Header:** Week 1 | All Paths | ~3 min read  
**Module ID:** `shared-postpartum-body`  
**Lead line:** *Content coming — see protocol team.*  
**All sections:** Placeholder text.

---

### Shared Module 2: Partner Support — What to Actually Ask For

**Route:** `/this-week/module/shared-partner-support`  
**Header:** Week 1 | All Paths | ~3 min read  
**Module ID:** `shared-partner-support`  
**Lead line:** *Content coming — see protocol team.*  
**All sections:** Placeholder text.

---

### Shared Module 3: Pediatrician Visits — What to Expect Weeks 1–6

**Route:** `/this-week/module/shared-pediatrician-visits`  
**Header:** Week 1 | All Paths | ~3 min read  
**Module ID:** `shared-pediatrician-visits`  
**Lead line:** *Content coming — see protocol team.*  
**All sections:** Placeholder text.

---

### Shared Module 4: Safe Sleep and Feeding in the Night

**Route:** `/this-week/module/shared-safe-sleep`  
**Header:** Week 1 | All Paths | ~2 min read  
**Module ID:** `shared-safe-sleep`  
**Lead line:** *Content coming — see protocol team.*  
**All sections:** Placeholder text.

---

### Shared Module 5: When to See Your OB vs. Your IBCLC vs. the ER

**Route:** `/this-week/module/shared-escalation-guide`  
**Header:** Week 1 | All Paths | ~3 min read  
**Module ID:** `shared-escalation-guide`  
**Lead line:** *Content coming — see protocol team.*  
**All sections:** Placeholder text.

---

### Shared Module 6: Your Mental Health Matters Too

**Route:** `/this-week/module/shared-mental-health`  
**Header:** Week 1 | All Paths | ~3 min read  
**Module ID:** `shared-mental-health`  
**Status:** ⚠️ HIDDEN — removed from all user-facing surfaces as of 2026-06-30. Route and component kept intact for future use. Do not link to this lesson from any other lesson or screen until further notice.

---

## SECTION 7: T-A-B TRANSITION MODULE (Stub)

Build a stub module page for the path transition module. This module is displayed when a user's path changes from Path A (Exclusive Nursing) to Path B (Exclusive Pumping). It only needs to exist as a routable shell in this brief — all content is provided in Content Update 1.

**Route:** `/this-week/module/T-A-B`  
**Module ID:** `T-A-B`  
**Header:** Transition | Path A → Path B  
**Path badge:** "Switching Paths"

**Lead line:** You're making a transition — here's what that looks like.

**All sections (WHAT TO KNOW, WHAT TO DO, WHAT TO WATCH FOR):** Render placeholder text: *"Content provided in Content Update 1 brief."*

**Crash-course snippet:** Collapsed by default, placeholder label: *"Content provided in Content Update 1 brief."*

```
// T-A-B content will be replaced entirely by Content Update 1 brief.
// Only the shell needs to exist here. Do not author content for this module.
```

The T-A-B module should NOT appear in the standard week module list. It is surfaced only when path transition logic triggers it (path transition logic is out of scope for this brief — just ensure the route exists and is navigable).

---

## SECTION 8: WEEK 2 STUBS — PATHS A AND B

Build stub module pages for all Week 2 modules on Paths A and B. Each stub must:

1. Exist as a routable page at its specified route
2. Use the full `ModuleShell` component
3. Render placeholder text in all sections: *"Content coming — Week 2."*
4. Be reachable from the This Week module list when the user is in Week 2

---

### Path A — Week 2 Stubs

**A-2-1: Your Milk Is Here — Now What?**  
Route: `/this-week/module/A-2-1`  
Header: Week 2 | Exclusive Nursing | Placeholder

**A-2-2: Latch Troubleshooting**  
Route: `/this-week/module/A-2-2`  
Header: Week 2 | Exclusive Nursing | Placeholder

**A-2-3: Is My Baby Getting Enough?**  
Route: `/this-week/module/A-2-3`  
Header: Week 2 | Exclusive Nursing | Placeholder

**A-2-4: [DMER Module — Slot Reserved]**  
Route: `/this-week/module/A-2-4`  
Header: Week 2 | Exclusive Nursing | Placeholder

```
// A-2-4 content provided in Content Update 1 brief.
// Do not author content for this module. Only the shell and route need to exist.
```

---

### Path B — Week 2 Stubs

**B-2-1: Supply Is Established in the First 6 Weeks — Here's Why That Matters Now**  
Route: `/this-week/module/B-2-1`  
Header: Week 2 | Exclusive Pumping | Placeholder

**B-2-2: Output Expectations and the Comparison Trap**  
Route: `/this-week/module/B-2-2`  
Header: Week 2 | Exclusive Pumping | Placeholder

**B-2-3: Bottle Feeding Your EP Milk**  
Route: `/this-week/module/B-2-3`  
Header: Week 2 | Exclusive Pumping | Placeholder

**B-2-4: [DMER Module — Slot Reserved]**  
Route: `/this-week/module/B-2-4`  
Header: Week 2 | Exclusive Pumping | Placeholder

```
// B-2-4 content provided in Content Update 1 brief.
// Do not author content for this module. Only the shell and route need to exist.
```

---

## DO NOT CHANGE

The following must not be modified by this build:

- App shell, routing shell, bottom navigation, home screen
- AppContext structure or any AppContext fields
- Color tokens or Tailwind config
- Getting Started modules (Pillar 2) — those are separate from This Week modules
- Quick Chat feature and chat routing
- Any existing screens not explicitly named in this brief

If Lovable is unsure whether something is in scope, the answer is: if it's not named in this document, don't touch it.

---

## VERIFICATION CHECKLIST

Before marking this build complete, confirm:

- [ ] All 3 Path A Week 1 modules exist and are routable (`A-1-1`, `A-1-2`, `A-1-3`)
- [ ] All 4 Path B Week 1 modules exist and are routable (`B-1-1`, `B-1-2`, `B-1-3`, `B-1-4`)
- [ ] All 5 Path C Week 1 modules exist and are routable (`C-1-1`, `C-1-2`, `C-1-3`, `C-1-4`, `C-1-5`)
- [ ] All 5 active shared modules exist and are routable (`shared-postpartum-body`, `shared-partner-support`, `shared-pediatrician-visits`, `shared-safe-sleep`, `shared-escalation-guide`) — `shared-mental-health` exists but is hidden from UI
- [ ] T-A-B stub exists and is routable (`T-A-B`)
- [ ] All 4 Path A Week 2 stubs exist and are routable (`A-2-1` through `A-2-4`)
- [ ] All 4 Path B Week 2 stubs exist and are routable (`B-2-1` through `B-2-4`)
- [ ] The This Week screen for Week 1 renders a module card list for each path
- [ ] Tapping a module card navigates to the correct module page
- [ ] The Done button marks modules complete and returns to This Week
- [ ] The crash-course snippet collapses by default and expands on tap
- [ ] No existing screens, components, or context were modified
