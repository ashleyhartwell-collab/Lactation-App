# Lovable Update Prompt — Stripe Paywall Integration
**Paste the block below directly into Lovable.**

---

> **Before applying this prompt, complete the one-time Stripe setup steps in the SETUP CHECKLIST at the bottom. You'll be working inside a Stripe sandbox — no real charges occur. You'll need three values: STRIPE_SECRET_KEY, STRIPE_PRICE_ID, and STRIPE_PUBLISHABLE_KEY.**

---

```
Wire the paywall screen to Stripe Checkout in test mode. The paywall screen UI already exists — do not change its layout, headline copy, feature list, visual design, or color tokens. Only change: the CTA button handler, AppContext payment state, and app-load URL parameter detection. Also write two new edge functions described below.

---

OVERVIEW

The paywall comes before Account Creation in the flow. Because the user has no Supabase account yet at this point, payment is handled anonymously via Stripe Checkout. The flow is:

  1. User taps the paywall CTA button
  2. App calls create-checkout-session edge function → receives a Stripe checkout URL
  3. App redirects browser to the Stripe-hosted checkout page
  4. User completes payment with a test card
  5. Stripe redirects back to the app with ?payment=success&session_id=...
  6. App detects these URL params, calls verify-payment edge function to confirm payment
  7. App sets isPaid = true in AppContext and advances to Account Creation
  8. On Account Creation completion, stripe_session_id is saved to the user's profile

If the user taps cancel on the Stripe page, Stripe redirects back with ?payment=cancelled — app stays on paywall and shows a dismissable message.

---

PART 1 — EDGE FUNCTION: create-checkout-session

Create supabase/functions/create-checkout-session/index.ts:

---

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { success_url, cancel_url, customer_email } = await req.json()

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    const priceId = Deno.env.get('STRIPE_PRICE_ID')
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY not set')
    if (!priceId) throw new Error('STRIPE_PRICE_ID not set')

    const params = new URLSearchParams({
      'mode': 'payment',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'success_url': success_url,
      'cancel_url': cancel_url,
    })

    if (customer_email) {
      params.append('customer_email', customer_email)
    }

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Stripe error: ${err}`)
    }

    const session = await response.json()

    return new Response(
      JSON.stringify({ url: session.url, session_id: session.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('create-checkout-session error:', err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

---

PART 2 — EDGE FUNCTION: verify-payment

Create supabase/functions/verify-payment/index.ts:

---

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { session_id } = await req.json()
    if (!session_id) throw new Error('session_id is required')

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY not set')

    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${session_id}`,
      {
        headers: { 'Authorization': `Bearer ${stripeKey}` },
      }
    )

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Stripe error: ${err}`)
    }

    const session = await response.json()
    const paid = session.payment_status === 'paid'

    return new Response(
      JSON.stringify({ paid, session_id: session.id, customer_email: session.customer_email }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('verify-payment error:', err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

---

PART 3 — APPCONTEXT PAYMENT STATE

Add the following fields to AppContext:

  isPaid: boolean           // true after successful payment verification
  stripeSessionId: string | null   // stored for profile write after account creation
  paymentLoading: boolean   // true while checkout session is being created
  paymentError: string | null

Add corresponding setters. Default: isPaid = false, stripeSessionId = null.

---

PART 4 — PAYWALL SCREEN CTA HANDLER

The paywall screen has a CTA button (something like "Start My Plan" or "Get Access"). Replace its handler with:

  const handlePaywallCTA = async () => {
    setPaymentLoading(true)
    setPaymentError(null)

    try {
      const origin = window.location.origin
      const successUrl = `${origin}?payment=success&session_id={CHECKOUT_SESSION_ID}`
      const cancelUrl = `${origin}?payment=cancelled`

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          success_url: successUrl,
          cancel_url: cancelUrl,
          // Pass email if we somehow have it already, otherwise omit
          customer_email: null,
        }
      })

      if (error || !data?.url) {
        throw new Error(error?.message ?? 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url

    } catch (err: any) {
      setPaymentError('Something went wrong. Please try again.')
      setPaymentLoading(false)
    }
  }

Note on the success_url: Stripe replaces `{CHECKOUT_SESSION_ID}` literally in the URL — this is a Stripe template variable, not a JavaScript variable. Pass it exactly as the string `{CHECKOUT_SESSION_ID}` in the success_url value.

Button state while paymentLoading = true:
  - Show a spinner inside the button
  - Disable the button
  - Button label: "Setting up your plan…"

If paymentError is set, show it below the CTA button (13px, error color, no icon).

---

PART 5 — PAYMENT CANCELLED STATE

If the URL contains ?payment=cancelled when the app loads, show a dismissable banner on the paywall screen:

  Background: amber-50 (or warning/10)
  Text (14px, neutral-700): "No worries — your spot is saved. Complete your plan when you're ready."
  A small × dismiss button on the right

Clear the banner when dismissed or when the user taps the CTA again.

---

PART 6 — SUCCESS URL DETECTION ON APP LOAD

In AppContext, in the same mount effect that checks the Supabase session (from the previous auth prompt), also check for payment URL parameters:

  const urlParams = new URLSearchParams(window.location.search)
  const paymentStatus = urlParams.get('payment')
  const sessionId = urlParams.get('session_id')

  if (paymentStatus === 'success' && sessionId) {
    // Verify the payment with Stripe
    const { data, error } = await supabase.functions.invoke('verify-payment', {
      body: { session_id: sessionId }
    })

    if (data?.paid) {
      setIsPaid(true)
      setStripeSessionId(sessionId)
      // Clean the URL params so they don't persist on reload
      window.history.replaceState({}, '', window.location.pathname)
      // If no Supabase session yet, route to Account Creation
      // (the auth session check runs in the same effect — if no session found, route accordingly)
    }
  }

Routing logic after payment verification:
  - If paid AND no Supabase session → route to Account Creation screen
  - If paid AND has Supabase session (rare edge case: user already had an account) → route to home
  - If not paid → route to Welcome as normal

This verification check runs before the session check result determines routing. Payment status takes precedence over the normal Welcome route.

---

PART 7 — INCLUDE STRIPE SESSION ID IN PROFILE WRITE

In the Home Transition screen profile write (from the auth prompt, Part 4), add stripe_session_id to the upsert-profile body:

  stripe_session_id: appContext.stripeSessionId ?? null,

This records which Stripe session funded the subscription in the user's profile.

---

PART 8 — ACCESS GUARD

If a user somehow reaches the home screen without isPaid = true AND without a valid Supabase session, redirect them to the paywall screen. This is a safety net — add it to the home screen's mount logic:

  useEffect(() => {
    if (!appContext.isPaid && !appContext.session) {
      appContext.setCurrentScreen('paywall') // or however routing works
    }
  }, [])

Do not show any error message — just silently reroute.

---

DATABASE MIGRATION (run separately in Supabase dashboard or CLI)

Run this SQL to add Stripe fields to your profiles table:

  ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS stripe_session_id text,
    ADD COLUMN IF NOT EXISTS is_paid boolean NOT NULL DEFAULT false;

Run this in the Supabase SQL editor or as a new migration file.

---

DO NOT CHANGE:
- Paywall screen layout, headline, feature list, pricing copy, or visual design
- Any other screen, component, or feature
- AppContext fields from previous prompts — only add to them
- The Supabase Auth logic from the previous prompt
- Edge functions deployed previously (upsert-profile, get-profile, semantic-search, chat-response)
```

---

## SETUP CHECKLIST (complete before applying this prompt)

**Step 1 — Access your Stripe sandbox**
Every Stripe account includes a default sandbox. Go to [dashboard.stripe.com/sandboxes](https://dashboard.stripe.com/sandboxes) and select your sandbox (or use the account picker in the top-left). All work below happens inside the sandbox — no real money moves.

> If you want a completely isolated environment, you can create an additional sandbox from the Sandboxes page (up to 5 are allowed). For a prototype, your default sandbox is fine.

**Step 2 — Create a product and price**
Inside your sandbox:
- Catalog → Products → **Add product**
- Name: "Latched — 6-Week Plan" (or whatever fits your pricing)
- Add a one-time price (e.g. $19.99) or recurring — your choice
- Copy the **Price ID** (starts with `price_...`)

**Step 3 — Get your sandbox API keys**
Inside your sandbox:
- Developers → API Keys
- Copy the **Secret key** (starts with `sk_test_...`)
- Copy the **Publishable key** (starts with `pk_test_...`) — needed for the frontend

**Step 4 — Set Supabase secrets**
Run in your latched-backend terminal (replace values with your actual keys):

```bash
cd /path/to/latched-backend

npx supabase secrets set STRIPE_SECRET_KEY=sk_test_... --project-ref YOUR_PROJECT_REF
npx supabase secrets set STRIPE_PRICE_ID=price_... --project-ref YOUR_PROJECT_REF
```

**Step 5 — Deploy the two new edge functions**
```bash
npx supabase functions deploy create-checkout-session --project-ref YOUR_PROJECT_REF
npx supabase functions deploy verify-payment --project-ref YOUR_PROJECT_REF
```

**Step 6 — Add publishable key to Lovable env**
In Lovable's project settings → Environment Variables, add:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Test card for checkout:**
`4242 4242 4242 4242` · Any future expiry · Any 3-digit CVC · Any ZIP

> Sandbox test cards only work inside a sandbox — never use them in live mode. No real charges occur.
