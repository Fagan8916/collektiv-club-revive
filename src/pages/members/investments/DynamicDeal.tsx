import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, FileText, PlayCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Deal = {
  slug: string;
  name: string;
  tagline: string | null;
  logo_url: string | null;
  website_url: string | null;
  status: string;
  round: string | null;
  valuation: string | null;
  ticket_min: string | null;
  close_date: string | null;
  overview: string | null;
  memo: string | null;
  recording_url: string | null;
};

const detailRows: { label: string; key: keyof Deal }[] = [
  { label: "Round", key: "round" },
  { label: "Valuation", key: "valuation" },
  { label: "Minimum ticket", key: "ticket_min" },
  { label: "Close date", key: "close_date" },
  { label: "Status", key: "status" },
];

const DynamicDeal = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("investment_deals")
        .select(
          "slug, name, tagline, logo_url, website_url, status, round, valuation, ticket_min, close_date, overview, memo, recording_url",
        )
        .eq("slug", slug)
        .maybeSingle();
      if (error) console.error("DynamicDeal load error", error);
      setDeal((data as Deal | null) ?? null);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-collektiv-accent to-white">
        <p className="text-collektiv-green">Loading deal…</p>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-collektiv-accent to-white p-6">
        <p className="text-collektiv-dark mb-4">This deal isn't available.</p>
        <Button onClick={() => navigate("/members")} variant="outline">
          Back to Members Zone
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-collektiv-accent to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/members" className="inline-flex items-center mb-6 text-collektiv-green hover:underline">
          <ArrowLeft className="mr-2" size={20} /> Back to Members Zone
        </Link>

        <Card>
          <CardHeader className="text-center">
            {deal.logo_url && (
              <div className="flex justify-center mb-4">
                <img src={deal.logo_url} alt={deal.name} className="h-20 w-auto object-contain" />
              </div>
            )}
            <CardTitle className="text-3xl text-collektiv-green">{deal.name}</CardTitle>
            {deal.tagline && <p className="text-gray-600 mt-2">{deal.tagline}</p>}

            {deal.website_url && (
              <a
                href={deal.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center justify-center mt-2"
              >
                {deal.website_url.replace(/^https?:\/\//, "")} <ExternalLink className="ml-1" size={16} />
              </a>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              {deal.memo && (
                <Button
                  asChild
                  size="lg"
                  className="bg-collektiv-green hover:bg-collektiv-lightgreen text-base px-6 py-3"
                >
                  <Link to={`/members/investments/${deal.slug}/memo`}>
                    <FileText className="mr-2 h-4 w-4" /> Investment Memo
                  </Link>
                </Button>
              )}
              {deal.recording_url && (
                <Button asChild size="lg" variant="outline" className="text-base px-6 py-3">
                  <a href={deal.recording_url} target="_blank" rel="noopener noreferrer">
                    <PlayCircle className="mr-2 h-4 w-4" /> Watch recording
                  </a>
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {deal.overview && (
              <section>
                <h3 className="text-xl font-semibold mb-3 text-collektiv-green">About {deal.name}</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">{deal.overview}</div>
              </section>
            )}

            {detailRows.some((r) => deal[r.key]) && (
              <section>
                <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Deal details</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {detailRows.map((r) =>
                    deal[r.key] ? (
                      <li key={r.key}>
                        <strong>{r.label}:</strong> {String(deal[r.key])}
                      </li>
                    ) : null,
                  )}
                </ul>
              </section>
            )}

            {deal.recording_url && deal.recording_url.includes("drive.google.com") && (
              <section>
                <h3 className="text-xl font-semibold mb-3 text-collektiv-green">Recording</h3>
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={deal.recording_url.replace("/view", "/preview")}
                    className="absolute inset-0 w-full h-full rounded-lg"
                    allow="autoplay"
                    allowFullScreen
                    title={`${deal.name} recording`}
                  />
                </div>
              </section>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DynamicDeal;
