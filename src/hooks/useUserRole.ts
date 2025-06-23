
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
        console.log("useUserRole: Checking user role...");
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!mounted) return;
        
        if (!user) {
          console.log("useUserRole: No user found");
          setIsAdmin(false);
          setIsApprovedMember(false);
          setLoading(false);
          return;
        }

        console.log("useUserRole: User found:", user.email, user.id);

        // Get all user roles in one query
        const { data: userRoles, error } = await supabase
          .from("user_roles")
          .select("role, status")
          .eq("user_id", user.id);

        if (error) {
          console.error("useUserRole: Error fetching roles:", error);
          if (mounted) {
            setIsAdmin(false);
            setIsApprovedMember(false);
            setLoading(false);
          }
          return;
        }

        console.log("useUserRole: User roles:", userRoles);

        // Check for admin role
        const hasAdminRole = userRoles?.some(role => role.role === 'admin') || false;
        
        // Check for approved member role
        const hasApprovedMemberRole = userRoles?.some(role => 
          role.role === 'member' && role.status === 'approved'
        ) || false;

        console.log("useUserRole: Admin status:", hasAdminRole);
        console.log("useUserRole: Approved member status:", hasApprovedMemberRole);

        if (mounted) {
          setIsAdmin(hasAdminRole);
          setIsApprovedMember(hasApprovedMemberRole);
          setLoading(false);
        }
      } catch (error) {
        console.error("useUserRole: Error in checkUserRole:", error);
        if (mounted) {
          setIsAdmin(false);
          setIsApprovedMember(false);
          setLoading(false);
        }
      }
    };

    checkUserRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("useUserRole: Auth state changed:", event, !!session);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Small delay to ensure user record is available
        setTimeout(() => {
          checkUserRole();
        }, 500);
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
