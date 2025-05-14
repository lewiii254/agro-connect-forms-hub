
import Layout from "@/components/layout/Layout";
import TeamMemberCard, { TeamMember } from "@/components/about/TeamMemberCard";

const AboutPage = () => {
  // Team members data with contact information
  const teamMembers: TeamMember[] = [
    {
      name: "Eric Muriithi",
      position: "Chief Executive Officer",
      bio: "With over 15 years of experience in agricultural extension services, Jane leads our organization's mission to connect farmers with the resources they need.",
      contacts: {
        facebook: "https://facebook.com/Eric Muriithi",
        instagram: "https://instagram.com/muriithieric_official",
        email: "mailto:ericmuriithi012@gmail.com",
        whatsapp: "https://wa.me/254768276671"
      },
      image: "/SirEric.png"
    },
    {
      name: "Qabale Halkano Galgalo",
      position: "Director of Training",
      bio: "Qabale oversees all training programs, ensuring that our certification meets international standards and provides real value to participants.",
      contacts: {
        facebook: "https://facebook.com/Qabale Halkano",
        instagram: "https://instagram.com/Qabale Halkano",
        email: "mailto:qabalehalkano26@gmail.com",
        whatsapp: "https://wa.me/254745170583"
      },
      image: "/Qabale.png"
    },
    {
      name: "Eliezer Nduati",
      position: "Extension Services Manager",
      bio: "Eliezer coordinates our field operations, working directly with farmers to implement sustainable agricultural practices.",
      contacts: {
        facebook: "https://facebook.com/Eliezer Nduati",
        instagram: "https://instagram.com/Eliezer Nduati",
        email: "mailto:eliezerinduati@gmail.com",
        whatsapp: "https://wa.me/254742991839"
      },
      image: "/Nduati.png"
    },
    {
      name: "Grace Nyambura",
      position: "Office Administration",
      bio: "Grace provides technical expertise on crop management and soil health, developing practical solutions for local farming challenges.",
      contacts: {
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
        email: "mailto:gw273933@gmail.com",
        whatsapp: "https://wa.me/254799551856"
      },
      image: "/Grace.png"
    },
    {
      name: "Claire Wangui",
      position: "Trainer & Consultant ",
      bio: "Claire builds relationships with local farming communities, ensuring our programs address their actual needs and circumstances.",
      contacts: {
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/Claire_2249",
        email: "mailto:wanguiclaire406@gmail.com",
        whatsapp: "https://wa.me/254758371332"
      },
      image: "/Claire.png"
    },
    {
      name: "Mark Kyalo",
      position: "Agricultural Finance Specialist",
      bio: "Mark helps farmers access financial services and develop sustainable business models for their agricultural enterprises.",
      contacts: {
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/@trippletacker",
        email: "mailto:markkyalo824@gmail.com",
        whatsapp: "https://wa.me/254115378301"
      },
      image: "/KyaloM.png"
    },
    {
      name: "Kevin Jackson",
      position: "Training Program Developer",
      bio: "Grace designs our agricultural training programs, drawing on the latest research and best practices in sustainable farming.",
      contacts: {
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/@jacktren014",
        email: "mailto:vjacktren@gmail.com",
        whatsapp: "https://wa.me/254723008409"
      },
      image: "/Jackson.png"
    },
    {
      name: "Marklewis Mutugi",
      position: "ICT & SYSTEMS MANAGER",
      bio: "Marklewis identifies and implements appropriate agricultural technologies that can help small-scale farmers increase their productivity.",
      contacts: {
        facebook: "https://facebook.com/LewiiiTheeG",
        instagram: "https://instagram.com/LewiiiTheeG",
        email: "mailto: ngondimarklewis@gmail.com",
        whatsapp: "https://wa.me/254790767347"
      },
      image: "/Marklewis2.jpg"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-agro-blue py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4">ABOUT US</h1>
        </div>
      </div>

      {/* About Content with Maize Farm Image */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <img
              src="Corn_Maize-Farming-in-Mexico1.jpg" 
              alt="Maize farm field"
              className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
            />
            
            <h2 className="text-4xl font-bold text-agro-green text-center mb-8">
              Connecting Farmers for Growth
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700">
              <p>
                Agro-Nexus Limited, an agricultural services provider, facilitating connections between farmers and agribusiness dealers.
              </p>
              
              <p>
                We support sustainable agriculture through training, certification programs, and extension services.
              </p>
              
              <p>
                As a trusted partner, we help farmers enhance productivity and achieve shared success.
              </p>
            </div>
          </div>
          
          {/* Our Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-agro-lightgreen p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-agro-green mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To enhance agricultural productivity through innovative training, quality certification, and responsive extension services, ensuring sustainable practices across the agricultural value chain.
              </p>
            </div>
            
            <div className="bg-agro-lightblue p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-agro-blue mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To be the leading agricultural service provider, fostering a network of skilled professionals who contribute to food security, environmental sustainability, and economic growth in the agricultural sector.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">Our Leadership Team</h2>
            <div className="w-24 h-1 bg-agro-green mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-agro-blue text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Partner With Us Today</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our network of agricultural professionals and benefit from our comprehensive training and extension services.
          </p>
          <a 
            href="/applications" 
            className="inline-block px-8 py-4 bg-agro-orange text-white font-bold rounded-md hover:bg-opacity-90 transition-colors text-lg"
          >
            Apply For Our Services
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
