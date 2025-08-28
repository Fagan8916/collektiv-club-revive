-- Fix the security definer issue by recreating the function as SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.can_see_full_profile(profile_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY INVOKER  -- Changed from SECURITY DEFINER to SECURITY INVOKER
 SET search_path TO ''     -- Added to prevent search path attacks
AS $function$
  -- Users can see their own full profile, admins can see all profiles
  SELECT auth.uid() = profile_user_id OR public.has_role(auth.uid(), 'admin');
$function$;