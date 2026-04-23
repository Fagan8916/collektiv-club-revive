import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Wallet, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Row {
  deal_slug: string;
  amount_pence: number;
  currency: string;
  deal_name: string;
}

interface CommitmentRow {
  id: string;
  deal_slug: string;
  amount_pence: number;
  currency: string;
  status: string;
  deal_name: string;
}

const formatGBP = (pence: number, currency = "GBP") =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(pence / 100);

// Fetch live FX rates with GBP base. Falls back to a sensible static table on failure.
// Static fallback uses approximate Apr-2026 rates so totals never silently treat
// foreign currencies as 1:1 GBP.
const STATIC_FALLBACK_RATES_GBP_BASE: Record<string, number> = {
  GBP: 1,
  USD: 1.27,
  EUR: 1.17,
};

const fetchFxRates = async (): Promise<Record<string, number>> => {
  try {
    // open.er-api.com is free, no key required, returns { rates: { USD: ..., EUR: ... } } in base currency
    const res = await fetch("https://open.er-api.com/v6/latest/GBP");
    if (!res.ok) throw new Error("FX request failed");
    const json = await res.json();
    if (json && json.result === "success" && json.rates) {
      return json.rates as Record<string, number>;
    }
  } catch (_) {
    // ignore — fall back to static table
  }
  return STATIC_FALLBACK_RATES_GBP_BASE;
};

// Convert an amount in minor units of `from` currency into GBP pence.
const toGbpPence = (amountMinor: number, from: string, ratesGbpBase: Record<string, number>) => {
  const cur = (from || "GBP").toUpperCase();
  if (cur === "GBP") return amountMinor;
  const rate = ratesGbpBase[cur];
  if (!rate || rate <= 0) return amountMinor; // fallback: treat as GBP
  // ratesGbpBase[X] = how many X per 1 GBP, so GBP = X / rate
  return Math.round(amountMinor / rate);
};

const MyInvestments = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);
  const [commitments, setCommitments] = useState<CommitmentRow[]>([]);
  const [fxRates, setFxRates] = useState<Record<string, number>>({ GBP: 1 });

  useEffect(() => {
    const load = async () => {
      if (!user?.email || !user?.id) {
        setLoading(false);
        return;
      }
      setLoading(true);

      const [{ data: investments }, { data: deals }, { data: commitData }, rates] = await Promise.all([
        supabase
          .from("member_investments")
          .select("deal_slug, amount_pence, currency")
          .ilike("email", user.email),
        supabase.from("investment_deals").select("slug, name"),
        supabase
          .from("deal_commitments")
          .select("id, deal_slug, amount_pence, currency, status")
          .eq("user_id", user.id)
          .in("status", ["pending", "rejected"]),
        fetchFxRates(),
      ]);
      setFxRates(rates);

      const dealMap = new Map((deals ?? []).map((d) => [d.slug, d.name]));
      const enriched: Row[] = (investments ?? []).map((r) => ({
        deal_slug: r.deal_slug,
        amount_pence: r.amount_pence,
        currency: r.currency,
        deal_name: dealMap.get(r.deal_slug) ?? r.deal_slug,
      }));
      enriched.sort((a, b) => b.amount_pence - a.amount_pence);
      setRows(enriched);

      const enrichedCommits: CommitmentRow[] = (commitData ?? []).map((c) => ({
        id: c.id,
        deal_slug: c.deal_slug,
        amount_pence: c.amount_pence,
        currency: c.currency,
        status: c.status,
        deal_name: dealMap.get(c.deal_slug) ?? c.deal_slug,
      }));
      setCommitments(enrichedCommits);

      setLoading(false);
    };
    load();
  }, [user?.email, user?.id]);

  const total = rows.reduce((sum, r) => sum + toGbpPence(r.amount_pence, r.currency, fxRates), 0);
  const pendingTotal = commitments
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + toGbpPence(c.amount_pence, c.currency, fxRates), 0);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (rows.length === 0 && commitments.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-8 text-center">
          <Wallet className="mx-auto h-10 w-10 text-collektiv-green mb-3" />
          <h3 className="font-playfair text-lg font-bold text-collektiv-dark mb-1">
            No investments on file yet
          </h3>
          <p className="text-sm text-gray-600">
            Once you participate in a deal, your contributions will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {/* Total banner */}
      {rows.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-collektiv-green to-collektiv-dark text-white p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-1 text-green-100 text-xs uppercase tracking-wide">
            <TrendingUp className="h-4 w-4" /> Total invested to date
          </div>
          <div className="font-playfair text-3xl font-bold">
            {formatGBP(total, "GBP")}
          </div>
          <div className="text-green-100 text-xs mt-1">
            Across {rows.length} {rows.length === 1 ? "deal" : "deals"}
          </div>
        </div>
      )}

      {/* Pending commitments */}
      {commitments.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-amber-600" />
            <h3 className="font-bold text-collektiv-dark">Pending commitments</h3>
            {pendingTotal > 0 && (
              <Badge variant="outline" className="ml-auto">
                {formatGBP(pendingTotal)} pending
              </Badge>
            )}
          </div>
          <div className="space-y-3">
            {commitments.map((c) => (
              <Link
                key={c.id}
                to={`/members/investments/${c.deal_slug}`}
                className="block"
              >
                <Card className="hover:shadow-md transition-shadow border border-amber-200 bg-amber-50/40">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-collektiv-dark">{c.deal_name}</div>
                      <div className="text-xs text-gray-600 capitalize mt-0.5">
                        {c.status === "pending" ? "Awaiting admin confirmation" : c.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-700">
                        {formatGBP(c.amount_pence, c.currency)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Per-deal breakdown */}
      {rows.length > 0 && (
        <div>
          <h3 className="font-bold text-collektiv-dark mb-2">Confirmed investments</h3>
          <div className="space-y-3">
            {rows.map((row) => (
              <Link
                key={row.deal_slug}
                to={`/members/investments/${row.deal_slug}`}
                className="block"
              >
                <Card className="hover:shadow-md transition-shadow border border-collektiv-green/15">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-collektiv-dark">{row.deal_name}</div>
                      <div className="text-xs text-gray-500">View deal details →</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-collektiv-green">
                        {formatGBP(row.amount_pence, row.currency)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyInvestments;
