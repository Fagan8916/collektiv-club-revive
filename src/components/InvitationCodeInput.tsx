
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Mail, Lock, KeyRound } from "lucide-react";

interface InvitationCodeInputProps {
  onValidCode: (invitationId: string) => void;
}

const InvitationCodeInput: React.FC<InvitationCodeInputProps> = ({ onValidCode }) => {
  const [invitationCode, setInvitationCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate invitation code
      const { data: invitation, error: invitationError } = await supabase
        .from('invitations')
        .select('id, email, used_at')
        .eq('code', invitationCode)
        .eq('email', email)
        .maybeSingle();

      if (invitationError || !invitation) {
        toast({
          title: "Invalid Invitation",
          description: "The invitation code is invalid or doesn't match your email.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (invitation.used_at) {
        toast({
          title: "Invitation Already Used",
          description: "This invitation code has already been used.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Create account
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (signUpError) {
        toast({
          title: "Registration Failed",
          description: signUpError.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Mark invitation as used
      await supabase
        .from('invitations')
        .update({ used_at: new Date().toISOString() })
        .eq('id', invitation.id);

      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please check your email to verify your account.",
      });

      onValidCode(invitation.id);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-collektiv-green">Join Collektiv Club</CardTitle>
        <p className="text-gray-600 mt-2">Enter your invitation details to register</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Invitation Code"
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
              required
              disabled={loading}
              className="pl-10 h-11"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="email"
              placeholder="Email address (must match invitation)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="pl-10 h-11"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="pl-10 h-11"
              minLength={6}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-11 bg-collektiv-green hover:bg-collektiv-dark" 
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>
        
        <div className="text-center text-xs text-gray-500 mt-6 p-4 bg-gray-50 rounded-lg">
          Registration is by invitation only. Contact an admin if you need an invitation.
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationCodeInput;
