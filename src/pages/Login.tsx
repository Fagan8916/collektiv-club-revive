
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

  // Handle OAuth callback
  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("Login: Checking for OAuth callback");
      console.log("Login: Current URL:", window.location.href);
      console.log("Login: Search params:", window.location.search);
      
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      const refreshToken = urlParams.get('refresh_token');
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');
      
      if (error) {
        console.error("Login: OAuth error:", error, errorDescription);
        toast({
          title: "Authentication Error",
          description: errorDescription || error,
          variant: "destructive",
        });
        // Clear the error from URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }
      
      if (accessToken && refreshToken) {
        console.log("Login: OAuth callback detected with tokens");
        
        try {
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
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
            
            // Navigate to members page
            navigate("/members", { replace: true });
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
