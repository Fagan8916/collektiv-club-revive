
import React from "react";
import { Check } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MembershipSection = () => {
  const plans = [
    {
      name: "Trial",
      price: "Free*",
      period: "",
      features: [
        "12.5% Investment fee",
        "0% Annual Investment fee",
        "0% Carry / Performance fee",
        "Access to the Online Academy"
      ],
      button: "Start Trial",
      highlighted: false,
      link: "https://airtable.com/appWGyTHcjHMgZrUz/pagHdPVxVwljspHTq/form"
    },
    {
      name: "Premium",
      price: "£395",
      period: "per Annum",
      features: [
        "4% Investment fee",
        "0% Annual Investment fee",
        "0% Carry / Performance fee",
        "Access to the Founder and Member Slack Community",
        "£100 KYC cost included"
      ],
      button: "Join Premium",
      highlighted: false,
      link: "https://airtable.com/appWGyTHcjHMgZrUz/pagXGRxiL7ToHR8Tb/form"
    },
    {
      name: "VIP",
      price: "£985",
      period: "per Annum",
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
      link: "https://airtable.com/appWGyTHcjHMgZrUz/pagcb1x8NOL2MCKy8/form"
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

        {/* Cost Comparison Table */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-collektiv-green">How We Compare to Traditional Syndicates</h3>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-collektiv-green text-white">
                  <TableHead className="text-white font-bold text-left">Costs</TableHead>
                  <TableHead className="text-white font-bold text-center">Collektiv</TableHead>
                  <TableHead className="text-white font-bold text-center">Syndicates</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="font-semibold mb-1">Investment Fee</div>
                    <div className="text-sm text-gray-600">A percentage-based carry fee applied on the amount invested, used to cover legal and transaction costs</div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-collektiv-green">0-12.5%</TableCell>
                  <TableCell className="text-center font-bold">2-15%</TableCell>
                </TableRow>
                <TableRow className="bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="font-semibold mb-1">Performance/Carry Fee</div>
                    <div className="text-sm text-gray-600">A percentage-based carry fee is applied to the realised gains after a business exits. For example, with a 20% Carry fee, if an initial investment of £2,000 that grows to £20,000, the carry fee will be 20% of the £18,000 profit = £3,600 fee</div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-collektiv-green">0%</TableCell>
                  <TableCell className="text-center font-bold">20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="font-semibold mb-1">Annual Investment Fee</div>
                    <div className="text-sm text-gray-600">An annual recurring investment fee is a percentage-based charge on your total investment assets, covering ongoing services like asset management and administration</div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-collektiv-green">0%</TableCell>
                  <TableCell className="text-center font-bold">0-10%</TableCell>
                </TableRow>
                <TableRow className="bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="font-semibold mb-1">Membership</div>
                    <div className="text-sm text-gray-600">A membership fee typically involves a recurring charge, often annual, which grants access to exclusive investment opportunities, networking, and educational resources</div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-collektiv-green">Up to £985 PA</TableCell>
                  <TableCell className="text-center font-bold">Up to £10,000 PA</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              <strong>Why choose us?</strong> We offer significantly lower fees across all categories, helping you keep more of your investment returns.
            </p>
          </div>
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
        
        {/* KYC Note for Free membership */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>*Free Members are required to pay a £100 one-off KYC (Know Your Customer) check directly to our SPV (Special Purpose Vehicle) provider when investing for the first time</p>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
