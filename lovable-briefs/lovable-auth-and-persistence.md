# Lovable Update Prompt — Supabase Auth + Profile Persistence
**Paste the block below directly into Lovable.**

---

```
Wire Supabase Auth into the Account Creation screen and persist onboarding profile data to the backend. This turns AppContext from a temporary in-memory store into a real durable profile. Do not change any screen layout, visual design, color tokens, or form field logic. Only change: Supabase client setup, AppContext auth state, Account Creation form submission handler, profile write after onboarding completes, session check on app load, and sign out.

---

OVERVIEW

Current behavior:
  - Account Creation screen advances the flow without creating a real user
  - All onboarding data lives only in AppContext (lost on refresh)
  - App always starts at the Welcome screen

Target behavior:
  - Account Creation calls supabase.auth.signUp() with email + password
  - After the post-paywall personalization screens complete (on Home Transition), write the full profile to Supabase via the upsert-profile edge function
  - On every app load, check for an active Supabase session — if one exists, call get-profile and route directly to Home; if not, route to Welcome
  - Sign out clears the session and routes to Welcome

---

PART 1 — SUPABASE CLIENT SETUP

Install @supabase/supabase-js if not already present.

Create a singleton Supabase client at src/lib/supabaseClient.ts:

  import { createClient } from '@supabase/supabase-js'

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

  export const supabase = createClient(supabaseUrl, supabaseAnonKey)

These env vars are already set in the Lovable project's Supabase integration. Do not hardcode values.

---

PART 2 — APPCONTEXT AUTH STATE

Add the following fields to AppContext (alongside existing onboarding fields):

  session: Session | null          // from @supabase/supabase-js
  user: User | null                // from @supabase/supabase-js
  authLoading: boolean             // true while checking initial session
  authError: string | null         // holds signup/signin error message

Add corresponding setters: setSession, setUser, setAuthLoading, setAuthError.

On AppContext mount, run the session check described in Part 5.

---

PART 3 — ACCOUNT CREATION SCREEN

The Account Creation screen currently has an email field, a password field, and a Continue/Create Account button. Wire the submit handler as follows:

  1. On button press, set authLoading = true and authError = null.

  2. Call:
       const { data, error } = await supabase.auth.signUp({
         email: emailValue,
         password: passwordValue,
       })

  3. If error:
       - Set authError = error.message
       - Set authLoading = false
       - Display authError below the form (14px, error/danger color token, no toast)
       - Do NOT advance the screen

  4. If success:
       - Set session = data.session, user = data.user
       - Set authLoading = false
       - Advance to the Goal/Reason screen (next in post-paywall sequence)

Button state:
  - Disabled and shows a spinner while authLoading = true
  - Otherwise behaves exactly as before

Do not change the screen's layout, headline, subtext, input styles, or any other visual element.

---

PART 4 — PROFILE WRITE (HOME TRANSITION)

When the user reaches the Home Transition screen (the final screen before the home feed), call the upsert-profile edge function with all collected AppContext data.

Trigger: on component mount of the Home Transition screen, if session is not null, fire the profile write once. Use a ref or flag to ensure it only fires once per session.

Call:
  const { error } = await supabase.functions.invoke('upsert-profile', {
    body: {
      user_id: user.id,
      name: appContext.name,
      address_preference: appContext.addressPreference,   // first name vs full name, however it's stored
      baby_name: appContext.babyName,
      baby_dob: appContext.babyDOB,                       // ISO date string or null
      baby_weeks_old: appContext.babyWeeksOld,            // from the "not sure" slider, or null
      feeding_path: appContext.feedingPath,               // 'A' | 'B' | 'C'
      goal: appContext.goal,                              // may be null if skipped
      breast_anatomy: appContext.breastAnatomy,           // may be null if skipped
      pump: appContext.pump,                              // may be null if skipped or path A
    }
  })

If error, log it to console — do not block the Home Transition animation or show a visible error to the user. The transition should proceed regardless.

IMPORTANT: Match the field names above exactly to whatever AppContext field names currently exist. If a field name differs (e.g., appContext.firstName instead of appContext.name), use the actual existing field name — do not rename AppContext fields.

---

PART 5 — SESSION CHECK ON APP LOAD

In AppContext, on mount, run a session check before rendering any screen:

  1. Set authLoading = true.

  2. Call:
       const { data: { session } } = await supabase.auth.getSession()

  3. If session exists:
       a. Set session and user from the result.
       b. Call the get-profile edge function:
            const { data, error } = await supabase.functions.invoke('get-profile', {
              body: { user_id: session.user.id }
            })
       c. If profile data is returned, populate AppContext fields from it (same field mapping as Part 4, reversed).
       d. Set currentScreen (or equivalent routing state) to 'home'.

  4. If no session:
       - Set currentScreen to 'welcome'.

  5. Set authLoading = false.

While authLoading = true, render a full-screen loading state instead of any onboarding or home screen. Use a simple centered spinner — match the app's existing loading spinner style if one exists, otherwise use a plain animated circle in primary-500.

Also subscribe to auth state changes so the session stays in sync:
  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
    setUser(session?.user ?? null)
  })

---

PART 6 — SIGN OUT

Add a sign out function to AppContext:

  const signOut = async () => {
    await supabase.auth.signOut()
    // Clear all AppContext onboarding fields back to their initial values
    // Reset currentScreen to 'welcome'
  }

Expose signOut from AppContext. Wire it to wherever the app currently has a "Sign Out" or settings option. If no sign out button exists anywhere in the app yet, add a small "Sign out" text link in the app's settings or profile area (wherever is most natural given the existing nav structure) — 14px, neutral-400, no icon needed.

---

PART 7 — ERROR MESSAGE FOR EXISTING EMAIL

If supabase.auth.signUp returns an error with message containing "already registered" or "User already registered", display this specific message instead of the raw Supabase error:

  "An account with this email already exists. Try signing in instead."

For all other errors, display the raw error.message.

Do not add a "sign in" link or flow yet — that comes in the next prompt. Just show the message.

---

DO NOT CHANGE:
- Any screen layout, visual design, spacing, color tokens, or typography
- Any form field logic or validation already in place
- AppContext fields that already exist — only add to them, do not rename or remove
- The onboarding flow order or step indicators
- The Home Transition screen's animation or copy
- The home screen, chat, tracker, protocol, or Getting Started features
- Any edge function implementations — only call them from the frontend
```
