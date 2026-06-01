#!/usr/bin/env node
/**
 * generate-companion-seed.js
 *
 * Reads the AG and ML content libraries and outputs two SQL seed files:
 *   supabase/seed/companion_triggers.sql
 *   supabase/seed/companion_content.sql
 *
 * Usage:
 *   node scripts/generate-companion-seed.js
 *
 * Prerequisites:
 *   scripts/data/ag-content.cjs  — AG library (25 entries)
 *   scripts/data/ml-content.cjs  — ML library (27 entries)
 *   supabase/seed/             — output directory (created if missing)
 *
 * HOLD flags: AG-016 (supply tone review) and AG-023 (IGT specialist review)
 * are seeded with held = true.  Clear with:
 *   UPDATE companion_triggers SET held = false WHERE id IN ('AG-016','AG-023');
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── CONFIG ────────────────────────────────────────────────────────────────────

const ROOT       = path.resolve(__dirname, '..');
const AG_FILE    = path.join(__dirname, 'data', 'ag-content.cjs');
const ML_FILE    = path.join(__dirname, 'data', 'ml-content.cjs');
const SEED_DIR   = path.join(ROOT, 'supabase', 'seed');
const OUT_TRIG   = path.join(SEED_DIR, 'companion_triggers.sql');
const OUT_CONT   = path.join(SEED_DIR, 'companion_content.sql');

// HOLDs: these ids are seeded with held = true until clinical review clears them
const HOLD_IDS = new Set(['AG-016', 'AG-023']);

// Default priority per feature type
const DEFAULT_PRIORITY = {
  AG: 50,
  ML: 60,
};

// ─── SQL HELPERS ──────────────────────────────────────────────────────────────

/** Escape a string value for SQL single-quoted literals. */
function esc(str) {
  if (str == null) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

/** Render a text array for Postgres: ARRAY['A','B'] or NULL. */
function pgArray(arr) {
  if (!arr || arr.length === 0) return 'NULL';
  return 'ARRAY[' + arr.map(v => esc(v)).join(',') + ']';
}

/** Render a JSONB value or NULL. */
function pgJsonb(obj) {
  if (obj == null || Object.keys(obj).length === 0) return 'NULL';
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

/** Render an integer or NULL. */
function pgInt(n) {
  if (n == null) return 'NULL';
  return String(Math.round(n));
}

/** Render a boolean literal. */
function pgBool(b) {
  return b ? 'true' : 'false';
}

// ─── TRIGGER TYPE NORMALISER ──────────────────────────────────────────────────

/**
 * Map free-text triggerType strings from content.js to the DB enum values.
 * The content files use a variety of natural-language strings; this function
 * normalises them to the constraint: time_based | event_based | profile_based |
 * chat_signal | goal_comparison | manual
 */
function normaliseTriggerType(rawType) {
  const t = (rawType || '').toLowerCase();
  if (t.includes('goal comparison') || t.includes('goal_comparison'))  return 'goal_comparison';
  if (t.includes('chat_signal') || t.includes('chat signal')
    || t.includes('chat-detected') || t.includes('chat detected'))     return 'chat_signal';
  // Must check chat_signal before profile_based so "profile_based + chat-detected" → profile_based
  if (t.includes('profile'))                                            return 'profile_based';
  if (t.includes('event'))                                              return 'event_based';
  // "Automatic", "Automatic + optional confirmation", "Time-based + profile-based"
  if (t.includes('time') || t.includes('automatic'))                   return 'time_based';
  return 'time_based'; // sensible fallback
}

// ─── PATH PARSER ──────────────────────────────────────────────────────────────

/**
 * Parse the free-text `paths` field into an array of path letters,
 * or null (meaning "all paths").
 */
function parsePaths(rawPaths) {
  if (!rawPaths) return null;
  const p = rawPaths.toLowerCase();
  // Explicit all-paths variants
  if (p.startsWith('all paths')) return null;
  // Path B only
  if (p.includes('path b only') || p.includes('b only')) return ['B'];
  // Paths A and C
  if ((p.includes('path a') || p.includes('paths a'))
      && p.includes('c')) return ['A', 'C'];
  // Single path fallback
  const letters = [];
  if (p.includes('path a') || p.includes('paths a')) letters.push('A');
  if (p.includes('path b')) letters.push('B');
  if (p.includes('path c')) letters.push('C');
  return letters.length > 0 ? letters : null;
}

// ─── DOB OFFSET PARSER ────────────────────────────────────────────────────────

/**
 * Parse dob_offset_min and dob_offset_max (in days) from a triggerCondition string.
 * Returns { min: number|null, max: number|null }
 *
 * Patterns handled:
 *   "baby_dob + 0–2 days"              → min=0,  max=2
 *   "baby_dob + 24 hours"              → min=1,  max=1  (≈1 day)
 *   "baby_dob + 7 days"                → min=7,  max=7
 *   "baby_dob + 14 days; ..."          → min=14, max=14
 *   "baby_dob + 28–42 days"            → min=28, max=42
 *   "baby_dob + 42, 84, 180 days..."   → min=42  (first value, goal_comparison handles rest)
 *   "feeding_preference = ..., baby_dob + 0–3 days" → min=0, max=3
 */
function parseDobOffset(triggerCondition) {
  if (!triggerCondition) return { min: null, max: null };
  const cond = triggerCondition;

  // Hours → convert to days
  const hoursMatch = cond.match(/baby_dob\s*\+\s*(\d+)\s*hours?/i);
  if (hoursMatch) {
    const days = Math.ceil(parseInt(hoursMatch[1]) / 24) || 1;
    return { min: days, max: days };
  }

  // Range: "N–M days" or "N-M days"
  const rangeMatch = cond.match(/baby_dob\s*\+\s*(\d+)[–\-](\d+)\s*days?/i);
  if (rangeMatch) {
    return { min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
  }

  // Single value: "N days" (possibly followed by semicolon or comma)
  const singleMatch = cond.match(/baby_dob\s*\+\s*(\d+)\s*days?/i);
  if (singleMatch) {
    const d = parseInt(singleMatch[1]);
    return { min: d, max: d };
  }

  // List: "baby_dob + 42, 84, 180 days depending on goal" — use minimum
  const listMatch = cond.match(/baby_dob\s*\+\s*(\d+)(?:,\s*\d+)+\s*days?/i);
  if (listMatch) {
    const firstNum = parseInt(listMatch[1]);
    return { min: firstNum, max: firstNum };
  }

  return { min: null, max: null };
}

// ─── PROFILE CONDITIONS BUILDER ───────────────────────────────────────────────

/**
 * Build a JSONB profile_conditions object from the triggerCondition string.
 * Only populated for profile_based triggers.
 */
function buildProfileConditions(entry) {
  const cond  = (entry.triggerCondition || '').toLowerCase();
  const type  = normaliseTriggerType(entry.triggerType);
  if (type !== 'profile_based') return null;

  const conditions = {};

  // feeding_preference (EP-specific entries)
  if (cond.includes('exclusive_pumping')) {
    conditions.feeding_preference = 'exclusive_pumping';
    // Include dob range if present
    const { min, max } = parseDobOffset(entry.triggerCondition);
    if (min != null) conditions.dob_offset_min = min;
    if (max != null) conditions.dob_offset_max = max;
  }

  // breast_anatomy contains
  const anatomyItems = [];
  if (cond.includes('breast_reduction'))   anatomyItems.push('breast_reduction');
  if (cond.includes('hypoplastic_breasts') || cond.includes('hypoplastic'))
                                            anatomyItems.push('hypoplastic_breasts');
  if (cond.includes('flat_nipples'))        anatomyItems.push('flat_nipples');
  if (cond.includes('inverted_nipples'))    anatomyItems.push('inverted_nipples');
  if (cond.includes('breast_implants'))     anatomyItems.push('breast_implants');
  if (cond.includes('breast_augmentation')) anatomyItems.push('breast_augmentation');
  if (anatomyItems.length > 0) conditions.breast_anatomy_contains = anatomyItems;

  // pump_model_set (AG-013)
  if (cond.includes('pump_model is set') || cond.includes('pump_model set')) {
    conditions.pump_model_set = true;
  }

  return Object.keys(conditions).length > 0 ? conditions : null;
}

// ─── CHAT SIGNAL KEYWORDS BUILDER ────────────────────────────────────────────

/**
 * Extract keyword hints from the triggerCondition for chat_signal triggers.
 * These are stored for reference / downstream NLP matching.
 */
function buildChatSignalKeywords(entry) {
  const type = normaliseTriggerType(entry.triggerType);
  if (type !== 'chat_signal') return null;

  const cond = (entry.triggerCondition || '').toLowerCase();

  // AG-016 — supply concern
  if (cond.includes('low supply') || cond.includes('supply dropping')
      || cond.includes('supply concern') || cond.includes('not enough milk')) {
    return ['low supply', 'not enough milk', 'supply dropping', 'supply concern',
            'not making enough', 'losing supply'];
  }
  // AG-017 — nipple/breast pain
  if (cond.includes('nipple pain') || cond.includes('breast pain')
      || cond.includes('sore') || cond.includes('cracked') || cond.includes('bleeding')) {
    return ['nipple pain', 'breast pain', 'sore nipple', 'cracked nipple',
            'bleeding nipple', 'pain during nursing', 'hurts to nurse'];
  }
  // AG-021 — EP supply concern / power pumping
  if (cond.includes('supply concern') && cond.includes('exclusive_pumping')) {
    return ['low output', 'supply plateau', 'not making enough',
            'output dropped', 'power pump', 'pumping more to increase'];
  }
  // ML chat-detected — extract keywords from triggerCondition prose
  const keywords = [];
  const raw = entry.triggerCondition || '';
  // Pull out quoted or "user mentions X, Y" fragments
  const mentionsMatch = raw.match(/User mentions?\s+([^;.]+)/i);
  if (mentionsMatch) {
    mentionsMatch[1].split(/,\s*|\s+or\s+|\s+and\s+/).forEach(kw => {
      const k = kw.trim().replace(/[^a-zA-Z0-9 \-_]/g, '');
      if (k.length > 2) keywords.push(k.toLowerCase());
    });
  }
  // Also check for "User selects... OR mentions..."
  const selectsMatch = raw.match(/mentions?\s+([^;.]+?)(?:\s*,|\s*$)/i);
  if (selectsMatch) {
    selectsMatch[1].split(/,\s*|\s+or\s+/).forEach(kw => {
      const k = kw.trim().replace(/[^a-zA-Z0-9 \-_]/g, '');
      if (k.length > 2 && !keywords.includes(k.toLowerCase()))
        keywords.push(k.toLowerCase());
    });
  }
  return keywords.length > 0 ? keywords : null;
}

// ─── GOAL THRESHOLD BUILDER ───────────────────────────────────────────────────

function buildGoalThreshold(entry) {
  const type = normaliseTriggerType(entry.triggerType);
  if (type !== 'goal_comparison') return null;
  // ML-025: "baby_dob exceeds user-stated goal by 7+ days" → the offset beyond goal
  const cond = (entry.triggerCondition || '').toLowerCase();
  if (cond.includes('7+ days') || cond.includes('7 days')) return 7;
  return 0;
}

// ─── PRIORITY CALCULATOR ──────────────────────────────────────────────────────

/**
 * Lower number = higher priority.  Time-based early items get slightly higher
 * priority than later or event-based ones.
 */
function calcPriority(entry, feature) {
  const base = DEFAULT_PRIORITY[feature] || 50;
  const { min } = parseDobOffset(entry.triggerCondition);
  if (min != null) {
    // Early triggers (first 7 days) → higher priority
    if (min <= 7)  return base - 10;
    if (min <= 14) return base - 5;
  }
  const type = normaliseTriggerType(entry.triggerType);
  if (type === 'chat_signal') return base + 5; // respond quickly but don't bump time-based
  return base;
}

// ─── MAIN: BUILD SQL ROWS ────────────────────────────────────────────────────

function buildTriggerRow(entry, feature) {
  const id           = entry.id;
  const triggerType  = normaliseTriggerType(entry.triggerType);
  const paths        = parsePaths(entry.paths);
  const { min, max } = parseDobOffset(entry.triggerCondition);
  const profileCond  = buildProfileConditions(entry);
  const chatKws      = buildChatSignalKeywords(entry);
  const goalThresh   = buildGoalThreshold(entry);
  const priority     = calcPriority(entry, feature);
  const held         = HOLD_IDS.has(id);

  return [
    `INSERT INTO companion_triggers`,
    `  (id, feature, trigger_type, paths, dob_offset_min, dob_offset_max,`,
    `   profile_conditions, chat_signal_keywords, goal_threshold_days, priority, held)`,
    `VALUES (`,
    `  ${esc(id)},`,
    `  ${esc(feature)},`,
    `  ${esc(triggerType)},`,
    `  ${pgArray(paths)},`,
    `  ${pgInt(min)},`,
    `  ${pgInt(max)},`,
    `  ${pgJsonb(profileCond)},`,
    `  ${pgArray(chatKws)},`,
    `  ${pgInt(goalThresh)},`,
    `  ${priority},`,
    `  ${pgBool(held)}`,
    `) ON CONFLICT (id) DO UPDATE SET`,
    `  feature = EXCLUDED.feature,`,
    `  trigger_type = EXCLUDED.trigger_type,`,
    `  paths = EXCLUDED.paths,`,
    `  dob_offset_min = EXCLUDED.dob_offset_min,`,
    `  dob_offset_max = EXCLUDED.dob_offset_max,`,
    `  profile_conditions = EXCLUDED.profile_conditions,`,
    `  chat_signal_keywords = EXCLUDED.chat_signal_keywords,`,
    `  goal_threshold_days = EXCLUDED.goal_threshold_days,`,
    `  priority = EXCLUDED.priority`,
    `  -- NOTE: held is intentionally NOT updated on conflict`,
    `  --       to preserve manual HOLD clearances.`,
    `;`,
    '',
  ].join('\n');
}

function buildContentRow(entry, feature) {
  const id = entry.id;

  // AG entries: headline + inAppMessage + learnMore + escalationText + sources
  // ML entries: name as headline + acknowledgment + shareCard + designNote
  const headline    = feature === 'AG'
    ? (entry.headline     || entry.name || '')
    : (entry.name         || '');
  const inAppMsg    = feature === 'AG'
    ? (entry.inAppMessage || '')
    : (entry.acknowledgment || '');
  const learnMore   = feature === 'AG' ? (entry.learnMore   || null) : null;
  const escalText   = feature === 'AG'
    ? (entry.escalation ? (entry.escalationText || null) : null)
    : null;
  const shareCard   = feature === 'AG' ? null : (entry.shareCard  || null);
  const sources     = feature === 'AG' ? (entry.sources || null) : null;
  const designNote  = feature === 'AG' ? null : (entry.designNote || null);

  // Path variants: ML entries with path-specific messages would use
  // in_app_message_path_b / in_app_message_path_c.
  // Those columns are seeded as NULL here; update via targeted migration
  // after writing path-variant messages for ML-003, ML-008, ML-012, ML-019.
  const pathB = null;
  const pathC = null;

  return [
    `INSERT INTO companion_content`,
    `  (trigger_id, headline, in_app_message, learn_more, escalation_text,`,
    `   share_card, sources, design_note, in_app_message_path_b, in_app_message_path_c)`,
    `VALUES (`,
    `  ${esc(id)},`,
    `  ${esc(headline)},`,
    `  ${esc(inAppMsg)},`,
    `  ${esc(learnMore)},`,
    `  ${esc(escalText)},`,
    `  ${esc(shareCard)},`,
    `  ${esc(sources)},`,
    `  ${esc(designNote)},`,
    `  ${esc(pathB)},`,
    `  ${esc(pathC)}`,
    `) ON CONFLICT (trigger_id) DO UPDATE SET`,
    `  headline              = EXCLUDED.headline,`,
    `  in_app_message        = EXCLUDED.in_app_message,`,
    `  learn_more            = EXCLUDED.learn_more,`,
    `  escalation_text       = EXCLUDED.escalation_text,`,
    `  share_card            = EXCLUDED.share_card,`,
    `  sources               = EXCLUDED.sources,`,
    `  design_note           = EXCLUDED.design_note`,
    `  -- NOTE: path_b and path_c variants are NOT overwritten here.`,
    `  --       Update them separately once variant copy is written.`,
    `;`,
    '',
  ].join('\n');
}

// ─── ENTRY POINT ─────────────────────────────────────────────────────────────

function main() {
  // Validate input files exist
  for (const f of [AG_FILE, ML_FILE]) {
    if (!fs.existsSync(f)) {
      console.error(`ERROR: Content file not found: ${f}`);
      console.error('Run from the repo root: node scripts/generate-companion-seed.js');
      process.exit(1);
    }
  }

  const agEntries = require(AG_FILE);
  const mlEntries = require(ML_FILE);

  console.log(`Loaded ${agEntries.length} AG entries, ${mlEntries.length} ML entries`);

  const triggerLines = [];
  const contentLines = [];

  const header = (label) => `-- ─── ${label} ${'─'.repeat(60 - label.length)}\n\n`;

  triggerLines.push('-- companion_triggers seed\n');
  triggerLines.push('-- Generated by scripts/generate-companion-seed.js\n');
  triggerLines.push(`-- Generated: ${new Date().toISOString()}\n`);
  triggerLines.push('-- DO NOT EDIT by hand — edit the content files and re-run the generator.\n\n');

  contentLines.push('-- companion_content seed\n');
  contentLines.push('-- Generated by scripts/generate-companion-seed.js\n');
  contentLines.push(`-- Generated: ${new Date().toISOString()}\n`);
  contentLines.push('-- DO NOT EDIT by hand — edit the content files and re-run the generator.\n\n');

  // AG triggers
  triggerLines.push(header('ANTICIPATORY GUIDANCE (AG) — 25 entries'));
  agEntries.forEach(entry => triggerLines.push(buildTriggerRow(entry, 'AG')));

  // ML triggers
  triggerLines.push(header('MILESTONE MEMORY (ML) — 27 entries'));
  mlEntries.forEach(entry => triggerLines.push(buildTriggerRow(entry, 'ML')));

  // AG content
  contentLines.push(header('ANTICIPATORY GUIDANCE (AG)'));
  agEntries.forEach(entry => contentLines.push(buildContentRow(entry, 'AG')));

  // ML content
  contentLines.push(header('MILESTONE MEMORY (ML)'));
  mlEntries.forEach(entry => contentLines.push(buildContentRow(entry, 'ML')));

  // Create seed dir
  if (!fs.existsSync(SEED_DIR)) {
    fs.mkdirSync(SEED_DIR, { recursive: true });
    console.log(`Created directory: ${SEED_DIR}`);
  }

  // Write files
  fs.writeFileSync(OUT_TRIG, triggerLines.join(''), 'utf8');
  fs.writeFileSync(OUT_CONT, contentLines.join(''), 'utf8');

  const trigSize = fs.statSync(OUT_TRIG).size;
  const contSize = fs.statSync(OUT_CONT).size;
  console.log(`Written: supabase/seed/companion_triggers.sql  (${(trigSize/1024).toFixed(1)} KB)`);
  console.log(`Written: supabase/seed/companion_content.sql   (${(contSize/1024).toFixed(1)} KB)`);

  // Summary
  const holdEntries = agEntries.filter(e => HOLD_IDS.has(e.id));
  if (holdEntries.length > 0) {
    console.log('\n⚠  HOLD items seeded with held = true (will NOT be queued to users):');
    holdEntries.forEach(e => console.log(`   ${e.id}: ${e.headline}`));
    console.log('\n   To clear a HOLD after review:');
    holdEntries.forEach(e => console.log(`   UPDATE companion_triggers SET held = false WHERE id = '${e.id}';`));
  }

  console.log('\nDone. Apply with migration 00011:');
  console.log('  \\i supabase/seed/companion_triggers.sql');
  console.log('  \\i supabase/seed/companion_content.sql');
}

main();
