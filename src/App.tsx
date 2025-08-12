
import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Membership from './pages/Membership';
import News from './pages/News';
import Founders from './pages/Founders';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Members from './pages/Members';
import Register from './pages/Register';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ResetPassword from './pages/ResetPassword';
import SetupAccount from './pages/SetupAccount';
import Propane from './pages/members/investments/Propane';
import Loxa from './pages/members/investments/Loxa';
import Pandektes from './pages/members/investments/Pandektes';
import BuildProfile from './pages/members/BuildProfile';
import BareTrusts from './pages/insights/BareTrusts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/setup-account" element={<SetupAccount />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
