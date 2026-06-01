// Anticipatory Guidance Message Library — content data
// Each entry: id, timing, paths, triggerType, triggerCondition,
//             headline, inAppMessage, learnMore, escalation, escalationText, sources

module.exports = [

  // ─── TIME-BASED ────────────────────────────────────────────────────────────

  {
    id: "AG-001",
    timing: "Day 1–2",
    paths: "All paths",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 0–2 days",
    headline: "Colostrum: small amounts are exactly right",
    inAppMessage:
      "Your baby's stomach is the size of a marble right now — that's not an exaggeration. The colostrum your body is making is exactly the right amount and exactly the right nutrition for this stage. If it feels like almost nothing is coming out, that's completely normal. Want me to explain what's happening?",
    learnMore:
      "Colostrum is a concentrated, low-volume first milk that your body produces for the first 24–72 hours. A newborn's stomach capacity on day one is roughly 5–7 mL per feeding — about one teaspoon. Colostrum is dense in antibodies (especially secretory IgA), white blood cells, and growth factors that protect the newborn gut before mature milk arrives. Its low volume is physiologically intentional: it helps the baby learn to coordinate sucking and swallowing before higher milk flow begins. Feeding on demand in these early hours — at least 8–12 times per 24 hours — signals your body to ramp up milk production. Frequent feeding now is the single most important thing you can do for long-term supply. Source: ABM Protocol #2; AAP Section on Breastfeeding 2022; LLLI \"Breastfeeding in the Early Days.\"",
    escalation: true,
    escalationText:
      "If your baby is not waking to feed at least every 3 hours, seems lethargic or difficult to rouse, or has fewer than 1 wet diaper by the end of day 1, contact your pediatrician or lactation consultant before your next scheduled visit.",
    sources: "ABM Protocol #2; AAP 2022 breastfeeding policy; LLLI",
  },

  {
    id: "AG-002",
    timing: "Day 3–5",
    paths: "All paths",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 3–5 days",
    headline: "Your milk is coming in — here's what that feels like",
    inAppMessage:
      "Somewhere between days 3 and 5, your milk \"comes in\" — meaning your body transitions from colostrum to mature milk. Your breasts may feel very full, hard, or warm. This can be uncomfortable. It's normal. It's also temporary. Want to know what to do and what to watch for?",
    learnMore:
      "The transition from colostrum to mature milk is driven by the drop in progesterone that follows delivery of the placenta. Breasts typically become noticeably fuller, heavier, and sometimes rock-hard — this is called engorgement, and it usually peaks around days 3–5 and eases within 24–48 hours as your body calibrates to your baby's demand. To manage engorgement: feed or pump frequently (every 2–3 hours), apply a warm compress for a few minutes before feeding to encourage letdown, and use a cold compress after to reduce swelling. For nursing moms, ensuring a deep latch is especially important when breasts are engorged — a shallow latch on a very full breast is painful and inefficient. For pumping moms, pump to comfort (not to empty) during peak engorgement to avoid signaling your body to overproduce. Sources: ABM Protocol #20; LLLI \"Engorgement\"; ABM Protocol #2.",
    escalation: true,
    escalationText:
      "Engorgement that does not improve with frequent feeding or pumping within 48 hours, or that is accompanied by fever above 100.4°F, redness, or a hard lump in one area, may indicate mastitis or a plugged duct. Contact your care provider the same day.",
    sources: "ABM Protocol #20; ABM Protocol #2; LLLI",
  },

  {
    id: "AG-003",
    timing: "Week 1",
    paths: "All paths",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 5–7 days",
    headline: "How to know your baby is getting enough",
    inAppMessage:
      "\"Is my baby getting enough?\" is the most common question new moms have, and the answer lives in three places: diapers, weight, and behavior. Want me to walk you through exactly what to look for this week?",
    learnMore:
      "The most reliable output markers in week one:\n\nDiapers: By day 4–5, expect at least 6 wet diapers and 3–4 yellow seedy stools per 24 hours. Urine should be pale yellow — dark or brick-red (urate crystals) in the first 2–3 days is normal, but should clear by day 4.\n\nWeight: It is normal for newborns to lose up to 7% of birth weight in the first 3–5 days. Most regain birth weight by days 10–14. Your pediatrician will track this at the 2-day and 2-week visits. If your baby has not regained birth weight by 2 weeks, a lactation evaluation is recommended.\n\nBehavior: A well-fed baby will have periods of alertness and will release the breast or bottle spontaneously. A baby who seems constantly hungry, sleepy and hard to wake, or inconsolable after most feedings may not be transferring enough milk.\n\nFor pumping moms: pump output alone is not always a reliable indicator of what a baby would transfer directly. A baby typically extracts more efficiently than a pump in the early weeks. Sources: AAP 2022; ABM Protocol #3; LLLI \"Is My Baby Getting Enough Milk?\"",
    escalation: true,
    escalationText:
      "Contact your pediatrician promptly if: baby has not regained birth weight by 2 weeks, has fewer than 6 wet diapers after day 5, is not waking to feed every 2–3 hours, or seems excessively yellow (jaundiced). These are the main reasons newborns are readmitted in the first 2 weeks.",
    sources: "AAP 2022; ABM Protocol #3; LLLI",
  },

  {
    id: "AG-004",
    timing: "Week 2",
    paths: "Paths A and C",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 12–14 days (nursing paths only)",
    headline: "Nipple pain should be getting better by now",
    inAppMessage:
      "Some nipple tenderness in the first 1–2 weeks is common. By week 2, it should be easing — not getting worse. If latching still hurts, that's worth looking at before it becomes a bigger problem. Want to talk through what might be going on?",
    learnMore:
      "Mild nipple sensitivity is normal in the first 7–10 days as your body adjusts. Persistent or worsening pain after week one — especially pain that shoots, burns, or makes you dread feedings — is almost always a sign that something about the latch or positioning can be improved. The most common causes: latch that's too shallow (baby taking mostly nipple instead of a good portion of areola), a tight frenulum in the baby (tongue tie), or a poor feeding position that puts uneven pressure on the nipple. A good latch should be asymmetric — more areola visible above the nipple than below — and the baby's chin should be pressed into the breast. Pain that persists beyond the first 30–60 seconds of a latch, or that is present throughout the entire feed, is not something to push through. An IBCLC can usually identify and correct the issue in one visit. Sources: ABM Protocol #2; LLLI \"Sore Nipples\"; ABM Protocol #26.",
    escalation: true,
    escalationText:
      "Pain that is getting worse instead of better, cracked or bleeding nipples, white or shiny nipple tips after a feed, or shooting breast pain between feedings are all reasons to see an IBCLC rather than wait.",
    sources: "ABM Protocol #2; ABM Protocol #26; LLLI",
  },

  {
    id: "AG-005",
    timing: "Week 2–3",
    paths: "All paths",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 14–21 days",
    headline: "Get ready: the week 3 growth spurt is coming",
    inAppMessage:
      "Around week 2–3, most babies hit their first major growth spurt. Your baby may seem like they want to eat constantly, act fussier than usual, and make you feel like your supply suddenly disappeared. It didn't. Here's what's actually happening.",
    learnMore:
      "Growth spurts are periods of accelerated developmental growth during which babies increase feeding frequency dramatically — sometimes nursing or feeding every 45–60 minutes for 24–48 hours. This behavior is called cluster feeding, and it's biologically intentional: the baby is signaling your body to increase milk production to meet their growing needs. Common timing: around weeks 2–3, 6–8, and 10–12, with some variation.\n\nWhat to do: follow the baby's cues and feed on demand. Trying to space out feeds during a growth spurt to \"save up\" milk is counterproductive — it signals your body to produce less, not more. For pumping moms, you may need to add one or two pump sessions per day during the spurt. The increased demand is temporary — most cluster feeding phases last 2–4 days.\n\nWhat this is not: a sign that you don't have enough milk, that your milk isn't satisfying enough, or that your baby needs formula. Growth spurts are often the moment families abandon breastfeeding when the real need is just more frequent feeding for a few days. Sources: LLLI \"Growth Spurts\"; ABM Protocol #2.",
    escalation: false,
    escalationText: null,
    sources: "LLLI; ABM Protocol #2",
  },

  {
    id: "AG-006",
    timing: "Week 3",
    paths: "All paths",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 18–21 days",
    headline: "Your supply is being established right now",
    inAppMessage:
      "The first 4–6 weeks are when your body sets its long-term milk production baseline. What you do now — how often you feed or pump, and how completely your breasts are drained — is telling your body how much to make for the entire journey. This is worth understanding.",
    learnMore:
      "Milk supply operates on a supply-and-demand system regulated by the hormone prolactin. In the early weeks, prolactin levels are high and the system is sensitive — frequent, thorough removal of milk sends a strong signal to maintain and increase production. Milk left in the breast signals production to slow. This is why frequent feeding in the first 4–6 weeks is so important: you're not just feeding today's baby, you're calibrating tomorrow's supply.\n\nFor nursing moms: aim for 8–12 feedings per 24 hours. Night feeds matter — prolactin levels are highest between midnight and 6am, so skipping night feeds in this window can meaningfully affect supply.\n\nFor pumping moms: the same principle applies. 8–10 pump sessions per 24 hours in weeks 1–6 establishes a higher baseline than fewer, longer sessions. Once supply is established (usually around weeks 6–10), many moms can reduce session frequency.\n\nFor combo feeding moms: every nursing session or pump session counts. You're not in an either/or situation — every time milk is removed, your body gets the signal. Sources: ABM Protocol #2; ABM Protocol #9; Hale's Medications and Mothers' Milk; LLLI.",
    escalation: false,
    escalationText: null,
    sources: "ABM Protocol #2; ABM Protocol #9; LLLI",
  },

  {
    id: "AG-007",
    timing: "Week 4–6",
    paths: "Paths A and C",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 28–42 days (nursing/combo paths)",
    headline: "Thinking about introducing a bottle? Timing and technique matter",
    inAppMessage:
      "If you're planning to introduce a bottle — so a partner can feed, or for returning to work — the window of weeks 3–6 is often recommended. Too early can interfere with latch; too late and some babies resist. There's also a technique that protects your supply. Want to know more?",
    learnMore:
      "\"Nipple confusion\" — where a baby prefers the bottle and resists the breast — is real but not universal. Bottles flow faster and with less effort than the breast, which can lead some babies to become frustrated with nursing. To reduce this risk:\n\nTiming: most IBCLCs recommend waiting until breastfeeding is well established (usually 3–4 weeks) before introducing a bottle, though some families do it earlier without issue.\n\nPaced bottle feeding: hold the bottle horizontal (not tilted up), let the baby draw the nipple in actively rather than tipping milk in, and allow pauses. This mimics the effort of nursing and slows intake so the baby doesn't overfeed. Feed responsively — stop when the baby shows satiation cues, regardless of how much is left in the bottle.\n\nFor your supply: if you introduce a bottle and miss a nursing session, pump at that same time to maintain the feeding signal to your body.\n\nBottle nipple choice: slow-flow nipples are recommended for breastfed babies regardless of age, to avoid bottle preference from flow rate differences. Sources: ABM Protocol #2; ABM Protocol #10; LLLI \"Introducing a Bottle.\"",
    escalation: false,
    escalationText: null,
    sources: "ABM Protocol #2; ABM Protocol #10; LLLI",
  },

  {
    id: "AG-008",
    timing: "Week 6",
    paths: "Paths A and C",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 40–45 days (nursing/combo paths)",
    headline: "Your breasts may feel softer now — that's a good sign",
    inAppMessage:
      "Around week 6, many nursing moms notice their breasts feel less full, softer, and don't seem to \"fill up\" the same way they used to. This alarms a lot of moms. It almost always means your supply is regulating, not disappearing. Here's why.",
    learnMore:
      "In the early weeks, breasts are producing milk somewhat continuously and often feel noticeably full between feeds. Around weeks 4–6 (timing varies), the supply system shifts: your body transitions from producing milk continuously to producing it more in response to feeding demand — a more efficient, on-demand system. This is called supply regulation.\n\nWhat it feels like: breasts feel softer, less engorged between feeds, and milk may not spray or drip as noticeably. Some moms also stop feeling as strong a letdown sensation.\n\nWhat it isn't: supply dropping. The baby is still getting the same amount of milk — your body is just getting more efficient at producing it on the right schedule. If your baby has normal wet/dirty diapers, is gaining weight appropriately, and seems satisfied after most feeds, your supply is fine.\n\nWhat to watch: if the softening is accompanied by a sudden change in baby's weight gain, diaper output, or behavior at the breast, that's worth checking with your pediatrician or IBCLC. But softness alone, in the context of a thriving baby, is reassuring. Sources: LLLI \"Changes in Milk Production\"; ABM Protocol #2.",
    escalation: false,
    escalationText: null,
    sources: "LLLI; ABM Protocol #2",
  },

  {
    id: "AG-009",
    timing: "Week 6–8",
    paths: "All paths",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 42–56 days",
    headline: "Second growth spurt: this one often catches people off guard",
    inAppMessage:
      "There's another growth spurt coming around weeks 6–8 — and it often hits harder than the first because moms feel like they finally had a routine. Your baby may cluster feed again, seem unsatisfied, and be harder to settle. You've been here before. You can do this again.",
    learnMore:
      "The 6–8 week growth spurt coincides with a significant developmental leap — babies are becoming more visually and socially aware, which also makes them harder to settle at feeds (they're distracted). At the same time, the cluster feeding signal is real: milk demand is increasing. The approach is the same as week 3: feed on demand, don't try to schedule through it, add pump sessions if needed for pumping moms. This growth spurt may last slightly longer — sometimes 3–5 days. The good news: after week 8, growth spurts tend to space out and become easier to ride through. Sources: LLLI \"Growth Spurts\"; ABM Protocol #2.",
    escalation: false,
    escalationText: null,
    sources: "LLLI; ABM Protocol #2",
  },

  {
    id: "AG-010",
    timing: "Week 8–10",
    paths: "All paths",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 56–70 days",
    headline: "Sleep regression + feeding: what to expect",
    inAppMessage:
      "Around 2 months, many babies who were starting to consolidate sleep suddenly start waking more again. This is normal neurological development — not a feeding problem, and not a supply problem. But it affects feeding. Here's what's happening.",
    learnMore:
      "The 8–10 week period often involves a neurological leap that temporarily disrupts sleep patterns. Babies who were sleeping longer stretches may start waking more frequently at night. This is developmental and temporary — it's not caused by hunger, insufficient milk, or anything you're doing wrong.\n\nFor breastfeeding and pumping moms: the return of night waking can feel like a setback, but it's also free supply protection — night feeds stimulate the high-prolactin window. If your baby is waking to feed and feeding well, follow their lead. If you're pumping and your baby suddenly wants more in the middle of the night, add a session if possible.\n\nFor moms who were hoping to drop night feeds around this time: that's a reasonable goal, but the 8–10 week window is often not the right moment. A few more weeks of patience here is usually the path of least resistance. Sources: AAP safe sleep guidelines; LLLI; published infant sleep development literature.",
    escalation: false,
    escalationText: null,
    sources: "AAP safe sleep guidelines; LLLI",
  },

  {
    id: "AG-011",
    timing: "Week 10–12",
    paths: "All paths",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 70–84 days",
    headline: "Third growth spurt — but you know how to handle this now",
    inAppMessage:
      "One more growth spurt around weeks 10–12, and then things typically settle into a more predictable rhythm. You've navigated two of these already. The pattern is the same — but it usually resolves faster now that your supply is well established.",
    learnMore:
      "The 10–12 week growth spurt is typically shorter and less disruptive than the week 3 or week 6–8 spurts, partly because milk supply is more established and responds more efficiently to increased demand. Feed or pump on demand, watch for the usual signs (increased feeding frequency, fussiness, cluster feeding), and expect it to resolve within 2–4 days. After week 12, the breastfeeding relationship often shifts — babies become faster, more efficient feeders, and growth spurts tend to space out to roughly monthly intervals. Many moms describe the 3-month mark as when breastfeeding finally started to feel natural. You're almost there. Sources: LLLI \"Growth Spurts\"; ABM Protocol #2.",
    escalation: false,
    escalationText: null,
    sources: "LLLI; ABM Protocol #2",
  },

  {
    id: "AG-012",
    timing: "Week 12",
    paths: "All paths",
    triggerType: "Time-based",
    triggerCondition: "baby_dob + 80–84 days",
    headline: "Three months in — here's what changes and what doesn't",
    inAppMessage:
      "Three months is a real milestone. Feeding typically gets easier and faster from here. Your body knows what it's doing, your baby is more efficient, and the hardest adjustment period is behind you. Want to know what to expect in the next chapter?",
    learnMore:
      "After 3 months, several things typically shift:\n\nFeeding efficiency: babies become faster feeders — sessions that took 30–40 minutes in the early weeks often take 10–15 minutes by month 3. This is normal and not a sign of disinterest or reduced milk transfer.\n\nDistraction: babies become more aware of their surroundings and may pop on and off frequently during feeds. Feeding in quieter environments or using a nursing cover can help for easily distracted babies.\n\nSupply stability: for most moms, supply is well-calibrated by 3 months and is unlikely to drop dramatically without a significant change in feeding frequency. Continuing to feed or pump consistently protects supply going forward.\n\nSolids reminder: the AAP recommends waiting until 6 months (26 weeks) to introduce solid foods for most babies — breast milk or formula should be the primary nutrition until that point. Introducing solids too early can reduce milk intake and supply.\n\nWeaning eventually: when you're ready, gradual weaning — dropping one feed every few days — is gentler on your body and your baby than stopping abruptly. Sources: AAP 2022; ABM Protocol #2; LLLI.",
    escalation: false,
    escalationText: null,
    sources: "AAP 2022; ABM Protocol #2; LLLI",
  },

  // ─── EVENT-BASED ───────────────────────────────────────────────────────────

  {
    id: "AG-013",
    timing: "Return to work (6–12 weeks)",
    paths: "All paths (pump_model set)",
    triggerType: "Event-based",
    triggerCondition: "pump_model is set AND baby approaching 6–12 weeks",
    headline: "Returning to work soon? Let's make a pumping plan",
    inAppMessage:
      "Returning to work while breastfeeding or pumping is doable — but it goes better with a plan made before your first day back, not after. Want to walk through the key things to set up now?",
    learnMore:
      "Key things to address before your first day back:\n\nBuild a freezer stash: start 2–3 weeks before return. Pump once per day after your first morning feed (when output is typically highest) to accumulate a buffer. You don't need a huge stash — 3–5 days' worth is a good working buffer.\n\nPump at work: under the PUMP Act (2022), most US employers must provide reasonable break time and a private space (not a bathroom) for pumping. Know your rights before you need them. Plan for pump sessions roughly every 3 hours during your work hours — this mirrors your baby's feeding pattern and protects supply.\n\nPump bag and supplies: double-check that your pump is fully functional, you have enough flanges and backups for spare parts, and you have a cooler or access to refrigeration at work.\n\nTiming and storage: freshly pumped milk keeps at room temperature for up to 4 hours, in the refrigerator for up to 4 days, and in the freezer for up to 6 months at 0°F. Label bags with date and time.\n\nThe first week back is often the hardest emotionally. Many moms feel anxious about supply. The best protection: pump consistently at work, nurse or pump on your normal schedule on non-work days, and give yourself a few weeks before drawing conclusions about supply. Sources: CDC human milk storage guidelines; US PUMP Act 2022; ABM Protocol #2.",
    escalation: false,
    escalationText: null,
    sources: "CDC milk storage guidelines; US PUMP Act 2022; ABM Protocol #2",
  },

  {
    id: "AG-014",
    timing: "2-week pediatrician visit window",
    paths: "All paths",
    triggerType: "Event-based",
    triggerCondition: "baby_dob + 12–14 days (visit reminder)",
    headline: "2-week visit coming up — here's what to ask about feeding",
    inAppMessage:
      "Your baby's 2-week visit is one of the most important feeding checkpoints. The pediatrician will weigh your baby and assess whether birth weight has been regained. Here's what to ask so you get the most out of 10 minutes.",
    learnMore:
      "Questions worth asking at the 2-week visit:\n\n— Has my baby regained their birth weight? If not, by what date should I expect it, and what should I do in the meantime?\n— Is the current diaper output normal for their age and feeding pattern?\n— Is there anything in their latch or weight gain pattern that suggests I should see a lactation consultant?\n— What weight gain rate should I expect over the next 4 weeks? (Typical: 5–7 oz/week in months 1–3)\n— If you're formula supplementing: is this amount appropriate, and how do I know when to reduce or stop?\n\nTip: bring a feeding log or share your Latched feeding data if you've been tracking. Pediatricians work faster and better with concrete data. Sources: AAP 2022; ABM Protocol #3.",
    escalation: true,
    escalationText:
      "If your baby has not regained birth weight by the 2-week visit, ask specifically what the plan is and what threshold would prompt a lactation referral. Don't leave without a clear timeline and follow-up plan.",
    sources: "AAP 2022; ABM Protocol #3",
  },

  {
    id: "AG-015",
    timing: "2-month pediatrician visit window",
    paths: "All paths",
    triggerType: "Event-based",
    triggerCondition: "baby_dob + 56–60 days (visit reminder)",
    headline: "2-month visit: feeding questions worth bringing",
    inAppMessage:
      "The 2-month visit is mostly focused on vaccines, but it's also a good checkpoint for feeding. Your baby's weight gain will be reviewed. Here are a few things worth asking while you have the pediatrician's attention.",
    learnMore:
      "Questions for the 2-month visit:\n\n— Is growth on track? (Ask to see the growth curve percentile, not just today's weight.)\n— My baby seems to feed more often some days than others — is that normal? (Yes, usually.)\n— Any concerns about my feeding method (nursing / pumping / combo) at this stage?\n— If introducing a bottle: any signs of preference issues or feeding aversion to watch for?\n— Is my baby's development consistent with their feeding pattern?\n\nAt this visit, pediatricians are also screening for postpartum depression in mothers. If you're struggling — with feeding, mood, or both — say so directly. You deserve support, and the pediatrician can connect you with resources. Sources: AAP 2022; ABM Protocol #3.",
    escalation: false,
    escalationText: null,
    sources: "AAP 2022; ABM Protocol #3",
  },

  {
    id: "AG-016",
    timing: "Any time",
    paths: "All paths",
    triggerType: "Event-based (chat signal)",
    triggerCondition: "User mentions low supply, not enough milk, supply dropping, or similar",
    headline: "Worried about supply? Let's look at what's actually happening",
    inAppMessage:
      "Concerns about supply are one of the most common reasons moms stop breastfeeding earlier than they wanted to — and most of the time, the supply is actually fine. But some supply concerns are real and worth acting on. Let's figure out which situation you're in.",
    learnMore:
      "The most reliable indicators of adequate supply are your baby's output and weight — not how your breasts feel, how much you pump, or whether your baby \"seems hungry.\" If your baby has 6+ wet diapers per day, 3+ stools (in the first 6 weeks), and is gaining appropriately at weight checks, your supply is almost certainly adequate.\n\nCommon reasons moms perceive low supply that aren't actually supply issues: breasts feel softer after supply regulates (week 4–6), baby feeds more frequently during growth spurts, baby doesn't sleep long stretches (not a supply problem), pump output feels low (pump output ≠ feeding output).\n\nActual supply challenges are less common but do exist. Risk factors include: previous breast surgery, hypoplastic breasts, delayed or infrequent feeding in the first weeks, retained placenta, hormonal conditions (PCOS, thyroid), significant bleeding or hemorrhage at delivery.\n\nIf you're concerned: the most productive first step is a weighted feed or an IBCLC consultation — not adding formula without a plan, and not dramatically changing your feeding pattern based on how full or empty your breasts feel. Sources: ABM Protocol #2; ABM Protocol #9; \"Making More Milk\" (Marasco & West); LLLI.",
    escalation: true,
    escalationText:
      "If your baby is not gaining weight appropriately, has fewer than 6 wet diapers per day after day 5, or seems lethargic and hard to rouse, contact your pediatrician the same day. These are the signs of actual insufficient intake, not perceived low supply.",
    sources: "ABM Protocol #2; ABM Protocol #9; Marasco & West; LLLI",
  },

  {
    id: "AG-017",
    timing: "Any time",
    paths: "Paths A and C",
    triggerType: "Event-based (chat signal)",
    triggerCondition: "User mentions nipple pain, breast pain, sore, cracked, or bleeding",
    headline: "Pain during feeding: let's figure out what's going on",
    inAppMessage:
      "Pain during nursing is common — but it's not something you're supposed to just push through. Most pain has a fixable cause. Tell me more about what you're feeling and when, and I can help narrow it down.",
    learnMore:
      "Pain during breastfeeding falls into a few distinct categories:\n\nLatch-related pain: sharp pain at latch-on that fades within the first minute is often positional and correctable. Pain that persists throughout the entire feed is usually a deeper latch issue, often involving the baby not taking enough breast tissue or an asymmetric latch. An IBCLC can usually identify and correct this in one visit.\n\nTongue tie: if latch corrections aren't helping, a tight frenulum (tongue tie or lip tie) in the baby may be restricting their range of motion at the breast. Assessment by an IBCLC or ENT familiar with infant oral function is appropriate.\n\nThrush: burning or shooting pain during or between feeds, shiny or white nipple tips, or an itchy nipple are signs of a yeast infection (thrush). Baby may also have white patches in the mouth that don't wipe off. Thrush requires treatment for both mom and baby simultaneously — see your OB and your baby's pediatrician.\n\nVasospasm: white, then blue or purple nipple discoloration after feeds with burning or throbbing pain is vasospasm, often triggered by cold. This is treatable.\n\nMastitis: painful, warm, hard area in the breast with flu-like symptoms and possibly fever — see your provider the same day.\n\nSources: ABM Protocol #26; ABM Protocol #2; LLLI \"Sore Nipples.\"",
    escalation: true,
    escalationText:
      "If you have a hard, warm, painful area in the breast with fever or flu-like symptoms, contact your care provider the same day — this may be mastitis, which requires treatment. Don't wait to see if it resolves on its own.",
    sources: "ABM Protocol #26; ABM Protocol #2; LLLI",
  },

  {
    id: "AG-018",
    timing: "Weeks 2–6",
    paths: "Paths A and C",
    triggerType: "Time-based + profile-based",
    triggerCondition: "baby_dob + 14–42 days, nursing/combo paths",
    headline: "Mastitis: the warning signs every nursing mom should know now",
    inAppMessage:
      "Mastitis — a breast infection — most commonly strikes in the first 2–6 weeks. Most moms who get it didn't see it coming. Knowing the early signs can get you treated faster and back to feeding sooner. Want to know what to watch for?",
    learnMore:
      "Mastitis is an inflammation of breast tissue, usually involving infection. It affects roughly 10% of breastfeeding moms, most commonly in weeks 2–6 but possible any time.\n\nEarly warning signs (don't wait to act):\n— A localized area of redness, warmth, or hardness in one breast\n— Breast pain that feels different from normal fullness or engorgement\n— Flu-like symptoms: fatigue, body aches, chills — these often precede the breast symptoms\n— Fever above 100.4°F\n\nWhat to do immediately:\n— Keep feeding or pumping. Stopping makes mastitis worse. The breast needs to be emptied regularly.\n— Rest (genuinely), stay hydrated, and take ibuprofen to manage inflammation and fever\n— Apply warm compress before feeds to encourage milk flow\n— Contact your OB or care provider the same day — most mastitis requires antibiotics\n\nMastitis is not a reason to stop breastfeeding. Milk is safe for the baby even during infection. Sources: ABM Protocol #36 (mastitis); ABM Protocol #2; LLLI.",
    escalation: true,
    escalationText:
      "Mastitis requires same-day contact with your care provider. Untreated mastitis can progress to a breast abscess, which is much harder to treat. If you have fever, breast redness, and flu-like symptoms, call your OB today — don't wait for a scheduled appointment.",
    sources: "ABM Protocol #36; ABM Protocol #2; LLLI",
  },

  // ─── PATH B SPECIFIC ───────────────────────────────────────────────────────

  {
    id: "AG-019",
    timing: "Day 1–3",
    paths: "Path B only",
    triggerType: "Profile-based",
    triggerCondition: "feeding_preference = exclusive_pumping, baby_dob + 0–3 days",
    headline: "Setting up your pump schedule: what matters most right now",
    inAppMessage:
      "If you're exclusively pumping, the schedule you set in the first few weeks directly affects your long-term supply. The timing and frequency matter more than duration right now. Here's what to aim for.",
    learnMore:
      "For exclusive pumpers, the first 6 weeks are the supply-establishment window — what you do now calibrates your baseline.\n\nFrequency targets:\n— Weeks 1–2: aim for 8–10 pump sessions per 24 hours. Yes, this includes at least one overnight session (typically around 3am) when prolactin is highest.\n— Weeks 3–6: you can gradually reduce to 7–8 sessions as supply establishes, if output is where you want it.\n— After week 6–8: many moms can reduce to 6–7 sessions once supply is regulated.\n\nDuration: pump until the milk slows significantly, then 2 more minutes (\"pumping to empty\" matters more than watching a clock). Most sessions run 15–20 minutes on each side.\n\nSingle vs. double pump: double pumping is strongly preferred — it is more effective, takes half the time, and produces higher prolactin stimulation. If you only have a single pump, prioritize getting a double.\n\nHands-on pumping: using breast compression while pumping increases output by 25–50% in studies. Compress and massage one breast at a time while the pump runs.\n\nSources: ABM Protocol #32 (exclusive pumping); Hale's Medications and Mothers' Milk; published exclusive pumping literature.",
    escalation: false,
    escalationText: null,
    sources: "ABM Protocol #32; published EP literature",
  },

  {
    id: "AG-020",
    timing: "Week 1–2",
    paths: "Path B only",
    triggerType: "Profile-based",
    triggerCondition: "feeding_preference = exclusive_pumping, baby_dob + 7–14 days",
    headline: "Flange size: your pump output depends on getting this right",
    inAppMessage:
      "Flange size is one of the most commonly missed variables in pumping — and wrong sizing causes both lower output and nipple pain. Most moms are using the wrong size. Here's how to check.",
    learnMore:
      "Flanges (also called breast shields) are the funnel-shaped pieces that fit over your nipple and areola. If the tunnel diameter is wrong, the pump can't create effective suction and your nipple can be damaged.\n\nHow to measure: use a ruler to measure the diameter of your nipple at its base (not the areola). The flange tunnel diameter should be 1–2mm larger than your nipple diameter. Most pumps come with 24mm and 27mm flanges; nipple diameters typically range from 13mm to 21mm. Many moms need a smaller flange than what comes in the box.\n\nSigns your flange is too large: areola is being pulled into the tunnel, pinching sensation during pumping, low output.\nSigns your flange is too small: nipple rubs against the tunnel walls, friction or pain, limited nipple movement.\n\nBreast size and flange size are unrelated. A mom with larger breasts may need a smaller flange and vice versa. Nipples can also change size slightly over the course of pumping — recheck sizing if output drops or pain develops.\n\nMany pump brands offer additional sizes. An IBCLC specializing in pumping can measure and fit flanges in a single visit. Sources: Flange sizing guidance from Medela, Spectra, Elvie, and Motif; ABM Protocol #32; published pumping literature.",
    escalation: false,
    escalationText: null,
    sources: "ABM Protocol #32; manufacturer sizing guides; IBCLC consensus",
  },

  {
    id: "AG-021",
    timing: "Any time (when output is lower than desired)",
    paths: "Path B only",
    triggerType: "Event-based (chat signal or supply concern)",
    triggerCondition: "feeding_preference = exclusive_pumping, supply concern mentioned",
    headline: "Power pumping: what it is and when it actually helps",
    inAppMessage:
      "Power pumping is a technique used to simulate cluster feeding — it sends a strong demand signal to your body to increase supply. It's not magic, and it won't help every situation. But if your supply has plateaued and your schedule and flange size are already dialed in, it's worth understanding.",
    learnMore:
      "Power pumping mimics the cluster feeding a nursing baby does during a growth spurt. One common protocol: pump 20 minutes, rest 10, pump 10, rest 10, pump 10 — 60 minutes total, replacing one regular pump session. Do this once per day for 3–7 consecutive days.\n\nWhen power pumping helps: when supply has plateaued despite adequate session frequency and good flange fit; during or after illness or a significant reduction in sessions; after a period of stress or poor sleep that temporarily reduced output.\n\nWhen it doesn't help: if the underlying issue is anatomical (IGT, breast surgery) or hormonal, power pumping cannot override that. If flange size is wrong, power pumping with poor fit will cause pain and may not help output.\n\nBefore trying power pumping: confirm flange size is correct, confirm session frequency is at least 7–8 per 24 hours, and confirm you're pumping to empty each session. These are more reliably effective than power pumping alone.\n\nSources: ABM Protocol #32; published exclusive pumping literature.",
    escalation: false,
    escalationText: null,
    sources: "ABM Protocol #32; published EP literature",
  },

  {
    id: "AG-022",
    timing: "Week 4+",
    paths: "Path B only",
    triggerType: "Time-based",
    triggerCondition: "feeding_preference = exclusive_pumping, baby_dob + 28 days",
    headline: "Freezer stash: what a healthy buffer actually looks like",
    inAppMessage:
      "A lot of pumping moms feel like they need a huge freezer stash to feel secure. The anxiety about the stash can take over. Here's a more grounded way to think about it.",
    learnMore:
      "A freezer stash is a safety buffer — not a measure of success or how much you love your baby. Most families don't need a massive stash, and obsessing over building it can lead to oversupply issues.\n\nA functional buffer: 3–5 days of your baby's daily intake is a realistic and adequate working stash for most families. At 8 weeks, a baby typically takes 3–4 oz per feed and feeds 8–10 times per day — roughly 25–30 oz/day. A buffer of 75–150 oz is genuinely protective without requiring heroic pumping effort.\n\nHow to build it without burning out: if you're consistently making slightly more than your baby needs, freeze the daily surplus rather than adding extra sessions. One extra pump session per day after the first morning feed (typically the highest-output session) is a sustainable approach.\n\nOversupply is its own problem: moms who pump aggressively beyond demand can develop chronic engorgement, recurrent plugged ducts, and mastitis. Bigger is not always better.\n\nStorage math: milk in the back of a chest freezer at 0°F keeps for up to 12 months. Label each bag with date and volume. Rotate older bags to the front.\n\nSources: CDC human milk storage guidelines; ABM Protocol #32.",
    escalation: false,
    escalationText: null,
    sources: "CDC milk storage guidelines; ABM Protocol #32",
  },

  // ─── PROFILE / ANATOMY-BASED ───────────────────────────────────────────────

  {
    id: "AG-023",
    timing: "Week 1",
    paths: "All paths",
    triggerType: "Profile-based",
    triggerCondition: "breast_anatomy contains breast_reduction OR hypoplastic_breasts",
    headline: "A note about your anatomy and supply — worth knowing early",
    inAppMessage:
      "Based on what you shared about your breast anatomy, you may want to monitor your supply more closely in the first two weeks than the average mom. This doesn't mean something will go wrong — but catching any concerns early makes them much more manageable.",
    learnMore:
      "Both breast reduction surgery and hypoplastic/tubular breasts (Insufficient Glandular Tissue, or IGT) can affect the amount of milk-producing tissue available and the nerve pathways that drive the letdown reflex.\n\nBrest reduction: the most common supply risk of any breast surgery. Outcomes depend heavily on the surgical technique — pedicle-based procedures that preserved the nipple attachment tend to have better outcomes than free nipple grafts. Some moms after reduction achieve full supply; many produce partial supply and successfully combo feed.\n\nHypoplastic breasts / IGT: the breast tissue present may simply produce less milk than a baby requires, and this often does not respond to increased feeding frequency or pumping the way typical low supply does. Signs that may suggest IGT include widely spaced breasts, disproportionately large areolas, a tubular breast shape, and minimal breast growth during pregnancy.\n\nFor both situations: the most important steps are (1) work with an IBCLC in the first week — don't wait to see if supply is adequate; (2) monitor infant weight closely at the 5-day and 2-week checks; (3) have a combo feeding plan ready as a real and valid option, not a fallback.\n\nSources: ABM Protocol #2; ABM Protocol #9; Marasco & West \"Making More Milk\"; published IGT literature.",
    escalation: true,
    escalationText:
      "If your baby is not regaining birth weight by day 10–12 or is showing signs of insufficient intake (fewer than 6 wet diapers, lethargic, not back to birth weight by 2 weeks), see an IBCLC and your pediatrician the same week — earlier than you might otherwise. Early intervention protects both supply and your baby's growth.",
    sources: "ABM Protocol #2; ABM Protocol #9; Marasco & West; published IGT literature",
  },

  {
    id: "AG-024",
    timing: "Day 1–2",
    paths: "Paths A and C",
    triggerType: "Profile-based",
    triggerCondition: "breast_anatomy contains flat_nipples OR inverted_nipples, nursing/combo paths",
    headline: "Getting a latch with flat or inverted nipples: a heads up before day one",
    inAppMessage:
      "Getting a latch established with flat or inverted nipples can take a little more effort than average — but many moms do it successfully. Knowing a few techniques before you're in the delivery room makes a real difference.",
    learnMore:
      "Flat or inverted nipples make it harder for the baby to get a clear latch target, but they don't prevent breastfeeding. Effective techniques:\n\nDraw out the nipple before latching: use a pump on the lowest setting for 1–2 minutes immediately before a feed. This temporarily elongates the nipple and gives the baby something to latch onto. Hoffman's exercises (gentle stretching) can also help, though evidence is mixed.\n\nBreast sandwich: compress the breast tissue to create a more defined shape — like compressing a hamburger before taking a bite. This helps the baby get a deeper, more complete mouthful.\n\nNipple shield: a silicone shield worn over the nipple provides a firmer target for the baby to latch onto. Use with IBCLC guidance to confirm correct size and adequate milk transfer — shields can reduce milk flow if used incorrectly. They are a bridge tool, not a forever solution.\n\nPositioning: the football hold gives you the most control over the baby's head positioning and approach angle, which is especially useful with latch challenges.\n\nFor inverted nipples: the degree of inversion matters. Grade 1 (inverts but can be pulled out) responds well to the techniques above. Grade 3 (deeply inverted, does not evert) almost always benefits from IBCLC involvement from the first day — ideally a prenatal consultation.\n\nSources: ABM Protocol #2; ABM Protocol #11; LLLI latch guidance.",
    escalation: true,
    escalationText:
      "If you have deeply inverted nipples (grade 3) or if latching is not improving by day 3–4 despite trying these techniques, request a lactation consult in the hospital before discharge. The earlier the intervention, the better the outcome.",
    sources: "ABM Protocol #2; ABM Protocol #11; LLLI",
  },

  {
    id: "AG-025",
    timing: "Week 1",
    paths: "All paths",
    triggerType: "Profile-based",
    triggerCondition: "breast_anatomy contains breast_implants OR breast_augmentation",
    headline: "A note about breastfeeding and your implants",
    inAppMessage:
      "Most moms with breast implants breastfeed successfully, but the surgical history matters more than the implants themselves. Here's what's worth knowing — and what to watch for — in the first couple of weeks.",
    learnMore:
      "Whether breast implants affect supply depends primarily on the surgical approach, not the implants themselves:\n\nIncision type matters most: periareolar incisions (around the areola) carry the highest risk of disrupting milk ducts and the nerves responsible for letdown. Inframammary (breast fold) and axillary (armpit) incisions carry lower risk.\n\nImplant placement: subglandular implants (over the muscle, directly under breast tissue) sit closest to glandular tissue and may compress it, potentially reducing functional tissue. Submuscular implants (under the pectoralis muscle) are further from glandular tissue and generally associated with lower breastfeeding impact.\n\nWhat to do: tell your IBCLC and your baby's pediatrician about your implant history before birth. Most will recommend closer supply and weight monitoring in the first 1–2 weeks rather than assuming everything is fine. Many moms with implants achieve full supply — but discovering a supply challenge at 3 weeks instead of 1 week costs valuable time.\n\nYou can find your surgical details (incision type, implant placement, implant type) in your plastic surgeon's records if you don't remember them.\n\nSources: ABM Protocol #2; published literature on breast implants and lactation (Semple et al.; Jewell et al.).",
    escalation: true,
    escalationText:
      "Ask your IBCLC or pediatrician to monitor supply and weight gain more closely in the first two weeks if you have implants. Don't wait for a weight gain concern to come up at the scheduled 2-week visit — request a weight check at day 5–7 if possible.",
    sources: "ABM Protocol #2; published implants and lactation literature",
  },
];
