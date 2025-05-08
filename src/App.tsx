
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Import individual article pages
import LessonsFromInvestments from "./pages/insights/LessonsFromInvestments";
import SaasFundingAgreements from "./pages/insights/SaasFundingAgreements";
import BeginnerAngelInvestors from "./pages/insights/BeginnerAngelInvestors";
import EISSEIS from "./pages/insights/EISSEIS";
import MultiplesInValuations from "./pages/insights/MultiplesInValuations";
import SaasMetrics from "./pages/insights/SaasMetrics";
import Valuations from "./pages/insights/Valuations";
import AngelSyndicates from "./pages/insights/AngelSyndicates";

const queryClient = new QueryClient();

// Read the base path from import.meta.env
const basePath = import.meta.env.BASE_URL || '/collektiv-club-revive/';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basePath}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/hnwi-si" element={<HNWISI />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/founders" element={<Founders />} />
          
          {/* Individual article routes */}
          <Route path="/insights/lessons-from-483-investments" element={<LessonsFromInvestments />} />
          <Route path="/insights/saas-funding-agreements" element={<SaasFundingAgreements />} />
          <Route path="/insights/beginner-angel-investors" element={<BeginnerAngelInvestors />} />
          <Route path="/insights/eis-seis-tax-schemes" element={<EISSEIS />} />
          <Route path="/insights/understanding-multiples" element={<MultiplesInValuations />} />
          <Route path="/insights/saas-metrics-evaluation" element={<SaasMetrics />} />
          <Route path="/insights/startup-valuations" element={<Valuations />} />
          <Route path="/insights/angel-syndicates" element={<AngelSyndicates />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
