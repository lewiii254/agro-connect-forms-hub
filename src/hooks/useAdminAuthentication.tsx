
import { useState, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export const useAdminAuthentication = (navigate: NavigateFunction) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No session found, redirecting to login");
          navigate("/admin/login");
          return;
        }
        
        // Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
          
        if (roleError || !roleData || roleData.role !== 'admin') {
          console.log("User is not an admin, redirecting to login");
          await supabase.auth.signOut();
          toast.error("You don't have admin privileges");
          navigate("/admin/login");
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/admin/login");
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate("/admin/login");
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { isAuthenticated, isCheckingAuth };
};
