
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "@/components/ui/sonner";
import DashboardHeader from "@/components/admin/DashboardHeader";
import StatisticsCard from "@/components/admin/StatisticsCard";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import MessagesTable from "@/components/admin/MessagesTable";
import RegisterAdminDialog from "@/components/admin/RegisterAdminDialog";
import { RefreshCw, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuthentication } from "@/hooks/useAdminAuthentication";
import { useAdminApplications } from "@/hooks/useAdminApplications";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [unreadMessages, setUnreadMessages] = useState(3); // Placeholder for now
  
  const { isAuthenticated, isCheckingAuth } = useAdminAuthentication(navigate);
  const { 
    allApplications, 
    loading, 
    fetchApplications, 
    fetchAdmins 
  } = useAdminApplications(isAuthenticated, isCheckingAuth);

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
