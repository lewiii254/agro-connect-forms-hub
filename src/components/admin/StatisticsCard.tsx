
import { ReactNode } from "react";

type StatisticsCardProps = {
  title: string;
  value: number | string;
  color: string;
  children?: ReactNode;
};

export default function StatisticsCard({ title, value, color, children }: StatisticsCardProps) {
  return (
    <div className={`${color} text-white p-6 rounded-lg shadow-md flex flex-col items-center`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-5xl font-bold">{value}</p>
      {children}
    </div>
  );
}
