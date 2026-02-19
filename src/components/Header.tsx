
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
    <>
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
            className={cn("lg:hidden relative z-[70]", mobileMenuOpen ? "text-white" : "text-collektiv-dark")}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu - OUTSIDE header to avoid stacking context issues */}
      <div
        className={cn(
          "fixed inset-0 bg-collektiv-dark z-[60] lg:hidden transition-transform duration-300 pt-20 overflow-y-auto",
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
                  : "text-white/70 hover:text-white hover:bg-white/10"
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
                  className="text-white/70 text-lg flex items-center gap-2 px-4"
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
        <DialogContent className="bg-gradient-to-br from-[#0c1a2e] via-collektiv-dark to-[#0a1628] border border-white/[0.08] text-white max-w-xl p-0 gap-0 overflow-hidden rounded-2xl shadow-2xl shadow-black/60">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-collektiv-green/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-collektiv-green/5 rounded-full blur-3xl pointer-events-none" />
          
          <DialogHeader className="p-8 pb-3 relative">
            <p className="text-collektiv-green text-xs font-semibold uppercase tracking-[0.2em] mb-1">The Collektiv</p>
            <DialogTitle className="text-2xl font-display font-bold text-white">Get Started</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 px-8 pb-8 pt-1 relative">
            {[
              {
                href: "https://airtable.com/appWGyTHcjHMgZrUz/pagHdPVxVwljspHTq/form",
                icon: Users,
                title: "Become a Member",
                desc: "Apply to join our investor community",
              },
              {
                href: "https://zcal.co/collektiv/15min",
                icon: Calendar,
                title: "Book a Discovery Call",
                desc: "15-min intro call with our team",
              },
              {
                href: "https://airtable.com/appWGyTHcjHMgZrUz/pagTxXOeZJ2McNFHZ/form",
                icon: FileText,
                title: "Submit a Founder Pitch Deck",
                desc: "Share your startup with our investors",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.08] hover:border-collektiv-green/30 hover:shadow-lg hover:shadow-collektiv-green/5 transition-all duration-300 group"
                  onClick={() => setJoinDialogOpen(false)}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-collektiv-green to-collektiv-green/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-collektiv-green/20 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[15px] text-white group-hover:text-collektiv-green transition-colors duration-300">{item.title}</p>
                    <p className="text-sm text-white/40 mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-collektiv-green group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                </a>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
