
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from "@/utils/authUtils";

type AdminRegisterFormProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccessfulRegister: () => void;
};

const AdminRegisterForm = ({ isLoading, setIsLoading, onSuccessfulRegister }: AdminRegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setIsLoading(false);
        return;
      }
      
      // Clean up any existing auth state
      cleanupAuthState();
      
      // First attempt to sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            is_admin: true
          }
        }
      });

      if (signUpError) {
        toast.error(signUpError.message);
        setIsLoading(false);
        return;
      }

      if (!signUpData.user) {
        toast.error("Registration failed");
        setIsLoading(false);
        return;
      }

      console.log("User registered successfully:", signUpData.user.id);

      // Call the edge function to assign admin role
      try {
        const { data: assignRoleData, error: assignRoleError } = await supabase.functions.invoke('assign-admin-role', {
          body: {
            userId: signUpData.user.id
          }
        });

        if (assignRoleError) {
          console.error("Role assignment error:", assignRoleError);
          toast.error(`Failed to assign admin role: ${assignRoleError.message || "Unknown error"}`);
          // Continue anyway since the user was created
        } else {
          console.log("Admin role assigned:", assignRoleData);
        }
      } catch (roleError: any) {
        console.error("Exception during role assignment:", roleError);
        toast.error(`Error assigning role: ${roleError.message || "Unknown error"}`);
        // Continue anyway since the user was created
      }

      toast.success("Registration successful! Please confirm your email to log in.");
      onSuccessfulRegister();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
      // Sign out after registration
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${error?.message || "Please try again"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <Input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-t-md"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none mt-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-b-md mt-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </div>
    </form>
  );
};

export default AdminRegisterForm;
