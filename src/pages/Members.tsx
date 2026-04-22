import React, { useEffect, useState } from "react";
import { isProfileComplete } from "@/utils/profileUtils";
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
import { AdminInviteManager } from "@/components/AdminInviteManager";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import MemberAppShell from "@/components/members/MemberAppShell";
import { MemberTab } from "@/components/members/MemberBottomNav";
import InstallAndPushBanner from "@/components/members/InstallAndPushBanner";
import AdminPushNotifications from "@/components/AdminPushNotifications";
import MemberAnnouncements from "@/components/members/MemberAnnouncements";

const Members = () => {
  console.log('Members: Component rendering, current URL:', window.location.href);
  
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<MemberTab>("home");
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, signOut } = useAuth();
  const { isAdmin, isApprovedMember, loading: roleLoading } = useUserRole();
  const { toast } = useToast();

  console.log('Members: Auth state - loading:', authLoading, 'authenticated:', isAuthenticated, 'user:', !!user);

  // Redirect if not authenticated (with stability delay)
  useEffect(() => {
    console.log('Members: Auth effect - authLoading:', authLoading, 'isAuthenticated:', isAuthenticated);
    if (!authLoading && !isAuthenticated) {
      const href = window.location.href;
      const hasAuthIndicators = /[?#&](access_token|refresh_token|code|provider_token|provider_refresh_token)=/.test(href) || href.includes('#access_token=');
      const inProgress = (() => { try { return sessionStorage.getItem('auth_in_progress') === '1'; } catch { return false; } })();
      if (hasAuthIndicators || inProgress) {
        console.log('Members: Auth indicators or in-progress flag detected, delaying redirect');
        return;
      }
      
      const redirectTimer = setTimeout(() => {
        console.log("Members: User not authenticated after stability delay, redirecting to login");
        navigate("/login", { replace: true });
      }, 100);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Handle profile creation success - navigate to directory tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('profile') === 'created') {
      setActiveTab('directory');
      toast({
        title: "🎉 Your profile is now live!",
        description: "Welcome to the member directory. Connect with other members below.",
      });
      window.history.replaceState({}, '', '/#/members');
    }
  }, [toast]);

  // Redirect unapproved members to membership signup page
  useEffect(() => {
    if (!authLoading && !roleLoading && isAuthenticated && !isAdmin && !isApprovedMember) {
      console.log('Members: User not approved, redirecting to membership signup');
      window.location.href = 'https://collektiv.club/#/membership';
    }
  }, [isAuthenticated, authLoading, roleLoading, isAdmin, isApprovedMember]);

  // Redirect approved members with incomplete profiles to build-profile
  useEffect(() => {
    const checkProfileCompleteness = async () => {
      if (!authLoading && !roleLoading && isAuthenticated && (isApprovedMember || isAdmin) && user?.id) {
        const { data: profile } = await supabase
          .from('member_profiles')
          .select('id, first_name, full_name, bio, company, position, linkedin_url, profile_image_url')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!isProfileComplete(profile)) {
          const { data: submission } = await supabase
            .from('member_profile_submissions')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();

          if (!submission) {
            console.log('Members: Approved member with incomplete profile, redirecting to build-profile');
            navigate('/members/build-profile');
          }
        }
      }
    };
    checkProfileCompleteness();
  }, [isAuthenticated, authLoading, roleLoading, isAdmin, isApprovedMember, user, navigate]);

  // Fetch user profile when user is available
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          let displayProfile: any = null;
          const { data: profile, error: profileError } = await supabase
            .from('member_profiles')
            .select('first_name, full_name, profile_image_url')
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
              .select('full_name, first_name, profile_image_url, submitted_at')
              .eq('user_id', user.id)
              .order('submitted_at', { ascending: false })
              .maybeSingle();
            if (submissionError) {
              console.log("Error fetching latest submission:", submissionError);
            } else if (submission?.full_name) {
              displayProfile = {
                full_name: submission.full_name,
                first_name: submission.first_name,
                profile_image_url: submission.profile_image_url,
              };
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
    if (userProfile?.first_name) return userProfile.first_name;
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name.split(' ')[0];
    if (user?.user_metadata?.name) return user.user_metadata.name.split(' ')[0];
    return user?.email?.split('@')[0] || 'Member';
  };

  const getInitials = () => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  const stats = [
    { icon: Building2, title: "Active Investments", value: "7", description: "Current portfolio companies" },
    { icon: Users, title: "Club Members", value: "80+", description: "Growing community" },
    { icon: TrendingUp, title: "Total Deployed", value: "£550K+", description: "Capital invested to date" },
  ];

  // Loading screen
  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-collektiv-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-collektiv-green mx-auto"></div>
          <p className="mt-4 text-collektiv-green">Loading your member area...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-collektiv-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-collektiv-green mx-auto"></div>
          <p className="mt-4 text-collektiv-green">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Page title for top app bar
  const titleByTab: Record<MemberTab, string> = {
    home: `Hi, ${getDisplayName()}`,
    directory: "Directory",
    investments: "Investments",
    profile: "Profile",
    admin: "Admin · Push",
  };

  // Stat click handler — switch tab in app
  const handleStatClick = (title: string) => {
    if (title === "Club Members") setActiveTab('directory');
    else if (title === "Active Investments" || title === "Total Deployed") setActiveTab('investments');
  };

  return (
    <MemberAppShell
      title={titleByTab[activeTab]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      avatarUrl={userProfile?.profile_image_url}
      initials={getInitials()}
      onAvatarClick={() => setActiveTab('profile')}
      onLogout={handleLogout}
      isAdmin={isAdmin}
    >
      {/* HOME TAB */}
      {activeTab === 'home' && (
        <div className="container mx-auto px-4 py-6 max-w-3xl space-y-8">
          {/* Welcome banner */}
          <div className="rounded-2xl bg-gradient-to-br from-collektiv-green to-collektiv-dark text-white p-6 shadow-lg">
            <h2 className="font-playfair text-2xl font-bold mb-1">
              Welcome back, {getDisplayName()}
            </h2>
            <p className="text-green-100 text-sm">
              Your gateway to exclusive investments and community insights.
            </p>
          </div>

          {/* PWA install + push opt-in */}
          <InstallAndPushBanner />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, i) => (
              <button
                key={i}
                onClick={() => handleStatClick(stat.title)}
                className="bg-white rounded-2xl shadow-sm p-3 text-center hover:shadow-md transition-shadow"
              >
                <stat.icon className="mx-auto mb-1.5 h-5 w-5 text-collektiv-green" />
                <div className="text-lg font-bold text-collektiv-dark leading-tight">{stat.value}</div>
                <div className="text-[10px] text-gray-500 leading-tight mt-1">{stat.title}</div>
              </button>
            ))}
          </div>

          {/* Events Section */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-collektiv-green mb-2">
              Member Events
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Stay connected through exclusive networking events and member gatherings.
            </p>
            <MemberEvents />
          </section>

          {/* Membership Benefits */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-collektiv-green mb-4">
              Membership Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border border-collektiv-green/20">
                <CardContent className="p-5 text-center">
                  <Award className="mx-auto mb-3 h-8 w-8 text-collektiv-green" />
                  <h3 className="text-base font-bold text-collektiv-dark mb-2">Founder Benefits</h3>
                  <Button asChild size="sm" className="bg-collektiv-green hover:bg-collektiv-lightgreen w-full">
                    <a href="/lovable-uploads/founder-benefits.pdf" target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border border-collektiv-green/20">
                <CardContent className="p-5 text-center">
                  <TrendingUp className="mx-auto mb-3 h-8 w-8 text-collektiv-green" />
                  <h3 className="text-base font-bold text-collektiv-dark mb-2">Investor Benefits</h3>
                  <Button asChild size="sm" className="bg-collektiv-green hover:bg-collektiv-lightgreen w-full">
                    <a href="/lovable-uploads/investor-benefits.pdf" target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )}

      {/* DIRECTORY TAB */}
      {activeTab === 'directory' && (
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <div className="text-center mb-6">
            <h2 className="font-playfair text-2xl font-bold text-collektiv-green mb-2">Member Directory</h2>
            <p className="text-sm text-gray-600">
              Connect with fellow members. Discover their expertise and interests.
            </p>
          </div>
          <MemberDirectory />
        </div>
      )}

      {/* ADMIN TAB (admins only) — push composer + dashboard */}
      {activeTab === 'admin' && isAdmin && (
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <div className="text-center mb-6">
            <h2 className="font-playfair text-2xl font-bold text-collektiv-green mb-2">
              Push Notifications
            </h2>
            <p className="text-sm text-gray-600">
              Compose broadcasts and review delivery stats — all in one place.
            </p>
          </div>
          <AdminPushNotifications />
        </div>
      )}

      {/* INVESTMENTS TAB */}
      {activeTab === 'investments' && (
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <div className="text-center mb-6">
            <h2 className="font-playfair text-2xl font-bold text-collektiv-green mb-2">Investment Portfolio</h2>
            <p className="text-sm text-gray-600">
              Explore our curated portfolio of innovative companies.
            </p>
          </div>
          <InvestmentsSection />
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <Tabs defaultValue="edit-profile" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className={`grid h-auto w-full gap-2 p-1 rounded-md bg-transparent ${isAdmin ? 'grid-cols-3' : 'grid-cols-2'}`}>
                <TabsTrigger value="edit-profile" className="text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white">
                  Edit Profile
                </TabsTrigger>
                <TabsTrigger value="submit-profile" className="text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white">
                  Submit Profile
                </TabsTrigger>
                {isAdmin && (
                  <TabsTrigger value="admin" className="text-xs sm:text-sm px-3 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white">
                    Admin
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            <TabsContent value="edit-profile">
              <div className="text-center mb-6">
                <h3 className="font-playfair text-xl font-bold text-collektiv-green mb-2">Edit Your Profile</h3>
                <p className="text-sm text-gray-600">Update your information in the directory.</p>
              </div>
              <ProfileEditForm />
            </TabsContent>

            <TabsContent value="submit-profile">
              <div className="text-center mb-6">
                <h3 className="font-playfair text-xl font-bold text-collektiv-green mb-2">Join the Directory</h3>
                <p className="text-sm text-gray-600">Share your expertise and connect with other members.</p>
              </div>
              <ProfileSubmissionForm />
            </TabsContent>

            {isAdmin && (
              <TabsContent value="admin">
                <Tabs defaultValue="membership" className="w-full">
                  <div className="flex justify-center mb-6 overflow-x-auto">
                    <TabsList className="grid h-auto w-full grid-cols-3 md:grid-cols-5 gap-2 p-1 rounded-md bg-transparent">
                      <TabsTrigger value="membership" className="text-xs px-2 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white">Membership</TabsTrigger>
                      <TabsTrigger value="invite" className="text-xs px-2 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white">Invite</TabsTrigger>
                      <TabsTrigger value="profiles-to-review" className="text-xs px-2 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white">Submissions</TabsTrigger>
                      <TabsTrigger value="profiles" className="text-xs px-2 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white">Profiles</TabsTrigger>
                      <TabsTrigger value="push" className="text-xs px-2 py-2 rounded-md border border-collektiv-green/20 bg-white text-collektiv-dark shadow-sm data-[state=active]:bg-collektiv-green data-[state=active]:text-white">Push</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="membership"><MembershipManager /></TabsContent>
                  <TabsContent value="invite"><div className="max-w-2xl mx-auto"><AdminInviteManager /></div></TabsContent>
                  <TabsContent value="profiles-to-review"><AdminSubmissionsManager /></TabsContent>
                  <TabsContent value="profiles"><AdminProfileManager /></TabsContent>
                  <TabsContent value="push"><AdminPushNotifications /></TabsContent>
                </Tabs>
              </TabsContent>
            )}
          </Tabs>

          {/* Logout */}
          <div className="text-center mt-8">
            <Button variant="outline" onClick={handleLogout} className="px-8">
              Log out
            </Button>
          </div>
        </div>
      )}
    </MemberAppShell>
  );
};

export default Members;
