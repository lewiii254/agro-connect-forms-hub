import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminApplications } from "@/hooks/useAdminApplications";
import { formatDate } from "@/utils/formatDate";
import Layout from "@/components/layout/Layout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import ApplicationsChart from "@/components/admin/ApplicationsChart";
import ApplicationsStatusChart from "@/components/admin/ApplicationsStatusChart";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const { 
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
  } = useAdminApplications(isAuthenticated, isCheckingAuth);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isCheckingAuth, navigate]);

  const handleApprove = async (appId: string) => {
    const app = allApplications.find(app => app.id === appId);
    if (!app) {
      console.error("Application not found");
      return false;
    }

    let tableName: string;
    if ("product_types" in app) {
      tableName = "agro_dealer_applications";
    } else if ("techniques" in app) {
      tableName = "ssp_training_applications";
    } else if ("farming_types" in app) {
      tableName = "extension_applications";
    } else {
      console.error("Unknown application type");
      return false;
    }

    return await updateApplicationStatus(appId, tableName, "approved");
  };

  const handleReject = async (appId: string) => {
    const app = allApplications.find(app => app.id === appId);
    if (!app) {
      console.error("Application not found");
      return false;
    }

    let tableName: string;
    if ("product_types" in app) {
      tableName = "agro_dealer_applications";
    } else if ("techniques" in app) {
      tableName = "ssp_training_applications";
    } else if ("farming_types" in app) {
      tableName = "extension_applications";
    } else {
      console.error("Unknown application type");
      return false;
    }

    return await updateApplicationStatus(appId, tableName, "rejected");
  };

  const handleDelete = async (appId: string) => {
    const app = allApplications.find(app => app.id === appId);
    if (!app) {
      console.error("Application not found");
      return false;
    }

    let tableName: string;
    if ("product_types" in app) {
      tableName = "agro_dealer_applications";
    } else if ("techniques" in app) {
      tableName = "ssp_training_applications";
    } else if ("farming_types" in app) {
      tableName = "extension_applications";
    } else {
      console.error("Unknown application type");
      return false;
    }

    return await deleteApplication(appId, tableName);
  };

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const agroDealerCount = agroDealerApps.length;
  const sspTrainingCount = sspTrainingApps.length;
  const extensionCount = extensionApps.length;

  const pendingApplicationsCount = allApplications.filter(
    app => !app.status || app.status === 'pending'
  ).length;

  return (
    <Layout>
      <DashboardHeader activeTab="applications" unreadCount={pendingApplicationsCount} />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white shadow rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2 text-emerald-700">Application Types</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <ApplicationsChart
                agroDealerCount={agroDealerCount}
                sspTrainingCount={sspTrainingCount}
                extensionCount={extensionCount}
              />
            </div>
          </div>

          <div className="bg-white shadow rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2 text-emerald-700">Application Status</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <ApplicationsStatusChart applications={allApplications} />
            </div>
          </div>
        </div>

        <ApplicationsTable 
          applications={allApplications} 
          formatDate={formatDate}
          loading={loading}
          onUpdate={fetchApplications}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
