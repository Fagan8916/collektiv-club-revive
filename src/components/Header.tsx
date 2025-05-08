import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAssetPath, BASE_PATH } from "@/utils/assetUtils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Membership", href: "/membership" },
  { name: "Insights", href: "/insights" },
  { name: "Founders", href: "/founders" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Function to scroll to top when navigating
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // For debugging
  console.log("Logo path:", getAssetPath("/lovable-uploads/f8c8ddc0-f08b-4fd1-88ba-d214d1af74b4.png"));

  return (
    <header
      className={cn(
        "fixed w-full top-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center"
          onClick={scrollToTop}
        >
          <img 
            src={getAssetPath("/lovable-uploads/f8c8ddc0-f08b-4fd1-88ba-d214d1af74b4.png")} 
            alt="the Collektiv Club" 
            className="h-12"
            onError={(e) => {
              console.error("Error loading logo:", e);
              e.currentTarget.onerror = null;
              e.currentTarget.src = `${BASE_PATH}/lovable-uploads/f8c8ddc0-f08b-4fd1-88ba-d214d1af74b4.png`;
            }}
          />
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 hover:text-collektiv-green font-medium transition-colors"
              onClick={scrollToTop}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/membership" 
            className="btn-primary"
            onClick={scrollToTop}
          >
            Join Now
          </Link>
        </div>

        <button
          className="lg:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-300 pt-20",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container flex flex-col space-y-6 py-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 hover:text-collektiv-green text-xl font-medium transition-colors"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToTop();
              }}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/membership"
            className="btn-primary w-full text-center mt-6"
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToTop();
            }}
          >
            Join Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
