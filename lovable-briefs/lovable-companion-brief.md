# Lovable Companion Layer Brief — Latched
**Version:** 1.1  
**Date:** 2026-05-31  
**Purpose:** Implementation brief for wiring the companion layer and magic link auth into the Latched Lovable frontend. Each prompt below is self-contained and paste-ready into Lovable.

> **Before running any prompts:** deploy the `send-otp` edge function from your terminal:
> ```bash
> cd "/Users/ashleyhartwell/Documents/Claude/Projects/Lactation Journey App/latched-backend" && \
> npx supabase functions deploy send-otp
> ```
> Prompts 0 and the allowlist gate depend on this function being live.

---

## Context: What Lovable Needs to Know

### The App
Latched is a mobile-first responsive web app (built in Lovable, React/TypeScript) helping first-time moms succeed in the first 6 weeks of breastfeeding. Stack: Supabase backend with edge functions, shadcn/ui components, Tailwind CSS.

### Design System & Tokens
All new components must follow these conventions:

| Token | Hex | Use |
|---|---|---|
| `neutral-50` | `#FDFAF7` | Page/screen background |
| `neutral-100` | `#F5F0EA` | Card surfaces |
| `neutral-200` | `#E3D9CF` | Dividers, borders |
| `neutral-500` | `#8A7F78` | Secondary text, labels |
| `neutral-900` | `#2D2926` | Primary body text (warm charcoal) |
| `primary-500` | `#4E9E95` | Brand color, primary buttons, active states |
| `accent-200` | `#EDCFBC` | Callout block backgrounds |
| `accent-500` | `#C17C5A` | Secondary CTAs, tags |

Typography: DM Sans or Inter (whichever is already in the project), warm and humanist. Minimum body text 16px. Touch targets minimum 44×44pt — this is a one-handed app used at 3am.

### Component Patterns Already in the App
- **Tap-to-select chips**: rounded, medium-size, selected state = filled `primary-500` with white text
- **Cards**: surface color `neutral-100`, rounded-lg, subtle shadow or border
- **Primary CTA**: full-width, `primary-500` fill, white text, bottom-aligned on mobile
- **Bottom navigation**: Home, Chat, Getting Started, Track tabs (persistent)

### The Companion Layer
The companion layer is a proactive support system. It surfaces contextually relevant support cards to users based on their profile, week postpartum, feeding path, and emotional check-in signals. It is **not** the Quick Chat feature — it is a separate set of server-initiated cards that appear on the home/dashboard screen and are managed via four backend edge functions:

| Function | Method | Body | Returns |
|---|---|---|---|
| `upsert-profile` | POST | `{ feeding_preference, feeding_goal }` | profile record |
| `evaluate-companion-triggers` | POST | `{ user_id }` | `{ queued: number }` |
| `get-companion-item` | POST | `{ user_id, feature? }` | `{ item } \| { item: null }` |
| `dismiss-companion-item` | POST | `{ pending_id, user_id, expanded? }` | `{ ok: true }` |
| `log-checkin` | POST | `{ user_id, mood, notes? }` | `{ checkin, follow_up, pending_ag_trigger }` |

All edge functions are called via `supabase.functions.invoke(functionName, { body })`. The `user_id` comes from the active Supabase auth session (`session.user.id`).

---

## The 6 Prompts

---

### Prompt 0 — Convert Sign-In from Password to Magic Link

**What screen:** The existing sign-in screen (`sign-in.tsx` or similar). It currently has an email field and a password field, and calls `supabase.auth.signInWithPassword({ email, password })`. This prompt replaces that entire flow with a one-field magic link screen that calls the `send-otp` edge function.

**Why edge function instead of `supabase.auth.signInWithOtp` directly:** The `send-otp` edge function checks the pre-launch email allowlist before triggering the OTP send, so non-test users get a clear "not on the early access list" message instead of a confusing auth error. At launch the gate is removed but the function stays as a clean wrapper.

**Auth callback:** After clicking the magic link in their email, Supabase redirects the user back to the app with a token in the URL. The existing `onAuthStateChange` listener should handle this automatically if a `SIGNED_IN` event is already wired. If there is no `/auth/callback` route, Lovable should create one that calls `supabase.auth.getSession()` and redirects authenticated users to the home screen.

**Paste this into Lovable:**

