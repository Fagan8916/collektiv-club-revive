-- Fix security issue: Add RLS policies to public_member_profiles view
-- This prevents anonymous users from accessing member directory data

-- Enable RLS on the public_member_profiles view
ALTER TABLE public.public_member_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can view public member profiles
CREATE POLICY "Authenticated users can view public profiles" 
ON public.public_member_profiles 
FOR SELECT 
TO authenticated
USING (is_visible = true);

-- Policy: Block all anonymous access to member profiles
CREATE POLICY "Block anonymous access to public profiles" 
ON public.public_member_profiles 
FOR ALL 
TO anon
USING (false);