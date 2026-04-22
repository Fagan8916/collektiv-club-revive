ALTER TABLE public.investment_deals
ADD COLUMN IF NOT EXISTS memo_pdf_path text;

INSERT INTO storage.buckets (id, name, public)
SELECT 'deal-logos', 'deal-logos', true
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'deal-logos'
);

INSERT INTO storage.buckets (id, name, public)
SELECT 'deal-memos', 'deal-memos', false
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'deal-memos'
);

DROP POLICY IF EXISTS "Public can view deal logos" ON storage.objects;
CREATE POLICY "Public can view deal logos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'deal-logos');

DROP POLICY IF EXISTS "Admins can upload deal logos" ON storage.objects;
CREATE POLICY "Admins can upload deal logos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'deal-logos'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Admins can update deal logos" ON storage.objects;
CREATE POLICY "Admins can update deal logos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'deal-logos'
  AND public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
  bucket_id = 'deal-logos'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Admins can delete deal logos" ON storage.objects;
CREATE POLICY "Admins can delete deal logos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'deal-logos'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Members can view deal memos" ON storage.objects;
CREATE POLICY "Members can view deal memos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'deal-memos'
  AND (
    public.is_approved_member(auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  )
);

DROP POLICY IF EXISTS "Admins can upload deal memos" ON storage.objects;
CREATE POLICY "Admins can upload deal memos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'deal-memos'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Admins can update deal memos" ON storage.objects;
CREATE POLICY "Admins can update deal memos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'deal-memos'
  AND public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
  bucket_id = 'deal-memos'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Admins can delete deal memos" ON storage.objects;
CREATE POLICY "Admins can delete deal memos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'deal-memos'
  AND public.has_role(auth.uid(), 'admin')
);