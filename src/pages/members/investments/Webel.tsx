import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

const Webel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-collektiv-accent via-white to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          to="/members" 
          className="inline-flex items-center text-collektiv-green hover:text-collektiv-lightgreen mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members Zone
        </Link>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src="/lovable-uploads/webel-logo-new.png" 
                  alt="Webel"
                  className="h-24 w-auto object-contain"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-collektiv-green mb-2">Webel</h1>
                <a 
                  href="https://webel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-collektiv-green inline-flex items-center"
                >
                  webel.app <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-collektiv-green hover:bg-collektiv-lightgreen text-lg px-8 py-4">
                <Link to="/members/investments/webel/memo">
                  Investment Memo
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 border-collektiv-green text-collektiv-green hover:bg-collektiv-green hover:text-white">
                <a href="https://docsend.com/view/7wij4uv9a3473hbg" target="_blank" rel="noopener noreferrer">
                  Pitch Deck <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">About Webel</h2>
          <p className="text-gray-700 mb-6">
            Webel is Spain's category-leading, on-demand home-services marketplace connecting vetted professionals 
            (plumbers, electricians, cleaners, handymen, movers, etc.) with homeowners and businesses. The platform 
            has achieved ~€18m GMV run-rate with 83% gross margin and exceptional customer retention (85% repeat GMV).
          </p>
          
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Investment Details</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Round:</strong> €2.0m Pre-Series A at €21m pre-money valuation</li>
            <li><strong>SPV Size:</strong> €500k @ €21m pre (lead: Trind VC)</li>
            <li><strong>SPV Terms:</strong> 4.5% setup fee, 20% carry</li>
            <li><strong>Close Deadline:</strong> 28 December 2025</li>
            <li><strong>Key Investors:</strong> Trind Ventures, Goodwater Capital, Yellow (Glovo Founders), Tiburon, Decelera Ventures</li>
          </ul>

          <h2 className="text-2xl font-bold text-collektiv-green mb-4 mt-8">Key Metrics</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>~€18m GMV run-rate | ~€1.7m revenue run-rate</li>
            <li>83% gross margin | LTV/CAC ≈ 4.1×</li>
            <li>~4 month payback | 85% repeat GMV from returning customers</li>
            <li>1.5m downloads | 1.0m accounts | 350k providers | 175k MAUs</li>
            <li>19 Spanish cities live; 5 UK cities ramping</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Webel;
