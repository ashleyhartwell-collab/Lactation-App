# Trusted Friend — Backend Implementation Plan

**Author:** Senior Engineer review (Dispatch session, 2026-05-31)  
**Scope:** Anticipatory Guidance (25 entries), Milestone Memory (27 entries), Daily Check-In  
**Stack:** Supabase (Postgres + Edge Functions, Deno), existing latched-backend repo  
**Prerequisite reading:** `technical-design-v1.md` Section 8, `anticipatory-guidance-library.docx`, `milestone-memory-library.docx`

---

## 1. Engineering Assessment

### What we're actually building

Three features that all converge on one pattern: **evaluate conditions → queue an item → serve it on app open**. The companion layer is fundamentally a rules-based notification system layered on existing profile data, with NLP side-effects from the chat pipeline. There is no new AI inference path. There is no new payment flow. There is no user-generated content at v1.

**Complexity is moderate and mostly in two places:**
1. The trigger evaluation function — getting the conditional logic right across all 52 triggers without missing edge cases
2. The seed data pipeline — making the JS content files the authoritative source so the Word docs and the database stay in sync

Everything else is standard Supabase CRUD.

### Dependency map

```
New tables (migration)
    ↓
Seed script (companion_triggers + companion_content)
    ↓
upsert-profile update (add feeding_goal)
    ↓
semantic-search update (add detectCompanionSignals side-effect)
    ↓
evaluate-companion-triggers (new edge function + cron job)
    ↓
get-companion-item (new edge function)
    ↓
dismiss-companion-item (new edge function)
    ↓
log-checkin (new edge function)
    ↓
Lovable wiring (React side — see lovable-trusted-friend.md)
```

---

## 2. Migration Plan

### Migration 00009 — Companion layer tables

```sql
-- companion_triggers: seeded lookup table (one row per AG/ML entry)
CREATE TABLE companion_triggers (
  id                    text PRIMARY KEY,
  feature               text NOT NULL CHECK (feature IN ('AG','ML')),
  trigger_type          text NOT NULL CHECK (trigger_type IN (
                          'time_based','event_based','profile_based',
                          'chat_signal','goal_comparison','manual')),
  paths                 text[],               -- NULL = all paths
  dob_offset_min        int,
  dob_offset_max        int,
  profile_conditions    jsonb,
  chat_signal_keywords  text[],
  goal_threshold_days   int,
  priority              int NOT NULL DEFAULT 50,
  held                  boolean NOT NULL DEFAULT false,  -- HOLD items
  created_at            timestamptz DEFAULT now()
);

-- companion_content: message text for each trigger
CREATE TABLE companion_content (
  trigger_id            text PRIMARY KEY REFERENCES companion_triggers(id),
  headline              text NOT NULL,
  in_app_message        text NOT NULL,
  learn_more            text,
  escalation_text       text,
  share_card            text,
  sources               text,
  -- Path variants (NULL = use default; non-null overrides for specific paths)
  in_app_message_path_b text,
  in_app_message_path_c text
);

-- pending_companion_items: queue per user
CREATE TABLE pending_companion_items (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trigger_id    text NOT NULL REFERENCES companion_triggers(id),
  feature       text NOT NULL,
  created_at    timestamptz DEFAULT now(),
  shown_at      timestamptz,
  dismissed_at  timestamptz,
  expanded_at   timestamptz,
  UNIQUE (user_id, trigger_id)
);
CREATE INDEX idx_pending_companion_unshown
  ON pending_companion_items (user_id)
  WHERE shown_at IS NULL;

-- companion_signals: chat NLP side-effects
CREATE TABLE companion_signals (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_key    text NOT NULL,
  source_turn_id uuid,
  created_at    timestamptz DEFAULT now(),
  processed_at  timestamptz,
  UNIQUE (user_id, signal_key)
);

-- daily_checkins
CREATE TABLE daily_checkins (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  checkin_date  date NOT NULL DEFAULT current_date,
  mood          text NOT NULL CHECK (mood IN (
                  'struggling','hanging_in','good_day','small_win')),
  notes         text,
  created_at    timestamptz DEFAULT now(),
  UNIQUE (user_id, checkin_date)
);
CREATE INDEX idx_daily_checkins_user ON daily_checkins (user_id, checkin_date DESC);

-- user_profiles additions
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS feeding_goal      text,
  ADD COLUMN IF NOT EXISTS feeding_goal_days int,
  ADD COLUMN IF NOT EXISTS companion_enabled boolean NOT NULL DEFAULT true;
```

