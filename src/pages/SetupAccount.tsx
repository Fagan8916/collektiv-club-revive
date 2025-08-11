import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "@/components/auth/LoadingScreen";

const SetupAccount: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [canSetPassword, setCanSetPassword] = useState(false);

  // Check if user is authenticated and can set password
  useEffect(() => {
    let mounted = true;

    const ensureSession = async () => {
      if (isAuthenticated && user) {
        if (mounted) setCanSetPassword(true);
        return;
      }

      const href = window.location.href;
      // Try access_token first (implicit flow)
      const access_token = (href.match(/access_token=([^&]+)/)?.[1] || '');
      const refresh_token = (href.match(/refresh_token=([^&]+)/)?.[1] || '');

      if (access_token) {
        try {
          await supabase.auth.setSession({ access_token, refresh_token });
          if (mounted) setCanSetPassword(true);
          return;
        } catch (e) {
          console.error("SetupAccount: Failed to set session from access token", e);
        }
      }

      // Next: handle PKCE code flow (email magic link / invite)
      const hasPkceCode = /[?#].*code=/.test(href) || /#.*[?&]code=/.test(href);
      if (hasPkceCode) {
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(href);
          if (error) throw error;
          if (mounted) setCanSetPassword(true);
          return;
        } catch (e) {
          console.error("SetupAccount: exchangeCodeForSession failed", e);
        }
      }

      // Fallback: check existing session directly
      const { data } = await supabase.auth.getSession();
      if (mounted && data.session) {
        setCanSetPassword(true);
      }
    };

    ensureSession();

    return () => { mounted = false; };
  }, [isAuthenticated, user]);


  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SetupAccount: handleSetPassword start');
    if (newPassword.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 8 characters.',
        variant: 'destructive',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: 'Please make sure the passwords match.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        console.error('SetupAccount: updateUser error', error);
        toast({
          title: 'Error setting password',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      console.log('SetupAccount: password updated successfully, navigating to build profile');
      toast({
        title: 'Password set successfully',
        description: 'Continuing to build your profile...',
      });
      setTimeout(() => {
        const target = `${window.location.origin}/#/members/build-profile`;
        console.log('SetupAccount: redirecting to', target);
        window.location.replace(target);
      }, 300);
    } catch (err: any) {
      console.error('SetupAccount: unexpected error updating password', err);
      toast({
        title: 'Unexpected error',
        description: err?.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkipToMembers = () => {
    navigate("/members");
  };

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!canSetPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-collektiv-accent via-white to-green-50 p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-bold text-collektiv-green">Invalid Link</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-700">
              Your invitation link is invalid or has expired.
            </p>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-collektiv-accent via-white to-green-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-collektiv-green">Welcome to Collektiv Club</CardTitle>
          <p className="text-gray-600 mt-2">Choose how you'd like to access your account</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <h3 className="font-semibold text-gray-800">Option 1: Continue with Google</h3>
            <p className="text-sm text-gray-600">Use Google Sign-In for quick access</p>
            <GoogleSignInButton loading={googleLoading} setLoading={setGoogleLoading} />
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
              or
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-center">Option 2: Set up a Password</h3>
            <p className="text-sm text-gray-600 text-center">Create a password for email login</p>
            
            <form onSubmit={handleSetPassword} className="space-y-4">
              <Input
                type="password"
                placeholder="Create password (8+ characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                minLength={8}
                required
                autoComplete="new-password"
              />
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                minLength={8}
                required
                autoComplete="new-password"
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Setting up..." : "Set Password & Continue"}
              </Button>
            </form>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
              or
            </span>
          </div>

          <div className="text-center">
            <Button variant="outline" onClick={handleSkipToMembers} className="w-full">
              Skip for Now (Magic Link Only)
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              You can set up a password later in your account settings
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default SetupAccount;