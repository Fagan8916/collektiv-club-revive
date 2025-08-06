-- Add RLS policy to allow admins to update any member profile
CREATE POLICY "Admins can update any profile" 
ON public.member_profiles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add RLS policy to allow admins to view all profiles (including non-visible ones)
CREATE POLICY "Admins can view all profiles" 
ON public.member_profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));