
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Kalshi = () => {
  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-collektiv-accent to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/members" className="inline-flex items-center mb-6 text-collektiv-green hover:underline">
          <ArrowLeft className="mr-2" size={20} />
          Back to Members Zone
        </Link>
        
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/kalshi-logo.png" 
                alt="Kalshi"
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-collektiv-green hover:bg-collektiv-lightgreen text-lg px-8 py-4">
                <Link to="/members/investments/kalshi/memo">
                  Investment Memo
                </Link>
              </Button>
            </div>
            <CardTitle className="text-3xl text-collektiv-green">Kalshi</CardTitle>
            <a 
              href="https://kalshi.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              kalshi.com <ExternalLink className="ml-1" size={16} />
            </a>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">About Kalshi</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kalshi is the first and only CFTC-licensed Designated Contract Market focused on event contracts, 
                effectively operating as a fully regulated US prediction market at large scale. The company has 
                created standardised "event contracts" that pay out based on objectively verifiable outcomes, giving 
                both retail and institutional participants a compliant way to trade on real-world events.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The business recently closed a $1B Series E at an $11B valuation led by Paradigm with participation 
                from Sequoia, a16z, CapitalG, ARK, IVP and others.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Investment Details</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Sector:</strong> Fintech / Trading infrastructure / Prediction markets</li>
                <li><strong>Stage:</strong> Late-stage growth (post-Series E, $11B valuation)</li>
                <li><strong>Instrument:</strong> Secondary purchase of Series B Preferred (6% dividend) via Forge Single Company Fund (SCF)</li>
                <li><strong>Price:</strong> $343.21 per share (7% premium to ~$320.76 Series E price)</li>
                <li><strong>Implied Valuation:</strong> $11.77B reference valuation vs. $11B Series E headline</li>
                <li><strong>SPV Terms:</strong> 7% one-time fee (via share price uplift), 20% carry</li>
                <li><strong>SPV Provider:</strong> Forge Global – SCF structure, registered asset manager, 0/0 ongoing fees</li>
                <li><strong>Geography:</strong> US (New York HQ, CFTC-regulated)</li>
                <li><strong>Status:</strong> Active</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Key Traction</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-collektiv-green text-white">
                      <th className="border border-gray-300 p-3 text-left">Metric</th>
                      <th className="border border-gray-300 p-3 text-left">Figure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">2025 Notional Volume</td>
                      <td className="border border-gray-300 p-3">$23.8B (+1,108% YoY)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Annualised Volume</td>
                      <td className="border border-gray-300 p-3">$100B+</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">2026 Run-rate Revenue</td>
                      <td className="border border-gray-300 p-3">$600M+</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">2025 Transactions</td>
                      <td className="border border-gray-300 p-3">~97M (+1,680% YoY)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Super Bowl Sunday 2026</td>
                      <td className="border border-gray-300 p-3">$1B+ traded (2,700% YoY)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Video Section Placeholder */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Investment Video</h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://drive.google.com/file/d/1-MK2fZzU8FB4XxGTIjJKrZttlVKhfxF8/preview"
                  className="w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                  title="Kalshi Investment Video"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Kalshi;
