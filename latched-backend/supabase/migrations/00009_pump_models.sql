-- Migration 00009: replace pump_model (text) with pump_models (text[]).
--
-- Migration 00008 added a single-value pump_model text column.
-- This migration drops that column and replaces it with pump_models text[],
-- a multi-value array so users can record more than one pump (common —
-- many moms own a wearable and a desktop pump simultaneously).
--
-- Schema:
--   pump_models text[] NOT NULL DEFAULT '{}'
--
-- Each element is a specific pump model string, validated at the
-- application layer against the enumerated list in upsert-profile.
-- An empty array means no pump recorded (equivalent to the previous NULL).
--
-- Valid values (enforced at application level, not DB):
--   Spectra: Spectra S1 Plus | Spectra S2 Plus | Spectra Synergy Gold |
--            Spectra Synergy Gold Portable | Spectra 9 Plus | Spectra CaraCups
--   Medela:  Medela Pump In Style Pro | Medela Freestyle Hands-free |
--            Medela Solo | Medela Swing Maxi |
--            Medela Symphony (Hospital-Grade) | Medela Harmony (Manual)
--   Elvie:   Elvie Pump | Elvie Stride | Elvie Stride 2 | Elvie Curve (Manual)
--   Willow:  Willow 360 | Willow Go | Willow Wave 2-in-1 (Manual)
--   Momcozy: Momcozy M5 | Momcozy M9 Mobile Flow | Momcozy M6 Mobile Style |
--            Momcozy S12 Pro | Momcozy Air 1
--   BabyBuddha: BabyBuddha 2.0 | BabyBuddha Wearable Breast Pump |
--               BabyBuddha Manual
--   Other
--
-- A GIN index supports fast array containment queries, e.g.:
--   WHERE pump_models @> ARRAY['Spectra S1 Plus']

SET search_path TO extensions, public, pg_catalog;

-- Drop the single-value column added in 00008.
ALTER TABLE public.user_profiles
  DROP COLUMN IF EXISTS pump_model;

-- Add the multi-value replacement column.
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS pump_models text[] NOT NULL DEFAULT '{}';

COMMENT ON COLUMN public.user_profiles.pump_models IS
  'Array of specific pump model strings reported by the user. Empty array means none recorded. Validated at the application level — see upsert-profile VALID_PUMP_MODELS.';

-- GIN index for efficient array-contains queries.
CREATE INDEX IF NOT EXISTS user_profiles_pump_models_gin_idx
  ON public.user_profiles USING gin (pump_models);
