// Milestone Memory Library — content data
// Each entry: id, name, category, paths, triggerType, triggerCondition,
//             acknowledgment, shareCard, designNote

module.exports = [

  // ─── CATEGORY 1: TIME-BASED MILESTONES ────────────────────────────────────

  {
    id: "ML-001",
    name: "First 24 hours complete",
    category: "Time-based",
    paths: "All paths",
    triggerType: "Automatic",
    triggerCondition: "baby_dob + 24 hours",
    acknowledgment:
      "You just got through the first 24 hours. Whether you're still in the hospital or already home, this was the hardest day — your body was figuring it out, your baby was figuring it out, and nobody had any certainty about how it was going to go. You kept going anyway. That counts.",
    shareCard:
      "Day one is done. My baby is fed and so am I.",
    designNote:
      "Fire once, silently (no push notification). Surfaces the next time mom opens the app within the first 48 hours. Tone: quiet acknowledgment, not celebration — day one often feels hard, not triumphant."
  },

  {
    id: "ML-002",
    name: "One week in",
    category: "Time-based",
    paths: "All paths",
    triggerType: "Automatic",
    triggerCondition: "baby_dob + 7 days",
    acknowledgment:
      "One week. Do you know how many people don't make it to one week? A lot. The first week of feeding a newborn is genuinely one of the hardest things — the learning curve is steep, sleep is gone, and your body is healing at the same time. You've been feeding your baby for seven days straight. That's not small.",
    shareCard:
      "One week of feeding my baby. Every single day.",
    designNote:
      "Good candidate for the first milestone that surfaces a 'look back' callback if there is prior chat history — e.g., 'A week ago you said [thing from day 1]. Look where you are now.'"
  },

  {
    id: "ML-003",
    name: "Two weeks in — birth weight milestone",
    category: "Time-based",
    paths: "All paths",
    triggerType: "Automatic + optional confirmation",
    triggerCondition: "baby_dob + 14 days; optionally gated on user confirming birth weight regained at 2-week visit",
    acknowledgment:
      "Two weeks. Your baby has (most likely) regained their birth weight, which means your body has been their entire food source and it's working. Every middle-of-the-night session, every engorged morning, every time you weren't sure it was enough — it was enough. Your baby is growing.",
    shareCard:
      "Two weeks in. My baby is back to their birth weight and then some.",
    designNote:
      "If birth-weight-regained is confirmed via chat or user input, message should reference it explicitly: 'Your baby is back to their birth weight.' If not confirmed, use hedged language: 'Your baby has (most likely) regained...' Do not state it as fact without confirmation."
  },

  {
    id: "ML-004",
    name: "One month",
    category: "Time-based",
    paths: "All paths",
    triggerType: "Automatic",
    triggerCondition: "baby_dob + 30 days",
    acknowledgment:
      "One month. The version of you who left the hospital did not know if you could do this for a month. Now you know. You've been your baby's food source for thirty days — through the engorgement, through the growth spurts, through whatever hard thing happened in the middle that you got through anyway. A month is real.",
    shareCard:
      "One month of feeding my baby. I wasn't sure I could do it. I did.",
    designNote:
      "This is the milestone most moms explicitly set as a goal in the first week. If the user mentioned a specific goal in chat (e.g., 'I just want to make it a month'), this message should reference it directly."
  },

  {
    id: "ML-005",
    name: "Six weeks",
    category: "Time-based",
    paths: "All paths",
    triggerType: "Automatic",
    triggerCondition: "baby_dob + 42 days",
    acknowledgment:
      "Six weeks. This is the milestone that gets set in week one when everything feels impossible and you're just trying to find a number you can survive to. You made it here. The hardest physiological adjustment period is behind you. Your body and your baby have figured each other out in ways that weren't true a month ago. Whatever happens from here — you got here.",
    shareCard:
      "Six weeks. This was the goal I set when I wasn't sure I could. I made it.",
    designNote:
      "Six weeks is the single most-cited goal milestone in early breastfeeding research. High emotional resonance. Good candidate for the share mechanic — 'Send this to someone who's been cheering you on.'"
  },

  {
    id: "ML-006",
    name: "Two months",
    category: "Time-based",
    paths: "All paths",
    triggerType: "Automatic",
    triggerCondition: "baby_dob + 60 days",
    acknowledgment:
      "Two months. Your baby is different than they were at birth — more alert, more themselves — and you've been feeding them every step of the way. You've figured out each other's rhythms. You've made it through at least two growth spurts. Whatever the early weeks threw at you, you've adapted. That took time and patience and more nights than you can count.",
    shareCard:
      "Two months in. We've got each other figured out.",
    designNote: "Can optionally surface a 'remember when' callback if chat history includes a day-1 or week-1 message."
  },

  {
    id: "ML-007",
    name: "Three months — the click",
    category: "Time-based",
    paths: "All paths",
    triggerType: "Automatic",
    triggerCondition: "baby_dob + 84 days",
    acknowledgment:
      "Three months. Most moms who make it here say — later, looking back — that this was when it finally clicked. When feeding started to feel less like a thing they were doing and more like something that just... belonged to them and their baby. You might be there already. You might get there next week. Either way: three months is yours. You earned it.",
    shareCard:
      "Three months of breastfeeding. This is when people say it finally clicks. I think I understand what they meant.",
    designNote:
      "Three months is the research-backed inflection point where breastfeeding confidence scores improve sharply. Highest-signal milestone for retention — moms who reach 3 months continue at a much higher rate. Premium treatment in the UI: slightly more prominent than other milestones."
  },

  {
    id: "ML-008",
    name: "Six months — AAP milestone",
    category: "Time-based",
    paths: "All paths",
    triggerType: "Automatic",
    triggerCondition: "baby_dob + 180 days",
    acknowledgment:
      "Six months. Six months of your body being your baby's food source — or a major part of it. The AAP recommends exclusive breastfeeding for six months; pediatricians cite it as a landmark. But you weren't doing it for the recommendation. You were doing it for your baby, one day at a time, and you made it half a year. That's not nothing. That's actually everything.",
    shareCard:
      "Six months of feeding my baby. Half a year. I didn't count the days — I just kept going.",
    designNote:
      "Note: if user is combo feeding, the message should acknowledge that explicitly — 'six months of your body being a major part of your baby's food source' rather than 'entire food source.' Feeding preference flag should be read at trigger time."
  },

  // ─── CATEGORY 2: FEEDING EVENT MILESTONES ────────────────────────────────

  {
    id: "ML-009",
    name: "First successful latch",
    category: "Feeding event",
    paths: "Paths A and C",
    triggerType: "Chat-detected or manual",
    triggerCondition: "User mentions first latch, latch finally worked, latched for the first time, or similar language",
    acknowledgment:
      "There it is. Your baby just latched — really latched. That sound, or that feeling, or that look on their face — that's what you were working toward. The early latching stage is one of the technically hardest parts of nursing, and you got through it. It will be easier from here.",
    shareCard:
      "My baby latched for the first time. We figured it out.",
    designNote:
      "This milestone may fire in the first hours or days, or it may fire weeks later after latch challenges. The message should feel the same either way — relief, not judgment. If the user mentions it took weeks, consider adding: 'It took as long as it took. You stayed with it.'"
  },

  {
    id: "ML-010",
    name: "First growth spurt survived",
    category: "Feeding event",
    paths: "All paths",
    triggerType: "Automatic (time-based proxy)",
    triggerCondition: "baby_dob + 21–24 days (after week 2–3 growth spurt window closes)",
    acknowledgment:
      "Growth spurt: done. You just got through a few days of your baby acting like they'd completely forgotten how to be satisfied — wanting to eat constantly, fussier than usual, making you feel like your supply had disappeared. It hadn't. Your supply heard the message loud and clear. Your body just calibrated up.",
    shareCard:
      "First growth spurt: survived. My body figured it out.",
    designNote:
      "Growth spurt milestones are proxy-based (we can't know for certain if the user experienced one). Use gentle phrasing: 'If you just came through a cluster feeding stretch...' Consider making this user-confirmable rather than purely automatic."
  },

  {
    id: "ML-011",
    name: "Second growth spurt survived",
    category: "Feeding event",
    paths: "All paths",
    triggerType: "Automatic (time-based proxy)",
    triggerCondition: "baby_dob + 56–60 days (after week 6–8 growth spurt window closes)",
    acknowledgment:
      "Second growth spurt behind you. This one probably still surprised you — even though you'd been through it before — because each one is its own thing. But notice: you knew what it was. You knew it was temporary. You kept going. That's different from week three. You've learned your baby.",
    shareCard:
      "Second growth spurt, done. Getting better at reading what my baby needs.",
    designNote: "The growth-spurt-to-growth-spurt callback is intentional — it reinforces learning and progress across the journey, not just at this moment."
  },

  {
    id: "ML-012",
    name: "First bottle of pumped milk",
    category: "Feeding event",
    paths: "All paths (pump users)",
    triggerType: "Chat-detected or manual",
    triggerCondition: "User mentions partner feeding / someone else gave a bottle / first bottle, or pump_model is set and baby_dob + 21+ days",
    acknowledgment:
      "Someone else just fed your baby with something you made. Think about that for a second. You pumped that. Your body made it. And now someone who loves your baby got to be part of feeding them. That's not a backup plan — that's your system working.",
    shareCard:
      "My partner just fed our baby with milk I pumped. Team effort.",
    designNote:
      "For Path B (exclusive pumping) moms, this message should acknowledge that every feed has been pumped milk — adjust message accordingly: 'Every bottle your baby has had has been something you made. That's the whole story.'"
  },

  {
    id: "ML-013",
    name: "First time feeding outside home",
    category: "Feeding event",
    paths: "All paths",
    triggerType: "Chat-detected",
    triggerCondition: "User mentions feeding at a restaurant, in public, at someone's house, in the car, outside, etc.",
    acknowledgment:
      "You fed your baby outside your house. Maybe in a restaurant booth. Maybe in the car in a parking lot. Maybe at someone's kitchen table while the rest of the meal happened around you. The world kept moving and so did you. That's worth noting.",
    shareCard:
      "Fed my baby out in the world today. We're getting the hang of this.",
    designNote:
      "This milestone is pure positive reinforcement — no clinical weight, no escalation. Keep it warm and brief. The message should feel like a friend saying 'good for you' without making it into more than it is."
  },

  {
    id: "ML-014",
    name: "Through a nursing strike",
    category: "Feeding event",
    paths: "Paths A and C",
    triggerType: "Chat-detected",
    triggerCondition: "User mentions nursing strike resolved, baby is nursing again, baby finally latched after refusing",
    acknowledgment:
      "Nursing strikes are the kind of thing that ends a lot of feeding journeys — because they feel personal, because the rejection is disorienting, because it is so hard to keep showing up when your baby keeps turning away. You figured it out. You didn't take it personally (or you did, and you showed up anyway). Your baby is nursing again.",
    shareCard:
      "We got through a nursing strike. My baby is nursing again.",
    designNote:
      "Nursing strike is emotionally high-stakes — some moms experience it as rejection or failure. The message should name that directly without amplifying it. The phrase 'you did, and you showed up anyway' is an acknowledgment that it's okay to have struggled emotionally."
  },

  // ─── CATEGORY 3: CHALLENGES OVERCOME ─────────────────────────────────────

  {
    id: "ML-015",
    name: "Survived mastitis and kept going",
    category: "Challenge overcome",
    paths: "Paths A and C",
    triggerType: "Chat-detected",
    triggerCondition: "User mentions mastitis resolved, antibiotics finished, feeling better after mastitis",
    acknowledgment:
      "You had mastitis. You felt like you'd been hit by a truck — because you basically had been — and you kept feeding or pumping through it, which is the exact thing nobody tells you is both the treatment and the hardest possible thing to do when you're that sick. You kept your baby fed and you kept your supply going. That's a serious thing you just did.",
    shareCard:
      "Had mastitis. Kept going anyway. Supply intact.",
    designNote:
      "Mastitis is one of the most commonly cited reasons moms stop breastfeeding earlier than intended. Acknowledging the difficulty explicitly and naming what they did right (kept feeding/pumping) is more valuable than generic encouragement. Only fire if user explicitly mentions mastitis — do not proxy from fever or breast pain mentions alone."
  },

  {
    id: "ML-016",
    name: "Supply regulated — past engorgement",
    category: "Challenge overcome",
    paths: "All paths",
    triggerType: "Automatic (time-based)",
    triggerCondition: "baby_dob + 42–50 days (supply regulation window)",
    acknowledgment:
      "Your supply just regulated — or it's in the process of doing it. A few weeks ago your breasts were unpredictably full, sometimes rock-hard, sometimes alarming. Now your body has figured out the schedule. It's producing what your baby needs, roughly when they need it. You and your baby calibrated this together. That took weeks of consistent feeding and patience, and it worked.",
    shareCard:
      "My body figured out the schedule. Supply regulated. We're in sync now.",
    designNote:
      "This milestone pairs well with AG-008 (the supply regulation anticipatory message). If the user received AG-008 earlier and was reassured by it, this milestone closes the loop: 'Remember when your breasts started feeling softer and we talked about why? That process is done.'"
  },

  {
    id: "ML-017",
    name: "Kept supply through illness",
    category: "Challenge overcome",
    paths: "All paths",
    triggerType: "Chat-detected",
    triggerCondition: "User mentions being sick and continuing, supply survived illness, pumping while sick",
    acknowledgment:
      "You were sick — really sick — and you kept feeding or pumping anyway. That is genuinely hard to do. When your body is using all its resources to fight an illness, keeping supply going takes everything you have left. Your supply made it through. So did you.",
    shareCard:
      "Got sick. Kept going. Supply is still there.",
    designNote: "Keep this one short. When someone is coming out of illness, they don't need a lot of words — they need acknowledgment that what they did was hard and it worked."
  },

  {
    id: "ML-018",
    name: "First day back at work pumping",
    category: "Challenge overcome",
    paths: "All paths (pump users)",
    triggerType: "Chat-detected or calendar-adjacent",
    triggerCondition: "User mentions pumping at work, first day back, returning to work and pumped",
    acknowledgment:
      "You pumped at work today. Maybe it was logistically complicated. Maybe you had to hunt for the room. Maybe it was emotionally harder than you expected — being physically separated from your baby and still doing this for them at the same time. You did it. One day is behind you. The second day will be easier than the first.",
    shareCard:
      "Back at work. Still pumping for my baby. Day one: done.",
    designNote:
      "Return to work is one of the top cited reasons for breastfeeding cessation. This milestone should feel like validation that the hard part (day one) is done, with quiet optimism about the path forward — not pressure to maintain the same level indefinitely."
  },

  {
    id: "ML-019",
    name: "Navigated the combo feeding decision",
    category: "Challenge overcome",
    paths: "Path C",
    triggerType: "Profile-based + chat-detected",
    triggerCondition: "User selects combo feeding path during onboarding, OR mentions deciding to add formula / transition to combo",
    acknowledgment:
      "You made the call to combo feed — and you made it intentionally, on your terms. That decision is more considered than most people give it credit for. It means your baby is fed. It means you're still in this, doing the parts that work for your family. Whatever the mix looks like, it's yours. It counts.",
    shareCard:
      "Combo feeding: my terms, my baby, my family. It works for us.",
    designNote:
      "This milestone is specifically for the combo feeding without shame positioning. The message must never imply that combo feeding is a fallback or a lesser outcome. The word 'intentionally' is load-bearing — it gives moms agency over a decision that is often framed as failure. Do not fire this message as a condolence."
  },

  // ─── CATEGORY 4: EXCLUSIVE PUMPING / PATH B ───────────────────────────────

  {
    id: "ML-020",
    name: "One week of exclusive pumping",
    category: "Exclusive pumping",
    paths: "Path B only",
    triggerType: "Automatic",
    triggerCondition: "feeding_preference = exclusive_pumping AND baby_dob + 7 days",
    acknowledgment:
      "One week of exclusive pumping. Seven days of every session, every day, at intervals that do not negotiate with your schedule, your sleep, or how you're feeling. You built a supply this week. Your baby has been drinking something your body made, and you made it happen entirely through this process that is both mechanical and extraordinary. One week is real.",
    shareCard:
      "One week of exclusive pumping. Every session, every day. My baby is fed.",
    designNote:
      "EP moms are often invisible in breastfeeding support content. This milestone should name what EP actually involves — the sessions, the schedule, the labor — rather than treating it as a lighter version of nursing. Language: extraordinary, real, every session."
  },

  {
    id: "ML-021",
    name: "30 days of exclusive pumping",
    category: "Exclusive pumping",
    paths: "Path B only",
    triggerType: "Automatic",
    triggerCondition: "feeding_preference = exclusive_pumping AND baby_dob + 30 days",
    acknowledgment:
      "Thirty days of exclusive pumping. Thirty days of sessions that happen whether you feel like it or not — at 3am, between other things, when you're tired or engorged or just over it. You have done this every single day for a month and your baby has been fed every single day because of it. Say it to yourself, out loud if you want: extraordinary. Because it is.",
    shareCard:
      "30 days of exclusive pumping. One month. Every session, for my baby.",
    designNote:
      "30 days is a significant EP milestone — many EP moms who make it 30 days continue for much longer. The tone should reflect that this is a real achievement, not a stepping stone. The instruction 'say it out loud' is intentional — it's a prompt toward self-acknowledgment, not performance for others."
  },

  {
    id: "ML-022",
    name: "First freezer stash bag",
    category: "Exclusive pumping",
    paths: "Path B only",
    triggerType: "Chat-detected or manual",
    triggerCondition: "User mentions first freezer bag, first stash, put milk in the freezer for the first time",
    acknowledgment:
      "First bag in the freezer. You made more than your baby needed today, and now there's a little insurance policy in there with today's date on it. That bag is real. You made that. And there will be more.",
    shareCard:
      "First bag in the freezer. Building something for my baby, one bag at a time.",
    designNote:
      "Keep this one short and warm. The freezer stash has significant anxiety attached for EP moms — this milestone should feel like relief and progress, not pressure to keep building a bigger stash. The phrase 'there will be more' is a gentle forward orientation."
  },

  {
    id: "ML-023",
    name: "Double-digit daily output achieved",
    category: "Exclusive pumping",
    paths: "Path B only",
    triggerType: "Log-detected or manual",
    triggerCondition: "User logs or mentions daily output reaching 10+ oz/day for the first time; OR mentions clearing a volume threshold they'd set",
    acknowledgment:
      "Your output cleared double digits today. Your body figured this out — sessions, compression, schedule, all of it adding up. There will still be low-output days, but today was a proof point: the system is working. You built this.",
    shareCard:
      "Body figured out the supply. We're in business.",
    designNote:
      "10 oz/day is an EP-specific milestone that many moms track closely in the first 2 weeks. The message should acknowledge the work that got there (schedule, technique) without implying that more is always better. Include a caveat about variable days so moms don't panic when output fluctuates."
  },

  // ─── CATEGORY 5: JOURNEY COMPLETION ──────────────────────────────────────

  {
    id: "ML-024",
    name: "Reached your original goal",
    category: "Journey completion",
    paths: "All paths",
    triggerType: "Chat-detected + time-based proxy",
    triggerCondition: "User-stated goal reached (detected from onboarding or early chat); OR baby_dob + 42, 84, 180 days depending on stated goal",
    acknowledgment:
      "You said you wanted to make it to [GOAL]. You're here. The version of you who set that goal — in week one, when you weren't sure you could make it — set a real goal and then actually did it. Whatever comes next is a bonus. This is the thing you said you'd do.",
    shareCard:
      "I set a goal. I made it. [GOAL] of feeding my baby.",
    designNote:
      "[GOAL] should be populated from user's stated goal if captured during onboarding or in early chat (e.g., '6 weeks', '3 months', 'until I go back to work'). If no goal was stated, use a fallback: 'You've been feeding your baby for [X weeks], and whatever goal you had in mind when you started — you're on the other side of it now.' This is the most personalized milestone in the library."
  },

  {
    id: "ML-025",
    name: "Extended past original goal",
    category: "Journey completion",
    paths: "All paths",
    triggerType: "Time-based + goal comparison",
    triggerCondition: "baby_dob exceeds user-stated goal by 7+ days",
    acknowledgment:
      "You said [GOAL] and then you just... kept going. That wasn't the plan, or maybe it became the plan. Either way: every day past your original goal is a day you chose to keep doing this. Not because you had to. Because it was still working for you and your baby. That's worth acknowledging.",
    shareCard:
      "I made my goal. Then I kept going.",
    designNote:
      "This milestone should feel quiet and warm — not triumphant. Some moms extend reluctantly (because they feel they 'should') and some extend because they genuinely want to. The message should honor both without implying either is right."
  },

  {
    id: "ML-026",
    name: "Choosing to wean",
    category: "Journey completion",
    paths: "All paths",
    triggerType: "Chat-detected",
    triggerCondition: "User mentions deciding to wean, starting weaning process, done breastfeeding / pumping, stopping",
    acknowledgment:
      "You decided it's time to wean. That decision is yours and it belongs entirely to you. Whatever brought you here — your body, your baby's cues, your own needs, a timeline you set or a timeline that set itself — it doesn't need to be justified. What matters is that you fed your baby in the way that worked for your family, for as long as it worked. That's the whole story. And it's a good one.",
    shareCard:
      "I fed my baby for [X weeks/months]. It was the right decision for us. Starting to wean now.",
    designNote:
      "Weaning is one of the most emotionally complex moments in the breastfeeding journey — moms feel relief, grief, guilt, pride, and sadness often simultaneously. The message must be completely non-judgmental and non-clinical. Do NOT include any language about weaning 'too early' or next steps for milk supply reduction unless the user asks. This moment is for acknowledgment, not guidance."
  },

  {
    id: "ML-027",
    name: "Final session",
    category: "Journey completion",
    paths: "All paths",
    triggerType: "Chat-detected",
    triggerCondition: "User mentions last pump session, last nursing session, done, final feed, all done",
    acknowledgment:
      "This is the last one. You'll probably feel a lot of things right now — and not all of them will make sense. Relief and grief can sit in the same moment. Whatever you're feeling is right. Every session before this one was real. Every bag in the freezer, every 3am pump, every latch you worked for — all of it was real. This one is too. You fed your baby. That's a story that belongs to you.",
    shareCard:
      "Last session. My baby is fed. I did this.",
    designNote:
      "The final session milestone deserves the most careful handling in the library. It should not be celebratory or sad — it should be present. The line 'relief and grief can sit in the same moment' gives moms permission for complicated feelings without telling them what to feel. No guidance, no next steps. Just acknowledgment. Consider offering a 'save this moment' option — a way to keep this message somewhere permanent, like a baby book."
  },

];
