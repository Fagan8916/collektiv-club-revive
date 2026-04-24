## Diagnosis
Nik’s backend account looks correct now:
- `nik@yolocomms.com` exists in `auth.users`
- email is confirmed
- `auth.identities.identity_data.email_verified = true`
- he has an approved `member` role

That means the remaining failure is most likely in the frontend OAuth callback handling, not his data.

The most likely cause is the current callback flow:
- the app uses `HashRouter`
- Google OAuth returns to the site root with auth data in the URL fragment
- `main.tsx` rewrites the callback URL
- `App.tsx` also rewrites/processes the callback URL
- the Supabase client still has `detectSessionInUrl: true`

So there are effectively multiple systems trying to consume the same OAuth callback. That can leave the session unset or briefly unset, after which the route guards in `Members` / `BuildProfile` send the user back to `/login`, which matches Nik’s “looping on mobile and PC” report.

## Plan
1. Consolidate OAuth callback handling into one path only.
   - Keep one source of truth for parsing auth tokens/codes.
   - Remove the duplicate callback consumption between `main.tsx`, `App.tsx`, and the Supabase client auto-detection.

2. Make the callback parser deterministic.
   - Parse with `URL`/`URLSearchParams` from `window.location.hash` and `window.location.search`, not string splits on the full `href`.
   - Handle implicit-flow fragments and any double-hash cases in one place.

3. Stop redirecting before the session is actually ready.
   - After OAuth callback, wait until `setSession()`/session restore succeeds.
   - Only then route to `/members` or `/members/build-profile`.
   - Keep the `auth_in_progress` guard active until session confirmation is complete.

4. Harden the auth guards.
   - Update `Login`, `Members`, `BuildProfile`, and `SetupAccount` so they do not bounce to `/login` while an OAuth callback is still being processed.
   - Make the fallback state explicit instead of silently looping.

5. Add visible failure handling.
   - If Google callback finishes without a usable session, show a clear error/toast with next steps instead of sending the user back to login with no explanation.

## Files to update
- `src/integrations/supabase/client.ts`
- `src/main.tsx`
- `src/App.tsx`
- `src/components/auth/GoogleSignInButton.tsx`
- `src/pages/Login.tsx`
- `src/pages/Members.tsx`
- `src/pages/members/BuildProfile.tsx`
- `src/pages/SetupAccount.tsx`

## Technical details
Recommended approach for this codebase:
- keep the existing hash-based app routing
- keep Google redirecting to a non-hash root callback URL
- manually handle the OAuth callback in one place
- disable `detectSessionInUrl` in the Supabase client so the SDK does not race the app’s own callback logic

That is the smallest safe fix without migrating the whole app away from `HashRouter`.

## Expected result
After this change, Nik should be able to click “Continue with Google”, select `nik@yolocomms.com`, and land in the member flow instead of being returned to the Member Login screen.