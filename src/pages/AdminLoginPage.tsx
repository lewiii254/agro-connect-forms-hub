
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const AdminLoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real implementation, this would authenticate with Supabase
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password
      // });
      
      // For demo purposes
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email === "admin@agro-nexus.com" && password === "admin123") {
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setIsLoading(false);
        return;
      }
      
      // In a real implementation, this would register with Supabase
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password
      // });
      
      // For demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Registration successful! Please check your email to verify your account.");
      setActiveTab("login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-agro-blue">
              Admin Portal
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in or register to access the admin dashboard
            </p>
          </div>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </div>
                
                <div className="mt-4 text-center text-sm">
                  <p className="text-gray-600">
                    For demo: Email: admin@agro-nexus.com | Password: admin123
                  </p>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="register-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="register-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="register-password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="register-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="sr-only">
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
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
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    {isLoading ? 'Registering...' : 'Register'}
                  </Button>
                </div>
                
                <div className="mt-4 text-center text-sm">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-emerald-600 hover:text-emerald-500 font-medium"
                      onClick={() => setActiveTab("login")}
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLoginPage;
