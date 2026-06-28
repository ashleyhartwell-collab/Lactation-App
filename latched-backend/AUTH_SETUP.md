# Auth setup (Supabase magic link)

Latched authenticates users with **Supabase Auth + magic link (email OTP)**.
Everything is wired in code; there's one manual step in the Supabase
dashboard once you have the Lovable app URL.

## What's in the repo

- `supabase/migrations/00004_user_profiles.sql` — `user_profiles` table
  (1:1 with `auth.users`), RLS policies, `updated_at` trigger, and a
  `weeks_postpartum(date)` helper.
- `supabase/functions/upsert-profile/` — POST endpoint that validates the
  user JWT and creates/updates the caller's profile.
- `supabase/functions/get-profile/` — GET endpoint that returns the caller's
  profile (or `{ profile: null }` if onboarding isn't done).
- `tests/auth.test.js` — smoke test confirming both endpoints reject
  unauthenticated requests with 401.

## One-time dashboard step

Magic link is enabled by default — there's no toggle to flip. The single
thing you need to do manually is set the **Site URL** so the magic-link
emails redirect back to your app.

1. Go to your project in the Supabase dashboard.
2. **Authentication → URL Configuration**.
3. Set **Site URL** to your Lovable app URL, e.g. `https://latched.lovable.app`.
4. Add the same URL (and any additional environments — staging, preview, etc.)
   to **Redirect URLs**.
5. Save.

That's it. Until Site URL is set, magic-link emails will redirect to
`http://localhost:3000` (or whatever the default is) and the login flow
will break in production.

## Email provider

Supabase ships a built-in SMTP for dev, but it's rate-limited (a few
emails per hour). Before any real user testing, configure a transactional
provider under **Authentication → Email Templates → SMTP Settings**
(Resend, Postmark, SendGrid, etc.). The magic-link template itself works
out of the box; you only need to swap the SMTP credentials.

## Deploy

```bash
# from latched-backend/
supabase db push                       # applies 00004_user_profiles.sql
npm run functions:deploy:all           # deploys all three Edge Functions
```

`OPENAI_API_KEY` is already set as a project secret for `semantic-search`.
The new auth functions only need `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and
`SUPABASE_SERVICE_ROLE_KEY`, which Supabase injects automatically — no new
secrets required.

## Client flow (Lovable / mobile)

1. User enters email → call `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: <site_url> } })`.
2. User clicks the magic link in their email → Supabase redirects them back
   to your Site URL with a session in the URL fragment; the Supabase client
   picks it up automatically.
3. After login, `supabase.auth.getSession()` returns the user's JWT.
4. Pass that JWT in `Authorization: Bearer <jwt>` to:
   - `POST /functions/v1/upsert-profile` to finish onboarding.
   - `GET /functions/v1/get-profile` to load the profile on app open.

## Smoke test

```bash
SUPABASE_URL=https://<ref>.supabase.co \
SUPABASE_ANON_KEY=<anon-key> \
npm run test:auth
```

The smoke test only verifies the unauthenticated paths return 401. Testing
the full magic-link round-trip needs real email delivery, so it's left as
a manual QA step.
