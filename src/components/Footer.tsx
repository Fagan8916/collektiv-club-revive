
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const basePath = import.meta.env.BASE_URL || '';

  return (
    <footer className="bg-collektiv-dark text-white pt-16 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <span className="font-display text-2xl font-bold text-white">Collektiv</span>
              <p className="text-collektiv-green text-xs mt-1">The Collektiv Revolution</p>
            </div>
            <p className="mb-4 text-white/50 text-sm leading-relaxed">
              A community of like-minded individuals dedicated to growth, 
              connection, and collective success.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/collektiv_club/?igsh=Y2liY2t5azM4MDFt" className="text-white/40 hover:text-collektiv-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/collektiv-club/" className="text-white/40 hover:text-collektiv-green transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/membership", label: "Membership" },
                { to: "/events", label: "Events" },
                { to: "/insights", label: "Insights" },
                { to: "/calculator", label: "Investment Calculator" },
                { to: "/contact", label: "Contact" },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} onClick={scrollToTop} className="text-white/40 hover:text-collektiv-green text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Membership</h3>
            <ul className="space-y-2">
              {[
                { to: "/membership#why-join-the-collektiv-club", label: "Benefits" },
                { to: "/membership#membership", label: "Pricing" },
                { to: "/membership", label: "Join Now" },
                { to: "/membership#faq", label: "FAQ" },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} onClick={scrollToTop} className="text-white/40 hover:text-collektiv-green text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={14} className="mr-2 text-collektiv-green" />
                <a href="mailto:info@collektiv.club" className="text-white/40 hover:text-collektiv-green text-sm transition-colors">
                  info@collektiv.club
                </a>
              </li>
              <li className="text-white/40 pt-2 text-sm">
                4th Floor, 4 Tabernacle Street<br />
                London, United Kingdom, EC2A 4LU
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/30 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Collektiv Ltd. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" onClick={scrollToTop} className="text-white/30 hover:text-collektiv-green text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" onClick={scrollToTop} className="text-white/30 hover:text-collektiv-green text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-white/20">
            Investing in early-stage businesses involves significant risks, including illiquidity, lack of dividends, loss of investment, and dilution. These opportunities are intended exclusively for high-net-worth individuals and sophisticated investors who understand these risks (<Link to="/hnwi-si" onClick={scrollToTop} className="underline">See here for more details</Link>). Capital is at risk. Please seek independent financial advice if you are unsure about investing
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
