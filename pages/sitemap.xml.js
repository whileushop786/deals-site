import { supabase } from '../lib/supabase';
import { slugify } from '../lib/slugify';

const SITE_URL = 'https://www.whileushop.com';

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSiteMap(deals, shopPages) {
  const today = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Static pages -->
  <url>
    <loc>${SITE_URL}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/freebies-library</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Dynamic Shop & Save pages -->
${shopPages.map((page) => `  <url>
    <loc>${SITE_URL}/shop/${escapeXml(page.slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}

  <!-- Product pages -->
${deals.map((deal) => {
  const slug = slugify(deal.title);
  const lastmod = deal.deal_date || today;
  const imageTag = deal.image_url ? `
    <image:image>
      <image:loc>${escapeXml(deal.image_url)}</image:loc>
      <image:title>${escapeXml(deal.title)}</image:title>
    </image:image>` : '';
  return `  <url>
    <loc>${SITE_URL}/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageTag}
  </url>`;
}).join('\n')}
</urlset>`;
}

export default function SiteMap() {}

export async function getServerSideProps({ res }) {
  const [{ data: deals }, { data: shopPages }] = await Promise.all([
    supabase.from('deals').select('title, deal_date, image_url').eq('active', true),
    supabase.from('shop_pages').select('slug').eq('active', true),
  ]);

  const sitemap = generateSiteMap(deals || [], shopPages || []);

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(sitemap);
  res.end();

  return { props: {} };
}
