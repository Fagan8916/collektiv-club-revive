
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MembershipSection from "@/components/MembershipSection";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";

const Membership = () => {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real implementation, you'd send this to your backend
    console.log("Subscribing email:", email);
    toast({
      title: "Thank you for subscribing to our newsletter",
      description: "Please add Info@collektiv.club to your contacts",
      duration: 5000,
    });
    setEmail("");
  };
  
  const faqs = [
    {
      q: "Does the Collektiv Club invest in each opportunity?",
      a: "Yes, the Collektiv club and its founders personally invest in every opportunity."
    },
    {
      q: "How do I join the Collektiv Club?",
      a: "Joining is easy! Simply click the 'Join Now' button, select your preferred membership plan, and complete the registration process. Once approved, you'll receive access to all member benefits based on your chosen plan."
    },
    {
      q: "What are the investment fees?",
      a: "Our fees vary by membership tier: VIP members pay 0% Investment fee, Premium members pay 4%, and Trial members pay 12.5%. There are no Annual Investment fees or Carry/Performance fees across all tiers."
    },
    {
      q: "What is KYC and why is it included?",
      a: "KYC (Know Your Customer) is a verification process required for financial investments. We include the £100 KYC cost in our VIP and Premium memberships to make the investment process smoother for our members."
    },
    {
      q: "How do I access member-only content?",
      a: "After joining, you'll receive an invite to our community where you can access all digital resources, event information, and investment opportunities."
    },
    {
      q: "Is there a minimum investment amount?",
      a: "Yes, our minimum investment is £500 per deal. This allows more people to start investing in early-stage companies without requiring large sums of capital."
    },
    {
      q: "What types of companies do you invest in?",
      a: "We focus primarily on technology startups with strong growth potential, particularly those eligible for EIS and SEIS tax benefits. Our investment committee carefully vets all opportunities before presenting them to our members."
    },
    {
      q: "How do these fees compare to other similar groups?",
      a: "Collektiv offers highly competitive fees compared to traditional angel syndicates. While traditional syndicates typically charge 2-15% investment fees, we charge only 0-12.5% depending on your membership tier. For performance/carry fees, syndicates typically charge 20%, while we charge 0%. Annual investment fees for syndicates range from 0-10%, while ours are always 0%. Regarding membership costs, our fees cap at £985 per annum, while syndicate memberships can run up to £10,000 per annum. Don't take our word for it, <a href=\"https://www.perplexity.ai/search/give-me-a-breakdown-of-the-ave-NluXPHO.Tmm2zFG_DM8jaw#0\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-collektiv-blue hover:underline\">ask Perplexity about typical fees</a>."
    },
    {
      q: "How many investment opportunities will I see?",
      a: "We present 6-12 investment opportunities per year. We believe in quality over quantity and thoroughly vet each opportunity before offering it to our members."
    },
    {
      q: "Do you charge to pitch?",
      a: "No, we do not charge an upfront fee to pitch to our members however, we do charge a success fee of 8% of the total funds raised to support our operational costs, including SPV creation."
    },
    {
      q: "What happens after I invest?",
      a: "After investing, you'll receive formal documentation confirming your investment. You'll also get regular updates about the companies you've invested in through our investor portal."
    },
    {
      q: "Do I need to be based in the UK to join?",
      a: "No, we welcome members from around the world. However, some investment opportunities may have geographic restrictions, and tax benefits like EIS/SEIS are only available to UK taxpayers."
    },
    {
      q: "What support do I get as a member?",
      a: "All members receive access to our community platform, educational resources, and investment opportunities. Premium and VIP members get additional benefits including access to our Founder and Member Slack Community and priority access to certain deals."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-collektiv-accent to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-green">Membership Benefits</h1>
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
              <h2 className="section-title" id="why-join-the-collektiv-club">Why Join the Collektiv Club?</h2>
              <p className="section-subtitle">
                Here's a closer look at what makes our community special and the benefits you'll receive as a member.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Investment Opportunities" 
                  className="rounded-xl shadow-lg h-64 w-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-collektiv-green">Investment Opportunities</h3>
                <p className="text-gray-700 mb-4">
                  Gain access to curated investment opportunities and expert insights to help grow your portfolio.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Curated EIS & SEIS investment opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Expert evaluation and vetting process</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>You're in full control, you decide what to invest in</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Preferential investment terms for members</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Regular investment updates and portfolio tracking</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4 text-collektiv-green">Exclusive Insights, Events & Networking</h3>
                <p className="text-gray-700 mb-4">
                  Access members-only events, workshops, and networking opportunities 
                  designed to help you connect with industry leaders and like-minded professionals.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Monthly insights newsletter</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Quarterly network events</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>In person pitch days</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Industry-specific meetups</span>
                  </li>
                </ul>
              </div>
              
              <div className="order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1540304453527-62f9d01a6c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Networking Events" 
                  className="rounded-xl shadow-lg h-64 w-full object-cover"
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
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-xl font-bold text-collektiv-green text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600" dangerouslySetInnerHTML={{ __html: faq.a }}>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
