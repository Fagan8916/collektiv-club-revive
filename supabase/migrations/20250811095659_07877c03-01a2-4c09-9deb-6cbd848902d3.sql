
-- 1) Add anonymity fields to member_profiles
ALTER TABLE public.member_profiles
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS is_anonymous boolean NOT NULL DEFAULT false;

-- 2) Add anonymity fields to member_profile_submissions
ALTER TABLE public.member_profile_submissions
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS is_anonymous boolean NOT NULL DEFAULT false;

-- 3) Update approve_member_submission to propagate anonymity fields
CREATE OR REPLACE FUNCTION public.approve_member_submission(submission_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  submission_record public.member_profile_submissions%ROWTYPE;
BEGIN
  -- Check if user has admin role
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can approve submissions';
  END IF;

  -- Get the submission
  SELECT * INTO submission_record
  FROM public.member_profile_submissions
  WHERE id = submission_id AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Submission not found or already processed';
  END IF;

  -- Insert or update the member profile, now including anonymity fields
  INSERT INTO public.member_profiles (
    user_id, first_name, full_name, bio, profile_image_url, company, position,
    linkedin_url, website_url, location, expertise, services_offered, is_anonymous, is_visible
  ) VALUES (
    submission_record.user_id,
    submission_record.first_name,
    submission_record.full_name,
    submission_record.bio,
    submission_record.profile_image_url,
    submission_record.company,
    submission_record.position,
    submission_record.linkedin_url,
    submission_record.website_url,
    submission_record.location,
    submission_record.expertise,
    submission_record.services_offered,
    COALESCE(submission_record.is_anonymous, false),
    true
  )
  ON CONFLICT (user_id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    full_name = EXCLUDED.full_name,
    bio = EXCLUDED.bio,
    profile_image_url = EXCLUDED.profile_image_url,
    company = EXCLUDED.company,
    position = EXCLUDED.position,
    linkedin_url = EXCLUDED.linkedin_url,
    website_url = EXCLUDED.website_url,
    location = EXCLUDED.location,
    expertise = EXCLUDED.expertise,
    services_offered = EXCLUDED.services_offered,
    is_anonymous = EXCLUDED.is_anonymous,
    is_visible = true,
    updated_at = now();

  -- Update submission status
  UPDATE public.member_profile_submissions
  SET status = 'approved',
      reviewed_at = now(),
      reviewed_by = auth.uid()
  WHERE id = submission_id;
END;
$function$;

-- 4) Admin helper to reassign a profile to a real user later (for manual imports)
CREATE OR REPLACE FUNCTION public.reassign_member_profile_user(p_profile_id uuid, p_new_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Only admins can reassign ownership
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can reassign profile ownership';
  END IF;

  UPDATE public.member_profiles
  SET user_id = p_new_user_id,
      updated_at = now()
  WHERE id = p_profile_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Profile not found';
  END IF;
END;
$function$;

-- NOTES for one-time manual profiles (for reference only):
-- You can insert a visible, anonymous placeholder profile NOW (before the user signs up).
-- Replace the VALUES with your data. This requires admin role due to RLS.
-- Example:
-- INSERT INTO public.member_profiles (
--   user_id, first_name, full_name, is_anonymous, is_visible, bio, company, position, linkedin_url, website_url, location, expertise, services_offered
-- ) VALUES (
--   gen_random_uuid(),            -- Placeholder user_id (to be reassigned later)
--   'Alex',                       -- first_name
--   'Alex Placeholder',           -- full_name (not shown in directory if is_anonymous = true)
--   true,                         -- is_anonymous
--   true,                         -- is_visible
--   'Early member imported manually',
--   NULL,
--   NULL,
--   NULL,
--   NULL,
--   'London, UK',
--   ARRAY['Fintech','Product'],
--   NULL
-- );
--
-- Later, after the person signs up and you have their auth user_id, reassign ownership:
-- select public.reassign_member_profile_user('<profile_id>', '<new_user_uuid>');
