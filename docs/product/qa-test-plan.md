# QA Test Plan — Latched
**Work through each scenario in order. Mark ✅ Pass / ❌ Fail / ⚠️ Partial next to each checkpoint.**

---

## HOW TO USE THIS PLAN

- Use an **Incognito / Private window** for each new-user scenario so there's no cached session
- Use a different test email for each scenario (e.g. `test+newborn@yourdomain.com`, `test+week2@yourdomain.com`)
- Use Stripe test card: `4242 4242 4242 4242` · Any future expiry · Any CVC · Any ZIP
- Keep the Supabase dashboard open in a second tab to verify DB writes: **Table Editor → feeding_sessions / user_profiles**
- Log results in the Notes column as you go

---

## FLOW 1A — NEW USER ONBOARDING (FIRST SESSION, COMPLETE)

> **Two different "week" numbers — don't conflate them:**
> - **Weeks postpartum** = `baby_weeks_old` = `floor(days_since_DOB / 7)`. This is the baby's age and what the chat personalization uses (FLOW 2/3). A 14-day-old is **2 weeks postpartum**.
> - **Plan week** = `getCurrentWeek()` = `min(max(floor(days / 7) + 1, 1), 6)` — the **+1**, clamped to 1–6. This is what the paywall headline ("starting at week X") and the Protocol "Week X of 6" show. A 14-day-old is on **plan week 3**.
>
> So a mom who is 2 weeks postpartum correctly sees a paywall/protocol **plan week 3** — not a contradiction. Both the paywall headline and the Protocol screen derive the plan week from the same clamped `getCurrentWeek()`, so they must always agree. Section titles below use **weeks postpartum**; the paywall/protocol row expectations use the **plan week**.

---

### 1A-i: Brand New Mom, Newborn (Week 0–1)

**Test data:**
- Name: Sarah / preferred name: Sarah
- Baby name: Oliver
- Baby DOB: today's date
- Feeding path: A (Nursing)
- Goal: Build supply
- Breast anatomy: Standard
- Pump: Skip

| # | Step | Expected | Result | Notes |
|---|------|----------|--------|-------|
| 1 | Open app in Incognito | Welcome screen loads | | |
| 2 | Tap primary CTA | Name/Address screen — "Step 1 of 3" visible | | |
| 3 | Enter "Sarah", select first name preference, tap Continue | Baby Name+DOB screen — "Step 2 of 3" | | |
| 4 | Enter "Oliver" in baby name field | Field accepts input | | |
| 5 | Set baby DOB to today | Date picker accepts today's date | | |
| 6 | Tap Continue | Feeding Path screen — "Step 3 of 3" | | |
| 7 | Select Path A (Nursing), tap Continue | Paywall screen — no step indicator | | |
| 8 | Verify paywall headline | "Sarah, here's your 6-week nursing plan — starting at week 1." | | |
| 9 | Tap paywall CTA | Redirects to Stripe sandbox checkout | | |
| 10 | Complete payment with test card | Redirects back to app with ?payment=success | | |
| 11 | Verify routing | Account Creation screen loads (not Welcome) | | |
| 12 | Create account with `test+newborn@yourdomain.com` + password | No error; advances to Goal screen | | |
| 13 | Verify "Personalizing your plan" label on Goal screen | Label appears above headline | | |
| 14 | Select a goal, tap Continue | Breast Anatomy screen | | |
| 15 | Select anatomy, tap Continue | Pump screen (Path A — should this appear?) | | |
| 16 | Tap "Skip for now →" on Pump | Home Transition screen | | |
| 17 | Wait for Home Transition to complete | Home screen loads | | |
| 18 | Check Supabase: user_profiles row | Row exists with correct baby_dob, feeding_path = 'A', name = 'Sarah' | | |
| 19 | Navigate to Protocol tab | Headline: "Sarah's 6-Week Plan" · "Week 1 of 6 · Starting from where you are" | | |
| 20 | Verify Week 1 content for Path A | Focus: "Colostrum, latch, and feeding on demand" | | |

