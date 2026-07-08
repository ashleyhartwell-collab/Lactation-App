# Lovable Update Prompt — Provider Visit Summary Generator

**Paste the block below directly into Lovable. Apply the Diaper Tracker brief first.**

---

```
Four additions in this brief: (1) a threshold config file, (2) a new /tracker/summary route and summary generator screen, (3) a SummaryReportCanvas component used to generate the PNG image, and (4) a FeedingSummaryCard component that replaces FeedingSummaryPlaceholder in four lesson pages. Install html2canvas before applying this brief.

---

PART 0 — INSTALL DEPENDENCY

Run: npm install html2canvas

This is required for PNG image generation. Do not substitute with canvas or other libraries.

---

PART 1 — THRESHOLD CONFIG

Create src/lib/diaperThresholds.ts with the following content exactly:

```ts
export interface ThresholdRow {
  minAgeDays: number
  maxAgeDays: number
  minWetPerDay: number
  minStoolPerDay: number
}

export const DIAPER_THRESHOLDS: ThresholdRow[] = [
  { minAgeDays: 0,  maxAgeDays: 4,        minWetPerDay: -1, minStoolPerDay: 1   },
  { minAgeDays: 5,  maxAgeDays: 41,       minWetPerDay: 6,  minStoolPerDay: 3   },
  { minAgeDays: 42, maxAgeDays: 90,       minWetPerDay: 6,  minStoolPerDay: 1   },
  { minAgeDays: 91, maxAgeDays: Infinity, minWetPerDay: 4,  minStoolPerDay: 0.3 },
]

export function getThreshold(babyAgeDays: number): { minWet: number; minStool: number } {
  if (babyAgeDays <= 4) {
    return { minWet: babyAgeDays + 1, minStool: 1 }
  }
  const row = DIAPER_THRESHOLDS.find(
    r => babyAgeDays >= r.minAgeDays && babyAgeDays < r.maxAgeDays
  )!
  return { minWet: row.minWetPerDay, minStool: row.minStoolPerDay }
}

export function isBelowThreshold(
  avgWet: number,
  avgStool: number,
  babyAgeDays: number
): { wet: boolean; stool: boolean } {
  const { minWet, minStool } = getThreshold(babyAgeDays)
  return {
    wet: avgWet < minWet,
    stool: avgStool < minStool,
  }
}

export function buildBelowThresholdRanges(
  series: Array<{ date: string; value: number }>,
  babyDob: string,
  type: 'wet' | 'stool'
): Array<{ x1: string; x2: string }> {
  const ranges: Array<{ x1: string; x2: string }> = []
  let rangeStart: string | null = null

  for (const point of series) {
    const ageDays = Math.floor(
      (new Date(point.date).getTime() - new Date(babyDob).getTime()) / 86400000
    )
    const { minWet, minStool } = getThreshold(ageDays)
    const threshold = type === 'wet' ? minWet : minStool
    const isBelow = point.value < threshold

    if (isBelow && rangeStart === null) {
      rangeStart = point.date
    } else if (!isBelow && rangeStart !== null) {
      ranges.push({ x1: rangeStart, x2: point.date })
      rangeStart = null
    }
  }
  if (rangeStart !== null) {
    ranges.push({ x1: rangeStart, x2: series[series.length - 1].date })
  }
  return ranges
}
```

---

PART 2 — DATA HOOK: useSummaryData

Create src/hooks/useSummaryData.ts.

```ts
import { differenceInDays, format, getISOWeek, startOfISOWeek } from 'date-fns'
import { supabase } from '@/lib/supabase'

export interface DiaperDataPoint {
  date: string
  wetCount: number
  stoolCount: number
}

export interface SummaryData {
  feedingMetrics: {
    totalSessions: number
    totalMinutes: number
    avgMinutesPerSession: number
  }
  diaperSeries: DiaperDataPoint[]
  diaperMetrics: {
    avgWetPerDay: number
    avgStoolPerDay: number
  }
  dateRange: { start: string; end: string }
  babyAgeAtEndDays: number
  viewMode: 'daily' | 'weekly'
  babyDisplayName: string | null
}

