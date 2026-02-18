
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-collektiv-dark via-collektiv-darkTeal to-collektiv-dark">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-collektiv-green text-sm font-medium uppercase tracking-widest mb-4">Exclusive Community</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Become a part of the Collektiv Club today and start connecting with like-minded 
            individuals dedicated to growth and success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/membership" 
              className="bg-collektiv-green text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-collektiv-lightgreen transition-all duration-300 flex items-center justify-center shadow-lg shadow-collektiv-green/25"
            >
              Join Now
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
