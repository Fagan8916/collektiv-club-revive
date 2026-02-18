
## Two Changes: Membership Page CTA + Header "Join Now" Popup

### 1. Add "Book a Discovery Call" CTA to Membership Page

In `src/components/MembershipSection.tsx`, add a second button below the existing "Become a Member" button linking to the Zcal booking page (`https://zcal.co/collektiv/15min`). This mirrors the hero section pattern on the home page -- a primary green button plus a secondary outlined button.

### 2. Replace "Join Now" Link with a Popup Dialog

In `src/components/Header.tsx`, replace the `<Link to="/membership">` "Join Now" button (both desktop and mobile) with a Dialog popup containing three options:

| Option | Link |
|--------|------|
| Become a Member | `https://airtable.com/appWGyTHcjHMgZrUz/pagHdPVxVwljspHTq/form` |
| Book a Discovery Call | `https://zcal.co/collektiv/15min` |
| Submit a Founder Pitch Deck | `https://airtable.com/appWGyTHcjHMgZrUz/pagTxXOeZJ2McNFHZ/form` |

All three open in new tabs. The popup will be a styled card using the existing `Dialog` component with a dark theme to match the site aesthetic.

### Technical Details

**`src/components/MembershipSection.tsx`**
- Change the CTA area (lines 48-58) from a single button to a flex column/row with two buttons
- Add a "Book a Discovery Call" `<a>` tag styled as an outlined/secondary button linking to `https://zcal.co/collektiv/15min`

**`src/components/Header.tsx`**
- Import `Dialog, DialogContent, DialogHeader, DialogTitle` from `@/components/ui/dialog`
- Add `useState` for dialog open state
- Replace the desktop "Join Now" `<Link>` (line 113-119) with a `<button>` that opens the dialog
- Replace the mobile "Join Now" `<Link>` (line 154-160) with a `<button>` that opens the dialog
- Add a single `<Dialog>` component rendered once, containing three styled link cards, each opening their respective URL in a new tab
- Each option will have an icon, title, and brief description for clarity
