-- Add pitch deck PDF storage path to deals
ALTER TABLE public.investment_deals
ADD COLUMN IF NOT EXISTS pitch_deck_pdf_path text;

-- Create a dedicated storage bucket for pitch decks (private; signed URLs)
INSERT INTO storage.buckets (id, name, public)
VALUES ('deal-pitch-decks', 'deal-pitch-decks', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: admins can upload/manage; approved members can read
DO $$
BEGIN
  -- Admin: full access on this bucket
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Admins manage pitch decks'
  ) THEN
    CREATE POLICY "Admins manage pitch decks"
    ON storage.objects
    FOR ALL
    TO authenticated
    USING (bucket_id = 'deal-pitch-decks' AND public.has_role(auth.uid(), 'admin'::public.app_role))
    WITH CHECK (bucket_id = 'deal-pitch-decks' AND public.has_role(auth.uid(), 'admin'::public.app_role));
  END IF;

  -- Approved members: read pitch decks
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Approved members read pitch decks'
  ) THEN
    CREATE POLICY "Approved members read pitch decks"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'deal-pitch-decks' AND public.is_approved_member(auth.uid()));
  END IF;
END $$;