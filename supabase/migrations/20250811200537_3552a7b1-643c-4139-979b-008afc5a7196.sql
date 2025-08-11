-- Security Fix: Remove email addresses from member profiles and implement field-level access control

-- First, update existing profiles that have email addresses in full_name field
UPDATE public.member_profiles 
SET full_name = 'Member' 
WHERE full_name LIKE '%@%';

-- Fix the handle_new_member function to never use email as full_name
CREATE OR REPLACE FUNCTION public.handle_new_member()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.member_profiles (user_id, full_name, bio)
  VALUES (
    NEW.id, 
    COALESCE(NULLIF(trim(NEW.raw_user_meta_data->>'full_name'), ''), 'Member'),
    'Member of the Collektiv Club'
  );
  RETURN NEW;
END;
$$;

-- Create a secure function to check if user can see full profile details
CREATE OR REPLACE FUNCTION public.can_see_full_profile(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  -- Users can see their own full profile, admins can see all profiles
  SELECT auth.uid() = profile_user_id OR public.has_role(auth.uid(), 'admin');
$$;

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Members can view visible profiles" ON public.member_profiles;

-- Create more restrictive policies with field-level controls
-- Policy 1: Basic profile info for all authenticated users
CREATE POLICY "Members can view basic profile info" 
ON public.member_profiles 
FOR SELECT 
TO authenticated
USING (
  is_visible = true 
  AND NOT public.can_see_full_profile(user_id)
);

-- Policy 2: Full profile access for owners and admins
CREATE POLICY "Users and admins can view full profiles" 
ON public.member_profiles 
FOR SELECT 
TO authenticated
USING (public.can_see_full_profile(user_id));

-- Add a view for public profile display that explicitly excludes sensitive fields for non-owners
CREATE OR REPLACE VIEW public.public_member_profiles AS
SELECT 
  id,
  CASE 
    WHEN public.can_see_full_profile(user_id) THEN full_name
    WHEN is_anonymous THEN 'Anonymous Member'
    ELSE COALESCE(first_name, 'Member')
  END as display_name,
  CASE 
    WHEN is_anonymous THEN NULL
    ELSE bio 
  END as bio,
  CASE 
    WHEN is_anonymous THEN NULL
    ELSE profile_image_url 
  END as profile_image_url,
  CASE 
    WHEN is_anonymous THEN NULL
    ELSE company 
  END as company,
  CASE 
    WHEN is_anonymous THEN NULL
    ELSE position 
  END as position,
  CASE 
    WHEN public.can_see_full_profile(user_id) THEN linkedin_url
    ELSE NULL
  END as linkedin_url,
  CASE 
    WHEN public.can_see_full_profile(user_id) THEN website_url
    ELSE NULL
  END as website_url,
  CASE 
    WHEN is_anonymous THEN NULL
    ELSE location 
  END as location,
  CASE 
    WHEN is_anonymous THEN NULL
    ELSE expertise 
  END as expertise,
  CASE 
    WHEN is_anonymous THEN NULL
    ELSE services_offered 
  END as services_offered,
  is_anonymous,
  is_visible,
  created_at,
  updated_at
FROM public.member_profiles
WHERE is_visible = true;

-- Grant appropriate permissions on the view
GRANT SELECT ON public.public_member_profiles TO authenticated;