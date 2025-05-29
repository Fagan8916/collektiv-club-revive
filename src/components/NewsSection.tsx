
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";

const NewsSection = () => {
  // Show the first 4 articles for the home page
  const featuredArticles = articles.slice(0, 4);

  return (
    <section className="section bg-white" id="insights">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Latest Insights & Updates</h2>
          <p className="section-subtitle">
            Stay informed about our latest events, member achievements, and community updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>{article.author}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link 
                  to={article.route}
                  className="inline-flex items-center text-collektiv-green font-medium hover:text-collektiv-lightgreen transition-colors"
                >
                  Read More
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/insights" className="btn-primary">
            View All Insights
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
