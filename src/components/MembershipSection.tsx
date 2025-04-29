
import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const MembershipSection = () => {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      period: "per month",
      description: "Essential benefits for individuals starting their journey with us.",
      features: [
        "Access to online community",
        "Monthly digital newsletter",
        "Member-only content library",
        "Discounted event tickets",
      ],
      button: "Get Started",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "$99",
      period: "per month",
      description: "Advanced benefits for professionals seeking deeper engagement.",
      features: [
        "Everything in Basic plan",
        "Weekly mastermind sessions",
        "1-on-1 mentorship opportunities",
        "Priority access to events",
        "Exclusive workshops and courses",
        "Featured member profile"
      ],
      button: "Join Premium",
      highlighted: true,
    },
    {
      name: "Corporate",
      price: "Custom",
      period: "pricing",
      description: "Tailored solutions for teams and organizations.",
      features: [
        "Everything in Premium plan",
        "Multiple team memberships",
        "Dedicated account manager",
        "Custom event hosting",
        "Private networking groups",
        "Corporate profile and branding",
      ],
      button: "Contact Us",
      highlighted: false,
    },
  ];

  return (
    <section className="section bg-gray-50" id="membership">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Membership Options</h2>
          <p className="section-subtitle">
            Choose the plan that's right for you and start your journey with our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden transition-all hover:shadow-xl ${
                plan.highlighted 
                  ? "bg-white border-2 border-collektiv-blue shadow-lg transform hover:-translate-y-1"
                  : "bg-white shadow-md"
              }`}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-collektiv-blue">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  to={plan.name === "Corporate" ? "/contact" : "/join"}
                  className={`w-full text-center block py-3 px-4 rounded-md font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-collektiv-blue text-white hover:bg-collektiv-lightblue"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.button}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom solution? Contact us for personalized membership options.
          </p>
          <Link to="/membership" className="btn-secondary">
            View All Membership Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
