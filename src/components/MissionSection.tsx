
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MissionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-collektiv-darkTeal to-collektiv-dark" id="philosophy">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <p className="text-collektiv-green text-sm font-medium uppercase tracking-widest mb-3 text-center">Our Philosophy</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white text-center leading-tight">
            Investing in technology start-ups should be accessible to all
          </h2>
          <p className="text-base md:text-lg text-white/60 mb-10 leading-relaxed text-center max-w-3xl mx-auto">
            We break down barriers and empower people. <strong className="text-white">Begin investing in the future 
            with as little as £500 per investment.</strong> As a member, you'll gain access to exclusive early-stage 
            investment opportunities, expert insights, and a powerful network.
          </p>
          <div className="text-center">
            <Link to="/about">
              <Button 
                size="lg"
                className="bg-collektiv-green text-white hover:bg-collektiv-lightgreen rounded-full px-8"
              >
                Learn More About Us →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
