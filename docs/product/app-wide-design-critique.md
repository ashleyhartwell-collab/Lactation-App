# Design Critique: The Rest of the App (Home, Tracker, Chat, Getting Started, Path Change, Onboarding)

**Status:** Critique complete, reviewed against the live build (2026-07-09).
**Companion doc:** `docs/product/this-week-design-critique.md` covers This Week in full, this doc covers everything else and adds a cross-screen synthesis.
**Method:** Live walkthrough of Home, Tracker (both tabs), Chat, all 7 Path A Getting Started guides, and the Path Change hub/modules. Onboarding is assessed structurally, from the current flow spec, the Lovable restructure brief, and a real e2e investigation that drove the live app and surfaced two genuine bugs, rather than a fresh live signup, deliberately not creating a real account on your production Supabase project just to walk through it.

---

## Overall Impression

Outside of This Week, the app is in noticeably better shape than the density concern that prompted this whole review might suggest. Home, Tracker, and Chat are all appropriately minimal, and Getting Started's guide detail screens are arguably the best-executed screens in the app, clear step-by-step structure, an honest "Guide 2 of 7" position indicator, calm tone. The two things that actually need attention here aren't density, they're a couple of specific, high-confidence bugs (a truncated button label and a "sign in" prompt shown to signed-in users) and a voice-consistency gap between the no-em-dash rule established for newer content and what's actually live in older Getting Started copy and chat responses.

## Usability

| Finding | Severity | Recommendation |
|---|---|---|
| On Tracker's Feeds tab, the primary action button reads "Nurs" instead of "Nurse", the label is visibly truncated, not stylistically shortened. | 🔴 Critical | Fix the button width/text so it renders the full word. This is the single most-used action on the single most core-loop screen in the app, it needs to be unambiguous at a glance. |
| Both Tracker tabs (Feeds and Diapers) show "Sign in to save your tracking history" / "Sign in to save diaper logs" while viewed in an authenticated, signed-in session. | 🔴 Critical | This is either a real bug (data isn't actually persisting for signed-in users, which would be a serious data-loss issue) or a stale/incorrect empty-state message that fires regardless of auth state. Either way it needs engineering triage before launch, a user seeing "sign in" while already signed in will reasonably conclude the app is broken or that their logs aren't being saved. |
| Chat and Getting Started copy contain em dashes ("find their groove — and even then," "nose at nipple level — not her mouth," "getting more efficient — not less") despite the no-em-dash voice rule established and applied consistently in this session's newer content (bottle/nipple guide, Path Change modules). | 🟡 Moderate | Not a functional bug, but a real consistency gap, the voice guideline exists and works well where it's been applied, it just hasn't been retrofitted to older Getting Started guides or wired into whatever generates chat responses. Worth a copy pass on existing guides and a check on the chat system prompt. |
| The profile avatar circle ("A") in Home's top-right corner has no visible label and its function isn't obvious without tapping it. | 🟢 Minor | Confirm it's discoverable as the settings/profile entry point, or add a subtle affordance if it currently relies purely on convention. |
| Post-paywall "Skip for now" on the Goal screen was sending `feeding_goal: ""` instead of omitting the key, which failed `upsert-profile` validation (400) and silently prevented any profile row from being created, a user could finish onboarding with zero saved data. Found via e2e investigation (`docs/technical/e2e-flow1a-paywall-clamp-testing-notes-2026-07-08.md`), not live-tested by me. | 🔴 Critical (status: substantially mitigated) | The backend is now confirmed hardened in this repo (`upsert-profile/index.ts` treats empty/null optional enums as omitted, verified by reading the current code), so the 400/no-profile failure is fixed at the API level regardless of what the frontend sends. A frontend-side fix is also drafted (`lovable-briefs/lovable-goal-skip-omit-fix.md`) but its live-shipped status is unconfirmed. Worth a live smoke test: onboard a new user, tap "Skip for now" on Goal, confirm a profile row is created. |
| Paywall headline showed a self-contradictory week number for babies older than 6 weeks, e.g. "your 6-week nursing plan — starting at week 11." Root cause: the paywall computed the week inline without the same `min(_, 6)` clamp the Protocol/This Week screen uses. Found via the same e2e investigation, not live-tested by me. | 🟡 Moderate (status: fix drafted, unconfirmed live) | The fix is specified in `lovable-briefs/lovable-onboarding-restructure.md` Part 6 (reuse the shared clamped `getCurrentWeek()` utility). Whether this has actually shipped is unconfirmed, worth checking live for any baby profile older than 6 weeks. |
| Onboarding was recently restructured (per `lovable-briefs/lovable-onboarding-restructure.md`) from a 10-screen, personalization-heavy pre-paywall flow to a lean 3-step pre-paywall sequence (Welcome → Name/Address → Baby Name+DOB merged → Feeding Path → Paywall), deferring Goal/Anatomy/Pump to post-paywall. Not live-verified whether this is actually what's currently shipped. | 🟢 Info | This is a good direction, fewer pre-paywall questions should reduce drop-off before the point of monetization. Worth a live check to confirm the 3-step sequence (not the older 7-step one) is what a new user actually sees. |

## Visual Hierarchy

- **Home**: correctly leads with the personalized greeting and a single "This Week" focus card, exactly the restraint This Week's own screen should have. The "Ask Anything" box is appropriately second-tier, present but not competing for first attention.
- **Tracker**: the primary action buttons (Nurse/Bottle, or the diaper counters) are correctly the largest, most prominent elements. The stat row (Today / Last feed) is appropriately quieter, secondary information rather than competing with the logging action.
- **Chat**: standard, well-executed chat hierarchy, user messages and assistant responses are visually distinct, the "IBCLC-reviewed" badge under each response is small enough not to compete with the content itself.
- **Getting Started guide detail**: excellent, numbered circular badges create a clear left-aligned reading rail down the page, each step card is self-contained and scannable. This is the pattern other content-heavy screens in the app (This Week, specifically) should be borrowing from.
- **Path Change hub**: the entry question ("Thinking about changing how you feed?") is correctly the largest, most prominent text, the selector below it is appropriately structured as a clear two-step decision rather than a wall of options.

## Consistency

| Element | Issue | Recommendation |
|---|---|---|
| Voice/copy rule (no em dashes) | Applied in Path Change and the bottle/nipple guide, absent from older Getting Started guides and live chat responses. | Retrofit existing static content in a copy pass; check whether chat responses are generated against a system prompt that could enforce the same rule. |
| Position/progress indicators | Getting Started's "Guide 2 of 7" is clear and trustworthy. This Week's week-position messaging contradicts itself across screens (see companion doc). Tracker's "sign in to save" contradicts actual auth state. Three different screens, three different levels of trustworthiness for very similar "where am I / is this saved" signals. | Worth a single pass auditing every progress/status/persistence indicator in the app against actual underlying state, this class of bug (UI claims one thing, backend state is another) is the most trust-corrosive category of issue in a health app. |
| Trust badges | "IBCLC-reviewed" appears as both a persistent header pill and a per-message badge on the Chat screen, technically consistent, arguably slightly redundant, though low severity, and better to over-signal trust than under-signal it in this domain. | No action needed, noting only because repetition of the exact same claim twice on one screen is worth being intentional about, not accidental. |
| Card treatment | Tracker, Getting Started, and Path Change all use a consistent white-card-on-cream-background visual language. This is a genuine strength, the app reads as one coherent product across very different feature areas. | Keep doing this, it's the right foundation for extending patterns (like This Week's proposed catch-up grouping) without inventing new visual language. |

