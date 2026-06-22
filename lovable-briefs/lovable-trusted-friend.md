# Lovable Build Brief — Trusted Friend Companion Layer
**Feature:** Anticipatory Guidance + Milestone Memory + Daily Check-In  
**Who this is for:** Ashley, pasting prompts directly into Lovable.  
**Backend dependency:** `get-companion-item`, `dismiss-companion-item`, `log-checkin`, `evaluate-companion-triggers` edge functions (see `trusted-friend-backend-plan.md`).  
**Reference files:** `anticipatory-guidance-library.docx`, `milestone-memory-library.docx`  
**Last updated:** 2026-05-31

---

## Design Principles for This Feature

Before pasting any prompts, internalize these rules. They override default Lovable behavior.

1. **No push notifications in UI.** All companion items surface in-app at next open. Never prompt the user to enable notifications in this flow.
2. **One item per session.** Never stack multiple unacknowledged companion items. Show the highest-priority item, full stop.
3. **Two taps maximum for any action** — read, dismiss, expand, share, check in. If an action takes more than two taps, redesign it.
4. **The companion layer must not block navigation.** The daily check-in and companion cards are dismissable in one tap. A mom who wants to get to her protocol or chat must never be forced to engage.
5. **Voice: warm, specific, unhurried.** The messages were written to sound like a friend who has been paying attention. Do not add app chrome, badges, or celebratory UI elements that undercut this tone. No confetti, no big "🎉" moments, no "Level Up" language.
6. **Share cards are optional, not prominent.** The share mechanic is there for the mom who wants it — not pushed.

---

## Color Reference (existing system — no new colors needed)

| Name | Hex | Use in companion layer |
|---|---|---|
| `primary-300` | `#A8D5D1` | AG card left border, check-in background tint |
| `primary-500` | `#4E9E95` | AG card icon, "Learn more" link, confirm buttons |
| `primary-700` | `#2D7A72` | AG headline text |
| `accent-500` | `#C17C5A` | Milestone card accent, six-weeks/three-months premium treatment |
| `neutral-50`  | `#FDFAF7` | Card backgrounds |
| `neutral-100` | `#F5F0EA` | Check-in button default state |
| `neutral-200` | `#E3D9CF` | Card border, divider |
| `neutral-500` | `#8A7F78` | Secondary text (sources, timestamps) |
| `neutral-900` | `#2D2926` | Primary message text |
| `warning`     | `#C47F1A` | Escalation callout border and icon |
| `success`     | `#3A8F6F` | Milestone card checkmark accent |

---

## PROMPT 1 — Daily Check-In Bottom Sheet

> **What this prompt does:** Adds the daily check-in UI. A bottom sheet that slides up when the mom opens the app (once per day). Four mood options, one tap to respond, one tap to dismiss. This is the highest-frequency UI element in the companion layer — it must feel effortless.

---

**Paste this into Lovable:**

```
Add a Daily Check-In bottom sheet to the app. It slides up automatically when the home screen loads, once per day maximum. After the user responds or dismisses, it does not appear again until the next calendar day.

---

TRIGGER LOGIC

On home screen mount:
  1. Call GET /functions/v1/check-checkin-status (returns { already_submitted: boolean })
  2. If already_submitted: do not show the sheet
  3. If not submitted: show the bottom sheet with a 400ms delay after mount (feels intentional, not jarring)

---

BOTTOM SHEET DESIGN

Container:
- Slides up from the bottom. Height: auto (fits content). Max height: 55% of screen.
- Background: neutral-50 (#FDFAF7), rounded top corners (radius 20px)
- Shadow: 0 -4px 24px rgba(0,0,0,0.10)
- A narrow drag handle pill (32x4px, neutral-200, centered, 12px from top) — purely decorative

Header (top of sheet, 16px padding):
- Headline: "How's today going?"
  Font: Plus Jakarta Sans, 600, 18px, neutral-900
- Subtext: "Tap one — takes one second."
  Font: Plus Jakarta Sans, 400, 14px, neutral-500
- "×" dismiss button, top-right corner, 24x24px, neutral-500 — dismisses immediately, logs nothing

Mood grid:
- 2×2 grid of mood buttons, 12px gap, full width minus 32px padding
- Each button: rounded-xl (12px), 72px height, neutral-100 background
  Active/pressed state: primary-300 background, primary-700 border (1px)
- Button content: emoji (28px) + label (Plus Jakarta Sans, 500, 13px, neutral-900)

Moods (exact labels and emoji):
  Row 1: [🔥  Struggling]  [😐  Hanging in there]
  Row 2: [😊  Good day]    [🎉  Small win]

On mood tap:
  1. Animate the tapped button: scale 0.95 → 1.05 → 1.0 (100ms), background changes to primary-300
  2. POST /functions/v1/log-checkin with { mood: <value> }
  3. Show the follow-up message returned from the API:
     - Replace the mood grid with the follow-up text
     - Font: Plus Jakarta Sans, 400, 16px, neutral-900, line-height 1.6
     - Below text: "Got it →" button (text only, primary-500, 14px, 500 weight) that closes the sheet
  4. If the API returns a pending_ag_item: after the "Got it" tap, do NOT close the sheet immediately.
     Instead, transition to the AG card view (see Prompt 2 below). The AG card replaces the check-in content within the same sheet.

IMPORTANT:
- "Small win" follow-up has a "Tell me about it →" link below the follow-up text.
  This opens the main chat tab with focus. It does not add a new screen.
- Sheet can be dragged down to dismiss at any point (swipe down gesture).
- Tapping the backdrop (above the sheet) dismisses it.
- Dismissed (no mood tapped): logs nothing, does not call the API.
```

