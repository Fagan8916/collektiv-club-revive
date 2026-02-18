
import React from "react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Apply to Join",
      description: "Your application will be reviewed, and if accepted, you'll be invited to an onboarding call and added to the community",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      number: "02",
      title: "Access Deals",
      description: "Deals are released via email and our Slack/WhatsApp community. Get full access to data rooms and Founder decks",
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      number: "03",
      title: "Meet the Founders",
      description: "Meet founders in video calls, hear them pitch, ask questions and evaluate the investment opportunity",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      number: "04",
      title: "Register Interest",
      description: "Once your due diligence is complete, register your interest to invest with your committed amount",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      number: "05",
      title: "Send Funds",
      description: "We create the SPV and you have 48 hours to transfer funds. Share certificates & S/EIS Tax forms issued upon completion",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      number: "06",
      title: "Track Performance",
      description: "Follow all your investments' performance through your personal dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-collektiv-dark" id="how-it-works">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-collektiv-green text-sm font-medium uppercase tracking-widest mb-3">The Process</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Joining the Collektiv Club is simple. Here's how to start investing and be part of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-collektiv-green text-white text-sm font-bold px-3 py-1 rounded-full">
                  {step.number}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
