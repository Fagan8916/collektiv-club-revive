-- Fix RLS policies that are causing "permission denied for table users" errors
-- Handle dependencies properly by dropping policies first

-- Drop all policies that depend on functions we need to recreate
DROP POLICY IF EXISTS "Members can view basic profile info" ON public.member_profiles;
DROP POLICY IF EXISTS "Users and admins can view full profiles" ON public.member_profiles;
DROP POLICY IF EXISTS "Admins can insert any profile" ON public.member_profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.member_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.member_profiles;
DROP POLICY IF EXISTS "User can claim profile by email" ON public.member_profiles;

-- Now we can safely drop and recreate the function
DROP FUNCTION IF EXISTS public.can_see_full_profile(uuid);

-- Create a simpler admin check function
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

-- Recreate can_see_full_profile with simpler logic that avoids auth.users access
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

-- Update has_role function to be more explicit about status check
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

-- Now recreate all the policies with cleaner logic
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

CREATE POLICY "Members can view basic profile info" 
ON public.member_profiles 
FOR SELECT 
TO authenticated
USING (is_visible = true AND NOT public.can_see_full_profile(user_id));

CREATE POLICY "Users and admins can view full profiles" 
ON public.member_profiles 
FOR SELECT 
TO authenticated
USING (public.can_see_full_profile(user_id));

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