# Latched — Lovable Build Brief
**Purpose:** Step-by-step prompts for building an interactive demo of the Latched lactation support app in Lovable.  
**Who this is for:** Ashley (non-technical founder), pasting prompts directly into Lovable.  
**What the demo is:** A realistic, fully interactive React front-end. No real AI backend. Chat responses are pre-written mocks. The goal is something you can show to real moms, IBCLCs, and investors.

---

## How to Use This Brief

1. Open [Lovable.dev](https://lovable.dev) and start a new project.
2. Paste **Prompt 1** in full. Wait for it to build. Review the result.
3. When you're satisfied with the output, paste **Prompt 2**. Continue in order.
4. Each prompt builds on the previous — they must be done in sequence.
5. At the end of each prompt, there's a **"Done looks like..."** checklist. Use it before moving on.
6. If Lovable misses something, paste a short follow-up correction before moving to the next numbered prompt.

**Important note on mock data:** This is a demo. User data (name, baby name, path) should be hardcoded to realistic values so reviewers see a lived-in, real-feeling product. We'll use: **Mom's name: "Mama" / Her name: "Ashley"**, **Baby's name: "Nora"**, **Feeding path: Nursing**, **Baby DOB: 2 days ago (so she's in Week 1)**.

---

## Color Reference (use these exact hex values everywhere)

| Name | Hex | Use |
|------|-----|-----|
| `primary-300` | `#A8D5D1` | Tinted backgrounds, hover fills, left border on chat answers |
| `primary-500` | `#4E9E95` | Primary buttons, active tab, selected chips, links |
| `primary-700` | `#2D7A72` | Text that uses the brand color (not on white body text) |
| `accent-200` | `#EDCFBC` | "Try this" callout backgrounds, soft card highlights |
| `accent-500` | `#C17C5A` | Secondary CTAs, tags, onboarding accent moments |
| `neutral-50` | `#FDFAF7` | Page/screen background (warm white) |
| `neutral-100` | `#F5F0EA` | Card surfaces, input backgrounds |
| `neutral-200` | `#E3D9CF` | Dividers, borders, separators |
| `neutral-500` | `#8A7F78` | Placeholder text, secondary/supporting text |
| `neutral-900` | `#2D2926` | Primary body text (warm charcoal — not pure black) |
| `success` | `#3A8F6F` | Completion checkmarks, completed module states |
| `warning` | `#C47F1A` | Cautionary info only |
| `error` | `#C04B4B` | Form errors only — never decorative |

---

## Font Direction

Use **Plus Jakarta Sans** from Google Fonts (free, no license issues). Import it via a `<link>` in the HTML head:

```
https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap
```

- Headlines (H1/H2): Plus Jakarta Sans, 700 (Bold)
- Subheadings (H3): Plus Jakarta Sans, 600 (SemiBold)
- Body text: Plus Jakarta Sans, 400 (Regular)
- Buttons/labels: Plus Jakarta Sans, 600 (SemiBold)
- Minimum body text size: 16px. Never smaller for paragraph content.

---

---

# PROMPT 1 — Scaffold & App Shell

> **What this prompt does:** Creates the entire app structure, routing, global styles, and color system. Nothing content-specific yet — just the foundation everything else builds on. After this prompt, you should see a working shell with correct colors and fonts.

---

**Paste this into Lovable:**

```
Build a mobile-first React web app called "Latched" — a lactation support app for new moms. This is an interactive demo with no real backend. All data is hardcoded or stored in local React state.

TECH STACK:
- React with React Router for navigation
- Tailwind CSS for styling (configure a custom theme with these exact colors)
- No backend needed — all data is mock/local state

TAILWIND CONFIG — add these exact custom colors to tailwind.config.js:
colors: {
  primary: {
    300: '#A8D5D1',
    500: '#4E9E95',
    700: '#2D7A72',
  },
  accent: {
    200: '#EDCFBC',
    500: '#C17C5A',
    700: '#9A5C3B',
  },
  neutral: {
    50: '#FDFAF7',
    100: '#F5F0EA',
    200: '#E3D9CF',
    500: '#8A7F78',
    900: '#2D2926',
  },
  success: '#3A8F6F',
  warning: '#C47F1A',
  error: '#C04B4B',
}

FONTS:
- Import Plus Jakarta Sans from Google Fonts (weights 400, 500, 600, 700)
- Set it as the default font family for the entire app
- Minimum body text: 16px

APP ROUTES — create these routes (all pages can be empty placeholders for now except the shell):
- /onboarding (start here by default)
- /home
- /chat
- /getting-started
- /this-week

GLOBAL LAYOUT:
- Mobile-first. Target 390px wide (iPhone 14 size). Never wider than 430px for the content area. Center the app on desktop with a neutral-200 background outside the content area.
- Page background: neutral-50 (#FDFAF7)
- Body text: neutral-900 (#2D2926)
- Font: Plus Jakarta Sans throughout

GLOBAL CONTEXT (React Context or Zustand store):
Create an AppContext that stores this mock user data — it will be used throughout the app:
{
  userName: "Mama",          // how we address her
  realName: "Ashley",        // her actual name (used in account screen)
  babyName: "Nora",
  babyDOB: "2026-05-23",
  weekPostpartum: 1,
  feedingPath: "A",          // A = nursing
  pumpBrand: null,
  onboardingComplete: false,
  hasPaid: false,
  chatHistory: [],
  moduleProgress: {}
}

BOTTOM NAVIGATION (visible on /home, /chat, /getting-started, /this-week — NOT on /onboarding):
- 4 tabs: Home (house icon), Chat (chat bubble icon), This Week (calendar icon), Getting Started (book/sparkle icon)
- Active tab color: primary-500 (#4E9E95)
- Inactive tab color: neutral-500 (#8A7F78)
- Background: white
- Subtle top border: neutral-200
- Height: 64px
- Touch targets: minimum 48x48px per tab
- Tab labels: "Home", "Chat", "This Week", "Started"
- The nav is fixed to the bottom of the screen

ACCESSIBILITY:
- All touch targets minimum 44x44px
- Body text minimum 16px
- Never use pure black (#000) or pure white (#FFF) — use the warm neutrals above

Start the app at /onboarding so the first thing visible is the onboarding start screen.

Do NOT build any actual page content yet — just the routing, global styles, color system, fonts, bottom navigation component, and the AppContext with mock data. Show me a preview with the correct colors and fonts visible, and the bottom nav rendering on a placeholder home screen.
```

---

**Done looks like:**
- [ ] App opens to /onboarding route
- [ ] Background is warm white `#FDFAF7` (not pure white)
- [ ] Font is Plus Jakarta Sans (sleek, modern, not a serif)
- [ ] Bottom nav appears on /home with 4 tabs in the correct teal `#4E9E95`
- [ ] Tailwind custom colors are configured (you can verify by checking a button or element with `bg-primary-500`)
- [ ] App is centered on desktop with a gray surround outside the 390px content area

---

---

# PROMPT 2 — Onboarding Flow (9 Screens)

> **What this prompt does:** Builds all 9 onboarding screens as a linear stepper. The flow collects user preferences and ends with a paywall screen (static, no real payment) and account creation. All data saves to AppContext. After this prompt, you should be able to walk through the full onboarding and land on the home screen.

---

**Paste this into Lovable:**