> Convert the existing sign-in screen (the one with email + password fields calling `signInWithPassword`) to a magic link screen. The new flow:
>
> **Layout — keep it minimal:**
> - App logo / wordmark centered at top (same as current sign-in)
> - Warm heading: "Welcome back." (or "Let's get you in." if this is the first-time entry point)
> - Subtext in neutral-500: "We'll send a login link to your email — no password needed."
> - Single email input field (type="email", placeholder "your@email.com"), full-width, same input style as the rest of the app
> - Full-width primary CTA button: "Send login link" — disabled until a valid email format is entered
> - Below the button, a small text link in neutral-500: "Need an account? Join the waitlist" — for now this can link to `https://trylatch.com` or just be a static non-linked label
>
> **On "Send login link" tap:**
> 1. Show a loading state on the button (spinner, button disabled).
> 2. Call `supabase.functions.invoke('send-otp', { body: { email: emailValue.toLowerCase().trim() } })`.
> 3. On success (`data.ok === true`): replace the entire form with a confirmation state — centered, calm:
>    - Heading: "Check your email"
>    - Body (neutral-500): "We sent a login link to **[email]**. It expires in 10 minutes. Check your spam folder if you don't see it."
>    - Small text link below: "Wrong email?" — tapping it returns to the email input screen and clears the field
> 4. On error where `error.code === 'not_allowed'`: show an inline error below the email field (no toast): "This email isn't on the early access list yet." Do not clear the email field.
> 5. On error where `error.code === 'send_failed'` or any other error: show an inline error: "Something went wrong — please try again." Re-enable the button.
>
> **Auth callback route:**
> If the project does not already have an `/auth/callback` route or equivalent, create one. It should call `supabase.auth.getSession()` on mount. If a valid session is returned, redirect the user to the home/dashboard screen. If no session (link expired or invalid), redirect to the sign-in screen with an inline message: "That link has expired. Enter your email to get a new one."
>
> **Remove from the codebase:** the password field, any "forgot password" links, any `signInWithPassword` calls, and any password reset routes — Latched will not use password auth going forward.

---

### Prompt 1 — Fix: `feeding_preference` value for Exclusive Pumping

**What screen:** The onboarding screen that asks how the user plans to feed their baby. It contains exactly three selectable options: "Nursing / Breastfeeding," "Exclusively Pumping," and "Combination Feeding." It appears after the user has entered their baby's date of birth and before any screen about feeding goals or reasons for using the app.

**What's wrong:** When the user selects "Exclusively Pumping," the value being passed to `upsert-profile` is `'pumping'`. The backend now requires `'exclusive_pumping'`.

**Paste this into Lovable:**

> Find the onboarding screen that asks how the user plans to feed — it has three selectable options: "Nursing / Breastfeeding," "Exclusively Pumping," and "Combination Feeding." In that screen's component, find the value sent to `upsert-profile` when the user selects "Exclusively Pumping" and change it from `'pumping'` to `'exclusive_pumping'`. Do not change any UI copy, layout, or other behavior. This is a one-line value fix. The three valid values for `feeding_preference` are: `'breastfeeding'`, `'exclusive_pumping'`, and `'combo'`.

---

### Prompt 2 — New Screen: Feeding Goal (duration)

**What screen:** A new onboarding screen to be inserted at a specific position in the onboarding stepper. It goes immediately after the feeding path selection screen (the one with Nursing / Exclusively Pumping / Combination Feeding options) and immediately before the screen that asks "What brings you here?" or asks the user to select their reasons or goals for using the app. If the numbering has changed, find these two screens by their content — the feeding-method screen and the reasons/motivation screen — and insert the new screen between them.

**API call shape:**
```
supabase.functions.invoke('upsert-profile', {
  body: { feeding_goal: selectedValue }
})
```
where `selectedValue` is one of: `'6_weeks'` | `'3_months'` | `'6_months'` | `'as_long_as_works'` | `'unsure'`

**Paste this into Lovable:**

> Add a new screen to the onboarding stepper. Insert it immediately after the screen where the user selects their feeding method (Nursing / Exclusively Pumping / Combination Feeding) and immediately before the screen that asks what brings them here or why they're using the app. If you need to identify these screens by file or component name, look for the component that sets `feeding_preference` (that's the screen before) and the component that collects the user's reasons or motivation (that's the screen after).
>
> **Screen purpose:** Collect how long the user hopes to breastfeed, so we can personalize protocol pacing and milestone messaging.
>
> **Layout:** Follow the exact same single-question-per-screen pattern as the rest of onboarding — warm prompt at top, selectable options, full-width Continue button at bottom.
>
> **Prompt text:** "How long are you hoping to breastfeed?"
>
> **Subtext below prompt (smaller, neutral-500):** "There's no right answer — this just helps us personalize your experience."
>
> **Five tap-to-select chips** (same chip style used throughout onboarding — rounded, filled primary-500 when selected, white text on selected, neutral-200 border on unselected). Display them stacked vertically, full-width, each as its own row:
> - "6 weeks" → value `'6_weeks'`
> - "3 months" → value `'3_months'`
> - "6 months" → value `'6_months'`
> - "As long as it works" → value `'as_long_as_works'`
> - "Not sure yet" → value `'unsure'`
>
> **On Continue:** Call `upsert-profile` edge function with body `{ feeding_goal: selectedValue }`. On success, advance to the next onboarding screen. On error, show a non-blocking toast ("Couldn't save your preference — you can update this in settings") and advance anyway so onboarding is not blocked.
>
> **Skippable:** Yes. Below the Continue button, include a small text link "I'll decide later" in neutral-500. Tapping it advances without calling `upsert-profile`.
>
> **Required state:** The Continue button is disabled until one chip is selected. The "I'll decide later" link is always active.

