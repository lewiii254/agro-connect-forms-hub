
import { Newspaper } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import NewsCard from "./NewsCard";

const LatestNewsSection = () => {
  const { content: newsContent, loading } = usePublishedContent('news');

  const fallbackNews = [
    {
      id: "1",
      title: "New Field Officer Program Launches to Support Smallholder Farmers",
      summary: "AgroNexus introduces dedicated field officers to provide on-ground support for crop protection and sustainable farming practices.",
      created_at: "2024-04-19",
      author: "AgroNexus Communications",
      image_url: "/lovable-uploads/3db45ff9-3d7e-4723-b0d0-116e21bf11fe.png",
      content_type: "news",
      slug: "field-officer-program"
    },
    {
      id: "2", 
      title: "Advanced Crop Protection Training Program Now Available",
      summary: "Comprehensive training modules covering integrated pest management, disease prevention, and sustainable farming practices.",
      created_at: "2024-04-02",
      author: "Dr. Sarah Kimani, Training Director",
      image_url: "/public/GalleryPic2.png",
      content_type: "news",
      slug: "crop-protection-training"
    },
    {
      id: "3",
      title: "New Agro-Dealer Partnership Network Expansion", 
      summary: "AgroNexus expands its network of certified agro-dealers to improve farmer access to quality inputs and expert advice.",
      created_at: "2024-03-18",
      author: "James Mwangi, Partnership Manager",
      image_url: "/public/GalleryPic3.png",
      content_type: "news",
      slug: "agro-dealer-network"
    }
  ];

  if (loading) {
    return (
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Newspaper className="text-blue-600" size={24} />
          </div>
          <div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-xl"></div>
          ))}
        </div>
      </section>
    );
  }

  const displayNews = newsContent.length > 0 ? newsContent : fallbackNews;

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Newspaper className="text-blue-600" size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Latest News & Updates</h2>
          <p className="text-gray-600">Stay informed with the latest agricultural news and company updates</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayNews.slice(0, 6).map((article) => (
          <NewsCard
            key={article.id}
            id={article.id}
            image={article.image_url || "/public/GalleryPic1.png"}
            date={article.created_at}
            title={article.title}
            summary={article.summary || ""}
            contentType={article.content_type}
            author={article.author}
            slug={article.slug}
          />
        ))}
      </div>
      
      {displayNews.length > 6 && (
        <div className="mt-8 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-lg transition-colors">
            View All News →
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestNewsSection;
