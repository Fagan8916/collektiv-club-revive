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

-- 2) Allow authenticated users to "claim" a preloaded profile by matching email.
--    This policy allows updating a row only when the row's contact_email equals
--    the caller's auth email AND the updated row's user_id gets set to the caller's uid.
--    This is narrowly scoped to permit the claim flow. Admins still have their full policy.
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

-- 3) Function to claim a preloaded profile by the currently authenticated user
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

-- 4) Pre-populate member profiles from your list
-- Notes:
-- - Use gen_random_uuid() for placeholder user_id (not a foreign key).
-- - For anonymous profiles: first_name set; full_name = initcap(surname) or first_name if surname missing.
-- - For the 6 profiles with public bios/links: is_anonymous = false and is_visible = true; bio/link fields set.
-- - Skip inserting a new profile for Ryan (fagan8916@gmail.com) to avoid duplicates; he'll be pre-approved below.

-- Helper: insert visible, non-anonymous profile with optional links
INSERT INTO public.member_profiles (
  user_id, first_name, full_name, bio, linkedin_url, website_url,
  is_anonymous, is_visible, contact_email
) VALUES
  -- Richard Barber
  (gen_random_uuid(), 'Richard', 'Richard Barber',
   'Hi all, just joined the club and looking forward to see the potential deals come through. 

My LinkedIn is below if anyone wants to connect - 
https://www.linkedin.com/in/richardcgbarber?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
   'https://www.linkedin.com/in/richardcgbarber?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
   NULL,
   false, true, 'Richardcgbarber@gmail.com'),

  -- Richard Smith
  (gen_random_uuid(), 'Richard', 'Richard Smith',
   'A very good morning everyone.  I''m Richard Smith, founder of formulatedigital.co.uk and remarkabledynamics.com plus co-founder of loxacover.com, nestopia.io and risktrace.co.uk

You can find me at https://www.linkedin.com/in/richardsmithtechnologist/

My background is in tech, I''ve been a software engineer for 30 years mostly in financial services.

Very much looking forward to getting to know you all and investing/building and I hope *selling* some wonderful tech ventures!

I''m in London once or twice a week usually so would be great to meet up anytime.',
   'https://www.linkedin.com/in/richardsmithtechnologist/',
   'https://formulatedigital.co.uk',
   false, true, 'richard@formulatedigital.co.uk'),

  -- Pavel Kucera
  (gen_random_uuid(), 'Pavel', 'Pavel Kucera',
   'Hello, Collektiv! Hope you're all having a great Friday. I believe I have just been handed the "newest member" badge. I'm Pavel from Czechia, living in Denmark (and still haven't updated my Whatsapp number). My background is from software engineering in a few different companies, and then in improv & dancing salsa. If you'd like to see what I sometimes write and think, here's my LinkedIn: https://www.linkedin.com/in/pavelkucera-cph/

I'm pretty stoked about this Collektiv idea & what can come out of it 🤩',
   'https://www.linkedin.com/in/pavelkucera-cph/',
   NULL,
   false, true, 'pavel.kucera@hey.com'),

  -- Oliver Bridal (Ollie) - choose one website to display primarily
  (gen_random_uuid(), 'Oliver', 'Oliver Bridal',
   'Morning all. My name is Ollie Bridal 👋 I am start-up founder and corporate lawyer. Currently, I am: 

1. Providing legal consultancy via my company Ara Law (www.aralaw.co.uk). I'm focusing on providing advice to start-ups, scale-ups and their founders; and 

2. ⁠Building my cyber security start-up, CloudPeek (www.cloudpeek.io).  

Look forward to being a part of the community and do get in touch if either of the above are of interest!',
   NULL,
   'https://www.aralaw.co.uk',
   false, true, 'oliver@aralaw.co.uk'),

  -- Claire Adamou
  (gen_random_uuid(), 'Claire', 'Claire Adamou',
   'So great to be here and meet everyone. I am Claire Adamou, based out of the UK. This is my first week joining the Collektiv Club, so I am pleased to be part of what I hear is an incredible community and looking forward to future opportunities. If anyone would like to connect, this is my LinkedIn profile: https://www.linkedin.com/in/claire-adamou/',
   'https://www.linkedin.com/in/claire-adamou/',
   NULL,
   false, true, 'claire@americanigamingsolutions.com'),

  -- Ben Davies
  (gen_random_uuid(), 'Ben', 'Ben Davies',
   'Hey everyone just wanted to say hi. I'm Ben and the founder of Aura, a GTM exec search firm. For the last 25 years I've worked with investor backed tech companies from seed funding through to late stage supporting them to hire their GTM leaders and teams. If I can help anyone in any way please just shout. www.aurasearch.co.uk',
   NULL,
   'https://www.aurasearch.co.uk',
   false, true, 'ben@aurasearch.co.uk');

