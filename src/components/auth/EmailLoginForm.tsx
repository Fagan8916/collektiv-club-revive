
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const EmailLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  return (
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
  );
};

export default EmailLoginForm;
