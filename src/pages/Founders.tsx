import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

const Founders = () => {
  const benefits = [
    "Access to a network of high-net-worth individuals and sophisticated investors",
    "Quick fundraising through a single entity",
    "Reduced administrative burden with streamlined investment process",
    "Strategic advisory from experienced industry professionals",
    "Post-investment support and connections"
  ];

  const process = [
    {
      title: "Initial Screening",
      description: "Submit your business for review. We evaluate your proposition, team, market opportunity, and funding requirements."
    },
    {
      title: "Due Diligence",
      description: "If selected, we conduct a thorough assessment of your business model, financials, market position, and growth potential."
    },
    {
      title: "Investor Presentation",
      description: "Present to our investor community through an online pitch session, showcasing your vision and answering questions."
    },
    {
      title: "Fundraising",
      description: "We handle the investment process, collecting funds and managing the administrative aspects of your raise."
    },
    {
      title: "Ongoing Support",
      description: "Post-investment, we provide strategic guidance, connections, and support to help accelerate your growth."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-r from-collektiv-accent to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-green">For Founders</h1>
              <p className="text-xl text-gray-700 mb-8">
                Raise capital efficiently and access a network of strategic investors committed to your success.
              </p>
              <a
                href="https://airtable.com/appWGyTHcjHMgZrUz/pagTxXOeZJ2McNFHZ/form"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                Submit an Investment Enquiry
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">Why Choose The Collektiv Club</h2>
              <p className="section-subtitle">
                We bring together capital, expertise, and connections to help your startup thrive.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Founder and investors" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-collektiv-green/10 p-2 rounded-full mr-3 mt-1">
                        <Check className="h-4 w-4 text-collektiv-green" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <p className="text-gray-700 mb-6">
                    The Collektiv Club brings together a diverse group of investors with experience across various industries and functions. When you raise with us, you don't just get capital—you get a community invested in your success.
                  </p>
                  <a
                    href="https://airtable.com/appWGyTHcjHMgZrUz/pagTxXOeZJ2McNFHZ/form"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-collektiv-green font-medium inline-flex items-center hover:text-collektiv-lightgreen transition-colors"
                  >
                    Start the conversation
                    <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="section bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Investment Process</h2>
              <p className="section-subtitle">
                A streamlined approach to help you secure funding efficiently.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-10">
                {process.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-collektiv-green text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <a
                  href="https://airtable.com/appWGyTHcjHMgZrUz/pagTxXOeZJ2McNFHZ/form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Submit an Investment Enquiry
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What We Look For */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">What We Look For</h2>
              <p className="section-subtitle">
                Our investment criteria to help ambitious founders scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-all">
                <div className="bg-collektiv-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-collektiv-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Strong Team
                </h3>
                <p className="text-gray-600">
                  Founders with domain expertise, complementary skills, and a track record of execution. We value grit, adaptability, and a deep understanding of the problem being solved.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-all">
                <div className="bg-collektiv-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-collektiv-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Market Opportunity
                </h3>
                <p className="text-gray-600">
                  Products addressing significant market needs with clear growth potential. We focus on scalable solutions in expanding markets with a defensible competitive advantage.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-all">
                <div className="bg-collektiv-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-collektiv-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Traction & Growth
                </h3>
                <p className="text-gray-600">
                  Evidence of market validation through revenue, user growth, or strategic partnerships. We value capital efficiency and a clear path to scalable growth.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <a
                href="https://airtable.com/appWGyTHcjHMgZrUz/pagTxXOeZJ2McNFHZ/form"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Submit Your Startup
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Common questions from founders about working with The Collektiv Club.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">
                    What types of startups do you fund?
                  </h3>
                  <p className="text-gray-600">
                    We focus primarily on technology startups with scalable business models. While we're sector-agnostic, we have particular expertise in SaaS, fintech, health tech, and consumer technology.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">
                    What investment stage do you focus on?
                  </h3>
                  <p className="text-gray-600">
                    We typically invest in pre-seed to Series A rounds, with check sizes ranging from £50,000 to £500,000 per deal.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">
                    What's your typical investment process and timeline?
                  </h3>
                  <p className="text-gray-600">
                    From initial contact to investment, the process typically takes 4-8 weeks. This includes screening, due diligence, investor presentation, and completing the investment round.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">
                    How do you support portfolio companies post-investment?
                  </h3>
                  <p className="text-gray-600">
                    Beyond capital, we provide strategic guidance, connections to potential customers and partners, help with future fundraising, and access to our network of industry experts.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">
                    Do you charge to pitch?
                  </h3>
                  <p className="text-gray-600">
                    No, we do not charge an upfront fee to pitch to our members however, we do charge a success fee of 8% of the total funds raised to support our operational costs, including SPV creation.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <a
                  href="https://airtable.com/appWGyTHcjHMgZrUz/pagTxXOeZJ2McNFHZ/form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Submit an Investment Enquiry
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Founders;
