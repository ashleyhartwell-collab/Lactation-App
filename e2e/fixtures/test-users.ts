/**
 * Test user definitions.
 * Each user maps to a QA flow scenario.
 * Emails use + aliases so they all land in one inbox.
 */

export const TEST_USERS = {
  newborn: {
    email: 'latched.qa+newborn@gmail.com',
    password: 'TestPass123!',
    name: 'Sarah',
    babyName: 'Oliver',
    dobOffsetDays: 0,           // born today
    feedingPath: 'A',
    expectedWeek: 1,
    expectedPathLabel: 'nursing',
  },
  week2: {
    email: 'latched.qa+week2@gmail.com',
    password: 'TestPass123!',
    name: 'Jamie',
    babyName: null,             // skip baby name
    dobOffsetDays: -14,
    feedingPath: 'B',
    expectedWeek: 2,
    expectedPathLabel: 'pumping',
  },
  week3: {
    email: 'latched.qa+week3@gmail.com',
    password: 'TestPass123!',
    name: 'Maria',
    babyName: 'Luna',
    dobOffsetDays: -21,
    feedingPath: 'C',
    expectedWeek: 3,
    expectedPathLabel: 'combination feeding',
  },
  pastWeek6: {
    email: 'latched.qa+past6@gmail.com',
    password: 'TestPass123!',
    name: 'Taylor',
    babyName: null,
    dobOffsetDays: -70,         // 10 weeks ago
    feedingPath: 'A',
    expectedWeek: 6,            // clamped
    expectedPathLabel: 'nursing',
  },
  returning: {
    // Pre-seeded in global setup — has a complete profile already
    // NOTE: this is the Path B returning user. Kept as 'returning' (rather than
    // renamed 'returningB') so existing references throughout the suite don't churn.
    email: 'latched.qa+returning@gmail.com',
    password: 'TestPass123!',
    name: 'Jamie',
    babyName: null,
    dobOffsetDays: -14,
    feedingPath: 'B',
    expectedWeek: 2,
    expectedPathLabel: 'pumping',
  },
  returningA: {
    // Pre-seeded in global setup — complete profile, Path A (nursing).
    // Added alongside 'returning' (Path B) so returning-user tests can cover
    // all three paths, not just B.
    email: 'latched.qa+returningA@gmail.com',
    password: 'TestPass123!',
    name: 'Sarah',
    babyName: 'Oliver',
    dobOffsetDays: -14,
    feedingPath: 'A',
    expectedWeek: 2,
    expectedPathLabel: 'nursing',
  },
  returningC: {
    // Pre-seeded in global setup — complete profile, Path C (combination feeding).
    email: 'latched.qa+returningC@gmail.com',
    password: 'TestPass123!',
    name: 'Maria',
    babyName: 'Luna',
    dobOffsetDays: -14,
    feedingPath: 'C',
    expectedWeek: 2,
    expectedPathLabel: 'combination feeding',
  },
} as const

export type TestUserKey = keyof typeof TEST_USERS

/** Returns an ISO date string offset by `days` from today */
export function dobFromOffset(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}
