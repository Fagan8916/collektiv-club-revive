import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

type DbDeal = {
  slug: string;
  name: string;
  tagline: string | null;
  logo_url: string | null;
  website_url: string | null;
  status: string;
  sort_order: number;
};

// Local logo fallback for legacy deals whose logo_url hasn't been
// uploaded into the deal-logos bucket yet. Keyed by slug.
const LEGACY_LOGOS: Record<string, string> = {
  anthropic: "/lovable-uploads/anthropic-logo-new.png",
  kalshi: "/lovable-uploads/kalshi-logo.png",
  propane: "/lovable-uploads/8429af36-140a-4fc4-a401-e12fd22d19cc.png",
  loxa: "/lovable-uploads/7b1277a2-292c-4e86-ae2a-8dcae7fa5781.png",
  pandektes: "/lovable-uploads/2801fd4b-1d50-485c-a999-0695274f5f05.png",
  beimpact: "/lovable-uploads/beimpact-logo.jpg",
  webel: "/lovable-uploads/webel-logo-new.png",
};

const NewDealsSection: React.FC = () => {
  const [deals, setDeals] = useState<DbDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("investment_deals")
        .select("slug, name, tagline, logo_url, website_url, status, sort_order")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .order("sort_order", { ascending: false });
      // Deduplicate by slug just in case the table has duplicates
      const seen = new Set<string>();
      const unique = ((data ?? []) as DbDeal[]).filter((d) => {
        if (seen.has(d.slug)) return false;
        seen.add(d.slug);
        return true;
      });
      setDeals(unique);
      setLoading(false);
    };
    load();
  }, []);

  if (loading || deals.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-2 text-collektiv-green text-center">Collektiv Portfolio</h2>
      <p className="text-sm text-gray-600 text-center mb-6">All published investment opportunities.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {deals.map((deal) => {
          const logo = deal.logo_url || LEGACY_LOGOS[deal.slug];
          return (
            <Link key={deal.slug} to={`/members/investments/${deal.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center items-center h-16">
                    {logo ? (
                      <img src={logo} alt={deal.name} className="max-h-16 w-auto object-contain" />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-collektiv-green/10 flex items-center justify-center text-collektiv-green font-bold text-xl">
                        {deal.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-collektiv-green">{deal.name}</h3>
                  {deal.tagline && <p className="text-sm text-gray-600 mb-2">{deal.tagline}</p>}
                  <Badge className="bg-collektiv-green">Status: {deal.status}</Badge>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NewDealsSection;
