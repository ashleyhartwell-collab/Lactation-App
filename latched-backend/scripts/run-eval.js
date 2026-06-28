// Latched — semantic search eval runner.
//
// Loads a JSONL golden set, posts each question to the semantic-search Edge
// Function, diffs the response against expected matches/tiers, and prints a
// per-slice metrics table. Raw per-record results land in tests/evals/runs/
// for later upload to Arize.
//
// Usage:
//   npm run eval                                 # default: tests/evals/golden-set.seed.jsonl
//   node scripts/run-eval.js path/to/set.jsonl   # custom set
//   EVAL_INCLUDE_ANATOMY=1 npm run eval          # opt in to anatomy_context cases (writes to user_profiles)
//   EVAL_CONCURRENCY=8 npm run eval              # default 4
//
// Env (same as tests/semantic-search.test.js):
//   SUPABASE_URL, SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY)
// Anatomy seeding additionally requires SUPABASE_SERVICE_ROLE_KEY.

import 'dotenv/config';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DEFAULT_GOLDEN = resolve(ROOT, 'tests/evals/golden-set.seed.jsonl');
const RUNS_DIR = resolve(ROOT, 'tests/evals/runs');

const BASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, '');
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const FUNCTION_URL = `${BASE_URL}/functions/v1/semantic-search`;
const INCLUDE_ANATOMY = process.env.EVAL_INCLUDE_ANATOMY === '1';
const CONCURRENCY = Number(process.env.EVAL_CONCURRENCY ?? 4);

if (!BASE_URL || !ANON_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY/SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const admin = SERVICE_KEY ? createClient(BASE_URL, SERVICE_KEY, { auth: { persistSession: false } }) : null;

// ─── Load & validate ──────────────────────────────────────────────────────

async function loadGolden(path) {
  const raw = await readFile(path, 'utf-8');
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l, i) => {
      try { return JSON.parse(l); }
      catch (e) { throw new Error(`Line ${i + 1} is not valid JSON: ${e.message}`); }
    });
}

// ─── Anatomy seeding (opt-in) ─────────────────────────────────────────────

const seededProfiles = new Map(); // record.id -> synthetic user_id

async function seedAnatomyProfile(record) {
  if (!admin) throw new Error('SUPABASE_SERVICE_ROLE_KEY required to seed anatomy profiles');
  const userId = crypto.randomUUID();
  const { error } = await admin
    .from('user_profiles')
    .upsert({
      id: userId,
      breast_anatomy: record.anatomy_context.breast_anatomy ?? [],
      pump_model: record.anatomy_context.pump_model ?? null,
    });
  if (error) throw new Error(`profile seed failed for ${record.id}: ${error.message}`);
  seededProfiles.set(record.id, userId);
  return userId;
}

async function cleanupProfiles() {
  if (!admin || seededProfiles.size === 0) return;
  const ids = [...seededProfiles.values()];
  await admin.from('user_profiles').delete().in('id', ids);
}

// ─── Function call ────────────────────────────────────────────────────────

