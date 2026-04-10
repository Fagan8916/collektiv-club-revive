

## Fix: Build Profile Shows "Already Created" Instead of Form

### Problem
The database trigger auto-creates a skeleton `member_profiles` row on signup. The `ProfileSubmissionForm` checks if any profile row exists (`profileData`) and immediately shows the "Profile Already Created" screen with skip buttons — even though the profile is empty.

### Fix

**File: `src/components/ProfileSubmissionForm.tsx`**

1. **Use `isProfileComplete` instead of row existence** — Import `isProfileComplete` from `profileUtils.ts` and fetch the full profile fields (bio, company, position, linkedin_url, profile_image_url). Only set `hasExistingSubmission = true` if the profile is genuinely complete. If an incomplete trigger-created profile exists, pre-fill the form with whatever data exists (first_name, full_name) so the user sees their name pre-populated.

2. **Remove "View Directory" skip button** — The "Profile Already Created" screen (which now only shows for truly complete profiles) should not let users skip. Replace with a message like "Your profile is complete" and only offer "Edit Profile" and "View Directory" (this is fine since profile IS complete).

3. **Update copy for the complete-profile screen** — Change "Profile Already Created" to "Profile Complete" or "You're All Set!" to be more welcoming.

**Specific changes (lines 62-80):**
- Change the profile query to fetch `id, first_name, full_name, bio, company, position, linkedin_url, profile_image_url`
- Import and use `isProfileComplete()` to decide `hasExistingSubmission`
- If profile exists but is incomplete, pre-fill form defaults with existing data (first_name, full_name)

**Copy improvements for the already-complete screen (lines 276-307):**
- Title: "You're All Set!" instead of "Profile Already Created"
- Body: "Your profile is live in the member directory. You can update it anytime."
- Keep both buttons (Edit Profile / View Directory) since profile IS genuinely complete

