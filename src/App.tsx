
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
import BareTrusts from './pages/insights/BareTrusts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const queryClient = new QueryClient();

function App() {
  console.log('App: Rendering with current location:', window.location.pathname);
  console.log('App: Full URL:', window.location.href);
  console.log('App: Hash:', window.location.hash);
  
  // CRITICAL: Handle auth tokens BEFORE router processes anything
  useEffect(() => {
    const href = window.location.href;
    const hasAccessToken = /access_token=/.test(href) || /#access_token=/.test(href);
    const isMembersRoute = window.location.hash.startsWith('#/members');

    if (!hasAccessToken) return;

    console.log('App: Auth tokens detected, processing...');
    const access_token = href.match(/access_token=([^&]+)/)?.[1] || '';
    const refresh_token = href.match(/refresh_token=([^&]+)/)?.[1] || '';

    if (access_token) {
      supabase.auth.setSession({ access_token, refresh_token })
        .then(() => {
          if (isMembersRoute) {
            console.log('App: OAuth return detected, stay in members and clean URL');
            window.location.replace(`${window.location.origin}/#/members`);
          } else {
            console.log('App: Magic/invite flow detected, redirect to setup-account');
            window.location.replace(`${window.location.origin}/#/setup-account`);
          }
        })
        .catch((e) => {
          console.error('App: setSession failed', e);
          const fallback = isMembersRoute ? `${window.location.origin}/#/members` : `${window.location.origin}/#/setup-account`;
          window.location.replace(fallback);
        });
    } else {
      console.log('App: No access token present');
      if (!isMembersRoute) {
        window.location.replace(`${window.location.origin}/#/setup-account`);
      }
    }
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
