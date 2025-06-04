
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { LogOut, Users, BarChart3, MessageSquare, FileText } from "lucide-react";

interface DashboardHeaderProps {
  activeTab?: string;
  unreadCount?: number;
}

const DashboardHeader = ({ activeTab = "applications", unreadCount = 0 }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  const tabs = [
    {
      id: "applications",
      label: "Applications",
      path: "/admin/dashboard",
      icon: Users
    },
    {
      id: "content",
      label: "Content",
      path: "/admin/content",
      icon: FileText
    },
    {
      id: "messages",
      label: "Messages",
      path: "/admin/messages",
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    {
      id: "analytics",
      label: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          
          <nav className="flex space-x-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id || location.pathname === tab.path;
              
              return (
                <Link key={tab.id} to={tab.path}>
                  <Button 
                    variant={isActive ? "default" : "ghost"}
                    className="relative"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                    {tab.badge && (
                      <Badge 
                        variant="destructive" 
                        className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {tab.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>

        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
