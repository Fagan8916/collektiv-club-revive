
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const partners = [
  {
    name: "SwissEP",
    href: "https://swissep.org/",
    description:
      "SwissEP is a leading Swiss entrepreneurship programme connecting founders with investors and mentors. They foster innovation across Europe through structured accelerator programmes and networking events.",
  },
  {
    name: "Plug and Play Tech Center",
    href: "https://www.plugandplaytechcenter.com/",
    description:
      "Plug and Play is one of the world's largest innovation platforms, accelerating startups and connecting them with leading corporations. Their global network spans 40+ locations and has backed companies like Dropbox, PayPal, and LendingClub.",
  },
];

const Partnerships = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-collektiv-dark to-collektiv-darkTeal text-primary-foreground">
          <div className="container text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Our Partners
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              We collaborate with world-class organisations to bring the best
              opportunities, insights, and connections to our members.
            </p>
          </div>
        </section>

        {/* Partner Cards */}
        <section className="py-20 bg-background">
          <div className="container max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="rounded-2xl border border-border bg-card p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl font-bold text-collektiv-dark tracking-tight">
                    {partner.name}
                  </span>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {partner.description}
                  </p>
                  <Button asChild variant="outline" className="w-fit mt-2">
                    <a
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Visit Website <ExternalLink size={16} />
                    </a>
                  </Button>
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

export default Partnerships;
