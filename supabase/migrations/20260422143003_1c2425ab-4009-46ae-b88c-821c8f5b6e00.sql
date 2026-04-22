DROP POLICY IF EXISTS "Users can view their own investments" ON public.member_investments;

CREATE POLICY "Users can view their own investments"
ON public.member_investments
FOR SELECT
TO authenticated
USING (
  lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
);