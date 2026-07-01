-- 00021_diaper_logs.sql
-- Creates diaper_logs table for the Provider Visit Summary feature.
--
-- One row per user per calendar day. Written by the diaper tracker UI
-- via upsert (INSERT ... ON CONFLICT DO UPDATE).
--
-- Prerequisite: update_updated_at() trigger function exists (created in 00004).

SET search_path TO extensions, public, pg_catalog;

CREATE TABLE IF NOT EXISTS public.diaper_logs (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  logged_date   date        NOT NULL DEFAULT current_date,
  wet_count     smallint    NOT NULL DEFAULT 0 CHECK (wet_count >= 0),
  stool_count   smallint    NOT NULL DEFAULT 0 CHECK (stool_count >= 0),
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  -- Enforce one row per user per day; DiapersTrackerScreen uses upsert
  UNIQUE (user_id, logged_date)
);

COMMENT ON TABLE public.diaper_logs IS
  'One row per user per calendar day of logged diaper output. '
  'Written via upsert by the diaper tracker UI. '
  'Read by the Provider Visit Summary report generator.';

-- Trigger: keep updated_at current
CREATE TRIGGER diaper_logs_updated_at
  BEFORE UPDATE ON public.diaper_logs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Index: per-user ordered by date — primary access pattern for the report
CREATE INDEX IF NOT EXISTS diaper_logs_user_date_idx
  ON public.diaper_logs (user_id, logged_date DESC);

-- RLS: mirrors feeding_sessions policies
ALTER TABLE public.diaper_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can read own diaper logs"
  ON public.diaper_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users can insert own diaper logs"
  ON public.diaper_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users can update own diaper logs"
  ON public.diaper_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "users can delete own diaper logs"
  ON public.diaper_logs FOR DELETE
  USING (auth.uid() = user_id);
