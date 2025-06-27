
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

  // Handle OAuth callback with comprehensive parameter checking
  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("Login: Checking for OAuth callback");
      console.log("Login: Current URL:", window.location.href);
      console.log("Login: Hash:", window.location.hash);
      console.log("Login: Search:", window.location.search);
      
      // Function to extract params from both hash and search
      const getParamsFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        
        return {
          access_token: urlParams.get('access_token') || hashParams.get('access_token'),
          refresh_token: urlParams.get('refresh_token') || hashParams.get('refresh_token'),
          error: urlParams.get('error') || hashParams.get('error'),
          error_description: urlParams.get('error_description') || hashParams.get('error_description'),
          type: urlParams.get('type') || hashParams.get('type')
        };
      };

      const params = getParamsFromUrl();
      
      if (params.error) {
        console.error("Login: OAuth error:", params.error, params.error_description);
        toast({
          title: "Authentication Error",
          description: params.error_description || params.error,
          variant: "destructive",
        });
        // Clear the error from URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }
      
      if (params.access_token) {
        console.log("Login: OAuth callback detected with access token");
        
        try {
          // Set the session from the tokens
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: params.access_token,
            refresh_token: params.refresh_token || '',
          });
          
          if (sessionError) {
            console.error("Login: Error setting session:", sessionError);
            toast({
              title: "Session Error",
              description: "Failed to establish session. Please try logging in again.",
              variant: "destructive",
            });
          } else if (data.session) {
            console.log("Login: Session established successfully");
            console.log("Login: User:", data.session.user?.email);
            
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Wait a bit for auth state to propagate, then redirect
            setTimeout(() => {
              console.log("Login: Redirecting to members page");
              navigate("/members", { replace: true });
            }, 500);
          }
        } catch (err) {
          console.error("Login: Error processing OAuth callback:", err);
          toast({
            title: "Authentication Error",
            description: "An error occurred during sign in. Please try again.",
            variant: "destructive",
          });
        }
      }
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
