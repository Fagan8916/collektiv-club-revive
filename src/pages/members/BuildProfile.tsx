import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileSubmissionForm from "@/components/ProfileSubmissionForm";
import LoadingScreen from "@/components/auth/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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

  // Check if user already has a profile or submission
  useEffect(() => {
    const checkExistingProfile = async () => {
      if (!loading && isAuthenticated && user?.id) {
        try {
          // Check for existing profile
          const { data: profile } = await supabase
            .from('member_profiles')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (profile) {
            navigate("/members");
            return;
          }
          
          // Check for existing submission
          const { data: submission } = await supabase
            .from('member_profile_submissions')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (submission) {
            navigate("/members");
            return;
          }
        } catch (error) {
          console.warn('Error checking profile/submission status:', error);
        }
        setCheckingProfile(false);
      }
    };

    checkExistingProfile();
  }, [loading, isAuthenticated, user, navigate]);

  if (loading || checkingProfile) return <LoadingScreen />;
  if (!isAuthenticated) return <LoadingScreen />;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-10 bg-gradient-to-r from-blue-50 to-white">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-collektiv-green">Build Your Member Profile</h1>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Share your expertise and be discoverable by other members. Submit your details below to join the directory.
            </p>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container max-w-3xl mx-auto">
            <article>
              <ProfileSubmissionForm />
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BuildProfile;
