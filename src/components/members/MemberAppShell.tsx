import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MemberBottomNav, { MemberTab } from "./MemberBottomNav";

interface MemberAppShellProps {
  title: string;
  activeTab: MemberTab;
  onTabChange: (tab: MemberTab) => void;
  showBack?: boolean;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
  avatarUrl?: string | null;
  initials?: string;
  onAvatarClick?: () => void;
  onLogout?: () => void;
  isAdmin?: boolean;
  children: React.ReactNode;
}

const MemberAppShell: React.FC<MemberAppShellProps> = ({
  title,
  activeTab,
  onTabChange,
  showBack = false,
  onBack,
  rightSlot,
  avatarUrl,
  initials = "M",
  onAvatarClick,
  onLogout,
  isAdmin = false,
  children,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) return onBack();
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-collektiv-dark text-white flex flex-col">
      {/* Sticky App Header */}
      <header className="sticky top-0 z-40 bg-collektiv-dark/95 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-2 min-w-0">
            {showBack ? (
              <button
                onClick={handleBack}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            ) : (
              <Avatar
                className="h-8 w-8 cursor-pointer ring-1 ring-white/20"
                onClick={onAvatarClick}
              >
                {avatarUrl && <AvatarImage src={avatarUrl} alt={initials} />}
                <AvatarFallback className="bg-collektiv-green text-white text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
            )}
            <h1 className="font-playfair text-lg font-semibold truncate">
              {title}
            </h1>
            {isAdmin && (
              <span className="ml-2 text-[10px] uppercase tracking-wider bg-yellow-500 text-black px-1.5 py-0.5 rounded font-semibold">
                Admin
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {rightSlot}
            {onLogout && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="text-white/70 hover:text-white hover:bg-white/10 h-9 w-9"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 pb-24 bg-gradient-to-br from-collektiv-accent via-white to-green-50 text-collektiv-dark">
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <MemberBottomNav active={activeTab} onChange={onTabChange} isAdmin={isAdmin} />
    </div>
  );
};

export default MemberAppShell;
