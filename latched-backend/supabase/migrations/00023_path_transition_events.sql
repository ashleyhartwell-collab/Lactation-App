-- Migration 00023: path_transition_events table for the Path Change feature.
--
-- Records that a feeding-path switch happened, anonymized and aggregate-only,
-- per the locked product decision (docs/product/path-transition-design.md,
-- Open Questions #4, resolved 2026-07-08): analytics on path transitions are
-- tracked, but never user-facing and never tied to an identifiable profile.
--
-- Design notes (see docs/product/path-change-phase2-data-layer.md for full
-- rationale):
--   - No user_id column, not even hashed. A hash is still a stable per-user
--     identifier that could be correlated against other tables; omitting it
--     entirely is the only version of "never tied to an identifiable profile"
--     that holds up even against internal misuse.
--   - postpartum_week_bucket instead of an exact week or baby_dob. Exact week
--     combined with transitioned_at could be used to back into an approximate
--     birth date, which re-identifies the profile. Coarse buckets lose that
--     precision on purpose.
--   - RLS enabled with no policies (default-deny). Only the switch-feeding-path
--     Edge Function (service role) writes to this table. No authenticated
--     client-side read/write path exists.
--
-- Only the switch-feeding-path Edge Function should insert into this table.
-- See supabase/functions/switch-feeding-path/index.ts.

SET search_path TO extensions, public, pg_catalog;

CREATE TABLE IF NOT EXISTS public.path_transition_events (
  id                       uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path                text        NOT NULL CHECK (from_path IN (
                                          'breastfeeding', 'exclusive_pumping', 'combo', 'formula'
                                        )),
  to_path                  text        NOT NULL CHECK (to_path IN (
                                          'breastfeeding', 'exclusive_pumping', 'combo', 'formula'
                                        )),
  transitioned_at          timestamptz NOT NULL DEFAULT now(),
  -- Coarse bucket derived from public.weeks_postpartum(baby_dob) at the moment
  -- of the switch. Never store the exact week or baby_dob here.
  postpartum_week_bucket   text        NOT NULL CHECK (postpartum_week_bucket IN (
                                          '0-4', '5-8', '9-12', '13-24', '25-52', '52+'
                                        ))
);

COMMENT ON TABLE public.path_transition_events IS
  'Anonymized, aggregate-only log of feeding-path switches. No user_id or '
  'other identifiable column exists on this table by design — see migration '
  'comment header and docs/product/path-change-phase2-data-layer.md. Written '
  'only by the switch-feeding-path Edge Function via the service role.';

COMMENT ON COLUMN public.path_transition_events.postpartum_week_bucket IS
  'Coarse postpartum-week bucket at the time of the switch, derived from '
  'public.weeks_postpartum(baby_dob). Intentionally coarse (not an exact week) '
  'so this table cannot be used to back into an approximate birth date.';

-- Default-deny RLS. No policies are added — only the service role (which
-- bypasses RLS) can read or write this table. There is no authenticated
-- client-side access path to path_transition_events, by design.
ALTER TABLE public.path_transition_events ENABLE ROW LEVEL SECURITY;

-- Helper: map a raw week count (from public.weeks_postpartum) to a coarse
-- bucket. Used by switch-feeding-path so the bucketing logic lives in one
-- place rather than being duplicated in application code.
CREATE OR REPLACE FUNCTION public.postpartum_week_bucket(weeks int)
RETURNS text LANGUAGE sql STABLE AS $$
  SELECT CASE
    WHEN weeks <= 4  THEN '0-4'
    WHEN weeks <= 8  THEN '5-8'
    WHEN weeks <= 12 THEN '9-12'
    WHEN weeks <= 24 THEN '13-24'
    WHEN weeks <= 52 THEN '25-52'
    ELSE '52+'
  END;
$$;

COMMENT ON FUNCTION public.postpartum_week_bucket(int) IS
  'Maps a raw week count (from public.weeks_postpartum) to the coarse bucket '
  'used by path_transition_events. Kept as a DB function so the bucketing '
  'logic is defined once, not duplicated across Edge Functions.';
