
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.8.0"

serve(async (req) => {
  try {
    const { email } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        }
      }
    )

    // Send invitation email
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email)
    
    if (error) {
      console.error("Invite error:", error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    // If user was created, assign the admin role
    if (data?.user?.id) {
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert([{ user_id: data.user.id, role: 'admin' }])
      
      if (roleError) {
        console.error("Role assignment error:", roleError)
        return new Response(
          JSON.stringify({ error: roleError.message, user: data.user }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        )
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Invitation sent and admin role assigned" 
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})
