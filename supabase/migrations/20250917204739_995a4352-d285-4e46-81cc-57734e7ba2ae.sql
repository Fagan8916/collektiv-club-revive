-- Clean up all test data for fagan8916@aol.com
-- Delete in order to avoid foreign key constraints

-- First, delete from user_roles (pending membership)
DELETE FROM public.user_roles 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'fagan8916@aol.com'
);

-- Delete from member_profiles (generic profile)
DELETE FROM public.member_profiles 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'fagan8916@aol.com'
);

-- Delete from pre_approved_emails 
DELETE FROM public.pre_approved_emails 
WHERE email = 'fagan8916@aol.com';

-- Finally, delete from auth.users (this will cascade to any remaining references)
DELETE FROM auth.users 
WHERE email = 'fagan8916@aol.com';