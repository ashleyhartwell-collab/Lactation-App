// Latched Quick Chat — semantic search Edge Function (v2, compound questions).
//
// POST { question, session_id, user_id? }
//   -> {
//        matched: true,
//        results: [{
//          sub_question, faq_id, answer, confidence_tier, cosine_score,
//          caveat?,         // MEDIUM tier only
//          escalation_text? // if escalation_trigger is true
//        }],
//        contradiction_warning: string | null
//      }
//   OR { matched: false }
//
// Pipeline:
//  1. Rate limit check (30 req/user/hour via check_rate_limit RPC) → 429 if exceeded.
//  2. Write user message row to chat_messages.
//  3. Decompose question into 1-N atomic sub-questions via GPT-4o-mini.
//  4. Embed each sub-question with text-embedding-3-small.
//  5. Run match_faq for each embedding in parallel.
//  6. Apply confidence tiering; drop LOW-tier and duplicate faq_ids.
//  7. Run contradiction check when 2+ results remain.
//  8. Log to query_log / unmatched_questions; write assistant message row.
//     Side-effect: detectCompanionSignals (fire-and-forget) writes to companion_signals.
//  9. Return ordered results.
//
// Chat history: both the user message and assistant response are written to
// chat_messages (service role, bypasses RLS). Clients read history directly
// via the Supabase JS SDK using their JWT (RLS: user_id = auth.uid()).
// user_id must be passed from the client for history to be user-linked.
//
// Confidence tiers:
//   HIGH   (>= 0.82): return answer.
//   MEDIUM (0.65–0.81): return answer + "general guidance" caveat.
//   LOW    (< 0.65): log to unmatched_questions, exclude from results.
//
// Special case: Bras & Hands-Free always requires HIGH confidence.

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const HIGH_THRESHOLD = 0.82;
const MEDIUM_THRESHOLD = 0.65;
const RATE_LIMIT = 30; // requests per user per hour
const EMBEDDING_MODEL = 'text-embedding-3-small';
const DECOMPOSE_MODEL = 'gpt-4o-mini';
const MEDIUM_CAVEAT =
  "This is general guidance — your situation may be different. If you're concerned, an IBCLC can help.";

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

interface MatchRow {
  id: string;
  external_id: string;
  category: string;
  answer: string;
  escalation_trigger: boolean;
  escalation_text: string | null;
  confidence_tier: string | null;
  cosine_score: number;
}

interface SearchRequest {
  question?: string;
  session_id?: string;
  user_id?: string;
}

// Keywords that flag a question as pump-related and eligible for the
// multi-pump clarification check.
const PUMP_KEYWORDS = [
  'pump', 'flange', 'suction', 'wearable', 'valve', 'membrane', 'tubing',
  'backflow', 'letdown', 'let-down', 'spectra', 'medela', 'elvie', 'willow',
  'momcozy', 'babybuddha', 'baby buddha', 'output per', 'oz per', 'ounce per',
];

// Returns true if the question text looks pump-related.
function isPumpRelatedQuestion(question: string): boolean {
  const lower = question.toLowerCase();
  return PUMP_KEYWORDS.some((term) => lower.includes(term));
}

// Returns true if the question already names one of the user's specific pump brands,
// meaning no clarification is needed.
function mentionsSpecificPump(question: string, pumpModels: string[]): boolean {
  const lower = question.toLowerCase();
  return pumpModels.some((model) => {
    // Use the brand name (first word of the model string) as the match key.
    // Brand names are always the first word: Spectra, Medela, Elvie, Willow,
    // Momcozy, BabyBuddha — all 5+ chars and distinct enough to match safely.
    const brand = model.split(' ')[0].toLowerCase();
    return brand.length >= 4 && lower.includes(brand);
  });
}

// Format a pump_models text[] into a user-context string.
function formatPumpContext(pumpModels: string[]): string {
  if (pumpModels.length === 1) return `User's pump: ${pumpModels[0]}.`;
  return `User's pumps: ${pumpModels.join(', ')}.`;
}