### Migration 00010 — RLS policies

```sql
ALTER TABLE pending_companion_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY pci_owner ON pending_companion_items FOR ALL USING (auth.uid() = user_id);

ALTER TABLE daily_checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY dc_owner ON daily_checkins FOR ALL USING (auth.uid() = user_id);

ALTER TABLE companion_signals ENABLE ROW LEVEL SECURITY;
CREATE POLICY cs_owner ON companion_signals FOR ALL USING (auth.uid() = user_id);

ALTER TABLE companion_triggers ENABLE ROW LEVEL SECURITY;
CREATE POLICY ct_public_read ON companion_triggers FOR SELECT USING (true);

ALTER TABLE companion_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY cc_public_read ON companion_content FOR SELECT USING (true);
```

### Migration 00011 — Seed data

Generated by `scripts/generate-companion-seed.js` from the content.js files. Structure:

```sql
INSERT INTO companion_triggers (id, feature, trigger_type, paths,
  dob_offset_min, dob_offset_max, profile_conditions,
  chat_signal_keywords, goal_threshold_days, priority, held)
VALUES
  ('AG-001', 'AG', 'time_based', NULL, 0, 2, NULL, NULL, NULL, 10, false),
  ('AG-016', 'AG', 'chat_signal', NULL, NULL, NULL, NULL,
   ARRAY['low supply','not enough milk','supply is dropping','running out of milk'],
   NULL, 30, false),
  ('AG-023', 'AG', 'profile_based', NULL, 5, 14,
   '{"breast_anatomy": ["breast_reduction","hypoplastic_breasts"]}',
   NULL, NULL, 20, true),  -- HELD
  -- ... all 52 entries
;

INSERT INTO companion_content (trigger_id, headline, in_app_message, learn_more,
  escalation_text, share_card, sources, in_app_message_path_b, in_app_message_path_c)
VALUES
  ('AG-001',
   'Colostrum: small amounts are exactly right',
   'Your baby''s stomach is the size of a marble right now...',
   'Colostrum is a concentrated, low-volume first milk...',
   'If your baby is not waking to feed at least every 3 hours...',
   NULL,
   'ABM Protocol #2; AAP 2022 breastfeeding policy; LLLI',
   NULL, NULL),
  -- ... all 52 entries
;
```

**Important:** The seed script must set `held = true` for AG-016 and AG-023 until IBCLC review is complete and Ashley unlocks them. A simple admin flag update suffices: `UPDATE companion_triggers SET held = false WHERE id = 'AG-016';`

---

## 3. Edge Function Specifications

### 3.1 `evaluate-companion-triggers` (new)

**File:** `latched-backend/supabase/functions/evaluate-companion-triggers/index.ts`

**Trigger:** Two invocation paths:
1. HTTP POST from client (app open, debounced 30 min per user server-side via last_evaluated_at in user_profiles)
2. Supabase pg_cron: `SELECT cron.schedule('evaluate-companion', '0 */6 * * *', $$SELECT net.http_post('https://[project].supabase.co/functions/v1/evaluate-companion-triggers', '{"mode":"batch"}', '{}')$$);`

**Batch mode:** When invoked from cron, iterate all users with `companion_enabled = true` and `baby_dob IS NOT NULL` and `baby_dob >= now() - interval '6 months'`. Process in batches of 50 with a short sleep between batches to avoid overwhelming the DB.

**Single-user mode:** When invoked from client (with JWT), process only the authenticated user.

**Core algorithm:** See TDD Section 8.3. Key implementation notes:
- `evaluateProfileCondition` needs to handle: `breast_anatomy` array contains, `pump_models` array not empty, `feeding_preference` match
- Time-based offsets use calendar days (not hours) — compare `current_date` to `baby_dob::date + offset`
- Goal comparison: qualify ML-024 when `baby_age_days >= feeding_goal_days`, ML-025 when `baby_age_days >= feeding_goal_days + 7`
- Never queue an item where `companion_triggers.held = true`

**Response:** `{ queued: number }` — count of items newly queued for this user.

---

