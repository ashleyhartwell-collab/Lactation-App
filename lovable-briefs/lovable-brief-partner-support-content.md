# Lovable Update Prompt — Shared Lesson: Partner Support Content

**Paste the block below directly into Lovable.**

---

```
Replace all placeholder content in the `shared-partner-support` lesson with the exact content below. Do not change the lesson shell, routing, header, week/path badges, or any other lesson. Use the existing section components and styling (lead line, WHAT TO KNOW prose style, numbered WHAT TO DO, WHAT TO WATCH FOR callout blocks, crash-course snippet).

---

LESSON: shared-partner-support
Route: /this-week/module/shared-partner-support
Header: Week 1 | All Paths | ~4 min read

---

LEAD LINE

The most useful thing your partner can do right now isn't hold the baby while you shower. It's everything else — so you can focus on feeding.

---

WHAT TO KNOW THIS WEEK

Breastfeeding in the first week is a full-time job. Your body is recovering from birth while simultaneously learning to make and deliver milk. Every feed takes physical and mental energy, and the feeds are frequent. That math doesn't leave much room for anything else.

This is where a partner comes in — not as a helper in the optional sense, but as the person actively running everything that isn't the baby. When a partner steps into that role well, breastfeeding is significantly more likely to succeed. When it's absent, the person feeding the baby is also managing everything else, and something usually gives.

That said, partners aren't always sure what they're supposed to be doing. Some want to help but don't know how. Some don't realize how much is actually needed. The sections below give you language you can hand them directly.

And for moms who are doing this with limited support — whether the partner is unwilling, absent, or struggling — there's a section on other paths forward at the bottom of this lesson.

---

WHAT TO DO

1. Hand off the mental load for everything outside of feeding.

   Your partner's job this week is to make decisions about the household so you don't have to. Not "ask me what you should make for dinner" — decide, and make it happen. The specific list: buying or preparing meals, reminding you to eat at least every few hours, dishes, keeping the space reasonably clean, and running laundry every day or two. None of these need to be done perfectly. They just need to be done.

2. Ask your partner to learn this with you, not watch you figure it out.

   Breastfeeding education isn't only for the person nursing. Partners who understand how milk supply works, what a good latch looks like, and what's normal in the newborn period are measurably more helpful and more supportive. The crash-course snippet below has resources you can share with them directly.

3. Put your partner on latch check duty.

   After you get the baby latched, your partner can be the one to check it. What to look for: baby's chin is touching the breast, lips are flanged outward (not tucked in), and you can see or hear the baby swallowing. If it looks like the baby is mostly on the nipple and not taking in much areola, that's a sign to re-latch. Having a second set of eyes makes this easier, and it gives your partner something concrete to do during feeds.

   Render a two-panel latch comparison illustration directly below this text. Use a flex row (gap-3, items-start) with two equal-width panels. Each panel: bg-neutral-50, rounded-xl, p-3, flex flex-col items-center.

   PANEL 1 — GOOD LATCH:
   Label above SVG (text-xs, font-semibold, text-center, text-teal-600, mb-2, tracking-wide): "✓ GOOD LATCH"
   SVG (max-w-[160px], w-full):
   <svg viewBox="0 0 240 175" xmlns="http://www.w3.org/2000/svg">
     <!-- Breast side profile -->
     <ellipse cx="68" cy="92" rx="58" ry="65" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1.5"/>
     <!-- Baby head at breast -->
     <ellipse cx="168" cy="96" rx="52" ry="56" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1.5"/>
     <!-- Chin touching breast -->
     <path d="M130 120 Q140 130 148 128" stroke="#4f9d9d" stroke-width="2" fill="none" stroke-linecap="round"/>
     <circle cx="120" cy="118" r="4" fill="#4f9d9d" opacity="0.8"/>
     <text x="90" y="148" fill="#4f9d9d" font-size="9" font-family="system-ui,sans-serif" font-weight="600">chin on breast</text>
     <!-- Nose clear -->
     <circle cx="143" cy="76" r="4" fill="#e8c5a0"/>
     <text x="152" y="68" fill="#4f9d9d" font-size="9" font-family="system-ui,sans-serif" font-weight="600">nose clear</text>
     <!-- Lips flanged -->
     <path d="M118 108 Q120 112 118 116" stroke="#c49370" stroke-width="2" fill="none" stroke-linecap="round"/>
     <path d="M118 105 Q115 102 114 108" stroke="#c49370" stroke-width="1.5" fill="none" stroke-linecap="round"/>
     <text x="88" y="100" fill="#c49370" font-size="9" font-family="system-ui,sans-serif">lips flanged</text>
     <text x="195" y="148" fill="#4f9d9d" font-size="12" font-family="system-ui,sans-serif">✓</text>
     <text x="195" y="70" fill="#4f9d9d" font-size="12" font-family="system-ui,sans-serif">✓</text>
     <text x="185" y="102" fill="#c49370" font-size="12" font-family="system-ui,sans-serif">✓</text>
   </svg>
   Caption below SVG (text-xs, text-center, neutral-500, mt-2): "Deep, asymmetric latch. More areola below nipple than above."

   PANEL 2 — SHALLOW LATCH:
   Label above SVG (text-xs, font-semibold, text-center, text-red-500, mb-2, tracking-wide): "✗ SHALLOW LATCH"
   SVG (max-w-[160px], w-full):
   <svg viewBox="0 0 240 175" xmlns="http://www.w3.org/2000/svg">
     <!-- Breast side profile -->
     <ellipse cx="68" cy="92" rx="58" ry="65" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1.5"/>
     <!-- Baby head positioned more toward nipple tip, not deeply latched -->
     <ellipse cx="175" cy="90" rx="48" ry="52" fill="#f5e6d8" stroke="#e0c8ae" stroke-width="1.5"/>
     <!-- Chin NOT touching — gap shown -->
     <line x1="128" y1="125" x2="148" y2="130" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3"/>
     <text x="82" y="150" fill="#ef4444" font-size="9" font-family="system-ui,sans-serif" font-weight="600">chin not touching</text>
     <text x="195" y="152" fill="#ef4444" font-size="12" font-family="system-ui,sans-serif">✗</text>
     <!-- Lips tucked inward (thin line, no flange) -->
     <line x1="126" y1="103" x2="126" y2="116" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
     <text x="82" y="96" fill="#ef4444" font-size="9" font-family="system-ui,sans-serif">lips tucked in</text>
     <text x="195" y="98" fill="#ef4444" font-size="12" font-family="system-ui,sans-serif">✗</text>
     <!-- Only nipple in mouth — small circle at breast tip indicating shallow take -->
     <circle cx="115" cy="90" r="6" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 2"/>
     <text x="58" y="73" fill="#ef4444" font-size="9" font-family="system-ui,sans-serif">mostly nipple,</text>
     <text x="58" y="83" fill="#ef4444" font-size="9" font-family="system-ui,sans-serif">not areola</text>
     <text x="195" y="78" fill="#ef4444" font-size="12" font-family="system-ui,sans-serif">✗</text>
   </svg>
   Caption below SVG (text-xs, text-center, neutral-500, mt-2): "Shallow latch. Nipple pain, poor transfer. Re-latch."

4. Put your partner on hydration duty.

   You need more water than you think right now. A standard rule: have a full water bottle within reach every time you sit down to feed. Make this your partner's responsibility — filling it, placing it next to you, and refilling it after feeds. It's a small thing that consistently gets skipped when it's no one's specific job.

5. Put your partner on diaper duty.

   Diaper changes are one of the few baby-related tasks that don't require you. This is also one of the best ways for a partner to bond with the baby early on. Tracking diaper output — number of wet diapers per day, any concerns about color or consistency — is something your partner can own completely. See the diaper tracker in this app for what to log.

---

WHAT TO WATCH FOR

Block 1 — Amber accent (IBCLC or pediatrician):
If your partner is willing to help but doesn't know where to start, that's a communication and education gap, not a character flaw. Share the crash-course snippet below. The ABM and La Leche League have partner-specific guides that are short and clear. An IBCLC appointment is also an option — many IBCLCs welcome or encourage the partner to attend and can address questions from both of you.

Block 2 — Amber accent (non-medical support):
If your partner has said they won't help, or if you feel like you're managing everything alone right now, you have other options.

A postpartum doula can cover household and newborn support, typically for a few hours at a time. Many areas have sliding-scale pricing. La Leche League groups (free, local, drop-in) and online communities like r/breastfeeding are places to ask questions and feel less alone at 3am. If family or friends have offered to help, now is the time to give them a specific task — not "let me know if you need anything," but "can you bring a meal on Thursday."

You do not have to quit breastfeeding because your support system isn't what you needed it to be. That's what this app is here for.

Block 3 — Plain text (informational, no escalation):
Postpartum mood changes can affect partners too. If your partner seems unusually withdrawn, irritable, or disengaged, this is worth naming. Postpartum depression and anxiety are not exclusive to birthing parents. Encourage them to talk to their own provider if something seems off.

---

CRASH-COURSE SNIPPET

Trigger label: "Resources to share with your partner"
Section title inside: "What your partner can read, watch, and do — in under 10 minutes"

Content (prose, same style as WHAT TO KNOW):

These are resources written for partners, not for the person breastfeeding. Share them directly.

La Leche League — "How Fathers Can Help With Breastfeeding." A short, plain-language guide covering skin-to-skin with a newborn, what to say (and not say) during a hard feed, and how to support milk supply indirectly. Available free at llli.org.

Academy of Breastfeeding Medicine (ABM) — Clinical Protocol #24 covers breastfeeding and the family. It's written for providers but the section on partner support is accessible. A good read for a partner who wants the evidence behind why this matters.

Global Health Media — Free short videos on newborn feeding, including one specifically on recognizing a good latch. These are the same videos shown in many hospital birth education programs. Available at globalhealthmedia.org under "Breastfeeding."

Kellymom.com — The "For Fathers and Partners" section has practical, no-fluff answers to common questions: what's in colostrum, how often is normal, whether formula is needed. Secular, evidence-based, jargon-light.

What your partner can do right now: read the latch section of this app alongside you. Go to "Getting the Latch" in Week 1 lessons and read it together. If you've already worked through it, walk them through the step guide — having them understand what a good latch check involves is more useful than any article.

---

CHAT BRIDGE TEXT

"Have a question about what to ask your partner?"

(Links to /chat per the existing chat bridge pattern.)

---

DO NOT CHANGE:
- The lesson header, week badge, path badge, or read-time pill
- The crash-course snippet collapse behavior (collapsed by default, expands on tap)
- The Done button behavior or styling
- Any other lesson, screen, or component not named above
```
