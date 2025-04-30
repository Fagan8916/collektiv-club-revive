
import React from "react";
import { Check } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Apply to join",
      description: "Your application will be reviewed, and if accepted, you will be invtited to an onboarding call and added to the community",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h600v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EApply to join%3C/text%3E%3C/svg%3E"
    },
    {
      number: "2",
      title: "Access Deals",
      description: "After passing our screening process, deals are released by email, Slack/Whatsapp community. You will get access to the data room and Founder deck.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h600v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EAccess deals%3C/text%3E%3C/svg%3E"
    },
    {
      number: "3",
      title: "Meet the Founders",
      description: "Meet the founders in a video call, hear them pitch, ask questions and consider the investment",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h600v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EMeet the Founders%3C/text%3E%3C/svg%3E"
    },
    {
      number: "4",
      title: "Register your Interest",
      description: "Once your due diligence is completed, register your interest to invest, with the associated committed amount",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h600v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3ERegister your Interest%3C/text%3E%3C/svg%3E"
    },
    {
      number: "5",
      title: "Send Funds",
      description: "We will create the SPV and you will have 48hours to transfer the funds. Upon completion your Share certificate & S/EIS Tax form will be issued and you will get access to your dashboard.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h600v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3ESend Funds%3C/text%3E%3C/svg%3E"
    },
    {
      number: "6",
      title: "Access your Dashboard",
      description: "Follow all your investments performance in one platform",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h600v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EAccess your Dashboard%3C/text%3E%3C/svg%3E"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
