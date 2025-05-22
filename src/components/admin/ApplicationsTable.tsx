import { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import type { AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";

import ApplicationsTableActions from "./ApplicationsTableActions";
import ApplicationsTableDetailsSheet from "./ApplicationsTableDetailsSheet";

type ApplicationType = AgroDealerApplication | SSPTrainingApplication | ExtensionApplication;
type ApplicationTableName = "agro_dealer_applications" | "ssp_training_applications" | "extension_applications";

type Props = {
  applications: ApplicationType[];
  formatDate: (date: string) => string;
  loading: boolean;
  onUpdate?: () => void;
  onApprove?: (appId: string, tableName: ApplicationTableName) => Promise<boolean>;
  onReject?: (appId: string, tableName: ApplicationTableName) => Promise<boolean>;
  onDelete?: (appId: string, tableName: ApplicationTableName) => Promise<boolean>;
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

  // Typed for Supabase
  const getTableName = (app: ApplicationType): ApplicationTableName => {
    if ("product_types" in app) return "agro_dealer_applications";
    if ("techniques" in app) return "ssp_training_applications";
    if ("farming_types" in app) return "extension_applications";
    throw new Error("Unknown application type");
  };

  const handleApprove = async (app: ApplicationType) => {
    try {
      const tableName = getTableName(app);
      setProcessingId(app.id);
      
      if (onApprove) {
        const success = await onApprove(app.id, tableName);
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
      const tableName = getTableName(app);
      setProcessingId(app.id);
      
      if (onReject) {
        const success = await onReject(app.id, tableName);
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
      const tableName = getTableName(app);
      setProcessingId(app.id);
      
      if (onDelete) {
        const success = await onDelete(app.id, tableName);
        if (success) {
          toast.success(`Application from ${app.full_name} has been deleted`);
          
          // Update local state immediately to reflect deletion
          setLocalApplications(prev => prev.filter(a => a.id !== app.id));
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
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-emerald-800">Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-sky-100">
              <TableRow>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Service Requested</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.full_name}</TableCell>
                  <TableCell>{getServiceType(app)}</TableCell>
                  <TableCell>{formatDate(app.created_at).split(",")[0]}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
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
                  <TableCell>
                    <div className="flex gap-2">
                      <ApplicationsTableDetailsSheet
                        app={app}
                        selectedApp={selectedApp}
                        setSelectedApp={setSelectedApp}
                        formatDate={formatDate}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        processingId={processingId}
                      />
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
  );
}
