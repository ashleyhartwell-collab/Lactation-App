-- 00016_test_emails.sql
-- Seed the initial test user allowlist.
-- Add more rows here or run INSERT statements directly in the SQL editor.
-- ON CONFLICT DO NOTHING makes this safe to re-run.

INSERT INTO public.test_allowlist (email, added_by) VALUES
  ('ashley.m.barnes08@gmail.com', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Add additional testers below this line, e.g.:
-- ('tester2@example.com', 'admin'),
-- ('tester3@example.com', 'admin');
