
import { Check, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import type { AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";

type ApplicationType = AgroDealerApplication | SSPTrainingApplication | ExtensionApplication;

type ActionsProps = {
  app: ApplicationType;
  onApprove: (app: ApplicationType) => void;
  onReject: (app: ApplicationType) => void;
  onDelete: (app: ApplicationType) => void;
  processingId: string | null;
};

export default function ApplicationsTableActions({
  app,
  onApprove,
  onReject,
  onDelete,
  processingId,
}: ActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        size="sm"
        className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1"
        onClick={(e) => {
          e.stopPropagation();
          onApprove(app);
        }}
        disabled={processingId === app.id || app.status === "approved"}
      >
        <Check size={16} />
        Approve
      </Button>
      <Button
        variant="default"
        size="sm"
        className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1"
        onClick={(e) => {
          e.stopPropagation();
          onReject(app);
        }}
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
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
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
              onClick={(e) => {
                e.stopPropagation();
                onDelete(app);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
