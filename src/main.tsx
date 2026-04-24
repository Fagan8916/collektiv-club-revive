import React from 'react'
import { createRoot } from 'react-dom/client'
import { createClient } from '@supabase/supabase-js'
import App from './App.tsx'
import './index.css'

console.log("Application initializing...");
console.log("Current URL:", window.location.href);

/**
 * Single source of truth for OAuth / magic-link callbacks.
 *
 * Why this lives here (before React mounts):
 * - The app uses HashRouter. Supabase OAuth returns either
 *     <origin>/#access_token=...&refresh_token=...    (implicit flow)
 *     <origin>/?code=...                              (PKCE flow)
 *   ...both of which collide with HashRouter's routing.
 * - Previously main.tsx, App.tsx, and the Supabase SDK's
 *   `detectSessionInUrl` were all trying to consume the same callback,
 *   which was racing and leaving users without a session — looping them
 *   back to /login. (This matched Nik's report.)
 * - We now disable `detectSessionInUrl` in the SDK and do the parsing
 *   exactly once, here, before mount.
 */
async function consumeAuthCallback(): Promise<void> {
  const { hash, search, origin } = window.location;

  // Build a temporary client that does NOT detect the session in the URL —
  // we'll set the session manually so we control timing.
  const tempClient = createClient(
    "https://lectuphndieqxoluyhkv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlY3R1cGhuZGllcXhvbHV5aGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNjY3NzQsImV4cCI6MjA2MzY0Mjc3NH0.oEJHEnVOHD5eJcrNF6tXtFmLEoZPXLQRWPa1DhoQuIY",
    {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        flowType: 'implicit',
      },
    }
  );

  // 1) Pull every possible fragment of auth data out of the URL.
  //    We may have:
  //    - hash like "#access_token=..."             (implicit, fresh OAuth return)
  //    - hash like "#/route?...#access_token=..."  (HashRouter + implicit)
  //    - hash like "#/route?access_token=..."      (already-normalized)
  //    - search like "?code=..."                   (PKCE)
  let tokenString = '';

  // Case A: pure token fragment, e.g. "#access_token=..."
  if (hash && !hash.startsWith('#/')) {
    tokenString = hash.replace(/^#/, '');
  }

  // Case B: HashRouter route with a SECOND '#' carrying the tokens
  if (!tokenString && hash.startsWith('#/')) {
    const second = hash.indexOf('#', 1);
    if (second !== -1) tokenString = hash.slice(second + 1);
  }

  // Case C: HashRouter route with tokens placed in the route's query string
  //         e.g. "#/members/build-profile?access_token=..."
  if (!tokenString && hash.startsWith('#/') && hash.includes('?')) {
    const q = hash.slice(hash.indexOf('?') + 1);
    if (/(?:^|&)(access_token|refresh_token|code|provider_token)=/.test(q)) {
      tokenString = q;
    }
  }

  // Case D: PKCE / code on the real query string
  const searchParams = new URLSearchParams(search.replace(/^\?/, ''));
  const pkceCode = searchParams.get('code');
  const postAuth = searchParams.get('post_auth');

  const tokenParams = new URLSearchParams(tokenString);
  const accessToken = tokenParams.get('access_token');
  const refreshToken = tokenParams.get('refresh_token');
  const tokenType = tokenParams.get('type'); // invite | recovery | magiclink | signup
  const errorDesc = tokenParams.get('error_description') || searchParams.get('error_description');

  const hasImplicit = !!accessToken;
  const hasPkce = !!pkceCode;

  if (!hasImplicit && !hasPkce && !errorDesc) {
    return; // no callback to process
  }

  console.log('[auth-callback] consuming callback', {
    hasImplicit,
    hasPkce,
    tokenType,
    postAuth,
    errorDesc,
  });

  try { sessionStorage.setItem('auth_in_progress', '1'); } catch {}

  // Show a clear message if Google / Supabase returned an error in the URL.
  if (errorDesc) {
    console.error('[auth-callback] provider returned error:', errorDesc);
    try { sessionStorage.removeItem('auth_in_progress'); } catch {}
    const msg = encodeURIComponent(errorDesc);
    window.location.replace(`${origin}/#/login?auth_error=${msg}`);
    return;
  }

  let signedIn = false;

  try {
    if (hasImplicit && accessToken) {
      const { error } = await tempClient.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || '',
      });
      if (error) throw error;
      signedIn = true;
    } else if (hasPkce && pkceCode) {
      // exchangeCodeForSession needs the full URL it was redirected to.
      const { error } = await tempClient.auth.exchangeCodeForSession(window.location.href);
      if (error) throw error;
      signedIn = true;
    }
  } catch (err) {
    console.error('[auth-callback] failed to establish session:', err);
  }

  // Decide where to send the user
  let dest = `${origin}/#/members`;
  if (signedIn) {
    if (tokenType === 'invite' || tokenType === 'recovery') {
      dest = `${origin}/#/setup-account`;
    } else if (postAuth === 'build-profile') {
      // OAuth return — App.tsx / Members will route to build-profile if the
      // profile is incomplete, so just send them in.
      dest = `${origin}/#/members`;
    }
  } else {
    try { sessionStorage.removeItem('auth_in_progress'); } catch {}
    dest = `${origin}/#/login?auth_error=${encodeURIComponent(
      'We could not complete sign-in. Please try again.'
    )}`;
  }

  console.log('[auth-callback] redirecting to', dest);
  window.location.replace(dest);
}

(async () => {
  try {
    await consumeAuthCallback();
  } catch (e) {
    console.error('[auth-callback] unexpected error', e);
  }

  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('Root element not found!');
      return;
    }
    const root = createRoot(rootElement);
    root.render(React.createElement(App));
  } catch (error) {
    console.error('Error rendering application:', error);
  }
})();
