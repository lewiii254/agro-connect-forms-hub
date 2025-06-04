
import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageCircle, Users } from "lucide-react";
import { useAdminMessages, AdminUser, AdminMessage } from "@/hooks/useAdminMessages";

const AdminMessaging = () => {
  const { 
    admins, 
    messages, 
    loading, 
    currentUserId, 
    fetchMessages, 
    sendMessage, 
    markAsRead 
  } = useAdminMessages();
  
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [conversationMessages, setConversationMessages] = useState<AdminMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter messages for selected conversation
  useEffect(() => {
    if (selectedAdmin && currentUserId) {
      const filtered = messages.filter(
        msg => 
          (msg.sender_id === currentUserId && msg.recipient_id === selectedAdmin.id) ||
          (msg.sender_id === selectedAdmin.id && msg.recipient_id === currentUserId)
      );
      setConversationMessages(filtered);
      
      // Mark messages from selected admin as read
      filtered.forEach(msg => {
        if (msg.recipient_id === currentUserId && !msg.read_at) {
          markAsRead(msg.id);
        }
      });
    }
  }, [selectedAdmin, messages, currentUserId]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);

  const handleSendMessage = async () => {
    if (!selectedAdmin || !newMessage.trim()) return;

    const success = await sendMessage(selectedAdmin.id, newMessage);
    if (success) {
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getUnreadCount = (adminId: string) => {
    return messages.filter(
      msg => 
        msg.sender_id === adminId && 
        msg.recipient_id === currentUserId && 
        !msg.read_at
    ).length;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading admin messaging...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Admin Messaging
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex h-[520px]">
          {/* Admin List */}
          <div className="w-1/3 border-r">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Other Admins ({admins.length})
              </h3>
            </div>
            <ScrollArea className="h-[460px]">
              {admins.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No other admins found
                </div>
              ) : (
                <div className="space-y-1">
                  {admins.map((admin) => {
                    const unreadCount = getUnreadCount(admin.id);
                    return (
                      <button
                        key={admin.id}
                        onClick={() => {
                          setSelectedAdmin(admin);
                          fetchMessages(admin.id);
                        }}
                        className={`w-full p-3 text-left hover:bg-gray-100 transition-colors border-b ${
                          selectedAdmin?.id === admin.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {admin.email.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              Admin {admin.id.slice(0, 8)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {admin.email}
                            </div>
                          </div>
                          {unreadCount > 0 && (
                            <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {unreadCount}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 flex flex-col">
            {selectedAdmin ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {selectedAdmin.email.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        Admin {selectedAdmin.id.slice(0, 8)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {selectedAdmin.email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {conversationMessages.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        No messages yet. Start a conversation!
                      </div>
                    ) : (
                      conversationMessages.map((message) => {
                        const isFromCurrentUser = message.sender_id === currentUserId;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-lg ${
                                isFromCurrentUser
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <div className="text-sm">{message.message}</div>
                              <div
                                className={`text-xs mt-1 ${
                                  isFromCurrentUser ? 'text-blue-100' : 'text-gray-500'
                                }`}
                              >
                                {formatTime(message.created_at)}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <div>Select an admin to start messaging</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminMessaging;
