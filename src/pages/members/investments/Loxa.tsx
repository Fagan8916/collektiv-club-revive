
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Loxa = () => {
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
                src="/lovable-uploads/7b1277a2-292c-4e86-ae2a-8dcae7fa5781.png" 
                alt="Loxa"
                className="h-20 w-auto object-contain"
              />
            </div>
            <CardTitle className="text-3xl text-collektiv-green">Loxa</CardTitle>
            <a 
              href="https://www.loxacover.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              www.loxacover.com
              <ExternalLink className="ml-1" size={16} />
            </a>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">About Loxa Cover</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Loxa Cover is a London-based insurance technology startup that has raised £500K in pre-seed funding. 
                The company is on track with a great growth trajectory and has demonstrated exceptional potential 
                in the insurtech space.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Led by Jamie Harper, founder and CEO, who brings valuable experience from a successful exit with 
                his previous business. The team delivered what was probably one of the best pitches we've ever seen, 
                showcasing their deep understanding of the market and clear vision for the future.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Investment Details</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Location:</strong> London, UK</li>
                <li><strong>Funding Stage:</strong> Pre-seed</li>
                <li><strong>Amount Raised:</strong> £500K</li>
                <li><strong>CEO:</strong> Jamie Harper (successful previous exit)</li>
                <li><strong>Status:</strong> Great growth trajectory</li>
                <li><strong>Notable:</strong> Exceptional pitch presentation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Loxa;
