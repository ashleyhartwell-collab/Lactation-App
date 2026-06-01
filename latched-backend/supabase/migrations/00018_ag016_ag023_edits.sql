-- 00018_ag016_ag023_edits.sql
-- Editorial revisions to AG-016 and AG-023 following tone review.
--
-- AG-016 changes:
--   - "most of the time" → "many times" (less definitive)
--   - CTA changed to assertive action framing
--   - Removed "baby doesn't sleep long stretches" from non-supply list
--     (night waking can be genuine hunger — not safe to dismiss categorically)
--   - Removed discouragement of formula or feeding pattern changes from learnMore;
--     left only the positive recommendation (weighted feed or IBCLC)
--   - Added IBCLC finder link
--
-- AG-023 changes:
--   - Escalation rewritten to be more urgent: contact immediately, don't wait
--   - learnMore step (1) strengthened: contact IBCLC before or immediately after birth
--   - Added emphasis on ongoing, close coordination with both IBCLC and pediatrician
--   - Added IBCLC finder link
--
-- NOTE: The IBCLC finder link (https://www.ilca.org/find-a-lactation-consultant)
-- should be added to ALL AG entries that reference IBCLC consultation.
-- Migration 00019 will sweep the remaining entries (AG-017, AG-018, AG-019,
-- AG-023, AG-024, AG-025 and any others) for this global change.

-- ─── AG-016 ───────────────────────────────────────────────────────────────────

UPDATE public.companion_content SET

  in_app_message = 'Concerns about supply are one of the most common reasons moms stop breastfeeding earlier than they wanted to — and many times, the supply is actually fine. But some supply concerns are real and worth acting on. Let''s dive into the details of what you''re experiencing so we can address potential issues.',

  learn_more = 'The most reliable indicators of adequate supply are your baby''s output and weight — not how your breasts feel, how much you pump, or whether your baby "seems hungry." If your baby has 6+ wet diapers per day, 3+ stools (in the first 6 weeks), and is gaining appropriately at weight checks, your supply is almost certainly adequate.

Common reasons moms perceive low supply that aren''t actually supply issues: breasts feel softer after supply regulates (week 4–6), baby feeds more frequently during growth spurts, pump output feels low (pump output ≠ feeding output).

Actual supply challenges are less common but do exist. Risk factors include: previous breast surgery, hypoplastic breasts, delayed or infrequent feeding in the first weeks, retained placenta, hormonal conditions (PCOS, thyroid), significant bleeding or hemorrhage at delivery.

If you''re concerned, the most productive first step is a weighted feed or an IBCLC consultation. To find an IBCLC near you: https://www.ilca.org/find-a-lactation-consultant

Sources: ABM Protocol #2; ABM Protocol #9; "Making More Milk" (Marasco & West); LLLI.'

WHERE trigger_id = 'AG-016';

-- ─── AG-023 ───────────────────────────────────────────────────────────────────

UPDATE public.companion_content SET

  learn_more = 'Both breast reduction surgery and hypoplastic/tubular breasts (Insufficient Glandular Tissue, or IGT) can affect the amount of milk-producing tissue available and the nerve pathways that drive the letdown reflex.

Breast reduction: the most common supply risk of any breast surgery. Outcomes depend heavily on the surgical technique — pedicle-based procedures that preserved the nipple attachment tend to have better outcomes than free nipple grafts. Some moms after reduction achieve full supply; many produce partial supply and successfully combo feed.

Hypoplastic breasts / IGT: the breast tissue present may simply produce less milk than a baby requires, and this often does not respond to increased feeding frequency or pumping the way typical low supply does. Signs that may suggest IGT include widely spaced breasts, disproportionately large areolas, a tubular breast shape, and minimal breast growth during pregnancy.

For both situations, the most important steps are: (1) contact an IBCLC before or immediately after birth — do not wait to see if supply is adequate; (2) maintain close, ongoing contact with both your IBCLC and your pediatrician throughout the first weeks — weight checks, feeding assessments, and adjustments should happen in active partnership with both; (3) have a combo feeding plan ready as a real and valid option, not a fallback.

To find an IBCLC near you: https://www.ilca.org/find-a-lactation-consultant

Sources: ABM Protocol #2; ABM Protocol #9; Marasco & West "Making More Milk"; published IGT literature.',

  escalation_text = 'If your baby is showing any signs of insufficient intake — not regaining birth weight by day 10, fewer than 6 wet diapers per day, lethargy, or difficulty waking to feed — contact your IBCLC and pediatrician immediately. Do not wait for a scheduled visit. Early intervention is critical for your baby''s growth and for protecting your supply.'

WHERE trigger_id = 'AG-023';
