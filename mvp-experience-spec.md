# Latched — MVP Experience & Requirements Spec
**Version:** 1.0  
**Status:** Draft for review  
**Last updated:** 2026-05-25  
**Author:** Generated from PRD v0.9, Technical Design v1.0, Brand Guidelines, Smart-FAQ Library v1.1, and FAQ entry corpus  

---

## How to Read This Document

This spec is experience-first, not engineering-first. It describes what a user sees, feels, and does at every moment in the MVP — with enough specificity that a designer could wireframe from it and a developer could understand the decisions behind each screen. Engineering detail lives in `technical-design-v1.md`; this document is its product-facing counterpart.

The MVP has four pieces: **Onboarding** (how she gets in), **Pillar 1: Quick Chat** (her 3am lifeline), **Pillar 2: Getting Started** (her crash course), and **Pillar 3: This Week** (her personalized guide). They are bound together by a **Home Screen** that ties the three pillars into a single, personalized daily experience. This document specs all four.

Throughout this spec, copy direction is marked in *italics* and represents the tone and phrasing intent for designers and copywriters, not final approved strings. Design choices Ashley needs to make (rather than recommendations) are flagged with **🔲 Ashley's call.**

---

## Pillar 0: Onboarding

### Purpose and Success Criteria

The onboarding flow has one job: get a sleep-deprived, often-in-pain mom from a blank screen to a personalized home screen in under five minutes, with enough warmth that she feels like she landed somewhere that understands her. Every second of friction in this flow is a drop in activation rate, which means fewer moms getting help at the moment they need it most.

Success looks like: she completes onboarding in under 5 minutes, path selection has a ≥90% completion rate, and she encounters her baby's name and her own chosen address on the home screen within seconds of arrival.

### Overall Flow Architecture

Onboarding is a linear stepper — one question or action per screen, no sidebars, no visible progress fractions until the halfway point (where revealing "you're almost there" helps). The stepper does not allow back-navigation on the first two screens (those are pre-paywall foundation questions); from screen 3 onward, a subtle back chevron is available. There is no "skip" for required fields; skippable fields have a clearly labeled "I'll add this later" link below the input.

The paywall sits after path selection and before the personalized protocol is revealed. The flow must feel like it's delivering something specific and personalized before it asks for money — the mom needs to see "here's your week 1 plan for your nursing journey" before she sees "$49." The pre-paywall screens are the product preview; the paywall is the conversion point.

### Step-by-Step Screen Specifications

---

#### Screen 1: Welcome / Entry Point

**What this screen does:** Establishes tone, sets the emotional register, and confirms this app is different from a generic health resource. This is the first brand impression after a cold landing page or IBCLC referral.

**What she sees:**
- If she arrived via an IBCLC referral link (e.g., `latched.com/r/sarah-memorial`): the header shows the referring IBCLC's name and photo in a small trust badge — *"Recommended by Sarah, IBCLC at Memorial Hospital"* — before any Latched branding. This is the most important trust signal in the entire funnel and must render within the first visible viewport, above the fold.
- App name and brief positioning line. Recommended copy direction: something like *"The support you needed from your IBCLC — available at 3am."* Not clinical. Not cheerful in an empty way.
- A single large CTA button: *"Let's get started"*
- Below the button, very small: *"Already have an account? Sign in"*

**Required vs. skippable:** Nothing is collected here. This is a tone-setting entry screen.

**Why this step exists:** It converts the QR-code scan or ad click into an emotional yes before anything is asked. The IBCLC trust badge, when present, does enormous conversion work. Moms in the referral channel are arriving with high intent and a specific trusted person's endorsement — the product needs to honor that immediately.

**Copy direction:** Warm but not saccharine. No exclamation points. No promises that overreach ("we'll make breastfeeding easy!"). Lead with presence, not hype.

---

#### Screen 2: Name and How to Address Her

**What this screen does:** Collects how she wants to be spoken to in the app. This is one of the most intentional UX decisions in the product — asking the question signals that the app treats her as an individual.

**What she sees:**
- A warm single-line prompt at the top. Recommended copy direction: *"Before we start — what should we call you?"*
- Four tap-to-select chips across the top: **Mama**, **Mom**, **Mommy**, **[My name]**
- If she taps "[My name]": a text input appears inline, keyboard rises, she types her preferred name or nickname. No legal name is required or asked for.
- A soft explanatory line beneath the chips: *"We'll use this throughout the app. You can change it any time in settings."*
- A "Continue" button, active only when a selection has been made.

**Required vs. skippable:** Required. There is no "skip" here. The question takes 5 seconds and is the reason every piece of subsequent copy can feel personal. Defaulting to "Mom" if she never completes this question is a fallback option for the edge case where she abandons mid-onboarding and returns later — but she should not be able to proceed without making a selection.

**Why this step exists:** It directly populates the `address_preference` field in `user_preferences`. Every subsequent UI string — home screen greetings, protocol copy, chat prompts, push notifications — uses this chosen address. The PRD and brand guidelines both make this a non-negotiable personalization moment. "Mom" as a generic label feels impersonal; her chosen name feels like the app actually knows her.

**Copy direction:** The framing should feel like a small, warm gesture, not a form field. The question is conversational. The chips should be visually friendly — rounded, medium-sized, with clear selection states (filled teal `primary-500`, white text). Tapping a chip should feel satisfying.

**🔲 Ashley's call:** Should "Mama" vs. "Mom" vs. "Mommy" be presented as chips (as specced here), or as a single text input with those as suggested options? Chips are faster; text input captures edge cases (e.g., she goes by "Momma" or "Ma"). Recommendation: chips with a write-in "[Something else]" option that reveals a text input.

---

#### Screen 3: Baby's Name

**What this screen does:** Establishes the baby as a named individual in the app, creating the emotional connection that makes all subsequent copy feel personal and specific.

**What she sees:**
- Prompt copy direction: *"Tell us about your little one. What's their name?"*
- A single text input, labeled *"Baby's first name"*
- Below it, a smaller secondary input: *"Nickname (optional)"* — with placeholder *"If you have one"*
- Beneath both inputs, a soft "I'll add this later" link (smaller, neutral color — not a button). This is the one skippable field in onboarding, though skipping it degrades the personalization experience throughout the app.

**Required vs. skippable:** Baby's name is skippable with the "I'll add this later" link, but is strongly encouraged. If skipped, the app defaults to "your little one" in all copy. The app should nudge her to complete this in a banner on the home screen until it's filled in ("Add your baby's name to personalize your experience").

**Why this step exists:** It populates `babies.name` and `babies.nickname`. The PRD and brand guidelines are explicit: referring to the baby by name throughout the app is a meaningful differentiator. "Did Nora have enough wet diapers today?" hits differently than "Did your baby have enough wet diapers today?" — and that difference compounds across weeks of daily interaction.

**Copy direction:** The prompt should feel warm and unhurried. Not "Enter your baby's name" (form-field energy). Something that acknowledges she just had a baby and may still be in the hospital, or exhausted, or both.

