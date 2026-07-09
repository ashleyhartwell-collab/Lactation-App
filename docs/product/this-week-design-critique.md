# Design Critique: This Week Experience

**Status:** Critique complete, reviewed against the live build (2026-07-09).
**Reviewed:** `/this-week` (all 6 weeks), cross-referenced against `/home` and `/getting-started` for consistency.
**Stage:** Live, pre-launch (per the Path Change conversations, the app is QA/internal only right now, which makes this a good moment to fix structural issues before real users hit them).

---

## Overall Impression

This Week is doing real work, the severity-coded callouts (Key Actions, Watch For, Reach Out If) are a genuinely good pattern for triage under stress, and the tone is calm and non-alarmist even when the content is medical. But the screen accumulates content with no ceiling: each week alone carries a focus card plus 6-7 lessons, and starting at Week 2 (confirmed by Ashley 2026-07-09, corrected from this critique's original Week-6-only observation) that's stacked on top of a "Catch Up From Earlier Weeks" section that, for anyone who hasn't finished everything on time (which, per the content itself, is expected and normal), becomes an uncapped, ungrouped wall that only grows larger with each week the user is behind. The biggest opportunity is applying a pattern the app already uses well elsewhere (the collapsed "want to go deeper?" crash-course sections in Path Change and Getting Started) more aggressively here, rather than introducing something new.

## Usability

| Finding | Severity | Recommendation |
|---|---|---|
| "Catch Up From Earlier Weeks" (confirmed present on Weeks 2-6, not just Week 6) renders every incomplete lesson from every prior week as one flat, uncapped list. On the account reviewed at Week 6, this was 12+ cards with no visual break, and the same unbounded-growth risk exists from Week 2 onward. | 🔴 Critical | Group by originating week, collapse each group by default, cap visible items at 5 with a "show N more" expansion. Full spec below. |
| The "Key Actions" checklist on every week's focus card uses a filled teal checkmark icon next to each item. That icon is the universal "done/complete" signal in this app's own vocabulary (it's exactly what a completed lesson's circle looks like), but here it's decorative and non-interactive, every Key Action shows the same checkmark whether the user has done it or not. | 🔴 Critical | Swap to a neutral bullet, dot, or outline icon for Key Actions. Reserve the filled checkmark exclusively for genuinely completed items, anywhere it appears. |
| Three different "where am I" signals disagree: Home says "Nora is in week 1," the This Week banner says "Week 6 of 6 · You've completed the foundational plan," and the individual week trackers show "0/7 done," "0/5 done," etc. A user bouncing between Home and This Week gets three different answers to "am I on track." | 🔴 Critical | Pick one source of truth for current week and surface it identically on Home and This Week. If "foundational plan complete" is a distinct milestone from per-lesson completion, label it as its own thing rather than overloading the week-position line. |
| The week-picker tab row (Week 1 through Week 6) scrolls horizontally with no visible affordance, no arrow, no edge fade, no count indicator. Only 4 of 6 weeks are visible without an accidental discovery of the scroll. | 🟡 Moderate | Add a right-edge fade or a small "1/6" indicator, or switch to a control that shows all 6 at a glance (e.g. a compact dropdown or dot pagination) given 6 is a small, fixed, known set. |
| Every week presents 6-7 lessons ("Week N Lessons" plus "Also This Week") with equal visual weight and no ordering signal beyond position. Nothing marks which lesson is most urgent to read first. | 🟡 Moderate | Promote one lesson per week as the primary next action (a distinct "Start here" treatment), let the rest sit at a visually quieter tier. |
| "Also This Week" content is presented at the same visual weight as "Week N Lessons," with no framing distinguishing "core to this week" from "supplementary." | 🟡 Moderate | Either merge into a single ranked list, or make "Also This Week" a collapsed section by default (same pattern proposed for catch-up). |
| Read time estimates ("~3 min read") are the only signal of investment required before tapping in. There's no indication of which lessons are read-only reference versus which affect the Watch For / Reach Out If guidance above. | 🟢 Minor | Consider a small tag distinguishing "safety-relevant" lessons from general-interest ones, so a time-pressed user can triage. |

## Visual Hierarchy

- **What draws the eye first**: the "This Week's Focus" title and headline sentence, correctly, this is the single most important line on the screen and it's appropriately the largest text.
- **Reading flow**: top to bottom works for the focus card itself (headline, key actions, watch-for, reach-out-if), but the flow breaks down at the transition into the lesson lists, there's no visual pause or hierarchy shift signaling "you've finished the summary, here's the reading list," it just continues as more stacked cards in the same visual register.
- **Emphasis**: the amber Watch For and red Reach Out If callouts are correctly the most visually alarming elements on the page, appropriate given they're the safety content. Everything below that (the lesson lists) is visually flatter than it should be given how much content lives there, every lesson card looks identical regardless of whether it's core-week content, bonus content, or three-weeks-overdue catch-up content.

## Consistency

| Element | Issue | Recommendation |
|---|---|---|
| Checkmark icon | Used as both "decorative bullet" (Key Actions) and "completion state" (lesson circles) with identical visual treatment. | Two distinct icons for two distinct meanings, non-negotiable given how load-bearing "done" state is in a checklist-style app. |
| Progress language | "modules complete" (Getting Started), "lessons done" (This Week), "foundational plan complete" (This Week banner) all describe similar underlying concepts with different words and different counting units. | Not urgent to unify the words, but the underlying counts should never contradict each other the way "0/7 done" and "you've completed the foundational plan" currently do. |
| Card treatment | Lesson cards, catch-up cards, and "Also This Week" cards are visually identical (same white card, same border, same "Read" link). Good for consistency, but it means there's currently no visual vocabulary available to distinguish urgency or category without adding a new treatment. | Reserve one visual signal (an edge color, a small icon, or a tag) for "this is from a prior week" specifically, so catch-up content reads as catch-up even before the user reads the section header. |

## Accessibility

- **Color contrast**: the amber Watch For background with dark amber text, and the red Reach Out If background with dark red text, both looked like they'd pass AA at a glance in the screenshots reviewed, worth a formal contrast check before launch given these are the two most safety-critical callouts on the screen.
- **Touch targets**: lesson cards are full-width and tall enough to be comfortable targets. The week-picker pills looked adequately sized. The "Read" link within each card is smaller text and sits close to the card's own tap area, worth confirming the whole card is tappable rather than just the "Read" text specifically, so it's forgiving for a one-handed, sleep-deprived user.
- **Text readability**: body text and line height read comfortably in the screenshots. No issues observed.

## What Works Well

- The three-tier callout system (Key Actions / Watch For / Reach Out If) is a strong, clear pattern for triaging "what to do" versus "what's normal" versus "what needs a call today," and the color coding (neutral, amber, red) maps intuitively to escalating urgency.
- Tone is calm and non-alarmist throughout, even the Reach Out If content reads as informative rather than frightening, which matters enormously for a postpartum audience.
- The collapsed "want to go deeper?" pattern already used in Path Change and Getting Started crash-course sections is exactly the right instinct for managing content density, it's just not applied yet to This Week's biggest density problem.
- Home is appropriately minimal by contrast (one focus card, one chat prompt, one Getting Started card), it's a good reference point for how much restraint This Week's own summary card should have.

## Priority Recommendations

1. **Group and cap the "Catch Up From Earlier Weeks" section.** This is the single most overwhelming surface in the app today and the one most likely to make a lapsed user feel behind rather than supported. Full interaction spec below.
2. **Fix the Key Actions checkmark ambiguity.** A false "done" signal undermines trust in every other completion indicator in the app, this is a small fix with outsized trust impact.
3. **Reconcile the three conflicting week-position signals** between Home and This Week before this ships to real users, contradictory progress messaging is exactly the kind of thing that erodes confidence in a health app.

---

## Catch-up section redesign: full spec

Addressing the specific ask: when a user has more than 2 lessons available from a previous week, don't render them as a flat list.

**Trigger condition**: any lesson from a week prior to the currently-viewed week that hasn't been marked done. Confirmed this already fires starting at Week 2 (not just Week 6 as this critique originally assumed), so the grouping/capping treatment below needs to apply uniformly from Week 2 onward, not as a special case reserved for the last week.

**Structure**:

1. **Section header stays as-is**: "Catch up from earlier weeks" with the existing reassuring subhead ("You haven't finished these yet, they're still here for you"), that copy is good and doesn't need to change.
2. **Group by originating week**, not a flat list. Each group renders as a single collapsed row by default: `Week N · X lessons` with a chevron.
3. **Collapsed by default, one group open at a time** (accordion behavior, not independent toggles), opening a new group closes the previous one. This keeps the screen height predictable regardless of how far behind a user is.
4. **Within an open group, cap visible items at 5.** If a week has more than 5 incomplete lessons (shouldn't happen given weekly lesson counts run 5-7, but defensively), show 5 plus a "show N more" affordance rather than growing unbounded.
5. **Most-recent-incomplete-week defaults to expanded**, everything older stays collapsed. A user who's one week behind sees their actual gap immediately; a user who's four weeks behind isn't confronted with all four at once.
6. **A closing line once every group is visible/scrolled past**: "That's everything through last week," so the list has a clear, confidence-giving end rather than trailing off.

This turns an open-ended, anxiety-inducing wall (worse the further behind a user is, which is exactly when they can least afford it) into a bounded, skimmable summary that still makes every lesson reachable in at most two taps.

---

## Reducing cognitive load app-wide: principles and a phased plan

The content-heaviness isn't a content problem, the individual lessons and callouts are well-written and appropriately scoped. It's a **disclosure** problem: too much of what exists is shown at once, with too little visual differentiation between "read this now," "read this if you want," and "you can skip this." Four principles, then a phased plan.

### Principles

**1. Progressive disclosure over exhaustive display.** The app already knows this pattern works, it's the "want to go deeper?" crash-course sections used in Path Change and Getting Started. The instinct to write thorough, evidence-based content is right; the instinct to show all of it by default is the part to change. Default to the summary, let the user opt into depth.

**2. Bounded lists over open-ended ones.** Miller's Law (roughly 5-9 items before working memory strains) is a reasonable ceiling for anything presented as a flat list. Every list in This Week that can exceed that (lesson lists, catch-up items) should cap and group rather than grow.

**3. One primary action per screen.** Right now This Week's own screen has no clear single next step, six-plus equally-weighted lesson cards, a chat link, a "next week" link, all competing. A time-pressed or exhausted user benefits enormously from the app making the call: here is the one thing to do next, everything else is optional and available if you want it.

**4. Trustworthy, unambiguous status.** Every checkmark, progress count, and "X of Y" indicator needs to mean the same thing everywhere it appears. This isn't a nice-to-have, it's what lets a user trust the app's "you're okay, keep going" signal instead of re-verifying it themselves, which is itself a cognitive load cost.

Underlying all four: the user of this specific app is disproportionately likely to be sleep-deprived, reading one-handed, and interrupted mid-task. Design decisions that would be minor conveniences in an ordinary consumer app (grouping, capping, single clear CTAs) are closer to accessibility requirements here.

### Phased plan

**Phase 1 — fix what's actively misleading or overwhelming (highest impact, lowest effort)**
- Ship the catch-up grouping/capping spec above.
- Fix the Key Actions checkmark so it stops resembling a completion signal.
- Reconcile the Home vs. This Week week-position and completion messaging.

**Phase 2 — extend the existing collapse pattern to "Also This Week"**
- Collapse "Also This Week" behind a toggle by default, matching the crash-course precedent, rather than presenting it at full weight alongside the week's core lessons.
- Apply the same 5-item cap-and-expand treatment here if any week's combined lesson count exceeds it.

**Phase 3 — introduce a single primary next action per week**
- Identify (or let content authors tag) one lesson per week as the primary recommended read, give it distinct visual treatment (e.g. a "start here" tag or featured position) above the rest of that week's list.
- Everything else in the week's lesson set drops to a visually quieter, secondary tier, still fully accessible, just not competing for first attention.

**Phase 4 — differentiate new content from evergreen/reference content**
- Some lessons are genuinely time-sensitive to a specific week (colostrum timing, growth spurts); others are reference material a user might revisit later (safe sleep, formula prep). Consider a lightweight tag or separate "reference" section so returning users aren't re-shown identical boilerplate as if it were new.
- This is lower urgency than Phases 1-3 and worth revisiting once usage data shows which lessons users actually skip versus re-read.

Each phase is shippable independently and doesn't block the others, Phase 1 alone addresses both of the specific concerns raised (the overwhelming catch-up list, and the general content density), Phases 2-4 compound the effect as bandwidth allows.
