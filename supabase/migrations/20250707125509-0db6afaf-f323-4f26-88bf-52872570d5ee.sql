-- Create a table for bulk imported members who don't have accounts yet
CREATE TABLE public.pending_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  notes TEXT DEFAULT 'Bulk imported member - pending account creation'
);

-- Enable RLS
ALTER TABLE public.pending_members ENABLE ROW LEVEL SECURITY;

-- Create policies for pending_members
CREATE POLICY "Admins can manage pending members" 
ON public.pending_members 
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));