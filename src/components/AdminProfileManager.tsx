import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
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
import { normalizeUrl } from "@/utils/urlUtils";

type MemberProfile = Tables<"member_profiles">;

const AdminProfileManager = () => {
  const [profiles, setProfiles] = useState<MemberProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState<MemberProfile | null>(null);
  const [editForm, setEditForm] = useState<Partial<MemberProfile>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, session, loading: authLoading } = useAuth();

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

    // Check authentication state first
    if (!user || !session) {
      console.error("User not authenticated - user:", !!user, "session:", !!session);
      toast.error("Authentication required. Please refresh the page and try again.");
      return;
    }

    setSaving(true);
    
    try {
      console.log("=== Admin Profile Save Debug ===");
      console.log("Current user:", user?.id);
      console.log("Session valid:", !!session?.access_token);
      console.log("Editing profile:", editingProfile.id);
      console.log("Form data:", editForm);
      
      // Force session refresh to ensure we have valid tokens
      console.log("Refreshing session before save...");
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError) {
        console.error("Session refresh failed:", refreshError);
        toast.error("Session expired. Please refresh the page and try again.");
        return;
      }
      
      console.log("Session refreshed successfully");
      
      // Normalize URLs before saving
      const normalizedForm = {
        ...editForm,
        linkedin_url: normalizeUrl(editForm.linkedin_url || "") || null,
        website_url: normalizeUrl(editForm.website_url || "") || null,
      };

      console.log("Attempting to update profile with normalized data:", normalizedForm);
      
      const { data, error } = await supabase
        .from("member_profiles")
        .update(normalizedForm)
        .eq("id", editingProfile.id)
        .select();

      if (error) {
        console.error("=== Supabase Update Error ===");
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error details:", error.details);
        console.error("Error hint:", error.hint);
        
        // Provide specific error handling
        if (error.code === '42501' || error.message?.includes('permission denied')) {
          toast.error("Permission denied. Your admin session may have expired. Please refresh the page and try again.");
        } else if (error.code === 'PGRST116' || error.message?.includes('JWT')) {
          toast.error("Authentication token invalid. Please refresh the page and try again.");
        } else {
          toast.error(`Database error: ${error.message}`);
        }
        throw error;
      }
      
      console.log("Profile updated successfully:", data);
      toast.success("Profile updated successfully");
      
      // Close dialog and reset state
      setEditingProfile(null);
      setEditForm({});
      setDialogOpen(false);
      
      // Refresh the profiles list
      await fetchProfiles();
    } catch (error) {
      console.error("=== Complete Error Context ===");
      console.error("Error updating profile:", error);
      console.error("User authenticated:", !!user);
      console.error("Session present:", !!session);
      console.error("Profile ID:", editingProfile?.id);
      
      // Only show generic error if we haven't already shown a specific one
      if (!error.code) {
        toast.error(`Failed to update profile: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = async (profile: MemberProfile) => {
    // Check authentication state first
    if (!user || !session) {
      console.error("User not authenticated for visibility toggle");
      toast.error("Authentication required. Please refresh the page and try again.");
      return;
    }

    try {
      console.log("=== Toggle Visibility Debug ===");
      console.log("Current user:", user?.id);
      console.log("Profile ID:", profile.id);
      console.log("Current visibility:", profile.is_visible);
      
      const { error } = await supabase
        .from("member_profiles")
        .update({ is_visible: !profile.is_visible })
        .eq("id", profile.id);

      if (error) {
        console.error("Visibility toggle error:", error);
        if (error.code === '42501' || error.message?.includes('permission denied')) {
          toast.error("Permission denied. Your admin session may have expired. Please refresh the page and try again.");
        } else {
          toast.error(`Failed to update visibility: ${error.message}`);
        }
        throw error;
      }
      
      toast.success(`Profile ${!profile.is_visible ? 'made visible' : 'hidden'}`);
      fetchProfiles();
    } catch (error) {
      console.error("Error updating visibility:", error);
      // Error already handled above
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
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={editForm.full_name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, full_name: e.target.value })
                  }
                />
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
                  userFullName={editForm.full_name || "User"}
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