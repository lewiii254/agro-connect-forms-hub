
import { BookOpen, User, Calendar } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { formatDate } from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";

const BlogSection = () => {
  const { content: blogContent, loading } = usePublishedContent('blog');

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

  if (loading) {
    return (
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-purple-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Research & Insights</h2>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  const displayBlogs = blogContent.length > 0 ? blogContent : fallbackBlogs;

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <BookOpen className="text-purple-500" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Research & Insights</h2>
          <p className="text-gray-600 text-sm">Latest agricultural research and findings</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {displayBlogs.slice(0, 3).map((blog) => (
          <article key={blog.id} className="group border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50/30 transition-all">
            <div className="flex gap-4">
              {blog.image_url && (
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <img 
                    src={blog.image_url} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <Badge variant="outline" className="text-purple-600 border-purple-200 flex-shrink-0">
                    Research
                  </Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 mb-2">
                  {blog.author && (
                    <div className="flex items-center gap-1">
                      <User size={14} className="text-purple-500" />
                      <span>{blog.author}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-purple-500" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                </div>
                
                {blog.summary && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {blog.summary}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {displayBlogs.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
            Read All Research →
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
