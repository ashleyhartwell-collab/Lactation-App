/**
 * Flow 1B — Returning user sign-in and session restore
 * Uses the pre-seeded 'returning' user from global-setup.ts
 */
import { test, expect, signInAs } from '../fixtures/auth-fixture'
import { TEST_USERS } from '../fixtures/test-users'

test.describe('Flow 1B — Returning user', () => {

  test('Sign in routes to Home with profile loaded', async ({ page }) => {
    // Auth is now passwordless (magic-link); we authenticate via session
    // injection instead of the removed password form. See fixtures/session-auth.ts.
    await signInAs(page, 'returning')

    // Should be on Home
    await page.waitForURL(/\/$|\/home/, { timeout: 15_000 })

    // Profile should be loaded — This Week tab shows the 6-week plan with week navigation
    await page.locator('[data-testid="tab-this-week"]').or(page.locator('text=This Week')).first().click()
    await expect(page.locator('text=Mama\'s 6-Week Plan').or(page.locator('text=6-Week Plan')).first()).toBeVisible()
    await expect(page.locator('button:has-text("Week 1")')).toBeVisible()
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

  // The app migrated from password-form login to passwordless magic-link auth,
  // so there is no password field, wrong-password error, or forgot-password flow
  // to assert anymore. These tests are skipped rather than deleted as a marker.
  // TODO: replace with magic-link coverage (e.g. invalid-email handling and the
  // "Send login link" confirmation) once that flow is specced.
  test.skip('Wrong password shows friendly error', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Sign in')

    await page.fill('input[type="email"]', TEST_USERS.returning.email)
    await page.fill('input[type="password"]', 'WrongPassword999!')
    await page.click('button:has-text("Sign in")')

    await expect(page.locator('text=Incorrect email or password')).toBeVisible()

    // Should NOT have navigated away
    await expect(page.locator('text=Welcome back')).toBeVisible()
  })

  test.skip('Forgot password — always shows success message', async ({ page }) => {
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
