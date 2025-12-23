import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const WebelMemo = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          to="/members/investments/webel" 
          className="inline-flex items-center text-collektiv-green hover:text-collektiv-lightgreen mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Webel
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <img 
            src="/lovable-uploads/webel-logo.png" 
            alt="Webel"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-collektiv-green mb-2">Webel Investment Memo</h1>
          <p className="text-gray-600">Prepared by Collektiv Club | December 2025</p>
        </div>

        {/* Investment Summary Table */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-collektiv-green mb-4">Investment Summary</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="border-b pb-2"><strong>Company:</strong></div>
            <div className="border-b pb-2">Webel</div>
            <div className="border-b pb-2"><strong>Sector:</strong></div>
            <div className="border-b pb-2">Home Services Marketplace</div>
            <div className="border-b pb-2"><strong>Location:</strong></div>
            <div className="border-b pb-2">Spain (expanding to UK)</div>
            <div className="border-b pb-2"><strong>Round:</strong></div>
            <div className="border-b pb-2">€2.0m Pre-Series A @ €21m pre-money</div>
            <div className="border-b pb-2"><strong>SPV Size:</strong></div>
            <div className="border-b pb-2">€500k @ €21m pre (lead: Trind VC)</div>
            <div className="border-b pb-2"><strong>SPV Terms:</strong></div>
            <div className="border-b pb-2">4.5% setup fee, 20% carry</div>
            <div className="border-b pb-2"><strong>Close Deadline:</strong></div>
            <div className="border-b pb-2">28 December 2025</div>
            <div className="border-b pb-2"><strong>Minimum Investment:</strong></div>
            <div className="border-b pb-2">€2,500</div>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Why You're Seeing This</h2>
          <p className="text-gray-700 mb-4">
            Collektiv has negotiated access to Webel's €2 million Pre-Series A financing round at €21 million pre-money 
            valuation. This round is led by Trind Ventures and supported by existing investors including Goodwater Capital, 
            Yellow (Glovo Founders), Tiburon, and Decelera Ventures.
          </p>
          <p className="text-gray-700 mb-4">
            The deal came about through our relationship with the founding team, particularly through connections in the 
            Spanish startup ecosystem. Given Webel's strong unit economics, proven marketplace model, and clear path to 
            Series A, we believe this represents an attractive opportunity for our members.
          </p>
        </section>

        {/* What is the Company */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">What is Webel?</h2>
          <p className="text-gray-700 mb-4">
            Webel is Spain's category-leading, on-demand home-services marketplace connecting vetted professionals 
            (plumbers, electricians, cleaners, handymen, movers, etc.) with homeowners and businesses. Think of it as 
            the "Uber for home services" - a platform that matches customers with qualified service providers for 
            immediate or scheduled jobs.
          </p>
          <p className="text-gray-700 mb-4">
            The platform operates a take-rate model, charging a commission on each completed job. With 83% gross margins 
            and a ~4 month customer payback period, Webel has demonstrated strong unit economics that support sustainable 
            growth.
          </p>
          <div className="my-6">
            <img 
              src="/lovable-uploads/webel-services-breakdown.png" 
              alt="Webel Services Breakdown - Small Renovations 23%, Plumbing 22%, Painting 21%, Appliance Repair 16%, Electrician 14%"
              className="w-full max-w-md mx-auto rounded-lg shadow-md"
            />
            <p className="text-center text-sm text-gray-500 mt-2">Service Category Breakdown</p>
          </div>
        </section>

        {/* Traction & KPIs */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Traction & Key Metrics</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm mb-4">
              <thead>
                <tr className="bg-collektiv-green text-white">
                  <th className="border border-gray-300 p-3 text-left">Metric</th>
                  <th className="border border-gray-300 p-3 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">GMV Run-Rate</td>
                  <td className="border border-gray-300 p-3">~€18m</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Revenue Run-Rate</td>
                  <td className="border border-gray-300 p-3">~€1.7m</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Gross Margin</td>
                  <td className="border border-gray-300 p-3">83%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">LTV/CAC</td>
                  <td className="border border-gray-300 p-3">~4.1×</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Customer Payback</td>
                  <td className="border border-gray-300 p-3">~4 months</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Repeat GMV</td>
                  <td className="border border-gray-300 p-3">85% from returning customers</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">App Downloads</td>
                  <td className="border border-gray-300 p-3">1.5m</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Registered Accounts</td>
                  <td className="border border-gray-300 p-3">1.0m</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Service Providers</td>
                  <td className="border border-gray-300 p-3">350k</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Monthly Active Users</td>
                  <td className="border border-gray-300 p-3">175k</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Cities Live (Spain)</td>
                  <td className="border border-gray-300 p-3">19</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Cities Ramping (UK)</td>
                  <td className="border border-gray-300 p-3">5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="my-6">
            <img 
              src="/lovable-uploads/webel-retention-chart.png" 
              alt="Customer Retention by Monthly Cohort - Webel shows 2x retention vs competitors"
              className="w-full rounded-lg shadow-md"
            />
            <p className="text-center text-sm text-gray-500 mt-2">Average Customer Retention by Monthly Cohort</p>
          </div>
        </section>

        {/* Business Model */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Business Model & Unit Economics</h2>
          <p className="text-gray-700 mb-4">
            Webel operates a commission-based marketplace model, taking a percentage of each completed job. The company 
            has achieved strong unit economics with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li><strong>83% gross margin:</strong> High-margin software business with minimal variable costs per transaction</li>
            <li><strong>LTV/CAC of 4.1×:</strong> Strong customer lifetime value relative to acquisition costs</li>
            <li><strong>~4 month payback:</strong> Rapid recovery of customer acquisition investment</li>
            <li><strong>85% repeat GMV:</strong> Exceptional customer retention driving recurring revenue</li>
          </ul>
          <div className="my-6">
            <img 
              src="/lovable-uploads/webel-fees-chart.png" 
              alt="Fees & Average Net Take Rate showing growth from €60k to €127k monthly"
              className="w-full rounded-lg shadow-md"
            />
            <p className="text-center text-sm text-gray-500 mt-2">Fees & Average Net Take Rate</p>
          </div>
        </section>

        {/* Market & Competition */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Market & Competition</h2>
          <p className="text-gray-700 mb-4">
            The home services market is massive and highly fragmented. In Spain alone, the addressable market exceeds 
            €20 billion annually. Webel has established category leadership in Spain and is now expanding into the UK, 
            which represents an even larger market opportunity.
          </p>
          <p className="text-gray-700 mb-4">
            Key competitive advantages include:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>First-mover advantage in Spain with strong brand recognition</li>
            <li>Extensive network of 350k vetted service providers</li>
            <li>Superior customer experience driving 85% repeat usage</li>
            <li>Strong unit economics enabling sustainable growth</li>
          </ul>
        </section>

        {/* Financial Projections */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Financial Projections</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm mb-4">
              <thead>
                <tr className="bg-collektiv-green text-white">
                  <th className="border border-gray-300 p-3 text-left">Metric</th>
                  <th className="border border-gray-300 p-3 text-center">2025</th>
                  <th className="border border-gray-300 p-3 text-center">2026</th>
                  <th className="border border-gray-300 p-3 text-center">2027</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">GMV</td>
                  <td className="border border-gray-300 p-3 text-center">€18m</td>
                  <td className="border border-gray-300 p-3 text-center">€35m</td>
                  <td className="border border-gray-300 p-3 text-center">€65m</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Revenue</td>
                  <td className="border border-gray-300 p-3 text-center">€1.7m</td>
                  <td className="border border-gray-300 p-3 text-center">€3.5m</td>
                  <td className="border border-gray-300 p-3 text-center">€6.5m</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Growth Rate</td>
                  <td className="border border-gray-300 p-3 text-center">-</td>
                  <td className="border border-gray-300 p-3 text-center">~100%</td>
                  <td className="border border-gray-300 p-3 text-center">~85%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Use of Funds */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Use of Funds</h2>
          <p className="text-gray-700 mb-4">
            The €2m Pre-Series A will be deployed across three key areas:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Team (47%):</strong> Expanding engineering, product, and operations teams</li>
            <li><strong>Marketing (43%):</strong> Customer acquisition and brand building in Spain and UK</li>
            <li><strong>Other (10%):</strong> Infrastructure, legal, and operational expenses</li>
          </ul>
        </section>

        {/* Path to Series A */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Path to Series A</h2>
          <p className="text-gray-700 mb-4">
            The company is targeting a Series A raise in late 2026, aiming for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>€35m+ GMV run-rate</li>
            <li>Established UK market presence</li>
            <li>Continued improvement in unit economics</li>
            <li>Clear path to profitability</li>
          </ul>
        </section>

        {/* Team */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Team & Governance</h2>
          <p className="text-gray-700 mb-4">
            The founding team brings deep expertise in marketplace businesses and technology:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Nacho Tejero (CEO):</strong> Serial entrepreneur with previous exits</li>
            <li><strong>Guillermo Urquijo (COO):</strong> Operations expert with marketplace experience</li>
            <li><strong>Carlos Estévez (CPO):</strong> Product leader with strong technical background</li>
          </ul>
        </section>

        {/* Current Investors */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Current Investors</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Trind Ventures:</strong> Leading this round, Nordic VC focused on marketplaces</li>
            <li><strong>Goodwater Capital:</strong> Consumer-focused VC with portfolio including Shopify, Uber</li>
            <li><strong>Yellow (Glovo Founders):</strong> Strategic investor with deep marketplace expertise</li>
            <li><strong>Tiburon:</strong> European growth investor</li>
            <li><strong>Decelera Ventures:</strong> Spanish early-stage fund</li>
          </ul>
        </section>

        {/* Exit Analysis */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Exit Analysis</h2>
          <p className="text-gray-700 mb-4">
            Home services marketplaces have seen significant M&A activity and public market interest:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm mb-4">
              <thead>
                <tr className="bg-collektiv-green text-white">
                  <th className="border border-gray-300 p-3 text-left">Company</th>
                  <th className="border border-gray-300 p-3 text-left">Event</th>
                  <th className="border border-gray-300 p-3 text-left">Valuation Multiple</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">Thumbtack</td>
                  <td className="border border-gray-300 p-3">Private (2021)</td>
                  <td className="border border-gray-300 p-3">~$3B valuation</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Angi (fka Angie's List)</td>
                  <td className="border border-gray-300 p-3">Public</td>
                  <td className="border border-gray-300 p-3">2-3× revenue</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">TaskRabbit</td>
                  <td className="border border-gray-300 p-3">Acquired by IKEA</td>
                  <td className="border border-gray-300 p-3">Strategic premium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Risks */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Key Risks</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-collektiv-green text-white">
                  <th className="border border-gray-300 p-3 text-left">Risk</th>
                  <th className="border border-gray-300 p-3 text-left">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">UK expansion execution</td>
                  <td className="border border-gray-300 p-3">Proven playbook from Spain; phased city-by-city rollout</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Competition from incumbents</td>
                  <td className="border border-gray-300 p-3">Strong unit economics and customer loyalty create defensibility</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Provider quality control</td>
                  <td className="border border-gray-300 p-3">Rigorous vetting process; ratings system drives accountability</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Economic downturn impact</td>
                  <td className="border border-gray-300 p-3">Home services relatively resilient; maintenance is non-discretionary</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Final Thoughts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-collektiv-green mb-4">Investment Decision</h2>
          <p className="text-gray-700">
            Webel represents an opportunity to invest in a category leader with proven unit economics, strong customer 
            retention, and a clear path to significant scale. The combination of an experienced team, blue-chip investor 
            backing, and attractive entry valuation makes this a compelling addition to our portfolio.
          </p>
        </section>

        {/* Disclaimer Section */}
        <section className="border-t pt-8 mt-12">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Important Notices</h3>
          <div className="space-y-4 text-sm italic text-gray-600">
            <div>
              <strong>Disclaimer:</strong> This investment memo is for informational purposes only and does not constitute 
              financial, investment, legal, or tax advice. The information contained herein is based on sources believed 
              to be reliable but is not guaranteed as to its accuracy or completeness. Collektiv Club makes no representations 
              or warranties regarding the information provided.
            </div>
            <div>
              <strong>Investment Decisions:</strong> Any decision to invest should be based on your own due diligence and 
              consultation with your professional advisors. Past performance is not indicative of future results. Investment 
              in early-stage companies involves significant risks, including the potential loss of your entire investment.
            </div>
            <div>
              <strong>Confidentiality Statement:</strong> This document contains confidential information intended solely for 
              members of Collektiv Club. Unauthorised distribution, reproduction, or disclosure of any part of this memo is 
              strictly prohibited. By accessing this document, you agree to maintain its confidentiality and not share it 
              with non-members.
            </div>
            <div>
              <strong>Tax Advice:</strong> Any tax benefits mentioned (such as EIS/SEIS relief) are subject to individual 
              circumstances and may change based on government policy. Investors should seek independent tax advice before 
              making any investment decisions. Collektiv Club does not provide tax planning or advisory services.
            </div>
            <div>
              <strong>About SPVs:</strong> Investments are made through Special Purpose Vehicles (SPVs) managed by third-party 
              administrators. SPV structures involve additional fees and carry arrangements as disclosed. Investors should 
              review all SPV documentation carefully before committing capital.
            </div>
            <div>
              <strong>Risks of Early-Stage Investments:</strong> Early-stage companies have a high rate of failure. There is 
              no guarantee that the company will achieve its business objectives or provide any return on investment. Investors 
              should be prepared to lose their entire investment and should only invest amounts they can afford to lose.
            </div>
            <div>
              <strong>Intellectual Property:</strong> All content, analysis, and proprietary information in this memo remain 
              the intellectual property of Collektiv Club. Use of this information for purposes other than personal investment 
              evaluation is prohibited without express written consent.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WebelMemo;
