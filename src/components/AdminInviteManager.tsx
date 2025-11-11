import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";

export const AdminInviteManager = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-invite", {
        body: { email: email.trim(), name: name.trim() || undefined },
      });

      if (error) throw error;

      toast.success(`Invitation sent to ${email}`);
      setEmail("");
      setName("");
    } catch (error: any) {
      console.error("Error sending invite:", error);
      toast.error(error.message || "Failed to send invitation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Invite New Member
        </CardTitle>
        <CardDescription>
          Pre-approve and send an invitation email to a new member
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name (optional)
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Francesco Cocozza"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="francescococozza.mk@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleInvite();
            }}
          />
        </div>
        <Button onClick={handleInvite} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Invitation...
            </>
          ) : (
            "Send Invitation"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
