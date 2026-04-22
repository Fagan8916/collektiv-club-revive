-- Deals catalog (matches the columns in the admin's CSV)
CREATE TABLE public.investment_deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.investment_deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block anonymous access to deals"
  ON public.investment_deals FOR ALL TO anon
  USING (false);

CREATE POLICY "Approved members can view deals"
  ON public.investment_deals FOR SELECT TO authenticated
  USING (public.is_approved_member(auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert deals"
  ON public.investment_deals FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update deals"
  ON public.investment_deals FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete deals"
  ON public.investment_deals FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_investment_deals_updated_at
  BEFORE UPDATE ON public.investment_deals
  FOR EACH ROW EXECUTE FUNCTION public.set_announcements_updated_at();

-- Per-member ticket size for each deal
CREATE TABLE public.member_investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_slug text NOT NULL,
  email text NOT NULL,
  amount_pence bigint NOT NULL CHECK (amount_pence >= 0),
  currency text NOT NULL DEFAULT 'GBP',
  imported_at timestamptz NOT NULL DEFAULT now(),
  imported_by uuid
);

CREATE UNIQUE INDEX member_investments_deal_email_idx
  ON public.member_investments (deal_slug, lower(email));

CREATE INDEX member_investments_email_idx
  ON public.member_investments (lower(email));

ALTER TABLE public.member_investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block anonymous access to member investments"
  ON public.member_investments FOR ALL TO anon
  USING (false);

-- A logged-in user sees only their own rows (matched on lowercased email)
CREATE POLICY "Users can view their own investments"
  ON public.member_investments FOR SELECT TO authenticated
  USING (
    lower(email) = lower((SELECT email FROM auth.users WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can view all investments"
  ON public.member_investments FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert investments"
  ON public.member_investments FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update investments"
  ON public.member_investments FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete investments"
  ON public.member_investments FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed the deal catalog (slugs match those used in routes today)
INSERT INTO public.investment_deals (slug, name) VALUES
  ('anthropic', 'Anthropic'),
  ('kalshi', 'Kalshi'),
  ('propane', 'Propane'),
  ('loxa', 'Loxa'),
  ('pandektes', 'Pandektes'),
  ('beimpact', 'be/impact'),
  ('webel', 'Webel');