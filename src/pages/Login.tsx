
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import LoadingScreen from "@/components/auth/LoadingScreen";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import EmailLoginForm from "@/components/auth/EmailLoginForm";

const Login = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      console.log("Login: User already authenticated, redirecting to members");
      navigate("/members", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // COMPREHENSIVE OAuth callback detection with detailed logging
  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("=== OAUTH CALLBACK DETECTION START ===");
      console.log("Login: Full URL analysis:");
      console.log("  - href:", window.location.href);
      console.log("  - origin:", window.location.origin);
      console.log("  - pathname:", window.location.pathname);
      console.log("  - search:", window.location.search);
      console.log("  - hash:", window.location.hash);
      console.log("  - host:", window.location.host);
      console.log("  - protocol:", window.location.protocol);
      
      let accessToken = null;
      let refreshToken = null;
      let error = null;
      let errorDescription = null;
      let shouldCleanupHash = false;
      let shouldCleanupSearch = false;
      
      // Check URL search params first
      const searchParams = new URLSearchParams(window.location.search);
      console.log("Login: Search params analysis:");
      console.log("  - Raw search string:", window.location.search);
      console.log("  - Parsed params keys:", Array.from(searchParams.keys()));
      searchParams.forEach((value, key) => {
        console.log(`  - ${key}: ${key.includes('token') ? '[REDACTED]' : value}`);
      });
      
      if (searchParams.has('access_token')) {
        console.log("Login: ✅ Found OAuth tokens in search params");
        accessToken = searchParams.get('access_token');
        refreshToken = searchParams.get('refresh_token');
        error = searchParams.get('error');
        errorDescription = searchParams.get('error_description');
        shouldCleanupSearch = true;
      } else {
        console.log("Login: ❌ No OAuth tokens found in search params");
      }
      
      // If not found in search params, check hash fragment
      if (!accessToken && window.location.hash) {
        const hashString = window.location.hash.substring(1); // Remove the #
        console.log("Login: Hash fragment analysis:");
        console.log("  - Raw hash:", window.location.hash);
        console.log("  - Hash string (without #):", hashString);
        
        // Only process if the hash contains OAuth-specific parameters (not route paths)
        if (hashString.includes('access_token=') || hashString.includes('error=')) {
          console.log("Login: ✅ Found OAuth data in hash fragment");
          const hashParams = new URLSearchParams(hashString);
          console.log("  - Hash params keys:", Array.from(hashParams.keys()));
          hashParams.forEach((value, key) => {
            console.log(`  - ${key}: ${key.includes('token') ? '[REDACTED]' : value}`);
          });
          
          accessToken = hashParams.get('access_token');
          refreshToken = hashParams.get('refresh_token');
          error = hashParams.get('error');
          errorDescription = hashParams.get('error_description');
          shouldCleanupHash = true;
        } else if (hashString.startsWith('login') || hashString.startsWith('/login')) {
          console.log("Login: ❌ Hash contains route path, not OAuth tokens");
        } else {
          console.log("Login: ❌ Hash contains unknown content:", hashString);
        }
      } else {
        console.log("Login: ❌ No hash fragment found");
      }
      
      console.log("Login: FINAL OAuth token analysis:");
      console.log("  - hasAccessToken:", !!accessToken);
      console.log("  - hasRefreshToken:", !!refreshToken);
      console.log("  - hasError:", !!error);
      console.log("  - error:", error);
      console.log("  - errorDescription:", errorDescription);
      console.log("  - shouldCleanupHash:", shouldCleanupHash);
      console.log("  - shouldCleanupSearch:", shouldCleanupSearch);
      
      if (error) {
        console.error("Login: ❌ OAuth error detected:", error, errorDescription);
        toast({
          title: "Authentication Error",
          description: errorDescription || error,
          variant: "destructive",
        });
        
        // Clean up the error from URL
        if (shouldCleanupHash) {
          window.location.hash = '#/login';
        }
        if (shouldCleanupSearch) {
          window.history.replaceState({}, document.title, window.location.pathname + '#/login');
        }
        console.log("=== OAUTH CALLBACK DETECTION END (ERROR) ===");
        return;
      }
      
      if (accessToken && refreshToken) {
        console.log("Login: ✅ Valid OAuth callback detected with both tokens");
        
        try {
          console.log("Login: Setting session with Supabase...");
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (sessionError) {
            console.error("Login: ❌ Error setting session:", sessionError);
            toast({
              title: "Session Error",
              description: "Failed to establish session. Please try logging in again.",
              variant: "destructive",
            });
          } else if (data.session) {
            console.log("Login: ✅ Session established successfully");
            console.log("Login: User email:", data.session.user?.email);
            console.log("Login: Session expires at:", data.session.expires_at);
            
            // Clean up the URL
            if (shouldCleanupHash) {
              window.location.hash = '#/members';
            }
            if (shouldCleanupSearch) {
              window.history.replaceState({}, document.title, window.location.pathname + '#/members');
            }
            
            // Navigate to members page
            console.log("Login: Navigating to members page...");
            navigate("/members", { replace: true });
          }
        } catch (err) {
          console.error("Login: ❌ Error processing OAuth callback:", err);
          toast({
            title: "Authentication Error",
            description: "An error occurred during sign in. Please try again.",
            variant: "destructive",
          });
        }
      } else if (accessToken && !refreshToken) {
        console.log("Login: ⚠️ Only access token found, missing refresh token");
      } else if (!accessToken && refreshToken) {
        console.log("Login: ⚠️ Only refresh token found, missing access token");
      } else {
        console.log("Login: ❌ No OAuth tokens found in URL at all");
        console.log("Login: This means either:");
        console.log("  1. This is not an OAuth callback");
        console.log("  2. Google is redirecting directly to the app (bypassing Supabase)");
        console.log("  3. Supabase is not processing the OAuth correctly");
      }
      
      console.log("=== OAUTH CALLBACK DETECTION END ===");
    };

    handleAuthCallback();
  }, [navigate]);

  // Show loading while checking auth state
  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-collektiv-accent via-white to-green-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-collektiv-green">Member Login</CardTitle>
          <p className="text-gray-600 mt-2">Access your exclusive member area</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <GoogleSignInButton loading={googleLoading} setLoading={setGoogleLoading} />

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
              or continue with email
            </span>
          </div>

          <EmailLoginForm />

          <div className="text-center space-y-2">
            <div className="text-sm">
              <span className="text-gray-600">Need an account? </span>
              <a href="/register" className="text-collektiv-green hover:text-collektiv-dark underline">
                Register with invitation code
              </a>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-6 p-4 bg-gray-50 rounded-lg">
            <strong>Invitation-Only Registration</strong><br />
            New members must be invited by an existing admin. Contact an admin for an invitation code to join the Collektiv Club.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
