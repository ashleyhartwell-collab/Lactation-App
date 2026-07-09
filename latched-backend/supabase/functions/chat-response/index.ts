// Deploy with: npx supabase functions deploy chat-response --project-ref owxrfpqyjsevwkbythrw
// Set secret: npx supabase secrets set OPENAI_API_KEY=sk-... --project-ref owxrfpqyjsevwkbythrw

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
    const { message, context_chunks, conversation_history, user_profile } = await req.json()

    const openAiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAiKey) throw new Error('OPENAI_API_KEY not set')

    // Build context block from retrieved FAQ chunks
    const contextBlock = context_chunks && context_chunks.length > 0
      ? context_chunks.map((c: any) => c.content || c.text || c).join('\n\n')
      : 'No specific knowledge base matches found.'

    // Build profile block
    const profile = user_profile || {}
    const name = profile.name || 'there'
    const feedingPathLabel =
      profile.feeding_path === 'A' ? 'nursing' :
      profile.feeding_path === 'B' ? 'pumping' :
      profile.feeding_path === 'C' ? 'combination feeding' : 'feeding'
    const babyAge = profile.baby_weeks_old != null
      ? `${profile.baby_weeks_old} weeks old`
      : profile.baby_dob
        ? `born ${profile.baby_dob}`
        : 'newborn'

    const systemPrompt = `You are a warm, knowledgeable lactation support assistant for the Latched app. You help new mothers with ${feedingPathLabel} questions with empathy and evidence-based guidance.

User context:
- Name: ${name}
- Baby age: ${babyAge}
- Feeding approach: ${feedingPathLabel}${profile.goal ? `\n- Goal: ${profile.goal}` : ''}

Relevant knowledge base context:
${contextBlock}

Guidelines:
- Answer using the knowledge base context when it's relevant. If the question isn't covered, give a helpful general response based on lactation best practices.
- Be warm and conversational. Avoid clinical or robotic phrasing.
- Keep responses concise, 2 to 4 short paragraphs maximum.
- Write like a human, not a content system. Vary sentence structure, don't start consecutive sentences the same way, and avoid formulaic openings like "Great question" or "It's important to note."
- Use em-dashes sparingly: no more than one per response, and only when a comma or period genuinely won't work. Overuse of em-dashes is one of the strongest signals of AI-generated writing.
- For anything medical (pain, infection, unusual symptoms, significant supply concerns), always recommend they contact their IBCLC or healthcare provider.
- Do not diagnose. Do not prescribe medications or dosages.
- If the user seems distressed, acknowledge their feelings before answering.`

    // Build messages array with conversation history
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversation_history || []).slice(-10), // last 10 turns max
      { role: 'user', content: message }
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 500,
        temperature: 0.5,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`OpenAI error: ${errText}`)
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? "I'm sorry, I couldn't generate a response. Please try again."

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('chat-response error:', err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
