# Lovable Update Prompt — AI Chat Wiring
**Paste the block below directly into Lovable.**

---

```
Wire the chat screen to a real AI backend. The chat UI already exists — do not change its layout, visual design, color tokens, input styles, or message bubble styles. Only change: the send handler, message state management, typing indicator behavior, and add the new edge function described below.

---

OVERVIEW

Current behavior:
  - Chat input exists but send either does nothing or returns a placeholder response
  - Conversation history is not maintained

Target behavior:
  1. User sends a message
  2. App calls the existing semantic-search edge function to retrieve relevant FAQ context
  3. App calls a new chat-response edge function with the message + retrieved context + conversation history + user profile
  4. Edge function calls OpenAI and returns an AI-generated response
  5. Response appears in the chat bubble; conversation history grows across the session

---

PART 1 — NEW EDGE FUNCTION: chat-response

Create a new Supabase edge function at supabase/functions/chat-response/index.ts with the following implementation. The user will deploy it separately — Lovable only needs to write the file.

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
- Keep responses concise — 2 to 4 short paragraphs maximum.
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

---

After writing the file, add a note in a comment at the top:
// Deploy with: npx supabase functions deploy chat-response --project-ref YOUR_PROJECT_REF
// Set secret: npx supabase secrets set OPENAI_API_KEY=sk-... --project-ref YOUR_PROJECT_REF

---

PART 2 — CHAT SCREEN STATE

In the chat screen component, add the following local state (do not put conversation history in AppContext — keep it component-local so it resets per session):

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)

Where ChatMessage is:
  interface ChatMessage {
    id: string           // crypto.randomUUID() or Date.now().toString()
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }

If the chat screen already renders a list of messages from some existing state shape, adapt this to match that shape — do not change how messages are displayed, only how they are populated.

---

PART 3 — SEND HANDLER

Replace the current send handler (or stub) with this logic:

  const handleSend = async () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isLoading) return

    // 1. Add user message to list immediately
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setChatError(null)

    try {
      // 2. Retrieve relevant context from semantic-search
      let contextChunks: any[] = []
      try {
        const searchResult = await supabase.functions.invoke('semantic-search', {
          body: { query: trimmed, match_count: 5 }
        })
        if (searchResult.data) {
          contextChunks = Array.isArray(searchResult.data)
            ? searchResult.data
            : searchResult.data.results ?? []
        }
      } catch (searchErr) {
        // Semantic search failure is non-fatal — continue without context
        console.warn('semantic-search failed, continuing without context:', searchErr)
      }

      // 3. Build conversation history for the LLM (exclude the message we just added)
      const historyForLLM = messages.map(m => ({
        role: m.role,
        content: m.content,
      }))

      // 4. Call chat-response edge function
      const { data, error } = await supabase.functions.invoke('chat-response', {
        body: {
          message: trimmed,
          context_chunks: contextChunks,
          conversation_history: historyForLLM,
          user_profile: {
            name: appContext.name,
            feeding_path: appContext.feedingPath,
            baby_dob: appContext.babyDOB ?? null,
            baby_weeks_old: appContext.babyWeeksOld ?? null,
            goal: appContext.goal ?? null,
          }
        }
      })

      if (error) throw error

      // 5. Add assistant reply to message list
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (err: any) {
      console.error('chat error:', err)
      setChatError("Something went wrong. Please try again.")
      // Remove the user message we optimistically added, so they can retry
      setMessages(prev => prev.filter(m => m.id !== userMessage.id))
      setInputValue(trimmed) // restore their input
    } finally {
      setIsLoading(false)
    }
  }

Also wire the send handler to the Enter key in the text input (if not already):
  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}

---

PART 4 — TYPING INDICATOR

While isLoading is true, show a typing indicator as the last item in the message list, in an assistant message bubble:

  - Three animated dots (●●● pulse animation, or the CSS "typing" animation if one already exists in the app)
  - Same bubble style as the assistant message bubble
  - Disappears as soon as the real response is added

If the chat screen already has a typing indicator component, use it. If not, create a simple one:

  // TypingIndicator component
  <div className="flex gap-1 items-center px-4 py-3">
    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:300ms]" />
  </div>

Wrap it in the same assistant bubble container as regular assistant messages.

---

PART 5 — ERROR STATE

If chatError is not null, show it as a small text line below the message list and above the input bar:
  - 13px, error color token (or red-500 if no error token)
  - Text: the chatError value
  - Disappears when the user starts typing again (setChatError(null) on input change)

---

PART 6 — EMPTY STATE

If messages is empty (first visit to chat), show an empty state in the message area:

  Headline (16px, semibold, neutral-700): "Ask me anything"
  Subtext (14px, neutral-400): "Questions about nursing, pumping, supply, latch — I'm here."

Below the subtext, show 3 suggestion chips (pill-shaped, border border-primary-200, bg-primary-50, text-primary-600, 13px):
  - "How do I know my baby is getting enough?"
  - "What helps with engorgement?"
  - "How often should I pump?"

Tapping a chip populates the input with that text and immediately calls handleSend(). Remove the empty state as soon as the first message is added.

---

PART 7 — AUTO-SCROLL

After each new message is added to the list (user or assistant), auto-scroll the message list to the bottom. Use a ref on the last message or a scroll anchor div at the bottom of the list:

  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // At the bottom of the message list JSX:
  <div ref={bottomRef} />

---

PART 8 — INPUT DISABLE DURING LOAD

While isLoading is true:
  - Disable the text input (pointer-events-none, opacity-50)
  - Disable the send button (disabled, opacity-50)
  - Do not show a spinner on the send button — the typing indicator in the message list is sufficient feedback

---

DO NOT CHANGE:
- Chat screen layout, header, nav bar, or bottom input bar design
- Message bubble styles, colors, or typography
- Avatar/icon treatment for user vs assistant messages
- AppContext fields — only read from them in the send handler
- The semantic-search or upsert-profile edge functions
- Any other screen, feature, or component outside the chat screen
- Supabase client setup from the previous prompt
```
