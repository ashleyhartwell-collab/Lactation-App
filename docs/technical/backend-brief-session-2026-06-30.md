# Backend Changes — Session 2026-06-30

Consolidated list of all backend work from this session. Run these together.  
Reference doc for pediatrician visits specifics: `backend-brief-pediatrician-visits-migration.md`

---

## Summary of all changes

| # | Table / System | Action | Reason |
|---|---|---|---|
| 1 | `protocol_modules` | UPDATE is_active = false | Deactivate shared-pediatrician-visits |
| 2 | `protocol_modules` | INSERT | New shared-pediatrician-week1 |
| 3 | `protocol_modules` | INSERT | New shared-pediatrician-week4 |
| 4 | `protocol_modules` | INSERT | New shared-pediatrician-week8 |
| 5 | `protocol_modules` | INSERT | New shared-hand-expression (reference lesson) |
| 6 | `protocol_modules` | UPDATE is_active = false | Deactivate shared-mental-health |
| 7 | Companion layer | No action — see note | Trusted Friend UI hidden, backend dormant |

---

## Items 1–4: Pediatrician visits

See `backend-brief-pediatrician-visits-migration.md` for full SQL. Summary:

```sql
-- Deactivate original
UPDATE protocol_modules SET is_active = false WHERE id = 'shared-pediatrician-visits';

-- Insert three replacements (fill in module_order)
INSERT INTO protocol_modules (id, path, week_number, module_order, title, lead_line, is_shared, is_active, version, created_at)
VALUES
  ('shared-pediatrician-week1', 'shared', 1, [TBD], 'Your Baby''s First Pediatrician Visit', 'The first visit is mostly about one question: is your baby getting enough?', true, true, '1.0', now()),
  ('shared-pediatrician-week4', 'shared', 4, [TBD], 'Your Baby''s 1-Month Pediatrician Visit', 'By one month, weight gain is your clearest signal that feeding is working — and your provider is looking at it closely.', true, true, '1.0', now()),
  ('shared-pediatrician-week8', 'shared', 8, [TBD], 'Your Baby''s 2-Month Pediatrician Visit', 'The two-month visit includes vaccines. That changes how the next day or two will go — and how your baby feeds through it.', true, true, '1.0', now());
```

---

## Item 5: shared-hand-expression (reference lesson)

This lesson was created this session. It is accessed only via inline links from other lessons — it does not appear in any week's lesson list. It's the same pattern as T-A-B.

`week_number` should be NULL (or whatever value T-A-B uses) so it is never surfaced by the week-routing query. Confirm by checking how T-A-B's row is structured and match it.

```sql
INSERT INTO protocol_modules
  (id, path, week_number, module_order, title, lead_line, is_shared, is_active, version, created_at)
VALUES
  (
    'shared-hand-expression',
    'shared',
    NULL,   -- reference lesson; not week-gated. Match T-A-B's value here.
    NULL,
    'How to Hand Expression',
    'Hand expression is worth learning even if you plan to pump — in the first days, your hands collect colostrum better than any pump can.',
    true,
    true,
    '1.0',
    now()
  );
```

**Also update the existing lessons that now link to this lesson.** If `body_content` in `protocol_modules` is the source of truth for lesson content (rather than hardcoded Lovable components), update the WHAT TO DO sections of A-1-1, B-1-4, and C-1-5 to replace the hand expression crash-course snippet references with inline links to `shared-hand-expression`. If content is hardcoded in Lovable components, the Lovable brief already handles this — no DB update needed.

---

## Item 6: shared-mental-health

Deactivate. Keep the row — the component and route are staying in place for potential future use.

```sql
UPDATE protocol_modules
SET is_active = false
WHERE id = 'shared-mental-health';
```

No `user_module_progress` cleanup needed. Orphaned progress rows for a deactivated module are harmless.

---

## Item 7: Trusted Friend companion layer — no backend action required

The Trusted Friend UI has been removed from all user-facing surfaces this session. The backend status depends on whether migration 00009 (from `trusted-friend-backend-plan.md`) was already run:

**If migration 00009 was NOT yet run:** Do not run it. The `companion_triggers` and `pending_companion_items` tables do not need to exist while the feature is hidden.

**If migration 00009 WAS already run:** No rollback needed. The tables and edge functions (`evaluate-companion-triggers`, `get-companion-item`, `dismiss-companion-item`, `log-checkin`) can sit dormant — they are not called from the UI anymore. Do not drop the tables or delete the edge functions; the feature may be reactivated later.

---

## Content updates — clarification needed

Several existing lessons had content replaced this session (shared-postpartum-body, shared-partner-support, shared-escalation-guide, A-1-2). These were handled via Lovable briefs that update React components directly.

If lesson content is stored in the `body_content` and `crash_course_content` columns of `protocol_modules` and fetched at runtime, those columns will need to be updated to match what was written in the Lovable briefs. If content is currently hardcoded in Lovable components (the more likely state in early development), no DB update is needed for this.

**Action:** Confirm with your developer which is true before running the session's Lovable briefs. If content is DB-driven, the Lovable briefs need to be accompanied by matching UPDATE statements on `body_content` for the affected rows.

---

## Full checklist

- [ ] UPDATE is_active = false for `shared-pediatrician-visits`
- [ ] INSERT `shared-pediatrician-week1` (week 1, is_shared true)
- [ ] INSERT `shared-pediatrician-week4` (week 4, is_shared true)
- [ ] INSERT `shared-pediatrician-week8` (week 8, is_shared true)
- [ ] Verify week routing query surfaces is_shared rows and week 4 + 8 are reachable
- [ ] INSERT `shared-hand-expression` (week_number NULL, match T-A-B pattern)
- [ ] UPDATE is_active = false for `shared-mental-health`
- [ ] Confirm companion layer migration 00009 status — act accordingly (see item 7)
- [ ] Confirm whether content is DB-driven or component-hardcoded — act accordingly
- [ ] FeedingSummaryPlaceholder: no backend work yet