async function callFunction(question, { user_id } = {}) {
  const session_id = `eval-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const res = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
      apikey: ANON_KEY,
    },
    body: JSON.stringify({ question, session_id, user_id: user_id ?? null }),
  });
  return { status: res.status, body: await res.json() };
}

// ─── Diff ─────────────────────────────────────────────────────────────────

function diff(record, response) {
  const expected = record.expected_matches ?? [];
  const got = response.body?.results ?? [];
  const matched = response.body?.matched === true;

  const failures = [];
  let top1 = null;     // null = N/A (no-match case)
  let tierOk = null;

  // Case A: no-match expected (off_topic / bras_downgrade / low_confidence)
  if (expected.length === 0) {
    if (matched) failures.push(`expected matched:false, got ${got.length} result(s) (top=${got[0]?.faq_id} ${got[0]?.confidence_tier} ${got[0]?.cosine_score?.toFixed(2)})`);
    return { pass: failures.length === 0, top1, tierOk, failures, got_summary: matched ? got.map(g => `${g.faq_id}/${g.confidence_tier}`).join(',') : 'no-match' };
  }

  // Case B: match(es) expected
  if (!matched) {
    failures.push(`expected match, got matched:false`);
    return { pass: false, top1: false, tierOk: false, failures, got_summary: 'no-match' };
  }

  const gotById = new Map(got.map((r) => [r.faq_id, r]));

  // Top-1: first expected faq_id must equal first returned faq_id
  top1 = got[0]?.faq_id === expected[0].faq_id;
  if (!top1) failures.push(`top-1: expected ${expected[0].faq_id}, got ${got[0]?.faq_id}`);

  // Per-expected: present + tier matches + escalation if requested
  let tierMisses = 0;
  for (const exp of expected) {
    const g = gotById.get(exp.faq_id);
    if (!g) {
      failures.push(`missing expected ${exp.faq_id}`);
      tierMisses++;
      continue;
    }
    if (g.confidence_tier !== exp.tier) {
      failures.push(`${exp.faq_id}: tier expected ${exp.tier}, got ${g.confidence_tier} (${g.cosine_score?.toFixed(2)})`);
      tierMisses++;
    }
    if (exp.expect_escalation && !g.escalation_text) {
      failures.push(`${exp.faq_id}: expected escalation_text, none returned`);
    }
  }
  tierOk = tierMisses === 0;

  // Contradiction warning, if asserted
  if (record.expected_contradiction === true && !response.body.contradiction_warning) {
    failures.push('expected contradiction_warning, none returned');
  } else if (record.expected_contradiction === false && response.body.contradiction_warning) {
    failures.push(`unexpected contradiction_warning: "${response.body.contradiction_warning}"`);
  }

  return {
    pass: failures.length === 0,
    top1,
    tierOk,
    failures,
    got_summary: got.map((g) => `${g.faq_id}/${g.confidence_tier}/${g.cosine_score?.toFixed(2)}`).join(', '),
  };
}

// ─── Runner ───────────────────────────────────────────────────────────────

async function runOne(record) {
  let user_id = null;
  if (record.test_type === 'anatomy_context') {
    if (!INCLUDE_ANATOMY) {
      return { record, skipped: true, reason: 'EVAL_INCLUDE_ANATOMY not set' };
    }
    try { user_id = await seedAnatomyProfile(record); }
    catch (e) { return { record, skipped: true, reason: `profile seed failed: ${e.message}` }; }
  }

  const t0 = Date.now();
  let response;
  try {
    response = await callFunction(record.question, { user_id });
  } catch (e) {
    return { record, error: e.message, latency_ms: Date.now() - t0 };
  }
  const latency_ms = Date.now() - t0;

  const d = diff(record, response);
  return { record, response, latency_ms, ...d };
}

async function runAll(records) {
  const results = new Array(records.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(CONCURRENCY, records.length) }, async () => {
    while (i < records.length) {
      const idx = i++;
      process.stdout.write(`  [${idx + 1}/${records.length}] ${records[idx].id}\r`);
      results[idx] = await runOne(records[idx]);
    }
  });
  await Promise.all(workers);
  process.stdout.write(' '.repeat(60) + '\r');
  return results;
}

// ─── Summary table ────────────────────────────────────────────────────────

function pad(s, n) { return String(s).padEnd(n); }
function pct(num, denom) { return denom === 0 ? '—' : `${Math.round((num / denom) * 100)}%`; }

function summarize(results) {
  const bySlice = new Map();
  for (const r of results) {
    const slice = r.record.test_type;
    if (!bySlice.has(slice)) bySlice.set(slice, []);
    bySlice.get(slice).push(r);
  }

  const rows = [];
  let totN = 0, totPass = 0, totTop1Ok = 0, totTop1Eligible = 0, totTierOk = 0, totTierEligible = 0;

  for (const [slice, rs] of [...bySlice.entries()].sort()) {
    const n = rs.length;
    const run = rs.filter((r) => !r.skipped && !r.error);
    const skipped = rs.filter((r) => r.skipped).length;
    const errored = rs.filter((r) => r.error).length;
    const passed = run.filter((r) => r.pass).length;
    const top1Eligible = run.filter((r) => r.top1 !== null);
    const top1Ok = top1Eligible.filter((r) => r.top1).length;
    const tierEligible = run.filter((r) => r.tierOk !== null);
    const tierOk = tierEligible.filter((r) => r.tierOk).length;

    rows.push({
      slice, n, run: run.length, skipped, errored, passed,
      top1: `${top1Ok}/${top1Eligible.length}`,
      tier: `${tierOk}/${tierEligible.length}`,
      passPct: pct(passed, run.length),
    });

    totN += n;
    totPass += passed;
    totTop1Ok += top1Ok; totTop1Eligible += top1Eligible.length;
    totTierOk += tierOk; totTierEligible += tierEligible.length;
  }

  const totRun = results.filter((r) => !r.skipped && !r.error).length;

  console.log('');
  console.log(`Slice              N    Run  Top-1     Tier-OK   Pass`);
  console.log(`─────────────────  ───  ───  ────────  ────────  ─────`);
  for (const r of rows) {
    console.log(`${pad(r.slice, 17)}  ${pad(r.n, 3)}  ${pad(r.run, 3)}  ${pad(r.top1, 8)}  ${pad(r.tier, 8)}  ${r.passPct}`);
  }
  console.log(`─────────────────  ───  ───  ────────  ────────  ─────`);
  console.log(`${pad('OVERALL', 17)}  ${pad(totN, 3)}  ${pad(totRun, 3)}  ${pad(`${totTop1Ok}/${totTop1Eligible}`, 8)}  ${pad(`${totTierOk}/${totTierEligible}`, 8)}  ${pct(totPass, totRun)}`);
  console.log('');

  // Failure detail
  const failures = results.filter((r) => !r.skipped && !r.error && !r.pass);
  if (failures.length > 0) {
    console.log(`Failures (${failures.length}):`);
    for (const r of failures) {
      console.log(`  ${r.record.id}  ${pad(r.record.test_type, 16)}  ${r.failures.join(' · ')}`);
    }
    console.log('');
  }

  const errored = results.filter((r) => r.error);
  if (errored.length > 0) {
    console.log(`Errors (${errored.length}):`);
    for (const r of errored) console.log(`  ${r.record.id}  ${r.error}`);
    console.log('');
  }

  const skipped = results.filter((r) => r.skipped);
  if (skipped.length > 0) {
    console.log(`Skipped (${skipped.length}):`);
    for (const r of skipped) console.log(`  ${r.record.id}  ${r.reason}`);
    console.log('');
  }

  return { totPass, totRun };
}

// ─── Persist raw run ──────────────────────────────────────────────────────

async function persistRun(results) {
  await mkdir(RUNS_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const path = resolve(RUNS_DIR, `${stamp}.jsonl`);
  const lines = results.map((r) => JSON.stringify({
    id: r.record.id,
    test_type: r.record.test_type,
    question: r.record.question,
    expected_matches: r.record.expected_matches,
    response: r.response?.body ?? null,
    latency_ms: r.latency_ms ?? null,
    pass: r.pass ?? null,
    top1: r.top1 ?? null,
    tier_ok: r.tierOk ?? null,
    failures: r.failures ?? [],
    skipped: r.skipped ?? false,
    skip_reason: r.reason ?? null,
    error: r.error ?? null,
  }));
  await writeFile(path, lines.join('\n') + '\n');
  return path;
}

// ─── Main ─────────────────────────────────────────────────────────────────

const goldenPath = resolve(process.cwd(), process.argv[2] ?? DEFAULT_GOLDEN);
console.log(`Loading: ${goldenPath}`);
const records = await loadGolden(goldenPath);
console.log(`Running ${records.length} records against ${FUNCTION_URL}  (concurrency=${CONCURRENCY})`);
if (!INCLUDE_ANATOMY) console.log(`(anatomy_context cases will skip — set EVAL_INCLUDE_ANATOMY=1 to enable)`);

const results = await runAll(records);
const { totPass, totRun } = summarize(results);
const runPath = await persistRun(results);
console.log(`Results: ${runPath}`);

await cleanupProfiles();

process.exit(totPass === totRun ? 0 : 1);
