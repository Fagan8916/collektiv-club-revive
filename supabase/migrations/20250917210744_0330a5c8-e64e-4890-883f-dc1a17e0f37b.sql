-- Clean up fagan8916 records for retesting

-- Delete user_roles record for fagan8916@aol.com
DELETE FROM public.user_roles 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'fagan8916@aol.com'
);

-- Delete member_profiles record for fagan8916@aol.com
DELETE FROM public.member_profiles 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'fagan8916@aol.com'
);

-- Delete pre_approved_emails records for both email variants
DELETE FROM public.pre_approved_emails 
WHERE email IN ('fagan8916@aol.com', 'fagan8916@gmail.com');

-- Verify cleanup by checking remaining records
DO $$
DECLARE
  user_roles_count INTEGER;
  profiles_count INTEGER;
  preapproved_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO user_roles_count 
  FROM public.user_roles ur 
  JOIN auth.users au ON ur.user_id = au.id 
  WHERE au.email = 'fagan8916@aol.com';
  
  SELECT COUNT(*) INTO profiles_count 
  FROM public.member_profiles mp 
  JOIN auth.users au ON mp.user_id = au.id 
  WHERE au.email = 'fagan8916@aol.com';
  
  SELECT COUNT(*) INTO preapproved_count 
  FROM public.pre_approved_emails 
  WHERE email IN ('fagan8916@aol.com', 'fagan8916@gmail.com');
  
  RAISE NOTICE 'Cleanup verification: user_roles=%, profiles=%, pre_approved=%', 
    user_roles_count, profiles_count, preapproved_count;
END $$;