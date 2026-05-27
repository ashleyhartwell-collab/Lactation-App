#!/usr/bin/env node
// Embed the Latched FAQ CSV into Supabase via per-variant embeddings (v2).
//
// For each FAQ row, embeds each question_variant separately and upserts
// them into the faq_variants table. Also upserts the parent row into
// faq_entries (no embedding column — dropped in migration 00003).
//
// Usage:
//   node scripts/embed-faq.js              # embed and upsert
//   node scripts/embed-faq.js --dry-run    # parse + print, no API calls

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
  if (!v) { console.error(`Missing required env var: ${name}`); process.exit(1); }
  return v;
}

function resolveCsvPath() {
  if (process.env.FAQ_CSV_PATH) return resolve(process.cwd(), process.env.FAQ_CSV_PATH);
  return resolve(__dirname, '..', '..', 'smart-faq.csv');
}

function splitVariants(raw) {
  if (!raw) return [];
  return raw.split(/\r?\n|\||;/).map((s) => s.trim()).filter(Boolean);
}

function parseBool(v) {
  if (v === undefined || v === null) return false;
  return ['yes', 'true', '1', 'y'].includes(String(v).trim().toLowerCase());
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
  const res = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: inputs });
  return res.data.map((d) => d.embedding);
}

async function main() {
  const csvPath = resolveCsvPath();
  console.log(`Reading FAQ CSV from: ${csvPath}`);
  const rows = readRows(csvPath);
  console.log(`Parsed ${rows.length} FAQ rows.`);

  if (DRY_RUN) {
    console.log('--dry-run: skipping OpenAI + Supabase calls.');
    for (const r of rows.slice(0, 3)) {
      console.log(`  ${r.external_id}: ${r.question_variants.length} variants`);
      r.question_variants.forEach((v, i) => console.log(`    [${i}] ${v}`));
    }
    return;
  }

  const openai = new OpenAI({ apiKey: requireEnv('OPENAI_API_KEY') });
  const supabase = createClient(
    requireEnv('SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false } },
  );

  // Step 1: upsert parent FAQ rows (no embedding column after migration 00003)
  const faqRecords = rows.map((r) => ({
    external_id: r.external_id,
    category: r.category,
    question_variants: r.question_variants,
    answer: r.answer,
    escalation_trigger: r.escalation_trigger,
    escalation_text: r.escalation_text,
    confidence_tier: r.confidence_tier,
    advisor_reviewed: r.advisor_reviewed,
  }));

  console.log('Upserting FAQ entries...');
  const { error: faqError } = await supabase
    .from('faq_entries')
    .upsert(faqRecords, { onConflict: 'external_id' });
  if (faqError) { console.error('faq_entries upsert failed:', faqError); process.exit(1); }

  // Fetch all IDs so we can link variants
  const { data: faqEntries, error: fetchError } = await supabase
    .from('faq_entries')
    .select('id, external_id');
  if (fetchError) { console.error('Failed to fetch faq_entries:', fetchError); process.exit(1); }

  const idByExternal = Object.fromEntries((faqEntries || []).map((r) => [r.external_id, r.id]));

  // Step 2: embed each variant separately
  let totalVariants = 0;
  for (const row of rows) {
    const faqId = idByExternal[row.external_id];
    if (!faqId) { console.warn(`No id found for ${row.external_id}, skipping`); continue; }

    const variants = row.question_variants;
    if (!variants.length) { console.warn(`No variants for ${row.external_id}, skipping`); continue; }

    // Delete existing variants for this FAQ to prevent duplicates on re-run
    const { error: delError } = await supabase
      .from('faq_variants')
      .delete()
      .eq('faq_id', faqId);
    if (delError) { console.error(`Failed to delete old variants for ${row.external_id}:`, delError); process.exit(1); }

    // Embed in sub-batches
    for (let i = 0; i < variants.length; i += BATCH_SIZE) {
      const batch = variants.slice(i, i + BATCH_SIZE);
      const vectors = await embedBatch(openai, batch);

      if (vectors.some((v) => v.length !== EMBEDDING_DIMS)) {
        throw new Error(`Unexpected embedding dimension for ${row.external_id}`);
      }

      const variantRecords = batch.map((text, idx) => ({
        faq_id: faqId,
        variant_text: text,
        embedding: `[${vectors[idx].join(',')}]`,
      }));

      const { error: varError } = await supabase.from('faq_variants').insert(variantRecords);
      if (varError) { console.error(`Failed to insert variants for ${row.external_id}:`, varError); process.exit(1); }

      totalVariants += batch.length;
    }

    console.log(`  ${row.external_id}: ${variants.length} variants embedded`);
  }

  console.log(`Done. Embedded ${totalVariants} variants across ${rows.length} FAQ rows.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
