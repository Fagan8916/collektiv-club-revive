
import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const MembershipSection = () => {
  const plans = [
    {
      name: "🟢 Free Tier",
      price: "Free",
      period: "",
      features: [
        "Now: 4.5% upfront fee + 20% carry + £0 annual",
        "Before: 12.5% upfront fee + 0% carry + £0 annual", 
        "✅ Key change: Lower upfront cost, but added performance carry for long-term alignment",
        "Access to the Online Academy"
      ],
      button: "Start Trial",
      highlighted: false,
      link: "https://airtable.com/appWGyTHcjHMgZrUz/pagHdPVxVwljspHTq/form"
    },
    {
      name: "🟡 Premium Tier",
      price: "£395",
      period: "per year",
      features: [
        "Now: 1% upfront fee + 12% carry + £395 annual",
        "Before: 4% upfront fee + 0% carry + £395 annual",
        "✅ Key change: Reduced upfront cost, modest carry added to align incentives",
        "Access to the Founder and Member Slack Community"
      ],
      button: "Join Premium",
      highlighted: false,
      link: "https://airtable.com/appWGyTHcjHMgZrUz/pagXGRxiL7ToHR8Tb/form"
    },
    {
      name: "🟣 VIP Tier",
      price: "£985",
      period: "per year",
      features: [
        "Now: 0% upfront fee + 0% carry + £985 annual",
        "Before: Same as current",
        "✅ No change — VIP members continue to receive full upside with no fees",
        "Priority on EIS & SEIS Deals",
        "Access to the Founder and Member Slack Community",
        "Gold Club Community Group Access and Discounts"
      ],
      button: "Get Started",
      highlighted: true,
      link: "https://airtable.com/appWGyTHcjHMgZrUz/pagcb1x8NOL2MCKy8/form"
    },
  ];

  const feeDetails = {
    "Investment Fee": "A percentage-based carry fee applied on the amount invested, used to cover legal and transaction costs",
    "Performance/Carry Fee": "A percentage-based carry fee is applied to the realised gains after a business exits. For example, with a 20% Carry fee, if an initial investment of £2,000 that grows to £20,000, the carry fee will be 20% of the £18,000 profit = £3,600 fee",
    "Annual Investment Fee": "An annual recurring investment fee is a percentage-based charge on your total investment assets, covering ongoing services like asset management and administration",
    "Annual Membership": "A membership fee typically involves a recurring charge, often annual, which grants access to exclusive investment opportunities, networking, and educational resources"
  };

  return (
    <section className="section bg-gray-50" id="membership">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Membership Options</h2>
          <p className="section-subtitle">
            Choose the plan that's right for you and start your journey with our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-collektiv-green mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center block py-3 px-4 rounded-md font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-collektiv-green text-white hover:bg-collektiv-lightgreen"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.button}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MembershipSection;
