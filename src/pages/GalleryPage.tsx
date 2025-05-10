import Layout from "@/components/layout/Layout";
import { Grid2x2, GridIcon } from "lucide-react";
import { useState } from "react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "GalleryPic1.png",
    alt: "Agricultural field",
    caption: "Our agricultural fields in full bloom"
  },
  {
    id: 2,
    src: "GalleryPic2.png",
    alt: "Training Session",
    caption: "SSP Training certification session"
  },
  // Add more images as they become available
];

const GalleryPage = () => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-agro-blue py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-4">Our Gallery</h1>
          <p className="text-white text-center max-w-2xl mx-auto">
            Explore our collection of images showcasing our events, training sessions, and agricultural activities.
          </p>
        </div>
      </div>

      {/* Gallery Controls */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setLayout('grid')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                layout === 'grid'
                  ? 'bg-agro-blue text-white'
                  : 'bg-white text-gray-700 hover:text-agro-blue'
              }`}
            >
              <Grid2x2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                layout === 'list'
                  ? 'bg-agro-blue text-white'
                  : 'bg-white text-gray-700 hover:text-agro-blue'
              }`}
            >
              <GridIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={`${
          layout === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-6'
        }`}>
          {galleryImages.map((image) => (
            <div 
              key={image.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                layout === 'list' ? 'flex items-center' : ''
              }`}
            >
              <div className={layout === 'list' ? 'w-1/3' : ''}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className={`p-4 ${layout === 'list' ? 'w-2/3' : ''}`}>
                <p className="text-gray-700">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;
