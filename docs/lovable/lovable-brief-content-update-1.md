# Lovable Update Prompt — Content Update 1: Diaper Callout, T-A-B Personalization, DMER Module
**Paste the block below directly into Lovable.**

---

```
Three content additions in this update: (1) a reusable DiaperCountCallout component placed across all Week 1 modules, (2) time-based window personalization for the T-A-B transition module, and (3) the new DMER module added to Paths A and B.

Do not change: the app shell, bottom nav, home screen, onboarding, AppContext structure, color tokens, or any routes, screens, or components not explicitly named below.

---

PART 1 — DiaperCountCallout COMPONENT

Create a reusable component at src/components/DiaperCountCallout.tsx.

PURPOSE:
A persistent, ambient reassurance block that appears in every Week 1 module. Not alarming — reassuring. Visually distinct from body prose but not loud.

STYLING:
  Container: rounded-2xl, bg-primary-50, border-l-4 border-primary-300, px-4 py-3, my-5
  Label: "Quick check" — font-semibold, 14px, primary-700
  Body text: 14px, primary-600, leading-relaxed, mt-1

EXACT RENDERED TEXT — do not alter wording, punctuation, or dashes:
  Label: "Quick check"
  Body: "6+ wet diapers/day by day 5 means milk is getting through. Before day 5, even 1–2 wet diapers per feeding attempt is normal — colostrum is small but mighty."

PROPS:
  No required props.
  Optional: variant?: 'default' | 'ep'
  Both variants render identical content for now. The prop is reserved for a future EP-specific variant and should not change the output at this time.

---

PART 2 — PLACE DiaperCountCallout IN WEEK 1 MODULES

Place <DiaperCountCallout /> in each module listed below at the specified position. Do not change any other content in these modules. The component renders itself — no copy-pasting the text.

PATH A — Exclusive Nursing:

  A-1-1 (Your First Feeds — What's Actually Happening):
    Position: After the feeding-frequency paragraph (the one referencing 8–12 times per day) in the WHAT TO KNOW section.
    Note: This module already has a prose bullet about diaper count. The callout replaces that bullet — do not keep both. The callout is the canonical delivery of this information in A-1-1.

  A-1-2 (Getting the Latch):
    Position: End of WHAT TO KNOW, as the final element before WHAT TO DO.
    Note: No content overlap issues in this module.

  A-1-3 (The First Week Survival Guide):
    Position: End of WHAT TO KNOW, before WHAT TO WATCH FOR.
    Note: WHAT TO WATCH FOR in this module includes "fewer wet diapers than expected" as an escalation signal. The callout in WHAT TO KNOW defines the normal threshold so that signal has a reference. Sequence matters — callout first, escalation second. Do not reorder.

PATH B — Exclusive Pumping:

  B-1-1 (Why You're Pumping and Why That Matters):
    Position: End of WHAT TO KNOW.
    Note: Orientation module. No content overlap.

  B-1-2 (Your Pump Setup):
    Position: End of WHAT TO KNOW.
    Note: Technically focused module. The callout grounds the equipment content with a human outcome.

  B-1-3 (Your Pumping Schedule — Week 1):
    Position: Immediately after the paragraph about why skipping sessions affects supply (the hardest-truth paragraph about front-loading effort). The callout follows the supply-consequence reasoning with the baby-centric observable: all that effort maps to wet diapers.
    Note: No content overlap.

  B-1-4 (Your First 72 Hours — Colostrum and What to Expect):
    Position: Immediately after the output-by-day table and its caption.
    Note: If the existing table caption already references wet diapers as an adequacy metric, condense or remove that reference — the callout carries this message. WHAT TO WATCH FOR in this module uses pump output volume (not wet diapers) as the escalation signal. There is no conflict — the callout covers the baby-side metric, WHAT TO WATCH FOR covers the mom-side pump metric.

PATH C — Combination Feeding:

  C-1-1 (What Combination Feeding Is):
    Position: End of WHAT TO KNOW.
    Note: No content overlap.

  C-1-2 (Your Combination Feeding Plan):
    Position: End of WHAT TO KNOW, after the 4-components-of-a-plan content.
    Note: The callout functions as "here's how you'll know the plan is working." No overlap.

  C-1-3 (Paced Bottle Feeding — Non-Negotiable on This Path):
    Position: End of WHAT TO KNOW, as a standalone block before the transition to WHAT TO DO.
    Note: This is the weakest content fit in the Week 1 set — the module is technique-focused and the callout is tangential. Place it at the very end of WHAT TO KNOW, not woven into the technique content. Because it renders as a visually distinct block, it reads correctly as supplemental rather than part of the technique sequence.

  C-1-4 (Formula Basics):
    Position: End of WHAT TO KNOW, after the safe preparation content.
    Note: The callout bridges from "what you're feeding" to "how to know it's working." No overlap.

  C-1-5 (Before Your Milk Comes In — What Colostrum Looks Like on This Path):
    Position: After the "Around days 3–5, everything changes" paragraph in WHAT TO KNOW — before the "What this means for your formula decisions" paragraph.
    Note: WHAT TO WATCH FOR in this module also references "fewer wet diapers than expected." This is intentional — the callout in WHAT TO KNOW defines the threshold; WHAT TO WATCH FOR carries the action trigger. Keep both. Do not cut either.

SHARED MODULES (place in the following shared modules that surface during Week 1):

  "Postpartum body — what's happening to you":
    Position: End of WHAT TO KNOW.

  "Partner support — what to actually ask for":
    Position: End of WHAT TO KNOW. (Partners can help track the count — positions the callout as a shared task.)

  "Pediatrician visits — what to expect weeks 1–6":
    Position: Adjacent to the weight-check content in WHAT TO KNOW. The pediatrician and the mom are watching the same metric.

  "Safe sleep and feeding in the night":
    Position: End of WHAT TO KNOW.

  "When to see your OB vs. your IBCLC vs. the ER":
    Position: In the preamble or WHAT TO KNOW section, before any escalation thresholds. The callout defines normal so the escalation signals make sense.

  DO NOT place DiaperCountCallout in "Your mental health matters too." The callout is out of place in a mental health module and could inadvertently increase anxiety about output adequacy in a vulnerable context.

---

PART 3 — T-A-B MODULE: TIME-BASED WINDOW PERSONALIZATION

The T-A-B transition module (Path Change: Nursing → Exclusive Pumping) renders different LEAD LINE and WHAT TO KNOW content based on how many days postpartum the user is. This is calculated from baby_dob in user_profiles. WHAT TO DO and WHAT TO WATCH FOR are the same for all windows and do not change.

STEP 1 — CALCULATE baby_age_days:

  const babyDOB = userProfile?.baby_dob ?? null

  function getBabyAgeDays(babyDOB: string | null): number | null {
    if (!babyDOB) return null
    const dob = new Date(babyDOB)
    const now = new Date()
    return Math.floor((now.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24))
  }

  const babyAgeDays = getBabyAgeDays(babyDOB)

STEP 2 — ASSIGN WINDOW:

  type TABWindow = 'window1' | 'window2' | 'window3' | 'window4'

  function getTABWindow(ageDays: number | null): TABWindow {
    if (ageDays === null) return 'window3'  // Default when baby_dob is unavailable
    if (ageDays <= 4) return 'window1'
    if (ageDays <= 14) return 'window2'
    if (ageDays <= 41) return 'window3'
    return 'window4'
  }

  const tabWindow = getTABWindow(babyAgeDays)

STEP 3 — WINDOW CONTENT:

Store the following content in the T-A-B module or a companion data file. Each window object has a leadLine (string) and whatToKnow (string, multiline prose). Render them in the module's existing lead/hero and main-content-section styles respectively.

---

WINDOW 1 — Days 1–4 | Colostrum phase

leadLine:
"Your milk hasn't fully come in yet — and that actually changes what this transition looks like, in a way that's useful to know."

whatToKnow:
"Right now your body is producing colostrum: the dense, concentrated early milk that all babies receive in the first days after birth. Mature milk — the higher-volume production your baby will rely on for the months ahead — typically transitions in somewhere between days 3 and 5, and sometimes a day or two later after a cesarean or a complicated delivery. What this means for your situation: there is no established supply yet to protect or preserve. You're not abandoning something you built. You're building it now, with the pump as your tool. That's a different starting point, and a simpler one.

What you're doing right now is sending a signal. Milk supply is governed by demand — by how consistently and completely your body is told that milk is needed. In these first days, that signal is everything. Your body doesn't know it's a pump delivering it. It only knows that stimulation is happening, or it isn't. Frequent pumping right now is the input that builds the supply you're working toward. The goal is not volume. The goal is signal frequency.

Eight to twelve sessions in every 24-hour period. This is the range that provides the stimulation needed for supply establishment, and it's the same whether you're nursing or pumping. Space sessions no more than 3 hours apart during the day; try not to go longer than 4 hours without stimulation overnight. That frequency may feel relentless — it reflects how often a newborn would be at the breast in these early days, because that frequency is what establishes supply.

Hand expression belongs alongside pumping right now. The clinical protocol for early milk expression recommends combining hand expression with pumping in the first days, not relying on the pump alone. Colostrum is thick and viscous — it doesn't always flow freely in response to suction the way mature milk does. Starting each session with a minute or two of hand expression, and finishing each session with hand expression after the pump flow stops, captures milk the pump may not reach. Don't skip it because the amounts feel negligible.

The amounts will feel negligible — and that's completely normal. One to seven milliliters per session is within normal range for colostrum. Some mothers express even less than that in the first 24–48 hours. This is not a supply problem; it is colostrum behaving as colostrum behaves. For now, a colostrum-fed newborn's stomach is roughly the size of a marble. What you're producing is calibrated to that.

Get your flange fit right before your first session. Even this early, flange sizing matters. An incorrect fit reduces stimulation quality, causes friction on the nipple, and establishes habits that are harder to change once they're set. Measure your nipple diameter — the nipple itself, not the areola — add 2–3mm, and match that to your pump's sizing options. The crash-course snippet covers the measurement."

---

WINDOW 2 — Days 5–14 | Milk arriving, early transition

leadLine:
"Your milk is coming in, or it just arrived. You're in the most supply-responsive window of your entire postpartum period — and that matters for how this transition goes."

whatToKnow:
"Days 5–14 represent one of the most hormonally active periods in milk supply development. Colostrum is transitioning to mature milk — the higher-volume production your baby will rely on for the months ahead. Your body is actively calibrating supply based on the demand signals it's receiving right now, and it hasn't settled into a stable set point yet. What this means practically: the pump sessions you put in right now land with a disproportionately large effect on your long-term supply. Your body is in a highly responsive, still-negotiating state. Consistency in these two weeks is the leverage.

Pump every 2–3 hours, including overnight. This schedule matches the stimulation frequency your body needs during active supply establishment — the same rhythm a nursing newborn provides at this stage. The overnight component specifically: prolactin, the hormone that drives milk production, peaks between 2 and 4am. Going longer than 4–5 hours without pumping overnight in these early weeks is a meaningful cost to long-term supply. You don't hold this schedule forever. This is the establishment phase. The schedule gets more flexible once supply stabilizes, typically around weeks 6–8.

Get your flange fit right now, before the next session. Milk is arriving in greater volume, and from this point forward, how efficiently your pump removes milk per session directly determines supply. Nipple tissue also changes as milk comes in — measurements from the first few days may no longer apply. Measure your nipple diameter now, add 2–3mm, and correct if needed. An ill-fitting flange at this stage means reduced output per session, and downstream, reduced supply. The crash-course snippet covers the measurement.

Watch for engorgement. If you were nursing — even partially, even through difficulty — your supply may have been building in response to that stimulation. As nursing decreases and pumping begins, there can be a gap where the pump isn't yet removing milk as efficiently as nursing was. Engorgement during this transition is common and manageable; the right response is pumping to fuller emptying, not backing off sessions. Engorgement that goes unaddressed can progress to blocked ducts. The WHAT TO WATCH FOR section covers what to look for.

Letdown may take a moment with the pump. The milk ejection reflex doesn't always respond to pump suction as immediately as it responds to a nursing baby. Your body is learning a new stimulus. In the meantime: a warm compress on the breast for a few minutes before starting, a brief breast massage, or looking at a photo of your baby can all help trigger letdown while your body adapts. Most mothers find this becomes faster and more automatic within 1–2 weeks of consistent pumping."

---

WINDOW 3 — Days 15–41 | Weeks 2–6 | Supply establishing, not yet stable
(This window is also the DEFAULT if baby_dob is unavailable.)

leadLine:
"You're in the most common window for this transition, and you're not starting over. But supply isn't fully established yet — what you do in the next few weeks matters."

whatToKnow:
"Weeks two through six are when many mothers run into the latch difficulties, nipple damage, or logistical realities that bring them to this switch. It's also the window when supply has been building — sometimes substantially — but hasn't yet reached the stable set point it will find around weeks 6–8. Exclusive pumping at this stage can absolutely establish and maintain a full supply. The condition on that is session frequency: right now, the pump needs to do real work to complete the build that nursing started.

Supply isn't locked in — but it isn't lost either. Right now your body is still reading demand closely and adjusting production in response. If you've been nursing at the frequency a newborn requires, your supply has been receiving significant stimulation. The pump needs to replicate that stimulation at roughly the same frequency — not because the pump is fragile, but because supply at this stage is still in the process of establishing. Think of this less as 'maintaining what you built' and more as 'completing the build via a new delivery mechanism.'

Don't drop below 8 sessions in any 24-hour period yet. This is the threshold where stimulation is reliably sufficient to support supply during the establishment phase. Dropping below 8 — even temporarily to manage the logistics of the transition — can cause a supply dip that takes deliberate effort to recover from. Build your pump schedule to 8–10 sessions before you make significant changes to nursing frequency.

If supply dips during the transition, power pumping can recover it. A supply dip in the first 1–2 weeks of switching is not uncommon and doesn't signal permanent loss. Power pumping — one 60-minute block per day structured as: pump 20 minutes, rest 10, pump 10, rest 10, pump 10 — mimics the stimulation of a cluster feed and prompts additional supply response. Most mothers see results within 3–5 days of consistent power pumping. It's a targeted, temporary tool added on top of your regular schedule, not a replacement for it.

Get your flange fit right — now, not later. If you pumped occasionally while nursing, the flanges from that period may not reflect your current nipple size. Weeks of nursing change nipple tissue. An incorrectly fitting flange at this stage reduces output per session and, downstream, reduces supply over time — and the problem is invisible in real time because you can't see what the pump isn't extracting. Measure your nipple diameter now, add 2–3mm, and correct if needed. The crash-course snippet walks through this.

The first weeks of exclusive pumping are the most logistically demanding. The schedule is real, the equipment needs cleaning after every session, and overnight sessions interrupt sleep in a way that nursing — with its portability — didn't. This is worth naming without overstating: the logistics become more manageable as supply stabilizes and as the rhythm becomes routine."

---

WINDOW 4 — Days 42+ | 6 weeks and beyond | Established supply

leadLine:
"Your supply is established. The transition from here is about maintaining what you have — which is a different, more manageable problem than building it."

whatToKnow:
"At six weeks and beyond, supply has typically found its set point — not rigidly fixed, but stable enough that it operates on a demand-and-response system rather than the intensive establishment mode of the early weeks. You've been nursing consistently, your body has calibrated to that demand, and what you're changing now is the delivery mechanism. The supply itself doesn't need to change; the question is whether the pump will deliver the same demand signal that nursing was.

Your supply follows the pump. Your body doesn't distinguish between a baby and a pump. It reads demand: frequency, volume of removal, completeness of emptying. If your pump sessions replicate the stimulation pattern nursing was creating, supply follows. Nothing you built at the breast is lost in this transition — it moves. The comparison that matters is total daily milk removal, not session-by-session parity.

The transition goal has shifted from building to maintaining. Eight sessions distributed across 24 hours, with one session in the early morning window (when prolactin peaks between 2–4am) and reasonable spacing through the day, is typically sufficient for maintenance. Starting at 10 sessions for the first 2 weeks of the transition is a reasonable cushion before settling into the 8-session rhythm.

Overlap nursing and pumping for 1–2 weeks, if possible. Don't drop nursing sessions abruptly before pump sessions are providing equivalent stimulation. Treat the first 1–2 weeks of the transition as a load-shifting period: nursing and pumping running in parallel, with the balance gradually shifting. Replacing one nursing session with a pump session every 1–2 days is a pace that manages engorgement and gives your body time to adapt to the new stimulation pattern. Cold turkey is possible — but the gradual approach avoids the engorgement-to-blocked-duct risk during a window when you're already managing a transition.

Watch for gradual supply decrease as the transition completes. The most common issue in this window is a slow, invisible supply drop that happens when total daily milk removal via the pump doesn't quite match what nursing was providing. Nursing is variable and demand-driven in ways that are easy to undercount — a longer session here, a comfort feed there — and the pump replaces those with fixed, scheduled sessions. If output starts declining over 2–3 weeks of consistent pumping, check three variables: flange fit (is the pump removing efficiently?), session frequency (is demand sufficient?), and session completeness (is emptying happening fully, or is milk being left behind?).

Measure your flanges now — not from memory. If you used a pump earlier in your feeding journey, your nipple diameter at six-plus weeks may differ from what it was in the early postpartum period. Tissue changes with weeks of nursing. Measure before your first regular pump session and correct if needed."

---

STEP 4 — RENDER IN MODULE:

In the T-A-B module screen, replace the current static lead line and WHAT TO KNOW body with the window-matched content:

  Lead line → renders tabWindowContent[tabWindow].leadLine using the module's existing lead/hero text style
  WHAT TO KNOW body → renders tabWindowContent[tabWindow].whatToKnow using the module's existing main content section style (prose paragraphs, 15–16px, neutral-700, leading-relaxed, with subheadings preserved as needed)

  WHAT TO DO: unchanged across all windows — do not vary
  WHAT TO WATCH FOR: unchanged across all windows — do not vary
  Crash-course snippet: unchanged, visible for all windows — do not vary

Note for WINDOW 1 WHAT TO DO: Step 2 in WHAT TO DO says "Build your pump schedule before you drop nursing." For Window 1 users, there is no nursing pattern to drop — they're building the pump as their primary system from scratch. Append a parenthetical to Step 2 for Window 1 only: "(If you're in the first 4 days, you're building this as your primary system — not replacing nursing sessions, just establishing the schedule from the start.)"

Note for WINDOW 1 + WINDOW 2 WHAT TO WATCH FOR: The first watch item says "Output should be comparable to what nursing was providing." This does not apply to Window 1 or 2. For Window 1 only, prepend: "Colostrum volumes of 1–7 mL per session are normal in the first days. If you are expressing nothing at all after multiple sessions with correct technique and flange fit, contact your IBCLC." For Window 2 only, prepend: "Output should be increasing over the course of week 2 as mature milk volume builds. If output appears to plateau or decline after day 10 despite consistent sessions, flange fit and session frequency are the first things to check."

---

PART 4 — DMER MODULE

Add the DMER module as a new module in the week-sequenced protocol content for Paths A and B, positioned at the end of the Week 2 sequence.

MODULE IDs:
  Path A: A-2-4 — insert as the final module in the Week 2 sequence for Path A
  Path B: B-2-4 — insert as the final module in the Week 2 sequence for Path B

The module content is identical for both paths. The path badge differs (see MODULE HEADER below).

MODULE HEADER:
  Title: "When Letdown Feels Wrong"
  Subtitle or eyebrow label: "DMER — Dysphoric Milk Ejection Reflex"
  Week badge: "Week 2–3"
  Read time pill: "~4 min read"
  Path badge: Path A displays "Exclusive Nursing" · Path B displays "Exclusive Pumping"
  Chat bridge text (at module end, before Done): "Have you experienced this?"

LEAD LINE — render using the module's existing lead/hero text style:
"If you feel a sudden wave of dread, sadness, or anxiety the moment your milk lets down — and it's completely gone before your baby finishes the first few minutes of nursing — there is a name for that, and it is not you."

WHAT TO KNOW THIS WEEK — render as the module's main content section (prose style, 15–16px, neutral-700, leading-relaxed):

Section heading (font-semibold, 17px, neutral-900, mb-3):
"There's a condition called DMER, and your care team may never have mentioned it."

Paragraph 1:
"DMER stands for Dysphoric Milk Ejection Reflex. 'Dysphoric' means a state of unease or intense negative emotion — not a mental health disorder, but a description of a feeling. A milk ejection reflex is what most people call a letdown. Put them together, and you get something that is probably the least-talked-about experience in breastfeeding: a brief, involuntary wave of intensely negative emotion that hits at the exact moment your milk releases — then disappears completely within 30 to 90 seconds."

Subheading (font-semibold, 15px, neutral-800, mt-5 mb-2):
"What it actually feels like."

Paragraph:
"The emotion varies between moms, but it tends to fall into a few patterns. Some describe a wave of dread or a hollow, sinking feeling — the sense that something is terribly wrong, even though you can't name what. Others feel a sudden rush of anxiety, almost like a trapdoor opening beneath you. Some experience inexplicable sadness or hopelessness. A smaller number describe it more as irritability or a flash of anger. What makes it unmistakably DMER — rather than ordinary mood — is the timing. It arrives at the very start of a letdown, without warning. And it is gone before the feed is even well underway."

Subheading: "Why it happens."

Paragraph:
"Your body produces milk with a carefully timed hormonal sequence. Just before letdown, dopamine — a neurotransmitter that helps regulate mood and motivation — drops briefly. This drop is what triggers a rise in prolactin, the hormone that drives milk production. In most women, the dopamine dip is too small and brief to register emotionally. In some women, it registers as an intense but transient wave of negative feeling. The oxytocin that causes the actual letdown follows quickly, and as the letdown completes, dopamine stabilizes and the feeling lifts. The emotion isn't coming from your thoughts or your mental state. It's a neurochemical event — with a beginning, a duration measured in seconds, and a predictable end."

KEY CALLOUT BLOCK (bg-neutral-100, rounded-2xl, px-4 py-4, my-5, border-l-4 border-neutral-400):
  Text (font-semibold, 15px, neutral-800, leading-relaxed):
  "This is not postpartum depression. It is not postpartum anxiety. It is not a sign that something is wrong with how you feel about your baby."

Paragraph after callout:
"This distinction matters enormously, because DMER is frequently mistaken for all of those things. PPD and PPA are ongoing conditions that affect how you feel across the whole day — they don't arrive and disappear in 60-second episodes tied precisely to letdown. If what you're experiencing comes on at the moment your milk releases and resolves before the feed ends, it is almost certainly DMER. That doesn't make it not hard. It makes it something different — something with a physiological explanation — and that distinction changes everything about what to do."

WHAT TO DO — render using the module's existing numbered action-list style:

  1. Name it to yourself, first. The next time it happens, try noting the timing: "This started when my milk let down. It will be over in a minute." Many moms find that simply having a framework for what's happening makes the wave far less frightening. You're not spiraling. You're watching a 60-second neurochemical event run its course.

  2. Track the pattern for a few days. Notice whether the feeling occurs specifically at letdown, how long it lasts, and when it resolves. If it reliably appears at the start of a feed or pump session and disappears before it ends, that's meaningful information — both for your own understanding and for any conversation you want to have with an IBCLC or provider.

  3. Try the low-effort supports some moms find helpful. Making sure your vitamin D and iron levels are adequate (ask your provider about testing), pulling back on caffeine if you're using a lot of it, and protecting sleep where you can are worth considering because they're low-risk and have other benefits regardless. None of these is a cure, but they're reasonable first steps.

  4. Give it time. DMER tends to improve on its own. Many moms notice significant reduction or complete resolution by 3–4 months postpartum as hormonal patterns stabilize. If you're at week 2 or 3, you may not be in this for the long haul — even though it can feel that way right now.

WHAT TO WATCH FOR — render using the module's existing watch-for section style:

Block 1 — "When to bring this up with a provider" (use the app's standard watch-for visual treatment — amber/warning accent, left border):
"If the emotional experience is severe enough that you dread nursing or pumping before it even starts, if it's intensifying rather than improving, or if you can no longer tell whether what you're feeling is DMER or something broader that's affecting your whole day — bring it up. Some providers won't be familiar with DMER by name, so you may need to describe it specifically. The crash-course snippet below has language you can bring to an appointment."

Block 2 — PPD/PPA distinction (use the app's standard "reach out if" treatment — red accent):
"If the negative emotions you're experiencing are not tied specifically to letdown — if they're present throughout the day, have been getting worse over time, or come with feelings of hopelessness, inability to care for yourself or your baby, or intrusive thoughts — that is a different and equally important conversation. Those symptoms may be PPD or PPA, which are common, treatable, and worth getting support for promptly. See the 'Your Mental Health Matters Too' module, or contact your OB or midwife."

Block 3 — plain text (no special visual treatment, 15px, neutral-600, mt-4):
"Should I stop nursing because of this? You don't have to. Many moms nurse through DMER successfully once they understand what's happening — the 60 seconds of a wave they know will end is very different from 60 seconds of a wave they think is a sign that something is deeply wrong. Whether to continue is entirely your call, and either direction is valid. If DMER is one factor among several that's making nursing unsustainable, that's a legitimate reason to reconsider your path — without shame."

CRASH-COURSE SNIPPET — expandable section, collapsed by default:

Use the app's existing crash-course snippet pattern (expandable/collapsible, "Want to go deeper?" trigger).
Section title inside: "DMER: The fuller clinical picture"

Content:

"DMER was first formally described by lactation consultant Alia Macrina Heise in 2007. Despite being documented for nearly two decades, it remains poorly recognized even among many OBs and lactation professionals. Most moms who have it have never heard of it — which means they spend weeks or months believing they are developing a mental illness when what they're experiencing is a physiological event with a biological explanation.

The neurochemistry: Dopamine is the primary inhibitor of prolactin. When your body initiates a letdown, dopamine must first fall before prolactin rises. In most women, this drop is modest and doesn't register emotionally. In women with DMER, the dopamine dip appears to be more pronounced, or to affect the limbic system more acutely. The physiological basis is established well enough that DMER is categorized as a physiological condition — not a psychological one. It belongs in the same category as engorgement or vasospasm: a real, body-level event that happens to be experienced as emotion."

Subheading: "Three presentations."
"Lactation researcher Alia Macrina Heise's original framework describes three types based on intensity:

• Mild: A fleeting, unpleasant sensation — a quick wave of unease. Resolves quickly and is more annoying than distressing. Many moms with mild DMER assume it's just how nursing feels and never investigate it further.

• Moderate: A stronger, more intrusive experience — dread, anxiety, emotional 'falling,' or sudden sadness. Still time-limited, but harder to dismiss in the moment.

• Severe: Intense negative emotion that may include significant hopelessness, disgust, or overwhelming anxiety. Still resolves. Less common but warrants a provider conversation."

Subheading: "What actually helps — an honest look."
"The evidence base is thin, because DMER research is underfunded and the condition has only been formally described for less than 20 years.

• Time: The most consistently reported resolution pathway is spontaneous improvement by 3–4 months postpartum, as the hormonal swings of early postpartum stabilize. For many moms, severity decreases substantially even before full resolution.
• Vitamin D and iron: Some moms report symptom improvement after addressing deficiencies. The mechanism isn't well understood, but checking levels is appropriate regardless.
• Caffeine: Anecdotally reported as a trigger or intensifier. No clinical trials, but reducing intake is low-risk.
• Sleep: Sleep deprivation affects dopamine regulation. Protecting sleep is worth prioritizing.
• Medication: In severe or persistent cases, providers have sometimes used medications that affect dopamine or serotonin pathways. This requires careful clinical judgment but is an option to discuss with a provider who understands the condition."

Subheading: "Language to bring to a provider who may not know what DMER is."
"'I'm experiencing something called Dysphoric Milk Ejection Reflex — DMER. It was first described by IBCLC Alia Macrina Heise in 2007. It involves a brief wave of intensely negative emotion — dysphoria, dread, or anxiety — that occurs at the onset of letdown and resolves within 30–90 seconds. It's understood to be a physiological response to the dopamine drop that precedes prolactin release and oxytocin-mediated letdown. It is distinct from PPD and PPA because it is specifically and only tied to letdown timing. I'd like to talk about management options, especially if it doesn't improve on its own.'"

---

DO NOT CHANGE:
- App shell, routing, bottom nav, home screen, onboarding
- AppContext structure or any AppContext fields
- Color tokens or Tailwind config
- Card component styles beyond what's specified above
- The Getting Started section or any module within it
- Chat, This Week screen, or any other tab
- Any protocol module not named in this brief
- T-A-B WHAT TO DO and WHAT TO WATCH FOR sections (only LEAD LINE and WHAT TO KNOW are window-specific)
- T-A-B crash-course snippet (visible for all windows, content unchanged)
- Any existing transition module other than T-A-B
```
