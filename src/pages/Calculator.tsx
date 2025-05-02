
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
        <section className="pt-32 pb-16 bg-gradient-to-r from-collektiv-accent to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-green">Investment Calculator</h1>
              <p className="text-xl text-gray-700">
                Calculate your potential investment returns and see the value of investing with The Collektiv Club.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="section bg-white">
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
              
              <div className="mt-12 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-collektiv-green">About Our Calculator</h2>
                <p className="text-gray-700 mb-4">
                  This calculator helps you estimate the potential returns on your investments through The Collektiv Club. It takes into account various factors including your investment amount, tax relief, and potential exit multiples.
                </p>
                <p className="text-gray-700 mb-4">
                  Please note that these calculations are estimates and actual returns may vary based on market conditions and the performance of individual investments.
                </p>
                <div className="mt-6">
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
