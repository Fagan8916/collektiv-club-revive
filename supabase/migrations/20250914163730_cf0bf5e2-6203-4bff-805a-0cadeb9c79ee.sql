-- First, manually approve the info@collektiv.club user
UPDATE public.user_roles 
SET status = 'approved', 
    approved_at = now(),
    approved_by = (SELECT id FROM auth.users WHERE email = 'info@collektiv.club' LIMIT 1)
WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'info@collektiv.club')
  AND role = 'member' 
  AND status = 'pending';

-- Update the registration trigger to auto-approve users invited via Supabase admin invite
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  is_pre_approved BOOLEAN := FALSE;
  existing_role_count INTEGER := 0;
  is_admin_invited BOOLEAN := FALSE;
BEGIN
  -- Check if user already has a role to prevent duplicates
  SELECT COUNT(*) INTO existing_role_count
  FROM public.user_roles 
  WHERE user_id = NEW.id;
  
  -- Only proceed if user doesn't already have any roles
  IF existing_role_count = 0 THEN
    -- Check if the user's email is in the pre-approved list
    SELECT EXISTS (
      SELECT 1 FROM public.pre_approved_emails 
      WHERE email = NEW.email AND used_at IS NULL
    ) INTO is_pre_approved;

    -- Check if user was invited via Supabase admin invite (they have email_confirmed_at set immediately)
    -- Users invited via admin invite have their email automatically confirmed
    SELECT (NEW.email_confirmed_at IS NOT NULL AND NEW.confirmation_sent_at IS NOT NULL) INTO is_admin_invited;

    IF is_pre_approved OR is_admin_invited THEN
      -- Create approved MEMBER role for pre-approved or admin-invited users
      INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
      VALUES (NEW.id, 'member', 'approved', now(), now());
      
      -- Mark the pre-approved email as used (if it exists)
      IF is_pre_approved THEN
        UPDATE public.pre_approved_emails 
        SET used_at = now() 
        WHERE email = NEW.email AND used_at IS NULL;
      END IF;
    ELSE
      -- Create a pending MEMBER role for regular users
      INSERT INTO public.user_roles (user_id, role, status, requested_at)
      VALUES (NEW.id, 'member', 'pending', now());
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;