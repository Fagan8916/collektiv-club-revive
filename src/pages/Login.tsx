import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Chrome } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, isApprovedMember, loading: roleLoading } = useUserRole();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Login page - Auth state change:", event, !!session);
      setUser(session?.user ?? null);
    });
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Login page - Initial session:", !!session);
      setUser(session?.user ?? null);
    });
    
    return () => { listener?.subscription?.unsubscribe(); };
  }, []);

  // Handle redirect after authentication
  useEffect(() => {
    if (user && !roleLoading) {
      console.log("User authenticated, checking roles:", { isAdmin, isApprovedMember });
      
      if (isAdmin || isApprovedMember) {
        console.log("User has access, redirecting to members");
        navigate("/members", { replace: true });
      } else {
        console.log("User needs approval, redirecting to pending approval");
        navigate("/pending-approval", { replace: true });
      }
    }
  }, [user, isAdmin, isApprovedMember, roleLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("Attempting email/password login");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    
    if (error) {
      console.error("Login error:", error);
      let message =
        error.message === "Invalid login credentials"
          ? "Access restricted. Please contact the admin if you require access."
          : error.message;
      toast({ title: "Login failed", description: message, variant: "destructive" });
    } else {
      console.log("Email/password login successful");
      toast({ title: "Success", description: "Login successful!" });
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("Attempting Google sign in");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      }
    });
    
    if (error) {
      console.error("Google sign in error:", error);
      toast({
        title: "Error signing in with Google",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: window.location.origin + "/#/reset-password",
    });
    setForgotLoading(false);
    setShowForgot(false);
    if (error) {
      toast({
        title: "Error sending reset link",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Reset link sent",
        description: "Please check your email for a password reset link.",
      });
    }
    setForgotEmail("");
  };

  // Show loading while checking authentication status
  if (user && roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-collektiv-accent via-white to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-collektiv-green mx-auto"></div>
          <p className="mt-4 text-collektiv-green">Checking your access...</p>
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
          {/* SSO Button */}
          <div className="space-y-3">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full h-11 border-gray-300 hover:bg-gray-50"
            >
              <Chrome className="mr-2 h-4 w-4 text-blue-500" />
              Continue with Google
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
              or continue with email
            </span>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-collektiv-green hover:text-collektiv-dark underline"
              onClick={() => setShowForgot(true)}
            >
              Forgot your password?
            </button>
          </div>

          <div className="text-center text-xs text-gray-500 mt-6 p-4 bg-gray-50 rounded-lg">
            Access is restricted to members only. Please contact an admin if you need an account.
          </div>
        </CardContent>

        {/* Forgot password modal */}
        {showForgot && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-lg">Reset your password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    required
                    autoFocus
                    disabled={forgotLoading}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowForgot(false);
                        setForgotEmail("");
                      }}
                      disabled={forgotLoading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={forgotLoading || forgotEmail.length === 0}>
                      {forgotLoading ? "Sending..." : "Send reset link"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Login;
