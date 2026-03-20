

## Plan: Auto-Fetch Articles from Substack RSS Feed

### What this does

New articles from Kevin's Substack (`coreytheassistant.substack.com`) will automatically appear on your Insights page without any code changes. When Kevin publishes a new post on Substack, it shows up on your site.

### How it works

```text
Substack publishes post
        ↓
Your site loads /insights
        ↓
Frontend calls Edge Function (CORS proxy)
        ↓
Edge Function fetches coreytheassistant.substack.com/feed
        ↓
Returns parsed articles as JSON
        ↓
Insights page merges RSS articles with existing hardcoded ones
        ↓
Clicking an RSS article opens a dynamic page rendering the content
```

### Why the Edge Function

Browsers block cross-origin requests to Substack's RSS feed (CORS). The edge function is a simple 30-line proxy — it fetches the feed and passes it back. No database, no secrets, no Zapier.

### Changes

**1. New Edge Function: `supabase/functions/fetch-substack-feed/index.ts`**
- Fetches `https://coreytheassistant.substack.com/feed`
- Parses XML RSS into JSON (title, excerpt, content, date, author, slug)
- Returns array of articles
- `verify_jwt = false` in config.toml (public content, no auth needed)

**2. New hook: `src/hooks/useSubstackArticles.ts`**
- Calls the edge function on mount
- Caches results with React Query (avoids re-fetching on every page load)
- Returns articles in the same shape as the existing `Article` type
- Maps author "Corey Lahey" to "Kevin Chavanne" automatically

**3. Update: `src/pages/News.tsx` (Insights page)**
- Fetch RSS articles via the hook
- Merge with existing hardcoded articles from `src/data/articles.ts`
- Sort by date (newest first)
- RSS articles use the gradient placeholder (no images) and link to a dynamic article page

**4. New page: `src/pages/insights/SubstackArticle.tsx`**
- Dynamic article page that renders RSS content using `ArticleLayout`
- Receives slug via URL param, fetches the matching article from the RSS feed
- Renders the HTML content from Substack safely using DOMPurify

**5. Update: `src/App.tsx`**
- Add catch-all route: `/insights/:slug` for dynamic RSS articles
- Place it after all existing hardcoded insight routes so they take priority

**6. Update: `src/components/NewsSection.tsx` (homepage preview)**
- Also merge RSS articles so the homepage shows the latest posts too

### What stays the same

- All 15 existing hardcoded article pages remain untouched
- Hardcoded articles always take priority over RSS articles with the same slug
- The gradient placeholder system we just built handles RSS articles without images

### Dependencies

- `dompurify` package for safely rendering Substack HTML content on the dynamic article page

