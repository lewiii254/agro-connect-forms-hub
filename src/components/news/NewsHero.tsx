
import { TrendingUp, Calendar, BookOpen, Users, ArrowRight } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { Button } from "@/components/ui/button";

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
    <div className="relative bg-gradient-to-br from-agro-blue via-agro-blue/90 to-agro-green py-20 md:py-28 text-white overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 border-2 border-white/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-white/30 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            News & Publications
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-8">
            Stay informed with the latest agricultural innovations, research findings, and industry insights 
            that empower farmers and agro-dealers across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-agro-orange hover:bg-agro-orange/90 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Browse All Content
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full backdrop-blur-sm"
            >
              Subscribe to Updates
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-agro-orange/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="text-agro-orange" size={28} />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2">{stats.totalArticles || 15}</div>
            <div className="text-sm md:text-base text-white/90 font-medium">News Articles</div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-agro-orange/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="text-agro-orange" size={28} />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2">{stats.magazines || 8}</div>
            <div className="text-sm md:text-base text-white/90 font-medium">Magazines</div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-agro-orange/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Users className="text-agro-orange" size={28} />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2">{stats.resources || 12}</div>
            <div className="text-sm md:text-base text-white/90 font-medium">Resources</div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-agro-orange/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Calendar className="text-agro-orange" size={28} />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2">{stats.upcomingEvents || 5}</div>
            <div className="text-sm md:text-base text-white/90 font-medium">Events</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsHero;
