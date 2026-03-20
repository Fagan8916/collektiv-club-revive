

## Plan: Add "Series A Pitch" Article + Image-Free Article Design

### What we're building

1. **New article page** at `/insights/series-a-pitch` with the full Substack content by Corey Lahey
2. **Make images optional** across the articles system so future articles can be added without needing a unique photo

### The image problem and solution

Right now every article requires an `image` field, and the grid always renders a photo. For articles without a unique image, I recommend a **gradient/pattern hero fallback** approach:

- Make `image` optional in the article data type
- When no image is provided, render a styled gradient block using brand colors (dark teal/green) with the category badge overlaid — similar to how Medium or Substack handle text-only posts
- This keeps the grid visually consistent without needing stock photos
- Articles with images continue to work exactly as they do now

### Changes

**1. `src/data/articles.ts`**
- Make `image` field optional in the type
- Add new article entry (id: 15) for "The Anatomy of a Successful Series A Pitch" by Corey Lahey, March 2026, category "Fundraising", no image

**2. `src/components/insights/ArticlesGrid.tsx`**
- Update the `Article` interface to make `image` optional
- When `image` is missing/empty, render a gradient placeholder block with the category name instead of an `<img>` tag
- Gradient uses brand colors (`collektiv-green`, `collektiv-dark`, `collektiv-darkTeal`)

**3. `src/components/ArticleLayout.tsx`**
- Make `image` prop truly optional — when not provided, skip the featured image section entirely rather than showing a fallback

**4. `src/components/NewsSection.tsx`**
- Same optional image handling for the homepage insights preview cards

**5. New file: `src/pages/insights/SeriesAPitch.tsx`**
- Full article page using `ArticleLayout` component
- Content adapted from the Substack post (removing UglyBaby promotional links, keeping the educational content)
- Author: "Corey Lahey" (one of your founders)
- No image prop — will use the new image-free layout

**6. `src/App.tsx`**
- Add route: `/insights/series-a-pitch`

### Gradient fallback design

For image-free article cards in the grid:
```text
┌─────────────────────┐
│  ██████████████████  │  <- Gradient block (green→teal)
│  ██  Fundraising ██  │  <- Category badge centered
│  ██████████████████  │
├─────────────────────┤
│  Title...            │
│  Date · Author       │
│  Excerpt...          │
│  Read More →         │
└─────────────────────┘
```

This gives you a clean, branded look and means you can add as many articles as you want without hunting for stock photos.

