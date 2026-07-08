# Lovable Update Prompt — Remove Mental Health Module

**Paste the block below directly into Lovable.**

---

```
Remove the shared-mental-health lesson from all user-facing surfaces. Do not delete the component or its route — just hide it everywhere it appears so it can be restored later.

---

1. WEEKLY LESSON LIST

Find wherever the This Week screen (or any lesson list) renders a card or link for the `shared-mental-health` module (route: `/this-week/module/shared-mental-health`, title: "Your Mental Health Matters Too"). Remove that card/list item so the lesson no longer appears in the lesson list. All other lessons in the shared modules list remain unchanged.

---

2. NAVIGATION / DEEP LINKS

If any screen, button, or inline link navigates to `/this-week/module/shared-mental-health`, remove that link or button entirely. Do not replace it with anything.

---

3. ROUTE

Leave the `/this-week/module/shared-mental-health` route registered in the router and the component file intact. The lesson should simply be unreachable from the UI for now.

---

DO NOT CHANGE:
- Any other lesson, module card, or shared module
- The route file or the component file for shared-mental-health (keep both)
- Any other navigation, bottom nav, or screen not named above
```
