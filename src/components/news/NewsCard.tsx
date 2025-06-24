
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

interface NewsCardProps {
  id: string;
  image: string;
  date: string;
  title: string;
  summary: string;
  contentType?: string;
  author?: string;
}

const NewsCard = ({ id, image, date, title, summary, contentType = 'news', author }: NewsCardProps) => {
  // Determine the correct route based on content type
  const getRoutePrefix = (type: string) => {
    switch (type) {
      case 'magazine':
        return '/magazines';
      case 'news':
      default:
        return '/news';
    }
  };

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-agro-blue" />
            <span>{formatDate(date)}</span>
          </div>
          {author && (
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-agro-orange" />
              <span>by {author}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-agro-blue mb-3 line-clamp-2 group-hover:text-agro-orange transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
          {summary}
        </p>
        
        <Link 
          to={`${getRoutePrefix(contentType)}/${id}`}
          className="inline-flex items-center text-agro-orange font-semibold hover:text-orange-700 transition-colors bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
