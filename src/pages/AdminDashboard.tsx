
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import RegisterAdminDialog from "@/components/admin/RegisterAdminDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

type AdminUser = {
  user_id: string;
  email: string | null;
  invited_at: string | null;
};

// Define the type for Supabase users
type SupabaseUser = {
  id: string;
  email?: string;
  created_at?: string;
  // Add other properties as needed
}

const AdminDashboard = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch admin users with their emails
  const fetchAdmins = async () => {
    setLoading(true);
    // Get all users with admin role from user_roles and join with auth.users (via admin API)
    const { data: roles, error: rolesError } = await supabase
      .from("user_roles")
      .select("user_id, role")
      .eq("role", "admin");

    if (rolesError) {
      toast.error("Failed to fetch admins.");
      setLoading(false);
      return;
    }

    if (roles && roles.length > 0) {
      // Fetch emails from auth.users using admin API
      // Note: This API only works for service roles -- here, we just display the user_id
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 50,
      });

      if (usersError) {
        toast.error("Failed to fetch admin emails.");
      }

      const adminsList: AdminUser[] = roles.map((role) => {
        // Type guard to make TypeScript happy
        if (!users?.users) {
          return {
            user_id: role.user_id,
            email: null,
            invited_at: null,
          };
        }

        // Properly type the users array
        const supabaseUsers = users.users as SupabaseUser[];
        const matched = supabaseUsers.find((u) => u.id === role.user_id);
        
        return {
          user_id: role.user_id,
          email: matched?.email || null,
          invited_at: matched?.created_at || null,
        };
      });

      setAdmins(adminsList);
    } else {
      setAdmins([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-agro-blue mb-2">Admin Dashboard</h1>
        <p className="mb-6 text-base md:text-lg text-gray-700">
          Welcome. You can register new admin accounts and manage existing admin users here.
        </p>
        <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center">
          <RegisterAdminDialog onAdminRegistered={fetchAdmins} />
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm overflow-x-auto max-w-full">
          <Table className="min-w-[375px] md:min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Invited At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    Loading admin users...
                  </TableCell>
                </TableRow>
              ) : admins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    No admin users found.
                  </TableCell>
                </TableRow>
              ) : (
                admins.map((ad) => (
                  <TableRow key={ad.user_id}>
                    <TableCell className="break-all">{ad.user_id}</TableCell>
                    <TableCell className="break-all">{ad.email}</TableCell>
                    <TableCell>
                      {ad.invited_at
                        ? new Date(ad.invited_at).toLocaleString()
                        : ""}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
