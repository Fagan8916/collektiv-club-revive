
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const HNWISI = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-collektiv-dark to-collektiv-darkTeal">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">High Net Worth & Sophisticated Investors</h1>
              <p className="text-lg text-white/80">
                Important regulatory information for investors considering opportunities through The Collektiv Club.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-collektiv-dark">
          <div className="container">
            <div className="max-w-4xl mx-auto">

              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4 text-white">Important Information</h2>
                <p className="text-white/70 leading-relaxed">
                  Investments offered by The Collektiv Club are exclusively available to individuals who qualify as either a <strong className="text-white">"high net worth individual"</strong> or a <strong className="text-white">"self-certified sophisticated investor"</strong> as defined under the Financial Services and Markets Act 2000 (Financial Promotion) Order 2005, as amended by SI 2024/301.
                </p>
              </div>

              <div className="mb-10 p-6 rounded-xl border border-white/10 bg-white/5">
                <h2 className="font-display text-2xl font-bold mb-4 text-white">Certified High Net Worth Individual</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  As per COBS 4 Annex 2 of the FCA Handbook, you qualify as a certified high net worth individual if, during the financial year immediately preceding the date of the statement:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-white/70">
                  <li>You had an annual income of <strong className="text-white">£100,000 or more</strong>; or</li>
                  <li>You held net assets of <strong className="text-white">£250,000 or more</strong>.</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-4">
                  <strong className="text-white">Net assets</strong> for these purposes do <em>not</em> include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-white/70">
                  <li>The property which is your primary residence, or any money raised through a loan secured on that property;</li>
                  <li>Any rights under a qualifying contract of insurance; or</li>
                  <li>Any benefits (in the form of pensions or otherwise) which are payable on the termination of your service, on your death or retirement.</li>
                </ul>
              </div>

              <div className="mb-10 p-6 rounded-xl border border-white/10 bg-white/5">
                <h2 className="font-display text-2xl font-bold mb-4 text-white">Self-Certified Sophisticated Investor</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  As per COBS 4 Annex 4 of the FCA Handbook, you qualify as a self-certified sophisticated investor if at least one of the following applies:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-white/70">
                  <li>You have made <strong className="text-white">two or more investments</strong> in an unlisted company in the two years prior to the date of the relevant statement;</li>
                  <li>You are a <strong className="text-white">member of a network or syndicate of business angels</strong> and have been so for at least six months;</li>
                  <li>You have worked in a <strong className="text-white">professional capacity in the private equity sector</strong>, or in the provision of finance for small and medium enterprises, in the two years prior;</li>
                  <li>You are currently, or have been in the two years prior, a <strong className="text-white">director of a company with an annual turnover of at least £1 million</strong>.</li>
                </ol>
              </div>

              <div className="mb-10 p-6 rounded-xl border border-red-500/20 bg-red-500/5">
                <h2 className="font-display text-2xl font-bold mb-4 text-white">Investment Risks</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Investing in startups and early-stage businesses involves significant risks:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-white/70">
                  <li><strong className="text-white">Risk of total loss:</strong> Most early-stage businesses fail. It is more likely that you will lose all of your invested capital than that you will see any return.</li>
                  <li><strong className="text-white">Illiquidity:</strong> Your investment is likely to be locked up for many years.</li>
                  <li><strong className="text-white">No dividends:</strong> Early-stage companies typically reinvest any profits to fund growth.</li>
                  <li><strong className="text-white">Dilution:</strong> Your ownership percentage may decrease if the company raises additional capital.</li>
                  <li><strong className="text-white">No FSCS protection:</strong> Investments made through The Collektiv Club are not covered by the Financial Services Compensation Scheme.</li>
                  <li><strong className="text-white">Past performance:</strong> Past performance is not a reliable indicator of future results.</li>
                </ul>
              </div>

              <div className="mb-10 p-6 rounded-xl border border-white/10 bg-white/5">
                <h2 className="font-display text-2xl font-bold mb-4 text-white">Tax Benefits (EIS/SEIS)</h2>
                <p className="text-white/70 leading-relaxed">
                  Many of our investment opportunities may qualify for tax relief under the Enterprise Investment Scheme (EIS) or Seed Enterprise Investment Scheme (SEIS). Tax treatment depends on individual circumstances and may be subject to change. You should seek independent tax advice before relying on any potential tax benefits.
                </p>
              </div>

              <div className="mb-10 p-6 rounded-xl border border-white/10 bg-white/5">
                <h2 className="font-display text-2xl font-bold mb-4 text-white">Declaration</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  By proceeding with any investment opportunity presented by The Collektiv Club, you confirm that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-white/70">
                  <li>You qualify as either a certified high net worth individual or a self-certified sophisticated investor;</li>
                  <li>You understand the risks involved with investing in early-stage businesses;</li>
                  <li>You will only invest amounts that you are prepared to lose entirely;</li>
                  <li>You will seek independent financial advice if you are unsure.</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4 text-white">Regulatory References</h2>
                <ul className="list-disc pl-6 space-y-2 text-white/70">
                  <li>The Financial Services and Markets Act 2000 (Financial Promotion) Order 2005</li>
                  <li>The Financial Services and Markets Act 2000 (Financial Promotion) (Amendment and Transitional Provision) Order 2024 (SI 2024/301)</li>
                  <li><a href="https://www.handbook.fca.org.uk/handbook/COBS/4/Annex2.html" target="_blank" rel="noopener noreferrer" className="text-collektiv-green hover:underline">COBS 4 Annex 2 — Certified High Net Worth Investor Statement</a></li>
                  <li><a href="https://www.handbook.fca.org.uk/handbook/COBS/4/Annex4.html" target="_blank" rel="noopener noreferrer" className="text-collektiv-green hover:underline">COBS 4 Annex 4 — Self-Certified Sophisticated Investor Statement</a></li>
                </ul>
              </div>

              <div className="text-center pt-6 border-t border-white/10">
                <p className="text-white/60 mb-4">
                  If you have any questions about investor qualifications or the risks of investing, please contact us.
                </p>
                <Link to="/contact" className="btn-primary inline-flex items-center">
                  Contact Us
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HNWISI;
