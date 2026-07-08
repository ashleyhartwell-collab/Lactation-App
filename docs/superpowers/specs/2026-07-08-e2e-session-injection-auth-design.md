# E2E Session-Injection Auth — Design

**Date:** 2026-07-08
**Status:** Approved
**Scope:** `e2e/` Playwright test suite only. No application changes.

## Problem

The live app (`mama-milk-map.lovable.app`) migrated from password-based sign-in to
passwordless **magic-link** auth. The `/sign-in` screen now shows only an email
field and a "Send login link" button — there is no password input.

The e2e suite authenticates via a password form in `signInAs()`
([`fixtures/auth-fixture.ts`](../../../e2e/fixtures/auth-fixture.ts)). With the
password field gone, `page.fill('input[type="password"]', …)` times out after 15s.
Result of the last run: **3 passed, 43 failed** — the 3 passes are exactly the
tests that don't require a session; everything gated behind login fails on the
same missing-password-field timeout.

## Goal

Restore green for the ~40 tests whose real purpose is to assert *authenticated*
app behavior, by authenticating them through programmatic session injection
instead of the removed UI form — without modifying the app.

## Approach (validated by spike)

A throwaway spike confirmed the full path works end-to-end:

1. Obtain a real session via the anon Supabase client's `signInWithPassword`.
   The test users still have passwords (created by `global-setup.ts`); only the
   *UI* dropped password auth, so this call succeeds.
2. Inject the session into the browser's `localStorage` under the key
   `sb-<projectRef>-auth-token` (default supabase-js derivation;
   `projectRef` = subdomain of `SUPABASE_URL`) as `JSON.stringify(session)`.
3. Reload — the app's supabase-js client reads the key on init and restores the
   session. Spike landed on `/home` fully authenticated.

## Components

### `e2e/fixtures/session-auth.ts` (new)
- `storageKey` — derived from `SUPABASE_URL` hostname → `sb-<ref>-auth-token`.
- `getSession(email, password)` — anon client `signInWithPassword`; returns the
  session object. Throws with a clear message on failure.
- `injectSession(page, session)` — `goto('/')` → `localStorage.setItem(storageKey,
  JSON.stringify(session))` → `goto('/')`.

### `e2e/fixtures/auth-fixture.ts` (rewrite `signInAs`)
Rewrite `signInAs(page, userKey)` to `getSession` + `injectSession` + wait for
Home. **Signature and behavior contract unchanged** (returns once Home is
visible), so all callers — `signedInPage`, `signedInNewbornPage`, the path
fixtures, and direct callers — work untouched.

**Injection happens once**, via explicit `setItem` + reload — deliberately NOT
`addInitScript`, which re-seeds on every navigation and would silently
re-authenticate after the sign-out test reloads, masking a real regression.

### `e2e/tests/flow1b-returning.spec.ts`
- `Sign in routes to Home with profile loaded` — **rewrite** to authenticate via
  the injection path (through `signInAs`) and keep the profile-loaded assertions
  (This Week plan, Week 1 button). Drops the obsolete password-form steps.
- `Wrong password shows friendly error` — **`test.skip`** with a comment: asserts
  removed password UI; TODO to add magic-link error coverage.
- `Forgot password — always shows success message` — **`test.skip`**, same
  rationale.
- `Session persists across reload` and `Sign out returns to Welcome` — unchanged;
  they consume `signedInPage` and now get a real injected session. Sign-out then
  exercises the genuine sign-out UI + a reload that must stay signed out (the
  reason injection is one-shot).

## Decisions

- **Session source: reuse password `signInWithPassword`**, not admin
  `generateLink`. Simpler; spike-proven; users have passwords regardless of UI.
- **Storage key** taken as the default supabase-js derivation. Spike confirmed no
  custom `storageKey` in the app bundle and that the app honors the injected key.

## Non-goals

- Real magic-link e2e coverage (follow-up).
- Any application/frontend change.
- Rewriting the pre-existing uncommitted e2e WIP in the tree (not part of this task).

## Testing (TDD)

Red → green on a focused assertion first: `signInAs('returning')` lands on
`/home` with the home screen visible (currently red — password-form timeout).
Implement the injection helper + `signInAs` rewrite → green. Then run the full
suite to confirm the fix propagates and to see the true product-assertion
results underneath.

## Expected outcome

~40 of 43 failures go green; 2 explicitly skipped with rationale; remaining
results reflect real product assertions that can finally execute.
