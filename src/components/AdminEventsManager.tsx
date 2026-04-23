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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash2, Save, ExternalLink, Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

type Event = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  event_date: string | null;
  event_date_label: string | null;
  event_time: string | null;
  location: string | null;
  attendees: string | null;
  description: string | null;
  paragraphs: string[] | null;
  topics: string[] | null;
  venue_notes: string | null;
  hero_image_url: string | null;
  gallery_images: string[] | null;
  status: string;
  is_published: boolean;
  sort_order: number;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const emptyForm = {
  slug: "",
  title: "",
  tagline: "",
  event_date: "",
  event_date_label: "",
  event_time: "",
  location: "",
  attendees: "",
  description: "",
  paragraphs_text: "",
  topics_text: "",
  venue_notes: "",
  hero_image_url: "",
  gallery_text: "",
  status: "upcoming",
  is_published: false,
  sort_order: 0,
};

const AdminEventsManager: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("member_events")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("event_date", { ascending: false, nullsFirst: false });
    if (error) {
      toast.error("Could not load events", { description: error.message });
    } else {
      setEvents((data as Event[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const startEdit = (e: Event) => {
    setEditingId(e.id);
    setForm({
      slug: e.slug,
      title: e.title,
      tagline: e.tagline ?? "",
      event_date: e.event_date ?? "",
      event_date_label: e.event_date_label ?? "",
      event_time: e.event_time ?? "",
      location: e.location ?? "",
      attendees: e.attendees ?? "",
      description: e.description ?? "",
      paragraphs_text: (e.paragraphs ?? []).join("\n\n"),
      topics_text: (e.topics ?? []).join("\n"),
      venue_notes: e.venue_notes ?? "",
      hero_image_url: e.hero_image_url ?? "",
      gallery_text: (e.gallery_images ?? []).join("\n"),
      status: e.status ?? "upcoming",
      is_published: e.is_published,
      sort_order: e.sort_order ?? 0,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!user?.id) {
      toast.error("Not signed in");
      return null;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Must be an image file");
      return null;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large", { description: "Maximum size is 5MB." });
      return null;
    }
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const baseSlug = (form.slug || slugify(form.title) || "event").replace(/[^a-z0-9-]/g, "");
    const path = `${baseSlug}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("event-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
    if (error) {
      toast.error("Upload failed", { description: error.message });
      return null;
    }
    const { data } = supabase.storage.from("event-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const onUploadHero = async (file: File) => {
    setUploadingHero(true);
    const url = await uploadImage(file);
    if (url) {
      setForm((f) => ({ ...f, hero_image_url: url }));
      toast.success("Hero image uploaded");
    }
    setUploadingHero(false);
  };

  const onUploadGalleryFiles = async (files: FileList) => {
    setUploadingGallery(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
    }
    if (urls.length > 0) {
      const existing = form.gallery_text.split("\n").map((s) => s.trim()).filter(Boolean);
      setForm((f) => ({ ...f, gallery_text: [...existing, ...urls].join("\n") }));
      toast.success(`${urls.length} gallery image(s) uploaded`);
    }
    setUploadingGallery(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    const slug = (form.slug || slugify(form.title)).trim();
    if (!slug) {
      toast.error("Slug is required");
      return;
    }
    setSubmitting(true);

    const paragraphs = form.paragraphs_text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    const topics = form.topics_text
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);
    const gallery_images = form.gallery_text
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    const payload = {
      slug,
      title: form.title.trim(),
      tagline: form.tagline.trim() || null,
      event_date: form.event_date || null,
      event_date_label: form.event_date_label.trim() || null,
      event_time: form.event_time.trim() || null,
      location: form.location.trim() || null,
      attendees: form.attendees.trim() || null,
      description: form.description.trim() || null,
      paragraphs,
      topics,
      venue_notes: form.venue_notes.trim() || null,
      hero_image_url: form.hero_image_url.trim() || null,
      gallery_images,
      status: form.status || "upcoming",
      is_published: form.is_published,
      sort_order: Number(form.sort_order) || 0,
      created_by: user.id,
    };

    const { error } = editingId
      ? await supabase.from("member_events").update(payload).eq("id", editingId)
      : await supabase.from("member_events").insert(payload);

    setSubmitting(false);

    if (error) {
      toast.error(editingId ? "Update failed" : "Create failed", { description: error.message });
      return;
    }
    toast.success(editingId ? "Event updated" : "Event created");
    reset();
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    const { error } = await supabase.from("member_events").delete().eq("id", id);
    if (error) {
      toast.error("Delete failed", { description: error.message });
      return;
    }
    toast.success("Event deleted");
    await load();
  };

  const togglePublish = async (e: Event) => {
    const { error } = await supabase
      .from("member_events")
      .update({ is_published: !e.is_published })
      .eq("id", e.id);
    if (error) {
      toast.error("Update failed", { description: error.message });
      return;
    }
    await load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-collektiv-green">
            {editingId ? "Edit event" : "Create event"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm({
                      ...form,
                      title,
                      slug: editingId ? form.slug : slugify(title),
                    });
                  }}
                  placeholder="Pizza, Pints & Great Conversations"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  placeholder="pizza-pints-feb-2025"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline (subtitle on hero)</Label>
              <Input
                id="tagline"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="An intimate February gathering of Collektiv members…"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm({ ...form, status: v })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event_date">Event date</Label>
                <Input
                  id="event_date"
                  type="date"
                  value={form.event_date}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event_date_label">Date label (display)</Label>
                <Input
                  id="event_date_label"
                  value={form.event_date_label}
                  onChange={(e) => setForm({ ...form, event_date_label: e.target.value })}
                  placeholder="Thursday, February 20, 2025"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="event_time">Time</Label>
                <Input
                  id="event_time"
                  value={form.event_time}
                  onChange={(e) => setForm({ ...form, event_time: e.target.value })}
                  placeholder="6:30 PM onwards"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="The White Bear, Farringdon, London"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attendees">Attendees</Label>
                <Input
                  id="attendees"
                  value={form.attendees}
                  onChange={(e) => setForm({ ...form, attendees: e.target.value })}
                  placeholder="20+ members"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short description (card preview)</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="One-line summary shown on event cards."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paragraphs_text">About the event (paragraphs)</Label>
              <Textarea
                id="paragraphs_text"
                value={form.paragraphs_text}
                onChange={(e) => setForm({ ...form, paragraphs_text: e.target.value })}
                placeholder={"Paragraph 1...\n\nParagraph 2...\n\nSeparate paragraphs with a blank line."}
                rows={8}
              />
              <p className="text-xs text-muted-foreground">
                Separate paragraphs with a blank line.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topics_text">Topics discussed (one per line)</Label>
              <Textarea
                id="topics_text"
                value={form.topics_text}
                onChange={(e) => setForm({ ...form, topics_text: e.target.value })}
                placeholder={"Live investment opportunities\nEthical investing\nAI trends in startups"}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue_notes">The Venue (optional)</Label>
              <Textarea
                id="venue_notes"
                value={form.venue_notes}
                onChange={(e) => setForm({ ...form, venue_notes: e.target.value })}
                placeholder="Notes about the venue, atmosphere, etc."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero_file">Hero image</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="hero_file"
                  type="file"
                  accept="image/*"
                  disabled={uploadingHero}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onUploadHero(f);
                    e.currentTarget.value = "";
                  }}
                />
                {uploadingHero && <Loader2 className="h-4 w-4 animate-spin text-collektiv-green" />}
              </div>
              {form.hero_image_url && (
                <div className="flex items-center gap-2 rounded-md border p-2 bg-collektiv-green/5">
                  <img src={form.hero_image_url} alt="Hero" className="h-12 w-20 object-cover rounded" />
                  <span className="text-xs text-collektiv-dark truncate flex-1">{form.hero_image_url}</span>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setForm({ ...form, hero_image_url: "" })}
                    aria-label="Remove hero image"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gallery_files">Gallery images</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="gallery_files"
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploadingGallery}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) onUploadGalleryFiles(files);
                    e.currentTarget.value = "";
                  }}
                />
                {uploadingGallery && <Loader2 className="h-4 w-4 animate-spin text-collektiv-green" />}
              </div>
              <Textarea
                value={form.gallery_text}
                onChange={(e) => setForm({ ...form, gallery_text: e.target.value })}
                placeholder="One image URL per line (uploaded photos appear here automatically)."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Upload photos above, or paste image URLs (one per line). You can reorder by editing the list.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                />
              </div>
              <div className="flex items-center justify-between rounded-md border p-3 bg-collektiv-green/5">
                <div>
                  <Label htmlFor="is_published" className="font-semibold text-collektiv-dark">
                    Publish event
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Published events appear in the members' Events feed.
                  </p>
                </div>
                <Switch
                  id="is_published"
                  checked={form.is_published}
                  onCheckedChange={(v) => setForm({ ...form, is_published: v })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-collektiv-green hover:bg-collektiv-lightgreen"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                {editingId ? "Update event" : "Create event"}
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
          <CardTitle className="text-collektiv-green">All events</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          ) : events.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events yet. Create one above.</p>
          ) : (
            <ul className="space-y-2">
              {events.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {e.hero_image_url ? (
                      <img
                        src={e.hero_image_url}
                        alt=""
                        className="h-12 w-16 object-cover rounded flex-shrink-0"
                      />
                    ) : (
                      <div className="h-12 w-16 rounded bg-collektiv-green/10 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="h-5 w-5 text-collektiv-green/50" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-collektiv-dark truncate">{e.title}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant={e.status === "upcoming" ? "default" : "secondary"}>
                          {e.status}
                        </Badge>
                        {e.is_published ? (
                          <Badge className="bg-collektiv-green text-white">Published</Badge>
                        ) : (
                          <Badge variant="outline">Draft</Badge>
                        )}
                        {(e.event_date_label || e.event_date) && (
                          <span className="text-xs text-muted-foreground">
                            {e.event_date_label || e.event_date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => togglePublish(e)}>
                      {e.is_published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={`/#/members/events/${e.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => startEdit(e)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(e.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEventsManager;
