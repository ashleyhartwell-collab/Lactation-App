// Latched — upsert-profile Edge Function
//
// POST { display_name?, baby_dob, feeding_preference?, feeding_goal?, breast_anatomy?, pump_models? }
//   Authorization: Bearer <supabase_jwt>
//   -> { profile: { id, display_name, baby_dob, feeding_preference, feeding_goal,
//                   feeding_goal_days, breast_anatomy, pump_models,
//                   weeks_postpartum, onboarding_complete } }
//
// feeding_goal: optional enum — 6_weeks | 3_months | 6_months | as_long_as_works | unsure
//   Stored alongside feeding_goal_days (numeric day count) so the companion trigger
//   evaluator can run numeric comparisons. 'as_long_as_works' and 'unsure' store 9999
//   as a sentinel value; goal_comparison triggers skip rows where feeding_goal_days >= 9999.
//
// Creates or updates the caller's user_profile row. Sets onboarding_complete=true
// when both display_name and baby_dob are present.
//
// breast_anatomy: optional array of { condition, laterality } objects.
//   Valid conditions: flat_nipples | inverted_nipples | breast_implants |
//     breast_reduction | breast_augmentation | partial_mastectomy |
//     full_mastectomy | hypoplastic_breasts | previous_breast_surgery |
//     breast_radiation | nipple_piercing_history
//   Valid laterality: left | right | both
//   Pass an empty array [] to clear all conditions.
//   Omit the field entirely to leave existing conditions unchanged.
//
// pump_models: optional array of specific pump model strings.
//   Each element must be one of the values in VALID_PUMP_MODELS below.
//   Pass an empty array [] to clear all recorded pumps.
//   Omit the field entirely to leave existing pumps unchanged.
//   Multiple models are supported — it is common for moms to own more than one pump.
//
// Returns 401 if the JWT is missing or invalid.
// Returns 400 if baby_dob is missing or in the future.
// Returns 400 if breast_anatomy contains invalid condition or laterality values.
// Returns 400 if pump_models contains an unrecognised model string.

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

// Valid anatomy condition identifiers — kept in sync with the Lovable frontend
// and migration 00007 comment block.
const VALID_CONDITIONS = new Set([
  'flat_nipples',
  'inverted_nipples',
  'breast_implants',
  'breast_reduction',
  'breast_augmentation',
  'partial_mastectomy',
  'full_mastectomy',
  'hypoplastic_breasts',
  'previous_breast_surgery',
  'breast_radiation',
  'nipple_piercing_history',
]);

const VALID_LATERALITY = new Set(['left', 'right', 'both']);

// Valid feeding preference values — kept in sync with migration 00014 CHECK constraint.
// 'pumping' was renamed to 'exclusive_pumping' in migration 00014 (no real users existed).
const VALID_FEEDING_PREFERENCES = new Set([
  'breastfeeding',
  'exclusive_pumping',
  'combo',
  'formula',
]);

// Valid feeding goal values — kept in sync with migration 00011 CHECK constraint.
// feeding_goal_days is derived from feeding_goal and stored as a DB column so that
// the companion trigger evaluator can run numeric comparisons without a CASE statement.
const FEEDING_GOAL_DAYS: Record<string, number> = {
  '6_weeks':          42,
  '3_months':         91,
  '6_months':         182,
  'as_long_as_works': 9999, // sentinel: "no fixed end date"
  'unsure':           9999, // sentinel: goal_comparison triggers skip 9999
};
const VALID_FEEDING_GOALS = new Set(Object.keys(FEEDING_GOAL_DAYS));

// Valid pump model strings — kept in sync with migration 00009 comment block
// and the Lovable onboarding Screen 7 component.
const VALID_PUMP_MODELS = new Set([
  // Spectra
  'Spectra S1 Plus',
  'Spectra S2 Plus',
  'Spectra Synergy Gold',
  'Spectra Synergy Gold Portable',
  'Spectra 9 Plus',
  'Spectra CaraCups',
  // Medela
  'Medela Pump In Style Pro',
  'Medela Freestyle Hands-free',
  'Medela Solo',
  'Medela Swing Maxi',
  'Medela Symphony (Hospital-Grade)',
  'Medela Harmony (Manual)',
  // Elvie
  'Elvie Pump',
  'Elvie Stride',
  'Elvie Stride 2',
  'Elvie Curve (Manual)',
  // Willow
  'Willow 360',
  'Willow Go',
  'Willow Wave 2-in-1 (Manual)',
  // Momcozy
  'Momcozy M5',
  'Momcozy M9 Mobile Flow',
  'Momcozy M6 Mobile Style',
  'Momcozy S12 Pro',
  'Momcozy Air 1',
  // BabyBuddha
  'BabyBuddha 2.0',
  'BabyBuddha Wearable Breast Pump',
  'BabyBuddha Manual',
  // Catch-all
  'Other',
]);

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

interface AnatomyItem {
  condition: string;
  laterality: string;
}

interface UpsertBody {
  display_name?: string;
  baby_dob?: string;
  feeding_preference?: string;
  feeding_goal?: string;
  breast_anatomy?: AnatomyItem[];
  pump_models?: string[];
}