```
Build the full onboarding flow at /onboarding. It's a linear stepper — one screen at a time, no sidebar, no visible progress bar on the first 2 screens, then a subtle "Step X of 9" indicator from screen 3 onward (small text, top center, neutral-500 color).

Use the AppContext from the scaffold. Each screen updates the context before advancing.

Global onboarding styles:
- Background: neutral-50 (#FDFAF7)
- No back button on screens 1-2. From screen 3 onward, a subtle back chevron (←) top left, neutral-500.
- Primary CTA button: full-width, rounded-xl, bg-primary-500 (#4E9E95), white text, font-semibold, 52px height, pinned to the bottom of the screen above the safe area.
- All chips: rounded-full, border-2 border-neutral-200. SELECTED state: bg-primary-500 border-primary-500 text-white.

---

SCREEN 1 — Welcome

Layout: vertically centered, generous padding (px-6 py-12).

Top section:
- Small trust badge (only shows in demo — hardcode it as visible for demo purposes):
  Rounded pill badge, bg-accent-200, accent-700 text, 14px:
  "💙 Recommended by Sarah, IBCLC at Memorial Hospital"

Center section:
- App name: "Latched" — H1, font-bold, neutral-900, 36px
- Tagline below name: "The support you needed from your IBCLC — available at 3am."
  Body text, neutral-500, 18px, max-width 280px, centered
- Spacer

Bottom section:
- Primary CTA button: "Let's get started"
- Below button, 14px neutral-500: "Already have an account? Sign in"

On "Let's get started" → advance to Screen 2.

---

SCREEN 2 — Name / How to Address Her

Header (top, non-sticky): "Before we start —"
H2, font-bold, 24px, neutral-900, px-6 pt-10

Below header: "What should we call you?"
Body, 18px, neutral-900

Below that, 4 chips in a 2x2 grid (or wrapped row):
"Mama"  |  "Mom"
"Mommy"  |  "My name →"

When "My name →" is tapped: reveal an inline text input below the chips with placeholder "Your preferred name..." bg-neutral-100, rounded-xl, border-neutral-200, 16px text.

Small text below chips (neutral-500, 14px):
"We'll use this throughout the app. You can change it any time."

Continue button: disabled (neutral-200 bg) until a chip is selected or name typed. On activation: primary-500.

On Continue: save to AppContext.userName, advance to Screen 3.
For the demo: pre-select "Mama" so the button is already active.

---

SCREEN 3 — Baby's Name

Step indicator: "Step 3 of 9" — top center, 13px, neutral-500.

Prompt: "Tell us about your little one."
H2, 24px, font-bold, neutral-900

Subprompt: "What's their name?"
18px, neutral-700

Input 1 — "Baby's first name"
bg-neutral-100, rounded-xl, border-neutral-200, 16px, full-width.

Input 2 — below, labeled "Nickname (optional)"
Same style. Placeholder: "If you have one"

Below both inputs: small link text "I'll add this later →" — 14px, neutral-500, underline.

Continue button: enabled when Input 1 has content. "I'll add this later" also advances without requiring input, saving null.

On Continue: save to AppContext.babyName, advance to Screen 4.
For the demo: pre-fill "Nora" in the first input.

---

SCREEN 4 — Baby's Date of Birth

Step indicator: "Step 4 of 9"

Prompt: "When was Nora born?" (use the baby name from context)
H2, 24px, font-bold.

Date picker: 3 dropdown selects side by side — Month / Day / Year.
Each styled as bg-neutral-100 rounded-xl border-neutral-200, 48px height.

Below the picker, a warm explanatory line:
"This is how we know what week you're in — so everything you see is actually relevant to right now."
14px, neutral-500, px-4, italic.

Continue button: enabled when all 3 fields filled.
For the demo: pre-fill with 2026-05-23 (2 days ago).

On Continue: save to AppContext.babyDOB, compute weekPostpartum (Math.floor(daysSinceDOB / 7) + 1), save to AppContext.weekPostpartum. Advance to Screen 5.

---

SCREEN 5 — Feeding Path Selection

Step indicator: "Step 5 of 9"

Framing text (16px, neutral-700, px-6):
"Every feeding journey looks different. Tell us where you're starting — you can always update this as things change."

Three large tappable cards (full-width, stacked vertically, gap-3):
Each card: rounded-2xl border-2 border-neutral-200 bg-white p-4, flex row, icon left + text right.

Card 1 — Nursing:
Icon: 🤱 (or a simple nursing SVG)
Title: "Nursing / Breastfeeding" — font-semibold, 17px, neutral-900
Subtitle: "Feeding directly at the breast" — 14px, neutral-500
SELECTED state: border-primary-500 bg-primary-50 (use a very light teal: #F0FAF9)

Card 2 — Pumping:
Icon: 🍼 (or pump SVG)
Title: "Exclusively Pumping"
Subtitle: "Expressing milk and bottle-feeding"

Card 3 — Combo:
Icon: ⚡ (or combo SVG)
Title: "Combination Feeding"
Subtitle: "Any mix of nursing, pumping, and formula"

Below cards, smaller text link: "I'm still figuring it out →" — 14px, neutral-500.

Continue button: enabled after a card is selected.
For the demo: pre-select "Nursing / Breastfeeding" card.

On Continue: save to AppContext.feedingPath. Advance to Screen 6.

---

SCREEN 6 — Goal / Reason

Step indicator: "Step 6 of 9"

Prompt: "What brings you here?"
H2, 24px, font-bold.

Multi-select chips (tap to toggle, multiple allowed):
"Getting started — I'm brand new to this"
"Looking for answers to a specific question"
"Getting ready to pump at work"
"Something isn't going the way I expected"
"Just want to feel more confident"

Chips wrap into rows, rounded-full, full text visible (don't truncate).
Selected state: bg-primary-500 text-white border-primary-500.

Below chips: "Skip for now →" — small, neutral-500, underline. Advances without selection.

Continue button: active once at least one chip selected, or skip used.
For the demo: pre-select "Getting started — I'm brand new to this".

---

SCREEN 7 — Pump Brand (ONLY show if feedingPath is B or C)

Since the demo is Path A (nursing), SKIP this screen in the flow — jump from Screen 6 directly to Screen 8. But build the screen anyway as a component so it renders if path changes.

If shown:
Step indicator: "Step 7 of 9"
Prompt: "Which pump are you using?"
Chips in 2 columns: "Spectra S1/S2", "Spectra S9", "Medela", "Elvie", "Willow", "Momcozy", "Other"
Below chips: "Not sure yet / haven't received mine →" text link.
Continue or skip. Saves to AppContext.pumpBrand.

---

SCREEN 8 — Paywall (Personalized Protocol Preview)

Step indicator: "Step 8 of 9"

This is a conversion screen. Make it feel premium and personalized.

Top badge (if IBCLC referral — hardcode visible for demo):
Rounded pill, bg-accent-200, accent-700 text:
"💙 Recommended by Sarah, IBCLC"

Personalized headline:
H1, 28px, font-bold, neutral-900:
"Mama, here's your 6-week nursing plan."

Preview card (rounded-2xl, bg-neutral-100, border border-neutral-200, p-4, mx-6):
Small label "Week 1 preview" — 12px, primary-700, uppercase, tracking-wider
Title: "Your Milk Is Coming" — font-semibold, 17px, neutral-900
Body: "Here's what the first seven days really look like — what's normal, what to track, and what actually matters right now." — 15px, neutral-500

Value summary below preview card (plain prose, NOT bullet points, 16px, neutral-700, px-6, gap-3 between lines):
"Week-by-week guidance written for your nursing journey."
"Answers to your 3am questions, vetted by IBCLCs."
"A companion for every feed, every session, every middle-of-the-night moment."

Price block (centered, py-6):
"$49" — 42px, font-bold, neutral-900
"One time · Not a subscription" — 14px, neutral-500

Primary CTA (full-width, primary-500, white, font-semibold):
"Get started — $49"

Below button:
"30-day money-back guarantee. Yours for the full 6 weeks." — 13px, neutral-500, centered
Privacy Policy · Terms — 12px, neutral-500, underline, centered

On "Get started": in the demo, just set AppContext.hasPaid = true and advance to Screen 9. No real payment.

---

SCREEN 9 — Account Creation (Post-Paywall)

Step indicator: "Step 9 of 9"

Celebratory headline:
"You're in." — H1, 32px, font-bold, neutral-900

Subhead: "Create your account to save your progress."
16px, neutral-500

Three auth options:

1. Full-width outlined button: [G icon] "Continue with Google"
   border-2 border-neutral-200, bg-white, neutral-900 text, rounded-xl, 52px

2. Full-width dark button: [Apple icon] "Continue with Apple"
   bg-neutral-900, white text, rounded-xl, 52px

3. Horizontal divider: neutral-200 line with "or" centered in neutral-500 text

4. Email input: bg-neutral-100, rounded-xl, border-neutral-200, placeholder "Your email address", 52px
   Below: full-width primary-500 button: "Send me a magic link →"
   Below that: "No password needed." — 13px, neutral-500

In the demo: any of these buttons just advances to the completion screen. Show a brief loading spinner (0.8 seconds) then advance.

---

SCREEN 10 — Onboarding Complete Transition

Full-screen. bg-primary-500. White text. Centered vertically.

No button. Auto-advances after 1.8 seconds.

Two lines of copy, centered:
Line 1: "Mama." — 32px, font-bold, white
Line 2: "Your first week starts now." — 20px, white, opacity-80

On advance: set AppContext.onboardingComplete = true, navigate to /home.

---

After all screens are built, make sure:
1. The flow goes 1→2→3→4→5→6→8→9→10→/home (skipping 7 for Path A).
2. The demo pre-fills values so a reviewer can tap "Continue" through without filling in everything.
3. The back chevron works from screen 3 onward.
4. AppContext values are updated at each step and persist throughout the demo session.
```

---

