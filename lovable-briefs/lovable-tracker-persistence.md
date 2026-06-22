# Lovable Update Prompt — Tracker Persistence
**Paste the block below directly into Lovable.**

---

> **Before applying this prompt, run the database migration first. See MIGRATION STEP at the bottom.**

---

```
Wire the tracker screen to Supabase so feeding and pumping sessions persist across reloads. The tracker UI already exists — do not change its layout, visual design, color tokens, button styles, or log entry appearance. Only change: how sessions are saved, loaded, and deleted. Use direct Supabase client calls — no edge function needed.

---

OVERVIEW

Current behavior:
  - Logging a session updates local state only — data is lost on reload
  - Session history shows placeholder or in-memory entries

Target behavior:
  - Every logged session is immediately written to the feeding_sessions table in Supabase
  - On tracker screen mount, the user's session history loads from Supabase
  - Deleting a session removes it from Supabase
  - Summary stats (today's count, last session time) are derived from the loaded data
  - If the user is not authenticated, the tracker shows an empty state with no errors

---

PART 1 — TRACKER STATE

In the tracker screen component, replace any local session array with:

  interface FeedingSession {
    id: string
    user_id: string
    session_type: 'nurse' | 'pump' | 'bottle'
    started_at: string        // ISO timestamp
    ended_at: string | null
    duration_minutes: number | null   // computed by DB, read-only
    breast_side: 'left' | 'right' | 'both' | null
    amount_oz: number | null
    notes: string | null
    created_at: string
  }

  const [sessions, setSessions] = useState<FeedingSession[]>([])
  const [trackerLoading, setTrackerLoading] = useState(true)
  const [trackerError, setTrackerError] = useState<string | null>(null)

If this state already exists in a different shape, adapt the field names to match the database columns above — the DB column names are the source of truth.

---

PART 2 — LOAD SESSIONS ON MOUNT

When the tracker screen mounts, load the user's recent session history:

  useEffect(() => {
    const loadSessions = async () => {
      if (!appContext.user) {
        setTrackerLoading(false)
        return
      }

      setTrackerLoading(true)
      setTrackerError(null)

      const { data, error } = await supabase
        .from('feeding_sessions')
        .select('*')
        .eq('user_id', appContext.user.id)
        .order('started_at', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Failed to load sessions:', error)
        setTrackerError('Could not load your history. Pull to refresh.')
      } else {
        setSessions(data ?? [])
      }

      setTrackerLoading(false)
    }

    loadSessions()
  }, [appContext.user])

While trackerLoading is true, show a centered spinner in the session list area using the app's existing loading style.

If trackerError is set, show it as a small text line (13px, neutral-500) in the session list area. It should not block the log button.

---

PART 3 — LOG A SESSION

When the user taps the log/save button (however the current tracker UI triggers a new entry), replace the local state write with a Supabase insert, then prepend the result to local state:

  const logSession = async (entry: {
    session_type: 'nurse' | 'pump' | 'bottle'
    started_at?: string       // defaults to now() in DB if omitted
    ended_at?: string | null
    breast_side?: 'left' | 'right' | 'both' | null
    amount_oz?: number | null
    notes?: string | null
  }) => {
    if (!appContext.user) return

    const { data, error } = await supabase
      .from('feeding_sessions')
      .insert({
        user_id: appContext.user.id,
        session_type: entry.session_type,
        started_at: entry.started_at ?? new Date().toISOString(),
        ended_at: entry.ended_at ?? null,
        breast_side: entry.breast_side ?? null,
        amount_oz: entry.amount_oz ?? null,
        notes: entry.notes ?? null,
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to log session:', error)
      // Show brief inline error — do not clear the form
      return
    }

    // Optimistically prepend to local list
    setSessions(prev => [data, ...prev])
  }

Map the existing tracker form fields to this function's parameters. The field mapping is:
  - If the tracker has a type selector (nurse / pump / bottle) → session_type
  - If it has a start time → started_at
  - If it has an end time or duration → ended_at (calculate ended_at = started_at + duration if needed)
  - If it has a breast side selector → breast_side
  - If it has an amount/volume field → amount_oz
  - If it has a notes field → notes

Only pass fields that exist in the current tracker UI. Fields not in the UI default to null.

---

PART 4 — DELETE A SESSION

When the user deletes a session (swipe-to-delete, long press, or trash icon — however deletion is currently triggered), replace the local state removal with:

  const deleteSession = async (sessionId: string) => {
    // Optimistically remove from local state immediately
    setSessions(prev => prev.filter(s => s.id !== sessionId))

    const { error } = await supabase
      .from('feeding_sessions')
      .delete()
      .eq('id', sessionId)
      .eq('user_id', appContext.user?.id ?? '')   // RLS guard

    if (error) {
      console.error('Failed to delete session:', error)
      // Reload sessions to restore the item if delete failed
      loadSessions()
    }
  }

---

PART 5 — SUMMARY STATS

Derive the following stats from the sessions array in local state (no extra DB call needed):

  // Sessions logged today (local midnight to now)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todaySessions = sessions.filter(s => new Date(s.started_at) >= today)
  const todayCount = todaySessions.length

  // Last session time
  const lastSession = sessions[0] ?? null  // sessions are ordered newest-first
  const lastSessionTime = lastSession
    ? formatRelativeTime(lastSession.started_at)  // use existing time formatting util
    : 'No sessions yet'

  // Total pumped today (pump sessions only)
  const totalOzToday = todaySessions
    .filter(s => s.session_type === 'pump' && s.amount_oz != null)
    .reduce((sum, s) => sum + (s.amount_oz ?? 0), 0)

Plug these values into wherever the tracker currently shows summary stats (session count, last feed time, total oz). If those displays don't exist yet, do not add them — only wire stats to existing UI elements.

---

PART 6 — EMPTY STATE

If sessions is empty and trackerLoading is false, show an empty state in the session list area:

  Icon: a simple clock or feed icon in neutral-300 (use whatever icon fits the app's existing icon set)
  Headline (15px, semibold, neutral-600): "No sessions logged yet"
  Subtext (13px, neutral-400): "Tap the button above to log your first feed."

Do not show this while loading — only after load completes with zero results.

---

PART 7 — UNAUTHENTICATED STATE

If appContext.user is null (user not logged in), show in the session list area:

  Text (14px, neutral-400, centered): "Sign in to save your tracking history."

Do not attempt any Supabase queries. The log button should still be visible but tapping it should show this same message inline rather than crashing.

---

DO NOT CHANGE:
- Tracker screen layout, header, bottom nav, or log button design
- Session entry card appearance, typography, or spacing
- Any timer or stopwatch functionality already in place
- Form fields or their validation — only change what happens on submit
- AppContext fields from previous prompts
- Any other screen, component, or feature
```

---

## MIGRATION STEP (run before applying the Lovable prompt)

The migration file is already written at:
`latched-backend/supabase/migrations/00010_feeding_sessions.sql`

Run this in your terminal:

```bash
cd "/Users/ashleyhartwell/Documents/Claude/Projects/Lactation Journey App/latched-backend"

npx supabase db push --linked -p 'LiamLandry2026'
```

This creates the `feeding_sessions` table with Row Level Security so users can only access their own data.
