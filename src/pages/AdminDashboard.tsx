import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const fetchApplications = async () => {
  const [{ data: sspTraining }, { data: extension }, { data: agro }] = await Promise.all([
    supabase.from("ssp_training_applications").select("*").order("created_at", { ascending: false }),
    supabase.from("extension_applications").select("*").order("created_at", { ascending: false }),
    supabase.from("agro_dealer_applications").select("*").order("created_at", { ascending: false }),
  ]);
  return {
    sspTraining: sspTraining || [],
    extension: extension || [],
    agro: agro || [],
  };
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you would check if the user is authenticated
    // and redirect to login if not
    const isAuthenticated = true; // Simplified for demo
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const { data: appsData, refetch } = useQuery({
    queryKey: ["all-applications"],
    queryFn: fetchApplications,
  });

  // Flatten and annotate applications
  const applications = [
    ...(appsData?.sspTraining || []).map(app => ({
      ...app,
      applicantName: app.full_name,
      email: app.email,
      serviceRequested: "SSP Training",
      dateSubmitted: app.created_at ? app.created_at.split("T")[0] : "",
      status: "Pending"
    })),
    ...(appsData?.extension || []).map(app => ({
      ...app,
      applicantName: app.full_name,
      email: app.email,
      serviceRequested: "Extension Services",
      dateSubmitted: app.created_at ? app.created_at.split("T")[0] : "",
      status: "Pending"
    })),
    ...(appsData?.agro || []).map(app => ({
      ...app,
      applicantName: app.full_name,
      email: app.email,
      serviceRequested: "Agro-dealer Training",
      dateSubmitted: app.created_at ? app.created_at.split("T")[0] : "",
      status: "Pending"
    })),
  ].sort((a, b) => (b.dateSubmitted.localeCompare(a.dateSubmitted)));

  // Placeholder for messages (if you later add a messages/contact table)
  const [messages, setMessages] = useState<any[]>([]);
  const unreadMessagesCount = messages.filter(msg => msg.status === "Unread").length;

  const handleLogout = () => {
    // In a real app, you would clear auth tokens/state
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const pendingApplicationsCount = applications.filter(app => app.status === "Pending").length;

  const viewApplication = (application: any) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  const viewMessage = (message: any) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    
    // Mark as read
    if (message.status === "Unread") {
      const updatedMessages = messages.map(msg => 
        msg.id === message.id ? { ...msg, status: "Read" } : msg
      );
      setMessages(updatedMessages);
    }
  };

  // Status update actions are now frontend-only until a status field is added!
  const updateApplicationStatus = (id: number, newStatus: string) => {
    // In real app, update application status in DB
    setShowApplicationModal(false);
    toast.success(`Application has been ${newStatus.toLowerCase()}`);
    // Optionally refetch
    refetch();
  };

  const deleteMessage = (id: number) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    setShowMessageModal(false);
    toast.success("Message deleted successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-agro-blue shadow-md">
        <div className="mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
        
        {/* Navigation */}
        <div className="bg-white border-t border-gray-200">
          <div className="mx-auto px-4">
            <nav className="flex">
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "home"
                    ? "border-agro-blue text-agro-blue"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("home")}
              >
                Home
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "applications"
                    ? "border-agro-blue text-agro-blue"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("applications")}
              >
                Applications
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "messages"
                    ? "border-agro-blue text-agro-blue"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("messages")}
              >
                Messages
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-4 py-8">
        {/* Home Tab */}
        {activeTab === "home" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stats Cards */}
              <div className="bg-agro-green text-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Total Applications</h2>
                <p className="text-5xl font-bold">{applications.length}</p>
              </div>
              
              <div className="bg-agro-orange text-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Unread Messages</h2>
                <p className="text-5xl font-bold">{unreadMessagesCount}</p>
              </div>
            </div>
            
            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-bold text-agro-blue">Recent Applications</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicant Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service Requested
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.slice(0, 3).map((application) => (
                      <tr key={application.email + application.serviceRequested}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{application.applicantName}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.serviceRequested}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.dateSubmitted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${application.status === "Approved" ? "bg-green-100 text-green-800" : 
                              application.status === "Rejected" ? "bg-red-100 text-red-800" : 
                              "bg-yellow-100 text-yellow-800"}`}>
                            {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => viewApplication(application)}
                            className="text-agro-blue hover:text-agro-green"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-right">
                <button
                  onClick={() => setActiveTab("applications")}
                  className="text-sm font-medium text-agro-blue hover:text-agro-green"
                >
                  View All Applications →
                </button>
              </div>
            </div>
            
            {/* Recent Messages */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-bold text-agro-blue">Recent Messages</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {messages.slice(0, 3).map((message) => (
                      <tr key={message.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{message.name}</div>
                          <div className="text-sm text-gray-500">{message.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {message.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {message.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${message.status === "Unread" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
                            {message.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => viewMessage(message)}
                            className="text-agro-blue hover:text-agro-green"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-right">
                <button
                  onClick={() => setActiveTab("messages")}
                  className="text-sm font-medium text-agro-blue hover:text-agro-green"
                >
                  View All Messages →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-agro-blue">All Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Requested
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.email + application.serviceRequested}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{application.applicantName}</div>
                        <div className="text-sm text-gray-500">{application.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.serviceRequested}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.dateSubmitted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${application.status === "Approved" ? "bg-green-100 text-green-800" : 
                            application.status === "Rejected" ? "bg-red-100 text-red-800" : 
                            "bg-yellow-100 text-yellow-800"}`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewApplication(application)}
                          className="text-agro-blue hover:text-agro-green"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-agro-blue">All Messages</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages.map((message) => (
                    <tr key={message.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{message.name}</div>
                        <div className="text-sm text-gray-500">{message.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {message.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {message.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${message.status === "Unread" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
                          {message.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewMessage(message)}
                          className="text-agro-blue hover:text-agro-green mr-3"
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Application Modal */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-agro-blue">Application Details</h3>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Applicant Name</h4>
                  <p className="text-base">{selectedApplication.applicantName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="text-base">{selectedApplication.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Service Requested</h4>
                  <p className="text-base">{selectedApplication.serviceRequested}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date Submitted</h4>
                  <p className="text-base">{selectedApplication.dateSubmitted}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <p className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
                    ${selectedApplication.status === "Approved" ? "bg-green-100 text-green-800" : 
                      selectedApplication.status === "Rejected" ? "bg-red-100 text-red-800" : 
                      "bg-yellow-100 text-yellow-800"}`}>
                    {selectedApplication.status}
                  </p>
                </div>
              </div>
              
              {/* Additional application details would go here */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Application Details</h4>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    This is a placeholder for more detailed application information that would be displayed here.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-end space-x-3">
                {selectedApplication.status === "Pending" && (
                  <>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication.id, "Approved")}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication.id, "Rejected")}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-agro-blue">Message Details</h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500">From</h4>
                <p className="text-base">{selectedMessage.name} ({selectedMessage.email})</p>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                <p className="text-base font-medium">{selectedMessage.subject}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500">Date</h4>
                <p className="text-base">{selectedMessage.date}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500">Message</h4>
                <div className="mt-2 p-4 bg-gray-50 rounded border border-gray-200">
                  <p className="text-gray-700">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-end space-x-3">
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    toast.success("Reply sent successfully!");
                    setShowMessageModal(false);
                  }}
                  className="px-4 py-2 bg-agro-blue text-white rounded hover:bg-agro-green transition-colors"
                >
                  Reply
                </button>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