interface ResultItem {
  sub_question: string;
  faq_id: string;
  answer: string;
  confidence_tier: string;
  cosine_score: number;
  caveat?: string;
  escalation_text?: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

// Format a breast_anatomy JSONB array into a readable context string.
// e.g. [{condition:"flat_nipples",laterality:"right"},{condition:"breast_reduction",laterality:"both"}]
//   -> "flat nipples (right), breast reduction (both)"
function formatAnatomyContext(anatomy: Array<{ condition: string; laterality: string }>): string {
  return anatomy
    .map((item) => `${item.condition.replace(/_/g, ' ')} (${item.laterality})`)
    .join(', ');
}

async function decomposeQuestion(question: string, anatomyContext: string | null): Promise<string[]> {
  // anatomyContext may contain anatomy conditions, a pump model, or both —
  // callers compose it before passing in.
  const anatomyNote = anatomyContext
    ? `\n\nUser context: ${anatomyContext} Use this context to interpret questions about supply, latch, discomfort, or pump-specific issues more precisely. Do not add sub-questions about topics the user did not ask about.`
    : '';

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: DECOMPOSE_MODEL,
        messages: [
          {
            role: 'system',
            content:
              `You are a helper for a lactation support app. Decompose the user question into individual, atomic questions that can each be answered independently. Return a JSON object: { "questions": ["string", ...] }. Maximum 4 questions. If the input is already a single question, return a one-element array. Do not add questions that are not in the original input.${anatomyNote}`,
          },
          { role: 'user', content: question },
        ],
        response_format: { type: 'json_object' },
        temperature: 0,
      }),
    });

    if (!res.ok) return [question];

    const data = (await res.json()) as { choices: Array<{ message: { content: string } }> };
    const parsed = JSON.parse(data.choices[0].message.content) as
      | { questions?: string[]; sub_questions?: string[] }
      | string[];

    if (Array.isArray(parsed)) return parsed.filter(Boolean);
    const arr = parsed.questions ?? parsed.sub_questions;
    if (Array.isArray(arr) && arr.length > 0) return arr.filter(Boolean);
    return [question];
  } catch {
    return [question];
  }
}

async function embedQuestion(question: string): Promise<number[]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: question }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI embeddings failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { data: Array<{ embedding: number[] }> };
  return data.data[0].embedding;
}

function tierFor(category: string, score: number): 'HIGH' | 'MEDIUM' | 'LOW' {
  if (score >= HIGH_THRESHOLD) return 'HIGH';
  // Bra fitting is too individual for medium-confidence guidance.
  if (category.toLowerCase().startsWith('bras')) return 'LOW';
  if (score >= MEDIUM_THRESHOLD) return 'MEDIUM';
  return 'LOW';
}

async function checkContradiction(results: ResultItem[]): Promise<string | null> {
  if (results.length < 2) return null;

  const summaries = results
    .map((r, i) => `Answer ${i + 1} (for "${r.sub_question}"): ${r.answer.slice(0, 200)}`)
    .join('\n\n');

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: DECOMPOSE_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are reviewing multiple breastfeeding answers. Determine if any directly contradict each other in a way that could confuse a new mother. Respond with JSON: { "contradiction": true/false, "warning": "brief warning or null" }. Only flag genuine contradictions, not different aspects of the same topic.',
          },
          { role: 'user', content: summaries },
        ],
        response_format: { type: 'json_object' },
        temperature: 0,
      }),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as { choices: Array<{ message: { content: string } }> };
    const parsed = JSON.parse(data.choices[0].message.content) as {
      contradiction: boolean;
      warning: string | null;
    };
    return parsed.contradiction ? (parsed.warning ?? 'These answers may suggest different approaches — speaking with a lactation consultant is recommended.') : null;
  } catch {
    return null;
  }
}

async function logQuery(params: {
  session_id: string | null;
  user_id: string | null;
  raw_question: string;
  matched: boolean;
  faq_id: string | null;
  confidence_tier: string | null;
  cosine_score: number | null;
}) {
  const { error } = await supabase.from('query_log').insert(params);
  if (error) console.error('query_log insert failed:', error);
}

async function logUnmatched(params: {
  session_id: string | null;
  user_id: string | null;
  raw_question: string;
  cosine_score: number | null;
  closest_faq_id: string | null;
}) {
  const { error } = await supabase.from('unmatched_questions').insert(params);
  if (error) console.error('unmatched_questions insert failed:', error);
}

// ─── Companion signal detection ───────────────────────────────────────────────
//
// Scans the user's raw question for keywords that indicate a topic the companion
// layer cares about. Writes matching signal_keys to companion_signals (one row per
// unique key per call). Called fire-and-forget after the main response is assembled
// so it never blocks the response.
//
// Signal keys are consumed by evaluate-companion-triggers, which matches them
// against companion_triggers.chat_signal_keywords. The key naming convention is
// snake_case and designed to be human-readable in the DB.

