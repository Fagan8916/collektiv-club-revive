
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MissionSection = () => {
  return (
    <section className="py-12 md:py-16" id="philosophy">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-transparent p-8 rounded-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-collektiv-green">
              Our Investment Philosophy
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
              We believe investing in technology start-ups should be accessible to all investors, not just a 
              select few. We set out to break down barriers and empower people. <strong>Begin investing in the future 
              with as little as £500 per investment.</strong> As a member, you'll gain access to exclusive early-stage 
              investment opportunities, expert insights, and a powerful network.
            </p>
            <Link to="/about">
              <Button 
                size="lg"
                variant="outline"
                className="border-collektiv-green text-collektiv-green hover:bg-collektiv-green hover:text-white"
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
