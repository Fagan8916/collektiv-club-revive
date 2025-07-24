import React from "react";
import ArticleLayout from "@/components/ArticleLayout";
import businessImage from "@/assets/business-documents-real.jpg";

const BareTrusts = () => {
  const content = (
    <div className="prose prose-lg max-w-none">
      <p className="text-xl text-gray-700 mb-8">
        When it comes to structuring investments in the UK's thriving startup and private markets, bare trusts are an essential, if sometimes overlooked, tool. They provide a blend of tax transparency, legal simplicity, and agility that is highly valued by angel syndicates and in the creation of Special Purpose Vehicles (SPVs).
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-collektiv-green">What Is a Bare Trust?</h2>
      <p>
        A bare trust (also known as a simple or nominee trust) is a legal arrangement where assets—often shares—are held by a trustee on behalf of beneficiaries. Unlike other types of trusts, a bare trust gives the beneficiaries immediate and absolute rights to both the capital and income of the trust. The trustee, acting as a nominee, has little discretion and must follow the lawful instructions of the beneficiaries.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-collektiv-green">Why Bare Trusts Matter to SPVs</h2>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-collektiv-dark">1. Tax Transparency and Simplicity</h3>
      <p>
        Bare trust SPVs are fundamentally tax-transparent. Investors are treated as the direct owners of the underlying assets for tax purposes, and the SPV itself is not subject to a separate layer of taxation. This is especially attractive for investors who favour clear, straightforward tax obligations and reporting requirements, regardless of their country of residence.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-collektiv-dark">2. Cost-Effective and Low Maintenance</h3>
      <p>
        Unlike more complex legal structures such as private fund limited partnerships, bare trust SPVs have lower setup and administrative costs. They require less ongoing governance and typically avoid burdensome annual filings. This efficiency makes them ideal for angel syndicates who want to minimise friction and maximise returns.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-collektiv-dark">3. Simplified Ownership and Collective Decision-Making</h3>
      <p>
        While the SPV itself holds a single voting right on the underlying shares, the bare trust structure enables multiple investors to be beneficial owners. The trustee votes as directed by the investors collectively, often coordinated by the syndicate lead or manager. This setup allows individual investors to have clear economic interests and participation in decisions without complicating the company's shareholder register with a large number of individual shareholders.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-collektiv-green">Bare Trusts in Angel Syndicates</h2>
      <p>Angel syndicates—groups of individuals co-investing in startup deals—benefit uniquely from bare trusts. Here's how:</p>

      <div className="bg-gray-50 p-6 rounded-lg my-8">
        <ul className="space-y-4">
          <li><strong>Aggregated Capital, Simple Cap Table:</strong> Bare trusts enable a group of angels to be represented as a single entity on the target company's share register, dramatically simplifying equity management for founders and future investors.</li>
          <li><strong>Transparency and Trust:</strong> Because bare trusts are transparent, beneficiaries know exactly what they own, with legal rights undisputed. Syndicate leads, who typically coordinate the deal and oversee structure, can act within clear legal boundaries.</li>
          <li><strong>Flexible Profit Sharing:</strong> Syndicate deals often include profit-sharing (carry) structures or fees to syndicate leads. Side agreements under the bare trust framework make it easy to assign and document these arrangements for each specific deal.</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-collektiv-green">Advantages Over Alternative Structures</h2>
      <div className="overflow-x-auto my-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-collektiv-green text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Feature</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Bare Trust SPV</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Alternative Structures (e.g., LP, LLP)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Legal complexity</td>
              <td className="px-6 py-4 text-sm text-gray-700">Low</td>
              <td className="px-6 py-4 text-sm text-gray-700">Medium to High</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Setup and admin costs</td>
              <td className="px-6 py-4 text-sm text-gray-700">Low</td>
              <td className="px-6 py-4 text-sm text-gray-700">Moderate to High</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Tax treatment</td>
              <td className="px-6 py-4 text-sm text-gray-700">Transparent</td>
              <td className="px-6 py-4 text-sm text-gray-700">Often transparent but more requirements</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Investor control</td>
              <td className="px-6 py-4 text-sm text-gray-700">Clear economic rights and decision participation via trustee</td>
              <td className="px-6 py-4 text-sm text-gray-700">Sometimes pooled or limited</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Cap table simplicity</td>
              <td className="px-6 py-4 text-sm text-gray-700">Single entry per deal</td>
              <td className="px-6 py-4 text-sm text-gray-700">Can be complex with multiple investors or units</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Suitability for angel syndicates</td>
              <td className="px-6 py-4 text-sm text-gray-700">Excellent</td>
              <td className="px-6 py-4 text-sm text-gray-700">Sometimes overkill for small groups</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-collektiv-green">When Does a Bare Trust Make Sense?</h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>For one-off or infrequent group investments where the cost and complexity of a full-fledged fund isn't warranted.</li>
        <li>Syndicate-led deals needing streamlined cap tables and clear legal ownership.</li>
        <li>International investors seeking simplicity and tax clarity.</li>
        <li>Investments in assets that benefit from clear, direct ownership such as shares or notes.</li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-collektiv-green">Key Takeaways</h2>
      <div className="bg-collektiv-green/10 p-6 rounded-lg">
        <ul className="space-y-3">
          <li>• Bare trusts provide a cost-effective, tax-transparent, and flexible vehicle for group angel investing through SPVs.</li>
          <li>• They maintain the economic interests and participation rights of each investor while streamlining the process for founders and administrators.</li>
          <li>• For modern angel syndicates and investment clubs, the bare trust model supports fast, collective action without sacrificing transparency or control.</li>
        </ul>
      </div>

      <p className="text-lg mt-8 text-gray-700 italic">
        In a landscape where speed, transparency, and flexibility drive successful early-stage investing, bare trusts remain at the heart of the smartest SPVs and well-run angel syndicates.
      </p>
    </div>
  );

  return (
    <ArticleLayout
      title="The Critical Role of Bare Trusts in SPVs and Angel Syndicates"
      date="January 24, 2025"
      author="Collektiv Team"
      category="Legal & Structure"
      content={content}
      image={businessImage}
    />
  );
};

export default BareTrusts;