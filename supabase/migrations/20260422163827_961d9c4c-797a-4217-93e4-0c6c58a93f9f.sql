-- 1. Table
CREATE TABLE public.deal_commitments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  deal_slug TEXT NOT NULL,
  amount_pence BIGINT NOT NULL CHECK (amount_pence > 0),
  currency TEXT NOT NULL DEFAULT 'GBP',
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  CONSTRAINT deal_commitments_status_check CHECK (status IN ('pending','confirmed','rejected','cancelled')),
  CONSTRAINT deal_commitments_unique_per_deal UNIQUE (user_id, deal_slug)
);

CREATE INDEX idx_deal_commitments_deal_slug ON public.deal_commitments(deal_slug);
CREATE INDEX idx_deal_commitments_user_id ON public.deal_commitments(user_id);

-- 2. updated_at trigger
CREATE OR REPLACE FUNCTION public.set_deal_commitments_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_deal_commitments_updated_at
BEFORE UPDATE ON public.deal_commitments
FOR EACH ROW
EXECUTE FUNCTION public.set_deal_commitments_updated_at();

-- 3. Auto-convert confirmed commitments into member_investments
CREATE OR REPLACE FUNCTION public.sync_confirmed_commitment_to_investment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'confirmed' AND (OLD.status IS DISTINCT FROM 'confirmed') THEN
    INSERT INTO public.member_investments (email, deal_slug, amount_pence, currency, imported_by)
    VALUES (lower(NEW.email), NEW.deal_slug, NEW.amount_pence, NEW.currency, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_sync_confirmed_commitment
AFTER UPDATE ON public.deal_commitments
FOR EACH ROW
EXECUTE FUNCTION public.sync_confirmed_commitment_to_investment();

-- 4. RLS
ALTER TABLE public.deal_commitments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block anonymous access to commitments"
ON public.deal_commitments
FOR ALL
TO anon
USING (false);

CREATE POLICY "Members can view their own commitments"
ON public.deal_commitments
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Approved members can insert their own commitments"
ON public.deal_commitments
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND public.is_approved_member(auth.uid())
  AND EXISTS (
    SELECT 1 FROM public.investment_deals d
    WHERE d.slug = deal_slug AND d.is_published = true
  )
);

CREATE POLICY "Admins can view all commitments"
ON public.deal_commitments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update commitments"
ON public.deal_commitments
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete commitments"
ON public.deal_commitments
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));