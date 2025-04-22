
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  onAdminRegistered?: () => void;
};

export default function RegisterAdminDialog({ onAdminRegistered }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async () => {
    setIsLoading(true);
    console.log("Inviting user with email:", email);
    
    try {
      // Send invite (using Supabase admin API)
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
      console.log("Invite response:", data, error);

      if (error) {
        toast.error(error.message || "Failed to send invite.");
        setIsLoading(false);
        return;
      }

      // In most cases, inviteUserByEmail immediately creates a user in the auth.users table,
      // so we can assign role now.
      if (data?.user?.id) {
        console.log("User created with ID:", data.user.id);
        const { error: roleErr } = await supabase
          .from("user_roles")
          .insert([{ user_id: data.user.id, role: "admin" }]);

        if (roleErr) {
          console.error("Role assignment error:", roleErr);
          toast.error("Failed to assign admin role: " + roleErr.message);
        } else {
          toast.success("Admin invited and role assigned!");
          setOpen(false);
          setEmail("");
          onAdminRegistered?.();
        }
      } else {
        toast.error("User invitation sent but failed to assign role.");
      }
    } catch (err: any) {
      console.error("Error in invite process:", err);
      toast.error("Failed to invite admin. " + (err?.message || String(err)));
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-1">
          <UserPlus size={18} />
          Register New Admin
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register New Admin</DialogTitle>
          <DialogDescription>
            Enter the email address of the person you wish to register as admin. They will receive an invite to join as an admin.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleInvite}
            disabled={!email || isLoading}
            className="mt-2"
          >
            {isLoading ? "Inviting..." : "Send Invite"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" type="button" className="ml-2">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
