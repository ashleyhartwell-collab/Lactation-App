-- 00017_ml_path_variants.sql
-- Populate in_app_message_path_b (exclusive pumping) and in_app_message_path_c (combo)
-- for ML-003, ML-008, ML-012, and ML-019.
--
-- get-companion-item resolves these at fetch time:
--   - feeding_preference = 'exclusive_pumping' → use path_b if non-null
--   - feeding_preference = 'combo'             → use path_c if non-null
--   - otherwise                                → use default in_app_message
--
-- ML-019 is Path C only (combo users), so it has no path_b variant.
-- Its existing in_app_message IS the combo-appropriate message.

-- ─── ML-003: Two weeks in — birth weight milestone ───────────────────────────

UPDATE public.companion_content SET

  in_app_message_path_b = 'Two weeks. Your baby has (most likely) regained their birth weight, which means your body has been their entire food source — every ounce coming from sessions you showed up for, day and night, with a pump. Every 3am session when you would rather have been sleeping. Every time you watched the output and weren''t sure it was enough. It was enough. Your baby is growing.',

  in_app_message_path_c = 'Two weeks. Your baby has (most likely) regained their birth weight, which means your body has been a significant part of their food source — and the combination has been working. Every session you managed, every feed that needed a supplement so your baby would be full. You made the call every time. Your baby is growing.'

WHERE trigger_id = 'ML-003';

-- ─── ML-008: Six months — AAP milestone ──────────────────────────────────────

UPDATE public.companion_content SET

  in_app_message_path_b = 'Six months. Six months of your body being your baby''s entire food source — through a pump, every single session, every single day. The AAP recommends exclusive breastfeeding for six months; they don''t have a separate standing ovation for exclusive pumping, but they should. What you did is harder than most people know. You weren''t doing it for the recommendation. You were doing it for your baby, one session at a time, and you made it half a year. That''s not nothing. That''s actually everything.',

  in_app_message_path_c = 'Six months. Six months of your body being a major part of your baby''s food source — alongside formula, alongside whatever the mix has looked like for your family. The AAP recommends six months; pediatricians cite it as a landmark. But you weren''t doing it for the recommendation. You were feeding your baby in the way that worked for your family, one day at a time, and you made it half a year. That''s not nothing. That''s actually everything.'

WHERE trigger_id = 'ML-008';

-- ─── ML-012: First bottle of pumped milk ─────────────────────────────────────

UPDATE public.companion_content SET

  in_app_message_path_b = 'Every bottle your baby has ever had has been something you made. Not just this one — every one. Think about that. Every feed, every session, every bag that went into the bottle your baby is drinking right now — all of it yours. Your body, your schedule, your 3am pumps. That''s not a backup plan. That''s the whole story. And it''s a good one.',

  in_app_message_path_c = 'Someone else just fed your baby with something you made. Think about that for a second. You pumped that. Your body made it. And now someone who loves your baby got to be part of feeding them — in a family where feeding has its own rhythm, its own mix, its own story. That''s your system working.'

WHERE trigger_id = 'ML-012';
