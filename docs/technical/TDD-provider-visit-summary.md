# Technical Design Document: Provider Visit Summary

**Feature:** Provider Visit Summary  
**PRD:** `docs/product/PRD-provider-visit-summary.md`  
**Date:** 2026-06-30  
**Status:** Draft  

---

## 1. Overview

This feature has two distinct workstreams that must ship together:

1. **Diaper tracker** — a new UI screen for logging daily wet and stool counts, backed by a new `diaper_logs` table. This is a prerequisite for the summary (users need ≥2 days of data).
2. **Provider Visit Summary** — a shareable PNG image generated client-side from `feeding_sessions` and `diaper_logs` data, surfaced at the top of the tracker screen and within four lesson pages.

Both workstreams are Lovable (React/TypeScript) builds with Supabase as the data layer. There is no new Edge Function required — all queries hit Supabase directly from the frontend via the JS client with RLS.

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend (Lovable)                 │
│                                                             │
│  DiapersTrackerScreen          ProviderSummaryGenerator     │
│  ├── DailyDiaperLogger         ├── useSummaryData() hook    │
│  │   └── upsert diaper_logs   │   ├── feeding_sessions RPC  │
│  └── "Generate summary" CTA   │   └── diaper_logs RPC       │
│                                ├── SummaryReportCanvas       │
│  Lesson pages (week 1/4/8,    │   ├── Recharts LineChart    │
│  escalation guide)            │   └── ThresholdConfig       │
│  └── FeedingSummaryCard       └── useShareReport() hook     │
│      (replaces placeholder)       └── Web Share API / DL   │
└──────────────────┬───────────────────────────┬──────────────┘
                   │                           │
         ┌─────────▼──────────┐    ┌──────────▼──────────┐
         │  feeding_sessions  │    │    diaper_logs       │
         │  (existing table)  │    │    (new table)       │
         └────────────────────┘    └─────────────────────┘
```

**Image generation approach:** Render the report into a hidden off-screen React subtree, then capture it to a PNG blob using `html2canvas`. This is the right choice for Lovable because:
- The chart (Recharts `LineChart`) renders as a React component — capturing a DOM node is simpler than re-implementing chart drawing on a raw Canvas
- `html2canvas` is a well-supported npm package that works in the PWA context
- No server round-trip; generation is instant on device

Trade-off: `html2canvas` can have issues with custom fonts and SVG cross-origin resources. Mitigate by using system fonts or inlining font-face in the report component, and by avoiding external image URLs (inline logo as base64 or SVG string).

---

## 3. Backend: Migration `00021_diaper_logs.sql`

Next migration after `00020`. Does not depend on `protocol_modules` — runs unconditionally.

```sql
-- 00021_diaper_logs.sql
-- Creates diaper_logs table for the Provider Visit Summary feature.
-- One row per user per calendar day. Written by the diaper tracker UI
-- via upsert (INSERT ... ON CONFLICT DO UPDATE).

SET search_path TO extensions, public, pg_catalog;

CREATE TABLE IF NOT EXISTS public.diaper_logs (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  logged_date   date        NOT NULL DEFAULT current_date,
  wet_count     smallint    NOT NULL DEFAULT 0 CHECK (wet_count >= 0),
  stool_count   smallint    NOT NULL DEFAULT 0 CHECK (stool_count >= 0),
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  -- Enforce one row per user per day; DailyDiaperLogger uses upsert
  UNIQUE (user_id, logged_date)
);

COMMENT ON TABLE public.diaper_logs IS
  'One row per user per calendar day of logged diaper output. '
  'Written via upsert by the diaper tracker UI. '
  'Read by the Provider Visit Summary report generator.';

-- Trigger: keep updated_at current (reuse existing function from 00004)
CREATE TRIGGER diaper_logs_updated_at
  BEFORE UPDATE ON public.diaper_logs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Index: per-user ordered by date — primary access pattern for the report
CREATE INDEX IF NOT EXISTS diaper_logs_user_date_idx
  ON public.diaper_logs (user_id, logged_date DESC);

-- RLS: mirror feeding_sessions policies exactly
ALTER TABLE public.diaper_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can read own diaper logs"
  ON public.diaper_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users can insert own diaper logs"
  ON public.diaper_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users can update own diaper logs"
  ON public.diaper_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "users can delete own diaper logs"
  ON public.diaper_logs FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 3b. Backend: Migration `00022_baby_display_name.sql`

