
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import ProfileSubmissionSuccessScreen from "./ProfileSubmissionSuccessScreen";
import ExpertiseManager from "./ExpertiseManager";
import ProfileFormFields from "./ProfileFormFields";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { normalizeUrl } from "@/utils/urlUtils";
import { useUserRole } from "@/hooks/useUserRole";

interface ProfileSubmissionData {
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

const ProfileSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expertise, setExpertise] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasExistingSubmission, setHasExistingSubmission] = useState(false);
  const [isAutoApproved, setIsAutoApproved] = useState(false);
  const { toast } = useToast();
  const { isApprovedMember, loading: roleLoading } = useUserRole();

  const form = useForm<ProfileSubmissionData>({
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
  
  // Check if user already has a submission
  useEffect(() => {
    const checkExistingSubmission = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("member_profile_submissions")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error checking existing submission:", error);
          return;
        }

        if (data) {
          setHasExistingSubmission(true);
        }
      } catch (error) {
        console.error("Error checking submission:", error);
      }
    };

    checkExistingSubmission();
  }, []);

  const addSkill = () => {
    if (newSkill.trim() && !expertise.includes(newSkill.trim())) {
      setExpertise([...expertise, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setExpertise(expertise.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = async (data: ProfileSubmissionData) => {
    if (isSubmitting || hasExistingSubmission) return;
    
    console.log("ProfileSubmissionForm: Starting submission with data:", data);
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("ProfileSubmissionForm: Current user:", user?.id);
      
      if (!user) {
        console.error("ProfileSubmissionForm: No user found");
        toast({
          title: "Authentication Error",
          description: "You must be logged in to submit a profile. Please log in and try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      console.log("ProfileSubmissionForm: Checking user approval status...");
      const anon = !!data.is_anonymous;
      
      // Validate required fields based on anonymity
      if (anon) {
        const first = (data.first_name || '').trim();
        if (!first) {
          toast({
            title: "First name required",
            description: "When anonymous, only your first name is required.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }
      const fullNameToStore = anon ? (data.first_name || '').trim() : (data.full_name || '').trim();
      if (!fullNameToStore) {
        toast({
          title: "Name required",
          description: "Please provide your name.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const payload = {
        user_id: user.id,
        first_name: (data.first_name || null),
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
      } as const;

      // Check if user is pre-approved and create profile directly
      if (isApprovedMember) {
        console.log("ProfileSubmissionForm: User is pre-approved, creating profile directly");
        
        const { error } = await supabase
          .from("member_profiles")
          .insert({
            ...payload,
            is_visible: true,
          });

        if (error) {
          console.error("ProfileSubmissionForm: Direct profile creation error:", error);
          
          if (error.code === '23505') {
            toast({
              title: "Profile Already Exists",
              description: "You already have a profile in our directory.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Profile Creation Failed",
              description: `Failed to create profile: ${error.message}. Please try again.`,
              variant: "destructive",
            });
          }
        } else {
          console.log("ProfileSubmissionForm: Direct profile creation successful");
          setIsAutoApproved(true);
          setHasSubmitted(true);
          toast({
            title: "Profile Created Successfully!",
            description: "Welcome to the member directory! Your profile is now live.",
          });
          form.reset();
          setExpertise([]);
        }
      } else {
        console.log("ProfileSubmissionForm: User not pre-approved, submitting for admin review");
        
        const { error } = await supabase
          .from("member_profile_submissions")
          .insert(payload);

        if (error) {
          console.error("ProfileSubmissionForm: Submission error:", error);
          
          if (error.code === '23505') {
            setHasExistingSubmission(true);
            toast({
              title: "Submission Already Exists",
              description: "You have already submitted a profile for review. Only one submission per user is allowed.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Submission Failed",
              description: `Failed to submit profile: ${error.message}. Please try again.`,
              variant: "destructive",
            });
          }
        } else {
          console.log("ProfileSubmissionForm: Submission successful");
          setIsAutoApproved(false);
          setHasSubmitted(true);
          toast({
            title: "Profile Submitted Successfully!",
            description: "Your profile has been submitted for admin review. You'll be notified once it's approved.",
          });
          form.reset();
          setExpertise([]);
        }
      }
    } catch (error) {
      console.error("ProfileSubmissionForm: Unexpected error:", error);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred while submitting your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubmitted) {
    return <ProfileSubmissionSuccessScreen isAutoApproved={isAutoApproved} />;
  }

  if (hasExistingSubmission) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-collektiv-green mb-2">Submission Already Exists</h3>
            <p className="text-gray-600 mb-4">
              You have already submitted a profile for review. Only one submission per user is allowed. 
              Your submission is currently being reviewed by our admin team.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-collektiv-green">Submit Your Profile</CardTitle>
        <p className="text-gray-600">
          Submit your profile to be featured in the member directory. All submissions require admin approval.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Anonymity controls first */}
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
            </div>

            {/* The rest of the profile fields (hidden when anonymous) */}
            {!isAnonymous && (
              <>
                <ProfileFormFields form={form as any} isAnonymous={isAnonymous} />

                <ExpertiseManager 
                  expertise={expertise}
                  newSkill={newSkill}
                  onNewSkillChange={setNewSkill}
                  onAddSkill={addSkill}
                  onRemoveSkill={removeSkill}
                />
              </>
            )}

            <Button 
              type="submit" 
              disabled={isSubmitting || hasExistingSubmission || roleLoading}
              className="w-full bg-collektiv-green hover:bg-collektiv-dark"
            >
              {isSubmitting ? "Submitting..." : roleLoading ? "Loading..." : "Submit Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSubmissionForm;
