
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
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <LatestNewsSection />
        
        {/* Two Column Layout for Side Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-16">
            <BooksSection />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-12">
            <MagazinesSection />
            <JournalsSection />
            <UpcomingEventsSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;
