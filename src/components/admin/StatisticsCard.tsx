
import { ReactNode } from "react";

type StatisticsCardProps = {
  title: string;
  value: number | string;
  color: string;
  icon?: ReactNode;
  children?: ReactNode;
};

export default function StatisticsCard({ title, value, color, icon, children }: StatisticsCardProps) {
  return (
    <div className={`${color} text-white p-6 rounded-lg shadow-md flex flex-col items-center`}>
      {icon && <div className="mb-3">{icon}</div>}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-5xl font-bold">{value}</p>
      {children}
    </div>
  );
}
