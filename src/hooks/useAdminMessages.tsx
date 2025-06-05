
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

  // Fetch all admin users with their real email addresses
  const fetchAdmins = async () => {
    try {
      // First get admin user IDs
      const { data: adminRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      if (rolesError) throw rolesError;

      if (!adminRoles || adminRoles.length === 0) {
        setAdmins([]);
        return;
      }

      // Get current user's email to exclude them and get other admin emails
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      // Try to get admin users with their emails using the admin API
      try {
        const { data: adminUsersResponse, error: usersError } = await supabase.auth.admin.listUsers();
        
        if (!usersError && adminUsersResponse?.users) {
          // Filter to only include admin users and exclude current user
          const adminUserIds = adminRoles.map(role => role.user_id);
          const adminUsers = adminUsersResponse.users;
          
          const filteredAdmins: AdminUser[] = adminUsers
            .filter((user: any) => 
              adminUserIds.includes(user.id) && 
              user.id !== currentUserId &&
              user.email
            )
            .map((user: any) => ({
              id: user.id,
              email: user.email
            }));

          setAdmins(filteredAdmins);
          return;
        }
      } catch (adminError) {
        console.log('Admin API not available, trying alternative approach');
      }

      // Fallback: Try to get user profiles or use a different approach
      // Since we can't access auth.users directly, we'll need to store emails in a profiles table
      // For now, show the user IDs with a note that we need proper setup
      const adminUsersList: AdminUser[] = adminRoles
        .filter(role => role.user_id !== currentUserId)
        .map(role => ({
          id: role.user_id,
          email: `User ${role.user_id.slice(0, 8)}` // Temporary fallback
        }));
      
      setAdmins(adminUsersList);
      
      // Let user know they need proper setup
      if (adminUsersList.length > 0) {
        toast.error('Cannot fetch admin emails. Contact system administrator to set up proper permissions.');
      }
      
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
