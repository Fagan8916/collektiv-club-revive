
/**
 * Helper utility to correctly load assets with the base path prefix
 * This helps resolve GitHub Pages deployment issues
 */

// Base path matching the one in vite.config.ts
export const BASE_PATH = import.meta.env.DEV ? '' : "/collektiv-club-revive";

/**
 * Get the correct path for assets, adding the base path if needed
 * @param path The asset path (should start with /)
 * @returns The correct path with base path prefixed
 */
export const getAssetPath = (path: string): string => {
  // Make sure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // For debugging
  console.log(`Asset path requested: ${normalizedPath}, returning: ${BASE_PATH}${normalizedPath}`);
  
  return `${BASE_PATH}${normalizedPath}`;
};

// Helper function to get correct image path considering environment
export const getImagePath = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Try the BASE_PATH version first, then fallback to direct path if needed
  return import.meta.env.DEV ? normalizedPath : `${BASE_PATH}${normalizedPath}`;
};
