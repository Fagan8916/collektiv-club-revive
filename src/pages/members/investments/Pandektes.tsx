
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pandektes = () => {
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
                src="/lovable-uploads/2801fd4b-1d50-485c-a999-0695274f5f05.png" 
                alt="Pandektes"
                className="h-20 w-auto object-contain"
              />
            </div>
            <CardTitle className="text-3xl text-collektiv-green">Pandektes</CardTitle>
            <a 
              href="https://pandektes.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              pandektes.com
              <ExternalLink className="ml-1" size={16} />
            </a>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">About Pandektes</h3>
              <p className="text-gray-700 leading-relaxed">
                Pandektes is a cutting-edge technology company that specializes in advanced data analytics 
                and business intelligence solutions. They provide sophisticated tools and platforms that 
                help organizations make data-driven decisions, optimize their operations, and gain valuable 
                insights from their data. Their solutions are designed to handle complex data processing 
                and deliver actionable intelligence to businesses across various industries.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Advanced data analytics platform</li>
                <li>Business intelligence solutions</li>
                <li>Real-time data processing</li>
                <li>Custom dashboard creation</li>
                <li>Enterprise-grade security</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pandektes;
