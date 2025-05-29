
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import InvestmentsSection from "@/components/InvestmentsSection";

const Members = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/login", { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/login", { replace: true });
    });
    return () => { listener?.subscription?.unsubscribe(); };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-collektiv-accent to-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-collektiv-green text-center">Members Zone</h1>
        
        {/* Investments Section */}
        <InvestmentsSection />
        
        {/* Logout Button */}
        <div className="max-w-xl mx-auto text-center">
          <Button variant="secondary" onClick={handleLogout} className="mt-6">
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Members;
