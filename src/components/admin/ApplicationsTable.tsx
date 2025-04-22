
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table";
import { AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";

type Props = {
  loading: boolean;
  applications: (AgroDealerApplication | SSPTrainingApplication | ExtensionApplication)[];
  type: 'agro' | 'ssp' | 'extension';
  formatDate: (date: string) => string;
};

export default function ApplicationsTable({ loading, applications, type, formatDate }: Props) {
  const renderTableHeaders = () => {
    const baseHeaders = ["Name", "Email", "Phone", "Location"];
    
    if (type === "agro") {
      return [...baseHeaders, "Experience", "Applied At"];
    } else if (type === "ssp") {
      return [...baseHeaders, "Experience", "Applied At"];
    } else {
      return [...baseHeaders, "Applied At"];
    }
  };

  const renderTableRow = (app: AgroDealerApplication | SSPTrainingApplication | ExtensionApplication) => {
    const baseCells = [
      <TableCell key="name">{app.full_name}</TableCell>,
      <TableCell key="email">{app.email}</TableCell>,
      <TableCell key="phone">{app.phone}</TableCell>,
      <TableCell key="location">{app.location}</TableCell>,
    ];

    if (type === "agro") {
      const agroApp = app as AgroDealerApplication;
      return [...baseCells,
        <TableCell key="exp">{agroApp.experience_period}</TableCell>,
        <TableCell key="date">{formatDate(app.created_at)}</TableCell>,
      ];
    } else if (type === "ssp") {
      const sspApp = app as SSPTrainingApplication;
      return [...baseCells,
        <TableCell key="exp">{sspApp.experience}</TableCell>,
        <TableCell key="date">{formatDate(app.created_at)}</TableCell>,
      ];
    } else {
      return [...baseCells,
        <TableCell key="date">{formatDate(app.created_at)}</TableCell>,
      ];
    }
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm overflow-x-auto max-w-full">
      <Table className="min-w-[375px] md:min-w-[600px]">
        <TableHeader>
          <TableRow>
            {renderTableHeaders().map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                Loading applications...
              </TableCell>
            </TableRow>
          ) : applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No applications found.
              </TableCell>
            </TableRow>
          ) : (
            applications.map((app) => (
              <TableRow key={app.id}>
                {renderTableRow(app)}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
