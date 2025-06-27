
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import ProfileSubmissionSuccessScreen from "./ProfileSubmissionSuccessScreen";
import ExpertiseManager from "./ExpertiseManager";
import ProfileFormFields from "./ProfileFormFields";

interface ProfileSubmissionData {
  full_name: string;
  bio: string;
  company?: string;
  position?: string;
  linkedin_url?: string;
  website_url?: string;
  location?: string;
  profile_image_url?: string;
  services_offered?: string;
}

const ProfileSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expertise, setExpertise] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasExistingSubmission, setHasExistingSubmission] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileSubmissionData>({
    defaultValues: {
      full_name: "",
      bio: "",
      company: "",
      position: "",
      linkedin_url: "",
      website_url: "",
      location: "",
      profile_image_url: "",
      services_offered: "",
    },
  });

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

      console.log("ProfileSubmissionForm: Submitting to database...");
      const { error } = await supabase
        .from("member_profile_submissions")
        .insert({
          user_id: user.id,
          full_name: data.full_name,
          bio: data.bio,
          company: data.company || null,
          position: data.position || null,
          linkedin_url: data.linkedin_url || null,
          website_url: data.website_url || null,
          location: data.location || null,
          profile_image_url: data.profile_image_url || null,
          services_offered: data.services_offered || null,
          expertise: expertise.length > 0 ? expertise : null,
        });

      if (error) {
        console.error("ProfileSubmissionForm: Database error:", error);
        
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
        setHasSubmitted(true);
        toast({
          title: "Profile Submitted Successfully!",
          description: "Your profile has been submitted for admin review. You'll be notified once it's approved.",
        });
        form.reset();
        setExpertise([]);
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
    return <ProfileSubmissionSuccessScreen onSubmitAnother={() => setHasSubmitted(false)} />;
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
            <ProfileFormFields form={form} />

            <ExpertiseManager 
              expertise={expertise}
              newSkill={newSkill}
              onNewSkillChange={setNewSkill}
              onAddSkill={addSkill}
              onRemoveSkill={removeSkill}
            />

            <Button 
              type="submit" 
              disabled={isSubmitting || hasExistingSubmission}
              className="w-full bg-collektiv-green hover:bg-collektiv-dark"
            >
              {isSubmitting ? "Submitting..." : "Submit Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSubmissionForm;
