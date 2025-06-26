
import { Star } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import NewsCard from "./NewsCard";

const FeaturedNewsSection = () => {
  const { content: featuredContent, loading } = usePublishedContent(undefined, true);

  const fallbackFeatured = [
    {
      id: "1",
      title: "New Field Officer Program Launches to Support Smallholder Farmers",
      summary: "AgroNexus introduces dedicated field officers to provide on-ground support for crop protection and sustainable farming practices.",
      created_at: "2024-04-19",
      author: "AgroNexus Communications",
      image_url: "/lovable-uploads/3db45ff9-3d7e-4723-b0d0-116e21bf11fe.png",
      content_type: "news",
      featured: true,
      slug: "field-officer-program"
    }
  ];

  if (loading) {
    return (
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-yellow-100 rounded-xl">
            <Star className="text-yellow-600" size={24} />
          </div>
          <div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-xl"></div>
          ))}
        </div>
      </section>
    );
  }

  const displayFeatured = featuredContent.length > 0 ? featuredContent : fallbackFeatured;

  if (displayFeatured.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-yellow-100 rounded-xl">
          <Star className="text-yellow-600" size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
          <p className="text-gray-600">Highlighted content and important announcements</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayFeatured.slice(0, 2).map((article) => (
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
    </section>
  );
};

export default FeaturedNewsSection;
