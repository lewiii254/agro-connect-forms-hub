
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

type ApplicationsChartProps = {
  agroDealerCount: number;
  sspTrainingCount: number;
  extensionCount: number;
};

const COLORS = ['#059669', '#f59e0b', '#3b82f6'];

export default function ApplicationsChart({
  agroDealerCount,
  sspTrainingCount,
  extensionCount
}: ApplicationsChartProps) {
  const data = [
    { name: 'Agro Dealer', value: agroDealerCount },
    { name: 'SSP Training', value: sspTrainingCount },
    { name: 'Extension', value: extensionCount }
  ].filter(item => item.value > 0); // Only show non-zero values

  // If there's no data, show a message
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No application data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} applications`, 'Count']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
