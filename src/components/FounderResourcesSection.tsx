import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FounderResourcesSection = () => (
  <Card className="bg-gradient-to-br from-collektiv-green/5 to-collektiv-green/10 border-collektiv-green/20 my-6">
    <CardHeader>
      <CardTitle className="text-lg text-collektiv-green flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Need help with your pitch?
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-gray-700">
        Preparing to raise? Get your investment memo and pitch deck reviewed by experts before you pitch to investors.
      </p>
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">VC Brain</h4>
          <p className="text-sm text-gray-600 mb-3">
            See the VC analysis before they write it. AI-powered audit reveals gaps, red flags, and benchmarks across 8 critical dimensions.
          </p>
          <a
            href="https://vc-brain.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-collektiv-green hover:text-collektiv-dark font-medium text-sm"
          >
            Learn more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Partner service recommended by Collektiv operators
      </p>
    </CardContent>
  </Card>
);

export default FounderResourcesSection;
