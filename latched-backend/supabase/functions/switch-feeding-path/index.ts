// Latched — switch-feeding-path Edge Function
//
// POST { new_path }
//   Authorization: Bearer <supabase_jwt>
//   -> { profile: { id, display_name, baby_display_name, baby_dob, feeding_preference,
//                   feeding_goal, feeding_goal_days, breast_anatomy, pump_models,
//                   weeks_postpartum, onboarding_complete }, transitioned: boolean }
//
// new_path: one of 'breastfeeding' | 'exclusive_pumping' | 'combo' | 'formula'
//   (matches the CHECK constraint added in migration 00014).
//
// This function is the dedicated entry point for a deliberate feeding-path
// switch (the Path Change feature — see docs/product/path-transition-design.md
// and docs/product/path-change-phase2-data-layer.md). It exists separately
// from upsert-profile for three reasons:
//   1. upsert-profile's unguarded feeding_preference overwrite is fine for
//      first-time onboarding, but gives a deliberate later switch no distinct
//      audit trail — a switch and an onboarding write look identical there.
//   2. This is the only place that should insert into path_transition_events,
//      so the audit/analytics side effect stays out of the general-purpose
//      profile upsert.
//   3. It reads the caller's *current* feeding_preference server-side rather
//      than trusting a client-supplied "old path", so the client can't spoof
//      what it's transitioning from.
//
// Behavior:
//   - Looks up the caller's current feeding_preference.
//   - If new_path === current value, no-ops (returns success, transitioned: false).
//     Not every "switch" request is a real switch, and a same-path call
//     shouldn't generate a phantom transition event.
//   - Otherwise, updates user_profiles.feeding_preference AND inserts one row
//     into path_transition_events, using the coarse, anonymized shape defined
//     in migration 00023 (no user_id, no exact date — see that migration's
//     comment header for the full rationale).
//
// This function deliberately does NOT touch guide-completion state. There is
// no server-side guide/module completion table anywhere in this schema —
// AppContext.moduleProgress is client-only state — so per the locked product
// decision that completion persists in full across a switch, there is nothing
// for this function to do on that front. See docs/product/
// path-change-phase2-data-layer.md, "Open items — resolved 2026-07-08", item 1.
//
// Returns 401 if the JWT is missing or invalid.
// Returns 400 if new_path is missing or not a recognised value.
// Returns 404 if the caller has no existing user_profiles row (onboarding not
//   yet complete — use upsert-profile for the initial path selection instead).

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

// Kept in sync with migration 00014's CHECK constraint and upsert-profile's
// VALID_FEEDING_PREFERENCES. If this set ever changes, update both places.
const VALID_FEEDING_PREFERENCES = new Set([
  'breastfeeding',
  'exclusive_pumping',
  'combo',
  'formula',
]);

interface SwitchBody {
  new_path?: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const authHeader = req.headers.get('Authorization') ?? '';
  const jwt = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return json({ error: 'Missing Authorization header' }, 401);

  const anonClient = createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false },
  });
  const { data: { user }, error: authError } = await anonClient.auth.getUser(jwt);
  if (authError || !user) return json({ error: 'Invalid or expired token' }, 401);

  let body: SwitchBody;
  try {
    body = (await req.json()) as SwitchBody;
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { new_path } = body;
  if (!new_path) return json({ error: 'new_path is required' }, 400);
  if (!VALID_FEEDING_PREFERENCES.has(new_path)) {
    return json(
      { error: `new_path must be one of: ${[...VALID_FEEDING_PREFERENCES].join(', ')}` },
      400,
    );
  }

  const serviceClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // Read the caller's current path server-side — never trust a client-supplied
  // "old path", so a switch can't be spoofed or logged incorrectly.
  const { data: currentProfile, error: fetchError } = await serviceClient
    .from('user_profiles')
    .select('feeding_preference, baby_dob')
    .eq('id', user.id)
    .single();

  if (fetchError || !currentProfile) {
    return json({ error: 'No existing profile found for this user. Use upsert-profile to complete onboarding first.' }, 404);
  }

  const currentPath = currentProfile.feeding_preference as string;

  // Same-path call: no-op. Not every "switch" request is a real switch, and a
  // same-path call shouldn't generate a phantom transition event.
  if (currentPath === new_path) {
    const { data: profile } = await serviceClient
      .from('user_profiles')
      .select('id, display_name, baby_display_name, baby_dob, feeding_preference, feeding_goal, feeding_goal_days, breast_anatomy, pump_models, onboarding_complete')
      .eq('id', user.id)
      .single();

    const { data: wpData } = await serviceClient
      .rpc('weeks_postpartum', { baby_dob: currentProfile.baby_dob })
      .single();

    return json({
      profile: { ...profile, weeks_postpartum: (wpData as number | null) ?? 0 },
      transitioned: false,
    });
  }

  // Compute the coarse postpartum-week bucket for the (anonymized) transition
  // event, using the same weeks_postpartum() helper the rest of the app uses.
  const { data: weeksData } = await serviceClient
    .rpc('weeks_postpartum', { baby_dob: currentProfile.baby_dob })
    .single();
  const weeks = (weeksData as number | null) ?? 0;

  const { data: bucketData } = await serviceClient
    .rpc('postpartum_week_bucket', { weeks })
    .single();
  const bucket = (bucketData as string | null) ?? '52+';

  // Update feeding_preference and log the anonymized transition event.
  // Not wrapped in an explicit multi-statement transaction block since Supabase's
  // JS client doesn't expose one directly for Edge Functions; if either step is
  // added to a future refactor with true multi-statement transactions (e.g. via
  // a Postgres function), preserve the "update then log" order so a failed log
  // insert can't silently block the actual path switch.
  const { data: profile, error: updateError } = await serviceClient
    .from('user_profiles')
    .update({ feeding_preference: new_path })
    .eq('id', user.id)
    .select('id, display_name, baby_display_name, baby_dob, feeding_preference, feeding_goal, feeding_goal_days, breast_anatomy, pump_models, onboarding_complete')
    .single();

  if (updateError) {
    console.error('user_profiles path switch failed:', updateError);
    return json({ error: 'Failed to switch feeding path' }, 500);
  }

  const { error: eventError } = await serviceClient
    .from('path_transition_events')
    .insert({
      from_path: currentPath,
      to_path: new_path,
      postpartum_week_bucket: bucket,
    });

  if (eventError) {
    // The path switch itself already succeeded and is the user-facing outcome
    // that matters most. Log the analytics failure but don't fail the request
    // over it — an unlogged transition event is a minor analytics gap, not a
    // user-facing problem.
    console.error('path_transition_events insert failed (path switch still succeeded):', eventError);
  }

  return json({
    profile: { ...profile, weeks_postpartum: weeks },
    transitioned: true,
  });
});
