
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
      <div className="bg-white/5 border border-white/10 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4 text-collektiv-green">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button 
                onClick={() => setActiveCategory(category)}
                className={`${activeCategory === category ? 'text-collektiv-green font-medium' : 'text-white/70'} hover:text-collektiv-green transition-colors`}
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
