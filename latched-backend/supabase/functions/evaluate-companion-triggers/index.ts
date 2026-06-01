// evaluate-companion-triggers — Latched companion layer trigger evaluator.
//
// POST { user_id: string }
//   -> { queued: number }    (count of new items written to pending_companion_items)
//   OR { error: string }
//
// Called:
//   - On app open from the React client (debounced to once per 30 min per user).
//   - Via pg_cron every 6 hours for all users (future; for now on-demand only).
//
// What it does:
//   1. Load user profile. Skip if companion_enabled = false or baby_dob missing.
//   2. Load all non-held triggers not yet queued for this user.
//   3. For each trigger, evaluate based on trigger_type:
//        time_based      — baby age (days) falls within [dob_offset_min, dob_offset_max]
//        profile_based   — profile_conditions JSONB matches user profile
//        chat_signal     — companion_signals table has an unprocessed matching signal
//        goal_comparison — baby age >= (feeding_goal_days + goal_threshold_days)
//        event_based     — handled upstream via chat signals or profile conditions
//   4. Insert qualifying triggers into pending_companion_items (ON CONFLICT DO NOTHING).
//   5. Mark processed companion_signals as processed_at = now().
//
// Path mapping (feeding_preference → companion path):
//   breastfeeding    → A
//   exclusive_pumping→ B
//   combo            → C
//   formula / null   → no companion items

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL      = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

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

// ─── Path resolution ──────────────────────────────────────────────────────────

type FeedingPath = 'A' | 'B' | 'C' | null;

function resolvePath(feedingPreference: string | null): FeedingPath {
  switch (feedingPreference) {
    case 'breastfeeding':     return 'A';
    case 'exclusive_pumping': return 'B';
    case 'combo':             return 'C';
    default:                  return null; // formula or unset = no companion items
  }
}

// ─── Day calculation ──────────────────────────────────────────────────────────

function daysBetween(from: string | Date, to: Date = new Date()): number {
  const d = typeof from === 'string' ? new Date(from) : from;
  return Math.floor((to.getTime() - d.getTime()) / 86_400_000);
}

// ─── Profile conditions evaluator ────────────────────────────────────────────

interface ProfileConditions {
  feeding_preference?:     string;
  breast_anatomy_contains?: string[];
  pump_model_set?:         boolean;
  dob_offset_min?:         number;
  dob_offset_max?:         number;
}

interface UserProfile {
  baby_dob:           string;
  feeding_preference: string | null;
  breast_anatomy:     Array<{ condition: string }> | null;
  pump_models:        string[] | null;
  feeding_goal_days:  number | null;
  companion_enabled:  boolean;
}

function evalProfileConditions(
  conditions: ProfileConditions,
  profile: UserProfile,
  babyAgeDays: number,
): boolean {
  if (conditions.feeding_preference !== undefined) {
    if (profile.feeding_preference !== conditions.feeding_preference) return false;
  }
  if (conditions.breast_anatomy_contains !== undefined) {
    const anatomy = (profile.breast_anatomy ?? []).map((a) => a.condition);
    const hasAny = conditions.breast_anatomy_contains.some((c) => anatomy.includes(c));
    if (!hasAny) return false;
  }
  if (conditions.pump_model_set === true) {
    if (!profile.pump_models || profile.pump_models.length === 0) return false;
  }
  if (conditions.dob_offset_min !== undefined && babyAgeDays < conditions.dob_offset_min) return false;
  if (conditions.dob_offset_max !== undefined && babyAgeDays > conditions.dob_offset_max) return false;
  return true;
}

// ─── Trigger evaluator ────────────────────────────────────────────────────────

interface Trigger {
  id:                   string;
  feature:              string;
  trigger_type:         string;
  paths:                string[] | null;
  dob_offset_min:       number | null;
  dob_offset_max:       number | null;
  profile_conditions:   ProfileConditions | null;
  chat_signal_keywords: string[] | null;
  goal_threshold_days:  number | null;
  priority:             number;
}

