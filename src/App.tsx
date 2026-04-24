
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Toaster } from '@/components/ui/sonner';
import { isProfileComplete } from '@/utils/profileUtils';
import { initOneSignal, tagOneSignalUser } from '@/lib/onesignal';
import Index from './pages/Index';
import About from './pages/About';
import Membership from './pages/Membership';
import Events from './pages/Events';
import News from './pages/News';
import Founders from './pages/Founders';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Members from './pages/Members';

import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import HNWISI from './pages/HNWISI';
import ResetPassword from './pages/ResetPassword';
import SetupAccount from './pages/SetupAccount';
import AuthMagic from './pages/AuthMagic';
import Propane from './pages/members/investments/Propane';
import Loxa from './pages/members/investments/Loxa';
import Pandektes from './pages/members/investments/Pandektes';
import BeImpact from './pages/members/investments/BeImpact';
import BeImpactMemo from './pages/members/investments/BeImpactMemo';
import PropaneMemo from './pages/members/investments/PropaneMemo';
import Webel from './pages/members/investments/Webel';
import WebelMemo from './pages/members/investments/WebelMemo';
import Anthropic from './pages/members/investments/Anthropic';
import AnthropicMemo from './pages/members/investments/AnthropicMemo';
import Kalshi from './pages/members/investments/Kalshi';
import KalshiMemo from './pages/members/investments/KalshiMemo';
import DynamicDeal from './pages/members/investments/DynamicDeal';
import DynamicDealMemo from './pages/members/investments/DynamicDealMemo';
import TiranaExpo2024 from './pages/members/events/TiranaExpo2024';
import CollektivMeetupOct2024 from './pages/members/events/CollektivMeetupOct2024';
import PropaneCatalyst2024 from './pages/members/events/PropaneCatalyst2024';
import PizzaPintsFeb2025 from './pages/members/events/PizzaPintsFeb2025';
import DynamicMemberEvent from './pages/members/events/DynamicMemberEvent';

import BuildProfile from './pages/members/BuildProfile';
import EditProfile from './pages/members/EditProfile';
import BareTrusts from './pages/insights/BareTrusts';
import CarryAndPerformanceFees from './pages/insights/CarryAndPerformanceFees';
import AngelSyndicates from './pages/insights/AngelSyndicates';
import BeginnerAngelInvestors from './pages/insights/BeginnerAngelInvestors';
import ConvertibleLoanNotes from './pages/insights/ConvertibleLoanNotes';
import EISSEIS from './pages/insights/EISSEIS';
import LessonsFromInvestments from './pages/insights/LessonsFromInvestments';
import MultiplesInValuations from './pages/insights/MultiplesInValuations';
import SaasFundingAgreements from './pages/insights/SaasFundingAgreements';
import SaasMetrics from './pages/insights/SaasMetrics';
import Valuations from './pages/insights/Valuations';
import WhatToLookForInFounders from './pages/insights/WhatToLookForInFounders';
import ZeroToOneMillion from './pages/insights/ZeroToOneMillion';
import WhyAngelsOutperformVCs from './pages/insights/WhyAngelsOutperformVCs';
import SeriesAPitch from './pages/insights/SeriesAPitch';
import SubstackArticle from './pages/insights/SubstackArticle';

const queryClient = new QueryClient();

