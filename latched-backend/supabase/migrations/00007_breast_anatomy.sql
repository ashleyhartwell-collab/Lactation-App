-- Migration 00007: breast anatomy profile field.
--
-- Adds breast_anatomy JSONB column to user_profiles.
-- Stores an array of { condition, laterality } objects capturing anatomy
-- conditions the user reported during onboarding or profile editing.
--
-- Schema:
--   breast_anatomy jsonb NOT NULL DEFAULT '[]'
--   Each element: { "condition": <string>, "laterality": "left"|"right"|"both" }
--
-- Example:
--   [{"condition":"flat_nipples","laterality":"right"},
--    {"condition":"breast_reduction","laterality":"both"}]
--
-- Valid condition values (enforced at application level, not DB):
--   flat_nipples | inverted_nipples | breast_implants | breast_reduction |
--   breast_augmentation | partial_mastectomy | full_mastectomy |
--   hypoplastic_breasts | previous_breast_surgery | breast_radiation |
--   nipple_piercing_history
--
-- Empty array [] means no conditions reported (the default).
-- The field is JSONB rather than text[] to support per-condition metadata
-- (laterality, severity, implant placement type, etc.) without future
-- schema migrations.

SET search_path TO extensions, public, pg_catalog;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS breast_anatomy jsonb NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.user_profiles.breast_anatomy IS
  'Array of breast anatomy conditions reported by the user. Each element: {"condition": string, "laterality": "left"|"right"|"both"}. Empty array means none reported.';

-- GIN index for fast containment queries, e.g.:
--   WHERE breast_anatomy @> '[{"condition":"breast_reduction"}]'
CREATE INDEX IF NOT EXISTS user_profiles_breast_anatomy_gin_idx
  ON public.user_profiles USING gin (breast_anatomy);
