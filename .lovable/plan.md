

## Plan: Move VC Brain Promo to Founders Page as Popup

### What changes

Currently the FounderResourcesSection sits inside `ProfileSubmissionForm.tsx` (the member profile builder). It needs to be removed from there and instead appear as a **dialog/popup on the Founders page** triggered by clicking any "Submit an Investment Enquiry" button.

### Flow

```text
User clicks "Submit an Investment Enquiry" (any of the 4 buttons)
        ↓
Dialog/popup appears with VC Brain recommendation
        ↓
Two actions available:
  - "Continue to Enquiry Form" → opens Airtable form in new tab
  - "Close" / dismiss the dialog
```

### Changes

**1. Update `src/pages/Founders.tsx`**
- Import the `Dialog` component and `FounderResourcesSection`
- Add state to control dialog open/close
- Change all 4 Airtable link buttons (`<a>` tags on lines 51-59, 97-105, 142-149, 205-212, 252-259) from direct links to `onClick` handlers that open the dialog
- Render a `Dialog` containing the FounderResourcesSection content plus a "Continue to Enquiry Form" button that opens the Airtable URL

**2. Update `src/components/FounderResourcesSection.tsx`**
- Optionally adapt styling for dialog context (slightly smaller padding), or reuse as-is inside the dialog

**3. Update `src/components/ProfileSubmissionForm.tsx`**
- Remove the `<FounderResourcesSection />` and its import (it doesn't belong in the profile form)

### Result
- Founders page visitors see the VC Brain promo every time they click to submit an enquiry
- They can still proceed to the Airtable form from the popup
- Profile submission form is cleaned up (no unrelated promo)

