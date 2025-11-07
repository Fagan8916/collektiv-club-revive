import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { normalizeUrl } from "@/utils/urlUtils";
import ExpertiseManager from "@/components/ExpertiseManager";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import { Loader2 } from "lucide-react";

interface ProfileData {
  first_name?: string;
  full_name: string;
  bio?: string;
  company?: string;
  position?: string;
  linkedin_url?: string;
  website_url?: string;
  location?: string;
  profile_image_url?: string;
  services_offered?: string;
  expertise?: string[];
  is_anonymous?: boolean;
}

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expertise, setExpertise] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [profileId, setProfileId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<ProfileData>({
    defaultValues: {
      first_name: "",
      full_name: "",
      bio: "",
      company: "",
      position: "",
      linkedin_url: "",
      website_url: "",
      location: "",
      profile_image_url: "",
      services_offered: "",
      is_anonymous: false,
    },
  });

  const isAnonymous = form.watch("is_anonymous");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to edit your profile.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("member_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error loading profile:", error);
        toast({
          title: "Error",
          description: "Failed to load your profile.",
          variant: "destructive",
        });
        return;
      }

      if (!profile) {
        toast({
          title: "No Profile Found",
          description: "You don't have a profile yet. Please create one first.",
          variant: "destructive",
        });
        navigate("/members/build-profile");
        return;
      }

      setProfileId(profile.id);
      form.reset({
        first_name: profile.first_name || "",
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        company: profile.company || "",
        position: profile.position || "",
        linkedin_url: profile.linkedin_url || "",
        website_url: profile.website_url || "",
        location: profile.location || "",
        profile_image_url: profile.profile_image_url || "",
        services_offered: profile.services_offered || "",
        is_anonymous: profile.is_anonymous || false,
      });

      if (profile.expertise && Array.isArray(profile.expertise)) {
        setExpertise(profile.expertise);
      }
    } catch (error) {
      console.error("Error in loadProfile:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !expertise.includes(newSkill.trim())) {
      setExpertise([...expertise, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setExpertise(expertise.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = async (data: ProfileData) => {
    if (!profileId) return;
    
    setIsSubmitting(true);
    
    try {
      const anon = !!data.is_anonymous;
      const fullNameToStore = anon ? (data.first_name || '').trim() : (data.full_name || '').trim();

      const payload = {
        first_name: data.first_name || null,
        full_name: fullNameToStore,
        bio: anon ? null : (data.bio || null),
        company: anon ? null : (data.company || null),
        position: anon ? null : (data.position || null),
        linkedin_url: anon ? null : (normalizeUrl(data.linkedin_url || "") || null),
        website_url: anon ? null : (normalizeUrl(data.website_url || "") || null),
        location: anon ? null : (data.location || null),
        profile_image_url: anon ? null : (data.profile_image_url || null),
        services_offered: anon ? null : (data.services_offered || null),
        expertise: anon ? null : (expertise.length > 0 ? expertise : null),
        is_anonymous: anon,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("member_profiles")
        .update(payload)
        .eq("id", profileId);

      if (error) {
        console.error("Error updating profile:", error);
        toast({
          title: "Update Failed",
          description: `Failed to update profile: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile Updated!",
          description: "Your profile has been updated successfully.",
        });
        navigate("/members");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-collektiv-green" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-collektiv-green">Edit Your Profile</CardTitle>
          <p className="text-gray-600">
            Update your profile information to keep your details current.
          </p>
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
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_anonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 rounded border p-4">
                      <div className="flex items-center justify-between">
                        <FormLabel>Show anonymously</FormLabel>
                        <FormControl>
                          <Switch
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Only your first name will be shown
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {!isAnonymous && (
                <>
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ProfileImageUpload
                    currentImageUrl={form.watch("profile_image_url") || ""}
                    onImageUpload={(url) => form.setValue("profile_image_url", url)}
                    userFullName={form.watch("full_name") || "User"}
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
                        <FormLabel>Services Offered</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What services can you offer to fellow members?"
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
                            <Input placeholder="https://linkedin.com/in/..." {...field} />
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
                            <Input placeholder="https://yourwebsite.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <ExpertiseManager 
                    expertise={expertise}
                    newSkill={newSkill}
                    onNewSkillChange={setNewSkill}
                    onAddSkill={addSkill}
                    onRemoveSkill={removeSkill}
                  />
                </>
              )}

              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/members")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-collektiv-green hover:bg-collektiv-dark"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
