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
  const [resendEmail, setResendEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resetting, setResetting] = useState(false);

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


  // If this is an OAuth flow (provider_token in URL) and user is authenticated, skip this page
  useEffect(() => {
    const href = window.location.href;
    const hasProvider = /[?#].*provider_token=/.test(href) || /#.*[?&]provider_token=/.test(href);
    if (hasProvider && isAuthenticated) {
      try {
        window.history.replaceState({}, document.title, `${window.location.origin}/#/members/build-profile`);
      } catch {}
      navigate('/members/build-profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

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
      // Clean the URL to avoid re-processing auth tokens during navigation
      try {
        const clean = `${window.location.origin}/#/setup-account`;
        if (window.location.href.includes('access_token')) {
          window.history.replaceState({}, document.title, clean);
          console.log('SetupAccount: cleaned auth params from URL');
        }
      } catch {}

      // Add a safety timeout so we never hang here
      const timeout = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));

      console.log('SetupAccount: calling supabase.auth.updateUser (background)');
      // Fire-and-forget to avoid blocking the UI; handle any errors in background logs
      supabase.auth.updateUser({ password: newPassword })
        .then(({ error }) => {
          if (error) {
            console.error('SetupAccount: updateUser error (background)', error);
          } else {
            console.log('SetupAccount: password updated (background) success');
          }
        })
        .catch((e) => {
          console.error('SetupAccount: updateUser exception (background)', e);
        });

      toast({
        title: 'Password set',
        description: 'Continuing to build your profile...',
      });

      // Navigate within the app router immediately to prevent any homepage loop or waiting
      console.log('SetupAccount: navigating to /members/build-profile via router (no await)');
      navigate('/members/build-profile', { replace: true });
    } catch (err: any) {
      console.error('SetupAccount: unexpected error updating password', err);
      toast({
        title: 'Unexpected error',
        description: err?.message || 'Please try again.',
        variant: 'destructive',
      });
      navigate('/members/build-profile', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSkipToMembers = () => {
    navigate("/members");
  };

  const handleResendMagicLink = async () => {
    if (!resendEmail.trim()) {
      toast({ title: 'Email required', description: 'Enter your email to receive a new link.', variant: 'destructive' });
      return;
    }
    setResending(true);
    try {
      const redirectTo = `${window.location.origin}/#/setup-account`;
      const { error } = await supabase.functions.invoke('resend-magic-link', {
        body: { email: resendEmail.trim(), redirectTo }
      });
      if (error) throw error as any;
      toast({ title: 'New link sent', description: `We emailed a new magic link to ${resendEmail}.` });
    } catch (e: any) {
      toast({ title: 'Failed to send link', description: e?.message || 'Please try again.', variant: 'destructive' });
    } finally {
      setResending(false);
    }
  };

  const handleSendReset = async () => {
    if (!resendEmail.trim()) {
      toast({ title: 'Email required', description: 'Enter your email to receive a reset link.', variant: 'destructive' });
      return;
    }
    setResetting(true);
    try {
      const redirectTo = `${window.location.origin}/#/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(resendEmail.trim(), { redirectTo });
      if (error) throw error;
      toast({ title: 'Password reset sent', description: `Check ${resendEmail} for a reset link.` });
    } catch (e: any) {
      toast({ title: 'Failed to send reset', description: e?.message || 'Please try again.', variant: 'destructive' });
    } finally {
      setResetting(false);
    }
  };

  if (authLoading && !canSetPassword) {
    return <LoadingScreen />;
  }

  if (!canSetPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-collektiv-accent via-white to-green-50 p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-bold text-collektiv-green">Invalid or Expired Link</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-700">
              Your invitation link is invalid or has expired. Enter your email to get a new link or a password reset.
            </p>
            <Input
              type="email"
              placeholder="you@example.com"
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
            />
            <div className="space-y-2">
              <Button className="w-full" onClick={handleResendMagicLink} disabled={resending || !resendEmail}>
                {resending ? 'Sending…' : 'Send me a new magic link'}
              </Button>
              <Button variant="outline" className="w-full" onClick={handleSendReset} disabled={resetting || !resendEmail}>
                {resetting ? 'Sending…' : 'Email a password reset instead'}
              </Button>
              <Button variant="ghost" onClick={() => navigate("/login")} className="w-full">
                Go to Login
              </Button>
            </div>
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