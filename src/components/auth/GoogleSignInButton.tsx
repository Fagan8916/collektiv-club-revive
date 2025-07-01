
import React from "react";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface GoogleSignInButtonProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const GoogleSignInButton = ({ loading, setLoading }: GoogleSignInButtonProps) => {
  const handleGoogleSignIn = async () => {
    setLoading(true);
    console.log("=== GOOGLE OAUTH INITIATION START ===");
    console.log("GoogleSignIn: Starting Google OAuth flow");
    console.log("GoogleSignIn: Current URL before OAuth:", window.location.href);
    console.log("GoogleSignIn: Current origin:", window.location.origin);
    console.log("GoogleSignIn: Current pathname:", window.location.pathname);
    console.log("GoogleSignIn: Current hash:", window.location.hash);
    
    try {
      // CRITICAL: Check what redirectTo we're actually using
      const redirectTo = `${window.location.origin}/login`;
      console.log("GoogleSignIn: CRITICAL - RedirectTo URL:", redirectTo);
      console.log("GoogleSignIn: This should match your Supabase redirect URL configuration");
      console.log("GoogleSignIn: Expected Supabase callback URL: https://lectuphndieqxoluyhkv.supabase.co/auth/v1/callback");
      
      // Log the exact OAuth configuration being sent
      const oauthConfig = {
        provider: 'google',
        options: {
          redirectTo: redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      };
      console.log("GoogleSignIn: OAuth config being sent to Supabase:", JSON.stringify(oauthConfig, null, 2));
      
      const { data, error } = await supabase.auth.signInWithOAuth(oauthConfig);
      
      if (error) {
        console.error("=== GOOGLE OAUTH ERROR ===");
        console.error("GoogleSignIn: OAuth initiation error:", error);
        console.error("GoogleSignIn: Error code:", error.code);
        console.error("GoogleSignIn: Error message:", error.message);
        console.error("GoogleSignIn: Full error object:", JSON.stringify(error, null, 2));
        toast({
          title: "Google Sign In Error",
          description: error.message || "Unable to sign in with Google. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      } else {
        console.log("=== GOOGLE OAUTH SUCCESS ===");
        console.log("GoogleSignIn: OAuth redirect initiated successfully");
        console.log("GoogleSignIn: Response data:", JSON.stringify(data, null, 2));
        console.log("GoogleSignIn: About to redirect to Google...");
        console.log("GoogleSignIn: After Google auth, you should be redirected to:", redirectTo);
        console.log("GoogleSignIn: The URL should then contain OAuth tokens");
        // Don't set loading to false here as we're redirecting
      }
    } catch (err) {
      console.error("=== GOOGLE OAUTH UNEXPECTED ERROR ===");
      console.error("GoogleSignIn: Unexpected error during Google sign in:", err);
      console.error("GoogleSignIn: Error type:", typeof err);
      console.error("GoogleSignIn: Error constructor:", err?.constructor?.name);
      console.error("GoogleSignIn: Error details:", JSON.stringify(err, null, 2));
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outline"
      className="w-full h-11 border-gray-300 hover:bg-gray-50"
      disabled={loading}
    >
      <Chrome className="mr-2 h-4 w-4 text-blue-500" />
      {loading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
};

export default GoogleSignInButton;
