
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Calculator = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-collektiv-dark to-collektiv-darkTeal">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Investment Calculator</h1>
              <p className="text-xl text-white/80">
                Calculate your potential investment returns and see the value of investing with The Collektiv Club.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="section bg-collektiv-dark">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe 
                  src="https://knowledge-per-578.preview.series.engineering" 
                  width="100%" 
                  height="800" 
                  frameBorder="0"
                  title="Investment Calculator"
                  className="w-full"
                ></iframe>
              </div>
              
              <div className="mt-12 bg-white/5 border border-white/10 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-collektiv-green">About Our Calculator</h2>
                <p className="text-white/70 mb-4">
                  This calculator helps you estimate the potential returns on your investments through The Collektiv Club. It takes into account various factors including your investment amount, tax relief, and potential exit multiples.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <span className="font-medium text-collektiv-green">Round raise amount</span><span className="text-white/60">: The total amount being raised by the target company</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <span className="font-medium text-collektiv-green">Your investment amount</span><span className="text-white/60">: The amount you are personally committing</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <span className="font-medium text-collektiv-green">Pre-money valuation</span><span className="text-white/60">: The Valuation given by the Target company before the raise round</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <span className="font-medium text-collektiv-green">Post-money valuation</span><span className="text-white/60">: The Valuation post investment round</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <span className="font-medium text-collektiv-green">Annual growth rate</span><span className="text-white/60">: The expected growth rate Y-o-Y</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <span className="font-medium text-collektiv-green">Time to exit</span><span className="text-white/60">: The expected exit time</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <span className="font-medium text-collektiv-green">Exit multiple</span><span className="text-white/60">: Multiple of Revenue or EBITDA</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <span className="font-medium text-collektiv-green">Tax scheme</span><span className="text-white/60">: EIS or SEIS</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-white/60 mb-4">
                    Please note that these calculations are estimates and actual returns may vary based on market conditions and the performance of individual investments.
                  </p>
                  <Link to="/membership" className="btn-primary inline-block">
                    Explore Membership Options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Calculator;
