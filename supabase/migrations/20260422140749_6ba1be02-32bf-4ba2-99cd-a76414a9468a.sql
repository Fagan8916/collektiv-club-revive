-- Replace expression-based unique index with a plain unique constraint
-- so PostgREST upsert(onConflict: "deal_slug,email") works.
-- Emails are already normalized to lowercase before insert by the importer.

-- Normalize any existing data first
UPDATE public.member_investments SET email = lower(email) WHERE email <> lower(email);

-- Drop the old expression index
DROP INDEX IF EXISTS public.member_investments_deal_email_idx;

-- Add a real unique constraint on (deal_slug, email)
ALTER TABLE public.member_investments
  ADD CONSTRAINT member_investments_deal_email_key UNIQUE (deal_slug, email);