## Accessibility

- **Color contrast**: dark text on white cards and the cream page background read comfortably across every screen reviewed. The teal primary-action color (Nurse button, selected tab states) has adequate contrast against both white and cream in the screenshots reviewed.
- **Touch targets**: Tracker's +/- counter buttons and the Nurse/Bottle toggle buttons are comfortably sized. The bottom tab bar icons are consistent and adequately spaced across every screen.
- **Text readability**: consistent type scale and line height across Home, Tracker, Chat, and Getting Started, no issues observed.
- **Truncated text as an accessibility issue, not just cosmetic**: the "Nurs" button label isn't just a visual bug, a truncated word can also read incorrectly to screen readers depending on how the truncation is implemented (CSS ellipsis vs. an actually-shortened string). Worth confirming the underlying string is the full word "Nurse" and the truncation, if any, is purely a CSS overflow issue and not a data/label problem.

## What Works Well

- Getting Started's guide detail screens are the strongest UI in the app, clear numbered steps, honest position indicator, calm tone, appropriately scoped read times.
- Home's restraint is exactly right, a single focus card and a single secondary action (ask anything), no competing calls to action.
- Tracker's disabled-state messaging ("Log at least 2 days of diapers to get started") is a good example of explaining *why* something is unavailable rather than just graying it out silently, worth extending as the pattern for any other disabled control in the app.
- The consistent card-and-cream visual language across Tracker, Getting Started, and Path Change makes the app feel like one coherent product even though these are functionally very different features, this is a strong foundation to build on.
- Path Change's entry copy and tone (calm, non-shaming, "no judgment, no pressure to explain") sets exactly the right register for a sensitive feature, and it's consistent with the rest of the app's voice.

## Onboarding

**Status of this section:** structural critique only, grounded in `docs/product/mvp-experience-spec.md` (original design intent), `lovable-briefs/lovable-onboarding-restructure.md` (the current intended flow, updated this morning), and a real e2e investigation from 2026-07-08/09 that drove the live app and found two genuine bugs. I did not create an account or walk through signup live myself, per the earlier decision to avoid touching the production Supabase project just to screenshot onboarding. Everything below is grounded in documentation and prior live findings, not fresh live-testing, and the current live state of the fixes described is unconfirmed.

