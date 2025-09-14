/**
 * Utility functions for profile management
 */

export interface ProfileData {
  id?: string;
  first_name?: string | null;
  full_name?: string | null;
}

/**
 * Determines if a profile is complete enough for the user to access the members area
 * A profile is considered complete if it has either:
 * - A meaningful first_name (not empty/whitespace)
 * - A meaningful full_name (not empty/whitespace and not just "Member")
 */
export function isProfileComplete(profile: ProfileData | null | undefined): boolean {
  if (!profile) return false;

  const hasFirstName = profile.first_name && profile.first_name.trim() !== '';
  const hasFullName = profile.full_name && 
    profile.full_name.trim() !== '' && 
    profile.full_name.trim().toLowerCase() !== 'member';

  return hasFirstName || hasFullName;
}

/**
 * Determines if a profile needs to be completed
 */
export function isProfileIncomplete(profile: ProfileData | null | undefined): boolean {
  return !isProfileComplete(profile);
}