#!/usr/bin/env node
// Embed the Latched FAQ CSV into Supabase + pgvector.
//
// Reads smart-faq.csv, joins each row's question_variants with the answer
// context, embeds via OpenAI text-embedding-3-small (1536 dims), and upserts
// into public.faq_entries keyed on external_id.
//
// Usage:
//   node scripts/embed-faq.js              # embed and upsert
//   node scripts/embed-faq.js --dry-run    # parse + print, no API calls, no writes

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { parse } from 'csv-parse/sync';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');
const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMS = 1536;
const BATCH_SIZE = 20;

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return v;
}

function resolveCsvPath() {
  if (process.env.FAQ_CSV_PATH) return resolve(process.cwd(), process.env.FAQ_CSV_PATH);
  return resolve(__dirname, '..', '..', 'smart-faq.csv');
}

function splitVariants(raw) {
  if (!raw) return [];
  return raw
    .split(/\r?\n|\||;/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseBool(v) {
  if (v === undefined || v === null) return false;
  const s = String(v).trim().toLowerCase();
  return s === 'yes' || s === 'true' || s === '1' || s === 'y';
}

function buildEmbeddingInput(row) {
  // Join the variants so the embedding captures every phrasing a mom might
  // use, and include the category + a short slice of the answer to give the
  // vector richer semantic context.
  const variants = row.question_variants.join(' | ');
  const answerSnippet = (row.answer || '').slice(0, 400);
  return `Category: ${row.category}\nQuestions: ${variants}\nAnswer: ${answerSnippet}`;
}

function readRows(csvPath) {
  const csv = readFileSync(csvPath, 'utf8');
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    trim: true,
  });
  return records
    .filter((r) => r.id && r.question_variants && r.answer)
    .map((r) => ({
      external_id: r.id,
      category: r.category || '',
      question_variants: splitVariants(r.question_variants),
      answer: r.answer,
      escalation_trigger: parseBool(r.escalation_trigger),
      escalation_text: r.escalation_text || null,
      confidence_tier: r.confidence_tier || null,
      advisor_reviewed: parseBool(r.advisor_reviewed),
    }));
}

async function embedBatch(openai, inputs) {
  const res = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: inputs,
  });
  return res.data.map((d) => d.embedding);
}

async function main() {
  const csvPath = resolveCsvPath();
  console.log(`Reading FAQ CSV from: ${csvPath}`);

  const rows = readRows(csvPath);
  console.log(`Parsed ${rows.length} FAQ rows.`);

  if (DRY_RUN) {
    console.log('--dry-run: skipping OpenAI + Supabase calls.');
    console.log('Sample embedding input for first row:\n');
    console.log(buildEmbeddingInput(rows[0]));
    console.log('\nFirst 3 parsed rows:');
    for (const r of rows.slice(0, 3)) {
      console.log({ ...r, answer: r.answer.slice(0, 80) + '...' });
    }
    return;
  }

  const openai = new OpenAI({ apiKey: requireEnv('OPENAI_API_KEY') });
  const supabase = createClient(
    requireEnv('SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false } },
  );

  let processed = 0;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const inputs = batch.map(buildEmbeddingInput);

    console.log(`Embedding batch ${i / BATCH_SIZE + 1} (${batch.length} rows)...`);
    const vectors = await embedBatch(openai, inputs);

    if (vectors.some((v) => v.length !== EMBEDDING_DIMS)) {
      throw new Error(`Unexpected embedding dimension; expected ${EMBEDDING_DIMS}.`);
    }

    const records = batch.map((row, idx) => ({
      ...row,
      // pgvector accepts the bracketed string literal form over PostgREST.
      embedding: `[${vectors[idx].join(',')}]`,
    }));

    const { error } = await supabase
      .from('faq_entries')
      .upsert(records, { onConflict: 'external_id' });

    if (error) {
      console.error('Upsert failed:', error);
      process.exit(1);
    }

    processed += batch.length;
    console.log(`  upserted ${processed}/${rows.length}`);
  }

  console.log(`Done. Embedded and upserted ${processed} FAQ rows.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
