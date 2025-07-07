-- Add RLS policy to allow admins to insert member profiles for bulk import
CREATE POLICY "Admins can insert any profile" 
ON public.member_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));