-- Anonymous visible stubs for all others (first_name shown, details hidden until they update)
-- Each as separate INSERT for clarity

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Sandra', 'Fagan', true, true, 'ssmith7609@aol.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Joscha', 'Lund', true, true, 'Joscha.lund0@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Raj', 'Patel', true, true, 'Raj.patel@edgworthpartners.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Perry', 'Hake', true, true, 'perryhake89@aol.co.uk');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Nicholas', 'West', true, true, 'Nicholasbrookewest@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Jeremy', 'James', true, true, 'Jeremyjameslevy@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Jana', 'Buechler', true, true, 'janabuechler@web.de');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Elea', 'Gatineau', true, true, 'Elea.gatineau@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Alexandre', 'Doue', true, true, 'Alexdoue2@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Julien', 'Ligato', true, true, 'ligato@orange.fr');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Kyle', 'McCullough', true, true, 'kmccullough@liftpower.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Stina', 'Karkkainen', true, true, 'stina.kar@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Ravi', 'Patel', true, true, 'ravipatel@live.co.uk');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Will', 'Ramsden', true, true, 'wjramsden@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Adam', 'Kosky', true, true, 'digibrainconsulting@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Benjamin', 'Oakford', true, true, 'Benoakford@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Robert', 'Thomas', true, true, 'rthomass16@icloud.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Joakim', 'Karlsson', true, true, 'P.joakimkarlsson@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Sam', 'Moore', true, true, 'mooresam280@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Anthony', 'Abrahams', true, true, 'abelman199@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Bressac', 'Fannie', true, true, 'Bfannie21@hotmail.fr');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Ben', 'Peers', true, true, 'benpeers13@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Emilia', 'Bayer', true, true, 'emilia@emiliab.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Donna', 'Lewis-wood', true, true, 'donna.lewis@hotmail.co.uk');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Nik', 'Harta', true, true, 'nik@yolocomms.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Natasha', 'Binnie', true, true, 'natashabinnie1996@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Pauline', 'Gibert', true, true, 'Paulinee.gibert@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Mike', 'O''Callaghan', true, true, 'mike@moc.consulting');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Todd', 'Jenkins', true, true, 'toddjenkinsm@gmail.com');

-- Skipping Ryan (fagan8916@gmail.com) to avoid duplicate with existing live profile

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Peter', 'Walker', true, true, 'peter@28-talent.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'David', 'Packman', true, true, 'Davidpackman@hotmail.co.uk');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Angela', 'Roche', true, true, 'angela@loveandlogic.co.uk');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Andrii', 'Zatserklianyi', true, true, 'azatserklaniy@gomage.co.uk');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Sally', 'Barker', true, true, 'sallyb1973@yahoo.co.uk');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Tarik', 'Ait Mohamed', true, true, 'tarik.ait.mohamed@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Dylan', 'Angloher', true, true, 'dylan@orchidea.digital');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Shakil', 'Ahmed', true, true, 'shakilinvests@gmail.com');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Ramzi', 'Al-Masri', true, true, 'ramzi@hexagonal-cfo.co.uk');

INSERT INTO public.member_profiles (user_id, first_name, full_name, is_anonymous, is_visible, contact_email)
VALUES (gen_random_uuid(), 'Stacey', 'Fagan', true, true, 'staceyjfagan@gmail.com');

-- 5) Pre-approve all emails so members are auto-approved when they register
--    Insert directly to avoid role checks inside the SECURITY DEFINER helper.
WITH emails(email) AS (
  VALUES
    ('Richardcgbarber@gmail.com'),
    ('richard@formulatedigital.co.uk'),
    ('pavel.kucera@hey.com'),
    ('oliver@aralaw.co.uk'),
    ('claire@americanigamingsolutions.com'),
    ('ben@aurasearch.co.uk'),
    ('ssmith7609@aol.com'),
    ('Joscha.lund0@gmail.com'),
    ('Raj.patel@edgworthpartners.com'),
    ('perryhake89@aol.co.uk'),
    ('Nicholasbrookewest@gmail.com'),
    ('Jeremyjameslevy@gmail.com'),
    ('janabuechler@web.de'),
    ('Elea.gatineau@gmail.com'),
    ('Alexdoue2@gmail.com'),
    ('ligato@orange.fr'),
    ('kmccullough@liftpower.com'),
    ('stina.kar@gmail.com'),
    ('ravipatel@live.co.uk'),
    ('wjramsden@gmail.com'),
    ('digibrainconsulting@gmail.com'),
    ('Benoakford@gmail.com'),
    ('rthomass16@icloud.com'),
    ('P.joakimkarlsson@gmail.com'),
    ('mooresam280@gmail.com'),
    ('abelman199@gmail.com'),
    ('Bfannie21@hotmail.fr'),
    ('benpeers13@gmail.com'),
    ('emilia@emiliab.com'),
    ('donna.lewis@hotmail.co.uk'),
    ('nik@yolocomms.com'),
    ('natashabinnie1996@gmail.com'),
    ('Paulinee.gibert@gmail.com'),
    ('mike@moc.consulting'),
    ('toddjenkinsm@gmail.com'),
    ('fagan8916@gmail.com'), -- Ryan (pre-approve but we skipped inserting a stub to avoid duplicate)
    ('peter@28-talent.com'),
    ('Davidpackman@hotmail.co.uk'),
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
       gen_random_uuid() as added_by,  -- placeholder; not used by app logic
       'Bulk import pre-approval'
FROM emails e
ON CONFLICT (email) DO NOTHING;