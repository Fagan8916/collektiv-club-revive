

## Changes Overview

This plan covers 5 distinct updates to your site.

---

### 1. Remove "Invest in the future of tech" badge from Hero

The sparkle badge pill at the top of the hero section (`src/components/HeroSection.tsx`, lines 20-23) will be removed entirely.

---

### 2. Refresh the "How It Works" section

Based on the reference image you provided, here are **3 design options** for refreshing this section:

**Option A -- Numbered Timeline (Vertical)**
A clean vertical timeline with numbered circles on a central line, alternating left/right content cards. Each step has a large number, title, and short description. No images -- just clean typography and subtle connecting lines. Premium and minimal.

**Option B -- Horizontal Stepper with Icons**
A horizontal row of steps connected by a thin line/arrow. Each step is a card with a large step number, icon, title, and description. Works well on desktop; stacks vertically on mobile. Similar to the reference image's clean, step-by-step flow.

**Option C -- Accordion/Expand Style**
Steps listed vertically as expandable rows. Each shows the step number and title; clicking expands to reveal the description. Compact and modern, great for mobile.

You can pick one (or describe what you liked from the attached reference) and I will implement it.

---

### 3. Fix SwissEP Logo

The SwissEP logo is referenced as `lovable-uploads/swissep-logo.svg` in `PartnersSection.tsx`. The uploaded file `swiss-ep-logo.svg` from earlier was saved to `public/lovable-uploads/swissep-logo.svg`. I will:

- Copy the newly uploaded SwissEP logo (`images.png`) to a reliable PNG format file (e.g., `swissep-logo-new.png`)
- Update `PartnersSection.tsx` to reference the new PNG file instead of the SVG, which has been problematic

---

### 4. Fix Kevin's Photo on About Page

Kevin's photo (`kevin-chavanne-transparent.png`) currently shows a visible white background inside the circular crop, unlike Manon and Ryan's photos which have proper transparent backgrounds. The fix:

- Re-process Kevin's headshot image to properly remove the white background, matching the transparent style of Manon and Ryan
- The circular crop styling (`rounded-full`, `object-cover`) in `About.tsx` will remain the same -- the issue is the image file itself, not the CSS

---

### 5. Change "Get Started" to "Become a Member" on Membership Page

In `src/components/MembershipSection.tsx` (line 57), change the button text from "Get Started" to "Become a Member".

---

### Technical Summary

| File | Change |
|------|--------|
| `src/components/HeroSection.tsx` | Remove lines 20-23 (badge pill) |
| `src/components/HowItWorksSection.tsx` | Redesign layout (pending option choice) |
| `public/lovable-uploads/swissep-logo-new.png` | New PNG logo file |
| `src/components/PartnersSection.tsx` | Update SwissEP logo path to PNG |
| `public/lovable-uploads/kevin-chavanne-transparent.png` | Re-process with proper transparency |
| `src/components/MembershipSection.tsx` | "Get Started" to "Become a Member" |

