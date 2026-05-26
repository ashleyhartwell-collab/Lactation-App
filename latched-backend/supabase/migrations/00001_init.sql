SET search_path TO extensions, public, pg_catalog;

-- Latched: FAQ embeddings + semantic search schema.
-- pgvector powers the cosine-similarity search backing the Quick Chat feature.

create extension if not exists vector with schema extensions;
create extension if not exists "pgcrypto" with schema extensions;

-- ---------------------------------------------------------------------------
-- faq_entries: one row per FAQ, with a precomputed 1536-dim embedding.
-- ---------------------------------------------------------------------------
create table public.faq_entries (
  id                  uuid primary key default gen_random_uuid(),
  external_id         text unique not null,
  category            text not null,
  question_variants   text[] not null default '{}',
  answer              text not null,
  embedding           vector(1536),
  escalation_trigger  boolean not null default false,
  escalation_text     text,
  confidence_tier     text,
  advisor_reviewed    boolean not null default false,
  created_at          timestamptz not null default now()
);

comment on table public.faq_entries is
  'Pre-written FAQ answers with OpenAI text-embedding-3-small vectors for semantic search.';
comment on column public.faq_entries.external_id is
  'Stable ID from smart-faq.csv (e.g. LAT-001). Used as upsert key.';
comment on column public.faq_entries.embedding is
  'OpenAI text-embedding-3-small vector of the joined question_variants.';

-- HNSW index for fast approximate-nearest-neighbor cosine search.
-- vector_cosine_ops makes <=> the cosine *distance* operator (1 - cosine similarity).
create index faq_entries_embedding_hnsw
  on public.faq_entries
  using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

create index faq_entries_category_idx on public.faq_entries (category);

-- ---------------------------------------------------------------------------
-- unmatched_questions: logged when the best match is below the LOW threshold.
-- Drives the human-review queue for filling content gaps.
-- ---------------------------------------------------------------------------
create table public.unmatched_questions (
  id              uuid primary key default gen_random_uuid(),
  session_id      text,
  user_id         text,
  raw_question    text not null,
  cosine_score    double precision,
  closest_faq_id  uuid references public.faq_entries(id) on delete set null,
  created_at      timestamptz not null default now(),
  reviewed        boolean not null default false
);

create index unmatched_questions_reviewed_idx
  on public.unmatched_questions (reviewed, created_at desc);

-- ---------------------------------------------------------------------------
-- query_log: every Quick Chat request, for analytics and tuning thresholds.
-- ---------------------------------------------------------------------------
create table public.query_log (
  id                uuid primary key default gen_random_uuid(),
  session_id        text,
  user_id           text,
  raw_question      text not null,
  matched           boolean not null,
  faq_id            uuid references public.faq_entries(id) on delete set null,
  confidence_tier   text,
  cosine_score      double precision,
  created_at        timestamptz not null default now()
);

create index query_log_created_at_idx on public.query_log (created_at desc);
create index query_log_faq_id_idx on public.query_log (faq_id);

-- ---------------------------------------------------------------------------
-- match_faq: RPC used by the Edge Function. Returns the top-K nearest FAQs
-- with cosine similarity (not distance) so the Function can apply tiers.
-- ---------------------------------------------------------------------------
create or replace function public.match_faq(
  query_embedding vector(1536),
  match_count int default 5
)
returns table (
  id              uuid,
  external_id     text,
  category        text,
  answer          text,
  escalation_trigger boolean,
  escalation_text text,
  confidence_tier text,
  cosine_score    double precision
)
language sql stable
as $$
  select
    f.id,
    f.external_id,
    f.category,
    f.answer,
    f.escalation_trigger,
    f.escalation_text,
    f.confidence_tier,
    1 - (f.embedding <=> query_embedding) as cosine_score
  from public.faq_entries f
  where f.embedding is not null
  order by f.embedding <=> query_embedding
  limit match_count;
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- The Edge Function uses the service role (bypasses RLS). Mobile clients
-- only ever read FAQ content via the Function, never the table directly.
-- ---------------------------------------------------------------------------
alter table public.faq_entries          enable row level security;
alter table public.unmatched_questions  enable row level security;
alter table public.query_log            enable row level security;
