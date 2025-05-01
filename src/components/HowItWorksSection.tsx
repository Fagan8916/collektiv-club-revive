
import React from "react";
import { Check } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Apply to join",
      description: "Your application will be reviewed, and if accepted, you will be invtited to an onboarding call and added to the community",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      number: "2",
      title: "Access Deals",
      description: "After passing our screening process, deals are released by email, Slack/Whatsapp community. You will get access to the data room and Founder deck.",
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      number: "3",
      title: "Meet the Founders",
      description: "Meet the founders in a video call, hear them pitch, ask questions and consider the investment",
      image: "https://images.unsplash.com/photo-1565398305018-19de9b73fff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80"
    },
    {
      number: "4",
      title: "Register your Interest",
      description: "Once your due diligence is completed, register your interest to invest, with the associated committed amount",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      number: "5",
      title: "Send Funds",
      description: "We will create the SPV and you will have 48hours to transfer the funds. Upon completion your Share certificate & S/EIS Tax form will be issued and you will get access to your dashboard.",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      number: "6",
      title: "Access your Dashboard",
      description: "Follow all your investments performance in one platform",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
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
