-- Update the handle_new_member trigger to properly split names
CREATE OR REPLACE FUNCTION public.handle_new_member()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  claimed_profile_id UUID;
  full_name_value TEXT;
  first_name_value TEXT;
BEGIN
  -- Get the full name from metadata
  full_name_value := COALESCE(NULLIF(trim(NEW.raw_user_meta_data->>'full_name'), ''), 'Member');
  
  -- Extract first name (first word before space)
  first_name_value := split_part(full_name_value, ' ', 1);
  
  -- First attempt to claim an existing profile by matching email with contact_email
  SELECT id INTO claimed_profile_id
  FROM public.member_profiles
  WHERE LOWER(contact_email) = LOWER(NEW.email)
    AND user_id IS NULL
  ORDER BY created_at ASC
  LIMIT 1;

  IF claimed_profile_id IS NOT NULL THEN
    -- Update the existing profile to assign it to this user
    UPDATE public.member_profiles
    SET user_id = NEW.id,
        updated_at = now()
    WHERE id = claimed_profile_id;
    
    RAISE NOTICE 'Profile % claimed by new user % with email %', claimed_profile_id, NEW.id, NEW.email;
  ELSE
    -- Create a new profile with both first_name and full_name properly set
    INSERT INTO public.member_profiles (user_id, first_name, full_name, bio)
    VALUES (
      NEW.id,
      first_name_value,
      full_name_value,
      'Member of the Collektiv Club'
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    RAISE NOTICE 'New profile created for user % with first_name: % and full_name: %', NEW.id, first_name_value, full_name_value;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Fix existing profiles: extract first_name from full_name where first_name is NULL
UPDATE public.member_profiles
SET first_name = split_part(full_name, ' ', 1),
    updated_at = now()
WHERE first_name IS NULL 
  AND full_name IS NOT NULL 
  AND full_name != '';