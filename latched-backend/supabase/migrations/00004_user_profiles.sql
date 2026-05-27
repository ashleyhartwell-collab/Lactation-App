-- Migration 00004: user profiles table for Latched auth.
-- Linked to auth.users via FK. Stores baby DOB, feeding preference, and
-- onboarding state. weeks_postpartum() helper used by the Edge Functions.

SET search_path TO extensions, public, pg_catalog;

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id                  uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name        text,
  baby_dob            date        NOT NULL,
  feeding_preference  text        CHECK (feeding_preference IN ('breastfeeding', 'pumping', 'combo', 'formula'))
                                  DEFAULT 'breastfeeding',
  onboarding_complete boolean     NOT NULL DEFAULT false,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.user_profiles IS
  'One row per authenticated user. Created/updated by the upsert-profile Edge Function.';

-- Auto-update updated_at on every change.
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Row Level Security — users can only see/edit their own row.
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can read own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users can insert own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- weeks_postpartum: returns how many whole weeks since baby_dob.
-- Returns 0 if baby_dob is in the future (edge case guard).
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.weeks_postpartum(baby_dob date)
RETURNS int LANGUAGE sql STABLE AS $$
  SELECT GREATEST(0, EXTRACT(EPOCH FROM (now() - baby_dob::timestamptz)) / 604800)::int;
$$;
