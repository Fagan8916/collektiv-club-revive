
-- Fix admin role for fagan8916@gmail.com by bypassing RLS policies
-- This will run with elevated privileges to ensure the role is created

-- First, ensure the user exists and get their ID
DO $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Get the user ID for fagan8916@gmail.com
    SELECT id INTO target_user_id
    FROM auth.users 
    WHERE email = 'fagan8916@gmail.com'
    LIMIT 1;
    
    IF target_user_id IS NOT NULL THEN
        -- Insert admin role with ON CONFLICT to handle duplicates
        INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
        VALUES (target_user_id, 'admin', 'approved', now(), now())
        ON CONFLICT (user_id, role) DO UPDATE SET
            status = 'approved',
            approved_at = now();
        
        -- Insert member role with ON CONFLICT to handle duplicates  
        INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
        VALUES (target_user_id, 'member', 'approved', now(), now())
        ON CONFLICT (user_id, role) DO UPDATE SET
            status = 'approved',
            approved_at = now();
            
        RAISE NOTICE 'Successfully granted admin and member roles to fagan8916@gmail.com (ID: %)', target_user_id;
    ELSE
        RAISE NOTICE 'User fagan8916@gmail.com not found in auth.users table';
    END IF;
END $$;

-- Verify the roles were created
SELECT 
    u.email,
    ur.role,
    ur.status,
    ur.approved_at
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'fagan8916@gmail.com'
ORDER BY ur.role;
