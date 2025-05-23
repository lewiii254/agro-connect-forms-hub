
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { corsHeaders } from '../_shared/cors.ts'

// Create a Supabase client configured for the Edge function
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  { auth: { persistSession: false } }
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

    // Use the service_role client to directly delete from the appropriate table
    let error = null;
    
    if (table_name === 'agro_dealer_applications') {
      const { error: deleteError } = await supabase
        .from('agro_dealer_applications')
        .delete()
        .eq('id', app_id);
      error = deleteError;
    } 
    else if (table_name === 'ssp_training_applications') {
      const { error: deleteError } = await supabase
        .from('ssp_training_applications')
        .delete()
        .eq('id', app_id);
      error = deleteError;
    } 
    else if (table_name === 'extension_applications') {
      const { error: deleteError } = await supabase
        .from('extension_applications')
        .delete()
        .eq('id', app_id);
      error = deleteError;
    } 
    else {
      return new Response(
        JSON.stringify({ error: 'Invalid table name provided' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    if (error) {
      console.error(`Error deleting from ${table_name}:`, error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    return new Response(
      JSON.stringify({ success: true }),
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