---

### Prompt 3 — Evaluate companion triggers on app open

**What component:** App root or the authenticated layout wrapper — whichever component runs once after a user session is confirmed and the home/dashboard screen mounts. This is not a visible UI component; it is a side-effect hook.

**API call shape:**
```
supabase.functions.invoke('evaluate-companion-triggers', {
  body: { user_id: session.user.id }
})
// returns: { queued: number }
```

**Debounce:** Call at most once per 30 minutes per user. Use `localStorage` key `latched_companion_last_eval` storing an ISO timestamp. On mount, compare `Date.now()` to the stored timestamp; skip the call if fewer than 30 minutes have elapsed. On successful call, write the current timestamp to that key.

**Paste this into Lovable:**

> In the authenticated layout or home screen component — whichever runs first after a valid Supabase session is confirmed — add a `useEffect` that calls the `evaluate-companion-triggers` edge function with the current user's ID.
>
> The effect must:
> 1. Run only when `session.user.id` is available (guard against unauthenticated state).
> 2. Check `localStorage.getItem('latched_companion_last_eval')`. If the stored timestamp exists and `Date.now() - new Date(storedTimestamp).getTime() < 30 * 60 * 1000` (30 minutes in ms), skip the call entirely.
> 3. Call `supabase.functions.invoke('evaluate-companion-triggers', { body: { user_id: session.user.id } })`.
> 4. On success, write `localStorage.setItem('latched_companion_last_eval', new Date().toISOString())`.
> 5. Do not render any UI based on this call. The return value `{ queued: number }` is informational — ignore it for now. Errors should be caught silently (no user-facing error for this background call).
>
> This effect must not block page render. Run it after mount, not before. Do not await it in any blocking way.

---

### Prompt 4 — Daily Check-In Card (home screen)

**What screen:** Home/dashboard screen. The check-in card is a new card that appears in the vertical card stack, positioned below the "This Week" card and above the Quick Chat card.

**API call shape:**
```
supabase.functions.invoke('log-checkin', {
  body: { user_id: session.user.id, mood: selectedMood }
})
// returns: { checkin, follow_up: string, pending_ag_trigger: string | null }
```

**Companion fetch triggered by check-in:**  
If `pending_ag_trigger` is not null, immediately call `get-companion-item`:
```
supabase.functions.invoke('get-companion-item', {
  body: { user_id: session.user.id }
})
// returns: { item: CompanionItem | null }
```
If `item` is returned, render the Companion Item Card (see Prompt 5) at the top of the home screen card stack.

**Paste this into Lovable:**

> On the home/dashboard screen, add a new card component called `DailyCheckInCard`. Place it below the "This Week" card and above the Quick Chat card in the vertical scroll.
>
> **Card surface:** neutral-100 background, rounded-lg, standard card shadow. Do not show the card if the user has already submitted a check-in today (persist today's check-in state in component state or localStorage key `latched_checkin_date` storing today's date string `YYYY-MM-DD`; if it matches today, replace the card with a quiet "You checked in today ✓" line in neutral-500 and hide the mood options).
>
> **Card header:** Small label in neutral-500, uppercase, 12px: "HOW'S IT GOING TODAY?"
>
> **Mood options:** Four tappable buttons displayed in a 2×2 grid (or single row if space allows). Each button is a rounded pill with an emoji + label. Do not allow multi-select — selecting one deselects any previous selection.
>
> | Emoji | Label | value |
> |---|---|---|
> | 😔 | Struggling | `'struggling'` |
> | 😐 | Hanging in | `'hanging_in'` |
> | 🌤 | Good day | `'good_day'` |
> | ✨ | Small win | `'small_win'` |
>
> Selected state: filled accent-500 background, white text. Unselected state: neutral-100 background, neutral-200 border, neutral-900 text.
>
> **On mood tap:**
> 1. Set the selected mood in local state.
> 2. Call `supabase.functions.invoke('log-checkin', { body: { user_id: session.user.id, mood: selectedMood } })`.
> 3. While the call is in-flight, show a subtle loading state on the selected button (spinner or opacity pulse). Do not disable other buttons.
> 4. On success:
>    - Persist today's date to `localStorage.setItem('latched_checkin_date', todayDateString)` so the card shows the "checked in" state on next open.
>    - Replace the mood grid with the `follow_up` string from the response, displayed in neutral-900, 16px, centered in the card space. Wrap it in a warm callout block (accent-200 background, rounded-md, padding-4).
>    - If `pending_ag_trigger` is not null, call `supabase.functions.invoke('get-companion-item', { body: { user_id: session.user.id } })`. If `item` is returned, pass it to the `CompanionItemCard` component and render it at the top of the home screen's card stack (above the This Week card).
> 5. On error: show an inline error message below the mood grid in neutral-500: "Couldn't save — tap to try again." Tapping the mood button retries.

