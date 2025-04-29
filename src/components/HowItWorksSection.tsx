
import React from "react";
import { Check } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Apply to join",
      description: "Complete a simple application form to express your interest in joining the Collektiv Club.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h600v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EApply to join%3C/text%3E%3C/svg%3E"
    },
    {
      number: "2",
      title: "Access deals",
      description: "Once approved, gain exclusive access to curated investment opportunities and EIS/SEIS deals.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h600v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EAccess deals%3C/text%3E%3C/svg%3E"
    },
    {
      number: "3",
      title: "Choose your membership",
      description: "Select the membership tier that best suits your investment goals and preferences.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h600v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EChoose membership%3C/text%3E%3C/svg%3E"
    },
    {
      number: "4",
      title: "Connect with community",
      description: "Network with like-minded professionals and benefit from our exclusive community resources.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h600v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EConnect with community%3C/text%3E%3C/svg%3E"
    },
  ];

  return (
    <section className="section bg-white" id="how-it-works">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Joining the Collektiv Club is simple. Here's how to become part of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="relative">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-collektiv-green text-white flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
