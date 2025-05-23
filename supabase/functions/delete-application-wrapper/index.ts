
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { corsHeaders } from '../_shared/cors.ts'

// Create a custom fetch function that includes Supabase authorization
const customFetch = (url: string, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') 
        ? `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}` 
        : '',
    },
  })
}

// Create a Supabase client configured for the Edge function
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  { 
    global: { fetch: customFetch },
    auth: { persistSession: false }
  }
)

Deno.serve(async (req) => {
  // Handle CORS for browser requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request body
    const { app_id, table_name } = await req.json()
    
    if (!app_id || !table_name) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required parameters: app_id and table_name are required' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    console.log(`Attempting to delete application ${app_id} from ${table_name}`)

    // Call the database RPC function
    const { data, error } = await supabase.rpc('delete_application', {
      app_id,
      table_name
    })

    if (error) {
      console.error('Error calling delete_application RPC:', error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
