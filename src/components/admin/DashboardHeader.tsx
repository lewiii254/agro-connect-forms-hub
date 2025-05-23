
import { Link } from "react-router-dom";
import { LayoutDashboard, FileText, MessageSquare, BarChart3, Bell } from "lucide-react";

type DashboardHeaderProps = {
  activeTab: "applications" | "messages" | "analytics";
  unreadCount?: number;
};

export default function DashboardHeader({ activeTab, unreadCount = 0 }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-emerald-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage applications and platform services</p>
          </div>
          
          {unreadCount > 0 && (
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 text-sm font-medium">
              <Bell size={16} className="mr-1" />
              {unreadCount} new {unreadCount === 1 ? 'application' : 'applications'}
            </div>
          )}
        </div>

        <div className="flex overflow-x-auto pb-3 -mb-px">
          <Link
            to="/admin/dashboard"
            className={`whitespace-nowrap px-5 py-3 border-b-2 text-sm font-medium flex items-center ${
              activeTab === "applications"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FileText size={18} className="mr-2" />
            Applications
            {unreadCount > 0 && (
              <span className="ml-2 bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>
          
          <Link
            to="/admin/analytics"
            className={`whitespace-nowrap px-5 py-3 border-b-2 text-sm font-medium flex items-center ${
              activeTab === "analytics"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <BarChart3 size={18} className="mr-2" />
            Analytics
          </Link>

          <Link
            to="/admin/messages"
            className={`whitespace-nowrap px-5 py-3 border-b-2 text-sm font-medium flex items-center ${
              activeTab === "messages"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <MessageSquare size={18} className="mr-2" />
            Messages
          </Link>
        </div>
      </div>
    </header>
  );
}
