import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import type { AdminUser, AgroDealerApplication, SSPTrainingApplication, ExtensionApplication, ApplicationTableName } from "@/types/admin";

export const useAdminApplications = (isAuthenticated: boolean, isCheckingAuth: boolean) => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [allApplications, setAllApplications] = useState<(AgroDealerApplication | SSPTrainingApplication | ExtensionApplication)[]>([]);
  const [agroDealerApps, setAgroDealerApps] = useState<AgroDealerApplication[]>([]);
  const [sspTrainingApps, setSspTrainingApps] = useState<SSPTrainingApplication[]>([]);
  const [extensionApps, setExtensionApps] = useState<ExtensionApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    console.log("Fetching applications...");
    setLoading(true);
    
    try {
      // Fetch agro dealer applications
      const { data: agroDealers, error: agroError } = await supabase
        .from("agro_dealer_applications")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (agroError) {
        console.error("Error fetching agro dealers:", agroError);
        toast.error("Failed to fetch agro dealer applications");
      } else {
        console.log(`Fetched ${agroDealers?.length || 0} agro dealer applications`);
        setAgroDealerApps(agroDealers || []);
      }
      
      // Fetch SSP training applications
      const { data: sspApps, error: sspError } = await supabase
        .from("ssp_training_applications")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (sspError) {
        console.error("Error fetching SSP applications:", sspError);
        toast.error("Failed to fetch SSP training applications");
      } else {
        console.log(`Fetched ${sspApps?.length || 0} SSP training applications`);
        setSspTrainingApps(sspApps || []);
      }
      
      // Fetch extension applications
      const { data: extApps, error: extError } = await supabase
        .from("extension_applications")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (extError) {
        console.error("Error fetching extension applications:", extError);
        toast.error("Failed to fetch extension services applications");
      } else {
        console.log(`Fetched ${extApps?.length || 0} extension applications`);
        setExtensionApps(extApps || []);
      }

      // Combine all applications for the main table
      const combined = [
        ...(agroDealers || []),
        ...(sspApps || []),
        ...(extApps || [])
      ].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      console.log(`Total combined applications: ${combined.length}`);
      setAllApplications(combined);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("An error occurred while fetching applications");
    }
    
    setLoading(false);
  };

  // Function to update application status
  const updateApplicationStatus = async (appId: string, tableName: ApplicationTableName, status: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ status })
        .eq("id", appId);

      if (error) {
        console.error(`Error updating ${tableName}:`, error);
        toast.error(`Failed to update application status: ${error.message}`);
        return false;
      }
      
      console.log(`Successfully updated application ${appId} in ${tableName} to ${status}`);
      
      // Update local state immediately based on table type
      if (tableName === 'agro_dealer_applications') {
        setAgroDealerApps(prev => 
          prev.map(app => app.id === appId ? {...app, status} : app)
        );
      } else if (tableName === 'ssp_training_applications') {
        setSspTrainingApps(prev => 
          prev.map(app => app.id === appId ? {...app, status} : app)
        );
      } else if (tableName === 'extension_applications') {
        setExtensionApps(prev => 
          prev.map(app => app.id === appId ? {...app, status} : app)
        );
      }
      
      // Update the combined applications list as well
      setAllApplications(prev => 
        prev.map(app => app.id === appId ? {...app, status} : app)
      );
      
      return true;
    } catch (error) {
      console.error(`Error in updateApplicationStatus:`, error);
      toast.error("An unexpected error occurred while updating the application");
      return false;
    }
  };

  // Function to delete application - completely revised for reliability
  const deleteApplication = async (appId: string, tableName: ApplicationTableName) => {
    try {
      console.log(`Attempting to delete application ${appId} from ${tableName}`);
      
      // Use RPC (stored procedure) approach for more reliable deletion
      // This executes a direct SQL delete command on the server
      const { data, error } = await supabase.rpc('delete_application', { 
        app_id: appId, 
        table_name: tableName 
      });
      
      if (error) {
        console.error(`Error in delete_application RPC:`, error);
        toast.error(`Failed to delete application: ${error.message}`);
        return false;
      }
      
      console.log(`Successfully deleted application ${appId} from ${tableName}`);
      
      // Update local state immediately to reflect the deletion
      if (tableName === 'agro_dealer_applications') {
        setAgroDealerApps(prev => prev.filter(app => app.id !== appId));
      } else if (tableName === 'ssp_training_applications') {
        setSspTrainingApps(prev => prev.filter(app => app.id !== appId));
      } else if (tableName === 'extension_applications') {
        setExtensionApps(prev => prev.filter(app => app.id !== appId));
      }
      
      // Update the combined applications list as well
      setAllApplications(prev => prev.filter(app => app.id !== appId));
      
      return true;
    } catch (error) {
      console.error(`Error in deleteApplication:`, error);
      toast.error("An unexpected error occurred while deleting the application");
      return false;
    }
  };

  const fetchAdmins = async () => {
    try {
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .eq("role", "admin");

      if (rolesError) {
        console.error("Error fetching admin roles:", rolesError);
        toast.error("Failed to fetch admins.");
        return;
      }

      if (roles && roles.length > 0) {
        // Just use the roles data since we can't access the auth.users table directly
        const adminsList: AdminUser[] = roles.map((role) => {
          return {
            user_id: role.user_id,
            email: null, // We can't fetch this without admin API access
            invited_at: null,
          };
        });

        setAdmins(adminsList);
      } else {
        setAdmins([]);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("An error occurred while fetching admins");
    }
  };

  // Only fetch data if authenticated
  useEffect(() => {
    if (isAuthenticated && !isCheckingAuth) {
      fetchApplications();
      fetchAdmins();
    }
  }, [isAuthenticated, isCheckingAuth]);

  return {
    admins,
    allApplications,
    agroDealerApps,
    sspTrainingApps,
    extensionApps,
    loading,
    fetchApplications,
    fetchAdmins,
    updateApplicationStatus,
    deleteApplication
  };
};
