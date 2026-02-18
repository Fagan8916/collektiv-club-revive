
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAssetPath } from "@/utils/assetUtils";
import { ExternalLink } from "lucide-react";

const investments = [
  {
    name: "Anthropic",
    slug: "anthropic",
    logo: "lovable-uploads/anthropic-logo.png",
    href: "https://www.anthropic.com/",
    description:
      "Anthropic is a leading AI safety company building reliable, interpretable, and steerable AI systems. Founded by former OpenAI researchers, they are the creators of Claude, one of the world's most capable AI assistants.",
  },
  {
    name: "Propane AI",
    slug: "propane",
    logo: "lovable-uploads/8429af36-140a-4fc4-a401-e12fd22d19cc.png",
    href: "https://usepropane.ai/",
    description:
      "Propane AI is building the first always-on customer intelligence platform for product and go-to-market teams. Based in Copenhagen, they raised pre-seed funding backed by the founder of Lovable.dev.",
  },
  {
    name: "Loxa Cover",
    slug: "loxa",
    logo: "lovable-uploads/7b1277a2-292c-4e86-ae2a-8dcae7fa5781.png",
    href: "https://www.loxacover.com/",
    description:
      "Loxa Cover is a London-based insurtech startup on a strong growth trajectory. Led by Jamie Harper, a founder with a successful previous exit, the company is innovating in the insurance technology space.",
  },
  {
    name: "be/impact",
    slug: "beimpact",
    logo: "lovable-uploads/beimpact-logo.jpg",
    href: "https://beimpact.co.uk/",
    description:
      "be/impact is a B2B SaaS platform revolutionising corporate training through a teach-to-learn model that delivers 300% better learning outcomes alongside measurable social impact.",
  },
  {
    name: "Pandektes",
    slug: "pandektes",
    logo: "lovable-uploads/2801fd4b-1d50-485c-a999-0695274f5f05.png",
    href: "https://pandektes.com/",
    description:
      "Pandektes is a Copenhagen-based legal tech company we invested in early. They have scaled significantly with strong continued growth in the legal technology sector.",
  },
  {
    name: "Webel",
    slug: "webel",
    logo: "lovable-uploads/webel-logo.png",
    href: "https://appwebel.com/",
    description:
      "Webel is Spain's leading on-demand home-services marketplace connecting vetted professionals with homeowners. With strong unit economics and high customer retention, they are expanding across Europe.",
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-collektiv-dark to-collektiv-darkTeal text-primary-foreground">
          <div className="container text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
              Our Portfolio
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              A curated selection of VC-backed startups we've invested in alongside our members.
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 bg-collektiv-dark">
          <div className="container max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {investments.map((inv) => (
                <div
                  key={inv.slug}
                  className="rounded-2xl border border-gray-200 bg-[#f3f5f5] p-6 flex flex-col items-center text-center gap-4 hover:shadow-lg transition-all"
                >
                  <div className="h-14 flex items-center justify-center">
                    <img
                      src={getAssetPath(inv.logo)}
                      alt={inv.name}
                      className="max-h-14 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-collektiv-dark">{inv.name}</h3>
                  <p className="text-collektiv-gray text-sm leading-relaxed flex-1">
                    {inv.description}
                  </p>
                  <a
                    href={inv.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-collektiv-green hover:underline text-sm inline-flex items-center gap-1"
                  >
                    Visit Website <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
