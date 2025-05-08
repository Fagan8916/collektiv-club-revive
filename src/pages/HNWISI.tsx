
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HNWISI = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-green">High Net Worth & Sophisticated Investors</h1>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2>Important Information for Investors</h2>
              
              <p>Investments offered by The Collektiv Club are exclusively available to "high net worth individuals" and "sophisticated investors" as defined by the Financial Conduct Authority (FCA).</p>
              
              <h3>High Net Worth Individual</h3>
              <p>You qualify as a high net worth individual if:</p>
              <ul>
                <li>You had an annual income of £100,000 or more during the preceding financial year; or</li>
                <li>You held net assets to the value of £250,000 or more during the preceding financial year.</li>
              </ul>
              <p>Net assets for these purposes do not include:</p>
              <ul>
                <li>The property which is your primary residence or any money raised through a loan secured on that property;</li>
                <li>Any rights under a qualifying contract of insurance; or</li>
                <li>Any benefits (in the form of pensions or otherwise) which are payable on the termination of your service, on your death or retirement and to which you are (or your dependents are), or may be entitled.</li>
              </ul>
              
              <h3>Sophisticated Investor</h3>
              <p>You qualify as a sophisticated investor if any of the following apply:</p>
              <ol>
                <li><strong>Self-certified sophisticated investor:</strong> You have made more than one investment in an unlisted company in the two years prior to the date of this statement;</li>
                <li>You are a member of a network or syndicate of business angels and have been so for at least the six months prior to the date of this statement;</li>
                <li>You have worked, in the two years prior to the date of this statement, in a professional capacity in the private equity sector, or in the provision of finance for small and medium enterprises;</li>
                <li>You are currently, or have been in the two years prior to the date of this statement, a director of a company with an annual turnover of at least £1 million.</li>
              </ol>
              
              <h3>Investment Risks</h3>
              <p>Investing in startups and early-stage businesses involves significant risks, including:</p>
              <ul>
                <li><strong>Risk of loss:</strong> Most early-stage businesses fail, and if you invest, it's more likely that you will lose all of your invested capital than you will see any return on your investment.</li>
                <li><strong>Illiquidity:</strong> Your investment is likely to be locked up for many years. You are unlikely to be able to sell your shares or withdraw your investment until the company either floats on a stock exchange or is bought by another company.</li>
                <li><strong>Lack of dividends:</strong> Any income from your investment is far from guaranteed and may be irregular or non-existent. Most startups do not pay dividends as they reinvest any profits to grow.</li>
                <li><strong>Dilution:</strong> Your ownership percentage may decrease if the company raises additional capital in the future.</li>
                <li><strong>Diversification:</strong> Investing in multiple startups rather than a single company can help spread risk.</li>
              </ul>
              
              <h3>Declaration</h3>
              <p>By proceeding with any investment opportunity presented by The Collektiv Club, you confirm that:</p>
              <ul>
                <li>You qualify as either a high net worth individual or a sophisticated investor as defined above;</li>
                <li>You understand the risks involved with investing in early-stage businesses;</li>
                <li>You will invest only amounts that you are willing and able to lose;</li>
                <li>You will seek independent financial advice if you are unsure whether investment is appropriate for you.</li>
              </ul>
              
              <h3>Contact Us</h3>
              <p>If you have any questions about investor qualifications or the risks of investing, please contact us at info@collektiv.club.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HNWISI;
