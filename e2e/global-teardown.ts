/**
 * Global teardown — runs once after all tests.
 * Deletes all test users created during the run.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { TEST_USERS } from './fixtures/test-users'

dotenv.config({ path: '.env.test' })

export default async function globalTeardown() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const testEmails = Object.values(TEST_USERS).map(u => u.email)
  const { data } = await supabase.auth.admin.listUsers()

  for (const user of data?.users ?? []) {
    if ((testEmails as readonly string[]).includes(user.email ?? '')) {
      await supabase.auth.admin.deleteUser(user.id)
      console.log(`[teardown] Deleted test user: ${user.email}`)
    }
  }
}
