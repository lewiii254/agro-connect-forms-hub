
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const ApplicationsPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-agro-blue py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4">APPLICATIONS</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Choose the application form for the service you're interested in.
          </p>
        </div>
      </div>

      {/* Application Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* SSP Training Application Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="bg-agro-green h-3"></div>
              <div className="p-6">
                <div className="w-20 h-20 bg-agro-lightgreen rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-12 w-12 text-agro-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-agro-green mb-4">SSP Training Application</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Apply for specialized training in safe pesticide application techniques and get certified as a Spray Service Provider.
                </p>
                <div className="text-center">
                  <Link
                    to="/applications/ssp-training"
                    className="inline-block px-6 py-3 bg-agro-green text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Agro-dealer Training Application Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="bg-agro-orange h-3"></div>
              <div className="p-6">
                <div className="w-20 h-20 bg-agro-lightorange rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-12 w-12 text-agro-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-agro-orange mb-4">Agro-dealer Training Application</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Apply for training designed specifically for agricultural input dealers to improve product knowledge and customer service.
                </p>
                <div className="text-center">
                  <Link
                    to="/applications/agro-dealers"
                    className="inline-block px-6 py-3 bg-agro-orange text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Extension Services Application Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="bg-agro-blue h-3"></div>
              <div className="p-6">
                <div className="w-20 h-20 bg-agro-lightblue rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-12 w-12 text-agro-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-agro-blue mb-4">Extension Services Application</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Apply for agricultural extension services tailored to your specific farming needs and challenges.
                </p>
                <div className="text-center">
                  <Link
                    to="/applications/extension-services"
                    className="inline-block px-6 py-3 bg-agro-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">Application Process</h2>
            <div className="w-24 h-1 bg-agro-green mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our straightforward application process ensures you can quickly apply for the services you need.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-agro-blue rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  1
                </div>
                <h3 className="text-xl font-bold text-center text-agro-blue mb-2">Submit Application</h3>
                <p className="text-gray-600 text-center">
                  Complete and submit the online application form for your desired service.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-agro-green rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  2
                </div>
                <h3 className="text-xl font-bold text-center text-agro-green mb-2">Application Review</h3>
                <p className="text-gray-600 text-center">
                  Our team will review your application and contact you for any additional information.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-agro-orange rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  3
                </div>
                <h3 className="text-xl font-bold text-center text-agro-orange mb-2">Service Delivery</h3>
                <p className="text-gray-600 text-center">
                  Once approved, we'll schedule and deliver the requested service at the agreed time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-agro-green mx-auto mb-6"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agro-blue mb-2">How long does the application process take?</h3>
              <p className="text-gray-700">
                Typically, applications are reviewed within 3-5 business days. You'll receive a confirmation email once your application has been processed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agro-blue mb-2">Are there any prerequisites for the training programs?</h3>
              <p className="text-gray-700">
                Some training programs may have basic prerequisites, such as prior experience or specific educational backgrounds. Details are provided in each application form.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agro-blue mb-2">Do you offer group discounts for training?</h3>
              <p className="text-gray-700">
                Yes, we offer special rates for groups of five or more participants. Please indicate the number of participants in your application form.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agro-blue mb-2">What areas do you serve?</h3>
              <p className="text-gray-700">
                We currently operate in most agricultural regions nationally, with plans to expand our services. If you're unsure whether we serve your area, please contact us directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-agro-blue text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Choose the application that best suits your needs from the options above.
          </p>
          <p className="text-lg mb-4">
            Have questions? We're here to help!
          </p>
          <a 
            href="mailto:info@agro-nexus.com" 
            className="inline-block px-8 py-4 bg-agro-orange text-white font-bold rounded-md hover:bg-opacity-90 transition-colors text-lg"
          >
            Contact Us
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default ApplicationsPage;
