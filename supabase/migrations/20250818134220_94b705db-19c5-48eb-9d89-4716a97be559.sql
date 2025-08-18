-- 1) Add contact_email to member_profiles and unique index (allowing multiple NULLs)
ALTER TABLE public.member_profiles
  ADD COLUMN IF NOT EXISTS contact_email text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND indexname = 'member_profiles_contact_email_key'
  ) THEN
    CREATE UNIQUE INDEX member_profiles_contact_email_key
      ON public.member_profiles (contact_email)
      WHERE contact_email IS NOT NULL;
  END IF;
END$$;

-- 2) Temporarily remove the foreign key constraint to allow placeholder user_ids
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'member_profiles_user_id_fkey' 
    AND table_name = 'member_profiles'
  ) THEN
    ALTER TABLE public.member_profiles DROP CONSTRAINT member_profiles_user_id_fkey;
  END IF;
END$$;

-- 3) Allow authenticated users to "claim" a preloaded profile by matching email.
DROP POLICY IF EXISTS "User can claim profile by email" ON public.member_profiles;
CREATE POLICY "User can claim profile by email"
  ON public.member_profiles
  FOR UPDATE
  TO authenticated
  USING (
    contact_email IS NOT NULL
    AND contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    AND user_id <> auth.uid()
  )
  WITH CHECK (
    user_id = auth.uid()
  );

-- 4) Function to claim a preloaded profile by the currently authenticated user
CREATE OR REPLACE FUNCTION public.claim_member_profile()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  v_email text;
  v_profile_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Must be authenticated';
  END IF;

  SELECT email INTO v_email
  FROM auth.users
  WHERE id = auth.uid();

  IF v_email IS NULL THEN
    RETURN NULL;
  END IF;

  -- Find a profile with matching contact_email
  SELECT id
  INTO v_profile_id
  FROM public.member_profiles
  WHERE contact_email = v_email
  ORDER BY created_at ASC
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Update user_id to the current user. RLS policy above ensures this is permitted.
  UPDATE public.member_profiles
  SET user_id = auth.uid(),
      updated_at = now()
  WHERE id = v_profile_id;

  RETURN v_profile_id;
END;
$$;

-- 5) Pre-populate member profiles with visible public bios
INSERT INTO public.member_profiles (
  user_id, first_name, full_name, bio, linkedin_url, website_url,
  is_anonymous, is_visible, contact_email
) VALUES (
  gen_random_uuid(), 
  'Richard', 
  'Richard Barber',
  'Hi all, just joined the club and looking forward to see the potential deals come through. My LinkedIn is below if anyone wants to connect - https://www.linkedin.com/in/richardcgbarber?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  'https://www.linkedin.com/in/richardcgbarber?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  NULL,
  false, 
  true, 
  'richardcgbarber@gmail.com'
);

INSERT INTO public.member_profiles (
  user_id, first_name, full_name, bio, linkedin_url, website_url,
  is_anonymous, is_visible, contact_email
) VALUES (
  gen_random_uuid(), 
  'Richard', 
  'Richard Smith',
  'A very good morning everyone. I am Richard Smith, founder of formulatedigital.co.uk and remarkabledynamics.com plus co-founder of loxacover.com, nestopia.io and risktrace.co.uk. You can find me at https://www.linkedin.com/in/richardsmithtechnologist/. My background is in tech, I have been a software engineer for 30 years mostly in financial services. Very much looking forward to getting to know you all and investing/building and I hope selling some wonderful tech ventures! I am in London once or twice a week usually so would be great to meet up anytime.',
  'https://www.linkedin.com/in/richardsmithtechnologist/',
  'https://formulatedigital.co.uk',
  false, 
  true, 
  'richard@formulatedigital.co.uk'
);

INSERT INTO public.member_profiles (
  user_id, first_name, full_name, bio, linkedin_url, website_url,
  is_anonymous, is_visible, contact_email
) VALUES (
  gen_random_uuid(), 
  'Pavel', 
  'Pavel Kucera',
  'Hello, Collektiv! Hope you are all having a great Friday. I believe I have just been handed the newest member badge. I am Pavel from Czechia, living in Denmark (and still have not updated my Whatsapp number). My background is from software engineering in a few different companies, and then in improv & dancing salsa. If you would like to see what I sometimes write and think, here is my LinkedIn: https://www.linkedin.com/in/pavelkucera-cph/. I am pretty stoked about this Collektiv idea & what can come out of it!',
  'https://www.linkedin.com/in/pavelkucera-cph/',
  NULL,
  false, 
  true, 
  'pavel.kucera@hey.com'
);

