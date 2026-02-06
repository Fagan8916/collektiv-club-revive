-- Add full_name column to pre_approved_emails to store invited member names
ALTER TABLE public.pre_approved_emails 
ADD COLUMN IF NOT EXISTS full_name TEXT;