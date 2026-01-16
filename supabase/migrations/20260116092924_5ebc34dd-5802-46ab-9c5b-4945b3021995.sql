-- Approve kev@collektiv.club member access
UPDATE public.user_roles 
SET status = 'approved', approved_at = now()
WHERE user_id = '63550a58-c8e8-4bc0-8ea8-a44d92048ee8' 
  AND role = 'member';

-- Add to pre_approved_emails for record-keeping
INSERT INTO public.pre_approved_emails (email, notes, used_at, added_by)
VALUES ('kev@collektiv.club', 'Manually approved - Jan 2026', now(), '63550a58-c8e8-4bc0-8ea8-a44d92048ee8')
ON CONFLICT (email) DO NOTHING;