
import Layout from "@/components/layout/Layout";
import NewsHero from "@/components/news/NewsHero";
import FeaturedNewsSection from "@/components/news/FeaturedNewsSection";
import EventsSection from "@/components/news/EventsSection";
import MagazinesSection from "@/components/news/MagazinesSection";
import BlogSection from "@/components/news/BlogSection";
import ResourcesSection from "@/components/news/ResourcesSection";
import LatestNewsSection from "@/components/news/LatestNewsSection";

const NewsPage = () => {
  return (
    <Layout>
      <NewsHero />
      
      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Featured News */}
          <FeaturedNewsSection />
          
          {/* Content Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column */}
            <div className="space-y-8">
              <EventsSection />
              <BlogSection />
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              <MagazinesSection />
              <ResourcesSection />
            </div>
          </div>
          
          {/* Latest News */}
          <LatestNewsSection />
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;
