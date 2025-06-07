import { Download, FileText, Book } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { Badge } from "@/components/ui/badge";

const ResourcesSection = () => {
  const { content: resourceContent, loading } = usePublishedContent('resource');

  const fallbackResources = [
    {
      id: 1,
      title: "Sustainable Farming Practices Guide",
      summary: "Comprehensive guide to implementing sustainable agricultural practices in Kenya.",
      download_url: undefined,
      image_url: "/public/GalleryPic6.png"
    },
    {
      id: 2,
      title: "Crop Protection Manual",
      summary: "Essential handbook covering crop diseases, pest identification, and management.",
      download_url: undefined,
      image_url: "/public/GalleryPic7.png"
    },
    {
      id: 3,
      title: "Soil Health Guide",
      summary: "Understanding soil composition, nutrient management, and organic farming.",
      download_url: undefined,
      image_url: "/public/GallleryPic8.png"
    }
  ];

  if (loading) {
    return (
      <section className="bg-white rounded-2xl shadow-xl p-8 h-fit">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-orange-100 rounded-xl">
            <FileText className="text-agro-orange" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resources & Guides</h2>
            <p className="text-gray-600 text-sm">Essential farming resources</p>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-xl"></div>
          ))}
        </div>
      </section>
    );
  }

  const displayResources = resourceContent.length > 0 ? resourceContent : fallbackResources;

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 h-fit">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 rounded-xl">
          <FileText className="text-agro-orange" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resources & Guides</h2>
          <p className="text-gray-600 text-sm">Essential farming resources & manuals</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {displayResources.slice(0, 5).map((resource) => (
          <div key={resource.id} className="group border border-gray-100 rounded-xl p-4 hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-300 hover:shadow-md">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                <Book className="text-agro-orange" size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 group-hover:text-agro-orange transition-colors line-clamp-2 text-sm">
                    {resource.title}
                  </h3>
                  <Badge variant="outline" className="text-agro-orange border-orange-200 flex-shrink-0 text-xs">
                    Guide
                  </Badge>
                </div>
                
                {resource.summary && (
                  <p className="text-gray-600 text-xs line-clamp-2 mb-3 leading-relaxed">
                    {resource.summary}
                  </p>
                )}
                
                <div className="flex items-center gap-2">
                  {resource.download_url ? (
                    <a
                      href={resource.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-agro-orange hover:text-orange-700 font-semibold text-xs bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-md transition-colors"
                    >
                      <Download size={12} />
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs bg-gray-50 px-3 py-1 rounded-md">Coming Soon</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {displayResources.length > 5 && (
        <div className="mt-6 text-center">
          <button className="text-agro-orange hover:text-orange-700 font-semibold text-sm bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg transition-colors">
            View All Resources →
          </button>
        </div>
      )}
    </section>
  );
};

export default ResourcesSection;
