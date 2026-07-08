/**
 * Unit-ish integration test for the session-injection auth helper.
 * Proves that a session obtained via getSession + injected via injectSession
 * authenticates a returning user into the app (lands on Home), replacing the
 * removed password-form login flow.
 */
import { test, expect } from '@playwright/test'
import { getSession, injectSession } from '../fixtures/session-auth'
import { signInAs } from '../fixtures/auth-fixture'
import { TEST_USERS } from '../fixtures/test-users'

test('injectSession authenticates a returning user into Home', async ({ page }) => {
  const user = TEST_USERS.returning
  const session = await getSession(user.email, user.password)

  await injectSession(page, session)

  await page.waitForURL(/\/$|\/home/, { timeout: 15_000 })
  await expect(
    page.locator('[data-testid="home-screen"]').or(page.locator('text=Hey, Mama')).first()
  ).toBeVisible({ timeout: 10_000 })
})

test('signInAs authenticates via injection and lands on Home', async ({ page }) => {
  await signInAs(page, 'returningA')

  await expect(page).toHaveURL(/\/$|\/home/)
  await expect(
    page.locator('[data-testid="home-screen"]').or(page.locator('text=Hey, Mama')).first()
  ).toBeVisible({ timeout: 10_000 })
})
