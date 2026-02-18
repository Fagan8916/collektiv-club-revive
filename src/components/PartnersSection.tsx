
import React from "react";
import { ExternalLink } from "lucide-react";
import { getAssetPath } from "@/utils/assetUtils";

const partners = [
  {
    name: "SwissEP",
    href: "https://swissep.org/",
    logo: "lovable-uploads/swissep-logo.svg",
    description:
      "Swiss Entrepreneurship Program strengthens startup ecosystems globally by sharing knowledge and connections through their network of experienced founders, investors, and experts.",
  },
  {
    name: "Plug and Play",
    href: "https://www.plugandplaytechcenter.com/",
    logo: "lovable-uploads/Plug-n-Play-logo.webp",
    description:
      "One of the world's largest innovation platforms, accelerating startups and connecting them with leading corporations across 40+ global locations.",
  },
];

const PartnersSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-collektiv-dark to-collektiv-darkTeal">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
            Our Partners
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            We collaborate with world-class organisations to bring the best opportunities to our members.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-all"
            >
              <div className="h-16 flex items-center justify-center">
                <img
                  src={getAssetPath(partner.logo)}
                  alt={partner.name}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                {partner.description}
              </p>
              <span className="text-collektiv-green text-sm inline-flex items-center gap-1 group-hover:underline">
                Visit Website <ExternalLink size={14} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