const SIGNAL_MAP: Record<string, string[]> = {
  // Supply
  supply_concern: [
    'low supply', 'not enough milk', 'milk supply', 'supply dropping', 'supply dipping',
    'supply issue', 'not producing', 'making enough', 'supply concern', 'supply problem',
    'increasing supply', 'boost supply', 'build supply', 'supply tanked', 'dried up',
    'supply decreased', 'less milk', 'supply low',
  ],
  // Latch
  latch_difficulty: [
    'bad latch', 'latch problem', 'latch issue', 'won\'t latch', 'can\'t latch',
    'refusing breast', 'breast refusal', 'shallow latch', 'latch pain', 'latching on',
    'latching correctly', 'getting a good latch', 'difficulty latching', 'keep unlatching',
    'popping off', 'slides off',
  ],
  // Nipple pain / damage
  nipple_pain: [
    'nipple pain', 'sore nipples', 'cracked nipple', 'bleeding nipple', 'nipple crack',
    'nipple blister', 'nipple bleb', 'nipple shield', 'raw nipple', 'nipple damage',
    'nipple soreness', 'nursing hurts', 'breastfeeding hurts', 'painful to nurse',
    'burning nipple', 'nipple blister', 'vasospasm',
  ],
  // Plugged ducts / mastitis
  mastitis_signs: [
    'plugged duct', 'blocked duct', 'clogged duct', 'mastitis', 'hard lump',
    'lump in breast', 'breast lump', 'painful lump', 'engorgement', 'engorged',
    'breast infection', 'red streak', 'fever while breastfeeding', 'flu-like symptoms nursing',
    'abscess',
  ],
  // Pumping output
  pumping_output: [
    'not getting much', 'pumping so little', 'barely pumping', 'output dropped',
    'pumping less', 'only getting ounces', 'not pumping enough', 'flange fit',
    'flange size', 'pumping schedule', 'how often to pump', 'exclusive pumping',
    'pump output', 'low output', 'nothing when i pump',
  ],
  // Returning to work
  returning_to_work: [
    'going back to work', 'return to work', 'back at work', 'pumping at work',
    'pump at the office', 'daycare', 'childcare', 'work schedule', 'pumping schedule work',
    'store milk for work', 'maternity leave ending', 'leave ending',
  ],
  // Weaning
  weaning_interest: [
    'stop breastfeeding', 'wean', 'weaning', 'transition to formula',
    'cutting back nursing', 'stopping nursing', 'done breastfeeding',
    'how to stop', 'stopping pumping', 'dry up supply', 'decrease feeds',
    'night weaning', 'wean at night', 'drop a feed', 'drop a pump',
  ],
  // Growth spurts / cluster feeding
  cluster_feeding: [
    'cluster feed', 'cluster feeding', 'feeding constantly', 'feeding all the time',
    'nursing every hour', 'feeding nonstop', 'growth spurt', 'always hungry',
    'won\'t stop feeding', 'fussy after feeding', 'never satisfied',
  ],
  // Sleep / night feeds
  night_feeds: [
    'night feed', 'feeding at night', 'dream feed', 'night nursing', 'night waking',
    'sleep through the night', 'sleeping longer', 'dropping night feeds', 'nighttime feed',
    'how many times at night', 'up every hour', 'nursing to sleep',
  ],
  // Supplementing / formula
  supplementing: [
    'supplement', 'supplementing', 'add formula', 'use formula', 'combination feeding',
    'combo feeding', 'mixed feeding', 'formula and breastfeeding', 'donor milk',
    'top up', 'topping off', 'top-up feed',
  ],
  // Solids introduction
  starting_solids: [
    'starting solids', 'solid food', 'first foods', 'introducing solids', 'baby led weaning',
    'when to start solids', 'purée', 'baby food', 'rice cereal', 'iron-rich food',
    'finger food', '4 months', '6 months food',
  ],
  // Milk storage / freezer stash
  milk_storage: [
    'freezer stash', 'freeze milk', 'frozen milk', 'milk storage', 'store breast milk',
    'how long milk lasts', 'refrigerate milk', 'thaw milk', 'warming milk',
    'bags for milk', 'storage bags', 'how to store milk',
  ],
};

