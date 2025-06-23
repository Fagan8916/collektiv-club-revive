
-- Create invitations table
CREATE TABLE public.invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  used_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id) NOT NULL
);

-- Add Row Level Security
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Only admins can view all invitations
CREATE POLICY "Admins can view all invitations" 
  ON public.invitations 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can create invitations
CREATE POLICY "Admins can create invitations" 
  ON public.invitations 
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete invitations
CREATE POLICY "Admins can delete invitations" 
  ON public.invitations 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to generate invitation codes
CREATE OR REPLACE FUNCTION public.create_invitation(p_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  invitation_code TEXT;
BEGIN
  -- Check if user has admin role
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can create invitations';
  END IF;

  -- Generate a random 8-character invitation code
  invitation_code := upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));

  -- Insert the invitation
  INSERT INTO public.invitations (email, code, created_by)
  VALUES (p_email, invitation_code, auth.uid());
END;
$$;

-- Update the user registration trigger to only create pending roles for invited users
DROP TRIGGER IF EXISTS on_auth_user_registration ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_invited_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only create member role if user was invited
  IF EXISTS (
    SELECT 1 FROM public.invitations 
    WHERE email = NEW.email AND used_at IS NOT NULL
  ) THEN
    INSERT INTO public.user_roles (user_id, role, status, approved_at, requested_at)
    VALUES (NEW.id, 'member', 'approved', now(), now());
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create new trigger for invited user registration
CREATE TRIGGER on_invited_user_registration
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_invited_user_registration();
