/**
 * Global setup — runs once before all tests.
 * Creates all test users in Supabase:
 *   - 'returning', 'returningA', 'returningC': complete profiles, one per feeding
 *     path (B, A, C respectively) — used by flow1b, flow2, flow3, cross-cutting,
 *     and flow-path-personalization
 *   - scenario users (newborn, week2, week3, pastWeek6): auth-only (no profile),
 *     used by flow1a onboarding tests via signup route mock
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { TEST_USERS, dobFromOffset } from './fixtures/test-users'

dotenv.config({ path: '.env.test' })

// Maps the short feedingPath code ('A' | 'B' | 'C') used throughout the test
// suite to the actual feeding_preference values the DB accepts. Must stay in
// sync with the CHECK constraint added in migration 00014_feeding_preference_enum.sql
// ('breastfeeding' | 'exclusive_pumping' | 'combo' | 'formula'). This mapping
// previously used the stale value 'pumping' for Path B, which migration 00014
// removed from the constraint — that upsert would violate the CHECK constraint
// and fail. Fixed here to 'exclusive_pumping'.
const FEEDING_PATH_TO_PREFERENCE: Record<string, string> = {
  A: 'breastfeeding',
  B: 'exclusive_pumping',
  C: 'combo',
}

export default async function globalSetup() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // Fetch ALL existing users once for efficient cleanup.
  // listUsers() is paginated (default 50/page), so we must walk every page —
  // otherwise a leftover test user on a later page is not found for deletion and
  // the subsequent createUser fails with "already registered".
  const existingByEmail = new Map<string, string>()
  const perPage = 1000
  for (let page = 1; ; page++) {
    const { data: pageData } = await supabase.auth.admin.listUsers({ page, perPage })
    const users = pageData?.users ?? []
    for (const u of users) {
      // Supabase normalizes stored emails to lowercase, so key the map by the
      // lowercased email to keep lookups case-insensitive (test fixtures use
      // mixed-case local parts like "returningA").
      if (u.email) existingByEmail.set(u.email.toLowerCase(), u.id)
    }
    if (users.length < perPage) break
  }

  // Helper: delete + recreate an auth user (no profile)
  async function resetAuthUser(email: string, password: string) {
    const existingId = existingByEmail.get(email.toLowerCase())
    if (existingId) {
      await supabase.auth.admin.deleteUser(existingId)
      console.log(`[setup] Deleted existing user: ${email}`)
    }
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,         // mark confirmed without sending email
      suppress_confirmation_email: true,  // do not send welcome / confirmation email
    } as any)
    if (error || !data.user) {
      throw new Error(`[setup] Failed to create user ${email}: ${error?.message}`)
    }
    console.log(`[setup] Created user: ${email} (${data.user.id})`)
    return data.user.id
  }

  // -----------------------------------------------------------------------
  // 1. Returning users — full profiles, one per feeding path
  //    (used by flow1b, flow2, flow3, cross-cutting, and flow-path-personalization)
  // -----------------------------------------------------------------------
  const returningUsers = [
    TEST_USERS.returning,        // Path B
    TEST_USERS.returningA,       // Path A
    TEST_USERS.returningC,       // Path C
    TEST_USERS.returningAWeek4,  // Path A, day 28 — T-A-B Window 3 coverage
    TEST_USERS.returningAWeek10, // Path A, day 70 — T-A-B Window 4 coverage
  ]

  for (const returningUser of returningUsers) {
    const returningId = await resetAuthUser(returningUser.email, returningUser.password)

    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        id: returningId,
        display_name: returningUser.name,
        baby_dob: dobFromOffset(returningUser.dobOffsetDays),
        feeding_preference: FEEDING_PATH_TO_PREFERENCE[returningUser.feedingPath] ?? 'breastfeeding',
        onboarding_complete: true,
      })

    if (profileError) {
      throw new Error(`[setup] Failed to seed profile for ${returningUser.email}: ${profileError.message}`)
    }
    console.log(`[setup] Seeded full profile for ${returningUser.email}`)
  }

  // -----------------------------------------------------------------------
  // 2. Scenario users for flow1a — auth-only, no profile
  //    Tests mock the signup endpoint to call signInWithPassword instead,
  //    bypassing Supabase's per-hour signup rate limit.
  // -----------------------------------------------------------------------
  const scenarioUsers = [
    TEST_USERS.newborn,
    TEST_USERS.week2,
    TEST_USERS.week3,
    TEST_USERS.pastWeek6,
  ]

  for (const scenarioUser of scenarioUsers) {
    await resetAuthUser(scenarioUser.email, scenarioUser.password)
    // No profile upsert — app will see a fresh user and route to post-paywall
    // personalization steps after the mocked "signup" succeeds.
  }

  // -----------------------------------------------------------------------
  // 3. Verify each returning user can sign in (sanity check)
  // -----------------------------------------------------------------------
  const anonClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  for (const returningUser of returningUsers) {
    const { error: signInError } = await anonClient.auth.signInWithPassword({
      email: returningUser.email,
      password: returningUser.password,
    })
    if (signInError) {
      throw new Error(
        `[setup] CREDENTIAL VERIFICATION FAILED for ${returningUser.email} — sign-in returned: "${signInError.message}"\n` +
        `Check: (1) Is SUPABASE_URL correct? (2) Does the Lovable app use the same Supabase project?\n` +
        `Supabase URL in use: ${process.env.SUPABASE_URL}`
      )
    }
    console.log(`[setup] ✓ Credential verification passed — sign-in works for ${returningUser.email}`)
  }
}