**Known edge to watch:** Pump screen shows for Path A — per the onboarding restructure spec it should only show for Path B or C. If it appears for Path A, flag as a bug.

---

### 1A-ii: Mom at Week 2 postpartum

**Test data:**
- Name: Jamie / Jamie
- Baby name: (skip — tap "I'll add this later →")
- Baby DOB: 14 days ago
- Feeding path: B (Pumping)
- Goal: Return to work
- Breast anatomy: Skip for now
- Pump: Spectra S2

| # | Step | Expected | Result | Notes |
|---|------|----------|--------|-------|
| 1 | Open app in Incognito | Welcome screen | | |
| 2 | Complete Name screen (Jamie) | Step 1 of 3 | | |
| 3 | On Baby Name+DOB screen, tap "I'll add this later →" | Name field clears / skips; DOB picker still visible and required | | |
| 4 | Set DOB to 14 days ago, tap Continue | Feeding Path screen | | |
| 5 | Select Path B (Pumping), tap Continue | Paywall | | |
| 6 | Verify paywall headline | "Jamie, here's your 6-week pumping plan — starting at week 3." (14 days → floor(14/7)+1 = 3) | | |
| 7 | Complete payment + account creation | Flows through to Goal → Anatomy → **Pump screen appears (Path B ✓)** | | |
| 8 | On Pump screen, select "Spectra S2" | Selection registers | | |
| 9 | Tap Continue | Home Transition → Home | | |
| 10 | Check Supabase user_profiles | baby_name is null (skipped), feeding_path = 'B', pump saved | | |
| 11 | Protocol tab | "Week 3 of 6" — Path B Week 3 content: "Maximizing output and pumping efficiency" | | |
| 12 | Tap Week 1 pill | Shows Path B Week 1 content | | |
| 13 | Tap Week 3 pill | Shows Path B Week 3 content | | |

---

### 1A-iii: Mom at Week 3 postpartum

**Test data:**
- Name: Maria / Maria
- Baby name: Luna
- Baby DOB: 21 days ago
- Feeding path: C (Combination)
- Goal: Maintain supply while supplementing
- Pump: Skip for now

| # | Step | Expected | Result | Notes |
|---|------|----------|--------|-------|
| 1 | Complete full onboarding with above data | | | |
| 2 | Paywall headline | "Maria, here's your 6-week combination feeding plan — starting at week 4." (21 days → floor(21/7)+1 = 4) | | |
| 3 | Post-paywall: Pump screen appears (Path C ✓) | Pump screen shown | | |
| 4 | Tap "Skip for now →" | Advances to Home Transition | | |
| 5 | Protocol tab | "Week 4 of 6" — Path C content: "Protecting your supply while reducing stress" | | |
| 6 | Supply loop diagram visible in protocol? | N/A — that's Path B/supply module, not protocol | | |

---

### 1A-iv: Mom Past Week 6

**Test data:**
- Name: Taylor / Taylor
- Baby DOB: 10 weeks ago (70 days ago)
- Feeding path: A (Nursing)

| # | Step | Expected | Result | Notes |
|---|------|----------|--------|-------|
| 1 | Complete full onboarding with DOB 70 days ago | | | |
| 2 | Paywall headline | "Taylor, here's your 6-week nursing plan — starting at week 6." (clamped to 6) | | |
| 3 | Protocol tab | Week selector defaults to Week 6 pill | | |
| 4 | Verify subtext | "Week 6 of 6 · You've completed the foundational plan" | | |
| 5 | Attempt to tap Week 7 | No Week 7 pill exists (max is 6) | | |

---

## FLOW 1B — RETURNING USER, INTERRUPTED ONBOARDING

**Scenario:** User completed onboarding and paid, but closed the app before finishing the post-paywall personalization screens. They come back the next day.

**Setup:** Use the `test+newborn@yourdomain.com` account created in 1A-i. Open app in a fresh browser tab (not Incognito — they have a real account).

