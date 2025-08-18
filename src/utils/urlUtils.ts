/**
 * Normalizes a URL by ensuring it has a protocol (https://)
 * @param url - The URL to normalize
 * @returns The normalized URL with https:// prefix if needed, or empty string if invalid
 */
export const normalizeUrl = (url: string): string => {
  if (!url || !url.trim()) {
    return "";
  }

  const trimmedUrl = url.trim();
  
  // If URL already has a protocol, return as-is
  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl;
  }
  
  // Add https:// prefix for URLs that start with www. or appear to be domains
  if (trimmedUrl.startsWith("www.") || trimmedUrl.includes(".")) {
    return `https://${trimmedUrl}`;
  }
  
  return trimmedUrl;
};

/**
 * Validates if a URL is properly formatted after normalization
 * @param url - The URL to validate
 * @returns True if the URL is valid after normalization
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || !url.trim()) {
    return true; // Empty URLs are considered valid (optional field)
  }
  
  const normalizedUrl = normalizeUrl(url);
  
  try {
    new URL(normalizedUrl);
    return true;
  } catch {
    return false;
  }
};