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
import ProfileEditForm from "@/components/ProfileEditForm";
import AdminSubmissionsManager from "@/components/AdminSubmissionsManager";
import AdminProfileManager from "@/components/AdminProfileManager";
import MembershipManager from "@/components/MembershipManager";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/hooks/useAuth";

const Members = () => {
  console.log('Members: Component rendering, current URL:', window.location.href);
  
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("investments");
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, signOut } = useAuth();
  const { isAdmin, isApprovedMember, loading: roleLoading } = useUserRole();

  console.log('Members: Auth state - loading:', authLoading, 'authenticated:', isAuthenticated, 'user:', !!user);

  // Redirect if not authenticated
  useEffect(() => {
    console.log('Members: Auth effect - authLoading:', authLoading, 'isAuthenticated:', isAuthenticated);
    if (!authLoading && !isAuthenticated) {
      const href = window.location.href;
      const hasAuthIndicators = /[?#&](access_token|refresh_token|code|provider_token|provider_refresh_token)=/.test(href) || href.includes('#access_token=');
      const inProgress = (() => { try { return sessionStorage.getItem('auth_in_progress') === '1'; } catch { return false; } })();
      if (hasAuthIndicators || inProgress) {
        console.log('Members: Auth indicators or in-progress flag detected, delaying redirect');
        return; // Wait for auth processing
      }
      console.log("Members: User not authenticated, redirecting to login");
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Redirect unapproved members to external membership signup (except for profile building)
  useEffect(() => {
    const currentPath = window.location.pathname;
    const isProfileBuildPath = currentPath.includes('/build-profile');
    
    if (!authLoading && !roleLoading && isAuthenticated && !isAdmin && !isApprovedMember && !isProfileBuildPath) {
      console.log('Members: User not approved, redirecting to external membership signup');
      window.location.href = 'https://collektiv.club/#/membership';
    }
  }, [isAuthenticated, authLoading, roleLoading, isAdmin, isApprovedMember, navigate]);

  // Fetch user profile when user is available
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          let displayProfile: any = null;
          const { data: profile, error: profileError } = await supabase
            .from('member_profiles')
            .select('full_name')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (profileError) {
            console.log("Error fetching profile:", profileError);
          } else {
            displayProfile = profile;
          }

          if (!displayProfile?.full_name) {
            const { data: submission, error: submissionError } = await supabase
              .from('member_profile_submissions')
              .select('full_name, submitted_at')
              .eq('user_id', user.id)
              .order('submitted_at', { ascending: false })
              .maybeSingle();
            if (submissionError) {
              console.log("Error fetching latest submission:", submissionError);
            } else if (submission?.full_name) {
              displayProfile = { full_name: submission.full_name };
            }
          }

          setUserProfile(displayProfile);
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
      value: "3",
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
      value: "£100K+",
      description: "Capital invested to date"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const isClickable = stat.title === "Club Members" || stat.title === "Active Investments" || stat.title === "Total Deployed";
            const CardComponent = isClickable ? "button" : "div";
            
            const handleClick = () => {
              if (stat.title === "Club Members") {
                setActiveTab('directory');
                setTimeout(() => {
                  const directorySection = document.querySelector('[data-state="active"][role="tabpanel"]');
                  if (directorySection) {
                    directorySection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              } else if (stat.title === "Active Investments" || stat.title === "Total Deployed") {
                setActiveTab('investments');
                setTimeout(() => {
                  const investmentsSection = document.querySelector('[data-state="active"][role="tabpanel"]');
                  if (investmentsSection) {
                    investmentsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }
            };
            
            return (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <CardComponent
                    className={`w-full ${isClickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                    onClick={isClickable ? handleClick : undefined}
                  >
                    <stat.icon className="mx-auto mb-4 h-8 w-8 text-collektiv-green" />
                    <h3 className="text-2xl font-bold text-collektiv-dark mb-2">{stat.value}</h3>
                    <p className="font-semibold text-gray-700 mb-1">{stat.title}</p>
                    <p className="text-sm text-gray-500">{stat.description}</p>
                  </CardComponent>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className={`grid h-auto w-full sm:max-w-3xl gap-2 p-1 rounded-md bg-transparent ${isAdmin ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
              <TabsTrigger value="investments" className="w-full whitespace-normal leading-snug text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white data-[state=active]:border-collektiv-green">
                Investments
              </TabsTrigger>
              <TabsTrigger value="directory" className="w-full whitespace-normal leading-snug text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white data-[state=active]:border-collektiv-green">
                Member Directory
              </TabsTrigger>
              <TabsTrigger value="events" className="w-full whitespace-normal leading-snug text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white data-[state=active]:border-collektiv-green">
                Member Events
              </TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="admin" className="w-full whitespace-normal leading-snug text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white data-[state=active]:border-collektiv-green">
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
                <TabsList className={`grid h-auto w-full sm:max-w-3xl gap-2 p-1 rounded-md bg-transparent ${isAdmin ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
                  <TabsTrigger value="view-directory" className="w-full whitespace-normal leading-snug text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white data-[state=active]:border-collektiv-green">View Directory</TabsTrigger>
                  <TabsTrigger value="edit-profile" className="w-full whitespace-normal leading-snug text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white data-[state=active]:border-collektiv-green">Edit Profile</TabsTrigger>
                  <TabsTrigger value="submit-profile" className="w-full whitespace-normal leading-snug text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white data-[state=active]:border-collektiv-green">Submit Profile</TabsTrigger>
                </TabsList>
               </div>
              
              <TabsContent value="view-directory">
                <MemberDirectory />
              </TabsContent>
              
              
              <TabsContent value="edit-profile">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-collektiv-green mb-4">Edit Your Profile</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Update your profile information in the member directory.
                  </p>
                </div>
                <ProfileEditForm />
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
              <Tabs defaultValue="membership" className="w-full">
                <div className="flex justify-center mb-6">
                  <TabsList className="grid h-auto w-full sm:max-w-4xl grid-cols-3 gap-2 p-1 rounded-md bg-transparent">
                    <TabsTrigger value="membership" className="w-full whitespace-normal leading-snug text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white data-[state=active]:border-collektiv-green">Membership</TabsTrigger>
                    <TabsTrigger value="profiles-to-review" className="w-full whitespace-normal leading-snug text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white data-[state=active]:border-collektiv-green">Profile Submissions</TabsTrigger>
                    <TabsTrigger value="profiles" className="w-full whitespace-normal leading-snug text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white data-[state=active]:border-collektiv-green">Manage Profiles</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="membership">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-collektiv-green mb-4">Membership Requests</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Review and approve pending membership applications.
                    </p>
                  </div>
                  <MembershipManager />
                </TabsContent>
                
                <TabsContent value="profiles-to-review">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-collektiv-green mb-4">Member Profile Submissions</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Review and approve member profile submissions for the directory.
                    </p>
                  </div>
                  <AdminSubmissionsManager />
                </TabsContent>
                
                <TabsContent value="profiles">
                  <AdminProfileManager />
                </TabsContent>
              </Tabs>
            </TabsContent>
          )}
        </Tabs>

        {/* Membership Benefits Section */}
        <div className="mt-16">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-collektiv-green mb-4">Membership Benefits</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore the exclusive benefits available to our members and investors.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="border-2 border-collektiv-green/20 hover:border-collektiv-green/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Award className="mx-auto mb-4 h-12 w-12 text-collektiv-green" />
                    <h3 className="text-xl font-bold text-collektiv-dark mb-4">Founder Benefits</h3>
                    <p className="text-gray-600 mb-6">
                      Comprehensive benefits package designed for entrepreneurs and founders.
                    </p>
                    <Button asChild className="bg-collektiv-green hover:bg-collektiv-lightgreen">
                      <a 
                        href="https://docs.google.com/presentation/d/1Rmcrh5OLgvoPnlvwtNRMqaJ2Ki-qZ1_7yZFnMueMKmM/edit?usp=drive_link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Founder Benefits
                      </a>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-collektiv-green/20 hover:border-collektiv-green/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="mx-auto mb-4 h-12 w-12 text-collektiv-green" />
                    <h3 className="text-xl font-bold text-collektiv-dark mb-4">Investor Benefits</h3>
                    <p className="text-gray-600 mb-6">
                      Exclusive perks and opportunities for our investor community members.
                    </p>
                    <Button asChild className="bg-collektiv-green hover:bg-collektiv-lightgreen">
                      <a 
                        href="https://docs.google.com/presentation/d/1RULEVW99f6qadf6gGnJVeqL-vikx_yoRAJkf7gF-9WM/edit?usp=drive_link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Investor Benefits
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

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
