# Lovable Update Prompt — Getting Started Personalization by Feeding Path

**Paste the block below directly into Lovable.**

---

```
Rework the Getting Started section so it matches each user's feeding journey instead of showing everyone the same nursing-focused content. This touches terminology, visibility, copy, and two new visual treatments. Read the whole prompt before starting, since later parts depend on earlier ones (the path-filtering logic in Part 2 is used by every guide after it).

Do not change: the app shell, bottom nav, home screen, chat, This Week, onboarding, AppContext structure beyond what's listed in Part 9, or any route outside /getting-started/*.

---

PART 0 — WHAT'S CHANGING (SUMMARY)

1. Terminology: every user-facing instance of "module" becomes "guide." "Module 4 of 7" becomes "Guide 4 of 7." "3 modules complete" becomes "3 guides complete." This does not apply to internal variable names (AppContext.moduleProgress keeps its existing key name — see Part 9).

2. Visibility: Latch & Positioning no longer shows for users on Path B (exclusive pumping). Its content is unchanged for Path A and Path C. This means Path A and Path C users see 7 guides; Path B users see 6.

3. Content: Your First 48 Hours, Feeding Your Supply, Reading Nora's Cues, Cluster Feeding, and Common Concerns & When to Call each now have three copy variants, one per feeding path (A = Exclusive Nursing, B = Exclusive Pumping, C = Combination Feeding). The Fourth Trimester is unchanged and shown to everyone. Latch & Positioning is unchanged where it appears (Path A and C).

4. Renumbering: guide numbers ("Guide X of Y") are computed per user based on which guides are visible to their path, not a fixed global number. Latch is simply skipped in the sequence for Path B rather than leaving a gap.

5. A visible path tag now appears on every path-varying guide's header, next to the read-time pill: "Nursing," "Pumping," or "Combo." No tag appears on Latch & Positioning or The Fourth Trimester.

6. Two content types get new visual treatments used across multiple guides: the supply loop (now a circular diagram instead of boxes-in-a-row) and myth/actually pairs (now explicit two-tone stacked cards). The hunger spectrum becomes a color-graded horizontal bar. "Try This" callouts get a lighter bordered-card treatment. All four are specified once in Part 10 and reused wherever a guide calls for them.

7. Backend: no migration needed. The user's feeding path is already stored (feeding_preference in user_profiles: 'breastfeeding' | 'exclusive_pumping' | 'combo' | 'formula') and already exposed to the frontend as feedingPath ('A' | 'B' | 'C'), the same field used by onboarding, the pump-selection screen, and This Week. Read that existing field. If feedingPath is missing or 'formula' (no A/B/C path in v1), fall back to showing the Path A content variant so nothing breaks, but this should not occur for any user who completed onboarding normally.

---

PART 1 — SHARED GUIDE SCREEN STRUCTURE (UPDATE)

This is the same wrapper used today, with two additions: the path tag pill, and "guide" replacing "module" in every string.

ROUTE PATTERN: /getting-started/[slug] — unchanged routes:
  /getting-started/first-48
  /getting-started/latch        (Path A and C only)
  /getting-started/supply
  /getting-started/cues
  /getting-started/cluster-feeding
  /getting-started/concerns
  /getting-started/fourth-trimester

SHARED HEADER (sticky, bg-neutral-50, border-b border-neutral-200, px-4 py-3):
  Left: "← Getting Started" — primary-500, 15px, taps back to /getting-started
  Center: "Guide X of Y" — 13px, neutral-500 (X = this guide's position in the user's filtered, ordered list; Y = total guides visible to this user's path — 7 for Path A/C, 6 for Path B)

SHARED GUIDE TITLE BLOCK (px-6 pt-6):
  Label: "GETTING STARTED" — 11px, primary-700, uppercase, tracking-wider
  Title: [guide title] — H1, 28px, font-bold, neutral-900, mt-1
  Pill row (flex flex-row gap-2, mt-2):
    Read time pill: "~X min read" — bg-neutral-200, neutral-500, 12px, rounded-full
    Path tag pill (omit entirely on Latch & Positioning and The Fourth Trimester): bg-primary-100, text-primary-700, 12px, rounded-full, font-medium — text is "Nursing" (Path A), "Pumping" (Path B), or "Combo" (Path C)
  Divider: border-neutral-200, my-5

SHARED CHAT BRIDGE (unchanged position and style, text varies by guide/path as specified per guide below)

SHARED DONE BUTTON (unchanged): "Done with this one ✓" (Fourth Trimester keeps "I read this one ✓"). Marks AppContext.moduleProgress[slug] = true, returns to /getting-started.

MODULE CONTENT AREA: px-6, pb-32, full scroll, no bottom nav. (Class names / internal identifiers may keep the word "module" — this only governs user-visible text.)

---

PART 2 — PATH FILTERING AND RENUMBERING LOGIC

Define the full guide list with path tags:

  1. first-48        — title: "Your First 48 Hours"              — pathTags: [A, B, C]
  2. latch            — title: "Latch & Positioning"               — pathTags: [A, C]
  3. supply           — title: "Feeding Your Supply"                — pathTags: [A, B, C]
  4. cues             — title: "Reading Nora's Cues"                — pathTags: [A, B, C]
  5. cluster-feeding  — title: "Cluster Feeding"                    — pathTags: [A, B, C]
  6. concerns         — title: "Common Concerns & When to Call"     — pathTags: [A, B, C]
  7. fourth-trimester — title: "The Fourth Trimester"                — pathTags: [ALL]

For a given user, compute their visible list by filtering to guides where pathTags includes their feedingPath (or is ALL), preserving the order above. This filtered, ordered list drives: the library screen's card order, each guide's "Guide X of Y" header, and the total shown in "X of Y guides complete."

Path A and Path C users: 7 guides, in the order listed.
Path B users: 6 guides (Latch removed), everything else in the same relative order, renumbered 1 through 6 with no gap.

---

PART 3 — LIBRARY SCREEN (/getting-started)

Card titles and descriptions (unchanged where not listed):
  Cluster Feeding card: title "Cluster Feeding", description "Why Nora might want to nurse or feed nonstop for a stretch, and how to get through it without panicking."
  (Other card copy stays as currently live.)

Render only the cards in the user's filtered list, in order. Do not render a Latch & Positioning card at all for Path B users (not grayed out, not locked — simply absent).

Progress summary line: "X of Y guides complete" where Y is the user's path-specific total (6 or 7).

Card visual states (AVAILABLE / ACTIVE / COMPLETED) and tap targets work exactly as they do today, just reading from AppContext.moduleProgress keyed by slug.

---

PART 4 — GUIDE: YOUR FIRST 48 HOURS
Read time: ~3 min. Chat bridge (all paths): "Questions about the first few days?"
VISUAL FORMAT: unchanged "Normal vs. Worth a Call" two-column grid pattern (see existing spec), content below is new per path.

--- PATH A — NURSING ---
Intro: "Your milk is likely not flowing yet, and that's not a problem. It's exactly on schedule, even though it doesn't look like what you probably pictured. Here's what's actually supposed to happen."

Section "What colostrum is" — callout (bg-primary-50, rounded-2xl, px-5 py-4): "5–7 ml per feed" large centered, then "That's about a teaspoon, in the first 24 hours. Nora's stomach is the size of a marble, so it's enough."

Section "Normal vs. worth a call":
Normal: Your breasts are soft, not full (days 1–2). / You're only seeing drops of milk. That's colostrum, and it's doing its job. / Nora's nursing 8–12 times in 24 hours. / She's lost up to 7% of her birth weight. / Her first stool is dark green-black (meconium).
Worth a call: She's lost more than 10% of her birth weight. / No wet diapers after 24 hours. / She won't wake to feed after 4+ hours. / You're in pain through the entire feed, not just at latch. / You have a fever or flu-like symptoms.

Section "When milk 'comes in'": "For most moms, milk transitions from colostrum to mature milk between days 3 and 5, and you'll know it when it happens. Your breasts will feel noticeably fuller. Keep nursing frequently through the engorgement, since that's just your body responding to demand." / "If your milk hasn't come in by day 5 or 6, give your provider or IBCLC a call."

TRY THIS (see Part 10 for the visual spec): "In the first 24 hours, aim to nurse at least 8 times, even if sessions are short and Nora seems sleepy. Waking a sleepy newborn to feed is normal, not something to feel bad about. Skin-to-skin helps."

--- PATH B — EXCLUSIVE PUMPING ---
Intro: "Your collection container is likely not filling up yet, and that's not a problem. Pumping from the start looks different those first two days, but it's exactly on schedule. Here's what's actually supposed to happen."

Section "What colostrum is" — callout: "5–7 ml per session" then "That's about a teaspoon, in the first 24 hours. Hand expression often collects colostrum more completely than a pump does this early, so even a few drops matter."

Section "Getting your routine started" (same grid layout, relabeled heading):
Normal: You're only seeing drops in the flange or by hand. That's colostrum. / You're pumping or hand expressing 8–10 times in 24 hours. / Nora's taking expressed colostrum well by spoon, syringe, or small bottle. / She's lost up to 7% of her birth weight. / Her first stool is dark green-black (meconium).
Worth a call: Nothing's coming out after several attempts across 24+ hours. / She's lost more than 10% of her birth weight. / No wet diapers after 24 hours. / She won't wake to feed after 4+ hours. / You have a fever or flu-like symptoms.

Section "When milk 'comes in'": "Milk usually transitions between days 3 and 5, and your breasts will feel noticeably fuller when it happens. Increase how often you're pumping through the engorgement, the same way a nursing mom would respond to more frequent feeds. It's your body reacting to demand either way." / "If your milk hasn't come in by day 5 or 6, or your output just isn't increasing at all, that's worth a call to your provider or IBCLC."

TRY THIS: "In the first 24 hours, aim to pump or hand express at least 8 times, even if you're only getting drops. Add hand expression before or after pumping in these first two days. Your hands often out-collect the pump on colostrum this thick. Check the Hand Expression guide for technique." (link text "Hand Expression guide" navigates to /this-week/module/shared-hand-expression, same as the existing cross-link pattern used elsewhere in the app)

--- PATH C — COMBINATION FEEDING ---
Intro: "Your milk is likely not flowing yet, whether Nora's at the breast, taking expressed milk, or both, and that's not a problem. It's exactly on schedule. Here's what's actually supposed to happen."

Section "What colostrum is" — callout: "5–7 ml per removal" then "That's about a teaspoon, in the first 24 hours. Nursing and hand expressing or pumping both count, and doing both in these first two days protects supply from every angle."

Section "Normal vs. worth a call":
Normal: Breasts soft, not full (days 1–2). / Only drops of milk, whether at the breast or expressed. That's colostrum. / 8–12 total removals in 24 hours, nursing and expressing combined. / Baby losing up to 7% of birth weight. / Dark green-black first stool (meconium).
Worth a call: Baby losing more than 10% of birth weight. / No wet diapers after 24 hours. / Won't wake to feed after 4+ hours. / Pain throughout an entire nursing session, or nothing ever expressed. / Fever or flu-like symptoms.

Section "When milk 'comes in'": "Milk usually transitions between days 3 and 5. Nurse or pump frequently through the engorgement, whichever you're doing at that session, since more frequent removal is what matters most." / "If your milk hasn't come in by day 5 or 6, call your provider or IBCLC."

TRY THIS: "In the first 24 hours, aim for 8 or more total removals between nursing and pumping or hand expression. The method doesn't matter for any single session. Frequency in these first hours is what sets up your supply."

---

PART 5 — GUIDE: LATCH & POSITIONING (NO CONTENT CHANGE)

Path visibility: Path A and Path C only. Do not render this guide, its card, or its route entry point for Path B users.
Content: identical to what's live today (5-step latch sequence, holds carousel, nipple-shape comparison). No copy changes.
Path tag pill: do not show one on this guide (it applies the same way to both paths that see it).

---

PART 6 — GUIDE: FEEDING YOUR SUPPLY
Read time: ~4 min. Chat bridge (all paths): "Questions about milk supply?"
VISUAL FORMAT: circular supply loop diagram (Part 10) + myth/actually two-tone cards (Part 10).

--- PATH A — NURSING ---
Intro: "Supply anxiety is the most common reason moms stop nursing in weeks 2 through 4, and most of the time supply is actually fine. Without understanding how it works, though, every cluster feed or soft breast can feel like a warning sign. This guide gives you the mental model."

Supply loop nodes (clockwise): "You nurse frequently" → "Your breast empties" → "Your body gets the signal" → "It makes more milk"
Loop caption: "Frequency matters more than anything else."
Body: "This loop only works if milk is actually being removed on a regular basis. Your body doesn't know what Nora needs. It only knows what's being asked for, and every nursing session is a request. More requests, more supply."

Section "5 things that aren't actually problems" — 5 myth/actually cards:
1. Myth: "My breasts feel soft, so supply must be dropping." Actually: "Soft just means your supply has regulated to match demand. Firmness was never the sign of more milk."
2. Myth: "Nora's nursing constantly. I must not have enough." Actually: "That's cluster feeding, and it's how babies build supply, not a signal that it's failing. It passes in a day or two."
3. Myth: "I can only pump an ounce. I must be drying up." Actually: "Pump output doesn't measure supply accurately while you're also nursing. Plenty of moms with a full supply pump small amounts."
4. Myth: "Breast size determines how much milk I can make." Actually: "Milk-making capacity comes down to glandular tissue, not size, so small breasts can absolutely make a full supply."
5. Myth: "I should feel a letdown. If I don't, it isn't working." Actually: "Lots of moms never feel letdown as a physical sensation, and it's still happening."

TRY THIS: "In the next 24 hours, aim for at least 8 nursing sessions. Don't watch the clock. Watch Nora instead, and feed at the first signs of hunger, before she reaches the crying stage."

--- PATH B — EXCLUSIVE PUMPING ---
Intro: "Supply anxiety hits EP moms hard, because a pump doesn't give you the instant feedback that nursing does, and every low-output session can feel like proof something's wrong. This guide gives you the mental model for pump-driven supply."

Supply loop nodes: "You pump or hand express frequently" → "Your breast empties" → "Your body gets the signal" → "It makes more milk"
Loop caption: "Frequency and thorough emptying matter more than anything else, including what shows up in the bottle that session."
Body: "This loop only works if milk is being removed regularly and completely. Your body doesn't know what Nora needs. It only knows what's being asked for, and every pumping session is a request. Skipped sessions, short sessions, or a flange that doesn't fit all send a weaker signal."

Myth/actually cards:
1. Myth: "My output dropped this session. Supply must be falling." Actually: "Output naturally swings from session to session based on how long it's been, how hydrated you are, stress, even the time of day. One low session isn't a trend."
2. Myth: "Nora's taking bigger bottles lately. I must not have enough." Actually: "Babies' appetites grow in bursts, just like at the breast. That's your cue to add a session or power pump for a day or two, not a sign something's wrong."
3. Myth: "I can only pump 2 to 3 ounces per session. That's not enough." Actually: "Average pumped volume varies enormously between moms with a completely adequate supply. What matters is your total across 24 hours, not any single session."
4. Myth: "A stronger pump or higher suction gets more milk out." Actually: "Past a certain point, higher suction doesn't remove more milk. It just causes pain. Flange fit and complete emptying matter far more than raw suction strength."
5. Myth: "If I don't feel a letdown, the pump isn't working." Actually: "Plenty of moms never feel letdown as a sensation, pumping or nursing. Milk flow is the sign it's working, not the feeling."

TRY THIS: "In the next 24 hours, aim for at least 8 pumping or hand expression sessions. Don't chase a number on the bottle. Chase frequency and complete emptying instead, and try one hands-on pumping session today, since massaging and compressing while you pump reliably increases output more than suction alone."

--- PATH C — COMBINATION FEEDING ---
Intro: "Supply anxiety shows up differently when you're combo feeding, because every bottle of formula or stored milk can feel like an admission that nursing isn't enough. This guide gives you the mental model for how supply responds to a mixed routine."

Supply loop nodes: "Milk gets removed" → "Your breast empties" → "Your body gets the signal" → "It makes more milk"
Loop caption: "Every removal counts toward that signal. The mix matters less than the total frequency."
Body: "Supply still responds to demand the same way it would for an exclusively nursing or exclusively pumping mom. It's just responding to whatever combination of removals you're actually doing."

Myth/actually cards:
1. Myth: "Since I supplement, my supply doesn't really matter anymore." Actually: "It still responds to demand. The more you nurse or pump, the more you'll keep making, even alongside supplementing."
2. Myth: "Nursing and then giving a bottle means Nora's telling me I don't have enough." Actually: "Plenty of babies happily take a bottle after nursing no matter what your supply looks like. That's about appetite and pace, not proof the breast was empty."
3. Myth: "If I want to nurse more and supplement less, it's too late to change." Actually: "Supply responds to demand at almost any point, and adding sessions can shift the ratio even weeks or months in."
4. Myth: "Pumping once a day isn't worth it if I'm already supplementing." Actually: "Even one extra daily removal sends a real signal. Consistency matters more than skipping it because it doesn't feel like much."
5. Myth: "Combo feeding means I'll never establish a full supply." Actually: "Plenty of moms increase their own supply over time on a combo routine by adding sessions gradually. Starting with supplementation doesn't take full supply off the table."

TRY THIS: "Pick one nursing or pumping session in the next 24 hours that you'd normally skip, and keep it instead. Consistency in the sessions you do have is what shifts supply, not some all-or-nothing switch."

---

PART 7 — GUIDE: READING NORA'S CUES
Read time: ~3 min. Chat bridge text varies by path (given per path below).
VISUAL FORMAT: hunger spectrum color bar (Part 10) replaces the old stacked-card layout for this section. Everything else keeps its existing card/callout structure.

--- PATH A — NURSING ---
Intro: "Crying is late-stage hunger. By the time Nora's crying, she's already been asking for a while, and a very hungry baby is harder to latch. Here's the full sequence, from the first signal to the last resort."
Hunger spectrum bar labels: EARLY — stirring, fluttering eyes, mouth movements, rooting, hands toward mouth. ACTIVE — turning head more urgently, sucking on hands or fists, more body movement. LATE — crying, turning red, arching, hard to settle.
Calm-first callout: "If Nora reaches the crying stage, take a minute to calm her with skin-to-skin or rocking before you latch her. A frantic baby has a harder time latching well."
"When she's done": Releases the breast naturally and doesn't re-root. / Hands open and relaxed, not fisted. / Drowsy, satisfied expression. / Turns her head away when offered more.
"About cluster feeding" callout (bg-accent-200): "If Nora nurses for 45 minutes, unlatches, fusses immediately, and wants right back on, she's cluster feeding. It's normal, it's temporary, and it isn't a sign your supply is low." Link: "See the full Cluster Feeding guide →" → /getting-started/cluster-feeding
TRY THIS: "At your next feed, watch Nora before she cries. See how early you can catch a hunger cue, because the earlier the signal, the easier the latch and the calmer the feed."
Chat bridge: "Questions about Nora's hunger or feeding cues?"

--- PATH B — EXCLUSIVE PUMPING ---
Intro: "Crying is late-stage hunger. By the time Nora's crying, she's already been asking for a while, and a very hungry baby rushes a bottle in a way that can lead to overfeeding. Here's the full sequence, from the first signal to the last resort."
Hunger spectrum bar: same three stages and cue text as Path A (baby behavior doesn't change by feeding method). LATE label reads "calm her before offering the bottle" instead of "calm her before latching."
Calm-first callout: "If Nora reaches the crying stage, take a minute to calm her before offering the bottle. A frantic baby swallows air and milk too fast, which usually means more spit-up and gas."
"When she's done": Turns her head away or pushes the bottle out, doesn't re-root. / Hands open and relaxed, not fisted. / Drowsy, satisfied expression. / Slows or stops sucking well before the bottle's empty.
New callout, "PACED BOTTLE FEEDING" (same visual style as other supporting callouts, bg-primary-50): "Whoever's holding the bottle, you or a partner, pacing it (bottle horizontal, short pauses every 20 to 30 seconds) helps Nora feed at her own speed. It also makes these fullness cues much easier to catch before she's had too much."
"About growth spurts" callout (bg-accent-200): "Some days Nora will want more milk than usual, bigger or more frequent bottles over a day or two. That's normal, it's temporary, and it's a growth spurt, not a sign something's wrong with your supply." Link: "See the full Cluster Feeding guide →" → /getting-started/cluster-feeding
TRY THIS: "At your next feed, watch Nora before she cries, and pace the bottle. The earlier you catch the hunger signal and the slower the bottle goes, the calmer the whole feed."
Chat bridge: "Questions about Nora's hunger or feeding cues?"

--- PATH C — COMBINATION FEEDING ---
Intro: "Crying is late-stage hunger, whether Nora's about to nurse or take a bottle. By the time she's crying, she's already been asking for a while, and a very hungry baby is harder to feed calmly either way."
Hunger spectrum bar: same three stages. LATE label reads "calm her before feeding, either way."
Calm-first callout: "If Nora reaches the crying stage, take a minute to calm her before you latch her or offer the bottle. A frantic baby has a harder time latching well, or swallows air and milk too fast from a bottle."
"When she's done": Releases the breast naturally, or turns from the bottle, doesn't re-root either way. / Hands open and relaxed, not fisted. / Drowsy, satisfied expression. / Turns away or slows well before the feed should be over.
"About cluster feeding / growth spurts" callout (bg-accent-200): "If Nora wants to nurse, or take a bottle, far more often than usual for a day or two, she's likely working through a growth spurt. It's normal, it's temporary, and it isn't a sign your supply, nursed or pumped, is falling short." Link: "See the full Cluster Feeding guide →" → /getting-started/cluster-feeding
TRY THIS: "At your next feed, watch Nora before she cries, whichever way you're about to feed her. The earlier the signal, the calmer the feed."
Chat bridge: "Questions about Nora's hunger or feeding cues?"

---

PART 8 — GUIDE: CLUSTER FEEDING
Read time: ~3 min. Reached via link from Reading Nora's Cues, or directly from the library.
VISUAL FORMAT: standard "Normal vs. Worth a Call" grid (unchanged pattern) + icon-row list for "how to get through it."

--- PATH A — NURSING ---
Intro: "If Nora wants to nurse every 20 to 30 minutes for hours at a stretch, you haven't lost your milk. You're in a cluster feed, and here's what's happening and how to get through it."
"What's actually happening": "Cluster feeding is short, frequent nursing sessions bunched close together, sometimes every 20 to 30 minutes for two to six hours or more. It's Nora's way of telling your body to make more milk, and your body listens, since frequent removal is exactly the signal that ramps up supply. This is the same loop from Feeding Your Supply: more removal, more milk."
"When it tends to show up": Evenings, the most common time of day. / Days 2–3, as milk transitions in. / Around days 10–14. / Common growth spurt windows: roughly 3 weeks, 6 weeks, and 3 months.
Normal: Nursing every 20–30 min for a few hours, especially evenings. / Seems fussy right after coming off the breast. / Eases up within 24–48 hours. / Still has expected wet and dirty diapers that day. / You feel touched-out or exhausted, but Nora seems okay.
Worth a call: Goes on for more than 2–3 days without any easing. / Fewer than 6 wet diapers in 24 hours. / Baby seems lethargic, not just fussy. / Pain throughout the entire feed, not just at latch. / You're struggling to cope and need support.
"How to get through a cluster feed": Feed on demand rather than watching the clock. Responding is what tells your body to make more. / Get set up before you settle in: water, snacks, phone charger, remote, all within reach. / Ask a partner or support person to take everything else off your plate for a few hours. / Skip the pump during a cluster feed unless your IBCLC has told you otherwise, since nursing clears milk more efficiently than a pump session would add. / Know the timeline. Most stretches resolve in 24–48 hours.
TRY THIS: "The next time Nora starts a cluster feed, give it a couple of hours before you start worrying. Most cluster feeds resolve within a single evening or overnight stretch."

--- PATH B — EXCLUSIVE PUMPING ---
Intro: "If Nora suddenly wants more milk than usual, draining bottles faster or wanting to eat again soon after finishing, you're likely in a growth spurt. Your pump routine just needs to catch up for a day or two, and here's what's happening and how to get through it, especially if this is your first one in these early days."
"What's actually happening": "For nursing babies, this shows up as cluster feeding at the breast. For a baby who's exclusively getting bottles, it usually shows up as wanting more per bottle, wanting bottles closer together, or both, over a day or two. Nora's signaling she needs more volume, and the way your body hears that signal is through more frequent, more thorough removal. This is the same loop from Feeding Your Supply: more removal, more milk."
"When it tends to show up": "The first stretch like this often lands somewhere in the first week or two, sometimes again around days 10 to 14, and then at the more familiar growth windows later on, around 3 weeks, 6 weeks, and 3 months. Right now, focus on getting through this one." (Note: do not reference a freezer stash anywhere in this guide — see below.)
Normal: Nora finishing bottles faster or wanting to eat again sooner than usual. / More fussiness between feeds that settles once she's fed. / Eases up within 24–48 hours. / Still has expected wet and dirty diapers that day. / You feel like you're constantly pumping or prepping bottles, but Nora seems okay.
Worth a call: Goes on for more than 2–3 days without any easing. / Fewer than 6 wet diapers in 24 hours. / Baby seems lethargic or hard to rouse, not just hungry. / You genuinely can't keep up with what she needs feed to feed. / You're struggling to cope and need support.
"How to get through it": "Feed Nora when she asks rather than watching the clock, since responding to her right now is exactly what tells your body to make more. Try adding one more pumping session today, or run a power-pumping round: twenty minutes on, ten off, ten on, ten off, ten on. Hand off the dishes and the diaper bag to whoever's around, and put that extra time into the session instead of into worrying, because this eases up fast. Most stretches like this last a day, maybe two, and your supply catches up right along with it." (No freezer-stash reference — new users at this stage rarely have one, and it's an unhelpful source of anxiety here. Reassurance and the extra-session action are the whole answer for this guide.)
TRY THIS: "The next time Nora seems to want more than usual, add one extra pumping session that day instead of assuming something's wrong. Most growth spurts resolve within a couple of days once your body catches up."

--- PATH C — COMBINATION FEEDING ---
Intro: "If Nora wants to nurse constantly, drains bottles faster, or both, for a day or two, you're likely watching a growth spurt happen in real time. Here's what's happening and how to get through it."
"What's actually happening": "Growth spurts show up as cluster feeding at the breast, wanting bottles more often, or both, whatever mix Nora's on. Either way, she's telling your body and your routine to increase supply and volume, and more frequent removal, nursing or pumping, is exactly the signal that ramps things up. This is the same loop from Feeding Your Supply: more removal, more milk, from whichever direction you're feeding."
"When it tends to show up": "The first stretch like this often lands somewhere in the first week or two, sometimes again around days 10 to 14, and then at the more familiar growth windows later on, around 3 weeks, 6 weeks, and 3 months. Right now, focus on getting through this one." (Same note: no freezer-stash reference in this guide.)
Normal: Nursing more often and/or finishing bottles faster than usual, especially evenings. / Fussy right after coming off the breast or bottle. / Eases up within 24–48 hours. / Still has expected wet and dirty diapers that day. / You feel like you're feeding nonstop, but Nora seems okay.
Worth a call: Goes on for more than 2–3 days without any easing. / Fewer than 6 wet diapers in 24 hours. / Baby seems lethargic, not just fussy. / Pain throughout an entire nursing session, or you genuinely can't keep up with what she needs. / You're struggling to cope and need support.
"How to get through it": "Feed or offer on demand rather than watching the clock, whichever method that session, since responding is what tells your body to make more. Get set up before you settle in, and ask a partner to take the rest off your plate for a stretch. If you'd normally skip a nursing or pumping session, keep it instead, since every removal counts extra right now. This eases up fast. Most stretches like this last a day, maybe two."
TRY THIS: "The next time Nora seems to want more than usual, at the breast or the bottle, add or keep one extra session that day instead of assuming something's wrong."

---

PART 9 — GUIDE: COMMON CONCERNS & WHEN TO CALL
Read time: ~5 min. Same 6 condition cards across all paths (Engorgement, Nipple Pain, Blocked Duct, Mastitis, Thrush, "Low Supply" Worry) — only "Do this" and "Call if" text changes per path, per the existing card structure (icon, name, description, two action rows).

--- PATH A — NURSING ---
Engorgement — Description: "Your breasts get overly full, hard, warm, and uncomfortable, usually days 3 to 5 when milk transitions from colostrum." Do this: "Nurse or pump frequently. A gentle massage before feeding helps soften things, and a cold compress after feeds eases the discomfort. Reverse pressure softening helps Nora latch on a very firm breast." Call if: "Redness, a hot patch, or a fever develops. That's mastitis territory."
Nipple Pain — Description: "Some tenderness at latch-on in week 1 is common. Pain that persists throughout the entire feed, or that's getting worse, is not." Do this: "Check the latch first, since pain is almost always the latch. Re-latch if needed, and air-dry your nipples after feeds." Call if: "Nipples are cracked, bleeding, or not improving after latch corrections. An IBCLC can usually fix it in one session."
Blocked Duct — Description: "A tender, firm lump or warm spot in the breast, noticeable between feeds." Do this: "Keep nursing, since frequent removal is the treatment. Apply warmth before feeds, and use gentle massage toward the nipple during." Call if: "The lump is still there after 2 to 3 days, or you develop a fever. That can mean it's progressing to mastitis."
Mastitis — Description: "Flu-like symptoms, fever, body aches, chills, along with a red, hot, painful patch on the breast." Do this: "Continue nursing. It helps clear the infection and doesn't harm Nora. Rest, fluids, and ibuprofen help too." Call if: "You have these symptoms. You likely need antibiotics, so don't wait it out."
Thrush — Description: "Burning or itching nipples between feeds, sharp shooting pains, or white patches in Nora's mouth." Do this: "You both need treatment at the same time. Treating only one of you won't clear it." Call if: "You suspect it. It doesn't resolve on its own."
"Low Supply" Worry — Description: "The most common concern, and most of the time supply is actually sufficient." Do this: "Count diapers. Six or more wet diapers a day means Nora's getting enough, and weight gain at check-ups is the real clinical signal." Call if: "Fewer than 6 wet diapers consistently, or Nora isn't gaining weight at check-ups."

--- PATH B — EXCLUSIVE PUMPING ---
Engorgement — Do this: "Pump frequently, and don't skip or shorten sessions during this stretch. A gentle massage before pumping helps soften things, and a cold compress after eases the discomfort. Reverse pressure softening can make it easier to get a good seal on a very firm breast." Call if: same as Path A.
Nipple Pain — Description: "Some tenderness at the start of a pump session is common, especially with a new pump or flange. Pain through the whole session, or that's getting worse, is not." Do this: "Check your flange size first. It's the most common cause of pump-related nipple pain. Lower your suction if you're maxing it out to compensate for weak flow, since higher suction doesn't extract more milk, and air-dry your nipples after sessions." Call if: "Nipples are cracked, bleeding, or not improving after adjusting flange size and suction. An IBCLC or pump specialist can fit you properly in one session."
Blocked Duct — Do this: "Keep pumping, since frequent, thorough removal is the treatment. Apply warmth before sessions, use gentle massage toward the nipple during, and try angling the flange or hands-on pumping to target the lump." Call if: same pattern as Path A.
Mastitis — Do this: "Continue pumping. It helps clear the infection, and the milk is still safe to feed Nora. Rest, fluids, and ibuprofen help too." Call if: same as Path A.
Thrush — Do this: "You and Nora both need treatment at the same time, and sanitize your pump parts and bottle nipples daily during treatment, since thrush can hide in flanges and valves and re-infect you both." Call if: same as Path A.
"Low Supply" Worry — Description: "The most common EP concern, and most of the time your output is actually adequate for what Nora needs." Do this: "Count diapers, and track your rolling 24-hour pumped total rather than any single session. Six or more wet diapers and steady weight gain at checkups are the real indicators." Call if: "Fewer than 6 wet diapers consistently, Nora isn't gaining weight at checkups, or your 24-hour total has been dropping for more than a few days despite consistent sessions."

--- PATH C — COMBINATION FEEDING ---
Engorgement — Do this: "Nurse or pump frequently, whichever you're doing at that session, and don't skip it during this stretch. A gentle massage before and a cold compress after help either way, and reverse pressure softening works whether Nora's about to latch or you're about to pump." Call if: same as Path A.
Nipple Pain — Description: "Some tenderness at latch-on or at the start of a pump session is common in the early weeks. Pain through the whole feed or session, or that's getting worse, is not." Do this: "If it's happening at the breast, check the latch first. If it's happening with the pump, check your flange size. Both are the most common fixable causes, and air-drying your nipples after either kind of session helps." Call if: "It's not improving after checking latch and flange fit. An IBCLC can assess both in one session."
Blocked Duct — Do this: "Keep removing milk, nursing or pumping, whichever's next on your routine. Warmth before and massage toward the nipple during either method help." Call if: same as Path A.
Mastitis — Do this: "Continue nursing and/or pumping. Both help clear the infection, and neither harms Nora. Rest, fluids, and ibuprofen help too." Call if: same as Path A.
Thrush — Do this: "Everyone in the feeding routine needs treatment at once: you, Nora, and, if you pump, your pump parts and bottle nipples, which can hide the infection." Call if: same as Path A.
"Low Supply" Worry — Description: "The most common concern for combo-feeding moms, and it's genuinely hard to gauge from the breast or a single pump session." Do this: "Count diapers. Six or more wet diapers a day and steady weight gain at checkups are the real signals, not how full your breasts feel, what a pump session yields, or how much formula you used that day." Call if: "Fewer than 6 wet diapers consistently, or Nora isn't gaining weight at check-ups."

---

PART 10 — SHARED VISUAL COMPONENTS (used across multiple guides above)

10.1 CIRCULAR SUPPLY LOOP (replaces the old horizontal boxes-in-a-row diagram)
  Container: rounded-2xl, bg-accent-200, px-4 py-5, aspect roughly square, mb-6
  Inside the container, an SVG or absolutely-positioned 4-node circular layout:
    4 nodes arranged at top / right / bottom / left of an implied ellipse, each a small rounded-xl bg-white card (~equal width, 2-line text, 11px font-medium, text-accent-700)
    4 curved connector arrows running clockwise between adjacent nodes (top→right→bottom→left→top), stroke color accent-500, arrowhead at each destination, following the same elliptical curve so the whole thing visually reads as one continuous loop
  Caption below the diagram: italic, accent-700, centered, 12-14px — text supplied per guide/path above
  Node label text is supplied per guide/path above (4 short phrases, 2 lines each)

10.2 TRY THIS CALLOUT (replaces the old solid-fill accent-200 box for this specific label — other accent-200 callouts like "CLUSTER FEEDING" and "CALM FIRST" keep their existing solid-fill treatment)
  Container: bg-white, border-left 3px solid primary-500, rounded-r-xl (no rounding on the left side), px-4 py-3
  Label row: small lightbulb icon (primary-500, ~15px) + "TRY THIS" (11px, uppercase, tracking-wider, font-semibold, primary-500)
  Body: 13-14px, neutral-900, leading-relaxed

10.3 MYTH / ACTUALLY CARDS (used in Feeding Your Supply's "5 things that aren't actually problems" section, replacing the prior bg-neutral-100 top section)
  Each card: rounded-2xl, overflow-hidden, border border-neutral-200, stacked vertically with gap-3 between cards
  Top section: bg-warning/15 (a warm amber tint, more visible than a plain neutral fill), px-4 py-3 — label "MYTH" (10px, uppercase, tracking-wider, font-semibold, warning-700) then the myth text (14px, neutral-800, leading-snug, mt-1)
  Bottom section: bg-white, px-4 py-3, border-t border-neutral-200 — label "ACTUALLY" (10px, uppercase, tracking-wider, font-semibold, success-700) then the actually text (14px, neutral-900, leading-snug, mt-1)

10.4 HUNGER SPECTRUM BAR (replaces the prior 3 stacked cards with left color bars, used in Reading Nora's Cues)
  A single horizontal bar split into 3 equal segments, rounded-full, overflow-hidden, height ~10px, mb-2:
    Segment 1 (Early): bg-primary-300
    Segment 2 (Active): bg-primary-500
    Segment 3 (Late): bg-primary-700
  Below the bar, a 3-column grid (grid-cols-3, gap-2):
    Each column: stage label (11px, font-semibold, primary-700) then cue text (11px, neutral-500, leading-snug) — content supplied per guide/path above

---

PART 11 — APPCONTEXT UPDATE

AppContext.moduleProgress keeps its existing key name and existing per-slug boolean structure — no rename needed. Keys in use: 'first-48', 'latch', 'supply', 'cues', 'cluster-feeding', 'concerns', 'fourth-trimester'. For Path B users, 'latch' simply never gets read or written since the guide never renders, so no migration or cleanup is needed for existing users' stored progress.

Add the path-tags table from Part 2 as a small static config (guide slug → pathTags array) that both the library screen and each guide's header consult in order to filter, order, and count guides. This does not need to be persisted anywhere new. It's a static content configuration, the same way guide titles and routes are already defined today.

---

DO NOT CHANGE:
- App shell, routing outside /getting-started/*
- Bottom nav
- Home screen (including the Getting Started card — it auto-reflects progress from AppContext)
- Chat, This Week, Onboarding
- Any existing Tailwind config or color tokens beyond the additions named in Part 10
- Latch & Positioning's content (Part 5) and The Fourth Trimester's content (unchanged, universal, no path tag)
- Feeding Your Supply's "myth" content wording beyond what's specified per path above
- AppContext.moduleProgress's key name and structure
```
