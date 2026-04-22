import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface PushPayload {
  title: string;
  message: string;
  url?: string;
  audience?: "all" | "admins";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ONESIGNAL_APP_ID = Deno.env.get("ONESIGNAL_APP_ID");
    const ONESIGNAL_REST_API_KEY = Deno.env.get("ONESIGNAL_REST_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OneSignal credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Auth check — must be admin
    const authHeader = req.headers.get("Authorization");
    console.log("Auth header present:", Boolean(authHeader));
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: isAdmin } = await supabase.rpc("is_current_user_admin");
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse + validate body
    const body = (await req.json()) as PushPayload;
    const title = (body.title || "").trim();
    const message = (body.message || "").trim();
    const url = (body.url || "").trim();
    const audience: "all" | "admins" = body.audience === "admins" ? "admins" : "all";

    if (!title || title.length > 120) {
      return new Response(
        JSON.stringify({ error: "Title required (1-120 chars)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!message || message.length > 500) {
      return new Response(
        JSON.stringify({ error: "Message required (1-500 chars)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (url && !/^https?:\/\/.{1,2000}$/.test(url)) {
      return new Response(JSON.stringify({ error: "Invalid URL" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build OneSignal payload — broadcast to all OR target admin user_ids
    const oneSignalPayload: Record<string, unknown> = {
      app_id: ONESIGNAL_APP_ID,
      headings: { en: title },
      contents: { en: message },
    };

    if (audience === "admins") {
      // Resolve admin user_ids via service-role client (bypass RLS)
      const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const { data: adminRoles, error: adminErr } = await adminClient
        .from("user_roles")
        .select("user_id")
        .eq("role", "admin")
        .eq("status", "approved");

      if (adminErr) {
        console.error("Admin lookup error:", adminErr);
        return new Response(
          JSON.stringify({ error: "Failed to resolve admin recipients" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const adminIds = (adminRoles || []).map((r) => r.user_id).filter(Boolean);
      if (adminIds.length === 0) {
        return new Response(
          JSON.stringify({ error: "No admin recipients found" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      oneSignalPayload.include_external_user_ids = adminIds;
      oneSignalPayload.channel_for_external_user_ids = "push";
    } else {
      oneSignalPayload.included_segments = ["Active Subscriptions"];
    }

    if (url) oneSignalPayload.url = url;

    const oneSignalRes = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify(oneSignalPayload),
    });

    const oneSignalData = await oneSignalRes.json();
    console.log("OneSignal response:", JSON.stringify(oneSignalData));

    if (!oneSignalRes.ok) {
      console.error("OneSignal error:", oneSignalData);
      const detailMsg =
        oneSignalData?.errors?.[0] ||
        (typeof oneSignalData?.errors === "object"
          ? JSON.stringify(oneSignalData.errors)
          : "OneSignal send failed");
      return new Response(
        JSON.stringify({ error: detailMsg, details: oneSignalData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // OneSignal can return 200 with errors array (e.g., "All included players are not subscribed")
    if (oneSignalData?.errors && !oneSignalData?.id) {
      const detailMsg = Array.isArray(oneSignalData.errors)
        ? oneSignalData.errors[0]
        : JSON.stringify(oneSignalData.errors);
      console.error("OneSignal returned errors:", detailMsg);
      return new Response(
        JSON.stringify({
          error: detailMsg,
          hint:
            "Make sure recipients have installed the PWA and opted in to push notifications.",
          details: oneSignalData,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Log to push_notifications table — prefix audience tag in title for history clarity
    const loggedTitle = audience === "admins" ? `[Admins] ${title}` : title;
    const { error: insertErr } = await supabase.from("push_notifications").insert({
      title: loggedTitle,
      message,
      url: url || null,
      sent_by: userData.user.id,
      recipients: oneSignalData.recipients ?? null,
      onesignal_id: oneSignalData.id ?? null,
    });
    if (insertErr) console.error("Log insert error:", insertErr);

    return new Response(
      JSON.stringify({
        success: true,
        audience,
        recipients: oneSignalData.recipients ?? 0,
        onesignal_id: oneSignalData.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("send-push-notification error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
