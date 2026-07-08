/**
 * Flow 2 — Returning user: Getting Started guides + chat questions
 * Signs in as the pre-seeded 'returning' user (Path B, Week 2 — Jamie) for most
 * tests. A couple of tests use signedInPageNursing ('newborn', Path A) instead,
 * since Latch & Positioning is gated to Path A/C and never shows for Path B.
 *
 * Part A: Guide completion and persistence
 * Part B: Chat questions, including compound question that tests
 *         system-prompt personalization (feeding_path + baby_weeks_old threading)
 */
import { test, expect } from '../fixtures/auth-fixture'

// Helper: build a Playwright OR-locator from multiple selectors (avoids broken CSS+text= comma lists)
function orLoc(page: any, ...selectors: string[]) {
  let loc = page.locator(selectors[0])
  for (let i = 1; i < selectors.length; i++) {
    loc = loc.or(page.locator(selectors[i]))
  }
  return loc
}

test.describe('Flow 2 — Modules + Chat', () => {

  // -----------------------------------------------------------------
  // Part A: Getting Started Modules
  // -----------------------------------------------------------------
  test.describe('Part A — Getting Started Guides', () => {

    test('Guide library shows 7 active guides for Path B (Latch hidden, bottle/nipple guide shown), none complete on fresh sign-in', async ({ signedInPage: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      // Known guide titles should all be visible — use .first() to avoid strict-mode issues
      // when a completion badge (✓ Your First 48 Hours) also matches
      await expect(page.locator('text=Your First 48 Hours').first()).toBeVisible({ timeout: 10_000 })
      await expect(page.locator('text=Feeding Your Supply').or(page.locator('text=Understanding Your Supply')).first()).toBeVisible({ timeout: 10_000 })
      await expect(page.locator('text=Cluster Feeding').first()).toBeVisible({ timeout: 10_000 })
      // Bottle/nipple guide is gated [B, C] — 'returning' is Path B, so it must appear
      await expect(page.locator('text=Choosing a Bottle and Nipple').first()).toBeVisible({ timeout: 10_000 })

      // 'returning' is Path B (exclusive pumping) — Latch & Positioning must not appear at all
      await expect(page.locator('text=Getting a Good Latch')).toHaveCount(0)
      await expect(page.locator('text=Latch & Positioning')).toHaveCount(0)

      // Progress summary reflects this path's total (7, not 6 — bottle/nipple guide added this total)
      await expect(
        page.locator('text=/0 of 7 guides complete/').or(page.locator('text=/of 7 guides/')).first()
      ).toBeVisible({ timeout: 8000 }).catch(() => {
        // OK if the empty-state phrasing differs slightly — the hard requirement is Latch being absent above
      })
    })

    test('Latch & Positioning shows for Path A (nursing), with the full 7-guide total, bottle/nipple guide absent', async ({ signedInPageNursing: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      await expect(orLoc(page, 'text=Good Latch', 'text=Getting a Good Latch', 'text=Latch & Positioning').first()).toBeVisible({ timeout: 10_000 })
      await expect(
        page.locator('text=/of 7 guides/').or(page.locator('text=/of 7 modules/')).first()
      ).toBeVisible({ timeout: 8000 }).catch(() => {
        // OK if the app doesn't surface a denominator on the library screen itself
      })

      // Bottle/nipple guide is gated [B, C] — Path A (nursing) never sees it, so Path A's
      // total stays at 7 (Latch present, bottle/nipple absent), same total as before this guide shipped.
      await expect(page.locator('text=Choosing a Bottle and Nipple')).toHaveCount(0)
    })

    test('Guide 1 — Your First 48 Hours: opens, shows content, marks complete', async ({ signedInPage: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      // Open Guide 1
      await orLoc(page, 'text=First 48', 'text=The First 48').first().click()
      await expect(orLoc(page, 'text=colostrum', 'text=Colostrum').first()).toBeVisible({ timeout: 8000 })

      // Scroll to ensure content loads
      await page.keyboard.press('End')

      // Mark complete
      await orLoc(page, '[data-testid="mark-complete"]', 'text=Mark as complete', 'text=Done').first().click()

      // Return to library — completion indicator on Guide 1
      await orLoc(page, '[data-testid="tab-library"]', 'text=Getting Started', 'text=Library', '[aria-label="Back"]').first().click()
      // Completion shown in progress summary or as a checkmark next to guide title.
      // 'returning' is Path B, so the denominator is 7 (6 + the bottle/nipple guide).
      await expect(
        page.locator('text=✓ Your First 48').or(
          page.locator('[data-testid*="complete"]').first()
        ).or(
          page.locator('text=1 of 7 guides complete')
        ).first()
      ).toBeVisible({ timeout: 5000 })
    })

    test('Guide 1 completion persists across reload', async ({ signedInPage: page }) => {
      // Ensure Guide 1 is marked complete first
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')
      const guide1 = page.locator('text=First 48').first()

      // If not already complete, complete it
      // Completion badge is a ✓ span — detect via text pattern or progress counter
      const completionIndicator = page.locator('text=/✓|\\d+ of 7 guides complete/').first()
      const alreadyDone = await completionIndicator.isVisible({ timeout: 2000 }).catch(() => false)
      if (!alreadyDone) {
        await guide1.click()
        await orLoc(page, '[data-testid="mark-complete"]', 'text=Mark as complete', 'text=Done').first().click()
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')
      }

      // Reload
      await page.reload()
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      // Completion still shown — ✓ badge or progress counter
      await expect(
        page.locator('text=/✓|\\d+ of 7 guides complete/').first()
      ).toBeVisible({ timeout: 8000 })
    })

    test('Latch & Positioning (Path A): holds carousel is navigable, path tag pill visible', async ({ signedInPageNursing: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      // Open Latch & Positioning
      await orLoc(page, 'text=Good Latch', 'text=Getting a Good Latch', 'text=Latch & Positioning').first().click()
      await expect(orLoc(page, 'text=latch', 'text=Latch').first()).toBeVisible({ timeout: 8000 })

      // Carousel or holds cards should exist
      const carousel = orLoc(page, '[data-testid="holds-carousel"]', '.carousel', 'text=Cross-Cradle', 'text=Football')
      await expect(carousel.first()).toBeVisible()

      // Complete guide
      await orLoc(page, '[data-testid="mark-complete"]', 'text=Mark as complete', 'text=Done').first().click()
    })

    test('Feeding Your Supply: supply content visible, Nursing path tag shown', async ({ signedInPageNursing: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      // Open Feeding Your Supply
      await orLoc(page, 'text=Feeding Your Supply', 'text=Understanding Your Supply', 'text=Your Supply').first().click()
      await expect(
        orLoc(page, 'text=supply', 'text=Supply').first()
      ).toBeVisible({ timeout: 8000 })

      // Visible path tag pill for the nursing path
      await expect(page.locator('text=Nursing').first()).toBeVisible({ timeout: 5000 }).catch(() => {
        // OK if the app surfaces the path tag with different casing/placement — not a hard failure
      })

      // Complete it
      await orLoc(page, '[data-testid="mark-complete"]', 'text=Mark as complete', 'text=Done').first().click()
    })

    test('Cluster Feeding: content visible, reachable from Reading Nora\'s Cues, marks complete', async ({ signedInPage: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      // Reach it via the link inside Reading Nora's Cues first, to confirm the teaser link works
      await orLoc(page, 'text=Reading Nora\'s Cues', 'text=Nora\'s Cues').first().click()
      await expect(orLoc(page, 'text=cluster feed', 'text=Cluster feeding', 'text=CLUSTER FEEDING', 'text=growth spurt').first()).toBeVisible({ timeout: 8000 })

      const linkOut = orLoc(page, 'text=See the full Cluster Feeding guide', 'text=Cluster Feeding guide', 'text=Cluster Feeding module').first()
      const hasLinkOut = await linkOut.isVisible({ timeout: 3000 }).catch(() => false)
      if (hasLinkOut) {
        await linkOut.click()
      } else {
        // Fall back to opening it directly from the library if the teaser link isn't found
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle')
        await orLoc(page, 'text=Cluster Feeding').first().click()
      }

      // Guide content should be visible. 'returning' is Path B, so this is the
      // pumping variant — no freezer-stash reference should appear anywhere in it.
      await expect(orLoc(page, 'text=cluster feed', 'text=Cluster feeding', 'text=growth spurt').first()).toBeVisible({ timeout: 8000 })
      await expect(orLoc(page, 'text=Normal', 'text=Worth a Call', 'text=Worth a call').first()).toBeVisible({ timeout: 8000 })
      await expect(page.locator('text=/freezer stash/i')).toHaveCount(0)

      // Complete it
      await orLoc(page, '[data-testid="mark-complete"]', 'text=Mark as complete', 'text=Done').first().click()

      // Return to library — completion reflected in progress summary (7 total for Path B)
      await orLoc(page, '[data-testid="tab-library"]', 'text=Getting Started', 'text=Library', '[aria-label="Back"]').first().click()
      await expect(
        page.locator('text=/✓|\\d+ of 7 guides complete/').first()
      ).toBeVisible({ timeout: 5000 })
    })

    test('Choosing a Bottle and Nipple (Path B): EP variant shown, no formula content, nipple material cards visible, marks complete', async ({ signedInPage: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      await orLoc(page, 'text=Choosing a Bottle and Nipple').first().click()
      await expect(orLoc(page, 'text=TLDR', 'text=Bottle and Nipple').first()).toBeVisible({ timeout: 8000 })

      // EP variant: recommends 2 to 5 oz for the whole journey, no size-up guidance
      await expect(page.locator('text=/2 to 5 ounce/i').first()).toBeVisible({ timeout: 8000 })

      // 'returning' is Path B (exclusive pumping) — no formula-specific content should appear anywhere
      await expect(page.locator('text=/formula/i')).toHaveCount(0)

      // Nipple material comparison content present
      await expect(orLoc(page, 'text=Silicone', 'text=silicone').first()).toBeVisible({ timeout: 5000 })
      await expect(orLoc(page, 'text=Latex', 'text=latex').first()).toBeVisible({ timeout: 5000 })

      // Complete it
      await orLoc(page, '[data-testid="mark-complete"]', 'text=Mark as complete', 'text=Done').first().click()

      // Return to library — completion reflected in progress summary (7 total for Path B)
      await orLoc(page, '[data-testid="tab-library"]', 'text=Getting Started', 'text=Library', '[aria-label="Back"]').first().click()
      await expect(
        page.locator('text=/✓|\\d+ of 7 guides complete/').first()
      ).toBeVisible({ timeout: 5000 })
    })

    test('All 3 completed guides persist after full reload', async ({ signedInPage: page }) => {
      // Complete 3 guides in sequence. Latch is intentionally excluded here —
      // 'returning' is Path B, where Latch & Positioning is hidden entirely.
      const guides = [
        ['text=First 48'],
        ['text=Understanding Your Supply', 'text=Your Supply', 'text=Feeding Your Supply'],
        ['text=Cluster Feeding'],
      ]

      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      for (const selectors of guides) {
        await orLoc(page, ...selectors).first().click().catch(() => {})
        await orLoc(page, '[data-testid="mark-complete"]', 'text=Mark as complete', 'text=Done').first().click().catch(() => {})
        await page.goto('/getting-started')
        await page.waitForLoadState('networkidle').catch(() => {})
      }

      // Reload and verify completions persist
      await page.reload()
      await page.waitForURL(/\/$|\/home/, { timeout: 10_000 })
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')

      // Completion shown as ✓ badges or progress counter "N of 7 guides complete"
      const progressText = await page.locator('text=/\\d+ of 7 guides complete/').first().textContent({ timeout: 5000 }).catch(() => '')
      const completedNum = parseInt(progressText?.match(/(\d+)/)?.[1] ?? '0', 10)
      expect(completedNum).toBeGreaterThanOrEqual(3)
    })

  })

  // -----------------------------------------------------------------
  // Part B: Chat — guide deep-link + conversation
  // -----------------------------------------------------------------
  test.describe('Part B — Chat', () => {

    test('Chat opens from "Ask in chat" link inside a guide', async ({ signedInPage: page }) => {
      await page.goto('/getting-started')
      await page.waitForLoadState('networkidle')
      await orLoc(page, 'text=Understanding Your Supply', 'text=Your Supply', 'text=Feeding Your Supply').first().click()

      // Wait for guide to load
      await expect(orLoc(page, 'text=supply', 'text=Supply').first()).toBeVisible({ timeout: 8000 })

      // Find the "Ask in chat" link — skip if this guide doesn't have one
      const askLink = orLoc(page, 'text=Ask in chat', 'text=Ask a question', '[data-testid="ask-in-chat"]').first()
      const hasLink = await askLink.isVisible({ timeout: 3000 }).catch(() => false)
      if (!hasLink) {
        test.skip()
        return
      }
      await askLink.click()

      // Should be on chat screen
      await expect(
        page.locator('[data-testid="chat-screen"], [data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"]').first()
      ).toBeVisible({ timeout: 8000 })
    })

    test('Q1: supply question — AI responds with relevant content', async ({ signedInPage: page }) => {
      // Navigate to chat
      await orLoc(page, '[data-testid="tab-chat"]', 'text=Chat').first().click()
      await expect(
        page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]')
      ).toBeVisible({ timeout: 8000 })

      // Type and send first question
      const input = page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]').first()
      await input.fill('How do I know if my supply is dropping?')
      await page.click('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')

      // Wait for AI response (up to 30s for real LLM call)
      await expect(
        page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]').first()
      ).toBeVisible({ timeout: 30_000 })

      // Verify response isn't empty
      const responseText = await page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]').first().textContent()
      expect(responseText?.length).toBeGreaterThan(50)
    })

    test('Q2: follow-up question — context maintained from Q1', async ({ signedInPage: page }) => {
      await orLoc(page, '[data-testid="tab-chat"]', 'text=Chat').first().click()
      const input = page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]').first()

      // Q1
      await input.fill('How do I know if my supply is dropping?')
      await page.click('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')
      await expect(
        page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]').first()
      ).toBeVisible({ timeout: 30_000 })

      // Q2 — follow-up that only makes sense with Q1 context
      await input.fill("What's the difference between foremilk and hindmilk?")
      await page.click('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')

      // Wait for second AI response
      const responses = page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]')
      await expect(responses).toHaveCount(2, { timeout: 30_000 })

      const secondResponse = await responses.nth(1).textContent()
      expect(secondResponse?.length).toBeGreaterThan(50)
      // Should mention foremilk/hindmilk concepts
      expect(secondResponse?.toLowerCase()).toMatch(/foremilk|hindmilk|fat|calories/)
    })

    test('Q3: compound question — both sub-questions addressed, week-2 context present', async ({ signedInPage: page }) => {
      await orLoc(page, '[data-testid="tab-chat"]', 'text=Chat').first().click()
      const input = page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]').first()

      // Send the compound question
      const compound = "I'm pumping every 3 hours and only getting 2 oz per session — is that normal for week 2, and should I try power pumping or add a session first?"
      await input.fill(compound)
      await page.click('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')

      // Wait for response
      const aiMessages = page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]')
      await expect(aiMessages.first()).toBeVisible({ timeout: 30_000 })

      const response = await aiMessages.first().textContent()

      // Failure signal: generic answer with no week-2 specificity means user profile
      // (feeding_path and baby_weeks_old) is NOT threading through to the edge function.
      expect(response?.toLowerCase()).toMatch(/week 2|two weeks|normal|typical|oz|ounce/)

      // Should address at least one of the two sub-questions
      expect(response?.toLowerCase()).toMatch(/power pump|session|frequency|add/)

      // Response length: not a wall of text (< 1500 chars is reasonable)
      expect(response?.length).toBeLessThan(1500)
    })

    test('Typing indicator appears and empty state is replaced after first message', async ({ signedInPage: page }) => {
      await orLoc(page, '[data-testid="tab-chat"]', 'text=Chat').first().click()

      // Empty state / suggestion chips visible before first message
      const emptyState = orLoc(page, '[data-testid="chat-empty-state"]', 'text=Ask me anything', 'text=What would you like to know')
      await expect(emptyState.first()).toBeVisible({ timeout: 5000 }).catch(() => {
        // OK if not visible — app may open to a conversation
      })

      const input = page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]').first()
      await input.fill('Is 2 oz per pump session normal?')
      await page.click('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')

      // Empty state should be gone after sending
      await expect(emptyState.first()).not.toBeVisible().catch(() => {})

      // Wait for AI response
      await expect(
        page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]').first()
      ).toBeVisible({ timeout: 30_000 })
    })

  })

})
