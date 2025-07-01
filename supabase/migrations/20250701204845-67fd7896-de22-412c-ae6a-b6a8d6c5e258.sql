
-- Grant admin rights to manon@collektiv.club
-- First ensure they have an approved member role
INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
SELECT u.id, 'member', 'approved', now(), now()
FROM auth.users u
WHERE u.email = 'manon@collektiv.club'
ON CONFLICT (user_id, role) DO UPDATE SET
  status = 'approved',
  approved_at = now();

-- Then add admin role
INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
SELECT u.id, 'admin', 'approved', now(), now()
FROM auth.users u
WHERE u.email = 'manon@collektiv.club'
ON CONFLICT (user_id, role) DO UPDATE SET
  status = 'approved',
  approved_at = now();

-- Verify the changes
SELECT u.email, ur.role, ur.status, ur.approved_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email IN ('ryan@collektiv.club', 'manon@collektiv.club')
ORDER BY u.email, ur.role;
