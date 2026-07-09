# Anticipatory Guidance: Recurring Nipple-Replacement Reminders

**Status:** DRAFT — content ready for review; not yet added to `latched-backend/scripts/data/ag-content.cjs` or seeded via migration.
**Prepared:** 2026-07-08
**Corrected:** 2026-07-08 — the trigger IDs originally proposed here (AG-023 through AG-030) collide with real, already-shipped content: AG-023 (IGT/breast reduction), AG-024 (flat/inverted nipples), and AG-025 (breast implants) all already exist in `00013_companion_seed.sql` and `latched-backend/scripts/data/ag-content.cjs`. Confirmed AG-025 is the current highest in-use ID, checked against both the main tree and the parallel `claude/eloquent-bohr-a6b087` worktree, so this doc now uses AG-026 through AG-033 instead.
**Depends on:** `docs/product/getting-started-bottle-nipple-guide.md` shipping first — these nudges link out to it and have nothing to point to otherwise.

## Mechanism

Reuses the existing `companion_triggers` / `companion_content` system as-is, no schema changes. Path-gating uses the existing `paths` text[] column. Recurrence isn't natively supported (single-fire per user via the `UNIQUE (user_id, trigger_id)` constraint on `pending_companion_items`), so this follows the same precedent already established by the growth-spurt reminders (AG-005, AG-009, AG-011): multiple separate one-shot trigger rows spaced across weeks, rather than one recurring trigger.

## Cadence

Every 6 weeks, starting week 6, per Ashley's call (2026-07-08). Seeding 8 occurrences up front, covering roughly the first year (week 6 through week 48). Extending past week 48 is a future content-ops task once users start approaching that horizon, not something to build indefinitely now.

| Trigger ID | Target week | `dob_offset_min` / `dob_offset_max` (days, ±3 day window) |
|---|---|---|
| AG-026 | Week 6 | 39 / 45 |
| AG-027 | Week 12 | 81 / 87 |
| AG-028 | Week 18 | 123 / 129 |
| AG-029 | Week 24 | 165 / 171 |
| AG-030 | Week 30 | 207 / 213 |
| AG-031 | Week 36 | 249 / 255 |
| AG-032 | Week 42 | 291 / 297 |
| AG-033 | Week 48 | 333 / 339 |

All 8 rows: `feature: "AG"`, `trigger_type: "time_based"`, `paths: ['B','C']`, `priority: 60` (below AG-007's 50, so it doesn't compete with higher-priority nudges if both are eligible in the same window), `held: false`.

## Content (shared across all 8 occurrences)

Same content object reused for every trigger id — the message doesn't need to change occurrence to occurrence, just the timing.

```js
{
  headline: "Time for a nipple check",
  inAppMessage: "It's been about 6 weeks since your last nipple check-in. If you're using latex, it's worth replacing on this kind of schedule regardless of how it looks. If you're using silicone, it holds up longer, but still worth a quick look for stickiness, discoloration, or a nipple that's changed shape.",
  inAppMessagePathB: "It's been about 6 weeks since your last nipple check-in. If you're using latex, it's worth replacing on this kind of schedule regardless of how it looks. If you're using silicone, it holds up longer, but still worth a quick look for stickiness, discoloration, or a nipple that's changed shape.",
  inAppMessagePathC: "It's been about 6 weeks since your last nipple check-in. If you're using latex, it's worth replacing on this kind of schedule regardless of how it looks. If you're using silicone, it holds up longer, but still worth a quick look for stickiness, discoloration, or a nipple that's changed shape.",
  learnMore: "Full nipple material guidance (silicone vs. latex, replacement signs) is in the Choosing a Bottle and Nipple guide.",
  escalation: false,
  escalationText: null,
  sources: "Manufacturer replacement guidance for latex teats; general nipple-wear signs (stickiness, discoloration, shape change).",
}
```

Note: `inAppMessagePathB` and `inAppMessagePathC` are identical here since the underlying guidance (silicone vs. latex replacement cadence) doesn't differ by path, only the linked guide variant does. The `learnMore` deep-link should route to the reader's own path variant (EP or Combination Feeding) of the guide automatically, the same way any other cross-referenced guide link already resolves per-path.

## Open items before this ships

1. **Wire the `learnMore` deep link once the guide has a real route/slug.** Right now it's placeholder text; needs the actual guide URL once `docs/product/getting-started-bottle-nipple-guide.md` is approved and built in Lovable.
2. **Confirm priority value (60) doesn't conflict with anything else firing in the same week windows** — a quick check against the full trigger table once this is ready to seed, not just this doc in isolation.
3. **Extending past week 48** is intentionally left as a follow-up, not solved here.
4. **Re-confirm AG-026 through AG-033 are still free immediately before seeding**, since other work is landing concurrently in this repo (see the 2026-07-08 correction note above). Don't assume this doc's ID range is still accurate by the time it's actually implemented — re-grep `ag-content.cjs` and the migrations directory first.
