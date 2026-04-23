-- Member events table
CREATE TABLE public.member_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  tagline TEXT,
  event_date DATE,
  event_date_label TEXT,
  event_time TEXT,
  location TEXT,
  attendees TEXT,
  description TEXT,
  paragraphs TEXT[] DEFAULT ARRAY[]::TEXT[],
  topics TEXT[] DEFAULT ARRAY[]::TEXT[],
  venue_notes TEXT,
  hero_image_url TEXT,
  gallery_images TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT NOT NULL DEFAULT 'upcoming',
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.member_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block anonymous access to member events"
  ON public.member_events
  FOR ALL
  TO anon
  USING (false);

CREATE POLICY "Admins can view all member events"
  ON public.member_events
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Approved members can view published events"
  ON public.member_events
  FOR SELECT
  TO authenticated
  USING ((is_published = true) AND (is_approved_member(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role)));

CREATE POLICY "Admins can insert member events"
  ON public.member_events
  FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND auth.uid() = created_by);

CREATE POLICY "Admins can update member events"
  ON public.member_events
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete member events"
  ON public.member_events
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_member_events_updated_at
  BEFORE UPDATE ON public.member_events
  FOR EACH ROW
  EXECUTE FUNCTION public.set_announcements_updated_at();

CREATE INDEX idx_member_events_status ON public.member_events(status);
CREATE INDEX idx_member_events_published ON public.member_events(is_published);

-- Storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view event images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'event-images');

CREATE POLICY "Admins can upload event images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'event-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update event images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'event-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete event images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'event-images' AND has_role(auth.uid(), 'admin'::app_role));