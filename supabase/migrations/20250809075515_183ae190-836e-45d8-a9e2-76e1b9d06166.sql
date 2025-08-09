-- Re-enable the triggers we disabled earlier
-- These are needed for proper user registration flow

-- Trigger to handle new user registration (creates member role)
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_registration();

-- Trigger to handle invited user registration (updates role status)  
CREATE OR REPLACE TRIGGER on_invited_user_registration
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_invited_user_registration();

-- Trigger to create member profile when user gets approved
CREATE OR REPLACE TRIGGER on_auth_user_created_member_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_member();