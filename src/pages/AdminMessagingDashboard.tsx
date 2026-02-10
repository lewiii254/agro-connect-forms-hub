
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import AdminMessaging from "@/components/admin/AdminMessaging";
import { useAdminAuthentication } from "@/hooks/useAdminAuthentication";

const AdminMessagingDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isCheckingAuth } = useAdminAuthentication(navigate);

  // Show loading until auth check is complete
  if (isCheckingAuth) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader activeTab="messaging" />
        
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-emerald-800">Admin Messaging</h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">Communicate with other administrators</p>
          </div>
          
          <AdminMessaging />
        </div>
      </div>
    </Layout>
  );
};

export default AdminMessagingDashboard;