export async function fetchSummaryData(
  userId: string,
  babyDob: string,
  startDate: string,
  endDate: string
): Promise<SummaryData> {

  // --- Feeding sessions ---
  const { data: sessions } = await supabase
    .from('feeding_sessions')
    .select('duration_minutes')
    .eq('user_id', userId)
    .gte('started_at', startDate)
    .lte('started_at', endDate + 'T23:59:59Z')
    .not('duration_minutes', 'is', null)

  const totalSessions = sessions?.length ?? 0
  const totalMinutes = sessions?.reduce((sum, s) => sum + (s.duration_minutes ?? 0), 0) ?? 0
  const avgMinutesPerSession = totalSessions > 0
    ? Math.round(totalMinutes / totalSessions)
    : 0

  // --- Diaper logs ---
  const { data: logs } = await supabase
    .from('diaper_logs')
    .select('logged_date, wet_count, stool_count')
    .eq('user_id', userId)
    .gte('logged_date', startDate)
    .lte('logged_date', endDate)
    .order('logged_date', { ascending: true })

  const diaperSeries: DiaperDataPoint[] = (logs ?? []).map(l => ({
    date: l.logged_date,
    wetCount: l.wet_count,
    stoolCount: l.stool_count,
  }))

  const avgWetPerDay = diaperSeries.length > 0
    ? Math.round((diaperSeries.reduce((s, d) => s + d.wetCount, 0) / diaperSeries.length) * 10) / 10
    : 0
  const avgStoolPerDay = diaperSeries.length > 0
    ? Math.round((diaperSeries.reduce((s, d) => s + d.stoolCount, 0) / diaperSeries.length) * 10) / 10
    : 0

  // --- Weekly rollup if > 14 days ---
  const spanDays = differenceInDays(new Date(endDate), new Date(startDate))
  const viewMode: 'daily' | 'weekly' = spanDays > 14 ? 'weekly' : 'daily'

  let finalSeries = diaperSeries
  if (viewMode === 'weekly') {
    const weekMap = new Map<string, { wetSum: number; stoolSum: number; count: number }>()
    for (const point of diaperSeries) {
      const weekStart = format(startOfISOWeek(new Date(point.date)), 'yyyy-MM-dd')
      const existing = weekMap.get(weekStart) ?? { wetSum: 0, stoolSum: 0, count: 0 }
      weekMap.set(weekStart, {
        wetSum: existing.wetSum + point.wetCount,
        stoolSum: existing.stoolSum + point.stoolCount,
        count: existing.count + 1,
      })
    }
    finalSeries = Array.from(weekMap.entries()).map(([weekStart, v]) => ({
      date: 'Wk of ' + format(new Date(weekStart), 'MMM d'),
      wetCount: Math.round((v.wetSum / v.count) * 10) / 10,
      stoolCount: Math.round((v.stoolSum / v.count) * 10) / 10,
    }))
  }

  // --- Baby display name (nullable) ---
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('baby_display_name')
    .eq('id', userId)
    .maybeSingle()

  const babyAgeAtEndDays = differenceInDays(new Date(endDate), new Date(babyDob))

  return {
    feedingMetrics: { totalSessions, totalMinutes, avgMinutesPerSession },
    diaperSeries: finalSeries,
    diaperMetrics: { avgWetPerDay, avgStoolPerDay },
    dateRange: { start: startDate, end: endDate },
    babyAgeAtEndDays,
    viewMode,
    babyDisplayName: profile?.baby_display_name ?? null,
  }
}
```

---

PART 3 — ELIGIBILITY HOOK: useSummaryEligibility

Create src/hooks/useSummaryEligibility.ts.

```ts
export interface EligibilityResult {
  eligible: boolean
  loading: boolean
  diaperDays: number
  feedingDays: number
}

// On mount, query both tables for distinct day counts.
// eligible = diaperDays >= 2 AND feedingDays >= 2.

