// send-otp — Latched pre-launch gate: check allowlist then send magic link.
//
// POST { email: string }
//   -> { ok: true }
//   OR { error: string, code: 'not_allowed' | 'invalid_email' | 'send_failed' }
//
// Checks public.test_allowlist before triggering the Supabase OTP send.
// The DB-level auth hook (check_signup_allowlist) is the hard enforcement;
// this function gives the frontend a clean error before Supabase auth runs.
//
// At launch: remove the allowlist check block (lines marked REMOVE AT LAUNCH)
// and deploy. No other changes needed — the DB hook can stay until cleaned up.

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL      = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANON_KEY          = Deno.env.get('SUPABASE_ANON_KEY')!;

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed', code: 'method_not_allowed' }, 405);

  let body: { email?: string } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body', code: 'invalid_email' }, 400);
  }

  const email = (body.email ?? '').toLowerCase().trim();
  if (!email || !email.includes('@')) {
    return json({ error: 'A valid email is required.', code: 'invalid_email' }, 400);
  }

  // ── REMOVE AT LAUNCH (start) ─────────────────────────────────────────────────
  // Pre-launch allowlist gate. The DB hook is the hard enforcement;
  // this gives the frontend a clean 403 before the OTP is even attempted.
  const serviceClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data: allowed } = await serviceClient
    .from('test_allowlist')
    .select('email')
    .eq('email', email)
    .maybeSingle();

  if (!allowed) {
    return json(
      {
        error: 'This email is not on the early access list. Join the waitlist at trylatch.com.',
        code: 'not_allowed',
      },
      403,
    );
  }
  // ── REMOVE AT LAUNCH (end) ───────────────────────────────────────────────────

  // Send the magic link via the anon client (uses Supabase's own email delivery).
  const anonClient = createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false },
  });

  const { error: otpError } = await anonClient.auth.signInWithOtp({
    email,
    options: {
      // Redirect back to the app after the user clicks the magic link.
      emailRedirectTo: `${req.headers.get('origin') ?? 'https://trylatch.com'}/auth/callback`,
    },
  });

  if (otpError) {
    console.error('send-otp: signInWithOtp error:', otpError.message);
    return json({ error: 'Failed to send login link. Please try again.', code: 'send_failed' }, 500);
  }

  return json({ ok: true });
});
