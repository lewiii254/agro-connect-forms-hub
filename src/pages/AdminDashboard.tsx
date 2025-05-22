
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "@/components/ui/sonner";
import DashboardHeader from "@/components/admin/DashboardHeader";
import StatisticsCard from "@/components/admin/StatisticsCard";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import { RefreshCw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuthentication } from "@/hooks/useAdminAuthentication";
import { useAdminApplications } from "@/hooks/useAdminApplications";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
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
        <DashboardHeader activeTab="applications" />
        
        <div className="container mx-auto px-4 pb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-800">Applications Management</h2>
              <p className="text-gray-600 mt-1">Review and process user applications</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center gap-1" onClick={handleRefresh}>
                <RefreshCw size={18} />
                Refresh Data
              </Button>
            </div>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatisticsCard 
              title="Total Applications" 
              value={allApplications.length} 
              color="bg-emerald-600"
              icon={<FileText size={24} />}
            />
            <StatisticsCard 
              title="Pending Review" 
              value={allApplications.filter(app => !app.status || app.status === 'pending').length} 
              color="bg-amber-500"
              icon={<FileText size={24} />}
            />
            <StatisticsCard 
              title="Processed" 
              value={allApplications.filter(app => app.status === 'approved' || app.status === 'rejected').length} 
              color="bg-blue-500" 
              icon={<FileText size={24} />}
            />
          </div>
          
          {/* Applications Table */}
          <div className="mb-8 bg-white rounded-lg shadow-sm">
            <ApplicationsTable 
              applications={allApplications}
              formatDate={formatDate}
              loading={loading}
              onUpdate={fetchApplications}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
