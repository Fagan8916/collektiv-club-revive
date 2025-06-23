
-- First, let's check what users exist and their current roles
SELECT u.email, ur.role, ur.status, ur.approved_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'ryan@collektiv.club'
ORDER BY ur.role;

-- Ensure ryan@collektiv.club has both member and admin roles with approved status
-- This will work regardless of whether the user exists or not
DO $$
DECLARE
    ryan_user_id UUID;
BEGIN
    -- Get ryan's user ID
    SELECT id INTO ryan_user_id 
    FROM auth.users 
    WHERE email = 'ryan@collektiv.club';
    
    IF ryan_user_id IS NOT NULL THEN
        -- Ensure approved member role
        INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
        VALUES (ryan_user_id, 'member', 'approved', now(), now())
        ON CONFLICT (user_id, role) DO UPDATE SET
            status = 'approved',
            approved_at = now();
            
        -- Ensure admin role
        INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
        VALUES (ryan_user_id, 'admin', 'approved', now(), now())
        ON CONFLICT (user_id, role) DO UPDATE SET
            status = 'approved',
            approved_at = now();
            
        RAISE NOTICE 'Updated roles for ryan@collektiv.club (ID: %)', ryan_user_id;
    ELSE
        RAISE NOTICE 'User ryan@collektiv.club not found in auth.users table';
    END IF;
END $$;

-- Verify the changes
SELECT u.email, ur.role, ur.status, ur.approved_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'ryan@collektiv.club'
ORDER BY ur.role;
