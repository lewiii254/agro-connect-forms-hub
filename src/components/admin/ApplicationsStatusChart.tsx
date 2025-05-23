
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { AgroDealerApplication, SSPTrainingApplication, ExtensionApplication } from "@/types/admin";

type ApplicationsStatusChartProps = {
  applications: (AgroDealerApplication | SSPTrainingApplication | ExtensionApplication)[];
};

export default function ApplicationsStatusChart({ applications }: ApplicationsStatusChartProps) {
  // Count applications by status
  const pending = applications.filter(app => !app.status || app.status === 'pending').length;
  const approved = applications.filter(app => app.status === 'approved').length;
  const rejected = applications.filter(app => app.status === 'rejected').length;
  
  const data = [
    { name: 'Pending', value: pending, fill: '#f59e0b' },
    { name: 'Approved', value: approved, fill: '#059669' },
    { name: 'Rejected', value: rejected, fill: '#ef4444' },
  ].filter(item => item.value > 0); // Only show non-zero values

  // If there's no data, show a message
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No status data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} applications`, 'Count']} />
        <Legend />
        <Bar dataKey="value" name="Applications" />
      </BarChart>
    </ResponsiveContainer>
  );
}
