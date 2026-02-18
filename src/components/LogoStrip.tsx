
import React from "react";
import { getAssetPath } from "@/utils/assetUtils";

const logos = [
  {
    name: "Anthropic",
    href: "https://www.anthropic.com/",
    type: "text" as const,
  },
  {
    name: "be/impact",
    href: "https://beimpact.co.uk/",
    type: "image" as const,
    src: "lovable-uploads/beimpact-logo.jpg",
  },
  {
    name: "Propane",
    href: "https://usepropane.ai/",
    type: "image" as const,
    src: "lovable-uploads/8429af36-140a-4fc4-a401-e12fd22d19cc.png",
  },
  {
    name: "Webel",
    href: "https://appwebel.com/",
    type: "image" as const,
    src: "lovable-uploads/webel-logo.png",
  },
];

const LogoStrip = () => {
  return (
    <section className="py-12 bg-muted/50 border-y border-border">
      <div className="container">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
          Our Network
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {logos.map((logo) => (
            <a
              key={logo.name}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              {logo.type === "image" ? (
                <img
                  src={getAssetPath(logo.src!)}
                  alt={logo.name}
                  className="h-10 md:h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-2xl md:text-3xl font-semibold text-collektiv-dark tracking-tight">
                  {logo.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
