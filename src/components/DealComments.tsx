import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Reply, Trash2, EyeOff, Eye } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

type Comment = {
  id: string;
  deal_slug: string;
  user_id: string;
  author_name: string;
  body: string;
  parent_id: string | null;
  is_hidden: boolean;
  created_at: string;
};

interface DealCommentsProps {
  dealSlug: string;
  dealName: string;
}

const MAX_LEN = 2000;

const DealComments: React.FC<DealCommentsProps> = ({ dealSlug, dealName }) => {
  const { toast } = useToast();
  const { isAdmin } = useUserRole();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string>("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from("member_profiles")
          .select("first_name, full_name")
          .eq("user_id", user.id)
          .maybeSingle();
        const name = profile
          ? `${profile.first_name ?? ""} ${profile.full_name ?? ""}`.trim() || (user.email ?? "Member")
          : user.email ?? "Member";
        setAuthorName(name);
      }
      await load();
    };
    init();
  }, [dealSlug]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("deal_comments")
      .select("*")
      .eq("deal_slug", dealSlug)
      .order("created_at", { ascending: true });
    if (error) console.error("Load comments failed", error);
    setComments((data as Comment[]) ?? []);
    setLoading(false);
  };

  const submit = async (text: string, parentId: string | null) => {
    if (!userId) {
      toast({ title: "Sign in required", description: "Please sign in to post a comment.", variant: "destructive" });
      return;
    }
    const trimmed = text.trim();
    if (!trimmed) return;
    if (trimmed.length > MAX_LEN) {
      toast({ title: "Too long", description: `Please keep under ${MAX_LEN} characters.`, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("deal_comments").insert({
      deal_slug: dealSlug,
      user_id: userId,
      author_name: authorName || "Member",
      body: trimmed,
      parent_id: parentId,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Couldn't post", description: error.message, variant: "destructive" });
      return;
    }
    if (parentId) {
      setReplyBody("");
      setReplyTo(null);
    } else {
      setBody("");
    }
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    const { error } = await supabase.from("deal_comments").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    await load();
  };

  const toggleHide = async (c: Comment) => {
    const { error } = await supabase
      .from("deal_comments")
      .update({ is_hidden: !c.is_hidden })
      .eq("id", c.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    await load();
  };

  const topLevel = comments.filter((c) => !c.parent_id);
  const repliesOf = (id: string) => comments.filter((c) => c.parent_id === id);

  const renderComment = (c: Comment, isReply = false) => (
    <div
      key={c.id}
      className={`${isReply ? "ml-6 border-l-2 border-collektiv-green/20 pl-4" : ""} ${
        c.is_hidden ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <p className="font-semibold text-collektiv-dark text-sm">{c.author_name}</p>
          <p className="text-xs text-gray-500">
            {new Date(c.created_at).toLocaleString()}
            {c.is_hidden && <span className="ml-2 italic">(hidden)</span>}
          </p>
        </div>
        <div className="flex gap-1">
          {!isReply && userId && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
              className="h-7 px-2"
            >
              <Reply className="h-3.5 w-3.5 mr-1" /> Reply
            </Button>
          )}
          {isAdmin && (
            <Button size="sm" variant="ghost" onClick={() => toggleHide(c)} className="h-7 px-2">
              {c.is_hidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            </Button>
          )}
          {(c.user_id === userId || isAdmin) && (
            <Button size="sm" variant="ghost" onClick={() => remove(c.id)} className="h-7 px-2 text-red-600 hover:text-red-700">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">{c.body}</p>

      {!isReply && replyTo === c.id && (
        <div className="mt-3 space-y-2">
          <Textarea
            placeholder={`Reply to ${c.author_name}…`}
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            maxLength={MAX_LEN}
            rows={3}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => submit(replyBody, c.id)} disabled={submitting || !replyBody.trim()}>
              Post reply
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { setReplyTo(null); setReplyBody(""); }}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {!isReply && repliesOf(c.id).length > 0 && (
        <div className="mt-4 space-y-4">
          {repliesOf(c.id).map((r) => renderComment(r, true))}
        </div>
      )}
    </div>
  );

  return (
    <Card className="mb-8">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-5 w-5 text-collektiv-green" />
          <h3 className="text-xl font-semibold text-collektiv-green">
            Questions & Comments {comments.length > 0 && <span className="text-gray-500 text-base font-normal">({comments.length})</span>}
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Ask questions or share thoughts on the {dealName} memo. Visible to all approved members.
        </p>

        {userId ? (
          <div className="space-y-2 mb-6">
            <Textarea
              placeholder="Add a question or comment…"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={MAX_LEN}
              rows={4}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{body.length}/{MAX_LEN}</span>
              <Button
                onClick={() => submit(body, null)}
                disabled={submitting || !body.trim()}
                className="bg-collektiv-green hover:bg-collektiv-lightgreen"
              >
                {submitting ? "Posting…" : "Post comment"}
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600 mb-6 italic">Sign in to post a comment.</p>
        )}

        {loading ? (
          <p className="text-sm text-gray-500">Loading comments…</p>
        ) : topLevel.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No comments yet. Be the first to ask a question.</p>
        ) : (
          <div className="space-y-6">{topLevel.map((c) => renderComment(c))}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default DealComments;
