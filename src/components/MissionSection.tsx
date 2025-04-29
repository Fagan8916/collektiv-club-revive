
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-collektiv-accent rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-collektiv-green text-center">Our Investment Philosophy</h2>
            <p className="text-lg text-gray-700 mb-6">
              We believe investing in technology start-ups should be accessible to all investors, not just a select few. 
              We set out to break down barriers and empower people. Join our community and begin investing in the future 
              with as little as £500. As a member, you'll gain access to exclusive early-stage investment opportunities, 
              expert insights, and a powerful network.
            </p>
            <div className="flex justify-center mt-8">
              <Link to="/about" className="btn-secondary flex items-center">
                Learn More About Us
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
