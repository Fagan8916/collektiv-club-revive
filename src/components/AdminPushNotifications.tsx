import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Bell, Loader2 } from "lucide-react";

interface PushHistoryRow {
  id: string;
  title: string;
  message: string;
  url: string | null;
  recipients: number | null;
  created_at: string;
}

const AdminPushNotifications: React.FC = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState<PushHistoryRow[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

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

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Title and message are required",
        variant: "destructive",
      });
      return;
    }
    if (
      !window.confirm(
        `Send this notification to ALL subscribed members?\n\n${title}\n${message}`,
      )
    ) {
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
          },
        },
      );
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      toast({
        title: "Notification sent",
        description: `Delivered to ${(data as any).recipients ?? 0} subscribers.`,
      });
      setTitle("");
      setMessage("");
      setUrl("");
      loadHistory();
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-collektiv-green/20 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="h-5 w-5 text-collektiv-green" />
          <h3 className="font-playfair text-lg font-bold text-collektiv-dark">
            Send Push Notification
          </h3>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          Broadcasts to every member who has installed the app and opted in.
        </p>

        <div className="space-y-3">
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
                Send to all members
              </>
            )}
          </Button>
        </div>
      </div>

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

export default AdminPushNotifications;
