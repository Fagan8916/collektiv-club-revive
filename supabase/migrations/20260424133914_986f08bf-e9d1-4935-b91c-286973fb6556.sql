
CREATE TABLE public.deal_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_slug text NOT NULL,
  user_id uuid NOT NULL,
  viewer_email text,
  page_type text NOT NULL DEFAULT 'overview',
  viewed_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_deal_views_deal_slug ON public.deal_views (deal_slug);
CREATE INDEX idx_deal_views_user_id ON public.deal_views (user_id);
CREATE INDEX idx_deal_views_viewed_at ON public.deal_views (viewed_at DESC);

ALTER TABLE public.deal_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block anonymous access to deal views"
ON public.deal_views
FOR ALL
TO anon
USING (false);

CREATE POLICY "Approved members can record their own views"
ON public.deal_views
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND public.is_approved_member(auth.uid())
  AND EXISTS (
    SELECT 1 FROM public.investment_deals d
    WHERE d.slug = deal_views.deal_slug AND d.is_published = true
  )
);

CREATE POLICY "Users can view their own view history"
ON public.deal_views
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all deal views"
ON public.deal_views
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete deal views"
ON public.deal_views
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
