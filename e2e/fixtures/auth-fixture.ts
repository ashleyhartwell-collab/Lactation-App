/**
 * Playwright fixture: signedInPage
 * Signs in as a given test user and returns the page already on Home.
 * Also provides the Stripe mock (intercepts edge function calls).
 */
import { test as base, Page, Route } from '@playwright/test'
import { TEST_USERS, TestUserKey } from './test-users'
import { getSession, injectSession } from './session-auth'

type AuthFixtures = {
  signedInPage: Page
  signedInPageNursing: Page
  signedInPageReturningA: Page
  signedInPageReturningC: Page
  signedInPageReturningAWeek4: Page
  mockStripe: void
}

/**
 * Intercept Supabase edge function calls to create-checkout-session and
 * verify-payment so tests never hit real Stripe.
 *
 * create-checkout-session → returns a URL pointing back to the app with
 * ?payment=success&session_id=test_sess_123
 *
 * verify-payment → returns { paid: true, session_id: 'test_sess_123' }
 */
export async function mockStripeRoutes(page: Page, baseURL: string) {
  await page.route('**/functions/v1/create-checkout-session', async (route: Route) => {
    const successUrl = `${baseURL}?payment=success&session_id=test_sess_123`
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ url: successUrl, session_id: 'test_sess_123' }),
    })
  })

  await page.route('**/functions/v1/verify-payment', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ paid: true, session_id: 'test_sess_123' }),
    })
  })
}

/**
 * Sign in programmatically via session injection.
 *
 * The app moved to passwordless magic-link auth, so there is no password form to
 * drive. We obtain a real Supabase session for the user (they still have
 * passwords from global-setup) and inject it into localStorage, then wait for
 * the Home screen. See fixtures/session-auth.ts.
 *
 * Returns when the Home screen is reached.
 */
export async function signInAs(page: Page, userKey: TestUserKey) {
  const user = TEST_USERS[userKey]
  const session = await getSession(user.email, user.password)
  await injectSession(page, session)
  await page.waitForURL(/\/$|\/home/, { timeout: 15_000 })
}

export const test = base.extend<AuthFixtures>({
  mockStripe: [async ({ page, baseURL }, use) => {
    await mockStripeRoutes(page, baseURL ?? 'http://localhost:5173')
    await use()
  }, { auto: true }],

  signedInPage: async ({ page, baseURL }, use) => {
    await mockStripeRoutes(page, baseURL ?? 'http://localhost:5173')
    await signInAs(page, 'returning')
    await use(page)
  },

  // Path A (exclusive nursing) — needed anywhere a test depends on a guide
  // that's gated to Path A/C (e.g. Latch & Positioning, hidden for Path B).
  // 'returning' (used by signedInPage) is pre-seeded on Path B, so it can't
  // cover that case on its own. NOTE: this signs in as 'newborn', a fresh-signup
  // scenario user with no pre-existing profile/progress — use this for
  // Path A content checks, but NOT for returning-user (complete profile,
  // pre-existing progress) scenarios. Use signedInPageReturningA for those.
  signedInPageNursing: async ({ page, baseURL }, use) => {
    await mockStripeRoutes(page, baseURL ?? 'http://localhost:5173')
    await signInAs(page, 'newborn')
    await use(page)
  },

  // Genuine returning user, Path A (nursing) — complete profile, pre-existing
  // progress. Use for returning-user scenarios that need Path A, as opposed to
  // signedInPageNursing's fresh-signup 'newborn' persona.
  signedInPageReturningA: async ({ page, baseURL }, use) => {
    await mockStripeRoutes(page, baseURL ?? 'http://localhost:5173')
    await signInAs(page, 'returningA')
    await use(page)
  },

  // Genuine returning user, Path C (combination feeding) — complete profile,
  // pre-existing progress.
  signedInPageReturningC: async ({ page, baseURL }, use) => {
    await mockStripeRoutes(page, baseURL ?? 'http://localhost:5173')
    await signInAs(page, 'returningC')
    await use(page)
  },

  // Genuine returning user, Path A, day 28 postpartum — added specifically for
  // T-A-B Window 3 (days 15-42) coverage in flow-path-change-hub.spec.ts, since
  // no other Path A fixture lands in that day range.
  signedInPageReturningAWeek4: async ({ page, baseURL }, use) => {
    await mockStripeRoutes(page, baseURL ?? 'http://localhost:5173')
    await signInAs(page, 'returningAWeek4')
    await use(page)
  },
})

export { expect } from '@playwright/test'
