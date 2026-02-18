
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { getAssetPath } from "@/utils/assetUtils";

const HeroSection = () => {
  const logoPath = getAssetPath("lovable-uploads/f8c8ddc0-f08b-4fd1-88ba-d214d1af74b4.png");
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-collektiv-dark via-collektiv-darkTeal to-collektiv-dark overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-collektiv-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-collektiv-green" />
            <span className="text-white/80 text-sm font-medium">Invest in the future of tech</span>
          </div>

          {/* Logo text */}
          <div className="flex justify-center mb-2">
            <h2 className="font-display text-4xl md:text-5xl text-collektiv-green tracking-wide">Collektiv</h2>
          </div>
          <p className="text-collektiv-green text-sm md:text-base mb-8 tracking-widest uppercase">The Collektiv Revolution</p>
          
          {/* Main headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2 leading-tight">
            Invest in VC-Backed
          </h1>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold italic text-collektiv-green mb-8 leading-tight">
            Start-ups
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join a community of ambitious investors accessing vetted opportunities, lower fees, and continuous learning to build your portfolio.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Link 
              to="/membership" 
              className="bg-collektiv-green text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-collektiv-lightgreen transition-all duration-300 flex items-center shadow-lg shadow-collektiv-green/25"
            >
              Become a Member
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link 
              to="/about" 
              className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Trust line */}
          <p className="text-white/40 text-sm mb-6">Trusted by investors across the UK</p>

          {/* Stats cards */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {[
              { value: "£0", label: "Joining Fee" },
              { value: "6-12", label: "Deals / Year" },
              { value: "£500", label: "Min Investment" },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-8 py-5 text-center min-w-[160px]"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
