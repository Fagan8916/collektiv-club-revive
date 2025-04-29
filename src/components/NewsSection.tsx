
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

const NewsSection = () => {
  const articles = [
    {
      id: 1,
      title: "COLLEKTIV.CLUB Announces New Workshop Series",
      excerpt:
        "Join us for our upcoming workshop series focused on professional development and networking strategies.",
      date: "April 15, 2025",
      author: "Admin",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h800v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3ECollektiv Workshop%3C/text%3E%3C/svg%3E",
      slug: "new-workshop-series",
    },
    {
      id: 2,
      title: "Member Spotlight: Success Stories from Our Community",
      excerpt:
        "Read about the incredible achievements of our members and how the COLLEKTIV.CLUB community has supported their journey.",
      date: "April 10, 2025",
      author: "Content Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h800v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3EMember Success%3C/text%3E%3C/svg%3E",
      slug: "member-spotlight",
    },
    {
      id: 3,
      title: "Upcoming Networking Event in May",
      excerpt:
        "Mark your calendars for our biggest networking event of the year, featuring guest speakers and opportunity to connect with industry leaders.",
      date: "April 5, 2025",
      author: "Events Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h800v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3ENetworking Event%3C/text%3E%3C/svg%3E",
      slug: "networking-event-may",
    },
  ];

  return (
    <section className="section bg-white" id="news">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Latest News & Updates</h2>
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
                  to={`/news/${article.slug}`}
                  className="inline-flex items-center text-collektiv-blue font-medium hover:text-collektiv-lightblue transition-colors"
                >
                  Read More
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/news" className="btn-primary">
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
