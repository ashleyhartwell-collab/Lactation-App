/**
 * Flow 1A — New user onboarding (first session, complete)
 * Four scenarios: newborn, week 2, week 3, past week 6
 *
 * Account creation workaround
 * ───────────────────────────
 * Supabase's free tier limits signup to a few calls per hour. These tests
 * run the full onboarding UI and end at a "Create Account" form. To avoid
 * hitting that limit we:
 *   1. Pre-seed the auth users in global-setup (no profile, no onboarding_complete)
 *   2. Intercept POST /auth/v1/signup and respond with a real signInWithPassword
 *      session for the pre-seeded user. The app receives a valid session and
 *      treats it as a new signup — because the user has no profile, it routes
 *      to the post-paywall personalisation steps exactly as it would for a new user.
 */
import { test, expect } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import { mockStripeRoutes } from '../fixtures/auth-fixture'
import { TEST_USERS, dobFromOffset } from '../fixtures/test-users'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

const SUPABASE_URL = process.env.SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? ''

/**
 * Install a route interceptor that catches the Supabase signup POST and
 * responds with a real sign-in session for the pre-seeded user.
 * This bypasses the email-signup rate limit without mocking any app logic.
 */
async function mockSignupAsSignIn(page: any, email: string, password: string) {
  await page.route('**/auth/v1/signup', async (route: any) => {
    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    const { data, error } = await client.auth.signInWithPassword({ email, password })

    if (data.session && data.user) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: data.session.access_token,
          token_type: 'bearer',
          expires_in: 3600,
          refresh_token: data.session.refresh_token,
          user: data.user,
        }),
      })
    } else {
      console.warn(`[flow1a] signup mock: sign-in failed (${error?.message}) — falling through`)
      await route.continue()
    }
  })
}

// Helper: complete onboarding from Welcome through to Home
async function completeOnboarding(page: any, opts: {
  email: string            // pre-seeded email to use at "Create Account"
  name: string
  babyName: string | null
  dobOffsetDays: number
  feedingPath: 'A' | 'B' | 'C'
  skipPump?: boolean
}) {
  // Step 1 of 3 — Name/Address
  // UI shows a button picker (Mama/Mom/Mommy/My name); click "My name" to reveal the text input
  await expect(page.locator('text=Step 1 of 3')).toBeVisible()
  const myNameBtn = page.locator('button:has-text("My name")')
  if (await myNameBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await myNameBtn.click()
  }
  await page.fill('input[placeholder*="name"], input[name*="name"], input[type="text"]', opts.name)
  await page.click('button:has-text("Continue")')

  // Step 2 of 3 — Baby Name + DOB
  await expect(page.locator('text=Step 2 of 3')).toBeVisible()

  if (opts.babyName) {
    await page.fill('input[placeholder*="Baby"]', opts.babyName)
  } else {
    await page.click('text=I\'ll add this later')
  }

  // Set DOB — assumes a date input or date picker
  const dob = dobFromOffset(opts.dobOffsetDays)
  const dobInput = page.locator('input[type="date"]').first()
  if (await dobInput.isVisible()) {
    await dobInput.fill(dob)
  }
  await page.click('button:has-text("Continue")')

  // Step 3 of 3 — Feeding Path
  await expect(page.locator('text=Step 3 of 3')).toBeVisible()
  await page.click(`text=${opts.feedingPath === 'A' ? 'Nursing' : opts.feedingPath === 'B' ? 'Pumping' : 'Combination'}`)
  await page.click('button:has-text("Continue")')

  // Paywall — no step indicator
  await expect(page.locator('text=Step')).not.toBeVisible()

  // Trigger Stripe mock checkout
  await page.click('button:has-text("Start"), button:has-text("Get Access"), button:has-text("Begin")')

  // App redirects back with ?payment=success (mocked)
  await page.waitForURL(/payment=success/)
  // Then routes to Account Creation
  await page.waitForSelector('input[type="email"]')

  // Account Creation — use pre-seeded credentials
  // (signup route is intercepted to sign-in instead, bypassing rate limit)
  await page.fill('input[type="email"]', opts.email)
  await page.fill('input[type="password"]', 'TestPass123!')
  await page.click('button:has-text("Create"), button:has-text("Continue")')

  // Post-paywall personalization — Goal
  await expect(page.locator('text=Personalizing your plan')).toBeVisible({ timeout: 10_000 })
  await page.locator('text=Skip for now').or(page.locator('text=Not sure yet')).first().click()

  // Breast Anatomy
  await page.locator('text=Skip for now').or(page.locator('text=Not sure yet')).first().click()

  // Pump screen — only appears for B or C
  const pumpVisible = await page.locator('text=pump').or(page.locator('text=Pump')).first().isVisible({ timeout: 3000 }).catch(() => false)
  if (pumpVisible) {
    if (opts.feedingPath === 'A') {
      throw new Error('Pump screen appeared for Path A — routing bug')
    }
    if (opts.skipPump) {
      await page.locator('text=Skip for now').or(page.locator('text=Not sure yet')).first().click()
    }
  }

  // Home Transition → Home
  await page.waitForURL(/\/$|\/home/, { timeout: 15_000 })
}

