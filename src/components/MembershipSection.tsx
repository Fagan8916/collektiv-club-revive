
import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

        {/* Cost Comparison Table - Moved below pricing */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-collektiv-green">How We Compare to Traditional Syndicates</h3>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-collektiv-green text-white">
                  <TableHead className="text-white font-bold text-left">Fee Type</TableHead>
                  <TableHead className="text-white font-bold text-center">Collektiv</TableHead>
                  <TableHead className="text-white font-bold text-center">Traditional Syndicates</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(feeDetails).map(([feeType, description], index) => {
                  const isEven = index % 2 === 0;
                  const feeData = {
                    "Investment Fee": { collektiv: "0-12.5%", traditional: "2-15%" },
                    "Performance/Carry Fee": { collektiv: "0%", traditional: "20%" },
                    "Annual Investment Fee": { collektiv: "0%", traditional: "0-10%" },
                    "Annual Membership": { collektiv: "Up to £985", traditional: "Up to £10,000" }
                  };

                  return (
                    <Collapsible key={feeType} asChild>
                      <>
                        <CollapsibleTrigger asChild>
                          <TableRow className={`cursor-pointer hover:bg-gray-100 ${isEven ? "bg-gray-50" : ""}`}>
                            <TableCell className="font-medium">
                              <div className="flex items-center justify-between">
                                <span>{feeType}</span>
                                <ChevronDown className="h-4 w-4 text-gray-500 transition-transform data-[state=open]:rotate-180" />
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-bold text-collektiv-green">
                              {feeData[feeType]?.collektiv}
                            </TableCell>
                            <TableCell className="text-center font-bold">
                              {feeData[feeType]?.traditional}
                            </TableCell>
                          </TableRow>
                        </CollapsibleTrigger>
                        <CollapsibleContent asChild>
                          <TableRow className={isEven ? "bg-gray-50" : ""}>
                            <TableCell colSpan={3} className="px-6 py-4 border-t">
                              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
                                <strong>What this means:</strong> {description}
                              </div>
                            </TableCell>
                          </TableRow>
                        </CollapsibleContent>
                      </>
                    </Collapsible>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              <strong>Lower fees = more returns in your pocket</strong>
            </p>
          </div>
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
