
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-agro-blue py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4">SERVICES</h1>
        </div>
      </div>

      {/* Services Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">Our Agricultural Services</h2>
            <div className="w-24 h-1 bg-agro-green mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We offer comprehensive training, certification, and extension services to support agricultural development and sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Service 1: SSP Training */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-agro-green mb-4">SSP Training and Certification</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Specialized training and certification for SSPs (Spray Service Providers) to ensure safe and effective pesticide application.
                </p>
                <ul className="text-gray-700 space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comprehensive safety training for pesticide handling</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Proper application techniques and equipment calibration</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Internationally recognized certification</span>
                  </li>
                </ul>
                <Link 
                  to="/applications/ssp-training" 
                  className="inline-block px-6 py-3 bg-agro-green text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Apply for SSP Training
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1595870877177-ddd3bfd3b57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="SSP Training" 
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Agro Dealers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-agro-orange mb-4">Agro Dealers Training and Certification</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Educational programs tailored for agricultural input dealers to improve product knowledge and customer service.
                </p>
                <ul className="text-gray-700 space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Product knowledge training (seeds, fertilizers, pesticides)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Business management and customer service skills</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Regulatory compliance and ethical business practices</span>
                  </li>
                </ul>
                <Link 
                  to="/applications/agro-dealers" 
                  className="inline-block px-6 py-3 bg-agro-orange text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Apply for Agro Dealer Training
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Agro Dealer Training" 
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Extension Services */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-agro-blue mb-4">Extension Services to Farmers</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Support and advice for specific farming activities to improve yields and sustainability.
                </p>
                <ul className="text-gray-700 space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>On-farm demonstrations and consultations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Guidance on best agricultural practices</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Problem-solving for specific farming challenges</span>
                  </li>
                </ul>
                <Link 
                  to="/applications/extension-services" 
                  className="inline-block px-6 py-3 bg-agro-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Apply for Extension Services
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Extension Services" 
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 4: Farm Visits */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-agro-orange mb-4">Farm Visits & Tour Planning</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Organizing educational tours to farms for learning and knowledge exchange.
                </p>
                <ul className="text-gray-700 space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Customized farm tour planning and logistics</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Expert guides and informational resources</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-agro-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Networking opportunities with agricultural professionals</span>
                  </li>
                </ul>
                <Link 
                  to="/contact" 
                  className="inline-block px-6 py-3 bg-agro-orange text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Contact Us for Farm Tours
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Farm Visits" 
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-agro-blue text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Apply for our services today and take the next step in improving your agricultural practices.
          </p>
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

export default ServicesPage;
