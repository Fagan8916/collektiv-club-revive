
-- First, let's check the current state of user roles
SELECT u.email, ur.role, ur.status, ur.approved_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email IN ('ryan@collektiv.club', 'manon@collektiv.club')
ORDER BY u.email, ur.role;

-- Now let's properly set up Ryan and Manon as approved admins
-- First, ensure they have approved member status
INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
SELECT u.id, 'member', 'approved', now(), now()
FROM auth.users u
WHERE u.email IN ('ryan@collektiv.club', 'manon@collektiv.club')
ON CONFLICT (user_id, role) DO UPDATE SET
  status = 'approved',
  approved_at = now();

-- Then add admin roles
INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
SELECT u.id, 'admin', 'approved', now(), now()
FROM auth.users u
WHERE u.email IN ('ryan@collektiv.club', 'manon@collektiv.club')
ON CONFLICT (user_id, role) DO UPDATE SET
  status = 'approved',
  approved_at = now();

-- Verify the changes
SELECT u.email, ur.role, ur.status, ur.approved_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email IN ('ryan@collektiv.club', 'manon@collektiv.club')
ORDER BY u.email, ur.role;
