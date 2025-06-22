
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, MapPin, Building2, Linkedin, Globe, Calendar, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type MemberProfileSubmission = Tables<"member_profile_submissions">;

const AdminSubmissionsManager = () => {
  const [submissions, setSubmissions] = useState<MemberProfileSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("member_profile_submissions")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch submissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const approveSubmission = async (submissionId: string) => {
    try {
      const { error } = await supabase.rpc("approve_member_submission", {
        submission_id: submissionId,
      });

      if (error) throw error;

      toast({
        title: "Submission approved",
        description: "The member profile has been approved and added to the directory.",
      });

      await fetchSubmissions();
    } catch (error) {
      console.error("Error approving submission:", error);
      toast({
        title: "Error",
        description: "Failed to approve submission.",
        variant: "destructive",
      });
    }
  };

  const rejectSubmission = async (submissionId: string) => {
    try {
      const notes = adminNotes[submissionId] || "";
      
      const { error } = await supabase
        .from("member_profile_submissions")
        .update({
          status: "rejected",
          reviewed_at: new Date().toISOString(),
          admin_notes: notes,
        })
        .eq("id", submissionId);

      if (error) throw error;

      toast({
        title: "Submission rejected",
        description: "The submission has been rejected.",
      });

      await fetchSubmissions();
    } catch (error) {
      console.error("Error rejecting submission:", error);
      toast({
        title: "Error",
        description: "Failed to reject submission.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No submissions found</h3>
          <p className="text-gray-500">All caught up! No pending member profile submissions.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-collektiv-green">Member Profile Submissions</h2>
        <Badge variant="outline">
          {submissions.filter(s => s.status === "pending").length} pending
        </Badge>
      </div>

      {submissions.map((submission) => (
        <Card key={submission.id} className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={submission.profile_image_url || ""} alt={submission.full_name} />
                  <AvatarFallback className="bg-collektiv-green text-white text-lg">
                    {getInitials(submission.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{submission.full_name}</CardTitle>
                  {submission.position && submission.company && (
                    <p className="text-sm text-gray-600 mt-1">
                      {submission.position} at {submission.company}
                    </p>
                  )}
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    Submitted {new Date(submission.submitted_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(submission.status || "pending")}>
                {submission.status || "pending"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {submission.bio && (
              <div>
                <h4 className="font-semibold mb-2">Bio</h4>
                <p className="text-sm text-gray-600">{submission.bio}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {submission.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-collektiv-green" />
                  {submission.location}
                </div>
              )}
              {submission.company && (
                <div className="flex items-center text-sm text-gray-600">
                  <Building2 className="h-4 w-4 mr-2 text-collektiv-green" />
                  {submission.company}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {submission.linkedin_url && (
                <a
                  href={submission.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {submission.website_url && (
                <a
                  href={submission.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>

            {submission.services_offered && (
              <div>
                <div className="flex items-center text-sm font-medium text-collektiv-green mb-2">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Services Offered
                </div>
                <p className="text-sm text-gray-600">{submission.services_offered}</p>
              </div>
            )}

            {submission.expertise && submission.expertise.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-1">
                  {submission.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {submission.admin_notes && (
              <div>
                <h4 className="font-semibold mb-2">Admin Notes</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {submission.admin_notes}
                </p>
              </div>
            )}

            {submission.status === "pending" && (
              <div className="border-t pt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Notes (optional)
                  </label>
                  <Textarea
                    placeholder="Add notes about this submission..."
                    value={adminNotes[submission.id] || ""}
                    onChange={(e) =>
                      setAdminNotes({
                        ...adminNotes,
                        [submission.id]: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => approveSubmission(submission.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => rejectSubmission(submission.id)}
                    variant="destructive"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminSubmissionsManager;
