
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced debugging
console.log("Application initializing...");
console.log("React version:", React.version);
console.log("Base URL:", import.meta.env.BASE_URL);
console.log("Current URL:", window.location.href);
console.log("Pathname:", window.location.pathname);
console.log("Hash:", window.location.hash);
console.log("Search:", window.location.search);
console.log("Origin:", window.location.origin);

// Pre-mount auth hash normalization: redirect token hash to proper query position
(() => {
  const hash = window.location.hash;

  // 1) Handle double-hash cases like
  //    #/members/build-profile?post_auth=build-profile#access_token=...
  if (hash.startsWith('#/')) {
    const secondIdx = hash.indexOf('#', 1);
    if (secondIdx !== -1) {
      const tokenFragment = hash.slice(secondIdx + 1);
      const isAuthTokens = /^(access_token|refresh_token|code|type|expires_at|expires_in|token_type|provider_token|provider_refresh_token|error|error_description)=/.test(tokenFragment)
        || /(^|&)(access_token|refresh_token|code)=/.test(tokenFragment);
      if (isAuthTokens) {
        const routePart = hash.slice(1, secondIdx); // e.g. "/members/build-profile?post_auth=build-profile"
        const sep = routePart.includes('?') ? '&' : '?';
        const dest = `${window.location.origin}/#/${routePart.replace(/^\//, '')}${sep}${tokenFragment}`;
        console.log('main.tsx: Normalizing double-hash auth fragment →', dest);
        try { sessionStorage.setItem('auth_in_progress', '1'); } catch {}
        window.location.replace(dest);
        return; // Stop further processing
      }
    }
  }

  // 2) Handle pure token fragments like '#access_token=...'
  const hasRoute = hash.startsWith('#/');
  const raw = hasRoute ? '' : hash.replace(/^#/, '');
  const isAuthFragment = raw.length > 0 && (/^(access_token|refresh_token|type|expires_at|expires_in|token_type|provider_token|provider_refresh_token|error|error_description|code)=/.test(raw) || /(^|&)(access_token|refresh_token|code)=/.test(raw));
  if (isAuthFragment) {
    const params = new URLSearchParams(raw);
    const type = params.get('type');
    const hasProvider = params.has('provider_token') || params.has('provider_refresh_token');
    const origin = window.location.origin;
    let dest: string;
    if (type === 'invite' || type === 'recovery') {
      dest = `${origin}/#/setup-account?${raw}`;
    } else if (hasProvider || !type) {
      dest = `${origin}/#/members/build-profile?${raw}`;
    } else {
      dest = `${origin}/#/members?${raw}`;
    }
    console.log('main.tsx: Normalizing auth hash →', dest);
    try { sessionStorage.setItem('auth_in_progress', '1'); } catch {}
    window.location.replace(dest);
  }
})();

// Try/catch to identify rendering errors
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found!");
  } else {
    console.log("Root element found, rendering application");
    const root = createRoot(rootElement);
    root.render(React.createElement(App));
    console.log("Render complete");
  }
} catch (error) {
  console.error("Error rendering application:", error);
}
