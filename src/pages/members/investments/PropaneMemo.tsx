import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PropaneMemo = () => {
  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-collektiv-accent to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/members/investments/propane" className="inline-flex items-center mb-6 text-collektiv-green hover:underline">
          <ArrowLeft className="mr-2" size={20} />
          Back to Propane
        </Link>
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/8429af36-140a-4fc4-a401-e12fd22d19cc.png" 
              alt="Propane AI"
              className="h-20 w-auto object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-collektiv-green mb-2">Investment Memo: Propane AI</h1>
          <p className="text-gray-600">May 15, 2025</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <div className="bg-collektiv-accent/20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-collektiv-green mb-4">Investment Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Company:</strong> Propane AI</div>
                <div><strong>Sector:</strong> B2B SaaS / AI-Powered Customer Intelligence</div>
                <div><strong>Stage:</strong> Pre-seed</div>
                <div><strong>Amount Raised:</strong> €1.1M</div>
                <div><strong>Location:</strong> Copenhagen, Denmark</div>
                <div><strong>Website:</strong> <a href="https://usepropane.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">usepropane.ai</a></div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-collektiv-green mb-4">PART 1: WHY COLLEKTIV IS INVESTING</h2>
              
              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">1. SITUATION</h3>
              <h4 className="text-xl font-semibold mb-3">The Fundamental Problem in Modern SaaS</h4>
              <p className="mb-4 leading-relaxed">
                Product velocity has exploded. SaaS teams are shipping faster than ever—daily releases, continuous iterations, 
                real-time feature experiments. Yet they operate largely blind to the why behind customer behavior.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Product teams don't know why customers churn, buy, or stay</li>
                <li>GTM teams rely on static surveys, delayed feedback loops, and manual research that takes weeks</li>
                <li>Traditional research costs $350 per interview and doesn't scale</li>
                <li>Real-time customer understanding has become the competitive edge, but it's been inaccessible to fast-moving product companies</li>
              </ul>
              <p className="leading-relaxed">
                This is not a theoretical problem. Propane's founding team has validated this through 100+ discovery interviews 
                with product and GTM leaders across mid-market B2B SaaS. Every leader expressed the same pain: they move fast 
                but can't keep pace with their customers' signals.
              </p>

              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">2. PROBLEM</h3>
              <h4 className="text-xl font-semibold mb-3">Three Converging Market Pressures</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-semibold mb-2">A. Product Velocity Outpacing Customer Understanding</h5>
                  <p className="leading-relaxed">
                    Modern software companies iterate weekly or daily. Legacy research methods—quarterly customer interviews, 
                    manual note-taking, one-off surveys—create a 4-8 week lag between insight and execution. By then, the 
                    product has changed and the insight is stale.
                  </p>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-2">B. Static Tools Designed for a Different Era</h5>
                  <p className="leading-relaxed mb-2">
                    Survey tools (Typeform, SurveyMonkey, Google Forms) are form-based, require explicit opt-in, and generate 
                    quantitative noise. They miss the why—the narrative layer that explains decision drivers and emotional context.
                  </p>
                  <p className="leading-relaxed mb-2">
                    Analytics platforms (Mixpanel, Amplitude) show what users do, but never why. They're historical, not predictive, 
                    and cannot surface the qualitative reasoning behind churn, win/loss, or feature adoption.
                  </p>
                  <p className="leading-relaxed">
                    Customer research remains expensive and disconnected—consultants charge $50K–$500K per engagement for 
                    traditional research work that takes 2-3 months and produces static reports.
                  </p>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-2">C. AI Now Makes Real-Time, Always-On Research Possible</h5>
                  <p className="leading-relaxed">
                    For the first time, agentic AI makes continuous, personalized interviews at scale economically viable. 
                    Voice-based interfaces lower friction. Contextual prompting (using internal CRM/product data) focuses 
                    conversations on decision drivers, not opinions.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">3. SOLUTION / VALUE PROPOSITION</h3>
              <h4 className="text-xl font-semibold mb-3">Propane: The Always-On Customer Intelligence Layer</h4>
              <p className="mb-4 leading-relaxed">
                Propane replaces traditional research and NPS tools with AI-led interviews triggered by real customer actions. 
                It's lightweight, fast, contextual, and embeds directly into the workflows teams already use.
              </p>

              <h5 className="text-lg font-semibold mb-2">How it works:</h5>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li><strong>Design & Train:</strong> Customers set up contextual interview templates (NPS follow-up, churn, 
                win/loss, feature testing). Propane trains its AI agent using internal product, CRM, and support data for each user.</li>
                <li><strong>1:1 AI Interviews:</strong> The AI runs async, personalized conversations with each customer. 
                Interviews feel branded, conversational, and available 24/7 across channels (audio, text, eventually phone/email).</li>
                <li><strong>Analyze & Act:</strong> Insights surface in real-time—patterns, blockers, upsell signals. 
                Results flow directly into tools teams use (Slack, Notion, HubSpot, Salesforce).</li>
              </ol>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="leading-relaxed">
                  <strong>Continuous Learning:</strong> Propane builds a proprietary knowledge graph from every interview 
                  and data integration, continuously improving its understanding of each customer and refining future questions.
                </p>
              </div>

              <p className="leading-relaxed">
                <strong>Key Differentiator:</strong> Unlike competitor tools, Propane is purpose-built for B2B SaaS product 
                and GTM teams, deeply integrated with CRM and product data. It doesn't just collect feedback—it contextualizes 
                it, structures it, and delivers it where teams work.
              </p>

              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">4. USP - Unfair Advantages & Defensibility</h3>
              <p className="mb-4 leading-relaxed">Multiple layers of defensibility:</p>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-semibold mb-2">1. Purpose-Built for B2B SaaS Product & GTM (Category Creation)</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Competitors focus on consumer insights (ListenLabs, Elis.ai) or generic research (Perspective, Dovetail)</li>
                    <li>Propane is architected for product and GTM workflows—with integrations for HubSpot, Slack, Notion, 
                    and usage analytics</li>
                    <li>This creates a strong wedge and land-and-expand moat</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-2">2. Contextual AI Architecture</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Propane's AI uses CRM, product usage, and support ticket data to personalize every interview</li>
                    <li>This depth of context is a technical moat—competitors cannot replicate without similar data integrations 
                    and prompt engineering</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-2">3. Data Network Effects</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Every interview improves Propane's models—it learns what questions drive the deepest insights, 
                    refining its approach over time</li>
                    <li>This creates a flywheel: more users → more interviews → better AI → better insights → more users</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-2">4. High Switching Costs</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Once embedded in workflows (Slack, Notion, HubSpot), Propane becomes part of the operating rhythm</li>
                    <li>The historical knowledge graph it builds becomes increasingly valuable and hard to replace</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-collektiv-green mb-4">PART 2: INVESTMENT THESIS</h2>
              
              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">Market Opportunity</h3>
              <p className="mb-4 leading-relaxed">
                The customer insights and research market is estimated at $20B+ globally, spanning survey tools, analytics, 
                user research platforms, and consulting services. Within this:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Survey & Feedback Tools:</strong> $3B+ market (SurveyMonkey, Typeform, Qualtrics)</li>
                <li><strong>Product Analytics:</strong> $5B+ market (Mixpanel, Amplitude, Heap)</li>
                <li><strong>Customer Research & Consulting:</strong> $12B+ market (traditional research firms)</li>
              </ul>
              <p className="leading-relaxed mb-4">
                Propane targets mid-market B2B SaaS companies (50-2,000 employees) with product-led or hybrid GTM motions. 
                This segment represents ~35,000 companies globally and is growing 15-20% annually.
              </p>
              <p className="leading-relaxed">
                <strong>TAM Wedge:</strong> Propane focuses initially on post-Series A SaaS companies ($5M-$50M ARR) that 
                have product-market fit but need to scale efficiently. This represents a $500M-$1B addressable opportunity 
                in the next 3-5 years.
              </p>

              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">Business Model & Unit Economics</h3>
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-semibold mb-2">Pricing Model</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Starter:</strong> $499/month (up to 100 interviews/month)</li>
                    <li><strong>Growth:</strong> $1,499/month (up to 500 interviews/month)</li>
                    <li><strong>Scale:</strong> $4,999/month (unlimited interviews + white-glove support)</li>
                    <li><strong>Enterprise:</strong> Custom pricing (custom integrations, dedicated AI training, SLA)</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-2">Revenue Model</h5>
                  <p className="leading-relaxed mb-2">
                    Propane follows a land-and-expand SaaS model:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Land with product teams (NPS, churn interviews)</li>
                    <li>Expand to GTM (win/loss analysis, upsell research)</li>
                    <li>Upsell advanced features (custom AI training, priority integrations)</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-2">Unit Economics (Projected at Scale)</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>CAC:</strong> $3,000 (enterprise-focused outbound + PLG funnel)</li>
                    <li><strong>LTV:</strong> $45,000 (avg. $1,500/month contract, 30-month retention)</li>
                    <li><strong>LTV:CAC Ratio:</strong> 15:1 (exceptional for early-stage SaaS)</li>
                    <li><strong>Gross Margin:</strong> 85%+ (software-only, minimal infrastructure costs)</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">Competitive Landscape</h3>
              <p className="mb-4 leading-relaxed">
                Propane operates in a fragmented market with indirect competitors across three categories:
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-collektiv-green text-white">
                      <th className="border border-gray-300 p-3 text-left">Category</th>
                      <th className="border border-gray-300 p-3 text-left">Competitors</th>
                      <th className="border border-gray-300 p-3 text-left">Weakness</th>
                      <th className="border border-gray-300 p-3 text-left">Propane's Edge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">Survey Tools</td>
                      <td className="border border-gray-300 p-3">Typeform, SurveyMonkey</td>
                      <td className="border border-gray-300 p-3">Static forms, no AI, low response rates</td>
                      <td className="border border-gray-300 p-3">Conversational AI, contextual, async</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">Analytics Platforms</td>
                      <td className="border border-gray-300 p-3">Mixpanel, Amplitude</td>
                      <td className="border border-gray-300 p-3">Show "what" not "why"</td>
                      <td className="border border-gray-300 p-3">Qualitative insights, decision drivers</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">Research Tools</td>
                      <td className="border border-gray-300 p-3">Dovetail, UserTesting</td>
                      <td className="border border-gray-300 p-3">Manual, slow, expensive</td>
                      <td className="border border-gray-300 p-3">Automated, always-on, scalable</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">AI Consumer Insights</td>
                      <td className="border border-gray-300 p-3">ListenLabs, Elis.ai</td>
                      <td className="border border-gray-300 p-3">Consumer-focused, no B2B integrations</td>
                      <td className="border border-gray-300 p-3">B2B SaaS workflows, CRM integration</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="leading-relaxed">
                <strong>Key Insight:</strong> No direct competitor combines AI-led interviews, B2B SaaS integrations, 
                and real-time insights delivery. Propane is creating a new category.
              </p>

              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">Team</h3>
              <p className="mb-4 leading-relaxed">
                Propane is led by experienced founders with complementary skills in product, AI, and GTM:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Founder & CEO:</strong> Former Head of Product at a Series B SaaS company; 8+ years building 
                developer tools and analytics platforms</li>
                <li><strong>Co-Founder & CTO:</strong> AI/ML engineer with experience at Google and OpenAI; PhD in NLP 
                and conversational AI</li>
                <li><strong>Advisors:</strong> Includes VP of Product at a $1B+ SaaS unicorn and former Gartner analyst 
                covering customer experience platforms</li>
              </ul>
              <p className="leading-relaxed">
                The team has deep domain expertise, strong technical execution capabilities, and a proven ability to ship 
                fast (MVP to paying customers in 4 months).
              </p>

              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">Traction & Milestones</h3>
              <div className="bg-green-50 p-6 rounded-lg space-y-3">
                <div>
                  <strong>Current Traction (as of May 2025):</strong>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>12 paying customers (mix of Starter and Growth plans)</li>
                    <li>$18K MRR (~$216K ARR)</li>
                    <li>1,200+ AI-led interviews completed</li>
                    <li>92% customer satisfaction (based on NPS)</li>
                    <li>5 enterprise pilots in progress</li>
                  </ul>
                </div>
                <div>
                  <strong>12-Month Roadmap:</strong>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li><strong>Q2 2025:</strong> Launch voice interviews, expand integrations (Salesforce, Intercom)</li>
                    <li><strong>Q3 2025:</strong> Reach $50K MRR, onboard 50+ customers</li>
                    <li><strong>Q4 2025:</strong> Launch predictive insights engine (AI-powered trend detection)</li>
                    <li><strong>Q1 2026:</strong> Achieve $100K MRR, expand to 100+ customers</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">Key Risks & Mitigations</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-collektiv-green text-white">
                      <th className="border border-gray-300 p-3 text-left">Risk</th>
                      <th className="border border-gray-300 p-3 text-left">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">AI quality and reliability</td>
                      <td className="border border-gray-300 p-3">Continuous model training; human-in-the-loop review for 
                      critical insights; 95%+ accuracy benchmarks</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">Customer adoption friction</td>
                      <td className="border border-gray-300 p-3">PLG motion with free trial; pre-built templates; 
                      onboarding support; fast time-to-value (first insights in 48 hours)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">Competition from incumbents</td>
                      <td className="border border-gray-300 p-3">First-mover advantage in AI-led interviews; deep B2B SaaS 
                      focus; strong data moat from network effects</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">Data privacy and security</td>
                      <td className="border border-gray-300 p-3">SOC 2 compliance roadmap; GDPR-ready architecture; 
                      enterprise-grade security from day one</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-collektiv-green mb-4">PART 3: DEAL STRUCTURE</h2>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Investment Terms</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Round Size:</strong> €1.1M pre-seed</li>
                    <li><strong>Valuation:</strong> €8M post-money (SAFE)</li>
                    <li><strong>Collektiv Allocation:</strong> €50K</li>
                    <li><strong>Lead Investor:</strong> Founder of Lovable.dev</li>
                    <li><strong>Other Investors:</strong> Nordic angel syndicate, strategic angels from SaaS</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Use of Funds</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Product Development (40%):</strong> Voice interviews, predictive insights, new integrations</li>
                    <li><strong>GTM & Sales (35%):</strong> Hire 2 AEs, build outbound engine, expand marketing</li>
                    <li><strong>Operations & Infrastructure (15%):</strong> SOC 2 compliance, scaling infrastructure</li>
                    <li><strong>Team Expansion (10%):</strong> Key engineering and customer success hires</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Investment Timeline</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Closing Date:</strong> May 30, 2025</li>
                    <li><strong>First Capital Call:</strong> June 2025</li>
                    <li><strong>Expected Series A:</strong> Q3 2026 (18-month runway)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-collektiv-green mb-4">PART 4: INVESTMENT DECISION</h2>
              
              <h3 className="text-2xl font-semibold text-collektiv-green mt-6 mb-3">Recommendation: INVEST</h3>
              
              <p className="mb-4 leading-relaxed">
                Propane represents a compelling early-stage investment opportunity with strong potential for category creation 
                and rapid growth. The company addresses a clear, validated pain point in the B2B SaaS market with a 
                differentiated AI-powered solution.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <h4 className="text-lg font-semibold mb-3">Key Investment Highlights:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Clear Market Opportunity:</strong> $500M+ TAM in growing B2B SaaS segment</li>
                  <li><strong>Strong Product-Market Fit:</strong> 12 paying customers, 92% NPS, rapid adoption</li>
                  <li><strong>Experienced Team:</strong> Domain expertise in product, AI, and SaaS GTM</li>
                  <li><strong>Technical Moat:</strong> Contextual AI architecture with data network effects</li>
                  <li><strong>Capital Efficient:</strong> Strong unit economics, land-and-expand model</li>
                  <li><strong>Strategic Validation:</strong> Investment from Lovable.dev founder signals strong market credibility</li>
                </ul>
              </div>

              <h4 className="text-lg font-semibold mb-3">Why This Investment Makes Sense for Collektiv:</h4>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Aligned with Thesis:</strong> Early-stage B2B SaaS with AI differentiation</li>
                <li><strong>Co-Investment Opportunity:</strong> Strong lead investor reduces risk</li>
                <li><strong>Network Value:</strong> Potential portfolio synergies with other SaaS companies</li>
                <li><strong>Learning Opportunity:</strong> Exposure to cutting-edge AI application in enterprise</li>
              </ul>

              <h4 className="text-lg font-semibold mb-3">Next Steps:</h4>
              <ol className="list-decimal list-inside space-y-2">
                <li>Review and approve investment by May 20, 2025</li>
                <li>Complete legal documentation (SAFE agreement)</li>
                <li>Submit capital commitment by May 25, 2025</li>
                <li>Participate in syndicate onboarding call (May 27, 2025)</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm italic text-gray-600 space-y-4">
            <div>
              <h4 className="font-semibold not-italic mb-1">Disclaimer</h4>
              <p>This document has been prepared by Collektiv (Company Registration No. 16328246), headquartered at 4th floor, 4 turnble street ec4, and is intended solely for informational purposes. It does not constitute an offer to sell or a solicitation to buy any financial securities. All information included herein has been provided by the Company and has not undergone independent verification.</p>
            </div>
            
            <div>
              <h4 className="font-semibold not-italic mb-1">Investment Decisions</h4>
              <p>Members are fully responsible for their own investment decisions. While Collektiv facilitates co-investment opportunities through deal-specific SPVs, investors are solely accountable for evaluating risks and potential returns before participating.</p>
            </div>
            
            <div>
              <h4 className="font-semibold not-italic mb-1">Confidentiality Statement</h4>
              <p>This document is strictly intended for members of Collektiv Limited and may contain confidential and proprietary information. Any unauthorised access, sharing, or dissemination of this content is prohibited unless prior written approval is obtained from an authorised Director of Collektiv Limited.</p>
            </div>
            
            <div>
              <h4 className="font-semibold not-italic mb-1">Tax Advice</h4>
              <p>Collektiv does not provide tax advice. Investors are encouraged to consult qualified tax professionals to understand the personal tax implications associated with investments made via our SPVs.</p>
            </div>
            
            <div>
              <h4 className="font-semibold not-italic mb-1">About SPVs</h4>
              <p>A Special Purpose Vehicle (SPV) is an independent entity created by Collektiv to limit financial exposure. This structure allows syndicate members to invest in specific assets without assuming the risks tied to Collektiv's broader portfolio.</p>
            </div>
            
            <div>
              <h4 className="font-semibold not-italic mb-1">Risks of Early-Stage Investments</h4>
              <p>Investing in startups and early-stage businesses carries significant risks and uncertainties. Investors should be aware that such investments could result in the complete loss of their capital. Historical performance does not guarantee future results.</p>
            </div>
            
            <div>
              <h4 className="font-semibold not-italic mb-1">Intellectual Property</h4>
              <p>All trademarks, logos, and service marks featured in this document are owned by Collektiv or third parties, which may not necessarily be affiliated with or endorsed by Collektiv.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropaneMemo;
