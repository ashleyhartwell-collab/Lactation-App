// log-checkin — Latched companion layer: record daily mood check-in.
//
// POST { user_id: string, mood: 'struggling'|'hanging_in'|'good_day'|'small_win', notes?: string }
//   -> {
//        checkin: { id, checkin_date, mood, notes },
//        follow_up: string | null    // contextual follow-up message based on mood
//      }
//   OR { error: string }
//
// Enforces one check-in per user per calendar day (DB UNIQUE constraint).
// If a check-in already exists for today, returns it without error (idempotent).
// When mood = 'struggling', also checks for a pending AG item to surface.

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

// ─── Follow-up messages ───────────────────────────────────────────────────────
// Shown beneath the check-in card after the user taps a mood.

const FOLLOW_UP: Record<string, string> = {
  struggling:  "That's a hard day. You don't have to have it figured out. I'm here if you want to talk through anything.",
  hanging_in:  "Hanging in is enough. One feed at a time.",
  good_day:    "Love a good day. Remember this one.",
  small_win:   "Yes. Tell me about it — what was the win?",
};

const VALID_MOODS = new Set(['struggling', 'hanging_in', 'good_day', 'small_win']);

// ─── Handler ──────────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: { user_id?: string; mood?: string; notes?: string } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { user_id, mood, notes } = body;
  if (!user_id) return json({ error: 'user_id is required' }, 400);
  if (!mood)    return json({ error: 'mood is required' }, 400);
  if (!VALID_MOODS.has(mood)) {
    return json({ error: `mood must be one of: ${[...VALID_MOODS].join(', ')}` }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // Upsert: if today's check-in already exists, update mood/notes; otherwise insert.
  // The UNIQUE(user_id, checkin_date) constraint is the source of truth.
  const { data: checkin, error } = await supabase
    .from('daily_checkins')
    .upsert(
      { user_id, checkin_date: today, mood, notes: notes ?? null },
      { onConflict: 'user_id,checkin_date' },
    )
    .select('id, checkin_date, mood, notes')
    .single();

  if (error) {
    console.error('log-checkin upsert error:', error.message);
    return json({ error: 'Failed to save check-in' }, 500);
  }

  const followUp = FOLLOW_UP[mood] ?? null;

  // When struggling: surface a pending AG item if one exists (companion layer hook).
  // The client decides whether to show the AG card alongside or after the follow-up.
  let pendingAgTrigger: string | null = null;
  if (mood === 'struggling') {
    const { data: pending } = await supabase
      .from('pending_companion_items')
      .select('trigger_id')
      .eq('user_id', user_id)
      .eq('feature', 'AG')
      .is('shown_at', null)
      .is('dismissed_at', null)
      .limit(1)
      .single();

    if (pending) {
      pendingAgTrigger = pending.trigger_id;
    }
  }

  return json({
    checkin,
    follow_up:          followUp,
    pending_ag_trigger: pendingAgTrigger, // non-null → client should call get-companion-item?feature=AG
  });
});
