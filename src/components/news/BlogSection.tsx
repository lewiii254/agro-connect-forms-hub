import { BookOpen, User, Calendar } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { formatDate } from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const BlogSection = () => {
  const { content: blogContent, loading } = usePublishedContent('blog');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const fallbackBlogs = [
    {
      id: 1,
      title: "Climate-Smart Agriculture Techniques",
      summary: "Latest research on drought-resistant crop varieties and water-efficient farming.",
      author: "Dr. Sarah Kimani",
      created_at: "2024-04-15",
      image_url: "/public/GalleryPic4.png"
    },
    {
      id: 2,
      title: "Biological Pest Control Innovation",
      summary: "Exploring natural alternatives to chemical pesticides for sustainable farming.",
      author: "James Mwangi",
      created_at: "2024-04-10",
      image_url: "/public/GalleryPic5.png"
    }
  ];

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-purple-100 rounded-xl">
            <BookOpen className="text-purple-500" size={24} />
          </div>
          <div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 h-48 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const displayBlogs = blogContent.length > 0 ? blogContent : fallbackBlogs;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-100 rounded-xl">
          <BookOpen className="text-purple-500" size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Research & Insights</h2>
          <p className="text-gray-600">Latest agricultural research and scientific findings</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayBlogs.slice(0, 4).map((blog) => (
          <article key={blog.id} className="group bg-white border border-gray-100 rounded-xl p-6 hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-300 hover:shadow-lg">
            <div className="flex gap-4">
              {blog.image_url && (
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden relative">
                  <div className={`w-full h-full ${!loadedImages[blog.id] ? 'bg-gray-200 animate-pulse' : ''}`}>
                    <img 
                      src={blog.image_url} 
                      alt={blog.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        loadedImages[blog.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(blog.id)}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 text-base">
                    {blog.title}
                  </h3>
                  <Badge variant="outline" className="text-purple-600 border-purple-200 flex-shrink-0 text-xs">
                    Research
                  </Badge>
                </div>
                
                <div className="flex flex-col gap-2 text-sm text-gray-600 mb-3">
                  {blog.author && (
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-purple-500" />
                      <span className="font-medium">{blog.author}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-purple-500" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                </div>
                
                {blog.summary && (
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {blog.summary}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {displayBlogs.length > 4 && (
        <div className="mt-8 text-center">
          <button className="text-purple-600 hover:text-purple-700 font-semibold bg-purple-50 hover:bg-purple-100 px-6 py-3 rounded-lg transition-colors">
            View All Research →
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