| # | Step | Expected | Result | Notes |
|---|------|----------|--------|-------|
| 1 | Open app fresh (new tab, not Incognito) | Loading spinner shows briefly | | |
| 2 | Session check resolves | App routes to Home (session still valid from 1A-i) | | |
| 3 | Verify profile loaded | Protocol shows "Sarah's 6-Week Plan", Week 1 | | |
| 4 | Sign out (Settings or wherever sign-out lives) | Redirects to Welcome screen | | |
| 5 | On Welcome, tap "Sign in →" | Sign In screen loads | | |
| 6 | Enter `test+newborn@yourdomain.com` + password, tap Sign in | Spinner, then routes to Home | | |
| 7 | Verify profile reloaded | Name, feeding path, protocol week all correct | | |
| 8 | Now simulate interrupted onboarding: in Supabase dashboard, set `onboarding_complete = false` on this user's profile row (if that field exists), then sign out and sign back in | App should handle gracefully — either resume post-paywall flow or route to Home without crashing | | |

**Note on step 8:** The app may not have explicit interrupted-onboarding recovery logic. If it routes to Home despite incomplete profile, that's acceptable for a prototype — note it as a known gap, not a blocking bug.

---

## FLOW 2 — RETURNING USER: MODULES + QUESTIONS

**Setup:** Sign in as `test+week2@yourdomain.com` (Jamie, Path B, Week 2).

### Part A: Getting Started Modules

| # | Step | Expected | Result | Notes |
|---|------|----------|--------|-------|
| 1 | Sign in, navigate to Getting Started | Library screen shows 6 active modules, none marked complete | | |
| 2 | Tap "The First 48 Hours" (Module 1) | Module loads — colostrum stat card + Normal/Worth a Call grid visible | | |
| 3 | Scroll through module | Content is readable, no layout overflow or cut-off text | | |
| 4 | Tap "Mark as complete" / done button | Module marked ✓ in library; completion persists (check on reload) | | |
| 5 | Return to library | Module 1 shows completion indicator | | |
| 6 | Tap "Getting a Good Latch" (Module 2) | Numbered step cards + holds carousel + nipple comparison loads | | |
| 7 | Swipe through the holds carousel | Cross-Cradle → Cradle → Football with pagination dots | | |
| 8 | Complete Module 2 | Marked complete in library | | |
| 9 | Tap "Understanding Your Supply" (Module 3) | Supply loop diagram + myth cards visible | | |
| 10 | Complete Module 3 | | | |
| 11 | Reload the app | All 3 completions persist across reload | | |

### Part B: Module questions (tap "Ask in chat →" from within a module)

| # | Step | Expected | Result | Notes |
|---|------|----------|--------|-------|
| 12 | From Module 3 (Supply), tap "Ask in chat →" | Chat screen opens | | |
| 13 | Ask: "How do I know if my supply is dropping?" | AI responds with relevant answer; typing indicator shows while loading | | |
| 14 | Ask: "What's the difference between foremilk and hindmilk?" | Relevant response; conversation context maintained | | |
| 15 | Ask a compound question: "I'm pumping every 3 hours and only getting 2 oz per session — is that normal for week 2, and should I try power pumping or add a session first?" | AI addresses both sub-questions (output norms for week 2 + power pump vs session frequency); doesn't give a one-dimensional answer | | |

**What to watch for on the compound question:**
- Does the response address the week 2 context specifically?
- Does it answer both "is this normal" AND "which action to take first"?
- Does it recommend consulting an IBCLC rather than giving a definitive medical answer?
- Is the response length appropriate (not a wall of text)?
- **Failure signal:** If it answers only one part and ignores the other, or gives a response that could apply to any week with no mention of week 2 norms, the system prompt personalization (user profile context passed to the edge function) is not threading through correctly. Check that `user_profile.feeding_path` and `baby_weeks_old` are being sent in the `chat-response` function call.

---

## FLOW 3 — RETURNING USER: EXTENDED CHAT SESSION

**Setup:** Sign in as `test+week3@yourdomain.com` (Maria, Path C, Week 3). Navigate directly to Chat.

