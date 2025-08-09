-- Update the handle_new_user_registration function to only assign member role
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
  WHERE user_id = NEW.id;
  
  -- Only proceed if user doesn't already have any roles
  IF existing_role_count = 0 THEN
    -- Check if the user's email is in the pre-approved list
    SELECT EXISTS (
      SELECT 1 FROM public.pre_approved_emails 
      WHERE email = NEW.email AND used_at IS NULL
    ) INTO is_pre_approved;

    IF is_pre_approved THEN
      -- Create approved MEMBER role for pre-approved users (NOT ADMIN)
      INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
      VALUES (NEW.id, 'member', 'approved', now(), now());
      
      -- Mark the pre-approved email as used
      UPDATE public.pre_approved_emails 
      SET used_at = now() 
      WHERE email = NEW.email AND used_at IS NULL;
    ELSE
      -- Create a pending MEMBER role for regular users (NOT ADMIN)
      INSERT INTO public.user_roles (user_id, role, status, requested_at)
      VALUES (NEW.id, 'member', 'pending', now());
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Update the handle_invited_user_registration function to only assign member role
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
  WHERE user_id = NEW.id;
  
  -- Only create MEMBER role if user was invited AND doesn't already have any roles
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

-- Create a function to manually assign admin roles (only callable by existing admins)
CREATE OR REPLACE FUNCTION public.assign_admin_role(target_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  -- Check if current user is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can assign admin roles';
  END IF;

  -- Insert admin role (user can have both member and admin roles if needed)
  INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at, approved_by)
  VALUES (target_user_id, 'admin', 'approved', now(), now(), auth.uid())
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$function$;