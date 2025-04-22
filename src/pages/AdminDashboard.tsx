
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { AdminUser, AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";
import DashboardHeader from "@/components/admin/DashboardHeader";
import StatisticsCard from "@/components/admin/StatisticsCard";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import MessagesTable from "@/components/admin/MessagesTable";
import RegisterAdminDialog from "@/components/admin/RegisterAdminDialog";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [allApplications, setAllApplications] = useState<(AgroDealerApplication | SSPTrainingApplication | ExtensionApplication)[]>([]);
  const [agroDealerApps, setAgroDealerApps] = useState<AgroDealerApplication[]>([]);
  const [sspTrainingApps, setSspTrainingApps] = useState<SSPTrainingApplication[]>([]);
  const [extensionApps, setExtensionApps] = useState<ExtensionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(3); // Placeholder for now

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
        const { data: users, error: usersError } = await supabase.auth.admin.listUsers({
          page: 1,
          perPage: 50,
        });

        if (usersError) {
          toast.error("Failed to fetch admin emails.");
        }

        const adminsList: AdminUser[] = roles.map((role) => {
          if (!users?.users) {
            return {
              user_id: role.user_id,
              email: null,
              invited_at: null,
            };
          }

          const supabaseUsers = users.users as any[];
          const matched = supabaseUsers.find((u) => u.id === role.user_id);
          
          return {
            user_id: role.user_id,
            email: matched?.email || null,
            invited_at: matched?.created_at || null,
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

  const inviteDefaultAdmin = async () => {
    const email = "ngondimarklewis@gmail.com";
    try {
      const existingAdminWithEmail = admins.find(admin => admin.email === email);
      
      if (existingAdminWithEmail) {
        console.log("Admin with this email already exists:", email);
        return;
      }
      
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
      
      if (error) {
        console.error("Error inviting default admin:", error);
        return;
      }
      
      if (data?.user?.id) {
        const { error: roleErr } = await supabase
          .from("user_roles")
          .insert([{ user_id: data.user.id, role: "admin" }]);
        
        if (roleErr) {
          console.error("Error assigning admin role:", roleErr);
        } else {
          console.log(`Successfully added ${email} as admin`);
          toast.success(`Successfully added ${email} as admin`);
          fetchAdmins();
        }
      }
    } catch (error) {
      console.error("Error in invite process:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchAdmins();
  }, []);
  
  // Check if ngondimarklewis@gmail.com is already an admin, if not add them
  useEffect(() => {
    if (admins.length > 0) {
      const defaultAdminExists = admins.some(admin => 
        admin.email === "ngondimarklewis@gmail.com"
      );
      
      if (!defaultAdminExists) {
        inviteDefaultAdmin();
      }
    }
  }, [admins]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleRefresh = () => {
    fetchApplications();
    fetchAdmins();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        
        <div className="container mx-auto px-4 pb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Dashboard Overview</h2>
            <div className="flex space-x-4">
              <RegisterAdminDialog onAdminRegistered={fetchAdmins} />
              <Button variant="outline" className="flex items-center gap-1" onClick={handleRefresh}>
                <RefreshCw size={18} />
                Refresh Data
              </Button>
            </div>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatisticsCard 
              title="Total Applications" 
              value={allApplications.length} 
              color="bg-emerald-600"
            />
            <StatisticsCard 
              title="Unread Messages" 
              value={unreadMessages} 
              color="bg-orange-500" 
            />
          </div>
          
          {/* Applications Table */}
          <div className="mb-8">
            <ApplicationsTable 
              applications={allApplications}
              formatDate={formatDate}
              loading={loading}
            />
          </div>
          
          {/* Messages Table */}
          <div className="mb-8">
            <MessagesTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