INSERT INTO public.member_profiles (
  user_id, first_name, full_name, bio, linkedin_url, website_url,
  is_anonymous, is_visible, contact_email
) VALUES (
  gen_random_uuid(), 
  'Oliver', 
  'Oliver Bridal',
  'Morning all. My name is Ollie Bridal and I am start-up founder and corporate lawyer. Currently, I am: 1. Providing legal consultancy via my company Ara Law (www.aralaw.co.uk). I am focusing on providing advice to start-ups, scale-ups and their founders; and 2. Building my cyber security start-up, CloudPeek (www.cloudpeek.io). Look forward to being a part of the community and do get in touch if either of the above are of interest!',
  NULL,
  'https://www.aralaw.co.uk',
  false, 
  true, 
  'oliver@aralaw.co.uk'
);

INSERT INTO public.member_profiles (
  user_id, first_name, full_name, bio, linkedin_url, website_url,
  is_anonymous, is_visible, contact_email
) VALUES (
  gen_random_uuid(), 
  'Claire', 
  'Claire Adamou',
  'So great to be here and meet everyone. I am Claire Adamou, based out of the UK. This is my first week joining the Collektiv Club, so I am pleased to be part of what I hear is an incredible community and looking forward to future opportunities. If anyone would like to connect, this is my LinkedIn profile: https://www.linkedin.com/in/claire-adamou/',
  'https://www.linkedin.com/in/claire-adamou/',
  NULL,
  false, 
  true, 
  'claire@americanigamingsolutions.com'
);

INSERT INTO public.member_profiles (
  user_id, first_name, full_name, bio, linkedin_url, website_url,
  is_anonymous, is_visible, contact_email
) VALUES (
  gen_random_uuid(), 
  'Ben', 
  'Ben Davies',
  'Hey everyone just wanted to say hi. I am Ben and the founder of Aura, a GTM exec search firm. For the last 25 years I have worked with investor backed tech companies from seed funding through to late stage supporting them to hire their GTM leaders and teams. If I can help anyone in any way please just shout. www.aurasearch.co.uk',
  NULL,
  'https://www.aurasearch.co.uk',
  false, 
  true, 
  'ben@aurasearch.co.uk'
);

-- Anonymous visible stubs for all others
INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email) VALUES
(gen_random_uuid(), 'Sandra', 'Fagan', true, true, 'ssmith7609@aol.com'),
(gen_random_uuid(), 'Joscha', 'Lund', true, true, 'joscha.lund0@gmail.com'),
(gen_random_uuid(), 'Raj', 'Patel', true, true, 'raj.patel@edgworthpartners.com'),
(gen_random_uuid(), 'Perry', 'Hake', true, true, 'perryhake89@aol.co.uk'),
(gen_random_uuid(), 'Nicholas', 'West', true, true, 'nicholasbrookewest@gmail.com'),
(gen_random_uuid(), 'Jeremy', 'James', true, true, 'jeremyjameslevy@gmail.com'),
(gen_random_uuid(), 'Jana', 'Buechler', true, true, 'janabuechler@web.de'),
(gen_random_uuid(), 'Elea', 'Gatineau', true, true, 'elea.gatineau@gmail.com'),
(gen_random_uuid(), 'Alexandre', 'Doue', true, true, 'alexdoue2@gmail.com'),
(gen_random_uuid(), 'Julien', 'Ligato', true, true, 'ligato@orange.fr'),
(gen_random_uuid(), 'Kyle', 'McCullough', true, true, 'kmccullough@liftpower.com'),
(gen_random_uuid(), 'Stina', 'Karkkainen', true, true, 'stina.kar@gmail.com'),
(gen_random_uuid(), 'Ravi', 'Patel', true, true, 'ravipatel@live.co.uk'),
(gen_random_uuid(), 'Will', 'Ramsden', true, true, 'wjramsden@gmail.com'),
(gen_random_uuid(), 'Adam', 'Kosky', true, true, 'digibrainconsulting@gmail.com'),
(gen_random_uuid(), 'Benjamin', 'Oakford', true, true, 'benoakford@gmail.com'),
(gen_random_uuid(), 'Robert', 'Thomas', true, true, 'rthomass16@icloud.com'),
(gen_random_uuid(), 'Joakim', 'Karlsson', true, true, 'p.joakimkarlsson@gmail.com'),
(gen_random_uuid(), 'Sam', 'Moore', true, true, 'mooresam280@gmail.com'),
(gen_random_uuid(), 'Anthony', 'Abrahams', true, true, 'abelman199@gmail.com'),
(gen_random_uuid(), 'Bressac', 'Fannie', true, true, 'bfannie21@hotmail.fr'),
(gen_random_uuid(), 'Ben', 'Peers', true, true, 'benpeers13@gmail.com'),
(gen_random_uuid(), 'Emilia', 'Bayer', true, true, 'emilia@emiliab.com'),
(gen_random_uuid(), 'Donna', 'Lewis-wood', true, true, 'donna.lewis@hotmail.co.uk'),
(gen_random_uuid(), 'Nik', 'Harta', true, true, 'nik@yolocomms.com'),
(gen_random_uuid(), 'Natasha', 'Binnie', true, true, 'natashabinnie1996@gmail.com'),
(gen_random_uuid(), 'Pauline', 'Gibert', true, true, 'paulinee.gibert@gmail.com'),
(gen_random_uuid(), 'Mike', 'O''Callaghan', true, true, 'mike@moc.consulting'),
(gen_random_uuid(), 'Todd', 'Jenkins', true, true, 'toddjenkinsm@gmail.com'),
(gen_random_uuid(), 'Peter', 'Walker', true, true, 'peter@28-talent.com'),
(gen_random_uuid(), 'David', 'Packman', true, true, 'davidpackman@hotmail.co.uk'),
(gen_random_uuid(), 'Angela', 'Roche', true, true, 'angela@loveandlogic.co.uk'),
(gen_random_uuid(), 'Andrii', 'Zatserklianyi', true, true, 'azatserklaniy@gomage.co.uk'),
(gen_random_uuid(), 'Sally', 'Barker', true, true, 'sallyb1973@yahoo.co.uk'),
(gen_random_uuid(), 'Tarik', 'Ait Mohamed', true, true, 'tarik.ait.mohamed@gmail.com'),
(gen_random_uuid(), 'Dylan', 'Angloher', true, true, 'dylan@orchidea.digital'),
(gen_random_uuid(), 'Shakil', 'Ahmed', true, true, 'shakilinvests@gmail.com'),
(gen_random_uuid(), 'Ramzi', 'Al-Masri', true, true, 'ramzi@hexagonal-cfo.co.uk'),
(gen_random_uuid(), 'Stacey', 'Fagan', true, true, 'staceyjfagan@gmail.com');

