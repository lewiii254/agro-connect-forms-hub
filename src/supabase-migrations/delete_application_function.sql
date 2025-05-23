
-- This file is for reference only and needs to be executed in Supabase SQL editor
-- Create a function to handle application deletion properly

CREATE OR REPLACE FUNCTION public.delete_application(app_id UUID, table_name TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF table_name = 'agro_dealer_applications' THEN
    DELETE FROM public.agro_dealer_applications WHERE id = app_id;
  ELSIF table_name = 'ssp_training_applications' THEN
    DELETE FROM public.ssp_training_applications WHERE id = app_id;
  ELSIF table_name = 'extension_applications' THEN
    DELETE FROM public.extension_applications WHERE id = app_id;
  ELSE
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.delete_application TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_application TO anon;
GRANT EXECUTE ON FUNCTION public.delete_application TO service_role;
