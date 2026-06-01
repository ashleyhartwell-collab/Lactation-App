-- Migration 00014: Rename feeding_preference value 'pumping' → 'exclusive_pumping'.
--
-- 'pumping' was ambiguous — combo-feeding moms also pump, so 'pumping' didn't
-- cleanly map to Path B (exclusive pumping).  'exclusive_pumping' is the precise
-- clinical term, matches the companion layer content library, and makes the
-- Path A/B/C mapping unambiguous in every edge function going forward.
--
-- No data migration is needed (no real users yet).
--
-- New constraint values:
--   'breastfeeding'    → Path A (nursing)
--   'exclusive_pumping'→ Path B (EP)
--   'combo'            → Path C (combo feeding)
--   'formula'          → no companion path; user receives no AG/ML items in v1
--
-- upsert-profile must also be updated to accept 'exclusive_pumping' and reject
-- the old 'pumping' value.  See supabase/functions/upsert-profile/index.ts.

SET search_path TO extensions, public, pg_catalog;

-- Drop the old constraint
ALTER TABLE public.user_profiles
  DROP CONSTRAINT IF EXISTS user_profiles_feeding_preference_check;

-- Add the corrected constraint
ALTER TABLE public.user_profiles
  ADD CONSTRAINT user_profiles_feeding_preference_check
  CHECK (feeding_preference IN (
    'breastfeeding',
    'exclusive_pumping',
    'combo',
    'formula'
  ));

COMMENT ON COLUMN public.user_profiles.feeding_preference IS
  'User''s feeding method. Maps to companion layer paths: '
  'breastfeeding = Path A, exclusive_pumping = Path B, combo = Path C. '
  'formula users receive no companion items in v1.';
