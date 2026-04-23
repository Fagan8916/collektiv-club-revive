import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Deal = {
  slug: string;
  name: string;
  logo_url: string | null;
  memo: string | null;
};

const DynamicDealMemo = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("investment_deals")
        .select("slug, name, logo_url, memo")
        .eq("slug", slug)
        .maybeSingle();
      setDeal((data as Deal | null) ?? null);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-collektiv-accent to-white">
        <p className="text-collektiv-green">Loading memo…</p>
      </div>
    );
  }

  if (!deal || !deal.memo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-collektiv-accent to-white p-6">
        <p className="text-collektiv-dark mb-4">No memo available for this deal.</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          Back
        </Button>
      </div>
    );
  }

  // Parse memo into structured blocks.
  // Heading conventions (any of):
  //  - Markdown: "## Heading" or "### Heading"
  //  - Bold-wrapped: "**Heading**"
  //  - Short line ending with ":"  (≤ 80 chars)
  //  - ALL-CAPS short line (≤ 60 chars, mostly letters) e.g. "PROBLEM", "SOLUTION"
  // Also: when a heading appears glued to the next paragraph (no blank line),
  // we split it out so it renders as its own block.

  const isAllCapsHeading = (line: string) => {
    const t = line.trim();
    if (!t || t.length > 60) return false;
    if (!/[A-Z]/.test(t)) return false;
    // Allow letters, numbers, spaces, &, /, -
    if (!/^[A-Z0-9 &/\-]+$/.test(t)) return false;
    // Must contain at least one letter and not end with punctuation like .
    return /^[A-Z][A-Z0-9 &/\-]*$/.test(t);
  };

  const isHeadingLine = (line: string) => {
    const t = line.trim();
    if (!t) return false;
    if (/^#{1,3}\s+/.test(t)) return true;
    if (/^\*\*(.+)\*\*$/.test(t)) return true;
    if (t.length <= 80 && t.endsWith(":")) return true;
    if (isAllCapsHeading(t)) return true;
    return false;
  };

  // First, split memo into raw blocks separated by blank lines,
  // then within each block, peel off heading lines that are glued to body text.
  const rawBlocks = deal.memo
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const blocks: string[] = [];
  rawBlocks.forEach((block) => {
    const lines = block.split(/\n/);
    let buffer: string[] = [];
    const flush = () => {
      if (buffer.length) {
        blocks.push(buffer.join("\n").trim());
        buffer = [];
      }
    };
    lines.forEach((line) => {
      if (isHeadingLine(line) && line.trim().length > 0) {
        flush();
        blocks.push(line.trim());
      } else {
        buffer.push(line);
      }
    });
    flush();
  });

  const renderHeading = (text: string, idx: number) => (
    <h2
      key={idx}
      className="text-2xl font-bold text-collektiv-green mt-6 mb-3 border-b-2 border-collektiv-green/40 pb-2 tracking-tight"
    >
      {text}
    </h2>
  );

  const renderBlock = (block: string, idx: number) => {
    const trimmed = block.trim();

    // Markdown-style heading
    if (/^#{1,3}\s+/.test(trimmed)) {
      return renderHeading(trimmed.replace(/^#{1,3}\s+/, ""), idx);
    }

    // Bold-wrapped single-line heading: **Heading**
    const boldHeading = /^\*\*(.+)\*\*$/.exec(trimmed);
    if (boldHeading && !trimmed.includes("\n")) {
      return renderHeading(boldHeading[1], idx);
    }

    // Short line ending with ":" → heading
    if (!trimmed.includes("\n") && trimmed.endsWith(":") && trimmed.length <= 80) {
      return renderHeading(trimmed.replace(/:$/, ""), idx);
    }

    // ALL-CAPS heading (e.g. PROBLEM, SOLUTION)
    if (!trimmed.includes("\n") && isAllCapsHeading(trimmed)) {
      // Title-case the heading for display
      const display = trimmed
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return renderHeading(display, idx);
    }

    // Bullet list (lines starting with "- " or "* ")
    const lines = trimmed.split(/\n/);
    if (lines.length > 0 && lines.every((l) => /^\s*[-*]\s+/.test(l))) {
      return (
        <ul key={idx} className="list-disc pl-6 text-gray-700 space-y-2 marker:text-collektiv-green">
          {lines.map((l, i) => (
            <li key={i} className="leading-relaxed">
              {l.replace(/^\s*[-*]\s+/, "")}
            </li>
          ))}
        </ul>
      );
    }

    // Inline bold rendering for paragraphs
    const renderInline = (text: string) => {
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        const m = /^\*\*([^*]+)\*\*$/.exec(part);
        if (m) {
          return (
            <strong key={i} className="font-semibold text-collektiv-dark">
              {m[1]}
            </strong>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      });
    };

    // Default: paragraph (preserve internal line breaks, render inline bold)
    return (
      <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
        {renderInline(trimmed)}
      </p>
    );
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-collektiv-accent to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to={`/members/investments/${deal.slug}`}
          className="inline-flex items-center mb-6 text-collektiv-green hover:underline"
        >
          <ArrowLeft className="mr-2" size={20} /> Back to {deal.name} overview
        </Link>

        <div className="text-center mb-8">
          {deal.logo_url && (
            <img
              src={deal.logo_url}
              alt={deal.name}
              className="h-20 w-auto object-contain mx-auto mb-4"
            />
          )}
          <h1 className="text-4xl font-bold text-collektiv-green mb-2">
            Investment Memo: {deal.name}
          </h1>
          <p className="text-gray-600">Prepared by Collektiv Club</p>
        </div>

        {/* HNW / Sophisticated investor notice (always shown at top) */}
        <Card className="mb-6 border-collektiv-green/40 bg-collektiv-green/5">
          <CardContent className="p-6 text-sm text-gray-700 leading-relaxed">
            <h3 className="text-base font-semibold text-collektiv-dark mb-2">
              Important Notice to High-Net-Worth and Sophisticated Investors
            </h3>
            <p>
              The investments described in this document are classified as high-risk and are
              intended exclusively for individuals who qualify as high-net-worth investors or
              self-certified sophisticated investors under the Financial Services and Markets Act
              2000 (Financial Promotion) Order 2005. By engaging with this material, you confirm
              that you meet the relevant criteria.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8 space-y-5">
            {blocks.map((b, i) => renderBlock(b, i))}
          </CardContent>
        </Card>

        {/* Standardized disclaimer (always shown) */}
        <Card className="border-collektiv-green/30 mb-8">
          <CardContent className="p-8 space-y-5 text-sm text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-collektiv-dark mb-2">Disclaimer</h3>
              <p>
                Members are fully responsible for their own investment decisions. While Collektiv
                facilitates co-investment opportunities through deal-specific SPVs, investors are
                solely accountable for evaluating risks and potential returns before participating.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-collektiv-dark mb-2">
                Confidentiality Statement
              </h3>
              <p>
                This document is strictly intended for members of Collektiv Limited and may contain
                confidential and proprietary information. Any unauthorised access, sharing, or
                dissemination of this content is prohibited unless prior written approval is obtained
                from an authorised Director of Collektiv Limited.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-collektiv-dark mb-2">Tax Advice</h3>
              <p>
                Collektiv does not provide tax advice. Investors are encouraged to consult qualified
                tax professionals to understand the personal tax implications associated with
                investments made via our SPVs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-collektiv-dark mb-2">About SPVs</h3>
              <p>
                A Special Purpose Vehicle (SPV) is an independent entity created by Collektiv to
                limit financial exposure. This structure allows syndicate members to invest in
                specific assets without assuming the risks tied to Collektiv's broader portfolio.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-collektiv-dark mb-2">
                Risks of Early-Stage Investments
              </h3>
              <p>
                Investing in startups and early-stage businesses carries significant risks and
                uncertainties. Investors should be aware that such investments could result in the
                complete loss of their capital. Historical performance does not guarantee future
                results.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-collektiv-dark mb-2">Intellectual Property</h3>
              <p>
                All trademarks, logos, and service marks featured in this document are owned by
                Collektiv or third parties, which may not necessarily be affiliated with or endorsed
                by Collektiv.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DynamicDealMemo;
