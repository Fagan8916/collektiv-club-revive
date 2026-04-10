

## Fix: New Members Redirected to /membership Instead of Build Profile

### Root Cause

In `src/pages/Members.tsx` (lines 70-77), there's a check to redirect unapproved members away. It uses `window.location.pathname` to detect if the user is on the build-profile page. But since the app uses **HashRouter**, `window.location.pathname` is always `/` — the route lives in `window.location.hash`. So the build-profile exception never matches, and all unapproved new members get kicked to `/membership`.

### Fix

**File: `src/pages/Members.tsx` (lines 71-72)**

Change:
```javascript
const currentPath = window.location.pathname;
const isProfileBuildPath = currentPath.includes('/build-profile');
```

To:
```javascript
const currentHash = window.location.hash;
const isProfileBuildPath = currentHash.includes('/build-profile');
```

This single two-line change ensures new members arriving at `/#/members/build-profile` are not incorrectly redirected to the membership page.

### No other files affected
The rest of the auth flow (App.tsx, main.tsx, useAuth) correctly routes new signups to build-profile. Only this guard was broken due to the pathname vs hash mismatch.

