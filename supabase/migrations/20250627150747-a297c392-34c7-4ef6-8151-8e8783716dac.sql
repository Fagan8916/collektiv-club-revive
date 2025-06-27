
-- Make Ryan@collektiv.club an admin with proper permissions
-- First, let's find the user ID for ryan@collektiv.club
-- Then grant admin and member roles

-- Add admin role for Ryan@collektiv.club
INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
SELECT id, 'admin', 'approved', now(), now()
FROM auth.users 
WHERE email = 'ryan@collektiv.club'
ON CONFLICT (user_id, role) DO UPDATE SET
  status = 'approved',
  approved_at = now();

-- Also ensure Ryan has an approved member role
INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
SELECT id, 'member', 'approved', now(), now()
FROM auth.users 
WHERE email = 'ryan@collektiv.club'
ON CONFLICT (user_id, role) DO UPDATE SET
  status = 'approved',
  approved_at = now();

-- Let's also check if we need to add the user manually (in case they haven't signed up yet)
-- This will show us the current state
SELECT u.email, ur.role, ur.status, ur.approved_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'ryan@collektiv.club'
ORDER BY ur.role;
