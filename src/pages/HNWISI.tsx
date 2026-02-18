
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

        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">

              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4 text-collektiv-dark">Important Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Investments offered by The Collektiv Club are exclusively available to individuals who qualify as either a <strong>"high net worth individual"</strong> or a <strong>"self-certified sophisticated investor"</strong> as defined under the Financial Services and Markets Act 2000 (Financial Promotion) Order 2005, as amended by SI 2024/301.
                </p>
              </div>

              <div className="mb-10 p-6 rounded-xl border border-border bg-card">
                <h2 className="font-display text-2xl font-bold mb-4 text-collektiv-dark">Certified High Net Worth Individual</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As per COBS 4 Annex 2 of the FCA Handbook, you qualify as a certified high net worth individual if, during the financial year immediately preceding the date of the statement:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>You had an annual income of <strong>£100,000 or more</strong>; or</li>
                  <li>You held net assets of <strong>£250,000 or more</strong>.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <strong>Net assets</strong> for these purposes do <em>not</em> include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>The property which is your primary residence, or any money raised through a loan secured on that property;</li>
                  <li>Any rights under a qualifying contract of insurance; or</li>
                  <li>Any benefits (in the form of pensions or otherwise) which are payable on the termination of your service, on your death or retirement, and to which you (or your dependants) are or may be entitled.</li>
                </ul>
              </div>

              <div className="mb-10 p-6 rounded-xl border border-border bg-card">
                <h2 className="font-display text-2xl font-bold mb-4 text-collektiv-dark">Self-Certified Sophisticated Investor</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As per COBS 4 Annex 4 of the FCA Handbook, you qualify as a self-certified sophisticated investor if at least one of the following applies:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>You have made <strong>two or more investments</strong> in an unlisted company in the two years prior to the date of the relevant statement;</li>
                  <li>You are a <strong>member of a network or syndicate of business angels</strong> and have been so for at least six months prior to the date of the relevant statement;</li>
                  <li>You have worked in a <strong>professional capacity in the private equity sector</strong>, or in the provision of finance for small and medium enterprises, in the two years prior to the date of the relevant statement;</li>
                  <li>You are currently, or have been in the two years prior to the date of the relevant statement, a <strong>director of a company with an annual turnover of at least £1 million</strong>.</li>
                </ol>
              </div>

              <div className="mb-10 p-6 rounded-xl border border-destructive/20 bg-destructive/5">
                <h2 className="font-display text-2xl font-bold mb-4 text-collektiv-dark">Investment Risks</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Investing in startups and early-stage businesses involves significant risks. You should be aware of the following before making any investment:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                  <li><strong>Risk of total loss:</strong> Most early-stage businesses fail. It is more likely that you will lose all of your invested capital than that you will see any return on your investment.</li>
                  <li><strong>Illiquidity:</strong> Your investment is likely to be locked up for many years. You are unlikely to be able to sell your shares or withdraw your investment until the company either lists on a stock exchange or is acquired.</li>
                  <li><strong>No dividends:</strong> Early-stage companies typically reinvest any profits to fund growth. You should not expect to receive dividends.</li>
                  <li><strong>Dilution:</strong> Your ownership percentage may decrease if the company raises additional capital in the future through further share issuances.</li>
                  <li><strong>No FSCS protection:</strong> Investments made through The Collektiv Club are not covered by the Financial Services Compensation Scheme (FSCS).</li>
                  <li><strong>Past performance:</strong> Past performance is not a reliable indicator of future results. Any projections or forecasts are for illustrative purposes only.</li>
                </ul>
              </div>

              <div className="mb-10 p-6 rounded-xl border border-border bg-card">
                <h2 className="font-display text-2xl font-bold mb-4 text-collektiv-dark">Tax Benefits (EIS/SEIS)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Many of our investment opportunities may qualify for tax relief under the Enterprise Investment Scheme (EIS) or Seed Enterprise Investment Scheme (SEIS). Tax treatment depends on individual circumstances and may be subject to change. You should seek independent tax advice before relying on any potential tax benefits.
                </p>
              </div>

              <div className="mb-10 p-6 rounded-xl border border-border bg-card">
                <h2 className="font-display text-2xl font-bold mb-4 text-collektiv-dark">Declaration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By proceeding with any investment opportunity presented by The Collektiv Club, you confirm that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>You qualify as either a certified high net worth individual or a self-certified sophisticated investor as defined above;</li>
                  <li>You understand the risks involved with investing in early-stage businesses;</li>
                  <li>You will only invest amounts that you are prepared to lose entirely;</li>
                  <li>You will seek independent financial advice if you are unsure whether any investment is appropriate for your circumstances.</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4 text-collektiv-dark">Regulatory References</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The definitions used on this page are based on:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>The Financial Services and Markets Act 2000 (Financial Promotion) Order 2005</li>
                  <li>The Financial Services and Markets Act 2000 (Financial Promotion) (Amendment and Transitional Provision) Order 2024 (SI 2024/301)</li>
                  <li><a href="https://www.handbook.fca.org.uk/handbook/COBS/4/Annex2.html" target="_blank" rel="noopener noreferrer" className="text-collektiv-green hover:underline">COBS 4 Annex 2 — Certified High Net Worth Investor Statement</a></li>
                  <li><a href="https://www.handbook.fca.org.uk/handbook/COBS/4/Annex4.html" target="_blank" rel="noopener noreferrer" className="text-collektiv-green hover:underline">COBS 4 Annex 4 — Self-Certified Sophisticated Investor Statement</a></li>
                </ul>
              </div>

              <div className="text-center pt-6 border-t border-border">
                <p className="text-muted-foreground mb-4">
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
