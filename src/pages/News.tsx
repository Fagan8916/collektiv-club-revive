
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

const Insights = () => {
  const articles = [
    {
      id: 1,
      title: "COLLEKTIV.CLUB Announces New Workshop Series",
      excerpt:
        "Join us for our upcoming workshop series focused on professional development and networking strategies.",
      content: "Extended content about the workshop series would go here...",
      date: "April 15, 2025",
      author: "Admin",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h800v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3ECollektiv Workshop%3C/text%3E%3C/svg%3E",
      slug: "new-workshop-series",
      category: "Events",
    },
    {
      id: 2,
      title: "Member Spotlight: Success Stories from Our Community",
      excerpt:
        "Read about the incredible achievements of our members and how the COLLEKTIV.CLUB community has supported their journey.",
      content: "Extended content about member success stories would go here...",
      date: "April 10, 2025",
      author: "Content Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h800v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3EMember Success%3C/text%3E%3C/svg%3E",
      slug: "member-spotlight",
      category: "Member Stories",
    },
    {
      id: 3,
      title: "Upcoming Networking Event in May",
      excerpt:
        "Mark your calendars for our biggest networking event of the year, featuring guest speakers and opportunity to connect with industry leaders.",
      content: "Extended content about the networking event would go here...",
      date: "April 5, 2025",
      author: "Events Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h800v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3ENetworking Event%3C/text%3E%3C/svg%3E",
      slug: "networking-event-may",
      category: "Events",
    },
    {
      id: 4,
      title: "Industry Expert Interview: Leadership in 2025",
      excerpt:
        "We sat down with renowned leadership expert Dr. Jane Smith to discuss the future of leadership and management in today's evolving workplace.",
      content: "Extended content about the interview would go here...",
      date: "April 1, 2025",
      author: "Content Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h800v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3EExpert Interview%3C/text%3E%3C/svg%3E",
      slug: "leadership-interview",
      category: "Interviews",
    },
    {
      id: 5,
      title: "New Resource Library Launch",
      excerpt:
        "We're excited to announce the launch of our enhanced resource library, providing members with access to hundreds of new materials.",
      content: "Extended content about the resource library would go here...",
      date: "March 25, 2025",
      author: "Admin",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h800v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3EResource Library%3C/text%3E%3C/svg%3E",
      slug: "resource-library-launch",
      category: "Resources",
    },
    {
      id: 6,
      title: "Community Spotlight: Volunteer Initiative",
      excerpt:
        "Learn about our community's recent volunteer efforts and how COLLEKTIV.CLUB members are making a difference.",
      content: "Extended content about volunteer initiatives would go here...",
      date: "March 20, 2025",
      author: "Community Manager",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h800v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3EVolunteer Initiative%3C/text%3E%3C/svg%3E",
      slug: "volunteer-initiative",
      category: "Community",
    },
  ];

  const categories = Array.from(new Set(articles.map(article => article.category)));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-blue">Insights & Updates</h1>
              <p className="text-xl text-gray-700 mb-8">
                Stay informed with the latest news, events, and stories from our community.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-collektiv-blue"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-collektiv-blue">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* News Content */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold mb-4 text-collektiv-blue">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-collektiv-blue font-medium hover:underline">All Articles</a>
                    </li>
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a href="#" className="text-gray-700 hover:text-collektiv-blue transition-colors">
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-collektiv-blue">Subscribe</h3>
                  <p className="text-gray-600 mb-4">
                    Get the latest updates delivered directly to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-blue"
                  />
                  <button className="w-full bg-collektiv-blue text-white px-4 py-2 rounded-md hover:bg-collektiv-lightblue transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {articles.map((article) => (
                    <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="mb-3">
                          <span className="inline-block bg-collektiv-blue/10 text-collektiv-blue text-sm px-3 py-1 rounded-full">
                            {article.category}
                          </span>
                        </div>
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
                          className="inline-flex items-center text-collektiv-blue font-medium hover:text-collektiv-lightblue transition-colors"
                        >
                          Read More
                          <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-1">
                    <a href="#" className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                      Previous
                    </a>
                    <a href="#" className="px-4 py-2 bg-collektiv-blue text-white rounded-md">
                      1
                    </a>
                    <a href="#" className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                      2
                    </a>
                    <a href="#" className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                      3
                    </a>
                    <a href="#" className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                      Next
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Insights;
