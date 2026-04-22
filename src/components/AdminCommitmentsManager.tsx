import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2, XCircle, RotateCcw, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Commitment = {
  id: string;
  user_id: string;
  email: string;
  deal_slug: string;
  amount_pence: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type Deal = { slug: string; name: string };

type Profile = { user_id: string; first_name: string | null; full_name: string };

const formatGBP = (pence: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(pence / 100);

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  cancelled: "bg-gray-100 text-gray-700 border-gray-200",
};

const AdminCommitmentsManager: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filterDeal, setFilterDeal] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const [{ data: c }, { data: d }, { data: p }] = await Promise.all([
      supabase
        .from("deal_commitments")
        .select("id, user_id, email, deal_slug, amount_pence, currency, status, created_at, updated_at")
        .order("created_at", { ascending: false }),
      supabase.from("investment_deals").select("slug, name").order("name"),
      supabase.from("member_profiles").select("user_id, first_name, full_name"),
    ]);
    setCommitments((c ?? []) as Commitment[]);
    setDeals((d ?? []) as Deal[]);
    setProfiles((p ?? []) as Profile[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const dealMap = useMemo(() => new Map(deals.map((d) => [d.slug, d.name])), [deals]);
  const profileMap = useMemo(
    () => new Map(profiles.map((p) => [p.user_id, p])),
    [profiles]
  );

  const filtered = useMemo(() => {
    return commitments.filter((c) => {
      if (filterDeal !== "all" && c.deal_slug !== filterDeal) return false;
      if (filterStatus !== "all" && c.status !== filterStatus) return false;
      return true;
    });
  }, [commitments, filterDeal, filterStatus]);

  // Totals per deal (pending + confirmed only)
  const totalsByDeal = useMemo(() => {
    const map = new Map<string, { pending: number; confirmed: number; count: number }>();
    for (const c of commitments) {
      if (c.status !== "pending" && c.status !== "confirmed") continue;
      const cur = map.get(c.deal_slug) ?? { pending: 0, confirmed: 0, count: 0 };
      if (c.status === "pending") cur.pending += c.amount_pence;
      if (c.status === "confirmed") cur.confirmed += c.amount_pence;
      cur.count += 1;
      map.set(c.deal_slug, cur);
    }
    return map;
  }, [commitments]);

  const updateStatus = async (id: string, newStatus: string) => {
    setBusyId(id);
    const { error } = await supabase
      .from("deal_commitments")
      .update({
        status: newStatus,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);
    setBusyId(null);
    if (error) {
      toast.error("Could not update commitment", { description: error.message });
      return;
    }
    if (newStatus === "confirmed") {
      toast.success("Commitment confirmed", {
        description: "Added to the member's investments.",
      });
    } else {
      toast.success(`Commitment marked as ${newStatus}`);
    }
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this commitment? This cannot be undone.")) return;
    setBusyId(id);
    const { error } = await supabase.from("deal_commitments").delete().eq("id", id);
    setBusyId(null);
    if (error) {
      toast.error("Could not delete", { description: error.message });
      return;
    }
    toast.success("Commitment deleted");
    load();
  };

  const memberName = (c: Commitment) => {
    const p = profileMap.get(c.user_id);
    if (!p) return c.email;
    const first = (p.first_name || "").trim();
    const last = (p.full_name || "").trim();
    const combined = [first, last].filter(Boolean).join(" ");
    return combined || c.email;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-collektiv-green" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Totals per deal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Commitments per deal</CardTitle>
        </CardHeader>
        <CardContent>
          {totalsByDeal.size === 0 ? (
            <p className="text-sm text-gray-600">No commitments yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.from(totalsByDeal.entries()).map(([slug, t]) => (
                <div
                  key={slug}
                  className="rounded-lg border p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-collektiv-dark">
                      {dealMap.get(slug) ?? slug}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t.count} {t.count === 1 ? "commitment" : "commitments"}
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    {t.pending > 0 && (
                      <div className="text-amber-700 font-semibold">
                        {formatGBP(t.pending)} pending
                      </div>
                    )}
                    {t.confirmed > 0 && (
                      <div className="text-collektiv-green font-semibold">
                        {formatGBP(t.confirmed)} confirmed
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="min-w-[180px]">
          <label className="text-xs text-gray-600 mb-1 block">Filter by deal</label>
          <Select value={filterDeal} onValueChange={setFilterDeal}>
            <SelectTrigger>
              <SelectValue placeholder="All deals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All deals</SelectItem>
              {deals.map((d) => (
                <SelectItem key={d.slug} value={d.slug}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-[160px]">
          <label className="text-xs text-gray-600 mb-1 block">Status</label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={load}>Refresh</Button>
      </div>

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            All commitments ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-600">No commitments match the filters.</p>
          ) : (
            <div className="space-y-3">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  className="rounded-lg border p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-collektiv-dark">
                        {memberName(c)}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${STATUS_COLOR[c.status] ?? ""}`}
                      >
                        {c.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 truncate">{c.email}</div>
                    <div className="text-sm mt-1">
                      <span className="font-bold text-collektiv-green">
                        {formatGBP(c.amount_pence)}
                      </span>{" "}
                      <span className="text-gray-600">
                        in {dealMap.get(c.deal_slug) ?? c.deal_slug}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Submitted {new Date(c.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.status !== "confirmed" && (
                      <Button
                        size="sm"
                        className="bg-collektiv-green hover:bg-collektiv-lightgreen"
                        disabled={busyId === c.id}
                        onClick={() => updateStatus(c.id, "confirmed")}
                      >
                        {busyId === c.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        )}
                        Confirm
                      </Button>
                    )}
                    {c.status !== "rejected" && c.status !== "confirmed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={busyId === c.id}
                        onClick={() => updateStatus(c.id, "rejected")}
                      >
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        Reject
                      </Button>
                    )}
                    {c.status !== "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={busyId === c.id}
                        onClick={() => updateStatus(c.id, "pending")}
                      >
                        <RotateCcw className="h-3.5 w-3.5 mr-1" />
                        Reopen
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={busyId === c.id}
                      onClick={() => remove(c.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCommitmentsManager;
