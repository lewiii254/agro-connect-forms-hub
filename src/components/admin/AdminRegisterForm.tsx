
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

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
      
      // First attempt to sign up the user - Supabase will handle checking for existing emails
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
        // This will catch if the email already exists
        toast.error(signUpError.message);
        setIsLoading(false);
        return;
      }

      if (!signUpData.user) {
        toast.error("Registration failed");
        setIsLoading(false);
        return;
      }

      // Add admin role to the new user - fixed the error here
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{ 
          user_id: signUpData.user.id, 
          role: 'admin' 
        }]);

      if (roleError) {
        console.error("Role assignment error:", roleError);
        // More detailed error message to help with debugging
        toast.error(`Failed to assign admin role: ${roleError.message || roleError.details || "Unknown error"}`);
        setIsLoading(false);
        return;
      }

      toast.success("Registration successful! Please confirm your email to log in.");
      onSuccessfulRegister();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
