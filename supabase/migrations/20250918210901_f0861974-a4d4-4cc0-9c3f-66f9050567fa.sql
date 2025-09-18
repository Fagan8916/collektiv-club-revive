-- Fix RLS policies for member_profiles to handle admin users properly
-- The issue is that admins are excluded from "Users own profiles" policy
-- but if "Admin full access" fails, they have no fallback

-- Drop the problematic policy that excludes admins
DROP POLICY IF EXISTS "Users own profiles" ON public.member_profiles;

-- Create a new policy that allows users (including admins) to manage their own profiles
CREATE POLICY "Users can manage own profiles" ON public.member_profiles
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Also create a function to debug auth context during profile updates
CREATE OR REPLACE FUNCTION public.debug_auth_context()
RETURNS TABLE(current_user_id uuid, session_exists boolean, is_admin boolean) 
LANGUAGE SQL 
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    auth.uid() as current_user_id,
    auth.uid() IS NOT NULL as session_exists,
    COALESCE(is_current_user_admin(), false) as is_admin;
$$;