---

## PROMPT 2 — Anticipatory Guidance Card

> **What this prompt does:** Adds the AG card component. Can appear in two contexts: (1) as a standalone sheet when get-companion-item returns an AG item on app open, (2) inline after a check-in response when mood is "Struggling" and an AG item is pending.

---

**Paste this into Lovable:**

```
Add an Anticipatory Guidance card component. It renders as a bottom sheet or inline within the check-in sheet (same container, different content state).

---

AG CARD STRUCTURE

Container:
- Same bottom sheet container as the check-in (neutral-50, rounded top, shadow)
- Auto height. Scrollable if content exceeds 65% of screen.

Top strip (full-width color band, 4px height, primary-300 background):
- No text. Just a subtle color cue that this is an AG item.

Card body padding: 20px horizontal, 16px vertical

Header row:
- Left: small "Heads up" label (Plus Jakarta Sans, 500, 11px, primary-700, uppercase, letter-spacing 0.08em)
- Right: "×" dismiss, 24x24px, neutral-500

Headline:
- Font: Plus Jakarta Sans, 700, 20px, neutral-900
- Margin: 8px top, 4px bottom

Body text (in-app message):
- Font: Plus Jakarta Sans, 400, 16px, neutral-900, line-height 1.65
- Margin: 4px top

Escalation callout (only if the item has escalation_text):
- Separate box below body text, 12px top margin
- Border-left: 3px solid warning (#C47F1A)
- Background: #FFF8EC
- Padding: 10px 14px
- Content: ⚠ icon (16px) + escalation text (Plus Jakarta Sans, 400, 14px, neutral-900)

Learn more accordion:
- Collapsed by default
- Trigger: "Learn more →" text link (primary-500, 14px, 500 weight), 12px top margin
- When expanded: learn_more text appears below, same font as body, neutral-700 color
- Sources line at bottom of learn_more: neutral-500, 12px, italic
- "Show less ↑" link to collapse

Bottom row (two actions, horizontal):
- Left: "Dismiss" (text button, neutral-500, 14px)
- Right: "Save to journal" (text button, primary-500, 14px) — v1.1 feature, render grayed out with tooltip "Coming soon"

---

API CALLS

On mount:
  1. GET /functions/v1/get-companion-item → returns { item } or { item: null }
  2. If item.feature === 'AG': render AG card as bottom sheet (400ms delay)
  3. If item.feature === 'ML': render Milestone card (see Prompt 3)
  4. If null: do not show anything (silent)

On dismiss (× or "Dismiss" button):
  POST /functions/v1/dismiss-companion-item { item_id, action: 'dismissed' }
  Close sheet.

On learn_more expand:
  POST /functions/v1/dismiss-companion-item { item_id, action: 'expanded' }
  (Fire-and-forget — does not close the card.)

---

STANDALONE FLOW (not from check-in):

Home screen mount order:
  1. Check daily_checkin status
  2. If check-in already done today → skip check-in, go directly to get-companion-item
  3. If check-in not done → show check-in first
     After check-in is submitted → evaluate if pending_ag_item was returned
       If yes → transition sheet to AG card content
       If no → close sheet

This means a mom who already checked in will see the AG card first, not the check-in.
```

---

## PROMPT 3 — Milestone Card

> **What this prompt does:** Adds the Milestone card — the emotional core of the companion layer. Visually distinct from the AG card. No clinical framing. Warm, specific, unhurried.

---

**Paste this into Lovable:**

