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
      <nav aria-label="Breadcrumb" style={{ padding: '10px 20px', maxWidth: 1000, margin: '0 auto', fontSize: 12, color: '#999' }}>
        <Link href="/" style={{ color: '#ff6b00' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#ff6b00' }}>Shop &amp; Save</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#aaa' }}>{page.page_name}</span>
      </nav>

      <main className="static-page" style={{ paddingTop: 0 }}>
        <div className="static-container">
          <div className="static-hero">
            <h1>{page.icon} <span>{page.page_name}</span></h1>
            {page.description && <p>{page.description}</p>}
          </div>

          {/* Deal Cards */}
          {deals && deals.length > 0 && (
            <div className="shop-deals-section">
              <h2 className="shop-deals-heading">Latest Deals</h2>
              <div className="shop-deals-grid">
                {deals.map((deal) => (
                  <a key={deal.id} href={deal.affiliate_link} target="_blank" rel="noopener noreferrer sponsored" className="shop-deal-card">
                    {deal.image_url && (
                      <div className="shop-deal-img-wrap">
                        <img src={deal.image_url} alt={deal.deal_name} />
                      </div>
                    )}
                    <div className="shop-deal-name">{deal.deal_name}</div>
                    {deal.description && (
                      <div className="shop-deal-desc" dangerouslySetInnerHTML={{ __html: deal.description }} />
                    )}
                    <div className="shop-deal-btn">Shop Now →</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* HTML Page Content */}
          {page.content && (
            <div className="static-content">
              <div className="static-card shop-page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
          )}

          <div className="static-card" style={{ marginTop: 16 }}>
            <div className="static-icon">📢</div>
            <h2>Never Miss a Deal!</h2>
            <p>Follow us for real-time updates:</p>
            <ul className="static-list">
              <li>📱 <strong>Telegram</strong> — <a href="https://t.me/whileushop" style={{color:'#ff6b00'}}>t.me/whileushop</a></li>
              <li>📘 <strong>Facebook</strong> — <a href="https://www.facebook.com/whileushop786" style={{color:'#ff6b00'}}>facebook.com/whileushop786</a></li>
              <li>📸 <strong>Instagram</strong> — <a href="https://instagram.com/crazydealshunter" style={{color:'#ff6b00'}}>@crazydealshunter</a></li>
            </ul>
          </div>

          <div className="static-back">
            <Link href="/" className="back-btn">← Back to All Deals</Link>
          </div>
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
