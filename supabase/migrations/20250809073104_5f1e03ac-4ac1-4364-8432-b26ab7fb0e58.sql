-- Let's temporarily disable our custom triggers to see if they're interfering
-- This will help us isolate if the issue is our functions or the SMTP config

-- Temporarily drop all our custom triggers to test
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_member_profile ON auth.users;
DROP TRIGGER IF EXISTS on_invited_user_registration ON auth.users;

-- We'll add them back once we confirm the invitation works