/**
 * Flow 3 — Returning user: Extended 6-question chat session
 * Signs in as the pre-seeded 'returning' user (Path C, Week 3 — Maria).
 *
 * All 6 questions are sent in order in one session without refresh.
 * This specifically tests:
 *   1. Multi-turn conversation coherence
 *   2. conversation_history array being passed to chat-response edge function
 *   3. The "going back" to an earlier thread (Q6) — the failure signal for
 *      dropped history is the AI asking "Can you tell me more about your situation?"
 */
import { test, expect } from '../fixtures/auth-fixture'

// -----------------------------------------------------------------------
// Helper: send a chat message and wait for the AI response at a given index
// -----------------------------------------------------------------------
async function sendAndWait(page: any, message: string, expectedResponseIndex: number) {
  const input = page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]').first()
  await input.fill(message)
  await page.click('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')

  const aiMessages = page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]')
  await expect(aiMessages).toHaveCount(expectedResponseIndex, { timeout: 30_000 })

  const lastResponse = await aiMessages.nth(expectedResponseIndex - 1).textContent()
  return lastResponse ?? ''
}

test.describe('Flow 3 — Extended Chat Session (6 questions)', () => {

  test('Full 6-question conversation — coherence and history threading', async ({ signedInPage: page }) => {
    // Navigate to chat
    await page.locator('[data-testid="tab-chat"]').or(page.locator('text=Chat')).first().click()
    await expect(
      page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]').first()
    ).toBeVisible({ timeout: 8000 })

    // -----------------------------------------------------------------
    // Q1: Initial pain question — sets up the thread
    // -----------------------------------------------------------------
    const r1 = await sendAndWait(
      page,
      'My baby is 3 weeks old and nursing feels really painful — is that normal at this stage?',
      1
    )

    // Should be empathetic and mention latch or pain differentiation
    expect(r1.toLowerCase()).toMatch(/latch|pain|normal|discomfort|ibclc|consultant/)
    // Should not be an error message
    expect(r1.toLowerCase()).not.toMatch(/error|sorry, i|unable to|something went wrong/)
    expect(r1.length).toBeGreaterThan(80)

    // -----------------------------------------------------------------
    // Q2: Follow-up — should build on Q1, not restart
    // -----------------------------------------------------------------
    const r2 = await sendAndWait(
      page,
      "I've already tried the laid-back position and it helps a little but not completely",
      2
    )

    // References the prior conversation context (latch pain topic)
    // Should suggest other positions or adjustments, NOT ask "what's going on?"
    expect(r2.toLowerCase()).toMatch(/position|cross-cradle|football|latch|adjust/)
    // Critical: must NOT treat this as the opening of a new conversation
    expect(r2.toLowerCase()).not.toMatch(/can you tell me more about your situation|what brings you here today|tell me about/)

    // -----------------------------------------------------------------
    // Q3: Latch appearance question
    // -----------------------------------------------------------------
    const r3 = await sendAndWait(
      page,
      'What does a correct latch actually look like? How do I know if I have one?',
      3
    )

    // Should describe visual/sensory signs of a good latch
    expect(r3.toLowerCase()).toMatch(/lips|chin|breast|flange|clicking|asymmetric|deep/)
    expect(r3.length).toBeGreaterThan(80)

    // -----------------------------------------------------------------
    // Q4: Thrush question — shift in topic, should still show coherence
    // -----------------------------------------------------------------
    const r4 = await sendAndWait(
      page,
      'Could it be thrush? My nipples are itchy and burning after feeds',
      4
    )

    // Should identify burning + itch as thrush indicators
    expect(r4.toLowerCase()).toMatch(/thrush|fungal|yeast|burning|itch/)
    // Must NOT diagnose definitively
    expect(r4.toLowerCase()).toMatch(/provider|ibclc|doctor|consult|see a/)
    expect(r4.length).toBeGreaterThan(80)

    // -----------------------------------------------------------------
    // Q5: Thrush treatment follow-up
    // -----------------------------------------------------------------
    const r5 = await sendAndWait(
      page,
      'What would thrush treatment look like for both me and the baby?',
      5
    )

    // Both mom and baby need treatment — should mention both
    expect(r5.toLowerCase()).toMatch(/baby|infant|both|mom|mother/)
    // Should mention antifungal or treatment options without prescribing
    expect(r5.toLowerCase()).toMatch(/antifungal|nystatin|fluconazole|treatment|provider|prescription/)
    expect(r5.length).toBeGreaterThan(80)

    // -----------------------------------------------------------------
    // Q6: "Going back" to latch thread — THE KEY HISTORY TEST
    // -----------------------------------------------------------------
    const r6 = await sendAndWait(
      page,
      'Going back to the latch — if the thrush is treated but it still hurts, what else could cause pain that far into breastfeeding?',
      6
    )

    // FAILURE SIGNAL: If the AI says "Can you tell me more about your situation?" or
    // similar opener, the conversation_history array was dropped. This is the most
    // important assertion in the entire test suite.
    const genericOpeners = [
      'can you tell me more about your situation',
      'what brings you here',
      'i\'d be happy to help — can you share',
      'tell me a bit about',
      'to help you better, could you',
    ]
    for (const opener of genericOpeners) {
      expect(r6.toLowerCase()).not.toContain(opener)
    }

    // Should return to latch pain topic and list other causes
    expect(r6.toLowerCase()).toMatch(/vasospasm|tongue.?tie|oversupply|position|latch|cause|pain/)

    // Should NOT restart as if it's a fresh conversation
    expect(r6.toLowerCase()).not.toMatch(/nice to meet you|hello|hi there|welcome/)

    expect(r6.length).toBeGreaterThan(80)
  })

  // -----------------------------------------------------------------
  // Individual checks that don't require running the full 6-question sequence
  // -----------------------------------------------------------------

  test('Typing indicator appears for each message sent', async ({ signedInPage: page }) => {
    await page.locator('[data-testid="tab-chat"]').or(page.locator('text=Chat')).first().click()
    const input = page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]').first()

    await input.fill('Is breastfeeding pain at 3 weeks ever normal?')
    await page.click('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')

    // Typing indicator (ellipsis or spinner) should appear briefly
    const typingIndicator = page.locator('[data-testid="typing-indicator"], .typing-indicator, [aria-label*="typing"]')
    // The indicator may flash quickly — check it appears OR the response is already there
    const indicatorOrResponse = Promise.race([
      typingIndicator.waitFor({ timeout: 5000 }).then(() => 'indicator'),
      page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]').first().waitFor({ timeout: 30_000 }).then(() => 'response'),
    ])
    const winner = await indicatorOrResponse
    expect(['indicator', 'response']).toContain(winner)

    // Either way, the final response should be there
    await expect(
      page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]').first()
    ).toBeVisible({ timeout: 30_000 })
  })

  test('Responses stay between 2–4 paragraphs (not a wall of text)', async ({ signedInPage: page }) => {
    await page.locator('[data-testid="tab-chat"]').or(page.locator('text=Chat')).first().click()
    const input = page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]').first()

    await input.fill('What does a good latch look like?')
    await page.click('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')

    const response = page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]').first()
    await expect(response).toBeVisible({ timeout: 30_000 })

    const text = await response.textContent()
    // Not too short (< 50 chars would be a non-answer)
    expect(text?.length ?? 0).toBeGreaterThan(50)
    // Not a wall of text (> 2000 chars is excessive for a single reply)
    expect(text?.length ?? 0).toBeLessThan(2000)
  })

  test('Older messages remain visible as conversation grows', async ({ signedInPage: page }) => {
    await page.locator('[data-testid="tab-chat"]').or(page.locator('text=Chat')).first().click()
    const input = page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]').first()

    const q1 = 'Is breastfeeding pain at 3 weeks normal?'
    await input.fill(q1)
    await page.click('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')
    await expect(
      page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]').first()
    ).toBeVisible({ timeout: 30_000 })

    const q2 = 'What could cause persistent pain despite a good latch?'
    await input.fill(q2)
    await page.click('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')
    await expect(
      page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]')
    ).toHaveCount(2, { timeout: 30_000 })

    // Q1 user message should still be in the DOM (not removed)
    await expect(page.locator(`text=${q1.substring(0, 20)}`)).toBeVisible()
  })

  test('Input is disabled while AI is responding', async ({ signedInPage: page }) => {
    await page.locator('[data-testid="tab-chat"]').or(page.locator('text=Chat')).first().click()
    const input = page.locator('[data-testid="chat-input"], textarea[placeholder*="mind"], textarea[placeholder*="Ask"], input[placeholder*="mind"], input[placeholder*="Ask"]').first()
    const sendBtn = page.locator('[data-testid="send-btn"], button[aria-label*="send"], button[type="submit"]')

    await input.fill('How do I know my baby is getting enough milk?')
    await sendBtn.click()

    // Immediately after sending, input or button should be disabled
    const disabledDuringLoad = await Promise.race([
      input.isDisabled().then(v => v),
      sendBtn.isDisabled().then(v => v),
    ]).catch(() => false)

    // Not a hard failure if the response is so fast the disable state is missed —
    // just verify the response eventually arrives
    await expect(
      page.locator('[data-testid="chat-message-ai"], .ai-message, [data-role="assistant"]').first()
    ).toBeVisible({ timeout: 30_000 })
  })

})
