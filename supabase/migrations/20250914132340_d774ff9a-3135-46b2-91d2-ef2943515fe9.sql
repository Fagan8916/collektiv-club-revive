-- Complete RLS policy rebuild to fix admin profile editing 403 errors
-- The issue is policy conflicts causing 403 even for admins

-- First disable RLS temporarily to ensure clean rebuild
ALTER TABLE public.member_profiles DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Admins can insert any profile" ON public.member_profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.member_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.member_profiles;
DROP POLICY IF EXISTS "Members can view basic profile info" ON public.member_profiles;
DROP POLICY IF EXISTS "User can claim profile by email" ON public.member_profiles;
DROP POLICY IF EXISTS "Users and admins can view full profiles" ON public.member_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.member_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.member_profiles;

-- Re-enable RLS
ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;

-- Create super simple admin policies that take precedence
CREATE POLICY "Admin full access" 
ON public.member_profiles 
FOR ALL 
TO authenticated
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());

-- User own profile policies (only when not admin)
CREATE POLICY "Users own profiles" 
ON public.member_profiles 
FOR ALL 
TO authenticated
USING (auth.uid() = user_id AND NOT public.is_current_user_admin())
WITH CHECK (auth.uid() = user_id AND NOT public.is_current_user_admin());

-- Public visibility for members (read only, non-admin, non-owner)
CREATE POLICY "Public profile visibility" 
ON public.member_profiles 
FOR SELECT 
TO authenticated
USING (
  is_visible = true 
  AND auth.uid() != user_id 
  AND NOT public.is_current_user_admin()
);

-- Simplified profile claiming (only for non-admins claiming unclaimed profiles)
CREATE POLICY "Profile email claiming" 
ON public.member_profiles 
FOR UPDATE 
TO authenticated
USING (
  contact_email IS NOT NULL 
  AND contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
  AND user_id != auth.uid()
  AND NOT public.is_current_user_admin()
)
WITH CHECK (
  user_id = auth.uid() 
  AND NOT public.is_current_user_admin()
);