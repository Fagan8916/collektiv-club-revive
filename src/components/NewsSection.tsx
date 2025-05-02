
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

const InsightsSection = () => {
  const articles = [
    {
      id: 1,
      title: "Lessons from 483 Investments: Insights from Angel Investing Legend Charlie",
      excerpt:
        "Charlie O'Donnell, a seasoned angel investor with nearly 500 investments, shares his invaluable insights and principles that have guided his successful investment journey.",
      date: "April 15, 2025",
      author: "Admin",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EAngel Investment Lessons%3C/text%3E%3C/svg%3E",
      slug: "lessons-from-483-investments",
    },
    {
      id: 2,
      title: "SaaS Funding Agreements: Ups and Downs",
      excerpt:
        "Understanding the complexities and trade-offs in SaaS funding agreements, including preferred share structures, participating preferred shares, and their implications for founders.",
      date: "April 10, 2025",
      author: "Content Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3ESaaS Funding%3C/text%3E%3C/svg%3E",
      slug: "saas-funding-agreements",
    },
    {
      id: 3,
      title: "Unlock Success: Key Tips for Beginner Angel Investors",
      excerpt:
        "Essential guidance for new angel investors on portfolio strategy, due diligence, and the importance of both financial returns and personal fulfillment in early-stage investing.",
      date: "April 5, 2025",
      author: "Events Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EBeginner Angel Tips%3C/text%3E%3C/svg%3E",
      slug: "tips-for-beginner-angel-investors",
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
                  to={`/insights/${article.slug}`}
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

export default InsightsSection;
