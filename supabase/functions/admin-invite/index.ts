import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AdminInviteRequest {
  email: string;
  name?: string;
  redirectTo?: string; // optional override, defaults to setup-account
}

serve(async (req: Request): Promise<Response> => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase environment variables");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const { email, name, redirectTo }: AdminInviteRequest = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Create clients
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const supabaseUserCtx = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });

    // Verify caller user and admin role
    const { data: userData, error: userErr } = await supabaseUserCtx.auth.getUser();
    if (userErr || !userData?.user) {
      console.warn("Unauthorized request: no valid user", userErr);
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const callerId = userData.user.id;

    const { data: adminRole, error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", callerId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleErr) {
      console.error("Error checking admin role", roleErr);
      return new Response(JSON.stringify({ error: "Failed role check" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!adminRole) {
      return new Response(JSON.stringify({ error: "Forbidden: admin only" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Pre-approve email (idempotent) and store name for display
    const normalizedEmail = email.trim().toLowerCase();
    const preapprovePayload = {
      email: normalizedEmail,
      full_name: name?.trim() || null,
      notes: "Added via admin-invite edge function",
      added_by: callerId,
    } as Record<string, unknown>;

    const { error: upsertErr } = await supabaseAdmin
      .from("pre_approved_emails")
      .upsert(preapprovePayload, { onConflict: "email" });

    if (upsertErr) {
      console.error("Error pre-approving email", upsertErr);
      return new Response(JSON.stringify({ error: "Failed to pre-approve" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send official admin invite with enforced redirect
    const finalRedirect = redirectTo?.trim() || "https://collektiv.club/#/setup-account";

    const { data: inviteRes, error: inviteErr } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      normalizedEmail,
      {
        redirectTo: finalRedirect,
        data: name ? { full_name: name } : undefined,
      }
    );

    if (inviteErr) {
      console.error("Error sending admin invite", inviteErr);
      return new Response(JSON.stringify({ error: inviteErr.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Admin invite sent", { email: normalizedEmail, redirectTo: finalRedirect });

    return new Response(
      JSON.stringify({ success: true, user: inviteRes?.user || null, redirectTo: finalRedirect }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (e: any) {
    console.error("Unhandled error in admin-invite", e);
    return new Response(JSON.stringify({ error: e?.message || "Unexpected error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
