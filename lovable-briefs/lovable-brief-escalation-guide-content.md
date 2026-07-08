# Lovable Update Prompt — Shared Lesson: When to See Your OB vs. Your IBCLC vs. the ER

**Paste the block below directly into Lovable.**

---

```
Replace all placeholder content in the `shared-escalation-guide` lesson with the content below. This lesson uses a non-standard layout: a short intro paragraph followed by a three-panel infographic component. Do not apply the standard WHAT TO KNOW / WHAT TO DO / WHAT TO WATCH FOR section structure to this lesson. Use the existing lesson shell (header, lead line slot, chat bridge, Done button) and render the intro + infographic between the lead line and the chat bridge.

---

LESSON: shared-escalation-guide
Route: /this-week/module/shared-escalation-guide
Header: Week 1 | All Paths | ~3 min read

---

LEAD LINE

Knowing who to call and when saves you time, anxiety, and occasionally a lot worse.

---

INTRO PARAGRAPH

Render below the lead line. Style: 15px, neutral-700, leading-relaxed, mb-6.

"Not every problem is an emergency, and not every emergency belongs with your lactation consultant. These three contacts cover different territory. Use this as a quick reference whenever something feels off — and when in doubt between calling your OB and going to the ER, go to the ER."

---

INFOGRAPHIC COMPONENT

Render directly below the intro paragraph as a full-width stacked card layout. Three cards, stacked vertically (flex-col, gap-4, w-full). Each card is self-contained.

---

CARD 1 — ER

Card wrapper: bg-red-50, border border-red-200, rounded-2xl, overflow-hidden, w-full

Header bar: bg-red-600, px-4, py-3, flex items-center gap-3
  Icon (inline SVG, 22x22, white stroke):
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="9.5" stroke="white" stroke-width="1.8"/>
    <line x1="11" y1="5.5" x2="11" y2="11.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <circle cx="11" cy="15" r="1.2" fill="white"/>
  </svg>
  Label: "Emergency Room — Go Now"
    Style: font-bold, text-white, text-base, tracking-wide

Card body: px-4, py-4

Intro line (text-sm, red-800, font-medium, mb-3):
"Don't call ahead. Go directly."

List (space-y-2):
Each item: flex items-start gap-2
  Bullet: w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0
  Text: text-sm, red-900, leading-snug

Items:
- Heavy postpartum bleeding — soaking through a pad in under an hour for two or more hours in a row, or passing clots larger than a golf ball
- Fever above 101°F with rapid heartbeat, chills, or confusion — these together can signal infection or sepsis
- Severe headache that won't go away, vision changes, pain in your upper right abdomen, or sudden swelling in your face or hands — these are signs of postpartum preeclampsia
- Chest pain, racing heart, or shortness of breath
- Thoughts of harming yourself or your baby — this is a medical emergency; you will not be judged

Divider (border-t border-red-200, my-3)

Footer note (text-xs, red-700, italic):
"If you're unsure whether something is ER-level, go. It is always okay to go."

---

CARD 2 — OB / PROVIDER

Card wrapper: bg-amber-50, border border-amber-200, rounded-2xl, overflow-hidden, w-full

Header bar: bg-amber-500, px-4, py-3, flex items-center gap-3
  Icon (inline SVG, 22x22, white stroke):
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="2" width="10" height="18" rx="2" stroke="white" stroke-width="1.8"/>
    <line x1="9" y1="7" x2="13" y2="7" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="10" x2="13" y2="10" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="13" x2="11" y2="13" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  Label: "OB / Midwife — Call Same Day"
    Style: font-bold, text-white, text-base, tracking-wide

Card body: px-4, py-4

Intro line (text-sm, amber-900, font-medium, mb-3):
"Call your provider's office. Most can fit you in or advise by phone within hours."

List (space-y-2):
Each item: flex items-start gap-2
  Bullet: w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0
  Text: text-sm, amber-900, leading-snug

Items:
- Fever between 100.4°F and 101°F — could indicate mastitis, a uterine infection, or a wound infection
- A red, hot, hard wedge-shaped area on one breast, especially with flu-like body aches — mastitis needs antibiotics
- C-section incision showing redness, swelling, discharge, or separation
- Perineal stitches that are separating, have unusual discharge, or are causing increasing pain after the first few days
- Mood changes that feel like more than the baby blues — persistent crying, inability to sleep even when you can, feeling detached from your baby, or intrusive thoughts. These are treatable
- Urinary burning, urgency, or pelvic pain that's getting worse

Divider (border-t border-amber-200, my-3)

Footer note (text-xs, amber-700, italic):
"If your OB's office is closed, most have an after-hours line. Use it."

---

CARD 3 — IBCLC

Card wrapper: bg-teal-50, border border-teal-200, rounded-2xl, overflow-hidden, w-full

Header bar: bg-teal-600, px-4, py-3, flex items-center gap-3
  Icon (inline SVG, 22x22, white stroke):
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="7" r="3.5" stroke="white" stroke-width="1.8"/>
    <path d="M5 19c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M15 10.5 L17 12.5 L20 9" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  Label: "IBCLC — Book Within 24–48 Hours"
    Style: font-bold, text-white, text-base, tracking-wide

Card body: px-4, py-4

Intro line (text-sm, teal-900, font-medium, mb-3):
"These are feeding problems, not medical emergencies — but they still need a trained eye soon."

List (space-y-2):
Each item: flex items-start gap-2
  Bullet: w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0
  Text: text-sm, teal-900, leading-snug

Items:
- Nipple pain that continues throughout the entire feed, not just at latch-on
- Cracked, bleeding, blistered, or misshapen nipples after feeding (a nipple that looks like a new lipstick after baby unlatches is a latch sign)
- Baby losing more than 10% of birth weight by day 5, or not back to birth weight by day 14
- Fewer wet diapers than expected — less than one per day of age in the first week
- Clicking, smacking, or gulping sounds during nursing
- Engorgement so severe that your baby cannot latch and feeding more frequently isn't resolving it
- Concern about tongue tie or lip tie
- Milk supply concerns — either too little or too much
- Pain during pumping, or uncertainty about flange sizing
- Any feed where baby seems consistently unsatisfied or inconsolable

Divider (border-t border-teal-200, my-3)

Footer note (text-xs, teal-700, italic):
"If you got one IBCLC visit at the hospital, that doesn't mean you're set. An outpatient visit in the first week is the highest-leverage thing you can do for your breastfeeding journey."

---

END OF INFOGRAPHIC COMPONENT

---

CHAT BRIDGE TEXT

"Not sure which contact fits your situation?"

(Links to /chat per the existing chat bridge pattern.)

---

DO NOT CHANGE:
- The lesson header, week badge, path badge, or read-time pill
- The Done button behavior or styling
- Any other lesson, screen, or component not named above
- Do not add a crash-course snippet to this lesson — the infographic is the full content
```
