-- Fix the duplicate trigger issue that's breaking email invitations
-- Remove the duplicate trigger that's calling handle_new_user_registration twice

DROP TRIGGER IF EXISTS on_auth_user_created_member_role ON auth.users;

-- Also ensure the invited user registration trigger is properly set up
-- The remaining trigger should handle both regular registration and invitations properly