
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) navigate("/members", { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) navigate("/members", { replace: true });
    });
    return () => { listener?.subscription?.unsubscribe(); };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      let message =
        error.message === "Invalid login credentials"
          ? "Access restricted. Please contact the admin if you require access."
          : error.message;
      toast({ title: "Login failed", description: message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Login successful!" });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: window.location.origin + "/#/login",
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-collektiv-accent">
      <div className="max-w-md w-full bg-white p-8 rounded shadow border mx-2">
        <h2 className="text-2xl font-bold mb-6 text-center">Member Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            required
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            required
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </Button>
        </form>
        <div className="flex justify-end mt-2">
          <button
            type="button"
            className="text-xs text-collektiv-green underline hover:text-collektiv-dark px-1"
            onClick={() => setShowForgot(true)}
            tabIndex={-1}
          >
            Forgot password?
          </button>
        </div>
        <div className="text-center mt-4 text-xs text-gray-500">
          Access is restricted. Please contact an admin if you need an account.
        </div>
        {/* Forgot password form (simple modal style) */}
        {showForgot && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded shadow-lg p-6 max-w-xs w-full border mx-2">
              <h3 className="text-lg font-semibold mb-2">Reset your password</h3>
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                  autoFocus
                  disabled={forgotLoading}
                />
                <div className="flex justify-end space-x-2 mt-1">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
