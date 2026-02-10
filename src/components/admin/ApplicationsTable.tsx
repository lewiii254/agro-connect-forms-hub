
import { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { View } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import type { AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";

import ApplicationsTableActions from "./ApplicationsTableActions";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

type ApplicationType = AgroDealerApplication | SSPTrainingApplication | ExtensionApplication;

type Props = {
  applications: ApplicationType[];
  formatDate: (date: string) => string;
  loading: boolean;
  onUpdate?: () => void;
  onApprove?: (appId: string) => Promise<boolean>;
  onReject?: (appId: string) => Promise<boolean>;
  onDelete?: (appId: string) => Promise<boolean>;
};

export default function ApplicationsTable({ 
  applications, 
  formatDate, 
  loading, 
  onUpdate,
  onApprove,
  onReject,
  onDelete
}: Props) {
  const [selectedApp, setSelectedApp] = useState<ApplicationType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [localApplications, setLocalApplications] = useState<ApplicationType[]>(applications);

  // Update local state when applications prop changes
  useEffect(() => {
    setLocalApplications(applications);
  }, [applications]);

  const getServiceType = (app: ApplicationType): string => {
    if ("product_types" in app) return "Agro-Dealer Training";
    if ("techniques" in app) return "SSP Training";
    if ("farming_types" in app) return "Extension Services";
    return "Unknown";
  };

  const handleOpenDetails = (app: ApplicationType) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const handleApprove = async (app: ApplicationType) => {
    try {
      setProcessingId(app.id);
      
      if (onApprove) {
        const success = await onApprove(app.id);
        if (success) {
          toast.success(`Application from ${app.full_name} has been approved!`);
          
          // Update local state immediately to reflect change
          setLocalApplications(prev => 
            prev.map(a => a.id === app.id ? { ...a, status: "approved" } : a)
          );
        } else {
          toast.error("Failed to approve application");
        }
      } else {
        toast.error("Approve function not provided");
      }
    } catch (error) {
      console.error("Error in handleApprove:", error);
      toast.error("An error occurred while approving the application");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (app: ApplicationType) => {
    try {
      setProcessingId(app.id);
      
      if (onReject) {
        const success = await onReject(app.id);
        if (success) {
          toast.success(`Application from ${app.full_name} has been rejected`);
          
          // Update local state immediately to reflect change
          setLocalApplications(prev => 
            prev.map(a => a.id === app.id ? { ...a, status: "rejected" } : a)
          );
        } else {
          toast.error("Failed to reject application");
        }
      } else {
        toast.error("Reject function not provided");
      }
    } catch (error) {
      console.error("Error in handleReject:", error);
      toast.error("An error occurred while rejecting the application");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (app: ApplicationType) => {
    try {
      setProcessingId(app.id);
      
      if (onDelete) {
        const success = await onDelete(app.id);
        if (success) {
          toast.success(`Application from ${app.full_name} has been deleted`);
          
          // Update local state immediately to reflect deletion
          setLocalApplications(prev => prev.filter(a => a.id !== app.id));
          
          // Close modal if the deleted app was being viewed
          if (selectedApp && selectedApp.id === app.id) {
            setIsModalOpen(false);
            setSelectedApp(null);
          }
        } else {
          toast.error("Failed to delete application");
        }
      } else {
        toast.error("Delete function not provided");
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
      toast.error("An error occurred while deleting the application");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading applications...</div>;
  }

  if (localApplications.length === 0) {
    return <div className="text-center py-8">No applications found.</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-emerald-800">Applications</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:p-6">
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader className="bg-sky-100">
                <TableRow>
                  <TableHead className="min-w-[150px]">Applicant Name</TableHead>
                  <TableHead className="min-w-[180px]">Service Requested</TableHead>
                  <TableHead className="min-w-[120px] hidden sm:table-cell">Date Submitted</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localApplications.map((app) => (
                  <TableRow key={app.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleOpenDetails(app)}>
                    <TableCell className="font-medium">{app.full_name}</TableCell>
                    <TableCell>{getServiceType(app)}</TableCell>
                    <TableCell className="hidden sm:table-cell">{formatDate(app.created_at).split(",")[0]}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : app.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {app.status
                          ? app.status.charAt(0).toUpperCase() + app.status.slice(1)
                          : "Pending"}
                      </span>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 w-full sm:w-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetails(app);
                          }}
                        >
                          <View size={16} />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <ApplicationsTableActions
                          app={app}
                          onApprove={handleApprove}
                          onReject={handleReject}
                          onDelete={handleDelete}
                          processingId={processingId}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <ApplicationDetailsModal
        app={selectedApp}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        formatDate={formatDate}
        onApprove={handleApprove}
        onReject={handleReject}
        processingId={processingId}
      />
    </>
  );
}