---

#### Screen 4: Baby's Date of Birth

**What this screen does:** Collects the single most important data point for the week-by-week protocol — the date of birth that drives all week calculations, content routing, and chat context.

**What she sees:**
- Prompt copy direction: *"When was [baby's name] born?"*
- A date picker, mobile-native. On iOS, the standard scroll-wheel picker. On Android, a numeric date input. Keep it simple — a custom date picker is unnecessary and adds complexity.
- Beneath the date picker, a brief warm line: *"This is how we know what week you're in — so everything you see is actually relevant to right now."*
- A "Continue" button.

**Required vs. skippable:** Required. Week calculation breaks without a DOB. If she doesn't know the exact date for some reason (unlikely, but possible), she can tap "I'm not sure of the exact date" which surfaces a "baby is approximately X weeks old" selector instead — a simple 0-12 week slider that computes a best-guess DOB.

**Why this step exists:** `baby_dob` in the `babies` table drives `week_postpartum` calculation in `user_preferences`. Every module she sees, every "This Week" card, and every chat session includes her week as context. Getting this right on day one prevents all content from routing to the wrong week — which would be an immediate trust-breaker.

**Copy direction:** The explanatory line beneath the picker does real work here. Many moms will wonder why an app needs their baby's birthday. Answering that question preemptively ("so everything is relevant to right now") prevents hesitation and builds trust.

---

#### Screen 5: Feeding Path Selection

**What this screen does:** This is the most important data collection moment in onboarding. It determines which protocol track, which modules, which FAQ entries, and which home screen content she sees for the next six weeks. It should feel like a meaningful choice, not a checkbox.

**What she sees:**
- A brief framing paragraph at the top. Copy direction: *"Every feeding journey looks different. Tell us where you're starting — you can always update this as things change."*
- Three path cards, each tappable, displayed vertically with a clear visual hierarchy:

  **Card 1 — Nursing** (Path A)  
  Icon: a simple nursing silhouette or breast icon  
  Headline: *"Nursing / Breastfeeding"*  
  Subline: *"Feeding directly at the breast"*

  **Card 2 — Pumping** (Path B)  
  Icon: a simple pump icon  
  Headline: *"Exclusively Pumping"*  
  Subline: *"Expressing milk and bottle-feeding"*

  **Card 3 — Combo Feeding** (Path C)  
  Icon: a combination icon (breast + bottle)  
  Headline: *"Combination Feeding"*  
  Subline: *"Any mix of nursing, pumping, and formula"*

- Below the three cards: a softer, smaller fourth option: *"I'm still figuring it out"* — a text link, not a card, that selects Path A (nursing) as a temporary default and surfaces a note on the home screen: *"Not sure which path is yours yet? That's okay. We'll start with breastfeeding basics and you can update this any time."*

**Required vs. skippable:** Required. Path selection is the primary personalization engine. Without it, the app cannot serve the right protocol. The "I'm still figuring it out" option preserves forward movement while making a reasonable default choice.

**Why this step exists:** This is the "Noom moment" from the PRD — the personalization commitment that makes the product feel built for her, not for everyone. Moms who feel like the app is made for their specific situation convert at higher rates and engage more deeply. Path selection also gates the flange tool (paths B and C only) and the combination feeding module.

**Copy direction:** Do not use judgment language anywhere in this screen. "Exclusively pumping" should not read as a lesser choice than nursing. "Combination feeding" explicitly includes formula and should not be framed as a compromise. The framing paragraph sets the tone: every path is valid.

**🔲 Ashley's call:** Should path selection happen here (screen 5, before paywall) or later? The PRD flags this as an open question. The recommendation in this spec is: before paywall. The path card is the "aha moment" that makes the subsequent protocol preview feel personalized — and the personalized protocol preview is what converts her to pay. If path selection comes after payment, the pre-paywall experience is generic, which weakens conversion.

---

#### Screen 6: Goal / Reason for Being Here

**What this screen does:** Collects her primary reason for being here so the home screen experience and initial content surface can be tuned to her situation. This is lighter-touch personalization compared to path selection — it's about tone and emphasis, not content routing.

**What she sees:**
- Prompt: *"What brings you here?"*
- Four to five tap-to-select chips (multi-select is fine here):
  - *"Getting started — I'm brand new to this"*
  - *"Looking for answers to a specific question"*
  - *"Getting ready to pump at work"*
  - *"Something isn't going the way I expected"*
  - *"Just want to feel more confident"*
- A "Continue" button.

**Required vs. skippable:** Skippable with a "Skip for now" link. This data is used for home screen copy emphasis and initial module prioritization — useful but not load-bearing. If skipped, the home screen defaults to "Getting started" mode.

**Why this step exists:** It determines which home screen headline variant she sees ("Getting started, [name]?" vs. "Here to find answers?" vs. "Let's get you ready for work") and which module is surfaced first on the protocol. It also feeds the analytics pipeline — understanding why moms arrive helps Ashley make content and GTM decisions.

**Copy direction:** The options should feel like things a real mom would actually think, not categories from a product taxonomy. "Something isn't going the way I expected" is more human than "Troubleshooting." "Getting started" is more human than "New user onboarding."

---

#### Screen 7: Pump Brand (Paths B and C only)

**What this screen does:** For pumping-path moms, collects pump brand so the flange tool and pumping module content can be brand-specific.

**What she sees:**
- Prompt: *"Which pump are you using?"*
- A list of tap-to-select chips, arranged in order of market prevalence: **Spectra** (S1/S2/S9), **Medela** (Pump In Style, Freestyle), **Elvie**, **Willow**, **Momcozy**, **Other**
- A "Not sure yet / haven't received my pump" option as a text link below the chips.
- A "Continue" button.

**Required vs. skippable:** Skippable. If skipped, the flange tool shows generic instructions and the pumping module notes she can update her pump brand in settings. Surfaced again on first entry to the flange tool.

**Why this step exists:** Pump-brand-specific guidance is one of the PRD's explicit differentiators. The flange tool recommends sizes by brand, the pumping module covers brand-specific settings and cleaning protocols, and the FAQ library has brand-specific entries. Without knowing her pump, that specificity is lost.

---

#### Screen 8: Paywall — Personalized Protocol Preview

**What this screen does:** This is the conversion screen. By this point, she's told the app her name, her baby's name, her path, and her goal. The paywall should reflect that investment back to her — showing her exactly what she's about to get, personalized to the choices she just made.

**What she sees:**
- A personalized headline. Copy direction: *"[Name], here's your [6-week nursing / 6-week pumping / 6-week combo] plan."* Use her chosen address and her path name.
- A brief preview card showing Week 1 content (title and first line) for her specific path. This is the product preview — she can see what's waiting for her.
- A clear value summary (not a bulleted feature list, but 2-3 short lines in sentence form): *"Week-by-week guidance written for your specific path. Answers to your 3am questions, vetted by IBCLCs. A tool to track feeds and pumps as you go."*
- Price: **$49 — one time, not a subscription.** This framing matters; moms are sensitive to recurring charges.
- A "Get started — $49" CTA button (primary, full-width, `primary-500`).
- Below the button: *"30-day money-back guarantee. No subscription. Yours for the full 6 weeks."*
- Very small, below that: links to Privacy Policy and Terms.

