-- Fix RLS policies that are causing "permission denied for table users" errors
-- The issue is complex policy evaluation that tries to access restricted tables

-- First, let's simplify the has_role function to ensure it doesn't cause issues
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

-- Create a simpler admin check function that doesn't rely on complex evaluations
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

-- Drop and recreate the problematic can_see_full_profile function with simpler logic
DROP FUNCTION IF EXISTS public.can_see_full_profile(uuid);

CREATE OR REPLACE FUNCTION public.can_see_full_profile(profile_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT COALESCE(
    auth.uid() = profile_user_id OR 
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND status = 'approved'
    ), 
    false
  )
$$;

-- Now let's update the member_profiles RLS policies to use simpler admin checks
-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Admins can insert any profile" ON public.member_profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.member_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.member_profiles;

-- Create new, simpler admin policies
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

-- Also fix any potential issues with the user claiming policy
DROP POLICY IF EXISTS "User can claim profile by email" ON public.member_profiles;

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