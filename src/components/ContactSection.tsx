
import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted");
    // In a real implementation, this would send data to a server
  };

  return (
    <section className="section bg-gray-50" id="contact">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have questions about membership or want to learn more about the Collektiv Club?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-collektiv-green">
              Contact Information
            </h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-collektiv-green/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-collektiv-green" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email Us</h4>
                  <a 
                    href="mailto:info@collektiv.club" 
                    className="text-collektiv-lightgreen hover:underline"
                  >
                    info@collektiv.club
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-collektiv-green/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-collektiv-green" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Call Us</h4>
                  <a 
                    href="tel:+441244456357" 
                    className="text-collektiv-lightgreen hover:underline"
                  >
                    +44 1244 456357
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-collektiv-green/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-collektiv-green" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Book Time with Us</h4>
                  <a 
                    href="https://calendly.com/collektiv-club/introductory-meeting" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-collektiv-lightgreen hover:underline"
                  >
                    Schedule a Meeting
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-collektiv-green">
                Send Us a Message
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-green"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-green"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-green"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-green"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full flex justify-center items-center"
              >
                Send Message
                <Send size={18} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