Adds `baby_display_name` to `user_profiles`. Separate from `00021` for clarity — this column is also useful beyond the summary feature (lesson personalization, onboarding, etc.).

```sql
-- 00022_baby_display_name.sql
-- Adds baby_display_name to user_profiles.
-- display_name = user/parent name (existing).
-- baby_display_name = baby's name, captured during onboarding or profile setup.

SET search_path TO extensions, public, pg_catalog;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS baby_display_name text;

COMMENT ON COLUMN public.user_profiles.baby_display_name IS
  'Baby''s display name, set during onboarding or profile settings. '
  'NULL = not yet captured. Used in the Provider Visit Summary report header '
  'and anywhere the app personalizes content to the baby.';
```

**Note on capture point:** `baby_display_name` must be settable somewhere in the app before the summary feature can display it. Options in priority order:
1. Add a "Baby's name" field to the existing onboarding flow (preferred — capture it once at setup)
2. Add it to a profile/settings screen as an editable field
3. Prompt for it inline the first time a user generates a summary

The Lovable brief for the summary generator should defensively handle `NULL` — render the report header as "Feeding & Diaper Summary" (no baby name line) if `baby_display_name` is not set. This matches the P1 status of that story and avoids blocking the feature on onboarding changes.

---

## 4. Frontend Components

### 4.1 Diaper Tracker Screen — `DiapersTrackerScreen`

New top-level screen. Route: `/tracker/diapers` (or equivalent tracker tab route — match existing tracker routing convention).

**Layout:**
```
┌──────────────────────────────────┐
│  [Generate summary →]            │  ← primary CTA, top of screen
├──────────────────────────────────┤
│  Today — [date]                  │
│  Wet diapers:   [–] [ 4 ] [+]   │
│  Stool diapers: [–] [ 2 ] [+]   │
│  [Save]                          │
├──────────────────────────────────┤
│  Recent                          │
│  Jun 29  Wet: 6  Stool: 3        │
│  Jun 28  Wet: 5  Stool: 2        │
│  ...                             │
└──────────────────────────────────┘
```

**State:**
```typescript
interface DiaperLogState {
  selectedDate: string;       // ISO date, defaults to today
  wetCount: number;
  stoolCount: number;
  isSaving: boolean;
  recentLogs: DiaperLog[];    // last 7 days for the history list
}
```

**Write path:** On save, call Supabase upsert:
```typescript
await supabase
  .from('diaper_logs')
  .upsert(
    { user_id: userId, logged_date: selectedDate, wet_count: wetCount, stool_count: stoolCount },
    { onConflict: 'user_id,logged_date' }
  );
```

**"Generate summary" CTA:** Navigates to the summary generation flow (`/tracker/summary` or opens a modal — match app navigation pattern). Only enabled when the user has ≥2 days of `diaper_logs` data and ≥2 days of `feeding_sessions` data. Check this on screen load with a lightweight COUNT query; show a disabled state with tooltip if not enough data.

---

### 4.2 Summary Data Hook — `useSummaryData`

Custom hook that fetches and aggregates all data needed for the report. Called once when the user initiates summary generation.

```typescript
interface SummaryData {
  feedingMetrics: {
    totalSessions: number;
    totalMinutes: number;
    avgMinutesPerSession: number;
  };
  diaperSeries: Array<{
    date: string;           // 'YYYY-MM-DD'
    wetCount: number;
    stoolCount: number;
  }>;
  diaperMetrics: {
    avgWetPerDay: number;
    avgStoolPerDay: number;
  };
  dateRange: { start: string; end: string };
  babyAgeAtEndDays: number;   // for threshold lookup
  viewMode: 'daily' | 'weekly';  // daily if ≤14 days, weekly if >14
}
```

**Feeding query:**
```typescript
const { data: sessions } = await supabase
  .from('feeding_sessions')
  .select('duration_minutes, started_at')
  .eq('user_id', userId)
  .gte('started_at', startDate)
  .lte('started_at', endDate)
  .not('duration_minutes', 'is', null);

// Aggregate client-side:
const totalSessions = sessions.length;
const totalMinutes = sessions.reduce((sum, s) => sum + s.duration_minutes, 0);
const avgMinutesPerSession = totalSessions > 0
  ? Math.round(totalMinutes / totalSessions)
  : 0;
```

