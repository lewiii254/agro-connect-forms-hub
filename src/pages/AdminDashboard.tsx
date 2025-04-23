import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { AdminUser, AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";
import DashboardHeader from "@/components/admin/DashboardHeader";
import StatisticsCard from "@/components/admin/StatisticsCard";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import MessagesTable from "@/components/admin/MessagesTable";
import RegisterAdminDialog from "@/components/admin/RegisterAdminDialog";
import { RefreshCw, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [allApplications, setAllApplications] = useState<(AgroDealerApplication | SSPTrainingApplication | ExtensionApplication)[]>([]);
  const [agroDealerApps, setAgroDealerApps] = useState<AgroDealerApplication[]>([]);
  const [sspTrainingApps, setSspTrainingApps] = useState<SSPTrainingApplication[]>([]);
  const [extensionApps, setExtensionApps] = useState<ExtensionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(3); // Placeholder for now
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is authenticated and has admin role
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No session found, redirecting to login");
          navigate("/admin/login");
          return;
        }
        
        // Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
          
        if (roleError || !roleData || roleData.role !== 'admin') {
          console.log("User is not an admin, redirecting to login");
          await supabase.auth.signOut();
          toast.error("You don't have admin privileges");
          navigate("/admin/login");
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/admin/login");
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate("/admin/login");
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleRefresh = () => {
    fetchApplications();
    fetchAdmins();
    toast.success("Data refreshed");
  };

  // Show loading until auth check is complete
  if (isCheckingAuth) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Loading admin dashboard...</p>
        </div>
      </Layout>
    );
  }

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
              icon={<FileText size={24} />}
            />
            <StatisticsCard 
              title="Unread Messages" 
              value={unreadMessages} 
              color="bg-orange-500" 
              icon={<MessageSquare size={24} />}
            />
          </div>
          
          {/* Applications Table */}
          <div className="mb-8">
            <ApplicationsTable 
              applications={allApplications}
              formatDate={formatDate}
              loading={loading}
              onUpdate={fetchApplications}
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
