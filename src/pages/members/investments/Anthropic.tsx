
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Anthropic = () => {
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
                src="/lovable-uploads/anthropic-logo-new.png" 
                alt="Anthropic"
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-collektiv-green hover:bg-collektiv-lightgreen text-lg px-8 py-4">
                <Link to="/members/investments/anthropic/memo">
                  Investment Memo
                </Link>
              </Button>
            </div>
            <CardTitle className="text-3xl text-collektiv-green">Anthropic</CardTitle>
            <a 
              href="https://www.anthropic.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              anthropic.com <ExternalLink className="ml-1" size={16} />
            </a>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">About Anthropic</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Anthropic is one of a very small number of frontier AI labs with both leading-edge model performance 
                and a credible safety-first brand, positioning it as a core long-term infrastructure bet rather than 
                a single-product SaaS play. They are the creators of Claude, one of the world's most capable AI assistants.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The current round is expected to be approximately $10B at a circa $350B valuation, led by a strategic 
                investor with deep cloud and distribution reach, which reduces financing risk and supports continued 
                model-training at frontier scale.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Investment Details</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Industry:</strong> Frontier AI, foundation models for enterprises and consumers</li>
                <li><strong>Valuation:</strong> ~$350B (ongoing primary round)</li>
                <li><strong>Share Price:</strong> $259.1364</li>
                <li><strong>Access:</strong> Secondary-led exposure, indirect via SPV</li>
                <li><strong>Allocation:</strong> Up to $330k available for xAura & Collektiv</li>
                <li><strong>Structure:</strong> Access via a cap-table investor's unfilled pro-rata into an SPV managed by xAura via secondary Bloom Venture Partners</li>
                <li><strong>Terms:</strong> One-time 8.5% fee plus 20% carry, minimum $5,000 ticket</li>
                <li><strong>Status:</strong> Active</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Expected Figures</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-collektiv-green text-white">
                      <th className="border border-gray-300 p-3 text-left">Metric</th>
                      <th className="border border-gray-300 p-3 text-left">Commercial Trajectory</th>
                      <th className="border border-gray-300 p-3 text-left">Burn Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">2025 ARR</td>
                      <td className="border border-gray-300 p-3">~$8.5–$9B</td>
                      <td className="border border-gray-300 p-3">$2.8B</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">2026 Base Case</td>
                      <td className="border border-gray-300 p-3">$28B</td>
                      <td className="border border-gray-300 p-3">$3.0B</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">2027 Base Case</td>
                      <td className="border border-gray-300 p-3">$58B</td>
                      <td className="border border-gray-300 p-3">$2.0B</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Valuation</td>
                      <td className="border border-gray-300 p-3">~13× 2026 ARR</td>
                      <td className="border border-gray-300 p-3">2028+ profitability ($3.5B+)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Anthropic;
