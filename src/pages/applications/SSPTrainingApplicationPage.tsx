
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SSPTrainingForm from "@/components/forms/SSPTrainingForm";

const SSPTrainingApplicationPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-agro-green py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">SSP Training Application</h1>
          <p className="text-white max-w-3xl mx-auto">
            Apply for our specialized Spray Service Provider training program.
          </p>
        </div>
      </div>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-agro-blue mb-6 text-center">SSP Training Application Form</h2>
            <p className="text-gray-600 mb-8 text-center">
              Please fill out the form below to apply for our SSP training program. All fields marked with an asterisk (*) are required.
            </p>
            
            <SSPTrainingForm />
          </div>
        </div>
      </section>

      {/* About SSP Training */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-agro-blue mb-4">About SSP Training</h2>
              <div className="w-24 h-1 bg-agro-green mx-auto mb-6"></div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-agro-green mb-4">What is an SSP?</h3>
              <p className="text-gray-700 mb-6">
                A Spray Service Provider (SSP) is a trained and certified individual who provides professional pesticide application services to farmers. SSPs are equipped with the knowledge and skills to safely and effectively apply pesticides, helping farmers protect their crops while minimizing health and environmental risks.
              </p>
              
              <h3 className="text-2xl font-bold text-agro-green mb-4">Why Become an SSP?</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Gain a marketable skill and create income opportunities</li>
                <li>Provide a valuable service to your community</li>
                <li>Contribute to safer and more effective pest management</li>
                <li>Receive professional certification recognized in the agricultural sector</li>
                <li>Access to ongoing support and advanced training opportunities</li>
              </ul>
              
              <h3 className="text-2xl font-bold text-agro-green mb-4">Training Curriculum</h3>
              <p className="text-gray-700 mb-4">
                Our comprehensive SSP training program covers:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Pesticide safety and responsible handling</li>
                <li>Proper application techniques and equipment calibration</li>
                <li>Pest identification and management</li>
                <li>Environmental protection measures</li>
                <li>Record keeping and business management</li>
                <li>Personal protective equipment (PPE) use and maintenance</li>
              </ul>
              
              <h3 className="text-2xl font-bold text-agro-green mb-4">Certification Process</h3>
              <p className="text-gray-700">
                Upon successful completion of the training program and passing the assessment, participants will receive an official SSP certification. This certification demonstrates your competence to provide safe and effective pesticide application services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agro-blue mb-4">Training Details</h2>
            <div className="w-24 h-1 bg-agro-green mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agro-green mb-4">Duration and Format</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-agro-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Duration:</strong> 5-day intensive training</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-agro-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span><strong>Location:</strong> Training centers in various regions (specific location confirmed after application approval)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-agro-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span><strong>Format:</strong> Combination of classroom instruction, practical demonstrations, and hands-on field activities</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agro-green mb-4">What to Bring</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-agro-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Notebook and writing materials</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-agro-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Appropriate clothing for field work (long sleeves, long pants, closed shoes)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-agro-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Any existing PPE you may have (if available)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-agro-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Identification document</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SSPTrainingApplicationPage;
