
-- Make Ryan and Manon admins and approve their memberships
-- First, update their existing member roles to approved status
UPDATE public.user_roles 
SET status = 'approved', 
    approved_at = now()
WHERE user_id IN (
  SELECT id FROM auth.users 
  WHERE email IN ('ryan@collektiv.club', 'manon@collektiv.club')
) AND role = 'member';

-- Add admin roles for both Ryan and Manon
INSERT INTO public.user_roles (user_id, role, status, approved_at) 
SELECT id, 'admin', 'approved', now()
FROM auth.users 
WHERE email IN ('ryan@collektiv.club', 'manon@collektiv.club')
ON CONFLICT (user_id, role) DO UPDATE SET
  status = 'approved',
  approved_at = now();
