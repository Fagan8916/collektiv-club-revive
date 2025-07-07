
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const investments = [
  {
    name: "Propane",
    logo: "/lovable-uploads/8429af36-140a-4fc4-a401-e12fd22d19cc.png",
    website: "TBC",
    slug: "propane"
  },
  {
    name: "Loxa",
    logo: "/lovable-uploads/7b1277a2-292c-4e86-ae2a-8dcae7fa5781.png",
    website: "https://www.loxacover.com/",
    slug: "loxa"
  },
  {
    name: "Pandektes",
    logo: "/lovable-uploads/2801fd4b-1d50-485c-a999-0695274f5f05.png",
    website: "https://pandektes.com/",
    slug: "pandektes"
  }
];

const InvestmentsSection = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-8 text-collektiv-green text-center">Investments to Date</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {investments.map((investment) => (
          <Link key={investment.slug} to={`/members/investments/${investment.slug}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <img 
                    src={investment.logo} 
                    alt={investment.name}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2 text-collektiv-green">{investment.name}</h3>
                <p className="text-sm text-gray-600">{investment.website}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InvestmentsSection;
