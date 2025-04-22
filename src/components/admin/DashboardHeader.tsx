
import { Home, LogOut, MessageSquare, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

export default function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // In a real auth implementation, this would sign out the user
      // await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="w-full bg-emerald-800 text-white p-4 flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="flex gap-4 items-center">
        <Link to="/" className="flex items-center gap-1 hover:underline">
          <Home size={18} />
          Home
        </Link>
        <Link to="/admin/dashboard" className="flex items-center gap-1 hover:underline">
          <FileText size={18} />
          Applications
        </Link>
        <Link to="/admin/messages" className="flex items-center gap-1 hover:underline">
          <MessageSquare size={18} />
          Messages
        </Link>
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 hover:bg-emerald-700 text-white" 
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </div>
  );
}
