-- Improve the profile claiming function to be more robust
CREATE OR REPLACE FUNCTION public.claim_member_profile()
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_email text;
  v_profile_id uuid;
  v_user_id uuid := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Must be authenticated';
  END IF;

  SELECT email INTO v_email
  FROM auth.users
  WHERE id = v_user_id;

  IF v_email IS NULL THEN
    RETURN NULL;
  END IF;

  -- Find a profile with matching contact_email (case insensitive)
  SELECT id
  INTO v_profile_id
  FROM public.member_profiles
  WHERE LOWER(contact_email) = LOWER(v_email)
    AND (user_id IS NULL OR user_id != v_user_id) -- Don't claim profiles already owned by this user
  ORDER BY created_at ASC
  LIMIT 1;

  IF NOT FOUND THEN
    -- Also try to find by email in auth.users table for any unclaimed profiles
    SELECT mp.id
    INTO v_profile_id
    FROM public.member_profiles mp
    JOIN auth.users au ON LOWER(au.email) = LOWER(v_email)
    WHERE mp.user_id IS NULL
    ORDER BY mp.created_at ASC
    LIMIT 1;
  END IF;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Update user_id to the current user
  UPDATE public.member_profiles
  SET user_id = v_user_id,
      updated_at = now()
  WHERE id = v_profile_id;

  -- Log the claiming for debugging
  RAISE NOTICE 'Profile % claimed by user % with email %', v_profile_id, v_user_id, v_email;

  RETURN v_profile_id;
END;
$function$;