Run the following questions **in order, in one session**, without refreshing the page between them. This tests conversation context and multi-turn coherence.

| # | Question to send | What to verify | Result | Notes |
|---|-----------------|----------------|--------|-------|
| 1 | "My baby is 3 weeks old and nursing feels really painful — is that normal at this stage?" | - Empathetic tone opens the response · - Differentiates normal latch-on discomfort from ongoing pain · - Mentions latch check · - Recommends IBCLC for persistent pain | | |
| 2 | "I've already tried the laid-back position and it helps a little but not completely" | - Recognizes context from Q1 (ongoing pain conversation) · - Builds on it, doesn't restart from scratch · - Suggests other positions (cross-cradle, football) or latch adjustments | | |
| 3 | "What does a correct latch actually look like? How do I know if I have one?" | - Visual/descriptive answer about latch signs (flanged lips, chin touching breast, no clicking sounds) · - Stays in context of the ongoing pain conversation | | |
| 4 | "Could it be thrush? My nipples are itchy and burning after feeds" | - Correctly identifies burning + itch as possible thrush indicators · - Distinguishes from regular latch pain · - Does NOT diagnose · - Recommends seeing provider | | |
| 5 | "What would thrush treatment look like for both me and the baby?" | - Mentions that both mom and baby typically need treatment · - References antifungal options without prescribing · - Recommends provider confirmation first | | |
| 6 | "Going back to the latch — if the thrush is treated but it still hurts, what else could cause pain that far into breastfeeding?" | - Correctly "goes back" — returns to latch pain thread · - Lists other causes: vasospasm, tongue tie, oversupply, position · - Coherent multi-thread conversation · **Failure signal:** If the AI responds as if Q6 is the first message with no context (e.g. asks "Can you tell me more about your situation?"), the `conversation_history` array is not being passed or is being dropped somewhere in the `chat-response` edge function call. Check the `handleSend` function — the `historyForLLM` variable should contain all prior messages before the current one. | | |

**Overall chat session checks:**
- [ ] Typing indicator appears for every question
- [ ] No question gets an empty or error response
- [ ] The AI doesn't repeat identical responses verbatim across questions
- [ ] Responses stay between 2–4 paragraphs (not too long, not too short)
- [ ] The "Ask me anything" empty state and suggestion chips were replaced once question 1 was sent
- [ ] Scrolling works — older messages remain visible as conversation grows

---

## CROSS-CUTTING CHECKS

Run these after all flows above are complete.

| # | Check | Expected | Result |
|---|-------|----------|--------|
| 1 | Reload app while signed in as any user | Spinner → Home (no flash of Welcome screen) | |
| 2 | Open app in Incognito with no session | Welcome screen (not Home) | |
| 3 | Sign out from Home | Welcome screen; chat history cleared | |
| 4 | Attempt to navigate to /tracker without being signed in | Unauthenticated empty state shown, no crash | |
| 5 | Log 3 tracker sessions as Jamie (Path B) | Sessions appear in history; today's stats update | |
| 6 | Reload app as Jamie after logging sessions | All 3 sessions still in history (persisted) | |
| 7 | Delete a session | Removed from list immediately; confirmed gone on reload | |
| 8 | Open Stripe sandbox dashboard | Test payment from 1A-i appears as Succeeded | |
| 9 | Check Supabase user_profiles has 4 rows | One per scenario (newborn, week2, week3, past-week6) | |

---

## BUG LOG

Use this table to capture anything that fails during testing.

| ID | Flow | Step | What happened | Severity (P1/P2/P3) | Lovable fix needed |
|----|------|------|---------------|---------------------|-------------------|
| | | | | | |
| | | | | | |
| | | | | | |

**Severity guide:**
- P1 — Blocks core user flow (app crashes, can't advance past a screen, data not saved)
- P2 — Wrong behavior but flow still completable (wrong content, missing personalization, UI misalignment)
- P3 — Polish / nice-to-have (copy tweak, minor visual issue, edge case)
