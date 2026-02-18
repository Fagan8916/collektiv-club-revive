

## Plan: Add Logo Strip to Homepage + New Partnerships Page

### 1. Homepage Logo Strip

Add a new "Trusted By" / "Our Network" logo strip section on the homepage, displayed beneath the hero section. This will show logos for:

- **Anthropic** (needs logo uploaded -- will use a clean text placeholder styled like their wordmark until you upload the actual logo image)
- **be/impact** (logo already exists: `beimpact-logo.jpg`)
- **Propane** (logo already exists: `8429af36-...png`)
- **Webel** (logo already exists: `webel-logo.png`)

The logos will be displayed in a horizontal row with grayscale styling that turns to color on hover, similar to a typical "trusted by" section.

**New file:** `src/components/LogoStrip.tsx`
**Modified file:** `src/pages/Index.tsx` -- insert `<LogoStrip />` after `<HeroSection />`

### 2. New Partnerships Page

Create a dedicated `/partnerships` page featuring:

- A hero banner with heading "Our Partners"
- Logo cards for **SwissEP** and **Plug and Play Tech Center** (logos will need to be uploaded by you, or I can use text-based placeholders styled to match)
- Each card will have the partner name, a brief description, and a link to their website

**New files:**
- `src/pages/Partnerships.tsx`

**Modified files:**
- `src/App.tsx` -- add route for `/partnerships`
- `src/components/Header.tsx` -- add "Partnerships" to the navigation menu

### 3. Important Note on Logos

For **Anthropic**, **SwissEP**, and **Plug and Play Tech Center**, I don't have their logo image files in the project. I have two options:

- **Option A:** Use styled text placeholders that match each brand's wordmark style (can be swapped later when you upload the actual logo files)
- **Option B:** You upload the logo images for these three companies, and I use those directly

I'll proceed with **Option A** (text-based placeholders) so you can see the layout immediately, and you can upload the real logos afterward for me to swap in.

---

### Technical Details

**LogoStrip.tsx structure:**
```text
Section: light background
  Row of 4 logos (Anthropic, be/impact, Propane, Webel)
  Each logo: grayscale filter, hover -> full color
  Wrapped in anchor tags linking to their websites
```

**Partnerships.tsx structure:**
```text
Header + Footer wrapping
Hero: "Our Partners" heading with dark teal background
Partner cards (2): SwissEP, Plug and Play
  - Logo / name
  - 2-sentence description
  - External link button
```

**Route addition in App.tsx:**
```text
import Partnerships from './pages/Partnerships';
<Route path="/partnerships" element={<Partnerships />} />
```

**Navigation update in Header.tsx:**
```text
Add { name: "Partnerships", href: "/partnerships" } to navigation array
```
