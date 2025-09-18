
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Switch } from "@/components/ui/switch";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import { normalizeUrl, isValidUrl } from "@/utils/urlUtils";

const profileSchema = z.object({
  first_name: z.string().optional(),
  full_name: z.string().min(2, "Last name must be at least 2 characters"),
  bio: z.string().optional(),
  profile_image_url: z.string().url().optional().or(z.literal("")),
  company: z.string().optional(),
  position: z.string().optional(),
  linkedin_url: z.string().optional().refine((val) => !val || isValidUrl(val), {
    message: "Please enter a valid LinkedIn URL"
  }),
  website_url: z.string().optional().refine((val) => !val || isValidUrl(val), {
    message: "Please enter a valid website URL"
  }),
  location: z.string().optional(),
  services_offered: z.string().optional(),
  is_anonymous: z.boolean().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileEditForm = () => {
  const { user, refreshSession } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      full_name: "",
      bio: "",
      profile_image_url: "",
      company: "",
      position: "",
      linkedin_url: "",
      website_url: "",
      location: "",
      services_offered: "",
      is_anonymous: false,
    },
  });

  useEffect(() => {
    const fetchExistingProfile = async () => {
      if (!user?.id) return;

      try {
        const { data: profile, error } = await supabase
          .from('member_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        if (profile) {
          setProfileExists(true);
          form.reset({
            first_name: profile.first_name || "",
            full_name: profile.full_name || "",
            bio: profile.bio || "",
            profile_image_url: profile.profile_image_url || "",
            company: profile.company || "",
            position: profile.position || "",
            linkedin_url: profile.linkedin_url || "",
            website_url: profile.website_url || "",
            location: profile.location || "",
            services_offered: profile.services_offered || "",
            is_anonymous: !!profile.is_anonymous,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchExistingProfile();
  }, [user, form]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      console.log("Starting profile update for user:", user.id);
      
      // Check and refresh authentication context before database operation
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session || !session.user) {
        console.error("No valid session found, attempting refresh...");
        
        // Attempt to refresh session
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshError || !refreshData.session) {
          console.error("Session refresh failed:", refreshError);
          toast({
            title: "Authentication Required",
            description: "Please log out and log back in to continue.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        console.log("Session refreshed successfully");
      }
      
      // Debug authentication context
      const { data: authDebug } = await supabase.rpc('debug_auth_context');
      console.log("Auth context debug:", authDebug?.[0]);
      
      if (!authDebug?.[0]?.session_exists) {
        console.error("auth.uid() is null - authentication context lost");
        toast({
          title: "Authentication Error", 
          description: "Session context lost. Please refresh the page and try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      const profileData = {
        user_id: user.id,
        first_name: data.first_name || null,
        full_name: data.full_name,
        bio: data.bio || null,
        profile_image_url: data.profile_image_url || null,
        company: data.company || null,
        position: data.position || null,
        linkedin_url: normalizeUrl(data.linkedin_url || "") || null,
        website_url: normalizeUrl(data.website_url || "") || null,
        location: data.location || null,
        services_offered: data.services_offered || null,
        is_anonymous: !!data.is_anonymous,
        is_visible: true,
      };

      const { error } = await supabase
        .from('member_profiles')
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) {
        console.error("Profile update error:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          userId: user.id,
          profileData
        });
        
        throw error;
      }

      console.log("Profile updated successfully for user:", user.id);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });

      setProfileExists(true);
    } catch (error: any) {
      console.error("Profile update failed:", error);
      
      // Enhanced error messages based on common RLS/database issues
      let errorMessage = "Failed to update profile. Please try again.";
      
      if (error?.code === '42501' || error?.message?.includes('policy')) {
        errorMessage = "Permission denied. Please try refreshing the page. If the issue persists, try logging out and back in.";
      } else if (error?.code === '23503') {
        errorMessage = "Authentication issue detected. Please refresh the page or log out and back in.";
      } else if (error?.message?.includes('JWT')) {
        errorMessage = "Session issue detected. Please refresh the page to continue.";
      }
      
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profileExists) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-collektiv-green">No Profile Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            You don't have a profile in our directory yet. Please submit a profile first using the "Submit Profile" tab.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-collektiv-green">Edit Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name (for anonymity)</FormLabel>
                    <FormControl>
                      <Input placeholder="Shown if you choose anonymity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_anonymous"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 rounded border p-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Show me anonymously in the directory</FormLabel>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Toggle anonymity"
                      />
                    </FormControl>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    When enabled, only your first name will be shown publicly in the directory. Admins can still see your full details.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ProfileImageUpload
              currentImageUrl={form.watch("profile_image_url") || ""}
              onImageUpload={(url) => form.setValue("profile_image_url", url)}
              userFullName={`${form.watch("first_name") || ""} ${form.watch("full_name") || "User"}`.trim()}
            />

            <FormField
              control={form.control}
              name="profile_image_url"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about yourself..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Your job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="services_offered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Services Offered to Other Members</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What services can you offer to fellow members? (e.g., consulting, mentorship, partnerships, etc.)"
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input placeholder="linkedin.com/in/your-profile or www.linkedin.com/in/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="www.yourwebsite.com or yourwebsite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-collektiv-green hover:bg-collektiv-dark text-white"
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileEditForm;
