-- Migration 00010: feeding sessions tracker table.
-- Stores individual nurse/pump/bottle sessions per user.
-- Accessed directly from the frontend via Supabase JS client with RLS.

SET search_path TO extensions, public, pg_catalog;

CREATE TABLE IF NOT EXISTS public.feeding_sessions (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type    text        NOT NULL CHECK (session_type IN ('nurse', 'pump', 'bottle')),
  started_at      timestamptz NOT NULL DEFAULT now(),
  ended_at        timestamptz,
  duration_minutes int        GENERATED ALWAYS AS (
    CASE
      WHEN ended_at IS NOT NULL
      THEN GREATEST(0, EXTRACT(EPOCH FROM (ended_at - started_at)) / 60)::int
      ELSE NULL
    END
  ) STORED,
  breast_side     text        CHECK (breast_side IN ('left', 'right', 'both')),
  amount_oz       numeric(5,2),
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.feeding_sessions IS
  'One row per logged feeding or pumping session. Written directly by the frontend Supabase client.';

-- Index for fast per-user queries ordered by time
CREATE INDEX feeding_sessions_user_time
  ON public.feeding_sessions (user_id, started_at DESC);

-- Row Level Security
ALTER TABLE public.feeding_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can read own sessions"
  ON public.feeding_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users can insert own sessions"
  ON public.feeding_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users can update own sessions"
  ON public.feeding_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "users can delete own sessions"
  ON public.feeding_sessions FOR DELETE
  USING (auth.uid() = user_id);
