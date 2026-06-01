-- 00019_ibclc_link_global_sweep.sql
-- Two-part migration:
--
-- Part 1: Replace the old IBCLC finder URL with the new one wherever it
--         was already inserted (AG-016, AG-023 via migration 00018).
--
-- Part 2: Add the IBCLC finder link to every other AG entry that
--         references IBCLC consultation but did not yet have the link:
--         AG-004, AG-017, AG-020, AG-024, AG-025.
--
-- New link: https://portal.ilca.org/i4a/memberDirectory/index.cfm?directory_id=19&pageID=4356

-- ─── PART 1: Fix old link → new link ─────────────────────────────────────────

UPDATE public.companion_content
SET
  learn_more      = REPLACE(learn_more,
    'https://www.ilca.org/find-a-lactation-consultant',
    'https://portal.ilca.org/i4a/memberDirectory/index.cfm?directory_id=19&pageID=4356'),
  escalation_text = REPLACE(escalation_text,
    'https://www.ilca.org/find-a-lactation-consultant',
    'https://portal.ilca.org/i4a/memberDirectory/index.cfm?directory_id=19&pageID=4356'),
  in_app_message  = REPLACE(in_app_message,
    'https://www.ilca.org/find-a-lactation-consultant',
    'https://portal.ilca.org/i4a/memberDirectory/index.cfm?directory_id=19&pageID=4356')
WHERE trigger_id IN ('AG-016', 'AG-023');

-- ─── PART 2: Add new link to remaining AG entries ─────────────────────────────

-- AG-004: nipple pain — "An IBCLC can usually identify and correct the issue in one visit."
UPDATE public.companion_content
SET learn_more = REPLACE(learn_more,
  'Sources: ABM Protocol #2; LLLI "Sore Nipples"; ABM Protocol #26.',
  'To find an IBCLC near you: https://portal.ilca.org/i4a/memberDirectory/index.cfm?directory_id=19&pageID=4356

Sources: ABM Protocol #2; LLLI "Sore Nipples"; ABM Protocol #26.')
WHERE trigger_id = 'AG-004';

-- AG-017: breast and nipple pain — "An IBCLC can usually identify and correct this in one visit."
UPDATE public.companion_content
SET learn_more = REPLACE(learn_more,
  'Sources: ABM Protocol #26; ABM Protocol #2; LLLI "Sore Nipples."',
  'To find an IBCLC near you: https://portal.ilca.org/i4a/memberDirectory/index.cfm?directory_id=19&pageID=4356

Sources: ABM Protocol #26; ABM Protocol #2; LLLI "Sore Nipples."')
WHERE trigger_id = 'AG-017';

-- AG-020: flange sizing — "An IBCLC specializing in pumping can measure and fit flanges in a single visit."
UPDATE public.companion_content
SET learn_more = REPLACE(learn_more,
  'Sources: Flange sizing guidance from Medela, Spectra, Elvie, and Motif; ABM Protocol #32; published pumping literature.',
  'To find an IBCLC near you: https://portal.ilca.org/i4a/memberDirectory/index.cfm?directory_id=19&pageID=4356

Sources: Flange sizing guidance from Medela, Spectra, Elvie, and Motif; ABM Protocol #32; published pumping literature.')
WHERE trigger_id = 'AG-020';

-- AG-024: flat/inverted nipples — "ideally a prenatal consultation" + "request a lactation consult"
UPDATE public.companion_content
SET learn_more = REPLACE(learn_more,
  'Sources: ABM Protocol #2; ABM Protocol #11; LLLI latch guidance.',
  'To find an IBCLC near you: https://portal.ilca.org/i4a/memberDirectory/index.cfm?directory_id=19&pageID=4356

Sources: ABM Protocol #2; ABM Protocol #11; LLLI latch guidance.')
WHERE trigger_id = 'AG-024';

-- AG-025: breast implants — "tell your IBCLC and your baby's pediatrician"
UPDATE public.companion_content
SET learn_more = REPLACE(learn_more,
  'Sources: ABM Protocol #2; published literature on breast implants and lactation (Semple et al.; Jewell et al.).',
  'To find an IBCLC near you: https://portal.ilca.org/i4a/memberDirectory/index.cfm?directory_id=19&pageID=4356

Sources: ABM Protocol #2; published literature on breast implants and lactation (Semple et al.; Jewell et al.).')
WHERE trigger_id = 'AG-025';
