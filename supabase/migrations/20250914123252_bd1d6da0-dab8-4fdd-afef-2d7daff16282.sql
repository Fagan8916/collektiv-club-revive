-- Fix RLS policies by completely rebuilding them with CASCADE to handle dependencies
-- This will ensure we have clean, working policies without permission issues

-- Drop all member_profiles policies with CASCADE to handle dependencies
DROP POLICY IF EXISTS "Admins can insert any profile" ON public.member_profiles CASCADE;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.member_profiles CASCADE;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.member_profiles CASCADE;
DROP POLICY IF EXISTS "Members can view basic profile info" ON public.member_profiles CASCADE;
DROP POLICY IF EXISTS "User can claim profile by email" ON public.member_profiles CASCADE;
DROP POLICY IF EXISTS "Users and admins can view full profiles" ON public.member_profiles CASCADE;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.member_profiles CASCADE;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.member_profiles CASCADE;

-- Drop functions with CASCADE to handle all dependencies
DROP FUNCTION IF EXISTS public.can_see_full_profile(uuid) CASCADE;

-- Create simplified admin check function that doesn't cause RLS issues
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT COALESCE(
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND status = 'approved'
    ), 
    false
  )
$$;

-- Recreate can_see_full_profile with direct admin check to avoid complex evaluation
CREATE OR REPLACE FUNCTION public.can_see_full_profile(profile_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT COALESCE(
    auth.uid() = profile_user_id OR public.is_current_user_admin(), 
    false
  )
$$;

-- Ensure has_role function is clean and explicit
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND status = 'approved'
  )
$$;

-- Now create all policies fresh with clear, simple logic

-- Admin policies - highest priority, simple checks
CREATE POLICY "Admins can insert any profile" 
ON public.member_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admins can update any profile" 
ON public.member_profiles 
FOR UPDATE 
TO authenticated
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admins can view all profiles" 
ON public.member_profiles 
FOR SELECT 
TO authenticated
USING (public.is_current_user_admin());

-- User own profile policies
CREATE POLICY "Users can insert their own profile" 
ON public.member_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.member_profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Profile viewing policies
CREATE POLICY "Users and admins can view full profiles" 
ON public.member_profiles 
FOR SELECT 
TO authenticated
USING (public.can_see_full_profile(user_id));

CREATE POLICY "Members can view basic profile info" 
ON public.member_profiles 
FOR SELECT 
TO authenticated
USING (is_visible = true AND NOT public.can_see_full_profile(user_id));

-- Profile claiming policy - simplified to avoid complex auth.users access
CREATE POLICY "User can claim profile by email" 
ON public.member_profiles 
FOR UPDATE 
TO authenticated
USING (
  contact_email IS NOT NULL 
  AND contact_email = (
    SELECT email FROM auth.users WHERE id = auth.uid()
  )::text 
  AND user_id != auth.uid()
)
WITH CHECK (user_id = auth.uid());