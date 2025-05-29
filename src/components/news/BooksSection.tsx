
import { Book, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BookCardProps {
  image: string;
  title: string;
  authors: string;
  link: string;
}

const BookCard = ({ image, title, authors, link }: BookCardProps) => {
  const handleDownload = () => {
    // Simulate download functionality
    toast.success(`Downloading: ${title}`);
    console.log(`Downloading book: ${title} from ${link}`);
  };

  return (
    <div className="flex mb-4 items-center">
      <div className="w-20 h-28 flex-shrink-0 mr-4 overflow-hidden rounded">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">Authors: {authors}</p>
        <Button
          variant="outline"
          className="bg-agro-orange hover:bg-agro-orange/90 text-white border-0"
          size="sm"
          onClick={handleDownload}
        >
          <Download className="mr-1 h-4 w-4" /> Download
        </Button>
      </div>
    </div>
  );
};

const BooksSection = () => {
  const books = [
    {
      id: 1,
      image: "/public/GalleryPic6.png",
      title: "Complete Guide to Safe Pesticide Application",
      authors: "AgroNexus Technical Team",
      link: "/downloads/pesticide-application-guide.pdf"
    },
    {
      id: 2,
      image: "/public/GalleryPic7.png",
      title: "Modern Crop Management for African Farmers",
      authors: "Dr. Mary Njeri, Prof. John Kiprotich",
      link: "/downloads/modern-crop-management.pdf"
    }
  ];

  return (
    <section className="mt-16">
      <div className="flex items-center mb-6">
        <Book className="text-agro-green mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Agricultural Resources</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map(book => (
          <BookCard
            key={book.id}
            image={book.image}
            title={book.title}
            authors={book.authors}
            link={book.link}
          />
        ))}
      </div>
    </section>
  );
};

export default BooksSection;
