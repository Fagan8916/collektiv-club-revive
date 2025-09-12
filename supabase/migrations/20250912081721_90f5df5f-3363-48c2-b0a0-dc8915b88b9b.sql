-- Fix remaining function search path security warnings
-- Add SET search_path = public to the remaining functions for security

-- Fix has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE 
 SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

-- Fix is_approved_member function
CREATE OR REPLACE FUNCTION public.is_approved_member(_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE 
 SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'member'
      AND status = 'approved'
  )
$function$;