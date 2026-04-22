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
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Eye, EyeOff } from "lucide-react";

type Announcement = {
  id: string;
  badge: string;
  title: string;
  description: string;
  href: string;
  cta: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

const emptyForm = {
  badge: "New Investment",
  title: "",
  description: "",
  href: "",
  cta: "",
  sort_order: 0,
};

const AdminAnnouncementsManager: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("is_active", { ascending: false })
      .order("sort_order", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Failed to load announcements", description: error.message, variant: "destructive" });
    } else {
      setItems((data ?? []) as Announcement[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    if (!form.title.trim() || !form.description.trim() || !form.href.trim()) {
      toast({ title: "Missing fields", description: "Title, description and link are required.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("announcements").insert({
      badge: form.badge.trim() || "Announcement",
      title: form.title.trim(),
      description: form.description.trim(),
      href: form.href.trim(),
      cta: form.cta.trim() || null,
      sort_order: Number(form.sort_order) || 0,
      is_active: true,
      created_by: user.id,
    });
    setSubmitting(false);

    if (error) {
      toast({ title: "Failed to create", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Announcement published" });
      setForm(emptyForm);
      load();
    }
  };

  const toggleActive = async (a: Announcement) => {
    const { error } = await supabase
      .from("announcements")
      .update({ is_active: !a.is_active })
      .eq("id", a.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      load();
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this announcement? This cannot be undone.")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      load();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-collektiv-green">
            <Plus className="h-5 w-5" /> New announcement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="badge">Badge</Label>
                <Input
                  id="badge"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="New Investment"
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
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Webel is now open to members"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Review the deal memo and express interest before allocation closes."
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="href">Link (internal path or URL) *</Label>
                <Input
                  id="href"
                  value={form.href}
                  onChange={(e) => setForm({ ...form, href: e.target.value })}
                  placeholder="/members/investments/webel"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta">CTA text</Label>
                <Input
                  id="cta"
                  value={form.cta}
                  onChange={(e) => setForm({ ...form, cta: e.target.value })}
                  placeholder="View opportunity"
                />
              </div>
            </div>

            <Button type="submit" disabled={submitting} className="bg-collektiv-green hover:bg-collektiv-lightgreen">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              Publish announcement
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-collektiv-green">Existing announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          ) : items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No announcements yet. The home screen ribbon will stay hidden until you publish one.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((a) => (
                <div
                  key={a.id}
                  className={`rounded-lg border p-4 ${a.is_active ? "border-collektiv-green/40 bg-collektiv-green/5" : "border-gray-200 bg-gray-50 opacity-70"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant={a.is_active ? "default" : "secondary"} className={a.is_active ? "bg-collektiv-green" : ""}>
                          {a.badge}
                        </Badge>
                        {!a.is_active && <Badge variant="outline">Hidden</Badge>}
                        <span className="text-xs text-muted-foreground">order: {a.sort_order}</span>
                      </div>
                      <p className="font-semibold text-collektiv-dark">{a.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
                      <p className="text-xs text-muted-foreground mt-2 break-all">
                        → {a.href} {a.cta && <span>· “{a.cta}”</span>}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        {a.is_active ? <Eye className="h-4 w-4 text-collektiv-green" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                        <Switch checked={a.is_active} onCheckedChange={() => toggleActive(a)} />
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => remove(a.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default AdminAnnouncementsManager;
