import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/data/articles";

export interface SubstackArticle extends Article {
  link?: string;
  isSubstack: true;
}

async function fetchSubstackArticles(): Promise<SubstackArticle[]> {
  const { data, error } = await supabase.functions.invoke("fetch-substack-feed");

  if (error) {
    console.error("Failed to fetch Substack articles:", error);
    return [];
  }

  return data as SubstackArticle[];
}

export function useSubstackArticles() {
  return useQuery({
    queryKey: ["substack-articles"],
    queryFn: fetchSubstackArticles,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    retry: 1,
  });
}
