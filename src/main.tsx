
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

// Pre-mount auth hash normalization: redirect token hash to setup-account as query
(() => {
  const hash = window.location.hash;
  // If hash is like '#access_token=...' (no route), normalize to '#/setup-account?...'
  const hasRoute = hash.startsWith('#/');
  const raw = hasRoute ? '' : hash.replace(/^#/, '');
  const isAuthFragment = raw.length > 0 && (/^(access_token|refresh_token|type|expires_at|expires_in|token_type|provider_token|provider_refresh_token|error|error_description)=/.test(raw) || /(^|&)access_token=/.test(raw));
  if (isAuthFragment) {
    const dest = `${window.location.origin}/#/setup-account?${raw}`;
    console.log('main.tsx: Normalizing auth hash →', dest);
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
