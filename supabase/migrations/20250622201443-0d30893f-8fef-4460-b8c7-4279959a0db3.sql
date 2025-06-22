
-- Add approval status to user_roles table and create approval workflow
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS requested_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id);

-- Create a function to handle new user registration (auto-create pending member role)
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Create a pending member role for new users
  INSERT INTO public.user_roles (user_id, role, status, requested_at)
  VALUES (NEW.id, 'member', 'pending', now());
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created_member_role ON auth.users;
CREATE TRIGGER on_auth_user_created_member_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_registration();

-- Create function to approve a user
CREATE OR REPLACE FUNCTION public.approve_user_membership(target_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can approve memberships';
  END IF;

  -- Update user role status to approved
  UPDATE public.user_roles 
  SET status = 'approved',
      approved_at = now(),
      approved_by = auth.uid()
  WHERE user_id = target_user_id 
    AND role = 'member' 
    AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found or already processed';
  END IF;
END;
$$;

-- Create function to check if user is approved member
CREATE OR REPLACE FUNCTION public.is_approved_member(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'member'
      AND status = 'approved'
  )
$$;
