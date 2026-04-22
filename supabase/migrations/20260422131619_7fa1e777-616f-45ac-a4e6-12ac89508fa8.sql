-- Create announcements table for member zone home
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  badge TEXT NOT NULL DEFAULT 'Announcement',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  href TEXT NOT NULL,
  cta TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved members can view active announcements"
ON public.announcements
FOR SELECT
TO authenticated
USING (
  is_active = true
  AND (public.is_approved_member(auth.uid()) OR public.has_role(auth.uid(), 'admin'::app_role))
);

CREATE POLICY "Admins can view all announcements"
ON public.announcements
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert announcements"
ON public.announcements
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND auth.uid() = created_by);

CREATE POLICY "Admins can update announcements"
ON public.announcements
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete announcements"
ON public.announcements
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Block anonymous access to announcements"
ON public.announcements
FOR ALL
TO anon
USING (false);

-- updated_at trigger function (scoped to this table)
CREATE OR REPLACE FUNCTION public.set_announcements_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW
EXECUTE FUNCTION public.set_announcements_updated_at();

CREATE INDEX idx_announcements_active_sort ON public.announcements (is_active, sort_order DESC, created_at DESC);