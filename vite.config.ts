
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Using the custom domain as base path
  base: "/",
  server: {
    host: "::",
    port: 8080,
    fs: {
      // Allow serving files from the entire project
      allow: ['..']
    }
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Define to prevent issues with external requests
  define: {
    global: 'globalThis',
  }
}));
