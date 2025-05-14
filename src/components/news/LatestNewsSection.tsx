
import { Newspaper } from "lucide-react";
import NewsCard from "./NewsCard";

const LatestNewsSection = () => {
  // Sample news data
  const latestNews = [
    {
      id: 1,
      image: "/lovable-uploads/3db45ff9-3d7e-4723-b0d0-116e21bf11fe.png",
      date: "April 19, 2024",
      title: "Introduces a Field Officer",
      summary: "Loom a mon-signt ofider introducess",
      link: "#"
    },
    {
      id: 2,
      image: "/public/GalleryPic2.png",
      date: "April 2, 2024",
      title: "New Adi-recoiv Information",
      summary: "A new officer address announcements ut",
      link: "#"
    },
    {
      id: 3,
      image: "/public/GalleryPic3.png",
      date: "March 18, 2024",
      title: "Launch New Training Program",
      summary: "Laurotrat a new training program",
      link: "#"
    }
  ];

  return (
    <section className="py-8">
      <div className="flex items-center mb-8">
        <Newspaper className="text-agro-green mr-2" size={28} />
        <h2 className="text-3xl font-bold text-gray-800">Latest News & Updates</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestNews.map(news => (
          <NewsCard 
            key={news.id}
            image={news.image}
            date={news.date}
            title={news.title}
            summary={news.summary}
            link={news.link}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestNewsSection;
