
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, TrendingUp, Award } from "lucide-react";
import InvestmentsSection from "@/components/InvestmentsSection";
import MemberDirectory from "@/components/MemberDirectory";
import MemberEvents from "@/components/MemberEvents";
import ProfileSubmissionForm from "@/components/ProfileSubmissionForm";
import AdminSubmissionsManager from "@/components/AdminSubmissionsManager";
import MembershipManager from "@/components/MembershipManager";
import InvitationManager from "@/components/InvitationManager";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/hooks/useAuth";

const Members = () => {
  console.log('Members: Component rendering, current URL:', window.location.href);
  console.log('Members: Component rendering, current pathname:', window.location.pathname);
  
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, signOut } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();

  console.log('Members: Auth state - loading:', authLoading, 'authenticated:', isAuthenticated, 'user:', !!user);
  console.log('Members: Role state - roleLoading:', roleLoading, 'isAdmin:', isAdmin);

  // Redirect if not authenticated
  useEffect(() => {
    console.log('Members: Auth effect - authLoading:', authLoading, 'isAuthenticated:', isAuthenticated);
    if (!authLoading && !isAuthenticated) {
      console.log("Members: User not authenticated, redirecting to login");
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch user profile when user is available
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          const { data: profile, error } = await supabase
            .from('member_profiles')
            .select('full_name')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (error) {
            console.log("Error fetching profile:", error);
          } else {
            setUserProfile(profile);
          }
        } catch (error) {
          console.log("Profile fetch failed:", error);
          setUserProfile(null);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleLogout = async () => {
    console.log("Members: Logging out");
    await signOut();
    navigate("/");
  };

  // Extract first name from various sources
  const getDisplayName = () => {
    // First try member profile full_name
    if (userProfile?.full_name) {
      const firstName = userProfile.full_name.split(' ')[0];
      return firstName;
    }
    
    // Then try user metadata full_name (from Google SSO)
    if (user?.user_metadata?.full_name) {
      const firstName = user.user_metadata.full_name.split(' ')[0];
      return firstName;
    }
    
    // Then try user metadata name (alternative from Google SSO)
    if (user?.user_metadata?.name) {
      const firstName = user.user_metadata.name.split(' ')[0];
      return firstName;
    }
    
    // Fallback to email username
    return user?.email?.split('@')[0] || 'Member';
  };

  const stats = [
    {
      icon: Building2,
      title: "Active Investments",
      value: "4",
      description: "Current portfolio companies"
    },
    {
      icon: Users,
      title: "Club Members",
      value: "50+",
      description: "Growing community"
    },
    {
      icon: TrendingUp,
      title: "Total Deployed",
      value: "£500K+",
      description: "Capital invested to date"
    },
    {
      icon: Award,
      title: "Success Rate",
      value: "85%",
      description: "Positive returns"
    }
  ];

  // Show loading while checking auth and roles
  if (authLoading || roleLoading) {
    console.log('Members: Showing loading screen - authLoading:', authLoading, 'roleLoading:', roleLoading);
    return (
      <div className="min-h-screen bg-gradient-to-br from-collektiv-accent via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-collektiv-green"></div>
          <p className="mt-4 text-collektiv-green">Loading your member area...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show loading (redirect should happen via useEffect)
  if (!isAuthenticated) {
    console.log('Members: Not authenticated, showing redirect message');
    return (
      <div className="min-h-screen bg-gradient-to-br from-collektiv-accent via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-collektiv-green"></div>
          <p className="mt-4 text-collektiv-green">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  console.log('Members: Rendering main content');

  return (
    <div className="min-h-screen bg-gradient-to-br from-collektiv-accent via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-collektiv-green">
        <div className="absolute inset-0 bg-gradient-to-r from-collektiv-green to-collektiv-dark opacity-90"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {getDisplayName()}
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Your gateway to exclusive investments, community insights, and collaborative growth opportunities.
            </p>
            {isAdmin && (
              <div className="bg-yellow-500 text-black px-4 py-2 rounded-full inline-block mb-4">
                <span className="font-semibold">Admin Access - {user?.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <stat.icon className="mx-auto mb-4 h-8 w-8 text-collektiv-green" />
                <h3 className="text-2xl font-bold text-collektiv-dark mb-2">{stat.value}</h3>
                <p className="font-semibold text-gray-700 mb-1">{stat.title}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="investments" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className={`grid w-full max-w-fit ${isAdmin ? 'grid-cols-4' : 'grid-cols-3'} bg-white shadow-lg`}>
              <TabsTrigger value="investments" className="data-[state=active]:bg-collektiv-green data-[state=active]:text-white">
                Investments
              </TabsTrigger>
              <TabsTrigger value="directory" className="data-[state=active]:bg-collektiv-green data-[state=active]:text-white">
                Member Directory
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-collektiv-green data-[state=active]:text-white">
                Member Events
              </TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="admin" className="data-[state=active]:bg-collektiv-green data-[state=active]:text-white">
                  Admin
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <TabsContent value="investments" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-collektiv-green mb-4">Our Investment Portfolio</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our carefully curated portfolio of innovative companies that are shaping the future of their industries.
              </p>
            </div>
            <InvestmentsSection />
          </TabsContent>

          <TabsContent value="directory" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-collektiv-green mb-4">Member Directory</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect with fellow members of the Collektiv Club. Discover their expertise, background, and areas of interest.
              </p>
            </div>
            
            <Tabs defaultValue="view-directory" className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className={`bg-gray-100 ${isAdmin ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  <TabsTrigger value="view-directory">View Directory</TabsTrigger>
                  <TabsTrigger value="submit-profile">Submit Profile</TabsTrigger>
                  {isAdmin && (
                    <TabsTrigger value="profiles-to-review">Profiles to Review</TabsTrigger>
                  )}
                </TabsList>
              </div>
              
              <TabsContent value="view-directory">
                <MemberDirectory />
              </TabsContent>
              
              <TabsContent value="submit-profile">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-collektiv-green mb-4">Join the Directory</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Share your expertise and connect with other members by submitting your profile to our directory.
                  </p>
                </div>
                <ProfileSubmissionForm />
              </TabsContent>

              {isAdmin && (
                <TabsContent value="profiles-to-review">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-collektiv-green mb-4">Member Profile Submissions</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Review and approve member profile submissions for the directory.
                    </p>
                  </div>
                  <AdminSubmissionsManager />
                </TabsContent>
              )}
            </Tabs>
          </TabsContent>

          <TabsContent value="events" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-collektiv-green mb-4">Member Events</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay connected through exclusive networking events, workshops, and member gatherings designed to foster collaboration and growth.
              </p>
            </div>
            <MemberEvents />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin" className="space-y-8">
              <Tabs defaultValue="invitations" className="w-full">
                <div className="flex justify-center mb-6">
                  <TabsList className="bg-gray-100">
                    <TabsTrigger value="invitations">Manage Invitations</TabsTrigger>
                    <TabsTrigger value="memberships">Membership Requests</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="invitations">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-collektiv-green mb-4">Invitation Management</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Create and manage invitation codes for new members to join the Collektiv Club.
                    </p>
                  </div>
                  <InvitationManager />
                </TabsContent>
                
                <TabsContent value="memberships">
                  <MembershipManager />
                </TabsContent>
              </Tabs>
            </TabsContent>
          )}
        </Tabs>

        {/* Logout Button */}
        <div className="text-center mt-12">
          <Button variant="outline" onClick={handleLogout} className="px-8 py-2">
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Members;