**Diaper query:**
```typescript
const { data: logs } = await supabase
  .from('diaper_logs')
  .select('logged_date, wet_count, stool_count')
  .eq('user_id', userId)
  .gte('logged_date', startDate)
  .lte('logged_date', endDate)
  .order('logged_date', { ascending: true });
```

**Weekly rollup** (when `viewMode === 'weekly'`): Group `diaperSeries` by ISO week (`date-fns/getISOWeek`), average the daily counts within each week. The chart x-axis label becomes `'Week of [MMM D]'`.

**Date range default:** `start = user_profiles.baby_dob`, `end = today`. Fetched from the user profile, which is already loaded in app context.

---

### 4.3 Threshold Config — `diaperThresholds.ts`

Static TypeScript config. No DB table. Age in days is calculated as `differenceInDays(reportEndDate, babyDob)`.

```typescript
interface ThresholdRow {
  minAgeDays: number;
  maxAgeDays: number;       // Infinity for open-ended last row
  minWetPerDay: number;
  minStoolPerDay: number;   // fractional values (e.g. 0.3 = once every ~3 days)
}

export const DIAPER_THRESHOLDS: ThresholdRow[] = [
  // Days 1–4: wet minimum scales with day of life
  // Handled separately in getThreshold() — special case
  { minAgeDays: 0,  maxAgeDays: 4,   minWetPerDay: -1, minStoolPerDay: 1 },
  { minAgeDays: 5,  maxAgeDays: 41,  minWetPerDay: 6,  minStoolPerDay: 3 },   // Day 5–6wks
  { minAgeDays: 42, maxAgeDays: 90,  minWetPerDay: 6,  minStoolPerDay: 1 },   // 6wks–3mo
  { minAgeDays: 91, maxAgeDays: Infinity, minWetPerDay: 4, minStoolPerDay: 0.3 }, // 3mo+
];

export function getThreshold(babyAgeDays: number): { minWet: number; minStool: number } {
  if (babyAgeDays <= 4) {
    // Day of life rule: min wet = current day number (day 1 = 1, day 2 = 2, etc.)
    // babyAgeDays 0 = day 1, 1 = day 2, etc.
    return { minWet: babyAgeDays + 1, minStool: 1 };
  }
  const row = DIAPER_THRESHOLDS.find(
    r => babyAgeDays >= r.minAgeDays && babyAgeDays < r.maxAgeDays
  )!;
  return { minWet: row.minWetPerDay, minStool: row.minStoolPerDay };
}

export function isBelowThreshold(
  avgWet: number,
  avgStool: number,
  babyAgeDays: number
): { wet: boolean; stool: boolean } {
  const { minWet, minStool } = getThreshold(babyAgeDays);
  return {
    wet: avgWet < minWet,
    stool: avgStool < minStool,
  };
}
```

Thresholds are applied to the **averages** shown in the stat callout. For the **chart**, shade any individual day where that day's count is below the threshold for the baby's age on that day (recalculate per data point using `differenceInDays(dataPointDate, babyDob)`).

---

### 4.4 Report Component — `SummaryReportCanvas`

A React component rendered **off-screen** into a fixed-size `div` (1080×1350px, `position: absolute; left: -9999px`). `html2canvas` captures this node to a PNG blob.

**Structure:**
```
SummaryReportCanvas (1080 × 1350px, bg white)
├── ReportHeader         (teal bg #4f9d9d, white text)
│   ├── Logo placeholder (grey box, 80×30px, text "LATCHED")
│   ├── Title: "Feeding & Diaper Summary"
│   ├── Subtitle: baby name if available, else omit
│   └── Timestamp + date range
├── FeedingSection       (white bg, left-padded)
│   ├── Section label: "FEEDING"
│   ├── Total sessions: N
│   ├── Total time: formatted
│   └── Avg per session: formatted
├── DiaperChartSection   (white bg)
│   ├── Section label: "DIAPERS"
│   ├── RechartsLineChart (see §4.5)
│   └── Stat row: "Avg wet/day: X [⚠]  ·  Avg stool/day: X [⚠]"
└── ReportFooter         (light grey bg)
    └── "Generated with Latched  ·  [date]"
```

