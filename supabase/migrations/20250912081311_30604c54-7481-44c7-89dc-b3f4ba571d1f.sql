-- Fix critical security issue: Remove unused public_member_profiles view
-- This view is flagged as a security risk and is not used by the application

-- Drop the public_member_profiles view to eliminate security risk
DROP VIEW IF EXISTS public.public_member_profiles;

-- The application uses member_profiles table directly with proper RLS policies
-- No replacement view is needed as this view is unused in the codebase