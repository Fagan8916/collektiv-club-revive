
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

const Index = () => {
  const navigate = useNavigate();

  // Handle auth errors in URL (like OTP expired)
  useEffect(() => {
    const handleAuthError = () => {
      const hash = window.location.hash;
      
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
            description: "The email link has expired. Please request a new invitation or sign up again.",
            variant: "destructive",
          });
          
          // Clean up the URL and redirect to register
          window.history.replaceState({}, document.title, window.location.pathname);
          navigate('/register', { replace: true });
        } else {
          toast({
            title: "Authentication Error",
            description: errorDescription || error || "An authentication error occurred.",
            variant: "destructive",
          });
          
          // Clean up the URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };

    handleAuthError();
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
