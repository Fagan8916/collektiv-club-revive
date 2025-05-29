
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
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
            <CardTitle className="text-3xl text-collektiv-green">Propane</CardTitle>
            <p className="text-gray-600">Website: TBC</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">About Propane</h3>
              <p className="text-gray-700 leading-relaxed">
                Propane is an innovative technology company focused on developing sustainable and efficient 
                solutions for modern energy needs. They specialize in creating smart systems and platforms 
                that optimize energy consumption, reduce environmental impact, and provide cost-effective 
                alternatives to traditional energy solutions. Their technology combines IoT devices, 
                data analytics, and user-friendly interfaces to deliver comprehensive energy management solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Smart energy management systems</li>
                <li>IoT-enabled monitoring devices</li>
                <li>Data-driven optimization</li>
                <li>Sustainable energy solutions</li>
                <li>Cost-effective implementation</li>
              </ul>
            </div>
            
            <div className="text-center pt-4">
              <Button asChild className="bg-collektiv-green hover:bg-collektiv-lightgreen">
                <a 
                  href="https://drive.google.com/drive/folders/1xtMO9D3xoaptfFCOLq2FUYENtb_BVRlU?usp=drive_link" 
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

export default Propane;
