// Deploy with: npx supabase functions deploy verify-payment --project-ref owxrfpqyjsevwkbythrw
// Secrets needed: STRIPE_SECRET_KEY

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
