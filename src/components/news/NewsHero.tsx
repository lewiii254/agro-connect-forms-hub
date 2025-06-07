
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
    <div className="relative bg-gradient-to-br from-agro-blue via-agro-blue to-agro-green py-16 md:py-20 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            News & Publications
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest agricultural innovations, research findings, and industry insights 
            that empower farmers and agro-dealers across Kenya.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center border border-white/20">
            <div className="flex justify-center mb-2">
              <TrendingUp className="text-agro-orange" size={24} />
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-1">{stats.totalArticles || 15}</div>
            <div className="text-sm md:text-base text-white/80">News Articles</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center border border-white/20">
            <div className="flex justify-center mb-2">
              <BookOpen className="text-agro-orange" size={24} />
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-1">{stats.magazines || 8}</div>
            <div className="text-sm md:text-base text-white/80">Magazines</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center border border-white/20">
            <div className="flex justify-center mb-2">
              <Users className="text-agro-orange" size={24} />
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-1">{stats.resources || 12}</div>
            <div className="text-sm md:text-base text-white/80">Resources</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center border border-white/20">
            <div className="flex justify-center mb-2">
              <Calendar className="text-agro-orange" size={24} />
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-1">{stats.upcomingEvents || 5}</div>
            <div className="text-sm md:text-base text-white/80">Events</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsHero;