function isTriggerQualified(
  trigger: Trigger,
  profile: UserProfile,
  feedingPath: FeedingPath,
  babyAgeDays: number,
  signalKeys: Set<string>,
): boolean {
  // Path restriction check
  if (trigger.paths !== null && feedingPath !== null) {
    if (!trigger.paths.includes(feedingPath)) return false;
  }
  // No companion items for formula/unset users
  if (feedingPath === null && trigger.paths !== null) return false;

  switch (trigger.trigger_type) {
    case 'time_based': {
      const min = trigger.dob_offset_min ?? 0;
      const max = trigger.dob_offset_max ?? Infinity;
      return babyAgeDays >= min && babyAgeDays <= max;
    }

    case 'profile_based': {
      if (!trigger.profile_conditions) return false;
      return evalProfileConditions(trigger.profile_conditions, profile, babyAgeDays);
    }

    case 'chat_signal': {
      // Trigger fires if any of its keywords overlap with unprocessed companion_signals
      // Signal matching is coarse at the trigger level — the companion_signals.signal_key
      // is set by detectCompanionSignals in semantic-search using the SIGNAL_MAP there.
      // Here we check if any signal_key semantically relates to this trigger's keywords.
      // Mapping is handled by checking if the trigger id's known signal exists.
      // For flexibility, we also do a keyword overlap against signal_key values.
      if (!trigger.chat_signal_keywords) return false;
      for (const sigKey of signalKeys) {
        const sigWords = sigKey.toLowerCase().split('_');
        const kwMatch = trigger.chat_signal_keywords.some((kw) =>
          sigWords.some((w) => kw.toLowerCase().includes(w))
        );
        if (kwMatch) return true;
      }
      return false;
    }

    case 'goal_comparison': {
      const goalDays = profile.feeding_goal_days;
      if (!goalDays || goalDays >= 9999) return false; // unsure/as_long_as_works: skip
      const threshold = trigger.goal_threshold_days ?? 0;
      return babyAgeDays >= goalDays + threshold;
    }

    case 'event_based':
    case 'manual':
      // event_based triggers are fired externally (not by this evaluator)
      return false;

    default:
      return false;
  }
}

// ─── Main evaluation function ─────────────────────────────────────────────────

async function evaluateForUser(
  userId: string,
  supabase: SupabaseClient,
): Promise<{ queued: number; processedSignals: string[] }> {
  // 1. Load profile
  const { data: profile, error: profileErr } = await supabase
    .from('user_profiles')
    .select('baby_dob, feeding_preference, breast_anatomy, pump_models, feeding_goal_days, companion_enabled')
    .eq('id', userId)
    .single();

  if (profileErr || !profile) return { queued: 0, processedSignals: [] };
  if (!profile.companion_enabled || !profile.baby_dob) return { queued: 0, processedSignals: [] };

  const babyAgeDays  = daysBetween(profile.baby_dob);
  const feedingPath  = resolvePath(profile.feeding_preference);

  // 2. Load unprocessed companion signals for this user
  const { data: signals } = await supabase
    .from('companion_signals')
    .select('id, signal_key')
    .eq('user_id', userId)
    .is('processed_at', null);

  const signalKeys     = new Set<string>((signals ?? []).map((s: { signal_key: string }) => s.signal_key));
  const signalIds      = (signals ?? []).map((s: { id: string }) => s.id);

  // 3. Load triggers not yet queued for this user (non-held)
  const { data: already } = await supabase
    .from('pending_companion_items')
    .select('trigger_id')
    .eq('user_id', userId);

  const alreadyQueued = new Set<string>((already ?? []).map((r: { trigger_id: string }) => r.trigger_id));

  const { data: triggers, error: trigErr } = await supabase
    .from('companion_triggers')
    .select('id, feature, trigger_type, paths, dob_offset_min, dob_offset_max, profile_conditions, chat_signal_keywords, goal_threshold_days, priority')
    .eq('held', false);

  if (trigErr || !triggers) return { queued: 0, processedSignals: [] };

  const candidates = (triggers as Trigger[]).filter((t) => !alreadyQueued.has(t.id));

  // 4. Evaluate each candidate
  const toQueue = candidates.filter((t) =>
    isTriggerQualified(t, profile as UserProfile, feedingPath, babyAgeDays, signalKeys)
  );

  if (toQueue.length === 0) {
    // Still mark signals processed even if no new items queued
    if (signalIds.length > 0) {
      await supabase
        .from('companion_signals')
        .update({ processed_at: new Date().toISOString() })
        .in('id', signalIds);
    }
    return { queued: 0, processedSignals: signalIds };
  }

  // 5. Insert qualifying items (ON CONFLICT DO NOTHING)
  const rows = toQueue.map((t) => ({
    user_id:    userId,
    trigger_id: t.id,
    feature:    t.feature,
  }));

  const { error: insertErr } = await supabase
    .from('pending_companion_items')
    .upsert(rows, { onConflict: 'user_id,trigger_id', ignoreDuplicates: true });

  if (insertErr) {
    console.error('evaluate-companion-triggers: insert error', insertErr.message);
  }

  // 6. Mark companion_signals as processed
  if (signalIds.length > 0) {
    await supabase
      .from('companion_signals')
      .update({ processed_at: new Date().toISOString() })
      .in('id', signalIds);
  }

  return { queued: toQueue.length, processedSignals: signalIds };
}

// ─── Handler ──────────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let body: { user_id?: string } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { user_id } = body;
  if (!user_id) return json({ error: 'user_id is required' }, 400);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  try {
    const result = await evaluateForUser(user_id, supabase);
    return json({ queued: result.queued });
  } catch (err) {
    console.error('evaluate-companion-triggers error:', err);
    return json({ error: 'Internal error' }, 500);
  }
});
