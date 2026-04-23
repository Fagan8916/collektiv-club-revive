-- Create deal_comments table for member questions and comments on deal memos
CREATE TABLE public.deal_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_slug TEXT NOT NULL,
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  body TEXT NOT NULL,
  parent_id UUID REFERENCES public.deal_comments(id) ON DELETE CASCADE,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_deal_comments_deal_slug ON public.deal_comments(deal_slug);
CREATE INDEX idx_deal_comments_parent_id ON public.deal_comments(parent_id);

ALTER TABLE public.deal_comments ENABLE ROW LEVEL SECURITY;

-- Approved members and admins can view non-hidden comments on published deals
CREATE POLICY "Approved members can view comments"
ON public.deal_comments
FOR SELECT
TO authenticated
USING (
  (is_hidden = false OR has_role(auth.uid(), 'admin'::app_role))
  AND (
    has_role(auth.uid(), 'admin'::app_role)
    OR (
      is_approved_member(auth.uid())
      AND EXISTS (
        SELECT 1 FROM public.investment_deals d
        WHERE d.slug = deal_comments.deal_slug AND d.is_published = true
      )
    )
  )
);

-- Approved members can insert their own comments on published deals
CREATE POLICY "Approved members can insert comments"
ON public.deal_comments
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND is_approved_member(auth.uid())
  AND EXISTS (
    SELECT 1 FROM public.investment_deals d
    WHERE d.slug = deal_comments.deal_slug AND d.is_published = true
  )
);

-- Users can update their own comments
CREATE POLICY "Users can update their own comments"
ON public.deal_comments
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Users can delete their own comments; admins can delete any
CREATE POLICY "Users and admins can delete comments"
ON public.deal_comments
FOR DELETE
TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- Admins can update any comment (e.g. hide)
CREATE POLICY "Admins can update any comment"
ON public.deal_comments
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Block anonymous access
CREATE POLICY "Block anonymous access to deal comments"
ON public.deal_comments
FOR ALL
TO anon
USING (false);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.set_deal_comments_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_deal_comments_updated_at
BEFORE UPDATE ON public.deal_comments
FOR EACH ROW
EXECUTE FUNCTION public.set_deal_comments_updated_at();