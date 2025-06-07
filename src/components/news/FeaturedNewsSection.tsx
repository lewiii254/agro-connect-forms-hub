
import { useState } from "react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { Link } from "react-router-dom";

const FeaturedNewsSection = () => {
  const { content: featuredContent, loading } = usePublishedContent(undefined, true);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (loading) {
    return (
      <section className="mb-8">
        <div className="animate-pulse">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-[500px]">
            <div className="bg-gray-300 h-80"></div>
            <div className="p-8 space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const featuredItem = featuredContent[0];

  if (!featuredItem) return null;

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'news': return 'bg-blue-600 hover:bg-blue-700';
      case 'magazine': return 'bg-agro-green hover:bg-green-700';
      case 'blog': return 'bg-purple-600 hover:bg-purple-700';
      case 'resource': return 'bg-agro-orange hover:bg-orange-600';
      case 'event': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getReadMoreLink = (item: any) => {
    switch (item.content_type) {
      case 'news':
        return `/news/${item.slug || item.id}`;
      case 'magazine':
        return `/magazines/${item.slug || item.id}`;
      default:
        return '#';
    }
  };

  return (
    <section className="mb-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-agro-blue to-agro-green text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
          ✨ Featured Content
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Latest Highlights</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Stay updated with our most important stories and announcements</p>
      </div>
      
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500 border border-gray-100">
        <div className="lg:flex lg:min-h-[500px]">
          {/* Image */}
          <div className="lg:w-3/5 relative overflow-hidden">
            <div className={`w-full h-80 lg:h-full relative ${!imageLoaded ? 'bg-gray-200 animate-pulse' : ''}`}>
              <img 
                src={featuredItem.image_url || "/public/GalleryPic1.png"} 
                alt={featuredItem.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded ? 'opacity-100 scale-100 group-hover:scale-105' : 'opacity-0 scale-95'
                }`}
                loading="eager"
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agro-blue"></div>
                </div>
              )}
            </div>
            <div className="absolute top-6 left-6">
              <Badge className={`${getContentTypeColor(featuredItem.content_type)} text-white font-bold px-6 py-3 text-sm transition-colors shadow-lg`}>
                {featuredItem.content_type.toUpperCase()}
              </Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                <Calendar size={16} className="text-agro-blue" />
                <span className="font-medium">{formatDate(featuredItem.event_date || featuredItem.created_at)}</span>
              </div>
              {featuredItem.author && (
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                  <User size={16} className="text-agro-green" />
                  <span className="font-medium">{featuredItem.author}</span>
                </div>
              )}
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {featuredItem.title}
            </h3>
            
            {featuredItem.summary && (
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {featuredItem.summary}
              </p>
            )}
            
            <Link 
              to={getReadMoreLink(featuredItem)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-agro-blue to-agro-green text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 group/link"
            >
              Read Full Story
              <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsSection;