-- Pre-approve all emails
WITH emails(email) AS (
  VALUES
    ('richardcgbarber@gmail.com'),
    ('richard@formulatedigital.co.uk'),
    ('pavel.kucera@hey.com'),
    ('oliver@aralaw.co.uk'),
    ('claire@americanigamingsolutions.com'),
    ('ben@aurasearch.co.uk'),
    ('ssmith7609@aol.com'),
    ('joscha.lund0@gmail.com'),
    ('raj.patel@edgworthpartners.com'),
    ('perryhake89@aol.co.uk'),
    ('nicholasbrookewest@gmail.com'),
    ('jeremyjameslevy@gmail.com'),
    ('janabuechler@web.de'),
    ('elea.gatineau@gmail.com'),
    ('alexdoue2@gmail.com'),
    ('ligato@orange.fr'),
    ('kmccullough@liftpower.com'),
    ('stina.kar@gmail.com'),
    ('ravipatel@live.co.uk'),
    ('wjramsden@gmail.com'),
    ('digibrainconsulting@gmail.com'),
    ('benoakford@gmail.com'),
    ('rthomass16@icloud.com'),
    ('p.joakimkarlsson@gmail.com'),
    ('mooresam280@gmail.com'),
    ('abelman199@gmail.com'),
    ('bfannie21@hotmail.fr'),
    ('benpeers13@gmail.com'),
    ('emilia@emiliab.com'),
    ('donna.lewis@hotmail.co.uk'),
    ('nik@yolocomms.com'),
    ('natashabinnie1996@gmail.com'),
    ('paulinee.gibert@gmail.com'),
    ('mike@moc.consulting'),
    ('toddjenkinsm@gmail.com'),
    ('fagan8916@gmail.com'),
    ('peter@28-talent.com'),
    ('davidpackman@hotmail.co.uk'),
    ('angela@loveandlogic.co.uk'),
    ('azatserklaniy@gomage.co.uk'),
    ('sallyb1973@yahoo.co.uk'),
    ('tarik.ait.mohamed@gmail.com'),
    ('dylan@orchidea.digital'),
    ('shakilinvests@gmail.com'),
    ('ramzi@hexagonal-cfo.co.uk'),
    ('staceyjfagan@gmail.com')
)
INSERT INTO public.pre_approved_emails (email, added_by, notes)
SELECT lower(trim(e.email)) as email,
       gen_random_uuid() as added_by,
       'Bulk import pre-approval'
FROM emails e
ON CONFLICT (email) DO NOTHING;