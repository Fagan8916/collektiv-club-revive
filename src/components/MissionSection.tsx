
import React from "react";
import { Button } from "@/components/ui/button";

const MissionSection = () => {
  return (
    <section className="section bg-gray-50" id="philosophy">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-collektiv-green">
            Our Investment Philosophy
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            We believe investing in technology start-ups should be accessible to all investors, not just a 
            select few. We set out to break down barriers and empower people. <strong>Begin investing in the future 
            with as little as £500 per investment.</strong> As a member, you'll gain access to exclusive early-stage 
            investment opportunities, expert insights, and a powerful network.
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-collektiv-green text-collektiv-green hover:bg-collektiv-green hover:text-white"
          >
            Learn More About Us →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
