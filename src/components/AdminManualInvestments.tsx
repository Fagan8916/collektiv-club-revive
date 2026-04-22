import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2, PencilLine, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Deal {
  slug: string;
  name: string;
}

interface MemberOption {
  email: string;
  label: string;
}

interface InvestmentRow {
  id: string;
  email: string;
  deal_slug: string;
  amount_pence: number;
  currency: string;
  imported_at: string;
}

const formatGBP = (pence: number, currency = "GBP") =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(pence / 100);

const AdminManualInvestments = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [members, setMembers] = useState<MemberOption[]>([]);
  const [rows, setRows] = useState<InvestmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [emailMode, setEmailMode] = useState<"select" | "manual">("select");
  const [email, setEmail] = useState("");
  const [dealSlug, setDealSlug] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const dealMap = useMemo(
    () => new Map(deals.map((d) => [d.slug, d.name])),
    [deals],
  );

  const loadAll = async () => {
    setLoading(true);
    const [dealRes, investmentRes, profileRes, preApprovedRes] = await Promise.all([
      supabase.from("investment_deals").select("slug, name").order("name"),
      supabase
        .from("member_investments")
        .select("id, email, deal_slug, amount_pence, currency, imported_at")
        .order("imported_at", { ascending: false }),
      supabase
        .from("member_profiles")
        .select("user_id, contact_email, first_name, full_name")
        .order("full_name", { ascending: true }),
      supabase.from("pre_approved_emails").select("email, full_name"),
    ]);

    if (dealRes.error) console.error("[AdminManualInvestments] deals load error:", dealRes.error);
    if (investmentRes.error)
      console.error("[AdminManualInvestments] investments load error:", investmentRes.error);
    if (profileRes.error)
      console.error("[AdminManualInvestments] profiles load error:", profileRes.error);
    if (preApprovedRes.error)
      console.error("[AdminManualInvestments] pre-approved load error:", preApprovedRes.error);

    console.log("[AdminManualInvestments] loaded deals:", dealRes.data?.length ?? 0);
    console.log(
      "[AdminManualInvestments] loaded profiles:",
      profileRes.data?.length ?? 0,
      "pre-approved:",
      preApprovedRes.data?.length ?? 0,
    );

    setDeals(dealRes.data ?? []);
    setRows((investmentRes.data ?? []) as InvestmentRow[]);

    // Build dropdown directly from the same data source the Admin → Profiles tab uses,
    // augmented with pre-approved emails and existing investment emails as fallbacks.
    const map = new Map<string, string>();

    // 1) Pre-approved emails (have full_name) — baseline list of approved members
    (preApprovedRes.data ?? []).forEach((p) => {
      if (!p.email) return;
      const key = p.email.toLowerCase();
      map.set(key, p.full_name ? `${p.full_name} — ${p.email}` : p.email);
    });

    // 2) Member profiles — same source as Admin → Profiles. Overwrite label with the
    //    richer name we display elsewhere in the admin console.
    (profileRes.data ?? []).forEach((p) => {
      if (!p.contact_email) return;
      const key = p.contact_email.toLowerCase();
      const name = [p.first_name, p.full_name].filter(Boolean).join(" ").trim();
      map.set(key, name ? `${name} — ${p.contact_email}` : p.contact_email);
    });

    // 3) Existing investment emails as last fallback so prior entries remain editable
    (investmentRes.data ?? []).forEach((inv) => {
      const key = inv.email.toLowerCase();
      if (!map.has(key)) map.set(key, inv.email);
    });

    setMembers(
      Array.from(map.entries())
        .map(([email, label]) => ({ email, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    );
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setEmail("");
    setDealSlug("");
    setAmountInput("");
    setEmailMode("select");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      toast.error("Please provide a valid member email.");
      return;
    }
    if (!dealSlug) {
      toast.error("Please select a deal.");
      return;
    }

    const numeric = Number(amountInput.replace(/[£,\s]/g, ""));
    if (!Number.isFinite(numeric) || numeric <= 0) {
      toast.error("Please enter a valid amount in £ (e.g. 2500).");
      return;
    }
    const pence = Math.round(numeric * 100);

    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const payload = {
        email: cleanEmail,
        deal_slug: dealSlug,
        amount_pence: pence,
        currency: "GBP",
        imported_by: user?.id ?? null,
      };
      console.log("[AdminManualInvestments] upsert payload:", payload);

      const { data, error } = await supabase
        .from("member_investments")
        .upsert(payload, { onConflict: "deal_slug,email" })
        .select();

      if (error) {
        console.error("[AdminManualInvestments] upsert error:", error);
        throw new Error(error.message || error.details || error.hint || "Unknown DB error");
      }
      console.log("[AdminManualInvestments] upsert success:", data);

      toast.success(
        `${editingId ? "Updated" : "Saved"} ${formatGBP(pence)} for ${cleanEmail} on ${
          dealMap.get(dealSlug) ?? dealSlug
        }.`,
      );
      resetForm();
      await loadAll();
    } catch (err) {
      console.error("Save investment failed", err);
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (row: InvestmentRow) => {
    setEditingId(row.id);
    setEmail(row.email);
    setEmailMode(
      members.some((m) => m.email === row.email.toLowerCase()) ? "select" : "manual",
    );
    setDealSlug(row.deal_slug);
    setAmountInput((row.amount_pence / 100).toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (row: InvestmentRow) => {
    if (
      !confirm(
        `Delete ${formatGBP(row.amount_pence, row.currency)} investment from ${row.email} on ${
          dealMap.get(row.deal_slug) ?? row.deal_slug
        }?`,
      )
    )
      return;
    const { error } = await supabase
      .from("member_investments")
      .delete()
      .eq("id", row.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Investment deleted.");
    await loadAll();
  };

  // Group rows by member email for nicer overview
  const grouped = useMemo(() => {
    const map = new Map<string, { total: number; rows: InvestmentRow[] }>();
    for (const r of rows) {
      const key = r.email.toLowerCase();
      const entry = map.get(key) ?? { total: 0, rows: [] };
      entry.total += r.amount_pence;
      entry.rows.push(r);
      map.set(key, entry);
    }
    return Array.from(map.entries())
      .map(([email, value]) => ({ email, ...value }))
      .sort((a, b) => b.total - a.total);
  }, [rows]);

  return (
    <div className="space-y-6">
      <Card className="border border-collektiv-green/20">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-start gap-3">
            <UserPlus className="h-6 w-6 text-collektiv-green shrink-0 mt-0.5" />
            <div>
              <h3 className="font-playfair text-lg font-bold text-collektiv-dark">
                {editingId ? "Edit member investment" : "Add member investment"}
              </h3>
              <p className="text-sm text-gray-600">
                Select a member, pick the deal, and enter how much they invested in £.
                Each member/deal pair stores a single amount — saving again overwrites it.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Member</Label>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailMode((m) => (m === "select" ? "manual" : "select"));
                      setEmail("");
                    }}
                    className="text-xs text-collektiv-green hover:underline"
                  >
                    {emailMode === "select" ? "Enter email manually" : "Pick from list"}
                  </button>
                </div>
                {emailMode === "select" ? (
                  <select
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">
                      {members.length === 0 ? "No members found" : "Select a member…"}
                    </option>
                    {members.map((m) => (
                      <option key={m.email} value={m.email}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type="email"
                    placeholder="member@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="deal-select">Deal</Label>
                <select
                  id="deal-select"
                  value={dealSlug}
                  onChange={(e) => setDealSlug(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a deal…</option>
                  {deals.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {deals.length === 0 && !loading && (
                  <p className="text-xs text-red-600">
                    No deals found. Add deals in the Deals tab first.
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <Label>Amount invested (£)</Label>
                <Input
                  inputMode="decimal"
                  placeholder="e.g. 2500"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                />
              </div>
              <div className="flex items-end gap-2">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-collektiv-green hover:bg-collektiv-lightgreen text-white"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  {editingId ? "Update" : "Save"}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border border-collektiv-green/20">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair text-lg font-bold text-collektiv-dark">
              Recorded investments
            </h3>
            {!loading && (
              <span className="text-xs text-gray-500">
                {grouped.length} member{grouped.length === 1 ? "" : "s"} · {rows.length}{" "}
                line{rows.length === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex items-center text-sm text-gray-600">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Loading…
            </div>
          ) : grouped.length === 0 ? (
            <p className="text-sm text-gray-500">
              No investments recorded yet. Add the first one above.
            </p>
          ) : (
            <div className="space-y-4">
              {grouped.map((member) => (
                <div
                  key={member.email}
                  className="rounded-lg border border-gray-200 overflow-hidden"
                >
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2">
                    <div className="text-sm font-semibold text-collektiv-dark">
                      {members.find((m) => m.email === member.email)?.label ?? member.email}
                    </div>
                    <div className="text-sm font-bold text-collektiv-green">
                      {formatGBP(member.total)}
                    </div>
                  </div>
                  <div className="divide-y">
                    {member.rows.map((row) => (
                      <div
                        key={row.id}
                        className="flex items-center justify-between px-4 py-2 text-sm"
                      >
                        <div>
                          <div className="font-medium text-collektiv-dark">
                            {dealMap.get(row.deal_slug) ?? row.deal_slug}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatGBP(row.amount_pence, row.currency)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(row)}
                          >
                            <PencilLine className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(row)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
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

export default AdminManualInvestments;
