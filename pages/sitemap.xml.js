import { getAllDeals } from '../lib/supabase';
import { slugify } from '../lib/slugify';

const SITE_URL = 'https://www.whileushop.com';

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSiteMap(deals) {
  const today = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
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
    <loc>${SITE_URL}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
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
  const deals = await getAllDeals();
  const sitemap = generateSiteMap(deals);

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(sitemap);
  res.end();

  return { props: {} };
}
