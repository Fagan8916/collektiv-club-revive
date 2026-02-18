
import React from "react";
import { Search } from "lucide-react";

interface InsightsHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const InsightsHero: React.FC<InsightsHeroProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-collektiv-dark to-collektiv-darkTeal">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Insights & Updates</h1>
          <p className="text-xl text-white/80 mb-8">
            Stay informed with the latest news, events, and stories from our community.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-collektiv-green"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-collektiv-green">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsHero;
