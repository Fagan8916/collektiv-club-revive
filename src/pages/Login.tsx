
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

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      console.log('Login: User already authenticated, redirecting to /members');
      navigate('/members', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Token/callback handling centralized in App.tsx to avoid duplication and loops
  useEffect(() => {
    // no-op
  }, []);

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
              <button 
                onClick={async () => {
                  const email = prompt("Enter your email address to reset your password:");
                  if (email) {
                    const { error } = await supabase.auth.resetPasswordForEmail(email, {
                      redirectTo: `${window.location.origin}/#/reset-password`
                    });
                    if (error) {
                      toast({
                        title: "Error",
                        description: error.message,
                        variant: "destructive",
                      });
                    } else {
                      toast({
                        title: "Password reset sent",
                        description: "Check your email for the reset link.",
                      });
                    }
                  }
                }}
                className="text-collektiv-green hover:text-collektiv-dark underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Need an account? </span>
              <a href="/membership" className="text-collektiv-green hover:text-collektiv-dark underline">
                Join Collektiv Club
              </a>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-6 p-4 bg-gray-50 rounded-lg">
            <strong>Join Collektiv Club</strong><br />
            Create your account and apply for membership. Your application will be reviewed by our admins.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
