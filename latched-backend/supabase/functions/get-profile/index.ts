// Latched — get-profile Edge Function
//
// GET (no body)
//   Authorization: Bearer <supabase_jwt>
//   -> { profile: { id, display_name, baby_dob, feeding_preference, weeks_postpartum, onboarding_complete } }
//      or { profile: null }  if profile row doesn't exist yet
//
// Returns 401 if the JWT is missing or invalid.

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  if (req.method !== 'GET') return json({ error: 'Method not allowed' }, 405);

  // Extract JWT from Authorization header
  const authHeader = req.headers.get('Authorization') ?? '';
  const jwt = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return json({ error: 'Missing Authorization header' }, 401);

  // Validate JWT
  const anonClient = createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false },
  });
  const { data: { user }, error: authError } = await anonClient.auth.getUser(jwt);
  if (authError || !user) return json({ error: 'Invalid or expired token' }, 401);

  const serviceClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data: profile, error } = await serviceClient
    .from('user_profiles')
    .select('id, display_name, baby_dob, feeding_preference, onboarding_complete')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('user_profiles fetch failed:', error);
    return json({ error: 'Failed to fetch profile' }, 500);
  }

  if (!profile) return json({ profile: null });

  // Calculate weeks_postpartum
  const { data: wpData } = await serviceClient
    .rpc('weeks_postpartum', { baby_dob: profile.baby_dob })
    .single();

  return json({
    profile: {
      ...profile,
      weeks_postpartum: (wpData as number | null) ?? 0,
    },
  });
});
