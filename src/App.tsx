
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Toaster } from '@/components/ui/sonner';
import { isProfileComplete } from '@/utils/profileUtils';
import Index from './pages/Index';
import About from './pages/About';
import Membership from './pages/Membership';
import News from './pages/News';
import Founders from './pages/Founders';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Members from './pages/Members';

import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ResetPassword from './pages/ResetPassword';
import SetupAccount from './pages/SetupAccount';
import Propane from './pages/members/investments/Propane';
import Loxa from './pages/members/investments/Loxa';
import Pandektes from './pages/members/investments/Pandektes';
import BuildProfile from './pages/members/BuildProfile';
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

const queryClient = new QueryClient();

function App() {
  console.log('App: Rendering with current location:', window.location.pathname);
  console.log('App: Full URL:', window.location.href);
  console.log('App: Hash:', window.location.hash);
  
  // CRITICAL: Handle auth tokens and PKCE code BEFORE router processes anything
  useEffect(() => {
    const href = window.location.href;

    const hasAccessToken = /access_token=/.test(href) || /#access_token=/.test(href);
    const hasPkceCode = /[?#].*code=/.test(href) || /#.*[?&]code=/.test(href);

    // Extract auth params early
    const typeInHref = href.match(/(?:[?#]|#).*type=(invite|signup|magiclink|recovery)/)?.[1] || null;
    const access_token_in_hash = href.match(/access_token=([^&]+)/)?.[1] || '';
    const refresh_token_in_hash = href.match(/refresh_token=([^&]+)/)?.[1] || '';

    // Helper: determine intended landing based on current hash route
    const isMembersRoute = window.location.hash.startsWith('#/members');
    const isSetupRoute = window.location.hash.startsWith('#/setup-account');

    const cleanAndRedirect = (target: 'members' | 'setup', opts?: { preserveTokens?: boolean }) => {
      const origin = window.location.origin;
      let dest = target === 'members' ? `${origin}/#/members` : `${origin}/#/setup-account`;
      if (opts?.preserveTokens && access_token_in_hash) {
        const qp = new URLSearchParams();
        qp.set('access_token', access_token_in_hash);
        if (refresh_token_in_hash) qp.set('refresh_token', refresh_token_in_hash);
        if (typeInHref) qp.set('type', typeInHref);
        dest += `?${qp.toString()}`;
      }
      window.location.replace(dest);
    };

    // Immediate handling: normalize initial landing based on flow
    if (hasAccessToken) {
      const params = new URLSearchParams(href.split('?')[1] || href.split('#')[1] || '');
      const typeParamEarly = params.get('type');
      const hasProvider = params.has('provider_token') || params.has('provider_refresh_token');
      const isBuildProfileRoute = window.location.hash.startsWith('#/members/build-profile');
      if (!isSetupRoute && (typeParamEarly === 'invite' || typeParamEarly === 'recovery')) {
        console.log('App: Invite/Recovery detected, sending to setup-account with tokens');
        cleanAndRedirect('setup', { preserveTokens: true });
        return;
      }
      if (!isBuildProfileRoute && (hasProvider || typeParamEarly === 'magiclink' || typeParamEarly === 'signup' || !typeParamEarly)) {
        const qp = href.split('?')[1] || href.split('#')[1] || '';
        const dest = `${window.location.origin}/#/members/build-profile?${qp}`;
        console.log('App: OAuth or generic login detected, sending to build-profile with tokens');
        window.location.replace(dest);
        return;
      }
    }

    const processAccessToken = async () => {
      console.log('App: Auth tokens detected, processing via setSession...');
      const access_token = access_token_in_hash;
      const refresh_token = refresh_token_in_hash;
      const params = new URLSearchParams(href.split('?')[1] || href.split('#')[1] || '');
      const hasProvider = params.has('provider_token') || params.has('provider_refresh_token');
      const typeParam = typeInHref;
      if (!access_token) return false;
      try {
        await supabase.auth.setSession({ access_token, refresh_token });
        console.log('App: setSession success');
        const origin = window.location.origin;

        if (typeParam === 'invite' || typeParam === 'recovery') {
          window.location.replace(`${origin}/#/setup-account`);
          return true;
        }

      if (hasProvider || window.location.hash.startsWith('#/members/build-profile')) {
        // Check for profile claiming, existing profile, and submissions before redirecting
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.id) {
            const userId = session.user.id;
            
            // First, try to claim an existing profile based on email
            console.log('App: Attempting to claim profile for user:', session.user.email);
            const { data: claimedProfileId, error: claimError } = await supabase.rpc('claim_member_profile');
            
            if (claimedProfileId && !claimError) {
              console.log('App: Profile claimed successfully, redirecting to members');
              window.location.replace(`${origin}/#/members`);
              return true;
            }
            
            // Check for existing profile assigned to this user
            const { data: profile } = await supabase
              .from('member_profiles')
              .select('id, first_name, full_name')
              .eq('user_id', userId)
              .maybeSingle();
            
            if (profile && isProfileComplete(profile)) {
              console.log('App: User has complete profile, redirecting to members');
              window.location.replace(`${origin}/#/members`);
              return true;
            }
            
            // Check for existing submission
            const { data: submission } = await supabase
              .from('member_profile_submissions')
              .select('id')
              .eq('user_id', userId)
              .maybeSingle();
            
            if (submission) {
              console.log('App: User has existing submission, redirecting to members');
              window.location.replace(`${origin}/#/members`);
              return true;
            }
          }
        } catch (e) {
          console.warn('App: Error checking profile/claim/submission status', e);
        }
        
        console.log('App: No existing profile or submission found, redirecting to build-profile');
        window.location.replace(`${origin}/#/members/build-profile`);
        return true;
      }

          window.location.replace(`${origin}/#/members`);
          return true;
      } catch (e) {
        console.error('App: setSession failed', e);
        cleanAndRedirect(isSetupRoute ? 'setup' : (isMembersRoute ? 'members' : 'setup'), { preserveTokens: true });
        return false;
      }
    };

    const processPkceCode = async () => {
      console.log('App: PKCE code detected, exchanging for session...');
      const postAuth = href.match(/[?&]post_auth=([^&]+)/)?.[1] || null;
      const typeParam = href.match(/(?:[?#]|#).*type=(invite|signup|magiclink|recovery)/)?.[1] || null;
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(href);
        if (error) throw error;
        console.log('App: exchangeCodeForSession success');

        if (typeParam === 'invite' || typeParam === 'signup') {
          cleanAndRedirect('setup');
          return true;
        }

        if (postAuth === 'build-profile') {
          window.location.replace(`${window.location.origin}/#/members/build-profile`);
          return true;
        }

        // Respect current route intent: if setup page, remain there; else members
        cleanAndRedirect(isSetupRoute ? 'setup' : 'members');
        return true;
      } catch (e) {
        console.error('App: exchangeCodeForSession failed', e);
        // Fall back to setup if not coming from members route
        cleanAndRedirect(isMembersRoute ? 'members' : 'setup');
        return false;
      }
    };

    (async () => {
      if (hasAccessToken) {
        await processAccessToken();
        return;
      }
      if (hasPkceCode) {
        await processPkceCode();
        return;
      }

      // If coming from Supabase email flows without explicit tokens
      const typeMatch = href.match(/[?&]type=(invite|signup|magiclink|recovery)/);
      if (typeMatch) {
        const emailFlowType = typeMatch[1];
        console.log(`App: Detected email flow type without tokens: ${emailFlowType}`);
        if (emailFlowType === 'recovery') {
          window.location.replace(`${window.location.origin}/#/reset-password`);
        } else {
          cleanAndRedirect('setup');
        }
        return;
      }

      // Final fallback: if already authenticated but at bare root (no route), send to members
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/')) {
          console.log('App: Session present at root, redirecting to members');
          cleanAndRedirect('members');
        }
      } catch (e) {
        console.warn('App: Fallback session check failed', e);
      }
      // No tokens/codes: let router handle current location otherwise
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
            <Route path="/insights" element={<News />} />
            <Route path="/founders" element={<Founders />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={<Members />} />
            <Route path="/members/build-profile" element={<BuildProfile />} />
            <Route path="/members/investments/propane" element={<Propane />} />
            <Route path="/members/investments/loxa" element={<Loxa />} />
            <Route path="/members/investments/pandektes" element={<Pandektes />} />
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
            
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/setup-account" element={<SetupAccount />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
