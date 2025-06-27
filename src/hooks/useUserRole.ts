
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
        console.log("useUserRole: Starting role check...");
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

        // Get all user roles in one query with better error handling
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

        console.log("useUserRole: Raw user roles from database:", userRoles);

        // Debug: Let's also check if the user exists in the user_roles table at all
        const { data: allUserRoles, error: debugError } = await supabase
          .from("user_roles")
          .select("*")
          .eq("user_id", user.id);
        
        console.log("useUserRole: ALL roles for user (debug):", allUserRoles);
        if (debugError) console.log("useUserRole: Debug query error:", debugError);

        // Check for admin role specifically - only approved admin roles count
        const hasAdminRole = userRoles?.some(role => 
          role.role === 'admin' && role.status === 'approved'
        ) || false;
        
        // Check for approved member role
        const hasMemberRole = userRoles?.some(role => 
          role.role === 'member' && role.status === 'approved'
        ) || false;
        
        console.log("useUserRole: Role analysis - hasAdminRole:", hasAdminRole, "hasMemberRole:", hasMemberRole);

        if (mounted) {
          setIsAdmin(hasAdminRole);
          setIsApprovedMember(hasMemberRole || hasAdminRole); // Admins are also approved members
          setLoading(false);
        }

        console.log("useUserRole: Final status - Admin:", hasAdminRole, "Approved member:", (hasMemberRole || hasAdminRole));
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
