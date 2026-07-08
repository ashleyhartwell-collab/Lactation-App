/**
 * Data-layer helper for simulating a feeding-path switch mid-test.
 *
 * Path switching is NOT a built UI feature yet — docs/product/path-transition-design.md
 * is still a draft awaiting approval, and no "Path Change hub" exists in the app.
 * Per Ashley's decision (2026-07-08), instead of testing a switch-initiation flow that
 * doesn't exist, these tests verify the *reactive* behavior: if feeding_preference
 * changes at the data layer (which the backend already allows — upsert-profile has
 * no first-time-only guard), does Getting Started correctly re-render on next load?
 *
 * This mirrors the same service-role update pattern used in global-setup.ts.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

export type FeedingPathCode = 'A' | 'B' | 'C'

// Keep in sync with global-setup.ts's FEEDING_PATH_TO_PREFERENCE and the CHECK
// constraint in migrations/00014_feeding_preference_enum.sql.
const FEEDING_PATH_TO_PREFERENCE: Record<FeedingPathCode, string> = {
  A: 'breastfeeding',
  B: 'exclusive_pumping',
  C: 'combo',
}

/**
 * Directly updates a test user's feeding_preference in Supabase, bypassing any
 * app UI. Simulates "the backend value changed" so we can verify Getting Started's
 * reactive re-render (path-gated guide visibility, path tag, guide-count totals)
 * without depending on a switch-initiation UI that doesn't exist yet.
 *
 * Caller is responsible for reloading the page after calling this.
 */
export async function switchFeedingPathForUser(email: string, newPath: FeedingPathCode) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data: userList, error: listError } = await supabase.auth.admin.listUsers()
  if (listError) {
    throw new Error(`[path-switch] Failed to list users: ${listError.message}`)
  }
  const user = userList.users.find(u => u.email === email)
  if (!user) {
    throw new Error(`[path-switch] No auth user found for ${email}`)
  }

  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({ feeding_preference: FEEDING_PATH_TO_PREFERENCE[newPath] })
    .eq('id', user.id)

  if (updateError) {
    throw new Error(`[path-switch] Failed to update feeding_preference for ${email}: ${updateError.message}`)
  }
}
