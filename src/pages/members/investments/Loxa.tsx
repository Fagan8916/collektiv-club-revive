
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
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">About Loxa</h3>
              <p className="text-gray-700 leading-relaxed">
                Loxa is an innovative insurance technology company that provides comprehensive coverage solutions 
                for modern businesses and individuals. They specialize in streamlined digital insurance products 
                that combine traditional coverage with cutting-edge technology to deliver faster, more efficient, 
                and more accessible insurance services. Their platform focuses on simplifying the insurance 
                process while maintaining robust protection for their clients.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Digital-first insurance platform</li>
                <li>Streamlined claims processing</li>
                <li>Comprehensive business coverage</li>
                <li>Modern risk assessment tools</li>
                <li>Customer-centric service approach</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Loxa;
