-- Comprehensive Fix for Pre-Approved User Registration Issues
-- Specifically addressing Stacey Fagan's case and preventing future issues

-- 1. IMMEDIATE FIX FOR STACEY FAGAN
-- Grant her the approved member role she should have gotten automatically
INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
VALUES ('e12a3258-a75c-47b6-8ee1-3ce20431b356', 'member', 'approved', now(), now())
ON CONFLICT (user_id, role) DO UPDATE SET
  status = 'approved',
  approved_at = now();

-- 2. FIX HER PROFILE OWNERSHIP
-- Reassign her existing profile from the incorrect user_id to her correct one
UPDATE public.member_profiles 
SET user_id = 'e12a3258-a75c-47b6-8ee1-3ce20431b356', -- Stacey's correct user_id
    updated_at = now()
WHERE id = '3d8468e3-faf2-43c8-a434-7b225a6f2b0e' -- Her existing profile
  AND contact_email = 'staceyjfagan@gmail.com';

-- 3. CLEAN UP HER PENDING SUBMISSION (no longer needed)
DELETE FROM public.member_profile_submissions 
WHERE id = '87bb43d5-18d9-4fc1-b784-44a26ebca951'
  AND user_id = 'e12a3258-a75c-47b6-8ee1-3ce20431b356'
  AND status = 'pending';

-- 4. MARK HER PRE-APPROVED EMAIL AS USED
UPDATE public.pre_approved_emails 
SET used_at = now() 
WHERE email = 'staceyjfagan@gmail.com' AND used_at IS NULL;

-- 5. ENHANCE THE REGISTRATION TRIGGER WITH BETTER LOGGING
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  existing_role_count INTEGER := 0;
  is_pre_approved BOOLEAN := FALSE;
  pre_approved_record RECORD;
BEGIN
  -- Enhanced logging
  RAISE NOTICE 'Registration trigger started for user: % (email: %)', NEW.id, NEW.email;
  
  -- Check if user already has a role to prevent duplicates
  SELECT COUNT(*) INTO existing_role_count
  FROM public.user_roles 
  WHERE user_id = NEW.id;
  
  RAISE NOTICE 'User % has % existing roles', NEW.email, existing_role_count;
  
  -- Only proceed if user doesn't already have any roles
  IF existing_role_count = 0 THEN
    -- Check if the user's email is in the pre-approved list
    SELECT * INTO pre_approved_record
    FROM public.pre_approved_emails 
    WHERE email = NEW.email AND used_at IS NULL;
    
    is_pre_approved := FOUND;
    
    RAISE NOTICE 'User % pre-approved status: %', NEW.email, is_pre_approved;

    IF is_pre_approved THEN
      -- Create approved MEMBER role for pre-approved users
      INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
      VALUES (NEW.id, 'member', 'approved', now(), now());
      
      -- Mark the pre-approved email as used
      UPDATE public.pre_approved_emails 
      SET used_at = now() 
      WHERE email = NEW.email AND used_at IS NULL;
      
      RAISE NOTICE 'SUCCESS: User % auto-approved via pre-approved email list', NEW.email;
    ELSE
      -- Create a pending MEMBER role for regular users
      INSERT INTO public.user_roles (user_id, role, status, requested_at)
      VALUES (NEW.id, 'member', 'pending', now());
      
      RAISE NOTICE 'User % created with pending status - requires admin approval', NEW.email;
    END IF;
  ELSE
    RAISE NOTICE 'User % already has roles, skipping role creation', NEW.email;
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Registration trigger failed for user %: % - %', NEW.email, SQLSTATE, SQLERRM;
    RETURN NEW; -- Don't block user registration even if role assignment fails
END;
$function$;

