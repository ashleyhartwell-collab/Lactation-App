# Product Requirements Document: Provider Visit Summary

**Author:** Ashley Hartwell  
**Date:** 2026-06-30  
**Status:** Draft — pending review before TDD  
**Stakeholders:** Ashley Hartwell (PM), Engineering, Design  

---

## 1. Executive Summary

The Provider Visit Summary is a one-tap, shareable image report generated from a user's feeding and diaper log data. It gives new mothers a formatted, at-a-glance summary they can pull up on their phone or attach to a provider messaging app before or during a pediatrician, IBCLC, or OB appointment — removing the friction of recalling or manually summarizing weeks of logged data under pressure.

---

## 2. Background & Context

New mothers log feeds and diaper output in Latched throughout the postpartum period. That data is valuable clinical context at provider appointments but currently lives only inside the app — unformatted and inaccessible during a visit without navigating through raw log history.

The feature was scoped and a placeholder UI (`FeedingSummaryPlaceholder`) was placed in the three pediatrician visit lessons (weeks 1, 4, and 8) as a reserved slot awaiting this build. The escalation guide lesson (`shared-escalation-guide`) is also a natural surface for this feature.

Two prerequisite gaps were identified during planning: no `diaper_logs` table exists in the current schema, and the diaper tracker UI is not currently writing data to any table (it tracks state client-side only). Both must ship before this feature — users need at least 2 days of persisted diaper data to generate a report. The existing `feeding_sessions` table covers nursing, pumping, and bottle sessions. This PRD covers the new diaper logging table, the diaper write path, and the report generation feature.

---

## 3. Objectives & Success Metrics

**Goals:**
1. Enable users to generate a provider-ready summary image from their logged data in one tap
2. Make the image immediately saveable to the phone's camera roll or shareable via messaging apps
3. Surface the feature contextually at the three points in the app when a provider visit is most likely (week 1, 4, and 8 pediatrician lessons)

**Non-Goals:**
1. PDF export — image format only in v1
2. Automatic scheduling or push notification before appointments
3. Direct integration with EHR or provider messaging platforms
4. Historical report archive — generate-on-demand only, not saved in-app
5. Formula volume or composition tracking beyond what's already in feeding_sessions.amount_oz

**Success Metrics:**

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Report generation rate among eligible users (≥2 days data) at week 1 visit | 0% (not built) | ≥30% within 48h of week 1 lesson completion | Supabase event log |
| Report generation rate at week 4 visit | 0% | ≥40% | Supabase event log |
| Image save / share rate (of reports generated) | 0% | ≥70% | Web Share API callback |
| Diaper log entries per user per day (new behavior) | 0 (no table) | ≥1 per active user per day | diaper_logs row count |

---

## 4. Target Users & Segments

**Primary:** All active Latched users across paths A, B, and C who have an upcoming or recent pediatrician, IBCLC, or OB visit and have at least 2 days of logged data.

**Profile:** Postpartum mom, weeks 1–8, using Latched on mobile. She is likely sleep-deprived and time-compressed. She will open this feature from within a lesson page, probably on the day of or the day before an appointment. She needs the output to require zero additional work once generated.

**Secondary:** Path B (exclusive pumping) and Path C (combo feeding) users who are already in the habit of quantitative tracking and are most likely to have complete data.

---

## 5. User Stories & Requirements

### P0 — Must Have

