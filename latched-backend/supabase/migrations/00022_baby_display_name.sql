-- 00022_baby_display_name.sql
-- Adds baby_display_name to user_profiles.
--
-- display_name (existing) = user/parent name.
-- baby_display_name (new)  = baby's name, captured during onboarding or profile settings.
--
-- NULL is valid — not all users will have set this yet. The Provider Visit Summary
-- report header renders without a baby name line if this column is NULL.

SET search_path TO extensions, public, pg_catalog;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS baby_display_name text;

COMMENT ON COLUMN public.user_profiles.baby_display_name IS
  'Baby''s display name, set during onboarding or profile settings. '
  'NULL = not yet captured. Used in the Provider Visit Summary report header '
  'and anywhere the app personalizes content to the baby.';
