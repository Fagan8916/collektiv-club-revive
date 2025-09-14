-- Clear the incomplete profile data for info@collektiv.club so they can rebuild it properly
UPDATE public.member_profiles 
SET first_name = NULL, 
    full_name = NULL,
    bio = NULL,
    company = NULL,
    position = NULL,
    website_url = NULL,
    linkedin_url = NULL,
    location = NULL,
    expertise = NULL,
    services_offered = NULL
WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'info@collektiv.club')
  AND (full_name = 'Member' OR full_name IS NULL OR first_name IS NULL);