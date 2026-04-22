UPDATE public.investment_deals
SET
  is_published = true,
  published_at = COALESCE(published_at, now()),
  name = CASE slug
    WHEN 'beimpact' THEN 'be/impact'
    WHEN 'anthropic' THEN 'Anthropic'
    WHEN 'kalshi' THEN 'Kalshi'
    WHEN 'loxa' THEN 'Loxa'
    WHEN 'pandektes' THEN 'Pandektes'
    WHEN 'propane' THEN 'Propane'
    WHEN 'webel' THEN 'Webel'
    ELSE name
  END,
  sort_order = CASE slug
    WHEN 'webel' THEN 100
    WHEN 'beimpact' THEN 90
    WHEN 'propane' THEN 80
    WHEN 'anthropic' THEN 70
    WHEN 'kalshi' THEN 60
    WHEN 'loxa' THEN 50
    WHEN 'pandektes' THEN 40
    ELSE sort_order
  END
WHERE slug IN ('beimpact','anthropic','kalshi','loxa','pandektes','propane','webel');