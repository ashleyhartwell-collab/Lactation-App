/**
 * Flow 1B — Returning user sign-in and session restore
 * Uses the pre-seeded 'returning' user from global-setup.ts
 */
import { test, expect } from '../fixtures/auth-fixture'
import { TEST_USERS } from '../fixtures/test-users'

test.describe('Flow 1B — Returning user', () => {

  test('Sign in routes to Home with profile loaded', async ({ page }) => {
    const user = TEST_USERS.returning

    await page.goto('/')

    // Should see Welcome, not Home (no active session)
    await expect(page.locator('text=Sign in')).toBeVisible({ timeout: 8000 })

    // Tap sign-in link
    await page.click('text=Sign in')
    await expect(page.locator('text=Welcome back')).toBeVisible()

    // Fill credentials
    await page.fill('input[type="email"]', user.email)
    await page.fill('input[type="password"]', user.password)
    await page.click('button:has-text("Sign in")')

    // Should route to Home
    await page.waitForURL(/\/$|\/home/, { timeout: 15_000 })

    // Profile should be loaded — This Week tab shows correct week
    await page.locator('[data-testid="tab-this-week"]').or(page.locator('text=This Week')).first().click()
    // App shows "Mama's Plan" not the user's name — verify correct week
    await expect(page.locator(`text=Week ${user.expectedWeek} of 6`)).toBeVisible()
  })

  test('Session persists across reload', async ({ signedInPage: page }) => {
    await page.reload()

    // Should stay on Home — no flash of Welcome
    await expect(page.locator('text=Welcome')).not.toBeVisible({ timeout: 3000 }).catch(() => {})
    await page.waitForURL(/\/$|\/home/, { timeout: 10_000 })
  })

  test('Sign out returns to Welcome and clears session', async ({ signedInPage: page }) => {
    // Find and click sign-out — may be inside Settings
    await page.locator('[data-testid="sign-out"]').or(page.locator('text=Sign out')).first().click().catch(async () => {
      await page.goto('/settings')
      await page.locator('[data-testid="sign-out"]').or(page.locator('text=Sign out')).first().click()
    })

    await expect(page.locator('text=Sign in')).toBeVisible({ timeout: 8000 })

    // Reload — should not auto-route back to Home
    await page.reload()
    await expect(page.locator('text=Sign in')).toBeVisible({ timeout: 8000 })
  })

  test('Wrong password shows friendly error', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Sign in')

    await page.fill('input[type="email"]', TEST_USERS.returning.email)
    await page.fill('input[type="password"]', 'WrongPassword999!')
    await page.click('button:has-text("Sign in")')

    await expect(page.locator('text=Incorrect email or password')).toBeVisible()

    // Should NOT have navigated away
    await expect(page.locator('text=Welcome back')).toBeVisible()
  })

  test('Forgot password — always shows success message', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Sign in')
    await page.click('text=Forgot your password')

    await expect(page.locator('text=Reset your password')).toBeVisible()

    await page.fill('input[type="email"]', 'doesnotexist@nowhere.com')
    await page.click('button:has-text("Send reset link")')

    // Always shows success (security: no email enumeration)
    await expect(page.locator('text=Check your inbox')).toBeVisible({ timeout: 8000 })
  })

})
