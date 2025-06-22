
-- Insert admin role for Manon
INSERT INTO public.user_roles (user_id, role) 
VALUES ('49d28fd9-505e-4541-810b-9586f9eafd60', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
