
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useUserRole = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isApprovedMember, setIsApprovedMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsAdmin(false);
          setIsApprovedMember(false);
          setLoading(false);
          return;
        }

        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .single();

        if (adminError && adminError.code !== "PGRST116") {
          console.error("Error checking admin role:", adminError);
        }

        setIsAdmin(!!adminData);

        // Check if user is approved member
        const { data: memberData, error: memberError } = await supabase
          .from("user_roles")
          .select("role, status")
          .eq("user_id", user.id)
          .eq("role", "member")
          .eq("status", "approved")
          .single();

        if (memberError && memberError.code !== "PGRST116") {
          console.error("Error checking member status:", memberError);
        }

        setIsApprovedMember(!!memberData);
      } catch (error) {
        console.error("Error in checkUserRole:", error);
        setIsAdmin(false);
        setIsApprovedMember(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUserRole();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { isAdmin, isApprovedMember, loading };
};
