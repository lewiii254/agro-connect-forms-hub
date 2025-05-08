
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import AgroDealerForm from "@/components/forms/AgroDealerForm";

const AgroDealerApplicationPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-agro-orange py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Agro-dealer Training Application</h1>
          <p className="text-white max-w-3xl mx-auto">
            Apply for our comprehensive training program designed specifically for agricultural input dealers.
          </p>
        </div>
      </div>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-agro-blue mb-6 text-center">Agro-dealer Training Application Form</h2>
            <p className="text-gray-600 mb-8 text-center">
              Please fill out the form below to apply for our agro-dealer training program. All fields marked with an asterisk (*) are required.
            </p>
            
            <AgroDealerForm />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">Why Choose Our Agro-dealer Training?</h2>
            <div className="w-24 h-1 bg-agro-orange mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-agro-lightorange rounded-full flex items-center justify-center text-agro-orange mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-agro-blue mb-2">Industry-Recognized Certification</h3>
              <p className="text-gray-600">
                Receive a certification that is recognized throughout the agricultural industry.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-agro-lightorange rounded-full flex items-center justify-center text-agro-orange mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-agro-blue mb-2">Business Growth Opportunities</h3>
              <p className="text-gray-600">
                Learn strategies to expand your agro-dealer business and increase profitability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-agro-lightorange rounded-full flex items-center justify-center text-agro-orange mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-agro-blue mb-2">Networking Opportunities</h3>
              <p className="text-gray-600">
                Connect with suppliers, manufacturers, and other agro-dealers in your region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">What Our Trainees Say</h2>
            <div className="w-24 h-1 bg-agro-orange mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-agro-orange rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold text-agro-blue">Ann Njeru</h3>
                  <p className="text-gray-600 text-sm">Agro-dealer, Central Region</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The training provided practical knowledge that I could immediately apply to my business. My customer base has grown by 30% since implementing what I learned."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-agro-orange rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold text-agro-blue">Stephen Ndwiga</h3>
                  <p className="text-gray-600 text-sm">Farm Supply Store Owner, Eastern Region</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The product knowledge I gained has made a huge difference in how I advise farmers. They trust my recommendations more, and I've seen repeat business increase significantly."
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AgroDealerApplicationPage;
