
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ExtensionServicesForm from "@/components/forms/ExtensionServicesForm";

const ExtensionServicesApplicationPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-agro-blue py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Extension Services Application</h1>
          <p className="text-white max-w-3xl mx-auto">
            Apply for our agricultural extension services tailored to your farming needs.
          </p>
        </div>
      </div>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-agro-blue mb-6 text-center">Extension Services Application Form</h2>
            <p className="text-gray-600 mb-8 text-center">
              Please fill out the form below to apply for our extension services. All fields marked with an asterisk (*) are required.
            </p>
            
            <ExtensionServicesForm />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">Our Extension Services Include</h2>
            <div className="w-24 h-1 bg-agro-green mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-agro-lightblue rounded-full flex items-center justify-center text-agro-blue mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-agro-blue mb-2">Technical Advice</h3>
              <p className="text-gray-600">
                Expert guidance on crop production, pest management, soil fertility, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-agro-lightblue rounded-full flex items-center justify-center text-agro-blue mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-agro-blue mb-2">Seasonal Planning</h3>
              <p className="text-gray-600">
                Assistance with planning planting, harvesting, and other seasonal activities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-agro-lightblue rounded-full flex items-center justify-center text-agro-blue mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-agro-blue mb-2">Market Linkages</h3>
              <p className="text-gray-600">
                Connections to markets and value chains to improve your farm's profitability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">Farmer Success Stories</h2>
            <div className="w-24 h-1 bg-agro-blue mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agro-blue mb-2">Transforming Maize Production in Eastern Region</h3>
              <p className="text-gray-700 mb-4">
                A group of small-scale farmers in the Eastern Region faced persistent challenges with soil fertility and pest management in their maize fields. After receiving our extension services:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Yields increased by an average of 40% across all farms</li>
                <li>Pest-related losses decreased by 60%</li>
                <li>Soil health improved significantly through improved practices</li>
                <li>Farmers gained access to premium markets, increasing their income</li>
              </ul>
              <p className="text-gray-700 italic">
                "The guidance we received changed everything about how we farm. We're not just producing more; we're farming smarter and more sustainably." - Farmer Cooperative Leader
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-agro-blue mx-auto mb-6"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agro-blue mb-2">How long do extension services typically last?</h3>
              <p className="text-gray-700">
                Our extension services are typically provided over a growing season, but can be customized based on your specific needs. Some farmers work with us for multiple seasons to implement long-term improvements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agro-blue mb-2">Can extension services be provided to farmer groups?</h3>
              <p className="text-gray-700">
                Yes, we offer special packages for farmer groups and cooperatives. This approach is often more cost-effective and enables peer learning among farmers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agro-blue mb-2">What if I need emergency assistance with a crop issue?</h3>
              <p className="text-gray-700">
                We understand that farming challenges don't always follow a schedule. For clients enrolled in our extension services, we offer priority response to urgent issues that arise during the growing season.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ExtensionServicesApplicationPage;
