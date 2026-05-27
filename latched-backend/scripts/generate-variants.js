#!/usr/bin/env node
// Generate question variants for each FAQ row using GPT-4o-mini.
// Reads smart-faq.csv, expands each row to 6 pipe-separated variants,
// and writes the updated CSV back in place.
//
// Usage:
//   node scripts/generate-variants.js              # generate and save
//   node scripts/generate-variants.js --dry-run    # preview first 3, no writes

import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import OpenAI from 'openai';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');
const VARIANT_COUNT = 6;
const FORCE = process.argv.includes('--force'); // regenerate even if already has variants

function requireEnv(name) {
  const v = process.env[name];
  if (!v) { console.error(`Missing required env var: ${name}`); process.exit(1); }
  return v;
}

function resolveCsvPath() {
  if (process.env.FAQ_CSV_PATH) return resolve(process.cwd(), process.env.FAQ_CSV_PATH);
  return resolve(__dirname, '..', '..', 'smart-faq.csv');
}

async function generateVariants(openai, externalId, canonicalQuestion, category, answer) {
  const prompt = `Generate ${VARIANT_COUNT} different ways a new mother might ask the following breastfeeding question. Make them sound natural — some short/anxious, some detailed, some using terms like "my LO", "my baby", or a baby name. Return a JSON object: { "variants": ["string", ...] }. The first variant must be the canonical question exactly as given. Do not add questions outside the scope of the original.

Category: ${category}
Canonical: ${canonicalQuestion}
Answer (first 200 chars): ${answer.slice(0, 200)}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You generate question variants for a lactation FAQ. Return only valid JSON.' },
      { role: 'user', content: prompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  try {
    const content = res.choices[0].message.content;
    const parsed = JSON.parse(content);
    const arr = Array.isArray(parsed) ? parsed : (parsed.variants || parsed.questions || Object.values(parsed)[0]);
    if (!Array.isArray(arr)) throw new Error('No array found');
    return arr.slice(0, VARIANT_COUNT).filter((v) => typeof v === 'string' && v.trim());
  } catch {
    console.warn(`  Failed to parse variants for ${externalId}, using canonical only`);
    return [canonicalQuestion];
  }
}

async function main() {
  const csvPath = resolveCsvPath();
  console.log(`Reading FAQ CSV from: ${csvPath}`);
  const csv = readFileSync(csvPath, 'utf8');
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    trim: true,
  });
  const columns = Object.keys(records[0]);

  if (DRY_RUN) {
    console.log('--dry-run: showing first 3 rows, no changes.\n');
    for (const r of records.slice(0, 3)) {
      const variants = r.question_variants.split('|').map((s) => s.trim()).filter(Boolean);
      console.log(`${r.id} (${variants.length} variants):`);
      variants.forEach((v) => console.log(`  • ${v}`));
    }
    return;
  }

  // Backup the original CSV
  const backupPath = csvPath + '.bak';
  copyFileSync(csvPath, backupPath);
  console.log(`Backup saved to: ${backupPath}`);

  const openai = new OpenAI({ apiKey: requireEnv('OPENAI_API_KEY') });
  const updated = [];
  let generated = 0;
  let skipped = 0;

  for (const record of records) {
    if (!record.id || !record.question_variants || !record.answer) {
      updated.push(record);
      continue;
    }

    const existing = record.question_variants.split('|').map((s) => s.trim()).filter(Boolean);

    if (!FORCE && existing.length >= VARIANT_COUNT) {
      skipped++;
      updated.push(record);
      continue;
    }

    const canonical = existing[0] || record.question_variants.trim();
    process.stdout.write(`  Generating for ${record.id}...`);

    const variants = await generateVariants(openai, record.id, canonical, record.category || '', record.answer);
    updated.push({ ...record, question_variants: variants.join(' | ') });
    generated++;
    process.stdout.write(` ${variants.length} variants\n`);

    // Polite rate limiting
    await new Promise((r) => setTimeout(r, 150));
  }

  const output = stringify(updated, { header: true, columns });
  writeFileSync(csvPath, output);
  console.log(`\nDone. Generated variants for ${generated} rows, skipped ${skipped} rows already at ${VARIANT_COUNT}+.`);
  console.log(`Updated: ${csvPath}`);
  console.log(`\nNext step: run "npm run embed" to push new embeddings to Supabase.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
