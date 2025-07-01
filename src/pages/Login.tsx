
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

  // ENHANCED OAuth callback detection with even more detailed logging
  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("=== ENHANCED OAUTH CALLBACK DETECTION START ===");
      console.log("Login: Enhanced URL analysis:");
      console.log("  - FULL href:", window.location.href);
      console.log("  - origin:", window.location.origin);
      console.log("  - pathname:", window.location.pathname);
      console.log("  - search:", window.location.search);
      console.log("  - hash:", window.location.hash);
      console.log("  - host:", window.location.host);
      console.log("  - protocol:", window.location.protocol);
      console.log("  - port:", window.location.port);
      
      // Check if this looks like a callback from Google
      const isLikelyCallback = window.location.href.includes('code=') || 
                             window.location.href.includes('access_token=') ||
                             window.location.href.includes('error=') ||
                             window.location.search.includes('code=') ||
                             window.location.search.includes('access_token=') ||
                             window.location.hash.includes('access_token=');
      
      console.log("Login: Is this likely an OAuth callback?", isLikelyCallback);
      
      let accessToken = null;
      let refreshToken = null;
      let error = null;
      let errorDescription = null;
      let authCode = null;
      let shouldCleanupHash = false;
      let shouldCleanupSearch = false;
      
      // Check URL search params first (this is where Google usually puts the auth code)
      const searchParams = new URLSearchParams(window.location.search);
      console.log("Login: DETAILED search params analysis:");
      console.log("  - Raw search string:", window.location.search);
      console.log("  - Parsed params keys:", Array.from(searchParams.keys()));
      console.log("  - Number of params:", searchParams.size);
      
      // Log all parameters (but redact sensitive ones)
      searchParams.forEach((value, key) => {
        if (key.toLowerCase().includes('token') || key.toLowerCase().includes('code')) {
          console.log(`  - ${key}: [REDACTED - LENGTH: ${value.length}]`);
        } else {
          console.log(`  - ${key}: ${value}`);
        }
      });
      
      // Check for OAuth parameters in search
      if (searchParams.has('access_token')) {
        console.log("Login: ✅ Found OAuth tokens in search params");
        accessToken = searchParams.get('access_token');
        refreshToken = searchParams.get('refresh_token');
        shouldCleanupSearch = true;
      }
      
      if (searchParams.has('code')) {
        console.log("Login: ✅ Found OAuth authorization code in search params");
        authCode = searchParams.get('code');
        shouldCleanupSearch = true;
      }
      
      if (searchParams.has('error')) {
        console.log("Login: ❌ Found OAuth error in search params");
        error = searchParams.get('error');
        errorDescription = searchParams.get('error_description');
        shouldCleanupSearch = true;
      }
      
      if (!accessToken && !authCode && !error && window.location.hash) {
        const hashString = window.location.hash.substring(1);
        console.log("Login: DETAILED hash fragment analysis:");
        console.log("  - Raw hash:", window.location.hash);
        console.log("  - Hash string (without #):", hashString);
        console.log("  - Hash length:", hashString.length);
        
        // Only process if the hash contains OAuth-specific parameters
        if (hashString.includes('access_token=') || hashString.includes('error=') || hashString.includes('code=')) {
          console.log("Login: ✅ Found OAuth data in hash fragment");
          const hashParams = new URLSearchParams(hashString);
          console.log("  - Hash params keys:", Array.from(hashParams.keys()));
          
          hashParams.forEach((value, key) => {
            if (key.toLowerCase().includes('token') || key.toLowerCase().includes('code')) {
              console.log(`  - ${key}: [REDACTED - LENGTH: ${value.length}]`);
            } else {
              console.log(`  - ${key}: ${value}`);
            }
          });
          
          accessToken = hashParams.get('access_token');
          refreshToken = hashParams.get('refresh_token');
          authCode = hashParams.get('code');
          error = hashParams.get('error');
          errorDescription = hashParams.get('error_description');
          shouldCleanupHash = true;
        } else if (hashString.startsWith('login') || hashString.startsWith('/login')) {
          console.log("Login: ❌ Hash contains route path, not OAuth tokens");
        } else {
          console.log("Login: ❌ Hash contains unknown content:", hashString.substring(0, 100));
        }
      }
      
      console.log("Login: FINAL ENHANCED OAuth analysis:");
      console.log("  - hasAccessToken:", !!accessToken);
      console.log("  - hasRefreshToken:", !!refreshToken);
      console.log("  - hasAuthCode:", !!authCode);
      console.log("  - hasError:", !!error);
      console.log("  - error:", error);
      console.log("  - errorDescription:", errorDescription);
      console.log("  - shouldCleanupHash:", shouldCleanupHash);
      console.log("  - shouldCleanupSearch:", shouldCleanupSearch);
      
      // Handle OAuth errors
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
        console.log("=== ENHANCED OAUTH CALLBACK DETECTION END (ERROR) ===");
        return;
      }
      
      // Handle authorization code (Google OAuth flow)
      if (authCode) {
        console.log("Login: ✅ Authorization code detected - Supabase should handle this automatically");
        console.log("Login: The auth code will be exchanged for tokens by Supabase");
        console.log("Login: Waiting for Supabase to process the callback...");
        
        // Wait a moment for Supabase to process the callback
        setTimeout(() => {
          console.log("Login: Checking if Supabase has processed the auth code...");
          supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
              console.error("Login: Error getting session after auth code:", error);
            } else if (session) {
              console.log("Login: ✅ Session established after auth code processing");
              navigate("/members", { replace: true });
            } else {
              console.log("Login: ⚠️ No session yet, auth code might still be processing");
            }
          });
        }, 1000);
        
        // Clean up the auth code from URL
        if (shouldCleanupHash) {
          window.location.hash = '#/login';
        }
        if (shouldCleanupSearch) {
          window.history.replaceState({}, document.title, window.location.pathname + '#/login');
        }
        return;
      }
      
      // Handle direct tokens (less common with Google OAuth)
      if (accessToken && refreshToken) {
        console.log("Login: ✅ Direct OAuth tokens detected");
        
        try {
          console.log("Login: Setting session with direct tokens...");
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (sessionError) {
            console.error("Login: ❌ Error setting session with direct tokens:", sessionError);
            toast({
              title: "Session Error",
              description: "Failed to establish session. Please try logging in again.",
              variant: "destructive",
            });
          } else if (data.session) {
            console.log("Login: ✅ Session established with direct tokens");
            
            // Clean up the URL
            if (shouldCleanupHash) {
              window.location.hash = '#/members';
            }
            if (shouldCleanupSearch) {
              window.history.replaceState({}, document.title, window.location.pathname + '#/members');
            }
            
            navigate("/members", { replace: true });
          }
        } catch (err) {
          console.error("Login: ❌ Error processing direct OAuth tokens:", err);
          toast({
            title: "Authentication Error",
            description: "An error occurred during sign in. Please try again.",
            variant: "destructive",
          });
        }
      } else if (!isLikelyCallback) {
        console.log("Login: ❌ No OAuth tokens/code found and this doesn't look like a callback");
        console.log("Login: This is likely just a normal page load");
      } else {
        console.log("Login: ⚠️ This looks like a callback but no tokens/code found");
        console.log("Login: Possible issues:");
        console.log("  1. Redirect URL mismatch between Google and Supabase");
        console.log("  2. Supabase not configured correctly for Google OAuth");
        console.log("  3. Google OAuth tokens being sent to wrong endpoint");
      }
      
      console.log("=== ENHANCED OAUTH CALLBACK DETECTION END ===");
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
