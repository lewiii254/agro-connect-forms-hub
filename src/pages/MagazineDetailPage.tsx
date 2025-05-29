
import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, Calendar, Book } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MagazineDetailPage = () => {
  const { id } = useParams();

  // Magazine data with agricultural content relevant to AgroNexus
  const magazines = {
    "1": {
      id: "1",
      title: "AGRI REVIEW - April 2024",
      date: "April 2024",
      image: "/public/GalleryPic4.png",
      description: "Comprehensive coverage of modern agricultural practices and crop protection innovations.",
      content: `
        <div class="prose max-w-none">
          <h2>Welcome to AGRI REVIEW - April 2024 Edition</h2>
          
          <h3>Featured Articles</h3>
          
          <h4>1. Revolutionary Crop Protection Technologies</h4>
          <p>Explore the latest advancements in integrated pest management systems and how they're transforming agricultural productivity across Africa. This month we feature success stories from smallholder farmers who have increased their yields by 40% using modern IPM techniques.</p>
          
          <h4>2. Sustainable Farming Practices</h4>
          <p>Learn about environmentally friendly farming methods that not only protect our ecosystem but also enhance long-term soil fertility and crop resilience. Our experts share practical tips for implementing sustainable practices on any farm size.</p>
          
          <h4>3. Field Officer Success Stories</h4>
          <p>Read inspiring testimonials from farmers who have benefited from our field officer program. Discover how on-ground technical support has helped overcome common agricultural challenges and improved farming outcomes.</p>
          
          <h4>4. Seasonal Farming Calendar</h4>
          <p>Your complete guide to optimal planting, pest control, and harvesting schedules for major crops. This calendar is specifically tailored for East African farming conditions and includes climate considerations.</p>
          
          <h4>5. Agro-Dealer Spotlight</h4>
          <p>Meet our certified agro-dealers who are making quality agricultural inputs accessible to farming communities. Learn about their services, training programs, and how they support farmer success.</p>
          
          <h3>Research Highlights</h3>
          <p>This edition includes groundbreaking research on drought-resistant crop varieties and their performance in various soil conditions. Our research team shares findings that could revolutionize farming in arid regions.</p>
          
          <h3>Training Opportunities</h3>
          <p>Discover upcoming training sessions on advanced crop protection, soil management, and business skills for farmers. Registration details and schedules for our SSP training programs are included.</p>
        </div>
      `
    },
    "2": {
      id: "2",
      title: "FARMING INSIGHTS - January 2024",
      date: "January 2024",
      image: "/public/GalleryPic5.png",
      description: "In-depth analysis of farming trends, market insights, and technological innovations in agriculture.",
      content: `
        <div class="prose max-w-none">
          <h2>FARMING INSIGHTS - January 2024 Edition</h2>
          
          <h3>Market Analysis & Trends</h3>
          
          <h4>1. Agricultural Market Outlook 2024</h4>
          <p>Our comprehensive analysis of crop prices, demand trends, and export opportunities for the coming year. Strategic insights to help farmers make informed decisions about crop selection and timing.</p>
          
          <h4>2. Technology Adoption in Agriculture</h4>
          <p>Explore how digital tools and mobile applications are revolutionizing farm management. From soil testing apps to weather prediction tools, discover technologies that are making farming more efficient and profitable.</p>
          
          <h4>3. Climate-Smart Agriculture</h4>
          <p>Practical strategies for adapting to climate change while maintaining productivity. Learn about drought-resistant varieties, water conservation techniques, and soil health management practices.</p>
          
          <h4>4. Value Chain Development</h4>
          <p>Understanding the complete agricultural value chain from production to market. Discover opportunities for farmers to add value to their products and increase profitability through proper post-harvest handling.</p>
          
          <h4>5. Financial Inclusion for Farmers</h4>
          <p>Explore available financing options, insurance products, and savings programs designed specifically for agricultural communities. Learn how to access capital for farm improvements and expansion.</p>
          
          <h3>Extension Services Impact</h3>
          <p>Detailed case studies showing how our extension services have transformed farming communities. Real data on productivity improvements, income increases, and sustainable practice adoption.</p>
          
          <h3>Farmer Testimonials</h3>
          <p>Hear directly from farmers about their experiences with modern agricultural techniques, challenges overcome, and lessons learned. These stories provide practical insights for fellow farmers.</p>
          
          <h3>Resources & Contacts</h3>
          <p>Complete directory of agricultural support services, emergency contacts for crop protection issues, and information on how to access our field officer services.</p>
        </div>
      `
    }
  };

  const magazine = magazines[id as keyof typeof magazines];

  if (!magazine) {
    return <Navigate to="/news" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/news">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </Link>
        
        <article className="max-w-4xl mx-auto">
          <div className="mb-6">
            <img 
              src={magazine.image} 
              alt={magazine.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {magazine.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6 space-x-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{magazine.date}</span>
              </div>
              <div className="flex items-center">
                <Book className="mr-2 h-4 w-4" />
                <span>AgroNexus Publications</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-6">{magazine.description}</p>
          </div>
          
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: magazine.content }}
          />
        </article>
      </div>
    </Layout>
  );
};

export default MagazineDetailPage;
