import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AddUserRequest {
  email: string;
  name?: string;
  role?: 'admin' | 'member';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, role = 'member' }: AddUserRequest = await req.json();

    console.log(`Adding user: ${email} with role: ${role}`);

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // First, add email to pre-approved list
    const { error: preApprovalError } = await supabase.rpc('add_pre_approved_emails', {
      p_emails: [email],
      p_notes: `${name || 'User'} - ${role} member`
    });

    if (preApprovalError) {
      console.error("Error adding to pre-approved emails:", preApprovalError);
      throw new Error(`Failed to pre-approve email: ${preApprovalError.message}`);
    }

    console.log("Successfully added to pre-approved emails");

    // Send magic link via Supabase Auth
    const { error: magicLinkError } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: 'https://collektiv.club/#/members'
      }
    });

    if (magicLinkError) {
      console.error("Magic link generation failed:", magicLinkError);
      throw new Error(`Failed to send magic link: ${magicLinkError.message}`);
    }

    console.log("Magic link sent successfully to:", email);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Magic link sent to ${email}. User will be auto-approved as ${role} member.`,
      email: email,
      role: role
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);