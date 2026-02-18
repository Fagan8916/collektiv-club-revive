

## Update Hero Section Buttons

Two changes to the hero buttons in `src/components/HeroSection.tsx`:

### 1. "Become a Member" button
Change from an internal `<Link to="/membership">` to an external `<a>` tag pointing to:
`https://airtable.com/appWGyTHcjHMgZrUz/pagHdPVxVwljspHTq/form` (opens in new tab).

### 2. "Learn More" button
- Change text to **"Book a call to learn more about investment membership"**
- Change from an internal `<Link to="/about">` to an external `<a>` tag pointing to:
  `https://zcal.co/collektiv/15min` (opens in new tab)

### Technical Details

In `src/components/HeroSection.tsx` (lines 33-45), both `<Link>` components will be replaced with `<a href="..." target="_blank" rel="noopener noreferrer">` tags. The styling remains the same. The "Learn More" button text will be longer, so it may wrap on smaller screens -- the existing responsive layout handles this gracefully.

