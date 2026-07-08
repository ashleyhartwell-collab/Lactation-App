# Backend Brief — Pediatrician Visits Module Migration

**Related Lovable brief:** `docs/lovable/lovable-brief-pediatrician-visits-content.md`  
**Status:** Ready to implement  
**Date:** 2026-06-30

---

## What changed

The single `shared-pediatrician-visits` lesson is being replaced by three new lessons split by visit timing. The original module is deactivated (not deleted). Three new rows are added to `protocol_modules`. No schema changes required — `is_active` and `is_shared` already exist on the table.

---

## 1. Deactivate the original module

```sql
UPDATE protocol_modules
SET is_active = false
WHERE id = 'shared-pediatrician-visits';
```

Do not delete the row. Existing `user_module_progress` records that reference `shared-pediatrician-visits` are harmless — completed = true rows for a deactivated module don't cause errors and don't need to be cleaned up. Leaving them preserves an audit trail if needed.

---

## 2. Insert three new module rows

Match the `path` value to whatever the existing active shared modules use (e.g., `'shared'`). Adjust `module_order` to position each lesson correctly within its week's shared list. `version` should follow your existing convention.

```sql
INSERT INTO protocol_modules
  (id, path, week_number, module_order, title, lead_line, body_content, crash_course_content, is_shared, is_active, version, created_at)
VALUES
  (
    'shared-pediatrician-week1',
    'shared',
    1,
    [order TBD — after existing week 1 shared modules],
    'Your Baby''s First Pediatrician Visit',
    'The first visit is mostly about one question: is your baby getting enough?',
    '[content defined in Lovable brief]',
    '[crash course content defined in Lovable brief]',
    true,
    true,
    '1.0',
    now()
  ),
  (
    'shared-pediatrician-week4',
    'shared',
    4,
    [order TBD — first or only shared module in week 4],
    'Your Baby''s 1-Month Pediatrician Visit',
    'By one month, weight gain is your clearest signal that feeding is working — and your provider is looking at it closely.',
    '[content defined in Lovable brief]',
    '[crash course content defined in Lovable brief]',
    true,
    true,
    '1.0',
    now()
  ),
  (
    'shared-pediatrician-week8',
    'shared',
    8,
    [order TBD — first or only shared module in week 8],
    'Your Baby''s 2-Month Pediatrician Visit',
    'The two-month visit includes vaccines. That changes how the next day or two will go — and how your baby feeds through it.',
    '[content defined in Lovable brief]',
    '[crash course content defined in Lovable brief]',
    true,
    true,
    '1.0',
    now()
  );
```

---

## 3. Verify week routing logic

`week_postpartum` is calculated from `baby_dob` and used to determine which week's lessons a user sees. Confirm that the query fetching a user's current week's lesson list:

- Filters `protocol_modules` by `week_number = user.week_postpartum` (or equivalent)
- Filters by `is_active = true`
- Includes `is_shared = true` rows alongside path-specific rows for the user's path
- Orders by `module_order`

The week 1 pediatrician lesson will surface correctly alongside existing week 1 shared modules with no changes needed — it just needs the row in the table.

The week 4 and week 8 lessons only appear when `week_postpartum` reaches 4 and 8 respectively. If week advancement is driven by `baby_dob` (dynamic calculation), no additional logic is needed. If it's manually advanced, confirm that weeks 4 and 8 are included in the advancement schedule.

---

## 4. No RLS changes needed

Existing RLS policies on `protocol_modules` (users can read active rows) and `user_module_progress` (users can read/write their own rows) cover the new rows automatically. No new policies required.

---

## 5. FeedingSummaryPlaceholder — hold

The `FeedingSummaryPlaceholder` component in the Lovable brief is a non-functional UI stub. No backend work is needed for it now. When the feature is ready to build, it will need:

- A query or edge function to fetch feed tracker + diaper tracker entries for a user-defined date range
- Aggregation logic (feeds per day, total ounces, diaper counts, notes)
- A formatted output (for display and/or sharing)

This is scoped separately. Do not implement until instructed.

---

## Summary checklist

- [ ] `UPDATE protocol_modules SET is_active = false WHERE id = 'shared-pediatrician-visits'`
- [ ] `INSERT` row for `shared-pediatrician-week1` (week 1, is_shared true, is_active true)
- [ ] `INSERT` row for `shared-pediatrician-week4` (week 4, is_shared true, is_active true)
- [ ] `INSERT` row for `shared-pediatrician-week8` (week 8, is_shared true, is_active true)
- [ ] Confirm week routing query includes `is_shared = true` rows and filters by `is_active = true`
- [ ] Confirm week 4 and week 8 are reachable in the week advancement logic
- [ ] No RLS changes needed
- [ ] FeedingSummaryPlaceholder: no backend work yet
