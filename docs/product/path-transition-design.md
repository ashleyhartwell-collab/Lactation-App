# Latched — Path Transition System: Design Proposal

**Status:** Content complete, all Phase 0 decisions locked (2026-07-08) — still DRAFT for engineering/frontend purposes. No changes to protocol-outline-v1.md have been made yet.  
**Prepared:** 2026-06-28. Updated 2026-07-08 (remaining 8 modules drafted, open questions resolved).  
**Scope:** Full design spec for graceful path transitions across all feeding routes  
**Does NOT modify:** protocol-outline-v1.md (changes proposed in Section 4 only)

---

## Design Principles

Before getting into the mechanics, three principles that should govern every decision in this system:

**1. The decision is already made when she opens a transition module.**  
The app's job is not to interrogate why she's changing paths or to insert a speed bump. By the time a user taps "I want to switch," she has already lived through the reasons. The transition system should function as a compassionate logistics guide, not a gateway check.

**2. No exit is coded as a failure.**  
The system must handle nursing→formula the same structural way it handles pumping→nursing. No transition gets less care, less module depth, or a different tone. A woman who moves from exclusive nursing to full formula at week 2 deserves the same quality of support as one who moves to combination feeding. The app does not have a hierarchy of feeding choices. This has to be true at the content level, not just in a disclaimer.

**3. The transition is a beginning, not an ending.**  
Every module in this system should close by pointing forward — what comes next, what the new path looks like, what she can expect. The emotional experience of a path change is often loss-adjacent even when it's the right call. The content should acknowledge that and then redirect attention to what's ahead.

---

## Section 1: Transition Matrix

All 12 possible path changes, plus the relactation case. For each: common triggers, emotional register, core content needed.

---

### Nursing (A) → Exclusive Pumping (B) | T-A-B

**Why users make this change:**
- Persistent latch issues that haven't resolved despite IBCLC support
- Nipple damage that is no longer sustainable
- NICU discharge where pumping was established and baby hasn't fully transitioned to breast
- Returning to work and preferring to standardize on pump
- Baby refusing the breast (nursing strike becoming permanent)
- Personal preference — wants the ability to measure and hand off feeds

**Emotional register:** Often mixed. There can be grief about losing the skin-to-skin nursing relationship alongside real relief at having a clear system. The EP identity is strong and welcoming — route her toward it.

**Core content needed:**
- Acknowledgment that her supply is already established — she is not starting over
- What's different in EP vs. nursing (logistics, schedule, equipment)
- Flange fitting: non-negotiable, do this now, supply depends on it
- Pumping schedule: how it differs from nursing session frequency
- What she gains (measurement, sharable feeds, flexibility) and what adjusts (time per session, cleaning, equipment)
- Practical handoff: which Path B modules to pick up from, at what week

**Supply/weaning note:** No supply interruption if pumping is introduced immediately. The critical move is ensuring the pump empties the breast as well as nursing was. Crash-course: hands-on pumping technique.

---

### Nursing (A) → Combination Feeding (C) | T-A-C

**Why users make this change:**
- Pediatrician recommended supplementation (weight gain concern, jaundice)
- Supply not meeting baby's needs despite nursing on demand
- Returning to work and wanting to share feeds
- Partner wants to participate in feeds
- Personal choice — wants more flexibility

**Emotional register:** Often accompanied by external pressure (pediatrician, family) and guilt about "not being enough." May feel like a demotion. Needs explicit framing as a strategic expansion, not a retreat.

**Core content needed:**
- The combo path is a full path, not a consolation path
- Paced bottle feeding: this is the most important technical move; bottle preference is the risk
- How supplementation affects supply (the demand-supply mechanics, stated neutrally as information)
- How to protect nursing supply if she wants to: replace supplemented feeds with pump sessions
- How to let supply adjust naturally if that's her preference
- Formula basics if formula is new to her
- Route into Path C

**Supply/weaning note:** Supply will calibrate to demand. If she nurses less, supply will reflect that. This is not a problem if it's intentional. The module gives her the levers; she decides which direction to pull.

---

### Nursing (A) → Formula | T-A-F

**Why users make this change:**
- Persistent pain that has not resolved
- Supply insufficient to meet baby's needs (confirmed, not perceived)
- Medical reason requiring medication incompatible with nursing
- Mental health — nursing is worsening anxiety, depression, or intrusive thoughts
- Personal choice: this is enough
- Returning to work and the logistics are not viable
- Trauma response to breastfeeding (birth trauma, sexual trauma)
- Baby refusing to nurse

**Emotional register:** The highest-stakes emotional transition in the entire app. Cultural messaging about "breast is best" makes this the transition most likely to be accompanied by shame, grief, or a sense of personal failure. The module must be the most careful about tone while also being the most practical. No validation-fishing. The decision was hers to make. The app's job now is helping her do it well, physically and emotionally.

**Core content needed:**
- No-shame opening that acknowledges the weight of this without performing sadness
- Weaning: gradual vs. abrupt, and when abrupt is medically necessary
- Engorgement management during weaning (the physical experience is often intense and unprepared-for)
- Cabbage leaves, sage tea, cold compresses — the evidence (modest) and the practical value (real)
- What to expect from the body over 1-3 weeks as milk production winds down
- Formula if she hasn't used it before: what to know, how to choose, safe prep
- The grief is allowed: brief, non-dwelling acknowledgment that this is a real loss for some moms, and that's worth naming
- When to call her OB: signs of mastitis during weaning, fever, abscess

**Supply/weaning note:** This section needs the most clinical care. Abrupt weaning can cause engorgement → blocked duct → mastitis. The gradual approach (drop one session every 2-3 days) is almost always safer.

---

### Exclusive Pumping (B) → Nursing | T-B-A

**Why users make this change:**
- Baby was premature or in NICU; now latching successfully
- Tongue tie or lip tie was revised; breast is now accessible
- Supply is well-established and she wants the simplicity and skin-to-skin of nursing
- Tired of the pump equipment and session logistics
- Personal shift in priorities

**Emotional register:** Often positive — this feels like "graduating" to the thing she originally wanted. But anxiety about whether it will work is real. Reassurance that supply established via pump transfers directly to nursing.

