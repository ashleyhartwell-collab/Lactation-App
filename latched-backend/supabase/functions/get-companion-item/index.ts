// get-companion-item — Latched companion layer: fetch next item for user.
//
// POST { user_id: string, feature?: 'AG' | 'ML' | null }
//   -> {
//        item: {
//          pending_id:      string,    // pending_companion_items.id
//          trigger_id:      string,    // e.g. 'AG-008'
//          feature:         'AG'|'ML',
//          headline:        string,
//          in_app_message:  string,    // path-variant resolved
//          learn_more?:     string,    // AG only
//          escalation_text?:string,    // AG only
//          share_card?:     string,    // ML only
//        } | null
//      }
//
// Returns the single highest-priority unshown item.
// If feature is specified, only returns items of that type.
// Marks the item as shown_at = now() so it won't be returned again.
// [GOAL] tokens in in_app_message and share_card are interpolated from user's
// feeding_goal column before returning.
//
// Path-variant resolution:
//   If in_app_message_path_b / _path_c is non-null and user is on that path,
//   use the variant instead of the default in_app_message.

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

// ─── Goal label interpolation ─────────────────────────────────────────────────

const GOAL_LABELS: Record<string, string> = {
  '6_weeks':          '6 weeks',
  '3_months':         '3 months',
  '6_months':         '6 months',
  'as_long_as_works': 'as long as it works',
  'unsure':           'your goal',
};

function interpolateGoal(text: string, feedingGoal: string | null): string {
  const label = GOAL_LABELS[feedingGoal ?? ''] ?? 'your goal';
  return text.replace(/\[GOAL\]/g, label);
}

// ─── Path resolution ──────────────────────────────────────────────────────────

function resolveMessage(
  content: {
    in_app_message:      string;
    in_app_message_path_b: string | null;
    in_app_message_path_c: string | null;
  },
  feedingPreference: string | null,
): string {
  if (feedingPreference === 'exclusive_pumping' && content.in_app_message_path_b) {
    return content.in_app_message_path_b;
  }
  if (feedingPreference === 'combo' && content.in_app_message_path_c) {
    return content.in_app_message_path_c;
  }
  return content.in_app_message;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: { user_id?: string; feature?: string } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { user_id, feature } = body;
  if (!user_id) return json({ error: 'user_id is required' }, 400);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // 1. Load user's feeding_preference and feeding_goal for interpolation
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('feeding_preference, feeding_goal')
    .eq('id', user_id)
    .single();

  // 2. Fetch highest-priority unshown item
  //    Join companion_triggers (for priority) + companion_content (for copy)
  let query = supabase
    .from('pending_companion_items')
    .select(`
      id,
      trigger_id,
      feature,
      companion_triggers!inner ( priority ),
      companion_content!inner (
        headline,
        in_app_message,
        learn_more,
        escalation_text,
        share_card,
        in_app_message_path_b,
        in_app_message_path_c
      )
    `)
    .eq('user_id', user_id)
    .is('shown_at', null)
    .is('dismissed_at', null)
    .order('companion_triggers(priority)', { ascending: true })
    .limit(1);

  if (feature) {
    query = query.eq('feature', feature);
  }

  const { data: items, error } = await query;

  if (error) {
    console.error('get-companion-item query error:', error.message);
    return json({ error: 'Database error' }, 500);
  }

  if (!items || items.length === 0) {
    return json({ item: null });
  }

  const row = items[0] as {
    id: string;
    trigger_id: string;
    feature: string;
    companion_content: {
      headline: string;
      in_app_message: string;
      learn_more: string | null;
      escalation_text: string | null;
      share_card: string | null;
      in_app_message_path_b: string | null;
      in_app_message_path_c: string | null;
    };
  };

  const content = row.companion_content;
  const feedingPref = profile?.feeding_preference ?? null;
  const feedingGoal = profile?.feeding_goal ?? null;

  // 3. Resolve path variant + interpolate [GOAL] tokens
  const resolvedMessage = interpolateGoal(
    resolveMessage(content, feedingPref),
    feedingGoal,
  );
  const resolvedShareCard = content.share_card
    ? interpolateGoal(content.share_card, feedingGoal)
    : null;

  // 4. Mark as shown
  await supabase
    .from('pending_companion_items')
    .update({ shown_at: new Date().toISOString() })
    .eq('id', row.id);

  // 5. Build response
  const item: Record<string, unknown> = {
    pending_id:     row.id,
    trigger_id:     row.trigger_id,
    feature:        row.feature,
    headline:       content.headline,
    in_app_message: resolvedMessage,
  };

  if (content.learn_more)     item.learn_more     = content.learn_more;
  if (content.escalation_text) item.escalation_text = content.escalation_text;
  if (resolvedShareCard)       item.share_card      = resolvedShareCard;

  return json({ item });
});
