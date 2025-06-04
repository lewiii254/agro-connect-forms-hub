
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AdminUser {
  id: string;
  email: string;
}

export interface AdminMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  message: string;
  created_at: string;
  read_at: string | null;
  sender_email?: string;
  recipient_email?: string;
}

export const useAdminMessages = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  // Fetch all admin users
  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      if (error) throw error;

      // Get user emails from auth.users through a function or direct query
      const userIds = data.map(row => row.user_id);
      
      // For now, we'll create a simple list with user IDs
      // In a production app, you'd want to store email/name in a profiles table
      const adminUsers: AdminUser[] = userIds.map(id => ({
        id,
        email: `admin-${id.slice(0, 8)}@example.com` // Placeholder email
      }));

      setAdmins(adminUsers.filter(admin => admin.id !== currentUserId));
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Failed to fetch admin users');
    }
  };

  // Fetch messages for current user
  const fetchMessages = async (recipientId?: string) => {
    if (!currentUserId) return;

    try {
      let query = supabase
        .from('admin_messages')
        .select('*')
        .or(`sender_id.eq.${currentUserId},recipient_id.eq.${currentUserId}`)
        .order('created_at', { ascending: true });

      if (recipientId) {
        query = query.or(`and(sender_id.eq.${currentUserId},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${currentUserId})`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages');
    }
  };

  // Send a message
  const sendMessage = async (recipientId: string, message: string): Promise<boolean> => {
    if (!currentUserId || !message.trim()) return false;

    try {
      const { error } = await supabase
        .from('admin_messages')
        .insert({
          sender_id: currentUserId,
          recipient_id: recipientId,
          message: message.trim()
        });

      if (error) throw error;

      toast.success('Message sent successfully');
      await fetchMessages(recipientId);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      return false;
    }
  };

  // Mark message as read
  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('admin_messages')
        .update({ read_at: new Date().toISOString() })
        .eq('id', messageId)
        .eq('recipient_id', currentUserId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchAdmins();
      fetchMessages();
      setLoading(false);
    }
  }, [currentUserId]);

  return {
    admins,
    messages,
    loading,
    currentUserId,
    fetchMessages,
    sendMessage,
    markAsRead,
    refreshAdmins: fetchAdmins
  };
};
