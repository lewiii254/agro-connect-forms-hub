
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterAdminDialog from "@/components/admin/RegisterAdminDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

type AdminUser = {
  user_id: string;
  email: string | null;
  invited_at: string | null;
};

// Define the type for Supabase users
type SupabaseUser = {
  id: string;
  email?: string;
  created_at?: string;
  // Add other properties as needed
}

// Define types for application data
type ApplicationBase = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  location: string;
};

const AdminDashboard = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [agroDealerApps, setAgroDealerApps] = useState<ApplicationBase[]>([]);
  const [sspTrainingApps, setSspTrainingApps] = useState<ApplicationBase[]>([]);
  const [extensionApps, setExtensionApps] = useState<ApplicationBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("admins");

  // Fetch applications data
  const fetchApplications = async () => {
    setLoading(true);
    
    // Fetch agro dealer applications
    const { data: agroDealers, error: agroError } = await supabase
      .from("agro_dealer_applications")
      .select("id, created_at, full_name, email, location")
      .order("created_at", { ascending: false });
    
    if (agroError) {
      toast.error("Failed to fetch agro dealer applications");
    } else {
      setAgroDealerApps(agroDealers || []);
    }
    
    // Fetch SSP training applications
    const { data: sspApps, error: sspError } = await supabase
      .from("ssp_training_applications")
      .select("id, created_at, full_name, email, location")
      .order("created_at", { ascending: false });
    
    if (sspError) {
      toast.error("Failed to fetch SSP training applications");
    } else {
      setSspTrainingApps(sspApps || []);
    }
    
    // Fetch extension services applications
    const { data: extApps, error: extError } = await supabase
      .from("extension_applications")
      .select("id, created_at, full_name, email, location")
      .order("created_at", { ascending: false });
    
    if (extError) {
      toast.error("Failed to fetch extension services applications");
    } else {
      setExtensionApps(extApps || []);
    }
    
    setLoading(false);
  };

  // Fetch admin users with their emails
  const fetchAdmins = async () => {
    setLoading(true);
    
    try {
      // Get all users with admin role from user_roles and join with auth.users (via admin API)
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
        // Fetch emails from auth.users using admin API
        // Note: This API only works for service roles -- here, we just display the user_id
        const { data: users, error: usersError } = await supabase.auth.admin.listUsers({
          page: 1,
          perPage: 50,
        });

        if (usersError) {
          toast.error("Failed to fetch admin emails.");
        }

        const adminsList: AdminUser[] = roles.map((role) => {
          // Type guard to make TypeScript happy
          if (!users?.users) {
            return {
              user_id: role.user_id,
              email: null,
              invited_at: null,
            };
          }

          // Properly type the users array
          const supabaseUsers = users.users as SupabaseUser[];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleRefresh = () => {
    if (activeTab === "admins") {
      fetchAdmins();
    } else {
      fetchApplications();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
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
            
            <div className="rounded-xl bg-white p-4 shadow-sm overflow-x-auto max-w-full">
              <Table className="min-w-[375px] md:min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Invited At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8">
                        Loading admin users...
                      </TableCell>
                    </TableRow>
                  ) : admins.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8">
                        No admin users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    admins.map((ad) => (
                      <TableRow key={ad.user_id}>
                        <TableCell className="break-all">{ad.user_id}</TableCell>
                        <TableCell className="break-all">{ad.email}</TableCell>
                        <TableCell>
                          {ad.invited_at
                            ? formatDate(ad.invited_at)
                            : ""}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="agro">
            <div className="mb-6 flex justify-end">
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Refresh List
              </button>
            </div>
            
            <div className="rounded-xl bg-white p-4 shadow-sm overflow-x-auto max-w-full">
              <Table className="min-w-[375px] md:min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applied At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        Loading applications...
                      </TableCell>
                    </TableRow>
                  ) : agroDealerApps.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        No applications found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    agroDealerApps.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>{app.full_name}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell>{app.location}</TableCell>
                        <TableCell>{formatDate(app.created_at)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="ssp">
            <div className="mb-6 flex justify-end">
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Refresh List
              </button>
            </div>
            
            <div className="rounded-xl bg-white p-4 shadow-sm overflow-x-auto max-w-full">
              <Table className="min-w-[375px] md:min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applied At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        Loading applications...
                      </TableCell>
                    </TableRow>
                  ) : sspTrainingApps.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        No applications found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sspTrainingApps.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>{app.full_name}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell>{app.location}</TableCell>
                        <TableCell>{formatDate(app.created_at)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="extension">
            <div className="mb-6 flex justify-end">
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Refresh List
              </button>
            </div>
            
            <div className="rounded-xl bg-white p-4 shadow-sm overflow-x-auto max-w-full">
              <Table className="min-w-[375px] md:min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applied At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        Loading applications...
                      </TableCell>
                    </TableRow>
                  ) : extensionApps.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        No applications found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    extensionApps.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>{app.full_name}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell>{app.location}</TableCell>
                        <TableCell>{formatDate(app.created_at)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