**Structure, as currently specified:**
- Pre-paywall (3 steps): Welcome → Name/Address ("what should we call you") → Baby Name + DOB (merged into one screen) → Feeding Path selection → Paywall.
- Post-paywall: Account Creation (Google/Apple SSO or magic-link email, no password) → Goal/Reason → Breast Anatomy → Pump brand (Path B/C only) → Home transition.

This is a deliberate, recent restructure from an earlier 10-screen, personalization-heavy pre-paywall flow. Deferring Goal/Anatomy/Pump to after the paywall is a good call, it cuts the pre-paywall path down to the three questions that actually gate content (name, baby DOB, feeding path) and removes friction before the point of monetization. The trade-off is that the paywall's personalized preview headline now only has name + path + week to work with, rather than also reflecting her stated goal, worth watching whether that thins out the "this was built for me" feeling that the original design was going for, but it's a reasonable trade for a shorter path to purchase.

**What's working well by design:**
- The chosen-name personalization (Mama/Mom/Mommy/her own name) happens early and cheaply, and the "we'll use this throughout the app" framing sets an expectation that pays off in every other screen's copy.
- No-password auth (Google/Apple SSO, magic-link email) is the right call for a sleep-deprived, one-handed user, and placing it after payment removes account-creation friction from the pre-purchase path.
- Skippable fields (baby name, goal, anatomy, pump) have an explicit, non-shaming "Skip for now" affordance rather than being silently optional or requiring an awkward dead-end tap, consistent with the calm, no-judgment voice used elsewhere in the app (Path Change's entry copy, for example).
- The IBCLC-referral trust badge concept (crediting a specific named IBCLC above the fold for referral-channel arrivals) is a strong, well-reasoned trust mechanism per the original spec, worth confirming it survived the restructure and still renders prominently on Welcome.

**Two real bugs surfaced by e2e investigation (not by me, but grounded in actual live-app driving):**
1. **"Skip for now" on the Goal screen could silently produce zero saved profile data.** It was sending `feeding_goal: ""` instead of omitting the key, which failed backend validation (400) and aborted profile creation entirely, a user could complete onboarding and land on Home with literally no profile row. The backend is now confirmed hardened in this repo to treat empty/null optional fields as omitted, so this failure mode is fixed at the API level regardless of frontend behavior. A frontend fix is also drafted. Worth a live smoke test to confirm end-to-end.
2. **Paywall headline showed an unclamped, self-contradictory week number** for babies older than 6 weeks ("your 6-week nursing plan, starting at week 11"). A fix is specified (reuse the same clamped week utility the Protocol screen already uses correctly) but live-shipped status is unconfirmed.

Both bugs are the same failure pattern flagged in the cross-screen synthesis below: a screen computing or sending something independently instead of reusing the source of truth another screen already gets right.

## Priority Recommendations

1. **Fix the Tracker "sign in" messaging bug.** This is the highest-severity finding in this pass, a signed-in user being told to sign in to save their data is the kind of bug that can make someone stop trusting the app entirely, and Tracker is a daily-use, core-loop screen.
2. **Fix the "Nurs" truncated button label.** Small fix, high visibility, it's the primary action on the most-used screen in the app.
3. **Confirm the two onboarding bugs are actually resolved live.** The Goal-skip 400 is substantially mitigated by a confirmed backend fix, and a week-clamp fix is drafted for the paywall headline, but neither has been verified against the live app. A new-user smoke test (skip Goal, confirm a profile row exists; onboard a 70+ day-old baby, confirm the paywall says "week 6" not "week 11") would close this out.
4. **Run a copy pass reconciling the em-dash voice rule against existing Getting Started content.** Lower urgency than the bugs above. Scoped down after checking the actual documented rule (sparingly, max one per response, not a blanket ban): two guides, Latch & Positioning and The Fourth Trimester, were genuinely over and have a targeted fix ready (`docs/lovable/lovable-brief-em-dash-trim.md`); the rest were already within guidance and untouched. The Chat system prompt has also been updated in-repo to carry this rule into AI-generated responses, which it wasn't doing before.

---

## Cross-screen synthesis: what this pass adds to the This Week findings

Read together with the This Week critique, a pattern emerges: **the app's biggest risks aren't in what it shows, they're in whether what it shows is actually true.** This Week's three-way contradictory week-position messaging, Tracker's "sign in" bug shown to signed-in users, and the Key Actions checkmark that falsely resembles a completion signal are all the same underlying category of problem: a UI element making a claim (you're on week 6, this isn't saved, this is done) that doesn't match the actual state behind it.

Content density, the original concern that started this review, turns out to be a real but narrow problem, it's concentrated almost entirely in This Week, and the rest of the app is already well-calibrated. Trustworthiness of status signals is the broader, cross-cutting issue, and it's worth treating as its own workstream: an audit of every place in the app that tells a user something about their own state (saved or not, done or not, which week, which lesson) and confirming each one is backed by the state it claims to reflect.
