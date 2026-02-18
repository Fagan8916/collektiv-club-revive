
import React from "react";
import { ClipboardCheck, FolderOpen, Users, HandshakeIcon, Banknote, BarChart3 } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Apply to Join",
      description: "Your application will be reviewed, and if accepted, you'll be invited to an onboarding call and added to the community.",
      icon: ClipboardCheck,
    },
    {
      number: "02",
      title: "Access Deals",
      description: "Deals are released via email and our Slack/WhatsApp community. Get full access to data rooms and Founder decks.",
      icon: FolderOpen,
    },
    {
      number: "03",
      title: "Meet the Founders",
      description: "Meet founders in video calls, hear them pitch, ask questions and evaluate the investment opportunity.",
      icon: Users,
    },
    {
      number: "04",
      title: "Register Interest",
      description: "Once your due diligence is complete, register your interest to invest with your committed amount.",
      icon: HandshakeIcon,
    },
    {
      number: "05",
      title: "Send Funds",
      description: "We create the SPV and you have 48 hours to transfer funds. Share certificates & S/EIS Tax forms issued upon completion.",
      icon: Banknote,
    },
    {
      number: "06",
      title: "Track Performance",
      description: "Follow all your investments' performance through your personal dashboard.",
      icon: BarChart3,
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

        {/* Vertical Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Central line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="relative mb-12 last:mb-0">
                {/* Timeline node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-collektiv-green flex items-center justify-center z-10 shadow-lg shadow-collektiv-green/20">
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                    isEven ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                  }`}
                >
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <span className="text-collektiv-green font-display text-sm font-bold tracking-wider">
                      STEP {step.number}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2">{step.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
