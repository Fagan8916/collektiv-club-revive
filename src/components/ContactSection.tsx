
import React from "react";
import { Mail, Calendar } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-collektiv-dark to-collektiv-darkTeal" id="contact">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-collektiv-green text-sm font-medium uppercase tracking-widest mb-3">Get in Touch</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-white">Contact Us</h2>
          <p className="text-white/60 text-lg mb-12">Have questions? We'd love to hear from you.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a 
              href="mailto:info@collektiv.club"
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group text-left"
            >
              <div className="bg-collektiv-green/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-collektiv-green" />
              </div>
              <h4 className="font-bold text-white mb-1">Email Us</h4>
              <p className="text-white/50 text-sm mb-2">Drop us a message anytime</p>
              <span className="text-collektiv-green font-medium text-sm">info@collektiv.club</span>
            </a>

            <a 
              href="https://zcal.co/collektiv/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group text-left"
            >
              <div className="bg-collektiv-green/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-collektiv-green" />
              </div>
              <h4 className="font-bold text-white mb-1">Book a Call</h4>
              <p className="text-white/50 text-sm mb-2">Schedule a 15-minute chat with us</p>
              <span className="text-collektiv-green font-medium text-sm">Schedule a Meeting →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
