import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import FooterSubscribe from '../../components/FooterSubscribe';
import { supabase } from '../../lib/supabase';

const SITE_URL = 'https://www.whileushop.com';

export default function ShopPage({ page, deals }) {
  if (!page) return null;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${page.page_name} — WhileUShop.com`,
      url: `${SITE_URL}/shop/${page.slug}`,
      description: page.description,
      publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Shop & Save', item: `${SITE_URL}/shop` },
        { '@type': 'ListItem', position: 3, name: page.page_name, item: `${SITE_URL}/shop/${page.slug}` },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>{page.page_name} — Best Deals & Savings | WhileUShop.com</title>
        <meta name="description" content={page.description || `Find the best ${page.page_name} deals, coupons and discounts — updated daily at WhileUShop.com.`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${page.page_name} — WhileUShop.com`} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={`${SITE_URL}/shop/${page.slug}`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta property="og:site_name" content="WhileUShop.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${page.page_name} — WhileUShop.com`} />
        <meta name="twitter:description" content={page.description} />
        <link rel="canonical" href={`${SITE_URL}/shop/${page.slug}`} />
        {schema.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <nav aria-label="Breadcrumb" style={{ padding: '10px 20px', fontSize: 12, color: '#999' }}>
        <Link href="/" style={{ color: '#ff6b00' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#ff6b00' }}>Shop &amp; Save</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#aaa' }}>{page.page_name}</span>
      </nav>

      <main style={{ width: '100%', padding: '0 0 40px' }}>

        <div style={{ padding: '16px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 900, fontFamily: "'Barlow Condensed',sans-serif", textTransform: 'uppercase', color: '#1a1a1a', marginBottom: 6 }}>
            {page.icon} <span style={{ color: '#ff6b00' }}>{page.page_name}</span>
          </h1>
          {page.description && <p style={{ color: '#666', fontSize: 14 }}>{page.description}</p>}
        </div>

        {/* Page content */}
        {page.content && (
          <div style={{ padding: '0 20px 20px', maxWidth: 1100, margin: '0 auto' }}>
            <div className="static-card shop-page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        )}

        {/* Deal Cards */}
        {deals && deals.length > 0 && (
          <div style={{ padding: '0 16px' }}>
            <h2 className="shop-deals-heading">Latest Deals</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '40px',
              width: '100%',
              marginBottom: '24px'
            }}>
              {deals.map((deal) => (
                <div key={deal.id} style={{
                  background: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Image */}
                  {deal.image_url && (
                    <img
                      src={deal.image_url}
                      alt={deal.deal_name}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  )}

                  {/* Deal name */}
                  <div style={{
                    padding: '12px 14px 8px',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    lineHeight: '1.4'
                  }}>
                    {deal.deal_name}
                  </div>

                  {/* Description box */}
                  {deal.description && (
                    <div style={{
                      margin: '0 14px',
                      padding: '10px 12px',
                      background: 'transparent',
                      borderLeft: '3px solid #ff6b00',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#555',
                      lineHeight: '1.6',
                    }}
                      dangerouslySetInnerHTML={{ __html: deal.description }}
                    />
                  )}

                  {/* Shop Now button */}
                  <a
                    href={deal.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    style={{
                      display: 'block',
                      margin: '12px 14px 14px',
                      background: '#ff6b00',
                      color: '#fff',
                      textAlign: 'center',
                      padding: '10px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    Shop Now →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 20, paddingBottom: 20 }}>
          <Link href="/" className="back-btn">← Back to All Deals</Link>
        </div>

      </main>

      <FooterSubscribe />

      <footer className="footer">
        <p>As an affiliate partner, we earn from qualifying purchases.</p>
        <p>© {new Date().getFullYear()} <a href={SITE_URL}>WhileUShop.com</a> — All rights reserved.</p>
      </footer>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await supabase.from('shop_pages').select('slug').eq('active', true);
  const paths = (data || []).map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { data: pageData } = await supabase.from('shop_pages').select('*').eq('slug', params.slug).eq('active', true).single();
  if (!pageData) return { notFound: true };
  const { data: dealsData } = await supabase.from('shop_deals').select('*').eq('page_id', pageData.id).eq('active', true).order('created_at', { ascending: false });
  return {
    props: { page: pageData, deals: dealsData || [] },
    revalidate: 60,
  };
}
