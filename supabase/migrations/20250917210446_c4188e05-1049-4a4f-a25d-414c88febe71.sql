-- Drop triggers first to remove dependencies
DROP TRIGGER IF EXISTS on_auth_user_created_registration ON auth.users;
DROP TRIGGER IF EXISTS apply_preapproval_trigger ON auth.users;
DROP TRIGGER IF EXISTS handle_invited_user_trigger ON auth.users;

-- Now drop the conflicting functions
DROP FUNCTION IF EXISTS public.apply_preapproval_if_any();
DROP FUNCTION IF EXISTS public.handle_invited_user_registration();

-- Update the main registration handler to properly detect admin invites via pre-approved emails
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  existing_role_count INTEGER := 0;
  is_pre_approved BOOLEAN := FALSE;
BEGIN
  -- Check if user already has a role to prevent duplicates
  SELECT COUNT(*) INTO existing_role_count
  FROM public.user_roles 
  WHERE user_id = NEW.id;
  
  -- Only proceed if user doesn't already have any roles
  IF existing_role_count = 0 THEN
    -- Check if the user's email is in the pre-approved list (set by admin-invite edge function)
    SELECT EXISTS (
      SELECT 1 FROM public.pre_approved_emails 
      WHERE email = NEW.email AND used_at IS NULL
    ) INTO is_pre_approved;

    IF is_pre_approved THEN
      -- Create approved MEMBER role for pre-approved users (including admin invites)
      INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
      VALUES (NEW.id, 'member', 'approved', now(), now());
      
      -- Mark the pre-approved email as used
      UPDATE public.pre_approved_emails 
      SET used_at = now() 
      WHERE email = NEW.email AND used_at IS NULL;
      
      RAISE NOTICE 'User % auto-approved via pre-approved email list', NEW.email;
    ELSE
      -- Create a pending MEMBER role for regular users
      INSERT INTO public.user_roles (user_id, role, status, requested_at)
      VALUES (NEW.id, 'member', 'pending', now());
      
      RAISE NOTICE 'User % created with pending status - requires admin approval', NEW.email;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Ensure the main trigger is active
CREATE TRIGGER on_auth_user_created_registration
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_registration();