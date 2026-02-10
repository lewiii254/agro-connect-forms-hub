
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

  useEffect(() => {
    console.log('AdminContentPage mounted, content:', content);
  }, [content]);

  const handleFilterChange = (contentType?: ContentType) => {
    console.log('Filter changed to:', contentType);
    fetchContent(contentType);
  };

  if (isCheckingAuth) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <DashboardHeader activeTab="content" />
      
      <div className="container mx-auto p-4 md:p-6">
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
