
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from "@/utils/authUtils";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type AdminRegisterFormProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccessfulRegister: () => void;
};

const AdminRegisterForm = ({ isLoading, setIsLoading, onSuccessfulRegister }: AdminRegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'success' | 'pending'>('idle');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRegistrationStatus('idle');
    
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
        console.error("Sign up error:", signUpError);
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

      // Check if email confirmation is required
      if (!signUpData.user.email_confirmed_at && !signUpData.session) {
        setRegistrationStatus('pending');
        toast.success("Registration successful! Please check your email for confirmation.");
      } else {
        // User is automatically confirmed (email confirmation disabled)
        setRegistrationStatus('success');
        
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
          } else {
            console.log("Admin role assigned:", assignRoleData);
            toast.success("Registration successful! You can now log in.");
          }
        } catch (roleError: any) {
          console.error("Exception during role assignment:", roleError);
          toast.error(`Error assigning role: ${roleError.message || "Unknown error"}`);
        }
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
      // Sign out after registration to ensure clean state
      await supabase.auth.signOut();
      
      // Switch to login tab after successful registration
      setTimeout(() => {
        onSuccessfulRegister();
      }, 1000);
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${error?.message || "Please try again"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {registrationStatus === 'pending' && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please check your email for a confirmation link. You must confirm your email before you can log in.
            If you don't see the email, check your spam folder.
          </AlertDescription>
        </Alert>
      )}
      
      {registrationStatus === 'success' && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Registration successful! You can now log in with your credentials.
          </AlertDescription>
        </Alert>
      )}

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
        
        <div className="text-sm text-gray-600 mt-4">
          <p><strong>Note:</strong> If email confirmation is enabled, you'll need to confirm your email before logging in.</p>
          <p>For testing purposes, you can disable email confirmation in your Supabase project settings.</p>
        </div>
      </form>
    </div>
  );
};

export default AdminRegisterForm;
