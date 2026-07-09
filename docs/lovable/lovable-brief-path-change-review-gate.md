# Lovable Update Prompt — Path Change: Per-Module Review Gating

**Paste the block below directly into Lovable.**

---

```
Add a review-status gate to the Path Change feature so individual transition modules can be hidden from discovery until they've cleared clinical review, without hiding the whole Path Change hub. This is a small addition on top of the existing Path Change hub and 11 transition module screens, not a rework of them.

Do not change: any transition module's content, the hub's header copy or layout, the app shell, bottom nav, home screen, chat, This Week, onboarding, or Getting Started. Do not change the T-A-B window logic, the Formula-only "Bringing your milk back" destination, or any other already-built Path Change behavior. This update only controls which modules are discoverable through the hub's navigation.

---

PART 0 — WHAT'S CHANGING (SUMMARY)

1. Add a config object mapping each of the 11 transition module IDs to a `reviewed` boolean flag: T-A-B, T-A-C, T-A-F, T-B-A, T-B-C, T-B-F, T-C-A, T-C-B, T-C-F, T-REL, T-WEAN.

2. Default every module to `reviewed: false` as the starting state. Nothing in Path Change should be discoverable through normal navigation until this update ships and modules are flipped to `true` one at a time as clinical review clears them.

3. The hub's two discovery surfaces (the "and I'm thinking about" selector list, and the "browse every transition" full list) only show modules where `reviewed: true`. An unreviewed module's route still exists and still renders correctly if someone lands on it directly (so nothing 404s, and QA/internal review can still reach any module by its direct URL), it just doesn't appear in the hub's own navigation.

4. If a selector combination has zero reviewed destinations (for example, "I'm currently on Nursing" when none of T-A-B, T-A-C, or T-A-F are reviewed yet), the "and I'm thinking about" section should show a brief, calm placeholder rather than an empty list or a broken-looking gap: "More options coming soon" is sufficient, styled as plain muted text, not an error or warning state.

5. The Formula → "Bringing your milk back" (T-REL) entry follows the same rule: if `reviewed: false` for T-REL, it doesn't appear as a destination option when "Formula" is selected under "I'm currently on", and the same "More options coming soon" placeholder shows in its place.

6. The "Thinking about changing how you feed?" card that already surfaces at the top of Getting Started should NOT be hidden by this update, it always links into the hub regardless of how many modules are currently reviewed. If literally zero modules are reviewed yet, the hub itself should still be reachable and show its header copy, just with the "More options coming soon" placeholder(s) in place of empty selector/browse lists.

---

PART 1 — CONFIG SHAPE

Add a config object (naming/location up to whatever pattern the rest of the Path Change code already follows, e.g. alongside wherever the 11 modules' content/metadata currently lives):

  T-A-B:  reviewed: false
  T-A-C:  reviewed: false
  T-A-F:  reviewed: false
  T-B-A:  reviewed: false
  T-B-C:  reviewed: false
  T-B-F:  reviewed: false
  T-C-A:  reviewed: false
  T-C-B:  reviewed: false
  T-C-F:  reviewed: false
  T-REL:  reviewed: false
  T-WEAN: reviewed: false

Every module starts false. Ashley will flip individual modules to true herself (directly in the Lovable project) as her IBCLC clears each one, tier by tier, per docs/product/path-change-phase5-rollout.md's Tier 0 (T-A-F, T-B-F, T-C-F, T-WEAN, T-REL) then Tier 1 (T-A-B, T-B-A, T-A-C, T-B-C, T-C-A, T-C-B) plan. This update should make flipping a single module's flag a simple, obvious one-line change, not something that requires touching multiple files.

---

PART 2 — HUB SELECTOR FILTERING

The "and I'm thinking about" list, filtered to valid destinations from the currently-selected "I'm currently on" path (per the existing Part 2 valid-transitions mapping already built), should now additionally filter out any destination whose module has `reviewed: false`.

Example: if the user has "I'm currently on Nursing" selected, and only T-A-F is reviewed (T-A-B and T-A-C are not), the "and I'm thinking about" list shows only "Formula" (routing to T-A-F). If none of the three are reviewed yet, show the "More options coming soon" placeholder described in Part 0, item 4, in place of the list.

Formula's single-destination case: if T-REL is `reviewed: false`, selecting "Formula" under "I'm currently on" shows the "More options coming soon" placeholder instead of "Bringing your milk back".

---

PART 3 — HUB BROWSE LIST FILTERING

The "or browse every transition" full list (all 11 modules as tappable rows) should only render rows where `reviewed: true`. If zero modules are reviewed yet, show a short placeholder in that section instead of an empty list: "Nothing to browse yet, check back soon" is sufficient, same calm/muted styling as the selector placeholder.

---

PART 4 — DIRECT ROUTE ACCESS UNCHANGED

/path-change/[id] routes continue to work exactly as they do now regardless of a module's `reviewed` flag. This gate only controls discovery through the hub's own UI, not access. This is intentional: it lets Ashley or her IBCLC review a module by visiting its direct URL before it's flipped to reviewed, without needing a separate preview mechanism.

---

PART 5 — DO NOT CHANGE

- Any transition module's content, title, metadata, or the T-A-B window logic.
- The hub's header copy, "I'm currently on" / "and I'm thinking about" layout structure, or the Formula special case's underlying behavior (only that its single destination can now also be hidden pending review, same as any other module).
- The "Thinking about changing how you feed?" card in Getting Started, or its link into the hub.
- Any other route, screen, or logic outside /path-change/*.
- The `switch-feeding-path` backend function or the `path_transition_events` table, this update is frontend-only, purely about what's discoverable, not about the underlying switch mechanism.
```