### 3.2 `get-companion-item` (new)

**File:** `latched-backend/supabase/functions/get-companion-item/index.ts`

**Logic:**
```typescript
// 1. Get user_id from JWT
// 2. First: call evaluate-companion-triggers internally (single-user mode, debounced)
// 3. Query pending_companion_items
//    WHERE user_id = $1 AND shown_at IS NULL
//    JOIN companion_triggers ON trigger_id = companion_triggers.id
//    ORDER BY priority ASC, created_at ASC
//    LIMIT 1
// 4. If null → return { item: null }
// 5. Fetch companion_content for the trigger_id
// 6. Select path-specific variant if path_b/path_c content exists and matches user path
// 7. Interpolate [GOAL] placeholder with user's feeding_goal value
// 8. Return CompanionItem shape
```

**Personalization — goal interpolation:**
```typescript
function interpolateGoal(text: string, profile: UserProfile): string {
  const goalLabels: Record<string, string> = {
    '6_weeks': '6 weeks', '3_months': '3 months',
    '6_months': '6 months', 'as_long_as_works': 'as long as it works',
    'unsure': 'your goal'
  };
  return text.replace(/\[GOAL\]/g, goalLabels[profile.feeding_goal ?? ''] ?? 'your goal');
}
```

**Callback mechanic (v1 scope — check-in history only):**
When returning a milestone, query `daily_checkins` for the most recent "struggling" check-in within the last 14 days. If found and the milestone is ML-002 or later, prepend a callback line:

```typescript
if (recentStruggle && milestone.feature === 'ML') {
  item.body = `${daysAgo} days ago you said it felt hard. Look where you are now.\n\n${item.body}`;
}
```

---

### 3.3 `dismiss-companion-item` (new)

**File:** `latched-backend/supabase/functions/dismiss-companion-item/index.ts`

```typescript
// POST body: { item_id: string, action: 'shown' | 'dismissed' | 'expanded' }
// Validates item belongs to the authenticated user
// Updates pending_companion_items:
//   shown → shown_at = now()
//   dismissed → dismissed_at = now()
//   expanded → expanded_at = now()
// Returns { ok: true }
```

Track all three states for analytics — which milestones get expanded (positive signal) vs. dismissed without reading (design signal).

---

### 3.4 `log-checkin` (new)

**File:** `latched-backend/supabase/functions/log-checkin/index.ts`

```typescript
// POST body: { mood: string, notes?: string }
// 1. Check: has user already checked in today? If yes → return 409 with { already_submitted: true }
// 2. Insert into daily_checkins
// 3. Determine follow_up_message:
const FOLLOW_UPS = {
  struggling:    "That's a hard one. You're still here, which means you're still doing it. What would help right now — going to chat, or just knowing that?",
  hanging_in:    "Hanging in there is an honest answer. Take it one session at a time.",
  good_day:      "A good day is worth naming. Hold onto it.",
  small_win:     "Tell me about it — what happened?"
};
// 4. If mood === 'struggling': call get-companion-item internally and include if AG item pending
// 5. Return { follow_up_message, pending_ag_item?, already_submitted: false }
```

**Notes field for small_win:** When `notes` is non-empty and `mood === 'small_win'`, write a `companion_signals` entry for `signal_key = 'small_win_noted'`. This can trigger chat-detected milestones in future.

---

### 3.5 Updates to `semantic-search`

Add `detectCompanionSignals` as a fire-and-forget side-effect after the main response is assembled (does not block response time):

```typescript
// After line that writes to semantic_match_log, add:
if (user_id) {
  // Non-blocking — do not await
  detectCompanionSignals(user_id, question, supabase).catch(err =>
    console.error('[companion-signal]', err.message)
  );
}
```

Full `SIGNAL_MAP` is defined in TDD Section 8.4. Add it to a shared `constants.ts` file so it can be imported by both `semantic-search` and `evaluate-companion-triggers`.

---

### 3.6 Updates to `upsert-profile`

Add `feeding_goal` to the accepted body fields:

```typescript
interface UpsertBody {
  // ... existing fields ...
  feeding_goal?: '6_weeks' | '3_months' | '6_months' | 'as_long_as_works' | 'unsure';
}

// In upsertData:
feeding_goal: body.feeding_goal ?? existing?.feeding_goal,
feeding_goal_days: body.feeding_goal
  ? ({ '6_weeks':42,'3_months':84,'6_months':180,'as_long_as_works':9999,'unsure':9999 }[body.feeding_goal] ?? 9999)
  : existing?.feeding_goal_days,
```

