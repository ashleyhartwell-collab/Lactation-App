-- Migration 00011: Companion Layer tables — Anticipatory Guidance, Milestone Memory,
-- Daily Check-In.
--
-- Creates five new tables:
--   companion_triggers        — seeded lookup: one row per AG/ML entry
--   companion_content         — message text for each trigger (1:1 with companion_triggers)
--   pending_companion_items   — per-user queue of items ready to show
--   companion_signals         — NLP side-effects from semantic-search (chat signals)
--   daily_checkins            — one mood log per user per calendar day
--
-- Adds three columns to user_profiles:
--   feeding_goal              — user's stated breastfeeding goal (enum string)
--   feeding_goal_days         — resolved numeric value for goal-comparison triggers
--   companion_enabled         — opt-out flag (default true)
--
-- RLS is enabled on all tables; policies are in migration 00012.
-- Seed data is applied in migration 00013.
--
-- NOTE on feeding_preference mapping:
--   The existing user_profiles.feeding_preference CHECK constraint uses the values
--   ('breastfeeding', 'pumping', 'combo', 'formula').  The companion layer content
--   uses the path labels A (breastfeeding), B (pumping/EP), C (combo).
--   The evaluate-companion-triggers edge function maps:
--     'breastfeeding' → path A
--     'pumping'       → path B  (treated as exclusive pumping for companion purposes)
--     'combo'         → path C
--   No change to the feeding_preference constraint is required for v1.

SET search_path TO extensions, public, pg_catalog;


-- ─── companion_triggers ────────────────────────────────────────────────────────
-- Pre-seeded, immutable at runtime.  Updated only via migration when the
-- AG or ML library is revised.

