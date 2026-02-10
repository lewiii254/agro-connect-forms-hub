
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { LogOut, Users, BarChart3, MessageSquare, FileText, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";

interface DashboardHeaderProps {
  activeTab?: string;
  unreadCount?: number;
}

const DashboardHeader = ({ activeTab = "applications", unreadCount = 0 }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      id: "messaging",
      label: "Admin Chat",
      path: "/admin/messaging",
      icon: MessageCircle
    },
    {
      id: "analytics",
      label: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Desktop Header */}
      <div className="hidden lg:block px-6 py-4">
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

      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">Admin</h1>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="mt-4 pb-4 space-y-2 border-t pt-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id || location.pathname === tab.path;
              
              return (
                <Link key={tab.id} to={tab.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start relative"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                    {tab.badge && (
                      <Badge 
                        variant="destructive" 
                        className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {tab.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
