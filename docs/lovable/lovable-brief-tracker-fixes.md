# Lovable Update Prompt — Tracker: Fix False "Sign In" Messaging + Truncated "Nurs" Button

**Paste the block below directly into Lovable.**

---

```
Fix two bugs on the Tracker screen found in a UX audit. These are independent, unrelated fixes bundled in one pass.

Do not change: Tracker's actual logging/save logic or data model, the Bottle/Pump button labels (already correct), the diaper counters, the disabled-state helper text on the summary button ("Log at least 2 days of diapers to get started" — this is good, keep it exactly as-is), or any other screen (Home, Chat, Getting Started, Path Change, onboarding).

---

BUG 1 — FALSE "SIGN IN TO SAVE" MESSAGING SHOWN TO AUTHENTICATED USERS

Both Tracker tabs currently show a sign-in prompt even when the user is fully signed in:
- Feeds tab: "Sign in to save your tracking history."
- Diapers tab: "Sign in to save diaper logs."

Confirmed bug, not expected behavior: in the same authenticated session where this message appears, Home correctly shows the personalized greeting ("Good morning, Mama" / "[Baby] is in week N"), so the user's session is genuinely valid. This means Tracker's check for auth state is not using the same source of truth Home already uses correctly, it's likely reading a stale prop, a separate/incorrect auth context, checking something else entirely (like whether any logs exist yet, rather than whether the user is signed in), or simply not receiving the session state that gets passed to other screens.

Find wherever this messaging is conditioned on both tabs and repoint it to the same session/auth check Home uses. This message should only ever render for a genuinely signed-out/anonymous user, never for an authenticated one. If there's any doubt about which auth source is correct, prefer whatever Home currently reads from, since that one is confirmed working.

---

BUG 2 — TRUNCATED "NURS" BUTTON LABEL

On the Feeds tab, the primary logging button for nursing sessions (Path A / Path C users) renders as "Nurs" instead of "Nurse", the label is being cut off, not intentionally shortened.

Fix so the full word "Nurse" always renders in full, on every viewport size the app supports. This is likely a fixed-width button or container that doesn't accommodate the full word at the current font size, widen the button, allow the label to use its natural width, or slightly reduce font size if needed, whatever fits the existing button style best. Do not abbreviate the label anywhere, including on the smallest supported screen width.

---

Both fixes only touch the Tracker screen, do not change the underlying data being logged, how it's saved, or any other screen's copy or behavior.
```
