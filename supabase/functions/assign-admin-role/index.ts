
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create Supabase client with service role (admin privileges)
const getServiceSupabase = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  
  return createClient(supabaseUrl, supabaseServiceKey);
};

// Handle request
Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get request body
    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get service role client
    const supabase = getServiceSupabase();

    // Insert admin role for user
    const { data, error } = await supabase.from("user_roles").insert({
      user_id: userId,
      role: "admin",
    });

    if (error) {
      console.error("Error assigning admin role:", error);
      
      // Check if error is due to unique constraint violation (admin role already assigned)
      if (error.code === "23505") {
        return new Response(JSON.stringify({ message: "User already has admin role" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return success response
    return new Response(JSON.stringify({ message: "Admin role assigned successfully" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
