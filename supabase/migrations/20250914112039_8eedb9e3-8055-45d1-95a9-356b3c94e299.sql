-- Fix the can_see_full_profile function to handle NULL auth.uid() properly
CREATE OR REPLACE FUNCTION public.can_see_full_profile(profile_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  SELECT COALESCE(
    auth.uid() = profile_user_id OR public.has_role(auth.uid(), 'admin'), 
    false
  );
$function$