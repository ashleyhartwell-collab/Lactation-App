-- Migration 00003: drop the per-FAQ embedding column from faq_entries.
-- Embeddings now live in faq_variants (one per question variant).
-- The HNSW index on faq_entries.embedding is also removed.

SET search_path TO extensions, public, pg_catalog;

DROP INDEX IF EXISTS public.faq_entries_embedding_hnsw;
ALTER TABLE public.faq_entries DROP COLUMN IF EXISTS embedding;
