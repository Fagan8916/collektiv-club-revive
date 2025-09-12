-- Fix security issue: Replace public_member_profiles view with secure version
-- This prevents anonymous users from accessing member directory data

-- Drop the existing insecure view
DROP VIEW IF EXISTS public.public_member_profiles;

-- Create a new secure view that only works for authenticated users
CREATE VIEW public.public_member_profiles AS
SELECT 
    mp.id,
    CASE
        WHEN can_see_full_profile(mp.user_id) THEN mp.full_name
        WHEN mp.is_anonymous THEN COALESCE(NULLIF(TRIM(BOTH FROM mp.first_name), ''::text), 'Member'::text)
        ELSE mp.full_name
    END AS display_name,
    CASE
        WHEN mp.is_anonymous THEN NULL::text
        ELSE mp.bio
    END AS bio,
    CASE
        WHEN mp.is_anonymous THEN NULL::text
        ELSE mp.profile_image_url
    END AS profile_image_url,
    CASE
        WHEN mp.is_anonymous THEN NULL::text
        ELSE mp.company
    END AS company,
    CASE
        WHEN mp.is_anonymous THEN NULL::text
        ELSE mp."position"
    END AS "position",
    CASE
        WHEN can_see_full_profile(mp.user_id) THEN mp.linkedin_url
        ELSE NULL::text
    END AS linkedin_url,
    CASE
        WHEN can_see_full_profile(mp.user_id) THEN mp.website_url
        ELSE NULL::text
    END AS website_url,
    CASE
        WHEN mp.is_anonymous THEN NULL::text
        ELSE mp.location
    END AS location,
    CASE
        WHEN mp.is_anonymous THEN NULL::text[]
        ELSE mp.expertise
    END AS expertise,
    CASE
        WHEN mp.is_anonymous THEN NULL::text
        ELSE mp.services_offered
    END AS services_offered,
    mp.is_anonymous,
    mp.is_visible,
    mp.created_at,
    mp.updated_at
FROM member_profiles mp
WHERE mp.is_visible = true 
  AND auth.uid() IS NOT NULL;  -- Only authenticated users can access this view