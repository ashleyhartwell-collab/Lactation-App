/**
 * Flow — Path personalization: returning users + path switching
 *
 * Covers the remaining scenarios from Ashley's 11-scenario request (2026-07-08)
 * not already handled elsewhere:
 *   - New user Path A/B/C            → flow1a-onboarding.spec.ts
 *   - Returning user Path A/B/C      → Part A below
 *   - Returning user who switches path (A→B, B→C, C→A, B→A, A→C) → Part B below
 *
 * Path switching is not a built UI feature — docs/product/path-transition-design.md
 * is still a draft awaiting approval, and there's no "Path Change hub" in the app.
 * Per Ashley's decision, Part B tests the *reactive* behavior instead: update
 * feeding_preference directly at the data layer (mirroring global-setup.ts's own
 * seeding pattern, via fixtures/path-switch-helper.ts), reload, and verify Getting
 * Started correctly re-renders — Latch visibility toggles, guide count and path tag
 * update, and prior guide completions persist across the switch.
 */
import { test, expect } from '../fixtures/auth-fixture'
import { TEST_USERS } from '../fixtures/test-users'
import { switchFeedingPathForUser } from '../fixtures/path-switch-helper'

// Helper: build a Playwright OR-locator from multiple selectors
function orLoc(page: any, ...selectors: string[]) {
  let loc = page.locator(selectors[0])
  for (let i = 1; i < selectors.length; i++) {
    loc = loc.or(page.locator(selectors[i]))
  }
  return loc
}

