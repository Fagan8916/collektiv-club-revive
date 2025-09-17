import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useProfileMerge = () => {
  const mergeProfiles = async (
    sourceProfileId: string,
    targetProfileId: string,
    newUserId: string,
    profileData: {
      bio?: string;
      location?: string;
      contact_email?: string;
    }
  ) => {
    try {
      console.log('=== Profile Merge Operation ===');
      console.log('Source Profile ID:', sourceProfileId);
      console.log('Target Profile ID:', targetProfileId);
      console.log('New User ID:', newUserId);
      console.log('Profile Data:', profileData);

      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('Session error:', sessionError);
        toast.error("Authentication required. Please refresh and try again.");
        return null;
      }

      console.log('Calling admin-profile-merge edge function...');
      
      const { data, error } = await supabase.functions.invoke('admin-profile-merge', {
        body: {
          sourceProfileId,
          targetProfileId,
          newUserId,
          profileData,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error(`Profile merge failed: ${error.message}`);
        return null;
      }

      if (!data.success) {
        console.error('Operation failed:', data.error);
        toast.error(data.error || 'Profile merge failed');
        return null;
      }

      console.log('Profiles merged successfully via edge function');
      toast.success("Profiles merged successfully!");
      return data;

    } catch (error) {
      console.error('Profile merge error:', error);
      toast.error(`Failed to merge profiles: ${error.message}`);
      return null;
    }
  };

  return {
    mergeProfiles,
  };
};