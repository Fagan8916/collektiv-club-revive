
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  route: string;
  category: string;
}

interface ArticlesGridProps {
  articles: Article[];
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({ articles }) => {
  return (
    <div className="lg:col-span-3">
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-collektiv-green/20 text-collektiv-green text-sm px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center text-sm text-white/50 mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>{article.author}</span>
                  </div>
                </div>
                <p className="text-white/60 mb-4 line-clamp-3">
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
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold text-white/60 mb-2">No articles found</h3>
          <p className="text-white/50">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
};

export default ArticlesGrid;
