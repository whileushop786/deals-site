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

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ padding: '10px 20px', maxWidth: '100%', fontSize: 12, color: '#999' }}>
        <Link href="/" style={{ color: '#ff6b00' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#ff6b00' }}>Shop &amp; Save</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#aaa' }}>{page.page_name}</span>
      </nav>

      <main style={{ width: '100%', padding: '0 0 40px' }}>

        {/* Hero */}
        <div className="static-hero" style={{ padding: '20px 20px 16px' }}>
          <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 900, fontFamily: "'Barlow Condensed',sans-serif", textTransform: 'uppercase', color: '#1a1a1a', marginBottom: 6 }}>
            {page.icon} <span style={{ color: '#ff6b00' }}>{page.page_name}</span>
          </h1>
          {page.description && <p style={{ color: '#666', fontSize: 14 }}>{page.description}</p>}
        </div>

        {/* 1. HTML Page Content FIRST */}
        {page.content && (
          <div style={{ padding: '0 20px 20px', maxWidth: 1100, margin: '0 auto' }}>
            <div className="static-card shop-page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        )}

        {/* 2. Deal Cards — full width */}
        {deals && deals.length > 0 && (
          <div style={{ padding: '0 16px' }}>
            <h2 className="shop-deals-heading">Latest Deals</h2>
            <div className="shop-deals-grid-full">
              {deals.map((deal) => (
                <div key={deal.id} className="shop-deal-card-wrap">
                  <a
                    href={deal.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="shop-deal-card"
                  >
                    {deal.image_url && (
                      <div className="shop-deal-img-wrap">
                        <img src={deal.image_url} alt={deal.deal_name} />
                      </div>
                    )}
                    <div className="shop-deal-name">{deal.deal_name}</div>
                    <div className="shop-deal-btn">Shop Now →</div>
                  </a>

                  {/* Description box — styled like product details box */}
                  {deal.description && (
                    <div className="shop-deal-desc-box">
                      <h3 className="shop-deal-desc-heading">Deal Details</h3>
                      <div
                        className="shop-deal-desc-content"
                        dangerouslySetInnerHTML={{ __html: deal.description }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 28, paddingBottom: 20 }}>
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
