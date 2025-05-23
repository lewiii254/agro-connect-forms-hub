
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  applicantName: string;
  applicationType: string;
  applicationId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { applicantName, applicationType, applicationId }: NotificationRequest = await req.json();

    // Get all admin users from user_roles table
    const { data: adminRoles, error: adminError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (adminError) {
      throw new Error(`Failed to fetch admins: ${adminError.message}`);
    }

    // We need to use the service role here to send emails, since we don't have user's email in user_roles
    // This is a simplified version - in production, you might want to use a proper email service
    for (const admin of adminRoles) {
      // Get user email from auth.users
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(
        admin.user_id
      );

      if (userError || !userData.user) {
        console.error(`Failed to get user data for ${admin.user_id}: ${userError?.message}`);
        continue;
      }

      const adminEmail = userData.user.email;
      if (!adminEmail) continue;

      // Log notification details (in production, replace this with actual email sending)
      console.log(`Would send email to admin ${adminEmail} about new application:`);
      console.log(`- Applicant: ${applicantName}`);
      console.log(`- Application Type: ${applicationType}`);
      console.log(`- Application ID: ${applicationId}`);
      
      // Here we're just simulating the email sending
      // In a real implementation, you would integrate with an email service like SendGrid or Resend
      console.log(`Email notification would be sent to ${adminEmail}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-admin-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
