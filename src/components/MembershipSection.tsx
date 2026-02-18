import React from "react";
import { Sparkles, Users, TrendingUp, BookOpen } from "lucide-react";

const MembershipSection = () => {
  const features = [
    { icon: Users, text: "Direct access to founders" },
    { icon: TrendingUp, text: "SEIS & EIS opportunities" },
    { icon: Sparkles, text: "Build your network" },
    { icon: BookOpen, text: "Online Academy access" }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-collektiv-dark via-collektiv-darkTeal to-collektiv-dark" id="membership">
      {/* Decorative glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-collektiv-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-collektiv-green text-sm font-medium uppercase tracking-widest mb-4">Join Our Community</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Become a Member
          </h2>
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
            Start your investment journey with our community. Get direct access to founders, priority on SEIS opportunities, and exclusive networking.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center justify-center md:justify-start space-x-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-11 h-11 bg-collektiv-green rounded-full flex items-center justify-center">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-base md:text-lg text-white font-medium text-left">
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://airtable.com/appWGyTHcjHMgZrUz/pagHdPVxVwljspHTq/form" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-collektiv-green text-white text-lg font-bold py-4 px-10 rounded-full hover:bg-collektiv-lightgreen hover:scale-105 transition-all duration-300 shadow-lg shadow-collektiv-green/25"
            >
              <span>Become a Member</span>
              <Sparkles className="h-5 w-5" />
            </a>
            <a 
              href="https://zcal.co/collektiv/15min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-white/30 text-white text-lg font-bold py-4 px-10 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <span>Book a Discovery Call</span>
            </a>
          </div>

          <p className="text-white/40 mt-6 text-sm">
            Join a community of ambitious investors and entrepreneurs
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
