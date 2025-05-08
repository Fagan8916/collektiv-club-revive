
/**
 * Helper function to get the correct path for assets
 * Uses the import.meta.env.BASE_URL value from Vite
 */
export const getAssetPath = (path: string): string => {
  const basePath = import.meta.env.BASE_URL || '/';
  
  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Return the path with the base URL
  return `${basePath}${normalizedPath}`;
};

// Common asset paths without leading slashes
export const ASSETS = {
  LOGO: 'lovable-uploads/f8c8ddc0-f08b-4fd1-88ba-d214d1af74b4.png',
  LOGO_WHITE: 'lovable-uploads/f2fa4572-ad28-4141-9d35-e83e2d2d4660.png',
  FAVICON: 'lovable-uploads/a3fd0962-db0c-4a92-8c9a-96d807501887.png'
};
