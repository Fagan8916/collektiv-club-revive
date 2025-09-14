-- Delete the member profile for fagan8916@aol.com test user
DELETE FROM public.member_profiles 
WHERE user_id = 'c465b62e-c1b2-4f71-9a75-c6dac5babcee';

-- Delete the user role for fagan8916@aol.com test user  
DELETE FROM public.user_roles 
WHERE user_id = 'c465b62e-c1b2-4f71-9a75-c6dac5babcee';

-- Keep the auth.users record and pre_approved_emails entry so they can still log in and get auto-approved