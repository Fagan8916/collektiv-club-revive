import React from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import ArticleLayout from "@/components/ArticleLayout";
import { useSubstackArticles } from "@/hooks/useSubstackArticles";

const SubstackArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: articles, isLoading } = useSubstackArticles();

  const article = articles?.find((a) => a.slug === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-muted-foreground">Article not found.</p>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(article.content, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });

  return (
    <ArticleLayout
      title={article.title}
      date={article.date}
      author={article.author}
      category={article.category}
      image={article.image}
      content={
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      }
    />
  );
};

export default SubstackArticle;
