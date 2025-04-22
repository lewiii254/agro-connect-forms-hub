
import { useState } from "react";
import { View, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type ApplicationType = AgroDealerApplication | SSPTrainingApplication | ExtensionApplication;

type Props = {
  applications: ApplicationType[];
  formatDate: (date: string) => string;
  loading: boolean;
};

export default function ApplicationsTable({ applications, formatDate, loading }: Props) {
  const [selectedApp, setSelectedApp] = useState<ApplicationType | null>(null);

  const getServiceType = (app: ApplicationType): string => {
    if ('product_types' in app) return 'Agro-Dealer Training';
    if ('techniques' in app) return 'SSP Training';
    if ('farming_types' in app) return 'Extension Services';
    return 'Unknown';
  };

  const renderDetailItem = (label: string, value: string | string[] | null | boolean) => {
    if (value === null || value === undefined) return null;
    
    if (Array.isArray(value)) {
      return (
        <div className="mb-2">
          <p className="font-medium">{label}:</p>
          <ul className="list-disc pl-5">
            {value.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }
    
    return (
      <div className="mb-2">
        <p className="font-medium">{label}:</p>
        <p>{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</p>
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

    if ('product_types' in app) {
      // AgroDealerApplication
      const agroDealerApp = app as AgroDealerApplication;
      return (
        <div>
          {commonDetails}
          <Separator className="my-3" />
          {renderDetailItem("Business Name", agroDealerApp.business_name)}
          {renderDetailItem("Experience", agroDealerApp.experience_period)}
          {renderDetailItem("Product Types", agroDealerApp.product_types)}
          {renderDetailItem("Training Topics", agroDealerApp.training_topics)}
        </div>
      );
    } else if ('techniques' in app) {
      // SSPTrainingApplication
      const sspApp = app as SSPTrainingApplication;
      return (
        <div>
          {commonDetails}
          <Separator className="my-3" />
          {renderDetailItem("Experience", sspApp.experience)}
          {renderDetailItem("Area Size", sspApp.area_size)}
          {renderDetailItem("Techniques", sspApp.techniques)}
          {renderDetailItem("Previous Training", sspApp.previous_training)}
        </div>
      );
    } else if ('farming_types' in app) {
      // ExtensionApplication
      const extApp = app as ExtensionApplication;
      return (
        <div>
          {commonDetails}
          <Separator className="my-3" />
          {renderDetailItem("Farming Types", extApp.farming_types)}
          {renderDetailItem("Interest Areas", extApp.interest_areas)}
          {renderDetailItem("Farm Size", extApp.farm_size)}
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
                  <TableCell>{formatDate(app.created_at).split(',')[0]}</TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Pending
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
                        <SheetContent className="sm:max-w-md">
                          <SheetHeader>
                            <SheetTitle>Application Details</SheetTitle>
                            <SheetDescription>
                              Application submitted on {formatDate(selectedApp?.created_at || '')}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="py-4">
                            {selectedApp && renderApplicationDetails(selectedApp)}
                          </div>
                        </SheetContent>
                      </Sheet>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1"
                      >
                        <Check size={16} />
                        Approve
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1"
                      >
                        <X size={16} />
                        Reject
                      </Button>
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
