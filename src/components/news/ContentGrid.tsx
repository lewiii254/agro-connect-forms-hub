
import { useState } from "react";
import { ChevronDown, Calendar, MapPin, Download, ExternalLink } from "lucide-react";
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
      case 'news': return 'bg-blue-100 text-blue-800';
      case 'magazine': return 'bg-green-100 text-green-800';
      case 'blog': return 'bg-purple-100 text-purple-800';
      case 'resource': return 'bg-orange-100 text-orange-800';
      case 'event': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'news': return 'News';
      case 'magazine': return 'Magazine';
      case 'blog': return 'Journal';
      case 'resource': return 'Resource';
      case 'event': return 'Event';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-300 h-48 rounded-t-lg"></div>
            <div className="p-4 space-y-3 bg-white rounded-b-lg border border-t-0">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No content found</div>
        <p className="text-gray-400">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition-all duration-300 ${
              hoveredCard === item.id ? 'shadow-lg transform -translate-y-1' : 'hover:shadow-lg'
            }`}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.image_url || "/public/GalleryPic1.png"} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className={getContentTypeColor(item.content_type)}>
                  {getContentTypeLabel(item.content_type)}
                </Badge>
                {item.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Meta Information */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(item.event_date || item.created_at)}</span>
                </div>
                {item.event_location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span className="truncate">{item.event_location}</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg text-agro-blue line-clamp-2 leading-tight">
                {item.title}
              </h3>

              {/* Author */}
              {item.author && (
                <p className="text-sm text-gray-600">by {item.author}</p>
              )}

              {/* Summary */}
              {item.summary && (
                <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {item.download_url ? (
                  <a
                    href={item.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button size="sm" className="w-full bg-agro-green hover:bg-agro-blue">
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  </a>
                ) : item.content_type === 'news' ? (
                  <Link to={`/news/${item.slug || item.id}`} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink size={14} className="mr-1" />
                      Read More
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {showLoadMore && (
        <div className="text-center pt-6">
          <Button
            onClick={onLoadMore}
            variant="outline"
            className="px-8"
          >
            <ChevronDown size={16} className="mr-2" />
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentGrid;
