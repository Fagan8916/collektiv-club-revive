-- Fix profile editing issues for claimed profiles

-- 1. IMMEDIATE FIX: Update Ben Oak Ford's profile to set contact_email
UPDATE public.member_profiles 
SET contact_email = 'benoakford@gmail.com'
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'benoakford@gmail.com'
) AND contact_email IS NULL;

-- 2. RESTRUCTURE RLS POLICIES: Drop the conflicting policy
DROP POLICY IF EXISTS "Profile email claiming" ON public.member_profiles;

-- 3. CREATE NEW, MORE SPECIFIC CLAIMING POLICY that doesn't interfere with regular updates
-- This policy only allows claiming when the profile is truly unclaimed (user_id IS NULL)
CREATE POLICY "Enable profile claiming by email match" 
ON public.member_profiles 
FOR UPDATE 
USING (
  -- Allow claiming only when profile is unclaimed
  user_id IS NULL 
  AND contact_email IS NOT NULL 
  AND contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
)
WITH CHECK (
  -- After claiming, the user_id should be set to the authenticated user
  user_id = auth.uid()
);

-- 4. ADD POLICY: Allow users to update their contact_email to their auth email
-- This ensures users can always set their contact_email to match their auth email
CREATE POLICY "Users can set contact_email to their auth email" 
ON public.member_profiles 
FOR UPDATE 
USING (
  auth.uid() = user_id
)
WITH CHECK (
  auth.uid() = user_id 
  AND (
    contact_email IS NULL 
    OR contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
  )
);

-- 5. UPDATE claim_member_profile function to properly set contact_email
CREATE OR REPLACE FUNCTION public.claim_member_profile()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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

  -- Update user_id AND ensure contact_email is set to the user's auth email
  UPDATE public.member_profiles
  SET user_id = v_user_id,
      contact_email = v_email, -- CRITICAL: Set contact_email to prevent RLS issues
      updated_at = now()
  WHERE id = v_profile_id;

  -- Log the claiming for debugging
  RAISE NOTICE 'Profile % claimed by user % with email %, contact_email set to %', v_profile_id, v_user_id, v_email, v_email;

  RETURN v_profile_id;
END;
$function$;

-- 6. VERIFICATION: Check Ben Oak Ford's profile is fixed
DO $$
DECLARE
  profile_record RECORD;
BEGIN
  SELECT id, user_id, full_name, contact_email, is_visible 
  INTO profile_record
  FROM public.member_profiles 
  WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'benoakford@gmail.com');
  
  IF FOUND THEN
    RAISE NOTICE 'Ben Oak Ford profile fixed: id=%, contact_email=%, is_visible=%', 
      profile_record.id, profile_record.contact_email, profile_record.is_visible;
  ELSE
    RAISE NOTICE 'Ben Oak Ford profile not found';
  END IF;
END $$;