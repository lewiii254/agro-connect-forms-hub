
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import AgroDealerApplicationPage from "./pages/applications/AgroDealerApplicationPage";
import ExtensionServicesApplicationPage from "./pages/applications/ExtensionServicesApplicationPage";
import SSPTrainingApplicationPage from "./pages/applications/SSPTrainingApplicationPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMessagesPage from "./pages/AdminMessagesPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import NotFound from "./pages/NotFound";
import GalleryPage from "./pages/GalleryPage";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/applications/agro-dealers" element={<AgroDealerApplicationPage />} />
            <Route path="/applications/extension-services" element={<ExtensionServicesApplicationPage />} />
            <Route path="/applications/ssp-training" element={<SSPTrainingApplicationPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/messages" element={<AdminMessagesPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
