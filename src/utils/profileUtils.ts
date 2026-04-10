/**
 * Utility functions for profile management
 */

export interface ProfileData {
  id?: string;
  first_name?: string | null;
  full_name?: string | null;
  bio?: string | null;
  company?: string | null;
  position?: string | null;
  linkedin_url?: string | null;
  profile_image_url?: string | null;
}

const DEFAULT_BIO = 'member of the collektiv club';

/**
 * Determines if a profile is complete enough for the user to access the members area.
 * A trigger-created profile only has first_name, full_name (last name), and a default bio.
 * A profile is "complete" if it has meaningful content BEYOND the auto-created defaults:
 * - A real bio (not the trigger default)
 * - OR company filled in
 * - OR position filled in
 * - OR LinkedIn URL filled in
 * - OR a profile image uploaded
 */
export function isProfileComplete(profile: ProfileData | null | undefined): boolean {
  if (!profile) return false;

  const hasRealBio = profile.bio &&
    profile.bio.trim() !== '' &&
    profile.bio.trim().toLowerCase() !== DEFAULT_BIO;

  const hasCompany = profile.company && profile.company.trim() !== '';
  const hasPosition = profile.position && profile.position.trim() !== '';
  const hasLinkedIn = profile.linkedin_url && profile.linkedin_url.trim() !== '';
  const hasImage = profile.profile_image_url && profile.profile_image_url.trim() !== '';

  return !!(hasRealBio || hasCompany || hasPosition || hasLinkedIn || hasImage);
}

/**
 * Determines if a profile needs to be completed
 */
export function isProfileIncomplete(profile: ProfileData | null | undefined): boolean {
  return !isProfileComplete(profile);
}
