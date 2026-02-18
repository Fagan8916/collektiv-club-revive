
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/utils/assetUtils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Membership", href: "/membership" },
  { name: "Events", href: "/events" },
  { name: "Insights", href: "/insights" },
  { name: "Founders", href: "/founders" },
  { name: "Partnerships", href: "/partnerships" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, loading, signOut } = useAuth();
  const logoPath = getAssetPath("lovable-uploads/f8c8ddc0-f08b-4fd1-88ba-d214d1af74b4.png");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMemberZoneClick = () => {
    if (loading) return;
    navigate(isAuthenticated ? "/members" : "/login");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={cn(
        "fixed w-full top-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-white/90 backdrop-blur-sm py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={scrollToTop}>
          <span className="text-[10px] text-collektiv-green font-medium leading-tight hidden sm:block">The Collektiv<br/>Revolution</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={scrollToTop}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                isActive(item.href)
                  ? "bg-collektiv-dark text-white"
                  : "text-collektiv-gray hover:text-collektiv-dark hover:bg-gray-100"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="hidden lg:flex items-center gap-3">
          {!loading && (
            isAuthenticated ? (
              <>
                <Link 
                  to="/members" 
                  className="flex items-center gap-2 text-sm text-collektiv-dark border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <User size={16} /> Member Zone
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>Log out</Button>
              </>
            ) : (
              <button
                onClick={handleMemberZoneClick}
                className="flex items-center gap-2 text-sm text-collektiv-dark border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                <User size={16} /> Member Zone
              </button>
            )
          )}
          <Link 
            to="/membership" 
            onClick={scrollToTop}
            className="bg-collektiv-green text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-collektiv-lightgreen transition-all duration-300 flex items-center gap-1 shadow-sm"
          >
            Join Now <ChevronRight size={16} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-collektiv-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-300 pt-20",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container flex flex-col space-y-4 py-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-lg font-medium transition-colors px-4 py-2 rounded-lg",
                isActive(item.href)
                  ? "bg-collektiv-dark text-white"
                  : "text-collektiv-gray hover:text-collektiv-dark hover:bg-gray-50"
              )}
              onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/membership"
            className="bg-collektiv-green text-white text-center py-3 rounded-full font-semibold mt-4"
            onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
          >
            Join Now
          </Link>
          
          {!loading && (
            isAuthenticated ? (
              <>
                <Link
                  to="/members"
                  className="text-collektiv-dark text-lg flex items-center gap-2 px-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={20} /> Member Zone
                </Link>
                <Button variant="ghost" onClick={() => { setMobileMenuOpen(false); handleLogout(); }}>Log out</Button>
              </>
            ) : (
              <Button variant="outline" className="rounded-full" onClick={() => { setMobileMenuOpen(false); handleMemberZoneClick(); }}>
                Member Zone
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
