
import React from "react";

const MissionSection = () => {
  return (
    <section className="section bg-gray-50" id="philosophy">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Investment Philosophy</h2>
          <p className="section-subtitle">
            We believe in backing exceptional founders with innovative solutions to real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-collektiv-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-collektiv-green">Early Stage Focus</h3>
            <p className="text-gray-700">
              We invest in pre-seed and seed stage companies where we can make the biggest impact and achieve the highest returns.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-collektiv-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-collektiv-green">Founder-First</h3>
            <p className="text-gray-700">
              Great companies are built by great founders. We prioritize exceptional teams with domain expertise and proven execution ability.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-collektiv-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-collektiv-green">Market Opportunity</h3>
            <p className="text-gray-700">
              We look for large, growing markets with clear monetization paths and sustainable competitive advantages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