```
Add a Milestone Memory card component. Renders as a bottom sheet when get-companion-item returns a feature === 'ML' item.

---

MILESTONE CARD DESIGN

This card should feel different from the AG card — less informational, more personal. Think of it as a letter from the app to the mom, not a notification.

Container:
- Same bottom sheet shell as other cards
- Auto height, max 70% screen
- Background: neutral-50

Top illustration area (full-width, 80px height):
- Soft gradient band: left #E8F4F3 → right #F5EFE8 (teal to warm)
- Centered within: the milestone "ID" rendered as a small label
  (Plus Jakarta Sans, 500, 11px, primary-700, uppercase, letter-spacing 0.1em)
  e.g. "ONE MONTH · YOUR JOURNEY"
- No icon. No emoji. No confetti.

Card body padding: 24px horizontal, 20px vertical

Headline:
- Font: Plus Jakarta Sans, 700, 22px, neutral-900, line-height 1.3
- This is the milestone name, e.g. "One month."

Body text:
- Font: Plus Jakarta Sans, 400, 16px, neutral-900, line-height 1.7
- This is the acknowledgment message — the most important text in the card
- Margin-top: 12px

PREMIUM TREATMENT for ML-005 (six weeks) and ML-007 (three months):
  - Top strip color: accent-500 (#C17C5A) instead of the teal gradient
  - Headline font size: 24px (slightly larger)
  - Body text: render in neutral-900 with a subtle warm-white card background (#FFFBF7)
  These two milestones should feel more special than the others. No other visual difference.

Share card section (all milestones):
- Below body text, 16px top margin
- Thin neutral-200 divider line
- Below divider: "Share this moment" heading (Plus Jakarta Sans, 500, 13px, neutral-500, uppercase, letter-spacing 0.06em)
- Share card text: italic, Plus Jakarta Sans, 400, 14px, neutral-700, 8px top margin
  (This is the item.share_card text from the API)
- "Copy" button: small ghost button (12px, primary-500, border neutral-200), right-aligned
  On tap: copies share_card text to clipboard; button label changes to "Copied ✓" for 2 seconds

Bottom row:
- Single centered "×  Close" text button (neutral-500, 14px)
- No "Dismiss" vs "Save" distinction — milestones are not archivable in v1

---

CALLBACK LINE (conditional):

If the API response includes a callback_line field (v1 implementation: check-in history callback),
render it above the headline in italics:
- Font: Plus Jakarta Sans, 400, 14px, primary-700, italics
- Example: "Four days ago this felt hard. Look where you are now."
- Margin-bottom: 8px from headline

If no callback_line: render nothing above the headline.

---

API CALLS

On mount (if item.feature === 'ML'):
  Same get-companion-item call from Prompt 2 surface logic.
  Mark as shown immediately: POST /functions/v1/dismiss-companion-item { item_id, action: 'shown' }

On close:
  POST /functions/v1/dismiss-companion-item { item_id, action: 'dismissed' }
```

---

## PROMPT 4 — Onboarding: Feeding Goal Field

> **What this prompt does:** Adds the required feeding goal question to the post-paywall personalization sequence. This field powers ML-024 (reached your goal) and ML-025 (extended past goal) — without it those milestones are generic.

---

**Paste this into Lovable:**

```
Add a feeding goal question to the post-paywall personalization sequence. This is a required field — the Continue button is disabled until the user selects an option.

Position: after the Breast Anatomy screen, before the home transition screen.
This screen has no step indicator (matches the rest of the post-paywall sequence).

---

SCREEN DESIGN

Background: neutral-50
Top padding: 48px

Headline: "What's your feeding goal?"
Font: Plus Jakarta Sans, 700, 24px, neutral-900

Subtext: "There's no wrong answer. We'll use this to celebrate the right moments with you."
Font: Plus Jakarta Sans, 400, 15px, neutral-500
Margin-top: 8px, margin-bottom: 32px

Five option chips (full width, stacked vertically, 10px gap):
Each chip: 56px height, rounded-xl (12px), border 1.5px neutral-200, neutral-50 background
Selected state: border 1.5px primary-500, background primary-300 (#A8D5D1 at 30% opacity)
Font: Plus Jakarta Sans, 500, 16px, neutral-900

Options (exact text):
  1. "6 weeks"             → value: "6_weeks"
  2. "3 months"            → value: "3_months"
  3. "6 months"            → value: "6_months"
  4. "As long as it works" → value: "as_long_as_works"
  5. "I'm not sure yet"    → value: "unsure"

Continue button:
- Full width, 52px, rounded-xl, primary-500
- Disabled (neutral-200, not tappable) until an option is selected
- On tap: call upsert-profile with { feeding_goal: selectedValue }
  Then advance to the Home Transition screen

---

DATA PERSISTENCE

Save to AppContext immediately on selection (same pattern as feeding path selection).
Call upsert-profile when Continue is tapped.
Field name in Supabase: feeding_goal (text)
```

---

## PROMPT 5 — Your Journey tab (Milestone history)

> **What this prompt does:** Adds a "Your Journey" section to the app where the mom can revisit past milestones. Simple list view — no complex UI. This is the v1 version; v1.1 adds the "save this moment" export and a timeline visualization.

---

**Paste this into Lovable:**

