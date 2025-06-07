
import { TrendingUp, Calendar, BookOpen, Users } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";

const NewsHero = () => {
  const { content } = usePublishedContent();

  // Calculate stats from content
  const stats = {
    totalArticles: content.filter(item => item.content_type === 'news').length,
    magazines: content.filter(item => item.content_type === 'magazine').length,
    resources: content.filter(item => item.content_type === 'resource').length,
    upcomingEvents: content.filter(item => 
      item.content_type === 'event' && 
      item.event_date && 
      new Date(item.event_date) > new Date()
    ).length
  };

  return (
    <div className="relative bg-gradient-to-r from-agro-blue to-agro-green py-20 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            News & Publications
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Stay informed with the latest agricultural innovations, research findings, and industry insights 
            that empower farmers and agro-dealers across Kenya.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <TrendingUp className="mx-auto mb-2 text-agro-orange" size={32} />
            <div className="text-2xl font-bold">{stats.totalArticles || 15}</div>
            <div className="text-sm text-white/80">News Articles</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <BookOpen className="mx-auto mb-2 text-agro-orange" size={32} />
            <div className="text-2xl font-bold">{stats.magazines || 8}</div>
            <div className="text-sm text-white/80">Magazines</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <Users className="mx-auto mb-2 text-agro-orange" size={32} />
            <div className="text-2xl font-bold">{stats.resources || 12}</div>
            <div className="text-sm text-white/80">Resources</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <Calendar className="mx-auto mb-2 text-agro-orange" size={32} />
            <div className="text-2xl font-bold">{stats.upcomingEvents || 5}</div>
            <div className="text-sm text-white/80">Events</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsHero;