function validateBreastAnatomy(items: unknown): { valid: true; data: AnatomyItem[] } | { valid: false; error: string } {
  if (!Array.isArray(items)) {
    return { valid: false, error: 'breast_anatomy must be an array' };
  }
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (typeof item !== 'object' || item === null) {
      return { valid: false, error: `breast_anatomy[${i}] must be an object` };
    }
    const { condition, laterality } = item as Record<string, unknown>;
    if (typeof condition !== 'string' || !VALID_CONDITIONS.has(condition)) {
      return {
        valid: false,
        error: `breast_anatomy[${i}].condition "${condition}" is not a valid condition`,
      };
    }
    if (typeof laterality !== 'string' || !VALID_LATERALITY.has(laterality)) {
      return {
        valid: false,
        error: `breast_anatomy[${i}].laterality "${laterality}" must be "left", "right", or "both"`,
      };
    }
  }
  return { valid: true, data: items as AnatomyItem[] };
}

function validatePumpModels(items: unknown): { valid: true; data: string[] } | { valid: false; error: string } {
  if (!Array.isArray(items)) {
    return { valid: false, error: 'pump_models must be an array' };
  }
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (typeof item !== 'string') {
      return { valid: false, error: `pump_models[${i}] must be a string` };
    }
    if (!VALID_PUMP_MODELS.has(item)) {
      return { valid: false, error: `pump_models[${i}] "${item}" is not a recognised pump model` };
    }
  }
  return { valid: true, data: items as string[] };
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  // Extract JWT from Authorization header
  const authHeader = req.headers.get('Authorization') ?? '';
  const jwt = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return json({ error: 'Missing Authorization header' }, 401);

  // Validate JWT via anon client
  const anonClient = createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false },
  });
  const { data: { user }, error: authError } = await anonClient.auth.getUser(jwt);
  if (authError || !user) return json({ error: 'Invalid or expired token' }, 401);

  let body: UpsertBody;
  try {
    body = (await req.json()) as UpsertBody;
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { display_name, baby_dob, feeding_preference, feeding_goal, breast_anatomy, pump_models } = body;

  if (!baby_dob) return json({ error: 'baby_dob is required' }, 400);

  // Validate baby_dob is not in the future
  const dob = new Date(baby_dob);
  if (isNaN(dob.getTime())) return json({ error: 'baby_dob must be a valid date (YYYY-MM-DD)' }, 400);
  if (dob > new Date()) return json({ error: 'baby_dob cannot be in the future' }, 400);

  // Validate breast_anatomy if provided
  let validatedAnatomy: AnatomyItem[] | undefined;
  if (breast_anatomy !== undefined) {
    const result = validateBreastAnatomy(breast_anatomy);
    if (!result.valid) return json({ error: result.error }, 400);
    validatedAnatomy = result.data;
  }

  // Validate pump_models if provided
  let validatedPumpModels: string[] | undefined;
  if (pump_models !== undefined) {
    const result = validatePumpModels(pump_models);
    if (!result.valid) return json({ error: result.error }, 400);
    validatedPumpModels = result.data;
  }

  const onboarding_complete = Boolean(display_name && baby_dob);

  const serviceClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const upsertData: Record<string, unknown> = {
    id: user.id,
    baby_dob,
    onboarding_complete,
  };
  if (display_name !== undefined) upsertData.display_name = display_name;
  if (feeding_preference !== undefined) {
    if (!VALID_FEEDING_PREFERENCES.has(feeding_preference)) {
      return json(
        { error: `feeding_preference must be one of: ${[...VALID_FEEDING_PREFERENCES].join(', ')}` },
        400,
      );
    }
    upsertData.feeding_preference = feeding_preference;
  }
  if (validatedAnatomy !== undefined) upsertData.breast_anatomy = validatedAnatomy;
  if (validatedPumpModels !== undefined) upsertData.pump_models = validatedPumpModels;
  if (feeding_goal !== undefined) {
    if (!VALID_FEEDING_GOALS.has(feeding_goal)) {
      return json(
        { error: `feeding_goal must be one of: ${[...VALID_FEEDING_GOALS].join(', ')}` },
        400,
      );
    }
    upsertData.feeding_goal = feeding_goal;
    upsertData.feeding_goal_days = FEEDING_GOAL_DAYS[feeding_goal];
  }

  const { data: profile, error: upsertError } = await serviceClient
    .from('user_profiles')
    .upsert(upsertData, { onConflict: 'id' })
    .select('id, display_name, baby_dob, feeding_preference, feeding_goal, feeding_goal_days, breast_anatomy, pump_models, onboarding_complete')
    .single();

  if (upsertError) {
    console.error('user_profiles upsert failed:', upsertError);
    return json({ error: 'Failed to save profile' }, 500);
  }

  // Calculate weeks_postpartum via the SQL helper
  const { data: wpData } = await serviceClient
    .rpc('weeks_postpartum', { baby_dob })
    .single();

  return json({
    profile: {
      ...profile,
      weeks_postpartum: (wpData as number | null) ?? 0,
    },
  });
});
