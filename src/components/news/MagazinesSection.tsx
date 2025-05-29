
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

interface MagazineCardProps {
  image: string;
  title: string;
  date: string;
  link: string;
}

const MagazineCard = ({ image, title, date, link }: MagazineCardProps) => {
  return (
    <div className="flex mb-4">
      <div className="w-24 h-32 flex-shrink-0 mr-4 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="font-bold text-agro-blue">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{date}</p>
        <Link to={link} className="text-agro-orange hover:underline text-sm font-medium">
          View Issue
        </Link>
      </div>
    </div>
  );
};

const MagazinesSection = () => {
  const magazines = [
    {
      id: 1,
      image: "/public/GalleryPic4.png",
      title: "AGRI REVIEW",
      date: "April 2024",
      link: "/magazines/1"
    },
    {
      id: 2,
      image: "/public/GalleryPic5.png",
      title: "FARMING INSIGHTS",
      date: "January 2024",
      link: "/magazines/2"
    }
  ];

  return (
    <section className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center mb-6">
        <Book className="text-agro-green mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Magazines</h2>
      </div>
      <div>
        {magazines.map(magazine => (
          <MagazineCard
            key={magazine.id}
            image={magazine.image}
            title={magazine.title}
            date={magazine.date}
            link={magazine.link}
          />
        ))}
      </div>
    </section>
  );
};

export default MagazinesSection;
