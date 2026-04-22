import React from "react";
import { Link } from "react-router-dom";
import { Megaphone, ArrowRight, Sparkles } from "lucide-react";

type Announcement = {
  id: string;
  badge: string;
  title: string;
  description: string;
  href: string;
  cta?: string;
};

// Edit this list to update the home announcements ribbon.
// Newest first. Keep 1–3 items for best visual balance.
const announcements: Announcement[] = [
  {
    id: "webel-live",
    badge: "New Investment",
    title: "Webel is now open to members",
    description:
      "Review the deal memo, watch the founder walkthrough, and express interest before allocation closes.",
    href: "/members/investments/webel",
    cta: "View opportunity",
  },
];

const MemberAnnouncements: React.FC = () => {
  if (announcements.length === 0) return null;

  return (
    <section aria-label="Member announcements" className="space-y-3">
      <div className="flex items-center gap-2">
        <Megaphone className="h-4 w-4 text-collektiv-green" />
        <h2 className="font-playfair text-lg font-bold text-collektiv-dark">
          Announcements
        </h2>
      </div>

      <div className="space-y-3">
        {announcements.map((a) => (
          <Link
            key={a.id}
            to={a.href}
            className="group block rounded-2xl border border-collektiv-green/30 bg-gradient-to-br from-collektiv-green/10 via-white to-white p-4 shadow-sm transition-all hover:shadow-md hover:border-collektiv-green/60"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5 rounded-full bg-collektiv-green/15 p-2">
                <Sparkles className="h-4 w-4 text-collektiv-green" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center rounded-full bg-collektiv-green text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 mb-1.5">
                  {a.badge}
                </div>
                <h3 className="text-sm font-bold text-collektiv-dark leading-snug">
                  {a.title}
                </h3>
                <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                  {a.description}
                </p>
                <div className="mt-2 inline-flex items-center text-xs font-semibold text-collektiv-green group-hover:text-collektiv-lightgreen transition-colors">
                  {a.cta ?? "Learn more"}
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MemberAnnouncements;
