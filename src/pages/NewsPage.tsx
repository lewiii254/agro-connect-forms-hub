
import Layout from "@/components/layout/Layout";
import NewsHero from "@/components/news/NewsHero";
import LatestNewsSection from "@/components/news/LatestNewsSection";
import MagazinesSection from "@/components/news/MagazinesSection";
import JournalsSection from "@/components/news/JournalsSection";
import BooksSection from "@/components/news/BooksSection";
import UpcomingEventsSection from "@/components/news/UpcomingEventsSection";

const NewsPage = () => {
  return (
    <Layout>
      <NewsHero />
      <div className="container mx-auto px-4 py-8">
        <LatestNewsSection />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <MagazinesSection />
          <JournalsSection />
        </div>
        <BooksSection />
        <UpcomingEventsSection />
      </div>
    </Layout>
  );
};

export default NewsPage;
