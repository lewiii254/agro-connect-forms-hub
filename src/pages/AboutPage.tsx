
import Layout from "@/components/layout/Layout";
import { Facebook, Instagram, Mail, Smartphone } from "lucide-react";

// Contact icon component for consistent styling
const ContactIcon = ({ children, href, label }: { children: React.ReactNode; href: string; label: string }) => (
  <a 
    href={href} 
    aria-label={label}
    className="text-agro-blue hover:text-agro-green transition-colors"
    target="_blank" 
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const AboutPage = () => {
  // Team members data with contact information
  const teamMembers = [
    {
      name: "Jane Doe",
      position: "Chief Executive Officer",
      bio: "With over 15 years of experience in agricultural extension services, Jane leads our organization's mission to connect farmers with the resources they need.",
      contacts: {
        facebook: "https://facebook.com/jane.doe",
        instagram: "https://instagram.com/jane.doe",
        email: "mailto:jane.doe@agronexus.com",
        whatsapp: "https://wa.me/254700000001"
      }
    },
    {
      name: "John Smith",
      position: "Director of Training",
      bio: "John oversees all training programs, ensuring that our certification meets international standards and provides real value to participants.",
      contacts: {
        facebook: "https://facebook.com/john.smith",
        instagram: "https://instagram.com/john.smith",
        email: "mailto:john.smith@agronexus.com",
        whatsapp: "https://wa.me/254700000002"
      }
    },
    {
      name: "Alice Johnson",
      position: "Extension Services Manager",
      bio: "Alice coordinates our field operations, working directly with farmers to implement sustainable agricultural practices.",
      contacts: {
        facebook: "https://facebook.com/alice.johnson",
        instagram: "https://instagram.com/alice.johnson",
        email: "mailto:alice.johnson@agronexus.com",
        whatsapp: "https://wa.me/254700000003"
      }
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
              src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=987&q=80" // maize/corn field, you can use your own custom maize photo if desired
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-agro-blue mb-1">{member.name}</h3>
                  <p className="text-agro-green font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 mb-4">
                    {member.bio}
                  </p>
                  
                  {/* Contact icons */}
                  <div className="flex space-x-4 mt-3">
                    <ContactIcon href={member.contacts.facebook} label={`${member.name}'s Facebook`}>
                      <Facebook size={20} />
                    </ContactIcon>
                    <ContactIcon href={member.contacts.instagram} label={`${member.name}'s Instagram`}>
                      <Instagram size={20} />
                    </ContactIcon>
                    <ContactIcon href={member.contacts.email} label={`Email ${member.name}`}>
                      <Mail size={20} />
                    </ContactIcon>
                    <ContactIcon href={member.contacts.whatsapp} label={`${member.name}'s WhatsApp`}>
                      <Smartphone size={20} />
                    </ContactIcon>
                  </div>
                </div>
              </div>
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
