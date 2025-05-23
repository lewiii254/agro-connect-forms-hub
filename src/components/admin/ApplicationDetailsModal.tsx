
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";

type ApplicationType = AgroDealerApplication | SSPTrainingApplication | ExtensionApplication;

type DetailsModalProps = {
  app: ApplicationType | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  formatDate: (date: string) => string;
  onApprove: (app: ApplicationType) => void;
  onReject: (app: ApplicationType) => void;
  processingId: string | null;
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

const getServiceType = (app: ApplicationType): string => {
  if ("product_types" in app) return "Agro-Dealer Training";
  if ("techniques" in app) return "SSP Training";
  if ("farming_types" in app) return "Extension Services";
  return "Unknown";
};

const renderApplicationDetails = (app: ApplicationType, formatDate: (date: string) => string) => {
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

export default function ApplicationDetailsModal({
  app,
  isOpen,
  setIsOpen,
  formatDate,
  onApprove,
  onReject,
  processingId,
}: DetailsModalProps) {
  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-emerald-800 flex items-center">
            <span className="mr-2">{getServiceType(app)} Application</span>
            <span className={`px-2 py-1 text-xs rounded-full ml-2 ${
              app.status === "approved"
                ? "bg-green-100 text-green-800"
                : app.status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Pending"}
            </span>
          </DialogTitle>
          <DialogDescription>
            Application submitted by <span className="font-semibold">{app.full_name}</span> on {formatDate(app.created_at)}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="py-4">
            {renderApplicationDetails(app, formatDate)}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 mt-4 border-t pt-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button
            variant="default"
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => onApprove(app)}
            disabled={processingId === app.id || app.status === "approved"}
          >
            <Check size={16} className="mr-1" />
            Approve
          </Button>
          <Button
            variant="default"
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => onReject(app)}
            disabled={processingId === app.id || app.status === "rejected"}
          >
            <X size={16} className="mr-1" />
            Reject
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
