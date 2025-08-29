import React, { useEffect, useState } from "react";
import ProfileSubmissionForm from "@/components/ProfileSubmissionForm";
import LoadingScreen from "@/components/auth/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { User, CheckCircle } from "lucide-react";

const BuildProfile: React.FC = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    // SEO
    document.title = "Build Your Profile | Collektiv Club";
    const desc = "Build your member profile for the Collektiv Club directory.";
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) meta.content = desc;

    // Canonical tag
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', `${window.location.origin}/#/members/build-profile`);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const href = window.location.href;
      const hasAuthIndicators = /[?#&](access_token|refresh_token|code|provider_token|provider_refresh_token)=/.test(href) || href.includes('#access_token=');
      const inProgress = (() => { try { return sessionStorage.getItem('auth_in_progress') === '1'; } catch { return false; } })();
      if (hasAuthIndicators || inProgress) {
        // If auth tokens are present or auth is flagged in progress, wait for processing
        return;
      }
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  // Check if user already has a profile (but allow if they only have a submission)
  useEffect(() => {
    const checkExistingProfile = async () => {
      if (!loading && isAuthenticated && user?.id) {
        try {
          // Only redirect if user has an approved profile
          const { data: profile } = await supabase
            .from('member_profiles')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (profile) {
            navigate("/members");
            return;
          }
          
          // Allow users with submissions to stay on this page to edit/resubmit
        } catch (error) {
          console.warn('Error checking profile status:', error);
        }
        setCheckingProfile(false);
      }
    };

    checkExistingProfile();
  }, [loading, isAuthenticated, user, navigate]);

  if (loading || checkingProfile) return <LoadingScreen />;
  if (!isAuthenticated) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-collektiv-accent via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-collektiv-green">
        <div className="absolute inset-0 bg-gradient-to-r from-collektiv-green to-collektiv-dark opacity-90"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <User className="mx-auto h-16 w-16 mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Your Profile
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Welcome to the Collektiv Club! Please take a moment to share your expertise 
              and connect with our community by completing your member profile.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <CheckCircle className="mx-auto mb-4 h-12 w-12 text-collektiv-green" />
              <h3 className="text-xl font-bold text-collektiv-dark mb-4">Join the Directory</h3>
              <p className="text-gray-600">
                Share your expertise and background to help other members discover your skills and interests.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <User className="mx-auto mb-4 h-12 w-12 text-collektiv-green" />
              <h3 className="text-xl font-bold text-collektiv-dark mb-4">Connect & Collaborate</h3>
              <p className="text-gray-600">
                Enable meaningful connections with fellow members who share similar interests or complementary skills.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Form */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-collektiv-green mb-4">Your Profile Information</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Complete the form below to create your member profile. This information will be reviewed 
                  by our team and added to the member directory once approved.
                </p>
              </div>
              <ProfileSubmissionForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuildProfile;
