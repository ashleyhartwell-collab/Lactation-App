# Lovable Update Prompt — Remove "Trusted Friend" from All UI

**Paste the block below directly into Lovable.**

---

```
This brief removes all "Trusted Friend" language and UI from the live app. The /chat route and its underlying functionality stay intact. Only the "Trusted Friend" label and the companion layer UI are being removed.

---

PART 1 — GLOBAL FIND AND REPLACE (all files)

Search every component, screen, and string across the entire codebase for the following phrases and replace them as listed. Case-insensitive search.

"your Trusted Friend"       → "chat"
"Your Trusted Friend"       → "Chat"
"Ask your Trusted Friend"   → "Ask in chat"
"Talk to your Trusted Friend" → "Get help in chat"
"Trusted Friend"            → "chat"
"trusted friend"            → "chat"

Apply to: button labels, link text, placeholder text, screen titles, card headings, aria-labels, and any string literals in component files.

Do NOT apply to: file names, import paths, function names, variable names, Supabase table or column names, or edge function names. Only user-visible strings.

---

PART 2 — HIDE THE COMPANION LAYER UI

The Trusted Friend companion layer includes: daily check-in cards, anticipatory guidance cards, and milestone memory cards. These are surfaced somewhere on the home screen or at app open.

Find any component that renders these companion/check-in cards and hide them by wrapping the return in `{false && (...)}` or adding `if (false) return null` at the top of the render. Do not delete the components — just prevent them from rendering.

Specifically, hide:
- Daily check-in prompt / check-in card
- Anticipatory guidance cards (the proactive tip cards that surface at session start)
- Milestone memory cards (the "you hit X days" celebration cards)

The /chat route itself, the chat input, and any AI chat response UI should remain fully functional and visible. Only the above companion layer cards are being hidden.

---

PART 3 — BOTTOM NAV / TAB BAR

If the bottom navigation tab for chat is currently labeled "Trusted Friend" or shows a "Trusted Friend" label, change the label to "Chat". Keep the same icon and route.

---

PART 4 — CHAT BRIDGE TEXT IN LESSONS

The existing chat bridge pattern in lessons reads "Have a question about [topic]?" and links to /chat. If any of these currently say "Ask your Trusted Friend" or similar, update them to "Have a question? Chat with us." Style: text-sm, neutral-400, tappable, navigates to /chat. This is the only change to lesson content — do not alter any other part of any lesson.

---

DO NOT CHANGE:
- The /chat route, chat screen, or AI chat functionality
- Any lesson content other than chat bridge text
- Supabase tables, edge functions, or backend logic
- File names, variable names, or component names
- Any onboarding screens not containing "Trusted Friend" text
- Bottom nav structure, icons, or routes (only the label if it says "Trusted Friend")
```