CREATE TABLE IF NOT EXISTS public.companion_triggers (
  id                    text        PRIMARY KEY,              -- 'AG-001', 'ML-005', etc.
  feature               text        NOT NULL
                          CHECK (feature IN ('AG', 'ML')),
  trigger_type          text        NOT NULL
                          CHECK (trigger_type IN (
                            'time_based', 'event_based', 'profile_based',
                            'chat_signal', 'goal_comparison', 'manual'
                          )),

  -- Path restriction: NULL = all paths; ARRAY['A','B','C'] = specific paths only
  paths                 text[],

  -- Time-based: days from baby_dob when this trigger becomes eligible
  dob_offset_min        int,
  dob_offset_max        int,

  -- Profile-based: JSONB conditions checked against user_profiles
  --   e.g. {"feeding_preference":"pumping"} or {"breast_anatomy_contains":["breast_reduction"]}
  profile_conditions    jsonb,

  -- Chat-signal: keyword list for NLP matching in semantic-search
  chat_signal_keywords  text[],

  -- Goal-comparison: days past feeding_goal_days that trigger fires
  --   0 = on goal day; 7 = 7 days past goal (for ML-025 "extended past goal")
  goal_threshold_days   int,

  -- Priority: lower = higher priority when multiple items are pending
  priority              int         NOT NULL DEFAULT 50,

  -- HOLD flag: true = never queue, awaiting clinical review
  held                  boolean     NOT NULL DEFAULT false,

  created_at            timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.companion_triggers IS
  'Seeded lookup table — one row per Anticipatory Guidance or Milestone Memory entry. '
  'Immutable at runtime; update only via migration. '
  'held = true items are never queued to users until manually cleared.';

COMMENT ON COLUMN public.companion_triggers.held IS
  'HOLD flag. Set true for entries awaiting clinical review. '
  'Clear with: UPDATE companion_triggers SET held = false WHERE id = ''AG-016'';';

-- Index for fast path + trigger_type filtering in evaluate-companion-triggers
CREATE INDEX IF NOT EXISTS companion_triggers_feature_type_idx
  ON public.companion_triggers (feature, trigger_type)
  WHERE held = false;

CREATE INDEX IF NOT EXISTS companion_triggers_dob_range_idx
  ON public.companion_triggers (dob_offset_min, dob_offset_max)
  WHERE trigger_type = 'time_based' AND held = false;

CREATE INDEX IF NOT EXISTS companion_triggers_chat_signal_idx
  ON public.companion_triggers USING gin (chat_signal_keywords)
  WHERE trigger_type = 'chat_signal' AND held = false;


-- ─── companion_content ─────────────────────────────────────────────────────────
-- One row per companion_trigger (1:1).  Stores the full display copy.
-- Path variant columns (path_b, path_c) start NULL and are populated via
-- targeted update once variant copy is written for ML-003, ML-008, ML-012, ML-019.

CREATE TABLE IF NOT EXISTS public.companion_content (
  trigger_id              text        PRIMARY KEY
                            REFERENCES public.companion_triggers(id)
                            ON DELETE CASCADE,

  headline                text        NOT NULL,   -- AG: headline; ML: milestone name
  in_app_message          text        NOT NULL,   -- AG: inAppMessage; ML: acknowledgment

  -- AG-only fields (NULL for ML entries)
  learn_more              text,
  escalation_text         text,
  sources                 text,

  -- ML-only fields (NULL for AG entries)
  share_card              text,
  design_note             text,

  -- Path variant overrides: if non-null, used instead of in_app_message for that path.
  -- Required before QA for: ML-003, ML-008, ML-012, ML-019.
  in_app_message_path_b   text,
  in_app_message_path_c   text
);

COMMENT ON TABLE public.companion_content IS
  'Display copy for each companion trigger (1:1 with companion_triggers). '
  'Path variant columns start NULL — populate them once variant copy is written.';

COMMENT ON COLUMN public.companion_content.in_app_message_path_b IS
  'Path B (pumping) override for in_app_message. '
  'Required for ML-003, ML-008, ML-012, ML-019 before end-to-end QA.';

COMMENT ON COLUMN public.companion_content.in_app_message_path_c IS
  'Path C (combo feeding) override for in_app_message. '
  'Required for ML-003, ML-008, ML-012, ML-019 before end-to-end QA.';


-- ─── pending_companion_items ───────────────────────────────────────────────────
-- Per-user queue populated by evaluate-companion-triggers.
-- Consumed by the React client at app open.

CREATE TABLE IF NOT EXISTS public.pending_companion_items (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trigger_id      text        NOT NULL REFERENCES public.companion_triggers(id),
  feature         text        NOT NULL CHECK (feature IN ('AG', 'ML')),

  created_at      timestamptz NOT NULL DEFAULT now(),
  shown_at        timestamptz,           -- NULL = not yet surfaced to the user
  dismissed_at    timestamptz,
  expanded_at     timestamptz,           -- user tapped "learn more" / saw full card

  -- One item per trigger per user — prevents duplicate queueing
  UNIQUE (user_id, trigger_id)
);

COMMENT ON TABLE public.pending_companion_items IS
  'Queue of companion items ready to show a specific user. '
  'Populated by evaluate-companion-triggers; consumed by React client at app open.';

-- Critical index: get-companion-item fetches the highest-priority unshown item
CREATE INDEX IF NOT EXISTS pending_companion_items_user_unshown_idx
  ON public.pending_companion_items (user_id, feature, created_at)
  WHERE shown_at IS NULL;

-- Index for the evaluate-companion-triggers de-dup check
CREATE INDEX IF NOT EXISTS pending_companion_items_user_trigger_idx
  ON public.pending_companion_items (user_id, trigger_id);


-- ─── companion_signals ─────────────────────────────────────────────────────────
-- Side-effect written by the semantic-search edge function when NLP detects
-- a chat_signal keyword in a user turn.
-- Read by evaluate-companion-triggers on the next evaluation cycle.

CREATE TABLE IF NOT EXISTS public.companion_signals (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_key      text        NOT NULL,  -- e.g. 'mastitis_resolved', 'first_latch'
  source_turn_id  uuid,                  -- FK to chat_messages.id if available
  created_at      timestamptz NOT NULL DEFAULT now(),
  processed_at    timestamptz,           -- NULL = not yet evaluated by cron

  -- One unprocessed signal per type per user (deduplicate concurrent writes)
  UNIQUE (user_id, signal_key)
);

COMMENT ON TABLE public.companion_signals IS
  'NLP side-effects from semantic-search. Written fire-and-forget when a chat '
  'turn contains a companion signal keyword. Processed by evaluate-companion-triggers.';

CREATE INDEX IF NOT EXISTS companion_signals_user_unprocessed_idx
  ON public.companion_signals (user_id, signal_key)
  WHERE processed_at IS NULL;


-- ─── daily_checkins ────────────────────────────────────────────────────────────
-- One mood log per user per calendar day (max one per day enforced by UNIQUE).
-- Written by the log-checkin edge function.

CREATE TABLE IF NOT EXISTS public.daily_checkins (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  checkin_date    date        NOT NULL DEFAULT current_date,
  mood            text        NOT NULL
                    CHECK (mood IN ('struggling', 'hanging_in', 'good_day', 'small_win')),
  notes           text,                  -- optional free-text from "tell me about it"
  created_at      timestamptz NOT NULL DEFAULT now(),

  UNIQUE (user_id, checkin_date)
);

COMMENT ON TABLE public.daily_checkins IS
  'Single-tap mood pulse, one per user per calendar day. '
  'Mood: struggling | hanging_in | good_day | small_win.';

CREATE INDEX IF NOT EXISTS daily_checkins_user_date_idx
  ON public.daily_checkins (user_id, checkin_date DESC);


-- ─── user_profiles additions ───────────────────────────────────────────────────
-- These columns support goal-comparison triggers and companion feature opt-out.

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS feeding_goal      text
    CHECK (feeding_goal IN (
      '6_weeks', '3_months', '6_months', 'as_long_as_works', 'unsure'
    )),
  ADD COLUMN IF NOT EXISTS feeding_goal_days int
    CHECK (feeding_goal_days > 0),
  ADD COLUMN IF NOT EXISTS companion_enabled boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN public.user_profiles.feeding_goal IS
  'User-stated breastfeeding goal captured during onboarding. '
  'Enum: 6_weeks | 3_months | 6_months | as_long_as_works | unsure. '
  'NULL = not yet captured.';

COMMENT ON COLUMN public.user_profiles.feeding_goal_days IS
  'Derived numeric day-count from feeding_goal, set by upsert-profile. '
  'Used by evaluate-companion-triggers for goal-comparison logic. '
  'Mapping: 6_weeks=42, 3_months=84, 6_months=180, as_long_as_works=9999, unsure=9999.';

COMMENT ON COLUMN public.user_profiles.companion_enabled IS
  'Opt-out flag for the companion layer. Default true. '
  'Set false to suppress all AG, Milestone Memory, and Check-In prompts.';

-- Index for fast filtering in evaluate-companion-triggers
CREATE INDEX IF NOT EXISTS user_profiles_companion_enabled_idx
  ON public.user_profiles (id)
  WHERE companion_enabled = true;
