
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightsHero from "@/components/insights/InsightsHero";
import InsightsSidebar from "@/components/insights/InsightsSidebar";
import ArticlesGrid from "@/components/insights/ArticlesGrid";
import { articles } from "@/data/articles";

const Insights = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");

  const categories = ["All Articles", ...Array.from(new Set(articles.map(article => article.category)))];
  
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
        <InsightsHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="section bg-collektiv-dark">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <InsightsSidebar 
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
              <ArticlesGrid articles={filteredArticles} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Insights;
