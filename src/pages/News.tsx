
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

const Insights = () => {
  const articles = [
    {
      id: 1,
      title: "Lessons from 483 Investments: Insights from Angel Investing Legend Charlie",
      excerpt:
        "Charlie O'Donnell, a seasoned angel investor with nearly 500 investments, shares his invaluable insights and principles that have guided his successful investment journey.",
      content: "Extended content about angel investing would go here...",
      date: "April 15, 2025",
      author: "Admin",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EAngel Investment Lessons%3C/text%3E%3C/svg%3E",
      slug: "lessons-from-483-investments",
      category: "Angel Investing",
    },
    {
      id: 2,
      title: "SaaS Funding Agreements: Ups and Downs",
      excerpt:
        "Understanding the complexities and trade-offs in SaaS funding agreements, including preferred share structures, participating preferred shares, and their implications for founders.",
      content: "Extended content about SaaS funding agreements would go here...",
      date: "April 10, 2025",
      author: "Content Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3ESaaS Funding%3C/text%3E%3C/svg%3E",
      slug: "saas-funding-agreements",
      category: "Funding",
    },
    {
      id: 3,
      title: "Unlock Success: Key Tips for Beginner Angel Investors",
      excerpt:
        "Essential guidance for new angel investors on portfolio strategy, due diligence, and the importance of both financial returns and personal fulfillment in early-stage investing.",
      content: "Extended content about beginner angel investing would go here...",
      date: "April 5, 2025",
      author: "Events Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EBeginner Angel Tips%3C/text%3E%3C/svg%3E",
      slug: "tips-for-beginner-angel-investors",
      category: "Angel Investing",
    },
    {
      id: 4,
      title: "EIS & SEIS: Tax-Efficient Investment Schemes",
      excerpt:
        "A comprehensive guide to the Enterprise Investment Scheme (EIS) and Seed Enterprise Investment Scheme (SEIS), their tax benefits, eligibility requirements, and investment limits.",
      content: "Extended content about EIS and SEIS would go here...",
      date: "April 1, 2025",
      author: "Content Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EEIS and SEIS%3C/text%3E%3C/svg%3E",
      slug: "eis-seis-tax-schemes",
      category: "Tax Relief",
    },
    {
      id: 5,
      title: "Understanding Multiples in SaaS Valuations",
      excerpt:
        "Exploring the concept of multiples in SaaS company valuations, how they're calculated, and their significance as a benchmark for comparing companies across different stages.",
      content: "Extended content about multiples in SaaS valuations would go here...",
      date: "March 25, 2025",
      author: "Admin",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EMultiples in SaaS%3C/text%3E%3C/svg%3E",
      slug: "understanding-multiples",
      category: "Valuation",
    },
    {
      id: 6,
      title: "Top Metrics to Evaluate When Investing in SaaS Startups",
      excerpt:
        "Analyzing the crucial metrics investors should consider when evaluating SaaS companies, from Annual Recurring Revenue (ARR) to Customer Acquisition Cost (CAC) and Churn Rate.",
      content: "Extended content about SaaS metrics would go here...",
      date: "March 20, 2025",
      author: "Community Manager",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3ESaaS Metrics%3C/text%3E%3C/svg%3E",
      slug: "saas-metrics-evaluation",
      category: "Metrics",
    },
    {
      id: 7,
      title: "Valuations: The Art and Science of Startup Worth",
      excerpt:
        "An in-depth look at startup valuations, the methodologies used, and the factors that influence them, from revenue multiples to market conditions and investor sentiment.",
      content: "Extended content about valuations would go here...",
      date: "March 15, 2025",
      author: "Finance Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EStartup Valuations%3C/text%3E%3C/svg%3E",
      slug: "startup-valuations",
      category: "Valuation",
    },
    {
      id: 8,
      title: "Understanding Angel Syndicates for SaaS Startups",
      excerpt:
        "A guide to angel syndicates, their structure, benefits, and considerations for both founders seeking funding and investors looking to participate in syndicated deals.",
      content: "Extended content about angel syndicates would go here...",
      date: "March 10, 2025",
      author: "Investment Team",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h800v400H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3EAngel Syndicates%3C/text%3E%3C/svg%3E",
      slug: "angel-syndicates",
      category: "Angel Investing",
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
