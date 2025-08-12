
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ProfileImageUpload from "@/components/ProfileImageUpload";

interface ProfileSubmissionData {
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
}

interface ProfileFormFieldsProps {
  form: UseFormReturn<ProfileSubmissionData>;
  isAnonymous?: boolean;
}

const ProfileFormFields = ({ form, isAnonymous }: ProfileFormFieldsProps) => {
  if (isAnonymous) {
    return null;
  }
  return (
    <>
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
    </>
  );
};

export default ProfileFormFields;