**Core content needed:**
- Supply is already there — the breast doesn't know the difference between a pump and a baby
- How to introduce the breast after bottle feeding: nipple preference risk, paced bottle feeding while transitioning
- Expect a learning curve at the breast even with established supply
- Signs it's working (latch improving, baby satisfied, weight continuing to track)
- IBCLC recommendation for the transition if she hasn't had hands-on support
- What to do with her pumping equipment in the meantime (don't ditch it yet)
- Route into Path A at the appropriate week

**Supply/weaning note:** Pumping should be gradually reduced as nursing establishes — don't go cold turkey on the pump until baby is nursing effectively. Track diaper output closely during the transition.

---

### Exclusive Pumping (B) → Combination Feeding (C) | T-B-C

**Why users make this change:**
- Supply not meeting baby's full needs
- Deliberate choice to add formula to reduce the pump burden
- Beginning a transition toward full formula weaning
- Returning to work and wanting to reduce the number of pump sessions

**Emotional register:** May feel like a step backward for EP moms who measure every ounce. Frame as intentional management, not retreat. The EP work she did got her to this point.

**Core content needed:**
- She's already doing bottle feeding and paced feeding — this part is familiar
- Formula basics if new to it
- How much formula to add and when: the math for typical intake needs (neutral, not prescriptive — her pediatrician sets the target)
- How to manage the pump schedule as formula replaces some sessions
- Route into Path C from the relevant week

**Supply/weaning note:** Supply will naturally adjust as sessions decrease. If she wants to maintain current supply and add formula on top, she needs to pump at the same frequency. If she wants supply to gradually decrease, she can intentionally drop sessions.

---

### Exclusive Pumping (B) → Formula | T-B-F

**Why users make this change:**
- Supply has declined and baby's needs exceed output
- Physical exhaustion from the EP schedule
- Nipple or breast pain that hasn't resolved
- Meeting a personal goal (6 weeks, 3 months, 6 months) and choosing to stop
- Returning to work and the logistics of workplace pumping are not viable
- Mental health — the pump is consuming more than it's giving

**Emotional register:** This is the second-highest-stakes emotional transition. EP moms have some of the deepest investment in their feeding choice — every session is a decision, every ounce is counted, the commitment is extremely visible. Stopping carries a particular weight. The module needs to honor that investment explicitly, not skip over it in the rush to give logistics. Then give the logistics.

**Core content needed:**
- Explicit acknowledgment of what EP actually involves — and that choosing to stop is a choice that took something from her to make
- Pump weaning: how to reduce sessions gradually, which session to drop first, timing
- What to expect physically: engorgement, supply adjusting, timeline to milk drying up (weeks, not days)
- Signs of mastitis during weaning — the window of highest risk
- Formula if she hasn't used it before: basics, prep, safety
- Optional: her data summary (total sessions logged, estimated total ounces — some moms find this meaningful; it should be easy to dismiss if not)
- When to contact her OB: fever + breast pain + flu symptoms during weaning = mastitis, do not wait

**Supply/weaning note:** Drop one session every 2-3 days. Start with the lowest-output session (typically mid-day). Gradual reduction prevents the engorgement-to-blocked duct-to-mastitis cascade. Cold compresses and a supportive bra help. The body will wind down over 1-3 weeks.

---

### Combination Feeding (C) → Exclusive Nursing | T-C-A

**Why users make this change:**
- Supply has increased; baby is now meeting needs at the breast alone
- Baby's latch issues are resolved
- Wants to simplify — the combination logistics are exhausting
- Formula is expensive; wanting to reduce

**Emotional register:** Often celebratory — this can feel like a win. But anxiety about supply being adequate is real, and she should know what to watch for.

**Core content needed:**
- How to increase nursing frequency to fully replace formula feeds
- Supply response time: 48-72 hours for supply to respond to increased demand
- Signs nursing is adequately replacing formula: diaper output, weight tracking
- Paced bottle feeding can be phased out as bottle feeds decrease
- IBCLC: worth a check-in if the transition is significant (more than 50% formula to 0% is a large supply ask)
- Route into Path A at appropriate week

**Supply/weaning note:** If she was doing significant supplementation, her supply will need time to meet full demand. She should increase nursing sessions before eliminating formula, not simultaneously.

---

### Combination Feeding (C) → Exclusive Pumping | T-C-B

**Why users make this change:**
- Baby refusing the breast; wants to maintain milk supply via pump
- Nipple pain that's resolved the nursing component but not the milk supply goal
- Returning to work; wants to standardize on a measurable system
- Partner or caregiver managing most feeds

**Emotional register:** May involve grief about the nursing relationship ending. Transition to EP from combo is less common and needs acknowledgment that the pump is a real option, not a last resort.

**Core content needed:**
- Flange fitting: do this immediately if pumping was only occasional on the combo path
- Establishing a pumping schedule: frequency matters more now that nursing isn't providing stimulation
- Supply may need time to stabilize at the new demand level (combo nursing was providing some stimulation)
- Route into Path B at appropriate week
- EP community resources — she's joining a new community

**Supply/weaning note:** If nursing was providing meaningful stimulation, dropping it from the pump schedule without compensating sessions may temporarily dip supply. Treat the first 1-2 weeks as a re-establishment period.

---

### Combination Feeding (C) → Formula | T-C-F

**Why users make this change:**
- Supply naturally declining and she's ready to stop the milk component
- Meeting a personal milestone and choosing to stop
- Exhaustion from managing a complex feeding system
- Medical reason

**Emotional register:** Often less acute than A→Formula because formula was already in the picture. But can still carry "the last nursing session" or "the last pump session" weight. Don't assume this is easier.

**Core content needed:**
- Weaning from whatever milk component remains (nursing, pumping, or both)
- Engorgement: what to expect as the body adjusts
- Formula as the full system: she already knows formula basics, so this can be brief
- The transition period (1-3 weeks) and what's normal physically
- When to contact her provider: mastitis signs

**Supply/weaning note:** Same gradual reduction principles apply. If she's nursing, drop one nursing session every 2-3 days. If she's pumping, drop one session every 2-3 days. If she's doing both, start with whichever provides less stimulation.

---

### Formula → Any Breastfeeding Path | T-REL (Relactation)

**Why users make this change:**
- Weaned earlier than intended due to external pressure, and wants to try again
- Adoptive nursing or nursing a baby who wasn't with her at birth
- Health circumstances have changed and nursing is now possible
- Deeply missed the nursing relationship

**Emotional register:** Hope mixed with realistic uncertainty. Relactation is possible but highly variable — outcomes depend on how long milk has been absent, how recently supply was present, individual biology, and sustained effort. This module must be honest without being discouraging.

**Core content needed:**
- Relactation is possible. It requires sustained effort and IBCLC guidance. **This module does not replace IBCLC support — it introduces the concept and routes her to qualified help.**
- What relactation involves: frequent, sustained stimulation (nursing attempts + pumping); typically 2-8 weeks to see meaningful supply response; outcomes are variable
- The tools available: galactagogues (modest evidence), domperidone (used off-label in some countries; not FDA-approved for this purpose), herbal options (evidence is limited)
- Realistic expectations: full relactation to exclusive nursing is possible; partial relactation (combo feeding) is also a valid goal
- IBCLC is non-negotiable for this path — provide directory link
- **Do not route her into Path A, B, or C independently — the first stop is an IBCLC**

**Clinical note for advisors:** This module requires more careful clinical review than any other transition module given the complexity and variability of relactation outcomes. The app should not position itself as a relactation guide. It should be a bridge to clinical support.

---

## Section 2: Module Architecture

### Three Options Evaluated

**Option A: Exit sections at the bottom of every module**  
A "Thinking about switching paths?" link at the bottom of each of the 61 path-specific modules. Low friction, highly discoverable.

*Problem:* Creates ambient anxiety. A mom who is confident in her nursing path doesn't need to see "exit here" at the bottom of every module. It makes the app feel provisional — like it doesn't believe she'll stay. It also undermines the forward momentum that's essential to the emotional design. Rejected.

**Option B: Chat-triggered only**  
The AI chat detects keywords (mentions of "switching," "stopping," "formula," "too painful," "done with the pump") and surfaces the relevant transition module in conversation.

*Problem:* Requires a specific capability that may not be ready at launch. More importantly, not every user wants to go through a chat conversation to get to logistics. Some moms are private. Some just want to find the content without talking. Insufficient as the primary system. Should exist as a layer, not the foundation.

**Option C: Dedicated Path Change hub**  
A persistent, always-accessible section of the app — navigable from the main menu — that contains all transition modules. The entry point uses neutral, non-shaming language. No breadcrumbing from individual modules.

*Problem:* Discoverability requires active seeking. A mom at 3am in crisis may not know to look in the main menu.

---

### Recommendation: Hub + Contextual Surfaces + Chat Layer

These three approaches are not mutually exclusive. The right architecture uses all three:

**Primary: The Path Change hub (persistent nav)**
- Accessible from the main menu at all times, on every path
- Entry language: *"Thinking about changing how you feed?"* — no shame cue, no urgency
- Inside the hub: a simple matrix ("I'm currently on [path] and thinking about [path]") that routes to the appropriate transition module
- One tap from anywhere in the app
- The hub does not track how many times a user visits it or surface that data in any user-facing way

**Secondary: Contextual surface points in existing modules**
Three existing modules already address path transitions at a surface level. These should be updated to include a prominent CTA that opens the Path Change hub to the relevant transition:

- **Module A-5-3** ("Feeding Relationship Check-In") — currently says "route to combo path if she's considering supplementing." Update: add explicit CTA → "Thinking about changes? The Path Change hub has everything you need."
- **Module B-5-2** ("Combination Feeding Transition, If Needed") — already routes toward combo. Update: link directly to T-B-C and T-B-F.
- **Module C-6-3** ("Deciding Your Week 7-12 Path") — already acknowledges full formula transition. Update: link directly to T-C-F.

No other existing modules need exit CTA additions. These three are the ones where the protocol already acknowledges the inflection point; lean into that rather than adding friction to every module.

**Tertiary: Chat/AI signal detection**
When the AI chat detects language indicating a path change consideration, it proactively asks: *"It sounds like you might be thinking about changing how you're feeding. Would it help to see your options?"* — and routes to the Path Change hub with the relevant transition pre-loaded.

Keyword signals to detect (non-exhaustive):
- "switch to formula," "start formula," "stop nursing," "stop pumping"
- "too painful to keep going," "my supply is gone," "can't do this anymore"
- "thinking about quitting," "want to try nursing" (from pump or formula context)
- "does anyone ever switch" (signals she's exploring)

The chat layer should surface the hub, not attempt to walk through the entire transition in conversation. Keep the content where the content lives.

---

## Section 3: Full Transition Modules

All 11 transitions, drafted in full (2026-07-08: the remaining 8 added — T-C-F, T-B-A, T-A-C, T-B-C, T-C-A, T-C-B, T-WEAN, T-REL — following the recommended authoring order in Section 4: formula exits, then nursing/pumping, then combo, T-WEAN, T-REL last). Voice and format match the established protocol standard, and the newer 8 also apply the voice rules locked during the Getting Started rework: no em dashes, direct second-person address, a mix of short and compound sentences rather than a uniform cadence. T-REL is intentionally thin per Ashley's Phase 0 decision (2026-07-08) — it routes to an IBCLC rather than coaching the process in-app.

---

### T-A-F — Nursing to Formula

**STOPPING NURSING. HERE'S HOW TO DO IT WELL.**  
Path Change • Nursing → Formula • Estimated read time: 4–5 min

---

**LEAD LINE**

You don't owe anyone an explanation for this decision. Not here, not anywhere.

---

**WHAT TO KNOW**

This module is about the how — what's going to happen in your body over the next 1–3 weeks, and what you can do to make this transition as comfortable as possible. We're skipping the why. You already know the why.

**Weaning works better gradually.** If your situation allows for it — if this isn't a sudden medical decision — your body will handle the transition more comfortably with a gradual reduction in nursing sessions rather than an abrupt stop. Abrupt cessation is possible, but it significantly increases the risk of engorgement → blocked duct → mastitis. That's a miserable experience to add to an already hard transition. The recommendation: drop one nursing session every 2–3 days, not all at once.

**Here's what that looks like in practice.** If you're currently nursing 6 times per day, the gradual schedule might look like this: drop one session on day 1, stay at 5 sessions for 2–3 days, drop again, and so on. Your body will take several days between drops to adjust supply. You'll likely feel pressure and fullness after each drop — that's normal, and it passes. By the end of 2–3 weeks, most moms have completed the process and supply has wound down.

**If you need to stop quickly** (for a medication, a medical situation, or because gradual isn't possible right now), it's still manageable — it's just more likely to involve more discomfort. The "what to do" section covers both cases.

**What your body is going to do.** As nursing sessions decrease, your prolactin levels drop and your body gradually reabsorbs the milk it's producing. This process takes time — typically 1–3 weeks for supply to substantially decrease, and sometimes longer for traces of milk to be fully gone. You may notice:
- Breast fullness and pressure, especially in the first few days after each dropped session
- Leaking, particularly with letdown triggers (hearing a baby cry, seeing photos of your baby, warm showers)
- Engorgement episodes if sessions are dropped too quickly

These are not signs something is wrong. They're the body doing exactly what it does when demand decreases.

**The grief, if it's there, is real.** Some women feel relieved when they stop nursing. Some feel sad. Some feel both at the same time. Feeding a baby — however briefly, however hard — is a physical and emotional relationship. If ending it brings up complicated feelings, those feelings are legitimate and they don't require explanation. If what you're experiencing goes beyond normal transition emotions — if the sadness is persistent, consuming, or spiraling — that's worth talking to someone about. See "Your mental health matters too" in the shared modules section.

---

**WHAT TO DO**

1. **Drop one session at a time, every 2–3 days.** Start with the session your baby is least interested in, or the one that feels most optional in your current schedule. Let your body adjust before dropping the next one.

2. **Manage fullness between sessions.** Hand express or pump just enough to relieve pressure — not to empty, just to take the edge off. Emptying sends a demand signal; relief expression does not. Cold compresses after help with inflammation and discomfort.

3. **If you have them, use these.** Cabbage leaves (refrigerated, crushed to release the juice slightly, applied to the breast for 20 minutes a few times a day) have modest but real evidence for reducing engorgement and supply. Sage tea has a traditional reputation for reducing supply; the evidence is limited but it's safe to try. Neither is a shortcut — they're adjuncts to the gradual reduction process.

4. **Wear a supportive, non-binding bra.** A sports bra that provides gentle compression helps with comfort. Avoid underwire during this period — it can compress ducts and increase the risk of blockage. Very tight binding is not recommended (it increases mastitis risk).

5. **If formula is new to you:** All standard US infant formulas meet the same FDA nutritional requirements. The brand marketing differences are real marketing and mostly not real nutritional differences. Your pediatrician is the right person to ask if there's a specific reason to choose one formula over another for your baby. The crash-course snippet below covers preparation basics.

---

**WHAT TO WATCH FOR**

During weaning, your risk of mastitis is elevated — specifically in the window when supply is high but nursing frequency is decreasing. Watch for:

- Fever above 101°F
- Flu-like symptoms (body aches, chills, fatigue) combined with breast pain
- A hard, red, or warm patch on the breast that doesn't resolve within 24 hours after the next session is dropped

**If you have fever + breast pain + flu symptoms: call your OB or provider today.** Mastitis during weaning is treated the same way as mastitis during nursing — antibiotics, continue expressing to prevent progression. Do not wait it out.

A milk bleb (a small white dot on the nipple) is also possible during this period. Usually resolves on its own; if painful or persistent, your IBCLC or OB can advise.

---

**[CRASH-COURSE SNIPPET — expandable: "Want to go deeper?"]**

**Formula basics: what to know if you're new to it**

All infant formulas sold in the US must meet the same FDA nutritional standards. The primary distinction you'll encounter is:

- **Cow's milk-based** (the most common): appropriate for most babies unless there's a documented intolerance or allergy
- **Soy-based**: sometimes recommended for dairy intolerance; ask your pediatrician
- **Hydrolyzed or hypoallergenic**: for babies with confirmed cow's milk protein allergy; usually recommended by a pediatrician, not chosen independently
- **Ready-to-feed vs. powder vs. concentrate**: ready-to-feed is the most expensive and most convenient; powder is the most economical; concentrate is in between. All are nutritionally equivalent when prepared correctly.

**Safe preparation for powder formula:**
1. Wash hands
2. Use water that's safe for your baby (tap water is fine in most US municipalities; if you're uncertain, ask your pediatrician)
3. Follow the package ratio exactly — too concentrated or too diluted is not safe
4. Mix thoroughly; let cool before offering
5. Use within 1 hour if left at room temperature, or within 24 hours if refrigerated
6. Never microwave formula — it creates hot spots that can burn a baby's mouth

**How much to offer:**
A general starting point for newborns is 2–3 oz every 2–4 hours, adjusting to your baby's hunger cues. Your pediatrician will help you calibrate based on your baby's weight and growth. The tracker in the app can log formula feeds just as it logs nursing sessions.

**What "paced bottle feeding" means:**
Even if you've already introduced bottles, it's worth noting: feed your baby semi-upright with the bottle held more horizontally, allowing the baby to control the flow with pauses every few sucks. This prevents overfeeding and helps regulate the experience. A feed should take 15–20 minutes — not 3.

---

### T-A-B — Nursing to Exclusive Pumping

**SWITCHING TO THE PUMP. WHAT'S DIFFERENT FROM HERE.**  
Path Change • Nursing → Exclusive Pumping • Estimated read time: 3–4 min

---

> **[PERSONALIZATION NOTE — not user-facing]**  
> This module uses the baby's date of birth captured during onboarding to calculate how many days/weeks postpartum the user is at the moment she enters the transition flow. The window variant (1–4 below) that matches her current timeline renders in place of a single generic opening. LEAD LINE and WHAT TO KNOW are window-specific. WHAT TO DO and WHAT TO WATCH FOR are shared across all windows, with inline flags marking content that needs variant treatment in the final build.
>
> **Window assignment:**  
> — Window 1: Days 1–4 (colostrum phase, milk not yet in)  
> — Window 2: Days 5–14 (milk arriving, early transition)  
> — Window 3: Days 15–42 / Weeks 2–6 (supply establishing, not yet stable)  
> — Window 4: Day 43+ / 6 weeks and beyond (established supply)  
>
> If DOB data is unavailable, Window 3 renders as default.

---

**[WINDOW 1 — Days 1–4 | Colostrum phase]**

**LEAD LINE**

Your milk hasn't fully come in yet — and that actually changes what this transition looks like, in a way that's useful to know.

---

**WHAT TO KNOW**

Right now your body is producing colostrum: the dense, concentrated early milk that all babies receive in the first days after birth. Mature milk — the higher-volume production your baby will rely on for the months ahead — typically transitions in somewhere between days 3 and 5, and sometimes a day or two later after a cesarean or a complicated delivery. What this means for your situation: there is no established supply yet to protect or preserve. You're not abandoning something you built. You're building it now, with the pump as your tool. That's a different starting point, and a simpler one.

**What you're doing right now is sending a signal.** Milk supply is governed by demand — by how consistently and completely your body is told that milk is needed. In these first days, that signal is everything. Your body doesn't know it's a pump delivering it. It only knows that stimulation is happening, or it isn't. Frequent pumping right now is the input that builds the supply you're working toward. The goal is not volume. The goal is signal frequency.

**Eight to twelve sessions in every 24-hour period.** This is the range that provides the stimulation needed for supply establishment, and it's the same whether you're nursing or pumping. Space sessions no more than 3 hours apart during the day; try not to go longer than 4 hours without stimulation overnight. That frequency may feel relentless — it reflects how often a newborn would be at the breast in these early days, because that frequency is what establishes supply.

**Hand expression belongs alongside pumping right now.** The clinical protocol for early milk expression (ABM Protocol #8) recommends combining hand expression with pumping in the first days, not relying on the pump alone. Colostrum is thick and viscous — it doesn't always flow freely in response to suction the way mature milk does. Starting each session with a minute or two of hand expression, and finishing each session with hand expression after the pump flow stops, captures milk the pump may not reach and adds additional stimulation. Don't skip it because the amounts feel negligible.

**The amounts will feel negligible — and that's completely normal.** One to seven milliliters per session is within normal range for colostrum. Some mothers express even less than that in the first 24–48 hours. This is not a supply problem; it is colostrum behaving as colostrum behaves. The volume increase is coming as your milk transitions in over the next several days. For now, a colostrum-fed newborn's stomach is roughly the size of a marble. What you're producing is calibrated to that.

**Get your flange fit right before your first session.** Even this early, flange sizing matters. An incorrect fit reduces stimulation quality, causes friction on the nipple, and establishes habits that are harder to change once they're set. Measure your nipple diameter — the nipple itself, not the areola — add 2–3mm, and match that to your pump's sizing options. The crash-course snippet covers the measurement. A hospital-grade pump (rental) is the gold standard for establishing supply from the very beginning; if that's accessible, the first 2–4 weeks of establishment are the highest-value period to use one.

---

**[WINDOW 2 — Days 5–14 | Milk arriving, early transition]**

**LEAD LINE**

Your milk is coming in, or it just arrived. You're in the most supply-responsive window of your entire postpartum period — and that matters for how this transition goes.

---

**WHAT TO KNOW**

Days 5–14 represent one of the most hormonally active periods in milk supply development. Colostrum is transitioning to mature milk — the higher-volume production your baby will rely on for the months ahead. Your body is actively calibrating supply based on the demand signals it's receiving right now, and it hasn't settled into a stable set point yet. What this means practically: the pump sessions you put in right now land with a disproportionately large effect on your long-term supply. Your body is in a highly responsive, still-negotiating state. Consistency in these two weeks is the leverage.

**Pump every 2–3 hours, including overnight.** This schedule matches the stimulation frequency your body needs during active supply establishment — the same rhythm a nursing newborn provides at this stage. The overnight component specifically: prolactin, the hormone that drives milk production, peaks between 2 and 4am. Going longer than 4–5 hours without pumping overnight in these early weeks is a meaningful cost to long-term supply. You don't hold this schedule forever. This is the establishment phase. The schedule gets more flexible once supply stabilizes, typically around weeks 6–8.

**Get your flange fit right now, before the next session.** Milk is arriving in greater volume, and from this point forward, how efficiently your pump removes milk per session directly determines supply. Nipple tissue also changes as milk comes in — measurements from the first few days may no longer apply. Measure your nipple diameter now, add 2–3mm, and correct if needed. An ill-fitting flange at this stage means reduced output per session, and downstream, reduced supply. The crash-course snippet covers the measurement. If a hospital-grade pump is accessible, this is the highest-value window to use one — these first two weeks of milk establishment respond well to high-efficiency suction.

**Watch for engorgement.** If you were nursing — even partially, even through difficulty — your supply may have been building in response to that stimulation. As nursing decreases and pumping begins, there can be a gap where the pump isn't yet removing milk as efficiently as nursing was. Engorgement during this transition is common and manageable; the right response is pumping to fuller emptying, not backing off sessions. Engorgement that goes unaddressed can progress to blocked ducts. The WHAT TO WATCH FOR section covers what to look for.

**Letdown may take a moment with the pump.** The milk ejection reflex — the neurological trigger that allows milk to flow — doesn't always respond to pump suction as immediately as it responds to a nursing baby. Your body is learning a new stimulus. In the meantime: a warm compress on the breast for a few minutes before starting, a brief breast massage, or looking at a photo of your baby can all help trigger letdown while your body adapts. Most mothers find this becomes faster and more automatic within 1–2 weeks of consistent pumping.

---

**[WINDOW 3 — Weeks 2–6 | Supply establishing, not yet stable]**

**LEAD LINE**

You're in the most common window for this transition, and you're not starting over. But supply isn't fully established yet — what you do in the next few weeks matters.

---

**WHAT TO KNOW**

Weeks two through six are when many mothers run into the latch difficulties, nipple damage, or logistical realities that bring them to this switch. It's also the window when supply has been building — sometimes substantially — but hasn't yet reached the stable set point it will find around weeks 6–8. Exclusive pumping at this stage can absolutely establish and maintain a full supply. The condition on that is session frequency: right now, the pump needs to do real work to complete the build that nursing started.

**Supply isn't locked in — but it isn't lost either.** Right now your body is still reading demand closely and adjusting production in response. If you've been nursing at the frequency a newborn requires, your supply has been receiving significant stimulation. The pump needs to replicate that stimulation at roughly the same frequency — not because the pump is fragile, but because supply at this stage is still in the process of establishing. Think of this less as "maintaining what you built" and more as "completing the build via a new delivery mechanism."

**Don't drop below 8 sessions in any 24-hour period yet.** This is the threshold where stimulation is reliably sufficient to support supply during the establishment phase. Dropping below 8 — even temporarily to manage the logistics of the transition — can cause a supply dip that takes deliberate effort to recover from. Build your pump schedule to 8–10 sessions before you make significant changes to nursing; the WHAT TO DO section covers the order of operations.

**If supply dips during the transition, power pumping can recover it.** A supply dip in the first 1–2 weeks of switching is not uncommon and doesn't signal permanent loss. Power pumping — one 60-minute block per day structured as: pump 20 minutes, rest 10, pump 10, rest 10, pump 10 — mimics the stimulation of a cluster feed and prompts additional supply response. Most mothers see results within 3–5 days of consistent power pumping. It's a targeted, temporary tool added on top of your regular schedule, not a replacement for it.

**Get your flange fit right — now, not later.** If you pumped occasionally while nursing, the flanges from that period may not reflect your current nipple size. Weeks of nursing change nipple tissue. An incorrectly fitting flange at this stage reduces output per session and, downstream, reduces supply over time — and the problem is invisible in real time because you can't see what the pump isn't extracting. Measure your nipple diameter now, add 2–3mm, and correct if needed. The crash-course snippet walks through this. A hospital-grade pump for the first 2–4 weeks of the transition is worth the cost if accessible, particularly if supply hasn't fully established yet.

**The first weeks of exclusive pumping are the most logistically demanding.** The schedule is real, the equipment needs cleaning after every session, and overnight sessions interrupt sleep in a way that nursing — with its portability — didn't. This is worth naming without overstating: the logistics become more manageable as supply stabilizes and as the rhythm becomes routine. The EP community has navigated exactly this window; see step 5 in WHAT TO DO.

---

**[WINDOW 4 — 6 Weeks+ | Established supply]**

**LEAD LINE**

Your supply is established. The transition from here is about maintaining what you have — which is a different, more manageable problem than building it.

---

**WHAT TO KNOW**

At six weeks and beyond, supply has typically found its set point — not rigidly fixed, but stable enough that it operates on a demand-and-response system rather than the intensive establishment mode of the early weeks. You've been nursing consistently, your body has calibrated to that demand, and what you're changing now is the delivery mechanism. The supply itself doesn't need to change; the question is whether the pump will deliver the same demand signal that nursing was.

**Your supply follows the pump.** Your body doesn't distinguish between a baby and a pump. It reads demand: frequency, volume of removal, completeness of emptying. If your pump sessions replicate the stimulation pattern nursing was creating, supply follows. Nothing you built at the breast is lost in this transition — it moves. The comparison that matters is total daily milk removal, not session-by-session parity; nursing provides variable, demand-driven sessions that can be hard to count exactly, and the pump replaces those with a defined schedule.

**The transition goal has shifted from building to maintaining.** In the early weeks, the work is supply establishment — pushing the ceiling up. At this stage, the work is maintenance — keeping the ceiling where it is while changing the mechanism. This allows for more schedule flexibility than the early establishment phase. Eight sessions distributed across 24 hours, with one session in the early morning window (when prolactin peaks between 2–4am) and reasonable spacing through the day, is typically sufficient for maintenance. Starting at 10 sessions for the first 2 weeks of the transition is a reasonable cushion before settling into the 8-session rhythm.

**Overlap nursing and pumping for 1–2 weeks, if possible.** Don't drop nursing sessions abruptly before pump sessions are providing equivalent stimulation. Treat the first 1–2 weeks of the transition as a load-shifting period: nursing and pumping running in parallel, with the balance gradually shifting. Replacing one nursing session with a pump session every 1–2 days is a pace that manages engorgement and gives your body time to adapt to the new stimulation pattern. Cold turkey is possible — but the gradual approach avoids the engorgement-to-blocked-duct risk during a window when you're already managing a transition.

**Watch for gradual supply decrease as the transition completes.** The most common issue in this window is a slow, invisible supply drop that happens when total daily milk removal via the pump doesn't quite match what nursing was providing. Nursing is variable and demand-driven in ways that are easy to undercount — a longer session here, a comfort feed there — and the pump replaces those with fixed, scheduled sessions. If output starts declining over 2–3 weeks of consistent pumping, check three variables: flange fit (is the pump removing efficiently?), session frequency (is demand sufficient?), and session completeness (is emptying happening fully, or is milk being left behind?). The crash-course snippet covers hands-on pumping technique for more complete emptying.

**Measure your flanges now — not from memory.** If you used a pump earlier in your feeding journey, your nipple diameter at six-plus weeks may differ from what it was in the early postpartum period. Tissue changes with weeks of nursing. Measure before your first regular pump session and correct if needed. Consumer double electric pumps are generally adequate at this stage given that supply is established; hospital-grade rental is less critical here than in earlier windows, though still beneficial if your output during the first transition weeks is lower than expected.

---

**WHAT TO DO**

> **[FLAG — Window 1]** Steps 2 and 3 below are written for mothers with an established nursing routine to phase out. Window 1 users have no established nursing pattern to drop. The task is building pump frequency as the primary feeding system from scratch. For Window 1: step 2 should read "Build your pump schedule as your primary feeding system — 8–12 sessions per 24 hours, spaced no more than 3 hours apart during the day." Step 3 does not apply; substitute the hand expression guidance from the Window 1 WHAT TO KNOW.

> **[FLAG — Window 2]** The "every 1–2 days" pace in step 3 assumes a well-established nursing routine. For Window 2 users, nursing may have been sporadic or assisted; the pace can sometimes be faster, but engorgement management requires specific attention if milk has arrived or is arriving simultaneously. Add a note: watch for engorgement if milk volume is increasing while nursing frequency is decreasing at the same time.

1. **Fit your flanges before your first session.** This one thing protects your nipples, your output, and your pumping experience more than anything else in this transition. The crash-course snippet below walks through the measurement.

2. **Build your pump schedule before you drop nursing.** Decide on your target sessions per day (8 is the minimum to maintain supply; 10 is better in the first 2–4 weeks of the transition). Map them across a 24-hour period. Keep one session between 12am–5am.

3. **Drop nursing sessions gradually as you add pump sessions.** Don't switch cold turkey if you can avoid it. Replace one nursing session with a pump session every 1–2 days. This manages engorgement and gives your body time to adapt to the new stimulation pattern.

4. **Use hands-on pumping.** Breast massage before and during pumping — especially at the end of a session when flow is slowing — meaningfully increases output compared to passive pumping. The crash-course snippet explains the technique.

5. **Join the EP community.** Exclusive pumpers are one of the most supportive and underserved communities in the feeding world. r/ExclusivelyPumping and *Exclusive Pumping* by Stacey Stewart are legitimately good resources. You'll find practical knowledge there that most lactation content doesn't cover.

---

**WHAT TO WATCH FOR**

> **[FLAG — Windows 1 and 2]** The first watch item below — "output should be comparable to what nursing was providing" — applies to Windows 3 and 4. For Window 1 users, supply is building from a colostrum baseline; there is no established nursing output to compare against. Replace with: "Colostrum volumes of 1–7 mL per session are normal. If you are expressing nothing at all after multiple sessions with correct technique and flange fit, contact your IBCLC." For Window 2 users: "Output should be increasing over the course of week 2 as mature milk volume builds. If output appears to plateau or decline after day 10 despite consistent sessions, flange fit and session frequency are the first things to check."

In the first 1–2 weeks of the transition:

- **Output should be comparable to what nursing was providing.** If you're seeing significantly less than expected after a week of consistent pumping at full frequency, a flange refit and technique review with your IBCLC is worth doing before assuming supply is dropping.
- **Engorgement** is possible in the transition period if nursing sessions are dropped before pump sessions are fully substituting. Manage with the pump or brief hand expression — not cabbage leaves or suppression techniques, which you don't need yet.
- **Persistent pain** during pumping beyond the first 30–60 seconds of a session is not normal and is worth troubleshooting before your next session. Pain usually traces to flange fit or suction settings.

---

**[CRASH-COURSE SNIPPET — expandable: "Want to go deeper?"]**

**Flange sizing: how to get it right**

What you need: a flexible measuring tape or ruler.

1. Measure your nipple diameter at its widest point, in millimeters. Measure the nipple itself — not the areola. A typical nipple is 13–20mm in diameter.
2. Add 2–3mm to your measurement. That's your target flange tunnel diameter.
3. Check the flange size options for your specific pump brand — they vary by manufacturer. Most pumps come with a 24mm or 27mm flange, which fits a minority of nipples correctly.

**Signs your flange size is wrong:**
- Nipple rubbing the sides of the tunnel (too small → size up)
- Nipple barely moving, areola being pulled heavily into the tunnel (too big → size down)
- Pain at the base of the nipple during pumping
- Lower output than expected despite good session frequency

**Hands-on pumping technique:**
- Before starting: apply gentle warmth, do a brief breast massage (circular, gentle, not aggressive)
- During the session: every few minutes, use your fingertips to compress the outer breast tissue toward the nipple while the pump is running
- At the end of the session: when flow slows, switch the pump to expression mode, then do one final hand expression to clear any remaining milk

Research from Dr. Jane Morton at Stanford found that hands-on pumping increased daily milk volume by 48% in some populations. It takes 2–3 sessions to feel natural.

---

### T-B-F — Exclusive Pumping to Formula

**HANGING UP THE PUMP. EVERYTHING YOU NEED TO KNOW.**  
Path Change • Exclusive Pumping → Formula • Estimated read time: 4–5 min

---

**LEAD LINE**

You have been doing one of the hardest things in the feeding world. Every single session was a choice you made again.

---

**WHAT TO KNOW**

Exclusive pumping is relentless in a way that's hard to communicate to someone who hasn't done it. Every feed is a three-part process: pump, bottle, wash. Every overnight is an alarm. Every workday is a logistics coordination problem. There is no "just put her to the breast." You've been choosing this — consistently, systematically — every time.

Choosing to stop is also a choice you get to make.

**What happens to your body when you stop pumping.** When pump sessions decrease, your prolactin levels drop and your body gradually reduces milk production in response. The process takes time — typically 1–3 weeks for supply to substantially wind down, depending on how established your supply is and how quickly you reduce sessions. The key risk in this window is the same as with nursing: engorgement → blocked duct → mastitis. The protection is a gradual reduction, not an abrupt stop.

**The gradual approach.** Drop one pumping session every 2–3 days. Start with the session that produces the least milk — typically a mid-day session. Let your supply adjust before dropping the next one. You'll feel breast fullness after each drop, which should ease within 24–48 hours as your body recalibrates to the new demand level.

**What to expect between sessions.** As you reduce, you may experience:
- Breast pressure and fullness (manageable; brief expression for relief is fine)
- Leaking at the times your body "expects" a session
- Engorgement if you drop too quickly — the signal to slow down, not push through

**How long it takes.** Most EP moms who wean gradually are through the active process in 2–3 weeks. Traces of milk can be expressible for months after weaning — this is normal and doesn't mean production hasn't stopped. The body is very thorough about keeping the option open.

**Your supply data.** If you've been using the tracker, your session history is in the app. Some moms find it meaningful to look at the number of sessions and the estimated total ounces before they close that chapter. Some prefer not to. Both are fine. The data is there if you want it; it doesn't go anywhere.

---

**WHAT TO DO**

1. **Drop one session every 2–3 days, starting with the mid-day session.** Your mid-day sessions typically produce less than morning sessions (prolactin is highest in the morning). Start there.

2. **Express for relief, not emptying.** When you feel pressure between sessions, hand express or pump for 1–3 minutes — just enough to bring the fullness down to a comfortable level. Fully emptying sends a supply signal; brief relief expression does not.

3. **Cold compresses help.** Applied after any relief expression, cold helps with inflammation and discomfort. Some moms use gel ice packs (covered in a thin cloth), refrigerated cabbage leaves, or simply cold washcloths. All work.

4. **Keep wearing a supportive bra.** The same advice as nursing weaning: supportive but non-binding, no underwire during the transition window. Very tight binding is not recommended — it can compress ducts.

5. **Formula if you haven't already introduced it:** All standard US formulas meet FDA nutritional requirements. Powder is the most economical. Safe preparation basics are in the crash-course snippet below, or in Path C's formula content if you want the full module.

---

**WHAT TO WATCH FOR**

The window of highest mastitis risk is the first 1–2 weeks of active reduction. Watch for:

- Fever above 101°F
- Flu-like symptoms — body aches, chills, fatigue — combined with breast pain
- A localized red, warm, hard area of the breast that doesn't resolve

**Fever + breast pain + flu symptoms = call your OB today.** Mastitis during pump weaning is treated the same way as mastitis at any other time: antibiotics, continued emptying (yes, even during weaning — stopping abruptly during mastitis worsens it).

Also watch for:
- Milk blebs (small white spots on the nipple): usually self-resolving; mention to your IBCLC if painful or persistent
- Vasospasm (color change in the nipple after sessions, often painful): Raynaud's-related; your OB can advise on management if this is an issue

---

**[CRASH-COURSE SNIPPET — expandable: "Want to go deeper?"]**

**Formula prep basics**

Powder formula is the most economical option and nutritionally equivalent to ready-to-feed when prepared correctly.

**Preparation:**
1. Wash hands
2. Measure water first (use room temperature or warm tap water — safe in most US municipalities)
3. Add the correct number of scoops per the package instructions — don't round up or down; ratio matters
4. Shake or stir until fully dissolved
5. If warming: set the bottle in a cup of warm water; never microwave (creates hot spots)
6. Check temperature: a few drops on your inner wrist should feel neutral, not warm

**Storage:**
- Prepared formula: use within 1 hour at room temperature, or refrigerate and use within 24 hours
- Open powder: close the lid, store in a cool dry place, use within 1 month
- Ready-to-feed (opened): use within 48 hours, refrigerated

**How much to offer:**
A general starting point for reference (your pediatrician calibrates this for your specific baby):

| Baby's age | Approximate volume per feed | Feeds per day |
|---|---|---|
| Newborn to 4 weeks | 2–3 oz | 8–12 |
| 1–2 months | 3–4 oz | 7–8 |
| 2–4 months | 4–6 oz | 6–7 |
| 4–6 months | 6–7 oz | 5–6 |

These are reference ranges. Follow your baby's hunger cues and your pediatrician's guidance over any table.

**Paced bottle feeding — especially important now that the bottle is the only method:**
Hold your baby semi-upright. Keep the bottle more horizontal than vertical. Let the baby control the feed — pause every 20–30 sucks to give them a moment to register satiety. A full feed should take 15–20 minutes. This prevents overfeeding and helps your baby regulate their own intake signals.

---

### T-C-F — Combination Feeding to Formula

**FINISHING THE MILK CHAPTER.**
Path Change • Combination Feeding → Formula • Estimated read time: 3–4 min

---

**LEAD LINE**

You've already been giving your baby both. Closing out the milk part of that mix doesn't erase the part you're keeping.

---

**WHAT TO KNOW**

Whatever milk component you still have, whether that's nursing sessions, pump sessions, or some of both, this module is about winding it down comfortably. Formula is already a normal part of your baby's diet. What's changing is the ratio, not the whole system.

**Weaning still works best gradually.** Even though formula has already been doing part of the job, your body still needs time to catch up when milk sessions stop. Drop one session every two to three days, whether that's a nursing session, a pump session, or a mix of both if you're doing both right now. If you're doing both, start with whichever one is giving your body less stimulation. That's usually the pump if pumping was occasional, or a specific nursing session your baby doesn't seem attached to.

**Your body doesn't know the difference between "done because it's time" and "done because of something else."** It just responds to the drop in demand. Expect fullness and pressure for a few days after each session you drop. That's your supply catching up to the new normal, not a sign something's wrong.

**How long it takes.** Most moms are through the active winding-down process in one to three weeks. You may notice occasional leaking or fullness for a while after that, even once you feel mostly done. That's normal too.

**Formula, for the parts that already exist.** You already know formula. This isn't a new skill you're learning, it's the same one you've been using, just doing more of the work now. If you want the full prep and storage rundown, it's in Path C's regular content.

---

**WHAT TO DO**

1. **Drop one session every two to three days.** Start with whichever session (nursing or pumping) is providing the least stimulation right now.
2. **Relieve fullness without emptying.** Hand express or pump briefly, just enough to take the edge off. Full emptying tells your body to keep producing; a little relief doesn't.
3. **Cold compresses after relief expression** help with the pressure and inflammation.
4. **Keep a supportive, non-binding bra on.** Skip the underwire during this stretch. Very tight binding raises your mastitis risk, so don't overcorrect in that direction either.
5. **Increase formula gradually as milk sessions decrease,** at whatever pace your pediatrician has you on. You already know the volumes; this is just more of what you've been doing.

---

**WHAT TO WATCH FOR**

Same mastitis risk window as any other weaning: fever above 101°F, flu-like symptoms with breast pain, or a warm, hard, red patch that doesn't ease up. If you notice fever plus breast pain plus flu symptoms, call your OB or provider that day. Don't wait it out.

---

**[CRASH-COURSE SNIPPET — expandable: "Want to go deeper?"]**

You've got this part already. If it's been a while since you looked at formula amounts or prep, the full breakdown lives in your Path C content: prep steps, storage windows, and a volume-by-age reference table. Nothing new here, just picking up where you left off.

---

### T-B-A — Exclusive Pumping to Nursing

**TRYING THE BREAST AGAIN. WHAT TO EXPECT.**
Path Change • Exclusive Pumping → Nursing • Estimated read time: 3–4 min

---

**LEAD LINE**

Your supply is already built. What you're changing now is how it gets delivered, not whether it exists.

---

**WHAT TO KNOW**

Your breast doesn't know the difference between a baby and a pump. It only knows demand: how often it's stimulated, how completely it's emptied. If you built a full supply pumping, that supply is real and it transfers. You are not starting from zero.

**What's actually new here is the skill, not the supply.** Nursing is a learned coordination between you and your baby, even for babies who've nursed before and even more so if this is new or being tried again after time on the bottle. Expect a learning curve. Latch might feel awkward the first several tries. Your baby might seem confused by the different flow and effort compared to a bottle. None of that means it's not working; it usually just means it's new.

**Nipple preference is a real risk during this transition, and paced bottle feeding helps.** A baby who's used to a fast, low-effort bottle flow can be reluctant to work harder at the breast, at least at first. If you're still using bottles for supplemented feeds during this transition, paced bottle feeding (baby semi-upright, bottle mostly horizontal, pauses built in) keeps the effort more similar to nursing and makes the switch back and forth easier on your baby.

**Signs it's working:** latch that improves session over session rather than getting harder, a baby who seems satisfied and settled after nursing, and weight that keeps tracking the way your pediatrician expects. These are the signals that matter more than how the first few sessions feel.

**An IBCLC is worth it here, especially if you haven't had hands-on support yet.** Reintroducing the breast after time away from it, or for the first time if baby was in the NICU, is exactly the kind of transition a lactation consultant is built for. This isn't a sign anything's wrong; it's just the right kind of support for this specific move.

**Don't get rid of your pump yet.** You'll likely use it during the transition to protect your supply while nursing is still establishing, and it's a good backup if anything doesn't go as smoothly as planned.

---

**WHAT TO DO**

1. **Start with skin-to-skin, no pressure to latch yet.** Let your baby get comfortable at the breast before expecting a full feed there. A few minutes of contact before or between bottle feeds builds familiarity.
2. **Offer the breast first, when your baby is calm and mildly hungry, not frantic.** A baby who's overly hungry will have less patience for a new skill.
3. **Keep pumping in between, at roughly your usual frequency, until nursing is reliably transferring milk.** Reduce pump sessions gradually as nursing takes over more of the job, not all at once.
4. **Track wet and dirty diapers closely during the transition.** This is your clearest signal that milk transfer at the breast is actually happening, especially before you fully trust it.
5. **Get an IBCLC consult if you can,** particularly if this is baby's first real attempt at the breast or if it's been more than a few weeks since the last try.

---

**WHAT TO WATCH FOR**

Watch diaper output and weight the way you would in the newborn weeks. If output drops or your pediatrician flags weight, that's a sign nursing isn't yet transferring enough milk and you should keep pumping to make up the difference while you keep working on latch. This is common in the first one to two weeks and usually resolves as the skill develops. If it doesn't improve after a couple of weeks of consistent effort, an IBCLC visit is the next right step, not a signal to give up.

---

**[CRASH-COURSE SNIPPET — expandable: "Want to go deeper?"]**

**Getting your baby back to the breast:**
- Try skin-to-skin time daily, even without a feeding goal attached to it
- Offer the breast when baby is calm, not starving
- If latch feels off, breast compression during the feed can help keep milk flowing and hold baby's interest
- A nipple shield is sometimes a useful bridge tool for a baby used to a bottle; an IBCLC can tell you if it's right for your situation
- Give it more than one or two tries before deciding it's not working. Most babies need repetition to relearn or learn this skill

---

### T-A-C — Nursing to Combination Feeding

**ADDING SUPPLEMENTATION. WHAT TO KNOW.**
Path Change • Nursing → Combination Feeding • Estimated read time: 3–4 min

---

**LEAD LINE**

Adding formula or pumped milk to what you're already doing isn't a downgrade. It's a different, fully valid way to feed your baby, and plenty of families land here on purpose.

---

**WHAT TO KNOW**

If a pediatrician flagged weight gain or jaundice, if your supply isn't quite covering what your baby needs even with frequent nursing, or if you just want more flexibility, combination feeding is a complete path, not something you fall into as a consolation. Some of the pressure to feel bad about this comes from outside you: a comment from a relative, a chart at the pediatrician's office, an old idea that supplementing means something went wrong. It didn't. Plenty of babies thrive on a mix, and plenty of moms find real relief in it.

**The single most important technical thing here is paced bottle feeding.** However you're supplementing (formula or pumped milk), the way the bottle is offered matters more than what's in it. A baby who gets bottles too fast, too easily, can start preferring the bottle to the breast, and that preference is the actual risk in this transition, not the supplementation itself. Paced feeding (baby semi-upright, bottle mostly horizontal, built-in pauses) keeps the effort level closer to nursing and protects the nursing relationship you already have.

**How supplementing affects your supply is simple mechanics, not a verdict.** Milk supply responds to demand. If a bottle replaces a nursing session, your body gets a little less demand at that time slot, and supply calibrates accordingly over time. That's neither good nor bad on its own; it's just how it works. What matters is whether it matches what you want.

**If you want to protect your nursing supply while adding supplementation,** pump during or right after the sessions you're replacing with a bottle. That keeps the demand signal going even though your baby isn't the one providing it in that moment.

**If you're fine letting supply settle wherever it settles,** you don't have to do anything extra. Supplement as needed and let your body adjust naturally. Either approach is legitimate; this is your call, not a right-or-wrong situation.

**If formula is new to you,** the basics are simple and there's a full breakdown in Path C's content: which type, how to prepare it safely, and how much to expect your baby to take at different ages.

---

**WHAT TO DO**

1. **Practice paced bottle feeding from the very first supplemental feed,** whoever is giving the bottle. This one habit does more to protect the nursing relationship than anything else here.
2. **Decide whether you want to protect your current supply or let it settle naturally,** and pump accordingly if you're protecting it.
3. **Keep nursing at the sessions you're not replacing,** at your baby's usual pace and frequency.
4. **Loop in your pediatrician on the plan** if supplementation started because of a medical concern like weight or jaundice, so you're both tracking the same target.
5. **Give yourself permission to adjust the plan** as you go. Combination feeding isn't a fixed ratio; it's whatever mix works for your baby and your life right now.

---

**WHAT TO WATCH FOR**

Watch for a bottle preference developing: if your baby starts fighting the breast, seeming frustrated with the slower flow, or refusing to latch after a stretch of bottle feeds, that's the signal to double down on paced feeding and possibly reduce bottle frequency for a bit. It's very fixable, especially caught early. There's no medical red flag specific to this transition beyond the general newborn feeding concerns you'd already be watching for either way (weight, wet diapers, energy).

---

**[CRASH-COURSE SNIPPET — expandable: "Want to go deeper?"]**

**Paced bottle feeding, the short version:**
- Hold your baby semi-upright, not flat on their back
- Keep the bottle horizontal enough that your baby has to work a little for the milk, not vertical where gravity does all the work
- Pause every 20 to 30 sucks, giving your baby a break to notice they're getting full
- A full feed should take roughly 15 to 20 minutes, not 3

Formula basics, if you need them, plus a volume-by-age reference table, are in your Path C content.

---

### T-B-C — Exclusive Pumping to Combination Feeding

**ADDING FORMULA TO YOUR EP ROUTINE.**
Path Change • Exclusive Pumping → Combination Feeding • Estimated read time: 3 min

---

**LEAD LINE**

Adding formula into your pumping routine doesn't erase the work you've already put in. It's a management decision, not a step back.

---

**WHAT TO KNOW**

If your supply isn't quite meeting your baby's needs, if you want to reduce how many sessions you're doing, or if you're starting to plan a longer-term move away from full-time pumping, adding formula is a deliberate choice you get to make on your own terms. EP moms track everything (every ounce, every session) and that visibility can make adding formula feel like admitting something. It's not. It's the same kind of intentional management you've been doing all along, just with a new tool.

**The bottle-feeding part of this is already familiar to you.** You've been doing paced bottle feeding this whole time, so there's no new skill to learn on that front. What's new is deciding how much formula to add and when.

**How much to add depends on your goal, and your pediatrician sets the actual target.** As a general guide, formula typically replaces whatever gap exists between what you're pumping and what your baby needs, but the exact number should come from your pediatrician based on your baby's growth. This module gives you the mechanics, not the prescription.

**Your pump schedule adjusts based on what you want your supply to do.** If you want to keep your current supply level and add formula on top (say, because you're increasing volume needs as baby grows), keep pumping at your usual frequency. If you're comfortable letting your supply gradually decrease as formula takes on more of the job, you can intentionally drop a session or two. Either direction is valid; this is about matching the schedule to what you actually want, not a fixed rule.

**If formula is new to you,** the type, prep, and storage basics are covered in your Path C content.

---

**WHAT TO DO**

1. **Talk to your pediatrician about the target volume** if this started because of a supply or growth concern, so you have a number to work toward rather than guessing.
2. **Decide whether you're maintaining or reducing your pumped supply,** and adjust your pump schedule accordingly.
3. **Introduce formula at whichever feeds make sense for your schedule,** there's no required order.
4. **Keep your flange fit and pump routine consistent** for whatever sessions you're keeping, so output stays reliable at the level you're aiming for.
5. **Revisit the plan as often as you need to.** This isn't a one-time decision; you can shift the ratio again later if your needs change.

---

**WHAT TO WATCH FOR**

If you're trying to maintain your current pumped supply and it starts dropping unexpectedly, check flange fit and session frequency first; those are the two most common culprits. If you're intentionally letting supply decrease, some dip is expected and not a problem. Watch for the general mastitis signs if you do drop sessions quickly: fever, flu-like symptoms with breast pain, or a hard red area that doesn't ease. Call your OB the same day if that combination shows up.

---

**[CRASH-COURSE SNIPPET — expandable: "Want to go deeper?"]**

Formula type, safe prep, and a volume-by-age reference table are all in your Path C content, ready whenever you need them. Nothing here that requires starting from scratch.

---

### T-C-A — Combination Feeding to Exclusive Nursing

**MOVING TOWARD NURSING ONLY.**
Path Change • Combination Feeding → Exclusive Nursing • Estimated read time: 3 min

---

**LEAD LINE**

If your supply has caught up and your baby's doing well at the breast, moving away from formula is a real option now, and it's one you can take at your own pace.

---

**WHAT TO KNOW**

Maybe your supply has grown since you started combo feeding. Maybe the latch issues that led you here are resolved. Maybe you're just tired of managing two systems and formula costs are adding up. Whatever got you here, moving toward nursing only is worth doing carefully so your supply has time to actually meet the fuller demand.

**Increase nursing before you cut formula, not at the same time.** The instinct is often to drop formula first and see what happens, but your supply needs a runway. Add nursing sessions (or nurse longer at existing sessions) for several days before you start reducing formula feeds. This gives your body the signal it needs before you take away the backup.

**Your supply won't respond instantly. Give it 48 to 72 hours** after any increase in nursing frequency before expecting to see a real difference in output. That's a normal, physiological lag, not a sign it's not working.

**Watch diaper output and weight as your real signal,** more than how full or empty your breasts feel in the moment. If wet diapers stay steady or increase and your pediatrician's weight checks stay on track as you reduce formula, nursing is doing its job.

**If you've been formula-heavy (more than about half of feeds),** this is a bigger ask of your supply, and it's worth a check-in with an IBCLC before you get too far into reducing formula. Not because something's wrong, but because a bigger supply increase benefits from a second set of eyes on positioning and frequency.

**Paced bottle feeding still matters during this stretch,** for whatever bottle feeds remain. As bottle feeds decrease naturally, this becomes less relevant, but don't drop the habit early just because you're on your way out.

---

**WHAT TO DO**

1. **Add nursing sessions or extend existing ones for a few days before reducing any formula.** Let supply respond first.
2. **Reduce formula gradually, one feed at a time,** rather than cutting it all at once.
3. **Track wet diapers and any scheduled weight checks** as your main signal that nursing is covering the gap.
4. **Book an IBCLC visit if you were doing significant supplementation,** just to have support through a bigger supply ask.
5. **Keep paced bottle feeding going** for any formula feeds still in the mix during the transition.

---

**WHAT TO WATCH FOR**

If diaper output drops or your pediatrician flags weight as you reduce formula, that's the signal to slow down, not push through. Add back a formula feed if needed and give your supply more time before trying again. This isn't a failure; recalibrating the pace is a completely normal part of this transition.

---

**[CRASH-COURSE SNIPPET — expandable: "Want to go deeper?"]**

**Signs supply is meeting the increased demand:**
- Steady or increasing wet diaper counts
- Weight tracking on your pediatrician's expected curve
- Your baby seeming satisfied and settled after nursing sessions, without immediately rooting again

If any of these aren't lining up after a week or so of consistent effort, an IBCLC visit is the right next step.

---

### T-C-B — Combination Feeding to Exclusive Pumping

**MOVING TOWARD PUMPING ONLY.**
Path Change • Combination Feeding → Exclusive Pumping • Estimated read time: 3–4 min

---

**LEAD LINE**

Choosing the pump over nursing, even after nursing was part of your routine, is a real and complete way to keep feeding your baby your milk. It's not a fallback option.

---

**WHAT TO KNOW**

Maybe your baby's started refusing the breast and pumping is how you want to keep your supply going. Maybe nipple pain resolved once you leaned into pumping more, even though the supply goal is still there. Maybe you're heading back to work and want one measurable system instead of juggling two. Maybe a partner or another caregiver is taking on more feeds and pumped milk makes that easier to hand off. Whatever the reason, this is less common than the other combo transitions, and it's worth saying plainly: the pump is a real option here, not a consolation prize for nursing not working out.

**If pumping has only been occasional up to now, fit your flanges properly before you rely on it as your main system.** A flange that was fine for occasional use might not be right once pumping becomes your primary method for keeping your supply going.

**Frequency matters more now than it did while you were still nursing.** Nursing was providing some of your stimulation even if pumping was already part of your routine. Once nursing drops out of the mix, the pump needs to fully replace whatever stimulation nursing was providing, which usually means building your pump schedule up rather than assuming your current frequency is enough.

**Expect a short re-establishment period.** If nursing was doing real work for your supply, dropping it without adding compensating pump sessions can cause a temporary dip. Treat the first one to two weeks as a stabilization window rather than expecting your supply to hold steady from day one.

---

**WHAT TO DO**

1. **Measure and fit your flanges now,** especially if pumping has been occasional rather than your main method.
2. **Build your pump schedule to replace whatever stimulation nursing was providing,** which often means more sessions than you're currently doing.
3. **Give it one to two weeks before judging output,** since a temporary dip during the switch is normal, not a sign it's failing.
4. **Use hands-on pumping technique** (breast massage before and during, hand expression at the end) to get the most out of each session while things stabilize.
5. **Find the EP community when you're ready.** r/ExclusivelyPumping and similar spaces are full of people who've made exactly this move and can talk through the specific logistics.

---

**WHAT TO WATCH FOR**

A temporary supply dip in the first week or two is expected and usually resolves as your pump schedule catches up to what nursing was providing. If output keeps declining past two weeks despite consistent sessions, check flange fit and frequency first; those are the most common fixable culprits. As always, fever with breast pain and flu-like symptoms means call your OB that day.

---

**[CRASH-COURSE SNIPPET — expandable: "Want to go deeper?"]**

**Flange fit, quick version:** measure your nipple diameter at its widest point, add 2 to 3mm, and match that to your pump's flange size options. Most pumps ship with a size that fits a minority of people well, so don't assume the default is right.

**Hands-on pumping:** massage before and during the session, and hand express for a minute after flow slows. This combination has been shown to meaningfully increase output compared to passive pumping alone.

---

### T-WEAN — General Weaning Support

**WEANING, THE GENERAL PLAYBOOK.**
Path Change • Any path → Supply wind-down reference • Estimated read time: 4 min

---

**LEAD LINE**

However you got here, whatever you're weaning from, your body handles this the same basic way. Here's what to expect and how to make it easier.

---

**WHAT TO KNOW**

Weaning means reducing milk removal, whether that's nursing sessions, pump sessions, or both, until your body responds by winding production down. The mechanism is the same no matter which specific transition brought you here: less demand leads to less supply, over roughly one to three weeks for the active process, sometimes with traces continuing for longer after that.

**Gradual is almost always more comfortable than abrupt.** Dropping one session every two to three days gives your body time to adjust production down in step with the reduced demand. Stopping cold turkey, all sessions at once, is possible but it significantly raises your risk of engorgement, blocked ducts, and mastitis. If you have any flexibility in your timeline, gradual is the easier path physically.

**Sometimes abrupt is necessary, and that's okay too.** A new medication, a medical procedure, or another urgent situation can require stopping quickly. If that's your situation, the comfort measures below still apply; you'll just be leaning on them more heavily since your body doesn't get the gradual runway.

**What your body actually does.** As sessions decrease, prolactin drops and your body reabsorbs the milk it's no longer being asked to produce. You'll likely notice fullness and pressure after each dropped session, easing within a day or two as your body catches up. Leaking, especially triggered by things like hearing a baby cry or a warm shower, is common for a while even after you feel mostly done.

**The emotional side is real, whatever the reason for weaning.** Some people feel relief. Some feel grief. Most feel some mix of both, sometimes shifting day to day. None of that needs an explanation, and it doesn't mean you made the wrong call. If what you're feeling goes beyond the normal ups and downs of this transition (if it's persistent, heavy, or hard to shake) that's worth talking to someone about.

---

**WHAT TO DO**

1. **Drop one session every two to three days if you can.** Start with whichever session produces the least or matters least in your schedule.
2. **Relieve fullness without fully emptying.** A brief hand expression or short pump session takes the pressure off without sending a "keep producing" signal.
3. **Use cold compresses after relief expression.** Ice packs wrapped in a thin cloth, or refrigerated cabbage leaves, both help with inflammation and discomfort.
4. **Consider sage tea if you want extra support.** The evidence is limited but it's safe to try and has a long traditional use for reducing supply.
5. **Wear a supportive, non-binding bra.** Skip underwire during this stretch, and avoid very tight binding; both extremes (no support, or too much compression) raise your risk of complications.

---

**WHAT TO WATCH FOR**

Your risk of mastitis is highest in the window where supply is still relatively high but removal frequency is dropping. Watch for:
- Fever above 101°F
- Flu-like symptoms (body aches, chills, fatigue) along with breast pain
- A hard, red, or warm patch that doesn't resolve within a day of the next dropped session

If you notice fever plus breast pain plus flu symptoms, call your OB or provider the same day. Mastitis during weaning is treated the same as mastitis at any other time: antibiotics, and continued gentle expression, not full stopping.

A milk bleb (a small white dot on the nipple) can also show up during weaning. It usually resolves on its own; mention it to your IBCLC if it's painful or sticks around.

---

**[CRASH-COURSE SNIPPET — expandable: "Want to go deeper?"]**

**If you need to wean quickly:**
- Lean harder on relief expression and cold compresses since you're skipping the gradual runway
- Watch mastitis signs even more closely during the first week
- Consider talking to your OB about lactation-suppression options if your situation calls for a faster timeline

**A rough weaning timeline for reference:**
- Days 1 to 3 after a session drop: fullness, possible leaking
- Days 4 to 7: noticeably less fullness as supply adjusts
- Weeks 2 to 3: most active weaning complete for most people
- Beyond that: occasional traces can persist for weeks or longer, which is normal

---

### T-REL — Relactation

**BRINGING YOUR MILK BACK.**
Path Change • Formula → Any Nursing Path (Relactation) • Estimated read time: 2–3 min

---

**LEAD LINE**

Wanting to relactate is a real, valid thing to want, and it's also something you shouldn't try to figure out alone. This module is a starting point, not a full guide, on purpose.

---

**WHAT TO KNOW**

Relactation (bringing back a milk supply after it's gone or mostly gone) is possible. It's also highly variable: how long milk has been absent, how established your supply was before, your individual biology, and how much sustained effort you can put in all affect the outcome. Some people relactate to a full exclusive nursing supply. Some land somewhere in a combination of nursing and formula, which is a completely valid place to land, not a lesser version of the goal.

**What it generally involves** is frequent, sustained stimulation, both nursing attempts and pumping, kept up consistently over time. Most people see some meaningful supply response somewhere between two and eight weeks of consistent effort, though that range is wide because the variables are wide.

**There are tools that sometimes help,** and this is exactly the kind of decision an IBCLC and your doctor should be making with you, not something to figure out from an app. Galactagogues have modest evidence behind them. Domperidone is used off-label for this purpose in some countries; it's not FDA-approved for this use in the US. Herbal options exist with limited evidence either way. None of these are a fix on their own, and none of them should be your first move without medical guidance.

**This is the one place in the app where the honest answer is: start with an IBCLC, not with us.** Relactation is complex enough, and variable enough, that the right first step is a lactation consultant who can assess your specific situation, not a self-guided plan.

---

**WHAT TO DO**

1. **Find an IBCLC before you do anything else.** This is the actual first step, not a suggestion to consider later.
2. **Talk to your doctor about whether galactagogues or other supports make sense for your situation,** rather than starting any of them on your own.
3. **Set your own definition of success now, if you can.** A full return to exclusive nursing and a combination of nursing and formula are both real, good outcomes. Deciding what you're aiming for (or staying open to either) can help the process feel less like a pass/fail test.
4. **Be patient with the timeline.** Two to eight weeks is a wide range for a reason; your body's response is your body's response, not a reflection of how hard you're trying.

---

**WHAT TO WATCH FOR**

Relactation attempts involve a lot of stimulation, sometimes more frequent than you're used to. Watch for the same mastitis signs as any other transition: fever, flu-like symptoms with breast pain, or a hard red area that doesn't resolve. Call your OB the same day if you notice that combination. Beyond that, your IBCLC is your main point of contact for troubleshooting the process itself.

---

**[CRASH-COURSE SNIPPET — expandable: "Find an IBCLC"]**

Look for a board-certified lactation consultant (the credential is IBCLC) through your hospital's lactation department, your pediatrician's referral network, or the International Board of Certified Lactation Consultants' directory. Many offer virtual consults if an in-person visit isn't accessible right away.

---

## Section 4: Protocol Change Summary

### New Module IDs

| ID | Title | Origin Path | Destination |
|---|---|---|---|
| T-A-B | Switching to the Pump. What's Different From Here. | Nursing (A) | Exclusive Pumping (B) |
| T-A-C | Adding Supplementation. What to Know. | Nursing (A) | Combination Feeding (C) |
| T-A-F | Stopping Nursing. Here's How to Do It Well. | Nursing (A) | Formula |
| T-B-A | Trying the Breast Again. What to Expect. | Exclusive Pumping (B) | Nursing (A) |
| T-B-C | Adding Formula to Your EP Routine. | Exclusive Pumping (B) | Combination Feeding (C) |
| T-B-F | Hanging Up the Pump. Everything You Need to Know. | Exclusive Pumping (B) | Formula |
| T-C-A | Moving Toward Nursing Only. | Combination Feeding (C) | Nursing (A) |
| T-C-B | Moving Toward Pumping Only. | Combination Feeding (C) | Exclusive Pumping (B) |
| T-C-F | Finishing the Milk Chapter. | Combination Feeding (C) | Formula |
| T-REL | Relactation: Bringing Milk Back. | Formula | Any nursing path |
| T-WEAN | General Weaning Support | Any path | Supply wind-down reference |

Total new modules: **11**

---

### Where They Live in the Architecture

Transition modules do **not** slot into weeks 1–6 of any path. They exist in a parallel library accessible via the Path Change hub. They are not sequenced; they are accessed on-demand.

In `protocol-outline-v1.md`, the addition would appear as a new top-level section after the cross-path shared modules:

```
## Transition Modules (Path Change Library)

Accessed via the Path Change hub in the app's main navigation.
Not week-sequenced. Available from any point in any path.

T-A-B | T-A-C | T-A-F
T-B-A | T-B-C | T-B-F
T-C-A | T-C-B | T-C-F
T-REL | T-WEAN
```

---

### Existing Modules Requiring Small Updates

Three existing modules should be updated to include a CTA to the Path Change hub. These are content additions of 1–2 sentences, not structural changes:

- **A-5-3** (Feeding Relationship Check-In): Currently ends with "route to combo path if she's considering supplementing." Add: explicit CTA to Path Change hub.
- **B-5-2** (Combination Feeding Transition, If Needed): Already routes toward combo. Add: direct links to T-B-C and T-B-F.
- **C-6-3** (Deciding Your Week 7-12 Path): Already mentions formula transition. Add: direct link to T-C-F.

No other existing modules need structural changes. The hub handles discovery; these three are the natural contextual surfaces.

---

### Updated Module Count

| Category | Current | Added | New Total |
|---|---|---|---|
| Path A — Exclusive Nursing | 18 | — | 18 |
| Path B — Exclusive Pumping | 21 | — | 21 |
| Path C — Combination Feeding | 22 | — | 22 |
| Shared cross-path | 6 | — | 6 |
| **Transition modules** | **—** | **11** | **11** |
| **Total** | **67** | **11** | **78** |

---

### Advisor Review Implications

The transition modules require clinical review, particularly:

- **T-A-F and T-B-F**: Weaning guidance, mastitis risk identification, medication interactions
- **T-REL**: Most complex review requirement — relactation physiology, galactagogue evidence, appropriate clinical caveats
- **T-WEAN**: Supply wind-down timeline, binding recommendations, what's evidence-based vs. folk remedy

**Estimated additional advisor review hours:** 8–12 hrs for all 11 modules

**Recommended authoring order for transition modules:**
1. T-A-F, T-B-F, T-C-F (the formula exits) — highest clinical stakes; draft together since they share supply wind-down content
2. T-A-B, T-B-A (the nursing↔pumping transitions) — share supply mechanics; draft together
3. T-A-C, T-B-C, T-C-A, T-C-B (the combo transitions) — build on content from both other groups
4. T-WEAN (general weaning) — synthesizes content from the first group
5. T-REL last — requires most clinical consultation time

---

## Open Questions for Ashley to Decide

**All four resolved by Ashley on 2026-07-08, plus a fifth added during test build-out. All decisions took the recommended option:**

**1. The relactation module scope. RESOLVED: keep thin.** T-REL acknowledges relactation is possible and routes to an IBCLC rather than coaching the process in-app.

**2. The "formula exit" as a destination vs. an endpoint. RESOLVED: endpoint.** The transition module gives her what she needs for the transition itself; a "Formula Feeding Guide" module set is explicitly deferred to a v1.1 scope decision, not built now.

**3. The hub entry language. RESOLVED: "Thinking about changing how you feed?"** (the original proposal, not the "Your path, your choice" alternative).

**4. The user data on path changes. RESOLVED: yes, track.** Anonymized, aggregate only, never user-facing or tied to an identifiable profile in reporting.

**5. Progress persistence across a switch (added 2026-07-08, not in the original four). RESOLVED: persist everything.** Guide-completion progress in Getting Started carries over in full regardless of switch direction. This is already reflected in `e2e/tests/flow-path-personalization.spec.ts`.

See memory `project_path_switching_feature.md` for the full rationale behind each.

---

*Content and open questions are resolved. This proposal still needs an engineering/frontend pass (Path Change hub, transition module screens, contextual CTAs, switch backend) before anything ships — see the phased implementation plan tracked in the same memory file.*
