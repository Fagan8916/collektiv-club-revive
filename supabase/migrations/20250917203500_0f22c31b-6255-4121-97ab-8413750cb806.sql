-- Update the handle_new_member function to first attempt profile claiming before creating a new generic profile
CREATE OR REPLACE FUNCTION public.handle_new_member()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  claimed_profile_id UUID;
BEGIN
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
    
    -- Log the claiming for debugging
    RAISE NOTICE 'Profile % claimed by new user % with email %', claimed_profile_id, NEW.id, NEW.email;
  ELSE
    -- Only create a new generic profile if no existing profile can be claimed
    INSERT INTO public.member_profiles (user_id, full_name, bio)
    VALUES (
      NEW.id, 
      COALESCE(NULLIF(trim(NEW.raw_user_meta_data->>'full_name'), ''), 'Member'),
      'Member of the Collektiv Club'
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Log the creation for debugging
    RAISE NOTICE 'New generic profile created for user % with email %', NEW.id, NEW.email;
  END IF;
  
  RETURN NEW;
END;
$function$;