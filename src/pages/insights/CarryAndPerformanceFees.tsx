import React from "react";
import ArticleLayout from "@/components/ArticleLayout";

const CarryAndPerformanceFees = () => {
  return (
    <ArticleLayout
      title="What Are Carry and Performance Fees?"
      date="January 25, 2025"
      author="Investment Team"
      category="Angel Investing"
      image="/lovable-uploads/d7216f53-dbaf-46e5-a9ae-e407297c311d.png"
      content={
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-700 mb-8">
            In investment vernacular, carry, short for carried interest, is a form of performance fee. It represents a share of the profits that the lead investor or syndicate organiser earns on successful investments.
          </p>

          <h2>Understanding Carry and Performance Fees</h2>
          <p>
            Typically, this percentage ranges between 15 and 25 per cent of the profits realised from deals. It is important to note that carry is only paid out when the investment yields a profit — no carry is earned on losses or the initial capital invested.
          </p>

          <p>
            Performance fees more broadly refer to charges related to how well the investment performs, often distinguishing them from flat management fees. Carry is a quintessential performance fee, reinforcing a model where earnings by the syndicate lead stem directly from success.
          </p>

          <h2>How Carry Works in Angel Syndicates</h2>
          <p>
            Angel syndicates are groups of investors who pool their resources to invest collectively in startups and early-stage companies. The syndicate lead typically vets deals, conducts due diligence, and manages communication and investment paperwork. Carry serves as a performance incentive for this individual.
          </p>

          <p>
            The mechanism works on a deal-by-deal basis, meaning the lead receives a percentage of profits from specific deals that succeed. This deal-specific carry structure benefits both the syndicate lead and the overall group, because:
          </p>

          <ul>
            <li>It motivates the lead to find and manage high-potential startups, given their remuneration depends on profitable exits.</li>
            <li>It ensures that leads only earn carry when the investors see returns, establishing a transparent and trust-based relationship.</li>
          </ul>

          <p>
            This incentive alignment encourages active involvement and support post-investment, often critical in helping startups grow and succeed.
          </p>

          <h2>Positives of Carry for Angel Syndicates</h2>
          <p>
            For syndicate leads and investors alike, carry offers several distinct advantages that contribute to a thriving angel investment ecosystem:
          </p>

          <h3>For Syndicate Leads</h3>
          <ul>
            <li><strong>Aligned Incentives:</strong> Carry means syndicate leads are financially motivated to work hard on deal sourcing, due diligence, and portfolio monitoring, as their rewards come from actual investment success.</li>
            <li><strong>Scalable Earnings:</strong> Unlike flat fees, carry allows leads to benefit substantially if some investments yield outsized returns.</li>
            <li><strong>Low Upfront Cost:</strong> Carry is not charged upfront, making angel syndicates more accessible and attractive to investors who pay fees only on gains.</li>
          </ul>

          <h3>For Investors</h3>
          <ul>
            <li><strong>Access to Expertise:</strong> Carry compensates knowledgeable leads who filter quality deals and reduce investment risks through thorough vetting.</li>
            <li><strong>Shared Risk and Reward:</strong> Investors avoid paying fees on losses and only share profits, making the syndicate model fair and performance-driven.</li>
            <li><strong>Transparency and Accountability:</strong> Carry fosters a culture where leads must prove their value through successful outcomes, increasing trust and collaboration.</li>
          </ul>

          <h2>Summary</h2>
          <p>
            Carry or performance fees play a vital role in angel syndicates by building a symbiotic relationship between syndicate leads and investors. This fee structure champions performance, incentivising leads to exert full effort in deal sourcing, evaluation, and portfolio management while protecting investors from paying fees without returns.
          </p>

          <p>
            The result is a powerful model that fuels the growth of promising startups, benefits investors with professional oversight and curated deal flow, and rewards syndicate leads for their expertise and commitment.
          </p>

          <p>
            In the dynamic world of early-stage investing, carry fees ensure that all stakeholders remain aligned and motivated, thereby enhancing the potential for meaningful returns and innovation-driven success.
          </p>
        </div>
      }
    />
  );
};

export default CarryAndPerformanceFees;