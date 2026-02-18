
import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
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

          {/* Logo text */}
          <div className="flex justify-center mb-2">
            <h2 className="font-display text-4xl md:text-5xl text-collektiv-green tracking-wide">Collektiv</h2>
          </div>
          <p className="text-collektiv-green text-sm md:text-base mb-8 tracking-widest uppercase">The Collektiv Revolution</p>
          
          {/* Main headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2 leading-tight" style={{ textShadow: '0 3px 10px rgba(0, 0, 0, 0.35)' }}>
            Invest in VC-Backed
          </h1>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold italic text-collektiv-green mb-8 leading-tight" style={{ textShadow: '0 3px 10px rgba(0, 0, 0, 0.28)' }}>
            Start-ups
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join a community of ambitious investors accessing vetted opportunities, lower fees, and continuous learning to build your portfolio.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <a
              href="https://airtable.com/appWGyTHcjHMgZrUz/pagHdPVxVwljspHTq/form"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-collektiv-green text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-collektiv-lightgreen transition-all duration-300 flex items-center shadow-lg shadow-collektiv-green/25">

              Become a Member
              
            </a>
            <a
              href="https://zcal.co/collektiv/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 text-center">

              Book a Discovery Call
            </a>
          </div>

          {/* Trust line */}
          <p className="text-white/40 text-sm">Trusted by investors across the world</p>
        </div>
      </div>
    </section>);

};

export default HeroSection;