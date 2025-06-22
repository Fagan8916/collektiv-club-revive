
-- Insert admin role for the specific user
INSERT INTO public.user_roles (user_id, role) 
VALUES ('69042276-8cd3-49f4-8561-5f199041085e', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
