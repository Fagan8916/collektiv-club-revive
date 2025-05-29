
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

const NewsSection = () => {
  const articles = [
    {
      id: 1,
      title: "What to Look for in Founders: A Guide for Investors",
      excerpt:
        "At COLLEKTIV, we meet with dozens of founders every month. The quality of a founding team is the single biggest predictor of a startup's success. Here's what exceptional founders have in common.",
      date: "May 29, 2025",
      author: "Investment Team",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "what-to-look-for-in-founders",
      route: "/insights/what-to-look-for-in-founders",
      category: "Founder Evaluation"
    },
    {
      id: 2,
      title: "Convertible Loan Notes: A Smart Financing Tool for Early-Stage SaaS Companies",
      excerpt:
        "Raising capital is a critical milestone for early-stage SaaS companies. One increasingly popular and effective method to secure funding without immediately diluting equity is through convertible loan notes (CLNs).",
      date: "May 13, 2025",
      author: "Finance Team",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "convertible-loan-notes",
      route: "/insights/convertible-loan-notes",
      category: "Funding"
    },
    {
      id: 3,
      title: "Lessons from 483 Investments: Insights from Angel Investing Legend Charlie",
      excerpt:
        "Charlie O'Donnell, a seasoned angel investor with nearly 500 investments, shares his invaluable insights and principles that have guided his successful investment journey.",
      date: "April 15, 2025",
      author: "Admin",
      image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "lessons-from-483-investments",
      route: "/insights/lessons-from-483-investments",
      category: "Angel Investing"
    },
  ];

  return (
    <section className="section bg-white" id="insights">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Latest Insights & Updates</h2>
          <p className="section-subtitle">
            Stay informed about our latest events, member achievements, and community updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
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
