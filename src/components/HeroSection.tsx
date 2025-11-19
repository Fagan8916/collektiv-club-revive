
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getAssetPath } from "@/utils/assetUtils";

const HeroSection = () => {
  // Use the getAssetPath utility for correct image paths
  const logoPath = getAssetPath("lovable-uploads/f8c8ddc0-f08b-4fd1-88ba-d214d1af74b4.png");
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-collektiv-accent to-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI2UwZTdmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIGN4PSI3MDAiIGN5PSI0MDAiIHI9IjIwMCIvPjxjaXJjbGUgc3Ryb2tlPSIjZTBlN2ZmIiBzdHJva2Utd2lkdGg9IjEuNSIgY3g9IjcwMCIgY3k9IjQwMCIgcj0iMzAwIi8+PGNpcmNsZSBzdHJva2U9IiNlMGU3ZmYiIHN0cm9rZS13aWR0aD0iMS41IiBjeD0iNzAwIiBjeT0iNDAwIiByPSI0MDAiLz48Y2lyY2xlIHN0cm9rZT0iI2UwZTdmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIGN4PSI3MDAiIGN5PSI0MDAiIHI9IjUwMCIvPjxjaXJjbGUgc3Ryb2tlPSIjZTBlN2ZmIiBzdHJva2Utd2lkdGg9IjEuNSIgY3g9IjcwMCIgY3k9IjQwMCIgcj0iNjAwIi8+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src={logoPath}
              alt="the Collektiv Club" 
              className="h-24 md:h-32 animate-fade-in" 
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-collektiv-green">Invest in VC backed Start-ups</h2>
          
          
          <div className="mb-8">
            <h4 className="text-lg md:text-xl font-semibold mb-3 text-collektiv-green">Our Mission</h4>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              To empower individuals to invest together in high-potential tech startups by sourcing vetted opportunities, keeping fees low, providing clear information, and supporting continuous investor learning.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/membership" className="btn-primary flex items-center">
              Become a Member
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
