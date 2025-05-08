
/**
 * Helper utility to correctly load assets with the base path prefix
 * This helps resolve GitHub Pages deployment issues
 */

// Base path matching the one in vite.config.ts
// Use an empty string for development and the correct path for production
export const BASE_PATH = import.meta.env.DEV ? '' : "/collektiv-club-revive";

/**
 * Get the correct path for assets, adding the base path if needed
 * @param path The asset path (should start with /)
 * @returns The correct path with base path prefixed
 */
export const getAssetPath = (path: string): string => {
  if (!path) return '';
  
  // Make sure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${BASE_PATH}${normalizedPath}`;
};

// Helper function to get correct image path considering environment
export const getImagePath = (path: string): string => {
  if (!path) return '';
  
  // For images in the public directory, they should be accessed directly without processing
  if (path.startsWith('/lovable-uploads/')) {
    // Handle both with and without leading slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${BASE_PATH}${normalizedPath}`;
  }
  
  // For other images, use the standard asset path handler
  return getAssetPath(path);
};

// Ensure URLs are HTTPS
export const ensureHttps = (url: string): string => {
  if (!url) return '';
  
  if (url.startsWith('http:') && window.location.hostname !== 'localhost') {
    return url.replace('http:', 'https:');
  }
  return url;
};

// Get absolute URL with HTTPS
export const getAbsoluteUrl = (path: string): string => {
  if (!path) return '';
  
  const baseUrl = window.location.origin;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const absoluteUrl = `${baseUrl}${BASE_PATH}${normalizedPath}`;
  return ensureHttps(absoluteUrl);
};
