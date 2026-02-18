

## Add Text Shadow to Hero Title

A subtle dark text shadow will be applied to the "Invest in VC-Backed" and "Start-ups" headings in `src/components/HeroSection.tsx` to give them more visual depth against the gradient background.

### Technical Details

In `src/components/HeroSection.tsx`, add inline `textShadow` styles to both `<h1>` elements (lines 25-30):

- **"Invest in VC-Backed"** (white text): `textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'`
- **"Start-ups"** (green text): `textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'` (slightly lighter to preserve the green glow)

This creates a soft downward shadow that adds depth without looking heavy or dated.