**Required vs. skippable:** The paywall cannot be skipped. Completing payment gates access to all protocol content, the chat feature, and the tracker.

**Why this step exists:** The personalized preview makes the $49 feel earned. She can see her specific protocol, not a generic product. The path-specific Week 1 preview (e.g., "Week 1: Your milk is coming — here's exactly what the first seven days look like") is the final piece of pre-paywall personalization.

**Copy direction:** The price should be confident, not apologetic. Don't bury it or soften it with excessive hedging. The guarantee reduces risk. The "not a subscription" framing is genuinely important to this demographic — many moms have been burned by subscription traps in the postpartum apps space.

**🔲 Ashley's call:** Does the paywall include a "Recommended by [IBCLC name]" reminder for referral-channel arrivals? Recommendation: yes, softly, as a small badge or attributed quote near the top of the paywall. The IBCLC's name is the trust signal that converts this channel; repeating it at the paywall moment reinforces it.

---

#### Screen 9: Account Creation (Post-Paywall)

**What this screen does:** Creates her account after payment is confirmed. Account creation is post-paywall by design — reducing pre-purchase friction.

**What she sees:**
- Prompt: *"You're in. Create your account to save your progress."*
- Three options, clearly differentiated:
  - A full-width "Continue with Google" button (Google icon, outlined style)
  - A full-width "Continue with Apple" button (Apple icon, dark filled style — matches Apple HIG)
  - A horizontal divider with *"or"* centered in it
  - An email field with a "Send me a magic link" button below it
- A brief note: *"We'll send you a link — no password needed."*

**Required vs. skippable:** Required post-payment. She cannot access her content without an account. The payment has already been confirmed before this screen; account creation simply persists her session and enables re-login.

**Why this step exists:** Magic link auth (as specified in the technical design) is the right UX for sleep-deprived moms — no password to forget. Google and Apple SSO cover the majority of mobile users who want one-tap access. Post-paywall placement eliminates the pre-purchase friction of account creation.

**Copy direction:** The headline should feel celebratory, not administrative. *"You're in"* is warmer than *"Create your account."* Keep this screen sparse — she's anxious to get to her protocol.

---

#### Screen 10: Onboarding Complete — Transition to Home

**What this screen does:** A brief celebratory moment before she lands in the personalized home screen. This is a micro-interaction, not a full screen — a 1.5-second animated transition, not a page she reads.

**What she sees:**
- A warm full-screen moment. Centered. A simple illustration (isometric style, per brand guidelines) — perhaps a warm home scene, or a simple sunrise. 
- Two lines of copy, centered: Her chosen address on line 1, then a brief line 2. Copy direction: *"[Name]."* / *"Your first week starts now."*
- This screen auto-advances after 1.5 seconds. There is no button.

**Why this step exists:** The transition from "I just paid money" to "the app opened a dashboard" needs a moment of warmth. This is the emotional beat that makes paying feel good rather than immediately transactional.

**Copy direction:** Short. Warm. Not hyperbolic ("Your journey begins!" is too much). Something quiet and specific. The baby's name is intentionally not on this screen — this moment is for her.

---

### Onboarding Data Summary Table

| Screen | Field Collected | Required | Downstream Use |
|--------|----------------|----------|---------------|
| 2 | Chosen address / name | Yes | All personalized copy throughout app |
| 3 | Baby's name, nickname | Soft | All personalized copy referencing baby |
| 4 | Baby's DOB | Yes | Week calculation; protocol routing; chat context |
| 5 | Feeding path (A/B/C) | Yes | Protocol routing; module content; flange tool gating |
| 6 | Goal / reason | Soft | Home screen copy variant; module prioritization |
| 7 | Pump brand | Soft (B/C) | Flange tool; pumping module specificity |

---

## Pillar 1: Quick Chat (3am Mode)

### Purpose and Product Philosophy

Quick Chat is the feature that exists for 3am. Not for leisurely research. Not for reading. For a one-handed, sleep-deprived mom who needs to know one thing right now, and who will not scroll, will not read a wall of text, and will not tolerate a dead end.

The smart-FAQ architecture (described in full in the PRD and technical design) means the chat is not a free-form AI assistant. It's a semantic search engine against a 100-150 entry library of IBCLC-reviewed vetted answers. The mom doesn't know or care about that distinction — from her perspective, she types a question and gets an answer. The architecture shapes what the UX can promise and what it can't.

This spec describes the experience from her side of the screen.

---

### Entry Point

From the home screen, Quick Chat is always accessible via a persistent bottom navigation tab — the chat bubble icon. It is also surfaced directly on the home screen via a card with a tap-to-open CTA. The home screen card copy direction: *"Got a question? Ask here — answers are IBCLC-reviewed."*

She can open chat in two ways: through the bottom nav (persistent, visible from any screen), or by tapping "Ask a question" on the home screen's Quick Chat card. Both entry points open the same chat view.

The feature is labeled "Quick Chat" in navigation and "Ask" on the home screen card. The 3am mode framing is internal product language, not a user-facing label.

---

### The Chat Interface

**Layout:** The chat view is a standard messaging-style interface. Her questions appear on the right in a warm neutral bubble (`neutral-100` background with `neutral-900` text). App responses appear on the left in white with a subtle `primary-300` left border — visually distinct from her messages but not alarming or clinical.

**Input:** A single-line text input at the bottom of the screen, above the keyboard. Placeholder text on first open: *"What's on your mind?"* After her first message: placeholder clears and stays empty. The send button is an arrow icon, not a "Send" label. The input field should support voice-to-text via the OS keyboard microphone — important for truly one-handed use.

**Suggested questions:** On the empty state (before she types anything), 4-5 suggested question chips appear above the input field. These are not exhaustive — they're prompts to lower the activation energy for first-time users. Examples based on the FAQ library:

- *"How do I know if my baby has a good latch?"*
- *"My baby wants to nurse every hour — is that normal?"*
- *"How do I know if I have enough milk?"*
- *"My nipple comes out flat after feeding — what does that mean?"*
- *"My supply dropped — what happened?"*

These suggested questions are path-aware and week-aware. A Path B (pumping) mom in week 1 sees different suggestions than a Path A (nursing) mom in week 4. The suggestions are surfaced from the most-frequently-matched FAQ entries for her path and week. They disappear once she types something.

**Free-form text:** She can also type any question she wants. Free-form typing is the primary interaction mode; the suggestions are training wheels for first-time users.

---

### How Semantic Matching Works from Her Perspective

She does not see confidence scores, match percentages, or any technical signal about how well her question matched the library. From her perspective, there are three experiences:

**Experience 1: She gets a clear answer (HIGH confidence)**

