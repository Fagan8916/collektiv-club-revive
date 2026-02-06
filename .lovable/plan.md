
## Issue Analysis and Solution Plan

You're experiencing two separate issues that I've identified through investigation:

---

## Issue 1: "Unknown User" in Recent Decisions

### Root Cause
The MembershipManager component attempts to fetch user details using `supabase.auth.admin.getUserById()` (line 47 in MembershipManager.tsx). This Admin API call requires special privileges that aren't available to regular authenticated users in the browser. When it fails, the code catches the error and falls back to displaying "Unknown User".

The invited members do have their names stored in `user_metadata.full_name` (passed during the invite), but the client can't access this data without admin privileges.

### Solution
Modify the MembershipManager to look up the invited member's name from an accessible source:

1. **Add a `full_name` column to `pre_approved_emails` table** - Store the name when sending invitations
2. **Update the admin-invite edge function** - Save the name to `pre_approved_emails` when inviting
3. **Update MembershipManager** - Join with `pre_approved_emails` to get the invited name, or look up from `member_profiles` if the user has created one

### Files to Modify
- `supabase/functions/admin-invite/index.ts` - Add full_name to pre_approved_emails upsert
- `src/components/MembershipManager.tsx` - Query pre_approved_emails for display names
- Create a database migration to add `full_name` column to `pre_approved_emails`

---

## Issue 2: "Edge Function returned a non-2xx status code" on Invitation

### Root Cause
The auth logs reveal the exact error:
```
535 5.7.8 Username and Password not accepted
https://support.google.com/mail/?p=BadCredentials
```

The SMTP email credentials configured in your Supabase project are invalid or have expired. Supabase uses these credentials to send invitation emails, and they're failing authentication.

This is an infrastructure/configuration issue, not a code issue.

### Solution
You need to update the SMTP configuration in your Supabase project:

1. **Go to Supabase Dashboard** (https://supabase.com/dashboard)
2. Navigate to **Authentication** then **Email Templates** or **SMTP Settings**
3. Update the SMTP credentials with valid credentials

**If using Gmail SMTP:**
- You need to use an "App Password" instead of your regular Gmail password
- Enable 2-Factor Authentication on the Google account
- Generate an App Password at: https://myaccount.google.com/apppasswords
- Use this App Password in the SMTP settings

**Alternative - Use a dedicated email service:**
- Consider using Resend, SendGrid, or Mailgun for more reliable email delivery
- These services are designed for transactional emails and are more stable

---

## Implementation Summary

| Task | Type | Complexity |
|------|------|------------|
| Fix SMTP credentials in Supabase dashboard | Configuration | Quick fix (manual) |
| Add `full_name` column to `pre_approved_emails` | Database migration | Low |
| Update admin-invite to store name | Edge function | Low |
| Update MembershipManager to show names | Frontend | Medium |

---

## Technical Details

### Database Migration
```sql
ALTER TABLE pre_approved_emails 
ADD COLUMN full_name TEXT;
```

### Edge Function Change (admin-invite/index.ts)
Update the upsert to include the name:
```typescript
const preapprovePayload = {
  email: normalizedEmail,
  full_name: name || null,  // Add this line
  notes: "Added via admin-invite edge function",
  added_by: callerId,
};
```

### MembershipManager.tsx Change
Instead of relying on the failing admin API, look up names from accessible tables:
```typescript
// Get email from user_roles via pre_approved_emails join
// or check member_profiles for display name
```

---

## Recommended Next Steps

1. **First (Immediate)**: Fix the SMTP credentials in Supabase to unblock invitations
2. **Second**: Implement the database and code changes to show invited member names

Do you want me to implement the code changes for displaying member names once you've fixed the SMTP configuration?
