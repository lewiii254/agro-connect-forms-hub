
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminRegisterForm from "@/components/admin/AdminRegisterForm";

const AdminLoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

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
              <AdminLoginForm 
                isLoading={isLoading} 
                setIsLoading={setIsLoading} 
              />
            </TabsContent>
            
            <TabsContent value="register">
              <AdminRegisterForm 
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
                onSuccessfulRegister={() => setActiveTab("login")}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLoginPage;
