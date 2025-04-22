import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterAdminDialog from "@/components/admin/RegisterAdminDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import AdminUsersTable from "@/components/admin/AdminUsersTable";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import { AdminUser, AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";

const AdminDashboard = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [agroDealerApps, setAgroDealerApps] = useState<AgroDealerApplication[]>([]);
  const [sspTrainingApps, setSspTrainingApps] = useState<SSPTrainingApplication[]>([]);
  const [extensionApps, setExtensionApps] = useState<ExtensionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("admins");

  const fetchApplications = async () => {
    setLoading(true);
    
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
    
    setLoading(false);
  };

  const fetchAdmins = async () => {
    setLoading(true);
    
    try {
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .eq("role", "admin");

      if (rolesError) {
        toast.error("Failed to fetch admins.");
        setLoading(false);
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
    
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === "admins") {
      fetchAdmins();
    } else {
      fetchApplications();
    }
  }, [activeTab]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleRefresh = () => {
    if (activeTab === "admins") {
      fetchAdmins();
    } else {
      fetchApplications();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-agro-blue mb-2">Admin Dashboard</h1>
        <p className="mb-6 text-base md:text-lg text-gray-700">
          Welcome. Manage admin users and view applications.
        </p>
        
        <Tabs 
          defaultValue="admins" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full mb-6"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="admins">Admin Users</TabsTrigger>
            <TabsTrigger value="agro">Agro-Dealer Applications</TabsTrigger>
            <TabsTrigger value="ssp">SSP Training Applications</TabsTrigger>
            <TabsTrigger value="extension">Extension Services Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="admins">
            <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <RegisterAdminDialog onAdminRegistered={fetchAdmins} />
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Refresh List
              </button>
            </div>
            <AdminUsersTable 
              loading={loading} 
              admins={admins} 
              formatDate={formatDate}
            />
          </TabsContent>
          
          <TabsContent value="agro">
            <div className="mb-6 flex justify-end">
              <button onClick={handleRefresh} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                Refresh List
              </button>
            </div>
            <ApplicationsTable 
              loading={loading}
              applications={agroDealerApps}
              type="agro"
              formatDate={formatDate}
            />
          </TabsContent>
          
          <TabsContent value="ssp">
            <div className="mb-6 flex justify-end">
              <button onClick={handleRefresh} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                Refresh List
              </button>
            </div>
            <ApplicationsTable 
              loading={loading}
              applications={sspTrainingApps}
              type="ssp"
              formatDate={formatDate}
            />
          </TabsContent>
          
          <TabsContent value="extension">
            <div className="mb-6 flex justify-end">
              <button onClick={handleRefresh} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                Refresh List
              </button>
            </div>
            <ApplicationsTable 
              loading={loading}
              applications={extensionApps}
              type="extension"
              formatDate={formatDate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
