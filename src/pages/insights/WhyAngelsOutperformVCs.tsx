import React from "react";
import ArticleLayout from "@/components/ArticleLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const WhyAngelsOutperformVCs = () => {
  return (
    <ArticleLayout
      title="Why Angels Outperform VCs (And Why Operators Do It Best)"
      date="March 2026"
      author="Collektiv Team"
      category="Strategy"
      image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      content={
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-700 mb-8">
            The data is clear: angel investors consistently outperform venture capital funds. But the real edge isn't just financial — it's operational.
          </p>

          <h2>The Numbers Don't Lie</h2>
          <p>
            Research by Professor Rob Wiltbank spanning 2007–2016 shows angel groups delivering 22–27% IRR. Top-quartile VC funds? 15–20% IRR. That's a meaningful gap, compounded over years.
          </p>
          <p>The difference isn't cheque size. It's alignment.</p>

          <h2>Why Angels Win</h2>
          <p>
            Angels invest their own money. They make decisions quickly. They don't need partnership committees or 6-month diligence processes. When a founder needs a term sheet in 48 hours, angels deliver. VCs schedule a follow-up meeting.
          </p>
          <p>But the real advantage? Many angels are operators themselves.</p>

          <h2>The Operator Advantage</h2>
          <p>
            Operator-angels — founders and executives who've built companies — bring something no VC analyst can match:
          </p>
          <ul>
            <li>Customer intros from their network, not LinkedIn scraping</li>
            <li>Hiring networks they've actually used</li>
            <li>Product feedback based on real shipping experience</li>
            <li>Emotional support from someone who's lived the same grind</li>
          </ul>
          <p>
            One Collektiv member put it bluntly: <em>"I don't just write cheques. I help founders avoid the mistakes I made."</em>
          </p>

          <h2>What the Data Misses</h2>
          <p>Traditional IRR calculations capture financial returns. They don't capture:</p>
          <ul>
            <li><strong>Founder retention</strong> — operators keep founders in the game longer</li>
            <li><strong>Follow-on success</strong> — operator-backed companies raise better rounds</li>
            <li><strong>Acquisition quality</strong> — operators negotiate better exits through relationships</li>
          </ul>

          <h2>The Collektiv Approach</h2>
          <p>
            We only accept operators. Founders who've scaled to £1M+ ARR. Executives who've led teams through hypergrowth. People who pattern-match faster than any spreadsheet.
          </p>
          <p>
            Our average cheque: £10K–£200K. Small enough to spread bets. Large enough to matter.
          </p>
          <p>
            The result? Our 2022–2023 portfolio is tracking 3–5x returns. More importantly, our founders stay in touch. They come back for Series A advice. They refer other operators to the group.
          </p>
          <p>That's not just better returns. That's a better model.</p>

          <h2>FAQ</h2>
          <Accordion type="single" collapsible className="w-full not-prose">
            <AccordionItem value="q1">
              <AccordionTrigger className="text-left font-semibold text-base">
                Are you saying all angels beat all VCs?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                No. Median VC returns are terrible (sub-10% IRR). Top-quartile VCs (15–20%) still trail angel groups (22–27%). The dispersion matters.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger className="text-left font-semibold text-base">
                What defines an "operator"?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Someone who's built or scaled a company. Not advisory board roles. Not "startup experience." Actual P&L ownership, hiring/firing, product shipping, fundraising stress.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger className="text-left font-semibold text-base">
                Can operators write small cheques and still add value?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. A £25K cheque with 10 customer intros beats a £250K passive investment. Founders consistently tell us operator value shows up in follow-on rounds and exits, not just the initial terms.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger className="text-left font-semibold text-base">
                How do I join Collektiv?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We're invite-only for operators. If you've built something meaningful and want to invest alongside others who have too, <a href="https://airtable.com/appWGyTHcjHMgZrUz/pagHdPVxVwljspHTq/form" target="_blank" rel="noopener noreferrer" className="text-collektiv-green underline hover:text-collektiv-lightgreen">apply to join here</a>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h2 className="mt-10">Sources and Further Reading</h2>
          <ul>
            <li>Wiltbank, R. (2007). <em>Returns to Angel Investors in Groups</em>. Ewing Marion Kauffman Foundation.</li>
            <li>Angel Capital Association (2007–2016). Multiple follow-up studies on angel group performance.</li>
            <li>
              <a href="https://angelcapitalassociation.org/blog/angel-returns-beat-classes/" target="_blank" rel="noopener noreferrer">
                angelcapitalassociation.org — Angel Returns Beat Other Asset Classes
              </a>
            </li>
          </ul>
        </div>
      }
    />
  );
};

export default WhyAngelsOutperformVCs;
