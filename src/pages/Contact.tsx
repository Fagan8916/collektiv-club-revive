
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-blue">Contact Us</h1>
              <p className="text-xl text-gray-700">
                We'd love to hear from you. Reach out with questions, feedback, or inquiries.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactSection />

        {/* Map Section - Placeholder */}
        <section className="section bg-white">
          <div className="container">
            <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-bold text-collektiv-blue mb-2">Location Map</h3>
                <p className="text-gray-600">
                  Interactive map would be displayed here showing the office location.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