**Typography:** Use Tailwind `font-sans` (system font stack) to avoid custom font loading issues with `html2canvas`. Do not use Google Fonts or any externally loaded font in this component.

**Colors:** Hardcode hex values (not Tailwind class names) inside this component — `html2canvas` does not resolve CSS variables. Use `#4f9d9d` (primary teal), `#f59e0b` (amber warning), `#dc2626` (red), `#ffffff`, `#f9fafb`.

---

### 4.5 Diaper Line Chart — `DiaperLineChart`

Uses Recharts `LineChart` (already in the Lovable stack). Rendered inside `SummaryReportCanvas`.

```typescript
<LineChart width={960} height={380} data={diaperSeries}>
  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
  <XAxis dataKey="date" tickFormatter={formatXLabel} />
  <YAxis allowDecimals={false} />
  
  {/* Threshold reference lines */}
  <ReferenceLine y={threshold.minWet}   stroke="#4f9d9d" strokeDasharray="6 3" label="Min wet" />
  <ReferenceLine y={threshold.minStool} stroke="#f59e0b" strokeDasharray="6 3" label="Min stool" />

  {/* Data lines */}
  <Line type="monotone" dataKey="wetCount"   stroke="#4f9d9d" strokeWidth={2} dot={false} name="Wet" />
  <Line type="monotone" dataKey="stoolCount" stroke="#f59e0b" strokeWidth={2} dot={false} name="Stool" />

  <Legend />
</LineChart>
```

**Below-threshold shading:** Use Recharts `ReferenceArea` to shade date ranges where that day's count is below threshold. Build the shaded ranges from `diaperSeries` before rendering:

```typescript
// Build wet below-threshold ranges
const wetBelowRanges = buildBelowThresholdRanges(diaperSeries, 'wetCount', threshold.minWet);
// Render one ReferenceArea per contiguous range
wetBelowRanges.map(range => (
  <ReferenceArea x1={range.start} x2={range.end} fill="#f59e0b" fillOpacity={0.15} />
))
```

**Weekly mode:** When `viewMode === 'weekly'`, `diaperSeries` contains weekly-averaged rows and `dataKey="date"` shows the week label. Use the threshold for the baby's age at the last day of the report.

---

### 4.6 Time Formatting Utility — `formatFeedTime`

```typescript
export function formatFeedTime(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
```

Used for both total time and avg per session.

---

### 4.7 Export Hook — `useShareReport`

```typescript
async function generateAndShare(reportRef: React.RefObject<HTMLDivElement>) {
  const canvas = await html2canvas(reportRef.current!, {
    scale: 2,            // retina-quality output
    useCORS: false,      // no external resources in the component
    backgroundColor: '#ffffff',
  });

  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const file = new File([blob], `latched-summary-${todayISO()}.png`, { type: 'image/png' });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Feeding & Diaper Summary' });
    } else {
      // Fallback: trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, 'image/png');
}
```

`scale: 2` produces a 2160×2700px output from the 1080×1350px component — sharp on retina displays.

**iOS/Android compatibility:** Web Share API with file sharing is supported on:
- iOS Safari 15.1+ (covers last 4 iOS versions — iOS 15, 16, 17, 18)
- Android Chrome 89+ (covers last 4 Android versions)

No polyfill needed. The `navigator.canShare?.()` guard handles desktop gracefully.

---

### 4.8 Eligibility Gate — `useSummaryEligibility`

Lightweight hook that runs on tracker screen and lesson page mount. Returns `{ eligible: boolean; daysOfFeedingData: number; daysOfDiaperData: number }`.

```typescript
const { count: feedingDays } = await supabase
  .from('feeding_sessions')
  .select('started_at::date', { count: 'exact', head: false })
  .eq('user_id', userId)
  .filter('started_at', 'gte', babyDob);
// count distinct dates client-side from the returned rows

const { count: diaperDays } = await supabase
  .from('diaper_logs')
  .select('logged_date', { count: 'exact', head: true })
  .eq('user_id', userId);

const eligible = (distinctFeedingDays >= 2) && (diaperDays >= 2);
```

When `!eligible`: the "Generate summary" button and CTA render as disabled with the tooltip from PRD story #10.

---

### 4.9 Entry Points

