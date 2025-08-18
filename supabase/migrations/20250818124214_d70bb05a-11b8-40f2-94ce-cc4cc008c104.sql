
-- Ensure the profile-images bucket exists and is public
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'profile-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('profile-images', 'profile-images', true);
  ELSE
    UPDATE storage.buckets
    SET public = true
    WHERE id = 'profile-images' AND public IS DISTINCT FROM true;
  END IF;
END
$$;

-- Public can read files in the profile-images bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Public read profile-images'
  ) THEN
    CREATE POLICY "Public read profile-images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'profile-images');
  END IF;
END
$$;

-- Authenticated users can insert files only in their own folder: '<uid>/%'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Authenticated insert own files in profile-images'
  ) THEN
    CREATE POLICY "Authenticated insert own files in profile-images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (
      bucket_id = 'profile-images'
      AND auth.role() = 'authenticated'
      AND name LIKE auth.uid()::text || '/%'
    );
  END IF;
END
$$;

-- Authenticated users can update only their own files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Authenticated update own files in profile-images'
  ) THEN
    CREATE POLICY "Authenticated update own files in profile-images"
    ON storage.objects
    FOR UPDATE
    USING (
      bucket_id = 'profile-images'
      AND auth.role() = 'authenticated'
      AND name LIKE auth.uid()::text || '/%'
    )
    WITH CHECK (
      bucket_id = 'profile-images'
      AND auth.role() = 'authenticated'
      AND name LIKE auth.uid()::text || '/%'
    );
  END IF;
END
$$;

-- Authenticated users can delete only their own files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Authenticated delete own files in profile-images'
  ) THEN
    CREATE POLICY "Authenticated delete own files in profile-images"
    ON storage.objects
    FOR DELETE
    USING (
      bucket_id = 'profile-images'
      AND auth.role() = 'authenticated'
      AND name LIKE auth.uid()::text || '/%'
    );
  END IF;
END
$$;