---

### Prompt 5 — Companion Item Card (dismissible support card)

**What component:** A new reusable card component `CompanionItemCard`. It appears at the top of the home screen card stack when a companion item is available (triggered either from the check-in flow in Prompt 4 or from a future fetch after `evaluate-companion-triggers`).

**CompanionItem data shape:**
```typescript
interface CompanionItem {
  pending_id: string;
  headline: string;
  in_app_message: string;
  learn_more: string | null;
  escalation_text: string | null;
}
```

**API call shapes:**

Dismiss (no expand):
```
supabase.functions.invoke('dismiss-companion-item', {
  body: { pending_id: item.pending_id, user_id: session.user.id }
})
```

Dismiss after expanding Learn More:
```
supabase.functions.invoke('dismiss-companion-item', {
  body: { pending_id: item.pending_id, user_id: session.user.id, expanded: true }
})
```

**Paste this into Lovable:**

> Create a new reusable component `CompanionItemCard` that receives a `CompanionItem` prop and the current `userId` string. This card represents a proactive support message from the app — it should feel warm and attentive, not alarming.
>
> **Card surface:** neutral-100 background, rounded-lg, standard card shadow. Add a thin left border (4px) in primary-500 to visually distinguish it from regular content cards. Place it at the top of the home screen card stack, above the This Week card, when rendered.
>
> **Card layout (top to bottom):**
>
> 1. **Dismiss button:** An "×" icon button (neutral-500, 20px) floated to the top-right corner of the card. Tapping it calls `dismiss-companion-item` (no `expanded` field) and removes the card from the UI. While the dismiss call is in-flight, hide the card immediately (optimistic dismiss) — if the call errors, log the error silently; do not re-show the card.
>
> 2. **Headline:** `item.headline` in neutral-900, font-semibold, 16–18px.
>
> 3. **Message:** `item.in_app_message` in neutral-900, 16px, normal weight. Up to 3–4 lines visible.
>
> 4. **"Learn more" section** (render only if `item.learn_more` is not null):
>    - A tappable row at the bottom of the message, labeled "Learn more ↓" in primary-500, 14px.
>    - On tap, expand an inline section below the message (smooth height animation) showing `item.learn_more` text in neutral-900, 14px, on an accent-200 background, rounded-md, padding-4.
>    - When this section opens, immediately call `dismiss-companion-item` with `expanded: true`. This call fires once on first expand; do not re-fire if the section is collapsed and re-expanded in the same session.
>    - After expand, the "Learn more ↓" label changes to "Close ↑" (same primary-500 style). Tapping it collapses the section but does not make another API call.
>
> 5. **Escalation prompt** (render only if `item.escalation_text` is not null):
>    - Rendered below the learn_more section (or below the message if learn_more is null), in a row with a subtle warning-colored left accent (`#C47F1A`, 3px). 
>    - Text: `item.escalation_text` in neutral-900, 14px.
>    - This is informational only — no tap action required.
>
> **Full dismiss behavior summary:**
> - Tapping "×" without opening Learn more → `dismiss-companion-item` with no `expanded` field
> - Opening Learn more → `dismiss-companion-item` with `expanded: true` (fires immediately on open, not on close)
> - Card should unmount from the parent after either dismiss path; the parent manages visibility via a state variable (e.g., `companionItem` set to `null` on dismiss)

---

## Implementation Notes

**Order of work:** Do prompts in order. Prompt 1 is a one-line fix and should take under a minute. Prompts 4 and 5 are paired — build Prompt 5's `CompanionItemCard` first (it has no dependencies), then wire it into Prompt 4's check-in flow.

**Supabase client:** All edge function calls use the existing `supabase` client instance already initialized in the project. Do not create a second client.

**Auth guard:** Every edge function call requires a valid `session.user.id`. All calls should be wrapped in a check that the session exists before firing. If no session, skip silently — do not call the function or throw.

**TypeScript:** Define the `CompanionItem` interface in a shared types file (e.g., `src/types/companion.ts`) so it can be imported by both `CompanionItemCard` and the home screen.

**Error handling philosophy:** The companion layer is progressive enhancement — it must never break the core app experience. All five calls (`evaluate-companion-triggers`, `get-companion-item`, `dismiss-companion-item`, `log-checkin`, and the feeding_goal `upsert-profile`) should fail silently or show non-blocking inline messages. None of them should throw an unhandled error or redirect the user.
