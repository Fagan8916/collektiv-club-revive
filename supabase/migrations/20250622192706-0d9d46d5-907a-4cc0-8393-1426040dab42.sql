
-- Add services_offered column to member_profiles table
ALTER TABLE public.member_profiles 
ADD COLUMN services_offered TEXT;

-- Add services_offered column to member_profile_submissions table  
ALTER TABLE public.member_profile_submissions 
ADD COLUMN services_offered TEXT;

-- Update the approve_member_submission function to handle the new column
CREATE OR REPLACE FUNCTION public.approve_member_submission(submission_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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

  -- Insert or update the member profile
  INSERT INTO public.member_profiles (
    user_id, full_name, bio, profile_image_url, company, position,
    linkedin_url, website_url, location, expertise, services_offered, is_visible
  ) VALUES (
    submission_record.user_id, submission_record.full_name, submission_record.bio,
    submission_record.profile_image_url, submission_record.company, submission_record.position,
    submission_record.linkedin_url, submission_record.website_url, submission_record.location,
    submission_record.expertise, submission_record.services_offered, true
  )
  ON CONFLICT (user_id) DO UPDATE SET
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
    is_visible = true,
    updated_at = now();

  -- Update submission status
  UPDATE public.member_profile_submissions 
  SET status = 'approved', 
      reviewed_at = now(), 
      reviewed_by = auth.uid()
  WHERE id = submission_id;
END;
$$;
