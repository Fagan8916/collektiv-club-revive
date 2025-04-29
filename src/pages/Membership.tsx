
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MembershipSection from "@/components/MembershipSection";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

const Membership = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-blue">Membership Benefits</h1>
              <p className="text-xl text-gray-700">
                Discover all the advantages of joining our community and find the perfect membership option for you.
              </p>
            </div>
          </div>
        </section>

        {/* Membership Plans */}
        <MembershipSection />

        {/* Benefits in Detail */}
        <section className="section bg-white" id="benefits">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">Why Join COLLEKTIV.CLUB?</h2>
              <p className="section-subtitle">
                Here's a closer look at what makes our community special and the benefits you'll receive as a member.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h600v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3ENetworking Events%3C/text%3E%3C/svg%3E" 
                  alt="Networking Events" 
                  className="rounded-xl shadow-lg"
                />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-collektiv-blue">Exclusive Events & Networking</h3>
                <p className="text-gray-700 mb-4">
                  Access members-only events, workshops, and networking opportunities 
                  designed to help you connect with industry leaders and like-minded professionals.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Monthly networking mixers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Quarterly professional development workshops</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Annual member conference</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Industry-specific meetups</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4 text-collektiv-blue">Knowledge & Resources</h3>
                <p className="text-gray-700 mb-4">
                  Gain access to our extensive library of resources, courses, and expert content 
                  designed to help you grow personally and professionally.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Digital content library with hundreds of resources</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Exclusive online courses and webinars</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Monthly industry reports and insights</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Expert-led masterclasses</span>
                  </li>
                </ul>
              </div>
              
              <div className="order-1 md:order-2">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23dbeafe'/%3E%3Cpath d='M0 0h600v400H0z' fill='%232563eb' fill-opacity='.2'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%231e3a8a' text-anchor='middle' dominant-baseline='middle'%3EKnowledge Resources%3C/text%3E%3C/svg%3E" 
                  alt="Knowledge Resources" 
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section bg-gray-50" id="faq">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Find answers to common questions about our membership options and benefits.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {[
                {
                  q: "How do I join COLLEKTIV.CLUB?",
                  a: "Joining is easy! Simply click the 'Join Now' button, select your preferred membership plan, and complete the registration process. Once approved, you'll receive access to all member benefits based on your chosen plan."
                },
                {
                  q: "Can I upgrade my membership later?",
                  a: "Absolutely! You can upgrade your membership at any time. When you upgrade, you'll immediately gain access to all the additional benefits of your new plan."
                },
                {
                  q: "Are there any commitment periods?",
                  a: "Our memberships are available on both monthly and annual plans. Annual plans come with a discount compared to paying monthly. You can cancel anytime, but we do not offer refunds for unused portions of paid membership periods."
                },
                {
                  q: "How do I access member-only content?",
                  a: "After joining, you'll receive login credentials to our member portal where you can access all digital resources, event information, and networking opportunities."
                },
              ].map((item, i) => (
                <div key={i} className="mb-6 bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3 text-collektiv-blue">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/contact" className="btn-secondary inline-flex items-center">
                Have More Questions? Contact Us
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Membership;
