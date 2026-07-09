# Lovable Update Prompt — This Week: Catch-Up Redesign, Checkmark Fix, Progress Reconciliation

**Paste the block below directly into Lovable.**

---

```
Make three fixes to the This Week screen, all from a UX audit: redesign the "Catch Up From Earlier Weeks" section so it's grouped and capped instead of an unbounded flat list, fix a checkmark icon that falsely reads as a completion signal, and reconcile conflicting week-position messaging between Home and This Week. These are independent fixes bundled in one pass, not a single feature.

Do not change: any lesson content, the Key Actions / Watch For / Reach Out If callout structure or copy, the week-picker tabs' navigation behavior, Getting Started, Path Change, chat, the tracker, or onboarding.

---

PART 0 — WHAT'S CHANGING (SUMMARY)

1. "Catch Up From Earlier Weeks" (currently appears starting on Week 2, growing larger through Week 6 as more weeks accumulate incomplete lessons) changes from a flat, uncapped list of every incomplete lesson from every prior week into a grouped, collapsible, capped structure. See Part 1.

2. The checkmark icon next to each "Key Actions" item on the weekly focus card currently uses the same filled/solid icon the app uses elsewhere to mean "this lesson is complete." It's decorative here (Key Actions aren't individually tracked or completable), but it visually reads as a false completion signal. Swap it for a neutral, non-completion icon. See Part 2.

3. Home's "[Baby] is in week N" line and This Week's own banner ("Week N of 6" plus, once week 6 is reached, "You've completed the foundational plan") can currently show contradictory information, along with per-week lesson counters showing 0 done even when the banner implies completion. Reconcile these to a single consistent source of truth. See Part 3.

---

PART 1 — CATCH-UP SECTION: GROUPED, COLLAPSIBLE, CAPPED

Applies to every week from Week 2 onward (wherever "Catch Up From Earlier Weeks" currently renders). Replace the flat list with this structure:

1. Keep the existing section header and subhead exactly as they are: "Catch up from earlier weeks" / "You haven't finished these yet, they're still here for you." No copy change needed here.

2. Group the incomplete lessons by their originating week rather than listing them all together. Each originating week becomes one row: "Week N · X lessons" with a chevron, collapsed by default.

3. Accordion behavior: only one group can be open at a time. Opening a different group closes whichever was previously open. This keeps total section height bounded and predictable regardless of how many weeks a user has fallen behind.

4. The single most recent incomplete week defaults to expanded when the section first renders; every older week starts collapsed. Example: if it's Week 6 and weeks 2, 3, and 4 all have incomplete lessons, only week 4's group opens by default, weeks 2 and 3 show collapsed with their counts.

5. Within an open group, show at most 5 lesson rows. If that week has more than 5 incomplete lessons, show 5 and a "Show N more" link/button at the bottom of the group that reveals the rest in place.

6. After the last group (whether collapsed or the one expanded group), add a closing line: "That's everything through last week." This gives the section a definite end rather than trailing off, especially important for users who are several weeks behind.

7. Each lesson row inside an expanded group keeps its existing look, title, read-time estimate, "Read" link, same as it already renders for the current week's own lessons. No new visual treatment needed at the individual lesson level, the grouping and capping is what changes.

---

PART 2 — KEY ACTIONS ICON FIX

On the weekly focus card, the "Key Actions" list currently renders a filled/solid circular checkmark icon next to every item, identical to the icon used elsewhere in the app (lesson cards, Getting Started modules) to indicate a completed item.

Replace this icon for Key Actions specifically with a neutral, non-completion icon, an outline circle, a small dot, or a simple bullet point are all acceptable, whatever fits the existing icon set without implying "done." Key Actions are informational, not individually completable, so the icon should not resemble the app's completion-state iconography anywhere else.

Do not change the Key Actions text, the number of items, or their order. Do not touch the checkmark icon used for actual lesson/module completion elsewhere, that one is correct as-is and should stay exactly as it is, this fix is scoped only to the Key Actions list.

---

PART 3 — RECONCILE WEEK-POSITION AND COMPLETION MESSAGING

Home currently shows "[Baby name] is in week N" computed from the baby's date of birth. This Week shows its own banner, "Week N of 6," and once a user has reached week 6, additional text like "You've completed the foundational plan." Individual week tabs separately show "N of Y lessons done" counters.

These three signals need to agree with each other and never contradict:

1. The week number shown on Home and the week number shown in This Week's banner should always be the same computed value (both derived from the same baby-DOB-based calculation), not two independently maintained numbers that can drift.

2. "You've completed the foundational plan" (or equivalent milestone messaging) should only appear once actual lesson completion supports it, not simply because the calculated week number has reached 6. If a user is calendar-week-6 but still has incomplete lessons from earlier weeks, the banner should reflect that honestly (e.g. "Week 6 of 6" without the "completed" claim) rather than declaring the plan finished while individual week trackers still show lessons outstanding.

3. If "foundational plan complete" is meant to be a distinct milestone from "has completed every individual lesson" (for example, just reaching week 6 chronologically, regardless of lesson completion), then say so explicitly rather than implying full completion, for example "You've reached the end of the 6-week plan" reads as a time-based milestone, whereas "you've completed the foundational plan" reads as a completion claim. Pick the framing that matches what's actually true for a given user's state, and make sure it can never coexist with a 0-of-N lesson counter for that same user without looking contradictory.

---

PART 4 — DO NOT CHANGE

- Any lesson content, titles, or read-time estimates.
- The Key Actions / Watch For / Reach Out If callout structure, copy, or color coding.
- The week-picker tab row's navigation behavior (a separate, lower-priority fix for tab discoverability was noted in the audit but is not part of this update).
- The completion checkmark icon used for actual lesson/module completion anywhere outside the Key Actions list.
- Getting Started, Path Change, chat, the tracker, or onboarding.
```
