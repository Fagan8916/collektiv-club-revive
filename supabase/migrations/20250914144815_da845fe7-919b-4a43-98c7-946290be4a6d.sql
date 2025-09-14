-- Delete the member profile for staceyjfagan@gmail.com test user
DELETE FROM public.member_profiles 
WHERE user_id = 'e12a3258-a75c-47b6-8ee1-3ce20431b356';

-- Delete the user role for staceyjfagan@gmail.com test user  
DELETE FROM public.user_roles 
WHERE user_id = 'e12a3258-a75c-47b6-8ee1-3ce20431b356';

-- Keep the auth.users record and pre_approved_emails entry so they can still log in and get auto-approved