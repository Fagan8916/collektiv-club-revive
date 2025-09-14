import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create admin client with service role key for bypassing RLS
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Create regular client for user authentication
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

interface UpdateProfileRequest {
  profileId: string;
  updates: Record<string, any>;
}

interface ToggleVisibilityRequest {
  profileId: string;
  isVisible: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== Admin Profile Operations Edge Function ===');
    
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the user is authenticated and get their info
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      console.error('Authentication failed:', authError);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Authenticated user:', user.id);

    // Check if user is admin using service role client
    const { data: userRoles, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role, status')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .eq('status', 'approved');

    if (roleError || !userRoles?.length) {
      console.error('Admin check failed:', roleError, 'Roles found:', userRoles?.length);
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin access confirmed for user:', user.id);

    const requestBody = await req.json();
    const { operation } = requestBody;

    if (operation === 'updateProfile') {
      const { profileId, updates }: UpdateProfileRequest = requestBody;
      
      console.log('Updating profile:', profileId, 'with updates:', updates);
      
      // Use admin client to update profile (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('member_profiles')
        .update(updates)
        .eq('id', profileId)
        .select();

      if (error) {
        console.error('Profile update failed:', error);
        return new Response(
          JSON.stringify({ error: `Failed to update profile: ${error.message}` }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Profile updated successfully:', data);
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (operation === 'toggleVisibility') {
      const { profileId, isVisible }: ToggleVisibilityRequest = requestBody;
      
      console.log('Toggling visibility for profile:', profileId, 'to:', isVisible);
      
      // Use admin client to update visibility (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('member_profiles')
        .update({ is_visible: isVisible })
        .eq('id', profileId)
        .select();

      if (error) {
        console.error('Visibility toggle failed:', error);
        return new Response(
          JSON.stringify({ error: `Failed to update visibility: ${error.message}` }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Visibility updated successfully:', data);
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid operation' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: `Server error: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});