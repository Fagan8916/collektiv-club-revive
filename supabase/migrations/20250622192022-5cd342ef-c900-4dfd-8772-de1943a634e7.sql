
-- Create a table for member profile submissions that need approval
CREATE TABLE public.member_profile_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  company TEXT,
  position TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  location TEXT,
  expertise TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- Add Row Level Security
ALTER TABLE public.member_profile_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for member profile submissions
CREATE POLICY "Users can view their own submission" 
  ON public.member_profile_submissions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submission" 
  ON public.member_profile_submissions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending submission" 
  ON public.member_profile_submissions 
  FOR UPDATE 
  USING (auth.uid() = user_id AND status = 'pending');

-- Create user roles enum and table for admin functionality
CREATE TYPE public.app_role AS ENUM ('admin', 'member');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admin policies for viewing and managing submissions
CREATE POLICY "Admins can view all submissions" 
  ON public.member_profile_submissions 
  FOR SELECT 
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all submissions" 
  ON public.member_profile_submissions 
  FOR UPDATE 
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to approve a submission and create/update the member profile
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
    linkedin_url, website_url, location, expertise, is_visible
  ) VALUES (
    submission_record.user_id, submission_record.full_name, submission_record.bio,
    submission_record.profile_image_url, submission_record.company, submission_record.position,
    submission_record.linkedin_url, submission_record.website_url, submission_record.location,
    submission_record.expertise, true
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
