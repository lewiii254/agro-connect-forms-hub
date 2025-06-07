import { usePublishedContent } from "@/hooks/usePublishedContent";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { Link } from "react-router-dom";
import { useState } from "react";

const LatestNewsSection = () => {
  const { content: newsContent, loading } = usePublishedContent('news');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

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

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  if (loading) {
    return (
      <section className="bg-white rounded-2xl shadow-xl p-10">
        <div className="text-center mb-10">
          <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-64 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-56 rounded-xl mb-4"></div>
              <div className="space-y-3">
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
    <section className="bg-white rounded-2xl shadow-xl p-10">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
          📰 Latest News
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Updates</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Stay informed with our latest news, announcements, and industry insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayContent.slice(0, 6).map((article) => (
          <article key={article.id} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:transform hover:scale-105">
            <div className="aspect-video relative overflow-hidden">
              <div className={`w-full h-full ${!loadedImages[article.id] ? 'bg-gray-200 animate-pulse' : ''}`}>
                <img 
                  src={article.image_url || "/public/GalleryPic1.png"} 
                  alt={article.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    loadedImages[article.id] ? 'opacity-100 group-hover:scale-110' : 'opacity-0'
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(article.id)}
                />
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-blue-600 text-white font-semibold shadow-md">
                  News
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                  <Calendar size={14} className="text-blue-500" />
                  <span className="font-medium">{formatDate(article.created_at)}</span>
                </div>
                {article.author && (
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
                    <User size={14} className="text-green-500" />
                    <span className="truncate font-medium">{article.author}</span>
                  </div>
                )}
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                {article.title}
              </h3>
              
              {article.summary && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              )}
              
              <Link 
                to={`/news/${article.slug || article.id}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all group/link"
              >
                Read More 
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      {displayContent.length > 6 && (
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:transform hover:scale-105">
            View All News Articles
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestNewsSection;