| # | User Story | Acceptance Criteria |
|---|-----------|---------------------|
| 1 | As a user, I can tap "Generate summary" in a pediatrician lesson and receive a downloadable image of my feeding and diaper data | Button is enabled when ≥2 days of logged data exists. Tapping it generates and displays the image. |
| 2 | As a user, the summary image includes the date and time it was generated | Timestamp appears in the image header, formatted as `Generated [Month DD, YYYY] at [H:MM AM/PM]` |
| 3 | As a user, the image shows total feeds for the selected period | Count includes all nurse, pump, and bottle sessions across all paths |
| 4 | As a user, the image shows total time fed in a readable format | < 60 minutes: display as "[N] min". ≥ 60 minutes: display as "[H]h [M]m". Includes nursing, pumping, and bottle sessions. |
| 5 | As a user, the image shows average time per feeding session | Calculated as total feed time ÷ total feed sessions (all session types). Same format rules as total time. |
| 6 | As a user, the image shows a line chart of wet and stool diaper counts per day | Two lines, distinct colors (teal for wet, amber for stool). X-axis = date. Y-axis = count. |
| 7 | As a user, when I have more than 14 days of logged data, the chart shows weekly averages instead of daily counts | X-axis becomes week labels. Lines show average daily count for that week. |
| 8 | As a user, the image shows average wet diapers per day and average stool diapers per day | Both displayed as daily averages rounded to one decimal place (e.g., "Avg wet/day: 6.4 · Avg stool/day: 2.1") |
| 9 | As a user, I can save the generated image to my phone's camera roll or share it via a messaging app | Uses Web Share API (navigator.share) with the image file. Falls back to a direct download link if Web Share API is unavailable. |
| 10 | As a user, the report cannot be generated until I have at least 2 days of data | "Generate summary" button is disabled with a tooltip: "Log at least 2 days of feeds and diapers to generate your summary." |
| 11 | As a user with no logged data, the placeholder card explains what the summary will include | FeedingSummaryPlaceholder copy is already defined. Disabled state with "Coming soon" → replace with "Log at least 2 days to generate" once feature is live. |
| 12 | As a backend, diaper entries are persisted to a `diaper_logs` table | New table captures: user_id, logged_date (date), wet_count (int), stool_count (int), notes (text nullable), created_at. RLS mirrors feeding_sessions policies. |
| 13 | As a user, I have a diaper tracker UI to log wet and stool diaper counts | A new diaper tracker screen/component must be built (no existing UI). Logs daily wet and stool counts per day. Writes to `diaper_logs` via upsert. Entry model: user enters a count for wet and stool once per day (not per individual diaper event). Requires a companion Lovable brief. |
| 14 | As a provider, I can quickly see when a baby's diaper output is below clinical thresholds | When average wet or stool counts fall below recommended minimums for the baby's age (see thresholds below), a visual flag appears on the chart: a dashed horizontal reference line at the minimum threshold, and a callout label on the affected metric stat (e.g., amber text + warning icon on "Avg wet/day: 4.0 ⚠"). Days below threshold are shaded amber on the line chart. |
| 15 | As a user, the image output is PNG format | PNG preserves text and chart quality better than JPG. File is named `latched-summary-[YYYY-MM-DD].png`. |
| 16 | As a user, I can generate the summary from the tracker/home screen | "Generate summary" action appears at the top of the tracker screen. Tapping it navigates to or opens the summary generation flow. |

**Clinical diaper thresholds (age-adjusted from `baby_dob`):**

| Baby age | Min wet diapers/day | Min stool diapers/day |
|----------|--------------------|-----------------------|
| Days 1–4 | Equals day of life (day 1 = 1, day 2 = 2, etc.) | 1 (meconium/transitional) |
| Day 5 – 6 weeks | 6 | 3 |
| 6 weeks – 3 months | 6 | 1 (stool frequency drops significantly for breastfed babies; 1 every few days may be normal — flag if <1/day average) |
| 3+ months | 4–6 (use 4 as minimum flag) | 1 every few days (≈ 0.3/day; flag if 0) |

Thresholds are stored as a static config in the frontend (no DB table needed). The baby's age in days at the end of the report period determines which row applies. If the report spans a threshold boundary (e.g., birth through 8 weeks), use the threshold for the end date. Flag both the chart and the stat callout; do not display a clinical recommendation — the flag is a visual cue for the provider, not a diagnosis.

### P1 — Should Have

| # | User Story | Acceptance Criteria |
|---|-----------|---------------------|
| 17 | As a user, the default time range covers baby's birth date through today | `started_at` filter: `baby_dob` through `now()`. Calculated from `user_profiles.baby_dob`. |
| 18 | As a user, I can switch the time range to current week only | "Current week only" toggle filters to the current postpartum week (derived from `week_postpartum`). |
| 19 | As a user, the summary image includes my baby's name | Pulled from `user_profiles.baby_display_name`. Displayed in the report header: "Summary for [Baby Name]". |
| 20 | As a user, I see a quick link to chat after generating the report | Below the generated image: "Have questions about these numbers?" → navigates to /chat with suggested message pre-filled: "I'm looking at my feeding summary. Can you help me understand my [wet diaper count / average nursing time]?" |
| 21 | As a user, the report is also accessible from the IBCLC escalation guide lesson | FeedingSummaryPlaceholder is added to `shared-escalation-guide` in the same position as the pediatrician lessons. |
| 22 | As a user, the generated image includes the Latched logo in the footer | A placeholder logo block renders in the image footer until the final logo asset is available. ⚠ Logo asset is on the to-do list — design to provide SVG/PNG before this ships. |

### P2 — Nice to Have / Future

| # | User Story | Acceptance Criteria |
|---|-----------|---------------------|
| 22 | As a user, I can select a custom date range beyond the two preset options | Date picker with start/end date. Min range: 2 days. Max: no limit. |
| 23 | As a user, the report notes which feeding path I'm on (nursing / pumping / combo) | One-line label in the report header derived from `user_profiles.path_selection`. |

---

## 6. Solution Overview

### Image Generation

