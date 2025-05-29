
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface InsightsSidebarProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const InsightsSidebar: React.FC<InsightsSidebarProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email, "to be sent to info@collektiv.club");
    toast({
      title: "Thank you for subscribing to our newsletter",
      description: "Please add Info@collektiv.club to your contacts",
      duration: 5000,
    });
    setEmail("");
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-bold mb-4 text-collektiv-green">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button 
                onClick={() => setActiveCategory(category)}
                className={`text-${activeCategory === category ? 'collektiv-green font-medium' : 'gray-700'} hover:text-collektiv-green transition-colors`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4 text-collektiv-green">Subscribe to the newsletter</h3>
        <p className="text-gray-600 mb-4">
          Get the latest updates delivered directly to your inbox.
        </p>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-green"
          />
          <button 
            type="submit"
            className="w-full bg-collektiv-green text-white px-4 py-2 rounded-md hover:bg-collektiv-lightgreen transition-colors font-bold"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsightsSidebar;