function App() {
  console.log('App: Rendering with current location:', window.location.pathname);
  console.log('App: Full URL:', window.location.href);
  console.log('App: Hash:', window.location.hash);

  // Initialize OneSignal once (no-op in preview/iframe) + tag user when session changes
  useEffect(() => {
    initOneSignal();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.id) {
        tagOneSignalUser(session.user.id, session.user.email);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) tagOneSignalUser(session.user.id, session.user.email);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // OAuth/magic-link callback handling lives in src/main.tsx (runs before
  // React mounts so there are no races with the router or Supabase SDK).
  // Here we just handle the "already signed in but landed on root" case.
  useEffect(() => {
    (async () => {
      try {
        const hash = window.location.hash || '';
        const atRoot = !hash || hash === '#' || hash === '#/';
        if (!atRoot) return;
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('App: Session present at root, redirecting to members');
          window.location.replace(`${window.location.origin}/#/members`);
        }
      } catch (e) {
        console.warn('App: root session check failed', e);
      }
    })();
  }, []);

  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/tirana-expo-2024" element={<TiranaExpo2024 />} />
            <Route path="/events/collektiv-meetup-oct-2024" element={<CollektivMeetupOct2024 />} />
            <Route path="/events/propane-catalyst-2024" element={<PropaneCatalyst2024 />} />
            <Route path="/events/pizza-pints-feb-2025" element={<PizzaPintsFeb2025 />} />
            <Route path="/insights" element={<News />} />
            <Route path="/founders" element={<Founders />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={<Members />} />
            <Route path="/members/build-profile" element={<BuildProfile />} />
            <Route path="/members/edit-profile" element={<EditProfile />} />
            <Route path="/members/investments/propane" element={<Propane />} />
            <Route path="/members/investments/loxa" element={<Loxa />} />
            <Route path="/members/investments/pandektes" element={<Pandektes />} />
          <Route path="/members/investments/beimpact" element={<BeImpact />} />
              <Route path="/members/investments/beimpact/memo" element={<BeImpactMemo />} />
              <Route path="/members/investments/propane/memo" element={<PropaneMemo />} />
              <Route path="/members/investments/webel" element={<Webel />} />
              <Route path="/members/investments/webel/memo" element={<WebelMemo />} />
              <Route path="/members/investments/anthropic" element={<Anthropic />} />
              <Route path="/members/investments/anthropic/memo" element={<AnthropicMemo />} />
              <Route path="/members/investments/kalshi" element={<Kalshi />} />
              <Route path="/members/investments/kalshi/memo" element={<KalshiMemo />} />
              {/* Catch-all for admin-created deals (must be after the hardcoded ones) */}
              <Route path="/members/investments/:slug/memo" element={<DynamicDealMemo />} />
              <Route path="/members/investments/:slug" element={<DynamicDeal />} />
          <Route path="/members/events/tirana-expo-2024" element={<TiranaExpo2024 />} />
          <Route path="/members/events/collektiv-meetup-oct-2024" element={<CollektivMeetupOct2024 />} />
          <Route path="/members/events/propane-catalyst-2024" element={<PropaneCatalyst2024 />} />
          <Route path="/members/events/pizza-pints-feb-2025" element={<PizzaPintsFeb2025 />} />
          {/* Catch-all for admin-created events (must be after the hardcoded ones) */}
          <Route path="/members/events/:slug" element={<DynamicMemberEvent />} />
            <Route path="/insights/bare-trusts" element={<BareTrusts />} />
            <Route path="/insights/carry-and-performance-fees" element={<CarryAndPerformanceFees />} />
            <Route path="/insights/angel-syndicates" element={<AngelSyndicates />} />
            <Route path="/insights/beginner-angel-investors" element={<BeginnerAngelInvestors />} />
            <Route path="/insights/convertible-loan-notes" element={<ConvertibleLoanNotes />} />
            <Route path="/insights/eis-seis-tax-schemes" element={<EISSEIS />} />
            <Route path="/insights/lessons-from-483-investments" element={<LessonsFromInvestments />} />
            <Route path="/insights/understanding-multiples" element={<MultiplesInValuations />} />
            <Route path="/insights/saas-funding-agreements" element={<SaasFundingAgreements />} />
            <Route path="/insights/saas-metrics-evaluation" element={<SaasMetrics />} />
            <Route path="/insights/startup-valuations" element={<Valuations />} />
            <Route path="/insights/what-to-look-for-in-founders" element={<WhatToLookForInFounders />} />
            <Route path="/insights/zero-to-one-million-saas-journey" element={<ZeroToOneMillion />} />
            <Route path="/insights/why-angels-outperform-vcs" element={<WhyAngelsOutperformVCs />} />
            <Route path="/insights/series-a-pitch" element={<SeriesAPitch />} />
            <Route path="/insights/:slug" element={<SubstackArticle />} />
            
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/setup-account" element={<SetupAccount />} />
            <Route path="/auth/magic" element={<AuthMagic />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/hnwi-si" element={<HNWISI />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
