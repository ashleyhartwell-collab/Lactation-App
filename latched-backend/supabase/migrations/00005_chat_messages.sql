-- Migration 00005: chat_messages table for persistent conversation history.
--
-- Stores one row per message (user or assistant) so the mobile app can render
-- a scrollable chat history. The semantic-search Edge Function writes both sides
-- of each exchange using the service role (bypasses RLS). The client reads
-- directly via the Supabase JS SDK using the user's JWT (RLS enforced).
--
-- Schema design:
--   role='user'      → content holds the raw typed question; results/matched/
--                      contradiction_warning are NULL.
--   role='assistant' → results (JSONB) holds the full results[] array;
--                      matched and contradiction_warning are set; content is NULL.

SET search_path TO extensions, public, pg_catalog;

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               uuid        REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id            text        NOT NULL,
  role                  text        NOT NULL CHECK (role IN ('user', 'assistant')),
  content               text,                  -- user's typed message (role='user')
  results               jsonb,                 -- semantic-search results[] (role='assistant')
  matched               boolean,               -- role='assistant' only
  contradiction_warning text,                  -- role='assistant' only, null if none
  created_at            timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.chat_messages IS
  'Persistent conversation history for the Quick Chat feature. One row per message turn.';
COMMENT ON COLUMN public.chat_messages.results IS
  'Full results[] JSON array from the semantic-search function. NULL for user messages.';
COMMENT ON COLUMN public.chat_messages.session_id IS
  'Client-generated session UUID grouping messages into a single conversation.';

-- Fast retrieval of a user's full history, newest first.
CREATE INDEX chat_messages_user_created_idx
  ON public.chat_messages (user_id, created_at DESC);

-- Fast retrieval of a single session (for in-app chat restore).
CREATE INDEX chat_messages_session_idx
  ON public.chat_messages (session_id, created_at ASC);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Clients can SELECT their own messages (user_id = auth.uid()).
-- INSERT/UPDATE/DELETE are performed exclusively by the service role (Edge
-- Functions) — no client-side write policies needed.
-- ---------------------------------------------------------------------------
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can read own messages"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = user_id);
