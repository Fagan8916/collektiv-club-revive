
import React, { useState } from "react";
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
    console.log("ProfileSubmissionForm: Starting submission with data:", data);
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("ProfileSubmissionForm: Current user:", user?.id);
      
      if (!user) {
        console.error("ProfileSubmissionForm: No user found");
        toast({
          title: "Error",
          description: "You must be logged in to submit a profile.",
          variant: "destructive",
        });
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
          toast({
            title: "Submission already exists",
            description: "You have already submitted a profile for review.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        console.log("ProfileSubmissionForm: Submission successful");
        setHasSubmitted(true);
        toast({
          title: "Profile submitted successfully!",
          description: "Your profile has been submitted for admin review. You'll be notified once it's approved.",
        });
        form.reset();
        setExpertise([]);
      }
    } catch (error) {
      console.error("ProfileSubmissionForm: Unexpected error:", error);
      toast({
        title: "Error",
        description: "Failed to submit profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubmitted) {
    return <ProfileSubmissionSuccessScreen onSubmitAnother={() => setHasSubmitted(false)} />;
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
              disabled={isSubmitting}
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
