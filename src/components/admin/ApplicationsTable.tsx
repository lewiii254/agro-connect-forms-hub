
import { useState } from "react";
import { View, Check, X, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  // Make this strictly typed for Supabase
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

      toast.success(`Application from ${app.full_name} has been deleted`);
      if (onUpdate) onUpdate();
      return true;
    } catch (error) {
      console.error(`Error deleting from ${tableName}:`, error);
      toast.error("Failed to delete application");
      return false;
    } finally {
      setProcessingId(null);
    }
  };

  const renderDetailItem = (label: string, value: string | string[] | null | boolean | undefined) => {
    if (value === null || value === undefined) return null;

    if (Array.isArray(value)) {
      return (
        <div className="mb-4">
          <p className="font-medium text-gray-700">{label}:</p>
          <ul className="list-disc pl-5 mt-1">
            {value.map((item, index) => (
              <li key={index} className="text-gray-600">{item}</li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="mb-4">
        <p className="font-medium text-gray-700">{label}:</p>
        <p className="text-gray-600 mt-1">{typeof value === "boolean" ? (value ? "Yes" : "No") : value}</p>
      </div>
    );
  };

  const renderApplicationDetails = (app: ApplicationType) => {
    const commonDetails = (
      <>
        {renderDetailItem("Full Name", app.full_name)}
        {renderDetailItem("Email", app.email)}
        {renderDetailItem("Phone", app.phone)}
        {renderDetailItem("Location", app.location)}
        {renderDetailItem("Applied Date", formatDate(app.created_at))}
      </>
    );

    if ("product_types" in app) {
      const agroDealerApp = app as AgroDealerApplication;
      return (
        <div className="space-y-2">
          {commonDetails}
          <Separator className="my-6" />
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">Business Details</h3>
          {renderDetailItem("Business Name", agroDealerApp.business_name)}
          {renderDetailItem("Experience", agroDealerApp.experience_period)}
          {renderDetailItem("Staff Count", agroDealerApp.staff_count)}
          {renderDetailItem("Product Types", agroDealerApp.product_types)}
          {renderDetailItem("Other Product Type", agroDealerApp.other_product_type)}
          <Separator className="my-6" />
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">Training Information</h3>
          {renderDetailItem("Training Topics", agroDealerApp.training_topics)}
          {renderDetailItem("Other Training Topic", agroDealerApp.other_training_topic)}
          {renderDetailItem("Previous Training", agroDealerApp.previous_training)}
          {renderDetailItem("Wants Certificate", agroDealerApp.wants_certificate)}
          {renderDetailItem("Preferred Date", agroDealerApp.preferred_date)}
          <Separator className="my-6" />
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">Other Information</h3>
          {renderDetailItem("Referral Source", agroDealerApp.referral_source)}
          {renderDetailItem("Other Referral Source", agroDealerApp.other_referral_source)}
        </div>
      );
    } else if ("techniques" in app) {
      const sspApp = app as SSPTrainingApplication;
      return (
        <div className="space-y-2">
          {commonDetails}
          <Separator className="my-6" />
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">Training Information</h3>
          {renderDetailItem("Experience", sspApp.experience)}
          {renderDetailItem("Area Size", sspApp.area_size)}
          {renderDetailItem("People Count", sspApp.people_count)}
          {renderDetailItem("Techniques", sspApp.techniques)}
          {renderDetailItem("Other Technique", sspApp.other_technique)}
          {renderDetailItem("Previous Training", sspApp.previous_training)}
          {renderDetailItem("Preferred Date", sspApp.preferred_date)}
          <Separator className="my-6" />
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">Other Information</h3>
          {renderDetailItem("Challenges", sspApp.challenges)}
          {renderDetailItem("Referral Source", sspApp.referral_source)}
          {renderDetailItem("Other Referral Source", sspApp.other_referral_source)}
        </div>
      );
    } else if ("farming_types" in app) {
      const extApp = app as ExtensionApplication;
      return (
        <div className="space-y-2">
          {commonDetails}
          <Separator className="my-6" />
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">Farming Details</h3>
          {renderDetailItem("Farming Types", extApp.farming_types)}
          {renderDetailItem("Other Farming Type", extApp.other_farming_type)}
          {renderDetailItem("Interest Areas", extApp.interest_areas)}
          {renderDetailItem("Other Interest Area", extApp.other_interest_area)}
          {renderDetailItem("Farm Size", extApp.farm_size)}
          <Separator className="my-6" />
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">Service Preferences</h3>
          {renderDetailItem("Delivery Method", extApp.delivery_method)}
          {renderDetailItem("Training Preference", extApp.training_preference)}
          {renderDetailItem("Preferred Date", extApp.preferred_date)}
          <Separator className="my-6" />
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">Other Information</h3>
          {renderDetailItem("Challenges", extApp.challenges)}
          {renderDetailItem("Referral Source", extApp.referral_source)}
          {renderDetailItem("Other Referral Source", extApp.other_referral_source)}
        </div>
      );
    }

    return commonDetails;
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
                      {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1"
                            onClick={() => setSelectedApp(app)}
                          >
                            <View size={16} />
                            View
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-md overflow-y-auto max-h-screen">
                          <SheetHeader>
                            <SheetTitle>{getServiceType(app)} Application</SheetTitle>
                            <SheetDescription>
                              Application submitted on {formatDate(selectedApp?.created_at || "")}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="py-4">
                            {selectedApp && renderApplicationDetails(selectedApp)}
                          </div>
                          <div className="flex justify-end gap-2 mt-8">
                            <SheetClose asChild>
                              <Button
                                variant="default"
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => handleApprove(app)}
                                disabled={processingId === app.id || app.status === "approved"}
                              >
                                <Check size={16} className="mr-1" />
                                Approve
                              </Button>
                            </SheetClose>
                            <SheetClose asChild>
                              <Button
                                variant="default"
                                className="bg-orange-500 hover:bg-orange-600"
                                onClick={() => handleReject(app)}
                                disabled={processingId === app.id || app.status === "rejected"}
                              >
                                <X size={16} className="mr-1" />
                                Reject
                              </Button>
                            </SheetClose>
                          </div>
                        </SheetContent>
                      </Sheet>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1"
                        onClick={() => handleApprove(app)}
                        disabled={processingId === app.id || app.status === "approved"}
                      >
                        <Check size={16} />
                        Approve
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1"
                        onClick={() => handleReject(app)}
                        disabled={processingId === app.id || app.status === "rejected"}
                      >
                        <X size={16} />
                        Reject
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                            disabled={processingId === app.id}
                          >
                            <Trash2 size={16} />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will permanently delete the application from {app.full_name}.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(app)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
