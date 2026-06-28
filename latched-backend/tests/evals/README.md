# Semantic Search Eval — Golden Set

Labeled regression suite for the [semantic-search Edge Function](../../supabase/functions/semantic-search/index.ts). One record per test question; runner posts each question to the function and asserts against expected matches, tiers, and decomposition.

## Files

| File | Purpose |
|---|---|
| `golden-set.schema.json` | JSON Schema for a single record. Validates the seed file and any additions. |
| `golden-set.seed.jsonl` | Starter set (20 records) covering the 9 test slices. Append-only — never reuse IDs. |

## Test slices

| `test_type` | What it guards against |
|---|---|
| `direct` | Embedding pipeline broke / FAQ row missing. Should always be HIGH. |
| `paraphrase` | Over-tuning to FAQ variant phrasings. |
| `synonym` | Failure on colloquial language (moms don't say "lipstick nipple"). |
| `compound` | Decomposer merging multi-part questions into one bad query. |
| `edge_case` | Wrong FAQ winning among confusable neighbors (mastitis vs. plugged duct). |
| `off_topic` | Function returning *anything* for unrelated input. |
| `bras_downgrade` | The `Bras & Hands-Free` → LOW rule silently breaking. |
| `low_confidence` | Function returning a match for pathologically vague input. |
| `anatomy_context` | `user_profile` context not actually shaping decomposition. |

## Metrics worth tracking

- **Top-1 accuracy** per slice (and overall)
- **Tier confusion matrix** — predicted vs. expected (HIGH / MEDIUM / NONE)
- **Bras downgrade compliance** — false-positive rate on `bras_downgrade` slice
- **Decomposition fidelity** (compound slice only) — LLM-as-judge: do produced sub-questions semantically cover `expected_sub_questions`?
- **Off-topic rejection rate** — % of `off_topic` + `low_confidence` cases returning `matched: false`
- **Escalation precision/recall** — for records with `expect_escalation: true`

## Growing the set

- Target ~150–200 records before treating numbers as stable.
- Each new FAQ row should add ≥3 golden records: 1 direct, 1 paraphrase, 1 confusable-neighbor.
- Pull real unmatched questions from `unmatched_questions` table weekly; label the genuine gaps as new golden records (with `expected_matches: []` if still no FAQ exists).
- IBCLC review: any record marked with a medical claim needs sign-off before it gates a release.

## Running

```bash
npm run eval                                # default golden-set.seed.jsonl
node scripts/run-eval.js path/to/set.jsonl  # custom set
EVAL_INCLUDE_ANATOMY=1 npm run eval         # opt in (writes to user_profiles)
EVAL_CONCURRENCY=8 npm run eval             # default 4
```

Runner hits `SUPABASE_URL/functions/v1/semantic-search` (same env as `npm test`). Prints a per-slice table, lists failures, and writes raw results to `tests/evals/runs/{timestamp}.jsonl` for later upload to Arize. Exit code is non-zero if any record fails.

The persisted JSONL is shaped for Arize experiment ingestion — one row per record with `id`, `expected_matches`, `response`, `pass`, `top1`, `tier_ok`, `failures`. The [arize-experiment](../../.agents/skills/arize-experiment) skill handles the upload.
