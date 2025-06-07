
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { Link } from "react-router-dom";

const LatestNewsSection = () => {
  const { content: newsContent, loading } = usePublishedContent('news');

  const fallbackNews = [
    {
      id: "1",
      title: "New Field Officer Program Launches to Support Smallholder Farmers",
      summary: "AgroNexus introduces dedicated field officers to provide on-ground support for crop protection and sustainable farming practices.",
      image_url: "/lovable-uploads/3db45ff9-3d7e-4723-b0d0-116e21bf11fe.png",
      created_at: "2024-04-19",
      author: "AgroNexus Communications",
      slug: "field-officer-program-launch"
    },
    {
      id: "2", 
      title: "Advanced Crop Protection Training Program Now Available",
      summary: "Comprehensive training modules covering integrated pest management, disease prevention, and sustainable farming practices.",
      image_url: "/public/GalleryPic2.png",
      created_at: "2024-04-02",
      author: "Dr. Sarah Kimani",
      slug: "advanced-crop-protection-training"
    },
    {
      id: "3",
      title: "New Agro-Dealer Partnership Network Expansion", 
      summary: "AgroNexus expands its network of certified agro-dealers to improve farmer access to quality inputs and expert advice.",
      image_url: "/public/GalleryPic3.png",
      created_at: "2024-03-18", 
      author: "James Mwangi",
      slug: "agro-dealer-network-expansion"
    }
  ];

  if (loading) {
    return (
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Latest News</h2>
        <p className="text-gray-600 text-center mb-8">Stay informed with our recent updates</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-t-xl"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const displayContent = newsContent.length > 0 ? newsContent : fallbackNews;

  return (
    <section className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest News</h2>
        <p className="text-gray-600">Stay informed with our recent updates and announcements</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayContent.slice(0, 6).map((article) => (
          <article key={article.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={article.image_url || "/public/GalleryPic1.png"} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-blue-500 text-white font-semibold">
                  News
                </Badge>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-blue-500" />
                  <span>{formatDate(article.created_at)}</span>
                </div>
                {article.author && (
                  <div className="flex items-center gap-1">
                    <User size={14} className="text-blue-500" />
                    <span className="truncate">{article.author}</span>
                  </div>
                )}
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                {article.title}
              </h3>
              
              {article.summary && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>
              )}
              
              <Link 
                to={`/news/${article.slug || article.id}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group/link"
              >
                Read More 
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      {displayContent.length > 6 && (
        <div className="mt-8 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            View All News Articles
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestNewsSection;
