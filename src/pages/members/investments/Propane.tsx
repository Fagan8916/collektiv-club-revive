
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
              <Button asChild size="lg" variant="outline" className="border-collektiv-green text-collektiv-green hover:bg-collektiv-green hover:text-white text-lg px-8 py-4">
                <a 
                  href="https://drive.google.com/drive/folders/1kqKMVnhRJmGSEsE8uBd4lVGEUy6ifoyy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Data Room
                </a>
              </Button>
            </div>
            <CardTitle className="text-3xl text-collektiv-green">Propane</CardTitle>
            <p className="text-gray-600">Website: TBC</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Business Summary</h3>
              <p className="text-gray-700 leading-relaxed">
                Propane is building the first always-on customer intelligence platform for product and go-to-market teams. 
                Designed to replace static surveys and slow research cycles, Propane uses AI to run contextual, async interviews 
                triggered at critical moments like onboarding, churn, or win/loss. Each interview is strategically designed based 
                on the team's goal and enriched with internal product and CRM data, delivering structured, cited insights in real 
                time to tools like Slack, Notion, and CRMs.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Key Benefits</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>AI-powered contextual customer interviews</li>
                <li>Always-on customer intelligence platform</li>
                <li>Real-time insights delivery to existing tools</li>
                <li>Automated continuous customer conversations</li>
                <li>Data-driven decision making capabilities</li>
              </ul>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">
                By automating continuous customer conversations and turning them into actionable insights, Propane gives teams 
                the context they need to move fast and make decisions grounded in truth — not guesswork.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Propane;
