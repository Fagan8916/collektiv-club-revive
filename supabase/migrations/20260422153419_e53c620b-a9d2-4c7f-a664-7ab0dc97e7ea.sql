INSERT INTO public.user_roles (user_id, role, status, requested_at, approved_at)
SELECT au.id, 'admin'::public.app_role, 'approved', now(), now()
FROM auth.users au
WHERE lower(au.email) IN ('fagan8916@gmail.com', 'ryan@collektiv.club', 'manon@collektiv.club')
ON CONFLICT (user_id, role)
DO UPDATE SET
  status = 'approved',
  requested_at = COALESCE(public.user_roles.requested_at, now()),
  approved_at = COALESCE(public.user_roles.approved_at, now());