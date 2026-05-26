# latched-backend

Supabase backend for the Latched lactation support app.

## What this is

FAQ embedding pipeline and semantic search API. Takes the Latched FAQ CSV, generates vector embeddings via OpenAI, stores them in Supabase + pgvector, and exposes a semantic search Edge Function that powers the Quick Chat feature.

## Architecture

```
smart-faq.csv ──► scripts/embed-faq.js ──► faq_entries (pgvector 1536-d)
                                                  ▲
mobile client ──► semantic-search Edge Function ──┤
                  │ embed question via OpenAI     │
                  │ cosine search via match_faq   │
                  │ apply confidence tier         │
                  └─► query_log + unmatched_questions
```

Confidence tiers applied by the Edge Function:

| Tier   | Cosine similarity | Behavior                                                    |
|--------|-------------------|-------------------------------------------------------------|
| HIGH   | ≥ 0.82            | Return answer.                                              |
| MEDIUM | 0.65 – 0.81       | Return answer + caveat. **`Bras & Hands-Free` excluded.**   |
| LOW    | < 0.65            | Log to `unmatched_questions`, return `{ matched: false }`.  |

`Bras & Hands-Free` is fit-sensitive enough that medium-confidence guidance is downgraded to LOW.

## Prerequisites

- Node.js ≥ 18
- [Supabase CLI](https://supabase.com/docs/guides/cli) (`brew install supabase/tap/supabase`)
- A Supabase project (or `supabase start` for local Postgres)
- An OpenAI API key

## Setup

```bash
# 1. Install deps
npm install

# 2. Configure env
cp .env.example .env
#   fill in SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY

# 3. Apply the migration
#    Local:
supabase start
supabase db reset
#    Hosted:
supabase link --project-ref <your-project-ref>
supabase db push

# 4. Embed the FAQ CSV
npm run embed:dry      # parses CSV, prints first rows, no API calls / writes
npm run embed          # real run: embeds + upserts ~100 rows

# 5. Run the Edge Function locally
npm run functions:serve
#    or deploy:
npm run functions:deploy
```

## Calling the Edge Function

```bash
curl -X POST http://127.0.0.1:54321/functions/v1/semantic-search \
  -H "Content-Type: application/json" \
  -d '{
    "question": "how do I know if my baby has a good latch?",
    "session_id": "demo-session-1",
    "user_id": "demo-user-1"
  }'
```

Response shapes:

```jsonc
// HIGH confidence
{ "matched": true,  "faq_id": "...", "answer": "...", "confidence_tier": "HIGH", "cosine_score": 0.91 }

// MEDIUM confidence
{ "matched": true,  "faq_id": "...", "answer": "...", "confidence_tier": "MEDIUM",
  "cosine_score": 0.73, "caveat": "This is general guidance — your situation may be different..." }

// LOW confidence (also logged to unmatched_questions)
{ "matched": false }
```

## Layout

```
latched-backend/
├── package.json
├── .env.example
├── scripts/
│   └── embed-faq.js                  # CSV → OpenAI embeddings → faq_entries
└── supabase/
    ├── config.toml
    ├── migrations/
    │   └── 00001_init.sql            # pgvector, tables, HNSW index, match_faq RPC
    └── functions/
        └── semantic-search/
            └── index.ts              # POST endpoint with tiered confidence logic
```

## Database

- `faq_entries` — one row per FAQ, with `embedding vector(1536)` and an HNSW cosine index.
- `query_log` — every Quick Chat request (matched or not) for analytics.
- `unmatched_questions` — LOW-tier questions queued for IBCLC review and content gap-filling.
- `match_faq(query_embedding, match_count)` — RPC that returns top-K with cosine similarity (not distance) so the Function can apply tier thresholds directly.

RLS is enabled on all three tables. The Edge Function uses the service role key and bypasses RLS; mobile clients should never read these tables directly.

## Re-embedding

When the CSV changes, just re-run `npm run embed`. The upsert is keyed on `external_id` (e.g. `LAT-001`), so existing rows update in place and new rows are inserted.
