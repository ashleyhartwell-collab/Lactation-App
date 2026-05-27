-- Migration 00006: rate limiting support.
--
-- Adds an index on query_log(user_id, created_at) so the hourly count query
-- is fast, and a check_rate_limit RPC that the semantic-search Edge Function
-- calls at the top of each request.
--
-- Limit: 30 questions per user_id (or session_id fallback) per hour.

SET search_path TO extensions, public, pg_catalog;

-- Index to make the sliding-window count cheap.
CREATE INDEX IF NOT EXISTS query_log_user_created_idx
  ON public.query_log (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS query_log_session_created_idx
  ON public.query_log (session_id, created_at DESC);

-- ---------------------------------------------------------------------------
-- check_rate_limit: returns how many requests the caller has made in the last
-- hour, and whether they are currently over the limit.
--
-- Parameters:
--   p_user_id    — the authenticated user's UUID (pass NULL to fall back to session)
--   p_session_id — the client-generated session ID (always required)
--   p_limit      — max requests per hour (default 30)
--
-- Returns a single row: { request_count int, is_limited bool, retry_after_seconds int }
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_user_id    text,
  p_session_id text,
  p_limit      int DEFAULT 30
)
RETURNS TABLE (
  request_count       int,
  is_limited          bool,
  retry_after_seconds int
)
LANGUAGE plpgsql STABLE
AS $$
DECLARE
  v_count        int;
  v_oldest_ts    timestamptz;
  v_retry_after  int;
  v_window_start timestamptz := now() - interval '1 hour';
BEGIN
  IF p_user_id IS NOT NULL AND p_user_id != '' THEN
    -- Count by user_id (authenticated path)
    SELECT COUNT(*), MIN(created_at)
      INTO v_count, v_oldest_ts
      FROM public.query_log
     WHERE user_id = p_user_id
       AND created_at > v_window_start;
  ELSE
    -- Fall back to session_id (unauthenticated / missing user_id)
    SELECT COUNT(*), MIN(created_at)
      INTO v_count, v_oldest_ts
      FROM public.query_log
     WHERE session_id = p_session_id
       AND created_at > v_window_start;
  END IF;

  IF v_count >= p_limit THEN
    -- Seconds until the oldest request in the window falls off
    v_retry_after := GREATEST(1, EXTRACT(EPOCH FROM (v_oldest_ts + interval '1 hour' - now()))::int);
  ELSE
    v_retry_after := 0;
  END IF;

  RETURN QUERY SELECT v_count, (v_count >= p_limit), v_retry_after;
END;
$$;
