
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-collektiv-dark to-collektiv-darkTeal">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About The Collektiv Club</h1>
              <p className="text-xl text-white/80">
                With over 30 years of combined experience working with top organisations, we bring a deep understanding of market growth, strategic business development, and financial expertise. This experience gives us the insight to identify high-potential opportunities and the trusted network to access them early.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="section bg-collektiv-dark">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-collektiv-green">Our Mission</h2>
                <p className="text-white/70 mb-6">
                  To empower individuals to invest together in high-potential tech startups by sourcing vetted opportunities, keeping fees low, providing clear information, and supporting continuous investor learning.
                </p>
                <p className="text-white/70">
                  We believe that when like-minded individuals collaborate and connect, 
                  incredible things happen. Our platform facilitates meaningful connections, 
                  provides valuable resources, and fosters an environment of continuous growth.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-6 text-collektiv-green">Our Vision</h2>
                <p className="text-white/70 mb-6">
                  We believe investing in technology start-ups should be accessible to all investors, not just a select few. We set out to break down barriers and empower people.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-collektiv-green mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Building bridges between industries and disciplines</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-collektiv-green mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Democratizing access to knowledge and opportunities</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-collektiv-green mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Creating a supportive ecosystem for personal and professional growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section bg-gradient-to-br from-collektiv-darkTeal to-collektiv-dark">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Our Team</h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Meet the dedicated individuals behind The Collektiv Club who work tirelessly 
                to create value for our community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/5 border border-white/10 p-6 rounded-lg text-center">
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="/lovable-uploads/ee4627e1-0e02-4963-a56a-4d5df5163b91.png"
                    alt="Manon Ligato" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-collektiv-green">Manon Ligato</h3>
                <p className="text-collektiv-green/70 mb-3">Co-Founder</p>
                <p className="text-white/60 text-sm">
                  Manon has a proven track record of identifying high-potential companies and successfully scaling their market presence and revenue from the ground up. She has held pivotal leadership roles at Orange, HP, Gartner, Workday, Watershed, and Peakon, where she played a key role in driving market expansion, revenue growth, and go-to-market strategies.
                </p>
                <p className="text-white/60 text-sm mt-3">
                  Now, as a co-founder of Collektiv Club, Manon leverages her industry expertise and strategic vision to identify, support, and invest in the next generation of high-growth startups.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-lg text-center">
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="/lovable-uploads/03149ce6-7c37-433a-b8b6-422cfba27eca.png"
                    alt="Ryan Fagan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-collektiv-green">Ryan Fagan</h3>
                <p className="text-collektiv-green/70 mb-3">Co-Founder</p>
                <p className="text-white/60 text-sm">
                  As a seasoned sales and leadership professional with over 15 years of experience in Go-to-Market (GTM) strategies, Ryan has navigated multiple SaaS journeys, guiding companies from early stages to significant growth milestones. Notably, Ryan was part of a successful SaaS journey that culminated in a remarkable exit exceeding $700 million.
                </p>
                <p className="text-white/60 text-sm mt-3">
                  With a deep understanding of what drives growth and success in the SaaS sector, Ryan brings a unique perspective to our angel syndicate, helping identify and support promising startups.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-lg text-center">
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/lovable-uploads/kevin-chavanne-white-bg.jpg"
                    alt="Kevin Chavanne" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-collektiv-green">Kevin Chavanne</h3>
                <p className="text-collektiv-green/70 mb-3">Co-Founder</p>
                <p className="text-white/60 text-sm">
                  With over a decade of experience in European venture capital ecosystems, Kevin has a strong track record in identifying, evaluating, and supporting high-potential early-stage companies across Europe. He has held senior investment and leadership roles in the VC space in France, Spain, Denmark, and the Baltics.
                </p>
                <p className="text-white/60 text-sm mt-3">
                  Currently, Kevin is a Venture Partner at Tenity VC, the venture capital arm spun out from the Swiss Stock Exchange Group ecosystem. In parallel, he works alongside the founding team of Collektiv Club.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section bg-collektiv-dark">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                The core principles that guide everything we do at The Collektiv Club.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                <h3 className="text-xl font-bold mb-3 text-collektiv-green">United We Rise</h3>
                <p className="text-white/60">
                  We believe in the power of collaboration, working closely with startups, investors, and industry experts to create mutually beneficial opportunities.
                </p>
              </div>
              
              <div className="p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                <h3 className="text-xl font-bold mb-3 text-collektiv-green">Champion Changemakers</h3>
                <p className="text-white/60">
                  We stand behind those who are making a positive impact through their work, providing them with the resources, support, and platform they need to drive meaningful change.
                </p>
              </div>
              
              <div className="p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                <h3 className="text-xl font-bold mb-3 text-collektiv-green">Data Drives Us</h3>
                <p className="text-white/60">
                  We rely on data and analytics to inform our investment decisions, ensuring that our strategies are evidence-based and effective.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
