import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useAdminOperations } from "@/hooks/useAdminOperations";
import { useProfileMerge } from "@/hooks/useProfileMerge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";
import ProfileImageUpload from "@/components/ProfileImageUpload";

type MemberProfile = Tables<"member_profiles">;

const AdminProfileManager = () => {
  const [profiles, setProfiles] = useState<MemberProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState<MemberProfile | null>(null);
  const [editForm, setEditForm] = useState<Partial<MemberProfile>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, session, loading: authLoading } = useAuth();
  const adminOperations = useAdminOperations();
  const { mergeProfiles } = useProfileMerge();

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
    setDialogOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!editingProfile) {
      console.error("No profile selected for editing");
      toast.error("No profile selected");
      return;
    }

    setSaving(true);
    
    try {
      const result = await adminOperations.updateProfile(editingProfile.id, editForm);
      
      if (result) {
        // Close dialog and reset state
        setEditingProfile(null);
        setEditForm({});
        setDialogOpen(false);
        
        // Refresh the profiles list
        await fetchProfiles();
      }
    } catch (error) {
      console.error("Unexpected error in handleSaveProfile:", error);
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = async (profile: MemberProfile) => {
    try {
      const result = await adminOperations.toggleVisibility(profile.id, !profile.is_visible);
      
      if (result) {
        // Refresh the profiles list
        await fetchProfiles();
      }
    } catch (error) {
      console.error("Unexpected error in toggleVisibility:", error);
    }
  };

  const handlePerryMerge = async (profile: MemberProfile) => {
    if (profile.full_name !== "Perry" || profile.first_name !== "Perry") {
      toast.error("This action is only for Perry's profile fix.");
      return;
    }

    const confirmed = window.confirm(
      "This will merge Perry's old profile data with his current account. Are you sure?"
    );
    
    if (!confirmed) return;

    try {
      setLoading(true);
      
      // Merge the old Perry profile (1c0a5817-4bbb-452a-936c-8387fd19891e) 
      // with the new account profile (c617f7bb-114c-49e0-894e-272242d21a8e)
      const result = await mergeProfiles(
        '1c0a5817-4bbb-452a-936c-8387fd19891e', // source (old Perry with data)
        'c617f7bb-114c-49e0-894e-272242d21a8e', // target (new "Member" profile to delete)
        '84f91dbe-b8e3-4f87-9940-2e4740b428f5', // new user ID (Perry's current account)
        {
          bio: 'Experienced technology and finance professional with expertise in angel investing and startup ecosystem development. Active member of the Collektiv Club investment community.',
          location: 'London, UK',
          contact_email: 'perryhake89@aol.co.uk'
        }
      );

      if (result) {
        await fetchProfiles(); // Refresh the list
        toast.success("Perry's profile has been successfully merged and fixed!");
      }
    } catch (error) {
      console.error('Error merging Perry\'s profile:', error);
      toast.error("Failed to merge Perry's profile. Please try again.");
    } finally {
      setLoading(false);
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
                    {getInitials(`${profile.first_name || ""} ${profile.full_name}`.trim())}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {profile.first_name ? `${profile.first_name} ${profile.full_name}` : profile.full_name}
                  </h3>
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
                {/* Perry-specific profile merge (temporary fix) */}
                {profile.full_name === "Perry" && profile.first_name === "Perry" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePerryMerge(profile)}
                    className="bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200"
                  >
                    Fix Perry's Profile
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleVisibility(profile)}
                >
                  {profile.is_visible ? "Hide" : "Show"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditClick(profile)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      {/* Single dialog for editing any profile */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit Profile: {editingProfile?.full_name || "Unknown"}
            </DialogTitle>
          </DialogHeader>
          {editingProfile && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={editForm.first_name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, first_name: e.target.value })
                  }
                  placeholder="e.g., Elliot"
                />
              </div>
              
              <div>
                <Label htmlFor="full_name">Last Name</Label>
                <Input
                  id="full_name"
                  value={editForm.full_name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, full_name: e.target.value })
                  }
                  placeholder="e.g., henry"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Note: When First Name is set, this field should contain ONLY the last name
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_anonymous"
                  checked={editForm.is_anonymous || false}
                  onCheckedChange={(checked) => 
                    setEditForm({ ...editForm, is_anonymous: checked })
                  }
                />
                <Label htmlFor="is_anonymous">Anonymous Profile</Label>
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
                <ProfileImageUpload
                  currentImageUrl={editForm.profile_image_url || ""}
                  onImageUpload={(url) => setEditForm({ ...editForm, profile_image_url: url })}
                  userFullName={`${editForm.first_name || ""} ${editForm.full_name || "User"}`.trim()}
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
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingProfile(null);
                    setEditForm({});
                    setDialogOpen(false);
                  }}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveProfile}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminProfileManager;