import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ResendMagicLinkRequest {
  email: string;
  redirectTo?: string;
}

// Very basic, in-memory rate limiter (per function instance)
const rateLimiter = new Map<string, number>();
const RATE_LIMIT_MS = 60_000; // 1 minute

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const { email, redirectTo }: ResendMagicLinkRequest = await req.json();

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Very basic per-email rate limiting
    const last = rateLimiter.get(normalizedEmail) || 0;
    const now = Date.now();
    if (now - last < RATE_LIMIT_MS) {
      return new Response(JSON.stringify({ error: 'Too many requests, please wait a minute.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Optional: quick check if email is known (pre-approved or invited)
    try {
      const { data: preApproved } = await supabase
        .from('pre_approved_emails')
        .select('id, used_at')
        .eq('email', normalizedEmail)
        .limit(1);
      const { data: invites } = await supabase
        .from('invitations')
        .select('id, used_at')
        .eq('email', normalizedEmail)
        .order('created_at', { ascending: false })
        .limit(1);
      console.log('resend-magic-link: eligibility check', { hasPreApproved: !!preApproved?.length, hasInvite: !!invites?.length });
    } catch (e) {
      console.warn('resend-magic-link: eligibility check skipped', e);
    }

    const emailRedirectTo = redirectTo || 'https://collektiv.club/#/setup-account';

    // Check if user exists in auth; if not, create them (admin API bypasses "signups disabled")
    const { data: existing } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 });
    let userExists = false;
    try {
      // listUsers doesn't filter by email; do a targeted lookup via getUserByEmail-style query
      const { data: lookup } = await supabase.rpc as any;
      // Fallback: scan via admin listing with email filter is not supported, so attempt invite-style create
    } catch (_) { /* ignore */ }

    // Try to create the user (idempotent: if exists, we'll catch the error and continue)
    const { error: createError } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      email_confirm: true,
    });
    if (createError && !/already been registered|already exists|duplicate/i.test(createError.message)) {
      console.error('resend-magic-link: createUser error', createError);
      // Non-fatal — proceed to generate link anyway
    } else if (!createError) {
      console.log('resend-magic-link: created auth user for', normalizedEmail);
    } else {
      console.log('resend-magic-link: user already exists', normalizedEmail);
    }

    // Generate & email a magic link via admin API (works even when signups are disabled)
    const { error: magicLinkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: normalizedEmail,
      options: { redirectTo: emailRedirectTo },
    });

    if (magicLinkError) {
      console.error('resend-magic-link: magic link error', magicLinkError);
      throw new Error(`Failed to send magic link: ${magicLinkError.message}`);
    }

    // Update rate limit timestamp on success
    rateLimiter.set(normalizedEmail, now);

    return new Response(
      JSON.stringify({ success: true, message: `Magic link sent to ${normalizedEmail}` }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in resend-magic-link function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unexpected error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
