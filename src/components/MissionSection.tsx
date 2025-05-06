
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
              To empower individuals to invest together in high-potential tech startups by sourcing vetted opportunities, 
              keeping fees low, providing clear information, and supporting continuous investor learning.
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
