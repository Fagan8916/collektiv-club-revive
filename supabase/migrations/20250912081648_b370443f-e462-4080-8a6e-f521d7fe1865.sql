-- Fix function search path security warnings
-- Add SET search_path = public to functions for security

-- Fix add_pre_approved_emails function
CREATE OR REPLACE FUNCTION public.add_pre_approved_emails(p_emails text[], p_notes text DEFAULT NULL::text)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  email_item TEXT;
  added_count INTEGER := 0;
BEGIN
  -- Check if user has admin role
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can add pre-approved emails';
  END IF;

  -- Insert each email, ignoring duplicates
  FOREACH email_item IN ARRAY p_emails
  LOOP
    BEGIN
      INSERT INTO public.pre_approved_emails (email, added_by, notes)
      VALUES (lower(trim(email_item)), auth.uid(), p_notes);
      added_count := added_count + 1;
    EXCEPTION 
      WHEN unique_violation THEN
        -- Email already exists, skip it
        CONTINUE;
    END;
  END LOOP;

  RETURN added_count;
END;
$function$;

-- Fix apply_preapproval_if_any function  
CREATE OR REPLACE FUNCTION public.apply_preapproval_if_any()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
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