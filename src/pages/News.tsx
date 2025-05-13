import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Insights = () => {
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real implementation, you'd send this to your backend
    console.log("Subscribing email:", email, "to be sent to info@collektiv.club");
    toast({
      title: "Thank you for subscribing to our newsletter",
      description: "Please add Info@collektiv.club to your contacts",
      duration: 5000,
    });
    setEmail("");
  };
  
  const articles = [
    {
      id: 1,
      title: "Convertible Loan Notes: A Smart Financing Tool for Early-Stage SaaS Companies",
      excerpt:
        "Raising capital is a critical milestone for early-stage SaaS companies. One increasingly popular and effective method to secure funding without immediately diluting equity is through convertible loan notes (CLNs).",
      content: "Extended content about convertible loan notes would go here...",
      date: "May 13, 2025",
      author: "Finance Team",
      image: "https://images.unsplash.com/photo-1589666564514-cf2089595b42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "convertible-loan-notes",
      route: "/insights/convertible-loan-notes",
      category: "Funding",
    },
    {
      id: 2,
      title: "Lessons from 483 Investments: Insights from Angel Investing Legend Charlie",
      excerpt:
        "Charlie O'Donnell, a seasoned angel investor with nearly 500 investments, shares his invaluable insights and principles that have guided his successful investment journey.",
      content: "Extended content about angel investing would go here...",
      date: "April 15, 2025",
      author: "Admin",
      image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "lessons-from-483-investments",
      route: "/insights/lessons-from-483-investments",
      category: "Angel Investing",
    },
    {
      id: 3,
      title: "SaaS Funding Agreements: Ups and Downs",
      excerpt:
        "Understanding the complexities and trade-offs in SaaS funding agreements, including preferred share structures, participating preferred shares, and their implications for founders.",
      content: "Extended content about SaaS funding agreements would go here...",
      date: "April 10, 2025",
      author: "Content Team",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "saas-funding-agreements",
      route: "/insights/saas-funding-agreements",
      category: "Funding",
    },
    {
      id: 4,
      title: "Unlock Success: Key Tips for Beginner Angel Investors",
      excerpt:
        "Essential guidance for new angel investors on portfolio strategy, due diligence, and the importance of both financial returns and personal fulfillment in early-stage investing.",
      content: "Extended content about beginner angel investing would go here...",
      date: "April 5, 2025",
      author: "Events Team",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "tips-for-beginner-angel-investors",
      route: "/insights/beginner-angel-investors",
      category: "Angel Investing",
    },
    {
      id: 5,
      title: "EIS & SEIS: Tax-Efficient Investment Schemes",
      excerpt:
        "A comprehensive guide to the Enterprise Investment Scheme (EIS) and Seed Enterprise Investment Scheme (SEIS), their tax benefits, eligibility requirements, and investment limits.",
      content: "Extended content about EIS and SEIS would go here...",
      date: "April 1, 2025",
      author: "Content Team",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "eis-seis-tax-schemes",
      route: "/insights/eis-seis-tax-schemes",
      category: "Tax Relief",
    },
    {
      id: 6,
      title: "Understanding Multiples in SaaS Valuations",
      excerpt:
        "Exploring the concept of multiples in SaaS company valuations, how they're calculated, and their significance as a benchmark for comparing companies across different stages.",
      content: "Extended content about multiples in SaaS valuations would go here...",
      date: "March 25, 2025",
      author: "Admin",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "understanding-multiples",
      route: "/insights/understanding-multiples",
      category: "Valuation",
    },
    {
      id: 7,
      title: "Top Metrics to Evaluate When Investing in SaaS Startups",
      excerpt:
        "Analyzing the crucial metrics investors should consider when evaluating SaaS companies, from Annual Recurring Revenue (ARR) to Customer Acquisition Cost (CAC) and Churn Rate.",
      content: "Extended content about SaaS metrics would go here...",
      date: "March 20, 2025",
      author: "Community Manager",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "saas-metrics-evaluation",
      route: "/insights/saas-metrics-evaluation",
      category: "Metrics",
    },
    {
      id: 8,
      title: "Valuations: The Art and Science of Startup Worth",
      excerpt:
        "An in-depth look at startup valuations, the methodologies used, and the factors that influence them, from revenue multiples to market conditions and investor sentiment.",
      content: "Extended content about valuations would go here...",
      date: "March 15, 2025",
      author: "Finance Team",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "startup-valuations",
      route: "/insights/startup-valuations",
      category: "Valuation",
    },
    {
      id: 9,
      title: "Understanding Angel Syndicates for SaaS Startups",
      excerpt:
        "A guide to angel syndicates, their structure, benefits, and considerations for both founders seeking funding and investors looking to participate in syndicated deals.",
      content: "Extended content about angel syndicates would go here...",
      date: "March 10, 2025",
      author: "Investment Team",
      image: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "angel-syndicates",
      route: "/insights/angel-syndicates",
      category: "Angel Investing",
    },
  ];

  const categories = ["All Articles", ...Array.from(new Set(articles.map(article => article.category)))];
  
  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        article.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "All Articles" || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-green">Insights & Updates</h1>
              <p className="text-xl text-gray-700 mb-8">
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

        {/* News Content */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold mb-4 text-collektiv-green">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <button 
                          onClick={() => setActiveCategory(category)}
                          className={`text-${activeCategory === category ? 'collektiv-green font-medium' : 'gray-700'} hover:text-collektiv-green transition-colors`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-collektiv-green">Subscribe to the newsletter</h3>
                  <p className="text-gray-600 mb-4">
                    Get the latest updates delivered directly to your inbox.
                  </p>
                  <form onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-green"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-collektiv-green text-white px-4 py-2 rounded-md hover:bg-collektiv-lightgreen transition-colors font-bold"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="lg:col-span-3">
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredArticles.map((article) => (
                      <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
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
                            <span className="inline-block bg-collektiv-green/10 text-collektiv-green text-sm px-3 py-1 rounded-full">
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
                    <h3 className="text-xl font-bold text-gray-600 mb-2">No articles found</h3>
                    <p className="text-gray-500">Try adjusting your search or category filter</p>
                  </div>
                )}
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
