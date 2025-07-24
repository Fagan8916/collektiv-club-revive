-- Create a table to store pre-approved email addresses
CREATE TABLE public.pre_approved_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  added_by UUID NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  used_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on the pre-approved emails table
ALTER TABLE public.pre_approved_emails ENABLE ROW LEVEL SECURITY;

-- Create policies for pre-approved emails
CREATE POLICY "Admins can manage pre-approved emails" 
ON public.pre_approved_emails 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Update the user registration trigger to check for pre-approved emails
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  is_pre_approved BOOLEAN := FALSE;
BEGIN
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
  
  RETURN NEW;
END;
$function$;

-- Create a function for admins to bulk add pre-approved emails
CREATE OR REPLACE FUNCTION public.add_pre_approved_emails(p_emails TEXT[], p_notes TEXT DEFAULT NULL)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
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