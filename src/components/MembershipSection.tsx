import React from "react";
import { Check, Sparkles, Users, TrendingUp, BookOpen } from "lucide-react";

const MembershipSection = () => {
  const features = [
    {
      icon: Users,
      text: "Access direct to founder"
    },
    {
      icon: TrendingUp,
      text: "SEIS priority"
    },
    {
      icon: Sparkles,
      text: "Build your network"
    },
    {
      icon: BookOpen,
      text: "Access to the Online Academy"
    }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-collektiv-green via-collektiv-green to-collektiv-lightgreen" id="membership">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="white" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Become a Member
          </h2>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-green-50 mb-12 max-w-3xl mx-auto leading-relaxed">
            Start your investment journey with our community. Get direct access to founders, priority on SEIS opportunities, and exclusive networking.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center justify-center md:justify-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-collektiv-green" />
                  </div>
                  <span className="text-lg md:text-xl text-white font-medium text-left">
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a 
              href="https://airtable.com/appWGyTHcjHMgZrUz/pagHdPVxVwljspHTq/form" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-collektiv-green text-xl font-bold py-5 px-10 rounded-full hover:bg-green-50 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              <span>Get Started</span>
              <Sparkles className="h-6 w-6" />
            </a>
          </div>

          {/* Optional: Small tagline under button */}
          <p className="text-green-100 mt-6 text-sm md:text-base">
            Join a community of ambitious investors and entrepreneurs
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
