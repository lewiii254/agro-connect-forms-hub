
import { useState, useEffect } from "react";
import { MessageSquare, Eye, Reply, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date?: string;
  created_at?: string; // Add this property to fix the TypeScript error
  status: "read" | "unread";
};

type MessagesTableProps = {
  messages: Message[] | any[];
  onUpdate: () => void;
  loading: boolean;
};

export default function MessagesTable({ messages = [], onUpdate, loading = false }: MessagesTableProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ status: "read" })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      toast.success("Message marked as read");
      onUpdate(); // Refresh messages from parent
    } catch (error) {
      console.error("Error updating message status:", error);
      toast.error("Failed to update message status");
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    try {
      // In a real implementation, this would send an email or save the reply
      toast.success(`Reply sent to ${selectedMessage.email}`);
      setReplyText("");
      // Sheet closes as per UI state logic
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Message deleted");
      onUpdate(); // Refresh messages from parent
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  const getUnreadCount = () => messages.filter(msg => msg.status === "unread").length;

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 space-y-2 sm:space-y-0">
        <div>
          <CardTitle className="text-xl md:text-2xl text-emerald-800">Messages ({getUnreadCount()} unread)</CardTitle>
        </div>
        <Button variant="outline" size="sm" className="flex gap-1 items-center w-full sm:w-auto">
          <MessageSquare size={16} />
          Compose
        </Button>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-sky-100">
              <TableRow>
                <TableHead className="min-w-[150px]">Name</TableHead>
                <TableHead className="min-w-[180px]">Subject</TableHead>
                <TableHead className="min-w-[100px] hidden sm:table-cell">Date</TableHead>
                <TableHead className="min-w-[80px]">Status</TableHead>
                <TableHead className="min-w-[250px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">No messages found</TableCell>
                </TableRow>
              ) : (
                messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{message.subject}</TableCell>
                    <TableCell className="hidden sm:table-cell">{formatDate(message.date || message.created_at)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                        message.status === "unread"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {message.status === "unread" ? "Unread" : "Read"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 w-full sm:w-auto justify-center"
                              onClick={() => {
                                setSelectedMessage(message);
                                if (message.status === "unread") {
                                  handleMarkAsRead(message.id);
                                }
                              }}
                            >
                              <Eye size={16} />
                              <span className="hidden sm:inline">View</span>
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="sm:max-w-md w-full">
                            <SheetHeader>
                              <SheetTitle className="text-base sm:text-lg">{selectedMessage?.subject}</SheetTitle>
                              <SheetDescription className="text-sm">
                                From: {selectedMessage?.name} ({selectedMessage?.email})
                                <br />
                                Received: {selectedMessage?.date ? formatDate(selectedMessage.date) : selectedMessage?.created_at ? formatDate(selectedMessage.created_at) : ""}
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-4">
                              <div className="mb-8 border-b pb-4">
                                <p className="whitespace-pre-wrap text-sm">{selectedMessage?.message}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Reply:</h4>
                                <Textarea
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Type your response here..."
                                  className="mb-4"
                                  rows={6}
                                />
                                <Button onClick={handleReply} className="w-full sm:w-auto">Send Reply</Button>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1 w-full sm:w-auto justify-center"
                          onClick={() => {
                            setSelectedMessage(message);
                            setReplyText("");
                          }}
                        >
                          <Reply size={16} />
                          <span className="hidden sm:inline">Reply</span>
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1 w-full sm:w-auto justify-center"
                          onClick={() => handleDelete(message.id)}
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
