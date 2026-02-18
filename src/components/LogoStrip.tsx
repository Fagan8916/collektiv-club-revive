
import React from "react";
import { Link } from "react-router-dom";
import { getAssetPath } from "@/utils/assetUtils";

const logos = [
  {
    name: "Anthropic",
    type: "image" as const,
    src: "lovable-uploads/anthropic-logo.png",
  },
  {
    name: "be/impact",
    type: "image" as const,
    src: "lovable-uploads/beimpact-logo.jpg",
  },
  {
    name: "Propane",
    type: "image" as const,
    src: "lovable-uploads/8429af36-140a-4fc4-a401-e12fd22d19cc.png",
  },
  {
    name: "Webel",
    type: "image" as const,
    src: "lovable-uploads/webel-logo.png",
  },
  {
    name: "Loxa",
    type: "image" as const,
    src: "lovable-uploads/7b1277a2-292c-4e86-ae2a-8dcae7fa5781.png",
  },
  {
    name: "Pandektes",
    type: "image" as const,
    src: "lovable-uploads/2801fd4b-1d50-485c-a999-0695274f5f05.png",
  },
];

const allLogos = [...logos, ...logos];

const LogoStrip = () => {
  return (
    <section className="py-12 bg-muted/50 border-y border-border overflow-hidden">
      <div className="container mb-6">
        <Link to="/portfolio" className="block">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest hover:text-collektiv-green transition-colors">
            Our Portfolio
          </p>
        </Link>
      </div>
      <div className="relative">
        <div className="flex items-center gap-16 animate-scroll-left">
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 hover:opacity-80 transition-all duration-300"
            >
              <img
                src={getAssetPath(logo.src)}
                alt={logo.name}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
