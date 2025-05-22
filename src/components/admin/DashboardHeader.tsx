
import { Home, LogOut, MessageSquare, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type DashboardHeaderProps = {
  activeTab?: "applications" | "messages";
};

export default function DashboardHeader({ activeTab }: DashboardHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="w-full bg-emerald-800 text-white p-4 mb-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2 md:gap-4 items-center flex-wrap justify-center">
          <Link to="/" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-emerald-700 transition-colors">
            <Home size={18} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          <Link 
            to="/admin/dashboard" 
            className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
              activeTab === "applications" 
                ? "bg-emerald-700 text-white font-medium" 
                : "hover:bg-emerald-700"
            }`}
          >
            <FileText size={18} />
            <span className="hidden sm:inline">Applications</span>
          </Link>
          
          <Link 
            to="/admin/messages" 
            className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
              activeTab === "messages" 
                ? "bg-emerald-700 text-white font-medium" 
                : "hover:bg-emerald-700"
            }`}
          >
            <MessageSquare size={18} />
            <span className="hidden sm:inline">Messages</span>
          </Link>
          
          <Button 
            variant="ghost" 
            className="flex items-center gap-1 hover:bg-emerald-700 text-white px-3 py-2" 
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
