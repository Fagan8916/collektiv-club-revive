
-- Add admin role for Fagan@gmail.com (ID: 1af5efd8-bc1b-43bb-858e-5c088af4834b)
INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
VALUES ('1af5efd8-bc1b-43bb-858e-5c088af4834b', 'admin', 'approved', now(), now())
ON CONFLICT (user_id, role) DO UPDATE SET
  status = 'approved',
  approved_at = now();

-- Also ensure they have an approved member role
INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
VALUES ('1af5efd8-bc1b-43bb-858e-5c088af4834b', 'member', 'approved', now(), now())
ON CONFLICT (user_id, role) DO UPDATE SET
  status = 'approved',
  approved_at = now();
