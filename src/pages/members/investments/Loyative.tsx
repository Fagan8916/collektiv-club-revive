
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Loyative = () => {
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
                src="/lovable-uploads/75605de7-e0bf-4389-b95b-2ce3c4a3621c.png" 
                alt="Loyative"
                className="h-20 w-auto object-contain"
              />
            </div>
            <CardTitle className="text-3xl text-collektiv-green">Loyative</CardTitle>
            <a 
              href="https://www.Loytaive.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              www.Loytaive.com
              <ExternalLink className="ml-1" size={16} />
            </a>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">About Loyative</h3>
              <p className="text-gray-700 leading-relaxed">
                Loyative is a customer loyalty and engagement platform that helps businesses build stronger 
                relationships with their customers through innovative loyalty programs and personalized experiences. 
                Their technology enables companies to create, manage, and optimize loyalty initiatives that drive 
                customer retention, increase engagement, and boost lifetime value. The platform combines data 
                analytics with user-friendly interfaces to deliver comprehensive loyalty solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Comprehensive loyalty program management</li>
                <li>Customer engagement analytics</li>
                <li>Personalized reward systems</li>
                <li>Multi-channel integration</li>
                <li>Real-time performance tracking</li>
              </ul>
            </div>
            
            <div className="text-center pt-4">
              <Button asChild className="bg-collektiv-green hover:bg-collektiv-lightgreen">
                <a 
                  href="https://drive.google.com/drive/folders/10hbwiJi40XExL8rem7KdhWOfhJWepATc?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Demo & Data Room
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Loyative;