Generate the report image client-side using the Canvas API (or a thin wrapper library such as `html2canvas` or `fabricjs`). The report is rendered into an off-screen HTML element with fixed dimensions (1080×1350px, portrait aspect ratio, designed for phone screens) and then exported to a PNG blob via `canvas.toBlob()`.

This avoids a server round-trip for image generation and keeps the feature self-contained in the React frontend. It also means the image can be generated and previewed instantly before the user shares it.

**Export flow:**
1. User taps "Generate summary"
2. Frontend queries Supabase for feeding_sessions and diaper_logs within the selected date range
3. Data is computed into summary metrics and chart data client-side
4. Canvas renders the report image
5. `navigator.share({ files: [pngFile] })` is called — opens native share sheet on mobile
6. If Web Share API unavailable (desktop): render a download link instead

### Data Sources

| Metric | Source table | Query |
|--------|-------------|-------|
| Total feeds | `feeding_sessions` | COUNT where session_type IN ('nurse', 'pump', 'bottle') and date range |
| Total feed time | `feeding_sessions` | SUM(duration_minutes) — all session types |
| Avg feed time | `feeding_sessions` | AVG(duration_minutes) — all session types |
| Diaper line chart | `diaper_logs` | wet_count and stool_count grouped by logged_date |
| Avg wet/stool per day | `diaper_logs` | AVG(wet_count), AVG(stool_count) over date range |

### Report Layout (Canvas)

```
┌─────────────────────────────────────┐
│  LATCHED                [timestamp] │  ← header bar (teal bg)
│  Feeding Summary for [Baby Name]    │
│  [Date range]                       │
├─────────────────────────────────────┤
│  FEEDING                            │
│  Total feeds: [N]                   │
│  Total time: [Xh Ym]               │
│  Avg per session: [Xm]             │
├─────────────────────────────────────┤
│  DIAPERS                            │
│  [Line chart — wet (teal) /         │
│   stool (amber) — daily or weekly.  │
│   Dashed threshold line per metric. │
│   Below-threshold days shaded amber]│
│  Avg wet/day: [N] ⚠  Avg stool/day: [N]│  ← ⚠ appears if below threshold
├─────────────────────────────────────┤
│  Generated with Latched             │  ← footer
└─────────────────────────────────────┘
```

### Diaper Logging

The diaper tracker UI does not exist yet and must be built as part of this feature. A companion Lovable brief is required covering the tracker screen, daily wet/stool count input, and the `diaper_logs` upsert write path. Users will need at least 2 days of logged data before the summary can be generated.

**Recommended diaper_logs schema:**
```sql
CREATE TABLE public.diaper_logs (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  logged_date  date NOT NULL DEFAULT current_date,
  wet_count    smallint NOT NULL DEFAULT 0 CHECK (wet_count >= 0),
  stool_count  smallint NOT NULL DEFAULT 0 CHECK (stool_count >= 0),
  notes        text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, logged_date)  -- one row per user per day; use upsert
);
```

Weekly view threshold: if `MAX(logged_date) - MIN(logged_date) > 14 days`, switch chart from daily to weekly averages.

---

## 7. Open Questions

All open questions resolved.

| # | Question | Resolution |
|---|----------|------------|
| 1 | Diaper tracker UI model | No existing UI — full diaper tracker must be built. Daily count model (wet + stool entered once per day, upserted). Lovable brief required. |
| 2 | "Generate summary" entry point on tracker screen | Top of the tracker screen as a primary action. |
| 3 | Latched logo asset | No asset yet. Use a placeholder block in v1. Adding logo design to the project to-do list. |
| 4 | Web Share API target OS | Last 4 major versions of iOS and Android. Web Share API with file support is available on iOS 15+ and Android Chrome 89+, which comfortably covers this range. Desktop fallback (download link) still required for PWA use on desktop. |

---

## 8. Timeline & Phasing

### Phase 1 (this build)
- Build diaper tracker UI (new screen — does not exist yet); Lovable brief required
- `diaper_logs` table migration + RLS
- Report generation: Canvas render, all session types (nurse + pump + bottle), diaper metrics, line chart, below-threshold indicators
- Both diaper metrics as daily averages (wet and stool)
- PNG export via Web Share API; download link fallback for desktop (target: last 4 iOS/Android versions)
- Placeholder logo block in image footer (⚠ final logo asset pending design)
- FeedingSummaryPlaceholder replaced with live component in week 1, 4, 8 pediatrician lessons + shared-escalation-guide
- "Generate summary" action at top of tracker screen
- Default timeframe (birth → today) only

### Phase 2 (follow-on)
- Baby name in report header
- "Current week only" timeframe toggle
- Custom date range picker

### Phase 3 (future)
- PDF export option
