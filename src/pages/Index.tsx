
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MembershipSection from "@/components/MembershipSection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import InvestmentStatsSection from "@/components/InvestmentStatsSection";
import MissionSection from "@/components/MissionSection";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Handle invite/magic link flows for authenticated users
  useEffect(() => {
    const hash = window.location.hash || '';
    const isInviteFlow = hash.includes('access_token=') || hash.includes('type=invite');
    const fromSupabaseAuth = typeof document !== 'undefined' && document.referrer?.includes('.supabase.co');

    if (!authLoading && isAuthenticated && (isInviteFlow || fromSupabaseAuth)) {
      console.log('Index: Auth via email link/invite detected, redirecting to setup-account');
      navigate('/setup-account', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Handle auth callbacks and magic links
  useEffect(() => {
    const handleAuthCallback = async () => {
      const hash = window.location.hash;
      
      // Handle auth errors
      if (hash.includes('error=')) {
        const hashParams = new URLSearchParams(hash.substring(1));
        const error = hashParams.get('error');
        const errorCode = hashParams.get('error_code');
        const errorDescription = hashParams.get('error_description');
        
        console.log('Index: Auth error detected:', { error, errorCode, errorDescription });
        
        // Handle specific error cases
        if (errorCode === 'otp_expired' || error === 'access_denied') {
          toast({
            title: "Link Expired",
            description: "The email link has expired. Please try signing in again or request a new invitation.",
            variant: "destructive",
          });
          
          // Clean up the URL and redirect to login
          window.history.replaceState({}, document.title, window.location.pathname);
          navigate('/login', { replace: true });
        } else {
          toast({
            title: "Authentication Error",
            description: errorDescription || error || "An authentication error occurred.",
            variant: "destructive",
          });
          
          // Clean up the URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        return;
      }
      
      // Handle magic link invitations (access_token in hash)
      if (hash.includes('access_token=') || hash.includes('type=invite')) {
        console.log('Index: Magic link invitation detected, setting session then redirecting to setup account');
        const href = window.location.href;
        const access_token = (href.match(/access_token=([^&]+)/)?.[1] || '');
        const refresh_token = (href.match(/refresh_token=([^&]+)/)?.[1] || '');
        if (access_token) {
          try {
            await supabase.auth.setSession({ access_token, refresh_token });
            console.log('Index: Session set from magic link');
          } catch (e) {
            console.error('Index: Failed to set session from magic link', e);
          }
        }
        // Clean URL and go to setup-account without losing tokens (already set)
        window.history.replaceState({}, document.title, window.location.pathname + '#/setup-account');
        navigate('/setup-account', { replace: true });
        return;
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <InvestmentStatsSection />
        <MissionSection />
        <HowItWorksSection />
        <AboutSection />
        <MembershipSection />
        <NewsSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
