
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Membership from "./pages/Membership";
import Insights from "./pages/News"; // Renamed but using same component
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import HNWISI from "./pages/HNWISI";
import Calculator from "./pages/Calculator"; // New Calculator page
import Founders from "./pages/Founders"; // New Founders page
import Login from "./pages/Login";
import Members from "./pages/Members";
import PendingApproval from "./pages/PendingApproval"; // New pending approval page
import ResetPassword from "./pages/ResetPassword"; // Add this import

// Import individual article pages
import ZeroToOneMillion from "./pages/insights/ZeroToOneMillion";
import WhatToLookForInFounders from "./pages/insights/WhatToLookForInFounders";
import ConvertibleLoanNotes from "./pages/insights/ConvertibleLoanNotes";
import LessonsFromInvestments from "./pages/insights/LessonsFromInvestments";
import SaasFundingAgreements from "./pages/insights/SaasFundingAgreements";
import BeginnerAngelInvestors from "./pages/insights/BeginnerAngelInvestors";
import EISSEIS from "./pages/insights/EISSEIS";
import MultiplesInValuations from "./pages/insights/MultiplesInValuations";
import SaasMetrics from "./pages/insights/SaasMetrics";
import Valuations from "./pages/insights/Valuations";
import AngelSyndicates from "./pages/insights/AngelSyndicates";

// Import investment pages
import Loxa from "./pages/members/investments/Loxa";
import Pandektes from "./pages/members/investments/Pandektes";
import Loyative from "./pages/members/investments/Loyative";
import Propane from "./pages/members/investments/Propane";

const queryClient = new QueryClient();

const App: React.FC = () => {
  console.log("App component rendering");
  
  return React.createElement(QueryClientProvider, { client: queryClient },
    React.createElement(TooltipProvider, null,
      React.createElement(Toaster, null),
      React.createElement(Sonner, null),
      React.createElement(HashRouter, null,
        React.createElement(Routes, null,
          React.createElement(Route, { path: "/", element: React.createElement(Index) }),
          React.createElement(Route, { path: "/about", element: React.createElement(About) }),
          React.createElement(Route, { path: "/membership", element: React.createElement(Membership) }),
          React.createElement(Route, { path: "/insights", element: React.createElement(Insights) }),
          React.createElement(Route, { path: "/contact", element: React.createElement(Contact) }),
          React.createElement(Route, { path: "/privacy", element: React.createElement(Privacy) }),
          React.createElement(Route, { path: "/terms", element: React.createElement(Terms) }),
          React.createElement(Route, { path: "/hnwi-si", element: React.createElement(HNWISI) }),
          React.createElement(Route, { path: "/calculator", element: React.createElement(Calculator) }),
          React.createElement(Route, { path: "/founders", element: React.createElement(Founders) }),
          React.createElement(Route, { path: "/login", element: React.createElement(Login) }),
          React.createElement(Route, { path: "/members", element: React.createElement(Members) }),
          React.createElement(Route, { path: "/pending-approval", element: React.createElement(PendingApproval) }),
          React.createElement(Route, { path: "/reset-password", element: React.createElement(ResetPassword) }),
          
          // Investment pages
          React.createElement(Route, { path: "/members/investments/loxa", element: React.createElement(Loxa) }),
          React.createElement(Route, { path: "/members/investments/pandektes", element: React.createElement(Pandektes) }),
          React.createElement(Route, { path: "/members/investments/loyative", element: React.createElement(Loyative) }),
          React.createElement(Route, { path: "/members/investments/propane", element: React.createElement(Propane) }),
          
          // Individual article routes
          React.createElement(Route, { path: "/insights/zero-to-one-million-saas-journey", element: React.createElement(ZeroToOneMillion) }),
          React.createElement(Route, { path: "/insights/what-to-look-for-in-founders", element: React.createElement(WhatToLookForInFounders) }),
          React.createElement(Route, { path: "/insights/convertible-loan-notes", element: React.createElement(ConvertibleLoanNotes) }),
          React.createElement(Route, { path: "/insights/lessons-from-483-investments", element: React.createElement(LessonsFromInvestments) }),
          React.createElement(Route, { path: "/insights/saas-funding-agreements", element: React.createElement(SaasFundingAgreements) }),
          React.createElement(Route, { path: "/insights/beginner-angel-investors", element: React.createElement(BeginnerAngelInvestors) }),
          React.createElement(Route, { path: "/insights/eis-seis-tax-schemes", element: React.createElement(EISSEIS) }),
          React.createElement(Route, { path: "/insights/understanding-multiples", element: React.createElement(MultiplesInValuations) }),
          React.createElement(Route, { path: "/insights/saas-metrics-evaluation", element: React.createElement(SaasMetrics) }),
          React.createElement(Route, { path: "/insights/startup-valuations", element: React.createElement(Valuations) }),
          React.createElement(Route, { path: "/insights/angel-syndicates", element: React.createElement(AngelSyndicates) }),
          
          // Catch-all route
          React.createElement(Route, { path: "*", element: React.createElement(NotFound) })
        )
      )
    )
  );
};

export default App;
