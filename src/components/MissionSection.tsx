
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MissionSection = () => {
  return (
    <section className="py-6 md:py-8" id="philosophy">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-collektiv-accent p-8 rounded-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-collektiv-green text-center">
              Our Investment Philosophy
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-8 leading-relaxed text-left">
              We believe investing in technology start-ups should be accessible to all investors, not just a 
              select few. We set out to break down barriers and empower people. <strong>Begin investing in the future 
              with as little as £500 per investment.</strong> As a member, you'll gain access to exclusive early-stage 
              investment opportunities, expert insights, and a powerful network.
            </p>
            <div className="text-center">
              <Link to="/about">
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-collektiv-green text-collektiv-green hover:bg-collektiv-green hover:text-white"
                >
                  Learn More About Us →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
