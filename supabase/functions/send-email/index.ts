import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MagicLinkRequest {
  email: string;
  name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name }: MagicLinkRequest = await req.json();

    // Generate magic link using Supabase Auth
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    // Create magic link
    const magicLinkResponse = await fetch(`${supabaseUrl}/auth/v1/magiclink`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        email: email,
        options: {
          emailRedirectTo: 'https://collektiv.club/#/members'
        }
      })
    });

    if (!magicLinkResponse.ok) {
      const error = await magicLinkResponse.text();
      console.error("Magic link generation failed:", error);
      throw new Error("Failed to generate magic link");
    }

    const emailResponse = await resend.emails.send({
      from: "COLLEKTIV.CLUB <noreply@collektiv.club>",
      to: [email],
      subject: "Your magic link to COLLEKTIV.CLUB",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #205a3d; margin-bottom: 20px;">Welcome to COLLEKTIV.CLUB</h2>
          <p style="margin-bottom: 20px;">Hi ${name || 'there'},</p>
          <p style="margin-bottom: 30px;">
            You've been invited to join COLLEKTIV.CLUB. A magic link has been sent to your email address.
            Please check your email and click the magic link to complete your registration.
          </p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            If you did not request this invitation, you can safely ignore this email.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">
            COLLEKTIV.CLUB - Investment Community
          </p>
        </div>
      `,
    });

    console.log("Magic link email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
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