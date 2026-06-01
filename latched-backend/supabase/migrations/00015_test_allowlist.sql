-- 00015_test_allowlist.sql
-- Pre-launch: restrict new account creation to known test users.
--
-- Creates:
--   1. public.test_allowlist — email allowlist table (service-role only)
--   2. public.check_signup_allowlist — Postgres auth hook function that blocks
--      new signups whose email is not in the allowlist.
--
-- After pushing this migration you must register the hook in the Supabase
-- dashboard (one-time manual step — cannot be done via SQL):
--   Authentication → Hooks → "Before User Created" → select check_signup_allowlist
--
-- To add a tester:
--   INSERT INTO public.test_allowlist (email, added_by)
--   VALUES ('tester@example.com', 'admin')
--   ON CONFLICT (email) DO NOTHING;
--
-- To disable at launch: drop the hook in the dashboard, then run:
--   DROP FUNCTION IF EXISTS public.check_signup_allowlist(jsonb);
--   DROP TABLE IF EXISTS public.test_allowlist;

-- ─── 1. Allowlist table ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.test_allowlist (
  email      text        PRIMARY KEY,
  added_by   text,
  added_at   timestamptz NOT NULL DEFAULT now()
);

-- RLS enabled but no user-facing policies.
-- Only service role (bypasses RLS) and the hook function (SECURITY DEFINER) can read.
ALTER TABLE public.test_allowlist ENABLE ROW LEVEL SECURITY;

-- ─── 2. Auth hook function ────────────────────────────────────────────────────
-- Called by Supabase before any new user row is created in auth.users.
-- If the email is not in the allowlist, returns a 403 error object that
-- Supabase Auth surfaces as an error to the client — the user is never created.

CREATE OR REPLACE FUNCTION public.check_signup_allowlist(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  incoming_email text;
BEGIN
  incoming_email := lower(trim(event->>'email'));

  IF NOT EXISTS (
    SELECT 1 FROM public.test_allowlist WHERE email = incoming_email
  ) THEN
    RETURN jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 403,
        'message',   'This email is not on the early access list. Join the waitlist at trylatch.com.'
      )
    );
  END IF;

  -- Email is allowed — return the event unchanged to proceed with signup.
  RETURN event;
END;
$$;

-- Grant exactly what Supabase auth admin needs; revoke from everyone else.
GRANT EXECUTE ON FUNCTION public.check_signup_allowlist(jsonb) TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.check_signup_allowlist(jsonb) FROM PUBLIC, anon, authenticated;
