# Lovable Update Prompt — Returning User Sign-In Flow
**Paste the block below directly into Lovable.**

---

```
Add a sign-in flow for returning users whose sessions have expired. This touches three places: the Welcome screen (add a sign-in entry point), a new Sign In screen, and a new Forgot Password screen. Do not change any existing screen's layout, design, or logic beyond the one small addition to Welcome described below.

---

OVERVIEW

Current gap: if a returning user's Supabase session has expired, they land on the Welcome screen with no way back into the app without completing full onboarding again.

New flow:
  Welcome → (tap "Sign in") → Sign In screen → (success) → load profile → Home
                                              → (tap "Forgot password?") → Forgot Password screen

---

PART 1 — WELCOME SCREEN: ADD SIGN-IN ENTRY POINT

At the very bottom of the Welcome screen, below the existing primary CTA button, add one line of text:

  "Already have an account? Sign in →"
  Style: 14px, neutral-500, centered, underlined link on "Sign in →"
  Spacing: mt-4 below the CTA button

Tapping "Sign in →" navigates to the Sign In screen. Do not change anything else on the Welcome screen.

---

PART 2 — SIGN IN SCREEN

Create a new screen component at the route used for sign-in (e.g. /sign-in or as a named screen in AppContext routing — match whatever pattern the rest of the app uses).

Layout (centered, px-6, scrollable):

  a) Back navigation
     A "← Back" text link at the top-left (14px, neutral-500) that returns to the Welcome screen.

  b) Headline block (mt-8 mb-6)
     Headline: "Welcome back." — 26px, semibold, neutral-800
     Subtext: "Sign in to pick up where you left off." — 15px, neutral-500

  c) Email input
     Label: "Email" (13px, neutral-500, mb-1)
     Input: full width, rounded-xl, border border-neutral-200, bg-neutral-50, px-4 py-3, 15px
     Keyboard type: email-address
     Autocomplete: email
     Placeholder: "you@example.com"

  d) Password input
     Label: "Password" (13px, neutral-500, mb-1)
     Input: same style as email, type password
     Autocomplete: current-password
     A show/hide password toggle icon on the right inside the input (eye / eye-off icon, neutral-400)

  e) Error message area
     Below the password input, reserve space for an inline error (13px, error color)
     Hidden when no error. Show without a toast or modal — inline only.

  f) Sign In button
     Full width, primary-500, 52px, rounded-xl, "Sign in" label
     While loading: disabled, spinner inside, label "Signing in…"

  g) Forgot password link
     "Forgot your password?" — 14px, neutral-400, centered, mt-3
     Tapping navigates to the Forgot Password screen (Part 3)

  h) Divider + new user link (at the bottom, mt-6)
     A thin horizontal divider (neutral-100)
     Below it: "New here? Start your plan →" — 14px, neutral-500, centered
     Tapping returns to the Welcome screen

---

PART 3 — SIGN IN HANDLER

  const handleSignIn = async () => {
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail || !password) return

    setSignInLoading(true)
    setSignInError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    })

    if (error) {
      setSignInLoading(false)

      // Map Supabase error messages to friendly copy
      if (
        error.message.toLowerCase().includes('invalid login') ||
        error.message.toLowerCase().includes('invalid credentials') ||
        error.message.toLowerCase().includes('wrong password')
      ) {
        setSignInError('Incorrect email or password. Please try again.')
      } else if (error.message.toLowerCase().includes('email not confirmed')) {
        setSignInError('Please check your email to confirm your account first.')
      } else {
        setSignInError('Something went wrong. Please try again.')
      }
      return
    }

    // Success — load profile and route to home
    if (data.session && data.user) {
      setSession(data.session)
      setUser(data.user)

      // Load profile from Supabase
      try {
        const { data: profileData } = await supabase.functions.invoke('get-profile', {
          body: { user_id: data.user.id }
        })
        if (profileData) {
          // Populate AppContext fields from profile — same mapping as the auth prompt
          if (profileData.name) setName(profileData.name)
          if (profileData.feeding_path) setFeedingPath(profileData.feeding_path)
          if (profileData.baby_dob) setBabyDOB(profileData.baby_dob)
          if (profileData.baby_weeks_old != null) setBabyWeeksOld(profileData.baby_weeks_old)
          if (profileData.baby_name) setBabyName(profileData.baby_name)
          if (profileData.goal) setGoal(profileData.goal)
          // Add any other profile fields that AppContext stores
        }
      } catch (profileErr) {
        console.warn('Profile load failed after sign-in — proceeding anyway:', profileErr)
      }

      setIsPaid(true)   // existing account = already paid
      setCurrentScreen('home')   // or however home routing works
    }

    setSignInLoading(false)
  }

Wire handleSignIn to the Sign In button's onPress and to the Return key on the password input.

---

PART 4 — FORGOT PASSWORD SCREEN

Create a new screen for password reset.

Layout (px-6):

  a) Back navigation
     "← Back" returning to the Sign In screen

  b) Headline block (mt-8 mb-6)
     Headline: "Reset your password" — 24px, semibold, neutral-800
     Subtext: "Enter your email and we'll send you a reset link." — 15px, neutral-500

  c) Email input (same style as Sign In screen)
     Placeholder: "you@example.com"

  d) Error / success message area
     One area that shows either:
       - Error (13px, error color): e.g. "We couldn't find an account with that email."
       - Success (13px, success color): "Check your inbox — a reset link is on its way."
     Hidden by default

  e) Send Reset Link button
     Full width, primary-500, 52px, rounded-xl, "Send reset link" label
     While loading: disabled, spinner, "Sending…"
     After success: disabled, label "Sent ✓", bg-success-500 (or green-500 if no success token)

  f) Back to sign in link
     "Back to sign in" — 14px, neutral-400, centered, mt-4

---

PART 5 — FORGOT PASSWORD HANDLER

  const handleForgotPassword = async () => {
    const trimmedEmail = forgotEmail.trim().toLowerCase()
    if (!trimmedEmail) return

    setForgotLoading(true)
    setForgotError(null)
    setForgotSuccess(false)

    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: `${window.location.origin}?reset=true`,
    })

    setForgotLoading(false)

    if (error) {
      // Don't reveal whether the email exists — always show success to prevent enumeration
      console.warn('Reset password error (not shown to user):', error)
    }

    // Always show success message regardless of error, for security
    setForgotSuccess(true)
  }

Note: Supabase sends the reset email directly. The app doesn't need to handle the reset form — Supabase's hosted UI handles that via the redirect link.

---

PART 6 — APP-LOAD DEEP LINK HANDLING

The password reset link redirects to the app with `?reset=true` in the URL. In AppContext's mount effect (alongside the existing payment and session checks), add:

  const resetParam = urlParams.get('reset')
  if (resetParam === 'true') {
    // Supabase handles the token exchange automatically via onAuthStateChange
    // Just clean the URL and let the session listener take over
    window.history.replaceState({}, '', window.location.pathname)
  }

The existing `supabase.auth.onAuthStateChange` listener already fires with a SIGNED_IN event after a successful password reset, which will route the user to home. No additional handling needed.

---

DO NOT CHANGE:
- Welcome screen layout, headline, illustration, or primary CTA — only add the one sign-in line at the bottom
- Account Creation screen (used for new users post-paywall — separate from sign-in)
- AppContext fields already set by previous prompts — only read and set existing fields
- Any other screen, component, nav tab, or feature
- Supabase Auth setup, session check logic, or profile write from the auth prompt
```
