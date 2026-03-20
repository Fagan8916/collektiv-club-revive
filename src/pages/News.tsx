
import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightsHero from "@/components/insights/InsightsHero";
import InsightsSidebar from "@/components/insights/InsightsSidebar";
import ArticlesGrid from "@/components/insights/ArticlesGrid";
import { articles } from "@/data/articles";
import { useSubstackArticles } from "@/hooks/useSubstackArticles";

const Insights = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const { data: substackArticles = [] } = useSubstackArticles();

  const allArticles = useMemo(() => {
    const hardcodedSlugs = new Set(articles.map(a => a.slug));
    const deduped = substackArticles.filter(a => !hardcodedSlugs.has(a.slug));
    const merged = [...articles, ...deduped];
    // Sort newest first by parsing dates
    return merged.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      if (isNaN(da) && isNaN(db)) return 0;
      if (isNaN(da)) return 1;
      if (isNaN(db)) return -1;
      return db - da;
    });
  }, [substackArticles]);

  const categories = ["All Articles", ...Array.from(new Set(allArticles.map(article => article.category)))];
  
  const filteredArticles = allArticles.filter(article => {
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