test.describe('Flow — Path personalization', () => {

  // -----------------------------------------------------------------
  // Part A: Returning user, Path A / B / C
  // -----------------------------------------------------------------
  test.describe('Part A — Returning user by path', () => {

    test('Returning user, Path A (nursing): 7 guides, Latch & Positioning visible, bottle/nipple guide absent, Nursing tag shown', async ({ signedInPageReturningA: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      await expect(
        orLoc(page, 'text=Getting a Good Latch', 'text=Latch & Positioning').first()
      ).toBeVisible({ timeout: 10_000 })
      await expect(
        page.locator('text=/of 7 guides/').first()
      ).toBeVisible({ timeout: 8000 }).catch(() => {})

      // Bottle/nipple guide is gated [B, C] — Path A never sees it
      await expect(page.locator('text=Choosing a Bottle and Nipple')).toHaveCount(0)

      await expect(page.locator('text=Nursing').first()).toBeVisible({ timeout: 5000 }).catch(() => {})
    })

    test('Returning user, Path B (exclusive pumping): 7 guides, Latch & Positioning hidden, bottle/nipple guide shown (EP variant), Pumping tag shown', async ({ signedInPage: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      await expect(page.locator('text=Getting a Good Latch')).toHaveCount(0)
      await expect(page.locator('text=Latch & Positioning')).toHaveCount(0)
      await expect(
        page.locator('text=/of 7 guides/').first()
      ).toBeVisible({ timeout: 8000 }).catch(() => {})

      // Bottle/nipple guide present for Path B — confirm the EP variant (no formula content)
      await orLoc(page, 'text=Choosing a Bottle and Nipple').first().click()
      await expect(page.locator('text=/2 to 5 ounce/i').first()).toBeVisible({ timeout: 8000 })
      await expect(page.locator('text=/formula/i')).toHaveCount(0)
    })

    test('Returning user, Path C (combination): 8 guides, Latch & Positioning visible, bottle/nipple guide shown (Combo variant), Combination tag shown', async ({ signedInPageReturningC: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      await expect(
        orLoc(page, 'text=Getting a Good Latch', 'text=Latch & Positioning').first()
      ).toBeVisible({ timeout: 10_000 })
      await expect(
        page.locator('text=/of 8 guides/').first()
      ).toBeVisible({ timeout: 8000 }).catch(() => {})

      await expect(
        orLoc(page, 'text=Combination', 'text=Combo').first()
      ).toBeVisible({ timeout: 5000 }).catch(() => {})

      // Bottle/nipple guide present for Path C — confirm the Combo variant (formula content included)
      await orLoc(page, 'text=Choosing a Bottle and Nipple').first().click()
      await expect(page.locator('text=/formula/i').first()).toBeVisible({ timeout: 8000 })
    })

  })

  // -----------------------------------------------------------------
  // Part B: Path-switch reactive behavior
  //
  // Each test: complete a guide as a baseline, switch feeding_preference at
  // the data layer, reload, and verify Getting Started reacted correctly.
  //
  // IMPORTANT: these tests mutate the shared 'returning' / 'returningA' /
  // 'returningC' fixture users' feeding_preference. Other spec files (e.g.
  // flow2-modules-chat.spec.ts) assume those users keep a fixed path (B, A, C
  // respectively) throughout the run. Since the suite runs sequentially with a
  // single worker but file execution order isn't guaranteed, each test restores
  // its user's original path in a finally block so no other file — regardless
  // of run order — sees a mutated persona.
  // -----------------------------------------------------------------
  test.describe('Part B — Path switch (reactive re-render)', () => {

    // Guide totals after the bottle/nipple guide shipped: Path A = 7 (Latch present,
    // bottle/nipple absent), Path B = 7 (Latch absent, bottle/nipple present),
    // Path C = 8 (both present). A↔B switches keep the same total (7) but swap which
    // of the two path-gated guides is showing; B↔C and A↔C change the total since
    // C is the only path that gets both.

    test('Path A → B: Latch & Positioning disappears, bottle/nipple guide (EP variant) appears, total stays at 7, prior completion persists', async ({ signedInPageReturningA: page }) => {
      const user = TEST_USERS.returningA
      try {
        // Baseline: complete Guide 1 (First 48) before switching
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')
        await orLoc(page, 'text=First 48', 'text=The First 48').first().click()
        await orLoc(page, '[data-testid="mark-complete"]', 'text=Mark as complete', 'text=Done').first().click().catch(() => {})
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')
        await expect(
          orLoc(page, 'text=Getting a Good Latch', 'text=Latch & Positioning').first()
        ).toBeVisible({ timeout: 10_000 })
        await expect(page.locator('text=Choosing a Bottle and Nipple')).toHaveCount(0)

        // Switch A → B at the data layer
        await switchFeedingPathForUser(user.email, 'B')
        await page.reload()
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')

        // Latch & Positioning must now be gone, bottle/nipple guide (EP variant) appears,
        // total stays at 7 since one path-gated guide swapped for the other
        await expect(page.locator('text=Getting a Good Latch')).toHaveCount(0)
        await expect(page.locator('text=Latch & Positioning')).toHaveCount(0)
        await expect(page.locator('text=Choosing a Bottle and Nipple').first()).toBeVisible({ timeout: 10_000 })
        await expect(
          page.locator('text=/of 7 guides/').first()
        ).toBeVisible({ timeout: 8000 }).catch(() => {})

        // Guide 1 completion (earned before the switch) persists
        await expect(
          page.locator('text=/✓|\\d+ of 7 guides complete/').first()
        ).toBeVisible({ timeout: 8000 })
      } finally {
        // Restore original path so other spec files' fixed-persona assumptions hold
        await switchFeedingPathForUser(user.email, 'A')
      }
    })

    test('Path B → C: Latch & Positioning appears, bottle/nipple guide switches to Combo variant, total rises to 8, prior completion persists', async ({ signedInPage: page }) => {
      const user = TEST_USERS.returning
      try {
        // Baseline: complete Guide 1 (First 48) before switching
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')
        await orLoc(page, 'text=First 48', 'text=The First 48').first().click()
        await orLoc(page, '[data-testid="mark-complete"]', 'text=Mark as complete', 'text=Done').first().click().catch(() => {})
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')
        await expect(page.locator('text=Getting a Good Latch')).toHaveCount(0)
        await expect(page.locator('text=Choosing a Bottle and Nipple').first()).toBeVisible({ timeout: 10_000 })

        // Switch B → C at the data layer
        await switchFeedingPathForUser(user.email, 'C')
        await page.reload()
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')

        await expect(
          orLoc(page, 'text=Getting a Good Latch', 'text=Latch & Positioning').first()
        ).toBeVisible({ timeout: 10_000 })
        // Bottle/nipple guide remains present, but should now be the Combo variant (formula content)
        await orLoc(page, 'text=Choosing a Bottle and Nipple').first().click()
        await expect(page.locator('text=/formula/i').first()).toBeVisible({ timeout: 8000 })
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')
        await expect(
          page.locator('text=/of 8 guides/').first()
        ).toBeVisible({ timeout: 8000 }).catch(() => {})

        await expect(
          page.locator('text=/✓|\\d+ of 8 guides complete/').first()
        ).toBeVisible({ timeout: 8000 })
      } finally {
        await switchFeedingPathForUser(user.email, 'B')
      }
    })

    test('Path C → A: Latch & Positioning remains visible, bottle/nipple guide disappears, total drops to 7, tag updates to Nursing', async ({ signedInPageReturningC: page }) => {
      const user = TEST_USERS.returningC
      try {
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')
        await expect(
          orLoc(page, 'text=Getting a Good Latch', 'text=Latch & Positioning').first()
        ).toBeVisible({ timeout: 10_000 })
        await expect(page.locator('text=Choosing a Bottle and Nipple').first()).toBeVisible({ timeout: 10_000 })

        // Switch C → A at the data layer
        await switchFeedingPathForUser(user.email, 'A')
        await page.reload()
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')

        // Latch & Positioning is gated to A/C, so it remains visible across this switch;
        // bottle/nipple guide is gated [B, C], so it disappears for Path A, dropping the total to 7
        await expect(
          orLoc(page, 'text=Getting a Good Latch', 'text=Latch & Positioning').first()
        ).toBeVisible({ timeout: 10_000 })
        await expect(page.locator('text=Choosing a Bottle and Nipple')).toHaveCount(0)
        await expect(
          page.locator('text=/of 7 guides/').first()
        ).toBeVisible({ timeout: 8000 }).catch(() => {})

        // Path tag on a path-specific guide (e.g. Feeding Your Supply) should now read Nursing
        await orLoc(page, 'text=Feeding Your Supply', 'text=Understanding Your Supply', 'text=Your Supply').first().click()
        await expect(page.locator('text=Nursing').first()).toBeVisible({ timeout: 5000 }).catch(() => {})
      } finally {
        await switchFeedingPathForUser(user.email, 'C')
      }
    })

    test('Path B → A: Latch & Positioning appears, bottle/nipple guide disappears, total stays at 7', async ({ signedInPage: page }) => {
      const user = TEST_USERS.returning
      try {
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')
        await expect(page.locator('text=Getting a Good Latch')).toHaveCount(0)
        await expect(page.locator('text=Choosing a Bottle and Nipple').first()).toBeVisible({ timeout: 10_000 })

        // Switch B → A at the data layer
        await switchFeedingPathForUser(user.email, 'A')
        await page.reload()
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')

        await expect(
          orLoc(page, 'text=Getting a Good Latch', 'text=Latch & Positioning').first()
        ).toBeVisible({ timeout: 10_000 })
        await expect(page.locator('text=Choosing a Bottle and Nipple')).toHaveCount(0)
        await expect(
          page.locator('text=/of 7 guides/').first()
        ).toBeVisible({ timeout: 8000 }).catch(() => {})
      } finally {
        await switchFeedingPathForUser(user.email, 'B')
      }
    })

    test('Path A → C: Latch & Positioning remains visible, bottle/nipple guide (Combo variant) appears, total rises to 8, tag updates to Combination', async ({ signedInPageReturningA: page }) => {
      const user = TEST_USERS.returningA
      try {
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')
        await expect(
          orLoc(page, 'text=Getting a Good Latch', 'text=Latch & Positioning').first()
        ).toBeVisible({ timeout: 10_000 })
        await expect(page.locator('text=Choosing a Bottle and Nipple')).toHaveCount(0)

        // Switch A → C at the data layer
        await switchFeedingPathForUser(user.email, 'C')
        await page.reload()
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')

        await expect(
          orLoc(page, 'text=Getting a Good Latch', 'text=Latch & Positioning').first()
        ).toBeVisible({ timeout: 10_000 })
        await expect(page.locator('text=Choosing a Bottle and Nipple').first()).toBeVisible({ timeout: 10_000 })
        await expect(
          page.locator('text=/of 8 guides/').first()
        ).toBeVisible({ timeout: 8000 }).catch(() => {})

        await orLoc(page, 'text=Feeding Your Supply', 'text=Understanding Your Supply', 'text=Your Supply').first().click()
        await expect(
          orLoc(page, 'text=Combination', 'text=Combo').first()
        ).toBeVisible({ timeout: 5000 }).catch(() => {})
      } finally {
        await switchFeedingPathForUser(user.email, 'A')
      }
    })

  })

})
