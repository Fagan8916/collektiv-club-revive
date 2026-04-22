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

const NewDealsSection: React.FC = () => {
  const [deals, setDeals] = useState<DbDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("investment_deals")
        .select("slug, name, tagline, logo_url, website_url, status, sort_order")
        .eq("is_published", true)
        .order("sort_order", { ascending: false })
        .order("created_at", { ascending: false });
      setDeals((data ?? []) as DbDeal[]);
      setLoading(false);
    };
    load();
  }, []);

  if (loading || deals.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-2 text-collektiv-green text-center">New Deals</h2>
      <p className="text-sm text-gray-600 text-center mb-6">Recently added investment opportunities.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {deals.map((deal) => (
          <Link key={deal.slug} to={`/members/investments/${deal.slug}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center items-center h-16">
                  {deal.logo_url ? (
                    <img src={deal.logo_url} alt={deal.name} className="max-h-16 w-auto object-contain" />
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
        ))}
      </div>
    </div>
  );
};

export default NewDealsSection;
