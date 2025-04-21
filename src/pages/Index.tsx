
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";

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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              }
              linkTo="/applications/ssp-training"
              bgColorClass="bg-agro-green"
            />

            {/* Agro Dealers Card */}
            <ServiceCard
              title="AGRO DEALERS TRAINING & CERTIFICATION"
              description="Educational programs tailored for agricultural dealers."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              linkTo="/applications/agro-dealers"
              bgColorClass="bg-agro-orange"
            />

            {/* Extension Services Card */}
            <ServiceCard
              title="EXTENSION SERVICES"
              description="Support and advice for specific farming activities."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              linkTo="/applications/extension-services"
              bgColorClass="bg-agro-blue"
            />

            {/* Farm Visits Card */}
            <ServiceCard
              title="FARM VISITS & TOUR PLANNING"
              description="Organizing educational tours to farms."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
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
