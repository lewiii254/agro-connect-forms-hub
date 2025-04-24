
import { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import type { AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";

import ApplicationsTableActions from "./ApplicationsTableActions";
import ApplicationsTableDetailsSheet from "./ApplicationsTableDetailsSheet";

type ApplicationType = AgroDealerApplication | SSPTrainingApplication | ExtensionApplication;

type Props = {
  applications: ApplicationType[];
  formatDate: (date: string) => string;
  loading: boolean;
  onUpdate?: () => void;
};

export default function ApplicationsTable({ applications, formatDate, loading, onUpdate }: Props) {
  const [selectedApp, setSelectedApp] = useState<ApplicationType | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const getServiceType = (app: ApplicationType): string => {
    if ("product_types" in app) return "Agro-Dealer Training";
    if ("techniques" in app) return "SSP Training";
    if ("farming_types" in app) return "Extension Services";
    return "Unknown";
  };

  // Typed for Supabase
  const getTableName = (app: ApplicationType) => {
    if ("product_types" in app) return "agro_dealer_applications" as const;
    if ("techniques" in app) return "ssp_training_applications" as const;
    if ("farming_types" in app) return "extension_applications" as const;
    return null;
  };

  const updateApplicationStatus = async (app: ApplicationType, status: string) => {
    const tableName = getTableName(app);
    if (!tableName) return false;

    try {
      setProcessingId(app.id);
      const { error } = await supabase
        .from(tableName)
        .update({ status })
        .eq("id", app.id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error(`Error updating ${tableName}:`, error);
      return false;
    } finally {
      setProcessingId(null);
    }
  };

  const handleApprove = async (app: ApplicationType) => {
    const success = await updateApplicationStatus(app, "approved");
    if (success) {
      toast.success(`Application from ${app.full_name} has been approved!`);
      if (onUpdate) onUpdate();
    } else {
      toast.error("Failed to approve application");
    }
  };

  const handleReject = async (app: ApplicationType) => {
    const success = await updateApplicationStatus(app, "rejected");
    if (success) {
      toast.success(`Application from ${app.full_name} has been rejected`);
      if (onUpdate) onUpdate();
    } else {
      toast.error("Failed to reject application");
    }
  };

  const handleDelete = async (app: ApplicationType) => {
    const tableName = getTableName(app);
    if (!tableName) return false;

    try {
      setProcessingId(app.id);
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq("id", app.id);

      if (error) throw error;

      // Call onUpdate to refresh the data immediately after successful deletion
      if (onUpdate) onUpdate();
      
      toast.success(`Application from ${app.full_name} has been deleted`);
      return true;
    } catch (error) {
      console.error(`Error deleting from ${tableName}:`, error);
      toast.error("Failed to delete application");
      return false;
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading applications...</div>;
  }

  if (applications.length === 0) {
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
              {applications.map((app) => (
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
