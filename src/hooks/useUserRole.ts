
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useUserRole = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isApprovedMember, setIsApprovedMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkUserRole = async () => {
      try {
        console.log("Checking user role...");
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!mounted) return;
        
        if (!user) {
          console.log("No user found");
          setIsAdmin(false);
          setIsApprovedMember(false);
          setLoading(false);
          return;
        }

        console.log("User found:", user.id);

        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (adminError && adminError.code !== "PGRST116") {
          console.error("Error checking admin role:", adminError);
        }

        const isUserAdmin = !!adminData;
        console.log("Is admin:", isUserAdmin);

        // Check if user is approved member
        const { data: memberData, error: memberError } = await supabase
          .from("user_roles")
          .select("role, status")
          .eq("user_id", user.id)
          .eq("role", "member")
          .eq("status", "approved")
          .maybeSingle();

        if (memberError && memberError.code !== "PGRST116") {
          console.error("Error checking member status:", memberError);
        }

        const isUserApprovedMember = !!memberData;
        console.log("Is approved member:", isUserApprovedMember);

        if (mounted) {
          setIsAdmin(isUserAdmin);
          setIsApprovedMember(isUserApprovedMember);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in checkUserRole:", error);
        if (mounted) {
          setIsAdmin(false);
          setIsApprovedMember(false);
          setLoading(false);
        }
      }
    };

    checkUserRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, !!session);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Small delay to ensure user record is available
        setTimeout(() => {
          checkUserRole();
        }, 100);
      } else if (event === 'SIGNED_OUT') {
        if (mounted) {
          setIsAdmin(false);
          setIsApprovedMember(false);
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, isApprovedMember, loading };
};
