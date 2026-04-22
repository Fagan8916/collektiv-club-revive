import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Deal = {
  slug: string;
  name: string;
  logo_url: string | null;
  memo: string | null;
};

const DynamicDealMemo = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("investment_deals")
        .select("slug, name, logo_url, memo")
        .eq("slug", slug)
        .maybeSingle();
      setDeal((data as Deal | null) ?? null);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-collektiv-accent to-white">
        <p className="text-collektiv-green">Loading memo…</p>
      </div>
    );
  }

  if (!deal || !deal.memo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-collektiv-accent to-white p-6">
        <p className="text-collektiv-dark mb-4">No memo available for this deal.</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-collektiv-accent to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to={`/members/investments/${deal.slug}`}
          className="inline-flex items-center mb-6 text-collektiv-green hover:underline"
        >
          <ArrowLeft className="mr-2" size={20} /> Back to {deal.name} overview
        </Link>

        <div className="text-center mb-8">
          {deal.logo_url && (
            <img src={deal.logo_url} alt={deal.name} className="h-20 w-auto object-contain mx-auto mb-4" />
          )}
          <h1 className="text-4xl font-bold text-collektiv-green mb-2">Investment Memo: {deal.name}</h1>
          <p className="text-gray-600">Prepared by Collektiv Club</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose prose-collektiv max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {deal.memo}
            </div>
          </CardContent>
        </Card>

        <Card className="border-collektiv-green/30">
          <CardContent className="p-6 text-xs text-gray-600 space-y-2">
            <p className="font-semibold text-collektiv-dark">Important Disclaimer</p>
            <p>
              This memo is provided for information only and does not constitute investment advice, an offer to sell, or
              a solicitation to buy securities. Investing in private companies involves substantial risk, including
              total loss of capital. Investments may be illiquid for several years. Past performance is not indicative
              of future results. Tax treatment depends on individual circumstances. Conduct your own due diligence
              and consult independent professional advice before investing. Collektiv is not regulated by the FCA.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DynamicDealMemo;
