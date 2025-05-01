
import React from "react";
import { Mail, MapPin } from "lucide-react";

const ContactSection = () => {
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

        <div className="max-w-4xl mx-auto">
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
                  <MapPin className="h-6 w-6 text-collektiv-green" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Book Time with Us</h4>
                  <a 
                    href="https://zcal.co/collektiv/15min" 
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
