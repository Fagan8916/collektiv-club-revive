-- Ensure RLS is properly enabled on the invitations table
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies and recreate them with proper protection
DROP POLICY IF EXISTS "Admins can create invitations" ON public.invitations;
DROP POLICY IF EXISTS "Admins can delete invitations" ON public.invitations;
DROP POLICY IF EXISTS "Admins can view all invitations" ON public.invitations;

-- Create comprehensive RLS policies that explicitly block anonymous access
-- Only authenticated admin users can create invitations
CREATE POLICY "Admins can create invitations" 
ON public.invitations 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Only authenticated admin users can view invitations
CREATE POLICY "Admins can view all invitations" 
ON public.invitations 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only authenticated admin users can delete invitations
CREATE POLICY "Admins can delete invitations" 
ON public.invitations 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Explicitly deny all access to anonymous users
CREATE POLICY "Block anonymous access to invitations"
ON public.invitations
FOR ALL
TO anon
USING (false);

-- Also ensure the user_roles table has proper RLS protection
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own roles only
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Allow admins to view all roles
CREATE POLICY "Admins can view all user roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Block anonymous access to user roles
CREATE POLICY "Block anonymous access to user roles"
ON public.user_roles
FOR ALL
TO anon
USING (false);