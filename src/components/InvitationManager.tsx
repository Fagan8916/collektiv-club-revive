
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Plus, Copy, Trash2, Mail, Calendar, CheckCircle } from "lucide-react";

interface Invitation {
  id: string;
  email: string;
  code: string;
  created_at: string;
  used_at: string | null;
  created_by: string;
}

const InvitationManager = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('id, email, code, created_at, used_at, created_by')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvitations(data || []);
    } catch (error) {
      console.error('Error fetching invitations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch invitations.",
        variant: "destructive",
      });
    }
  };

  const generateInvitation = async () => {
    if (!newEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.rpc('create_invitation', {
        p_email: newEmail.trim()
      });

      if (error) throw error;

      toast({
        title: "Invitation Created",
        description: `Invitation code generated for ${newEmail}`,
      });

      setNewEmail("");
      fetchInvitations();
    } catch (error) {
      console.error('Error creating invitation:', error);
      toast({
        title: "Error",
        description: "Failed to create invitation.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendInviteEmail = async () => {
    if (!newEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-invite', {
        body: { email: newEmail.trim(), redirectTo: 'https://collektiv.club/#/setup-account' }
      });

      if (error) throw error as any;

      toast({
        title: "Invite Sent",
        description: `Admin invite sent to ${newEmail}. The link routes to setup-account.`,
      });

      setNewEmail("");
      fetchInvitations();
    } catch (error: any) {
      console.error('Error sending invite email:', error);
      toast({
        title: "Error",
        description: error?.message || "Failed to send invite email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resendMagicLink = async (email: string) => {
    setLoading(true);
    try {
      const redirectTo = 'https://collektiv.club/#/setup-account';
      const { error } = await supabase.functions.invoke('resend-magic-link', {
        body: { email, redirectTo }
      });
      if (error) throw error as any;
      toast({ title: 'Link Sent', description: `Magic link resent to ${email}.` });
    } catch (error: any) {
      console.error('Error resending magic link:', error);
      toast({ title: 'Error', description: error?.message || 'Failed to resend link.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const copyInvitationCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Invitation code copied to clipboard.",
    });
  };

  const deleteInvitation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('invitations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Invitation Deleted",
        description: "The invitation has been removed.",
      });

      fetchInvitations();
    } catch (error) {
      console.error('Error deleting invitation:', error);
      toast({
        title: "Error",
        description: "Failed to delete invitation.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create New Invitation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="email"
              placeholder="Enter email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={loading}
            />
            <Button 
              onClick={generateInvitation}
              disabled={loading}
              className="bg-collektiv-green hover:bg-collektiv-dark"
            >
              {loading ? "Creating..." : "Generate Code"}
            </Button>
            <Button 
              onClick={sendInviteEmail}
              disabled={loading}
              variant="outline"
            >
              {loading ? "Sending..." : "Send Email Invite"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invitation Codes</CardTitle>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No invitations created yet.</p>
          ) : (
            <div className="space-y-3">
              {invitations.map((invitation) => (
                <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{invitation.email}</span>
                      {invitation.used_at ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Used
                        </Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>Created {new Date(invitation.created_at).toLocaleDateString()}</span>
                      {invitation.used_at && (
                        <>
                          <span>•</span>
                          <span>Used {new Date(invitation.used_at).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                    <div className="mt-2 font-mono text-sm bg-gray-100 p-2 rounded">
                      Code: {invitation.code}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyInvitationCode(invitation.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    {!invitation.used_at && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => resendMagicLink(invitation.email)}
                          title="Resend magic link"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteInvitation(invitation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
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

export default InvitationManager;
