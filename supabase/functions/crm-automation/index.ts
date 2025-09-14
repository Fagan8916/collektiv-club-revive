import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
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

    // Verify API key
    const providedApiKey = req.headers.get('x-api-key');
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

    // Parse request body
    const { email, name, redirectTo }: CRMInviteRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
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