# Lovable Update Prompt — Interactive Latch Step Guide (A-1-2)

**Paste the block below directly into Lovable.**

---

```
One update in this brief: replace the WHAT TO DO section in lesson A-1-2 (Getting the Latch) with a new interactive `LatchStepGuide` component. All other sections of A-1-2 remain unchanged. Do not modify any other lesson.

---

PART 1 — COMPONENT: LatchStepGuide

Create a new component at src/components/LatchStepGuide.tsx.

This component replaces only the WHAT TO DO section body in A-1-2. The section label "WHAT TO DO" still renders above it using the existing section label style. The component renders below that label.

---

PART 2 — STATE

Manage all state locally within the component using React hooks. No Supabase persistence needed — state resets when the user navigates away.

```ts
const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
const [attemptCount, setAttemptCount] = useState(0)       // increments on each "Still painful" answer
const [timerState, setTimerState] = useState<'idle' | 'running' | 'complete'>('idle')
const [secondsLeft, setSecondsLeft] = useState(30)
const [painAnswer, setPainAnswer] = useState<'okay' | 'painful' | null>(null)
const [showEscalation, setShowEscalation] = useState(false)
const [showBreakLatch, setShowBreakLatch] = useState(false)
```

---

PART 3 — LOGIC

goToStep(n): setCurrentStep(n), reset timerState to 'idle', setSecondsLeft(30), setPainAnswer(null), setShowBreakLatch(false)

startTimer():
  setTimerState('running')
  Run a setInterval that decrements secondsLeft by 1 every 1000ms.
  When secondsLeft reaches 0: clearInterval, setTimerState('complete')
  Clean up interval on unmount.

onPainAnswer('okay'):
  setPainAnswer('okay')
  goToStep(4)

onPainAnswer('painful'):
  const next = attemptCount + 1
  setAttemptCount(next)
  setPainAnswer('painful')
  if (next >= 5) {
    setShowEscalation(true)
  } else {
    setShowBreakLatch(true)
  }

onRestartFromBreakLatch():
  setShowBreakLatch(false)
  goToStep(1)

onKeepTryingFromEscalation():
  setShowEscalation(false)
  setAttemptCount(0)
  goToStep(1)

---

PART 4 — LAYOUT WRAPPER

The component renders as a full-width card container. Each step fills the container — only the current step is visible (no side-scrolling; steps transition via state, not scroll position). Progress indicator at the top. Navigation at the bottom of each step.

Outer wrapper: w-full, mt-2

Step progress indicator (renders above every step, hidden during escalation and break-latch screens):
  "Step [currentStep] of 4"
  Style: text-xs, tracking-widest, neutral-400, text-center, mb-4
  Below that: 4 dots in a row, centered, gap-2
    Active dot: w-2 h-2 rounded-full bg-primary-500
    Completed dot: w-2 h-2 rounded-full bg-primary-200
    Upcoming dot: w-2 h-2 rounded-full bg-neutral-200

Each step card: bg-white, rounded-2xl, shadow-sm, p-5, w-full

---

PART 5 — STEP CONTENT AND ILLUSTRATIONS

STEP 1

Title (font-semibold, 17px, neutral-900, mb-2): Bring baby to you

Description (15px, neutral-700, leading-relaxed, mb-4):
Get comfortable first — sitting upright or slightly reclined. Hold your baby facing you, tummy to tummy. Position their nose level with your nipple so their head tips back slightly when they move in. They latch chin-first, not straight on.

On attempts 2 and above (attemptCount > 0), render a small inline text link just below the progress indicator, before the step card:
  Text: "Skip to the pain check →"
  Style: text-sm, primary-600, underlined
  Action: goToStep(3)

SVG illustration (render centered, max-w-[220px], mx-auto, my-4):
<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
  <!-- Breast side profile -->
  <ellipse cx="62" cy="95" rx="55" ry="68" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1.5"/>
  <!-- Nipple at front of breast -->
  <circle cx="18" cy="88" r="7" fill="#c49370"/>
  <!-- Nipple level dashed line -->
  <line x1="18" y1="88" x2="190" y2="88" stroke="#4f9d9d" stroke-width="1.5" stroke-dasharray="5 4"/>
  <!-- "nose here" label on line -->
  <text x="134" y="83" fill="#4f9d9d" font-size="9.5" font-family="system-ui,sans-serif" font-weight="600">nose at nipple level</text>
  <!-- Baby head (simplified oval) -->
  <ellipse cx="178" cy="110" rx="38" ry="44" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1.5"/>
  <!-- Nose dot -->
  <circle cx="157" cy="90" r="4" fill="#c49370" opacity="0.7"/>
  <!-- Mouth (chin end) -->
  <path d="M158 118 Q165 125 175 122" stroke="#c49370" fill="none" stroke-width="2" stroke-linecap="round"/>
  <!-- Arrow showing baby moving toward breast, chin-first -->
  <line x1="138" y1="120" x2="108" y2="112" stroke="#4f9d9d" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="110,106 100,116 115,118" fill="#4f9d9d"/>
  <text x="125" y="148" text-anchor="middle" fill="#6b7280" font-size="10" font-family="system-ui,sans-serif">chin leads, baby comes to breast</text>
</svg>

CTA button (primary, full-width, mt-4, h-12, rounded-full):
  Label: "Ready — next"
  Action: goToStep(2)

---

STEP 2

Title: Wait for the wide open mouth

Description (15px, neutral-700, leading-relaxed, mb-4):
Touch your nipple gently to your baby's upper lip. Wait for them to open really wide — not just a little, but wide like a yawn. When they do, bring them in quickly. Aim the nipple toward the roof of their mouth, not straight in. More of the lower areola goes in than the upper.

SVG illustration (render centered, max-w-[220px], mx-auto, my-4):
<svg viewBox="0 0 240 190" xmlns="http://www.w3.org/2000/svg">
  <!-- Baby face oval -->
  <ellipse cx="120" cy="95" rx="80" ry="82" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1.5"/>
  <!-- Eyes -->
  <ellipse cx="90" cy="72" rx="8" ry="6" fill="#c49370" opacity="0.5"/>
  <ellipse cx="150" cy="72" rx="8" ry="6" fill="#c49370" opacity="0.5"/>
  <!-- Nose -->
  <ellipse cx="120" cy="96" rx="8" ry="5" fill="#e8c5a0"/>
  <!-- Wide open mouth arc -->
  <path d="M80 124 Q120 175 160 124" stroke="#c49370" stroke-width="2" fill="#fff4ee"/>
  <path d="M80 124 Q120 118 160 124" stroke="#c49370" stroke-width="1.5" fill="none"/>
  <!-- Upper lip label -->
  <text x="120" y="120" text-anchor="middle" fill="#4f9d9d" font-size="9.5" font-family="system-ui,sans-serif" font-weight="600">upper lip</text>
  <!-- Nipple dot above upper lip with downward arrow -->
  <circle cx="120" cy="94" r="5" fill="#c49370" opacity="0.85"/>
  <text x="120" y="90" text-anchor="middle" fill="#c49370" font-size="9" font-family="system-ui,sans-serif">nipple</text>
  <!-- Arrow pointing down from nipple to upper lip -->
  <line x1="120" y1="99" x2="120" y2="112" stroke="#4f9d9d" stroke-width="2" stroke-linecap="round"/>
  <polygon points="115,110 120,118 125,110" fill="#4f9d9d"/>
  <text x="120" y="183" text-anchor="middle" fill="#6b7280" font-size="10" font-family="system-ui,sans-serif">wait for the wide yawn, then bring in fast</text>
</svg>

CTA button (primary, full-width, mt-4, h-12, rounded-full):
  Label: "Baby is latched — start the check"
  Action: goToStep(3)

Back link (text-sm, neutral-400, text-center, mt-2, tappable):
  "← Back"
  Action: goToStep(1)

---

STEP 3 — TIMER STEP

Title (font-semibold, 17px, neutral-900, mb-1): Hold for 30 seconds

Subtitle (14px, neutral-500, mb-4): We'll check how it feels when the timer ends.

SVG illustration — good latch side profile (render centered, max-w-[220px], mx-auto, mb-4):
<svg viewBox="0 0 240 175" xmlns="http://www.w3.org/2000/svg">
  <!-- Breast side profile -->
  <ellipse cx="68" cy="92" rx="58" ry="65" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1.5"/>
  <!-- Baby head at breast -->
  <ellipse cx="168" cy="96" rx="52" ry="56" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1.5"/>
  <!-- Chin touching breast (overlap zone) -->
  <path d="M130 120 Q140 130 148 128" stroke="#4f9d9d" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="120" cy="118" r="4" fill="#4f9d9d" opacity="0.8"/>
  <text x="90" y="148" fill="#4f9d9d" font-size="9" font-family="system-ui,sans-serif" font-weight="600">chin touching breast</text>
  <!-- Nose indication (clear of breast) -->
  <circle cx="143" cy="76" r="4" fill="#e8c5a0"/>
  <text x="152" y="68" fill="#4f9d9d" font-size="9" font-family="system-ui,sans-serif" font-weight="600">nose clear</text>
  <!-- Lips flanged markers -->
  <path d="M118 108 Q120 112 118 116" stroke="#c49370" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M118 105 Q115 102 114 108" stroke="#c49370" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <text x="88" y="100" fill="#c49370" font-size="9" font-family="system-ui,sans-serif">lips flanged</text>
  <!-- Check marks -->
  <text x="195" y="148" fill="#4f9d9d" font-size="12" font-family="system-ui,sans-serif">✓</text>
  <text x="195" y="70" fill="#4f9d9d" font-size="12" font-family="system-ui,sans-serif">✓</text>
  <text x="185" y="102" fill="#c49370" font-size="12" font-family="system-ui,sans-serif">✓</text>
</svg>

--- TIMER UI (renders below SVG) ---

TIMER AUTO-START BEHAVIOR:
When the user arrives at Step 3 (currentStep becomes 3), call startTimer() automatically via useEffect:
  useEffect(() => {
    if (currentStep === 3 && timerState === 'idle') {
      startTimer()
    }
  }, [currentStep])

There is no manual start button. The timer runs immediately.

---

STATE: RUNNING (timerState === 'running')

  Render a centered countdown display:
    Large number: secondsLeft
      Style: text-7xl, font-bold, primary-600, leading-none
    Below number: "seconds" in text-sm, neutral-400

  Circular progress ring around the number:
    SVG circle (r=52, stroke-width=6)
    Background circle: stroke neutral-100
    Progress circle: stroke primary-400, stroke-dasharray calculated from (30 - secondsLeft) / 30
    Animate smoothly as secondsLeft decrements

  Reassurance text below ring (14px, neutral-500, text-center, mt-4):
    "Some tenderness right at latch-on is normal. We're checking whether it fades."

  Restart link below reassurance text (text-sm, neutral-400, text-center, mt-3, tappable):
    "Restart timer"
    Action: setSecondsLeft(30), clearInterval and restart the interval (same as startTimer() but resets from 30)

---

STATE: COMPLETE (timerState === 'complete')

  Render pain question:
    Question text (font-semibold, 17px, neutral-900, text-center, mb-6):
    "Is it still painful?"

    Two buttons, stacked vertically, full-width, gap-3:

      Button 1 (primary-filled, h-12, rounded-full):
        Label: "Feels okay"
        Action: onPainAnswer('okay')

      Button 2 (outlined, border-neutral-300, text-neutral-700, h-12, rounded-full):
        Label: "Still painful"
        Action: onPainAnswer('painful')

    Reassurance text below (13px, neutral-400, text-center, mt-3):
      "Mild pulling pressure is normal. Sharp or pinching pain that continues after the first few seconds is the signal to re-latch."

---

BREAK-LATCH SCREEN (showBreakLatch === true)

Replaces step content entirely (progress indicator hidden).

Card: bg-amber-50, border border-amber-200, rounded-2xl, p-5

Attempt counter (text-xs, tracking-widest, neutral-500, mb-3):
  "Attempt [attemptCount] of 5"

Title (font-semibold, 17px, neutral-900, mb-3):
  "Let's try the latch again."

Body text (15px, neutral-700, leading-relaxed, mb-5):
  "Before you re-latch, break the suction gently. Slide the tip of your clean finger into the corner of your baby's mouth — between their gums — and hold it there until you feel the suction release. Then take a breath. You've got this."

Reminder callout (bg-white, rounded-xl, p-3, mb-5, text-sm, neutral-600):
  "Never pull your baby off while they're still suctioned. Finger in first, then release."

CTA button (primary, full-width, h-12, rounded-full):
  Label: "Suction released — start over"
  Action: onRestartFromBreakLatch()

---

ESCALATION SCREEN (showEscalation === true)

Replaces step content entirely (progress indicator hidden).

Card: bg-white, rounded-2xl, p-5

Small badge (text-xs, tracking-widest, neutral-400, mb-4, text-center):
  "5 ATTEMPTS"

Title (font-semibold, 20px, neutral-900, text-center, mb-3):
  "You've worked really hard at this."

Body (15px, neutral-700, leading-relaxed, mb-5):
  "Five re-latches takes real dedication. You haven't done anything wrong. Some latches need a second set of eyes to troubleshoot — that's just where you are right now, and it's completely fixable."

Separator line (border-t border-neutral-100, my-4)

Continuation callout (bg-primary-50, border-l-4 border-primary-400, rounded-lg, px-4 py-3, mb-5):
  Label text (font-semibold, 14px, primary-700, mb-1): "Keep going with this feeding"
  Body text (14px, primary-600, leading-relaxed):
  "Your baby needs this feed, and it's okay to continue even with the discomfort. Pain during nursing is worth addressing, but it doesn't mean you have to stop. We'll figure out the latch. Feed your baby now."

Next step section:
  Label (text-xs, tracking-widest, neutral-400, mb-3): "YOUR NEXT STEP"

  Primary CTA (primary-filled, full-width, h-12, rounded-full, mb-3):
    Label: "Get help in chat"
    Action: navigate to /chat with suggested message pre-filled: "I'm having trouble with my latch. I've tried re-latching 5 times and it's still painful."

  Secondary CTA (outlined, border-primary-300, text-primary-700, full-width, h-12, rounded-full, mb-3):
    Label: "Find an IBCLC"
    Action: navigate to /this-week/module/shared-escalation-guide

  Tertiary link (text-sm, neutral-400, text-center, mt-2, tappable):
    "I want to keep trying"
    Action: onKeepTryingFromEscalation()
    Note: this resets attemptCount to 0 and returns to Step 1 so they get another full set of 5 attempts.

---

STEP 4 — SUCCESS STEP (only reached via 'Feels okay' path)

Title: One more thing — document this latch

Description (15px, neutral-700, leading-relaxed, mb-4):
  "If you can, take a quick photo or 10-second video of your baby latched right now. You don't have to do anything with it immediately. But if you ever want a latch review from an IBCLC — in person or by video — having footage of what your latch looks like makes it far more useful."

SVG illustration (render centered, max-w-[200px], mx-auto, my-4):
<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
  <!-- Phone outline -->
  <rect x="58" y="10" width="84" height="148" rx="14" fill="white" stroke="#d1d5db" stroke-width="2"/>
  <!-- Phone screen -->
  <rect x="66" y="24" width="68" height="110" rx="6" fill="#f5f5f4"/>
  <!-- Latch sketch on screen (tiny version) -->
  <ellipse cx="88" cy="72" rx="18" ry="22" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1"/>
  <ellipse cx="114" cy="74" rx="14" ry="18" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1"/>
  <text x="100" y="110" text-anchor="middle" fill="#9ca3af" font-size="8" font-family="system-ui,sans-serif">your latch</text>
  <!-- Camera dot at bottom of phone -->
  <circle cx="100" cy="148" r="5" fill="#e5e7eb"/>
  <!-- Camera icon top of screen -->
  <rect x="84" y="17" width="32" height="10" rx="5" fill="#e5e7eb"/>
  <circle cx="100" cy="22" r="3" fill="#d1d5db"/>
  <!-- Checkmark overlay -->
  <circle cx="148" cy="38" r="16" fill="#4f9d9d"/>
  <path d="M140 38 L146 44 L156 32" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="100" y="162" text-anchor="middle" fill="#6b7280" font-size="10" font-family="system-ui,sans-serif">helpful if you ever want a latch review</text>
</svg>

Chat bridge text (14px, neutral-500, text-center, mt-4, mb-4):
  "Not sure what a good latch looks like in your photo?"
  Inline link in primary-600: "Ask in chat →" (navigates to /chat)

Back link (text-sm, neutral-400, text-center, mt-1, tappable):
  "← Back"
  Action: goToStep(3), reset timer to idle, reset painAnswer

Note: The standard Done button from the lesson shell renders below this component per the existing lesson pattern. Do not add a second done button inside this component.

---

PART 6 — INTEGRATION INTO A-1-2

In lesson A-1-2 (Getting the Latch):

1. Import LatchStepGuide into the module file.

2. In the WHAT TO DO section: remove the existing 4-item numbered list and replace with:
   <LatchStepGuide />

3. Keep the WHAT TO DO section label ("WHAT TO DO") above the component using the existing section label style.

4. Everything else in A-1-2 stays exactly as-is: the lesson header, lead line, WHAT TO KNOW prose, WHAT TO WATCH FOR callouts, crash-course snippet, chat bridge text, and Done button.

---

DO NOT CHANGE:
- Any other lesson, screen, component, or route not named above
- The WHAT TO KNOW section in A-1-2
- The WHAT TO WATCH FOR section in A-1-2
- The crash-course snippet in A-1-2
- The Done button behavior in A-1-2
- AppContext, bottom nav, app shell, color tokens, onboarding
```
