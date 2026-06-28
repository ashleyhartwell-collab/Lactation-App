#!/usr/bin/env node
// Embed the nipple-blister and axillary-breast-tissue protocols into Supabase.
//
// Reuses the same faq_entries + faq_variants pipeline as embed-faq.js so the
// semantic-search Edge Function can retrieve protocol chunks by cosine match
// alongside the CSV FAQ.  Chunks and hand-curated variants live in
// scripts/data/protocol-chunks.js.
//
// Usage:
//   node scripts/embed-protocols.js              # embed and upsert
//   node scripts/embed-protocols.js --dry-run    # print chunks, no API/DB calls

import 'dotenv/config';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { PROTOCOL_CHUNKS } from './data/protocol-chunks.js';

const DRY_RUN = process.argv.includes('--dry-run');
const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMS = 1536;
const BATCH_SIZE = 20;

function requireEnv(name) {
  const v = process.env[name];
  if (!v) { console.error(`Missing required env var: ${name}`); process.exit(1); }
  return v;
}

async function embedBatch(openai, inputs) {
  const res = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: inputs });
  return res.data.map((d) => d.embedding);
}

async function main() {
  console.log(`Loaded ${PROTOCOL_CHUNKS.length} protocol chunks.`);

  // Validation: external_ids unique, variants non-empty
  const seen = new Set();
  for (const c of PROTOCOL_CHUNKS) {
    if (seen.has(c.external_id)) {
      console.error(`Duplicate external_id: ${c.external_id}`); process.exit(1);
    }
    seen.add(c.external_id);
    if (!c.question_variants?.length) {
      console.error(`${c.external_id} has no question_variants`); process.exit(1);
    }
    if (!c.answer?.trim()) {
      console.error(`${c.external_id} has empty answer`); process.exit(1);
    }
  }

  if (DRY_RUN) {
    console.log('--dry-run: skipping OpenAI + Supabase calls.\n');
    const totalVariants = PROTOCOL_CHUNKS.reduce((n, c) => n + c.question_variants.length, 0);
    console.log(`Would embed ${totalVariants} variants across ${PROTOCOL_CHUNKS.length} chunks.\n`);
    for (const c of PROTOCOL_CHUNKS) {
      console.log(`${c.external_id} [${c.category}] — ${c.question_variants.length} variants, ${c.answer.length} chars`);
      c.question_variants.slice(0, 2).forEach((v) => console.log(`  • ${v}`));
      if (c.question_variants.length > 2) console.log(`  • ... (+${c.question_variants.length - 2} more)`);
    }
    return;
  }

  const openai = new OpenAI({ apiKey: requireEnv('OPENAI_API_KEY') });
  const supabase = createClient(
    requireEnv('SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false } },
  );

  // Step 1: upsert parent FAQ rows
  const faqRecords = PROTOCOL_CHUNKS.map((c) => ({
    external_id: c.external_id,
    category: c.category,
    question_variants: c.question_variants,
    answer: c.answer,
    escalation_trigger: c.escalation_trigger ?? false,
    escalation_text: c.escalation_text ?? null,
    confidence_tier: null,
    advisor_reviewed: false,
  }));

  console.log('Upserting protocol chunks into faq_entries...');
  const { error: faqError } = await supabase
    .from('faq_entries')
    .upsert(faqRecords, { onConflict: 'external_id' });
  if (faqError) { console.error('faq_entries upsert failed:', faqError); process.exit(1); }

  // Step 2: fetch IDs to link variants
  const externalIds = PROTOCOL_CHUNKS.map((c) => c.external_id);
  const { data: faqEntries, error: fetchError } = await supabase
    .from('faq_entries')
    .select('id, external_id')
    .in('external_id', externalIds);
  if (fetchError) { console.error('Failed to fetch faq_entries:', fetchError); process.exit(1); }

  const idByExternal = Object.fromEntries((faqEntries || []).map((r) => [r.external_id, r.id]));

  // Step 3: embed each variant per chunk
  let totalVariants = 0;
  for (const chunk of PROTOCOL_CHUNKS) {
    const faqId = idByExternal[chunk.external_id];
    if (!faqId) { console.warn(`No id found for ${chunk.external_id}, skipping`); continue; }

    // Delete existing variants to prevent dupes on re-run
    const { error: delError } = await supabase
      .from('faq_variants')
      .delete()
      .eq('faq_id', faqId);
    if (delError) { console.error(`Failed to delete old variants for ${chunk.external_id}:`, delError); process.exit(1); }

    const variants = chunk.question_variants;
    for (let i = 0; i < variants.length; i += BATCH_SIZE) {
      const batch = variants.slice(i, i + BATCH_SIZE);
      const vectors = await embedBatch(openai, batch);

      if (vectors.some((v) => v.length !== EMBEDDING_DIMS)) {
        throw new Error(`Unexpected embedding dimension for ${chunk.external_id}`);
      }

      const variantRecords = batch.map((text, idx) => ({
        faq_id: faqId,
        variant_text: text,
        embedding: `[${vectors[idx].join(',')}]`,
      }));

      const { error: varError } = await supabase.from('faq_variants').insert(variantRecords);
      if (varError) { console.error(`Failed to insert variants for ${chunk.external_id}:`, varError); process.exit(1); }

      totalVariants += batch.length;
    }

    console.log(`  ${chunk.external_id}: ${variants.length} variants embedded`);
  }

  console.log(`\nDone. Embedded ${totalVariants} variants across ${PROTOCOL_CHUNKS.length} protocol chunks.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
