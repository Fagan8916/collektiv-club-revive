
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/utils/assetUtils";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

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
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const logoPath = getAssetPath("lovable-uploads/f8c8ddc0-f08b-4fd1-88ba-d214d1af74b4.png");

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription?.unsubscribe(); };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

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
            src={logoPath}
            alt="the Collektiv Club" 
            className="h-12"
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
          {user ? (
            <>
              <Link to="/members" className="ml-4 flex items-center text-collektiv-green">
                <User className="mr-1" size={18} /> Members
              </Link>
              <Button variant="ghost" className="ml-2" onClick={handleLogout}>Log out</Button>
            </>
          ) : (
            <Button variant="outline" className="ml-4" onClick={() => navigate("/login")}>
              Log In
            </Button>
          )}
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
          {user ? (
            <>
              <Link
                to="/members"
                className="text-collektiv-green text-lg mt-4 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="mr-1" size={20} /> Members
              </Link>
              <Button variant="ghost" className="mt-2" onClick={handleLogout}>Log out</Button>
            </>
          ) : (
            <Button variant="outline" className="mt-6" onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}>
              Log In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
