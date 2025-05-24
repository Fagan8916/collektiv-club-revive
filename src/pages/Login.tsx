
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
        <div className="text-center mt-4 text-xs text-gray-500">
          Access is restricted. Please contact an admin if you need an account.
        </div>
      </div>
    </div>
  );
};

export default Login;
