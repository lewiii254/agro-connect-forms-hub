
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import type { AdminUser, AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";

export const useAdminApplications = (isAuthenticated: boolean, isCheckingAuth: boolean) => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [allApplications, setAllApplications] = useState<(AgroDealerApplication | SSPTrainingApplication | ExtensionApplication)[]>([]);
  const [agroDealerApps, setAgroDealerApps] = useState<AgroDealerApplication[]>([]);
  const [sspTrainingApps, setSspTrainingApps] = useState<SSPTrainingApplication[]>([]);
  const [extensionApps, setExtensionApps] = useState<ExtensionApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    
    try {
      const { data: agroDealers, error: agroError } = await supabase
        .from("agro_dealer_applications")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (agroError) {
        toast.error("Failed to fetch agro dealer applications");
      } else {
        setAgroDealerApps(agroDealers || []);
      }
      
      const { data: sspApps, error: sspError } = await supabase
        .from("ssp_training_applications")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (sspError) {
        toast.error("Failed to fetch SSP training applications");
      } else {
        setSspTrainingApps(sspApps || []);
      }
      
      const { data: extApps, error: extError } = await supabase
        .from("extension_applications")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (extError) {
        toast.error("Failed to fetch extension services applications");
      } else {
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
      
      setAllApplications(combined);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("An error occurred while fetching applications");
    }
    
    setLoading(false);
  };

  const fetchAdmins = async () => {
    try {
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .eq("role", "admin");

      if (rolesError) {
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
    fetchAdmins
  };
};
