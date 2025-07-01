
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
    console.log("GoogleSignIn: Starting Google OAuth flow");
    console.log("GoogleSignIn: Current URL before OAuth:", window.location.href);
    
    try {
      // Use the current origin for redirect, but redirect to login page to handle the callback
      const currentOrigin = window.location.origin;
      const redirectTo = `${currentOrigin}/login`;
      console.log("GoogleSignIn: Setting redirectTo:", redirectTo);
      console.log("GoogleSignIn: Current origin:", currentOrigin);
      console.log("GoogleSignIn: Expected Supabase callback should be: https://lectuphndieqxoluyhkv.supabase.co/auth/v1/callback");
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        console.error("GoogleSignIn: OAuth initiation error:", error);
        console.error("GoogleSignIn: Full error object:", JSON.stringify(error, null, 2));
        toast({
          title: "Google Sign In Error",
          description: error.message || "Unable to sign in with Google. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      } else {
        console.log("GoogleSignIn: OAuth redirect initiated successfully");
        console.log("GoogleSignIn: Data returned:", data);
        console.log("GoogleSignIn: About to redirect to Google...");
        // Don't set loading to false here as we're redirecting
      }
    } catch (err) {
      console.error("GoogleSignIn: Unexpected error during Google sign in:", err);
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
