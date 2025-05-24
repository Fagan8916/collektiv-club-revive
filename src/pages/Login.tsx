
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      // Redirect logged-in users to members zone
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
    const fn = mode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your inbox", description: "Confirm your email if prompted." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-collektiv-accent">
      <div className="max-w-md w-full bg-white p-8 rounded shadow border mx-2">
        <h2 className="text-2xl font-bold mb-6 text-center">{mode === "login" ? "Member Login" : "Sign Up"}</h2>
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
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            required
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
          </Button>
        </form>
        <div className="text-center mt-4">
          {mode === "login" ? (
            <span>Don&apos;t have an account?{" "}
              <button className="text-collektiv-green underline" onClick={() => setMode("signup")}>Sign Up</button>
            </span>
          ) : (
            <span>Already have an account?{" "}
              <button className="text-collektiv-green underline" onClick={() => setMode("login")}>Login</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
