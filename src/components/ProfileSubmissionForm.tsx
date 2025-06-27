
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-collektiv-green mb-2">Profile Submitted!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for submitting your profile. An admin will review it and you'll be notified once it's approved and added to the member directory.
            </p>
            <Button 
              onClick={() => setHasSubmitted(false)}
              variant="outline"
              className="mt-4"
            >
              Submit Another Profile
            </Button>
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
            <FormField
              control={form.control}
              name="full_name"
              rules={{ required: "Full name is required" }}
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

            <FormField
              control={form.control}
              name="profile_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/your-photo.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Areas of Expertise</FormLabel>
              <div className="flex gap-2 mt-2 mb-3">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button type="button" onClick={addSkill} size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {expertise.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

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