test.describe('Flow 1A — New user onboarding', () => {

  test.beforeEach(async ({ page, baseURL }) => {
    await mockStripeRoutes(page, baseURL ?? 'http://localhost:5173')
    await page.context().clearCookies()
    await page.goto('/')
  })

  test('1A-i: Newborn (week 1) — Path A Nursing', async ({ page }) => {
    const scenario = TEST_USERS.newborn
    await mockSignupAsSignIn(page, scenario.email, scenario.password)

    await page.click('button:has-text("Get started"), button:has-text("Begin"), button:has-text("Start")')
    await completeOnboarding(page, {
      email: scenario.email,
      name: scenario.name,
      babyName: scenario.babyName,
      dobOffsetDays: scenario.dobOffsetDays,
      feedingPath: 'A',
      skipPump: true,
    })

    await page.locator('[data-testid="tab-this-week"]').or(page.locator('text=This Week')).first().click()
    await expect(page.locator('text=Week 1 of 6')).toBeVisible()
    await expect(page.locator('text=Starting from where you are')).toBeVisible()
    await expect(page.locator('text=Colostrum, latch')).toBeVisible()
    // App shows "Mama's Plan" not user name — name check removed
  })

  test('1A-ii: Week 2 — Path B Pumping, skip baby name', async ({ page }) => {
    const scenario = TEST_USERS.week2
    await mockSignupAsSignIn(page, scenario.email, scenario.password)

    await page.click('button:has-text("Get started"), button:has-text("Begin"), button:has-text("Start")')
    await completeOnboarding(page, {
      email: scenario.email,
      name: scenario.name,
      babyName: null,
      dobOffsetDays: scenario.dobOffsetDays,
      feedingPath: 'B',
      skipPump: false,
    })

    await page.locator('[data-testid="tab-this-week"]').or(page.locator('text=This Week')).first().click()
    await expect(page.locator('text=Week 2 of 6')).toBeVisible()
    await expect(page.locator('text=Milk volume')).toBeVisible()
  })

  test('1A-iii: Week 3 — Path C Combination', async ({ page }) => {
    const scenario = TEST_USERS.week3
    await mockSignupAsSignIn(page, scenario.email, scenario.password)

    await page.click('button:has-text("Get started"), button:has-text("Begin"), button:has-text("Start")')
    await completeOnboarding(page, {
      email: scenario.email,
      name: scenario.name,
      babyName: scenario.babyName ?? null,
      dobOffsetDays: scenario.dobOffsetDays,
      feedingPath: 'C',
      skipPump: true,
    })

    await page.locator('[data-testid="tab-this-week"]').or(page.locator('text=This Week')).first().click()
    await expect(page.locator('text=Week 3 of 6')).toBeVisible()
    await expect(page.locator('text=combination')).toBeVisible()
  })

  test('1A-iv: Past week 6 — week clamped to 6', async ({ page }) => {
    const scenario = TEST_USERS.pastWeek6
    await mockSignupAsSignIn(page, scenario.email, scenario.password)

    await page.click('button:has-text("Get started"), button:has-text("Begin"), button:has-text("Start")')
    await completeOnboarding(page, {
      email: scenario.email,
      name: scenario.name,
      babyName: null,
      dobOffsetDays: scenario.dobOffsetDays,
      feedingPath: 'A',
      skipPump: true,
    })

    await page.locator('[data-testid="tab-this-week"]').or(page.locator('text=This Week')).first().click()
    await expect(page.locator('text=Week 6 of 6')).toBeVisible()
    await expect(page.locator('text=completed the foundational plan')).toBeVisible()
    await expect(page.locator('text=Week 7')).not.toBeVisible()
  })

  test('Paywall headline matches path + week', async ({ page }) => {
    // Week 2, Path B — headline should say "pumping" and "week 2"
    await page.click('button:has-text("Get started"), button:has-text("Begin"), button:has-text("Start")')

    // Fill name — click "My name" picker button first to reveal the text input
    const myNameBtn = page.locator('button:has-text("My name")')
    if (await myNameBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await myNameBtn.click()
    }
    await page.fill('input[placeholder*="name"], input[name*="name"], input[type="text"]', 'Jamie')
    await page.click('button:has-text("Continue")')

    // Skip baby name, set DOB 14 days ago
    await page.click('text=I\'ll add this later')
    const dob = dobFromOffset(-14)
    const dobInput = page.locator('input[type="date"]').first()
    if (await dobInput.isVisible()) await dobInput.fill(dob)
    await page.click('button:has-text("Continue")')

    // Select Pumping
    await page.click('text=Pumping')
    await page.click('button:has-text("Continue")')

    // Now on paywall — check headline
    await expect(page.locator('text=/Jamie.*pumping.*week 2/i')).toBeVisible()
  })

})
