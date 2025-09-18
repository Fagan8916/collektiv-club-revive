-- Fix Stacey's profile to have correct anonymous setting
UPDATE public.member_profiles 
SET is_anonymous = false, 
    updated_at = now()
WHERE contact_email = 'staceyjfagan@gmail.com' 
  AND is_anonymous = true;