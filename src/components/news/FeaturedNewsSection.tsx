
import { useState } from "react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { Link } from "react-router-dom";

const FeaturedNewsSection = () => {
  const { content: featuredContent, loading } = usePublishedContent(undefined, true);

  if (loading) {
    return (
      <section className="mb-16">
        <div className="animate-pulse">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-96">
            <div className="bg-gray-300 h-64"></div>
            <div className="p-8 space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
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
      case 'news': return 'bg-blue-500';
      case 'magazine': return 'bg-agro-green';
      case 'blog': return 'bg-purple-500';
      case 'resource': return 'bg-agro-orange';
      case 'event': return 'bg-red-500';
      default: return 'bg-gray-500';
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
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Content</h2>
        <p className="text-gray-600">Stay updated with our latest highlights</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
        <div className="lg:flex">
          {/* Image */}
          <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
            <img 
              src={featuredItem.image_url || "/public/GalleryPic1.png"} 
              alt={featuredItem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <Badge className={`${getContentTypeColor(featuredItem.content_type)} text-white font-semibold px-4 py-2`}>
                {featuredItem.content_type.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-agro-blue" />
                <span>{formatDate(featuredItem.event_date || featuredItem.created_at)}</span>
              </div>
              {featuredItem.author && (
                <div className="flex items-center gap-2">
                  <User size={16} className="text-agro-green" />
                  <span>{featuredItem.author}</span>
                </div>
              )}
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {featuredItem.title}
            </h3>
            
            {featuredItem.summary && (
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {featuredItem.summary}
              </p>
            )}
            
            <Link 
              to={getReadMoreLink(featuredItem)}
              className="inline-flex items-center gap-2 text-agro-blue hover:text-agro-green font-semibold transition-colors group/link"
            >
              Read More 
              <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsSection;
