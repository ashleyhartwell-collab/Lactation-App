// Latched Quick Chat — semantic search Edge Function.
//
// POST { question, session_id, user_id? }
//   -> { matched, answer?, confidence_tier?, caveat?, faq_id?, cosine_score? }
//
// Embeds the incoming question with OpenAI text-embedding-3-small, runs a
// cosine-similarity search against faq_entries via the match_faq RPC, then
// applies confidence tiering:
//   HIGH   (>= 0.82): return the answer.
//   MEDIUM (0.65–0.81): return the answer + a "general guidance" caveat.
//   LOW    (< 0.65): log to unmatched_questions, return { matched: false }.
//
// Special case: Bras & Hands-Free always requires HIGH confidence — fit is
// individual enough that medium-confidence guidance is more harmful than
// helpful, so we downgrade MEDIUM to LOW for that category.

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const HIGH_THRESHOLD = 0.82;
const MEDIUM_THRESHOLD = 0.65;
const EMBEDDING_MODEL = 'text-embedding-3-small';
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

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
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
  const isBraCategory = category.toLowerCase().startsWith('bras');
  if (isBraCategory) return 'LOW';

  if (score >= MEDIUM_THRESHOLD) return 'MEDIUM';
  return 'LOW';
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

  let embedding: number[];
  try {
    embedding = await embedQuestion(question);
  } catch (err) {
    console.error(err);
    return json({ error: 'Failed to embed question' }, 502);
  }

  const { data: matches, error: rpcError } = await supabase.rpc('match_faq', {
    query_embedding: `[${embedding.join(',')}]`,
    match_count: 5,
  });

  if (rpcError) {
    console.error('match_faq RPC failed:', rpcError);
    return json({ error: 'Search failed' }, 500);
  }

  const top = (matches as MatchRow[] | null)?.[0];

  if (!top) {
    await logQuery({
      session_id, user_id, raw_question: question,
      matched: false, faq_id: null, confidence_tier: 'LOW', cosine_score: null,
    });
    await logUnmatched({
      session_id, user_id, raw_question: question,
      cosine_score: null, closest_faq_id: null,
    });
    return json({ matched: false });
  }

  const tier = tierFor(top.category, top.cosine_score);

  if (tier === 'LOW') {
    await logQuery({
      session_id, user_id, raw_question: question,
      matched: false, faq_id: top.id,
      confidence_tier: 'LOW', cosine_score: top.cosine_score,
    });
    await logUnmatched({
      session_id, user_id, raw_question: question,
      cosine_score: top.cosine_score, closest_faq_id: top.id,
    });
    return json({ matched: false });
  }

  await logQuery({
    session_id, user_id, raw_question: question,
    matched: true, faq_id: top.id,
    confidence_tier: tier, cosine_score: top.cosine_score,
  });

  const response: Record<string, unknown> = {
    matched: true,
    faq_id: top.id,
    answer: top.answer,
    confidence_tier: tier,
    cosine_score: top.cosine_score,
  };
  if (tier === 'MEDIUM') response.caveat = MEDIUM_CAVEAT;
  if (top.escalation_trigger && top.escalation_text) {
    response.escalation_text = top.escalation_text;
  }

  return json(response);
});
