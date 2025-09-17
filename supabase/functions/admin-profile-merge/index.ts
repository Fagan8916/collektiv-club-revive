import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  { auth: { persistSession: false } }
)

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  { auth: { persistSession: false } }
)

interface MergeProfileRequest {
  sourceProfileId: string;
  targetProfileId: string;
  newUserId: string;
  profileData: {
    bio?: string;
    location?: string;
    contact_email?: string;
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('=== Admin Profile Merge Function ===');
    
    // Get the Authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ success: false, error: 'Missing or invalid authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const token = authHeader.split(' ')[1]
    
    // Verify the user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      console.error('Authentication failed:', authError);
      return new Response(
        JSON.stringify({ success: false, error: 'Authentication failed' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Authenticated user:', user.id);

    // Check if user is admin
    const { data: adminCheck, error: adminError } = await supabaseAdmin
      .from('user_roles')
      .select('role, status')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .eq('status', 'approved')
      .single()

    if (adminError || !adminCheck) {
      console.error('Admin check failed:', adminError);
      return new Response(
        JSON.stringify({ success: false, error: 'Admin access required' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Admin access confirmed');

    // Parse request body
    const { sourceProfileId, targetProfileId, newUserId, profileData }: MergeProfileRequest = await req.json()

    console.log('Merge request:', {
      sourceProfileId,
      targetProfileId, 
      newUserId,
      profileData
    });

    // Update the source profile with the new data and assign to new user
    const { error: updateError } = await supabaseAdmin
      .from('member_profiles')
      .update({
        user_id: newUserId,
        bio: profileData.bio,
        location: profileData.location,
        contact_email: profileData.contact_email,
        updated_at: new Date().toISOString()
      })
      .eq('id', sourceProfileId)

    if (updateError) {
      console.error('Failed to update source profile:', updateError);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to update profile: ${updateError.message}` }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Source profile updated successfully');

    // Delete the target profile (duplicate)
    const { error: deleteError } = await supabaseAdmin
      .from('member_profiles')
      .delete()
      .eq('id', targetProfileId)

    if (deleteError) {
      console.error('Failed to delete target profile:', deleteError);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to delete duplicate profile: ${deleteError.message}` }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Target profile deleted successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Profiles merged successfully',
        mergedProfileId: sourceProfileId
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error in profile merge:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})