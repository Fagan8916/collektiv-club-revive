
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Chrome } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      console.log("Login: User already authenticated, redirecting to members");
      navigate("/members", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Check for OAuth errors in URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    
    if (error) {
      console.error("Login: OAuth error detected:", error, errorDescription);
      toast({
        title: "Authentication Error",
        description: errorDescription || error,
        variant: "destructive",
      });
    }
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("Login: Attempting email/password login");
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    setLoading(false);
    
    if (error) {
      console.error("Login: Email/password error:", error);
      toast({ 
        title: "Login failed", 
        description: error.message === "Invalid login credentials" 
          ? "Invalid email or password. Please check your credentials and try again."
          : error.message, 
        variant: "destructive" 
      });
    } else if (data.session) {
      console.log("Login: Email/password login successful");
      toast({ title: "Success", description: "Login successful!" });
      navigate("/members", { replace: true });
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("Login: Attempting Google sign in");
    console.log("Login: Current origin:", window.location.origin);
    
    try {
      // Try to sign in with Google using same-window redirect
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/members`,
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
          description: error.message || "Unable to sign in with Google. Please try again or use email/password login.",
          variant: "destructive",
        });
      }
      // If successful, the browser will redirect to Google
    } catch (err) {
      console.error("Login: Unexpected error during Google sign in:", err);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-collektiv-accent via-white to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-collektiv-green mx-auto"></div>
          <p className="mt-4 text-collektiv-green">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-collektiv-accent via-white to-green-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-collektiv-green">Member Login</CardTitle>
          <p className="text-gray-600 mt-2">Access your exclusive member area</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google SSO Button */}
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full h-11 border-gray-300 hover:bg-gray-50"
          >
            <Chrome className="mr-2 h-4 w-4 text-blue-500" />
            Continue with Google
          </Button>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
              or continue with email
            </span>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                autoComplete="email"
                required
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                className="pl-10 h-11"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                autoComplete="current-password"
                required
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                className="pl-10 h-11"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 bg-collektiv-green hover:bg-collektiv-dark" 
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

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
