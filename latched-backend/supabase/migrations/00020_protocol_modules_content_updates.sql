-- 00020_protocol_modules_content_updates.sql
-- Consolidated content/module changes from the 2026-06-30 backend session.
-- Source brief: docs/technical/backend-brief-session-2026-06-30.md
--
-- ⚠️  PRECONDITION — READ BEFORE RUNNING:
--     This migration assumes the `protocol_modules` table EXISTS and is the
--     source of truth for lesson content. As of migration 00019, that table
--     has NOT been created in this repo (it is defined only in the ERD at
--     docs/technical/technical-design-v1.md). Lesson content currently lives
--     in hardcoded Lovable React components, so the changes below are applied
--     by the session's Lovable briefs, NOT by SQL.
--
--     Run this migration ONLY once protocol_modules is deployed AND content
--     is being served from the DB. Until then, items 1–6 are no-ops at the DB
--     layer and this file is a forward-looking spec. See
--     docs/technical/backend-changes-findings-2026-06-30.md for the full
--     rationale.
--
--     The guard below makes the migration self-skipping: if the table is
--     absent, it raises a NOTICE and exits without error.
--
-- ⚠️  ALREADY APPLIED AS A NO-OP (2026-06-30):
--     This migration was pushed to the remote project on 2026-06-30. At that
--     time protocol_modules did not exist, so it took the self-skip branch and
--     changed nothing. It is now recorded as applied in
--     supabase_migrations.schema_migrations.
--
--     Because the CLI sees 00020 as applied, EDITING AND RE-PUSHING THIS FILE
--     WILL NOT RE-RUN IT. When protocol_modules eventually goes live, do NOT
--     resurrect this file for the content backfill — instead add a NEW, higher-
--     numbered migration (e.g. 00021_protocol_modules_content_backfill.sql)
--     containing the item 1–6 INSERT/UPDATE statements below (filled in from the
--     then-current Lovable component content) plus the A-1-1 / B-1-4 / C-1-5
--     inline-link UPDATEs. Treat the body of this file as a reference skeleton.
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'protocol_modules'
  ) THEN
    RAISE NOTICE 'protocol_modules does not exist — skipping 00020. Content lives in Lovable components; nothing to migrate.';
    RETURN;
  END IF;

  -- ─── ITEM 1: Deactivate the original pediatrician-visits lesson ───────────
  -- Keep the row for audit trail. Orphaned user_module_progress rows are harmless.
  UPDATE public.protocol_modules
  SET is_active = false, updated_at = now()
  WHERE id = 'shared-pediatrician-visits';

  -- ─── ITEMS 2–4: Insert three timing-split pediatrician lessons ────────────
  -- module_order: week 1 shared list already holds postpartum-body, partner-
  -- support, safe-sleep, escalation-guide. Pediatrician-week1 is placed last in
  -- that list (order 50). Weeks 4 and 8 currently have no other shared modules,
  -- so order 10 positions each as the first shared lesson in its week. Adjust
  -- these three integers if your existing ordering convention differs.
  INSERT INTO public.protocol_modules
    (id, path, week_number, module_order, title, lead_line,
     body_content, crash_course_content, is_shared, is_active, version, created_at)
  VALUES
    ('shared-pediatrician-week1', 'shared', 1, 50,
     'Your Baby''s First Pediatrician Visit',
     'The first visit is mostly about one question: is your baby getting enough?',
     '[content authored in docs/lovable/lovable-brief-pediatrician-visits-content.md]',
     '[crash-course content per the same Lovable brief]',
     true, true, '1.0', now()),

    ('shared-pediatrician-week4', 'shared', 4, 10,
     'Your Baby''s 1-Month Pediatrician Visit',
     'By one month, weight gain is your clearest signal that feeding is working — and your provider is looking at it closely.',
     '[content authored in docs/lovable/lovable-brief-pediatrician-visits-content.md]',
     '[crash-course content per the same Lovable brief]',
     true, true, '1.0', now()),

    ('shared-pediatrician-week8', 'shared', 8, 10,
     'Your Baby''s 2-Month Pediatrician Visit',
     'The two-month visit includes vaccines. That changes how the next day or two will go — and how your baby feeds through it.',
     '[content authored in docs/lovable/lovable-brief-pediatrician-visits-content.md]',
     '[crash-course content per the same Lovable brief]',
     true, true, '1.0', now())
  ON CONFLICT (id) DO UPDATE
    SET is_active = excluded.is_active,
        week_number = excluded.week_number,
        module_order = excluded.module_order,
        title = excluded.title,
        lead_line = excluded.lead_line,
        updated_at = now();

  -- ─── ITEM 5: Insert shared-hand-expression reference lesson ───────────────
  -- Reference lesson, reached only via inline links from A-1-1, B-1-4, C-1-5.
  -- week_number is NULL so the week-routing query never surfaces it in a week's
  -- lesson list — same pattern the T-A-B transition lesson follows. The ERD
  -- defines week_number as a nullable smallint, so NULL is valid.
  INSERT INTO public.protocol_modules
    (id, path, week_number, module_order, title, lead_line,
     body_content, crash_course_content, is_shared, is_active, version, created_at)
  VALUES
    ('shared-hand-expression', 'shared', NULL, NULL,
     'How to Hand Express',
     'Hand expression is worth learning even if you plan to pump — in the first days, your hands collect colostrum better than any pump can.',
     '[content authored in docs/lovable/lovable-brief-hand-expression-lesson.md]',
     NULL,
     true, true, '1.0', now())
  ON CONFLICT (id) DO UPDATE
    SET week_number = excluded.week_number,
        title = excluded.title,
        lead_line = excluded.lead_line,
        is_active = excluded.is_active,
        updated_at = now();

  -- ─── ITEM 6: Deactivate the mental-health lesson ──────────────────────────
  -- Keep the row, component, and route in place for possible future use.
  UPDATE public.protocol_modules
  SET is_active = false, updated_at = now()
  WHERE id = 'shared-mental-health';

  -- NOTE on inline-link content updates (A-1-1, B-1-4, C-1-5):
  -- These lessons now link to shared-hand-expression. If body_content is the
  -- source of truth, also UPDATE those three rows' WHAT TO DO sections to
  -- replace the hand-expression crash-course snippet with an inline link.
  -- That copy is defined in the Lovable brief; add the UPDATEs here only once
  -- the exact target strings are confirmed, to keep the find-and-replace exact.

  RAISE NOTICE '00020 applied: pediatrician split (1/4/8), hand-expression reference lesson, mental-health deactivated.';
END $$;

-- ============================================================================
-- ITEM 7: Trusted Friend / companion layer — NO ACTION.
--   Companion backend WAS migrated (00011 tables, 00012 RLS, 00013 seed).
--   The UI is hidden; tables and edge functions sit dormant. Do NOT drop them.
--   (The brief's reference to "migration 00009" is a numbering mismatch — in
--   this repo 00009 is pump_models; companion is 00011–00013.)
-- ============================================================================
