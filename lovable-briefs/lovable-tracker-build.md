# Lovable Update Prompt — Build Tracker Screen + Persistence
**Paste the block below directly into Lovable.**

---

> **Before applying this prompt, make sure migration 00010 has been pushed (`npx supabase db push --linked -p 'LiamLandry2026'` in the latched-backend folder).**

---

```
Build the tracker screen from scratch and wire it to Supabase. This is a new screen — create the component, register it in the app's routing/nav, and implement full Supabase persistence. Match the visual style of the rest of the app exactly: same card style (white bg, rounded-2xl, shadow-sm), same color tokens, same typography scale, same bottom nav treatment.

---

OVERVIEW

The tracker is a feeding and pumping log. Users tap a button to record a session, fill in a quick form, and see their history. Data persists to the feeding_sessions table in Supabase via direct client calls.

---

PART 1 — DATA TYPES

Add this interface to the tracker component or a shared types file:

  interface FeedingSession {
    id: string
    user_id: string
    session_type: 'nurse' | 'pump' | 'bottle'
    started_at: string
    ended_at: string | null
    duration_minutes: number | null
    breast_side: 'left' | 'right' | 'both' | null
    amount_oz: number | null
    notes: string | null
    created_at: string
  }

---

PART 2 — SCREEN LAYOUT

The tracker screen has four sections stacked vertically with 16px gap, inside a scrollable container with px-4 pt-4 pb-24:

  1. Header
  2. Quick log buttons
  3. Today's summary stats
  4. Session history list

---

PART 3 — HEADER

  Left: Screen title
    "Tracker" — 22px, semibold, neutral-800

  Right: Today's date
    e.g. "Wed, May 28" — 13px, neutral-400
    Use: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

No back button. This is a top-level tab.

---

PART 4 — QUICK LOG BUTTONS

A row of 2 or 3 pill buttons depending on the user's feeding path (read from appContext.feedingPath):

  Path A (nursing):
    [ + Nurse ]   [ + Bottle ]

  Path B (pumping):
    [ + Pump ]    [ + Bottle ]

  Path C (combination):
    [ + Nurse ]   [ + Pump ]   [ + Bottle ]

Button style:
  - Height: 44px, rounded-full, px-5
  - Primary button (first in row): bg-primary-500, text-white, 15px semibold
  - Secondary buttons: border border-primary-300, text-primary-600, bg-white, 15px medium
  - Full width row, gap-3, flex

Tapping any button opens the log form sheet (Part 6) with that session_type pre-selected.

---

PART 5 — TODAY'S SUMMARY STATS

A card (white bg, rounded-2xl, shadow-sm, p-4) with a 3-column grid:

  Column 1:
    Value: count of today's sessions (sessions where started_at >= today midnight)
    Label: "Today"
    Value style: 24px, semibold, primary-600
    Label style: 12px, neutral-400

  Column 2:
    Value: time of last session, formatted as relative ("2h ago", "Just now", "Yesterday")
    Label: "Last feed"
    Same styles

  Column 3 — only show if feedingPath is B or C:
    Value: total oz pumped today (sum of amount_oz where session_type = 'pump' and started_at >= today)
    Formatted as: "X.X oz" or "— oz" if none
    Label: "Pumped today"
    Same styles

  Dividers: thin vertical lines (1px, neutral-100) between columns

  If sessions are loading, show skeleton placeholders (neutral-100 rounded rectangles) in the value positions.

---

PART 6 — LOG FORM (BOTTOM SHEET)

A bottom sheet modal that slides up from the bottom when a quick log button is tapped. Use the app's existing bottom sheet or modal component if one exists; otherwise create a standard bottom sheet:
  - White bg, rounded-t-2xl, pt-3 pb-8 px-5
  - Drag handle: centered 36x4px rounded-full neutral-200 bar at top
  - Backdrop: semi-transparent black (bg-black/40), tapping backdrop dismisses the sheet

Sheet contents top to bottom:

  a) Sheet title
     "[Session type] Session" — 18px, semibold, neutral-800, mb-4
     e.g. "Nursing Session", "Pumping Session", "Bottle Session"

  b) Start time row (always shown)
     Label: "Start time" (13px, neutral-500)
     Value: a time input defaulting to now, formatted as HH:MM AM/PM
     Tapping opens the native time picker

  c) Duration row (always shown)
     Label: "Duration" (13px, neutral-500)
     A row of duration chips: [ 5 min ] [ 10 min ] [ 15 min ] [ 20 min ] [ 30 min ] [ 45 min ] [ Custom ]
     Selected chip: bg-primary-100, border border-primary-400, text-primary-700
     Unselected chip: bg-neutral-100, text-neutral-600
     Tapping Custom shows a numeric input for minutes
     Duration is optional — if none selected, ended_at is not set

  d) Breast side selector — only show if session_type === 'nurse'
     Label: "Side" (13px, neutral-500)
     Three toggle buttons in a row: [ Left ] [ Right ] [ Both ]
     Same selected/unselected chip style as duration
     Default: no selection (optional field)

  e) Amount field — only show if session_type === 'pump' or session_type === 'bottle'
     Label: "Amount" (13px, neutral-500)
     Numeric input with "oz" suffix, keyboard type: decimal
     Placeholder: "0.0"
     Optional field

  f) Notes field (always shown)
     Label: "Notes" (13px, neutral-500)
     Multiline text input, 3 lines tall, placeholder: "Optional note..."
     bg-neutral-50, rounded-xl, border border-neutral-200, px-3 py-2, 14px

  g) Save button
     Full width, primary-500, 52px, rounded-xl, "Save session" label
     Always active (no required fields — start time defaults to now)

  h) Cancel link
     "Cancel" — 14px, neutral-400, centered, mt-2

Saving behavior:
  - Compute ended_at = started_at + duration if duration was selected, else null
  - Call logSession() (Part 8) with the form values
  - Close the sheet on success
  - If save fails, show "Couldn't save. Try again." in error color below the save button, keep sheet open

---

PART 7 — SESSION HISTORY LIST

Below the stats card, a section with:

  Section label: "Recent sessions" — 13px, uppercase, tracking-wide, neutral-400, mb-2

Sessions grouped by date. For each date group:
  Date header: "Today", "Yesterday", or "Mon May 26" — 12px, semibold, neutral-500, mb-1 mt-3

For each session in the group, a list row (white bg, rounded-xl, px-4 py-3, shadow-sm, mb-2):

  Left: Session type icon (24px)
    nurse → 🤱 or a breast/baby SVG icon in primary-400
    pump → a pump SVG icon in primary-400
    bottle → a bottle SVG icon in primary-400
    (Use emoji if no matching icon exists in the app's icon set)

  Middle (flex-1, ml-3):
    Top line: session type label + breast side if applicable
      e.g. "Nursing · Left", "Pumping", "Bottle"
      14px, semibold, neutral-800
    Bottom line: time + duration/amount
      e.g. "2:30 PM · 20 min" or "10:15 AM · 3.5 oz"
      12px, neutral-400

  Right: Delete button
    A small trash icon (16px, neutral-300)
    Tapping shows a confirmation: "Delete this session?" with Delete / Cancel
    On confirm: calls deleteSession() (Part 9)

Empty state (shown when sessions array is empty and not loading):
  Centered in the list area:
  Icon: clock or feed icon, 40px, neutral-200
  Text: "No sessions logged yet" — 15px, semibold, neutral-500, mt-3
  Subtext: "Tap a button above to log your first session." — 13px, neutral-400

Loading state: show 3 skeleton rows (neutral-100 rounded-xl, h-16, animated pulse)

---

PART 8 — LOG SESSION (SUPABASE INSERT)

  const logSession = async (entry: {
    session_type: 'nurse' | 'pump' | 'bottle'
    started_at: string
    ended_at: string | null
    breast_side: 'left' | 'right' | 'both' | null
    amount_oz: number | null
    notes: string | null
  }) => {
    if (!appContext.user) return

    const { data, error } = await supabase
      .from('feeding_sessions')
      .insert({
        user_id: appContext.user.id,
        ...entry,
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to log session:', error)
      throw error   // let the form handler show the error
    }

    setSessions(prev => [data, ...prev])
  }

---

PART 9 — DELETE SESSION (SUPABASE DELETE)

  const deleteSession = async (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId))

    const { error } = await supabase
      .from('feeding_sessions')
      .delete()
      .eq('id', sessionId)
      .eq('user_id', appContext.user?.id ?? '')

    if (error) {
      console.error('Failed to delete session:', error)
      // Reload to restore the item
      await loadSessions()
    }
  }

---

PART 10 — LOAD SESSIONS ON MOUNT

  const loadSessions = async () => {
    if (!appContext.user) {
      setTrackerLoading(false)
      return
    }
    setTrackerLoading(true)

    const { data, error } = await supabase
      .from('feeding_sessions')
      .select('*')
      .eq('user_id', appContext.user.id)
      .order('started_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Failed to load sessions:', error)
    } else {
      setSessions(data ?? [])
    }
    setTrackerLoading(false)
  }

  useEffect(() => { loadSessions() }, [appContext.user])

---

PART 11 — REGISTER IN NAV AND ROUTING

Add the tracker screen to the app's bottom navigation bar alongside the existing tabs (Home, Chat, Protocol, Getting Started — or whatever tabs currently exist).

  Tab label: "Tracker"
  Tab icon: a clock or activity icon — use whatever fits the existing nav icon style
  Route: /tracker

The tab should be visible on all main app screens (after onboarding is complete). Place it in a logical position in the nav order — between Home and Chat works well, or at the end if that's cleaner.

---

PART 12 — UNAUTHENTICATED STATE

If appContext.user is null, render a centered message in the session list area:
  "Sign in to save your tracking history." — 14px, neutral-400

Do not attempt Supabase queries. Log buttons remain visible but tapping shows:
  "Please complete sign-in to save sessions." — inline below the buttons, 13px, neutral-400

---

DO NOT CHANGE:
- Any existing screen, component, or nav tab
- AppContext fields from previous prompts — read feedingPath and user, do not modify them
- The app's existing card styles, color tokens, or typography
- Any other Supabase tables or edge functions
```
