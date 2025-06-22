
-- Create a member profiles table for the directory
CREATE TABLE public.member_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  company TEXT,
  position TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  location TEXT,
  expertise TEXT[],
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for member profiles
CREATE POLICY "Members can view visible profiles" 
  ON public.member_profiles 
  FOR SELECT 
  USING (is_visible = true);

CREATE POLICY "Users can update their own profile" 
  ON public.member_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
  ON public.member_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create a function to automatically create a member profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_member()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.member_profiles (user_id, full_name, bio)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'Member of the Collektiv Club'
  );
  RETURN NEW;
END;
$$;

-- Create trigger to auto-create member profile
CREATE TRIGGER on_auth_user_created_member_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_member();
