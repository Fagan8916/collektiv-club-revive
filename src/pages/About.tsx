
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-blue">About The Collektiv Club</h1>
              <p className="text-xl text-gray-700">
                Learn more about our mission, vision, and the community that makes us special.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-collektiv-blue">Our Mission</h2>
                <p className="text-gray-700 mb-6">
                  The Collektiv Club was founded with a simple yet powerful mission: to create a 
                  community where ambitious individuals can come together, share knowledge, 
                  and support each other on their journey to success.
                </p>
                <p className="text-gray-700">
                  We believe that when like-minded individuals collaborate and connect, 
                  incredible things happen. Our platform facilitates meaningful connections, 
                  provides valuable resources, and fosters an environment of continuous growth.
                </p>
              </div>
              
              <div className="bg-collektiv-blue/5 p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-6 text-collektiv-blue">Our Vision</h2>
                <p className="text-gray-700 mb-6">
                  We envision a world where success is not defined by competition but by 
                  collaboration. Where professionals from all walks of life can find their 
                  tribe and thrive together.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-collektiv-lightblue mr-3 flex-shrink-0 mt-0.5" />
                    <span>Building bridges between industries and disciplines</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-collektiv-lightblue mr-3 flex-shrink-0 mt-0.5" />
                    <span>Democratizing access to knowledge and opportunities</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-collektiv-lightblue mr-3 flex-shrink-0 mt-0.5" />
                    <span>Creating a supportive ecosystem for personal and professional growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Team</h2>
              <p className="section-subtitle">
                Meet the dedicated individuals behind The Collektiv Club who work tirelessly 
                to create value for our community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="/public/lovable-uploads/540d3588-f37f-46c5-b02f-9f3a90db2559.png"
                    alt="Manon" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Manon Delaigue</h3>
                <p className="text-collektiv-lightblue mb-3">Co-Founder</p>
                <p className="text-gray-600">
                  Previously Deloitte Ventures, supporting growth strategies for technology startups and establishing strategic partnerships. MBA from Hult International Business School in San Francisco.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23E3FBF8'/%3E%3Cpath d='M0 0h200v200H0z' fill='%2300815D' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%2300815D' text-anchor='middle' dominant-baseline='middle'%3ERyan%3C/text%3E%3C/svg%3E"
                    alt="Ryan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Ryan Mitchell</h3>
                <p className="text-collektiv-lightblue mb-3">Co-Founder</p>
                <p className="text-gray-600">
                  Angel investor and advisor with 16+ years in the Cloud, DevOps, and Cyber Security sectors. Holds certifications in AWS, Microsoft Azure, and ITILv4. Previous CFO of UK private equity business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Values</h2>
              <p className="section-subtitle">
                The core principles that guide everything we do at The Collektiv Club.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Transparency",
                  description: "We maintain honest, open communication with investors, founders, and community members."
                },
                {
                  title: "Accessibility",
                  description: "We believe in lowering barriers to entry for quality investments."
                },
                {
                  title: "Community",
                  description: "We foster a supportive, engaged network of like-minded individuals."
                },
                {
                  title: "Education",
                  description: "We empower through knowledge-sharing and continuous learning."
                }
              ].map((value, i) => (
                <div key={i} className="p-6 border border-gray-200 rounded-lg hover:border-collektiv-blue hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-collektiv-blue/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-collektiv-blue font-bold">{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-collektiv-blue">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
