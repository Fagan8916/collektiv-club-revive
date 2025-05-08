import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { getImagePath } from "@/utils/assetUtils";

const Footer = () => {
  const [imageError, setImageError] = useState(false);
  
  // Function to scroll to top when navigating through Link component
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Image path for logo
  const logoPath = "/lovable-uploads/f2fa4572-ad28-4141-9d35-e83e2d2d4660.png";
  const imageSrc = getImagePath(logoPath);
  const fallbackImage = "https://placehold.co/200x60/ffffff/1a1a1a?text=COLLEKTIV.CLUB";
  
  // Handle image loading errors
  const handleImageError = () => {
    console.log("Footer logo failed to load, using fallback");
    setImageError(true);
  };

  return (
    <footer className="bg-collektiv-green text-white pt-16 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <img 
                src={imageError ? fallbackImage : imageSrc}
                alt="The Collektiv Club" 
                className="h-12"
                onError={handleImageError}
              />
            </div>
            <p className="mb-4 text-green-100">
              A community of like-minded individuals dedicated to growth, 
              connection, and collective success.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/collektiv_club/?igsh=Y2liY2t5azM4MDFt" className="text-green-100 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/collektiv-club/" className="text-green-100 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-green-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop} className="text-green-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/membership" onClick={scrollToTop} className="text-green-100 hover:text-white transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/insights" onClick={scrollToTop} className="text-green-100 hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/calculator" onClick={scrollToTop} className="text-green-100 hover:text-white transition-colors">
                  Investment Calculator
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="text-green-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Membership</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/membership#why-join-the-collektiv-club" onClick={scrollToTop} className="text-green-100 hover:text-white transition-colors">
                  Benefits
                </Link>
              </li>
              <li>
                <Link to="/membership#membership" onClick={scrollToTop} className="text-green-100 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/membership" onClick={scrollToTop} className="text-green-100 hover:text-white transition-colors">
                  Join Now
                </Link>
              </li>
              <li>
                <Link to="/membership#faq" onClick={scrollToTop} className="text-green-100 hover:text-white transition-colors">
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
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-100 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Collektiv Ltd. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" onClick={scrollToTop} className="text-green-100 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" onClick={scrollToTop} className="text-green-100 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-green-200">
            Investing in early-stage businesses involves significant risks, including illiquidity, lack of dividends, loss of investment, and dilution. These opportunities are intended exclusively for high-net-worth individuals and sophisticated investors who understand these risks (<Link to="/hnwi-si" onClick={scrollToTop} className="underline">See here for more details</Link>). Capital is at risk. Please seek independent financial advice if you are unsure about investing
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
