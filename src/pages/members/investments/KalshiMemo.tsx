
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const KalshiMemo = () => {
  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-collektiv-accent to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/members/investments/kalshi" className="inline-flex items-center mb-6 text-collektiv-green hover:underline">
          <ArrowLeft className="mr-2" size={20} />
          Back to Kalshi Overview
        </Link>
        
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/kalshi-logo.png" 
            alt="Kalshi"
            className="h-20 w-auto object-contain mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-collektiv-green mb-2">Investment Memo: Kalshi</h1>
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
                  <tr><td className="border border-gray-300 p-3 font-semibold">Company</td><td className="border border-gray-300 p-3">Kalshi</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Business Model</td><td className="border border-gray-300 p-3">Regulated event-outcome trading exchange (prediction market)</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Stage</td><td className="border border-gray-300 p-3">Late-stage growth (post-Series E, $11B valuation)</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Instrument</td><td className="border border-gray-300 p-3">Secondary purchase of Series B Preferred (6% dividend) via Forge Single Company Fund (SCF)</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Price</td><td className="border border-gray-300 p-3">$343.21 per share (7% premium to ~$320.76 Series E price)</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Implied Valuation</td><td className="border border-gray-300 p-3">$11.77B reference valuation vs. $11B Series E headline</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">SPV Terms</td><td className="border border-gray-300 p-3">7% one-time fee (via share price uplift), 20% carry</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Geography</td><td className="border border-gray-300 p-3">US (Kalshi HQ New York, CFTC-regulated US exchange)</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">Sector</td><td className="border border-gray-300 p-3">Fintech / Trading infrastructure / Consumer & institutional prediction markets</td></tr>
                  <tr><td className="border border-gray-300 p-3 font-semibold">SPV Provider</td><td className="border border-gray-300 p-3">Forge Global – SCF structure, registered asset manager, 0/0 ongoing fees</td></tr>
                </tbody>
              </table>
            </div>

            {/* Why Collektiv is Investing */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Why Collektiv is Investing
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Situation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Kalshi is the first and only CFTC-licensed Designated Contract Market focused on event contracts, effectively operating as a fully regulated US prediction market at large scale. The business has recently closed a $1B Series E at an $11B valuation led by Paradigm with participation from Sequoia, a16z, CapitalG, ARK, IVP and others, and is now facilitating a small secondary sale from an existing tier-one investor.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Problem</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Demand for direct exposure to real-world events (inflation prints, political outcomes, macro data, sports, entertainment) has historically been channelled through complex derivatives, offshore betting sites, or unregulated prediction markets with significant legal and counterparty risk. Existing instruments (options, ETFs, spread betting) are either too indirect for retail users or not structured to provide clean, event-specific hedges for institutions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Solution / Value Proposition</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Kalshi has created standardised "event contracts" that pay out based on objectively verifiable outcomes and are traded on a federally regulated exchange, giving both retail and institutional participants a compliant way to trade on real-world events. Contract prices between 1–99 cents embed the market's probability view, with each contract settling at $1 if the event occurs, offering a simple UX for directional views and hedging. Beyond fee revenue on trading volume, Kalshi is building a proprietary "data layer" – real-time collective intelligence on global events – that can power forecasting software and institutional decision-making.
                  </p>
                </div>
              </div>
            </section>

            {/* USP */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Unique Selling Points
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4">
                <li><strong>Regulatory moat:</strong> First and only CFTC-licensed event contract exchange in the US; competitors such as Polymarket are offshore/crypto-native with different regulatory profiles.</li>
                <li><strong>Distribution leverage:</strong> Integrations with CNN and CNBC (live prediction data on broadcasts) and Robinhood distribution, putting event contracts alongside traditional securities.</li>
                <li><strong>Scale and liquidity:</strong> $23.8B notional volume in 2025 (+1,100% YoY), ~97M transactions, $100B+ annualised volume and $1B+ traded on Super Bowl Sunday alone.</li>
                <li><strong>Data moat:</strong> High-frequency event-level order flow and pricing signals representing a "global crystal ball" of crowd expectations, potentially monetisable via data products and decision tools.</li>
              </ul>
            </section>

            {/* Traction */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Traction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kalshi's 2025 notional trading volume reached $23.8B (+1,108% YoY), with all-time highs in daily, weekly and monthly volumes and 97M trades executed over the year. At the start of 2026, daily volumes around $291M indicate continued momentum, with $100B+ annualised volume and 130x YoY growth in 2024–2025. The company reports $600M+ 2026 run-rate revenue, implying strong monetisation of this volume base.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>~$0.2B volume in 2024, $23.8B in 2025 (130x+ growth), and $8.4B already in January 2026</li>
                <li>97M transactions in 2025 (+1,680% YoY)</li>
                <li>Over $1B traded on Super Bowl Sunday 2026, a 2,700% YoY increase</li>
                <li>$100B+ annualised volume and $600M+ 2026 run-rate revenue</li>
              </ul>
            </section>

            {/* Market */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Market
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Global prediction market volume is estimated to have grown from $15.8B in 2024 to $63.5B in 2025 (~4x), signalling rapid mainstreaming of event-based trading. Roughly a third of Americans already expect online event betting to become a larger part of culture, suggesting durable demand beyond the current speculative cycle. Kalshi is currently the #1 prediction market by volume globally, with more than 3x the volume of the nearest competitor.
              </p>
            </section>

            {/* Competition */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Competition
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Polymarket</strong> – crypto-native, offshore, strong in macro/geopolitics, valuation reportedly around $9B; operates outside US regulated-exchange perimeter.</li>
                <li><strong>DraftKings / FanDuel</strong> – entering via their own CFTC-linked exchanges from a sports-betting base but constrained by jurisdictional and product scope.</li>
                <li><strong>Robinhood</strong> – partner rather than direct competitor; distributes Kalshi contracts inside a broad trading app where event contracts are reportedly the fastest-growing line (~$300M revenue).</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Kalshi competes primarily on regulatory status, liquidity/volume depth, distribution integrations and the sophistication of its data/intelligence layer.
              </p>
            </section>

            {/* Investment Hypothesis */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Investment Hypothesis
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4">
                <li>Prediction markets become an enduring asset class rather than a passing fad, with regulatory frameworks normalising event contracts as mainstream instruments.</li>
                <li>Kalshi's unique CFTC licence and first-mover advantage give it a defensible regulatory moat and allow it to attract institutional flows (Susquehanna, Saba Capital, etc.) for event-risk hedging.</li>
                <li>The data layer – real-time expectations on global events – compounds in value over time, enabling premium data products and software beyond transaction fees.</li>
                <li>With $23.8B 2025 volume, $100B+ annualised run-rate, and $600M+ 2026 revenue, Kalshi can plausibly justify and grow into its $11B+ valuation if growth continues.</li>
                <li>The SCF structure offers clean exposure to preferred equity in a late-stage, high-beta fintech with tier-one backers, while the 7% secondary premium appears reasonable given momentum and scarcity.</li>
              </ul>
            </section>

            {/* Founder-provided Details */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Founder-Provided Details
              </h2>
              <p className="text-gray-700 leading-relaxed italic mb-4 text-sm">
                The following section contains details provided directly by the founder or company-side materials for informational purposes and may include facts, statements, or claims not independently verified; investors should conduct their own due diligence and seek professional advice.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Company Overview</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Kalshi describes itself as "The First & Only Fully Regulated U.S. Event Outcome Trading Exchange," emphasising its CFTC-licensed Designated Contract Market status and positioning as a regulated alternative to offshore prediction markets. The core vision, articulated by CEO Tarek Mansour (ex-Palantir, ex-Goldman Sachs), is to "financialise everything – replace debate with accuracy" by turning differences of opinion into tradeable assets. Co-founder Luana Lopes Lara is an ex-hedge fund analyst, reinforcing institutional credibility.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Product & Use Cases</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Event contracts cover macroeconomic indicators (e.g. CPI prints), political events, sports (NFL, World Cup, etc.), entertainment, and other objectively determinable outcomes. Users buy contracts priced between 1–99 cents; winning contracts settle at $1, with prices reflecting implied probabilities that update in real time as information changes. Institutional users (hedge funds such as Susquehanna and Saba Capital) use Kalshi to hedge discrete event risks more precisely than via traditional derivatives.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Funding History & Cap Table</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Kalshi has reportedly raised around $1.6B+ across Seed (Y Combinator), Series A–D, and a $1B Series E led by Paradigm at an $11B valuation in December 2025. Three major rounds occurred in a six-month window (June–December 2025) with valuation steps from $2B → $5B → $11B, underscoring rapid investor appetite. Key investors include Paradigm, Sequoia, Andreessen Horowitz, CapitalG, ARK, and IVP.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Key Partnerships</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li><strong>Media:</strong> CNN and CNBC show Kalshi event data in live broadcasts, providing brand credibility and low-CAC acquisition.</li>
                    <li><strong>Brokerage:</strong> Robinhood distributes Kalshi contracts alongside stocks and crypto, with prediction markets described as its fastest-growing revenue line (~$300M).</li>
                    <li><strong>Sports:</strong> NFL partnership and involvement of Giannis Antetokounmpo as a shareholder and promotional partner.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Tailwinds & Headwinds */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Tailwinds & Headwinds
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Tailwinds include growing cultural acceptance of trading/betting on events, strong sports catalysts (2026 FIFA World Cup), and the broader "financialisation of everything" trend. Headwinds include state-level bans (e.g. Massachusetts, Nevada, Connecticut), heavy concentration of volume in sports (~90%), and competition from Polymarket and DraftKings/FanDuel.
              </p>
            </section>

            {/* What We Must Believe */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                "What We Must Believe"
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">Four core beliefs underpin the thesis:</p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                <li>Prediction markets are a permanent new asset class</li>
                <li>Regulation will evolve in favour of CFTC-licensed exchanges</li>
                <li>The data layer has enduring value beyond trading fees</li>
                <li>First-mover advantage in regulated markets compounds over time</li>
              </ol>
            </section>

            {/* Risks & Mitigations */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Risks & Mitigations
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-2">Regulatory / Political Risk</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Although Kalshi operates under CFTC oversight, the product category is politically sensitive (especially around elections and sports), and state-level bans already exist.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    <strong>Mitigation:</strong> CFTC licence and active compliance posture provide some protection vs offshore competitors; diversified product mix beyond politics reduces headline risk.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-2">Concentration in Sports Betting</h3>
                  <p className="text-gray-700 leading-relaxed">
                    ~90% of volume currently comes from sports, exposing the business to regulatory changes and competition from major sportsbooks.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    <strong>Mitigation:</strong> Expansion into macro, politics and other event classes plus institutional hedging use-cases.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-2">Valuation Risk</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Entry at ~$11.77B reference valuation is demanding even with high growth and $600M+ revenue; any slowdown or adverse regulation could compress multiples sharply.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-2">Platform and Liquidity Risk</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Sustaining deep liquidity is critical; a negative regulatory shock or reputational issue could drive users to competitors and fragment liquidity.
                  </p>
                </div>
              </div>
            </section>

            {/* Legal & Structural Summary */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Legal & Structural Summary
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Pricing & Fees</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Forge is purchasing Kalshi shares at ~$320.76 per share, reflecting the recent $11B post-money Series E valuation. XAura's SPV will buy at a 7% premium to this primary price, i.e. $343.21 per share. The 7% uplift is intended to be captured entirely via this higher per-share price.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Instrument & Share Class</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The position is described as an investment into Series B Preferred shares with a 6% dividend. The shares are being acquired from an existing institutional investor already on Kalshi's cap table.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">SCF (Single Company Fund) Structure</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>XAura will purchase interests in a Forge-managed Single Company Fund that directly owns the underlying Kalshi shares and appears on the company's cap table.</li>
                    <li>The SCF is a "0/0 vehicle," meaning no ongoing expenses are charged to investors; economics are instead reflected in the initial 7% price premium.</li>
                    <li>Counterparty risk is initially to Forge, and then to Charles Schwab once the Forge–Schwab merger closes (targeted for end of Q1 2026).</li>
                    <li>Investors receive an annual NAV statement (audited) and an annual statement of ownership, and Forge acts as a registered asset manager.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Liquidity & Transfer</h3>
                  <p className="text-gray-700 leading-relaxed">
                    SCF investors will have liquidity in their underlying units after a minimum holding period of six months, subject to Forge's standard liquidity process.
                  </p>
                </div>
              </div>
            </section>

            {/* Video Placeholder */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Investment Video
              </h2>
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500 text-lg">🎥 Video coming soon</p>
                <p className="text-gray-400 text-sm mt-2">The investment walkthrough video will be added here shortly.</p>
              </div>
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

export default KalshiMemo;
