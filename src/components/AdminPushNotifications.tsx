import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Bell, Loader2, Users, Shield, BarChart3, Smartphone } from "lucide-react";

interface PushHistoryRow {
  id: string;
  title: string;
  message: string;
  url: string | null;
  recipients: number | null;
  created_at: string;
}

type Audience = "all" | "admins";

const AdminPushNotifications: React.FC = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [audience, setAudience] = useState<Audience>("all");
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState<PushHistoryRow[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Dashboard stats
  const [totalSent, setTotalSent] = useState(0);
  const [totalDeliveries, setTotalDeliveries] = useState(0);
  const [last30Sent, setLast30Sent] = useState(0);
  const [approvedMembers, setApprovedMembers] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [liveSubscribers, setLiveSubscribers] = useState<number | null>(null);

  const loadHistory = async () => {
    setLoadingHistory(true);
    const { data, error } = await supabase
      .from("push_notifications")
      .select("id, title, message, url, recipients, created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) console.error(error);
    setHistory((data as PushHistoryRow[]) || []);
    setLoadingHistory(false);
  };

  const loadStats = async () => {
    // Notification totals
    const { data: allNotifs } = await supabase
      .from("push_notifications")
      .select("recipients, created_at");
    if (allNotifs) {
      setTotalSent(allNotifs.length);
      setTotalDeliveries(
        allNotifs.reduce((sum, n) => sum + (n.recipients || 0), 0),
      );
      const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
      setLast30Sent(
        allNotifs.filter((n) => new Date(n.created_at).getTime() >= cutoff).length,
      );
    }

    // Member / admin counts
    const { count: memberC } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "member")
      .eq("status", "approved");
    setApprovedMembers(memberC ?? 0);

    const { count: adminC } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin")
      .eq("status", "approved");
    setAdminCount(adminC ?? 0);
  };

  const loadLiveSubscribers = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("onesignal-stats");
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setLiveSubscribers((data as any)?.messageable_players ?? 0);
    } catch (err) {
      console.error("Failed to load OneSignal stats:", err);
      setLiveSubscribers(null);
    }
  };

  useEffect(() => {
    loadHistory();
    loadStats();
    loadLiveSubscribers();
  }, []);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      toast({ title: "Title and message are required", variant: "destructive" });
      return;
    }
    const audienceLabel = audience === "admins" ? "ADMINS only" : "ALL subscribed members";
    if (!window.confirm(`Send this notification to ${audienceLabel}?\n\n${title}\n${message}`)) {
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "send-push-notification",
        {
          body: {
            title: title.trim(),
            message: message.trim(),
            url: url.trim() || undefined,
            audience,
          },
        },
      );
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      toast({
        title: "Notification sent",
        description: `Delivered to ${(data as any).recipients ?? 0} ${
          audience === "admins" ? "admins" : "subscribers"
        }.`,
      });
      setTitle("");
      setMessage("");
      setUrl("");
      loadHistory();
      loadStats();
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Failed to send",
        description: err?.message ?? "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const avgReach =
    totalSent > 0 ? Math.round(totalDeliveries / totalSent) : 0;

  return (
    <div className="space-y-6">
      {/* Dashboard */}
      <div className="bg-white rounded-2xl border border-collektiv-green/20 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-collektiv-green" />
          <h3 className="font-playfair text-lg font-bold text-collektiv-dark">
            Dashboard
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            icon={<Smartphone className="h-4 w-4" />}
            label="Live subscribers"
            value={liveSubscribers ?? 0}
            highlight
            subtitle={liveSubscribers === null ? "Unable to load" : "From OneSignal"}
          />
          <StatCard
            icon={<Bell className="h-4 w-4" />}
            label="Total broadcasts"
            value={totalSent}
          />
          <StatCard
            icon={<Send className="h-4 w-4" />}
            label="Total deliveries"
            value={totalDeliveries}
          />
          <StatCard
            icon={<BarChart3 className="h-4 w-4" />}
            label="Avg reach / send"
            value={avgReach}
          />
          <StatCard
            icon={<BarChart3 className="h-4 w-4" />}
            label="Sent (last 30d)"
            value={last30Sent}
          />
          <StatCard
            icon={<Users className="h-4 w-4" />}
            label="Approved members"
            value={approvedMembers}
          />
          <StatCard
            icon={<Shield className="h-4 w-4" />}
            label="Admins"
            value={adminCount}
          />
        </div>
        <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
          <strong>Live subscribers</strong> = devices currently opted in via
          OneSignal (the real broadcast audience). "Approved members" reflects
          your DB — gap = members who haven't installed the PWA + enabled push.
        </p>
      </div>

      {/* Composer */}
      <div className="bg-white rounded-2xl border border-collektiv-green/20 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="h-5 w-5 text-collektiv-green" />
          <h3 className="font-playfair text-lg font-bold text-collektiv-dark">
            Send Push Notification
          </h3>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          Choose audience, then broadcast to installed + opted-in devices.
        </p>

        <div className="space-y-3">
          <div>
            <Label className="text-xs">Audience</Label>
            <Select
              value={audience}
              onValueChange={(v) => setAudience(v as Audience)}
              disabled={sending}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    All subscribers ({liveSubscribers ?? "?"})
                  </div>
                </SelectItem>
                <SelectItem value="admins">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Admins only ({adminCount})
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="push-title" className="text-xs">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="push-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              placeholder="New investment opportunity"
              disabled={sending}
            />
            <div className="text-[10px] text-gray-400 text-right mt-0.5">
              {title.length}/120
            </div>
          </div>

          <div>
            <Label htmlFor="push-message" className="text-xs">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="push-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Tap to view the new memo for…"
              disabled={sending}
            />
            <div className="text-[10px] text-gray-400 text-right mt-0.5">
              {message.length}/500
            </div>
          </div>

          <div>
            <Label htmlFor="push-url" className="text-xs">
              Link URL (optional)
            </Label>
            <Input
              id="push-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              placeholder="https://collektiv.club/#/members"
              disabled={sending}
            />
          </div>

          <Button
            onClick={handleSend}
            disabled={sending || !title.trim() || !message.trim()}
            className="w-full bg-collektiv-green hover:bg-collektiv-lightgreen"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {audience === "admins" ? "Send to admins" : "Send to all members"}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl border border-collektiv-green/20 p-5 shadow-sm">
        <h3 className="font-playfair text-base font-bold text-collektiv-dark mb-3">
          Recent broadcasts
        </h3>
        {loadingHistory ? (
          <p className="text-xs text-gray-500">Loading…</p>
        ) : history.length === 0 ? (
          <p className="text-xs text-gray-500">No notifications sent yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {history.map((h) => (
              <li key={h.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm text-collektiv-dark truncate">
                      {h.title}
                    </div>
                    <div className="text-xs text-gray-600 line-clamp-2">
                      {h.message}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] text-gray-400">
                      {new Date(h.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-[10px] text-collektiv-green font-semibold">
                      {h.recipients ?? "—"} sent
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
  subtitle?: string;
}> = ({ icon, label, value, highlight, subtitle }) => (
  <div
    className={
      highlight
        ? "bg-collektiv-green/15 border-2 border-collektiv-green/40 rounded-xl p-3"
        : "bg-collektiv-green/5 border border-collektiv-green/15 rounded-xl p-3"
    }
  >
    <div className="flex items-center gap-1.5 text-collektiv-green mb-1">
      {icon}
      <span className="text-[10px] uppercase tracking-wide font-semibold">
        {label}
      </span>
    </div>
    <div className="text-2xl font-bold text-collektiv-dark font-playfair">
      {value.toLocaleString()}
    </div>
    {subtitle && (
      <div className="text-[9px] text-gray-500 mt-0.5">{subtitle}</div>
    )}
  </div>
);

export default AdminPushNotifications;
