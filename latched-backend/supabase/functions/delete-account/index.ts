// Latched — delete-account Edge Function
//
// DELETE (no body required)
//   Authorization: Bearer <supabase_jwt>
//   -> { success: true }
//
// Permanently deletes the caller's account. Required for App Store compliance
// (Apple mandate: apps with account creation must offer in-app deletion).
//
// Deletion order (privacy-first):
//  1. Validate JWT — identify the user.
//  2. Nullify user_id in query_log and unmatched_questions — removes PII
//     linkage while preserving anonymised analytics data for threshold tuning.
//     These are text columns (no FK), so they don't cascade automatically.
//  3. Delete the user from auth.users via the admin API — cascades to:
//       • user_profiles  (ON DELETE CASCADE)
//       • chat_messages  (ON DELETE CASCADE)
//
// Returns 401 if JWT is missing or invalid.
// Returns 500 if the auth deletion fails.
// Idempotent: calling twice is safe (second call gets "user not found" from
// the admin API, which we treat as success).

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'DELETE, POST, OPTIONS',
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
  if (!['DELETE', 'POST'].includes(req.method)) return json({ error: 'Method not allowed' }, 405);

  // Step 1: Validate JWT — confirms the caller owns this account.
  const authHeader = req.headers.get('Authorization') ?? '';
  const jwt = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return json({ error: 'Missing Authorization header' }, 401);

  const anonClient = createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false },
  });
  const { data: { user }, error: authError } = await anonClient.auth.getUser(jwt);
  if (authError || !user) return json({ error: 'Invalid or expired token' }, 401);

  const userId = user.id;
  const serviceClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // Step 2: Nullify user_id in analytics tables (privacy-first, before deletion).
  // Failures here are logged but don't abort — the analytics rows become
  // anonymous, which is the desired outcome regardless.
  const [qlResult, umResult] = await Promise.allSettled([
    serviceClient
      .from('query_log')
      .update({ user_id: null })
      .eq('user_id', userId),
    serviceClient
      .from('unmatched_questions')
      .update({ user_id: null })
      .eq('user_id', userId),
  ]);

  if (qlResult.status === 'rejected') {
    console.error('query_log nullification failed:', qlResult.reason);
  } else if (qlResult.value.error) {
    console.error('query_log nullification error:', qlResult.value.error);
  }

  if (umResult.status === 'rejected') {
    console.error('unmatched_questions nullification failed:', umResult.reason);
  } else if (umResult.value.error) {
    console.error('unmatched_questions nullification error:', umResult.value.error);
  }

  // Step 3: Delete from auth.users — cascades to user_profiles and chat_messages.
  const { error: deleteError } = await serviceClient.auth.admin.deleteUser(userId);

  if (deleteError) {
    // "User not found" means the account was already deleted — treat as success.
    if (deleteError.message?.toLowerCase().includes('not found')) {
      return json({ success: true });
    }
    console.error('auth.admin.deleteUser failed:', deleteError);
    return json({ error: 'Failed to delete account. Please try again.' }, 500);
  }

  return json({ success: true });
});
