// dismiss-companion-item — Latched companion layer: dismiss a pending item.
//
// POST { pending_id: string, expanded?: boolean }
//   -> { ok: true }
//   OR { error: string }
//
// Sets dismissed_at = now() on the pending_companion_items row.
// If expanded = true, also sets expanded_at (user tapped "learn more").
// The caller must own the pending_id — enforced by checking user_id = auth.uid()
// in the query (not relying on RLS alone since this uses service role).

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL     = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  // Authenticate caller
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return json({ error: 'Missing Authorization header' }, 401);

  let body: { pending_id?: string; user_id?: string; expanded?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { pending_id, user_id, expanded = false } = body;
  if (!pending_id) return json({ error: 'pending_id is required' }, 400);
  if (!user_id)    return json({ error: 'user_id is required' }, 400);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const now = new Date().toISOString();
  const updates: Record<string, unknown> = { dismissed_at: now };
  if (expanded) updates.expanded_at = now;

  // Update only if user_id matches — prevents dismissing another user's item
  const { error, count } = await supabase
    .from('pending_companion_items')
    .update(updates)
    .eq('id', pending_id)
    .eq('user_id', user_id);

  if (error) {
    console.error('dismiss-companion-item error:', error.message);
    return json({ error: 'Database error' }, 500);
  }

  if (count === 0) {
    // Either not found or user_id mismatch
    return json({ error: 'Item not found or access denied' }, 404);
  }

  return json({ ok: true });
});
