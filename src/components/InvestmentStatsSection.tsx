
import React from "react";

const InvestmentStatsSection = () => {
  const stats = [
    {
      value: "£0",
      title: "Joining Fee",
      description: "No charge to join the community, engage with members and evaluate deal flow"
    },
    {
      value: "6-12",
      title: "Deals per year",
      description: "We meet with three founders weekly and aim to complete at least six quality deals annually"
    },
    {
      value: "4",
      title: "Weeks to close",
      description: "From founder meeting to SPV creation and fund transfer, streamlined for efficiency"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-collektiv-dark to-collektiv-darkTeal">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-3">{stat.value}</h2>
              <h3 className="text-lg font-semibold text-collektiv-green mb-3">{stat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentStatsSection;
