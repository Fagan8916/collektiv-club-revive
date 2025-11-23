
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BeImpact = () => {
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
                src="/lovable-uploads/beimpact-logo.jpg" 
                alt="be/impact"
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-collektiv-green hover:bg-collektiv-lightgreen text-lg px-8 py-4">
                <Link to="/members/investments/beimpact/memo">
                  Investment Memo
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-collektiv-green hover:bg-collektiv-lightgreen text-lg px-8 py-4">
                <a 
                  href="https://drive.google.com/file/d/1UfzaGTH-X7TrHAf4oCfR164o00qzRfti/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Pitch Recording
                </a>
              </Button>
              <Button asChild size="lg" className="bg-collektiv-green hover:bg-collektiv-lightgreen text-lg px-8 py-4">
                <a 
                  href="https://beimpact.trumpet.app/pods/68e90725957cc19cdc5a6b01/live" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Data Room
                </a>
              </Button>
            </div>
            <CardTitle className="text-3xl text-collektiv-green">be/impact</CardTitle>
            <a 
              href="https://beimpact.co.uk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              beimpact.co.uk
            </a>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">About be/impact</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                be/impact is an innovative B2B SaaS platform operating in the Learning & Development and ESG/CSR investment space. 
                The company is revolutionizing corporate training by enabling a "teach-to-learn" model that delivers exceptional knowledge retention 
                and measurable social impact.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The platform amplifies corporate training ROI through skill transfer between employees and nonprofits, creating 
                300% better learning outcomes and 40x higher social value compared to traditional CSR activities. This dual-impact approach 
                makes learning more effective while generating meaningful social change.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With an expected valuation of £4m, be/impact is raising its Seed round with £30k SEIS available to Collektiv Club members, 
                offering an attractive opportunity to invest in the future of corporate learning and social responsibility.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Investment Details</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Industry:</strong> B2B SaaS – Learning & Development, ESG/CSR Investment</li>
                <li><strong>Funding Stage:</strong> Seed</li>
                <li><strong>Investment Amount:</strong> £30k SEIS available to Collektiv Club</li>
                <li><strong>Expected Valuation:</strong> £4m</li>
                <li><strong>Team:</strong> CEO Julian Buschmaas (ex-BCG, UN, LSE; extensive L&D/impact background), Co-founder Fabien Laplace (product and operations; ex-teacher; proven L&D expertise)</li>
                <li><strong>Model:</strong> Platform enabling "teach-to-learn" knowledge retention and social impact reporting</li>
                <li><strong>Key Metrics:</strong> 300% better learning outcomes, 40x higher social value than traditional CSR</li>
                <li><strong>Status:</strong> Active and raising</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BeImpact;
