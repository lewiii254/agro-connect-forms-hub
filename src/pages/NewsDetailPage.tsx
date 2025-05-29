
import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NewsDetailPage = () => {
  const { id } = useParams();

  // News articles data with relevant agricultural content
  const newsArticles = {
    "1": {
      id: "1",
      title: "New Field Officer Program Launches to Support Smallholder Farmers",
      date: "April 19, 2024",
      author: "AgroNexus Communications",
      image: "/lovable-uploads/3db45ff9-3d7e-4723-b0d0-116e21bf11fe.png",
      summary: "AgroNexus introduces dedicated field officers to provide on-ground support for crop protection and sustainable farming practices.",
      content: `
        <div class="prose max-w-none">
          <p>AgroNexus is proud to announce the launch of our new Field Officer Program, designed to bring expert agricultural guidance directly to farming communities across the region.</p>
          
          <h3>Program Objectives</h3>
          <p>Our field officers will focus on:</p>
          <ul>
            <li>Providing real-time crop protection advice</li>
            <li>Demonstrating proper pesticide application techniques</li>
            <li>Conducting soil health assessments</li>
            <li>Training farmers on integrated pest management</li>
            <li>Facilitating access to quality agricultural inputs</li>
          </ul>
          
          <h3>Coverage Areas</h3>
          <p>The program will initially cover 15 districts, with plans to expand to additional regions based on farmer demand and impact assessments.</p>
          
          <h3>How to Access Services</h3>
          <p>Farmers can request field officer visits through our extension services application portal or by contacting their local agro-dealer partners.</p>
          
          <p>This initiative represents our continued commitment to supporting sustainable agriculture and improving crop yields for smallholder farmers.</p>
        </div>
      `
    },
    "2": {
      id: "2",
      title: "Advanced Crop Protection Training Program Now Available",
      date: "April 2, 2024",
      author: "Dr. Sarah Kimani, Training Director",
      image: "/public/GalleryPic2.png",
      summary: "Comprehensive training modules covering integrated pest management, disease prevention, and sustainable farming practices.",
      content: `
        <div class="prose max-w-none">
          <p>AgroNexus has developed an advanced training curriculum specifically designed for modern crop protection challenges facing today's farmers.</p>
          
          <h3>Training Modules Include:</h3>
          <ul>
            <li><strong>Integrated Pest Management (IPM):</strong> Learn to combine biological, cultural, and chemical control methods</li>
            <li><strong>Disease Identification:</strong> Early detection and prevention strategies for common crop diseases</li>
            <li><strong>Pesticide Safety:</strong> Proper handling, application, and storage of crop protection products</li>
            <li><strong>Resistance Management:</strong> Strategies to prevent pest resistance development</li>
            <li><strong>Environmental Stewardship:</strong> Minimizing environmental impact while maximizing crop protection</li>
          </ul>
          
          <h3>Training Format</h3>
          <p>The program offers both theoretical sessions and hands-on field demonstrations. Participants will receive:</p>
          <ul>
            <li>Comprehensive training manuals</li>
            <li>Digital resources and mobile app access</li>
            <li>Certification upon completion</li>
            <li>Ongoing support through our extension services</li>
          </ul>
          
          <h3>Registration</h3>
          <p>Training sessions are conducted monthly at our regional centers. Farmers, agro-dealers, and extension agents can apply through our SSP Training application portal.</p>
        </div>
      `
    },
    "3": {
      id: "3",
      title: "New Agro-Dealer Partnership Network Expansion",
      date: "March 18, 2024",
      author: "James Mwangi, Partnership Manager",
      image: "/public/GalleryPic3.png",
      summary: "AgroNexus expands its network of certified agro-dealers to improve farmer access to quality inputs and expert advice.",
      content: `
        <div class="prose max-w-none">
          <p>We are excited to announce the expansion of our certified agro-dealer network, bringing quality agricultural inputs and expert advice closer to farming communities.</p>
          
          <h3>Network Benefits</h3>
          <p>Our certified agro-dealers provide:</p>
          <ul>
            <li>Genuine crop protection products</li>
            <li>Technical advisory services</li>
            <li>Soil testing and analysis</li>
            <li>Customized farming solutions</li>
            <li>Access to financing options</li>
          </ul>
          
          <h3>Quality Assurance</h3>
          <p>All network partners undergo rigorous certification including:</p>
          <ul>
            <li>Product knowledge training</li>
            <li>Customer service excellence programs</li>
            <li>Regular quality audits</li>
            <li>Continuous education on new technologies</li>
          </ul>
          
          <h3>Finding Your Local Dealer</h3>
          <p>Farmers can locate their nearest certified agro-dealer through our online portal or mobile application. Each dealer is equipped with the latest information on crop protection recommendations and seasonal farming calendars.</p>
          
          <h3>Becoming a Partner</h3>
          <p>Agricultural input dealers interested in joining our network can apply through our agro-dealer application portal. We provide comprehensive support including training, marketing materials, and technical backup.</p>
        </div>
      `
    }
  };

  const article = newsArticles[id as keyof typeof newsArticles];

  if (!article) {
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
              src={article.image} 
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6 space-x-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{article.author}</span>
              </div>
            </div>
          </div>
          
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </Layout>
  );
};

export default NewsDetailPage;
