import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, Eye, EyeOff, Save, ExternalLink, Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

type Deal = {
  id: string;
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
  memo_pdf_path: string | null;
  pitch_deck_pdf_path: string | null;
  sort_order: number;
  is_published: boolean;
  published_at: string | null;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const emptyForm: Omit<Deal, "id" | "published_at"> = {
  slug: "",
  name: "",
  tagline: "",
  logo_url: "",
  website_url: "",
  status: "Active",
  round: "",
  valuation: "",
  ticket_min: "",
  close_date: "",
  overview: "",
  memo: "",
  recording_url: "",
  memo_pdf_path: "",
  pitch_deck_pdf_path: "",
  sort_order: 0,
  is_published: false,
};

const AdminDealsManager: React.FC = () => {
  const { user } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [investedBySlug, setInvestedBySlug] = useState<Record<string, { totals: Record<string, number>; investorCount: number }>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingMemo, setUploadingMemo] = useState(false);
  const [uploadingDeck, setUploadingDeck] = useState(false);
  const [logoFeedback, setLogoFeedback] = useState("");
  const [memoFeedback, setMemoFeedback] = useState("");
  const [deckFeedback, setDeckFeedback] = useState("");

  const uploadLogo = async (file: File) => {
    if (!file) return;
    if (!user?.id) {
      setLogoFeedback("Please sign in as an admin first.");
      toast.error("Not signed in", { description: "Please sign in as an admin first." });
      return;
    }
    if (!file.type.startsWith("image/")) {
      setLogoFeedback("Logo must be an image file.");
      toast.error("Logo must be an image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLogoFeedback("Logo too large. Maximum size is 5MB.");
      toast.error("Logo too large", { description: "Maximum size is 5MB." });
      return;
    }
    setLogoFeedback(`Uploading ${file.name}…`);
    setUploadingLogo(true);
    try {
      const ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
      const baseSlug = (form.slug || slugify(form.name) || "deal").replace(/[^a-z0-9-]/g, "");
      const path = `${baseSlug}-${Date.now()}.${ext}`;
      console.log("[AdminDealsManager] Uploading logo to deal-logos:", path, "type=", file.type, "size=", file.size);
      const { data, error } = await supabase.storage
        .from("deal-logos")
        .upload(path, file, { upsert: true, contentType: file.type, cacheControl: "3600" });
      if (error) {
        console.error("[AdminDealsManager] Logo upload error:", error);
        setLogoFeedback(error.message || "Logo upload failed.");
        toast.error("Logo upload failed", {
          description: error.message || "Check that you are signed in as an admin.",
        });
        return;
      }
      console.log("[AdminDealsManager] Logo uploaded:", data);
      const { data: pub } = supabase.storage.from("deal-logos").getPublicUrl(path);
      console.log("[AdminDealsManager] Logo public URL:", pub.publicUrl);
      setForm((f) => ({ ...f, logo_url: pub.publicUrl }));
      setLogoFeedback(`Uploaded ${file.name}. Click Save / Update to keep it.`);
      toast.success("Logo uploaded", { description: "Click Save / Update to keep it." });
    } catch (err) {
      console.error("[AdminDealsManager] Logo upload exception:", err);
      const message = err instanceof Error ? err.message : String(err);
      setLogoFeedback(message);
      toast.error("Logo upload failed", { description: message });
    } finally {
      setUploadingLogo(false);
    }
  };

  const uploadMemoPdf = async (file: File) => {
    if (!file) return;
    if (!user?.id) {
      setMemoFeedback("Please sign in as an admin first.");
      toast.error("Not signed in", { description: "Please sign in as an admin first." });
      return;
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setMemoFeedback("Memo must be a PDF file.");
      toast.error("Memo must be a PDF");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setMemoFeedback("Memo PDF too large. Maximum size is 25MB.");
      toast.error("PDF too large", { description: "Maximum size is 25MB." });
      return;
    }
    setMemoFeedback(`Uploading ${file.name}…`);
    setUploadingMemo(true);
    try {
      const baseSlug = (form.slug || slugify(form.name) || "deal").replace(/[^a-z0-9-]/g, "");
      const path = `${baseSlug}-${Date.now()}.pdf`;
      console.log("[AdminDealsManager] Uploading memo PDF to deal-memos:", path, "size=", file.size);
      const { data, error } = await supabase.storage
        .from("deal-memos")
        .upload(path, file, { upsert: true, contentType: "application/pdf", cacheControl: "3600" });
      if (error) {
        console.error("[AdminDealsManager] Memo upload error:", error);
        setMemoFeedback(error.message || "Memo upload failed.");
        toast.error("Memo upload failed", {
          description: error.message || "Check that you are signed in as an admin.",
        });
        return;
      }
      console.log("[AdminDealsManager] Memo uploaded:", data);
      setForm((f) => ({ ...f, memo_pdf_path: path }));
      setMemoFeedback(`Uploaded ${file.name}. Click Save / Update to keep it.`);
      toast.success("Memo PDF uploaded", { description: "Click Save / Update to keep it." });
    } catch (err) {
      console.error("[AdminDealsManager] Memo upload exception:", err);
      const message = err instanceof Error ? err.message : String(err);
      setMemoFeedback(message);
      toast.error("Memo upload failed", { description: message });
    } finally {
      setUploadingMemo(false);
    }
  };

  const uploadPitchDeckPdf = async (file: File) => {
    if (!file) return;
    if (!user?.id) {
      setDeckFeedback("Please sign in as an admin first.");
      toast.error("Not signed in", { description: "Please sign in as an admin first." });
      return;
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setDeckFeedback("Pitch deck must be a PDF file.");
      toast.error("Pitch deck must be a PDF");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setDeckFeedback("Pitch deck too large. Maximum size is 50MB.");
      toast.error("PDF too large", { description: "Maximum size is 50MB." });
      return;
    }
    setDeckFeedback(`Uploading ${file.name}…`);
    setUploadingDeck(true);
    try {
      const baseSlug = (form.slug || slugify(form.name) || "deal").replace(/[^a-z0-9-]/g, "");
      const path = `${baseSlug}-deck-${Date.now()}.pdf`;
      const { data, error } = await supabase.storage
        .from("deal-pitch-decks")
        .upload(path, file, { upsert: true, contentType: "application/pdf", cacheControl: "3600" });
      if (error) {
        console.error("[AdminDealsManager] Pitch deck upload error:", error);
        setDeckFeedback(error.message || "Pitch deck upload failed.");
        toast.error("Pitch deck upload failed", {
          description: error.message || "Check that you are signed in as an admin.",
        });
        return;
      }
      console.log("[AdminDealsManager] Pitch deck uploaded:", data);
      setForm((f) => ({ ...f, pitch_deck_pdf_path: path }));
      setDeckFeedback(`Uploaded ${file.name}. Click Save / Update to keep it.`);
      toast.success("Pitch deck uploaded", { description: "Click Save / Update to keep it." });
    } catch (err) {
      console.error("[AdminDealsManager] Pitch deck upload exception:", err);
      const message = err instanceof Error ? err.message : String(err);
      setDeckFeedback(message);
      toast.error("Pitch deck upload failed", { description: message });
    } finally {
      setUploadingDeck(false);
    }
  };

  const load = async () => {
    setLoading(true);
    const [dealsRes, investmentsRes] = await Promise.all([
      supabase
        .from("investment_deals")
        .select("*")
        .order("sort_order", { ascending: false })
        .order("created_at", { ascending: false }),
      supabase.from("member_investments").select("deal_slug, amount_pence, email, currency"),
    ]);

    if (dealsRes.error) {
      toast.error("Failed to load deals", { description: dealsRes.error.message });
    } else {
      setDeals((dealsRes.data ?? []) as Deal[]);
    }

    if (investmentsRes.error) {
      console.error("[AdminDealsManager] Failed to load member investments", investmentsRes.error);
    } else {
      const totals: Record<string, { totals: Record<string, number>; investors: Set<string> }> = {};
      for (const row of investmentsRes.data ?? []) {
        const slug = row.deal_slug;
        if (!totals[slug]) totals[slug] = { totals: {}, investors: new Set() };
        const cur = row.currency || "GBP";
        totals[slug].totals[cur] = (totals[slug].totals[cur] ?? 0) + (Number(row.amount_pence) || 0);
        if (row.email) totals[slug].investors.add(row.email.toLowerCase());
      }
      const summary: Record<string, { totals: Record<string, number>; investorCount: number }> = {};
      for (const [slug, v] of Object.entries(totals)) {
        summary[slug] = { totals: v.totals, investorCount: v.investors.size };
      }
      setInvestedBySlug(summary);
    }
    setLoading(false);
  };

  const formatMoney = (pence: number, currency = "GBP") =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(pence / 100);

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setEditingId(null);
    setForm(emptyForm);
    setLogoFeedback("");
    setMemoFeedback("");
    setDeckFeedback("");
  };

  const startEdit = (d: Deal) => {
    setEditingId(d.id);
    setForm({
      slug: d.slug,
      name: d.name,
      tagline: d.tagline ?? "",
      logo_url: d.logo_url ?? "",
      website_url: d.website_url ?? "",
      status: d.status ?? "Active",
      round: d.round ?? "",
      valuation: d.valuation ?? "",
      ticket_min: d.ticket_min ?? "",
      close_date: d.close_date ?? "",
      overview: d.overview ?? "",
      memo: d.memo ?? "",
      recording_url: d.recording_url ?? "",
      memo_pdf_path: d.memo_pdf_path ?? "",
      pitch_deck_pdf_path: d.pitch_deck_pdf_path ?? "",
      sort_order: d.sort_order ?? 0,
      is_published: d.is_published,
    });
    setLogoFeedback(d.logo_url ? "Existing logo attached." : "");
    setMemoFeedback(d.memo_pdf_path ? "Existing memo PDF attached." : "");
    setDeckFeedback(d.pitch_deck_pdf_path ? "Existing pitch deck attached." : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const slug = (form.slug || slugify(form.name)).trim();
    if (!slug) {
      toast.error("Slug is required");
      return;
    }

    setSubmitting(true);

    const payload = {
      slug,
      name: form.name.trim(),
      tagline: form.tagline.trim() || null,
      logo_url: form.logo_url.trim() || null,
      website_url: form.website_url.trim() || null,
      status: form.status.trim() || "Active",
      round: form.round.trim() || null,
      valuation: form.valuation.trim() || null,
      ticket_min: form.ticket_min.trim() || null,
      close_date: form.close_date || null,
      overview: form.overview.trim() || null,
      memo: form.memo.trim() || null,
      recording_url: form.recording_url.trim() || null,
      memo_pdf_path: form.memo_pdf_path?.trim() || null,
      pitch_deck_pdf_path: form.pitch_deck_pdf_path?.trim() || null,
      sort_order: Number(form.sort_order) || 0,
      is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
    };

    const { data: saved, error } = editingId
      ? await supabase.from("investment_deals").update(payload).eq("id", editingId).select().single()
      : await supabase.from("investment_deals").insert(payload).select().single();

    if (error || !saved) {
      setSubmitting(false);
      toast.error("Save failed", { description: error?.message ?? "Unknown error" });
      return;
    }

    // If published and there is no announcement linked yet, create a draft announcement
    if (form.is_published) {
      const href = `/members/investments/${slug}`;
      const { data: existing } = await supabase
        .from("announcements")
        .select("id")
        .eq("href", href)
        .maybeSingle();

      if (!existing) {
        await supabase.from("announcements").insert({
          badge: "New Investment",
          title: `${form.name.trim()} is now open to members`,
          description:
            form.tagline.trim() ||
            `Review the deal memo and express interest before allocation closes.`,
          href,
          cta: "View opportunity",
          sort_order: 100,
          is_active: false, // draft — admin enables in Announcements tab
          created_by: user.id,
        });
        toast.success("Draft announcement created", {
          description: "Open the Announcements tab to review and publish it.",
        });
      }
    }

    setSubmitting(false);
    toast.success(editingId ? "Deal updated" : "Deal created");
    reset();
    load();
  };

  const togglePublished = async (d: Deal) => {
    const next = !d.is_published;
    const { error } = await supabase
      .from("investment_deals")
      .update({ is_published: next, published_at: next ? new Date().toISOString() : null })
      .eq("id", d.id);
    if (error) {
      toast.error("Update failed", { description: error.message });
    } else {
      load();
    }
  };

  const remove = async (d: Deal) => {
    if (!confirm(`Delete "${d.name}"? Member investments mapped to this slug will remain.`)) return;
    const { error } = await supabase.from("investment_deals").delete().eq("id", d.id);
    if (error) {
      toast.error("Delete failed", { description: error.message });
    } else {
      toast.success("Deleted");
      load();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-collektiv-green">
            {editingId ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {editingId ? "Edit deal" : "New deal"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value, slug: editingId ? form.slug : slugify(e.target.value) })
                  }
                  placeholder="Acme AI"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  placeholder="acme-ai"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={form.tagline ?? ""}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="Frontier AI infrastructure for financial markets"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="logo_file">Logo</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="logo_file"
                    type="file"
                    accept="image/*"
                    disabled={uploadingLogo}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadLogo(f);
                      e.currentTarget.value = "";
                    }}
                  />
                  {uploadingLogo && <Loader2 className="h-4 w-4 animate-spin text-collektiv-green" />}
                </div>
                {logoFeedback && (
                  <p className="text-xs text-muted-foreground">{logoFeedback}</p>
                )}
                {form.logo_url ? (
                  <div className="flex items-center gap-2 rounded-md border p-2 bg-collektiv-green/5">
                    <img src={form.logo_url} alt="Logo preview" className="h-8 w-auto object-contain" />
                    <span className="text-xs text-muted-foreground truncate flex-1">{form.logo_url}</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setForm({ ...form, logo_url: "" });
                        setLogoFeedback("");
                      }}
                      aria-label="Remove logo"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Input
                    value={form.logo_url ?? ""}
                    onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                    placeholder="…or paste an existing logo URL"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="website_url">Website URL</Label>
                <Input
                  id="website_url"
                  value={form.website_url ?? ""}
                  onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                  placeholder="https://acme.ai"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="round">Round</Label>
                <Input
                  id="round"
                  value={form.round ?? ""}
                  onChange={(e) => setForm({ ...form, round: e.target.value })}
                  placeholder="Series A"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valuation">Valuation</Label>
                <Input
                  id="valuation"
                  value={form.valuation ?? ""}
                  onChange={(e) => setForm({ ...form, valuation: e.target.value })}
                  placeholder="$120M post-money"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticket_min">Minimum ticket</Label>
                <Input
                  id="ticket_min"
                  value={form.ticket_min ?? ""}
                  onChange={(e) => setForm({ ...form, ticket_min: e.target.value })}
                  placeholder="£2,500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="close_date">Close date</Label>
                <Input
                  id="close_date"
                  type="date"
                  value={form.close_date ?? ""}
                  onChange={(e) => setForm({ ...form, close_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  placeholder="Active / Closed / Coming soon"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort order (higher = top)</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="overview">Overview</Label>
              <Textarea
                id="overview"
                value={form.overview ?? ""}
                onChange={(e) => setForm({ ...form, overview: e.target.value })}
                placeholder="Short description of the company, the round, and why we're investing."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memo">Investment memo (full)</Label>
              <Textarea
                id="memo"
                value={form.memo ?? ""}
                onChange={(e) => setForm({ ...form, memo: e.target.value })}
                placeholder="Full investment memo. Use blank lines to separate paragraphs."
                rows={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recording_url">Recording URL (Google Drive /preview link)</Label>
              <Input
                id="recording_url"
                value={form.recording_url ?? ""}
                onChange={(e) => setForm({ ...form, recording_url: e.target.value })}
                placeholder="https://drive.google.com/file/d/…/preview"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memo_pdf_file">Investment memo PDF</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="memo_pdf_file"
                  type="file"
                  accept="application/pdf,.pdf"
                  disabled={uploadingMemo}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadMemoPdf(f);
                    e.currentTarget.value = "";
                  }}
                />
                {uploadingMemo && <Loader2 className="h-4 w-4 animate-spin text-collektiv-green" />}
              </div>
                {memoFeedback && (
                  <p className="text-xs text-muted-foreground">{memoFeedback}</p>
                )}
              {form.memo_pdf_path ? (
                <div className="flex items-center gap-2 rounded-md border p-2 bg-collektiv-green/5">
                  <FileText className="h-4 w-4 text-collektiv-green" />
                  <span className="text-xs text-collektiv-dark truncate flex-1">{form.memo_pdf_path}</span>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                      onClick={() => {
                        setForm({ ...form, memo_pdf_path: "" });
                        setMemoFeedback("");
                      }}
                    aria-label="Remove memo PDF"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Optional. Members will see a "Download memo PDF" button on the deal page.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-md border p-3 bg-collektiv-green/5">
              <div>
                <Label htmlFor="is_published" className="font-semibold text-collektiv-dark">
                  Publish deal
                </Label>
                <p className="text-xs text-muted-foreground">
                  Published deals appear in the members' Collektiv Portfolio under "New deals" and create a draft
                  announcement.
                </p>
              </div>
              <Switch
                id="is_published"
                checked={form.is_published}
                onCheckedChange={(v) => setForm({ ...form, is_published: v })}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={submitting} className="bg-collektiv-green hover:bg-collektiv-lightgreen">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                {editingId ? "Update deal" : "Create deal"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={reset}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-collektiv-green">All deals</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          ) : deals.length === 0 ? (
            <p className="text-sm text-muted-foreground">No deals yet.</p>
          ) : (
            <div className="space-y-3">
              {deals.map((d) => (
                <div
                  key={d.id}
                  className={`rounded-lg border p-4 ${
                    d.is_published
                      ? "border-collektiv-green/40 bg-collektiv-green/5"
                      : "border-gray-200 bg-gray-50 opacity-80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge className={d.is_published ? "bg-collektiv-green" : ""} variant={d.is_published ? "default" : "secondary"}>
                          {d.status || "Active"}
                        </Badge>
                        {!d.is_published && <Badge variant="outline">Draft</Badge>}
                        <span className="text-xs text-muted-foreground">order: {d.sort_order}</span>
                      </div>
                      <p className="font-semibold text-collektiv-dark">{d.name}</p>
                      {d.tagline && <p className="text-sm text-muted-foreground mt-1">{d.tagline}</p>}
                      <p className="text-xs text-muted-foreground mt-2 break-all">
                        /members/investments/{d.slug}
                      </p>
                      <div className="mt-2 inline-flex flex-wrap items-center gap-2 rounded-md bg-collektiv-green/10 px-2 py-1 text-xs font-medium text-collektiv-green">
                        <span>Total invested:</span>
                        {(() => {
                          const totals = investedBySlug[d.slug]?.totals ?? {};
                          const entries = Object.entries(totals);
                          if (entries.length === 0) return <span>{formatMoney(0)}</span>;
                          return entries.map(([cur, amt]) => (
                            <span key={cur}>{formatMoney(amt, cur)}</span>
                          ));
                        })()}
                        <span className="text-muted-foreground font-normal">
                          ({investedBySlug[d.slug]?.investorCount ?? 0} {(investedBySlug[d.slug]?.investorCount ?? 0) === 1 ? "investor" : "investors"})
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        {d.is_published ? (
                          <Eye className="h-4 w-4 text-collektiv-green" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        <Switch checked={d.is_published} onCheckedChange={() => togglePublished(d)} />
                      </div>
                      <div className="flex gap-1">
                        <Button type="button" size="sm" variant="outline" onClick={() => startEdit(d)}>
                          Edit
                        </Button>
                        {d.is_published && (
                          <Button asChild type="button" size="sm" variant="ghost">
                            <a href={`/#/members/investments/${d.slug}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => remove(d)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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

export default AdminDealsManager;
