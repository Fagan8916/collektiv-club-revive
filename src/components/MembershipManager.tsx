
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, Clock, Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MembershipRequest {
  id: string;
  user_id: string;
  role: string;
  status: string;
  requested_at: string;
  approved_at?: string;
  approved_by?: string;
  user_email?: string;
  user_metadata?: any;
}

const MembershipManager = () => {
  const [requests, setRequests] = useState<MembershipRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMembershipRequests();
  }, []);

  const fetchMembershipRequests = async () => {
    try {
      // First get the user roles data
      const { data: userRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*")
        .eq("role", "member")
        .order("requested_at", { ascending: false });

      if (rolesError) throw rolesError;

      // Then get user details for each request
      const requestsWithUserData = await Promise.all(
        (userRoles || []).map(async (role) => {
          try {
            const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(role.user_id);
            return {
              ...role,
              user_email: user?.email,
              user_metadata: user?.user_metadata,
            };
          } catch (error) {
            console.error("Error fetching user data:", error);
            return {
              ...role,
              user_email: "Unknown",
              user_metadata: {},
            };
          }
        })
      );

      setRequests(requestsWithUserData);
    } catch (error) {
      console.error("Error fetching membership requests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch membership requests.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const approveMembership = async (userId: string) => {
    try {
      const { error } = await supabase.rpc("approve_user_membership", {
        target_user_id: userId,
      });

      if (error) throw error;

      toast({
        title: "Membership approved",
        description: "The user has been granted access to the member area.",
      });

      await fetchMembershipRequests();
    } catch (error) {
      console.error("Error approving membership:", error);
      toast({
        title: "Error",
        description: "Failed to approve membership.",
        variant: "destructive",
      });
    }
  };

  const rejectMembership = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .update({
          status: "rejected",
          approved_at: new Date().toISOString(),
          approved_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .eq("user_id", userId)
        .eq("role", "member");

      if (error) throw error;

      toast({
        title: "Membership rejected",
        description: "The membership request has been rejected.",
      });

      await fetchMembershipRequests();
    } catch (error) {
      console.error("Error rejecting membership:", error);
      toast({
        title: "Error",
        description: "Failed to reject membership.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (email: string, metadata: any) => {
    if (metadata?.full_name) {
      return metadata.full_name
        .split(" ")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email?.slice(0, 2).toUpperCase() || "?";
  };

  const getDisplayName = (email: string, metadata: any) => {
    if (metadata?.full_name) return metadata.full_name;
    if (metadata?.name) return metadata.name;
    return email?.split("@")[0] || "Unknown User";
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

  const pendingRequests = requests.filter((req) => req.status === "pending");
  const processedRequests = requests.filter((req) => req.status !== "pending");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-collektiv-green">Membership Management</h2>
        <Badge variant="outline">
          {pendingRequests.length} pending
        </Badge>
      </div>

      {pendingRequests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Pending Requests</h3>
          {pendingRequests.map((request) => (
            <Card key={request.id} className="border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-collektiv-green text-white">
                        {getInitials(request.user_email || "", request.user_metadata || {})}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {getDisplayName(request.user_email || "", request.user_metadata || {})}
                      </h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail className="h-3 w-3 mr-1" />
                        {request.user_email}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Requested {new Date(request.requested_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(request.status)}>
                      <Clock className="h-3 w-3 mr-1" />
                      {request.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-3 mt-4 pt-4 border-t">
                  <Button
                    onClick={() => approveMembership(request.user_id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => rejectMembership(request.user_id)}
                    variant="destructive"
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {processedRequests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Decisions</h3>
          {processedRequests.slice(0, 5).map((request) => (
            <Card key={request.id} className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-gray-500 text-white text-sm">
                        {getInitials(request.user_email || "", request.user_metadata || {})}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {getDisplayName(request.user_email || "", request.user_metadata || {})}
                      </p>
                      <p className="text-sm text-gray-600">{request.user_email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                    {request.approved_at && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(request.approved_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {requests.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No membership requests</h3>
            <p className="text-gray-500">All membership requests will appear here for review.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MembershipManager;
