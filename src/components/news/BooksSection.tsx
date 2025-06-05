
import { Book } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";

interface BookCardProps {
  title: string;
  description: string;
  downloadUrl?: string;
}

const BookCard = ({ title, description, downloadUrl }: BookCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-start space-x-4">
        <div className="bg-agro-lightgreen p-3 rounded-lg">
          <Book className="text-agro-green" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-agro-blue mb-2">{title}</h3>
          <p className="text-gray-700 text-sm mb-4">{description}</p>
          {downloadUrl ? (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-agro-green text-white px-4 py-2 rounded hover:bg-agro-blue transition-colors text-sm"
            >
              Download Book
            </a>
          ) : (
            <button className="inline-block bg-gray-400 text-white px-4 py-2 rounded text-sm cursor-not-allowed">
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const BooksSection = () => {
  const { content: resourceContent, loading } = usePublishedContent('resource');

  // Fallback books when no database content
  const fallbackBooks = [
    {
      id: 1,
      title: "Sustainable Farming Practices in Kenya",
      summary: "A comprehensive guide to implementing sustainable agricultural practices adapted for Kenyan farming conditions.",
      download_url: undefined
    },
    {
      id: 2,
      title: "Crop Protection Manual for Smallholder Farmers", 
      summary: "Essential handbook covering crop diseases, pest identification, and integrated management approaches.",
      download_url: undefined
    },
    {
      id: 3,
      title: "Soil Health and Nutrition Guide",
      summary: "Understanding soil composition, nutrient management, and organic farming techniques for optimal crop yields.",
      download_url: undefined
    }
  ];

  if (loading) {
    return (
      <section className="mt-16 mb-8">
        <div className="flex items-center mb-6">
          <Book className="text-agro-green mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Agricultural Resources & Books</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  // Use database content if available, otherwise fallback
  const displayBooks = resourceContent.length > 0 ? resourceContent : fallbackBooks;

  return (
    <section className="mt-16 mb-8">
      <div className="flex items-center mb-6">
        <Book className="text-agro-green mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Agricultural Resources & Books</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayBooks.slice(0, 3).map(book => (
          <BookCard
            key={book.id}
            title={book.title}
            description={book.summary || "Resource description coming soon."}
            downloadUrl={book.download_url}
          />
        ))}
      </div>
    </section>
  );
};

export default BooksSection;
