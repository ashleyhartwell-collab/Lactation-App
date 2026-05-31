/**
 * Global setup — runs once before all tests.
 * Creates all test users in Supabase:
 *   - 'returning': complete profile, used by flow1b, flow2, flow3, cross-cutting
 *   - scenario users (newborn, week2, week3, pastWeek6): auth-only (no profile),
 *     used by flow1a onboarding tests via signup route mock
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { TEST_USERS, dobFromOffset } from './fixtures/test-users'

dotenv.config({ path: '.env.test' })

export default async function globalSetup() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // Fetch all existing users once for efficient cleanup
  const { data: existing } = await supabase.auth.admin.listUsers()
  const existingByEmail = new Map(
    (existing?.users ?? []).map(u => [u.email ?? '', u.id])
  )

  // Helper: delete + recreate an auth user (no profile)
  async function resetAuthUser(email: string, password: string) {
    const existingId = existingByEmail.get(email)
    if (existingId) {
      await supabase.auth.admin.deleteUser(existingId)
      console.log(`[setup] Deleted existing user: ${email}`)
    }
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,   // skip email confirmation
    })
    if (error || !data.user) {
      throw new Error(`[setup] Failed to create user ${email}: ${error?.message}`)
    }
    console.log(`[setup] Created user: ${email} (${data.user.id})`)
    return data.user.id
  }

  // -----------------------------------------------------------------------
  // 1. 'returning' user — full profile (used by flow1b, flow2, flow3, cross-cutting)
  // -----------------------------------------------------------------------
  const returningUser = TEST_USERS.returning
  const returningId = await resetAuthUser(returningUser.email, returningUser.password)

  const { error: profileError } = await supabase
    .from('user_profiles')
    .upsert({
      id: returningId,
      display_name: returningUser.name,
      baby_dob: dobFromOffset(returningUser.dobOffsetDays),
      feeding_preference: ({ A: 'breastfeeding', B: 'pumping', C: 'combo' } as Record<string, string>)[returningUser.feedingPath] ?? 'breastfeeding',
      onboarding_complete: true,
    })

  if (profileError) {
    throw new Error(`[setup] Failed to seed returning profile: ${profileError.message}`)
  }
  console.log(`[setup] Seeded full profile for ${returningUser.email}`)

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
  // 3. Verify the returning user can sign in (sanity check)
  // -----------------------------------------------------------------------
  const anonClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
  const { error: signInError } = await anonClient.auth.signInWithPassword({
    email: returningUser.email,
    password: returningUser.password,
  })
  if (signInError) {
    throw new Error(
      `[setup] CREDENTIAL VERIFICATION FAILED — user was created but sign-in returned: "${signInError.message}"\n` +
      `Check: (1) Is SUPABASE_URL correct? (2) Does the Lovable app use the same Supabase project?\n` +
      `Supabase URL in use: ${process.env.SUPABASE_URL}`
    )
  }
  console.log(`[setup] ✓ Credential verification passed — sign-in works for ${returningUser.email}`)
}
