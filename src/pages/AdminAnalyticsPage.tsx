
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "@/components/ui/sonner";
import DashboardHeader from "@/components/admin/DashboardHeader";
import StatisticsCard from "@/components/admin/StatisticsCard";
import { useAdminAuthentication } from "@/hooks/useAdminAuthentication";
import { useAdminApplications } from "@/hooks/useAdminApplications";
import { ChartPie, BarChart3, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ApplicationsChart from "@/components/admin/ApplicationsChart";
import ApplicationsStatusChart from "@/components/admin/ApplicationsStatusChart";

const AdminAnalyticsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isCheckingAuth } = useAdminAuthentication(navigate);
  const { 
    allApplications, 
    agroDealerApps,
    sspTrainingApps,
    extensionApps,
    loading, 
    fetchApplications 
  } = useAdminApplications(isAuthenticated, isCheckingAuth);
  
  const handleRefresh = () => {
    fetchApplications();
    toast.success("Data refreshed");
  };

  // Show loading until auth check is complete
  if (isCheckingAuth) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Loading analytics...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader activeTab="analytics" />
        
        <div className="container mx-auto px-4 pb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-800">Application Analytics</h2>
              <p className="text-gray-600 mt-1">Insights and trends from application data</p>
            </div>
            <Button variant="outline" className="flex items-center gap-1" onClick={handleRefresh}>
              <RefreshCw size={18} />
              Refresh Data
            </Button>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatisticsCard 
              title="Agro Dealer Applications" 
              value={agroDealerApps.length} 
              color="bg-emerald-600"
              icon={<ChartPie size={24} />}
            />
            <StatisticsCard 
              title="SSP Training Applications" 
              value={sspTrainingApps.length} 
              color="bg-amber-500"
              icon={<ChartPie size={24} />}
            />
            <StatisticsCard 
              title="Extension Applications" 
              value={extensionApps.length} 
              color="bg-blue-500"
              icon={<ChartPie size={24} />}
            />
          </div>
          
          {/* Analytics Tabs and Charts */}
          <div className="mb-8">
            <Tabs defaultValue="distribution" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="distribution">Application Types</TabsTrigger>
                <TabsTrigger value="status">Application Status</TabsTrigger>
              </TabsList>
              
              <TabsContent value="distribution">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Distribution of Applications</h3>
                    <div className="h-80">
                      {loading ? (
                        <div className="flex items-center justify-center h-full">
                          <p>Loading chart data...</p>
                        </div>
                      ) : (
                        <ApplicationsChart 
                          agroDealerCount={agroDealerApps.length}
                          sspTrainingCount={sspTrainingApps.length}
                          extensionCount={extensionApps.length}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="status">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Application Status Overview</h3>
                    <div className="h-80">
                      {loading ? (
                        <div className="flex items-center justify-center h-full">
                          <p>Loading chart data...</p>
                        </div>
                      ) : (
                        <ApplicationsStatusChart 
                          applications={allApplications}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAnalyticsPage;
