-- Drop the problematic RLS policy that queries auth.users directly
-- This policy is causing "permission denied for table users" errors
DROP POLICY IF EXISTS "Enable profile claiming by email match" ON public.member_profiles;