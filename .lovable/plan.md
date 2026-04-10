

## Fix: Member Name Duplication

### Root Cause

The `handle_new_member` database trigger receives a full name like "Brian Leggit" and stores:
- `first_name` = "Brian" (first word)
- `full_name` = "Brian Leggit" (entire name, unchanged)

Then the UI displays `first_name + " " + full_name` = "Brian Brian Leggit".

### Fix (3 parts)

**1. Fix the `handle_new_member` trigger** so `full_name` stores only the LAST name (everything after the first space):
```sql
first_name_value := split_part(full_name_value, ' ', 1);
-- Change full_name to store only the remaining parts (last name)
last_name_value := trim(substring(full_name_value from position(' ' in full_name_value)));
```
If there's no space (single name), `full_name` stays as-is and `first_name` stays the same.

**2. Fix existing data** with a migration that strips the duplicated first name from `full_name` for all affected rows:
```sql
UPDATE member_profiles
SET full_name = trim(substring(full_name from length(first_name) + 1))
WHERE first_name IS NOT NULL
  AND full_name LIKE first_name || ' %';
```

**3. Review display logic** across components (`AdminProfileManager`, `MemberDirectory`, `ProfileEditForm`, etc.) to ensure they consistently show `first_name + " " + full_name` (which will now be correct since full_name = last name only).

### Files changed
- Database migration: fix trigger + fix existing data
- Verify display logic in `AdminProfileManager.tsx`, `MemberDirectory.tsx`, and related components (likely already correct once data is fixed)

