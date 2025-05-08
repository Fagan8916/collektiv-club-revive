
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Debug log to verify script execution
console.log("Application initializing with base URL:", import.meta.env.BASE_URL);

createRoot(document.getElementById("root")!).render(<App />);
