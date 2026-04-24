import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email, redirectTo } = await req.json();
    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
    const normalizedEmail = email.trim().toLowerCase();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Ensure user exists (idempotent)
    const { error: createErr } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      email_confirm: true,
    });
    if (createErr && !/already|registered|exists|duplicate/i.test(createErr.message)) {
      console.error('createUser error', createErr);
    }

    const emailRedirectTo = redirectTo || 'https://collektiv.club/#/setup-account';

    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: normalizedEmail,
      options: { redirectTo: emailRedirectTo },
    });

    if (error) throw error;

    return new Response(JSON.stringify({
      success: true,
      action_link: data?.properties?.action_link,
      hashed_token: data?.properties?.hashed_token,
      verification_type: data?.properties?.verification_type,
      redirect_to: emailRedirectTo,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (e: any) {
    console.error('admin-get-magic-link error', e);
    return new Response(JSON.stringify({ error: e.message || 'Unexpected error' }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
