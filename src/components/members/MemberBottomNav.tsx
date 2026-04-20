import React from "react";
import { Home, Users, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type MemberTab = "home" | "directory" | "investments" | "profile";

interface MemberBottomNavProps {
  active: MemberTab;
  onChange: (tab: MemberTab) => void;
}

const items: { id: MemberTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "directory", label: "Directory", icon: Users },
  { id: "investments", label: "Investments", icon: TrendingUp },
  { id: "profile", label: "Profile", icon: User },
];

const MemberBottomNav: React.FC<MemberBottomNavProps> = ({ active, onChange }) => {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 bg-collektiv-dark/95 backdrop-blur-md border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
      aria-label="Member navigation"
    >
      <ul className="flex items-stretch justify-around max-w-3xl mx-auto px-2 py-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <li key={item.id} className="flex-1">
              <button
                onClick={() => onChange(item.id)}
                className={cn(
                  "w-full flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg transition-colors",
                  isActive
                    ? "text-collektiv-green"
                    : "text-white/60 hover:text-white"
                )}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isActive && "scale-110"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium tracking-wide",
                    isActive && "font-semibold"
                  )}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MemberBottomNav;
