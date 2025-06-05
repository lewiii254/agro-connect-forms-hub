
import { BookOpen } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";

interface MagazineCardProps {
  title: string;
  image: string;
  description: string;
  downloadUrl?: string;
}

const MagazineCard = ({ title, image, description, downloadUrl }: MagazineCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg text-agro-blue mb-2">{title}</h3>
        <p className="text-gray-700 text-sm mb-4">{description}</p>
        {downloadUrl ? (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-agro-green text-white px-4 py-2 rounded hover:bg-agro-blue transition-colors text-sm"
          >
            Download PDF
          </a>
        ) : (
          <button className="inline-block bg-gray-400 text-white px-4 py-2 rounded text-sm cursor-not-allowed">
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

const MagazinesSection = () => {
  const { content: magazineContent, loading } = usePublishedContent('magazine');

  // Fallback magazines when no database content
  const fallbackMagazines = [
    {
      id: 1,
      title: "AgroNexus Quarterly - Q1 2024",
      image_url: "/public/GalleryPic4.png",
      summary: "Latest trends in sustainable agriculture and crop protection innovations.",
      download_url: undefined
    },
    {
      id: 2,
      title: "Farmer's Guide to Pest Management",
      image_url: "/public/GalleryPic5.png", 
      summary: "Comprehensive guide to integrated pest management strategies for smallholder farmers.",
      download_url: undefined
    }
  ];

  if (loading) {
    return (
      <div>
        <div className="flex items-center mb-4">
          <BookOpen className="text-agro-green mr-2" size={20} />
          <h3 className="text-xl font-bold text-gray-800">Agricultural Magazines</h3>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  // Use database content if available, otherwise fallback
  const displayMagazines = magazineContent.length > 0 ? magazineContent : fallbackMagazines;

  return (
    <div>
      <div className="flex items-center mb-4">
        <BookOpen className="text-agro-green mr-2" size={20} />
        <h3 className="text-xl font-bold text-gray-800">Agricultural Magazines</h3>
      </div>
      <div className="space-y-4">
        {displayMagazines.slice(0, 2).map(magazine => (
          <MagazineCard
            key={magazine.id}
            title={magazine.title}
            image={magazine.image_url || "/public/GalleryPic4.png"}
            description={magazine.summary || "Magazine content description."}
            downloadUrl={magazine.download_url}
          />
        ))}
      </div>
    </div>
  );
};

export default MagazinesSection;