```
Add a "Your Journey" section to the app. This can be a tab in the bottom nav, or a section accessible from the home screen profile area — your choice based on nav space.

---

PAGE DESIGN

Header:
  Title: "Your Journey"
  Font: Plus Jakarta Sans, 700, 22px, neutral-900
  Subtext: "Moments from your feeding journey, saved here."
  Font: Plus Jakarta Sans, 400, 14px, neutral-500

Empty state (no milestones yet):
  Centered illustration area (use a simple teal circle, 80px)
  Below: "Your first milestone is on its way."
  Font: Plus Jakarta Sans, 400, 15px, neutral-500
  No button. No CTA.

Milestone list (when items exist):
  Vertical list, most recent first
  Each item is a card: rounded-xl (12px), neutral-50 bg, 1px neutral-200 border, 16px padding
  
  Card layout:
  - Top row: milestone name (Plus Jakarta Sans, 600, 15px, neutral-900) + date shown (neutral-500, 13px, right-aligned)
  - Below: first 2 lines of acknowledgment text, truncated with "..." (Plus Jakarta Sans, 400, 14px, neutral-700)
  - Tap to expand: shows full acknowledgment + share card

  Premium milestones (ML-005, ML-007):
  - Left border: 3px solid accent-500
  - Background: #FFFBF7 (warm white)

---

API

GET /functions/v1/get-journey-items
Returns: shown/dismissed pending_companion_items where feature = 'ML', ordered by shown_at DESC

Note: this endpoint doesn't exist yet in v1 — for now, render this page with a hardcoded empty state
or with the last returned milestone item stored in AppContext. Wire the real API in v1.1.
```

---

## PROMPT 6 — Wiring to real backend

> **Run this prompt after the backend edge functions are deployed.** Replaces mock API calls with real Supabase function calls.

---

**Paste this into Lovable:**

```
Wire the companion layer to the real Supabase edge functions. Replace all mock responses with real API calls.

FUNCTIONS TO WIRE:

1. log-checkin
   URL: ${SUPABASE_URL}/functions/v1/log-checkin
   Method: POST
   Auth: Bearer ${session.access_token}
   Body: { mood: string, notes?: string }
   Response: { follow_up_message: string, pending_ag_item?: CompanionItem, already_submitted: boolean }

2. get-companion-item
   URL: ${SUPABASE_URL}/functions/v1/get-companion-item
   Method: POST
   Auth: Bearer ${session.access_token}
   Body: {}
   Response: { item: CompanionItem | null }

3. dismiss-companion-item
   URL: ${SUPABASE_URL}/functions/v1/dismiss-companion-item
   Method: POST
   Auth: Bearer ${session.access_token}
   Body: { item_id: string, action: 'shown' | 'dismissed' | 'expanded' }
   Response: { ok: boolean }

4. upsert-profile (feeding_goal addition — already exists, just add the new field)
   Add feeding_goal to the profile upsert call in the onboarding feeding goal screen.

COMPANION ITEM SHAPE:
type CompanionItem = {
  id: string;
  trigger_id: string;
  feature: 'AG' | 'ML';
  headline: string;
  body: string;
  learn_more?: string;
  escalation_text?: string;
  share_card?: string;
  sources?: string;
  callback_line?: string;
}

ERROR HANDLING:
- If get-companion-item returns a network error: fail silently. Do not show an error state. The companion layer should never block the app.
- If log-checkin returns 409 (already submitted): close the check-in sheet silently. Do not show an error.
- If dismiss-companion-item fails: ignore. It is not user-facing.

SUPABASE ENV VARS: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (already in .env)
```

---

## Done Looks Like (QA checklist)

Run through this manually before each Lovable prompt is considered complete:

**Check-in:**
- [ ] Sheet does not appear if already checked in today (test by submitting, refreshing)
- [ ] Sheet dismisses in one tap (× or drag or backdrop)
- [ ] All four mood options are tappable and show the correct follow-up text
- [ ] Small win shows "Tell me about it →" link
- [ ] Sheet does not block access to other tabs

**AG card:**
- [ ] "Heads up" label is present and styled correctly
- [ ] Escalation callout appears only when escalation_text is present
- [ ] Learn more accordion collapses and expands correctly
- [ ] Dismiss calls the API and closes the sheet

**Milestone card:**
- [ ] ML-005 and ML-007 render with premium treatment (warm strip, larger headline)
- [ ] Share card copy button changes to "Copied ✓" for 2 seconds
- [ ] Callback line appears when present, absent when not
- [ ] Card does not feel celebratory or confetti-adjacent

**Feeding goal:**
- [ ] Continue button is disabled until a selection is made
- [ ] Selection is persisted to Supabase via upsert-profile
- [ ] Screen position is correct (after breast anatomy, before home transition)

**General:**
- [ ] No companion item appears more than once per session
- [ ] No companion item fires via push notification
- [ ] All cards are dismissable in one tap from any state

