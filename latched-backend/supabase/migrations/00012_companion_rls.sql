-- Migration 00012: Row Level Security policies for companion layer tables.
--
-- Tables and their access pattern:
--   companion_triggers        — public read (seeded, no PII, safe to expose)
--   companion_content         — public read (same reason)
--   pending_companion_items   — user reads/writes own rows only
--   companion_signals         — user reads/writes own rows only
--   daily_checkins            — user reads/writes own rows only
--
-- Service role (edge functions running with SUPABASE_SERVICE_ROLE_KEY)
-- bypasses RLS automatically — no service-role policies are needed here.

SET search_path TO extensions, public, pg_catalog;


-- ─── companion_triggers ────────────────────────────────────────────────────────

ALTER TABLE public.companion_triggers ENABLE ROW LEVEL SECURITY;

-- Public read — no PII, static seed data
CREATE POLICY "companion_triggers_public_read"
  ON public.companion_triggers
  FOR SELECT
  USING (true);


-- ─── companion_content ─────────────────────────────────────────────────────────

ALTER TABLE public.companion_content ENABLE ROW LEVEL SECURITY;

-- Public read — no PII, static seed data
CREATE POLICY "companion_content_public_read"
  ON public.companion_content
  FOR SELECT
  USING (true);


-- ─── pending_companion_items ───────────────────────────────────────────────────

ALTER TABLE public.pending_companion_items ENABLE ROW LEVEL SECURITY;

-- Users can read their own pending items (React client fetches on app open)
CREATE POLICY "pending_items_user_select"
  ON public.pending_companion_items
  FOR SELECT
  USING (auth.uid() = user_id);

-- React client writes dismiss/shown timestamps directly
CREATE POLICY "pending_items_user_update"
  ON public.pending_companion_items
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- INSERT is handled by the evaluate-companion-triggers edge function
-- (service role) — no INSERT policy needed for authenticated users.
-- If you want to allow the client to insert (e.g., manual test item),
-- add a policy here.


-- ─── companion_signals ─────────────────────────────────────────────────────────

ALTER TABLE public.companion_signals ENABLE ROW LEVEL SECURITY;

-- Users can read their own signals (useful for debugging / "why did I get this?")
CREATE POLICY "companion_signals_user_select"
  ON public.companion_signals
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own signals (client-side signal writes, if ever needed)
-- Primary writes come from semantic-search edge function (service role).
CREATE POLICY "companion_signals_user_insert"
  ON public.companion_signals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);


-- ─── daily_checkins ────────────────────────────────────────────────────────────

ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;

-- Users can read their own check-in history (used in Your Journey tab)
CREATE POLICY "daily_checkins_user_select"
  ON public.daily_checkins
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert today's check-in (enforced once-per-day by UNIQUE constraint)
CREATE POLICY "daily_checkins_user_insert"
  ON public.daily_checkins
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update today's check-in (e.g., correct a mis-tap)
-- Locked to own rows only; edge function validates checkin_date = current_date
CREATE POLICY "daily_checkins_user_update"
  ON public.daily_checkins
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
