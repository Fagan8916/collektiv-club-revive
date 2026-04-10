
-- Delete user_roles for this user
DELETE FROM public.user_roles WHERE user_id = '9e7f25b0-ed66-4aa8-8b4f-e59d87f827e7';

-- Delete member_profiles for this user
DELETE FROM public.member_profiles WHERE user_id = '9e7f25b0-ed66-4aa8-8b4f-e59d87f827e7';

-- Delete pre_approved_emails entry
DELETE FROM public.pre_approved_emails WHERE email = 'manon@collektivangels.com';
