-- Migration 00002: add per-variant embeddings table and update match_faq RPC.
-- Each FAQ row now has up to 6 separately-embedded question variants stored in
-- faq_variants. match_faq now searches faq_variants and returns the best-scoring
-- parent FAQ using DISTINCT ON, fixing both the HIGH-threshold miss (score 0.819)
-- and cross-intent recall issues.

SET search_path TO extensions, public, pg_catalog;

-- ---------------------------------------------------------------------------
-- faq_variants: one row per question variant, one embedding per variant.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faq_variants (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_id        uuid        NOT NULL REFERENCES public.faq_entries(id) ON DELETE CASCADE,
  variant_text  text        NOT NULL,
  embedding     vector(1536) NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.faq_variants IS
  'Per-variant embeddings for FAQ entries. Each row is one question phrasing with its own text-embedding-3-small vector.';

CREATE INDEX faq_variants_faq_id_idx ON public.faq_variants (faq_id);

-- HNSW index for fast approximate-nearest-neighbor cosine search on variants.
CREATE INDEX faq_variants_embedding_hnsw
  ON public.faq_variants
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

ALTER TABLE public.faq_variants ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- match_faq (v2): searches faq_variants, returns top-K unique parent FAQs.
-- DISTINCT ON selects the best-scoring variant per FAQ, then the outer query
-- sorts by that score and limits to match_count.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.match_faq(
  query_embedding vector(1536),
  match_count     int DEFAULT 5
)
RETURNS TABLE (
  id                  uuid,
  external_id         text,
  category            text,
  answer              text,
  escalation_trigger  boolean,
  escalation_text     text,
  confidence_tier     text,
  cosine_score        double precision
)
LANGUAGE sql STABLE
AS $$
  SELECT * FROM (
    SELECT DISTINCT ON (fe.id)
      fe.id,
      fe.external_id,
      fe.category,
      fe.answer,
      fe.escalation_trigger,
      fe.escalation_text,
      fe.confidence_tier,
      1 - (fv.embedding <=> query_embedding) AS cosine_score
    FROM public.faq_variants fv
    JOIN public.faq_entries fe ON fe.id = fv.faq_id
    ORDER BY fe.id, fv.embedding <=> query_embedding   -- pick closest variant per FAQ
  ) ranked
  ORDER BY cosine_score DESC
  LIMIT match_count;
$$;
