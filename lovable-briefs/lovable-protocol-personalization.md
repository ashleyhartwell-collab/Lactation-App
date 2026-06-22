# Lovable Update Prompt — Protocol Personalization
**Paste the block below directly into Lovable.**

---

```
Build out the protocol screen with real, personalized weekly plan content. The protocol screen UI shell already exists — do not change its layout, navigation bar, color tokens, or card component styles. Only change: the data driving the screen, the week calculation logic, the personalized headline, and the content rendered inside the existing week card components.

---

OVERVIEW

The protocol screen shows a 6-week feeding plan personalized to the user's feeding path and current week postpartum. Content differs across three paths (A = nursing, B = pumping, C = combination feeding). The current week is calculated from the user's profile. Users can tap forward/back to browse other weeks but always land on their current week on first load.

---

PART 1 — PROTOCOL DATA

Create a file at src/data/protocolContent.ts with the following content. Do not modify this data after writing it.

---

export type FeedingPath = 'A' | 'B' | 'C'

export interface ProtocolWeek {
  week: number
  focus: string
  actions: string[]
  watchFor: string
  reachOut: string
}

export const protocolContent: Record<FeedingPath, ProtocolWeek[]> = {

  // PATH A — NURSING
  A: [
    {
      week: 1,
      focus: "Colostrum, latch, and feeding on demand",
      actions: [
        "Aim for 8–12 feeds every 24 hours — follow your baby's hunger cues, not the clock.",
        "Check for a deep latch: baby's mouth should cover the areola, not just the nipple. Lips should be flanged out.",
        "Count wet and dirty diapers: by day 4–5 you should see 6+ wet diapers and 3–4 yellow stools per day.",
      ],
      watchFor: "Sleepy babies may need gentle waking to feed in the first week. Some nipple tenderness at latch-on is normal — sharp ongoing pain is not.",
      reachOut: "Baby has fewer than 6 wet diapers by day 5, has not regained birth weight by 2 weeks, or you have pain throughout a full feed.",
    },
    {
      week: 2,
      focus: "Milk comes in and finding your rhythm",
      actions: [
        "Full milk typically arrives between days 3 and 5 — breasts will feel fuller and heavier. This is normal.",
        "If engorgement is uncomfortable, hand-express or pump just enough to soften before latching.",
        "Cluster feeding (feeding every 30–60 minutes for several hours) is normal and signals a growth spurt — it builds your supply.",
      ],
      watchFor: "Engorgement usually resolves within 24–48 hours as supply regulates to your baby's needs. Excessive firmness that doesn't soften with feeding can lead to blocked ducts.",
      reachOut: "Engorgement lasting more than 3 days, a red or hard area on your breast, or a fever above 38.5°C / 101.3°F.",
    },
    {
      week: 3,
      focus: "Supply building and the 3-week growth spurt",
      actions: [
        "The 3-week growth spurt is real — your baby may want to feed more frequently for 2–4 days. Feed on demand.",
        "Breast compression during feeds can help transfer more milk, especially if your baby tends to fall asleep at the breast.",
        "Take care of your nipples: air dry after feeds, apply lanolin or expressed breast milk, and ensure latch is correct.",
      ],
      watchFor: "Breasts may feel softer now even though supply is fine — this is normal supply regulation, not a drop. Feeling softer does not mean less milk.",
      reachOut: "Baby is not back to or above birth weight, feeding sessions consistently last over 45 minutes, or nipple damage is present.",
    },
    {
      week: 4,
      focus: "Patterns stabilize and getting out in the world",
      actions: [
        "Feeding patterns begin to feel more predictable this week for many mothers. You may notice natural intervals of 2–3 hours.",
        "Practice nursing in different positions and locations so you feel comfortable feeding away from home.",
        "Continue feeding on demand — the clock isn't a reliable guide yet.",
      ],
      watchFor: "A growth spurt around 4 weeks is common. Increased demand for a few days doesn't mean your supply dropped.",
      reachOut: "Baby seems unsatisfied after most feeds, is not gaining weight steadily, or you notice recurring blocked ducts.",
    },
    {
      week: 5,
      focus: "Supply confidence and foremilk/hindmilk balance",
      actions: [
        "Offer one breast per feed and let baby drain it fully before switching. This ensures they get the fat-rich hindmilk.",
        "If you see consistently green, frothy stools, you may have an oversupply — try block feeding for 2–3 days and see if it settles.",
        "Notice your letdown sensation: some mothers feel it as a tingle or rush, others feel nothing. Both are normal.",
      ],
      watchFor: "At 5–6 weeks, breastfed babies often have less frequent stools — sometimes going several days between bowel movements is normal as long as stool is soft and yellow.",
      reachOut: "Hard, pebble-like stools, blood in stool, or sudden significant drop in wet diapers.",
    },
    {
      week: 6,
      focus: "The 6-week growth spurt and looking ahead",
      actions: [
        "The 6-week growth spurt is often the most intense — increased fussiness and frequent feeding for 3–5 days. Feed on demand through it.",
        "Your supply is now well-established. The work you've put in over these 6 weeks has built a strong foundation.",
        "If you're returning to work soon, this is a good time to introduce a bottle of pumped milk and begin building a small freezer stash.",
      ],
      watchFor: "Many mothers see a temporary dip in pumped output around 6 weeks — this is common and doesn't reflect actual supply. Baby at breast is always more efficient than a pump.",
      reachOut: "Recurring mastitis, persistent nipple pain that hasn't improved with latch correction, or you're feeling persistently overwhelmed — reach out to your IBCLC.",
    },
  ],

  // PATH B — PUMPING
  B: [
    {
      week: 1,
      focus: "Setting up your pumping schedule",
      actions: [
        "Pump 8–10 times per 24 hours in the first week, including once overnight. Frequency is more important than duration.",
        "Sessions don't need to be long — 15–20 minutes per session once letdown has occurred is sufficient.",
        "Hand-express colostrum before your pump arrives or between sessions — it's extremely concentrated and every drop counts.",
      ],
      watchFor: "Low volume in week 1 is completely normal. Colostrum is measured in milliliters, not ounces. Your body is primed to produce more — consistent pumping is what signals it.",
      reachOut: "You are unable to establish any output after 5+ days of pumping, or you experience significant nipple pain during pumping.",
    },
    {
      week: 2,
      focus: "Milk volume increases and storage basics",
      actions: [
        "Milk volume should increase noticeably around days 3–5. Total daily output of 16–24 oz by end of week 2 is a good target.",
        "Check your flange size — the most common pumping mistake. Your nipple should move freely in the tunnel with 2–3mm of space. Incorrect sizing reduces output and causes pain.",
        "Label pumped milk with date and time. Fridge: 4 days. Freezer: 6 months (12 months in deep freeze).",
      ],
      watchFor: "Output varies session to session — this is normal. Morning sessions typically yield the most. Don't judge your supply by a single session.",
      reachOut: "Nipple pain or trauma from pumping, visible cracks or blistering, or output that declines significantly after day 5.",
    },
    {
      week: 3,
      focus: "Maximizing output and pumping efficiency",
      actions: [
        "Add hands-on pumping: massage and compress your breast while pumping. Studies show this can increase output by 25–50%.",
        "Try a power pumping session once a day for 3–5 days if output plateaus: 20 min pump, 10 min rest, 10 min pump, 10 min rest, 10 min pump.",
        "Look at photos or videos of your baby while pumping, or have a clothing item nearby — this supports letdown.",
      ],
      watchFor: "A 3-week increase in demand from baby is normal. If baby needs more than you're producing, temporary supplementation with donor milk or formula is a valid bridge while supply increases.",
      reachOut: "Output consistently declining despite consistent pumping schedule, or persistent pain during pumping sessions.",
    },
    {
      week: 4,
      focus: "Supply maintenance and routine",
      actions: [
        "You can begin slightly stretching overnight intervals now if output is stable — but keep total daily sessions at 7–8 minimum.",
        "Recheck flange fit. Nipple swelling from the first weeks may have changed your ideal size.",
        "Ensure your pump parts are still creating a good seal — membranes and valves typically need replacing every 4–8 weeks.",
      ],
      watchFor: "Dropping below 7 sessions per day often leads to a supply dip within 1–2 weeks. Protect your session count before your output.",
      reachOut: "Output drops more than 20% over 3–5 days without an obvious cause (illness, stress, missed sessions).",
    },
    {
      week: 5,
      focus: "Troubleshooting and freezer stash",
      actions: [
        "If your milk smells or tastes soapy after refrigerating or thawing, you may have high lipase activity. Scald milk to 82°C / 180°F immediately after pumping, then cool and store.",
        "Build your freezer stash by banking 1–2 extra bags per day when output allows — even small amounts add up.",
        "Galactagogues (oats, fenugreek, etc.) have limited evidence. Consistent pumping is the only reliable supply driver.",
      ],
      watchFor: "Fatigue affects output. If you're consistently exhausted, prioritize sleep over the overnight session when possible — one dropped session is less harmful than chronic sleep deprivation.",
      reachOut: "Recurring blocked ducts despite regular pumping, or signs of mastitis: hard red area, flu-like symptoms, fever.",
    },
    {
      week: 6,
      focus: "Sustainable long-term routine",
      actions: [
        "You've built a real supply. Reassess your schedule for sustainability — many exclusive pumpers settle into 6–7 sessions by week 6.",
        "If returning to work, practice pumping in different environments. A hands-free bra makes this much easier.",
        "Consider a backup manual pump for travel, power outages, or when you can't set up the electric pump.",
      ],
      watchFor: "It's normal for output per session to slightly decrease around 6 weeks as supply regulates. Daily total should remain stable.",
      reachOut: "Any signs of mastitis, output declining more than 20% without a clear cause, or if the pumping schedule is significantly impacting your wellbeing — there are options worth discussing with an IBCLC.",
    },
  ],

  // PATH C — COMBINATION FEEDING
  C: [
    {
      week: 1,
      focus: "Starting combination feeding the right way",
      actions: [
        "Nurse first, then offer a bottle of pumped milk or formula to top up if needed. This protects your supply by stimulating it before supplementing.",
        "Use paced bottle feeding: baby semi-upright, horizontal bottle, letting them control the flow. This prevents bottle preference.",
        "If pumping to supplement, aim for at least 6–8 pump or nursing sessions per 24 hours to establish supply.",
      ],
      watchFor: "Some nipple confusion can occur in week 1 — using a slow-flow nipple and paced feeding minimizes this. If baby struggles to latch after a bottle, try breast first when they're calm and not yet hungry.",
      reachOut: "Baby refusing the breast entirely, less than 6 wet diapers by day 5, or concerns about weight gain.",
    },
    {
      week: 2,
      focus: "Managing supply with mixed feeding",
      actions: [
        "Every time you give a bottle instead of nursing, try to pump to replace that feeding — otherwise supply will decrease to match reduced demand.",
        "Track roughly how much supplement baby is taking. A sudden increase in demand for bottles may signal a supply dip.",
        "Skin-to-skin time and comfort nursing (even without full feeds) help maintain your supply signals.",
      ],
      watchFor: "Supplement amounts often decrease as your supply increases in weeks 2–3. This is a good sign. Adjust bottle amounts based on baby's satisfaction cues.",
      reachOut: "Baby is consistently unsatisfied after breast + bottle, has not regained birth weight by 2 weeks, or you have nipple pain.",
    },
    {
      week: 3,
      focus: "Finding your combination rhythm",
      actions: [
        "Settle into a consistent pattern that works for your life — some families do breast in the morning and evening, bottle for other feeds. Others nurse when home and pump/bottle when out.",
        "The 3-week growth spurt may increase demand suddenly. Nurse more often for a few days to boost supply naturally, and top up as needed.",
        "Don't compare your pumped output to formula-fed baby's intake — breastfed and combination-fed babies self-regulate differently.",
      ],
      watchFor: "It's normal for your nursing sessions to get shorter and more efficient as baby gets stronger. Shorter doesn't mean less milk.",
      reachOut: "Baby shows increasing bottle preference and is fighting the breast, or you notice a consistent decline in wet diapers.",
    },
    {
      week: 4,
      focus: "Protecting your supply while reducing stress",
      actions: [
        "If you want to maintain nursing, protect your most milk-productive sessions (usually morning). Night nursing is optional — replacing with a pump session is fine.",
        "Flange fit matters even in combination feeding. Recheck sizing if you pump regularly.",
        "Give yourself credit — combination feeding is complex and you're doing it.",
      ],
      watchFor: "A 4-week growth spurt is common. If supplement needs increase temporarily, don't worry — resume your usual balance once the spurt passes.",
      reachOut: "Supply seems to be declining and you want to maintain it — an IBCLC can help you protect what you have while managing supplementation.",
    },
    {
      week: 5,
      focus: "Supply stabilization",
      actions: [
        "By week 5, your supply is stabilizing around your demand pattern. If you want to increase breast milk proportion, add a pumping session after a nursing session for 5–7 days.",
        "If you're happy with the current balance, you don't need to do anything differently — your body has calibrated.",
        "Watch for signs of mastitis if you're nursing less frequently: a hard, red, warm area with flu-like symptoms.",
      ],
      watchFor: "Combination feeding sometimes shifts organically over time as baby becomes more efficient at the breast or as bottle feeding becomes more convenient. Both directions are valid.",
      reachOut: "Signs of mastitis, persistent nipple pain, or if you feel like the balance isn't working for your family — there's flexibility here.",
    },
    {
      week: 6,
      focus: "Long-term sustainability",
      actions: [
        "You've navigated 6 weeks of combination feeding. That's genuinely hard work.",
        "Revisit your feeding plan with fresh eyes: what's working, what isn't. There are no rules about the \"right\" combination feeding balance.",
        "If returning to work, combination feeding often becomes easier — bottles fit naturally into the work schedule and you can nurse morning and evening.",
      ],
      watchFor: "The 6-week growth spurt can temporarily increase demand for both breast and bottle. Ride it out for 3–5 days before adjusting your routine.",
      reachOut: "If you're considering weaning from the breast, an IBCLC can help you do it gradually to protect your comfort and avoid mastitis.",
    },
  ],
}

---

PART 2 — CURRENT WEEK CALCULATION

Create a utility function at src/utils/getCurrentWeek.ts:

  export function getCurrentWeek(
    babyDOB: string | null | undefined,
    babyWeeksOld: number | null | undefined
  ): number {
    // If we have a direct weeks-old value from the slider, use it
    if (babyWeeksOld != null && babyWeeksOld >= 0) {
      return Math.min(Math.max(Math.round(babyWeeksOld), 1), 6)
    }
    // Otherwise calculate from DOB
    if (babyDOB) {
      const dob = new Date(babyDOB)
      const now = new Date()
      const diffMs = now.getTime() - dob.getTime()
      const weeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))
      return Math.min(Math.max(weeks + 1, 1), 6)
    }
    // Default to week 1 if no data
    return 1
  }

Note: weeks are clamped to 1–6. Users past 6 weeks will see week 6 content.

---

PART 3 — PROTOCOL SCREEN STATE AND LOGIC

In the protocol screen component, replace any placeholder or hardcoded content logic with:

  import { protocolContent } from '@/data/protocolContent'
  import { getCurrentWeek } from '@/utils/getCurrentWeek'

  const feedingPath = appContext.feedingPath ?? 'A'
  const currentWeek = getCurrentWeek(appContext.babyDOB, appContext.babyWeeksOld)

  const [selectedWeek, setSelectedWeek] = useState(currentWeek)

  const weeks = protocolContent[feedingPath as FeedingPath]
  const weekData = weeks[selectedWeek - 1]

  const pathLabel =
    feedingPath === 'A' ? 'nursing' :
    feedingPath === 'B' ? 'pumping' :
    'combination feeding'

---

PART 4 — PERSONALIZED HEADLINE

At the top of the protocol screen, render a personalized headline block:

  Eyebrow text (12px, uppercase, tracking-wide, neutral-400):
    "Your {pathLabel} plan"

  Headline (22px, semibold, neutral-800):
    "{name}'s 6-Week Plan"
    — use appContext.name. If name is null or empty, use "Your 6-Week Plan" without a name.

  Subtext (14px, neutral-500):
    "Week {currentWeek} of 6 · Starting from where you are"

If the user is past week 6 (baby older than 6 weeks), show the subtext as:
    "Week 6 of 6 · You've completed the foundational plan"

---

PART 5 — WEEK SELECTOR

Below the headline, render a horizontal scrollable row of week pills:

  For each week 1–6:
    - Pill style: rounded-full, px-4 py-1.5, 14px
    - Selected: bg-primary-500, text-white
    - Current week (not selected): border border-primary-500, text-primary-500, bg-transparent
    - Other weeks: bg-neutral-100, text-neutral-500
    - Label: "Week {n}"

  Tapping a pill sets selectedWeek to that number.

On initial render, selectedWeek = currentWeek and that pill is both "current" and "selected."

---

PART 6 — WEEK CARD CONTENT

Below the week selector, render the selected week's content using the existing card component style. Layout top to bottom:

  1. Focus headline block
       Label (11px, uppercase, tracking-wide, primary-400): "THIS WEEK'S FOCUS"
       Text (18px, semibold, neutral-800): weekData.focus

  2. Actions list
       Label (11px, uppercase, tracking-wide, neutral-400): "KEY ACTIONS"
       For each action in weekData.actions:
         - A row with a filled circle check icon (primary-500, 18px) on the left
         - Action text (15px, neutral-700) wrapping to the right
         - Spacing: mb-3 between items

  3. Watch for block
       Background: amber-50 (or warning/10 if that token exists)
       Left border: 3px solid amber-400 (or warning-400)
       Label (11px, uppercase, tracking-wide, amber-600): "WATCH FOR"
       Text (14px, neutral-700): weekData.watchFor

  4. Reach out block
       Background: red-50 (or error/10 if that token exists)
       Left border: 3px solid red-400 (or error-400)
       Label (11px, uppercase, tracking-wide, red-600): "REACH OUT IF"
       Text (14px, neutral-700): weekData.reachOut

  All four blocks are stacked vertically with 16px gap between them.
  Wrap everything in a card container with the app's standard card style (white bg, rounded-2xl, shadow-sm, p-5).

---

PART 7 — PREVIOUS / NEXT WEEK NAVIGATION

Below the week card, add two text link buttons for navigating weeks:

  Layout: flex row, space-between

  Left: "← Week {selectedWeek - 1}" — hidden if selectedWeek === 1
  Right: "Week {selectedWeek + 1} →" — hidden if selectedWeek === 6

  Style: 14px, primary-500, no underline by default, underline on press.

  Tapping either updates selectedWeek.

---

PART 8 — CHAT BRIDGE

Below the navigation links, add a subtle prompt row:

  Text (13px, neutral-400): "Have a question about this week?"
  Link text (13px, primary-500, underlined): "Ask in chat →"

  Tapping this navigates to the chat screen (use the existing nav/routing mechanism).

---

DO NOT CHANGE:
- Protocol screen layout container, header, or bottom nav
- Any card component styles beyond what's specified above
- AppContext fields — read-only access here
- Any other screen, feature, or component
- The Getting Started section or any other tab
```