The response appears in the left-side message bubble. It is the verbatim IBCLC-reviewed answer from the library — no framing, no hedging, no caveat. Below the answer text, a small persistent attribution badge: an IBCLC icon and the text *"Reviewed by a certified lactation consultant."* This badge appears on every high-confidence response. It is small — not the point of emphasis — but it is always there. If the library entry has an escalation trigger (e.g., mastitis), the escalation instruction appears as part of the answer text itself, not as a separate UI element.

No additional UI chrome. No rating buttons on first response. She reads the answer and goes back to her baby.

**Experience 2: She gets a useful but qualified answer (MEDIUM confidence)**

The response appears with a single soft framing line prepended. Copy direction: *"Here's what we know about [topic] — it may not be an exact match to your situation."* Beneath the answer, a persistent small CTA: *"Not quite right? Talk to a real person →"* This CTA opens the escalation flow.

The framing line is not a warning. It is not alarming. It is a gentle acknowledge that the answer is directionally helpful but may not be perfectly tailored. The mom should still find it useful — the library entry was chosen because it was topically relevant.

**Experience 3: She gets a no-match / refusal (LOW confidence)**

The app does not give an answer. No fabricated response. No partial guess. What she sees instead:

A response bubble that acknowledges the question and is honest about the limit. Copy direction: *"That's a specific one — and I want to make sure you get a real answer, not a guess. Here's how to reach someone who can actually help:"*

