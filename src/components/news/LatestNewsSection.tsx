
import { usePublishedContent } from "@/hooks/usePublishedContent";
import NewsCard from "./NewsCard";

const LatestNewsSection = () => {
  const { content: newsContent, loading } = usePublishedContent('news');

  if (loading) {
    return (
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest News & Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-t-lg"></div>
              <div className="p-4 space-y-2">
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

  // Show hardcoded fallback if no content in database yet
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

  const displayContent = newsContent.length > 0 ? newsContent : fallbackNews;

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest News & Updates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayContent.slice(0, 3).map((article) => (
          <NewsCard
            key={article.id}
            image={article.image_url || "/public/GalleryPic1.png"}
            title={article.title}
            summary={article.summary || ""}
            date={article.created_at}
            author={article.author || "AgroNexus Team"}
            link={`/news/${article.slug || article.id}`}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestNewsSection;
