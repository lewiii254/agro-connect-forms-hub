
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Check, X, View } from "lucide-react";
import type { AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";

type ApplicationType = AgroDealerApplication | SSPTrainingApplication | ExtensionApplication;

type DetailsSheetProps = {
  app: ApplicationType;
  selectedApp: ApplicationType | null;
  setSelectedApp: (app: ApplicationType) => void;
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

export default function ApplicationsTableDetailsSheet({
  app,
  selectedApp,
  setSelectedApp,
  formatDate,
  onApprove,
  onReject,
  processingId,
}: DetailsSheetProps) {
  return (
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
          {selectedApp && renderApplicationDetails(selectedApp, formatDate)}
        </div>
        <div className="flex justify-end gap-2 mt-8">
          <SheetClose asChild>
            <Button
              variant="default"
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => onApprove(app)}
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
              onClick={() => onReject(app)}
              disabled={processingId === app.id || app.status === "rejected"}
            >
              <X size={16} className="mr-1" />
              Reject
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
