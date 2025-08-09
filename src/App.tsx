
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

// Global handler to process magic-link/invite hashes like '#access_token=...' before routing
const MagicLinkHandler: React.FC = () => {
  useEffect(() => {
    const href = window.location.href;
    const hasTokenInHash = /#access_token=/.test(href) || /[?#&]type=invite\b/.test(href);
    if (!hasTokenInHash) return;

    const access_token = href.match(/access_token=([^&]+)/)?.[1] || '';
    const refresh_token = href.match(/refresh_token=([^&]+)/)?.[1] || '';

    // Set session if token present, then force redirect to setup-account
    const target = `${window.location.origin}/#/setup-account`;
    if (access_token) {
      supabase.auth.setSession({ access_token, refresh_token })
        .catch((e) => console.error('MagicLinkHandler: setSession failed', e))
        .finally(() => window.location.replace(target));
    } else {
      window.location.replace(target);
    }
  }, []);
  return null;
};

const queryClient = new QueryClient();

function App() {
  console.log('App: Rendering with current location:', window.location.pathname);
  console.log('App: Full URL:', window.location.href);
  console.log('App: Hash:', window.location.hash);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <MagicLinkHandler />
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
