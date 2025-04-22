
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import MessagesTable from "@/components/admin/MessagesTable";

const AdminMessagesPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        
        <div className="container mx-auto px-4 pb-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Message Management</h2>
            <p className="text-gray-600">View and respond to user inquiries and messages</p>
          </div>
          
          <div className="mb-8">
            <MessagesTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminMessagesPage;