async function checkEligibility(userId: string): Promise<EligibilityResult> {
  const [diaperResult, feedingResult] = await Promise.all([
    supabase
      .from('diaper_logs')
      .select('logged_date', { count: 'exact', head: true })
      .eq('user_id', userId),
    supabase
      .from('feeding_sessions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId),
  ])
  const diaperDays = diaperResult.count ?? 0
  const feedingDays = feedingResult.count ?? 0
  return {
    eligible: diaperDays >= 2 && feedingDays >= 2,
    loading: false,
    diaperDays,
    feedingDays,
  }
}
```

---

PART 4 — REPORT CANVAS: SummaryReportCanvas

Create src/components/SummaryReportCanvas.tsx.

This component renders the report layout at fixed dimensions (1080 × 1350px) positioned off-screen so html2canvas can capture it. It is never visible to the user.

IMPORTANT: Every color in this component must use a hardcoded hex value, NOT a Tailwind class or CSS variable. html2canvas does not resolve CSS custom properties.

Mount it absolutely off-screen:
```tsx
<div
  ref={reportRef}
  style={{
    position: 'absolute',
    left: '-9999px',
    top: 0,
    width: '1080px',
    height: '1350px',
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  }}
>
```

Props:
```ts
interface SummaryReportCanvasProps {
  data: SummaryData
  reportRef: React.RefObject<HTMLDivElement>
}
```

LAYOUT (top to bottom, all inline styles with hex values):

A — HEADER BAR
  height: 160px, backgroundColor: '#4f9d9d', padding: 32px
  
  Top row: 
    Left — placeholder logo block: width 100px, height 28px, backgroundColor: '#3a8080', borderRadius: 4px
              with text "LATCHED" in white, fontSize 14px, fontWeight 700, letterSpacing 2px
    Right — timestamp: fontSize 13px, color: '#e0f2f1'
             format: "Generated [Month D, YYYY] at [H:MM AM/PM]"
  
  Bottom row (marginTop: 16px):
    Title: "Feeding & Diaper Summary", fontSize: 26px, fontWeight: 700, color: '#ffffff'
    If data.babyDisplayName is not null:
      Subtitle: "Summary for [babyDisplayName]", fontSize: 16px, color: '#cceae7', marginTop: 4px
    Date range line: "[startDate formatted as 'MMM D'] – [endDate formatted as 'MMM D, YYYY']"
      fontSize: 14px, color: '#cceae7', marginTop: 4px

B — FEEDING SECTION
  padding: 40px 48px 32px, borderBottom: '1px solid #e5e7eb'

  Section label: "FEEDING", fontSize: 11px, fontWeight: 700, color: '#9ca3af', letterSpacing: 2px, marginBottom: 24px

  Three stat rows, each:
    label on left (fontSize: 16px, color: '#374151')
    value on right (fontSize: 18px, fontWeight: 600, color: '#111827')

  Row 1: "Total sessions" → data.feedingMetrics.totalSessions
  Row 2: "Total time" → formatFeedTime(data.feedingMetrics.totalMinutes)
  Row 3: "Avg per session" → formatFeedTime(data.feedingMetrics.avgMinutesPerSession)

  formatFeedTime(minutes: number): string
    if minutes < 60: return `${minutes} min`
    const h = Math.floor(minutes / 60), m = minutes % 60
    return m > 0 ? `${h}h ${m}m` : `${h}h`

C — DIAPER SECTION
  padding: 32px 48px 40px

  Section label: "DIAPERS", same style as FEEDING label, marginBottom: 24px

  Chart: render DiaperLineChart (see Part 5) at width 984px, height 340px

  Stat row (marginTop: 24px):
    Two stats side by side, centered, gap: 48px

    For each stat (wet and stool):
      Compute belowThreshold using isBelowThreshold(avgWetPerDay, avgStoolPerDay, data.babyAgeAtEndDays)
      
      value: fontSize 28px, fontWeight 700
        color: '#111827' if not below threshold
        color: '#d97706' if below threshold (amber-600)
      
      label below value: fontSize 13px, color: '#6b7280'
        "Avg wet/day" or "Avg stool/day"
      
      If below threshold: render a small warning indicator
        A small amber rectangle (backgroundColor: '#fef3c7', border: '1px solid #f59e0b', borderRadius: 4px)
        containing text "⚠ Below typical range", fontSize 11px, color: '#92400e'
        displayed below the label

D — FOOTER
  position at bottom, height: 56px, backgroundColor: '#f9fafb'
  borderTop: '1px solid #e5e7eb', padding: '0 48px'
  display flex, alignItems center, justifyContent space-between
  
  Left text: "Generated with Latched", fontSize: 13px, color: '#9ca3af'
  Right text: today's date formatted as 'MMMM D, YYYY', same style

---

PART 5 — DIAPER LINE CHART: DiaperLineChart

Create src/components/DiaperLineChart.tsx.

Uses Recharts. Import: LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ReferenceLine, ReferenceArea, Tooltip, ResponsiveContainer.

Props:
```ts
interface DiaperLineChartProps {
  series: DiaperDataPoint[]
  babyDob: string
  babyAgeAtEndDays: number
  viewMode: 'daily' | 'weekly'
  width: number
  height: number
}
```

Inside the component:
1. Get threshold: const threshold = getThreshold(babyAgeAtEndDays)
2. Build below-threshold ranges for wet and stool using buildBelowThresholdRanges from diaperThresholds.ts
   - For wet: map series to { date, value: wetCount }, type 'wet'
   - For stool: map series to { date, value: stoolCount }, type 'stool'
3. Flatten data into Recharts format: series.map(d => ({ date: d.date, wet: d.wetCount, stool: d.stoolCount }))

Render:
```tsx
<LineChart width={width} height={height} data={chartData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
  <XAxis
    dataKey="date"
    tick={{ fontSize: 12, fill: '#6b7280' }}
    tickFormatter={viewMode === 'daily'
      ? (v) => format(new Date(v), 'MMM d')
      : (v) => v
    }
  />
  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />

  {/* Below-threshold shading — wet (teal-tinted) */}
  {wetBelowRanges.map((r, i) => (
    <ReferenceArea key={`w${i}`} x1={r.x1} x2={r.x2} fill="#ccfbf1" fillOpacity={0.5} />
  ))}

  {/* Below-threshold shading — stool (amber-tinted) */}
  {stoolBelowRanges.map((r, i) => (
    <ReferenceArea key={`s${i}`} x1={r.x1} x2={r.x2} fill="#fef3c7" fillOpacity={0.5} />
  ))}

  {/* Threshold reference lines — only render if threshold is meaningful */}
  {threshold.minWet > 0 && (
    <ReferenceLine y={threshold.minWet} stroke="#4f9d9d" strokeDasharray="6 3"
      label={{ value: `Min wet: ${threshold.minWet}`, position: 'insideTopRight', fontSize: 11, fill: '#4f9d9d' }} />
  )}
  {threshold.minStool > 0 && (
    <ReferenceLine y={threshold.minStool} stroke="#f59e0b" strokeDasharray="6 3"
      label={{ value: `Min stool: ${threshold.minStool}`, position: 'insideBottomRight', fontSize: 11, fill: '#f59e0b' }} />
  )}

  <Line type="monotone" dataKey="wet" name="Wet diapers"
    stroke="#4f9d9d" strokeWidth={2.5} dot={false} />
  <Line type="monotone" dataKey="stool" name="Stool diapers"
    stroke="#f59e0b" strokeWidth={2.5} dot={false} />

  <Legend wrapperStyle={{ fontSize: 13 }} />
  <Tooltip formatter={(value, name) => [value, name]} />
</LineChart>
```

---

PART 6 — SUMMARY GENERATOR SCREEN: ProviderSummaryScreen

Create src/pages/tracker/summary.tsx (or src/components/ProviderSummaryScreen.tsx — match the existing routing convention).

Route: /tracker/summary

--- STATE ---

```ts
const reportRef = useRef<HTMLDivElement>(null)
const [summaryData, setSummaryData] = useState<SummaryData | null>(null)
const [isLoading, setIsLoading] = useState(true)
const [isGenerating, setIsGenerating] = useState(false)
const [shareError, setShareError] = useState<string | null>(null)

// Date range — default is baby_dob to today
const [startDate, setStartDate] = useState<string>(babyDob)
const [endDate, setEndDate] = useState<string>(todayISO())
```

Fetch babyDob from user_profiles on mount, then call fetchSummaryData(). Re-fetch whenever startDate or endDate changes.

--- GENERATE AND SHARE ---

```ts
async function handleGenerate() {
  if (!reportRef.current) return
  setIsGenerating(true)
  setShareError(null)

  try {
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: false,
      backgroundColor: '#ffffff',
    })

    await new Promise<void>((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) { reject(new Error('Failed to generate image')); return }
        const fileName = `latched-summary-${todayISO()}.png`
        const file = new File([blob], fileName, { type: 'image/png' })

        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title: 'Feeding & Diaper Summary' })
        } else {
          // Desktop fallback: trigger download
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = fileName
          a.click()
          URL.revokeObjectURL(url)
        }
        resolve()
      }, 'image/png')
    })
  } catch (err) {
    if ((err as Error).name !== 'AbortError') {
      setShareError('Something went wrong. Try again.')
    }
  } finally {
    setIsGenerating(false)
  }
}
```

--- LAYOUT ---

Standard page layout with back navigation to /tracker/diapers.

Page title: "Provider Summary"

LOADING STATE: full-page spinner while summaryData is null

LOADED STATE (top to bottom):

  1. Preview section (visible, scrollable)
     A styled preview of the report rendered as normal React/Tailwind UI — NOT the hidden canvas version.
     This gives the user a readable on-screen preview before they share.
     It mirrors the SummaryReportCanvas layout using Tailwind classes and normal colors.
     Include the DiaperLineChart at full width within this preview.

  2. Below the preview:
     Primary button: "Save / Share"
       Full width, primary color (#4f9d9d), white text
       Shows "Generating…" with a spinner while isGenerating is true
       On tap: calls handleGenerate()
     
     If shareError is not null: show small red error text below the button.

     Divider, then:
     Text: "Have questions about these numbers?"
     Link: "Ask in chat →"
       Navigates to /chat with the query param or state:
       message = "I'm looking at my feeding and diaper summary. Can you help me understand these numbers?"

  3. Hidden off-screen canvas (rendered in the DOM but not visible):
     <SummaryReportCanvas data={summaryData} reportRef={reportRef} />

---

PART 7 — FEEDING SUMMARY CARD: FeedingSummaryCard

Create src/components/FeedingSummaryCard.tsx. This replaces FeedingSummaryPlaceholder in four lesson pages.

Props:
```ts
interface FeedingSummaryCardProps {
  userId: string
}
```

On mount: call useSummaryEligibility(userId) to determine eligible state.

ELIGIBLE STATE:
```
┌─────────────────────────────────────────┐
│ 📋  Provider Summary                    │
│ Share your feeding and diaper data      │
│ at your next appointment.               │
│                                         │
│ [Generate summary →]  (primary button)  │
└─────────────────────────────────────────┘
```
Button navigates to /tracker/summary.

NOT ELIGIBLE STATE:
```
┌─────────────────────────────────────────┐
│ 📋  Provider Summary                    │
│ Log at least 2 days of feeds and        │
│ diapers to generate your summary.       │
│                                         │
│ [Generate summary] (disabled, muted)    │
└─────────────────────────────────────────┘
```

Style: bg-primary-50, border border-primary-200, rounded-xl, p-4. The 📋 icon is optional — use it if icons are used elsewhere in lesson pages at this pattern; omit if not.

LOADING STATE: while eligibility is being checked, render the card at the same dimensions with a subtle skeleton shimmer on the button area. Do not show a full-page spinner.

--- REPLACING FeedingSummaryPlaceholder ---

Find FeedingSummaryPlaceholder in these four locations and replace with <FeedingSummaryCard userId={userId} />:

1. shared-pediatrician-week1 component
2. shared-pediatrician-week4 component
3. shared-pediatrician-week8 component
4. shared-escalation-guide component

If FeedingSummaryPlaceholder does not exist in any of those components yet (because the pediatrician briefs have not been applied), leave a TODO comment:
// TODO: replace FeedingSummaryPlaceholder with <FeedingSummaryCard userId={userId} /> once pediatrician visit brief is applied

---

PART 8 — STYLE AND COPY NOTES

- No AI-sounding copy anywhere in this feature. No "Absolutely!", no "Great news!", no hedging language.
- Keep labels short and clinical-adjacent — this is a tool for a provider appointment, not a celebration.
- "Save / Share" is the CTA verb pair. Do not use "Export", "Download only", or "Generate PDF".
- The hidden SummaryReportCanvas must use only inline styles with hardcoded hex values. No Tailwind, no CSS variables, no external fonts.
- The on-screen preview (in ProviderSummaryScreen) may use Tailwind freely.
- Do not add any copy interpreting the data (e.g. "Your baby is doing great!"). The report is a neutral data handoff to a clinician.
```
