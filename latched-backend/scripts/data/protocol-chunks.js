// Hand-curated FAQ-style chunks for two long-form protocol markdown files.
//
// Sources of truth:
//   - protocol-blisters-nipple.md          (BLIS-* external_ids)
//   - protocol-axillary-breast-tissue.md   (AXIL-* external_ids)
//
// Each chunk becomes one faq_entries row + N faq_variants rows.  Variants are
// hand-written so retrieval intent stays predictable for the symptom phrasings
// moms actually use (blister, bleb, white dot, armpit lump, accessory tissue).
//
// If the source markdown is revised, update this file and re-run
//   npm run embed:protocols

export const PROTOCOL_CHUNKS = [
  // ─── Blister protocol ──────────────────────────────────────────────────────

  {
    external_id: 'BLIS-001',
    category: 'Blisters & Blebs',
    question_variants: [
      "How do I know if it's a blood blister or a milk blister?",
      "what's the difference between a blood blister and a bleb",
      "blood blister vs milk blister how can I tell",
      "I have a dot on my nipple how do I know what it is",
      "white spot vs red spot on nipple meaning",
      "how to identify a bleb on my nipple",
      "is the spot on my nipple a milk blister or a blood blister",
    ],
    answer:
      "The two types look and feel different, and they have different causes and treatments, so the distinction matters.\n\n" +
      "Blood blister: red, purple, or dark brown. Located on the nipple surface, tip, or areola. Caused by friction or trauma — usually a pump flange that's too small, dry pumping, or a shallow latch. The pain is sharp and immediate, worst during pumping or at latch.\n\n" +
      "Milk blister (bleb): white or yellow. Located on or just in front of a milk duct opening, usually on the nipple tip. Caused by skin growing over a duct opening and trapping milk behind it. The pain is a deep ache or burn, often worse after feeds.\n\n" +
      "If you're not sure which one you have, treat conservatively (warm soaks + lanolin + check your flange size) and reach out to your IBCLC if it doesn't resolve in 48 hours.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-002',
    category: 'Blisters & Blebs',
    question_variants: [
      "I have a blood blister on my nipple — what is it?",
      "what causes a blood blister on the nipple",
      "I have a dark spot on my nipple from pumping",
      "red blister on nipple while pumping",
      "purple spot on my nipple what is it",
      "can I keep nursing with a blood blister",
      "is a blood blister on my nipple dangerous for baby",
    ],
    answer:
      "A blood blister on your nipple is almost always a friction injury — and the fix is usually simple once you find the source.\n\n" +
      "It forms when friction or pressure breaks small blood vessels just under the skin. On the nipple, this almost always comes from one of three things: a pump flange that's too small and rubbing the nipple wall, pumping without lubrication, or a shallow latch that's compressing or twisting the nipple repeatedly.\n\n" +
      "The blister itself will heal on its own. The goal right now is to find what caused it and stop the irritation — otherwise it will come back, or get worse.\n\n" +
      "You can keep feeding and pumping through a blood blister. It may feel tender, but the blister itself does not make your milk unsafe for your baby. If it ruptures and bleeds during a feed, the small amount of blood is harmless to swallow — some babies pull off if they taste it, which is fine.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-003',
    category: 'Blisters & Blebs',
    question_variants: [
      "How do I treat a blood blister on my nipple?",
      "what should I do about a blood blister from pumping",
      "how to heal a blood blister on my nipple",
      "blood blister treatment while breastfeeding",
      "do I need to pop my blood blister",
      "should I drain a blood blister on my nipple",
      "best treatment for nipple blister from friction",
    ],
    answer:
      "Five steps, in order:\n\n" +
      "1. Identify the likely cause. If you're pumping, check your flange size — you should have roughly 2–4mm of space around your nipple inside the tunnel. If the nipple is rubbing the sides, the flange is too small. If you're nursing, look at the latch: is your nipple coming out misshapen (pointy or lipstick-shaped) after feeds?\n\n" +
      "2. Add lubricant before every pump session. Nipple butter, lanolin, coconut oil, or olive oil — a small amount on the nipple before placing the flange. This reduces friction dramatically and is often all that's needed to prevent recurrence. Make this standard practice, not just a fix.\n\n" +
      "3. Protect the blister. After feeds or pumping, apply a thin layer of medical-grade lanolin (Lansinoh, Medela Tender Care) or nipple butter and let it air dry briefly before covering. Cooled hydrogel pads soothe pain between sessions.\n\n" +
      "4. Do not drain or pop it. A blister that opens on its own can heal; one that's punctured intentionally has a much higher infection risk. Leave it alone.\n\n" +
      "5. Check and replace your pump parts. Cracked or worn membranes, valves, and flanges cause irregular suction and friction. If it's been more than 2–3 months since you replaced membranes and valves, replace them now.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-004',
    category: 'Blisters & Blebs',
    question_variants: [
      "When should I call my doctor about a nipple blister?",
      "is my nipple blister infected",
      "blood blister infected signs breastfeeding",
      "when to worry about a nipple blister",
      "red and warm around blister on nipple",
      "blister opened and skin underneath looks bad",
    ],
    answer:
      "Reach out if any of these:\n\n" +
      "• The blister is not improving after 48–72 hours of corrected flange/lubrication/protection.\n" +
      "• The area around the blister becomes red, warm, or swollen beyond the blister itself.\n" +
      "• You develop fever or flu-like symptoms — this suggests infection progressing toward mastitis. Call your OB today.\n" +
      "• The blister opens and the skin underneath looks infected: yellow discharge, increasing pain, spreading redness.\n" +
      "• Pain is severe enough that you're considering stopping. Reach out to your IBCLC first — there's usually a fixable cause.",
    escalation_trigger: true,
    escalation_text:
      "Fever or flu-like symptoms alongside a nipple blister suggest mastitis — call your OB today, don't wait.",
  },

  {
    external_id: 'BLIS-005',
    category: 'Blisters & Blebs',
    question_variants: [
      "What flange size should I use for my pump?",
      "how do I measure my nipple for a flange",
      "is my flange the right size",
      "why does my pump hurt my nipples",
      "how to lubricate my nipple before pumping",
      "what to put on nipples before pumping",
      "can I use coconut oil on my nipples while pumping",
    ],
    answer:
      "Flanges come in a range of sizes (typically 17mm to 36mm), and most pumps ship with 24mm as the default. Most people are not 24mm. Sizing yourself takes about 2 minutes:\n\n" +
      "1. Measure your nipple diameter at the base (not the areola) in millimeters, ideally after a warm shower when the tissue is relaxed.\n" +
      "2. Add 2–4mm to that measurement. That's your starting flange size.\n" +
      "3. During pumping, watch how your nipple moves: it should move freely without rubbing the sides. A small amount of areola may be drawn in, but the nipple should not pull in so much tissue that it feels painful or cuts off milk flow.\n\n" +
      "A correctly sized flange eliminates the most common cause of blood blisters in pumping moms.\n\n" +
      "Lubrication: anything food-safe and emollient works — lanolin, coconut oil, olive oil, nipple butter. Apply to the nipple before the session. It will not contaminate your milk.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-006',
    category: 'Blisters & Blebs',
    question_variants: [
      "What is a milk blister or bleb?",
      "I have a white dot on my nipple that hurts",
      "yellow spot on nipple tip what is it",
      "what causes a bleb",
      "milk blister vs blocked duct",
      "deep aching pain in nipple after feeds",
      "is the white spot on my nipple a bleb",
    ],
    answer:
      "A milk blister — sometimes called a bleb — is a small plug of skin that's grown over a milk duct opening. It looks like a white or yellow dot on the nipple tip and can be surprisingly painful.\n\n" +
      "Milk gets trapped behind the closed skin and the pressure of backed-up milk is what causes the pain: a deep burning or aching sensation, often worst at the end of a feed when the breast should feel relieved.\n\n" +
      "Blebs can recur in the same spot, especially in moms prone to blocked ducts. They're more common with oversupply, in pumping moms (particularly if flange fit is off), and in moms who've had mastitis.\n\n" +
      "Like blood blisters, you can keep feeding and pumping. In fact, nursing from the affected side is often the most effective treatment — the suction can open the blocked pore and release the trapped milk.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-007',
    category: 'Blisters & Blebs',
    question_variants: [
      "How do I treat a milk blister or bleb?",
      "how to get rid of a bleb on my nipple",
      "milk blister treatment at home",
      "bleb won't go away what do I do",
      "should I pop a milk blister",
      "how to open a bleb safely",
      "olive oil soak for bleb",
    ],
    answer:
      "1. Apply moist heat before every feed or pump session. A warm washcloth held against the nipple for 3–5 minutes, or a warm shower. Softening the skin makes the bleb easier to open.\n\n" +
      "2. Nurse or pump immediately after the heat. The suction often breaks the bleb open naturally. You may see a small release of thick or stringy milk — that's the trapped plug releasing, and relief usually comes quickly.\n\n" +
      "3. Gentle friction if needed. After the warm soak, rub the spot gently with a clean, wet washcloth. Do not dig at it with a fingernail or any sharp object.\n\n" +
      "4. Olive oil soaks. Soaking the nipple in a small cup of warm olive oil for 10–15 minutes before feeding can soften the skin over the bleb and speed resolution.\n\n" +
      "5. If the bleb doesn't open on its own after 48 hours, contact your IBCLC. Some IBCLCs can open a persistent bleb with a sterile needle under appropriate conditions — this is not something to attempt at home with a regular needle.\n\n" +
      "6. After it opens, keep the area clean and apply lanolin after feeds to help the skin heal. Watch for signs of infection (increasing pain, redness, swelling, fever).\n\n" +
      "7. If blebs recur frequently, talk to your IBCLC or OB about lecithin (typically sunflower, 1,200mg 3–4x/day) — not a cure, but it reduces milk stickiness and may decrease frequency. Discuss with your provider before starting.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-008',
    category: 'Blisters & Blebs',
    question_variants: [
      "When should I call my IBCLC or doctor about a bleb?",
      "bleb won't open after 48 hours",
      "milk blister getting worse",
      "is my bleb infected",
      "should I let an IBCLC open my bleb",
      "bleb with fever",
    ],
    answer:
      "Reach out if any of these:\n\n" +
      "• The bleb hasn't opened after 48–72 hours of moist heat + nursing/pumping.\n" +
      "• Signs of infection: spreading redness, swelling, warmth, or discharge.\n" +
      "• Fever or flu-like symptoms — this can indicate mastitis. Call your OB today.\n" +
      "• Pain severe enough that you're affecting feeding frequency. Reach out to your IBCLC before reducing feeds, since skipping feeds can worsen a bleb or cause a blocked duct.",
    escalation_trigger: true,
    escalation_text:
      "Fever alongside a bleb or breast pain can indicate mastitis — call your OB today.",
  },

  {
    external_id: 'BLIS-009',
    category: 'Blisters & Blebs',
    question_variants: [
      "Why do my milk blisters keep coming back?",
      "my bleb keeps recurring",
      "how to prevent recurring blebs",
      "lecithin for blocked ducts and blebs",
      "how much sunflower lecithin should I take",
      "tight bras and recurring blebs",
    ],
    answer:
      "Blebs are more common in moms with: oversupply, a history of blocked ducts or mastitis, frequent changes in feeding frequency (supply-demand mismatches), or tight or poorly fitting bras and tops.\n\n" +
      "The lecithin approach: lecithin is a phospholipid that's naturally present in breastmilk. Supplementing may reduce milk viscosity (make it 'slipperier'), which can reduce the frequency of blebs and blocked ducts in moms prone to them. Sunflower lecithin is generally preferred over soy. Typical dose is 1,200mg, 3–4 times a day. Discuss with your provider before starting.\n\n" +
      "Some moms also notice tight clothing or underwire bras correlate with recurrence. Clinical evidence is limited, but if you're prone to recurrent blebs, it's worth tracking whether there's a pattern.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-FAQ-01',
    category: 'Blisters & Blebs',
    question_variants: [
      "I popped my blood blister — what do I do now?",
      "I accidentally popped a blood blister on my nipple",
      "blood blister opened what now",
      "blood blister burst from pumping",
      "what to do after a nipple blister pops",
      "my blister opened during a feed",
    ],
    answer:
      "Clean the area gently with saline or a clean cloth and warm water. Apply a thin layer of lanolin or antibiotic ointment (Bacitracin is commonly used) and cover loosely with a non-adherent dressing or a hydrogel pad if you have one.\n\n" +
      "Watch for signs of infection over the next 24–48 hours: increasing redness, warmth, swelling, or discharge beyond a small amount of clear fluid. If you see any of those, contact your OB.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-FAQ-02',
    category: 'Blisters & Blebs',
    question_variants: [
      "My blister bled during a feed — is my milk safe?",
      "is blood in breastmilk safe for baby",
      "I saw blood in my pumped milk from a blister",
      "baby swallowed blood from my nipple blister",
      "do I throw out milk with blood in it",
      "is bloody breastmilk okay to give baby",
    ],
    answer:
      "Yes. A small amount of blood in breastmilk is not harmful to your baby. Some babies pull off the breast when they taste it — that's fine; just switch sides and try again at the next feed. If you're pumping and see blood in the bottle, you can still give that milk to your baby. If it bothers you, you can discard that session's output, but it's not unsafe.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-FAQ-03',
    category: 'Blisters & Blebs',
    question_variants: [
      "Can I still pump and nurse with a blister?",
      "do I need to stop pumping because of a blister",
      "should I rest my nipple from a bleb",
      "can I keep breastfeeding with a milk blister",
      "do I need to take a break from feeding for nipple blister",
    ],
    answer:
      "Yes. You don't need to take a break from feeding or pumping. In fact, continuing to feed is usually part of the treatment, especially for blebs — the suction can open the blocked pore. The goal is to address the cause (friction, latch, flange fit) so you're not making it worse, not to rest the nipple entirely.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-FAQ-04',
    category: 'Blisters & Blebs',
    question_variants: [
      "How do I know if my flange size is causing my blister?",
      "signs my flange is too small",
      "is my flange wrong size for my nipple",
      "nipple rubbing against the flange tunnel",
      "red marks on side of nipple after pumping",
    ],
    answer:
      "The clearest sign: your nipple is rubbing against the side of the flange tunnel during pumping. You might notice this as visible friction, a red mark on the side of the nipple after pumping, or pain that's worst during the pumping session itself rather than at latch-on.\n\n" +
      "If you have white marks, compressed areas, or blistering on the sides of the nipple (rather than the tip), that's friction from a flange that's too small.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-FAQ-05',
    category: 'Blisters & Blebs',
    question_variants: [
      "I've been using lubricant and my blister still came back — what now?",
      "blood blister keeps coming back even with lanolin",
      "blisters returning despite lubricant",
      "why do I keep getting blood blisters",
    ],
    answer:
      "If you've corrected your flange size, you're lubricating before every session, and blood blisters are still recurring, something else may be driving it: worn pump parts causing irregular suction, an inefficient pump, or a latch issue if you're nursing.\n\n" +
      "Contact your IBCLC — this is diagnosable and fixable, but it needs a live evaluation.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-FAQ-06',
    category: 'Blisters & Blebs',
    question_variants: [
      "The bleb keeps coming back in the same spot — is something wrong with me?",
      "recurring bleb in the same place",
      "why does my milk blister keep returning to the same spot",
      "same spot bleb over and over",
    ],
    answer:
      "No. Recurrent blebs in the same location are common and usually mean there's a small structural irregularity at that duct opening. This is manageable — lecithin supplementation, staying well-hydrated, and regular feeding frequency all help reduce recurrence. Your IBCLC may also have additional strategies based on your specific situation.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-FAQ-07',
    category: 'Blisters & Blebs',
    question_variants: [
      "How long does a blood blister take to heal?",
      "how long does a nipple blister take to heal",
      "blood blister healing time while breastfeeding",
      "when will my nipple blister go away",
    ],
    answer:
      "With the cause corrected (flange size fixed, lubrication in place, latch improved), most blood blisters heal within 3–7 days. If it's not improving after a week, something is still irritating the area.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-FAQ-08',
    category: 'Blisters & Blebs',
    question_variants: [
      "How long does a milk blister take to resolve?",
      "how long until my bleb goes away",
      "milk blister duration",
      "bleb won't resolve in a week",
    ],
    answer:
      "Most blebs that open with moist heat and nursing resolve within 1–3 days. Stubborn ones that don't open with home treatment may need an IBCLC to release them. After opening, the skin heals in another few days.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-FAQ-09',
    category: 'Blisters & Blebs',
    question_variants: [
      "Do I need antibiotics for a nipple blister?",
      "should I take antibiotics for a bleb",
      "is antibiotic ointment needed for nipple blister",
      "antibiotics for blood blister",
    ],
    answer:
      "Not for a blister by itself. Antibiotics are for infection.\n\n" +
      "A blister becomes infected if the skin breaks and bacteria enter — signs include increasing redness, warmth, swelling, fever, or discharge that looks purulent (cloudy, yellow-green). An uncomplicated blister, even one that has opened, does not require antibiotics.",
    escalation_trigger: false,
  },

  {
    external_id: 'BLIS-FAQ-10',
    category: 'Blisters & Blebs',
    question_variants: [
      "I have a fever and my breast hurts — is this from the blister?",
      "fever with nipple blister",
      "blister and chills breastfeeding",
      "do I have mastitis or just a blister",
      "fever and breast pain after a bleb",
    ],
    answer:
      "Fever plus breast pain is mastitis until proven otherwise — and mastitis needs to be addressed promptly. Call your OB today.\n\n" +
      "A blister can be an entry point for infection, but mastitis often develops independently. Either way, the protocol is the same: contact your provider, continue feeding from the affected side (it's safe and helps), and expect to be evaluated for antibiotics.",
    escalation_trigger: true,
    escalation_text:
      "Fever + breast pain = call your OB today. Continue feeding from the affected side — it's safe and helps.",
  },

  // ─── Axillary breast tissue protocol ──────────────────────────────────────

  {
    external_id: 'AXIL-001',
    category: 'Axillary Tissue',
    question_variants: [
      "What is the lump in my armpit when my milk came in?",
      "I have a lump in my armpit after birth — am I sick?",
      "what is axillary breast tissue",
      "what is accessory breast tissue",
      "tender lump in armpit when milk came in",
      "swollen armpit days after delivery",
      "milk in my armpit how is that possible",
      "engorgement in the armpit",
    ],
    answer:
      "If you feel a swollen, tender lump in your armpit when your milk comes in, you're not imagining it — and it's almost certainly not what you're afraid it is.\n\n" +
      "Axillary breast tissue (also called accessory breast tissue) is a normal anatomical variation: a small amount of breast tissue develops in the armpit along the same embryonic 'milk line' that runs from armpit to groin. Somewhere between 2–6% of women have it to a noticeable degree, and the vast majority don't know until milk comes in.\n\n" +
      "When your milk arrives — typically days 2–5 after birth — this tissue responds exactly the same way your breasts do. It fills with milk, swells, and gets firm and tender. It can feel like a hard, golf-ball-sized lump tucked into the armpit or along the side of the chest near the bra line.\n\n" +
      "It is not a lymph node. It is not a mass. It is breast tissue doing what breast tissue does.\n\n" +
      "What makes it uniquely tricky: axillary tissue usually has no duct opening to a nipple, so it can't be pumped or nursed out the way regular breast engorgement can. The milk has to resolve through reabsorption, which takes longer and is more uncomfortable than typical engorgement.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-002',
    category: 'Axillary Tissue',
    question_variants: [
      "How do I treat axillary breast tissue swelling?",
      "what helps engorgement in the armpit",
      "how to get rid of the milk lump in my armpit",
      "cold compress for armpit engorgement",
      "cabbage leaves for armpit swelling",
      "what to do for accessory breast tissue pain",
      "treatment for armpit lump when milk comes in",
    ],
    answer:
      "Seven steps:\n\n" +
      "1. Don't panic. This is not an emergency. If milk just came in and you have a firm, tender swelling in your armpit, axillary breast tissue is the most likely explanation by a wide margin.\n\n" +
      "2. Cold compresses are your main tool. Unlike regular breast engorgement (where warmth helps milk flow), axillary tissue benefits from cold, which reduces inflammation and slows milk production in that tissue. Apply a cold pack (frozen peas wrapped in a cloth works well) for 15–20 minutes several times a day.\n\n" +
      "3. Cold green cabbage leaves applied directly to the armpit are a time-honored and surprisingly effective approach for engorgement that won't drain. Change them every 2 hours or when they wilt. Do not put cabbage on your breast if you're trying to maintain supply — only on the armpit area.\n\n" +
      "4. Anti-inflammatory pain relief. Ibuprofen (if cleared by your provider) reduces both pain and inflammation. Follow standard postpartum dosing.\n\n" +
      "5. Supportive clothing. A well-fitting bra or compression tank that supports without digging into the area. Avoid anything that puts direct pressure on the swollen spot.\n\n" +
      "6. Do not try to manually express from the armpit. There's no duct opening there; aggressive massage or compression won't help and can increase inflammation. Gentle support, not pressure.\n\n" +
      "7. It will resolve. Without active stimulation, the milk in that tissue will be reabsorbed over a few days to 1–2 weeks as supply regulates. It will get better.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-003',
    category: 'Axillary Tissue',
    question_variants: [
      "When should I worry about a lump in my armpit postpartum?",
      "armpit lump won't go away",
      "fever with armpit lump after birth",
      "armpit swelling getting worse not better",
      "axillary tissue red hot painful",
      "when to call doctor about armpit engorgement",
    ],
    answer:
      "Reach out if any of these:\n\n" +
      "• The swelling is not improving at all after 5–7 days.\n" +
      "• The area becomes red, hot, and significantly more painful — especially with fever (this would suggest mastitis in the axillary tissue, which is rare but possible).\n" +
      "• You develop fever above 100.4°F / 38°C.\n" +
      "• You're unsure whether what you're feeling is actually axillary tissue or something else. Any doubt is reason enough — call your OB or midwife for an in-person check. This is exactly the kind of thing that warrants a quick evaluation.\n" +
      "• The swelling persists beyond 2 weeks or continues to grow rather than shrink.",
    escalation_trigger: true,
    escalation_text:
      "Fever + red/hot armpit can indicate mastitis in axillary tissue — call your OB today. If you're at all unsure what the lump is, get it evaluated.",
  },

  {
    external_id: 'AXIL-004',
    category: 'Axillary Tissue',
    question_variants: [
      "Why do I have breast tissue in my armpit?",
      "what causes accessory breast tissue",
      "embryology of the milk line",
      "what is polymastia",
      "why does some breast tissue end up in the armpit",
    ],
    answer:
      "During fetal development, breast tissue forms along the 'milk line' — a ridge running from each armpit down through the chest to the groin, bilaterally. In most people, all of this tissue except the two main breast mounds regresses before birth. In some people, a small amount persists, most commonly in the armpit.\n\n" +
      "This tissue is entirely normal and not associated with any health risk on its own. It contains the same hormone receptors as regular breast tissue, so it responds to the estrogen and progesterone changes of pregnancy, and then to the prolactin surge when milk comes in. It will also respond to menstrual cycle hormones — some women notice it becoming tender in the days before their period.\n\n" +
      "After weaning, it typically becomes less noticeable. In subsequent pregnancies it will likely swell again when milk comes in, but once you know what it is, it's much easier to manage.\n\n" +
      "Medical terms you'll see: 'accessory breast tissue' or 'polymastia' (though true polymastia technically involves a distinct nipple or areola, which is rarer). Most cases are tissue-only, no nipple — clinically benign and not requiring treatment beyond supportive care.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-FAQ-01',
    category: 'Axillary Tissue',
    question_variants: [
      "I felt a hard lump in my armpit when my milk came in — should I be scared?",
      "scared about a lump in my armpit postpartum",
      "armpit lump after birth — is it cancer",
      "hard lump in armpit days after delivery",
      "is the armpit lump a tumor",
      "should I be worried about armpit lump when milk came in",
    ],
    answer:
      "Almost certainly not. If it appeared when your milk came in and your breasts are also engorged, this is very likely axillary (accessory) breast tissue responding to milk arriving. It's breast tissue — not a lymph node, not a tumor, not an infection.\n\n" +
      "That said: if you're at all uncertain, call your midwife or OB for a quick check. They can confirm what it is in minutes and put your mind at ease. Don't sit with the fear.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-FAQ-02',
    category: 'Axillary Tissue',
    question_variants: [
      "Can I pump out the milk in my armpit?",
      "how do I drain axillary breast tissue",
      "can I express milk from my armpit",
      "how to get the milk out of armpit tissue",
    ],
    answer:
      "Generally no. Axillary breast tissue usually does not have a duct connecting to a nipple opening, so there's nowhere for the milk to exit through pumping or nursing. It has to be reabsorbed by your body as your supply regulates.\n\n" +
      "Cold compresses and cabbage leaves are the most effective tools — not milk removal.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-FAQ-03',
    category: 'Axillary Tissue',
    question_variants: [
      "How long will the armpit swelling last?",
      "axillary breast tissue swelling duration",
      "how many days does accessory breast tissue stay swollen",
      "when will my armpit lump go away",
    ],
    answer:
      "For most moms, the significant swelling resolves within a few days to 1–2 weeks as overall supply regulates and the tissue is no longer being stimulated by peak prolactin. It rarely persists longer than that in the acute phase. You may notice residual tenderness for a bit longer.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-FAQ-04',
    category: 'Axillary Tissue',
    question_variants: [
      "Will my axillary breast tissue swell again with another baby?",
      "does accessory breast tissue come back with each baby",
      "armpit tissue with future pregnancies",
      "will this happen again next time my milk comes in",
    ],
    answer:
      "If you have it, yes — in the same location. It will swell again if you have another baby and your milk comes in. It may also become mildly tender before your period once your cycle returns. Knowing it's there means you'll be prepared next time rather than frightened.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-FAQ-05',
    category: 'Axillary Tissue',
    question_variants: [
      "Can I have axillary breast tissue removed?",
      "surgery for accessory breast tissue",
      "is surgical removal of armpit breast tissue worth it",
      "how to permanently get rid of axillary breast tissue",
    ],
    answer:
      "The only permanent option is surgical removal, and that's not a breastfeeding decision — that's a conversation for a breast surgeon after you're done breastfeeding, if the tissue is significantly bothersome.\n\n" +
      "It's elective and not something most people need. Many women with axillary breast tissue never have it surgically removed and live completely normally with it.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-FAQ-06',
    category: 'Axillary Tissue',
    question_variants: [
      "Can axillary breast tissue get infected like a blocked duct?",
      "can I get mastitis in my armpit",
      "infected accessory breast tissue signs",
      "mastitis in the axillary tissue",
    ],
    answer:
      "Yes, though it's uncommon. If the area becomes significantly redder, hotter, and more painful — especially with fever — that can indicate mastitis in the axillary tissue.\n\n" +
      "Treatment is the same as mastitis in the breast: continue trying to manage drainage as best you can, seek antibiotic evaluation from your OB, and treat promptly. Don't wait if you have fever plus significant breast or armpit pain.",
    escalation_trigger: true,
    escalation_text:
      "Fever plus a red, hot, painful armpit can indicate mastitis in axillary tissue — call your OB today.",
  },

  {
    external_id: 'AXIL-FAQ-07',
    category: 'Axillary Tissue',
    question_variants: [
      "Should I put heat on my swollen armpit?",
      "warm compress for armpit engorgement",
      "heat or cold for axillary breast tissue",
      "is heat good for armpit lump postpartum",
    ],
    answer:
      "No — this is different from regular breast engorgement. Because the milk in axillary tissue generally cannot be drained, heat would increase blood flow and inflammation without providing relief.\n\n" +
      "Use cold instead. This is the opposite of what you'd do for a blocked duct in the breast itself.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-FAQ-08',
    category: 'Axillary Tissue',
    question_variants: [
      "My provider said it's just a swollen lymph node — could they be wrong?",
      "is the armpit lump a lymph node or breast tissue",
      "doctor said armpit lump is a lymph node but it appeared with milk",
      "swollen lymph node vs accessory breast tissue postpartum",
    ],
    answer:
      "Possibly, yes. Axillary breast tissue is frequently misidentified as swollen lymph nodes, especially by providers who aren't seeing it in the context of milk coming in.\n\n" +
      "The key distinction: swollen lymph nodes from infection are typically multiple, pea-sized, and associated with illness; axillary breast tissue is usually a single larger, firm, rubbery mass that appeared specifically when milk came in and sits roughly where a bra underwire would.\n\n" +
      "If you're told it's a lymph node but the timing matches your milk coming in, it's worth mentioning that possibility. Most providers will recognize it once they hear the timeline.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-FAQ-09',
    category: 'Axillary Tissue',
    question_variants: [
      "Will resolving the armpit swelling reduce my milk supply?",
      "does axillary breast tissue affect my milk supply",
      "will accessory breast tissue going down lower my supply",
      "does the armpit tissue contribute to overall supply",
    ],
    answer:
      "No. Axillary breast tissue is a small amount of additional glandular tissue — it doesn't meaningfully contribute to your overall supply, and its engorgement resolving won't reduce your supply.\n\n" +
      "Your supply is determined by how much you're feeding and pumping from your actual breasts.",
    escalation_trigger: false,
  },

  {
    external_id: 'AXIL-FAQ-10',
    category: 'Axillary Tissue',
    question_variants: [
      "I had a lump in my armpit before pregnancy — is it the same thing?",
      "non-tender lump in armpit before pregnancy",
      "fatty deposit or breast tissue in armpit",
      "is the lump I always had axillary breast tissue",
    ],
    answer:
      "It could be. Many women with axillary breast tissue notice it as a soft, non-tender area even before pregnancy — easy to mistake for a fatty deposit. If it swells significantly when your milk comes in, that confirms it's breast tissue.\n\n" +
      "If you're ever uncertain about a lump in your armpit outside the context of milk coming in, get it evaluated by your provider. This protocol specifically covers the postpartum/breastfeeding context — any new or changing lump outside of that should be assessed.",
    escalation_trigger: false,
  },
];
