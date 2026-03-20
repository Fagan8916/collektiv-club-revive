const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const FEED_URL = 'https://coreytheassistant.substack.com/feed';

function extractText(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? (match[1] ?? match[2] ?? '').trim() : '';
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

// Curated image pool — each image is unique and mapped to topic keywords
const IMAGE_POOL = [
  { url: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80', keywords: ['pitch', 'presentation', 'slides', 'deck', 'series a'] },
  { url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80', keywords: ['angel', 'investor', 'investing', 'returns', 'portfolio'] },
  { url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80', keywords: ['funding', 'capital', 'raise', 'round', 'finance'] },
  { url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80', keywords: ['metrics', 'data', 'analytics', 'measure', 'kpi'] },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', keywords: ['founder', 'team', 'leadership', 'people', 'hire'] },
  { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80', keywords: ['valuation', 'worth', 'multiple', 'revenue'] },
  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', keywords: ['syndicate', 'group', 'collective', 'club', 'network'] },
  { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', keywords: ['growth', 'scale', 'startup', 'saas', 'traction'] },
  { url: 'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=800&q=80', keywords: ['tax', 'eis', 'seis', 'relief', 'scheme'] },
  { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80', keywords: ['strategy', 'plan', 'roadmap', 'market'] },
  { url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80', keywords: ['deal', 'agreement', 'contract', 'term', 'note'] },
  { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', keywords: ['tech', 'product', 'software', 'build', 'engineering'] },
  { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', keywords: ['meeting', 'event', 'conference', 'community'] },
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', keywords: ['chart', 'graph', 'performance', 'trend'] },
  { url: 'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=800&q=80', keywords: ['money', 'cash', 'profit', 'exit', 'return'] },
  { url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80', keywords: ['office', 'workspace', 'work', 'business'] },
];

function assignImage(title: string, index: number, usedIndices: Set<number>): string {
  const lowerTitle = title.toLowerCase();

  // Score each image by keyword matches
  let bestIdx = -1;
  let bestScore = 0;
  for (let i = 0; i < IMAGE_POOL.length; i++) {
    if (usedIndices.has(i)) continue;
    const score = IMAGE_POOL[i].keywords.filter(kw => lowerTitle.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }

  // If no keyword match or all matched are taken, use index-based fallback
  if (bestIdx === -1) {
    for (let i = 0; i < IMAGE_POOL.length; i++) {
      const candidate = (index + i) % IMAGE_POOL.length;
      if (!usedIndices.has(candidate)) {
        bestIdx = candidate;
        break;
      }
    }
  }

  // Ultimate fallback: reset and use index
  if (bestIdx === -1) {
    bestIdx = index % IMAGE_POOL.length;
  }

  usedIndices.add(bestIdx);
  return IMAGE_POOL[bestIdx].url;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const res = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'CollektivClub/1.0' },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('Feed fetch failed:', res.status, body);
      return new Response(JSON.stringify({ error: 'Failed to fetch feed' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const xml = await res.text();

    // Split into items
    const items = xml.split('<item>').slice(1);

    const articles = items.map((item, i) => {
      const title = extractText(item, 'title');
      const contentEncoded = extractText(item, 'content:encoded') || extractText(item, 'description');
      const description = extractText(item, 'description');
      const pubDate = extractText(item, 'pubDate');
      const creator = extractText(item, 'dc:creator') || extractText(item, 'author');
      const link = extractText(item, 'link');
      const slug = slugify(title);

      // Try to extract first image from content
      const imgMatch = contentEncoded.match(/<img[^>]+src=\\"([^\\"]+)\\"/);
      const image = imgMatch ? imgMatch[1] : undefined;

      // Create excerpt from description or content
      const excerpt = stripHtml(description || contentEncoded).slice(0, 200) + '...';

      // Format date
      let formattedDate = pubDate;
      try {
        const d = new Date(pubDate);
        formattedDate = d.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      } catch {
        // keep raw date
      }

      return {
        id: 1000 + i,
        title,
        excerpt,
        content: contentEncoded,
        date: formattedDate,
        author: (creator === 'Corey Lahey' || creator === 'Kevin Chavanne') ? 'Kevin Chavanne (Ugly Baby/Collektiv)' : creator,
        image,
        slug,
        route: `/insights/${slug}`,
        category: 'Substack',
        link,
        isSubstack: true,
      };
    });

    return new Response(JSON.stringify(articles), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
    });
  } catch (err) {
    console.error('Edge function error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
