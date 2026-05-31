/**
 * Playwright fixture: signedInPage
 * Signs in as a given test user and returns the page already on Home.
 * Also provides the Stripe mock (intercepts edge function calls).
 */
import { test as base, Page, Route } from '@playwright/test'
import { TEST_USERS, TestUserKey } from './test-users'

type AuthFixtures = {
  signedInPage: Page
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
 * Sign in via the UI sign-in form.
 * Returns when the Home screen is visible.
 */
export async function signInAs(page: Page, userKey: TestUserKey) {
  const user = TEST_USERS[userKey]
  await page.goto('/')

  // If session check routes to Home directly, we're done
  const onHome = page.locator('[data-testid="home-screen"]').or(page.locator('text=Your plan')).first()
  const onWelcome = page.locator('text=Sign in').first()

  // Wait to see which screen loads
  await Promise.race([
    onHome.waitFor({ timeout: 5000 }).then(() => 'home'),
    onWelcome.waitFor({ timeout: 5000 }).then(() => 'welcome'),
  ]).catch(() => 'welcome')

  // Check if already on home
  if (await onHome.isVisible()) return

  // Navigate to sign-in
  await page.click('text=Sign in')
  await page.fill('input[type="email"]', user.email)
  await page.fill('input[type="password"]', user.password)
  await page.click('button:has-text("Sign in")')

  // Wait for home screen
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
})

export { expect } from '@playwright/test'
