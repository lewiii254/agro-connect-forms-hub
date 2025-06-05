
import { FileText } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";

interface JournalCardProps {
  title: string;
  description: string;
  downloadUrl?: string;
}

const JournalCard = ({ title, description, downloadUrl }: JournalCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-start space-x-3">
        <div className="bg-agro-lightgreen p-2 rounded">
          <FileText className="text-agro-green" size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-md text-agro-blue mb-1">{title}</h4>
          <p className="text-gray-700 text-sm mb-3">{description}</p>
          {downloadUrl ? (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-agro-green text-white px-3 py-1 rounded hover:bg-agro-blue transition-colors text-sm"
            >
              Read More
            </a>
          ) : (
            <button className="inline-block bg-gray-400 text-white px-3 py-1 rounded text-sm cursor-not-allowed">
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const JournalsSection = () => {
  const { content: blogContent, loading } = usePublishedContent('blog');

  // Fallback journals when no database content
  const fallbackJournals = [
    {
      id: 1,
      title: "Research on Climate-Smart Agriculture",
      summary: "Latest findings on drought-resistant crop varieties and water-efficient farming techniques.",
      download_url: undefined
    },
    {
      id: 2,
      title: "Market Analysis: Fertilizer Trends 2024",
      summary: "Comprehensive analysis of fertilizer market dynamics and pricing trends affecting farmers.",
      download_url: undefined
    },
    {
      id: 3,
      title: "Innovation in Biological Pest Control",
      summary: "Exploring natural and biological alternatives to chemical pesticides for sustainable farming.",
      download_url: undefined
    }
  ];

  if (loading) {
    return (
      <div>
        <div className="flex items-center mb-4">
          <FileText className="text-agro-green mr-2" size={20} />
          <h3 className="text-xl font-bold text-gray-800">Research Journals</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  // Use database content if available, otherwise fallback
  const displayJournals = blogContent.length > 0 ? blogContent : fallbackJournals;

  return (
    <div>
      <div className="flex items-center mb-4">
        <FileText className="text-agro-green mr-2" size={20} />
        <h3 className="text-xl font-bold text-gray-800">Research Journals</h3>
      </div>
      <div className="space-y-4">
        {displayJournals.slice(0, 3).map(journal => (
          <JournalCard
            key={journal.id}
            title={journal.title}
            description={journal.summary || "Journal content description."}
            downloadUrl={journal.download_url}
          />
        ))}
      </div>
    </div>
  );
};

export default JournalsSection;