**Done looks like:**
- [ ] Tapping "Let's get started" on Screen 1 advances to Screen 2
- [ ] The IBCLC trust badge is visible on Screen 1 and Screen 8
- [ ] "Mama" chip is pre-selected on Screen 2
- [ ] "Nora" is pre-filled on Screen 3
- [ ] Path A card is pre-selected on Screen 5
- [ ] Screen 7 is skipped (since Path A is selected)
- [ ] The paywall shows "Mama, here's your 6-week nursing plan."
- [ ] Tapping "Get started — $49" advances without a real payment
- [ ] The completion screen is teal (#4E9E95) full-screen with white text
- [ ] After 1.8 seconds, app navigates to /home

---

---

# PROMPT 3 — Home Screen

> **What this prompt does:** Builds the personalized home screen — the daily companion. Includes time-aware greeting, the week card, and three entry point cards for each pillar. After this prompt, you should be able to see a realistic, lived-in home screen that uses the stored user data.

---

**Paste this into Lovable:**

```
Build the home screen at /home. It's a vertical scroll of cards with a personalized header. No dashboard chrome — warm and personal.

Read all display values from AppContext: userName ("Mama"), babyName ("Nora"), weekPostpartum (1).

---

HEADER (sticky, bg-neutral-50, border-b border-neutral-200, px-6 py-4):

Left side:
- "Latched" wordmark — 20px, font-bold, primary-700

Right side:
- Small circular avatar placeholder (32px, bg-primary-300, initial "A") — just decorative for demo

---

GREETING SECTION (px-6 pt-6 pb-2):

Implement time-aware greeting using the current hour (JavaScript Date().getHours()):

If hour is 0-4 (midnight to 5am):
  Line 1: "You're not the only one up right now." — 22px, font-semibold, neutral-900
  Line 2 (below): "Nora is in week 1." — 16px, neutral-500

If hour is 5-11 (morning):
  Line 1: "Good morning, Mama." — 24px, font-bold, neutral-900
  Line 2: "Nora is in week 1." — 16px, neutral-500

If hour is 12-16 (afternoon):
  Line 1: "Hey, Mama." — 24px, font-bold, neutral-900
  Line 2: "Nora is in week 1." — 16px, neutral-500

If hour is 17-23 (evening):
  Line 1: "Good evening, Mama." — 24px, font-bold, neutral-900
  Line 2: "Nora is in week 1." — 16px, neutral-500

---

CARDS (vertical stack, px-6, gap-4, pb-24 to clear the bottom nav):

CARD 1 — This Week (most prominent, ~220px tall):
Rounded-2xl, bg-neutral-100, border border-neutral-200, p-5. 
Top: small label "THIS WEEK" — 11px, primary-700, font-semibold, uppercase, tracking-wider
Week number badge: "Week 1" — small pill, bg-primary-500, white text, 12px, rounded-full, inline

Below that, the week headline (this is the most important text on the card):
"Your milk is coming — here's what these first seven days really look like."
19px, font-bold, neutral-900, leading-snug

Below headline: 2-line preview (neutral-500, 14px):
"Nora will likely nurse 8–12 times or more in the first 24 hours. Here's what's actually normal this week."

Bottom of card: "See this week →" — right-aligned, primary-500, font-semibold, 15px

Tapping anywhere on this card navigates to /this-week.

---

CARD 2 — Quick Chat (medium prominence):
Rounded-2xl, bg-white, border border-neutral-200, p-5.
Top: small label "ASK ANYTHING" — 11px, primary-700, font-semibold, uppercase, tracking-wider

Below label: "Answers are IBCLC-reviewed." — 15px, neutral-900, font-medium

Below: a tappable input-looking row (not a real input — just styled to look like one):
  bg-neutral-100, rounded-xl, px-4 py-3, text "What's on your mind?" in neutral-500, 15px
  Right side: → arrow icon in primary-500

Tapping anywhere on this card (including the fake input) navigates to /chat.

Below the fake input, a single suggested question chip:
  Small pill, bg-accent-200, accent-700 text, 13px, rounded-full, px-3 py-1:
  "How do I know if Nora has a good latch?"
  Tapping this chip navigates to /chat.

---

CARD 3 — Getting Started (medium prominence):
Rounded-2xl, bg-white, border border-neutral-200, p-5.
Top: small label "GETTING STARTED" — 11px, primary-700, font-semibold, uppercase, tracking-wider

Below label, module title:
"Latch & Positioning" — 17px, font-semibold, neutral-900
Below: "The basics of a good latch — what to look for, what to fix." — 14px, neutral-500

Progress bar below:
A thin horizontal bar (4px tall, rounded), bg-neutral-200 track, bg-primary-500 fill.
Fill at 33% (1 of 3 modules viewed in demo).
Below bar: "1 of 6 modules complete" — 12px, neutral-500, right-aligned.

Bottom: "Continue →" — right-aligned, primary-500, font-semibold, 15px.

Tapping anywhere navigates to /getting-started.

---

CARD 4 — Today's Feed Log teaser (compact, below fold):
Rounded-2xl, bg-neutral-100, border border-neutral-200, px-5 py-4.
Row layout: 
Left: "Last logged: 1h 32m ago" — 15px, neutral-700
Right: "+ Log" button — small, bg-primary-500, white text, rounded-lg, px-4 py-2, font-semibold, 14px

This is just UI — tapping "+ Log" shows a brief toast: "Tracker coming soon!" (this feature is out of scope for the demo).

---

Make sure the bottom navigation is visible and functional, with "Home" tab highlighted in primary-500.

The page should be a natural, warm, uncluttered scroll. No shadows unless very subtle (shadow-sm). No dark mode. No decorative gradients.
```

---

**Done looks like:**
- [ ] Greeting reads "Good morning, Mama." (or appropriate time-aware variant)
- [ ] "Nora is in week 1." appears below the greeting
- [ ] The This Week card shows the Week 1 "Your milk is coming" headline
- [ ] The Chat card has the fake input and a suggested question chip
- [ ] The Getting Started card shows "Latch & Positioning" with a progress bar
- [ ] All four cards are visible on a scroll
- [ ] Tapping each card navigates to the correct route
- [ ] The 3am message ("You're not the only one up right now.") renders if you temporarily change the time check

---

---

# PROMPT 4 — Quick Chat (Pillar 1)

> **What this prompt does:** Builds the full chat interface at /chat. Responses are pre-written mocks — the app matches the user's question to a library of 20 Q&A pairs and returns the matching answer. Includes the IBCLC attribution badge, typing indicator, chat history with day dividers, and the no-match fallback with escalation options.

---

**Paste this into Lovable:**

```
Build the Quick Chat screen at /chat. This is the most important screen in the demo. It must feel real — not like a chatbot template, but like a warm, expert answer service.

IMPORTANT: There is no AI backend. Instead, implement a simple keyword/phrase matching function that compares the user's typed question against a library of pre-written Q&A pairs (see below). If a match is found, return the matching answer. If no match is found, return the fallback "no match" response.

---

LAYOUT:

Full screen. Stack from top to bottom:
1. Header bar (fixed, 56px)
2. Chat message list (scrollable, fills middle)
3. Empty state (shown before first message)
4. Suggested question chips (shown when no messages yet)
5. Input bar (fixed at bottom, above keyboard)

---

HEADER BAR (fixed, bg-white, border-b border-neutral-200, px-4):
Left: back chevron (←) in neutral-500, navigates to /home
Center: "Quick Chat" — 17px, font-semibold, neutral-900
Right: Small badge — shield icon + "IBCLC-reviewed" — 12px, primary-700, bg-primary-300 pill

---

EMPTY STATE (shown when chatHistory is empty):
Vertically centered in the message area.
Headline: "Ask anything." — 24px, font-bold, neutral-900, centered
Subtext: "Answers are reviewed by certified lactation consultants. For clinical emergencies, always call your provider." — 14px, neutral-500, centered, max-width 280px

Then the SUGGESTED QUESTIONS (below the empty state headline, also shown when chatHistory is empty):
5 tappable pill chips, stacked vertically, full-width, mx-6:
Each chip: rounded-xl, bg-neutral-100, border border-neutral-200, px-4 py-3, left-aligned, 15px, neutral-900.

Chips:
1. "How do I know if Nora has a good latch?"
2. "My baby wants to nurse every hour — is that normal?"
3. "How do I know if I have enough milk?"
4. "My nipple comes out flat after feeding — what does that mean?"
5. "My supply dropped — what happened?"

Tapping a chip: populate the input with that text AND immediately submit it (run the matching function, show the typing indicator, display the response).

---

CHAT MESSAGE BUBBLES:

User messages (right-aligned):
- bg-neutral-100, neutral-900 text, rounded-2xl rounded-tr-sm, px-4 py-3, max-width 80%, font 15px

App responses (left-aligned):
- bg-white, neutral-900 text, rounded-2xl rounded-tl-sm, px-4 py-3, max-width 85%, font 15px
- Left border: 3px solid primary-300 (#A8D5D1)
- Box shadow: very subtle shadow-sm

IBCLC BADGE (below every app response, left-aligned):
- Small row: tiny shield emoji (🛡️) + "IBCLC-reviewed" — 12px, primary-700, font-medium
- Appears on every answered response. Does NOT appear on the no-match fallback.

DAY DIVIDERS (between message groups from different days):
- Centered horizontal rule: thin neutral-200 line, with date text centered inline: "Today" or "Yesterday" or "May 23" etc.
- 12px, neutral-500, italic
- For the demo, prepopulate 2 messages from "Yesterday" so the divider is visible on first open.

TYPING INDICATOR (shows for 1.2 seconds after user sends a message, before the response appears):
- Three animated dots in a bubble, left-aligned, same styling as app response bubble
- Use a CSS animation (bounce or fade) on the three dots

---

PREPOPULATED CHAT HISTORY (yesterday's messages — hardcode these so the chat doesn't open empty):

Day divider: "Yesterday"

User message: "Is it normal that my breasts feel softer now? I'm worried my milk is going away."

App response: "Softer breasts are actually one of the signs your body is getting more efficient — not less. In the first few weeks, breasts feel firm and full as they build up supply. As your body starts to regulate to exactly what Nora needs, that fullness eases. It's called supply regulation, and it's a good sign. The reliable indicators to watch are Nora's diapers (six or more heavy wet ones a day from around day 5 onward) and weight gain — not how your breasts feel."
[IBCLC badge below]

Day divider: "Today"

(then the chat input is empty, ready for new questions)

---

MOCK Q&A LIBRARY (20 pairs — the matching function searches these):

Implement a simple matching function: lowercase both the user's input and the question keywords, check for keyword presence using includes() or a simple score. Return the first match. If no match found (score 0), return the no-match response.

Here are the 20 Q&A pairs. Store them as an array of objects: { keywords: [...], answer: "..." }

--- PAIR 1 ---
keywords: ["latch", "good latch", "latching", "latch on", "latched"]
answer: "Figuring out a good latch is one of the first things you and Nora are learning together — and it can take a few days to find your rhythm. Here's what to look for: Nora's mouth wide open, taking in not just the nipple but a generous mouthful of areola — more areola showing below the nipple than above. Her chin should touch your breast, with her nose clear or just grazing. You'll hear rhythmic swallowing and see jaw movement. It should feel like firm pulling pressure — not pinching or sharp pain. After a feed, your nipple should come out round, not flat or lipstick-shaped. Some tenderness right at the start of a feed is common in the early weeks as your skin adjusts. If pain continues throughout the entire feed, that's usually a signal the latch is worth revisiting with a lactation consultant."

--- PAIR 2 ---
keywords: ["enough milk", "enough milk?", "making enough", "sufficient milk", "milk supply enough", "how much milk"]
answer: "The most reliable signs are in Nora — not in how your breasts feel or how much you pump. Look for: 6 or more heavy wet diapers a day (starting around day 5), at least 3 bowel movements per day in the first month, steady weight gain (back to birth weight by 2 weeks, then 5–7 oz per week), and a baby who seems satisfied after most feeds and has wakeful, alert periods. Soft breasts after feeds are a sign of normal regulation, not a sign of low supply. If you want a precise check, a weighted feed with an IBCLC — weighing Nora before and after a full nursing session — is the most accurate way to see exactly how much transferred."

--- PAIR 3 ---
keywords: ["supply dropped", "supply drop", "milk dropped", "less milk", "producing less", "supply went down", "milk went down", "suddenly less"]
answer: "A sudden drop usually has an identifiable cause, which means it's often fixable once you know what you're looking for. Most common reasons: worn pump valves or membranes (check these first — this is the culprit more often than people expect), fewer feeds or sessions than usual, starting hormonal birth control (especially any estrogen-containing method), a returning menstrual period (a temporary dip around ovulation is common), stress or illness, or returning to work and pumping less frequently. Increasing the frequency of nursing tends to help in most situations, though it generally takes a few days to see a response. If you've looked at the common causes and the dip continues, a lactation consultant can help identify what's happening."

--- PAIR 4 ---
keywords: ["failure", "failing", "not working", "isn't working", "can't do this", "not good enough", "terrible at", "doing it wrong"]
answer: "Breastfeeding challenges are rarely about personal effort — and they're almost never about what you're doing wrong. More often they come from gaps in early support, latch issues that take time to identify, or supply factors that have biological roots outside your control. Your worth as a parent has nothing to do with ounces. Whatever feeding method keeps you and Nora nourished and connected is the right one. If you want to keep working through the challenges, a certified lactation consultant (IBCLC) can often change the picture significantly — earlier support tends to make a real difference."

--- PAIR 5 ---
keywords: ["stop breastfeeding", "switch to formula", "quit breastfeeding", "stop nursing", "give up breastfeeding", "formula instead", "formula okay"]
answer: "Yes — and you don't owe anyone an explanation. Formula is a safe, complete nutrition source for babies. There are many reasons a mom might choose to transition — physical recovery, supply challenges, emotional wellbeing, practical demands, or simply feeling like it's time — and any of them counts. If you're able to wean gradually (reducing one feeding at a time over a couple of weeks), that tends to be easier on your body. It allows your supply to wind down without engorgement. This is your journey. What matters is that you and Nora are nourished and taken care of."

--- PAIR 6 ---
keywords: ["cluster feeding", "nursing every hour", "feed constantly", "always hungry", "nursing all the time", "won't stop feeding", "every 45 minutes", "every hour"]
answer: "Cluster feeding is when Nora nurses very frequently — sometimes every 45–60 minutes for several hours at a stretch. It's one of the most common reasons moms worry about supply in weeks 2-4. Here's what's actually happening: Nora is sending your body a 'more milk please' signal ahead of a growth period. Your supply is responding exactly as it should. The phase typically lasts 2–5 days and is most common around weeks 2–3, 6 weeks, and 3 months. In the meantime: eat, rest where you can, and feed on demand. The clock doesn't help during a cluster — just nurse when she asks."

--- PAIR 7 ---
keywords: ["engorgement", "engorged", "breasts hard", "rock hard", "breasts hurt", "painful breasts", "full breasts", "so full"]
answer: "Engorgement typically peaks around days 3–5 after birth and eases as your supply starts to regulate to what Nora actually needs. The most effective relief is frequent nursing — emptying the breast regularly is what signals your body to recalibrate. If Nora is struggling to latch when you're engorged, hand-express or pump just enough to soften the areola before latching — not a full emptying, which would stimulate more production. A warm compress for a few minutes before a feed can help with let-down. Cold compresses between feeds help with inflammation and discomfort. If one breast feels significantly harder, hotter, or more painful than the other, or if you develop a fever, contact your provider — that's a sign to get checked for mastitis."

--- PAIR 8 ---
keywords: ["nipple flat", "lipstick nipple", "compressed nipple", "creased nipple", "comes out flat", "nipple looks flat", "squished nipple"]
answer: "A nipple that comes out flat, creased, or lipstick-shaped after a feed is a classic sign that the latch is shallow — Nora is compressing the nipple rather than taking a full mouthful of breast tissue. It's one of the most reliable visual signals that something is worth adjusting. A few things to try: make sure Nora's mouth is wide open before you bring her to the breast, aim the nipple toward the roof of her mouth (not straight in), and make sure her chin is touching your breast first. If you're consistently seeing the lipstick shape, it's worth a latch check with a lactation consultant — this is fixable, and fixing it usually resolves the pain that tends to come with it."

--- PAIR 9 ---
keywords: ["wet diapers", "diapers", "pee", "poop", "output", "how many diapers", "enough diapers"]
answer: "In the first week of life, a good rule of thumb is one wet diaper per day of age — so 1 wet diaper on day 1, 2 on day 2, and so on. Starting around day 5, you're looking for 6 or more heavy wet diapers every 24 hours. For stools: at least 3 bowel movements per day in the first month is reassuring, though the frequency and appearance change a lot in the first few weeks. By weeks 3–6, some exclusively breastfed babies move their bowels less often (sometimes every few days) — this can be normal as long as diaper output is otherwise good and Nora is gaining weight. If you're ever unsure about output, your pediatrician can do a weight check to confirm things are tracking."

--- PAIR 10 ---
keywords: ["introduce bottle", "start bottle", "when bottle", "bottle feeding", "take a bottle", "bottle nipple"]
answer: "The general recommendation is to introduce a bottle somewhere between 3–8 weeks. Early enough that Nora accepts it before a preference for breast or bottle sets in — but late enough that breastfeeding is well-established and your supply isn't disrupted. If you're returning to work around 8–10 weeks, starting around week 4–5 gives you a comfortable window to figure it out. When you do introduce a bottle, try paced bottle feeding — holding the bottle horizontal rather than tipping it up, pausing every few swallows so Nora controls the pace. This more closely mimics the work of nursing and helps avoid a preference for the faster flow of the bottle. Many moms find it helps to have a partner or someone other than mom offer the first bottle."

--- PAIR 11 ---
keywords: ["pumping output", "how much pump", "pump per session", "pumping yield", "only getting", "barely pumping", "low pump output", "not much when pumping"]
answer: "What you pump is not a direct measure of your milk supply — it's a measure of how well your body responds to the pump, which varies a lot from person to person. Many moms who exclusively nurse can pump very little even while feeding their baby just fine. That said, for moms who are pumping regularly: in the first week, 0.5–2 oz total per session is completely normal and expected. By week 2–4, many moms see 2–4 oz per session, though this varies widely. Things that affect pump output: the pump itself (suction and fit), pump parts (worn valves significantly reduce output — check and replace these regularly), whether you're relaxed or stressed, and how long since the last feed or session. If you're dropping or concerned, ruling out pump parts is always the first step."

--- PAIR 12 ---
keywords: ["mastitis", "red spot", "hard spot", "hot breast", "fever", "clogged duct", "blocked duct", "plugged duct", "lump", "painful lump"]
answer: "A hard, tender lump can be a clogged duct or the beginning of mastitis — and how you manage it depends on whether there are systemic symptoms. A clogged duct typically feels like a firm, tender spot without fever or flu-like symptoms. The treatment is to keep milk moving: nurse or pump frequently on that side, apply warm compresses before feeding, and gently massage toward the nipple. A sunflower lecithin supplement can help with recurring clogs. Mastitis involves that same localized pain plus fever (usually above 101°F), body aches, or feeling like you have the flu. Mastitis needs to be evaluated by your provider — it may require antibiotics. Do not stop nursing or pumping on the affected side (it speeds resolution). If you have fever, chills, or feel systemically unwell: call your provider today."

--- PAIR 13 ---
keywords: ["milk storage", "store milk", "freeze milk", "refrigerator milk", "how long fridge", "how long freezer", "breast milk storage", "stored milk", "fridge milk"]
answer: "The guideline most lactation professionals use is the '4-4-4-12 rule': freshly expressed breast milk is good at room temperature for 4 hours, in the refrigerator for 4 days, in a standard freezer (attached to the fridge) for about 4 months, and in a deep freeze for up to 12 months. For the fridge, store milk toward the back (coldest spot), not the door. Use hard-sided storage containers or breast milk bags — leave an inch of space at the top when freezing since milk expands. To thaw: transfer frozen milk to the fridge 24 hours before you need it, or thaw quickly in warm water. Don't microwave breast milk — it creates hot spots and degrades some components. Thawed milk stays good in the fridge for 24 hours."

--- PAIR 14 ---
keywords: ["flange", "flange size", "flange fit", "breast shield", "tunnel size", "nipple rubs", "nipple too tight", "shield too small", "shield too big"]
answer: "Flange size matters more than most moms realize — an ill-fitting flange is one of the most common causes of reduced pump output and nipple pain. The goal is for your nipple to move freely in the tunnel without the areola being pulled in excessively. To check fit: your nipple should move without rubbing the sides of the tunnel (too small), and the areola should not be drawn significantly into the tunnel with each cycle (too large — a small amount is normal). Most pumps come with a 24mm or 25mm flange, but studies suggest many women actually need 21mm or smaller. Measure across the widest part of your nipple in millimeters (not including the areola), then add 2–4mm for tunnel clearance. Pumping with the correct size flange is one of the highest-impact changes you can make for output and comfort."

--- PAIR 15 ---
keywords: ["sadness when let down", "dread feeding", "D-MER", "depressed nursing", "anxious when letdown", "weird feeling letdown", "dysphoria", "sad when nursing"]
answer: "What you're describing sounds like it could be D-MER — Dysphoric Milk Ejection Reflex. It's a sudden wave of sadness, anxiety, dread, or emotional discomfort that hits right before or at the moment of let-down, then passes within 30–90 seconds. It's caused by a brief, involuntary drop in dopamine that happens at let-down — it's physiological, not psychological, and not a reflection of how you feel about feeding or your baby. It's estimated to affect around 9% of breastfeeding moms and is significantly underreported because many moms don't know it has a name. D-MER ranges from mild (passing mood dip) to severe (intrusive, distressing). If it's affecting your quality of life, it's worth talking to your provider or a lactation consultant — there are strategies that help, and you don't have to white-knuckle through it."

--- PAIR 16 ---
keywords: ["birth control", "pill supply", "contraception", "birth control milk", "mini pill", "hormonal birth control"]
answer: "Some forms of hormonal birth control can affect milk supply, and it's worth being aware of before your 6-week OB visit. Estrogen-containing methods — the combined pill, the patch, the ring — can suppress supply in some moms, especially in the early weeks when supply is still establishing. Progestin-only methods (the mini pill, hormonal IUD, the implant) are generally considered safer for lactation, though some moms report sensitivity even to these. Non-hormonal options (copper IUD, condoms) have no supply impact. If you're planning to discuss birth control at your postpartum visit, let your provider know you're nursing so they can recommend options that are compatible with your feeding goals. If you've already started a method and notice a supply change, the timing is likely connected."

--- PAIR 17 ---
keywords: ["soft breasts", "breasts soft", "don't feel full", "not full", "empty breasts", "milk gone", "softer now", "flat breasts"]
answer: "Softer breasts are one of the signs your body is getting more efficient — not less. In the first few weeks, breasts feel firm and full as they're building supply. As your body starts to regulate to exactly what Nora needs, that fullness eases. It's called supply regulation, and it's a good sign. The reliable indicators to watch are Nora's diapers (six or more heavy wet ones a day) and weight gain — not how your breasts feel. Regulated supply often means your milk comes in more during a feed and less between feeds, which is exactly how it's supposed to work."

--- PAIR 18 ---
keywords: ["night feeds", "sleep training", "sleep through night", "wean night feeds", "night nursing", "dream feed", "feed at night", "nocturnal nursing"]
answer: "Nighttime feeds serve a real supply function, especially in the early weeks — the hormone prolactin, which drives milk production, peaks overnight. Dropping night feeds too early (before supply is well-established, usually around 3 months for most moms) can cause a supply dip. That said, the 'right' approach to nights depends on your situation, your baby's age and weight, and your own sustainability. Most lactation professionals recommend following your baby's cues for feeding at night in the first 2–3 months while supply is establishing. A dream feed — offering a feed right before you go to sleep — can sometimes extend the first sleep stretch without eliminating the biological benefit of nighttime nursing. For sleep training approaches: many are compatible with continued nursing, but approaches that involve ignoring hunger cues completely aren't recommended before 4–6 months."

--- PAIR 19 ---
keywords: ["supplement", "supplementing", "formula supplement", "need formula", "give formula", "top off", "not gaining", "weight gain"]
answer: "Supplementing with formula is sometimes the right call — and it's a decision that belongs to you and your provider. The situations where it's most clearly indicated: baby has lost more than 10% of birth weight and isn't regaining, there are signs of dehydration or inadequate output, or mom has a physiological supply condition that limits production. If your pediatrician recommends supplementing, ask about 'at-breast supplementation' (using a supplemental nursing system) or paced bottle feeding, which can preserve breastfeeding while making sure Nora is getting enough. Supplementing does not have to mean the end of breastfeeding — many moms combination feed successfully for months. The goal is a fed, thriving baby and a sustainable feeding relationship for you."

--- PAIR 20 ---
keywords: ["weighted feed", "weighted feeding", "how much transferred", "weigh before after", "rental scale", "how many ounces", "ounces transferred"]
answer: "A weighted feed is the gold-standard measurement for how much milk your baby is actually taking in at the breast. It involves weighing Nora on a precise digital scale before a feed (fully clothed), nursing as you normally would, then weighing again immediately after (without changing her clothes or diaper). The difference in grams equals the approximate volume transferred — 1 gram ≈ 1 mL ≈ 0.034 oz. It's most useful when you're worried about supply or slow weight gain and want real data rather than uncertainty. Many IBCLCs have scale rentals; some pharmacies and baby stores offer scale rental programs. A single weighted feed gives you a snapshot — it's most meaningful done at a typical feed time, not after a long stretch or during a cluster feeding phase, which would skew high or low."

---

NO-MATCH FALLBACK (when no keyword matches are found):
Show this as the app's response:

"That's a specific one — I want to make sure you get a reliable answer rather than a guess. Here's how to reach someone who can actually help:"

Below the text, three tappable option rows (not a wall of text):

Row 1: "💙 Contact Sarah, IBCLC" — primary-500 text, 15px, font-medium, with subtitle "She recommended Latched to you — she can help with this too." in neutral-500, 13px
Row 2: "📞 Hospital lactation line" — neutral-900 text, 15px, with subtitle "Available 24/7 at most hospitals." in neutral-500, 13px
Row 3: "🔍 Find an IBCLC near you" — neutral-900 text, 15px, with subtitle "Search the ILCA public directory." in neutral-500, 13px

Each row: tap area min 48px tall, bordered (border-b border-neutral-200), px-4.

Below rows: small text in neutral-500, 13px, italic:
"Your question was noted — we'll work to have a better answer over time."

The no-match response does NOT show the IBCLC badge.

---

INPUT BAR (fixed at bottom, above keyboard safe area):
bg-white, border-t border-neutral-200, px-4 py-3.
Row: 
- Text input: bg-neutral-100, rounded-xl, px-4 py-3, placeholder "What's on your mind?", flex-grow, 15px, neutral-900
- Send button (right, round, 40x40px): bg-primary-500, → arrow icon, white

On submit:
1. Add the user message to chatHistory
2. Clear the input
3. Show typing indicator (3 animated dots) for 1.2 seconds
4. Run the matching function against the 20 Q&A pairs
5. Display the matched answer (or no-match fallback) with the IBCLC badge

Make sure the message list scrolls to the bottom automatically after each new message.

---

CHAT HISTORY:
Store chatHistory in AppContext so it persists when navigating away and coming back. When the chat screen is opened, if chatHistory is not empty, show history with day dividers. Do NOT reset on each visit.
```

---

**Done looks like:**
- [ ] Chat opens with the "Ask anything." empty state and 5 suggested question chips
- [ ] Tapping a chip submits that question and shows a 1.2s typing indicator then an answer
- [ ] The answer has a 3px left border in `#A8D5D1` and an IBCLC badge below it
- [ ] Typing "latch" or "good latch" returns the latch answer (Pair 1)
- [ ] Typing "my milk is going away" returns the soft breasts answer (Pair 17)
- [ ] Typing "what is a doula" (no match) returns the escalation fallback
- [ ] The no-match response shows 3 tappable escalation rows (no IBCLC badge)
- [ ] The prepopulated "Yesterday" message + divider is visible on first open
- [ ] The input field is fixed at the bottom and keyboard doesn't break the layout
- [ ] Chat history persists when you navigate away and come back

---

---

# PROMPT 5 — Getting Started (Pillar 2)

> **What this prompt does:** Builds the Getting Started library at /getting-started. Six module cards, path-filtered for nursing. One module (Latch & Positioning) is fully built out as a readable screen. The other five are "coming soon" placeholders with title and description visible.

---

**Paste this into Lovable:**

```
Build the Getting Started screen at /getting-started and one fully built-out module.

---

LIBRARY SCREEN (/getting-started):

Header (non-sticky, px-6 pt-6 pb-2):
"Getting Started" — H1, 26px, font-bold, neutral-900
Below: "The crash course you needed before leaving the hospital. Five minutes at a time." — 15px, neutral-500

Progress summary (px-6 py-3, bg-neutral-100, rounded-2xl, mx-6 mb-4):
Row: "1 of 6 modules complete" left-aligned, "✓ Your First 48 Hours" right-aligned in success color (#3A8F6F), font-medium, 14px

MODULE CARDS (vertical list, px-6, gap-3):

Build 6 cards total. Card 1 is "completed." Card 2 (Latch & Positioning) is the "active/highlighted" card. Cards 3–6 are "coming soon."

Card structure: rounded-2xl, bg-white, border border-neutral-200, p-4, flex row.

Left: colored icon circle (40x40px, rounded-full):
- Completed: bg-success (#3A8F6F), white checkmark
- Active: bg-primary-500, white icon
- Coming soon: bg-neutral-200, neutral-500 icon

Center (flex-1, ml-3):
- Module title: font-semibold, 16px, neutral-900
- Short description: 13px, neutral-500, 2 lines max

Right: chevron (→) for active/available modules. Lock icon (🔒) for truly locked content (none here — all are visible, just marked "coming soon").

Status badge below description (where applicable):
- Completed: small "✓ Done" in success green, 12px
- Active: small "Start →" in primary-500, 12px, font-semibold
- Coming soon: small "Coming soon" in neutral-500, 12px

---

CARD 1 — Your First 48 Hours (COMPLETED)
Icon: ✓ (white on success green)
Title: "Your First 48 Hours"
Description: "Colostrum, what to expect before milk comes in, and why small volumes are completely normal."
Status: "✓ Done" — success green

---

CARD 2 — Latch & Positioning (ACTIVE — tappable, navigates to /getting-started/latch)
Icon: nursing/baby icon on primary-500
Title: "Latch & Positioning"
Description: "The mechanics of a good latch, the three most common holds, and what to do when it hurts."
Status: "Start →" — primary-500

---

CARD 3 — Feeding Your Supply (COMING SOON)
Icon: milk droplet on neutral-200
Title: "Feeding Your Supply"
Description: "Why more frequent removal means more milk — and the mental model that changes everything."
Status: "Coming soon"

---

CARD 4 — Reading Nora's Cues (COMING SOON)
Icon: baby face icon on neutral-200
Title: "Reading Nora's Cues"
Description: "Hunger signals, satiation, cluster feeding, growth spurts, and when to wonder if something's off."
Status: "Coming soon"

---

CARD 5 — Common Concerns & When to Call (COMING SOON)
Icon: info circle on neutral-200
Title: "Common Concerns & When to Call"
Description: "A plain-language scan of the most common first-6-weeks concerns — engorgement, blocked ducts, nipple pain, and more."
Status: "Coming soon"

---

CARD 6 — The Fourth Trimester (COMING SOON)
Icon: heart on neutral-200
Title: "The Fourth Trimester"
Description: "The emotional weight of new motherhood, what's normal to feel, and when to reach out for more support."
Status: "Coming soon"

---

At the bottom of the list, below the cards (px-6 pt-4):
Small text: "More modules coming soon — based on what moms are actually asking." — 13px, neutral-500, italic

---

MODULE SCREEN (/getting-started/latch):

Full scrollable screen. No bottom nav on this screen (it obscures reading). Show a back button (← "Getting Started") in the header instead.

HEADER (sticky, bg-neutral-50, border-b border-neutral-200, px-4 py-3):
Back: "← Getting Started" — primary-500, 15px
Center: nothing (or subtle "Module 2 of 6")

MODULE CONTENT (px-6, py-6, pb-32):

Module label: "GETTING STARTED" — 11px, primary-700, uppercase, tracking-wider
Module title: "Latch & Positioning" — H1, 28px, font-bold, neutral-900, mt-1
Read time: "~4 min read" — small pill, bg-neutral-200, neutral-500 text, 12px, rounded-full, inline-block, mt-2

Divider (neutral-200, my-5)

LEAD IMAGE PLACEHOLDER:
Rounded-xl, bg-primary-300, height 180px, full-width.
Centered text inside: "📸 Photo: Mom nursing with baby at breast" — 13px, primary-700, italic.
(This is a placeholder — real photo goes here before launch)

BODY CONTENT (sections separated by mt-6, paragraphs 16px, neutral-900, leading-relaxed, max 3-4 lines each):

Section heading style: font-semibold, 17px, neutral-900, mt-6 mb-2.

--- Body ---

"Figuring out a good latch is one of the first skills you and Nora are learning together. It takes most moms a few days — sometimes longer — to find what works, and that's completely normal."

"A good latch isn't just about comfort (though that matters too). It's how Nora gets milk efficiently, and how your body gets the signal to make more of it."

Section heading: "What a good latch looks like"

"Start with Nora's mouth. You're aiming for it to be wide open — wider than you might expect — before she comes to the breast. Her chin should touch your breast first, with her nose clear or just grazing. You'll see her jaw moving in a rhythmic suck-swallow pattern, and you'll hear swallowing after every few sucks."

"Look at the areola: more should be visible above the nipple than below. The asymmetric latch — where Nora takes more breast from below — is intentional. It positions her tongue where it can do the most work."

Section heading: "What to do when it hurts"

"Some tenderness right at the moment of latch-on is common in the first week or two. It usually eases within 30–60 seconds as the initial suction settles. Pain that persists throughout the entire feed is a signal worth paying attention to."

"The most reliable indicator of a shallow latch is what your nipple looks like when Nora comes off: it should come out round. If it comes out flat, creased, or lipstick-shaped, she's been compressing the nipple rather than taking a full mouthful of breast tissue. That's fixable — usually by helping her open wider before latching."

Section heading: "Three holds to try"

"The cradle hold is what most people picture — Nora's head in the crook of your arm, facing you. For the early weeks, the cross-cradle hold (supporting her head with the opposite hand) gives you more control over her head position. The football hold, tucking her body under your arm like a football, is particularly useful after a cesarean or for flat/inverted nipples."

"No hold is the 'right' one. The right hold is the one where Nora is latching well and you're comfortable."

--- "Try This" callout block ---
bg-accent-200, rounded-2xl, px-5 py-4, my-6.
Small label: "TRY THIS" — 11px, accent-700, uppercase, tracking-wider, font-semibold
Body: "Before your next feed, position Nora so her nose is at nipple level — not her mouth. When you bring her to the breast, her head tips back slightly and her chin leads. It sounds counterintuitive, but this angle is what helps her open wide enough to get a full mouthful. Give yourself a few feeds to feel the difference."
— 15px, accent-700, leading-relaxed

--- Chat bridge ---
Divider (neutral-200, my-6)
Row: chat bubble icon (primary-500) + "Questions about latching? Ask in Quick Chat →" — 15px, primary-500, font-medium, tapping navigates to /chat

--- Done button ---
mt-8. Full-width outlined button: border-2 border-primary-500, primary-500 text, bg-white, rounded-xl, font-semibold, 52px height.
Text: "Done with this one ✓"
Tapping: marks module 2 as complete in AppContext.moduleProgress, navigates back to /getting-started, updates the card to "completed" state.
```

---

**Done looks like:**
- [ ] All 6 module cards are visible, correctly labeled completed / active / coming soon
- [ ] Tapping "Latch & Positioning" card navigates to /getting-started/latch
- [ ] The module screen is fully scrollable with all 5 sections of content
- [ ] The "Try This" callout has the warm `#EDCFBC` background
- [ ] "Questions about latching? Ask in Quick Chat →" link is visible at the bottom
- [ ] Tapping "Done with this one ✓" returns to the library and updates the card to completed
- [ ] The progress bar updates: "2 of 6 modules complete"

---

---

# PROMPT 6 — This Week (Pillar 3)

> **What this prompt does:** Builds the week-by-week screen at /this-week. Weeks 1–4 are fully built out with all four sections (What to Expect, Try This, What's Normal to Wonder, Chat Link). Weeks 5–12 are placeholder cards. The current week (Week 1, since demo baby is 2 days old) is highlighted at the top.

---

**Paste this into Lovable:**

```
Build the This Week screen at /this-week.

The current week is calculated from AppContext.babyDOB: Math.floor(daysSinceDOB / 7) + 1. For the demo, this equals Week 1.

---

SCREEN LAYOUT:

Header (non-sticky, px-6 pt-6 pb-2):
"This Week" — H1, 26px, font-bold, neutral-900
Below: "Nora is in week 1. Here's what's happening right now." — 15px, neutral-500

Horizontal week selector (scrollable row, px-6 py-3, gap-2):
Show weeks 1–12 as small pill buttons.
Current week (1): bg-primary-500, white text, font-semibold, rounded-full, px-4 py-2, 14px.
No completed weeks yet (Nora is only 2 days old).
Future weeks (2–12): bg-neutral-100, neutral-500 text, border border-neutral-200, slightly faded.

Tapping a week: scrolls the content below to that week's card. The week selector row itself scrolls horizontally.

---

WEEK CARDS (vertical stack below the selector, px-6, gap-6, pb-24):

Build weeks 1–4 as full cards. Weeks 5–12 as lightweight placeholder cards.

FULL CARD STRUCTURE (weeks 1–4):
Rounded-2xl, bg-white, border border-neutral-200, overflow-hidden.

Card top bar: 4px tall, bg-primary-500 (the teal accent bar at top of card)

Card body (p-5):

Row 1: Week badge + headline
  - "WEEK [N]" pill: bg-primary-500, white, 11px, uppercase, rounded-full, px-3 py-1
  - Headline below: the most important line. 20px, font-bold, neutral-900, leading-snug.

Section 1: "WHAT TO EXPECT" — 11px, primary-700, uppercase, tracking-wider, font-semibold, mt-4 mb-2
Content: 15px, neutral-700, leading-relaxed. 2–3 short paragraphs.

Section 2: "TRY THIS" — styled as a callout block
bg-accent-200, rounded-xl, px-4 py-3, mt-4
Label: "TRY THIS" — 11px, accent-700, uppercase, tracking-wider, font-semibold
Content: 15px, accent-700, leading-relaxed

Section 3: "WHAT'S NORMAL TO WONDER" — 11px, primary-700, uppercase, tracking-wider, font-semibold, mt-4 mb-2
Content: 15px, neutral-700, leading-relaxed. 2 short paragraphs.

Section 4 (bottom): Chat bridge row
Divider: border-t border-neutral-200, mt-4 pt-4
Row: chat icon + question text in primary-500, 15px, font-medium, "→"
Tapping opens /chat (in the demo, just navigate to /chat).

---

WEEK 1 CARD — "Your Milk Is Coming" (CURRENT WEEK — visually highlighted)

Add an additional badge: "📍 You're here" — small pill, bg-accent-500, white text, 11px, top-right of card or below the WEEK 1 badge.

Headline: "Week 1: Your milk is coming — here's what these first seven days really look like."

What to Expect:
"Nora will likely nurse 8–12 times or more in the first 24 hours. This isn't excessive — it's exactly right. Colostrum is present from birth; it's small in volume (measured in teaspoons, not ounces) but nutritionally complete for a newborn's marble-sized stomach."

"Milk typically transitions between days 2–5, often accompanied by breast fullness or engorgement. Some nipple tenderness at the start of a feed is common as your skin adjusts. Pain that persists throughout the entire feed is worth getting a latch checked."

Try This:
"Track diapers this week, not milk volume. In week 1, the reliable indicator of adequate intake is diaper output: roughly one wet diaper per day of age (1 on day 1, 2 on day 2, and so on). Starting around day 5, you're looking for 6 or more heavy wet diapers every 24 hours. This is the number that actually tells you what you need to know."

What's Normal to Wonder:
"'My breasts don't feel full — is my milk even there?' Yes. Colostrum doesn't create the fullness sensation that transitional milk does. The absence of fullness in the first few days is not a sign of absence of milk."

"'My baby wants to nurse again already — I just fed her.' This is normal. Newborn stomach size and fast digestion make frequent feeding expected. You're not doing anything wrong, and she's not doing anything wrong."

Chat bridge: 💬 "How do I know if Nora is getting enough milk while nursing?" →

---

WEEK 2 CARD — "Building the Foundation"

Headline: "Week 2: Every feed is building something — here's what."

What to Expect:
"Nora should be back to her birth weight by around day 10–14. Milk is now established and may have triggered engorgement — breasts that feel hard, hot, and very full between feeds. Engorgement typically peaks around days 3–5 and eases as supply begins to calibrate to what Nora actually needs."

"Sleep deprivation is hitting hard this week for most families. The relentlessness of feeding every 1–2 hours around the clock is a real physical and emotional demand. That's not a reflection of how you're doing — it's just how week 2 is."

Try This:
"A weight check this week — at the pediatrician, or with a rental scale at a pharmacy — gives you concrete confirmation that the feeding is working. If Nora is back to birth weight or gaining, the data is reassuring. If there's a concern, catching it at week 2 is the right time to get support."

What's Normal to Wonder:
"'My breasts hurt so much from engorgement — is this going to last?' No. Engorgement peaks and eases. Frequent nursing is the treatment — emptying the breast regularly signals your body to recalibrate. Cold compresses between feeds and a warm compress before can help with comfort."

"'I'm exhausted in a way I didn't expect.' Week 2 exhaustion is one of the most universal postpartum experiences. Something being hard is not the same as something being wrong."

Chat bridge: 💬 "How do I relieve engorgement?" →

---

WEEK 3 CARD — "The First Surge"

Headline: "Week 3: Nora is cluster feeding — and that's actually a really good sign."

What to Expect:
"The 2–3 week growth spurt is one of the most common reasons moms stop breastfeeding early. It looks like: suddenly wanting to nurse far more often, seeming unsatisfied after feeds, being fussier than usual. All of it is normal. All of it is supply-building behavior, not supply failure."

"Nora nursing constantly is her way of sending your body a 'more milk please' message before a growth period. Your supply is responding exactly as it should. The phase typically lasts 2–5 days."

Try This:
"Feed on demand without watching the clock or counting feeds this week. If a rough tally helps reassure you, fine — but trying to maintain a schedule during a growth spurt usually ends in frustration for both of you. This is a temporary sprint, not a new normal."

What's Normal to Wonder:
"'My milk is going away.' Almost certainly not. Softer breasts combined with nursing constantly looks like supply failure — but softer breasts are a sign of regulation, not depletion, and Nora nursing constantly is demand behavior, not evidence of inadequate supply."

"'Something must be wrong.' A growth spurt is the most common cause of sudden increased nursing in week 3. It passes in 2–5 days. If diapers are good and Nora is alert between feeds, the system is working."

Chat bridge: 💬 "What is cluster feeding and when does it happen?" →

---

WEEK 4 CARD — "Finding a Rhythm"

Headline: "Week 4: Something is starting to click — and it's not your imagination."

What to Expect:
"Many moms report that something shifts around week 4. Feeds get more efficient. Nora latches faster. The constant uncertainty of the first three weeks gives way to early familiarity. This isn't a universal experience — some moms hit week 4 still in the thick of it — but the 'something clicking' moment is real and worth naming."

"If you're planning to return to work around weeks 6–10, week 4 is when to start thinking about bottle introduction. The window between 3–8 weeks is generally recommended: early enough that Nora accepts a bottle before preference sets in, late enough that breastfeeding is well-established."

Try This:
"Check your pump parts this week (if you're pumping). Valves and membranes wear out faster than most people realize — usually every 4–8 weeks — and worn parts are one of the most common causes of unexplained output drops. Week 4 is a reasonable first check-in."

What's Normal to Wonder:
"'My baby suddenly seems fussy again.' Could be another cluster feeding phase, a developmental leap, or gas. The feeding fundamentals haven't changed — this is temporary."

"'Should I start introducing a bottle?' If returning to work around 8–10 weeks, now is a reasonable time to start offering one bottle a day, ideally not from you, using paced bottle feeding."

Chat bridge: 💬 "When should I start introducing a bottle?" →

---

PLACEHOLDER CARDS (Weeks 5–12):

Lightweight card: rounded-2xl, bg-neutral-100, border border-neutral-200, p-4.
Row: week badge (small, neutral-500 background) + week title + brief description + "Coming soon" label.

Week 5: "A Checkpoint Worth Marking" — "You're almost at the milestone most moms give up before reaching."
Week 6: "Six Weeks" — "The fourth trimester's first milestone — and what comes next."
Week 7: "Your New Normal" — "Supply is regulated. Here's what that actually feels like."
Week 8: "Return to Work" — "The logistics, your rights, and how to make it work."
Week 9: "Reverse Cycling" — "Why Nora might be nursing more at night when you go back to work."
Week 10: "The Freezer Stash" — "Building it, rotating it, and not obsessing over it."
Week 11: "Sustaining Supply" — "How to maintain what you've built through month 3."
Week 12: "Three Months" — "A milestone worth marking. Here's what's next."

Each placeholder: "Coming soon" badge, neutral-500, 12px. No "See this week" link.

---

Auto-scroll to Week 1 card on load (since that's the current week).
```

---

**Done looks like:**
- [ ] The week selector shows weeks 1–12, with Week 1 highlighted in teal
- [ ] All four sections (What to Expect, Try This, What's Normal, Chat Bridge) are present in weeks 1–4
- [ ] Week 1 has the "📍 You're here" badge
- [ ] The "Try This" blocks have the warm `#EDCFBC` background
- [ ] Weeks 5–12 show as compact placeholder cards with "Coming soon"
- [ ] Tapping the chat bridge link navigates to /chat
- [ ] Page auto-scrolls to Week 1 on load
- [ ] Week cards are readable with comfortable line spacing

---

---

# PROMPT 7 — Navigation Polish & Demo Readiness

> **What this prompt does:** Polishes the bottom navigation, ensures all routes connect properly, adds a few finishing touches (loading states, scroll behaviors, back navigation), and makes the demo feel complete and presenter-ready.

---

**Paste this into Lovable:**

```
This is the final polish prompt. Don't build new features — fix and refine what's already there.

---

BOTTOM NAVIGATION (final polish):

The bottom nav should appear on /home, /chat, /getting-started, and /this-week. NOT on /onboarding or /getting-started/latch (the module reading view).

Final nav design:
- Height: 64px fixed at bottom
- Background: white
- Top border: 1px solid neutral-200 (#E3D9CF)
- 4 equal-width tabs. Each tab: icon (24px) centered above label (11px, font-medium).

Tab 1 — Home: house icon. Routes to /home.
Tab 2 — Chat: chat-bubble icon. Routes to /chat.
Tab 3 — This Week: calendar icon. Routes to /this-week.
Tab 4 — Started: book-open icon. Routes to /getting-started.

Active tab: icon and label both primary-500 (#4E9E95). 
Inactive tab: icon and label both neutral-500 (#8A7F78).

Add a subtle active indicator: a 3px rounded top border (border-t-[3px] border-primary-500) above the active tab.

Touch target: each tab is minimum 48px tall and full quarter-width of the screen.

---

GLOBAL SCROLL BEHAVIOR:

All scrollable screens should start scrolled to the top (except /this-week which should auto-scroll to the current week card).

Add scroll-smooth to all navigation transitions.

Add pb-[80px] (or enough padding) to the bottom of every main content area so the last card isn't hidden behind the fixed bottom nav.

---

ONBOARDING → APP transition:

When the completion animation finishes and the user is redirected to /home for the first time, show a brief 0.5s fade-in on the home screen. Just a CSS opacity transition from 0 to 1.

---

CHAT SCREEN — keyboard handling:

When the user taps the chat input, the keyboard rises. Make sure the input bar moves up with the keyboard and the message list doesn't get obscured. This is the most critical mobile UX fix. Use a combination of:
- position: fixed for the input bar at the bottom
- Accounting for the keyboard height (use window.visualViewport if available, or just set bottom: env(safe-area-inset-bottom))
- The message list should add padding at the bottom equal to the input bar height + some buffer

---

HOME SCREEN — Suggested question chip behavior:

The suggested question chip on the home screen Quick Chat card ("How do I know if Nora has a good latch?") should navigate to /chat and pre-populate that question in the chat input (but not submit it — let the user submit it themselves). Update the AppContext to have a `pendingChatQuestion` field that the Chat screen reads on mount, populates into the input, and clears after use.

---

THIS WEEK — Chat bridge behavior:

When the user taps a "Chat about this →" link in any week card (e.g., "What is cluster feeding and when does it happen?"), navigate to /chat and pre-populate that question in the input (same pendingChatQuestion mechanism from above, but auto-submit it so the answer appears immediately).

---

GETTING STARTED — Module complete behavior:

When the user taps "Done with this one ✓" on the Latch module:
1. Update AppContext.moduleProgress to mark module 2 as complete
2. Navigate back to /getting-started
3. The Latch card should now show as "Completed" (success green checkmark, "✓ Done")
4. The progress summary at the top should update to "2 of 6 modules complete"
5. The next card (Feeding Your Supply) should visually shift to be the new "active" card (even if it's still "coming soon" — just change the icon color to primary-500)

---

FINAL VISUAL QA — check these across all screens:

1. Background is always neutral-50 (#FDFAF7) — not pure white, not gray.
2. Body text is neutral-900 (#2D2926) — not pure black.
3. All primary buttons are primary-500 (#4E9E95) — consistent throughout.
4. The IBCLC badge (🛡️ IBCLC-reviewed) appears below every answered chat response.
5. The "Try This" blocks always have bg-accent-200 (#EDCFBC).
6. Font is Plus Jakarta Sans throughout — no system fonts sneaking in.
7. No red or orange used decoratively — only error/warning states.
8. All card borders use neutral-200 (#E3D9CF).
9. The bottom nav is never visible on /onboarding or the module reading screen.
10. Mobile viewport (390px) looks great — no horizontal scroll, no overflow.

---

DEMO DATA CHECK — verify AppContext contains:
- userName: "Mama"
- babyName: "Nora"
- weekPostpartum: 1
- feedingPath: "A"
- onboardingComplete: true (so /home is the default landing if desired)
- chatHistory: the prepopulated "Yesterday" messages

Optional: Add a small "Reset Demo" link at the bottom of the home screen (very small, neutral-500, barely visible) that clears AppContext back to defaults and returns to /onboarding. This is useful for showing the onboarding to investors. Text: "↺ Restart demo" — 12px, neutral-400.
```

---

**Done looks like:**
- [ ] Bottom nav is polished: 3px teal indicator above active tab, correct icons and labels
- [ ] Nav disappears on /onboarding and /getting-started/latch
- [ ] Chat input stays above the keyboard when keyboard opens
- [ ] Tapping the home screen suggested question chip pre-populates (but doesn't submit) the chat input
- [ ] Tapping a week card's chat bridge auto-submits the question in chat
- [ ] Completing the Latch module updates the library screen to show 2 of 6 complete
- [ ] Background is warm white (#FDFAF7) throughout — not pure white
- [ ] "↺ Restart demo" link is visible (but subtle) at the bottom of home screen

---

---

## Quick Reference: Demo Flow for Investor / IBCLC Presentations

When showing this to someone, walk through in this order:

1. **Tap "↺ Restart demo"** (bottom of home screen) to reset to onboarding
2. **Screen 1:** Show the IBCLC trust badge — "See how it immediately shows 'Recommended by Sarah, IBCLC' before any Latched branding?"
3. **Screen 2:** Show the name selection chips — "This is the moment she becomes a person, not a user."
4. **Screen 5:** Show the path selection cards — "This is what routes everything that follows."
5. **Screen 8:** Show the personalized paywall — "Notice it says her name and her exact path. This is why the $49 converts."
6. **Tap through to /home** — "Here's the daily companion. The greeting changes based on the time of day — at 3am, it reads 'You're not the only one up right now.'"
7. **Tap the Week 1 card** — "This is what makes this app different from any article on the internet. It's week 1. For her newborn. On her path."
8. **Tap Quick Chat** — "Ask it 'what is cluster feeding.' Watch it respond in under 2 seconds with an IBCLC-reviewed answer. No AI — just a vetted library."
9. **Ask something obscure** — "Now ask it something random. It doesn't guess. It surfaces a human."
10. **Show /getting-started** — "Six modules, five minutes each. One is fully built — the others are coming."

---

## Troubleshooting Common Lovable Issues

**"The colors look wrong / I'm seeing blue instead of teal"**
→ The Tailwind custom colors may not have been applied. Ask Lovable: "Confirm that tailwind.config.js includes primary-500 as #4E9E95 and apply it to all primary buttons."

**"The font isn't Plus Jakarta Sans"**
→ Ask Lovable: "Add the Plus Jakarta Sans Google Font import to the HTML head and set it as the default font-family in the Tailwind config."

**"The chat input goes behind the keyboard on mobile"**
→ Ask Lovable: "Fix the chat input bar so it stays above the keyboard on mobile. Use position: fixed; bottom: 0; and account for the keyboard with window.visualViewport."

**"The bottom nav shows on the onboarding screens"**
→ Ask Lovable: "Hide the bottom navigation component on all routes that start with /onboarding and on /getting-started/latch."

**"The typing indicator doesn't animate"**
→ Ask Lovable: "Add a bouncing dot animation to the typing indicator using Tailwind's animate-bounce class, staggered across 3 dots."

**"The demo pre-filled data disappeared"**
→ This happens if AppContext isn't persisted correctly. Ask Lovable: "Ensure the default AppContext values are always applied on first load, and that the context rehydrates from localStorage so mock data isn't lost on page refresh."

---

*This brief was generated for Ashley from the Latched MVP Experience Spec v1.0, Brand Guidelines, and Technical Design Document v1.0.*  
*Last updated: May 25, 2026*
