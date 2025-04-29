
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const Join = () => {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("");

  const plans = [
    {
      name: "Basic",
      price: "$29",
      period: "per month",
      description: "Essential benefits for individuals starting their journey with us.",
      features: [
        "Access to online community",
        "Monthly digital newsletter",
        "Member-only content library",
        "Discounted event tickets",
      ],
      highlighted: false,
    },
    {
      name: "Premium",
      price: "$99",
      period: "per month",
      description: "Advanced benefits for professionals seeking deeper engagement.",
      features: [
        "Everything in Basic plan",
        "Weekly mastermind sessions",
        "1-on-1 mentorship opportunities",
        "Priority access to events",
        "Exclusive workshops and courses",
        "Featured member profile"
      ],
      highlighted: true,
    },
  ];

  const handlePlanSelect = (planName: string) => {
    setPlan(planName);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    setStep(3);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-center space-x-4">
                <div className={`flex flex-col items-center ${step >= 1 ? "text-collektiv-blue" : "text-gray-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? "bg-collektiv-blue text-white" : "bg-gray-200 text-gray-500"}`}>
                    1
                  </div>
                  <span className="text-sm">Select Plan</span>
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? "bg-collektiv-blue" : "bg-gray-200"}`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? "text-collektiv-blue" : "text-gray-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? "bg-collektiv-blue text-white" : "bg-gray-200 text-gray-500"}`}>
                    2
                  </div>
                  <span className="text-sm">Your Details</span>
                </div>
                <div className={`w-16 h-1 ${step >= 3 ? "bg-collektiv-blue" : "bg-gray-200"}`}></div>
                <div className={`flex flex-col items-center ${step >= 3 ? "text-collektiv-blue" : "text-gray-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? "bg-collektiv-blue text-white" : "bg-gray-200 text-gray-500"}`}>
                    3
                  </div>
                  <span className="text-sm">Complete</span>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div>
              {step === 1 && (
                <div>
                  <h1 className="text-3xl font-bold text-center mb-8 text-collektiv-blue">
                    Select Your Membership Plan
                  </h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {plans.map((planOption, index) => (
                      <div 
                        key={index}
                        className={`rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer ${
                          planOption.highlighted 
                            ? "bg-white border-2 border-collektiv-blue shadow-lg"
                            : "bg-white shadow-md"
                        }`}
                        onClick={() => handlePlanSelect(planOption.name)}
                      >
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{planOption.name}</h3>
                          <div className="mb-4">
                            <span className="text-4xl font-bold text-collektiv-blue">{planOption.price}</span>
                            <span className="text-gray-500 ml-1">{planOption.period}</span>
                          </div>
                          <p className="text-gray-600 mb-6">{planOption.description}</p>
                          
                          <div className="space-y-3 mb-8">
                            {planOption.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <button
                            className={`w-full text-center block py-3 px-4 rounded-md font-medium transition-colors ${
                              planOption.highlighted
                                ? "bg-collektiv-blue text-white hover:bg-collektiv-lightblue"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            Select {planOption.name} Plan
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <p className="text-gray-500">
                      Need a corporate plan? <a href="/contact" className="text-collektiv-blue hover:underline">Contact us</a> for custom solutions.
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h1 className="text-3xl font-bold text-center mb-8 text-collektiv-blue">
                    Complete Your Registration
                  </h1>
                  <p className="text-center mb-8 text-gray-600">
                    You've selected the <span className="font-bold">{plan}</span> plan. Now, please provide your information to create your account.
                  </p>

                  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-blue"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-blue"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-blue"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                        <input
                          type="password"
                          id="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-blue"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Confirm Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-blue"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="company" className="block text-gray-700 mb-1">Company (Optional)</label>
                      <input
                        type="text"
                        id="company"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-collektiv-blue"
                      />
                    </div>

                    <div className="mb-8">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          className="mt-1"
                          required
                        />
                        <span className="ml-2 text-gray-700">
                          I agree to the <a href="/terms" className="text-collektiv-blue hover:underline">Terms of Service</a> and <a href="/privacy" className="text-collektiv-blue hover:underline">Privacy Policy</a>
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-collektiv-blue text-white rounded-md hover:bg-collektiv-lightblue transition-colors"
                      >
                        Complete Registration
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h1 className="text-3xl font-bold mb-4 text-collektiv-blue">
                    Registration Complete!
                  </h1>
                  <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                    Thank you for joining COLLEKTIV.CLUB! We've sent a confirmation email with your account details.
                    Please check your inbox to verify your email address.
                  </p>
                  <a
                    href="/"
                    className="btn-primary inline-block"
                  >
                    Return to Homepage
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Join;
