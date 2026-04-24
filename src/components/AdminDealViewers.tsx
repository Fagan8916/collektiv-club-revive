import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Eye, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ViewRow = {
  id: string;
  user_id: string;
  viewer_email: string | null;
  page_type: string;
  viewed_at: string;
};

type Aggregated = {
  user_id: string;
  email: string;
  name: string;
  overviewCount: number;
  memoCount: number;
  lastViewed: string;
};

interface Props {
  dealSlug: string;
}

const AdminDealViewers: React.FC<Props> = ({ dealSlug }) => {
  const [rows, setRows] = useState<Aggregated[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data: views, error } = await supabase
        .from("deal_views")
        .select("id, user_id, viewer_email, page_type, viewed_at")
        .eq("deal_slug", dealSlug)
        .order("viewed_at", { ascending: false });

      if (error) {
        console.error("[AdminDealViewers] load error", error);
        if (!cancelled) {
          setRows([]);
          setLoading(false);
        }
        return;
      }

      const viewRows = (views ?? []) as ViewRow[];
      const userIds = Array.from(new Set(viewRows.map((v) => v.user_id)));

      let nameByUserId: Record<string, string> = {};
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("member_profiles")
          .select("user_id, first_name, full_name")
          .in("user_id", userIds);
        for (const p of profiles ?? []) {
          const first = (p.first_name ?? "").trim();
          const last = (p.full_name ?? "").trim();
          const display = [first, last].filter(Boolean).join(" ");
          if (display) nameByUserId[p.user_id] = display;
        }
      }

      const map = new Map<string, Aggregated>();
      for (const v of viewRows) {
        const existing = map.get(v.user_id);
        const email = v.viewer_email ?? "";
        const name = nameByUserId[v.user_id] || email || "Unknown member";
        if (!existing) {
          map.set(v.user_id, {
            user_id: v.user_id,
            email,
            name,
            overviewCount: v.page_type === "overview" ? 1 : 0,
            memoCount: v.page_type === "memo" ? 1 : 0,
            lastViewed: v.viewed_at,
          });
        } else {
          if (v.page_type === "overview") existing.overviewCount += 1;
          if (v.page_type === "memo") existing.memoCount += 1;
          if (v.viewed_at > existing.lastViewed) existing.lastViewed = v.viewed_at;
        }
      }

      if (!cancelled) {
        setRows(Array.from(map.values()).sort((a, b) => (a.lastViewed < b.lastViewed ? 1 : -1)));
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dealSlug, expanded]);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="inline-flex items-center gap-2 text-xs font-medium text-collektiv-green hover:underline"
      >
        <Users className="h-3.5 w-3.5" />
        {expanded ? "Hide viewers" : "Show viewers"}
      </button>

      {expanded && (
        <div className="mt-2 rounded-md border bg-white p-3">
          {loading ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Loading viewers…
            </div>
          ) : rows.length === 0 ? (
            <p className="text-xs text-muted-foreground">No member has viewed this deal yet.</p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                {rows.length} unique {rows.length === 1 ? "viewer" : "viewers"}
              </p>
              <ul className="divide-y divide-gray-100">
                {rows.map((r) => (
                  <li key={r.user_id} className="py-2 flex items-start justify-between gap-3 text-xs">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-collektiv-dark truncate">{r.name}</p>
                      {r.email && r.email !== r.name && (
                        <p className="text-muted-foreground truncate">{r.email}</p>
                      )}
                      <p className="text-muted-foreground mt-0.5">
                        Last viewed {new Date(r.lastViewed).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <Badge variant="outline" className="gap-1">
                        <Eye className="h-3 w-3" /> {r.overviewCount} overview
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <FileText className="h-3 w-3" /> {r.memoCount} memo
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDealViewers;