Followed by a short list of escalation options rendered as tappable rows (not a wall of text):
- If she came via an IBCLC referral: *"Contact [IBCLC name]"* — tapping opens their preferred contact method (email or text, as configured in the IBCLC's partner record)
- *"Hospital lactation line"* — tapping opens a phone call
- *"Find an IBCLC near you"* — tapping opens a pre-filled IBCLC Locator search (ILCA's public directory)

Below the escalation options, a small human reassurance line: *"Your question was noted — our team reviews what comes in and we'll work to have a better answer over time."* This is factually accurate (the question goes into the unmatched queue) and closes the dead-end feeling. She is not bounced. She is seen.

**🔲 Ashley's call:** The refusal experience needs a tone decision. The current recommendation is honest and warm ("That's a specific one"). An alternative is more apologetic ("I don't have a vetted answer for that yet"). Recommendation: the first framing. Apologetic reads as a product failure; "specific one" reads as the system respecting her by being honest rather than guessing.

---

### Escalation: What the Handoff Looks Like

The escalation path differs based on her referral context:

- **IBCLC-referred mom:** The primary escalation option is her referring IBCLC's name and preferred contact. This is the product's competitive advantage — the handoff brings her back to the trusted person who recommended the app. The text reads: *"Talk to [IBCLC name]"* with a subtitle: *"She recommended Latched to you — she can help with this too."*
- **Direct B2C mom:** The hospital lactation line and IBCLC directory are the escalation paths. No personalized IBCLC contact.

In both cases, the escalation options are displayed, not automatically initiated. She taps to contact; Latched does not initiate a contact on her behalf.

---

### The "IBCLC-Reviewed" Attribution Badge

Every answer response — high or medium confidence — carries a small attribution badge. The badge is not a legal disclaimer. It is a trust signal. The design should be subtle: a small shield or check icon in `primary-500`, next to the text *"IBCLC-reviewed."* It should be visually present but not dominating — she's reading the answer, not the badge.

The badge does not appear on the refusal response (there's no answer to attribute) or on the suggested question chips.

---

### Empty State

The empty state is the first thing she sees when she opens chat before typing anything. It should feel like a space she belongs in, not an empty productivity app.

**What she sees:**
- A brief welcoming headline. Copy direction: *"Ask anything."* (Simple. Trusting. No setup required.)
- A subline: *"Answers are reviewed by certified lactation consultants. For clinical emergencies, always call your provider."*
- The suggested question chips (4-5, path and week aware, as described above)
- The text input with placeholder *"What's on your mind?"*

There is no illustration on the empty state. No cartoon. No excessive onboarding copy. She opened this feature because she has a question — the empty state should get out of her way.

---

### Session Handling and Chat History

Chat history persists within a session and across sessions. When she reopens the app and navigates to chat, she sees her prior conversation — not a fresh empty screen. This matters at 3am, when she may need to re-read an answer she got 20 minutes ago.

Chat history is retained for the full 6-week protocol period. After graduation (week 6), chat history is archived and accessible but not the default view.

There is no "clear chat" button exposed in the primary UI. If she wants to start a new conversation topic, she simply types a new question — the system treats it as a new query regardless of conversation history (the smart-FAQ architecture does not have conversational context across turns; each message is a fresh semantic query).

**🔲 Ashley's call:** Should there be a visual divider between conversation days (e.g., "Today," "Yesterday," like iMessage)? Recommendation: yes — this makes the history scannable and helps her find an answer she read two days ago.

---

### What the Chat Feature Is Not

To be explicit for designer and developer briefing: this is not a conversational AI assistant. The app does not remember what she said in a previous turn and synthesize an ongoing response. Each message is independently matched to the FAQ library. There is no "follow-up question" flow that builds on prior context. If she asks "is that normal?" as a follow-up to a previous answer, the system treats it as a standalone query. This is a limitation of the smart-FAQ architecture and should be communicated implicitly through the UX (question-and-answer format, not a back-and-forth thread).

---

## Pillar 2: Getting Started (Breastfeeding & Pumping Basics)

### Purpose and Product Philosophy

Getting Started is structured content, not chat. Think of it as the crash course a knowledgeable friend gives you before you leave the hospital — the things you actually need to know to get through the first few weeks, delivered in digestible form without overwhelming you.

This is not a blog. It's not a Wikipedia. It's a curated, sequenced short curriculum that a completely new mom can complete in under 30 minutes total, one module at a time, while she has a spare hand and a sleeping baby. Each module is under 5 minutes. Each module ends with something actionable.

The Getting Started library is path-aware. A mom who selected Path B (exclusive pumping) should see a pumping-first curriculum, not a nursing-first curriculum with pumping tacked on. A mom who selected Path C (combo) sees both. This is the content-routing payoff from onboarding.

---

### Module Architecture

Getting Started is organized into 5-6 modules per path. Modules are displayed in a recommended sequence but can be accessed in any order. The structure below represents the full set — path-specific variants are noted.

#### Module List (All Paths)

**Module 1: Your First 48 Hours**  
*What it covers:* Colostrum, what to expect in the first day or two before milk comes in, why small volumes are normal, how to tell if baby is getting enough. The "it's supposed to feel like this" module.  
*Paths:* A, B, C  
*Why first:* This is the module that prevents panic on day 1. More moms abandon breastfeeding in the first 48-72 hours than any other window. This module addresses the exact fears that drive that abandonment.

**Module 2: Latch and Positioning (Nursing paths) / Getting Your First Pumping Session Right (Pumping paths)**  
*Nursing version covers:* The mechanics of a good latch, the three most common holds, what to do when it hurts, the lipstick-shaped nipple signal.  
*Pumping version covers:* Setting up the pump for the first time, why suction strength matters (higher ≠ better), the stimulation vs. expression cycle, what to expect the first week of output.  
*Paths:* A and C see nursing version. B sees pumping version. C optionally sees both.  
*Why second:* Latch (or first pump session) is the first practical skill moment. It should come early, when the behavior is new and the motivation to learn is highest.

**Module 3: Feeding Your Supply — What Actually Works**  
*What it covers:* The demand-and-supply relationship, why more frequent removal = more milk, why supplementing prematurely can backfire, how long supply takes to regulate, the difference between established supply (weeks 6-12) and building supply (weeks 1-5).  
*Paths:* A, B, C  
*Why third:* Supply anxiety is the most common driver of early breastfeeding abandonment. This module gives her the mental model to understand why supply works the way it does — so when she hits the 3-week growth spurt and her baby is nursing every hour, she doesn't interpret that as failure.

**Module 4: Milk Storage and Pumping Basics (Combo and Pumping paths) / Baby's Cues (Nursing path)**  
*Pumping/Combo version covers:* The storage guidelines (4-4-4-12 rule, containers, labeling, freezer management), thawing, high lipase, and paced bottle feeding for when the bottle comes out.  
*Nursing version covers:* Reading hunger and satiation cues, cluster feeding, growth spurts, when to feed on demand vs. when to wonder if something's wrong.  
*Paths:* B and C see storage/pumping version. A sees cue-reading version.  
*Why fourth:* By week 2, storage questions (for pumping moms) and cue-reading questions (for nursing moms) are at peak volume. This module gets ahead of that curve.

**Module 5: Sizing Your Flange (Pumping paths only)**  
*What it covers:* Why flange sizing matters, how to measure nipple diameter, the fit signals (nipple moves freely vs. rubbing sides vs. areola pulled in), the printable ruler tool, and where to find size-specific guidance.  
*Paths:* B, C  
*Why fifth:* Flange fit is the single most underserved topic in consumer breastfeeding education. Most pumping moms use the wrong size for weeks without knowing it. This module is the gateway to the flange tool — it provides context before the tool, so the tool doesn't feel out of nowhere.

**Module 6: Common Concerns and When to Call**  
*What it covers:* A plain-language "is this normal?" scan of the most common first-6-weeks concerns — engorgement, blocked ducts, nipple pain, the distinction between a clogged duct and mastitis, D-MER, and the emotional weight of the fourth trimester.  
*Paths:* A, B, C  
*Why last:* This module is a troubleshooting primer, not a starter. It's most useful once she has the foundational context from modules 1-5. It also bridges to the chat: "If you're dealing with any of this, Quick Chat has IBCLC-reviewed answers."

---

### Within a Module: The Experience

Each module is a single scrollable screen. Not tabs. Not sub-sections with their own navigation. A single piece of content she scrolls through once.

**Structure of each module screen:**
- **Module header:** Title in H2, a 1-line "what you'll learn" summary in smaller text. Below the header, a small tag: *"~4 min read"* (or the actual estimated read time). 
- **Lead image:** One visual asset near the top. Per brand guidelines, this should be either a photojournalistic photo (natural, unposed, real moment) or an infographic. Not both on the same screen. For latch content, an infographic showing correct positioning is appropriate. For supply content, a real photo of a mom nursing is appropriate. The mix-across-modules approach creates visual variety without violating the "one dominant style per screen" rule.
- **Body content:** Written in the brand voice — warm, plain language, sentences not bullets, second person. Short paragraphs. Maximum 3-4 lines per paragraph. Headers break up sections every 200-300 words. No bullets anywhere in body content (per brand guidelines and tone-of-voice rules).
- **"Try this" callout:** Near the end of each module, a distinct callout block (warm background, perhaps `accent-200`) with 1-2 concrete, actionable things she can do today based on the module content. Formatted as a warm call to action, not an instruction list. Copy direction example: *"Before your next feed, try this: position your baby so their nose is at nipple level before latching. Give yourself three tries before asking for help — the first usually isn't the best."*
- **Connection to chat:** The last element of every module is a small bridge line to Quick Chat. Copy direction: *"Questions about [module topic]? Ask here →"* This tap opens the chat and pre-fills (or at least highlights) the suggested questions relevant to this module's content.
- **Mark as complete:** A bottom-aligned "Done with this one" button that marks the module complete and returns her to the Getting Started library view. The button is secondary-styled (outlined, not filled) — not pushy. She can also swipe back or use the nav without marking it complete.

---

### Progress Tracking

The Getting Started library view shows her module list with clear completion states. Completed modules have a checkmark (success green, `success` token) and are slightly faded relative to incomplete ones, indicating she can revisit them but they're done. Her current suggested next module is highlighted with a subtle card elevation.

There is no gamification — no streaks, no badges, no progress percentages that pressure her. The progress tracking is informational, not motivational in a pushy sense. She is a new mom, not a productivity app user. The implicit signal "you've done 3 of 6 modules" is enough.

**Bookmarking:** A bookmark icon on each module card in the library view allows her to save modules to a "saved" list for quick re-access. Bookmarks persist across sessions. She can also bookmark an individual module from within the reading view.

---

### Path-Specific Routing

When she opens Getting Started, the library view automatically shows her path-specific modules first. A Path B mom sees the pumping curriculum as her default. A Path A mom sees the nursing curriculum. If she wants to explore outside her path (curiosity, or her path is changing), a "See all topics" option at the bottom of the library view expands the full module list. This is not hidden — some moms will be curious about both paths, especially combo feeders.

If her path changes (she updates it in settings), the library view reorganizes to reflect her new path immediately. Completed modules from her prior path are retained as completed.

---

## Pillar 3: This Week (Week-by-Week Journey)

### Purpose and Product Philosophy

This is the most differentiated feature in the MVP. There are a thousand breastfeeding articles on the internet. There is essentially nothing that tells a mom "here is what is happening right now, this week, with your specific baby, on your specific feeding path."

The Bump, Ovia, and BabyCenter do pregnancy weeks well. Nobody does postpartum weeks the same way. This Week is that app — the postpartum week tracker that says: "This is week 3. Here is what cluster feeding is, why Nora is doing it, why it's a good sign, and what you can do about it." By name. In this week. For her path.

That specificity is the differentiator. Generic breastfeeding articles exist. This Week is not an article. It is a postpartum companion.

---

### How the Week Is Calculated

The week number is calculated from `baby_dob` (collected in onboarding) to the current date, rounding to the start of the current week of life. Week 1 = days 0-6. Week 2 = days 7-13. And so on.

The week number is computed dynamically every time the app loads — she doesn't manually advance weeks, and the app doesn't wait for her to acknowledge a milestone. If she opens the app on day 14, she sees Week 3 content automatically.

The `week_postpartum` value is stored in `user_preferences` and updated on each app open. It also appears in every semantic match log (for context) and is used to surface path-and-week-specific suggested questions in chat.

**Edge case:** If she opens the app and her `baby_dob` would calculate to a week beyond the protocol (week 13+), the app transitions her to the post-protocol experience (see "After Week 12" below) rather than showing an empty week card.

---

### The Week Card

The Week Card is the primary content element of the This Week pillar. It is the centerpiece of the home screen for the entire protocol period. It is also accessible via a dedicated "This Week" tab in the bottom navigation.

**Week Card structure (full view, accessible by tapping the home screen card):**

At the top: a personalized headline. This headline is the most important line on the entire card. It should be warm, specific, and carry the week's emotional theme. It uses both her baby's name and her chosen address if both are populated.

*Example — Week 3, Path A, baby named Nora, mom goes by "Mama":*
> **Week 3: Nora is cluster feeding — and, Mama, that's actually a really good sign.**

*Example — Week 2, Path B, baby named Leo, mom goes by her first name (Sarah):*
> **Week 2: Your body and Leo are figuring it out together. Here's what that looks like.**

Below the headline, the week card is organized into four distinct sections, clearly visually separated but on a single scroll:

---

**Section 1: What to Expect This Week**

Two to three things she will likely experience this week, written in warm, specific prose. Not a bulleted list of symptoms. Two short paragraphs that normalize her experience.

*Example for Week 3, Path A:*
> Around week 3, many babies hit their first major cluster feeding phase — nursing very frequently, often every 45-60 minutes for several hours at a time. If you're in it right now, you're probably exhausted and wondering if something is wrong with your supply.  
>
> It isn't. This is your baby's way of sending your body a "more milk please" message before a growth period. Your supply is responding exactly as it should. The phase typically lasts 2-5 days. In the meantime: eat, rest where you can, and feed on demand.

---

**Section 2: Try This This Week**

One to two specific, actionable things she can do (or try) this week. Formatted as a distinct callout block with a warm background (`accent-200`). Written as guidance, not instruction. No "you should." One thing is better than a list — choose the most impactful action for this week.

*Example for Week 3, Path A:*
> **This week:** If you can borrow or rent a scale (many pharmacies have them, and some IBCLCs lend them), a weighted feed before and after nursing gives you actual numbers — exactly how many oz transferred in one session. It's the most reliable check-in when supply anxiety spikes. Worth 20 minutes to have the peace of mind.

---

**Section 3: What's Normal to Wonder About**

The most emotionally important section. This section explicitly names the fears and doubts she is likely having this week and reframes them without dismissing them. This is the "you're not crazy and you're not failing" section.

*Example for Week 3, Path A:*
> A lot of moms in week 3 wonder if their milk is drying up. The thought is usually triggered by breasts that suddenly feel softer — less full, less heavy. Combined with a baby nursing constantly, it's easy to read that as "I don't have enough."
>
> Softer breasts are a sign your body is getting efficient. This is regulation, not depletion. The baby nursing constantly is the demand signal that increases supply, not a sign that demand has outpaced it.

---

**Section 4: A Question for Quick Chat**

A single targeted question surfaced at the bottom of the week card, directly linked to the chat feature. Tapping it opens chat and pre-fills (or at minimum surfaces) the relevant FAQ entry.

*Example for Week 3, Path A:*
> **Wondering about cluster feeding?** → *"What is cluster feeding and when does it happen?"*

This drives chat engagement organically — she encounters it in the context of content she's already reading, not as a standalone CTA.

---

### Week-by-Week Content Framework: Weeks 1-6

Below is the full content framework for the fourth trimester protocol weeks. Each week includes the headline theme, what to expect, what to do, and what's normal to worry about. Copy direction notes are provided; final copy requires IBCLC advisor review.

---

#### Week 1 — "Your Milk Is Coming"

**Headline theme:** *"Week 1: Your milk is coming — here's what these first seven days really look like."*

**What to expect:** Baby nurses 8-12+ times in 24 hours. This is not excessive — it's exactly right. Colostrum is present from birth; it's small in volume (measured in teaspoons, not ounces) but nutritionally complete for a newborn's marble-sized stomach. Milk typically transitions between days 2-5, often accompanied by breast fullness or engorgement. Some nipple tenderness is common as skin adjusts; pain that persists through an entire feed usually signals a latch worth revisiting.

For pumping moms (Path B): first sessions yield small amounts — often less than half an ounce per session — and that's completely expected. What matters this week is frequency of sessions (8-10/day), not volume. The first week of pumping is about signaling supply, not harvesting it.

**Try this:** Track diapers, not milk volume. In week 1, the reliable indicator of adequate intake is diaper output: one wet diaper per day of age in the first week, then six or more heavy wet diapers per day from day 5 onward. This is the number that matters.

**What's normal to worry about:** "My breasts don't feel full — is my milk even there?" (Yes. Colostrum doesn't create the fullness sensation that transitional milk does.) "My baby wants to nurse again — I just fed her." (Normal. Newborn stomach size and fast digestion make frequent feeding expected.) "Is this much nipple tenderness okay?" (Some tenderness in the first week, especially at latch-on, is common. Sharp or persistent pain through the feed is the signal to get a latch check.)

**Chat connection:** *"How do I know if my baby is getting enough milk while nursing?"*

---

#### Week 2 — "Building the Foundation"

**Headline theme:** *"Week 2: Every feed is building something — here's what."*

**What to expect:** Baby should be back to birth weight by the end of week 2 (day 10-14 is the typical window; earlier is great). Feeds are still very frequent. For nursing moms, milk is now established and may have triggered initial engorgement — breasts may feel hard, hot, and full between feeds. Engorgement typically peaks around days 3-5 and eases as supply begins to regulate to baby's actual intake. For pumping moms, this is the week sessions often become more productive; output increases are visible day by day.

Sleep deprivation is hitting hard this week for most families. The relentlessness of feeding every 1-2 hours around the clock is a real physical and emotional demand. This is acknowledged on the card — not glossed over.

**Try this:** A weight check this week (at the pediatrician, or with a rental scale) gives concrete confirmation that the feeding is working. If baby is back to birth weight or gaining, the data is reassuring. If there's a concern, catching it at week 2 is the right time to get support.

**What's normal to worry about:** "My breasts hurt so much from engorgement — is this going to last?" (Engorgement peaks and eases. Frequent feeding or pumping is the treatment.) "I'm exhausted in a way I didn't expect — is something wrong?" (No. Week 2 exhaustion is one of the most universal postpartum experiences. Something being hard is not the same as something being wrong.)

**Chat connection:** *"How do I relieve engorgement?"*

---

#### Week 3 — "The First Surge"

**Headline theme:** *"Week 3: [Baby name] is cluster feeding — and that's actually a really good sign."*

**What to expect:** The 2-3 week growth spurt is one of the most common reasons moms stop breastfeeding early. It looks like: suddenly wanting to nurse far more often, seeming unsatisfied after feeds, being fussier than usual. For pumping moms, it shows up as baby wanting more volume per session. All of it is normal. All of it is supply-building behavior, not supply failure.

**Try this:** Feed on demand without watching the clock or counting feeds this week. If a rough tally helps reassure you, fine — but trying to maintain a schedule during a growth spurt usually ends in frustration for both mom and baby.

**What's normal to worry about:** "My milk is going away" (Almost certainly not. Softer breasts + nursing constantly = normal regulation, not depletion.) "Something must be wrong with my supply" (A growth spurt is the most common cause of sudden increased nursing in week 3. It passes in 2-5 days.)

**Chat connection:** *"What is cluster feeding and when does it happen?"*

---

#### Week 4 — "Finding a Rhythm"

**Headline theme:** *"Week 4: Something is starting to click — and it's not your imagination."*

**What to expect:** Many moms report that something shifts around week 4. Feeds get more efficient. Baby latches faster. The constant uncertainty of the first three weeks gives way to early familiarity. For pumping moms, sessions are more productive and the pump routine is becoming second nature. This isn't a universal experience — some moms hit week 4 still in the thick of it — but the "something clicking" moment, when it happens, is real and worth naming.

For moms who are planning a return to work around week 6-8, week 4 is when to start thinking about bottle introduction. The window between 3-8 weeks is generally recommended: early enough that baby accepts the bottle before preference sets in, late enough that breastfeeding is well-established.

**Try this:** Check your pump parts. Valves and membranes wear out faster than most moms realize — usually every 4-8 weeks — and worn parts are one of the most common causes of unexplained output drops. Week 4 is a reasonable first check.

**What's normal to worry about:** "My baby suddenly seems fussy again" (Could be another cluster feeding phase, a wonder week developmental leap, or gas. The feeding fundamentals haven't changed.) "Should I start introducing a bottle?" (If returning to work around 8-10 weeks, now is a reasonable time to start offering one bottle a day, ideally not from the nursing parent, using paced bottle feeding.)

**Chat connection:** *"When should I start introducing a bottle?"*

---

#### Week 5 — "A Checkpoint Worth Marking"

**Headline theme:** *"Week 5: You're almost at the milestone most people give up before reaching."*

**What to expect:** Week 5 is quieter than weeks 2 and 3 for most moms. Supply is heading toward regulation. Baby's feeding is becoming more efficient. For pumping moms, total daily output is often stabilizing. This is a good week to take stock of what's working and what isn't, and to get ahead of anything that's still a pain point before the 6-week mark.

The 6-week growth spurt is coming (week 6). Giving this week's card a heads-up about that spurt ("here's what's about to happen, so you're not surprised") is one of the most specific things this app can do that a generic breastfeeding article cannot.

**Try this:** Identify the one thing about feeding that still feels uncertain or uncomfortable. Is it a latch concern? A supply doubt? A pumping logistics issue? This is the week to address it — get an IBCLC appointment, ask in Quick Chat, or post in a support community. Getting ahead of it before week 6 means you're not dealing with two things at once.

**What's normal to worry about:** "Am I making enough?" (Check diaper output and weight gain — those are the actual indicators. If both are good, supply is likely sufficient.) "Will this be sustainable when I go back to work?" (Return-to-work prep in the next week's module will address this specifically.)

**Chat connection:** *"How do I know if I have enough milk?"*

---

#### Week 6 — "Six Weeks"

**Headline theme:** *"Week 6: The fourth trimester's first milestone — and what's coming next."*

**What to expect:** Week 6 is a meaningful landmark. Most obstetricians clear moms for postpartum recovery at the 6-week visit. The 6-week growth spurt (another cluster feeding phase) often hits between weeks 5-7. Supply is usually regulating toward stable — breasts may feel noticeably softer between feeds, which can be disorienting but is normal. Baby is more alert, more social, and — for many moms — visibly rewarding to feed.

The 6-week OB visit often includes birth control discussion. This is clinically relevant for supply: estrogen-containing methods (combined pill, patch, ring) can affect milk supply for some moms. Progestin-only methods (mini pill, IUD, implant) are generally considered safer for lactation. She should mention to her OB that she's breastfeeding.

**Try this:** At your 6-week OB visit, tell your provider you're breastfeeding and ask about birth control options that are compatible with nursing if relevant. A few minutes of conversation now prevents a supply surprise later.

**What's normal to worry about:** "My supply seems lower than last week" (Week 6 regulation is real — supply adjusts to demand. If diapers are still good and baby is gaining, the system is working.) "I'm still struggling with [X]" (The app transitions you into a Week 7+ continuation module after this week. You don't stop here unless you want to.)

**Chat connection:** *"My supply seems to have dropped suddenly — why?"*

---

### Weeks 7-12: The Continuation Pattern

After week 6, the experience transitions from the four-section week card to a lighter-touch continuation module. The card format is preserved, but the content pattern simplifies:

Each week (7-12) has:
- A brief week headline (still personalized with baby name and chosen address)
- One key "What's happening this week" paragraph
- One "Try this" action
- One chat bridge

**Week-by-week themes for weeks 7-12:**

| Week | Theme | Key Focus |
|------|-------|-----------|
| 7 | Supply is regulated — this is your new normal | Supply stabilization, what regulated supply feels like |
| 8 | Return-to-work: the logistics | Pumping at work, PUMP Act rights, scheduling pump sessions |
| 9 | Reverse cycling — baby's new pattern | Baby nursing more at night to compensate for daytime bottles |
| 10 | The freezer stash | Building stash for daycare, FIFO rotation, stash anxiety |
| 11 | Sustaining supply through month 3 | Maintaining pump session frequency, weekend nursing to offset weekday output dip |
| 12 | Three months — looking ahead | Option to continue, what breastfeeding looks like at months 3-6, how the app supports her from here |

---

### After Week 12: The Transition Experience

At week 12 (day 84), the protocol formally ends. The experience does not abruptly switch off. The transition has three parts:

**1. Graduation Card (displayed on week 12's home screen, and again at the start of week 13):**  
A distinct, celebratory card — different in visual treatment from the regular week card. Warm. Brief. Specific to her path and baby's name. Copy direction: *"Twelve weeks with [baby name]. You showed up for this, every feed, every session, every 3am moment. That matters — regardless of what the feeding looked like."* Below it, a summary of her journey and a link to her tracker history.

**2. Transition Options:**  
Three options presented as equal choices (no hierarchy of "right answer"):
- *"Keep going — see what's next in the coming months"* (continuation content, thinner, available immediately)
- *"I've reached my goal — I'm good from here"* (graceful close with a celebration moment)
- *"I'm weaning or changing paths — here's how"* (a short weaning/path-change guide)

**3. Testimonial and Referral Ask:**  
After the transition options, a gentle, non-pushy ask. Copy direction: *"If Latched helped, the best thing you can do is tell another mom."* A simple share card (text + link) and an optional 1-10 rating. No pressure. No dark patterns. She can dismiss it.

---

## Home Screen

### Purpose

The home screen is not a dashboard. It's a daily companion. Every time she opens the app, it should feel like the app knows where she is in her journey and is showing her what's relevant right now — not a generic library of everything available.

---

### What She Sees When She First Opens the App (Post-Onboarding)

The home screen is organized as a vertical scroll of cards, with a warm personalized header at the top. There is no tab bar on the home screen itself — navigation lives in a persistent bottom nav (Home, Chat, Getting Started, Track).

**Header:**
- A warm greeting, time-of-day aware (more detail below). Copy direction example: *"Good morning, Mama"* or *"Hey Sarah"* depending on her chosen address.
- Below the greeting: *"[Baby name] is in week [X]."* — brief, specific, grounding.

**Card 1: This Week (Pillar 3)**  
The most prominent card on the home screen. Takes up roughly the top third of the visible viewport. Displays the week number, the week's headline theme, and a "See this week →" CTA. This card is the visual anchor of the home screen.

**Card 2: Quick Chat (Pillar 1)**  
A medium-prominence card beneath the This Week card. Header: *"Ask anything."* One suggested question chip (the most contextually relevant one for her path and week). A text input field that, when tapped, opens the full chat view with keyboard raised. The text input on the home screen card is real — she can start typing here and it carries forward into the chat view.

**Card 3: Getting Started (Pillar 2)**  
A card showing her next recommended module. Displays the module title, a 1-line description, and a progress indicator ("2 of 6 complete"). A "Continue →" CTA opens directly to the module. If she's completed all modules, this card shows her recently completed modules with a "Revisit" option.

**Card 4: Tracker (below the fold)**  
A compact logging widget. The tracker is not a pillar, but it's surface area on the home screen because quick access is critical — PRD specifies ≤2 taps from home to log. The card shows last logged feed/pump time and a quick "+ Log" button. Tapping the card expands to the tracker log screen.

---

### Dynamic Home Screen Behaviors

**Time of day:**
- 12am-5am: greeting uses *"You're not the only one up right now."* — not "Good morning," not "You're up." This is the highest-emotion touchpoint in the product; new moms feeding at 3am often feel profoundly alone, and the greeting should do one thing: dissolve that isolation without being performative about it. The Quick Chat card is promoted slightly in visual weight (background shifts, card size slightly larger). The likely use case at this hour is chat, not reading modules. **Copy note:** the exact string here is worth A/B testing once there's sufficient traffic. Candidates include *"You're not the only one up right now."* vs. *"Late nights are hard. We're here."* — both pass brand voice, but real-world resonance at this emotional moment is hard to predict from a desk. Flag for early experimentation.
- 5am-12pm: standard morning greeting. Full home screen.
- 12pm-5pm: standard afternoon greeting. If she hasn't logged today, a gentle nudge appears in the tracker card: *"Haven't logged yet today — quick log →"*
- 5pm-12am: standard evening greeting.

**🔲 Ashley's call:** Should the time-aware experience be this granular at MVP, or should MVP be simpler (just greeting changes, no card rearrangement)? Recommendation: Yes, implement the 3am home screen adjustment — this is a meaningful, low-lift product decision that directly serves the most stressed use case. Card rearrangement can be deferred to v1.1.

**Week-aware:**  
The This Week card automatically reflects the current week every time she opens the app. She does not need to manually advance weeks. The home screen refreshes on open.

**Last-activity aware:**  
If she opened the app within the last 2 hours, the greeting can be subtler ("Back again —") rather than a full greeting. This prevents greeting fatigue during cluster-feeding nights when she may open the app every 45 minutes.

**After week 6:**  
The home screen remains the same structure but the This Week card transitions from the full four-section week card to the lighter continuation card format (described in the Pillar 3 "after week 12" section). The card still anchors the home screen.

---

### Home Screen Copy Direction

The home screen copy should feel like a morning text from a knowledgeable friend, not a product notification. It should be brief. It should use her name (chosen address) and baby's name freely. It should never:

- Shame or pressure ("You haven't tracked today!")
- Overpromise ("Today is going to be great!")
- Be generic ("Here are your personalized recommendations")
- Sound like UI copy ("Welcome back to your dashboard")

It should:
- Be specific to where she actually is (week number, time of day)
- Be warm without being cloying
- Get out of her way quickly
- Surface the one thing she most likely needs right now

---

## Open Design Choices — Summary for Ashley

The following decisions are flagged throughout this document as requiring Ashley's input. They are collected here for clarity.

| # | Section | Decision Needed | Recommendation |
|---|---------|----------------|---------------|
| 1 | Onboarding Screen 2 | Chips vs. text input for name/address selection | Chips with a write-in "[Something else]" option |
| 2 | Onboarding Screen 5 | Path selection before paywall vs. after | Before paywall — it drives conversion |
| 3 | Onboarding Screen 8 | Repeat IBCLC name on paywall screen for referral-channel users? | Yes — it's the primary trust signal |
| 4 | Quick Chat | Refusal message framing: "That's a specific one" vs. apologetic | "That's a specific one" — less product-failure energy |
| 5 | Chat | Day-divider visual separators in chat history? | Yes — makes history scannable |
| 6 | Home Screen | 3am time-aware card adjustment at MVP, or defer to v1.1? | Implement at MVP — low lift, high value |
| 7 | Week content | Baby's sex — collect during onboarding for pronoun use in week copy? | Recommend yes, as an optional field on the baby screen — enables "she/her" vs. "he/him" vs. "they/them" pronoun use in week cards |
| 8 | Weeks 7-12 | What's the thinnest viable continuation content at week 6 graduation? | The 6 theme cards described above, authored pre-launch. Full modules authored post-launch from real query data. |

---

## Design Principles: Non-Negotiables

These apply to every screen in the MVP and are non-negotiable during design review.

**One thing per screen.** Every screen should have a single clear primary action or piece of information. If a designer is tempted to add a second CTA "just in case," that's a signal the screen is doing too much.

**Bottom-aligned primary actions.** Primary CTAs live in the bottom third of the screen, within one-handed thumb reach. This is a healthcare product used by people who are frequently one-handed.

**Touch targets: 44x44pt minimum.** All interactive elements — buttons, chips, nav icons — meet or exceed the Apple HIG minimum. Accessibility is a brand value here, not a compliance checkbox.

**Warm charcoal on warm white.** All body text uses `neutral-900` on `neutral-50` background. Never true black on true white — the warm undertones are part of the brand.

**No red anywhere except genuine errors.** The `error` semantic token (`#C04B4B`) is only for form errors and failed states. The breast health escalation triggers in chat use `warning` (`#C47F1A`) or a neutral signal, never red.

**IBCLC attribution on every chat answer.** The "Reviewed by a certified lactation consultant" badge is not optional. It is the trust foundation of the entire chat feature.

**Baby name and chosen address in personalized copy always.** Once collected, these two fields are used in every personalized touchpoint. Generic copy ("your baby") should only appear in states where the name hasn't been collected yet.

---

*This document is a living spec. Flag any section for discussion before beginning design or development. Sections marked with 🔲 require Ashley's decision before the relevant screen can be finalized.*
