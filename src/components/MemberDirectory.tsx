
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Linkedin, Globe, User, Briefcase } from "lucide-react";

// Use the public view to avoid exposing sensitive fields
interface MemberPublicProfile {
  id: string | null;
  display_name: string | null;
  bio: string | null;
  profile_image_url: string | null;
  company: string | null;
  position: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  location: string | null;
  expertise: string[] | null;
  services_offered: string | null;
  is_anonymous: boolean | null;
}

const MemberDirectory = () => {
  const [members, setMembers] = useState<MemberPublicProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("public_member_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMembers((data as unknown as MemberPublicProfile[]) || []);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="rounded-full bg-gray-200 h-16 w-16"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {members.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No members found</h3>
            <p className="text-gray-500">Be the first to create your profile!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={(member.is_anonymous ? "" : (member.profile_image_url || ""))} alt={member.display_name || 'Member'} />
                    <AvatarFallback className="bg-collektiv-green text-white text-lg">
                      {getInitials((member.display_name || 'Member'))}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-collektiv-dark truncate">
                      {member.display_name || 'Member'}
                    </h3>
                    {!member.is_anonymous && member.position && member.company && (
                      <p className="text-sm text-gray-600 mb-2">
                        {member.position} at {member.company}
                      </p>
                    )}
                    {!member.is_anonymous && member.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {member.location}
                      </div>
                    )}
                  </div>
                </div>

                {member.bio && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                )}

                {member.services_offered && (
                  <div className="mb-4">
                    <div className="flex items-center text-sm font-medium text-collektiv-green mb-2">
                      <Briefcase className="h-4 w-4 mr-1" />
                      Services Offered
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {member.services_offered}
                    </p>
                  </div>
                )}

                {member.expertise && member.expertise.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {member.expertise.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.expertise.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3 pt-4 border-t">
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.website_url && (
                    <a
                      href={member.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                  {member.company && (
                    <div className="flex items-center text-gray-500">
                      <Building2 className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberDirectory;