---

## 4. Seed Script

**File:** `scripts/generate-companion-seed.js`

Reads `outputs/ag-build/content.js` and `outputs/ml-build/content.js` and outputs SQL insert statements for `companion_triggers` and `companion_content`. Run once before migration 00011 is applied.

Key transform: map content.js fields to DB columns
- `triggerCondition` → parse into `dob_offset_min/max`, `profile_conditions`, `chat_signal_keywords`
- `paths` text → array `['A','B','C']` based on content (e.g. "All paths" → NULL, "Path B only" → `['B']`)
- `escalation: false` → `escalation_text` = NULL
- HOLD items (AG-016, AG-023) → `held = true`

---

## 5. Implementation Sequence & Estimates

### Phase 1 — Foundation (3–4 days)

| Task | Est | Notes |
|---|---|---|
| Migrations 00009, 00010 | 2h | Tables + RLS |
| `upsert-profile` update (feeding_goal) | 1h | Small addition |
| Onboarding feeding_goal field (Lovable) | 2h | New required field before paywall |
| Seed script + migration 00011 | 4h | Generate SQL from content.js; set HOLD flags |
| Unit tests for seed data validation | 2h | Confirm all 52 entries load correctly |

### Phase 2 — Trigger engine (3–4 days)

| Task | Est | Notes |
|---|---|---|
| `evaluate-companion-triggers` edge function | 6h | Core algorithm + profile condition evaluation |
| `evaluate-companion-triggers` cron setup | 1h | pg_cron configuration |
| `semantic-search` companion signal detection | 2h | Fire-and-forget side-effect |
| `get-companion-item` edge function | 4h | Includes path variants + goal interpolation |
| `dismiss-companion-item` edge function | 1h | Simple update |

### Phase 3 — Check-in and UI (2–3 days)

| Task | Est | Notes |
|---|---|---|
| `log-checkin` edge function | 3h | Includes deduplication + follow-up logic |
| Lovable companion UI layer | Per lovable-trusted-friend.md | See separate brief |

### Phase 4 — Testing and holdgating (1–2 days)

| Task | Est | Notes |
|---|---|---|
| End-to-end trigger test (new user → app open → item delivered) | 2h | |
| Path variant testing (Path B, Path C, anatomy-flagged) | 2h | |
| HOLD flag test (AG-016, AG-023 never delivered) | 1h | |
| Chat signal detection test (10 signal keywords) | 2h | |
| Daily check-in deduplication test | 1h | |

**Total backend estimate: ~38–46 hours** assuming clean requirements and no blocking issues.

---

## 6. Open Questions for Ashley

1. **Cron cadence:** 6-hour evaluation is conservative. For a mom in her first 48 hours, triggers should fire faster. Consider: run the evaluator on every app open (debounced 30 min) AND every 6 hours via cron. The debounce prevents abuse while keeping time-sensitive AG items (AG-001, AG-002) fast.

2. **HOLD management:** Who can clear the HOLD flag for AG-016 and AG-023? Recommend: Ashley directly via Supabase dashboard `UPDATE companion_triggers SET held = false WHERE id = 'AG-016'` — no admin UI needed at v1. Document the step in ACTION-ITEMS.md.

3. **Callback mechanic depth at v1:** The plan scopes the callback to check-in history only (simple). Full chat-history callback requires storing early chat messages in a `chat_history` column on `user_profiles` or a separate indexed table — doable but ~4h additional engineering. Decision needed before Phase 2 starts.

4. **Analytics events:** Which companion events should be tracked in PostHog? Recommend minimum: `companion_item_shown`, `companion_item_expanded`, `companion_item_dismissed`, `checkin_submitted` (with mood property). These feed the retention dashboard Sofia mentioned.

5. **Milestone share mechanic:** Share cards are defined for all 27 ML entries. Sharing requires a URL or text deep-link that non-users can land on. Is a simple share-as-text (copy to clipboard) sufficient at v1, or do we want a rendered shareable card? The latter is a non-trivial design + engineering task — recommend text-only at v1.

