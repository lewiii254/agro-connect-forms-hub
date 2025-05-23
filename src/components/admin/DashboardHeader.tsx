
import { Link } from "react-router-dom";
import { LayoutDashboard, FileText, MessageSquare, BarChart3 } from "lucide-react";

type DashboardHeaderProps = {
  activeTab: "applications" | "messages" | "analytics";
};

export default function DashboardHeader({ activeTab }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-emerald-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage applications and platform services</p>
          </div>
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
