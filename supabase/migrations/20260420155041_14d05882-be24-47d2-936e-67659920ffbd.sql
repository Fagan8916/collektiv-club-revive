CREATE TABLE public.push_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  url TEXT,
  sent_by UUID NOT NULL,
  recipients INTEGER,
  onesignal_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.push_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view push notifications"
ON public.push_notifications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert push notifications"
ON public.push_notifications
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND auth.uid() = sent_by);

CREATE POLICY "Block anonymous access to push notifications"
ON public.push_notifications
FOR ALL
TO anon
USING (false);

CREATE INDEX idx_push_notifications_created_at ON public.push_notifications (created_at DESC);