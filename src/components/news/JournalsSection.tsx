
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JournalItemProps {
  title: string;
  authors: string;
  link: string;
}

const JournalItem = ({ title, authors, link }: JournalItemProps) => {
  return (
    <div className="mb-6 border-b pb-4 last:border-0">
      <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">Authors: {authors}</p>
      <Button
        variant="outline"
        className="bg-agro-orange hover:bg-agro-orange/90 text-white border-0"
        size="sm"
      >
        <Download className="mr-1 h-4 w-4" /> Download PDF
      </Button>
    </div>
  );
};

const JournalsSection = () => {
  const journals = [
    {
      id: 1,
      title: "Advances In Crop Protection",
      authors: "Andres J. A. Mustara",
      link: "#"
    },
    {
      id: 2,
      title: "Sustainable Agricultural Practices",
      authors: "Authorsi Authors",
      link: "#"
    }
  ];

  return (
    <section className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center mb-6">
        <FileText className="text-agro-green mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Journals</h2>
      </div>
      <div>
        {journals.map(journal => (
          <JournalItem
            key={journal.id}
            title={journal.title}
            authors={journal.authors}
            link={journal.link}
          />
        ))}
      </div>
    </section>
  );
};

export default JournalsSection;
