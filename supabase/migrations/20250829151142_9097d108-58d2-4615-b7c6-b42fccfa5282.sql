-- Create function to apply pre-approval status after login
CREATE OR REPLACE FUNCTION public.apply_preapproval_if_any()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
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
    -- Check if the user's email is in the pre-approved list
    SELECT EXISTS (
      SELECT 1 FROM public.pre_approved_emails 
      WHERE email = NEW.email AND used_at IS NULL
    ) INTO is_pre_approved;

    IF is_pre_approved THEN
      -- Create approved MEMBER role for pre-approved users
      INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
      VALUES (NEW.id, 'member', 'approved', now(), now());
      
      -- Mark the pre-approved email as used
      UPDATE public.pre_approved_emails 
      SET used_at = now() 
      WHERE email = NEW.email AND used_at IS NULL;
    ELSE
      -- Create a pending MEMBER role for regular users
      INSERT INTO public.user_roles (user_id, role, status, requested_at)
      VALUES (NEW.id, 'member', 'pending', now());
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger for new user registration handling
CREATE OR REPLACE TRIGGER on_auth_user_created_registration
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.apply_preapproval_if_any();

-- Update the existing handle_new_member function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_member()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Only create a profile if one doesn't already exist
  INSERT INTO public.member_profiles (user_id, full_name, bio)
  VALUES (
    NEW.id, 
    COALESCE(NULLIF(trim(NEW.raw_user_meta_data->>'full_name'), ''), 'Member'),
    'Member of the Collektiv Club'
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$function$;