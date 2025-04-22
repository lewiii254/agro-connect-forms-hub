
import { MessageSquare, Eye, Reply, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Placeholder message type - we'll implement real messages in a future update
type Message = {
  id: string;
  name: string;
  subject: string;
  date: string;
  status: "read" | "unread";
};

// Sample data for demonstration
const sampleMessages: Message[] = [
  {
    id: "1",
    name: "Jane Smith",
    subject: "Inquiry about training",
    date: "2024-04-22",
    status: "unread"
  },
  {
    id: "2",
    name: "John Williams",
    subject: "Question about agro-dealer program",
    date: "2024-04-20",
    status: "read"
  },
  {
    id: "3",
    name: "Sarah Johnson",
    subject: "Extension services information",
    date: "2024-04-19",
    status: "unread"
  }
];

export default function MessagesTable() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl text-emerald-800">Messages</CardTitle>
        <Button variant="outline" size="sm" className="flex gap-1 items-center">
          <MessageSquare size={16} />
          Compose
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-sky-100">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell>{formatDate(message.date)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      message.status === "unread" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {message.status === "unread" ? "Unread" : "Read"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1"
                      >
                        <Eye size={16} />
                        View
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
                      >
                        <Reply size={16} />
                        Reply
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
