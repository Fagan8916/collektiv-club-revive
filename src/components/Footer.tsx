
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-collektiv-green text-white pt-16 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <img 
                src="/public/lovable-uploads/f59750eb-4fb9-47da-9010-aab8815d041a.png" 
                alt="COLLEKTIV" 
                className="h-12"
              />
            </div>
            <p className="mb-4 text-green-100">
              A community of like-minded individuals dedicated to growth, 
              connection, and collective success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-green-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-green-100 hover:text-white transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-green-100 hover:text-white transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-green-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Membership</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/membership#benefits" className="text-green-100 hover:text-white transition-colors">
                  Benefits
                </Link>
              </li>
              <li>
                <Link to="/membership#pricing" className="text-green-100 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-green-100 hover:text-white transition-colors">
                  Join Now
                </Link>
              </li>
              <li>
                <Link to="/membership#faq" className="text-green-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@collektiv.club" className="text-green-100 hover:text-white transition-colors">
                  info@collektiv.club
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+11234567890" className="text-green-100 hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-100 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} COLLEKTIV.CLUB. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-green-100 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-green-100 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
