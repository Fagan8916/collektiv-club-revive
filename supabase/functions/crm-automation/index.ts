import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key, X-API-Key',
};

interface CRMInviteRequest {
  email: string;
  name?: string;
  redirectTo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log(`CRM Automation called: ${req.method} ${req.url}`);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const crmApiKey = Deno.env.get('CRM_API_KEY');

    if (!supabaseUrl || !supabaseServiceRoleKey || !crmApiKey) {
      console.error('Missing environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Verify API key (case-insensitive)
    const providedApiKey = req.headers.get('x-api-key') || req.headers.get('X-API-Key');
    console.log('Provided API key exists:', !!providedApiKey);
    console.log('Expected API key exists:', !!crmApiKey);
    
    if (!providedApiKey) {
      console.error('No API key provided in headers');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - No API key provided' }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }
    
    if (providedApiKey !== crmApiKey) {
      console.error('Invalid API key provided');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid API key' }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : undefined;
    const redirectTo = typeof body.redirectTo === "string" ? body.redirectTo.trim() : undefined;

    // Validate email format and length
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 255 || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'A valid email address is required (max 255 characters)' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate name length if provided
    if (name && name.length > 255) {
      return new Response(
        JSON.stringify({ error: 'Name must be 255 characters or less' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate redirectTo URL if provided
    if (redirectTo) {
      try {
        const parsed = new URL(redirectTo);
        if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
      } catch {
        return new Response(
          JSON.stringify({ error: 'redirectTo must be a valid HTTPS URL' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
    }

    console.log(`Processing CRM invite for email: ${email}, name: ${name}`);

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Pre-approve the email
    console.log(`Pre-approving email: ${email}`);
    const { error: preApprovalError } = await supabaseAdmin
      .from('pre_approved_emails')
      .insert({
        email: email.toLowerCase().trim(),
        notes: 'Added via CRM automation',
        added_by: null // System-generated, no specific user
      });

    if (preApprovalError && preApprovalError.code !== '23505') { // 23505 is unique violation (email already exists)
      console.error('Error pre-approving email:', preApprovalError);
      return new Response(
        JSON.stringify({ error: 'Failed to pre-approve email', details: preApprovalError.message }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Determine redirect URL
    const finalRedirectTo = redirectTo || `${supabaseUrl.replace('/supabase.co', '.co')}/#/setup-account`;

    // Send the admin invite
    console.log(`Sending admin invite to: ${email} with redirect: ${finalRedirectTo}`);
    const inviteOptions: any = {
      email: email.toLowerCase().trim(),
      options: {
        emailRedirectTo: finalRedirectTo
      }
    };

    // Add user metadata if name is provided
    if (name?.trim()) {
      inviteOptions.options.data = {
        full_name: name.trim()
      };
    }

    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      inviteOptions.email,
      inviteOptions.options
    );

    if (inviteError) {
      console.error('Error sending invite:', inviteError);
      return new Response(
        JSON.stringify({ error: 'Failed to send invite', details: inviteError.message }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    console.log('Invite sent successfully:', inviteData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User invited successfully',
        email: email,
        user_id: inviteData.user?.id 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in CRM automation function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);