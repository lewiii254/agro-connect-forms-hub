
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import MessagesTable from "@/components/admin/MessagesTable";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RefreshCw, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatisticsCard from "@/components/admin/StatisticsCard";
import { useAdminAuthentication } from "@/hooks/useAdminAuthentication";

const AdminMessagesPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { isAuthenticated, isCheckingAuth } = useAdminAuthentication(navigate);

  const fetchMessages = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const handleRefresh = () => {
    fetchMessages();
    toast.success("Messages refreshed");
  };

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

  const unreadMessages = messages.filter(msg => msg.status === 'unread').length;
  const readMessages = messages.length - unreadMessages;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader activeTab="messages" />
        
        <div className="container mx-auto px-4 pb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-800">Message Management</h2>
              <p className="text-gray-600 mt-1">View and respond to user inquiries</p>
            </div>
            <Button variant="outline" className="flex items-center gap-1" onClick={handleRefresh}>
              <RefreshCw size={18} />
              Refresh Messages
            </Button>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatisticsCard 
              title="Total Messages" 
              value={messages.length} 
              color="bg-blue-600"
              icon={<MessageSquare size={24} />}
            />
            <StatisticsCard 
              title="Unread Messages" 
              value={unreadMessages} 
              color="bg-orange-500" 
              icon={<MessageSquare size={24} />}
            />
            <StatisticsCard 
              title="Read Messages" 
              value={readMessages} 
              color="bg-emerald-500" 
              icon={<MessageSquare size={24} />}
            />
          </div>
          
          <div className="mb-8 bg-white rounded-lg shadow-sm">
            <MessagesTable 
              messages={messages} 
              onUpdate={fetchMessages} 
              loading={loading} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminMessagesPage;
