
import React from "react";
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
import CollektivCarousel from "@/components/CollektivCarousel";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <InvestmentStatsSection />
        <MissionSection />
        <HowItWorksSection />
        <AboutSection />
        <CollektivCarousel />
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
