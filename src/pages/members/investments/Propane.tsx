
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Propane = () => {
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
                src="/lovable-uploads/8429af36-140a-4fc4-a401-e12fd22d19cc.png" 
                alt="Propane"
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-collektiv-green hover:bg-collektiv-lightgreen text-lg px-8 py-4">
                <a 
                  href="https://drive.google.com/drive/folders/1xtMO9D3xoaptfFCOLq2FUYENtb_BVRlU?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Investment Memo
                </a>
              </Button>
              <Button asChild size="lg" className="bg-collektiv-green hover:bg-collektiv-lightgreen text-lg px-8 py-4">
                <a 
                  href="https://drive.google.com/drive/folders/1kqKMVnhRJmGSEsE8uBd4lVGEUy6ifoyy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Data Room
                </a>
              </Button>
            </div>
            <CardTitle className="text-3xl text-collektiv-green">Propane AI</CardTitle>
            <a 
              href="https://usepropane.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              usepropane.ai
            </a>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">About Propane AI</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Propane AI is an innovative Copenhagen-based startup that has successfully raised €1.1M in 
                pre-seed funding. The round included a significant investment from the founder of Lovable.dev, 
                demonstrating strong industry confidence in their vision and technology.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Propane is building the first always-on customer intelligence platform for product and go-to-market teams. 
                Designed to replace static surveys and slow research cycles, Propane uses AI to run contextual, async interviews 
                triggered at critical moments like onboarding, churn, or win/loss.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Investment Details</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Location:</strong> Copenhagen, Denmark</li>
                <li><strong>Funding Stage:</strong> Pre-seed</li>
                <li><strong>Amount Raised:</strong> €1.1M</li>
                <li><strong>Notable Investor:</strong> Founder of Lovable.dev</li>
                <li><strong>Status:</strong> Active and growing</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Propane;
