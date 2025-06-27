
-- Ensure Ryan (fagan8916@gmail.com) has proper admin and member roles
-- First, check if the user exists and get their ID
DO $$
DECLARE
    ryan_user_id UUID;
BEGIN
    -- Get Ryan's user ID from auth.users
    SELECT id INTO ryan_user_id
    FROM auth.users 
    WHERE email = 'fagan8916@gmail.com';
    
    IF ryan_user_id IS NOT NULL THEN
        -- Add admin role for Ryan
        INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
        VALUES (ryan_user_id, 'admin', 'approved', now(), now())
        ON CONFLICT (user_id, role) DO UPDATE SET
            status = 'approved',
            approved_at = now();
        
        -- Add member role for Ryan
        INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
        VALUES (ryan_user_id, 'member', 'approved', now(), now())
        ON CONFLICT (user_id, role) DO UPDATE SET
            status = 'approved',
            approved_at = now();
            
        RAISE NOTICE 'Admin and member roles assigned to Ryan (fagan8916@gmail.com)';
    ELSE
        RAISE NOTICE 'User fagan8916@gmail.com not found in auth.users';
    END IF;
END $$;
