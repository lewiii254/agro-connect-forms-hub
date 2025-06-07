
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
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-16 space-y-16">
          {/* Featured News - Full Width */}
          <section className="animate-fade-in">
            <FeaturedNewsSection />
          </section>
          
          {/* Primary Content Grid */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in">
            {/* Left Column - Events (Featured) */}
            <div className="xl:col-span-1">
              <EventsSection />
            </div>
            
            {/* Center Column - Magazines (Highlighted) */}
            <div className="xl:col-span-1">
              <MagazinesSection />
            </div>
            
            {/* Right Column - Resources */}
            <div className="xl:col-span-1">
              <ResourcesSection />
            </div>
          </section>
          
          {/* Secondary Content - Blog Research */}
          <section className="animate-fade-in">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <BlogSection />
            </div>
          </section>
          
          {/* Latest News - Full Width Grid */}
          <section className="animate-fade-in">
            <LatestNewsSection />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;
