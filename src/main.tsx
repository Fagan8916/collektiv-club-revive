
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced debugging
console.log("Application initializing...");
console.log("Base URL:", import.meta.env.BASE_URL);
console.log("Current URL:", window.location.href);
console.log("Pathname:", window.location.pathname);

// Try/catch to identify rendering errors
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found!");
  } else {
    console.log("Root element found, rendering application");
    createRoot(rootElement).render(<App />);
    console.log("Render complete");
  }
} catch (error) {
  console.error("Error rendering application:", error);
}
