
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
