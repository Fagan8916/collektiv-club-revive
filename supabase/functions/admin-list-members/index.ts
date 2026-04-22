import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? "",
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Authorization required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", ""),
    );
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid authentication" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("role, status")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .eq("status", "approved");

    if (!roles?.length) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Paginate through all auth users
    const allUsers: { id: string; email: string }[] = [];
    let page = 1;
    const perPage = 1000;
    while (true) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
      if (error) throw error;
      const users = data?.users ?? [];
      for (const u of users) {
        if (u.email) allUsers.push({ id: u.id, email: u.email });
      }
      if (users.length < perPage) break;
      page += 1;
      if (page > 20) break;
    }

    const userIds = allUsers.map((u) => u.id);
    const emails = allUsers.map((u) => u.email.toLowerCase());

    const [{ data: profiles }, { data: preApproved }] = await Promise.all([
      supabaseAdmin
        .from("member_profiles")
        .select("user_id, first_name, full_name, contact_email")
        .in("user_id", userIds.length > 0 ? userIds : ["00000000-0000-0000-0000-000000000000"]),
      supabaseAdmin
        .from("pre_approved_emails")
        .select("email, full_name")
        .in("email", emails.length > 0 ? emails : ["__none__"]),
    ]);

    const profileById = new Map(
      (profiles ?? []).map((p) => [
        p.user_id,
        [p.first_name, p.full_name].filter(Boolean).join(" ").trim(),
      ]),
    );
    const preApprovedByEmail = new Map(
      (preApproved ?? []).map((p) => [p.email.toLowerCase(), p.full_name ?? ""]),
    );

    const members = allUsers
      .map((u) => {
        const name =
          profileById.get(u.id) ||
          preApprovedByEmail.get(u.email.toLowerCase()) ||
          "";
        return {
          email: u.email.toLowerCase(),
          name,
          label: name ? `${name} — ${u.email}` : u.email,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

    return new Response(JSON.stringify({ members }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("admin-list-members error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
