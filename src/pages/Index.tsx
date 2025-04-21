import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
// Import Lucide icons that best match the reference
import { Shield, PersonStanding, Sprout, Home } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection
        title="AGRO-NEXUS LTD"
        subtitle="Precision, Safety, Progress."
        description="We provide training, certification, and extension services for the agricultural industry."
        buttonText="Explore Our Services"
        buttonLink="/services"
        bgColor="bg-agro-blue"
      />

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* SSP Training Card */}
            <ServiceCard
              title="SSP TRAINING CERTIFICATION"
              description="Specialized training and certification for safe pesticide application."
              icon={
                <Shield size={48} color="#fff" strokeWidth={2.5} />
              }
              linkTo="/applications/ssp-training"
              bgColorClass="bg-agro-green"
            />

            {/* Agro Dealers Card */}
            <ServiceCard
              title="AGRO DEALERS TRAINING & CERTIFICATION"
              description="Educational programs tailored for agricultural dealers."
              icon={
                <PersonStanding size={48} color="#fff" strokeWidth={2.5} />
              }
              linkTo="/applications/agro-dealers"
              bgColorClass="bg-agro-orange"
            />

            {/* Extension Services Card */}
            <ServiceCard
              title="EXTENSION SERVICES"
              description="Support and advice for specific farming activities."
              icon={
                <Sprout size={48} color="#fff" strokeWidth={2.5} />
              }
              linkTo="/applications/extension-services"
              bgColorClass="bg-agro-blue"
            />

            {/* Farm Visits Card */}
            <ServiceCard
              title="FARM VISITS & TOUR PLANNING"
              description="Organizing educational tours to farms."
              icon={
                <Home size={48} color="#fff" strokeWidth={2.5} />
              }
              linkTo="/services"
              bgColorClass="bg-agro-orange"
            />
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">About Us</h2>
            <div className="w-24 h-1 bg-agro-green mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                AGRO-NEXUS LTD is an agriculture organization providing strategic, certification, and extension services for the agricultural industry. We support sustainable agriculture through training, certification programs, and extension services.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                As a trusted partner, we help farmers enhance productivity and achieve shared success.
              </p>
              <div className="mt-6">
                <Link 
                  to="/about" 
                  className="inline-block px-6 py-3 bg-agro-green text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/a00aba65-a5e6-4dae-8b02-630a83457614.png" 
                alt="Agricultural field with corn" 
                className="rounded-lg shadow-lg w-full object-cover h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-agro-blue text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Agricultural Skills?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Apply for our training programs today and take the next step in your agricultural career.</p>
          <Link 
            to="/applications" 
            className="inline-block px-8 py-4 bg-agro-orange text-white font-bold rounded-md hover:bg-opacity-90 transition-colors text-lg"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
