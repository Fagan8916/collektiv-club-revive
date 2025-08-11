
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
    
    try {
      // CRITICAL FIX: Use full URL with hash routing to match your setup
      const redirectTo = `${window.location.origin}/?post_auth=build-profile`;
      console.log("GoogleSignIn: CRITICAL - RedirectTo URL:", redirectTo);
      console.log("GoogleSignIn: This URL should be added to your Supabase redirect URLs");
      
      const oauthConfig = {
        provider: 'google' as const,
        options: {
          redirectTo: redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      };
      console.log("GoogleSignIn: OAuth config:", JSON.stringify(oauthConfig, null, 2));
      
      const { data, error } = await supabase.auth.signInWithOAuth(oauthConfig);
      
      if (error) {
        console.error("=== GOOGLE OAUTH ERROR ===");
        console.error("GoogleSignIn: OAuth error:", error);
        toast({
          title: "Google Sign In Error",
          description: error.message || "Unable to sign in with Google. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      } else {
        console.log("=== GOOGLE OAUTH SUCCESS ===");
        console.log("GoogleSignIn: OAuth redirect initiated successfully");
        console.log("GoogleSignIn: After Google auth, you should be redirected to:", redirectTo);
        // Don't set loading to false here as we're redirecting
      }
    } catch (err) {
      console.error("=== GOOGLE OAUTH UNEXPECTED ERROR ===");
      console.error("GoogleSignIn: Unexpected error:", err);
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
      className="w-full h-11"
      disabled={loading}
    >
      <Chrome className="mr-2 h-4 w-4 text-blue-500" />
      {loading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
};

export default GoogleSignInButton;
