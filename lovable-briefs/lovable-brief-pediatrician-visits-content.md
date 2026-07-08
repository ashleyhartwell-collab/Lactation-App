# Lovable Update Prompt — Pediatrician Visit Lessons (Weeks 1, 4, 8)

**Paste the block below directly into Lovable.**

---

```
This brief does three things:
1. Hides the existing shared-pediatrician-visits lesson from all user-facing surfaces (same approach as shared-mental-health — keep the route and component, just remove it from lesson lists and any links to it).
2. Creates three new lessons: shared-pediatrician-week1, shared-pediatrician-week4, and shared-pediatrician-week8.
3. Adds a FeedingSummaryPlaceholder component used in all three lessons — a reserved UI slot for a feature that will be built separately. Do not build the feature logic yet.

---

PART 1 — HIDE EXISTING LESSON

Hide `shared-pediatrician-visits` (route: `/this-week/module/shared-pediatrician-visits`) from all lesson lists and navigation. Keep the route registered and component intact.

---

PART 2 — FEEDING SUMMARY PLACEHOLDER COMPONENT

Create a reusable component at `src/components/FeedingSummaryPlaceholder.tsx`.

This is a reserved slot — it renders a card that describes an upcoming feature but does not implement any feature logic.

Render as:
Card wrapper: bg-primary-50, border border-primary-200, rounded-2xl, p-4, w-full, mt-4

Top row (flex items-center gap-3, mb-2):
  Icon (inline SVG, 20x20, stroke primary-600):
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="2" width="14" height="16" rx="2" stroke="#4f9d9d" stroke-width="1.6"/>
    <line x1="6.5" y1="6.5" x2="13.5" y2="6.5" stroke="#4f9d9d" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="6.5" y1="9.5" x2="13.5" y2="9.5" stroke="#4f9d9d" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="6.5" y1="12.5" x2="10.5" y2="12.5" stroke="#4f9d9d" stroke-width="1.4" stroke-linecap="round"/>
  </svg>
  Title (font-semibold, 14px, primary-800): "Your feeding summary for this visit"

Body text (13px, primary-700, leading-relaxed, mb-3):
"We're working on a one-tap summary of your recent feeds, diaper counts, and weight observations — formatted to hand to your pediatrician. It'll be ready soon."

Button (w-full, h-10, rounded-full, bg-primary-200, text-primary-700, text-sm, font-medium, cursor-not-allowed, opacity-70):
  Label: "Generate summary"
  Disabled: true
  Do not attach any action — this button is non-functional until the feature is built.

Note below button (text-xs, primary-500, text-center, mt-2): "Coming soon"

---

PART 3 — LESSON: shared-pediatrician-week1

Route: /this-week/module/shared-pediatrician-week1
Title: Your Baby's First Pediatrician Visit
Header: Week 1 | All Paths | ~4 min read
Module ID: shared-pediatrician-week1
Appears in: Week 1 shared lesson list

---

LEAD LINE

The first visit is mostly about one question: is your baby getting enough?

---

WHAT TO KNOW THIS WEEK

Most babies see their pediatrician within the first 3 to 5 days after leaving the hospital. The timing is intentional — it's the window when feeding is still being established and when the most common newborn concerns (jaundice, weight loss, dehydration) are still reversible with early action.

The visit is short. Your provider will weigh your baby, check for jaundice, ask about feeding, and look at your baby's overall appearance and behavior. They're not evaluating you. They're collecting data points — and almost everything they check ties back to how feeding is going.

Weight is the headline number. Babies lose weight after birth — this is expected. A loss of up to 10% of birth weight by day 3 to 5 is within normal range. By days 10 to 14, most babies are back to their birth weight. If yours isn't trending that direction by this visit, your provider will want to know more about feeding and may refer you to an IBCLC. That's not a failure — it's exactly what the referral system is designed for.

Jaundice is also common in the first week. Breast milk jaundice and breastfeeding jaundice are two different things, and both are usually managed by feeding more frequently, not by stopping. Frequent feeding helps the gut move bilirubin out. If your provider mentions jaundice, ask whether more frequent feeding is the recommended response — in most mild-to-moderate cases, it is.

Diaper count matters here too. Your provider will ask how many wet and dirty diapers your baby has had. This is the closest proxy to intake that exists in the newborn period. Have a rough number ready.

---

WHAT TO DO

1. Write down your current feeding pattern before you go. How often is your baby feeding? How long on each side (if nursing)? How many ounces per session (if pumping or using formula)? You won't remember accurately in the office — write it down the night before.

2. Count diapers from the past 24 hours. Wet diapers and dirty diapers separately. Your provider will ask.

3. Bring a list of anything that felt hard or confusing in the first few days. This visit is one of the best access points you'll have to a provider who knows newborn feeding. Use it.

4. If your provider mentions a weight concern, ask specifically whether an IBCLC referral is available. Many practices have one on staff or can provide a direct referral.

[FEEDING_SUMMARY_PLACEHOLDER]
Render the FeedingSummaryPlaceholder component here.

---

WHAT TO WATCH FOR

Block 1 — Amber accent (IBCLC or pediatrician):
Weight loss greater than 10% of birth weight, or no signs of regain by day 7: this visit is the check for exactly this. If your provider flags it, act on the referral the same day.

Block 2 — Amber accent (IBCLC or pediatrician):
Jaundice that is worsening rather than improving, or a baby who is very sleepy and difficult to wake for feeds: these are related. A jaundiced baby may not signal hunger clearly. Ask your provider directly whether your feeding frequency is adequate for the bilirubin level.

Block 3 — Plain text (informational):
If your provider recommends supplementing with formula at this visit, ask whether they'd like you to also see an IBCLC before making that call. Supplementing is sometimes medically appropriate — and an IBCLC can help you do it in a way that protects your supply.

---

CRASH-COURSE SNIPPET

Trigger label: "Want to go deeper?"
Section title inside: "What your pediatrician is actually tracking — and why"

Content:

Weight loss after birth happens because babies are born with extra fluid that they shed in the first few days. The acceptable loss threshold (10% of birth weight) exists because beyond that point, the risk of dehydration, significant jaundice, and inadequate caloric intake becomes clinically relevant. It's a useful line, not a precise one.

The weight trajectory matters as much as the single number. A baby who lost 9% by day 3 but is trending back up is in a very different position than one who lost 9% and isn't recovering. Your provider is looking at the curve, not just the number.

Bilirubin and feeding are directly connected. Bilirubin is processed through the gut — specifically through stool. Newborns who aren't feeding frequently enough don't stool frequently enough to clear bilirubin efficiently, and jaundice deepens. The fix, in most cases, is more feeds. Phototherapy is used when bilirubin levels are high enough to risk neurological impact — which is rare and very different from the visible yellowing most parents notice on skin or eyes in the first week.

Breastfed babies are slightly more likely to develop jaundice than formula-fed babies, for two reasons: colostrum has a mild laxative effect that helps clear bilirubin, but in the first day or two before milk volume increases, some babies don't get enough. The solution is almost always more feeding, not switching to formula.

---

CHAT BRIDGE TEXT

"Have a question about your baby's first visit?"
(Links to /chat per the existing chat bridge pattern.)

---

DONE BUTTON: standard behavior.

---

PART 4 — LESSON: shared-pediatrician-week4

Route: /this-week/module/shared-pediatrician-week4
Title: Your Baby's 1-Month Pediatrician Visit
Header: Week 4 | All Paths | ~4 min read
Module ID: shared-pediatrician-week4
Appears in: Week 4 shared lesson list

---

LEAD LINE

By one month, weight gain is your clearest signal that feeding is working — and your provider is looking at it closely.

---

WHAT TO KNOW THIS WEEK

The one-month visit is less urgent than the first-week visit and more reflective. Your baby has been in the world for about four weeks. Your provider will weigh them, measure length and head circumference, check their development, and ask how feeding is going. The conversation is longer and more two-way at this visit — bring your questions.

Weight gain is the main event. Babies typically gain about an ounce a day from their lowest weight through the first few months. By one month, your baby should be noticeably heavier than at birth — usually 2 to 3 pounds above birth weight. If your provider notes adequate weight gain, that is the most reliable confirmation that your milk supply is working, your latch is effective, or your formula or pumped milk amounts are appropriate. No app or instinct or breast fullness check tells you more than that number.

Vitamin D will likely come up at this visit. Breast milk is low in vitamin D regardless of how much vitamin D the nursing parent consumes. The AAP recommends 400 IU of vitamin D daily for all breastfed infants, starting in the first few days. If you're using formula, standard formula is already fortified — supplementation usually isn't needed. If you're combination feeding, your provider can tell you whether a supplement is needed based on how much formula your baby is getting.

If you're returning to work in the next few weeks, this visit is a good time to talk about pumping frequency, bottle introduction, and whether your current milk output is meeting your baby's needs. Your provider can help you set realistic expectations.

Development questions often come up here too. By one month, most babies are beginning to track faces, startle at sounds, and show the earliest hints of a social smile. If your baby seems unusually sleepy, difficult to rouse for feeds, or isn't regaining alertness between feeds, name it at this visit.

---

WHAT TO DO

1. Weigh yourself without your baby first (using a home scale if you have one), then weigh yourself holding them. The difference is a rough sense of their weight before you get to the office. It won't be exact, but it gives you a baseline to compare against.

2. Track feeds for the 24 hours before the visit. For nursing: number of feeds and rough duration. For pumping: number of sessions and total ounces. For formula or combo: ounces per feed, number of feeds. Bring this to the visit.

3. Write down the feeding questions that have come up in the past two weeks. Supply concerns, latch changes, whether your baby is getting enough — this is the visit to bring them all.

4. If your baby is fully or partially breastfed, ask your provider about starting vitamin D drops if you haven't already.

[FEEDING_SUMMARY_PLACEHOLDER]
Render the FeedingSummaryPlaceholder component here.

---

WHAT TO WATCH FOR

Block 1 — Amber accent (IBCLC or pediatrician):
Weight gain below 0.5 oz per day since the last visit, or a weight that is flat or declining: this warrants a feeding assessment. Don't wait for the next scheduled visit — call.

Block 2 — Plain text (informational):
Around weeks 3 and 6, many babies go through growth spurts. If your one-month visit falls during or just after a spurt, your baby may be feeding more frequently than usual and your breasts (if nursing) may feel softer and less full than they did earlier. Both are normal signs that supply is adjusting upward — not signs of a problem.

Block 3 — Plain text (informational):
Combination feeders: if your formula use has changed since week 1 (more, less, or different brand), bring that to your provider's attention. Weight gain at this visit helps confirm whether the current balance is working.

---

CRASH-COURSE SNIPPET

Trigger label: "Want to go deeper?"
Section title inside: "How your provider reads your baby's growth chart"

Content:

Pediatricians use WHO or CDC growth charts to plot your baby's weight over time. The chart shows percentile lines — the 50th percentile is the median, meaning half of babies are above it and half below. What matters more than the percentile itself is the curve: is your baby tracking along the same percentile over time, or are they crossing downward?

A baby who is consistently at the 15th percentile is not a cause for concern. A baby who dropped from the 60th to the 20th percentile in four weeks is — because the drop represents a change in the pattern. Your provider is reading the curve, not the number in isolation.

For breastfed babies, the WHO growth charts (rather than CDC) are considered the reference standard by the AAP. They were built using data from breastfed infants and reflect typical growth patterns more accurately for this group. If you're ever uncertain which chart is being used, it's fair to ask.

Head circumference is tracked because brain growth in the first year is rapid and measurable. An unusually small or unusually large head circumference, or one that is changing shape, can be an early sign of neurological concerns — but in most cases it's simply within normal variation. Your provider will flag it if it warrants follow-up.

---

CHAT BRIDGE TEXT

"Have a question about the one-month visit?"
(Links to /chat per the existing chat bridge pattern.)

---

DONE BUTTON: standard behavior.

---

PART 5 — LESSON: shared-pediatrician-week8

Route: /this-week/module/shared-pediatrician-week8
Title: Your Baby's 2-Month Pediatrician Visit
Header: Week 8 | All Paths | ~4 min read
Module ID: shared-pediatrician-week8
Appears in: Week 8 shared lesson list

---

LEAD LINE

The two-month visit includes vaccines. That changes how the next day or two will go — and how your baby feeds through it.

---

WHAT TO KNOW THIS WEEK

The two-month well visit is a milestone visit. Your baby will receive their first major round of vaccines — DTaP, Hib, IPV, PCV13, and rotavirus are all typically given today. It's a significant immunization appointment, and it has a predictable effect on feeding.

After vaccines, many babies are fussier than usual for 24 to 48 hours. They may want to nurse or feed more frequently for comfort, not hunger. This is normal. It is not a supply problem. It's a baby asking to be close and soothed, and feeding is one of the most effective comfort strategies available. Let them feed. If you're pumping, a slight increase in demand-driven sessions for a day or two is fine.

Weight and growth are checked at this visit. By two months, most babies have gained roughly 3 to 4 pounds above their lowest post-birth weight. Your provider is plotting the trajectory — consistent gain along an appropriate curve, whatever percentile that is for your baby. This is also the visit where growth patterns start to become clearer: some babies are on the bigger end, some smaller, and both are fine as long as the curve is consistent.

If you've been combination feeding or have had supply concerns, weight at two months is one of the most informative data points you'll have. It reflects six to eight weeks of feeding effort, not a single snapshot.

Developmental markers your provider will check: intentional smiling, cooing and making sounds in response to voices, tracking moving objects smoothly, good head control when held upright, and beginning to lift the head during tummy time. Breastfed and formula-fed babies reach these milestones at comparable rates.

Vitamin D will come up again. If you've been giving drops, confirm the dose. If your baby has moved to formula as the primary or sole source, supplementation likely isn't needed — confirm with your provider.

---

WHAT TO DO

1. Plan your day around the visit if possible. Many families find it easier to go to the vaccine appointment earlier in the day so a fussier afternoon is at home, not in transit.

2. Feed your baby before the visit if the timing works. A fed baby is usually calmer during the exam and the shots.

3. After vaccines, be ready to nurse or feed on demand. Don't try to hold to a schedule for the next 24 hours. Baby-led feeding is appropriate here.

4. Watch for fever after vaccines — up to 101°F (38.3°C) is expected and normal. Your provider will advise on whether infant acetaminophen is appropriate and at what dose. Above 101°F, call the office.

5. Track your feeds for the week before the visit and bring that data. Two months in, patterns are visible — total daily ounces or sessions per day is something your provider may ask about.

[FEEDING_SUMMARY_PLACEHOLDER]
Render the FeedingSummaryPlaceholder component here.

---

WHAT TO WATCH FOR

Block 1 — Red accent (ER or provider same-day):
Fever above 101°F in the 24 to 48 hours after vaccines, or a baby who is inconsolable for more than a few hours: call your provider. High fever after vaccines in a young infant warrants a same-day assessment, not a wait-and-see approach.

Block 2 — Plain text (informational):
A day or two of increased fussiness and cluster feeding after vaccines is normal. If your baby seems back to their usual self within 48 hours, nothing needs follow-up.

Block 3 — Amber accent (IBCLC or pediatrician):
If weight gain at this visit is flat or has dropped significantly since the one-month visit, ask for a feeding assessment. Two months is enough time to confirm whether a supply or intake issue is real — and early intervention works better than waiting.

Block 4 — Plain text (informational):
If you've been planning to return to work and haven't yet established a pumping or bottle-feeding routine: now is the time to get intentional. Most providers recommend introducing a bottle by week 6 to 8 at the latest to avoid bottle refusal. If that window has passed, an IBCLC can help with strategies for a baby who is reluctant to take a bottle.

---

CRASH-COURSE SNIPPET

Trigger label: "Want to go deeper?"
Section title inside: "The two-month vaccines — what they are and what to expect"

Content:

At the two-month visit, babies in the US typically receive the following vaccines in a single appointment:

DTaP (diphtheria, tetanus, and pertussis). Pertussis, or whooping cough, is the most relevant for a newborn's household — it spreads easily and is most dangerous in infants under two months. By two months, your baby is building their own immunity, but this is also why the Tdap booster for caregivers and family members who will be around a newborn is recommended during pregnancy or immediately after birth.

Hib (Haemophilus influenzae type b). Protects against a bacterial infection that was a leading cause of bacterial meningitis in children before the vaccine was introduced.

IPV (inactivated polio vaccine). The injectable form of the polio vaccine.

PCV13 or PCV15 (pneumococcal conjugate). Protects against bacterial pneumonia, meningitis, and ear infections.

Rotavirus (oral). This one is given by mouth, not injection. Rotavirus causes severe diarrhea in infants — the vaccine has dramatically reduced hospitalizations from this illness.

After these vaccines, a low fever (up to 101°F), fussiness, and injection-site soreness are expected and are signs the immune system is responding. Serious adverse events are rare and are actively monitored through the VAERS system. If you have concerns, bring them to your provider — they are used to this conversation.

---

CHAT BRIDGE TEXT

"Have a question about the two-month visit or vaccines?"
(Links to /chat per the existing chat bridge pattern.)

---

DONE BUTTON: standard behavior.

---

PART 6 — ROUTING AND LESSON LIST PLACEMENT

Register three new routes:
  /this-week/module/shared-pediatrician-week1
  /this-week/module/shared-pediatrician-week4
  /this-week/module/shared-pediatrician-week8

Each route maps to its corresponding new lesson component.

Add each lesson to the correct week's shared lesson list:
  shared-pediatrician-week1 → Week 1 shared lesson list (alongside postpartum body, partner support, safe sleep, escalation guide)
  shared-pediatrician-week4 → Week 4 shared lesson list
  shared-pediatrician-week8 → Week 8 shared lesson list

---

DO NOT CHANGE:
- Any path-specific lessons (A-x-x, B-x-x, C-x-x)
- The safe sleep, escalation guide, postpartum body, or partner support lessons
- The Done button behavior or styling across any lesson
- Any other screen, route, or component not named above
- The FeedingSummaryPlaceholder button must remain disabled — do not wire any action to it
```

---

## Note for next build session

The `FeedingSummaryPlaceholder` component is a reserved UI slot. The feature it represents — generating a formatted feeding and diaper log summary for a pediatrician visit — is scoped separately and will be built when ready. Do not build this feature until explicitly instructed.

Feature will need to:
- Pull from the existing feed tracker and diaper tracker data in Supabase
- Calculate totals and averages for a user-selected date range (likely the 7 days before the visit)
- Format the output as a readable summary (screen view + shareable/printable version)
- Surface inside each of the three pediatrician visit lessons
