-- Check if there are triggers on auth.users that might be interfering
-- The issue is likely that our registration functions are running during the invitation process
-- Let's check if we have triggers set up and potentially disable them during invite

-- First, let's see what triggers exist on auth.users
SELECT trigger_name, trigger_schema, event_object_table, action_timing, event_manipulation, action_statement
FROM information_schema.triggers 
WHERE event_object_schema = 'auth' AND event_object_table = 'users';