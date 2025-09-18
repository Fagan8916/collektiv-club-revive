-- Fix Ben Oak Ford's profile issues - handle duplicates correctly

-- 1. FIRST: Delete the generic profile that has Ben's user_id but wrong data
DELETE FROM public.member_profiles 
WHERE id = '3bfcd97e-1e58-4c10-b370-8097dd0af83f' -- The generic "Member" profile
  AND user_id = '958e58f1-377b-4815-8aff-ef2100903701'
  AND full_name = 'Member';

-- 2. NOW: Update the real profile to assign Ben's user_id (now that it's free)
UPDATE public.member_profiles 
SET user_id = '958e58f1-377b-4815-8aff-ef2100903701' -- Ben's correct user_id
WHERE id = '25514579-1523-4876-9c22-896e1e92e025' -- The real profile with his data
  AND contact_email = 'benoakford@gmail.com'
  AND full_name = 'Oakford';

-- 3. RESTRUCTURE RLS POLICIES: Drop the conflicting policy that was causing edit issues
DROP POLICY IF EXISTS "Profile email claiming" ON public.member_profiles;

-- 4. CREATE NEW, SPECIFIC CLAIMING POLICY that only applies during claiming, not editing
CREATE POLICY "Enable profile claiming by email match" 
ON public.member_profiles 
FOR UPDATE 
USING (
  -- Only allow claiming when profile is unclaimed AND user's email matches
  user_id IS NULL 
  AND contact_email IS NOT NULL 
  AND contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
)
WITH CHECK (
  -- After claiming, the user_id should be set to the authenticated user
  user_id = auth.uid()
);

-- 5. UPDATE the claim function to be more robust
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

  -- Find a profile with matching contact_email that is unclaimed
  SELECT id
  INTO v_profile_id
  FROM public.member_profiles
  WHERE LOWER(contact_email) = LOWER(v_email)
    AND user_id IS NULL -- Only unclaimed profiles
  ORDER BY created_at ASC
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Claim the profile
  UPDATE public.member_profiles
  SET user_id = v_user_id,
      updated_at = now()
  WHERE id = v_profile_id;

  RAISE NOTICE 'Profile % claimed by user % with email %', v_profile_id, v_user_id, v_email;
  RETURN v_profile_id;
END;
$function$;

-- 6. VERIFICATION: Confirm Ben's profile is now correct
DO $$
DECLARE
  profile_count INTEGER;
  profile_record RECORD;
BEGIN
  SELECT COUNT(*) INTO profile_count
  FROM public.member_profiles 
  WHERE user_id = '958e58f1-377b-4815-8aff-ef2100903701';
  
  SELECT id, user_id, full_name, contact_email, is_visible 
  INTO profile_record
  FROM public.member_profiles 
  WHERE user_id = '958e58f1-377b-4815-8aff-ef2100903701';
  
  RAISE NOTICE 'Ben Oak Ford fixed: profiles=%, id=%, name=%, email=%, visible=%', 
    profile_count, profile_record.id, profile_record.full_name, profile_record.contact_email, profile_record.is_visible;
END $$;