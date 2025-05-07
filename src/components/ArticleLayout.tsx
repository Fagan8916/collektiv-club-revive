
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface ArticleLayoutProps {
  title: string;
  date: string;
  author: string;
  category: string;
  content: React.ReactNode;
  image?: string;
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  title,
  date,
  author,
  category,
  content,
  image = "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
}) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Link to="/insights" className="inline-flex items-center text-collektiv-lightgreen hover:text-collektiv-green mb-6">
                <ArrowLeft size={16} className="mr-2" />
                Back to Insights
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-collektiv-green">{title}</h1>
              <div className="flex flex-wrap items-center text-gray-500 mb-6 space-x-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span>{author}</span>
                </div>
                <div className="inline-block bg-collektiv-lightgreen/10 text-collektiv-green text-sm px-3 py-1 rounded-full">
                  {category}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="container my-8">
          <div className="max-w-4xl mx-auto">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-80 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* Article Content */}
        <article className="container my-12">
          <div className="max-w-3xl mx-auto article-content">
            {content}
          </div>
        </article>

        {/* Related Articles */}
        <section className="bg-gray-50 py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 text-collektiv-green text-center">More Insights</h3>
              <div className="text-center">
                <Link to="/insights" className="btn-primary inline-flex items-center">
                  View All Insights
                  <ArrowLeft size={16} className="ml-2 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleLayout;