-- 6. CREATE RECOVERY FUNCTION FOR FUTURE ISSUES
CREATE OR REPLACE FUNCTION public.fix_pre_approved_users_missing_roles()
RETURNS TABLE(
  user_email text,
  user_id uuid,
  action_taken text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  user_record RECORD;
  result_record RECORD;
BEGIN
  -- Find users who are pre-approved but don't have roles
  FOR user_record IN 
    SELECT u.id, u.email
    FROM auth.users u
    INNER JOIN public.pre_approved_emails pe ON pe.email = u.email
    LEFT JOIN public.user_roles ur ON ur.user_id = u.id
    WHERE ur.user_id IS NULL -- No roles assigned
  LOOP
    -- Grant them the approved member role
    INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
    VALUES (user_record.id, 'member', 'approved', now(), now())
    ON CONFLICT (user_id, role) DO NOTHING;
    
    -- Mark their pre-approved email as used
    UPDATE public.pre_approved_emails 
    SET used_at = now() 
    WHERE email = user_record.email AND used_at IS NULL;
    
    -- Return result
    user_email := user_record.email;
    user_id := user_record.id;
    action_taken := 'Granted approved member role';
    RETURN NEXT;
    
  END LOOP;
  
  RETURN;
END;
$function$;

-- 7. CREATE MONITORING FUNCTION FOR ADMINS
CREATE OR REPLACE FUNCTION public.check_pre_approved_user_status()
RETURNS TABLE(
  email text,
  user_id uuid,
  has_auth_account boolean,
  has_roles boolean,
  role_status text,
  pre_approved_used boolean,
  issue_description text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  RETURN QUERY
  WITH pre_approved_analysis AS (
    SELECT 
      pe.email,
      u.id as auth_user_id,
      u.id IS NOT NULL as has_auth_account,
      ur.user_id IS NOT NULL as has_roles,
      ur.status as role_status,
      pe.used_at IS NOT NULL as pre_approved_used,
      CASE 
        WHEN u.id IS NULL THEN 'Pre-approved but no account created yet'
        WHEN ur.user_id IS NULL THEN 'Has account but missing roles - NEEDS FIX'
        WHEN ur.status = 'pending' THEN 'Has account but role still pending - NEEDS APPROVAL'
        WHEN ur.status = 'approved' AND pe.used_at IS NULL THEN 'Approved but pre-approved email not marked as used'
        ELSE 'All good'
      END as issue_description
    FROM public.pre_approved_emails pe
    LEFT JOIN auth.users u ON u.email = pe.email
    LEFT JOIN public.user_roles ur ON ur.user_id = u.id AND ur.role = 'member'
  )
  SELECT * FROM pre_approved_analysis
  ORDER BY 
    CASE WHEN issue_description LIKE '%NEEDS%' THEN 1 ELSE 2 END,
    email;
END;
$function$;

-- 8. VERIFICATION: Confirm Stacey's fix worked
DO $$
DECLARE
  role_count INTEGER;
  profile_record RECORD;
  submission_count INTEGER;
BEGIN
  -- Check roles
  SELECT COUNT(*) INTO role_count
  FROM public.user_roles 
  WHERE user_id = 'e12a3258-a75c-47b6-8ee1-3ce20431b356' 
    AND role = 'member' 
    AND status = 'approved';
  
  -- Check profile ownership
  SELECT id, user_id, full_name, contact_email, is_visible 
  INTO profile_record
  FROM public.member_profiles 
  WHERE user_id = 'e12a3258-a75c-47b6-8ee1-3ce20431b356';
  
  -- Check submissions
  SELECT COUNT(*) INTO submission_count
  FROM public.member_profile_submissions 
  WHERE user_id = 'e12a3258-a75c-47b6-8ee1-3ce20431b356' 
    AND status = 'pending';
  
  RAISE NOTICE 'Stacey Fagan fix verification: approved_roles=%, profile_id=%, profile_name=%, pending_submissions=%', 
    role_count, profile_record.id, profile_record.full_name, submission_count;
    
  IF role_count = 0 THEN
    RAISE WARNING 'Stacey still missing approved member role!';
  END IF;
  
  IF profile_record.user_id IS NULL THEN
    RAISE WARNING 'Stacey profile ownership not fixed!';
  END IF;
  
  IF submission_count > 0 THEN
    RAISE WARNING 'Stacey still has pending submissions!';
  END IF;
END $$;