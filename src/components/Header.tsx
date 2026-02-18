
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, ChevronRight, Users, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/utils/assetUtils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Membership", href: "/membership" },
  { name: "Events", href: "/events" },
  { name: "Insights", href: "/insights" },
  { name: "Founders", href: "/founders" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
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
                  ? "bg-collektiv-green text-white"
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
          <button 
            onClick={() => setJoinDialogOpen(true)}
            className="bg-collektiv-green text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-collektiv-lightgreen transition-all duration-300 flex items-center gap-1 shadow-sm"
          >
            Join Now <ChevronRight size={16} />
          </button>
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
                  ? "bg-collektiv-green text-white"
                  : "text-collektiv-gray hover:text-collektiv-dark hover:bg-gray-50"
              )}
              onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
            >
              {item.name}
            </Link>
          ))}
          <button
            className="bg-collektiv-green text-white text-center py-3 rounded-full font-semibold mt-4 w-full"
            onClick={() => { setMobileMenuOpen(false); setJoinDialogOpen(true); }}
          >
            Join Now
          </button>
          
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
      {/* Join Now Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="bg-collektiv-dark border-white/10 text-white max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-bold text-white">Get Started</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 p-6 pt-2">
            <a
              href="https://airtable.com/appWGyTHcjHMgZrUz/pagHdPVxVwljspHTq/form"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              onClick={() => setJoinDialogOpen(false)}
            >
              <div className="w-10 h-10 bg-collektiv-green rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Become a Member</p>
                <p className="text-sm text-white/50">Apply to join our investor community</p>
              </div>
            </a>
            <a
              href="https://zcal.co/collektiv/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              onClick={() => setJoinDialogOpen(false)}
            >
              <div className="w-10 h-10 bg-collektiv-green rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Book a Discovery Call</p>
                <p className="text-sm text-white/50">15-min intro call with our team</p>
              </div>
            </a>
            <a
              href="https://airtable.com/appWGyTHcjHMgZrUz/pagTxXOeZJ2McNFHZ/form"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              onClick={() => setJoinDialogOpen(false)}
            >
              <div className="w-10 h-10 bg-collektiv-green rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Submit a Founder Pitch Deck</p>
                <p className="text-sm text-white/50">Share your startup with our investors</p>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
