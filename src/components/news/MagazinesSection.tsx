import { BookOpen, Download, Eye } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";

const MagazinesSection = () => {
  const { content: magazineContent, loading } = usePublishedContent('magazine');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

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

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  if (loading) {
    return (
      <section className="bg-white rounded-2xl shadow-xl p-8 h-fit">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-green-100 rounded-xl">
            <BookOpen className="text-agro-green" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Digital Magazines</h2>
            <p className="text-gray-600 text-sm">Latest publications</p>
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>
          ))}
        </div>
      </section>
    );
  }

  const displayMagazines = magazineContent.length > 0 ? magazineContent : fallbackMagazines;

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 h-fit">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-green-100 rounded-xl">
          <BookOpen className="text-agro-green" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Digital Magazines</h2>
          <p className="text-gray-600 text-sm">Latest publications & insights</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {displayMagazines.slice(0, 2).map((magazine) => (
          <article key={magazine.id} className="group border border-gray-100 rounded-xl overflow-hidden hover:border-green-200 hover:shadow-lg transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <div className={`w-full h-full ${!loadedImages[magazine.id] ? 'bg-gray-200 animate-pulse' : ''}`}>
                <img 
                  src={magazine.image_url || "/public/GalleryPic4.png"} 
                  alt={magazine.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    loadedImages[magazine.id] ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(magazine.id)}
                />
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-agro-green text-white font-semibold shadow-md">
                  Magazine
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-agro-green transition-colors mb-3 line-clamp-2">
                {magazine.title}
              </h3>
              
              {magazine.summary && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {magazine.summary}
                </p>
              )}
              
              <div className="flex gap-3">
                <Link
                  to={`/magazines/${magazine.slug || magazine.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-agro-green text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold shadow-md hover:shadow-lg"
                >
                  <Eye size={16} />
                  Read Online
                </Link>
                
                {magazine.download_url ? (
                  <a
                    href={magazine.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-agro-green text-agro-green px-4 py-3 rounded-lg hover:bg-green-50 transition-colors text-sm font-semibold"
                  >
                    <Download size={16} />
                    PDF
                  </a>
                ) : (
                  <button className="inline-flex items-center gap-2 border border-gray-300 text-gray-400 px-4 py-3 rounded-lg cursor-not-allowed text-sm">
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
        <div className="mt-6 text-center">
          <button className="text-agro-green hover:text-green-700 font-semibold text-sm bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-colors">
            View All Magazines →
          </button>
        </div>
      )}
    </section>
  );
};

export default MagazinesSection;
