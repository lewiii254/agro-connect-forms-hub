
import { BookOpen, Download, Eye } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const MagazinesSection = () => {
  const { content: magazineContent, loading } = usePublishedContent('magazine');

  const fallbackMagazines = [
    {
      id: 1,
      title: "AgroNexus Quarterly - Q1 2024",
      image_url: "/public/GalleryPic4.png",
      summary: "Latest trends in sustainable agriculture and crop protection innovations.",
      download_url: undefined,
      slug: "agronexus-quarterly-q1-2024"
    },
    {
      id: 2,
      title: "Farmer's Success Stories",
      image_url: "/public/GalleryPic5.png", 
      summary: "Inspiring stories from farmers who transformed their yields using modern techniques.",
      download_url: undefined,
      slug: "farmers-success-stories"
    }
  ];

  if (loading) {
    return (
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-agro-green" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Agricultural Magazines</h2>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  const displayMagazines = magazineContent.length > 0 ? magazineContent : fallbackMagazines;

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <BookOpen className="text-agro-green" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agricultural Magazines</h2>
          <p className="text-gray-600 text-sm">Latest publications and digital magazines</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {displayMagazines.slice(0, 2).map((magazine) => (
          <article key={magazine.id} className="group border border-gray-200 rounded-lg overflow-hidden hover:border-green-300 hover:shadow-md transition-all">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={magazine.image_url || "/public/GalleryPic4.png"} 
                alt={magazine.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-agro-green text-white font-semibold">
                  Magazine
                </Badge>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-agro-green transition-colors mb-2 line-clamp-2">
                {magazine.title}
              </h3>
              
              {magazine.summary && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {magazine.summary}
                </p>
              )}
              
              <div className="flex gap-2">
                <Link
                  to={`/magazines/${magazine.slug || magazine.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-agro-green text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <Eye size={16} />
                  Read Online
                </Link>
                
                {magazine.download_url ? (
                  <a
                    href={magazine.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-agro-green text-agro-green px-3 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
                  >
                    <Download size={16} />
                    PDF
                  </a>
                ) : (
                  <button className="inline-flex items-center gap-2 border border-gray-300 text-gray-400 px-3 py-2 rounded-lg cursor-not-allowed text-sm">
                    <Download size={16} />
                    PDF
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {displayMagazines.length > 2 && (
        <div className="mt-4 text-center">
          <button className="text-agro-green hover:text-green-700 font-medium text-sm">
            View All Magazines →
          </button>
        </div>
      )}
    </section>
  );
};

export default MagazinesSection;
