import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { normalizeUrl } from "@/utils/urlUtils";
import { Tables } from "@/integrations/supabase/types";

type MemberProfile = Tables<"member_profiles">;

export const useAdminOperations = () => {
  const updateProfile = async (profileId: string, updates: Partial<MemberProfile>) => {
    try {
      console.log('=== Admin Profile Update via Edge Function ===');
      console.log('Profile ID:', profileId);
      console.log('Updates:', updates);

      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('Session error:', sessionError);
        toast.error("Authentication required. Please refresh and try again.");
        return null;
      }

      // Normalize URLs
      const normalizedUpdates = {
        ...updates,
        linkedin_url: normalizeUrl(updates.linkedin_url || "") || null,
        website_url: normalizeUrl(updates.website_url || "") || null,
      };

      console.log('Calling admin-profile-operations edge function...');
      
      const { data, error } = await supabase.functions.invoke('admin-profile-operations', {
        body: {
          operation: 'updateProfile',
          profileId,
          updates: normalizedUpdates,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error(`Update failed: ${error.message}`);
        return null;
      }

      if (!data.success) {
        console.error('Operation failed:', data.error);
        toast.error(data.error || 'Update failed');
        return null;
      }

      console.log('Profile updated successfully via edge function');
      toast.success("Profile updated successfully!");
      return data.data;

    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(`Failed to update profile: ${error.message}`);
      return null;
    }
  };

  const toggleVisibility = async (profileId: string, isVisible: boolean) => {
    try {
      console.log('=== Admin Visibility Toggle via Edge Function ===');
      console.log('Profile ID:', profileId);
      console.log('New visibility:', isVisible);

      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('Session error:', sessionError);
        toast.error("Authentication required. Please refresh and try again.");
        return null;
      }

      console.log('Calling admin-profile-operations edge function...');
      
      const { data, error } = await supabase.functions.invoke('admin-profile-operations', {
        body: {
          operation: 'toggleVisibility',
          profileId,
          isVisible,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error(`Visibility update failed: ${error.message}`);
        return null;
      }

      if (!data.success) {
        console.error('Operation failed:', data.error);
        toast.error(data.error || 'Visibility update failed');
        return null;
      }

      console.log('Visibility updated successfully via edge function');
      toast.success(`Profile ${isVisible ? 'made visible' : 'hidden'} successfully!`);
      return data.data;

    } catch (error) {
      console.error('Toggle visibility error:', error);
      toast.error(`Failed to update visibility: ${error.message}`);
      return null;
    }
  };

  return {
    updateProfile,
    toggleVisibility,
  };
};