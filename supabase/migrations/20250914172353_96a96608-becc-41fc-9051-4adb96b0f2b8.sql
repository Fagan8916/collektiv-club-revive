-- Delete the incomplete profile for info@collektiv.club so they can create a fresh one
DELETE FROM public.member_profiles 
WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'info@collektiv.club')
  AND (full_name = 'Member' OR first_name IS NULL);