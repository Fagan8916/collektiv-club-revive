
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
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-blue">About The Collektiv Club</h1>
              <p className="text-xl text-gray-700">
                With over 30 years of combined experience working with top organisations, we bring a deep understanding of market growth, strategic business development, and financial expertise. This experience gives us the insight to identify high-potential opportunities and the trusted network to access them early.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-collektiv-blue">Our Mission</h2>
                <p className="text-gray-700 mb-6">
                  Revolutionising tech investing through our commitment to sourcing great opportunities, low fees, high transparency, and continuous investor education.
                </p>
                <p className="text-gray-700">
                  We believe that when like-minded individuals collaborate and connect, 
                  incredible things happen. Our platform facilitates meaningful connections, 
                  provides valuable resources, and fosters an environment of continuous growth.
                </p>
              </div>
              
              <div className="bg-collektiv-blue/5 p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-6 text-collektiv-blue">Our Vision</h2>
                <p className="text-gray-700 mb-6">
                  We believe investing in technology start-ups should be accessible to all investors, not just a select few. We set out to break down barriers and empower people.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-collektiv-lightblue mr-3 flex-shrink-0 mt-0.5" />
                    <span>Building bridges between industries and disciplines</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-collektiv-lightblue mr-3 flex-shrink-0 mt-0.5" />
                    <span>Democratizing access to knowledge and opportunities</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-collektiv-lightblue mr-3 flex-shrink-0 mt-0.5" />
                    <span>Creating a supportive ecosystem for personal and professional growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Team</h2>
              <p className="section-subtitle">
                Meet the dedicated individuals behind The Collektiv Club who work tirelessly 
                to create value for our community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="/lovable-uploads/ee4627e1-0e02-4963-a56a-4d5df5163b91.png"
                    alt="Manon" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Manon Ligato</h3>
                <p className="text-collektiv-lightblue mb-3">Co-Founder</p>
                <p className="text-gray-600">
                  Manon has a proven track record of identifying high-potential companies and successfully scaling their market presence and revenue from the ground up. She has held pivotal leadership roles at Orange, HP, Gartner, Workday, Watershed, and Peakon, where she played a key role in driving market expansion, revenue growth, and go-to-market strategies. At Peakon, she was instrumental in generating over $10 million in new business, solidifying her reputation as a high-impact growth strategist.
                </p>
                <p className="text-gray-600 mt-3">
                  With deep expertise in go-to-market strategy, business development, and global expansion, Manon has helped numerous organisations unlock their full potential and achieve sustainable growth. Her ability to build and execute revenue strategies, identify market opportunities, and scale businesses across industries makes her a key player in driving startup success and market leadership.
                </p>
                <p className="text-gray-600 mt-3">
                  Now, as a co-founder of Collektiv Club, Manon leverages her industry expertise and strategic vision to identify, support, and invest in the next generation of high-growth startups. She is passionate about backing visionary founders, accelerating early-stage companies, and providing hands-on guidance to drive long-term success.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="/lovable-uploads/58f95d67-a157-412c-a285-e0f7f7ba625b.png"
                    alt="Ryan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Ryan Fagan</h3>
                <p className="text-collektiv-lightblue mb-3">Co-Founder</p>
                <p className="text-gray-600">
                  As a seasoned sales and leadership professional with over 15 years of experience in Go-to-Market (GTM) strategies, Ryan has navigated multiple SaaS journeys, guiding companies from early stages to significant growth milestones. Notably, Ryan was part of a successful SaaS journey that culminated in a remarkable exit exceeding $700 million.
                </p>
                <p className="text-gray-600 mt-3">
                  Beyond operational roles, Ryan has also established a strong track record as an angel investor, backing numerous startups with strategic guidance and capital. This blend of operational expertise and investment acumen positions Ryan as a valuable partner for early-stage companies seeking to scale effectively.
                </p>
                <p className="text-gray-600 mt-3">
                  With a deep understanding of what drives growth and success in the SaaS sector, Ryan brings a unique perspective to our angel syndicate, helping identify and support promising startups on their path to achieving scalable and sustainable growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Values</h2>
              <p className="section-subtitle">
                The core principles that guide everything we do at The Collektiv Club.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-gray-200 rounded-lg hover:border-collektiv-blue hover:shadow-md transition-all">
                <h3 className="text-xl font-bold mb-3 text-collektiv-blue">United We Rise</h3>
                <p className="text-gray-600">
                  We believe in the power of collaboration, working closely with startups, investors, and industry experts to create mutually beneficial opportunities. By combining our strengths and expertise, we achieve greater success and drive innovation forward together.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg hover:border-collektiv-blue hover:shadow-md transition-all">
                <h3 className="text-xl font-bold mb-3 text-collektiv-blue">Champion Changemakers</h3>
                <p className="text-gray-600">
                  We stand behind those who are making a positive impact through their work, providing them with the resources, support, and platform they need to drive meaningful change. By championing changemakers, we empower them to innovate, disrupt, and solve some of the world's most pressing challenges, creating a better future for all.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg hover:border-collektiv-blue hover:shadow-md transition-all">
                <h3 className="text-xl font-bold mb-3 text-collektiv-blue">Data Drives Us</h3>
                <p className="text-gray-600">
                  We rely on data and analytics to inform our investment decisions, ensuring that our strategies are evidence-based and effective. We prioritise evidence-based decision-making over intuition alone.
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
