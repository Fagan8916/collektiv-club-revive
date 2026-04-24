import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Records a view of a deal page (overview or memo) for the current authenticated member.
 * Insert is best-effort and silently fails for unauthenticated/unapproved users
 * (RLS will reject them).
 */
export const useDealViewTracker = (
  dealSlug: string | undefined,
  pageType: "overview" | "memo",
) => {
  useEffect(() => {
    if (!dealSlug) return;
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled || !user) return;
      const { error } = await supabase.from("deal_views").insert({
        deal_slug: dealSlug,
        user_id: user.id,
        viewer_email: user.email ?? null,
        page_type: pageType,
      });
      if (error) {
        // Non-fatal – likely RLS (user not approved member) or transient
        console.debug("[useDealViewTracker] insert failed", error.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dealSlug, pageType]);
};
