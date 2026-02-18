
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AnthropicMemo = () => {
  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-collektiv-accent to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/members/investments/anthropic" className="inline-flex items-center mb-6 text-collektiv-green hover:underline">
          <ArrowLeft className="mr-2" size={20} />
          Back to Anthropic Overview
        </Link>
        
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/anthropic-logo-new.png" 
            alt="Anthropic"
            className="h-20 w-auto object-contain mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-collektiv-green mb-2">Investment Memo: Anthropic</h1>
          <p className="text-gray-600">Prepared by Collektiv Club</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8 space-y-8">
            {/* Investment Summary Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-collektiv-green text-white">
                    <th className="border border-gray-300 p-3 text-left">Investment Details</th>
                    <th className="border border-gray-300 p-3 text-left">Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Company</td><td className="border border-gray-300 p-3">Anthropic</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Industry</td><td className="border border-gray-300 p-3">Frontier AI, foundation models for enterprises and consumers</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Valuation</td><td className="border border-gray-300 p-3">~$350B (ongoing primary round via lead investor)</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Share Price</td><td className="border border-gray-300 p-3">$259.1364</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Access</td><td className="border border-gray-300 p-3">Secondary-led exposure, indirect</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Deal Structure</td><td className="border border-gray-300 p-3">Access via a cap-table investor's unfilled pro-rata into an SPV managed by xAura via secondary Bloom Venture Partners</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Allocation</td><td className="border border-gray-300 p-3">Up to $330k available for xAura & Collektiv</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Model</td><td className="border border-gray-300 p-3">AI safety-focused foundation model company (Claude family) monetising via API and enterprise contracts</td></tr>
                </tbody>
              </table>
            </div>

            {/* Why Collektiv is Investing */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Why Collektiv is Investing
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Anthropic is one of a very small number of frontier AI labs with both leading-edge model performance and a credible safety-first brand, positioning it as a core long-term infrastructure bet rather than a single-product SaaS play. Its current round is expected to be approximately $10B at a circa $350B valuation, led by a strategic with deep cloud and distribution reach, which reduces financing risk and supports continued model-training at frontier scale.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The commercial trajectory shows aggressive but directionally plausible revenue growth from low-single-digit billions of ARR in 2025 towards high-single-digit to low-double-digit billions by 2028, with profitability targeted once annual revenue exceeds roughly $3.5B. Internal planning assumes a 2026 "base case" revenue of c. $2B and 2027 base case of c. $5B, implying strong enterprise adoption and upsell across seat-based and consumption-based contracts.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  For Collektiv members, the key attraction is access rather than price discovery: this SPV routes into an existing cap-table investor's unused pro-rata, a slot that would normally be inaccessible to smaller cheques and secondary buyers. The SPV terms offer a one-time 8.5% fee plus 20% carry with a minimum individual ticket of $5,000, which is consistent with market standards for late-stage access vehicles while remaining accessible for smaller LP tickets.
                </p>
              </div>
            </section>

            {/* Expected Figures */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Expected Anthropic Figures
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left font-semibold">Metric</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Commercial Trajectory</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Burn Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-gray-300 p-3">2025 ARR</td><td className="border border-gray-300 p-3">~$8.5–$9B</td><td className="border border-gray-300 p-3">$2.8B</td></tr>
                    <tr><td className="border border-gray-300 p-3">2026 Base Case</td><td className="border border-gray-300 p-3">$28B</td><td className="border border-gray-300 p-3">$3.0B</td></tr>
                    <tr><td className="border border-gray-300 p-3">2027 Base Case</td><td className="border border-gray-300 p-3">$58B</td><td className="border border-gray-300 p-3">$2.0B</td></tr>
                    <tr><td className="border border-gray-300 p-3">Valuation</td><td className="border border-gray-300 p-3">~13× 2026 ARR</td><td className="border border-gray-300 p-3">2028+ profitability ($3.5B+)</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Rationale */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Rationale vs. Typical Collektiv Early-Stage Deals
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Unlike usual pre-seed/seed B2B SaaS opportunities, this is a late-stage, highly concentrated bet on a foundational AI infrastructure provider with very large existing backing and a non-venture style valuation. The investment case is less about owning an early wedge in an emerging SaaS vertical and more about securing fractional exposure to a potential long-term AI platform winner that could define economics across multiple downstream SaaS markets.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                Given the exceptional nature of the asset, Collektiv views this as a tactical opportunity for members who want limited but meaningful exposure to frontier AI, while maintaining the majority of their portfolio in earlier-stage, higher-ownership SaaS positions.
              </p>
            </section>

            {/* IPO / Exit Mechanics */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                What Happens Upon IPO / Exit
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">1. The Trigger: "Liquidity Event"</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>IPO:</strong> Anthropic lists on a stock exchange</li>
                    <li><strong>M&A (Sale):</strong> Anthropic is bought by another company for cash or stock</li>
                    <li><strong>Dissolution:</strong> Anthropic liquidates</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">2. Payout Mechanics</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Cash Exit (M&A):</strong> The Fund receives cash and distributes to your account minus fees/carry</li>
                    <li><strong>Stock Distribution (IPO):</strong> After the lock-up period (typically 180 days), the Manager can distribute actual Anthropic shares to you or sell on the open market and distribute cash</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">3. The Waterfall (Who Gets Paid First)</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 ml-4">
                    <li>Fund Expenses: debts, legal bills, and owed indemnification</li>
                    <li>Return of Capital: 100% of your Capital Contribution back</li>
                    <li>Carry Split: Manager takes 20% carry; you receive the remaining 80%</li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">4. Distribution Chain</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Because your position is "indirect," the exit process follows: Anthropic → GP (cap table holder) → Bloom's Master Fund → Your SPV (BVP V) → You.
                  </p>
                </div>
              </div>
            </section>

            {/* Investment Structure */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Investment Structure, Terms & Risk Overview
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Nature of Investment (Secondary)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This is a secondary investment, meaning it involves purchasing existing shares or economic interests from current holders, rather than funding new shares issued by the company. Secondary investments are widely used by institutional investors to access mature private companies.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Structure & Cap Table Position</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Investment held through a US-based private fund / SPV using institutional VC documentation</li>
                    <li>Collektiv members participate economically through this structure, rather than holding shares directly</li>
                    <li>This keeps the company's cap table simple while allowing multiple underlying investors to participate</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Investment Characteristics</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Private & long-term:</strong> No redemption rights and no assured secondary liquidity</li>
                    <li><strong>High-risk:</strong> Capital is at risk and a total loss is possible</li>
                    <li><strong>Passive:</strong> No governance, voting, or control rights</li>
                    <li><strong>Indirect:</strong> Exposure via a fund/SPV, not direct share ownership</li>
                    <li><strong>Manager-led:</strong> Managed in line with institutional VC standards</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Key Characteristics */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Key Characteristics & Risk Factors
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Conflicts of Interest</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The fund manager and its affiliates may manage multiple funds, invest in similar opportunities, and allocate time across different vehicles. By participating, investors acknowledge and waive potential conflicts. This is standard practice in US venture capital structures.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Manager Discretion</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The fund manager retains broad discretion over allocation sizing, timing of capital calls, and execution decisions including whether to hold, sell, or distribute in kind at exit.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Roles</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Fund Manager:</strong> Structures/executes the transaction, determines allocation, manages through to exit</li>
                    <li><strong>Collektiv Club:</strong> Acts as an access facilitator, providing context and clarity. Does not control legal terms, guarantee allocation, or manage the fund</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Bottom Line */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Bottom Line
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                This opportunity offers access to a private, late-stage company via a secondary, institutional-grade fund/SPV structure. Participation is appropriate only for members who are comfortable with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Allocation uncertainty</li>
                <li>Long-term illiquidity</li>
                <li>High risk, including potential total loss</li>
                <li>Indirect ownership via a fund/SPV</li>
                <li>Limited rights and transparency, and manager-favourable legal terms</li>
              </ul>
            </section>

            {/* Disclaimer */}
            <section className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-xs text-gray-500 italic space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-600 not-italic">Disclaimer</h4>
                  <p>Members are fully responsible for their own investment decisions. While Collektiv facilitates co-investment opportunities through deal-specific SPVs, investors are solely accountable for evaluating risks and potential returns before participating.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-600 not-italic">Confidentiality Statement</h4>
                  <p>This document is strictly intended for members of Collektiv Limited and may contain confidential and proprietary information. Any unauthorised access, sharing, or dissemination of this content is prohibited unless prior written approval is obtained from an authorised Director of Collektiv Limited.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-600 not-italic">Tax Advice</h4>
                  <p>Collektiv does not provide tax advice. Investors are encouraged to consult qualified tax professionals to understand the personal tax implications associated with investments made via our SPVs.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-600 not-italic">About SPVs</h4>
                  <p>A Special Purpose Vehicle (SPV) is an independent entity created by Collektiv to limit financial exposure. This structure allows syndicate members to invest in specific assets without assuming the risks tied to Collektiv's broader portfolio.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-600 not-italic">Risks of Early-Stage Investments</h4>
                  <p>Investing in startups and early-stage businesses carries significant risks and uncertainties. Investors should be aware that such investments could result in the complete loss of their capital. Historical performance does not guarantee future results.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-600 not-italic">Intellectual Property</h4>
                  <p>All trademarks, logos, and service marks featured in this document are owned by Collektiv or third parties, which may not necessarily be affiliated with or endorsed by Collektiv.</p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnthropicMemo;
