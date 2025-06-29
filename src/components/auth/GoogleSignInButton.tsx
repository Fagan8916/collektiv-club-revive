
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
    console.log("Login: Attempting Google sign in");
    
    try {
      // Use the current origin for redirect, ensuring it works in both dev and production
      const currentOrigin = window.location.origin;
      const redirectTo = `${currentOrigin}/members`;
      console.log("Login: Redirect URL set to:", redirectTo);
      console.log("Login: Current origin:", currentOrigin);
      
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
        console.error("Login: Google sign in error:", error);
        toast({
          title: "Google Sign In Error",
          description: error.message || "Unable to sign in with Google. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      } else {
        console.log("Login: Google OAuth redirect initiated", data);
        // Don't set loading to false here as we're redirecting
      }
    } catch (err) {
      console.error("Login: Unexpected error during Google sign in:", err);
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
