# Lovable Update Prompt — Diaper Tracker UI

**Paste the block below directly into Lovable. This brief must be applied before the Provider Visit Summary brief.**

---

```
Two additions in this brief: (1) a new Diaper Tracker screen and (2) a Generate Summary CTA wired to a placeholder route. No existing screens are modified except to add a navigation entry point to the tracker tab.

---

PART 1 — DATABASE

The diaper_logs table already exists in Supabase (migration 00021). Schema:

  id            uuid PRIMARY KEY
  user_id       uuid NOT NULL (FK to auth.users)
  logged_date   date NOT NULL DEFAULT current_date
  wet_count     smallint NOT NULL DEFAULT 0
  stool_count   smallint NOT NULL DEFAULT 0
  notes         text
  created_at    timestamptz
  updated_at    timestamptz
  UNIQUE (user_id, logged_date)

All writes use upsert with onConflict: 'user_id,logged_date' so editing today's counts updates the existing row rather than creating a duplicate.

---

PART 2 — NEW COMPONENT: DiapersTrackerScreen

Create src/components/DiapersTrackerScreen.tsx.

Wire it to the tracker section of the app. If a tracker tab or tracker home screen already exists, add "Diapers" as a section within it. If no tracker screen exists, create a new route at /tracker/diapers and add a navigation entry.

--- STATE ---

```ts
interface DiaperLogEntry {
  id?: string
  logged_date: string     // 'YYYY-MM-DD'
  wet_count: number
  stool_count: number
}

const [selectedDate, setSelectedDate] = useState<string>(todayISO())
const [wetCount, setWetCount] = useState<number>(0)
const [stoolCount, setStoolCount] = useState<number>(0)
const [isSaving, setIsSaving] = useState<boolean>(false)
const [savedToday, setSavedToday] = useState<boolean>(false)
const [recentLogs, setRecentLogs] = useState<DiaperLogEntry[]>([])
const [eligibleForSummary, setEligibleForSummary] = useState<boolean>(false)
```

todayISO(): returns today's date as 'YYYY-MM-DD' using new Date().toISOString().split('T')[0].

--- ON MOUNT ---

1. Load today's existing log (if any) and pre-fill wetCount and stoolCount:

```ts
const { data } = await supabase
  .from('diaper_logs')
  .select('wet_count, stool_count')
  .eq('user_id', userId)
  .eq('logged_date', todayISO())
  .maybeSingle()

if (data) {
  setWetCount(data.wet_count)
  setStoolCount(data.stool_count)
  setSavedToday(true)
}
```

2. Load the 7 most recent log entries for the history list:

```ts
const { data: logs } = await supabase
  .from('diaper_logs')
  .select('id, logged_date, wet_count, stool_count')
  .eq('user_id', userId)
  .order('logged_date', { ascending: false })
  .limit(7)

setRecentLogs(logs ?? [])
```

3. Check summary eligibility — user needs at least 2 days of diaper logs:

```ts
const { count } = await supabase
  .from('diaper_logs')
  .select('logged_date', { count: 'exact', head: true })
  .eq('user_id', userId)

setEligibleForSummary((count ?? 0) >= 2)
```

--- SAVE HANDLER ---

On save button tap:

```ts
setIsSaving(true)

const { error } = await supabase
  .from('diaper_logs')
  .upsert(
    {
      user_id: userId,
      logged_date: selectedDate,
      wet_count: wetCount,
      stool_count: stoolCount,
    },
    { onConflict: 'user_id,logged_date' }
  )

setIsSaving(false)
if (!error) {
  setSavedToday(true)
  // Refresh recent logs and eligibility
}
```

--- LAYOUT ---

Render the following sections top to bottom:

SECTION A — Generate Summary CTA (always at top)

A card with a teal left border (border-l-4 border-primary-600). Content:

  Heading: "Provider Summary"
  Body: "Share your feeding and diaper data at your next appointment."
  Button: "Generate summary →"
    - If eligibleForSummary: primary filled button, navigates to /tracker/summary
    - If not eligibleForSummary: disabled button, muted style
    - Below disabled button: small grey text — "Log at least 2 days of diapers to get started"

SECTION B — Today's Log

  Heading: "Today" with today's date (e.g. "Today — June 30")

  Two counter rows, each using the same layout:
    Label on left | [–] count [+] on right
    [–] and [+] are tap targets, minimum 44×44px. Count displayed in a fixed-width span so the layout doesn't shift.

  Row 1: "Wet diapers" — controls wetCount. Min 0.
  Row 2: "Stool diapers" — controls stoolCount. Min 0.

  Save button below:
    - Label: "Save" (shows "Saving…" while isSaving is true)
    - If savedToday and counts match the saved values: show a small green checkmark and "Saved" text instead of the button, with a small "Edit" link to re-enable editing
    - Full-width, primary color, rounded

SECTION C — Recent

  Heading: "Recent"

  A list of the last 7 days. Each row:
    [Date formatted as "Mon Jun 29"] — Wet: N · Stool: N
  
  If recentLogs is empty: show light grey text "No logs yet. Start tracking above."

---

PART 3 — NAVIGATION

If a bottom nav or tracker tab exists, ensure DiapersTrackerScreen is reachable from it. Label the entry "Diapers" or nest it under an existing "Tracker" section — match the existing navigation convention.

The route /tracker/summary referenced by the Generate Summary CTA does not exist yet and will be added in the next brief. Wire the navigation call now; Lovable will show a 404 until that route is created.

---

PART 4 — STYLE NOTES

- Use Tailwind classes throughout.
- Primary teal: use existing primary-600 class.
- Counter [–] and [+] buttons: bg-gray-100 text-gray-700 rounded, hover:bg-gray-200.
- The "Generate summary" card should feel like a contextual action, not a primary hero. Keep it compact — no more than ~80px tall.
- No emojis. No AI-sounding copy. Keep all labels short and direct.
```
