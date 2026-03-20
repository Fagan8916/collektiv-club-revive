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
        author: creator === 'Corey Lahey' ? 'Kevin Chavanne' : creator,
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
