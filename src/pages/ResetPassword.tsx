
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [canReset, setCanReset] = useState(false);

  // Checks if access_token is present in URL fragment
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/access_token=([^&]+)/);
    if (match && match[1]) {
      setCanReset(true);
      // Log user in with the token so we can call updateUser
      supabase.auth
        .setSession({
          access_token: match[1],
          refresh_token:
            hash.match(/refresh_token=([^&]+)/)?.[1] || "",
        })
        .then(() => {
          // Optionally fetch session here if you need user details
        });
    }
  }, []);

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword !== confirm) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure the passwords match.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) {
      toast({
        title: "Error setting password",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password updated",
        description: "You can now log in with your new password.",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    }
  };

  if (!canReset) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-collektiv-accent">
        <div className="bg-white p-8 rounded shadow border">
          <h2 className="font-bold text-lg mb-3">
            Invalid or expired reset link
          </h2>
          <p className="text-gray-700 mb-2">
            Your password reset or invite link is invalid, expired, or missing.
          </p>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-collektiv-accent">
      <div className="max-w-md w-full bg-white p-8 rounded shadow border mx-2">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Set Your Password
        </h2>
        <form onSubmit={handleSetPassword} className="space-y-5">
          <Input
            type="password"
            placeholder="New password"
            autoFocus
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            disabled={loading}
            minLength={8}
            required
          />
          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            disabled={loading}
            minLength={8}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Set Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
