ALTER TABLE public.investment_deals
  ADD COLUMN IF NOT EXISTS tagline text,
  ADD COLUMN IF NOT EXISTS logo_url text,
  ADD COLUMN IF NOT EXISTS website_url text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Active',
  ADD COLUMN IF NOT EXISTS round text,
  ADD COLUMN IF NOT EXISTS valuation text,
  ADD COLUMN IF NOT EXISTS ticket_min text,
  ADD COLUMN IF NOT EXISTS close_date date,
  ADD COLUMN IF NOT EXISTS overview text,
  ADD COLUMN IF NOT EXISTS memo text,
  ADD COLUMN IF NOT EXISTS recording_url text,
  ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS published_at timestamptz;

-- Drop the restrictive policy and replace with one that lets approved members
-- see only published deals (admins still see everything).
DROP POLICY IF EXISTS "Approved members can view deals" ON public.investment_deals;

CREATE POLICY "Approved members can view published deals"
  ON public.investment_deals FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
    OR (public.is_approved_member(auth.uid()) AND is_published = true)
  );