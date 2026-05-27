-- Migration 00008: pump model profile field.
--
-- Adds pump_model text column to user_profiles.
-- Stores the breast pump model the user reported during onboarding
-- (question 7). Nullable — users who skip the question or don't pump
-- will have NULL here.
--
-- Schema:
--   pump_model text NULL
--
-- Examples:
--   'Spectra S2'
--   'Medela Pump In Style'
--   'Elvie Stride'
--   'Willow Go'
--   'Motif Luna'
--   'Haakaa'
--
-- Stored as plain text to allow free-form model names from the
-- onboarding dropdown without requiring a foreign-key enum table.
-- Validation of accepted values is enforced at the application level.
--
-- A btree index is added for queries that filter or group by pump model
-- (e.g., aggregating support query patterns by pump brand).

SET search_path TO extensions, public, pg_catalog;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS pump_model text NULL;

COMMENT ON COLUMN public.user_profiles.pump_model IS
  'Breast pump model reported by the user during onboarding. NULL means not provided. Plain text — validation enforced at application level.';

-- Regular btree index for equality and sorting queries on pump_model.
CREATE INDEX IF NOT EXISTS user_profiles_pump_model_idx
  ON public.user_profiles (pump_model);
