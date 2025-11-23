import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BeImpactMemo = () => {
  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-collektiv-accent to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/members/investments/beimpact" className="inline-flex items-center mb-6 text-collektiv-green hover:underline">
          <ArrowLeft className="mr-2" size={20} />
          Back to be/impact Overview
        </Link>
        
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/beimpact-logo.jpg" 
            alt="be/impact"
            className="h-20 w-auto object-contain mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-collektiv-green mb-2">Investment Memo: be/impact</h1>
          <p className="text-gray-600">Prepared by Collektiv Club | December 2024</p>
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
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Company</td>
                    <td className="border border-gray-300 p-3">be/impact</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Industry</td>
                    <td className="border border-gray-300 p-3">B2B SaaS – Learning & Development, ESG/CSR Investment</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Funding Stage</td>
                    <td className="border border-gray-300 p-3">Seed</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Investment Amount</td>
                    <td className="border border-gray-300 p-3">£30k SEIS available to Collektiv Club</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Expected Valuation</td>
                    <td className="border border-gray-300 p-3">£4m</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Website</td>
                    <td className="border border-gray-300 p-3">
                      <a href="https://beimpact.co.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        beimpact.co.uk
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Part 1: Syndicate Thesis */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Part 1: Syndicate Thesis
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Situation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The corporate learning and development (L&D) sector faces a significant challenge: knowledge retention from traditional 
                    training programs remains stubbornly low, with employees typically retaining only 10-20% of what they learn. Meanwhile, 
                    corporate social responsibility (CSR) programs often lack measurable impact and fail to engage employees meaningfully. 
                    be/impact has identified an opportunity to address both challenges simultaneously through an innovative "teach-to-learn" model.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Problem</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Organizations are facing three critical challenges:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li><strong>Poor Knowledge Retention:</strong> Traditional corporate training yields low retention rates, resulting in wasted 
                    training budgets and limited skill development</li>
                    <li><strong>Ineffective CSR Programs:</strong> Most corporate social responsibility initiatives struggle to demonstrate 
                    tangible impact or meaningful employee engagement</li>
                    <li><strong>Disconnected Initiatives:</strong> L&D and CSR programs operate in silos, missing opportunities for synergy 
                    and amplified impact</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Solution & Value Proposition</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    be/impact provides a B2B SaaS platform that revolutionizes corporate training by enabling employees to teach their skills 
                    to nonprofit organizations. This "teach-to-learn" methodology:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Achieves 300% better knowledge retention compared to traditional training methods</li>
                    <li>Generates 40x higher social value than conventional CSR activities</li>
                    <li>Provides measurable ESG impact reporting for corporate stakeholders</li>
                    <li>Creates genuine engagement by connecting employees' professional development with meaningful social impact</li>
                    <li>Reduces training costs while simultaneously enhancing CSR effectiveness</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    The platform creates a win-win-win scenario: employees develop deeper expertise through teaching, nonprofits gain 
                    valuable skills and support, and corporations achieve superior training outcomes with quantifiable social impact.
                  </p>
                </div>
              </div>
            </section>

            {/* Part 2: Investment Thesis */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Part 2: Investment Thesis
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Market Analysis & Opportunity</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The global corporate training market is valued at over $370 billion annually, with digital L&D platforms experiencing 
                    rapid adoption. The ESG/CSR sector represents an additional $20+ billion market, driven by increased regulatory requirements 
                    and stakeholder demands for measurable social impact.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Key Market Drivers:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Growing recognition that traditional training methods are ineffective and costly</li>
                    <li>Increased pressure on corporations to demonstrate ESG commitment and measurable impact</li>
                    <li>Rising employee expectations for purpose-driven work and social responsibility</li>
                    <li>Shift toward skills-based development and practical application of knowledge</li>
                    <li>Remote work creating demand for innovative, engaging virtual training solutions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Business Model & Revenue Streams</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    be/impact operates on a B2B SaaS subscription model with multiple revenue streams:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li><strong>Platform Subscription:</strong> Annual or monthly fees based on company size and number of active users</li>
                    <li><strong>Implementation & Training:</strong> Onboarding services to integrate the platform into existing L&D programs</li>
                    <li><strong>Impact Reporting:</strong> Premium analytics and ESG reporting tools for stakeholder communications</li>
                    <li><strong>Enterprise Features:</strong> Custom integrations, white-label options, and dedicated support for larger clients</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    The model benefits from strong unit economics, with low customer acquisition costs due to demonstrated ROI 
                    (improved training outcomes + CSR impact) and high retention driven by embedded workflows and measurable results.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Competitive Positioning</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    be/impact occupies a unique position at the intersection of L&D and impact measurement, differentiating itself through:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li><strong>Novel Methodology:</strong> The teach-to-learn approach is scientifically validated but not widely adopted 
                    in corporate settings, creating a strong competitive moat</li>
                    <li><strong>Dual Value Proposition:</strong> Addresses both training effectiveness and CSR impact, unlike competitors 
                    who typically focus on one or the other</li>
                    <li><strong>Measurable Outcomes:</strong> Platform provides quantifiable metrics for both learning retention and 
                    social impact, supporting data-driven decision-making</li>
                    <li><strong>Nonprofit Network:</strong> Curated partnerships with nonprofits create value and barriers to entry</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Team Assessment</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The founding team brings complementary expertise in learning & development, impact measurement, and technology:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li><strong>Julian Buschmaas, CEO:</strong> Former BCG consultant and UN programme officer with extensive background 
                    in L&D and social impact. LSE graduate with deep understanding of corporate learning challenges and ESG requirements.</li>
                    <li><strong>Fabien Laplace, Co-founder:</strong> Former teacher and education specialist with proven product and 
                    operations expertise. Brings practical knowledge of learning methodologies and user experience design.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    The team's combination of corporate consulting experience, impact sector knowledge, and educational expertise 
                    positions them well to execute on the vision and navigate both the enterprise sales process and nonprofit partnerships.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Financials & Projections</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    be/impact is in the early stages of commercialization with initial pilot customers demonstrating strong proof of concept:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Pilot programs showing 300% improvement in knowledge retention metrics</li>
                    <li>Social impact reporting validating 40x higher value compared to traditional CSR</li>
                    <li>Strong interest from mid-market and enterprise organizations seeking innovative L&D and CSR solutions</li>
                    <li>Clear path to profitability through scalable SaaS model with improving unit economics</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    This Seed round will fund product development, initial sales and marketing efforts, and expansion of the 
                    nonprofit partner network.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Key Risks & Mitigations</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left font-semibold">Risk</th>
                          <th className="border border-gray-300 p-3 text-left font-semibold">Mitigation Strategy</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3">
                            <strong>Adoption Resistance:</strong> Corporations may be slow to adopt new training methodologies
                          </td>
                          <td className="border border-gray-300 p-3">
                            Pilot programs demonstrating measurable ROI; focus on early adopters in innovation-forward sectors; 
                            leverage strong case studies and data
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">
                            <strong>Nonprofit Capacity:</strong> Limited availability of nonprofit partners or quality concerns
                          </td>
                          <td className="border border-gray-300 p-3">
                            Curated network approach with vetting process; ongoing nonprofit support and training; scalable 
                            partnership model
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">
                            <strong>Sales Cycle Length:</strong> Enterprise B2B sales can be lengthy and resource-intensive
                          </td>
                          <td className="border border-gray-300 p-3">
                            Target mid-market segment with shorter sales cycles; build repeatable sales playbook; leverage 
                            founder's enterprise relationships
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">
                            <strong>Market Education:</strong> Novel concept requires significant market education effort
                          </td>
                          <td className="border border-gray-300 p-3">
                            Content marketing highlighting scientific backing; partnerships with L&D thought leaders; clear 
                            ROI demonstration tools
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Part 3: Deal Structure */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Part 3: Deal Structure
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Investment Terms</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li><strong>Round:</strong> Seed funding</li>
                    <li><strong>Allocation to Collektiv Club:</strong> £30,000 SEIS</li>
                    <li><strong>Expected Valuation:</strong> £4 million</li>
                    <li><strong>Instrument:</strong> Details available in the data room</li>
                    <li><strong>SEIS Eligibility:</strong> Confirmed, providing significant tax benefits to eligible UK investors</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Investment Timeline & Process</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Collektiv Club members interested in participating should:
                  </p>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                    <li>Review the full data room and pitch recording linked on the investment page</li>
                    <li>Attend any scheduled Q&A sessions with the founders</li>
                    <li>Express investment interest through the designated channel</li>
                    <li>Complete necessary documentation for SPV participation</li>
                    <li>Transfer funds according to the SPV terms and timeline</li>
                  </ol>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    All investments will be made through a Collektiv-managed SPV structure, which provides investors with streamlined 
                    administration, collective negotiating power, and simplified ongoing management.
                  </p>
                </div>
              </div>
            </section>

            {/* Part 4: Investment Decision */}
            <section>
              <h2 className="text-2xl font-bold text-collektiv-green mb-4 border-b-2 border-collektiv-green pb-2">
                Part 4: Investment Decision
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Recommendation</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    be/impact represents an attractive early-stage investment opportunity for Collektiv Club members seeking exposure 
                    to the intersection of corporate learning, ESG, and social impact. The investment thesis is supported by:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Novel, scientifically-validated approach addressing clear market pain points</li>
                    <li>Strong founding team with relevant expertise and networks</li>
                    <li>Dual value proposition creating competitive differentiation</li>
                    <li>Large addressable market with favorable macro trends</li>
                    <li>Favorable deal terms with SEIS tax benefits</li>
                    <li>Early proof of concept demonstrated through pilot programs</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    As with all early-stage investments, this opportunity carries significant risk, including the potential for total 
                    loss of capital. However, the unique positioning, strong team, and clear market need make this an opportunity 
                    worthy of consideration for investors with appropriate risk tolerance and portfolio diversification.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-collektiv-green mb-3">Next Steps for Members</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                    <li>Review all due diligence materials in the data room</li>
                    <li>Watch the pitch recording to hear directly from the founders</li>
                    <li>Attend Q&A sessions to address any questions or concerns</li>
                    <li>Conduct your own independent research and consult advisors as appropriate</li>
                    <li>Make your investment decision based on your personal investment criteria and risk tolerance</li>
                    <li>If proceeding, complete the SPV documentation and funding process</li>
                  </ol>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        {/* Disclaimer Section */}
        <div className="mt-8 pt-6 border-t border-gray-300">
          <div className="text-sm italic text-gray-600 space-y-4">
            <div>
              <h4 className="font-semibold not-italic mb-1">Disclaimer</h4>
              <p>
                This document has been prepared by Collektiv (Company Registration No. 16328246), headquartered at 4th floor, 
                4 turnble street ec4, and is intended solely for informational purposes. It does not constitute an offer to sell 
                or a solicitation to buy any financial securities. All information included herein has been provided by the Company 
                and has not undergone independent verification.
              </p>
            </div>

            <div>
              <h4 className="font-semibold not-italic mb-1">Investment Decisions</h4>
              <p>
                Members are fully responsible for their own investment decisions. While Collektiv facilitates co-investment 
                opportunities through deal-specific SPVs, investors are solely accountable for evaluating risks and potential 
                returns before participating.
              </p>
            </div>

            <div>
              <h4 className="font-semibold not-italic mb-1">Confidentiality Statement</h4>
              <p>
                This document is strictly intended for members of Collektiv Limited and may contain confidential and proprietary 
                information. Any unauthorised access, sharing, or dissemination of this content is prohibited unless prior written 
                approval is obtained from an authorised Director of Collektiv Limited.
              </p>
            </div>

            <div>
              <h4 className="font-semibold not-italic mb-1">Tax Advice</h4>
              <p>
                Collektiv does not provide tax advice. Investors are encouraged to consult qualified tax professionals to understand 
                the personal tax implications associated with investments made via our SPVs.
              </p>
            </div>

            <div>
              <h4 className="font-semibold not-italic mb-1">About SPVs</h4>
              <p>
                A Special Purpose Vehicle (SPV) is an independent entity created by Collektiv to limit financial exposure. This 
                structure allows syndicate members to invest in specific assets without assuming the risks tied to Collektiv's 
                broader portfolio.
              </p>
            </div>

            <div>
              <h4 className="font-semibold not-italic mb-1">Risks of Early-Stage Investments</h4>
              <p>
                Investing in startups and early-stage businesses carries significant risks and uncertainties. Investors should be 
                aware that such investments could result in the complete loss of their capital. Historical performance does not 
                guarantee future results.
              </p>
            </div>

            <div>
              <h4 className="font-semibold not-italic mb-1">Intellectual Property</h4>
              <p>
                All trademarks, logos, and service marks featured in this document are owned by Collektiv or third parties, which 
                may not necessarily be affiliated with or endorsed by Collektiv.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeImpactMemo;
