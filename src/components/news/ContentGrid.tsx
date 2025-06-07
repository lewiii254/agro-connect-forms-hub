
import { useState } from "react";
import { ChevronDown, Calendar, MapPin, Download, ExternalLink, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";
import { Link } from "react-router-dom";

interface ContentItem {
  id: string;
  title: string;
  summary?: string;
  content_type: string;
  image_url?: string;
  created_at: string;
  author?: string;
  slug?: string;
  download_url?: string;
  event_date?: string;
  event_location?: string;
  featured?: boolean;
}

interface ContentGridProps {
  items: ContentItem[];
  loading?: boolean;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
}

const ContentGrid = ({ items, loading, showLoadMore, onLoadMore }: ContentGridProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'news': return 'bg-blue-500 text-white';
      case 'magazine': return 'bg-agro-green text-white';
      case 'blog': return 'bg-purple-500 text-white';
      case 'resource': return 'bg-agro-orange text-white';
      case 'event': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'news': return 'News';
      case 'magazine': return 'Magazine';
      case 'blog': return 'Research Journal';
      case 'resource': return 'Resource';
      case 'event': return 'Event';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-300 h-56"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ExternalLink className="text-gray-400" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No content found</h3>
        <p className="text-gray-500">Try adjusting your search criteria or browse all content</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <article
            key={item.id}
            className={`bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 group ${
              hoveredCard === item.id ? 'shadow-2xl transform -translate-y-2' : 'hover:shadow-xl hover:-translate-y-1'
            }`}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={item.image_url || "/public/GalleryPic1.png"} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={`${getContentTypeColor(item.content_type)} font-semibold px-3 py-1`}>
                  {getContentTypeLabel(item.content_type)}
                </Badge>
                {item.featured && (
                  <Badge className="bg-yellow-500 text-white font-semibold px-3 py-1">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Meta Information */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-agro-blue" />
                  <span>{formatDate(item.event_date || item.created_at)}</span>
                </div>
                {item.event_location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-agro-green" />
                    <span className="truncate">{item.event_location}</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight group-hover:text-agro-blue transition-colors">
                {item.title}
              </h3>

              {/* Author */}
              {item.author && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <User size={14} className="text-agro-orange" />
                  <span>by {item.author}</span>
                </div>
              )}

              {/* Summary */}
              {item.summary && (
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {item.download_url ? (
                  <a
                    href={item.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button size="sm" className="w-full bg-agro-green hover:bg-agro-blue transition-colors shadow-md">
                      <Download size={14} className="mr-2" />
                      Download
                    </Button>
                  </a>
                ) : item.content_type === 'news' ? (
                  <Link to={`/news/${item.slug || item.id}`} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full border-agro-blue text-agro-blue hover:bg-agro-blue hover:text-white transition-colors shadow-md">
                      <ExternalLink size={14} className="mr-2" />
                      Read Article
                    </Button>
                  </Link>
                ) : item.content_type === 'magazine' ? (
                  <Link to={`/magazines/${item.slug || item.id}`} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full border-agro-green text-agro-green hover:bg-agro-green hover:text-white transition-colors shadow-md">
                      <ExternalLink size={14} className="mr-2" />
                      Read Magazine
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" variant="outline" className="w-full" disabled>
                    <Clock size={14} className="mr-2" />
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {showLoadMore && (
        <div className="text-center pt-8">
          <Button
            onClick={onLoadMore}
            variant="outline"
            size="lg"
            className="px-12 py-3 text-agro-blue border-agro-blue hover:bg-agro-blue hover:text-white transition-colors shadow-md"
          >
            <ChevronDown size={18} className="mr-2" />
            Load More Content
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentGrid;
