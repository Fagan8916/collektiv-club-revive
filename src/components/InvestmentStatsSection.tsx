
import React from "react";

const InvestmentStatsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 0% Stat */}
          <div className="text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-5xl md:text-6xl font-bold text-collektiv-green mb-2">£0</h2>
              <div className="w-48 h-2 mb-6">
                <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,10 C30,20 70,0 100,10 C130,20 170,0 200,10" 
                    fill="none" stroke="#003B73" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-collektiv-green mb-4">Joining Fee</h3>
              <p className="text-gray-700">
                No charge to join the community, engage with our members and evaluate deal flow
              </p>
            </div>
          </div>

          {/* 6-12 Deals Stat */}
          <div className="text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-5xl md:text-6xl font-bold text-collektiv-green mb-2">6-12</h2>
              <div className="w-48 h-2 mb-6">
                <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,10 C30,20 70,0 100,10 C130,20 170,0 200,10" 
                    fill="none" stroke="#003B73" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-collektiv-green mb-4">Deals per year</h3>
              <p className="text-gray-700">
                On average, we meet with three founders per week and aim to complete at least six 
                deals annually. Quality remains our top priority.
              </p>
            </div>
          </div>

          {/* 4 Weeks Stat */}
          <div className="text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-5xl md:text-6xl font-bold text-collektiv-green mb-2">4</h2>
              <div className="w-48 h-2 mb-6">
                <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,10 C30,20 70,0 100,10 C130,20 170,0 200,10" 
                    fill="none" stroke="#003B73" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-collektiv-green mb-4">Weeks to close</h3>
              <p className="text-gray-700">
                Founders meet with our Members, who then conduct their own due diligence. If they 
                decide to invest, a SPV is established, and funds are transferred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentStatsSection;
