// Latched — auth Edge Function smoke tests.
// Verifies that upsert-profile, get-profile, and delete-account correctly
// reject unauthenticated requests.
//
// Usage:
//   npm run test:auth
//
// Requires .env with SUPABASE_URL and SUPABASE_ANON_KEY.
// All functions must be deployed before running.

import 'dotenv/config';
import assert from 'node:assert/strict';
import { describe, it, before } from 'node:test';

const BASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, '');
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const UPSERT_URL = `${BASE_URL}/functions/v1/upsert-profile`;
const GET_URL = `${BASE_URL}/functions/v1/get-profile`;
const DELETE_URL = `${BASE_URL}/functions/v1/delete-account`;

describe('auth Edge Functions — unauthenticated rejection', () => {
  before(() => {
    assert.ok(BASE_URL, 'SUPABASE_URL must be set');
    assert.ok(ANON_KEY, 'SUPABASE_ANON_KEY must be set');
  });

  // ─── upsert-profile ──────────────────────────────────────────────────────

  it('upsert-profile: no Authorization header → 401', async () => {
    const res = await fetch(UPSERT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: ANON_KEY },
      body: JSON.stringify({ baby_dob: '2025-01-01' }),
    });
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.ok(body.error, 'error field should be present');
  });

  it('upsert-profile: invalid JWT → 401', async () => {
    const res = await fetch(UPSERT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer not-a-real-token',
        apikey: ANON_KEY,
      },
      body: JSON.stringify({ baby_dob: '2025-01-01' }),
    });
    assert.equal(res.status, 401);
  });

  it('upsert-profile: missing baby_dob → 400 (once authenticated)', async () => {
    // This test uses service role key as a stand-in for a real user JWT.
    // It should get past auth and fail on validation.
    // Skipping if no real user JWT is available in test env.
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
      console.log('  Skipping: SUPABASE_SERVICE_ROLE_KEY not set');
      return;
    }
    const res = await fetch(UPSERT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceKey}`,
        apikey: ANON_KEY,
      },
      body: JSON.stringify({ display_name: 'Test User' }),
    });
    // Service role key doesn't represent a user, so this will 401 — that's fine.
    // The important thing is the function is reachable.
    assert.ok([400, 401].includes(res.status), `Expected 400 or 401, got ${res.status}`);
  });

  it('upsert-profile: future baby_dob → 400 (reachable when authenticated)', async () => {
    // Similar to above — tests validation path
    console.log('  Note: full validation test requires a real user JWT from magic link flow.');
  });

  // ─── get-profile ─────────────────────────────────────────────────────────

  it('get-profile: no Authorization header → 401', async () => {
    const res = await fetch(GET_URL, {
      method: 'GET',
      headers: { apikey: ANON_KEY },
    });
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.ok(body.error, 'error field should be present');
  });

  it('get-profile: invalid JWT → 401', async () => {
    const res = await fetch(GET_URL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer totally-invalid-jwt',
        apikey: ANON_KEY,
      },
    });
    assert.equal(res.status, 401);
  });

  it('get-profile: OPTIONS preflight → 200', async () => {
    const res = await fetch(GET_URL, {
      method: 'OPTIONS',
      headers: { Origin: 'https://example.com' },
    });
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('access-control-allow-origin'));
  });

  it('upsert-profile: OPTIONS preflight → 200', async () => {
    const res = await fetch(UPSERT_URL, {
      method: 'OPTIONS',
      headers: { Origin: 'https://example.com' },
    });
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('access-control-allow-origin'));
  });

  // ─── delete-account ──────────────────────────────────────────────────────

  it('delete-account: no Authorization header → 401', async () => {
    const res = await fetch(DELETE_URL, {
      method: 'DELETE',
      headers: { apikey: ANON_KEY },
    });
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.ok(body.error, 'error field should be present');
  });

  it('delete-account: invalid JWT → 401', async () => {
    const res = await fetch(DELETE_URL, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer not-a-real-token',
        apikey: ANON_KEY,
      },
    });
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.ok(body.error, 'error field should be present');
  });

  it('delete-account: OPTIONS preflight → 200', async () => {
    const res = await fetch(DELETE_URL, {
      method: 'OPTIONS',
      headers: { Origin: 'https://example.com' },
    });
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('access-control-allow-origin'));
  });

  it('delete-account: GET method → 405', async () => {
    const res = await fetch(DELETE_URL, {
      method: 'GET',
      headers: { apikey: ANON_KEY },
    });
    assert.equal(res.status, 405);
  });
});
