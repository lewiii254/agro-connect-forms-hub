
import { Link } from "react-router-dom";

interface NewsCardProps {
  image: string;
  date: string;
  title: string;
  summary: string;
  link: string;
}

const NewsCard = ({ image, date, title, summary, link }: NewsCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-2">{date}</p>
        <h3 className="text-xl font-bold text-agro-blue mb-2">{title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-2">{summary}</p>
        <Link 
          to={link} 
          className="text-agro-orange font-medium hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