**A — Tracker screen (`DiapersTrackerScreen`):**  
"Generate summary →" button at the top of the screen. Uses `useSummaryEligibility`. On tap: navigate to `/tracker/summary` (new route).

**B — Lesson pages (week 1, 4, 8 pediatrician + escalation guide):**  
`FeedingSummaryCard` component replaces `FeedingSummaryPlaceholder` in all four lessons. Same eligibility gate. On tap: navigate to `/tracker/summary` or open a full-screen modal — whichever matches the lesson navigation pattern.

**`FeedingSummaryCard` (active state):**
```
┌──────────────────────────────────┐
│  📋 Provider Summary             │
│  Share your feeding and diaper   │
│  data at your appointment.       │
│                                  │
│  [Generate summary →]            │
└──────────────────────────────────┘
```

**`FeedingSummaryCard` (ineligible state):**
```
┌──────────────────────────────────┐
│  📋 Provider Summary             │
│  Log at least 2 days of feeds    │
│  and diapers to generate your    │
│  summary.                        │
│                                  │
│  [Generate summary] (disabled)   │
└──────────────────────────────────┘
```

---

## 5. New Route: `/tracker/summary`

Full-screen summary generation view. Flow:

1. On mount: call `useSummaryData()` with default date range (birth → today)
2. Show loading spinner while data fetches
3. Render `SummaryReportCanvas` (hidden off-screen) and a styled **preview** version on-screen (same layout, but visible and scrollable)
4. "Save / Share" button: calls `generateAndShare(reportRef)` against the hidden canvas node
5. "Questions about these numbers?" link: navigates to `/chat` with pre-filled message

**Date range toggle (P1 — "current week only"):** A segmented control above the preview: `[Birth to today] [This week]`. Changing it re-runs `useSummaryData()` with the new range.

---

## 6. Lovable Briefs Required

Two Lovable briefs must be written before implementation can start in Lovable:

| Brief | Scope |
|-------|-------|
| **`lovable-brief-diaper-tracker.md`** | `DiapersTrackerScreen`, `DailyDiaperLogger`, `diaper_logs` upsert write path, "Generate summary" CTA, recent log history list |
| **`lovable-brief-provider-summary.md`** | `/tracker/summary` route, `useSummaryData` hook, `SummaryReportCanvas`, `DiaperLineChart` with thresholds, `useShareReport`, `FeedingSummaryCard` (replaces placeholder in 4 lessons), `useSummaryEligibility`, `diaperThresholds.ts` config |

The diaper tracker brief must be pasted first — the summary brief depends on the `diaper_logs` table and write path being in place.

---

## 7. Implementation Order

1. **Run migration `00021_diaper_logs.sql`** (`supabase db push`)
2. **Run migration `00022_baby_display_name.sql`** (`supabase db push`)
3. **Paste diaper tracker Lovable brief** — builds the tracker UI and wires the write path
4. **Paste provider summary Lovable brief** — builds the report generator, chart, share flow, and replaces all four placeholders
   - Report header renders baby name if `baby_display_name` is set; omits the line if NULL
4. **QA checklist:**
   - [ ] Diaper tracker upserts correctly; editing today's count updates in place (not duplicates)
   - [ ] "Generate summary" CTA disabled until ≥2 days of both data types
   - [ ] PNG generates and opens native share sheet on iOS 15+ and Android Chrome 89+
   - [ ] Download link fallback works on desktop
   - [ ] Threshold dashed lines appear on chart; amber shading on below-threshold days
   - [ ] Stat callout ⚠ appears when avg wet or stool is below threshold
   - [ ] Weekly view activates when date range > 14 days
   - [ ] Entry point on tracker screen navigates correctly
   - [ ] `FeedingSummaryCard` (active and ineligible states) renders correctly in all 4 lesson pages
   - [ ] Logo placeholder renders in footer (not blank, not broken)

---

## 8. Open Items / To-Do

| Item | Owner | Notes |
|------|-------|-------|
| Latched logo asset (SVG or PNG) | Design | Required before removing placeholder block from image footer |
| Exact route path for `/tracker/summary` | Engineering | Match existing tracker routing convention |
| ~~Confirm `baby_display_name` column name~~ | ~~Engineering~~ | **Resolved:** `display_name` = user's name. `baby_display_name` does not exist yet — see migration 00022 below. |
