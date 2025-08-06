import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

type MemberProfile = Tables<"member_profiles">;

const AdminProfileManager = () => {
  const [profiles, setProfiles] = useState<MemberProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState<MemberProfile | null>(null);
  const [editForm, setEditForm] = useState<Partial<MemberProfile>>({});

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from("member_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      toast.error("Failed to fetch member profiles");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (profile: MemberProfile) => {
    setEditingProfile(profile);
    setEditForm(profile);
  };

  const handleSaveProfile = async () => {
    if (!editingProfile) return;

    try {
      const { error } = await supabase
        .from("member_profiles")
        .update(editForm)
        .eq("id", editingProfile.id);

      if (error) throw error;
      
      toast.success("Profile updated successfully");
      setEditingProfile(null);
      fetchProfiles();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const toggleVisibility = async (profile: MemberProfile) => {
    try {
      const { error } = await supabase
        .from("member_profiles")
        .update({ is_visible: !profile.is_visible })
        .eq("id", profile.id);

      if (error) throw error;
      
      toast.success(`Profile ${!profile.is_visible ? 'made visible' : 'hidden'}`);
      fetchProfiles();
    } catch (error) {
      console.error("Error updating visibility:", error);
      toast.error("Failed to update profile visibility");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Member Profile Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading profiles...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Profile Management</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage all member profiles - edit details and control visibility
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={profile.profile_image_url || ""} />
                  <AvatarFallback>
                    {getInitials(profile.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{profile.full_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.position && profile.company
                      ? `${profile.position} at ${profile.company}`
                      : profile.position || profile.company || "No position"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {profile.location || "No location"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={profile.is_visible ? "default" : "secondary"}>
                  {profile.is_visible ? "Visible" : "Hidden"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleVisibility(profile)}
                >
                  {profile.is_visible ? "Hide" : "Show"}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClick(profile)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Profile: {profile.full_name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          value={editForm.full_name || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, full_name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editForm.bio || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, bio: e.target.value })
                          }
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={editForm.company || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, company: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          value={editForm.position || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, position: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editForm.location || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, location: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                        <Input
                          id="linkedin_url"
                          value={editForm.linkedin_url || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, linkedin_url: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="website_url">Website URL</Label>
                        <Input
                          id="website_url"
                          value={editForm.website_url || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, website_url: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="profile_image_url">Profile Image URL</Label>
                        <Input
                          id="profile_image_url"
                          value={editForm.profile_image_url || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, profile_image_url: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="services_offered">Services Offered</Label>
                        <Textarea
                          id="services_offered"
                          value={editForm.services_offered || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, services_offered: e.target.value })
                          }
                          rows={2}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setEditingProfile(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProfileManager;