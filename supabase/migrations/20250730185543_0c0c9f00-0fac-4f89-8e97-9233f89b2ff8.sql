-- Fix the user registration function to handle duplicates gracefully
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  is_pre_approved BOOLEAN := FALSE;
  existing_role_count INTEGER := 0;
BEGIN
  -- Check if user already has a role to prevent duplicates
  SELECT COUNT(*) INTO existing_role_count
  FROM public.user_roles 
  WHERE user_id = NEW.id AND role = 'member';
  
  -- Only proceed if user doesn't already have a member role
  IF existing_role_count = 0 THEN
    -- Check if the user's email is in the pre-approved list
    SELECT EXISTS (
      SELECT 1 FROM public.pre_approved_emails 
      WHERE email = NEW.email AND used_at IS NULL
    ) INTO is_pre_approved;

    IF is_pre_approved THEN
      -- Create approved member role for pre-approved users
      INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
      VALUES (NEW.id, 'member', 'approved', now(), now());
      
      -- Mark the pre-approved email as used
      UPDATE public.pre_approved_emails 
      SET used_at = now() 
      WHERE email = NEW.email AND used_at IS NULL;
    ELSE
      -- Create a pending member role for regular users
      INSERT INTO public.user_roles (user_id, role, status, requested_at)
      VALUES (NEW.id, 'member', 'pending', now());
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Also fix the invited user registration function to prevent conflicts
CREATE OR REPLACE FUNCTION public.handle_invited_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  existing_role_count INTEGER := 0;
BEGIN
  -- Check if user already has a role to prevent duplicates
  SELECT COUNT(*) INTO existing_role_count
  FROM public.user_roles 
  WHERE user_id = NEW.id AND role = 'member';
  
  -- Only create role if user was invited AND doesn't already have a member role
  IF existing_role_count = 0 AND EXISTS (
    SELECT 1 FROM public.invitations 
    WHERE email = NEW.email AND used_at IS NOT NULL
  ) THEN
    INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
    VALUES (NEW.id, 'member', 'approved', now(), now());
  END IF;
  
  RETURN NEW;
END;
$function$;