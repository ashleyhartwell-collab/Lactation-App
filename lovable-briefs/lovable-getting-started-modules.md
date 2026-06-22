# Lovable Update Prompt — Getting Started: All 6 Modules
**Paste the block below directly into Lovable.**

---

```
Rewrite Modules 1 and 2 of the Getting Started section and build Modules 3–6. All six modules now have full content screens — no more "coming soon" placeholders. Each module uses a different visual format suited to its content type (described per module below). Also update the library screen to reflect all six being available.

Do not change: the app shell, bottom nav, home screen, chat, This Week, onboarding, AppContext structure, or any existing routes outside /getting-started/*.

---

PART 0 — SHARED MODULE SCREEN STRUCTURE

All six module screens share this wrapper. Apply it consistently.

ROUTE PATTERN: /getting-started/[slug]
  Module 1: /getting-started/first-48
  Module 2: /getting-started/latch  (already exists — rewrite content)
  Module 3: /getting-started/supply
  Module 4: /getting-started/cues
  Module 5: /getting-started/concerns
  Module 6: /getting-started/fourth-trimester

SHARED HEADER (sticky, bg-neutral-50, border-b border-neutral-200, px-4 py-3):
  Left: "← Getting Started" — primary-500, 15px, taps back to /getting-started
  Center: "Module X of 6" — 13px, neutral-500 (X = module number)

SHARED MODULE TITLE BLOCK (px-6 pt-6):
  Label: "GETTING STARTED" — 11px, primary-700, uppercase, tracking-wider
  Title: [module title] — H1, 28px, font-bold, neutral-900, mt-1
  Read time: "~X min read" — pill, bg-neutral-200, neutral-500, 12px, rounded-full, inline-block, mt-2
  Divider: border-neutral-200, my-5

SHARED CHAT BRIDGE (at the end of every module, before Done button):
  Divider: border-neutral-200, my-6
  Row: chat bubble icon (primary-500, 18px) + "[module-specific prompt] Ask in Quick Chat →"
  Style: 15px, primary-500, font-medium. Tapping navigates to /chat.

SHARED DONE BUTTON (bottom of scroll, mt-8, mb-12):
  Full-width outlined button: border-2 border-primary-500, primary-500 text, bg-white, rounded-xl, font-semibold, 52px height.
  Text: "Done with this one ✓" (exception: Module 6 uses "I read this one ✓")
  Tapping: marks the module complete in AppContext.moduleProgress, navigates to /getting-started.

MODULE CONTENT AREA: px-6, pb-32. Full scroll. No bottom nav on module screens.

---

PART 1 — UPDATE LIBRARY SCREEN (/getting-started)

Remove all "Coming soon" labels and lock icons. All 6 modules are now available and tappable. Update routes on each card.

Card states in the demo:
  Module 1 (Your First 48 Hours): COMPLETED — success green icon, "✓ Done" badge
  Module 2 (Latch & Positioning): ACTIVE — primary-500 icon, "Continue →" badge
  Modules 3–6: AVAILABLE — primary-300 icon, "Start →" badge (same style as active but slightly lighter icon bg)

Update the progress summary line:
  "1 of 6 modules complete" — left-aligned
  "✓ Your First 48 Hours" — right-aligned, success color

Update card tap targets:
  Module 1 → /getting-started/first-48
  Module 2 → /getting-started/latch
  Module 3 → /getting-started/supply
  Module 4 → /getting-started/cues
  Module 5 → /getting-started/concerns
  Module 6 → /getting-started/fourth-trimester

Remove the bottom italic text ("More modules coming soon...").

Card descriptions (update to final copy):
  Module 3: "Feeding Your Supply" — "Why more removal means more milk — and the mental model that changes everything."
  Module 4: "Reading Nora's Cues" — "Hunger signals, satiation, cluster feeding, and what to do with each."
  Module 5: "Common Concerns & When to Call" — "The most common first-six-weeks issues — what they look like and what to do."
  Module 6: "The Fourth Trimester" — "The emotional weight of new motherhood, what's normal to feel, and when to reach out."

---

PART 2 — MODULE 1: YOUR FIRST 48 HOURS
Route: /getting-started/first-48
Read time: ~3 min read
Chat bridge text: "Questions about the first few days?"

VISUAL FORMAT: "Normal vs. Worth a Call" two-column grid.
This module's job is to prevent panic. Every piece of content is framed as "here's what to expect" rather than prose paragraphs.

--- MODULE CONTENT ---

Short intro (16px, neutral-900, leading-relaxed, mb-6):
"The first 48 hours don't look like what most people picture. You won't have flowing milk yet — and that's exactly right. Here's what's actually supposed to happen."

SECTION: "What colostrum is" (section heading style: font-semibold, 17px, neutral-900, mb-3)

Colostrum callout card (bg-primary-50 or bg-primary-300/20, rounded-2xl, px-5 py-4, mb-6):
  Large text centered: "5–7 ml" — font-bold, 28px, primary-700
  Below: "per feed in the first 24 hours" — 14px, primary-700
  Below (divider): "That's about a teaspoon. Nora's stomach is the size of a marble. It's enough." — 14px, primary-500, italic, text-center

SECTION: "Normal vs. Worth a Call" (section heading style: font-semibold, 17px, neutral-900, mb-3)

Two-column grid (grid grid-cols-2 gap-3):

  LEFT COLUMN HEADER: "Normal ✓" — 13px, font-semibold, color: #3A8F6F (success)
  RIGHT COLUMN HEADER: "Worth a Call" — 13px, font-semibold, color: #C47F1A (warning)

  LEFT COLUMN ITEMS (5 items). Each: rounded-xl, bg-success/10 (#3A8F6F at 10% opacity or closest Tailwind approximation), px-3 py-3, text-sm (13px), text-success (#3A8F6F), leading-snug.
    ✓ Breasts soft, not full (days 1–2)
    ✓ Only drops of milk visible — that's colostrum
    ✓ Nora nursing 8–12 times in 24 hours
    ✓ Baby losing up to 7% of birth weight
    ✓ Dark green-black first stool (meconium)

  RIGHT COLUMN ITEMS (5 items). Each: rounded-xl, bg-warning/10 (#C47F1A at 10% opacity or closest Tailwind approximation), px-3 py-3, text-sm (13px), text-warning (#C47F1A), leading-snug.
    ⚠ Baby losing more than 10% of birth weight
    ⚠ No wet diapers after 24 hours
    ⚠ Baby won't wake to feed after 4+ hours
    ⚠ Pain throughout the entire feed (not just at latch)
    ⚠ You have a fever or flu-like symptoms

Note below grid (14px, neutral-500, italic, mt-3):
"If any 'worth a call' item applies, message your care team or lactation consultant. Most are fixable quickly."

SECTION: "When milk 'comes in'" (section heading style, mb-3, mt-8)

Body (16px, neutral-900, leading-relaxed):
"For most moms, milk transitions from colostrum to mature milk between days 3 and 5. You'll know — your breasts will feel noticeably fuller, sometimes dramatically so. Nurse frequently through engorgement; it's your body responding to demand."

"If your milk hasn't come in by day 5–6, that's worth a call to your provider or IBCLC. Some moms take longer, and there are factors that affect timing — but it's worth checking."

TRY THIS CALLOUT (bg-accent-200, rounded-2xl, px-5 py-4, my-6):
  Label: "TRY THIS" — 11px, accent-700, uppercase, tracking-wider, font-semibold
  Body: "In the first 24 hours, aim to nurse at least 8 times — even if sessions are short and Nora seems sleepy. Waking a sleepy newborn to feed is not only okay, it's the job. Undress her to her diaper if needed. Skin-to-skin helps." — 15px, accent-700, leading-relaxed

Chat bridge text: "Questions about the first few days?"

---

PART 3 — MODULE 2: LATCH & POSITIONING (REWRITE)
Route: /getting-started/latch (replace existing content entirely)
Read time: ~4 min read
Chat bridge text: "Questions about latching or positioning?"

VISUAL FORMAT: Step-by-step numbered cards + swipeable holds carousel.
Replace all existing prose paragraphs with the structure below.

--- MODULE CONTENT ---

Short intro (16px, neutral-900, leading-relaxed, mb-6):
"Latching is a skill you and Nora are both learning for the first time. It takes most moms a few days to find their groove — and even then, some feeds will be easier than others. Here's the sequence that works."

SECTION: "The 5-step latch" (section heading style, mb-4)

Build 5 step cards stacked vertically (gap-3). Each card:
  Container: rounded-2xl, bg-white, border border-neutral-200, px-4 py-4, flex flex-row, items-start, gap-3
  Left: numbered circle — w-8 h-8, rounded-full, bg-primary-500, white text, font-bold, 15px, flex-shrink-0, flex items-center justify-center
  Right: step title (font-semibold, 16px, neutral-900) + step body (14px, neutral-500, leading-relaxed, mt-1)

  Step 1:
    Title: "Position before latching"
    Body: "Bring Nora to your breast with her nose at nipple level — not her mouth. Her head should tip back slightly so her chin leads. This angle is what lets her open wide enough."

  Step 2:
    Title: "Wait for the wide-open mouth"
    Body: "Don't rush this. Wait until her mouth opens wide — wider than you'd expect. A half-open mouth means a shallow latch. Tickle her upper lip with your nipple to encourage her to gape."

  Step 3:
    Title: "Bring her to the breast — not the breast to her"
    Body: "Move Nora onto you with a quick, confident motion. Leaning forward to meet her leads to a hunched, uncomfortable feed. Let her come to you."

  Step 4:
    Title: "Check chin and nose"
    Body: "Her chin should press into the breast. Her nose should be clear or just grazing — not buried. If you see more areola above the nipple than below, the latch is asymmetric in the right way."

  Step 5:
    Title: "Watch for the rhythm"
    Body: "A rhythmic suck-pause-swallow pattern — you'll see her jaw moving and may hear a soft swallow every few sucks. If she's swallowing, milk is moving."

SECTION: "Three holds to try" (section heading style, mt-8 mb-2)
Subtext below heading: "Swipe to see each one." — 13px, neutral-500

SWIPEABLE HOLDS CAROUSEL:
  Container: relative, overflow-x-auto, snap-x snap-mandatory, -mx-6, px-6
  Each card: snap-start, min-w-[calc(100%-1.5rem)], mr-3, rounded-2xl, bg-white, border-2 border-neutral-200, px-5 py-5

  Hold 1 — Cross-Cradle (first card shown):
    Badge: "Best for early weeks" — small rounded-full bg-primary-500 text-white px-3 py-1 text-xs font-semibold, inline-block mb-3
    Title: "Cross-Cradle Hold" — font-bold, 20px, neutral-900
    Emoji/icon: 🤱 (large, 40px, mb-2)
    Description: "Support Nora's head with the hand opposite to the breast you're nursing from. This gives you more control over her head position — especially helpful while you're both still learning. Your palm cups the base of her skull; your thumb and forefinger are behind her ears, not pushing on the back of her head."
    Tip row (mt-3, 14px, primary-700): "💡 Switch to cradle once you've both got the hang of it."

  Hold 2 — Cradle:
    Badge: "Classic position" — bg-neutral-200 text-neutral-700
    Title: "Cradle Hold"
    Emoji: 🤱
    Description: "Nora's head rests in the crook of your arm, her body facing yours. The arm on the same side as the nursing breast supports her. This is the hold most people picture — and it's great once the latch is established and you're not needing to guide her head as precisely."
    Tip row: "💡 A nursing pillow helps bring Nora to the right height."

  Hold 3 — Football:
    Badge: "Great after C-section" — bg-accent-200 text-accent-700
    Title: "Football Hold"
    Emoji: 🏈
    Description: "Tuck Nora under your arm like a football, her body alongside yours with her legs pointing behind you. Her head is at your breast, supported by your hand. This keep weight off an incision after a cesarean and gives good visibility of the latch. Also useful for flat or inverted nipples."
    Tip row: "💡 No hold is 'right.' The right hold is the one that works for both of you."

  Pagination dots: 3 small circles below carousel, filled/unfilled based on active card, primary-500 / neutral-200

SECTION: "What your nipple tells you" (section heading style, mt-8 mb-3)

Two-item visual comparison (two cards side by side, grid grid-cols-2 gap-3):

  LEFT CARD (rounded-2xl, bg-success/10, px-4 py-4, text-center):
    Icon/emoji: ⭕ (large, 28px)
    Label: "Round" — font-semibold, 14px, success color
    Body: "Good latch." — 13px, neutral-500

  RIGHT CARD (rounded-2xl, bg-warning/10, px-4 py-4, text-center):
    Icon/emoji: 💄 (large, 28px)
    Label: "Flat or creased" — font-semibold, 14px, warning color
    Body: "Shallow. Help her open wider next time." — 13px, neutral-500

Caption below (14px, neutral-500, italic, mt-2, text-center): "Check your nipple when Nora unlatches."

TRY THIS CALLOUT (same style as all modules):
  "Before your next feed, position Nora so her nose is at nipple level — not her mouth. Let her head tip back before she latches. It feels counterintuitive, but it's what creates the angle for a wide-open mouth. Give yourself a few feeds to feel the difference."

Chat bridge text: "Questions about latching or positioning?"

---

PART 4 — MODULE 3: FEEDING YOUR SUPPLY
Route: /getting-started/supply
Read time: ~4 min read
Chat bridge text: "Questions about milk supply?"

VISUAL FORMAT: Supply loop diagram + myth-busting cards.

--- MODULE CONTENT ---

Short intro (16px, neutral-900, leading-relaxed, mb-6):
"Supply anxiety is the most common reason moms stop nursing in weeks 2–4. Most of the time, supply is actually fine — but without understanding how it works, every cluster feed or soft breast can feel like a warning sign. This module gives you the mental model."

SECTION: "How supply actually works" (section heading style, mb-4)

SUPPLY LOOP DIAGRAM:
  Container: rounded-2xl, bg-accent-200, px-5 py-5, mb-6
  Label above diagram: "THE SUPPLY LOOP" — 11px, accent-700, uppercase, tracking-wider, font-semibold, mb-3
  
  Four steps in a horizontal wrapping flex row (flex flex-wrap justify-center gap-2 items-center):
    Each step box: rounded-xl, bg-white, px-3 py-2, text-center, text-sm (13px), font-semibold, accent-700, shadow-sm
    Between each box: "→" in accent-500, font-bold, text-lg
    
    Box 1: "Baby nurses frequently"
    → 
    Box 2: "Breast empties"
    →
    Box 3: "Body gets the signal"
    →
    Box 4: "More milk is made"
    
  Caption below boxes (14px, accent-700, italic, text-center, mt-3):
  "The more milk is removed, the more your body makes. Frequency matters more than anything else."

Body paragraph (16px, neutral-900, leading-relaxed, mt-4):
"This loop only works if milk is being removed regularly. Your body doesn't know what your baby needs — it only knows what's being asked for. Every nursing session is a request. The more requests, the higher the supply."

SECTION: "5 things that aren't actually problems" (section heading style, mt-8 mb-4)

MYTH-BUSTING CARDS (5 cards, stacked vertically, gap-3):
  Each card structure: rounded-2xl, overflow-hidden, border border-neutral-200
  
  Top section: bg-neutral-100, px-4 py-3
    Label: "MYTH" — 10px, font-semibold, uppercase, tracking-wider, color: #C47F1A (warning)
    Text: [myth text] — 14px, neutral-700, leading-snug, mt-1
  
  Bottom section: bg-white, px-4 py-3, border-t border-neutral-200
    Label: "ACTUALLY" — 10px, font-semibold, uppercase, tracking-wider, color: #3A8F6F (success)
    Text: [truth text] — 14px, neutral-900, leading-snug, mt-1

  Card 1:
    Myth: "My breasts feel soft — supply must be dropping."
    Actually: Soft breasts mean your supply has regulated to match demand. Firmness isn't a sign of more milk.

  Card 2:
    Myth: "Nora is nursing constantly — I must not have enough."
    Actually: Cluster feeding is how babies build supply, not a signal it's failing. It passes in 1–2 days.

  Card 3:
    Myth: "I can only pump 1 oz — I must be drying up."
    Actually: Pump output is not an accurate measure of supply. Many moms with full supply pump small amounts.

  Card 4:
    Myth: "Breast size determines how much milk I can make."
    Actually: Milk-making capacity is about glandular tissue, not size. Small breasts can make a full supply.

  Card 5:
    Myth: "I should feel a letdown — if I don't, it's not working."
    Actually: Many moms never feel letdown as a physical sensation. It's still happening.

TRY THIS CALLOUT:
  "In the next 24 hours, aim for at least 8 nursing sessions. Don't watch the clock — watch Nora. Feed at the first signs of hunger, before she reaches the crying stage. Frequency now is an investment in supply for the next six weeks."

Chat bridge text: "Questions about milk supply?"

---

PART 5 — MODULE 4: READING NORA'S CUES
Route: /getting-started/cues
Read time: ~3 min read
Chat bridge text: "Questions about Nora's hunger or feeding cues?"

VISUAL FORMAT: Hunger cue spectrum + satiation section.

--- MODULE CONTENT ---

Short intro (16px, neutral-900, leading-relaxed, mb-6):
"Crying is late-stage hunger. By the time Nora is crying, she's already been asking for a while — and a very hungry baby is harder to latch. Here's the full sequence, from first signal to last resort."

SECTION: "The hunger spectrum" (section heading style, mb-4)

HUNGER SPECTRUM — 3 stages stacked vertically (gap-3):
  Each stage: rounded-2xl, bg-white, border border-neutral-200, px-4 py-4, flex flex-row, gap-4

  Left side of each stage: a vertical color bar (w-1.5, rounded-full, self-stretch)
    Early: bg-primary-300
    Active: bg-primary-500
    Late: bg-primary-700

  Right side (flex-1):
    Stage label row: stage name (font-bold, 14px, uppercase, tracking-wide) + "— ideal to feed now" or similar note (13px, neutral-500)
    Cue list: 3 bullet items (14px, neutral-700, leading-relaxed, mt-2, list-disc ml-4)

  EARLY STAGE (bar: primary-300):
    Label: "EARLY" — color: primary-300 or primary-500
    Note: "Best time to start a feed"
    Cues:
      • Stirring from sleep, fluttering eyes
      • Mouth movements, turning head (rooting)
      • Bringing hands toward mouth

  ACTIVE STAGE (bar: primary-500):
    Label: "ACTIVE" — color: primary-500
    Note: "Still a smooth feed"
    Cues:
      • Turning head side to side more urgently
      • Sucking on hands or fists
      • Increased body movement, small sounds

  LATE STAGE (bar: primary-700):
    Label: "LATE" — color: primary-700
    Note: "Calm her before latching"
    Cues:
      • Crying
      • Turning red, arching back
      • Inconsolable until settled

"Calm first" callout (bg-neutral-100, rounded-2xl, px-4 py-3, mt-2, mb-6):
  Row: 💡 icon + "If Nora reaches the crying stage, take a minute to calm her with skin-to-skin or rocking before you latch. A frantic baby has a harder time latching well."
  Style: 14px, neutral-700, leading-relaxed

SECTION: "When she's done" (section heading style, mt-6 mb-4)

SATIATION CUES — icon-row list (4 items, gap-2):
  Each item: flex flex-row, items-center, gap-3, py-2, border-b border-neutral-100 (last item no border)
  Left: small rounded icon circle (w-8 h-8, bg-primary-100, flex items-center justify-center, text-base emoji)
  Right: text (15px, neutral-900)

  Item 1: 😌 — "Releases the breast naturally and doesn't re-root"
  Item 2: 🙌 — "Hands open and relaxed (not fisted)"
  Item 3: 😴 — "Drowsy, satisfied expression"
  Item 4: ↩️ — "Turns head away when offered more"

Body below (14px, neutral-500, italic, mt-2):
"You don't need to time feeds. Watch for these signals instead of the clock."

SECTION: "About cluster feeding" (section heading style, mt-8 mb-3)

Cluster feeding callout (bg-accent-200, rounded-2xl, px-5 py-4):
  Label: "CLUSTER FEEDING" — 11px, accent-700, uppercase, tracking-wider, font-semibold
  Body: "If Nora nurses for 45 minutes, unlatches, fusses immediately, and wants back on — she's cluster feeding. It's normal, it's temporary (usually 1–2 days), and it's the most effective way babies build your supply for a growth spurt. It is not a sign that you don't have enough milk." — 15px, accent-700, leading-relaxed

TRY THIS CALLOUT:
  "At your next feed, watch Nora before she cries. See how early you can catch a hunger cue. The earlier the signal, the easier the latch — and the calmer the feed."

Chat bridge text: "Questions about Nora's hunger or feeding cues?"

---

PART 6 — MODULE 5: COMMON CONCERNS & WHEN TO CALL
Route: /getting-started/concerns
Read time: ~5 min read
Chat bridge text: "Dealing with one of these?"

VISUAL FORMAT: Scannable condition cards — one per concern.
This module is a reference tool, not a read-once article.

--- MODULE CONTENT ---

Short intro (16px, neutral-900, leading-relaxed, mb-6):
"Most first-six-weeks concerns are manageable — and most don't require stopping nursing. Here's a plain-language scan of the most common ones."

CONDITION CARDS (6 cards, stacked vertically, gap-4):

  Each card structure: rounded-2xl, bg-white, border border-neutral-200, px-5 py-4, overflow-hidden

  Card header row (flex flex-row items-center gap-3, mb-3):
    Left: large emoji icon (24px)
    Right: condition name (font-bold, 18px, neutral-900)

  Description (14px, neutral-500, leading-relaxed, mb-3)

  Two action rows:
    "Do this" row: flex items-start gap-2, py-2, border-t border-neutral-100
      Left: ✅ (14px)
      Right: action text (14px, neutral-700)
    "Call if" row: flex items-start gap-2, py-2, border-t border-neutral-100
      Left: ⚠️ (14px)
      Right: call trigger text (14px, warning color #C47F1A)

  CARD 1 — Engorgement
    Icon: 🫧
    Name: "Engorgement"
    Description: "Breasts overly full, hard, warm, and uncomfortable — usually days 3–5 when milk transitions from colostrum. Can make latching harder."
    Do this: Nurse or pump frequently. Gentle massage before feeding to soften. Cold compress after feeds. Reverse pressure softening technique helps Nora latch on a very firm breast.
    Call if: Redness, a hot patch, or fever develops. That's mastitis territory.

  CARD 2 — Nipple Pain
    Icon: 😬
    Name: "Nipple Pain"
    Description: "Some tenderness at the moment of latch-on in week 1 is common. Pain that persists throughout the entire feed, or that's getting worse instead of better, is not."
    Do this: Check the latch — pain is almost always the latch. Re-latch if needed. Air-dry nipples after feeds. Lanolin or breast milk can help with surface healing.
    Call if: Nipples are cracked, bleeding, or not improving after latch corrections. An IBCLC can usually identify and fix the issue in one session.

  CARD 3 — Blocked Duct
    Icon: 🔴
    Name: "Blocked Duct"
    Description: "A tender, firm lump or warm spot in the breast that's noticeable between feeds. Usually in one spot, doesn't move much."
    Do this: Keep nursing — frequent removal is the treatment. Apply warmth before feeds, gentle massage toward the nipple during. Point Nora's chin toward the lump if you can.
    Call if: The lump is still there after 2–3 days, or you develop a fever or flu-like symptoms. That's a sign it may be progressing to mastitis.

  CARD 4 — Mastitis
    Icon: 🌡️
    Name: "Mastitis"
    Description: "Flu-like symptoms — fever, body aches, chills, exhaustion — along with a red, hot, painful patch on the breast. Often develops quickly."
    Do this: Continue nursing — it helps clear the infection and does not harm Nora. Rest, fluids, ibuprofen for pain and inflammation.
    Call if: You have these symptoms. You likely need antibiotics. Don't wait it out.

  CARD 5 — Thrush
    Icon: 🍄
    Name: "Thrush"
    Description: "Burning or itching nipples between feeds (not just at latch), sharp shooting pains in the breast, or white patches inside Nora's mouth or on her tongue."
    Do this: Both of you need treatment at the same time — treating only one won't clear it.
    Call if: You suspect it. It doesn't resolve on its own and it's straightforward to treat with a prescription.

  CARD 6 — "Low Supply" Worry
    Icon: 📊
    Name: '"Low Supply" Worry'
    Description: "The most common breastfeeding concern — and most of the time, supply is actually sufficient. The feeling of not producing enough rarely matches reality."
    Do this: Count diapers. Six or more wet diapers per day means Nora is getting enough. Weight gain at check-ups is the clinical signal — not how your breasts feel or how much you can pump.
    Call if: Fewer than 6 wet diapers consistently, or Nora isn't gaining weight at her check-ups. Those are the actual indicators worth investigating.

Chat bridge text: "Dealing with one of these?"

TRY THIS CALLOUT (placed before the chat bridge, after the cards):
  "Keep this module bookmarked. It's most useful when something comes up, not just today."
  (Note: this Try This is intentionally short — this module is a reference, not a lesson)

---

PART 7 — MODULE 6: THE FOURTH TRIMESTER
Route: /getting-started/fourth-trimester
Read time: ~4 min read
Done button text: "I read this one ✓" (not the standard "Done with this one ✓")
Chat bridge text: "Need to talk through something?"

VISUAL FORMAT: Warm prose scroll — no diagrams, no grids. This module is the exception to the visual-format rule. Tone is softer, more personal.

--- MODULE CONTENT ---

Short intro (16px, neutral-900, leading-relaxed, mb-4):
"The fourth trimester is the name for those first three months after birth — for Nora, and for you. This module isn't about feeding mechanics. It's about everything else that's happening."

Subtext (15px, neutral-500, italic, mb-8):
"You don't have to be struggling to read this. It's here for whenever it's useful."

SECTION: "You might be feeling..." (section heading style, mb-4)

FEELING SCROLL — 6 items, stacked vertically (gap-4):
  Each item: rounded-2xl, bg-white, border border-neutral-200, px-5 py-4

  Item structure:
    Feeling label (font-semibold, 16px, neutral-900, mb-1): "[feeling]"
    Response (15px, neutral-500, leading-relaxed): "[response]"

  Item 1:
    Feeling: "Touched out."
    Response: "You've been needed by someone's body all day. The urge to not be touched is a real and common response to the physical demands of new motherhood. It's not a reflection of how you feel about Nora."

  Item 2:
    Feeling: "Not bonded yet."
    Response: "The lightning-bolt rush of love isn't universal. For many moms, love builds slowly — feed by feed, night by night. That's not a warning sign. It's a normal variation."

  Item 3:
    Feeling: "Grief for your old self."
    Response: "You've lost something real. The version of you that existed before this baby doesn't anymore. That's a loss worth naming — and it can coexist with also loving your baby fiercely."

  Item 4:
    Feeling: "Overwhelmed by the responsibility."
    Response: "You're keeping a person alive on no sleep, with a body that just went through something enormous. The weight of that is real. You don't have to feel on top of it."

  Item 5:
    Feeling: "Not sure this is what you imagined."
    Response: "Almost no one's early postpartum experience matches the version they pictured. The moms who seem to have it together are navigating the same gap between expectation and reality."

  Item 6:
    Feeling: "Lonelier than expected."
    Response: "Surrounded by people and still alone with this. It's one of the most common postpartum feelings, and one of the least talked about honestly."

SECTION: "When to reach out" (section heading style, mt-8 mb-3)

Body (16px, neutral-900, leading-relaxed, mb-4):
"If several of the feelings above feel heavy most days — not just today, not just this week, but most of the time — that's worth talking to someone about. Postpartum mood disorders are common, highly treatable, and not a reflection of how much you love Nora."

Resource card (rounded-2xl, bg-neutral-100, px-5 py-4, flex flex-row items-center gap-4):
  Left: 💙 icon (24px)
  Right:
    Title: "Postpartum Support International" — font-semibold, 15px, neutral-900
    Subtitle: "Helpline, provider finder, and online support groups." — 13px, neutral-500
    Link: "postpartum.net →" — 14px, primary-500, font-medium
    (Link is display-only in demo — no navigation needed)

No "Try This" callout on this module. The content is enough.

---

PART 8 — APPCONTEXT UPDATE

Add routes to AppContext.moduleProgress tracking for the new modules:
  'first-48', 'latch', 'supply', 'cues', 'concerns', 'fourth-trimester'

In the demo, pre-set moduleProgress['first-48'] = true (module 1 shown as completed).
All other modules default to false (not completed).

The "Done with this one ✓" button on each module sets moduleProgress[slug] = true and updates the library card to the completed state.

---

DO NOT CHANGE:
- App shell, routing outside /getting-started/*
- Bottom nav
- Home screen (including the Getting Started card — it will auto-reflect progress from AppContext)
- Chat, This Week, Onboarding
- Any existing Tailwind config or color tokens
- Module card visual structure in the library (only content and routes)
```
