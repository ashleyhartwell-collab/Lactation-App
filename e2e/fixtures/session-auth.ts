/**
 * Session-injection auth for e2e tests.
 *
 * The app migrated from password-form login to passwordless magic-link auth, so
 * there is no password field to fill. The test users still have passwords
 * (created in global-setup.ts), so we obtain a real session via signInWithPassword
 * and inject it into the browser's localStorage under the supabase-js storage key.
 * On reload the app's supabase client restores the session — no UI login needed.
 */
import type { Page } from '@playwright/test'
import { createClient, type Session } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

// Default supabase-js localStorage key: sb-<projectRef>-auth-token, where
// projectRef is the subdomain of the project URL.
export const storageKey = `sb-${new URL(process.env.SUPABASE_URL!).hostname.split('.')[0]}-auth-token`

/**
 * Authenticate against Supabase and return the resulting session.
 * The test users retain passwords even though the app UI no longer uses them.
 */
export async function getSession(email: string, password: string): Promise<Session> {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error || !data.session) {
    throw new Error(`[session-auth] Failed to sign in ${email}: ${error?.message ?? 'no session returned'}`)
  }
  return data.session
}

/**
 * Seed the session into the app's localStorage, then reload so the supabase
 * client picks it up. Injected once (not via addInitScript) so that a later
 * sign-out + reload genuinely stays signed out.
 */
export async function injectSession(page: Page, session: Session): Promise<void> {
  // Must be on the app origin before touching its localStorage.
  await page.goto('/')
  await page.evaluate(
    ([key, value]) => window.localStorage.setItem(key, value),
    [storageKey, JSON.stringify(session)] as const
  )
  await page.goto('/')
}
