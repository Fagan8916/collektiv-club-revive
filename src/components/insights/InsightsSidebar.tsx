
import React from "react";

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
    </div>
  );
};

export default InsightsSidebar;