// Writes any matching signal_keys to companion_signals. Fire-and-forget — errors
// are swallowed so they never affect the chat response.
async function detectCompanionSignals(
  question: string,
  userId: string,
): Promise<void> {
  const lower = question.toLowerCase();
  const matchedKeys: string[] = [];

  for (const [signalKey, keywords] of Object.entries(SIGNAL_MAP)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      matchedKeys.push(signalKey);
    }
  }

  if (matchedKeys.length === 0) return;

  const rows = matchedKeys.map((signal_key) => ({
    user_id: userId,
    signal_key,
    raw_text: question.slice(0, 500), // cap stored text length
  }));

  const { error } = await supabase.from('companion_signals').insert(rows);
  if (error) {
    // Non-fatal — log and continue. The companion layer will catch up on next eval.
    console.warn('detectCompanionSignals: insert warning:', error.message);
  }
}

async function writeChatMessage(params: {
  user_id: string | null;
  session_id: string;
  role: 'user' | 'assistant';
  content?: string;
  results?: ResultItem[];
  matched?: boolean;
  contradiction_warning?: string | null;
}) {
  const row: Record<string, unknown> = {
    user_id: params.user_id,
    session_id: params.session_id,
    role: params.role,
  };
  if (params.role === 'user') {
    row.content = params.content;
  } else {
    row.results = params.results ?? [];
    row.matched = params.matched ?? false;
    row.contradiction_warning = params.contradiction_warning ?? null;
  }
  const { error } = await supabase.from('chat_messages').insert(row);
  if (error) console.error(`chat_messages insert failed (${params.role}):`, error);
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: SearchRequest;
  try {
    body = (await req.json()) as SearchRequest;
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const question = (body.question || '').trim();
  const session_id = body.session_id ?? null;
  const user_id = body.user_id ?? null;

  if (!question) return json({ error: 'question is required' }, 400);
  if (!session_id) return json({ error: 'session_id is required' }, 400);

  // Step 1: Rate limit check — runs before any OpenAI calls or DB writes.
  const { data: rlData, error: rlError } = await supabase
    .rpc('check_rate_limit', {
      p_user_id: user_id ?? '',
      p_session_id: session_id,
      p_limit: RATE_LIMIT,
    })
    .single();

  if (!rlError && rlData?.is_limited) {
    return new Response(
      JSON.stringify({
        error: 'rate_limit_exceeded',
        message: "You've been asking a lot of great questions! Take a short break and try again soon.",
        retry_after_seconds: rlData.retry_after_seconds,
      }),
      {
        status: 429,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json',
          'Retry-After': String(rlData.retry_after_seconds),
        },
      },
    );
  }

  // Step 2: Write user message — captured before any processing so history
  // is preserved even if downstream steps fail.
  await writeChatMessage({ user_id, session_id, role: 'user', content: question });

  // Step 2b: Fetch user anatomy and pump context (non-blocking — failure silently skips context).
  let anatomyContext: string | null = null;
  let userPumpModels: string[] = [];
  if (user_id) {
    const { data: profileData } = await supabase
      .from('user_profiles')
      .select('breast_anatomy, pump_models')
      .eq('id', user_id)
      .maybeSingle();
    const anatomy = profileData?.breast_anatomy as Array<{ condition: string; laterality: string }> | null;
    const pumpModels = profileData?.pump_models as string[] | null;

    if (Array.isArray(pumpModels) && pumpModels.length > 0) {
      userPumpModels = pumpModels;
    }

    const contextParts: string[] = [];
    if (Array.isArray(anatomy) && anatomy.length > 0) {
      contextParts.push(formatAnatomyContext(anatomy));
    }
    if (userPumpModels.length > 0) {
      contextParts.push(formatPumpContext(userPumpModels));
    }
    if (contextParts.length > 0) {
      anatomyContext = contextParts.join(' ');
    }
  }

  // Step 2c: Multi-pump clarification check.
  // If the user has recorded more than one pump, the question is pump-related,
  // and they haven't named a specific pump in their message, ask which pump they
  // mean before running the full search pipeline. This avoids returning generic
  // answers when brand-specific guidance exists.
  if (
    userPumpModels.length > 1 &&
    isPumpRelatedQuestion(question) &&
    !mentionsSpecificPump(question, userPumpModels)
  ) {
    const clarificationQuestion =
      `You have ${userPumpModels.length} pumps in your profile — ${userPumpModels.join(' and ')}. ` +
      `Which pump are you asking about?`;

    await writeChatMessage({
      user_id,
      session_id,
      role: 'assistant',
      results: [],
      matched: false,
      contradiction_warning: null,
    });

    return json({
      matched: false,
      clarification_needed: true,
      clarification_question: clarificationQuestion,
      pump_options: userPumpModels,
    });
  }

  // Step 3: Decompose into atomic sub-questions (with user context when available)
  const subQuestions = await decomposeQuestion(question, anatomyContext);

  // Steps 4 & 5: embed + search in parallel
  const searchResults = await Promise.allSettled(
    subQuestions.map(async (subQ) => {
      const embedding = await embedQuestion(subQ);
      const { data: matches, error: rpcError } = await supabase.rpc('match_faq', {
        query_embedding: `[${embedding.join(',')}]`,
        match_count: 5,
      });
      if (rpcError) throw new Error(`match_faq RPC failed: ${rpcError.message}`);
      return { subQ, matches: (matches as MatchRow[] | null) ?? [] };
    }),
  );

  // Step 6: apply tiers, deduplicate by faq_id, preserve sub-question order
  const results: ResultItem[] = [];
  const seenFaqIds = new Set<string>();
  let anyLow = false;

  for (const settled of searchResults) {
    if (settled.status === 'rejected') {
      console.error('Sub-question search failed:', settled.reason);
      continue;
    }

    const { subQ, matches } = settled.value;
    const top = matches[0];

    if (!top) {
      await Promise.all([
        logQuery({ session_id, user_id, raw_question: subQ, matched: false, faq_id: null, confidence_tier: 'LOW', cosine_score: null }),
        logUnmatched({ session_id, user_id, raw_question: subQ, cosine_score: null, closest_faq_id: null }),
      ]);
      anyLow = true;
      continue;
    }

    const tier = tierFor(top.category, top.cosine_score);

    if (tier === 'LOW') {
      await Promise.all([
        logQuery({ session_id, user_id, raw_question: subQ, matched: false, faq_id: top.id, confidence_tier: 'LOW', cosine_score: top.cosine_score }),
        logUnmatched({ session_id, user_id, raw_question: subQ, cosine_score: top.cosine_score, closest_faq_id: top.id }),
      ]);
      anyLow = true;
      continue;
    }

    // Deduplicate: skip if this FAQ was already matched by another sub-question
    if (seenFaqIds.has(top.id)) continue;
    seenFaqIds.add(top.id);

    const item: ResultItem = {
      sub_question: subQ,
      faq_id: top.id,
      answer: top.answer,
      confidence_tier: tier,
      cosine_score: top.cosine_score,
    };
    if (tier === 'MEDIUM') item.caveat = MEDIUM_CAVEAT;
    if (top.escalation_trigger && top.escalation_text) {
      item.escalation_text = top.escalation_text;
    }

    results.push(item);

    await logQuery({
      session_id, user_id, raw_question: subQ,
      matched: true, faq_id: top.id,
      confidence_tier: tier, cosine_score: top.cosine_score,
    });
  }

  if (results.length === 0) {
    // All sub-questions were LOW / no matches
    if (!anyLow) {
      // Truly nothing returned — log the original question
      await Promise.all([
        logQuery({ session_id, user_id, raw_question: question, matched: false, faq_id: null, confidence_tier: 'LOW', cosine_score: null }),
        logUnmatched({ session_id, user_id, raw_question: question, cosine_score: null, closest_faq_id: null }),
      ]);
    }
    // Write no-match assistant row so the conversation is complete in history
    await writeChatMessage({ user_id, session_id, role: 'assistant', results: [], matched: false, contradiction_warning: null });
    return json({ matched: false });
  }

  // Step 7: contradiction check
  const contradiction_warning = await checkContradiction(results);

  // Step 8: write assistant response to chat history + companion signal detection
  await writeChatMessage({ user_id, session_id, role: 'assistant', results, matched: true, contradiction_warning });

  // Side-effect: detect companion signals from the user's question (fire-and-forget).
  // Only runs when user_id is present; non-authenticated sessions produce no signals.
  if (user_id) {
    detectCompanionSignals(question, user_id).catch(() => {
      // Swallow — never let signal detection affect the response.
    });
  }

  return json({
    matched: true,
    results,
    contradiction_warning,
  });
});
