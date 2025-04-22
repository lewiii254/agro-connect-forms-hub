
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import { AdminUser } from "@/types/admin";

type Props = {
  loading: boolean;
  admins: AdminUser[];
  formatDate: (date: string) => string;
};

export default function AdminUsersTable({ loading, admins, formatDate }: Props) {
  return (
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
                  {ad.invited_at ? formatDate(ad.invited_at) : ""}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
