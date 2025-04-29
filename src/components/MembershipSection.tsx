
import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const MembershipSection = () => {
  const plans = [
    {
      name: "Trial",
      price: "Free*",
      period: "",
      description: "Suggested for members investing <£3,499 per annum",
      features: [
        "12.5% Investment fee",
        "0% Annual Investment fee",
        "0% Carry / Performance fee",
        "Access to the Online Academy"
      ],
      button: "Start Trial",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "£395",
      period: "per Annum",
      description: "Suggested for members investing >£3,500 per annum",
      features: [
        "4% Investment fee",
        "0% Annual Investment fee",
        "0% Carry / Performance fee",
        "Access to the Founder and Member Slack Community",
        "£100 KYC cost included"
      ],
      button: "Join Premium",
      highlighted: false,
    },
    {
      name: "VIP",
      price: "£985",
      period: "per Annum",
      description: "Suggested for members investing >£15,000 per annum",
      features: [
        "0% Investment fee",
        "0% Annual Investment fee",
        "0% Carry / Performance fee",
        "Priority on EIS & SEIS Deals",
        "Access to the Founder and Member Slack Community",
        "Gold Club Community Group Access and Discounts",
        "£100 KYC cost included"
      ],
      button: "Get Started",
      highlighted: true,
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
                  ? "bg-white border-2 border-collektiv-green shadow-lg transform hover:-translate-y-1"
                  : "bg-white shadow-md"
              }`}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-collektiv-green">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-collektiv-green mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  to={"/join"}
                  className={`w-full text-center block py-3 px-4 rounded-md font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-collektiv-green text-white hover:bg-collektiv-lightgreen"
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
