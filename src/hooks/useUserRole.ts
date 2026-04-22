
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

        // Admin access is restricted to a hardcoded allowlist of emails.
        // Only these accounts can ever see/use the Admin tab.
        const ADMIN_ALLOWLIST = ['ryan@collektiv.club', 'manon@collektiv.club', 'kev@collektiv.club'];
        const userEmail = (user.email || '').toLowerCase();
        const isAllowlistedAdmin = ADMIN_ALLOWLIST.includes(userEmail);

        if (isAllowlistedAdmin) {
          console.log(`useUserRole: Allowlisted admin ${userEmail} - granting admin access`);
          if (mounted) {
            setIsAdmin(true);
            setIsApprovedMember(true);
            setLoading(false);
          }
          return;
        }

        // Get user roles for other users
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

        console.log("useUserRole: User roles from database:", userRoles);

        // Non-allowlisted users can NEVER be admin, even if they have an admin row in user_roles.
        const hasAdminRole = false;

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
