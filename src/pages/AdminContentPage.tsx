
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuthentication } from "@/hooks/useAdminAuthentication";
import { useContentManagement } from "@/hooks/useContentManagement";
import Layout from "@/components/layout/Layout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import ContentTable from "@/components/admin/ContentTable";
import type { ContentType } from "@/types/content";

const AdminContentPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isCheckingAuth } = useAdminAuthentication(navigate);
  const {
    content,
    loading,
    fetchContent,
    createContent,
    updateContent,
    deleteContent
  } = useContentManagement();

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isCheckingAuth, navigate]);

  const handleFilterChange = (contentType?: ContentType) => {
    fetchContent(contentType);
  };

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <DashboardHeader activeTab="content" />
      
      <div className="container mx-auto p-6">
        <ContentTable
          content={content}
          loading={loading}
          onCreateContent={createContent}
          onUpdateContent={updateContent}
          onDeleteContent={deleteContent}
          onFilterChange={handleFilterChange}
        />
      </div>
    </Layout>
  );
};

export default AdminContentPage;
