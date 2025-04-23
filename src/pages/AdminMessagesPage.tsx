
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import MessagesTable from "@/components/admin/MessagesTable";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminMessagesPage = () => {
  const navigate = useNavigate();
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

  // Show loading until auth check is complete
  if (isCheckingAuth) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Loading messages...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        
        <div className="container mx-auto px-4 pb-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Message Management</h2>
            <p className="text-gray-600">View and respond to user inquiries and messages</p>
          </div>
          
          <div className="mb-8">
            <MessagesTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminMessagesPage;
