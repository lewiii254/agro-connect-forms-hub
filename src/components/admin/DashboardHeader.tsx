
import { Home, LogOut, MessageSquare, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardHeader() {
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
        <button className="flex items-center gap-1 hover:underline">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
