-- Add the user email to pre-approved emails as an admin (using service role)
INSERT INTO pre_approved_emails (email, added_by, notes)
VALUES ('fagan8916@aol.com', '00000000-0000-0000-0000-000000000000', 'Added for test user - manual admin approval');

-- Manually create the user role since the registration trigger didn't fire
INSERT INTO user_roles (user_id, role, status, approved_at, requested_at)
SELECT 'd58323e1-97ef-4547-a739-7a7e32bdc97b', 'member', 'approved', now(), now()
WHERE EXISTS (SELECT 1 FROM auth.users WHERE id = 'd58323e1-97ef-4547-a739-7a7e32bdc97b');