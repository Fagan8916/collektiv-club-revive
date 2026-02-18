
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";

const NewsSection = () => {
  const featuredArticles = articles.slice(0, 4);

  return (
    <section className="py-20 bg-gradient-to-br from-collektiv-darkTeal to-collektiv-dark" id="insights">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-collektiv-green text-sm font-medium uppercase tracking-widest mb-3">Knowledge</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Latest Insights & Updates</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Stay informed about our latest events, member achievements, and community updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArticles.map((article) => (
            <div key={article.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group">
              <div className="overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold mb-2 text-white line-clamp-2 group-hover:text-collektiv-green transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center text-xs text-white/50 mb-3 space-x-3">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={12} className="mr-1" />
                    <span>{article.author}</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link 
                  to={article.route}
                  className="inline-flex items-center text-collektiv-green font-semibold text-sm hover:text-collektiv-lightgreen transition-colors"
                >
                  Read More
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/insights" 
            className="inline-flex items-center bg-collektiv-green text-white px-6 py-3 rounded-full font-semibold hover:bg-collektiv-lightgreen transition-all duration-300"
          >
            View All Insights
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
