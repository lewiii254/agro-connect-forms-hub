
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  linkTo: string;
  bgColorClass: string;
  textColorClass?: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  linkTo,
  bgColorClass,
  textColorClass = "text-white",
}: ServiceCardProps) => {
  return (
    <div className={`${bgColorClass} p-6 rounded-lg shadow-md transition-transform hover:scale-105`}>
      <div className="flex flex-col items-center text-center">
        <div className="text-white text-5xl mb-4">{icon}</div>
        <h3 className={`text-xl font-bold mb-2 ${textColorClass}`}>{title}</h3>
        <p className={`mb-4 ${textColorClass}`}>{description}</p>
        <Link
          to={linkTo}
          className="mt-2 px-4 py-2 bg-white rounded-md text-agro-blue font-medium hover:bg-gray-100 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
